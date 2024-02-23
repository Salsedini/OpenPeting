import { PET_FINDER } from '../application/service/pet-finder.service';
import { MongoDBPetFinder } from './service/pet-finder.service';

export const PetProviders = [
    {
        provide: PET_FINDER,
        useClass: MongoDBPetFinder,
    }
];
