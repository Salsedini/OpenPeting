import { AdvertisementCityWasUpdatedProjection } from './advertisement-city-was-updated.projection';
import { AdvertisementStartDateWasUpdatedProjection } from './advertisement-start-date-was-updated-projection';
import { AdvertisementPriceWasUpdatedProjection } from './advertisement-price-was-updated-projection';
import { AdvertisementWasCreatedProjection } from './advertisement-was-created.projection';
import { AdvertisementWasDeletedProjection } from './advertisement-was-deleted.projection';
import { AdvertisementEndDateWasUpdatedProjection } from './advertisement-end-date-was-updated-projection';
import { AdvertisementInterestedUsersWasUpdatedProjection } from './advertisement-interested-users-was-updated.projection';
import { InterestedUsersWasRejectedProjection } from './interested-user-was-rejected.projection';
import { AcceptedUserIdWasUpdatedProjection } from './accepted-user-was-updated.projection';

export * from './advertisement.schema';

export const ProjectionHandlers = [
  AdvertisementWasCreatedProjection,
  AdvertisementWasDeletedProjection,
  AdvertisementCityWasUpdatedProjection,
  AdvertisementPriceWasUpdatedProjection,
  AdvertisementStartDateWasUpdatedProjection,
  AdvertisementEndDateWasUpdatedProjection,
  AdvertisementInterestedUsersWasUpdatedProjection,
  InterestedUsersWasRejectedProjection,
  AcceptedUserIdWasUpdatedProjection,
];
