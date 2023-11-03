import {
    Body,
    Controller,
    Get,
    HttpCode,
    ValidationPipe,
} from '@nestjs/common';
import { GetAllPizzasDTO } from '@hdd-skeleton/contracts';

import { PizzaService } from '../service/pizza.service';

@Controller('pizzas')
export class PizzasController {
    constructor(private readonly pizzaService: PizzaService) { }

    @Get()
    @HttpCode(200)
    async get(@Body(new ValidationPipe()) getAllPizzasDTO: GetAllPizzasDTO) {
        return await this.pizzaService.getPizzas(getAllPizzasDTO);

    }

}
