import { ICommand } from '@nestjs/cqrs';

export class CreateCaringServiceAdvertisementCommand implements ICommand {
  constructor(
    public readonly ownerId: string,
    public readonly petId: string,
    public readonly city: string,
    public readonly price: number,
    public readonly start: Date,
    public readonly end: Date
  ) {}
}
