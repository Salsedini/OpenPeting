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
      AcceptAdvertisementAplicationDTO,
    CreateAdoptionAdvertisementDTO,
    UpdateAdvertisementDTO,
  } from 'contracts/src/lib/Advertisement-dtos';
  
  import { AdvertisementService } from '../service/advertisement.service';
  import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Advertisement')
  @Controller('accept-interested-user')
  export class AcceptInterestedUserController {
    constructor(private readonly advertisementService: AdvertisementService) {}

    @ApiOperation({ summary: 'Accept user aplication' })
    @ApiCreatedResponse({
        description: 'User aplication was accepted',
    })
    @Put(':id')
    @HttpCode(200)
    async acceptAdvertisementAplication(
    @Param('id') id: string,
    @Body(new ValidationPipe()) fieldsToUpdate: AcceptAdvertisementAplicationDTO) {
      const params = { id, fieldsToUpdate };
      AcceptAdvertisementAplicationDTO
      const aceptedFordAdvertisementResult =
        await this.advertisementService.acceptAdvertisementAplication(params);
  
        aceptedFordAdvertisementResult.mapErr((err) => {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      });
  }
  
  }
  