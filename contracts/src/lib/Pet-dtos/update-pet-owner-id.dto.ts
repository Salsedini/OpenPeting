// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetOwnerIdDTO {

  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly ownerId: string;

}