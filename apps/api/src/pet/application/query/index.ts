import { GetPetByNameQuery } from "./get-pet-by-name.query";
import { GetPetByNameHandler } from "./get-pet-by-name.handler";

import { GetPetsQuery } from "./get-pets.query";
import { GetPetsHandler } from "./get-pets.handler";
import { GetPetByIdHandler } from "./get-pet-by-id.handler";
import { GetPetByIdQuery } from './get-pet-by-id.query';

export const QueryHandlers = [
    GetPetByNameHandler, GetPetsHandler, GetPetByIdHandler
];

export const Query = [
    GetPetByNameQuery, GetPetsQuery, GetPetByIdQuery
];