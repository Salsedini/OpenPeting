import { ApiProperty } from "@nestjs/swagger";

export class ApplyForAdvertisementDTO {
  
    @ApiProperty()
    readonly interestedUserId: string;
  
  }