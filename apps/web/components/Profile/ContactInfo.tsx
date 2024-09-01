'use client'

import React from "react";
import { Button, Popover, PopoverContent, PopoverTrigger, Image, Spacer, CircularProgress } from "@nextui-org/react";
import { useGetUserById } from "apps/web/hooks";

interface ContactInfoProps{
  userName: string;
  userSurname: string;
  userMail: string;
  userPhone: number;
  userPicture: string;
}

export default function ContactInfo({userName , userSurname, userMail, userPhone, userPicture}: ContactInfoProps) {

    const [isOpen, setIsOpen] = React.useState(false);
  
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
          </div> 
      </PopoverContent>
    )
  
    return (
      <div className="flex flex-wrap gap-4 justify-center">
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
              <Button color="primary" variant="flat" className="capitalize">
                Información de contacto
              </Button>
            </PopoverTrigger>
            {content}
          </Popover>
        
      </div>
    );
  }