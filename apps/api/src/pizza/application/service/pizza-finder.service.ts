import { PizzaDTO } from '@hdd-skeleton/contracts';
import { PizzaName } from '../../domain/model/value_object';

export const PIZZA_FINDER = 'PIZZA_FINDER';

export interface PizzaFinder {
  findAll(): Promise<Array<PizzaDTO>>;
  findByName(name: PizzaName): Promise<Array<PizzaDTO>>;
}
