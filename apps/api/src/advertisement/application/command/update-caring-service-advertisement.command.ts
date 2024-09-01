import { ICommand } from '@nestjs/cqrs';

export class UpdateCaringServiceAdvertisementCommand implements ICommand {
  constructor(
      public readonly id: string,
      public readonly city: string,
      public readonly price: number,
      public readonly start: Date,
      public readonly end: Date,
    ) {}
}