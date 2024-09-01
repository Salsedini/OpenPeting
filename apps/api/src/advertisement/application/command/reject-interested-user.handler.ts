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

@CommandHandler(RejectInterestedUserCommand)
export class RejectInterestedUserHandler
  implements ICommandHandler<RejectInterestedUserCommand>
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
    command: ApplyForAdvertisementCommand
  ): Promise<Result<null, AdvertisementNotFoundError>> {
    const id = AdvertisementId.fromString(command.id);
    const foundAdvertisement = await this.advertisementRepository.find(id);

    if (!foundAdvertisement) {
      return err(AdvertisementNotFoundError.withId(id));
    }

    const interestedUsers = await this.userService.getUsers();

    const rejectedUserDTO = interestedUsers.find(user => user._id === command.interestedUserId)

    if(rejectedUserDTO._id === undefined){
      return err(new Error(`User not found with id ${command.interestedUserId}`));
    }

    foundAdvertisement.deleteInterestedUser(rejectedUserDTO._id);
    this.advertisementRepository.save(foundAdvertisement);
    return ok(null);
    
   }
}