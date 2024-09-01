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

import { AdvertisementService } from '../service/advertisement.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCaringServiceAdvertisementDTO, UpdateAdvertisementDTO } from '../../../../../../contracts/src/lib/Advertisement-dtos';

@ApiTags('Advertisement')
@Controller('advertisement/caringService')
export class CaringServiceAdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @ApiOperation({ summary: 'Creates a CaringService Advertisement ' })
  @ApiCreatedResponse({
    description: 'CaringService Advertisement created',
    type: CreateCaringServiceAdvertisementDTO,
  })
  @Post()
  @HttpCode(200)
  async create(
    @Body(new ValidationPipe())
    createAdvertisementDTO: CreateCaringServiceAdvertisementDTO
  ) {
    console.log('createAdvertisementDTO', createAdvertisementDTO);
    const createdAdvertisementResult =
      await this.advertisementService.createCaringServiceAdvertisement(
        createAdvertisementDTO
      );

    createdAdvertisementResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }

  @ApiOperation({ summary: 'Updates a Caring Service Advertisement' })
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
      await this.advertisementService.updateCaringServiceAdvertisement(params);

    updatedAdvertisementResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }
}
