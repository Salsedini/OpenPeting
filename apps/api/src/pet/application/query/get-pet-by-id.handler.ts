import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PetError } from '../../domain/exception';
import { PET_FINDER, PetFinder } from '../service';
import { GetPetByIdQuery } from './get-pet-by-id.query';
import { Inject } from '@nestjs/common';
import { PetDTO } from 'contracts/src/lib/Pet-dtos';
import { PetId } from '../../domain/model/value_object';

@QueryHandler(GetPetByIdQuery)
export class GetPetByIdHandler implements IQueryHandler {
    constructor(
        @Inject(PET_FINDER)
        private readonly petFinder: PetFinder,
    ) { }

    async execute(query: GetPetByIdQuery): Promise<PetDTO> {
        return this.petFinder.findById(PetId.fromString(query.id));
    }
}   