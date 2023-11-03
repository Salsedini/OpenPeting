import { ICommand } from '@nestjs/cqrs';

export class CreatePizzaCommand implements ICommand {
    constructor(
        public readonly name: string,
    ) { }
}
