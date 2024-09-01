import { ICommand } from '@nestjs/cqrs';

export class UpdatePetOwnerIdCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly newOwnerId: string,
    ) { }
}
