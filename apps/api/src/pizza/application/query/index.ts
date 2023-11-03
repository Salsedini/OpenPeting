import { GetPizzaByNameQuery } from "./get-pizza-by-name.query";
import { GetPizzaByNameHandler } from "./get-pizza-by-name.handler";

import { GetPizzasQuery } from "./get-pizzas.query";
import { GetPizzasHandler } from "./get-pizzas.handler";

export const QueryHandlers = [
    GetPizzaByNameHandler, GetPizzasHandler
];

export const Query = [
    GetPizzaByNameQuery, GetPizzasQuery
];