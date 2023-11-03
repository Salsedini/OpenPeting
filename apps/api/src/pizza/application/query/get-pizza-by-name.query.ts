import { IQuery } from '@nestjs/cqrs';

export class GetPizzaByNameQuery implements IQuery {
    constructor(public readonly name: string) { }
}
