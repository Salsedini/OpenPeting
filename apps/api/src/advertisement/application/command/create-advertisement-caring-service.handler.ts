import { err, ok, Result } from 'neverthrow';
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateCaringServiceAdvertisementCommand } from './create-advertisement-caring-service.command';
import { match, P } from 'ts-pattern';

import { Advertisement } from '../../domain/model';
import {
  AdvertisementCity,
  AdvertisementId,
  AdvertisementPrice,
} from '../../domain/model/value_object';

import { AdvertisementRepository } from '../../domain/service';
import { UserId } from 'apps/api/src/user/domain/model/value_object';
import { PetId } from 'apps/api/src/pet/domain/model/value_object';
import { AdvertisementAlreadyExistsError } from '../../domain/exception/advertisement-already-exist-error';

@CommandHandler(CreateCaringServiceAdvertisementCommand)
export class CreateCaringServiceAdvertisementHandler
  implements ICommandHandler<CreateCaringServiceAdvertisementCommand>
{
  constructor(
    @InjectAggregateRepository(Advertisement)
    private readonly advertisementRepository: AdvertisementRepository <Advertisement, AdvertisementId>
  ) {}

  async execute(
    command: CreateCaringServiceAdvertisementCommand
  ): Promise<Result<null, AdvertisementAlreadyExistsError>> {
    const id = AdvertisementId.generate();
    const foundAdvertisement = await this.advertisementRepository.find(id);

    return match(foundAdvertisement)
      .with(
        P.instanceOf(Advertisement),
        (foundAdvertisement: Advertisement) => {
          return err(AdvertisementAlreadyExistsError.withId(id));
        }
      )
      .otherwise(() => {
        const ownerId = UserId.fromString(command.ownerId);
        const petId = PetId.fromString(command.petId);
        const city = AdvertisementCity.fromString(command.city);
        const price = AdvertisementPrice.fromNumber(command.price);


        const advertisement = Advertisement.addCaringService(
          id,
          ownerId,
          petId,
          city,
          price,
          command.start,
          command.end,
        );

        this.advertisementRepository.save(advertisement);

        return ok(null);
      });
  }
}
