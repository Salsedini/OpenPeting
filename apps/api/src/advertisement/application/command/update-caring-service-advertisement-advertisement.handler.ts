import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Advertisement } from '../../domain/model';
import { AdvertisementRepository } from '../../domain/service';
import { AdvertisementId } from '../../domain/model/value_object/advertisement-id';
import { AdvertisementNotFoundError } from '../../domain/exception';
import { Result, err, ok } from 'neverthrow';
import { AdvertisementCity, AdvertisementPrice } from '../../domain/model/value_object';
import { UpdateCaringServiceAdvertisementCommand } from "./update-caring-service-advertisement.command";

@CommandHandler(UpdateCaringServiceAdvertisementCommand)
export class UpdateCaringServiceAdvertisementHandler
  implements ICommandHandler<UpdateCaringServiceAdvertisementCommand>
{
  constructor(
    @InjectAggregateRepository(Advertisement)
    private readonly advertisementRepository: AdvertisementRepository<
      Advertisement,
      AdvertisementId
    >
  ) {}

  async execute(
    command: UpdateCaringServiceAdvertisementCommand
  ): Promise<Result<null, AdvertisementNotFoundError>> {
    const id = AdvertisementId.fromString(command.id);
    const foundAdvertisement = await this.advertisementRepository.find(id);

    if (!foundAdvertisement) {
      return err(AdvertisementNotFoundError.withId(id));
    }

    const city = AdvertisementCity.fromString(command.city);
    foundAdvertisement.updateCity(city);

    const price = AdvertisementPrice.fromNumber(command.price);
    foundAdvertisement.updatePrice(price);

    const start = new Date(command.start);
    foundAdvertisement.updateStartDate(start);

    const end = new Date(command.end);
    foundAdvertisement.updateEndDate(end);

    this.advertisementRepository.save(foundAdvertisement);

    return ok(null);
  }
}