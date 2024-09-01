// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class CloseAdvertisementDTO {
  
  @ApiProperty()
  readonly _id: string;

  @ApiProperty()
  readonly petId: string;

  @ApiProperty()
  readonly newOwnerId: string;

}