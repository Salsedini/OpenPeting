'use client'

import useSWR from 'swr';
import { AdoptionAdvertisement, CaringServiceAdvertisement } from '../model';


export interface IuseCaringServiceAdvertisements {
    advertisements: CaringServiceAdvertisement[];
    isLoadingAdvertisements: boolean;
    isErrorAdvertisements: Error;
}

export interface IuseAdoptionAdvertisements {
  advertisements: AdoptionAdvertisement[];
  isLoadingAdvertisements: boolean;
  isErrorAdvertisements: Error;
}

const Advertisementfetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export function useAllAdoptionAdvertisements(): IuseCaringServiceAdvertisements{
  const { data, error, isLoading } = useSWR("http://localhost:3333/api/adoption/advertisements", Advertisementfetcher);

  return {
    advertisements: data,
    isLoadingAdvertisements: isLoading,
    isErrorAdvertisements: error,
  };

}

export function useAllCaringServiceAdvertisements(): IuseCaringServiceAdvertisements{
  const { data, error, isLoading } = useSWR("http://localhost:3333/api/caringService/advertisements", Advertisementfetcher);

  return {
    advertisements: data,
    isLoadingAdvertisements: isLoading,
    isErrorAdvertisements: error,
  };

}

export function useAllAdvertisements(): IuseCaringServiceAdvertisements{
  const { data, error, isLoading } = useSWR("http://localhost:3333/api/advertisements", Advertisementfetcher);

  return {
    advertisements: data,
    isLoadingAdvertisements: isLoading,
    isErrorAdvertisements: error,
  };

}