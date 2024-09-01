'use client'

import React, { FormEventHandler, useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Button, Input, Spacer} from "@nextui-org/react";
import {MailIcon} from './MailIcon';
import { LockIcon } from './LockIcon';
import { signIn} from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Login() {

  const [userCredentials, setUserCredentials] = useState({email: "", password: ""});
  const router = useRouter(); 

  const handleSubmit: FormEventHandler = async (event: any) => {
    event.preventDefault();

    const result = await signIn("credentials", {
     redirect: false,
     email:  userCredentials.email,
     password: userCredentials.password,
    });

    if (result && result.error) {
      // Handle error messages
      console.error(result.error);
    } else {
      // Redirect to the desired page after successful login
      window.location.href = "/";
    }
  };

  return(
    <>
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-[400px] w-full mx-auto">
        <CardHeader className="flex flex-col gap-1">Log in</CardHeader>
        <CardBody>
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
            Iniciar sesión
          </Button>
          <Spacer x={3}/>
          <Button color="primary" variant="ghost" onClick={() => (router.push('/Login/Register'))}>
            Registrarse
          </Button>
        </CardFooter>
      </Card>
    </div>
    </>
  );
}