import { ICommand } from "@nestjs/cqrs";

export class RejectInterestedUserCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly interestedUserId: string
      ) {}
  }