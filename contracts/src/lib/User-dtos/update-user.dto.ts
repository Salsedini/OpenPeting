// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly surname: string;

  @ApiProperty()
  readonly phone: number;

  @ApiProperty()
  readonly mail: string;

  @ApiProperty()
  readonly picture: string;

}