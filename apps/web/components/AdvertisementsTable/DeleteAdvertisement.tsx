import { FormEventHandler, useState } from 'react';
import { DeleteIcon } from './DeleteIcon';
import { Tooltip, Modal, ModalContent, ModalHeader, ModalBody, Button, ModalFooter } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

interface DeleteAdvertisementProps{
    advertisementId: string;
    petName: string;
}

export default function DeleteAdvertisement({ advertisementId, petName }: DeleteAdvertisementProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCloseAndDelete: FormEventHandler = async (event: any) => {
    event.preventDefault();
  
      try {
        const resp = await fetch(`http://localhost:3333/api/advertisement/${advertisementId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });
  
        if(resp.ok)toast.success('Anuncio eliminado correctamente');
  
        setTimeout(function() {
          mutate(`http://localhost:3333/api/advertisements`);
        }, 100)
        
        } catch (error) {
          console.error("Failed to delete the advertisement:", error);
        }
    
    setIsOpen(false);
}

  return (
    <>
      <Tooltip color="danger" content="Borrar anuncio">
        <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={handleOpen}>
          <DeleteIcon />
        </span>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        scrollBehavior="inside"
      >
        <ModalContent>
            <ModalHeader>Confirmar</ModalHeader>
            <ModalBody>
                ¿Estás seguro de que deseas eliminar el anuncio de {petName}?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleCloseAndDelete}>Confirmar</Button>
                <Button variant="bordered" onClick={handleClose}>Cancelar</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}