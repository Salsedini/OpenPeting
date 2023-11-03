import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PizzaDTO } from '@hdd-skeleton/contracts';
import { Model } from 'mongoose';

import { PizzaFinder } from '../../application/service/pizza-finder.service';
import { PizzaName } from '../../domain/model/value_object';
import { PIZZA_PROJECTION, PizzaDocument } from '../projection';

@Injectable()
export class MongoDBPizzaFinder implements PizzaFinder {
    constructor(
        @InjectModel(PIZZA_PROJECTION)
        private readonly pizzaProjection: Model<PizzaDocument>,
    ) { }

    findAll(): Promise<PizzaDTO[]> {
        return this.pizzaProjection.find().exec();
    }

    findByName(name: PizzaName): Promise<Array<PizzaDTO>> {
        return this.pizzaProjection.find({ name: name.value }).exec();
    }
}
