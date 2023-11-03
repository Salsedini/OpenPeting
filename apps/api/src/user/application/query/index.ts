import { GetUserByNameQuery } from "./get-user-by-name.query";
import { GetUserByNameHandler } from "./get-user-by-name.handler";

import { GetUsersQuery } from "./get-users.query";
import { GetUsersHandler } from "./get-users.handler";

export const QueryHandlers = [
    GetUserByNameHandler, GetUsersHandler
];

export const Query = [
    GetUserByNameQuery, GetUsersQuery
];