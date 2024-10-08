import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePetDTO, GetAllPetsDTO, UpdatePetDTO } from 'contracts/src/lib/Pet-dtos';

import { PetService } from '../service/pet.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pets')
@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOperation({ summary: 'Gets a pet by id' })
  @ApiCreatedResponse({
    description: 'Pet sent',
    type: GetAllPetsDTO,
  })
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    
    return await this.petService.getPetById(id);

  }

  @ApiOperation({ summary: 'Creates a Pet' })
  @ApiCreatedResponse({
    description: 'Pet created',
    type: CreatePetDTO,
  })
  @Post()
  @HttpCode(200)
  async create(@Body(new ValidationPipe()) createPetDTO: CreatePetDTO) {
    const createdPetResult = await this.petService.createPet(createPetDTO);

    createdPetResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }

  @ApiOperation({ summary: 'Updates a Pet' })
  @ApiCreatedResponse({
    description: 'Pet edited',
    type: UpdatePetDTO,
  })
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePetDTO: UpdatePetDTO
  ) {
    const params = { id, fieldsToUpdate: updatePetDTO };

    const updatedPetResult = await this.petService.updatePet(params);

    updatedPetResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }

  @ApiOperation({ summary: 'Deletes a Pet' })
  @ApiCreatedResponse({
    description: 'Pet deleted',
  })
  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    const deletedPetResult = await this.petService.deletePet(id);

    deletedPetResult.mapErr((err) => {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    });
  }
}
