import { Tooltip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useState, FormEventHandler } from "react";
import { signOut } from "next-auth/react";


export default function SignOut() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleCloseAndSignOut: FormEventHandler = async (event: any) => {
        event.preventDefault();
      
        signOut();     
        setIsOpen(false);

    }

    return (
        <>
    
            <Button onClick={handleOpen} color="danger" size="sm" radius="full" variant="light">Cerrar sesión</Button>        

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    <ModalHeader>Confirmar</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro de que quieres cerrar sesión?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={handleCloseAndSignOut}>Cerrar sesión</Button>
                        <Button variant="bordered" onClick={handleClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}