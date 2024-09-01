import { ICommand } from '@nestjs/cqrs';

export class CreatePetCommand implements ICommand {
    constructor(
        public readonly name: string,
        public readonly ownerId: string,
        public readonly gender: string,
        public readonly size: string,
        public readonly type: string,
        public readonly age: number,
    ) { }
}
