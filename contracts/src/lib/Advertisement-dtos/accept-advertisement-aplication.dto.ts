import { ApiProperty } from "@nestjs/swagger";

export class AcceptAdvertisementAplicationDTO {
  
    @ApiProperty()
    readonly acceptedUserId: string;
  
  }