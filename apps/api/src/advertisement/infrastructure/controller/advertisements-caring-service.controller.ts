import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ValidationPipe,
  } from '@nestjs/common';
  import { GetAllAdvertisementsDTO } from 'contracts/src/lib/Advertisement-dtos';
  import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoDBAdvertisementFinder } from '../service/advertisement-finder.service';
  
  @ApiTags('Advertisement')
  @Controller('caringService/advertisements')
  export class CaringServiceAdvertisementsController {
    constructor(private readonly advertisementService: MongoDBAdvertisementFinder) {}
  
    @ApiOperation({ summary: 'Get all Caring Service Advertisements' })
    @ApiCreatedResponse({
      description: 'Advertisements received',
      type: [GetAllAdvertisementsDTO],
    })
    @Get()
    @HttpCode(200)
    async get(
      @Param(new ValidationPipe())
      getAllAdvertisementsDTO: GetAllAdvertisementsDTO
    ) {
      return await this.advertisementService.findCaringServiceAdvertisements();
    }
  }
  