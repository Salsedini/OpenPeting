'use client';

import {
  useDisclosure,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { mutate } from 'swr';

interface EditProfileProps {
  userId: string;
  name: string;
  surname: string;
  phone: number;
  email: string;
  userPicture: string;
}

export default function EditProfile({ userId, name, surname, phone, email, userPicture }: EditProfileProps) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = useState({
    name: name,
    surname: surname,
    phone: phone,
    email: email,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const picture = userPicture ? userPicture : "httpalgo";
    const body = {
      name: formData.name,
      surname: formData.surname,
      phone: formData.phone,
      email: formData.email,
      picture,
    };

    try {
      const resp = await fetch(`http://localhost:3333/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      
      setTimeout(function() {
        mutate(`http://localhost:3333/api/user/${userId}`);
      }, 100)
      
    
    } catch (error) {

      console.error("Failed to update profile:", error);
      
    }
  };

  const content = (
    <div className="flex flex-col items-center gap-4">
      <Input
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        label="Apellidos"
        name="surname"
        value={formData.surname}
        onChange={handleChange}
      />
      <Input
        label="Teléfono"
        name="phone"
        value={String(formData.phone)}
        onChange={handleChange}
      />
      <Input
        label="Correo"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <>
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <Button color="primary" onPress={onOpen}>
            Editar perfil
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Editar Perfil
                  </ModalHeader>
                  <ModalBody>{content}</ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" onClick={handleSubmit} onPress={onClose}>
                      Guardar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
