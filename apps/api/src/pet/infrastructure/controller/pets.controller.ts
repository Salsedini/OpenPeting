import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ValidationPipe,
} from '@nestjs/common';
import { GetAllPetsDTO } from 'contracts/src/lib/Pet-dtos';

import { PetService } from '../service/pet.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petService: PetService) {}

  @ApiOperation({ summary: 'Get all Pets' })
  @ApiCreatedResponse({
    description: 'Pets received',
    type: [GetAllPetsDTO],
  })
  @Get()
  @HttpCode(200)
  async get(@Param(new ValidationPipe()) getAllPetsDTO: GetAllPetsDTO) {
    return await this.petService.getPets(getAllPetsDTO);
  }

}
