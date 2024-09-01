import { ICommand } from '@nestjs/cqrs';

export class CloseAdvertisementCommand implements ICommand {
  constructor(
      public readonly id: string,
      public readonly petId: string,
      public readonly newOwnerId: string
    ) {}
}