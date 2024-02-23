import { GetUserByNameQuery } from "./get-user-by-name.query";
import { GetUserByNameHandler } from "./get-user-by-name.handler";

import { GetUsersQuery } from "./get-users.query";
import { GetUsersHandler } from "./get-users.handler";
import { GetUserByIdHandler } from "./get-user-by-id.handler";
import { GetUserByIdQuery } from './get-user-by-id.query';

export const QueryHandlers = [
    GetUserByNameHandler,
    GetUsersHandler,
    GetUserByIdHandler
];

export const Query = [
    GetUserByNameQuery, 
    GetUsersQuery, 
    GetUserByIdQuery
];