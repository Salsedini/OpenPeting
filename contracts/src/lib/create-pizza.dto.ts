// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class CreatePizzaDTO {

    @ApiProperty()
    readonly name: string;
}
