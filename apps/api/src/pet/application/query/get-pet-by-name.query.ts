import { IQuery } from '@nestjs/cqrs';

export class GetPetByNameQuery implements IQuery {
    constructor(public readonly name: string) { }
}
