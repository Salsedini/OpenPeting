'use client'

import React from "react";
import { Card, CardBody, Image, Button, CircularProgress, Spacer } from "@nextui-org/react";
import MilloPath from './Millo.png';
import { FaVenus, FaMars } from 'react-icons/fa';
import { useSession } from "next-auth/react";


import EditPet from "./EditPet";
import DeletePet from "./DeletePet";
import CreatePet from "./CreatePet";
import { useAllPets } from "apps/web/hooks";

export default function PetBox() {
  const { data: session } = useSession();
  const { pets, isLoadingPets, isErrorPets } = useAllPets();

  if (isErrorPets) return <p>Failed to load pets</p>;
  if (isLoadingPets) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  const userId = session?.user?.email;
  const filteredPets = pets.filter(pet => pet.ownerId === userId);

  const mapSize = (size: string) => {
    switch (size) {
      case 'SMALL':
        return 'Pequeño';
      case 'MEDIUM':
        return 'Mediano';
      case 'BIG':
        return 'Grande';
      default:
        return size; 
    }
  };
  

  return (
    <>
      <Spacer y={10} />
      <div className="flex justify-center items-center">
        <CreatePet />
      </div>
      <Spacer y={10} />
      <div className="flex flex-col items-center gap-4">
        {filteredPets.map((pet, index) => (
          
          <><Card
            key={index}
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] justify-center"
            shadow="sm"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    src={pet.picture}
                    alt={`Imagen de la mascota ${pet.name}`} 
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-foreground/90">Nombre: <span className="font-normal italic">{pet.name}</span></h3>
                      <h3 className="font-semibold text-foreground/90">Edad: <span className="font-normal italic">{pet.age}</span></h3>
                      <h3 className="font-semibold text-foreground/90">Tamaño: <span className="font-normal italic">{mapSize(pet.size)}</span></h3>
                      <p className="text-small text-foreground/80">Descripción: {pet.description}</p>
                    </div>
                    {pet.gender === 'FEMALE' ? <FaVenus size={30} /> : <FaMars size={30} />}
                  </div>

                  <div className="flex w-full items-center justify-end">
                    <EditPet petId={pet._id} name={pet.name} size={pet.size} age={pet.age} description={pet.description} petPicture={pet.picture}/>
                    <DeletePet petId={pet._id} name={pet.name} />
                  </div>
                </div>
              </div>
            </CardBody>

          </Card>
          <Spacer y={3} /></>
        ))}
      </div>
    </>
  );
}
