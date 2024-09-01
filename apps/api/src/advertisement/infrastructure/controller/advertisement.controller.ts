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
  AcceptAdvertisementAplicationDTO,
  CloseAdvertisementDTO,
  CreateAdoptionAdvertisementDTO,
  UpdateAdvertisementDTO,
} from 'contracts/src/lib/Advertisement-dtos';

import { AdvertisementService } from '../service/advertisement.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplyForAdvertisementDTO } from '../../../../../../contracts/src/lib/Advertisement-dtos/apply-for-advertisement.dto';

@ApiTags('Advertisement')
@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @ApiOperation({ summary: 'Deletes an Advertisement' })
  @ApiCreatedResponse({
    description: 'Advertisement deleted',
  })
  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    const deletedAdvertisementResult =
      await this.advertisementService.deleteAdvertisement(id);

    deletedAdvertisementResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }

  @ApiOperation({ summary: 'Closes an Advertisement' })
  @ApiCreatedResponse({
    description: 'Advertisement closed',
  })
  @Delete(':id')
  @HttpCode(200)
  async CloseAdvertisement(
    @Param('id') id: string,
    @Body(new ValidationPipe()) fieldsToUpdate: CloseAdvertisementDTO) {
    const deletedAdvertisementResult =
      await this.advertisementService.deleteAdvertisement(id);

    deletedAdvertisementResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }

  @ApiOperation({ summary: 'User aplies for an advertisement' })
  @ApiCreatedResponse({
    description: 'User applied to the advertisement',
  })
  @Put(':id')
  @HttpCode(200)
  async applyForAdvertisement(
    @Param('id') id: string,
    @Body(new ValidationPipe()) fieldsToUpdate: ApplyForAdvertisementDTO) {
      const params = { id, fieldsToUpdate };
      ApplyForAdvertisementDTO
      const appliedTodAdvertisementResult =
        await this.advertisementService.applyForAdvertisement(params);
  
      appliedTodAdvertisementResult.mapErr((err) => {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      });
  }

}
