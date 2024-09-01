import { CreatePetCommand } from "./create-pet.command";
import { CreatePetHandler } from "./create-pet.handler";
import { DeletePetCommand } from "./delete-pet.command";
import { DeletePetHandler } from "./delete-pet.handler";
import { UpdatePetOwnerIdCommand } from "./update-pet-owner-id..command";
import { UpdatePetOwnerIdHandler } from "./update-pet-owner-id.handler";
import { UpdatePetCommand } from "./update-pet.command";
import { UpdatePetHandler } from "./update-pet.handler";

export const CommandHandlers = [
    CreatePetHandler,
    UpdatePetHandler,
    DeletePetHandler,
    UpdatePetOwnerIdHandler
];

export const Command = [
    CreatePetCommand,
    UpdatePetCommand,
    DeletePetCommand,
    UpdatePetOwnerIdCommand
];