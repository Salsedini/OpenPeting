// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class CreateCaringServiceAdvertisementDTO {
  @ApiProperty()
  readonly ownerId: string;

  @ApiProperty()
  readonly petId: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly start: Date;

  @ApiProperty()
  readonly end: Date;
}
