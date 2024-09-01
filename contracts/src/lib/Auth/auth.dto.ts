import { ApiProperty } from "@nestjs/swagger";


export class AuthDTO{
  
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
  
}