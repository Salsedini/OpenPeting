import { IQuery } from '@nestjs/cqrs';

export class GetPetByIdQuery implements IQuery {
    constructor(public readonly id: string) { }
}