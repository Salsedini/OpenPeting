'use client'

import React, { FormEventHandler, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Button, Input, Spacer} from "@nextui-org/react";
import {MailIcon} from './MailIcon';
import { LockIcon } from './LockIcon';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {

  const [userCredentials, setUserCredentials] = useState({name: "", surname: "", email: "", password: ""});
  const router = useRouter(); 

  const handleSubmit: FormEventHandler = async (event: any) => {
    event.preventDefault();

    const role="ROLE_USER";
    const body= {
      name: userCredentials.name,
      surname: userCredentials.surname,
      password: userCredentials.password,
      email: userCredentials.email,
      role: role,
    };

    try {
      const resp = await fetch(`http://localhost:3333/api/user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if(resp.ok)toast.success('Usuario creado correctamente');

      router.push('/');
      
      } catch (error) {
        console.error("Failed to create an user:", error);
      }

    }

  return(
    <>
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-[400px] w-full mx-auto">
        <CardHeader className="flex flex-col gap-1">Registrar usuario</CardHeader>
        <CardBody>
          <Input
            name="name"
            label="Nombre"
            variant="bordered"
            value={userCredentials.name}
            onChange={({target})=> setUserCredentials({...userCredentials, name: target.value})}
          />
          <Spacer y={3} />  
          <Input
            name="surname"
            label="Apellidos"
            variant="bordered"
            value={userCredentials.surname}
            onChange={({target})=> setUserCredentials({...userCredentials, surname: target.value})}
          />
          <Spacer y={3} />  
          <Input
            autoFocus
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            value={userCredentials.email}
            onChange={({target})=> setUserCredentials({...userCredentials, email: target.value})}
          />
          <Spacer y={3} />  
          <Input
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
            value={userCredentials.password}
            onChange={({target})=> setUserCredentials({...userCredentials, password: target.value})}
          />
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onClick={handleSubmit} color="primary" variant="ghost">
            Crear usuario
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
  );
}