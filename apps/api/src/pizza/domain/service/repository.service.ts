import { PizzaName } from "../model/value_object";

export interface PizzaRepository<Pizza, PizzaId> {
    find(id: PizzaId): Promise<Pizza>;
    save(pizza: Pizza): void;
}
