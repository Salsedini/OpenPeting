import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly surname: string,
        public readonly phone: number,
        public readonly mail: string,
        public readonly picture: string,
    ) { }
}
