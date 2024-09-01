import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Advertisement } from '../../domain/model';
import { AdvertisementRepository } from '../../domain/service';
import { AdvertisementId } from '../../domain/model/value_object/advertisement-id';
import { AdvertisementNotFoundError } from '../../domain/exception';
import { Result, err, ok } from 'neverthrow';
import { AdvertisementCity } from '../../domain/model/value_object';
import { UpdateAdoptionAdvertisementCommand } from "./update-adoption-advertisement.command";

@CommandHandler(UpdateAdoptionAdvertisementCommand)
export class UpdateAdoptionAdvertisementHandler
  implements ICommandHandler<UpdateAdoptionAdvertisementCommand>
{
  constructor(
    @InjectAggregateRepository(Advertisement)
    private readonly advertisementRepository: AdvertisementRepository<
      Advertisement,
      AdvertisementId
    >
  ) {}

  async execute(
    command: UpdateAdoptionAdvertisementCommand
  ): Promise<Result<null, AdvertisementNotFoundError>> {
    const id = AdvertisementId.fromString(command.id);
    const foundAdvertisement = await this.advertisementRepository.find(id);

    if (!foundAdvertisement) {
      return err(AdvertisementNotFoundError.withId(id));
    }

    const city = AdvertisementCity.fromString(command.city);
    foundAdvertisement.updateCity(city);

    this.advertisementRepository.save(foundAdvertisement);

    return ok(null);
  }
}