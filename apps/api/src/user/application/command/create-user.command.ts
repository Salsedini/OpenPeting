import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
    constructor(
        public readonly name: string,
        public readonly password: string,
        public readonly surname: string,
        public readonly email: string,
        public readonly role: string,
    ) { }
}
