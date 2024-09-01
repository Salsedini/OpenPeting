// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdvertisementDTO {
  
  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly start: string;
  
  @ApiProperty()
  readonly end: string;

}
