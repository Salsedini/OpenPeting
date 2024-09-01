'use client'

import useSWR from 'swr';
import { Pet } from '../model';


export interface IusePets {
    pets: Pet[];
    isLoadingPets: boolean;
    isErrorPets: Error;
}

export interface IusePet{
  pet: Pet;
  isLoadingPets: boolean;
  isErrorPets: Error;
}


const Petfetcher = (url: string) =>
  fetch(url).then((res) => res.json());



export function useAllPets(): IusePets{
  const { data, error, isLoading } = useSWR("http://localhost:3333/api/pets", Petfetcher);

  return {
    pets: data,
    isLoadingPets: isLoading,
    isErrorPets: error,
  };

}

export function usePetById(id: string): IusePet{
  const { data, error, isLoading } = useSWR(`http://localhost:3333/api/pet/${id}`, Petfetcher);

  return {
    pet: data,
    isLoadingPets: isLoading,
    isErrorPets: error,
  };

}