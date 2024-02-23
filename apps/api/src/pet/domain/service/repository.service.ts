import { Pet } from "../model";


export interface PetRepository<Pet, PetId> {
    delete(pet: Pet): unknown;
    find(id: PetId): Promise<Pet> | null;
    save(pet: Pet): void;
}
