import { ICommand } from "@nestjs/cqrs";

export class ApplyForAdvertisementCommand implements ICommand {
    constructor(
        public readonly id: string,
        public readonly interestedUserId: string
      ) {}
  }