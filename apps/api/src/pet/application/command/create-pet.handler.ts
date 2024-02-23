import { err, ok, Result } from 'neverthrow';
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreatePetCommand } from './create-pet.command';
import { match, P } from 'ts-pattern';

import { Pet } from '../../domain/model';
import {
    PetAge,
    PetId,
    PetName,
    PetSize,
    PetType,
} from '../../domain/model/value_object';

import { PetRepository } from '../../domain/service';
import { PetAlreadyExistsError } from '../../domain/exception/pet-already-exists-error';
import { UserId } from 'apps/api/src/user/domain/model/value_object';

@CommandHandler(CreatePetCommand)
export class CreatePetHandler implements ICommandHandler<CreatePetCommand> {

    constructor(
        @InjectAggregateRepository(Pet)
        private readonly petRepository: PetRepository<Pet, PetId>,
    ) { }

    async execute(command: CreatePetCommand): Promise<Result<null, PetAlreadyExistsError>> {

        const id = PetId.generate();
        const foundPet = await this.petRepository.find(id);

        return match(foundPet)
            .with(P.instanceOf(Pet), (foundPet: Pet) => {

                return err(PetAlreadyExistsError.withId(id));
            })
            .otherwise(() => {
                
                const name = PetName.fromString(command.name);
                const ownerId = UserId.fromString(command.ownerId);
                const size = PetSize.fromString(command.size);
                const type = PetType.fromString(command.type);
                const age = PetAge.fromNumber(command.age);
                const pet = Pet.add(id, ownerId, name, size, type, age);
                
                this.petRepository.save(pet);

                return ok(null);
            });
    }
}


