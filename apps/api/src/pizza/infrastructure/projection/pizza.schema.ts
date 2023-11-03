import { PizzaDTO } from '@hdd-skeleton/contracts';
import { Document, Schema } from 'mongoose';

export const PIZZA_PROJECTION = 'pizza';

export type PizzaDocument = PizzaDTO & Document;

export const PizzaSchema = new Schema(
    {
        _id: String,
        name: String,
    },
    {
        versionKey: false,
    },
);
