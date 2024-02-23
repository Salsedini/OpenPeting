import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PET_FINDER, PetFinder } from '../service';
import { GetPetsQuery } from './get-pets.query';
import { PetDTO } from 'contracts/src/lib/Pet-dtos';

@QueryHandler(GetPetsQuery)
export class GetPetsHandler implements IQueryHandler {
    constructor(
        @Inject(PET_FINDER)
        private readonly petFinder: PetFinder,
    ) { }

    async execute(_: GetPetsQuery): Promise<Array<PetDTO>> {
        return this.petFinder.findAll();
    }
}
