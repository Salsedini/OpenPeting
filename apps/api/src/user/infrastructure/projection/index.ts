import { UserWasCreatedProjection } from './user-was-created.projection';
import { UserNameWasUpdatedProjection } from './user-name-was-updated.projection';
import { UserWasDeletedProjection } from './user-was-deleted.projection';
import { UserSurnameWasUpdatedProjection } from './user-surname-was-updated.projection';
import { UserPhoneWasUpdatedProjection } from './user-phone-was-updated.projection';
import { UserMailWasUpdatedProjection } from './user-mail-was-updated.projection';
import { UserPictureWasUpdatedProjection } from './user-picture-was-updated.projection';

export * from './user.schema';

export const ProjectionHandlers = [
    UserWasCreatedProjection,
    UserWasDeletedProjection,
    UserNameWasUpdatedProjection,
    UserSurnameWasUpdatedProjection,
    UserPhoneWasUpdatedProjection,
    UserMailWasUpdatedProjection,
    UserPictureWasUpdatedProjection
];
