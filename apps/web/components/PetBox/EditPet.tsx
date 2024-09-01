'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Tooltip, Spacer, Checkbox, Textarea, CircularProgress } from "@nextui-org/react";
import { FormEventHandler, useState } from "react";
import { EditIcon } from "../PetBox/EditIcon";
import { usePetById } from "apps/web/hooks";
import toast from "react-hot-toast";
import { mutate } from "swr";

interface EditPetProps{
    petId: string;
    name: string;
    size: string;
    age: number;
    description: string;
    petPicture: string;
}

export default function EditPet({ petId, name, size, age, description, petPicture }: EditPetProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [petform, setPet] = useState({
        name: name,
        size: size,
        age: age,
        description: description,
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleChange = (e: any) => {
        setPet({
            ...petform,
            [e.target.name]: e.target.value
        });
    };

    const handleSizeChange = (size: any) => {
        setPet({
            ...petform,
            size: petform.size === size ? "" : size
        });
    };

    const handleCloseAndSubmit: FormEventHandler = async (event: any) => {
        event.preventDefault();

        const picture = petPicture ? petPicture : "httpalgo";
        const body= {
            name: petform.name,
            size: petform.size,
            age: petform.age,
            picture,
            description: petform.description,
          };
      
          try {
            const resp = await fetch(`http://localhost:3333/api/pet/${petId}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(body),
            });
      
            if(resp.ok)toast.success('Mascota actualizada correctamente');
      
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
            <Tooltip content="Editar mascota">
                <Button
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    size="lg"
                    onClick={handleOpen}
                >
                    <EditIcon />
                </Button>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    <ModalHeader>Editar mascota</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col items-center gap-4">
                            <Input name="name" value={petform.name} onChange={handleChange} placeholder="Nombre" />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="self-start text-black font-italic">Tamaño:</p>
                            <Spacer x={2} />
                                <Checkbox
                                    isSelected={petform.size === 'SMALL'}
                                    onChange={() => handleSizeChange('SMALL')}
                                >
                                    Pequeño
                                </Checkbox>
                                <Spacer x={2} />
                                <Checkbox
                                    isSelected={petform.size === 'MEDIUM'}
                                    onChange={() => handleSizeChange('MEDIUM')}
                                >
                                    Mediano
                                </Checkbox>
                                <Spacer x={2} />
                                <Checkbox
                                    isSelected={petform.size === 'BIG'}
                                    onChange={() => handleSizeChange('BIG')}
                                >
                                    Grande
                                </Checkbox>
                            </div>
                            <Input name="age" value={String(petform.age)} onChange={handleChange} placeholder="Edad" />
                            <Textarea name="description" value={petform.description} onChange={handleChange} placeholder="Descripción"/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleCloseAndSubmit}>Guardar</Button>
                        <Button variant="bordered" onClick={handleClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}