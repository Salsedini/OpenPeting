import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { CreatePetDTO, GetAllPetsDTO, PetDTO, UpdatePetDTO } from 'contracts/src/lib/Pet-dtos';
import { Result } from 'neverthrow';

import { CreatePetCommand } from '../../application/command/create-pet.command';
import { PetError } from '../../domain/exception';
import { GetPetsQuery } from '../../application/query/get-pets.query';
import { UpdatePetCommand } from '../../application/command/update-pet.command';
import { DeletePetCommand } from '../../application/command/delete-pet.command';

@Injectable()
export class PetService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createPet(createPetDTO: CreatePetDTO): Promise<Result<null, PetError>> {
        return await this.commandBus.execute<ICommand, Result<null, PetError>>(new CreatePetCommand(
            createPetDTO.name,
            createPetDTO.ownerId,
            createPetDTO.size,
            createPetDTO.type,
            createPetDTO.age,
        ));
    }

    async updatePet(params: {id: string,  fieldsToUpdate: UpdatePetDTO}): Promise<Result<null, PetError>> {
         return await this.commandBus.execute<ICommand, Result<null, PetError>>(new UpdatePetCommand(
            params.id, 
            params.fieldsToUpdate.name,
            params.fieldsToUpdate.size,
            params.fieldsToUpdate.age,
            params.fieldsToUpdate.picture,
            params.fieldsToUpdate.description,
            ));
    }


    async getPets(_: GetAllPetsDTO): Promise<Array<PetDTO>> {
        return await this.queryBus.execute<IQuery, Array<PetDTO> | null>(new GetPetsQuery());
    }

    async deletePet(id: string): Promise<Result<null, PetError>>{
        return await this.commandBus.execute<ICommand, Result<null, PetError>>(new DeletePetCommand(id));
    }

}
