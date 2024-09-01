import React from "react";
import {Card, CardBody, CircularProgress, Image, Spacer } from "@nextui-org/react";
import MilloPath from './Millo.png'
import { FaVenus, FaMars } from 'react-icons/fa';
import InterestButton from "./InterestButton";
import { useAllCaringServiceAdvertisements } from "apps/web/hooks";
import { useAllPets } from "apps/web/hooks/petHooks";
import { CaringServiceAdvertisement, Pet } from "apps/web/model";
import { useSession } from "next-auth/react";


interface AdvertisementPets extends CaringServiceAdvertisement {
  pet: Pet;
}

function CaringServicePetCard({ AdPet, size, userId}: { AdPet: AdvertisementPets, size: string | null, userId: string }) {

  const startDate = new Date(AdPet.start).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) 
  const endDate = new Date(AdPet.end).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="flex justify-center items-center mb-4">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] justify-center"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                src={AdPet.pet.picture}
                alt="Imagen de la mascota"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <Spacer y={3} />
                  <h3 className="font-semibold text-foreground/90">Nombre: <span className="font-normal italic">{AdPet.pet.name}</span></h3>
                  <Spacer y={1} />
                  <h3 className="font-semibold text-foreground/90">Edad: <span className="font-normal italic">{AdPet.pet.age}</span></h3>
                  <Spacer y={1} />
                  <h3 className="font-semibold text-foreground/90">Tamaño: <span className="font-normal italic">{size}</span></h3>
                  <Spacer y={1} />
                  <p className="font-semibold text-foreground/90">Desde el <span className="font-normal italic">{startDate}</span> hasta el <span className="font-normal italic">{endDate}</span></p>
                  <Spacer y={1} />
                  <h3 className="font-semibold text-foreground/90">Pago: <span className="font-normal italic">{AdPet.price}€</span></h3>
                  <Spacer y={1} />
                  <p className="text-small text-foreground/80">Descripción: {AdPet.pet.description}</p>
                  <Spacer y={1} />
                </div>
                {AdPet.pet.gender === 'MALE' ? <FaMars size={30} /> : <FaVenus size={30} />}
              </div>
              <Spacer y={3} />
              <div className="flex w-full items-center justify-end">
                <InterestButton interestedUsers={AdPet.interestedUsersId} advertisementId={AdPet._id}/>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function CaringServiceSearchResultBox({ size, type, city }: { size: string | null, type: string | null, city: string | null }) {
  const { data: session } = useSession();
  const userId = session?.user?.email ?? '';
  
  const mappedSize = size === 'Pequeño' ? 'SMALL' : size === 'Mediano' ? 'MEDIUM' : 'BIG';
  const mappedType = type === 'Perro' ? 'DOG' : 'CAT';

  const { advertisements, isLoadingAdvertisements, isErrorAdvertisements } = useAllCaringServiceAdvertisements();
  const { pets, isLoadingPets, isErrorPets } = useAllPets();
  
  if (isErrorAdvertisements) return <p>Failed to load advertisements</p>;
  if (isLoadingAdvertisements) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  const filteredAdvertisement = advertisements.filter(ad => ad.city === city && userId !== ad.ownerId);

  if (isErrorPets) return <p>Failed to load pets</p>;
  if (isLoadingPets) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;


  const mergedAdvertisementsPets: AdvertisementPets[] = filteredAdvertisement.map(ad => ({
    ...ad,
    pet: pets.find(pet => pet._id === ad.petId)!
  })).filter(ad => ad.pet); 

  const filteredPets = mergedAdvertisementsPets.filter(ad => ad.pet.size === mappedSize && ad.pet.type === mappedType);


  return (
    <div className="flex flex-col justify-center items-center">
      <Spacer y={8} />
      {filteredPets.length > 0 ? filteredPets.map(pet => (
        <CaringServicePetCard userId={userId} key={pet._id} AdPet={pet} size={size}/>
      )) : <p>No pets found</p>}
    </div>
  );
}
