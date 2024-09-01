import { GetUserByNameQuery } from "./get-user-by-name.query";
import { GetUserByNameHandler } from "./get-user-by-name.handler";

import { GetUsersQuery } from "./get-users.query";
import { GetUsersHandler } from "./get-users.handler";
import { GetUserByIdHandler } from "./get-user-by-id.handler";
import { GetUserByIdQuery } from './get-user-by-id.query';
import { GetUserByEmailHandler } from "./get-user-by-email.handler";
import { GetUserByEmailQuery } from "./get-user-by-email.query";


export const QueryHandlers = [
    GetUserByNameHandler,
    GetUsersHandler,
    GetUserByIdHandler,
    GetUserByEmailHandler
];

export const Query = [
    GetUserByNameQuery, 
    GetUsersQuery, 
    GetUserByIdQuery,
    GetUserByEmailQuery
];