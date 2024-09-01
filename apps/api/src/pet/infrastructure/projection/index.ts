import { PetAgeWasUpdatedProjection } from './pet-age-was-updated.projection';
import { PetDescriptionWasUpdatedProjection } from './pet-description-was-updated.projection';
import { PetNameWasUpdatedProjection } from './pet-name-was-updated.projection';
import { PetOwnerIdWasUpdatedProjection } from './pet-owner-id-was-updated.projection';
import { PetPictureWasUpdatedProjection } from './pet-picture-was-updated.projection';
import { PetSizeWasUpdatedProjection } from './pet-size-was-updated.projection';
import { PetWasCreatedProjection } from './pet-was-created.projection';
import { PetWasDeletedProjection } from './pet-was-deleted.projection';

export * from './pet.schema';

export const ProjectionHandlers = [
    PetWasCreatedProjection,
    PetNameWasUpdatedProjection,
    PetSizeWasUpdatedProjection,
    PetAgeWasUpdatedProjection,
    PetPictureWasUpdatedProjection,
    PetDescriptionWasUpdatedProjection,
    PetWasDeletedProjection,
    PetOwnerIdWasUpdatedProjection,
];
