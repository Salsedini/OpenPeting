import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePetCommand } from "./update-pet.command";
import { InjectAggregateRepository } from "@aulasoftwarelibre/nestjs-eventstore";
import { Pet } from "../../domain/model";
import { PetRepository } from "../../domain/service";
import { PetId } from "../../domain/model/value_object/pet-id";
import { PetAge, PetDescription, PetName, PetPicture, PetSize } from "../../domain/model/value_object";
import { PetNotFoundError } from "../../domain/exception";
import { Result, err, ok } from "neverthrow";
import { UserService } from "apps/api/src/user/infrastructure/service";
import { UpdatePetOwnerIdCommand } from "./update-pet-owner-id..command";
import { UserId } from "apps/api/src/user/domain/model/value_object";

@CommandHandler(UpdatePetOwnerIdCommand)
export class UpdatePetOwnerIdHandler implements ICommandHandler<UpdatePetOwnerIdCommand>{
    
    constructor(
        private readonly userService: UserService,
        @InjectAggregateRepository(Pet)
         private readonly petRepository: PetRepository<Pet, PetId>,
    ) {}
    
    async execute(command: UpdatePetOwnerIdCommand): Promise<Result<null, PetNotFoundError>> {

        const id = PetId.fromString(command.id);
        const foundPet = await this.petRepository.find(id);

        if (!foundPet){
            return err(PetNotFoundError.withId(id));
        }

        console.log("new owner id: ",command.newOwnerId);

        const UsersDTO = await this.userService.getUsers();

        const UserDTO = UsersDTO.find(user => user._id === command.newOwnerId);
    
        if(UserDTO._id === undefined){
          return err(new Error(`User not found with id ${command.newOwnerId}`));
        }

        const ownerId = UserId.fromString(command.newOwnerId);
        foundPet.updateOwnerId(ownerId);
        
        this.petRepository.save(foundPet);

        return ok(null);
        
    }

}