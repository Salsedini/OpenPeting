'use client'

import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CircularProgress, Image, Spacer } from '@nextui-org/react';
import NotificationsPopOver from './Notifications';
import EditProfile from './EditProfile';
import { useGetUserById } from 'apps/web/hooks';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Notifications from './Notifications';

export default function Profile() {
    const { data: session } = useSession();

    const userId = session?.user?.email;

    const { user, isLoadingUser, isErrorUser } = useGetUserById(userId);

    if (isErrorUser) return <p>Failed to load user</p>;
    if (isLoadingUser) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

    const router = useRouter(); 

  return (
    <div className="flex justify-center items-center h-screen">
            <div className="text-center w-1/5">
                <Card>
                    <CardBody className="flex flex-col items-center max-w-md mx-auto">
                        <Image
                            alt="Foto de perfil"
                            className="rounded-full"
                            src={user.picture}
                            width={150}
                        />
                        <Spacer y={5} />
                        <ul className="text-lg font-bold">
                            <li>Nombre: {user.name}</li>
                            <Spacer y={3} />
                            <li>Apellidos: {user.surname}</li>
                            <Spacer y={3} />
                            <li>Teléfono: {user.phone}</li>
                            <Spacer y={3} />
                            <li>Correo: {user.email}</li>
                        </ul>
                        <Spacer y={4} />
                        <div className="flex justify-center items-center w-1/5">
                            <p>
                                <EditProfile 
                                    userId={user._id}
                                    name={user.name} 
                                    surname={user.surname} 
                                    phone={user.phone}
                                    email={user.email} 
                                    picture={user.picture}
                                />
                            </p>
                            <Spacer x={3} />
                            <p>
                                <NotificationsPopOver userId={userId}/>
                            </p>
                        </div>
                    </CardBody>
                </Card>
                <Spacer y={4} />
                <div className="flex justify-center items-center w-full">
                    <ButtonGroup>
                        <Button onClick={() => router.push('/Profile/Advertisements')} variant="faded">Mis anuncios</Button>
                        <Button onClick={() => router.push('/Profile/Pets')} variant="faded">Mis mascotas</Button>
                    </ButtonGroup>
                </div>
                <Spacer y={6} />
            </div>
        </div>
  );
}

