import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteAdvertisementCommand } from './delete-advertisement.command';
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { Advertisement } from '../../domain/model';
import { AdvertisementRepository } from '../../domain/service/repository.service';
import { AdvertisementId } from '../../domain/model/value_object';
import { AdvertisementNotFoundError } from '../../domain/exception/advertisement-not-found-error';
import { Result, err, ok } from 'neverthrow';

@CommandHandler(DeleteAdvertisementCommand)
export class DeleteAdvertisementHandler
  implements ICommandHandler<DeleteAdvertisementCommand>
{
  constructor(
    @InjectAggregateRepository(Advertisement)
    private readonly advertisementRepository: AdvertisementRepository<
      Advertisement,
      AdvertisementId
    >
  ) {}

  async execute(
    command: DeleteAdvertisementCommand
  ): Promise<Result<null, AdvertisementNotFoundError>> {
    const id = AdvertisementId.fromString(command.id);

    const foundAdvertisement = await this.advertisementRepository.find(id);

    if (!foundAdvertisement) {
      return err(AdvertisementNotFoundError.withId(id));
    }

    foundAdvertisement.delete();

    this.advertisementRepository.delete(foundAdvertisement);

    return ok(null);
  }
}