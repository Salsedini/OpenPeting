import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { GetAllAdvertisementsDTO } from 'contracts/src/lib/Advertisement-dtos';

import { AdvertisementService } from '../service/advertisement.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Advertisement')
@Controller('advertisements')
export class AdvertisementsController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @ApiOperation({ summary: 'Get all Advertisements' })
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
    return await this.advertisementService.getAdvertisements(
      getAllAdvertisementsDTO
    );
  }
}
