// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class AdoptionDTO {
  
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly petId: string;

  @ApiProperty()
  readonly ownerId: string;

  @ApiProperty()
  readonly city: string;
  
}
