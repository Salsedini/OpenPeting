import { ICommand } from "@nestjs/cqrs";

export class DeleteAdvertisementCommand implements ICommand {
  constructor(public readonly id: string) {}
}