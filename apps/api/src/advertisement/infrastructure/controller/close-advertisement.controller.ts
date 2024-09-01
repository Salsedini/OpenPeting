import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ValidationPipe,
  } from '@nestjs/common';
  import {
    CloseAdvertisementDTO,
  } from 'contracts/src/lib/Advertisement-dtos';
  
  import { AdvertisementService } from '../service/advertisement.service';
  import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Advertisement')
  @Controller('close-advertisement')
  export class CloseAdvertisementController {
    constructor(private readonly advertisementService: AdvertisementService) {}
  
    @ApiOperation({ summary: 'Closes an Advertisement' })
    @ApiCreatedResponse({
      description: 'Advertisement closed',
    })
    @Delete(':id')
    @HttpCode(200)
    async CloseAdvertisement(
      @Param('id') id: string,
      @Body(new ValidationPipe()) closeAdvertisementDTO: CloseAdvertisementDTO) {

        const params = { id, fieldsToUpdate: closeAdvertisementDTO };

      const closedAdvertisementResult =
        await this.advertisementService.closeAdvertisement(params);
  
      closedAdvertisementResult.mapErr((err) => {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      });
    }
  
  }
  