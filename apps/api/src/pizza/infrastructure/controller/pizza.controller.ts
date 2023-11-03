import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePizzaDTO } from '@hdd-skeleton/contracts';

import { PizzaService } from '../service/pizza.service';

@Controller('pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) { }

    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) createPizzaDTO: CreatePizzaDTO) {

        const createdPizzaResult = await this.pizzaService.createPizza(createPizzaDTO);

        createdPizzaResult.mapErr(
            (err) => { throw new HttpException(err.message, HttpStatus.CONFLICT) }
        );
    }

}
