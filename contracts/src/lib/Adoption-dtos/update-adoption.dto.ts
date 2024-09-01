// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdoptionDTO {

  @ApiProperty()
  readonly city: string;

}