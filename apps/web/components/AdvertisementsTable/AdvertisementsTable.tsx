'use client'

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip, CircularProgress } from "@nextui-org/react";
import { useAllAdvertisements, useAllPets } from "apps/web/hooks";
import { CaringServiceAdvertisement } from "apps/web/model";
import { useSession } from "next-auth/react";
import DeleteAdvertisement from "./DeleteAdvertisement";
import SeeInterestedUsers from "./SeeInterestedUsers";
import AdvertisementInfo from "./AdvertisementInfo";

const columns = [
  {name: "NOMBRE DE LA MASCOTA", uid: "name"},
  {name: "TIPO DE ANUNCIO", uid: "type"},
  {name: "OPCIONES", uid: "options"},
];

interface AdvertisementPets extends CaringServiceAdvertisement {
  petId: string;
  petName: string;
  petPicture: string;
}

export default function AdvertisementsTable() {

  const { data: session } = useSession();

  const { advertisements, isLoadingAdvertisements, isErrorAdvertisements } = useAllAdvertisements();
  const { pets, isLoadingPets, isErrorPets } = useAllPets();

  if (isErrorAdvertisements) return <p>Failed to load advertisements</p>;
  if (isLoadingAdvertisements) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  if (isErrorPets) return <p>Failed to load pets</p>;
  if (isLoadingPets) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  const id = session?.user?.email;
  const filteredAdvertisements = advertisements.filter(ad => ad.ownerId === id);

  const mergedAdvertisementsPets: AdvertisementPets[] = filteredAdvertisements
  .map(ad => {
    const pet = pets.find(pet => pet._id === ad.petId);
    if (!pet) return null;
    
    return {
      ...ad,
      petId: pet._id,
      petName: pet.name,
      petPicture: pet.picture
    };
  })
  .filter((ad): ad is AdvertisementPets => ad !== null);

  const renderCell = (advertisementPets: AdvertisementPets, columnKey: string | number) => {

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: advertisementPets.petPicture}}
            name={advertisementPets.petName}
          >
            <span>Hola</span>
          </User>
        );
      case "type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {advertisementPets.type === 'CARING_SERVICE' ? 'Acogida' : 'Adopción'}
            </p>
          </div>
        );  
    case "options":
        return (
          <div className="relative flex items-center gap-2">
            <SeeInterestedUsers 
              advertisementId={advertisementPets._id}
              petId={advertisementPets.petId}
              interestedUsersId={advertisementPets.interestedUsersId}
              acceptedUserId={advertisementPets.acceptedUserId}
              petName={advertisementPets.petName}
            />
            <AdvertisementInfo 
              advertisementType={advertisementPets.type}
              petName={advertisementPets.petName}
              petPicture={advertisementPets.petPicture}
              advertisementCity={advertisementPets.city}
              advertisementPrice={advertisementPets.price}
              startDate={advertisementPets.start}
              endDate={advertisementPets.end}
            />
            <DeleteAdvertisement advertisementId={advertisementPets._id} petName={advertisementPets.petName}/>
          </div>
        );
      default:
        return <p>Cell not found</p>
    }
  };

  return (
  <div className="flex justify-center items-center min-h-screen">
  <Table aria-label="Example table with custom cells" className="w-3/5 items-center">
      <TableHeader className="flex flex-col justify-center items-center" columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody className="flex flex-col justify-center items-center" items={mergedAdvertisementsPets}>
        {(AdPets) => (
          <TableRow key={AdPets._id}>
              {(columnKey) => <TableCell>{renderCell(AdPets, columnKey)}</TableCell>}
          </TableRow>
        
        )}
      </TableBody>
    </Table>
    </div>
  );
}