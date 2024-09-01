// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class CreateAdoptionAdvertisementDTO {
  @ApiProperty()
  readonly ownerId: string;

  @ApiProperty()
  readonly petId: string;

  @ApiProperty()
  readonly city: string;
}
