import { IQuery } from '@nestjs/cqrs';

export class GetAdvertisementByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}