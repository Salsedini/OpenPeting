import { ICommand } from "@nestjs/cqrs";

export class DeletePetCommand implements ICommand{
    constructor(public readonly id: string) { }
}