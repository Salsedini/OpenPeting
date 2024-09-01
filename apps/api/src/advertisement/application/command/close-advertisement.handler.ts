import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteAdvertisementCommand } from './delete-advertisement.command';
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Advertisement } from '../../domain/model';
import { AdvertisementRepository } from '../../domain/service/repository.service';
import { AdvertisementId } from '../../domain/model/value_object';
import { AdvertisementNotFoundError } from '../../domain/exception/advertisement-not-found-error';
import { Result, err, ok } from 'neverthrow';
import { CloseAdvertisementCommand } from "./close-advertisement.command";
import { PetService } from "apps/api/src/pet/infrastructure/service";

@CommandHandler(CloseAdvertisementCommand)
export class CloseAdvertisementHandler
  implements ICommandHandler<CloseAdvertisementCommand>
{
  constructor(
    private readonly petService: PetService,
    @InjectAggregateRepository(Advertisement)
    private readonly advertisementRepository: AdvertisementRepository<
      Advertisement,
      AdvertisementId
    >
  ) {}

  async execute(
    command: CloseAdvertisementCommand
  ): Promise<Result<null, AdvertisementNotFoundError>> {
    const id = AdvertisementId.fromString(command.id);

    const foundAdvertisement = await this.advertisementRepository.find(id);

    if (!foundAdvertisement) {
      return err(AdvertisementNotFoundError.withId(id));
    }

    const pet = await this.petService.getPetById(command.petId);

    if(pet === undefined){
      return err(new Error(`Pet not found with id ${command.petId}`));
    }

    console.log("petId: ", command.petId);
    console.log("newOwnerId: ", command.newOwnerId);

    if(foundAdvertisement.type === "ADOPTION"){
        await this.petService.UpdatePetOwnerId(command.petId, command.newOwnerId);
    }

    foundAdvertisement.delete();

    this.advertisementRepository.delete(foundAdvertisement);

    return ok(null);
  }
}