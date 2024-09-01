'use client'

import React from "react";
import { Button, Spacer, Image, useDisclosure, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, CircularProgress, Badge, Divider, Tooltip } from "@nextui-org/react";
import ContactInfo from "./ContactInfo";
import { useAllAdvertisements, useAllPets, useAllUsers } from "apps/web/hooks";
import { CaringServiceAdvertisement, Pet, User } from "apps/web/model";
import { FaBell } from "react-icons/fa6";

interface NotifificationsProps{
  userId: string | null | undefined;
}

interface AdvertisementPets extends CaringServiceAdvertisement {
    pet: Pet;
    user: User;
}

export default function Notifications({userId}: NotifificationsProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { advertisements, isLoadingAdvertisements, isErrorAdvertisements } = useAllAdvertisements();
  const { pets, isLoadingPets, isErrorPets } = useAllPets();
  const { users, isLoadingUsers, isErrorUsers } = useAllUsers();

  if (isErrorAdvertisements) return <p>Failed to load advertisements</p>;
  if (isLoadingAdvertisements) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  if (isErrorPets) return <p>Failed to load pets</p>;
  if (isLoadingPets) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  if (isErrorUsers) return <p>Failed to load users</p>;
  if (isLoadingUsers) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  const filteredAdvertisements = advertisements.filter(ad => ad.acceptedUserId === userId);

  const mergedAdvertisementsPets: AdvertisementPets[] = filteredAdvertisements.map(ad => {
    const pet = pets.find(p => p._id === ad.petId);
    const user = users.find(u => u._id === ad.ownerId);

    return {
      ...ad,
      pet: pet!,
      user: user!
    };
  }).filter(ad => ad.pet && ad.user);

  const content = filteredAdvertisements.length > 0 ? (
    mergedAdvertisementsPets.map((ad, index) => {

      let message = `Han aceptado tu petición de ${
        ad.type === 'CARING_SERVICE' ? 'acoger' : 'adoptar'
      } a ${ad.pet.name}`;
  
      if (ad.type === 'CARING_SERVICE') {
        const startDate = new Date(ad.start).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        const endDate = new Date(ad.end).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        message += ` del ${startDate} al ${endDate}`;
      }
  
      return (
        <div key={ad._id} className="px-1 py-2 w-full">
          <div className="mt-2 flex flex-col justify-center items-center gap-2">
            <Image
              alt="Foto de perfil"
              className="rounded-full"
              src={ad.pet.picture}
              width={75}
              height={75}
            />
            <div>
              {message}
            </div>
          </div>
          <Spacer y={2} />
          <ContactInfo 
            userName={ad.user.name}
            userSurname={ad.user.surname}
            userMail={ad.user.email}
            userPhone={ad.user.phone}
            userPicture={ad.user.picture}
          />
          <Spacer y={2}/>
          <Divider />
        </div>
      );
    })
  ) : (
    <p>Todavía no hay notificaciones</p>
  );

  return( 
      <>
          <div className="flex gap-4 justify-center items-center">
          <Tooltip color="warning" content="Notificaciones">
            <Button color="warning" variant="flat" className="capitalize" onPress={onOpen}>
              <FaBell size={20} />
            </Button>
          </Tooltip>              
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                      {(onClose) => (
                          <>
                              <ModalHeader className="flex flex-col gap-1">Notificaciones</ModalHeader>
                              <ModalBody>
                              {content}
                              </ModalBody>
                              <ModalFooter>
                                  <Button color="danger" variant="light" onPress={onClose}>
                                      Volver
                                  </Button>
                              </ModalFooter>
                          </>
                      )}
                  </ModalContent>
              </Modal>
          </div>
      </>
  )
}