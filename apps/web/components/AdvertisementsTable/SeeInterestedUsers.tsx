import { FormEventHandler, useState } from 'react';
import { Tooltip, Modal, ModalContent, ModalHeader, ModalBody, CircularProgress, Divider, Spacer, User, Badge, Avatar, Image, Button} from '@nextui-org/react';
import { FaUser } from 'react-icons/fa';
import { useAllUsers } from 'apps/web/hooks';
import ContactInterestedUser from './ContactInterestedUser';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

interface SeeInterestedProps{
  advertisementId: string;
  interestedUsersId: string[];
  petId: string;
  acceptedUserId: string | null,
  petName: string;
}

export default function SeeInterestedUsers({ advertisementId, interestedUsersId, petId, acceptedUserId, petName }: SeeInterestedProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { users, isLoadingUsers, isErrorUsers } = useAllUsers();

  if (isErrorUsers) return <p>Failed to load users</p>;
  if (isLoadingUsers) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  const interestedUsers = users.filter(user => interestedUsersId.includes(user._id));

  const acceptedUser = users.find(user => user._id === acceptedUserId);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCloseAdvertisement: FormEventHandler = async (event: any) => {
    event.preventDefault();

    console.log('acceptedUserId', acceptedUserId);
  
    const body= {
      id: advertisementId,
      petId: petId,
      newOwnerId: acceptedUserId,
    };
  
      try {
        const resp = await fetch(`http://localhost:3333/api/close-advertisement/${advertisementId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if(resp.ok)toast.success('Anuncio cerrado correctamente');
  
        setTimeout(function() {
            mutate(`http://localhost:3333/api/advertisements`);
          }, 200)

          setIsOpen(false);
        
        } catch (error) {
          console.error("Failed close advertisement:", error);
        }
    
  }

  const tooltipContent = acceptedUserId ? "Ver usuario aceptado" : "Ver interesados";

  return (
    <>
      <Tooltip content={tooltipContent}>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50 flex items-center justify-center" onClick={handleOpen}>
        {acceptedUserId ? (
            <FaUser />
          ) : (

            <Badge className="bg-transparent" content={interestedUsers.length} color="default" placement="top-left" size="md" showOutline={false}>
              <FaUser />
            </Badge>
          )}
        </span>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        scrollBehavior="inside"
      >
        <ModalContent>
          {acceptedUserId ? (<ModalHeader>Usuario aceptado</ModalHeader>) : (<ModalHeader>Usuarios interesados en el anuncio de {petName}</ModalHeader>)}
          <ModalBody>
          {acceptedUserId ? (
            <>
            <div className="mt-2 flex items-center gap-2">
                <Image
                  alt="Foto de perfil"
                  className="rounded-full"
                  src={acceptedUser?.picture}
                  width={150} />
                <ul className="text-lg font-bold">
                  <li>Nombre y apellidos: <span className="font-normal italic">{acceptedUser?.name} {acceptedUser?.surname}</span></li>
                  <Spacer y={3} />
                  <li>Correo: <span className="font-normal italic">{acceptedUser?.email}</span></li>
                  <Spacer y={3} />
                  <li>Teléfono: <span className="font-normal italic">{acceptedUser?.phone}</span></li>
                </ul>
              </div><div className="flex justify-center items-center w-full mt-4">
                  <Button color="danger" size="md" variant="flat" onClick={handleCloseAdvertisement}>
                    Cerrar anuncio
                  </Button>
                </div>
              </>
          ) : interestedUsers.length > 0 ? (
              <ul>
                {interestedUsers.map((user, index) => (
                  <div key={user._id}>
                    <li className="flex items-center space-x-2"> 
                    <Avatar
                      className="transition-transform"
                      color="secondary"
                      name={user.name}
                      size="lg"
                      src={user.picture}
                    /> 
                    <span className="flex-grow flex items-center justify-between">
                      {user.name} {user.surname}
                      <ContactInterestedUser
                        userId={user._id}
                        userName={user.name}
                        userSurname={user.surname}
                        userMail={user.email}
                        userPhone={user.phone}
                        userPicture={user.picture}
                        advertisementId={advertisementId}
                      />
                    </span>
                    </li>
                    {index < interestedUsers.length - 1 ? (
                      <Divider className="my-4" />
                    ) : (
                      <Spacer y={3} />
                    )}
                  </div>
                ))}
              </ul>
            ) : (
              <><p className='flex items-center align-center'>Todavía no hay usuarios interesados</p><Spacer y={3} /></>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}