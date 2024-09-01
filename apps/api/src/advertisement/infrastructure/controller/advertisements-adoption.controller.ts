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
  @Controller('adoption/advertisements')
  export class AdoptionAdvertisementsController {
    constructor(private readonly advertisementFinderService: MongoDBAdvertisementFinder) {}
  
    @ApiOperation({ summary: 'Get all Adoption Advertisements' })
    @ApiCreatedResponse({
      description: 'Adoption Advertisements received',
      type: [GetAllAdvertisementsDTO],
    })
    @Get()
    @HttpCode(200)
    async get(
      @Param(new ValidationPipe())
      getAllAdvertisementsDTO: GetAllAdvertisementsDTO
    ) {
      return await this.advertisementFinderService.findAdoptionAdvertisements();
    }
  }
  