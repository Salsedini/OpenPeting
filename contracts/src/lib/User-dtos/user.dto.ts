// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty()
  readonly email: string;
    
  @ApiProperty()
  readonly delete: boolean;
  
}
