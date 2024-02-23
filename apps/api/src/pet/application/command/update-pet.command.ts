import { ICommand } from '@nestjs/cqrs';

export class UpdatePetCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly size: string,
        public readonly age: number,
        public readonly picture: string,
        public readonly description: string,
    ) { }
}
