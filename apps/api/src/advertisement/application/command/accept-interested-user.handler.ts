import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Advertisement } from '../../domain/model';
import { AdvertisementId } from '../../domain/model/value_object/advertisement-id';
import { AdvertisementNotFoundError } from '../../domain/exception';
import { Result, err, ok } from 'neverthrow';
import { ApplyForAdvertisementCommand } from "./apply-for-advertisement.command";
import { UserService } from "apps/api/src/user/infrastructure/service";
import { RejectInterestedUserCommand } from "./reject-interested-user.command";
import { AdvertisementRepository } from "../../domain/service";
import { AcceptInterestedUserCommand } from "./accept-interested-user.command";

@CommandHandler(AcceptInterestedUserCommand)
export class AcceptInterestedUserHandler
  implements ICommandHandler<AcceptInterestedUserCommand>
{
  constructor(
    private readonly userService: UserService,
    @InjectAggregateRepository(Advertisement)
    private readonly advertisementRepository: AdvertisementRepository<
      Advertisement,
      AdvertisementId
    >,
  ) {}

  async execute(
    command: AcceptInterestedUserCommand
  ): Promise<Result<null, AdvertisementNotFoundError>> {
    const id = AdvertisementId.fromString(command.id);
    const foundAdvertisement = await this.advertisementRepository.find(id);

    if (!foundAdvertisement) {
      return err(AdvertisementNotFoundError.withId(id));
    }

    const interestedUsers = await this.userService.getUsers();

    const acceptedUserDTO = interestedUsers.find(user => user._id === command.acceptedUserId)

    if(acceptedUserDTO._id === undefined){
      return err(new Error(`User not found with id ${command.acceptedUserId}`));
    }

    let interestedUsersIdvalues = [];
    foundAdvertisement.interestedUsersId.forEach(user => {
      interestedUsersIdvalues.push(user.value);
    });

    if(foundAdvertisement.acceptedUserId || !interestedUsersIdvalues.includes(acceptedUserDTO._id) ){
        return err(new Error(`User with id ${command.acceptedUserId} cant apply for advertisement`));
    }

    foundAdvertisement.acceptInterestedUser(acceptedUserDTO._id);
    this.advertisementRepository.save(foundAdvertisement);
    return ok(null);
    
   }
}