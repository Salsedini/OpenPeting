import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tooltip } from "@nextui-org/react";
import { FormEventHandler, useState } from "react";
import { DeleteIcon } from "./DeleteIcon";
import toast from "react-hot-toast";
import { mutate } from "swr";

interface DeletePetProps{
    petId: string;
    name: string;
}

export default function DeletePet({ petId, name }: DeletePetProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleCloseAndDelete: FormEventHandler = async (event: any) => {
        event.preventDefault();
      
          try {
            const resp = await fetch(`http://localhost:3333/api/pet/${petId}`, {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },
            });
      
            if(resp.ok)toast.success('Mascota eliminada correctamente');
      
            setTimeout(function() {
              mutate(`http://localhost:3333/api/pets`);
            }, 100)
            
            } catch (error) {
              console.error("Failed to update a pet:", error);
            }
        
        setIsOpen(false);
    }

    return (
        <>
            <Tooltip color="danger" content="Eliminar mascota">
                <Button
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    size="lg"
                    onClick={handleOpen}
                >
                    <DeleteIcon/>
                </Button>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    <ModalHeader>Confirmar</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro de que deseas eliminar a {name}?
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