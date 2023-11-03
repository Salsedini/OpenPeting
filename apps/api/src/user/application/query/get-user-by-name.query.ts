import { IQuery } from '@nestjs/cqrs';

export class GetUserByNameQuery implements IQuery {
    constructor(public readonly name: string) { }
}
