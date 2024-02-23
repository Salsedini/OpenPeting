import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePetCommand } from "./delete-pet.command";
import { InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { Pet } from "../../domain/model";
import { PetRepository } from '../../domain/service/repository.service';
import { PetId } from "../../domain/model/value_object";
import { PetNotFoundError } from "../../domain/exception/pet-not-found-error";
import { Result, err, ok } from "neverthrow";


@CommandHandler(DeletePetCommand)
export class DeletePetHandler implements ICommandHandler<DeletePetCommand>{

    constructor(
        @InjectAggregateRepository(Pet)
        private readonly petRepository: PetRepository<Pet, PetId>,
        ) { }

    async execute(command: DeletePetCommand): Promise<Result<null, PetNotFoundError>> {

        const id = PetId.fromString(command.id);

        const foundPet = await this.petRepository.find(id);

        if (!foundPet){
            return err(PetNotFoundError.withId(id));
        }

        foundPet.delete();

        this.petRepository.delete(foundPet);

        return ok(null);

    }



}