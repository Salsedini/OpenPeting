import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AdvertisementError } from '../../domain/exception';
import { ADVERTISEMENT_FINDER, AdvertisementFinder } from '../service';
import { GetAdvertisementByIdQuery } from './get-advertisement-by-id.query';
import { Inject } from '@nestjs/common';
import { AdvertisementDTO } from 'contracts/src/lib/Advertisement-dtos';
import { AdvertisementId } from '../../domain/model/value_object';

@QueryHandler(GetAdvertisementByIdQuery)
export class GetAdvertisementByIdHandler implements IQueryHandler {
  constructor(
    @Inject(ADVERTISEMENT_FINDER)
    private readonly advertisementFinder: AdvertisementFinder
  ) {}

  async execute(query: GetAdvertisementByIdQuery): Promise<AdvertisementDTO> {
    return this.advertisementFinder.findById(
      AdvertisementId.fromString(query.id)
    );
  }
}
