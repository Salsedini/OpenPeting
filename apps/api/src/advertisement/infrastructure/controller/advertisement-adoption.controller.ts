import {
  Body,
  Controller,
  Delete,
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

@ApiTags('Advertisement')
@Controller('advertisement/adoption')
export class AdoptionAdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @ApiOperation({ summary: 'Creates an Adoption Advertisement' })
  @ApiCreatedResponse({
    description: 'Adoption Advertisement created',
    type: CreateAdoptionAdvertisementDTO,
  })
  @Post()
  @HttpCode(200)
  async create(
    @Body(new ValidationPipe())
    createAdvertisementDTO: CreateAdoptionAdvertisementDTO
  ) {
    const createdAdvertisementResult =
      await this.advertisementService.createAdoptionAdvertisement(
        createAdvertisementDTO
      );

    createdAdvertisementResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }

  @ApiOperation({ summary: 'Updates an Adoption Advertisement' })
  @ApiCreatedResponse({
    description: 'Advertisement edited',
    type: UpdateAdvertisementDTO,
  })
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateAdvertisementDTO: UpdateAdvertisementDTO
  ) {
    const params = { id, fieldsToUpdate: updateAdvertisementDTO };

    const updatedAdvertisementResult =
      await this.advertisementService.updateAdoptionAdvertisement(params);

    updatedAdvertisementResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }
}
