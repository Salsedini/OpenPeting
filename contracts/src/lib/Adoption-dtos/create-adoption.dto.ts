// @ts-nocheck

import { ApiProperty } from '@nestjs/swagger';

export class CreateAdoptionDTO {
  
    @ApiProperty()
    readonly ownerId: string;

    @ApiProperty()
    readonly petId: string;
  
    @ApiProperty()
    readonly city: string;
    
}
