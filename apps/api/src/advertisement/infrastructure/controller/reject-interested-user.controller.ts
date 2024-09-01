import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    ValidationPipe,
  } from '@nestjs/common';
  import {
    CreateAdoptionAdvertisementDTO,
    UpdateAdvertisementDTO,
  } from 'contracts/src/lib/Advertisement-dtos';
  
  import { AdvertisementService } from '../service/advertisement.service';
  import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { ApplyForAdvertisementDTO } from '../../../../../../contracts/src/lib/Advertisement-dtos/apply-for-advertisement.dto';
  
  @ApiTags('Advertisement')
  @Controller('reject-interested-user')
  export class RejectInterestedUserController {
    constructor(private readonly advertisementService: AdvertisementService) {}
    
    @ApiOperation({ summary: 'User rejected for an advertisement' })
    @ApiCreatedResponse({
      description: 'User rejected for an advertisement',
    })
    @Put(':id')
    @HttpCode(200)
    async rejectInterestedUser( 
      @Param('id') id: string,
      @Body(new ValidationPipe()) fieldsToUpdate: ApplyForAdvertisementDTO) {
        const params = { id, fieldsToUpdate };
  
        const rejectedFromAdvertisementResult =
          await this.advertisementService.rejectInterestedUser(params);
    
        rejectedFromAdvertisementResult.mapErr((err) => {
          throw new HttpException(err.message, HttpStatus.CONFLICT);
        });
    }
  
  }
  