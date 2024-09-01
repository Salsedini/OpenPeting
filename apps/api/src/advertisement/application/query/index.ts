
import { GetAdvertisementsQuery } from './get-advertisements.query';
import { GetAdvertisementsHandler } from './get-advertisements.handler';
import { GetAdvertisementByIdHandler } from './get-advertisement-by-id.handler';
import { GetAdvertisementByIdQuery } from './get-advertisement-by-id.query';

export const QueryHandlers = [GetAdvertisementsHandler, GetAdvertisementByIdHandler];

export const Query = [GetAdvertisementsQuery, GetAdvertisementByIdQuery];