// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDTO {

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly ownerId: string;
    
    @ApiProperty()
    readonly size: string;

    @ApiProperty()
    readonly type: string;

    @ApiProperty()
    readonly age: number;
    
}
