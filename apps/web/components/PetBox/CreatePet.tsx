'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Tooltip, Spacer, Checkbox, Image } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { FaCat, FaDog, FaMars, FaVenus } from "react-icons/fa";
import { mutate } from "swr";


export default function CreatePet() {
    const {data: session} = useSession();
    const userId = session?.user?.email;

    const [isOpen, setIsOpen] = useState(false);
    const [pet, setPet] = useState({
        name: "",
        size: "",
        gender: "",
        type: "",
        age: "",
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleChange = (e: any) => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value
        });
    };

    const handleSizeChange = (size: any) => {
        setPet({
            ...pet,
            size: pet.size === size ? "" : size
        });
    };

    const handleGenderChange = (gender: any) => {
        setPet({
            ...pet, 
            gender: pet.gender === gender ? "" : gender
        });
    }

    const handleTypeChange = (type: any) => {
        setPet({
            ...pet, 
            type: pet.type === type ? "" : type
        });
    }

    const handleCloseAndSubmit: FormEventHandler = async (event: any) => {
        event.preventDefault();

        const body= {
            name: pet.name,
            ownerId: userId,
            gender: pet.gender,
            size: pet.size,
            type: pet.type,
            age: pet.age,
          };
      
          try {
            const resp = await fetch(`http://localhost:3333/api/pet`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(body),
            });
      
            if(resp.ok)toast.success('Mascota registrada correctamente');
      
            setTimeout(function() {
                mutate(`http://localhost:3333/api/pets`);
              }, 150)
            
            } catch (error) {
              console.error("Failed to create a pet:", error);
            }
        
        setIsOpen(false);
    }

    
    return (
        <>
                <Button onClick={handleOpen} color="primary" size="lg">Registrar mascota</Button>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    <ModalHeader>Añadir mascota</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col items-center gap-4">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="self-start text-black font-bold">Animal:</p>
                            <Spacer x={2} />
                                <Checkbox
                                    isSelected={pet.type === 'CAT'}
                                    onChange={() => handleTypeChange('CAT')}
                                >
                                    <FaCat size={24}/>
                                </Checkbox>
                                <Spacer x={2} />
                                <Checkbox
                                    isSelected={pet.type === 'DOG'}
                                    onChange={() => handleTypeChange('DOG')}
                                >
                                    <FaDog size={24}/>
                                </Checkbox>
                                <Spacer x={2} />
                            </div>
                        <Tooltip content="Añadir foto">
                            <Image
                                alt="Foto de perfil"
                                className="rounded-full"
                                src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-photo-icon-image_1128397.jpg"
                                width={125}
                            />
                        </Tooltip>
                            <Input name="name" value={pet.name} onChange={handleChange} placeholder="Nombre" />
                            <Input name="age" value={String(pet.age)} onChange={handleChange} placeholder="Edad" />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="self-start text-black font-italic">Tamaño:</p>
                            <Spacer x={2} />
                                <Checkbox
                                    isSelected={pet.size === 'SMALL'}
                                    onChange={() => handleSizeChange('SMALL')}
                                >
                                    Pequeño
                                </Checkbox>
                                <Spacer x={2} />
                                <Checkbox
                                    isSelected={pet.size === 'MEDIUM'}
                                    onChange={() => handleSizeChange('MEDIUM')}
                                >
                                    Mediano
                                </Checkbox>
                                <Spacer x={2} />
                                <Checkbox
                                    isSelected={pet.size === 'BIG'}
                                    onChange={() => handleSizeChange('BIG')}
                                >
                                    Grande
                                </Checkbox>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className="self-start text-black font-italic">Género:</p>
                            <Spacer x={2} />
                                <Checkbox
                                    isSelected={pet.gender === 'FEMALE'}
                                    onChange={() => handleGenderChange('FEMALE')}
                                >
                                    <FaVenus size={20}/>
                                </Checkbox>
                                <Spacer x={2} />
                                <Checkbox
                                    isSelected={pet.gender === 'MALE'}
                                    onChange={() => handleGenderChange('MALE')}
                                >
                                    <FaMars size={20}/>
                                </Checkbox>
                                <Spacer x={2} />
                            </div>
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