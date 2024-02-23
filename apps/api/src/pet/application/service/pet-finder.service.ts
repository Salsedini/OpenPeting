import { PetDTO } from 'contracts/src/lib/Pet-dtos';
import { PetId, PetName } from '../../domain/model/value_object';

export const PET_FINDER = 'PET_FINDER';

export interface PetFinder {
  findAll(): Promise<Array<PetDTO>>;
  findByName(name: PetName): Promise<Array<PetDTO>>;
  findById(id: PetId): Promise <PetDTO>;
}
