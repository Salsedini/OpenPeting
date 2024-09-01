import { ICommand } from '@nestjs/cqrs';

export class CreateAdoptionAdvertisementCommand implements ICommand {
  constructor(
    public readonly ownerId: string,
    public readonly petId: string,
    public readonly city: string
  ) {}
}
