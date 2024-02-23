// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetDTO {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly size: string;

  @ApiProperty()
  readonly age: number;

  @ApiProperty()
  readonly picture: string;

  @ApiProperty()
  readonly description: string;

}