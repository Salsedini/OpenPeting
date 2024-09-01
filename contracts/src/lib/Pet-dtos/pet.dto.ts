// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class PetDTO {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly gender: string;

  @ApiProperty()
  readonly size: string;

  @ApiProperty()
  readonly type: string;

  @ApiProperty()
  readonly age: number;

  @ApiProperty()
  readonly picture: string;
  
}
