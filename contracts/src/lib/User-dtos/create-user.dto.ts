// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly surname: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly email:string;

    @ApiProperty()
    readonly role: string;
    
}
