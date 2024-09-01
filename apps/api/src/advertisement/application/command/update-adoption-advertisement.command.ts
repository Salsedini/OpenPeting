import { ICommand } from '@nestjs/cqrs';

export class UpdateAdoptionAdvertisementCommand implements ICommand {
  constructor(
      public readonly id: string,
      public readonly city: string
    ) {}
}
