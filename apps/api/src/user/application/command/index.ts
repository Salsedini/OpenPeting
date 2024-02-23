import { CreateUserCommand } from "./create-user.command";
import { CreateUserHandler } from "./create-user.handler";
import { DeleteUserCommand } from "./delete-user.command";
import { DeleteUserHandler } from "./delete-user.handler";
import { UpdateUserCommand } from "./update-user.command";
import { UpdateUserHandler } from "./update-user.handler";

export const CommandHandlers = [
    CreateUserHandler,
    UpdateUserHandler,
    DeleteUserHandler
];

export const Command = [
    CreateUserCommand,
    UpdateUserCommand,
    DeleteUserCommand
];