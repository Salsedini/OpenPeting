import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ADVERTISEMENT_FINDER, AdvertisementFinder } from '../service';
import { GetAdvertisementsQuery } from './get-advertisements.query';
import { AdvertisementDTO } from 'contracts/src/lib/Advertisement-dtos';

@QueryHandler(GetAdvertisementsQuery)
export class GetAdvertisementsHandler implements IQueryHandler {
  constructor(
    @Inject(ADVERTISEMENT_FINDER)
    private readonly advertisementFinder: AdvertisementFinder
  ) {}

  async execute(_: GetAdvertisementsQuery): Promise<Array<AdvertisementDTO>> {
    return this.advertisementFinder.findAll();
  }
}
