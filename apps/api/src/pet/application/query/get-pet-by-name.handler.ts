import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PET_FINDER, PetFinder } from '../service';
import { GetPetByNameQuery } from './get-pet-by-name.query';
import { PetDTO } from 'contracts/src/lib/Pet-dtos';
import { PetName } from '../../domain/model/value_object';
import { Err, Result } from 'neverthrow';
import { PetError } from '../../domain/exception';

@QueryHandler(GetPetByNameQuery)
export class GetPetByNameHandler implements IQueryHandler {
    constructor(
        @Inject(PET_FINDER)
        private readonly petFinder: PetFinder,
    ) { }

    async execute(query: GetPetByNameQuery): Promise<Array<PetDTO>> {
        return this.petFinder.findByName(PetName.fromString(query.name));
    }
}
