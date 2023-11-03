// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class PizzaDTO {
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly name: string;
}
