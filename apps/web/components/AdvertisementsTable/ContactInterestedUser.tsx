'use client'

import React, { FormEventHandler } from "react";
import { Button, Popover, PopoverContent, PopoverTrigger, Image, Spacer } from "@nextui-org/react";
import toast from "react-hot-toast";
import { mutate } from "swr";

interface UserContactInfoProps{
    userId: string;
    userName: string;
    userSurname: string;
    userPhone: number;
    userMail: string;
    userPicture: string;
    advertisementId: string;
}

export default function ContactInterestedUser({ userId, userName, userSurname, userPhone, userMail, userPicture, advertisementId }: UserContactInfoProps) {

  const [isOpen, setIsOpen] = React.useState(false);

  const handleAcceptUser: FormEventHandler = async (event: any) => {
    event.preventDefault();
  
    const body= {
      acceptedUserId: userId,
    };
  
      try {
        const resp = await fetch(`http://localhost:3333/api/accept-interested-user/${advertisementId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if(resp.ok)toast.success('Usuario aceptado correctamente');
  
        setTimeout(function() {
            mutate(`http://localhost:3333/api/advertisements`);
          }, 150)

          setIsOpen(false);
        
        } catch (error) {
          console.error("Failed to accept user:", error);
        }
    
  }

  const handleRejectUser: FormEventHandler = async (event: any) => {
    event.preventDefault();
  
    const body= {
      interestedUserId: userId,
    };
  
      try {
        const resp = await fetch(`http://localhost:3333/api/reject-interested-user/${advertisementId}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if(resp.ok)toast.success('Usuario rechazado correctamente');
  
        setTimeout(function() {
            mutate(`http://localhost:3333/api/advertisements`);
          }, 150)

          setIsOpen(false);
        
        } catch (error) {
          console.error("Failed to reject user:", error);
        }
    
  }
  
    const content = (
      <PopoverContent className="w-auto">
          <div className="flex flex-col items-center px-1 py-2 w-full">
            <h1 className="font-bold">Información de contacto</h1>
            <div className="mt-2 flex items-center gap-2">
            <Image
                alt="Foto de perfil"
                className="rounded-full"
                src={userPicture}
                width={150}
            />
            <ul className="text-lg font-bold">
              <li>Nombre y apellidos: <span className="font-normal italic">{userName} {userSurname}</span></li>
              <Spacer y={3} />
              <li>Correo: <span className="font-normal italic">{userMail}</span></li>
              <Spacer y={3} />
              <li>Teléfono: <span className="font-normal italic">{userPhone}</span></li>
            </ul>
            </div>
            <div className="flex justify-center items-center w-full mt-4">
            <Button color="success" size="md" variant="flat" onClick={handleAcceptUser}>
              Aceptar 
            </Button>
            <Spacer x={5} />
            <Button color="danger" size="md" variant="flat" onClick={handleRejectUser}>
              Rechazar
            </Button>
          </div>
          </div>      
      </PopoverContent>
    )
  
    return (
          <Popover
            isOpen={isOpen}
            onOpenChange={(open) => setIsOpen(open)}
            key="blur"
            showArrow
            offset={10}
            triggerType="listbox"
            placement="bottom"    
            backdrop="blur"
          >
            <PopoverTrigger>
              <Button color="primary" variant="ghost" className="capitalize">
                Contacto
              </Button>
            </PopoverTrigger>
            {content}
          </Popover>
    );
  }