import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePetCommand } from "./update-pet.command";
import { InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { Pet } from "../../domain/model";
import { PetRepository } from "../../domain/service";
import { PetId } from "../../domain/model/value_object/pet-id";
import { PetAge, PetDescription, PetName, PetPicture, PetSize } from "../../domain/model/value_object";
import { PetNotFoundError } from "../../domain/exception";
import { Result, err, ok } from "neverthrow";

@CommandHandler(UpdatePetCommand)
export class UpdatePetHandler implements ICommandHandler<UpdatePetCommand>{
    
    constructor(
        @InjectAggregateRepository(Pet)
         private readonly petRepository: PetRepository<Pet, PetId>,
    ) {}
    
    async execute(command: UpdatePetCommand): Promise<Result<null, PetNotFoundError>> {

        const id = PetId.fromString(command.id);
        const foundPet = await this.petRepository.find(id);

        if (!foundPet){
            return err(PetNotFoundError.withId(id));
        }

        const name = PetName.fromString(command.name);
        foundPet.updateName(name);

        const size = PetSize.fromString(command.size);
        foundPet.updateSize(size);

        const age = PetAge.fromNumber(command.age);
        foundPet.updateAge(age);

        const picture = PetPicture.fromString(command.picture);
        foundPet.updatePicture(picture);

        const description = PetDescription.fromString(command.description);
        foundPet.updateDescription(description);

        this.petRepository.save(foundPet);

        return ok(null);
        
    }

}