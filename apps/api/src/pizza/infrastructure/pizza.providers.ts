import { PIZZA_FINDER } from '../application/service/pizza-finder.service';
import { MongoDBPizzaFinder } from '../infrastructure/service/pizza-finder.service';

export const PizzaProviders = [
    {
        provide: PIZZA_FINDER,
        useClass: MongoDBPizzaFinder,
    }
];
