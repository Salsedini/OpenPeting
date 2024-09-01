import { ICommand } from "@nestjs/cqrs";

export class AcceptInterestedUserCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly acceptedUserId: string
      ) {}
  }