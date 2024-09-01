'use client'

import { Card, CardHeader, Divider, CardBody, Spacer, CardFooter, Button, Select, SelectItem, Input, CircularProgress } from "@nextui-org/react"
import { useAllPets } from "apps/web/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";

export default function AdoptionPublisher(){

  const { data: session } = useSession();
  const { pets, isLoadingPets, isErrorPets } = useAllPets();
  const router = useRouter(); 

  if (isErrorPets) return <p>Failed to load pets</p>;
  if (isLoadingPets) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  const [selectedPet, setSelectedPet] = useState('');
  const [city, setCity] = useState('');

  const userId = session?.user?.email;
  const filteredPets = pets.filter(pet => pet.ownerId === userId);

  const handleSubmit: FormEventHandler = async (event: any) => {
    event.preventDefault();

        const body= {
            ownerId: userId,
            petId: selectedPet,
            city: city,
          };
      
          try {
            const resp = await fetch(`http://localhost:3333/api/advertisement/adoption`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(body),
            });
      
            if(resp.ok)toast.success('Adopción registrada correctamente');

            router.push('/Publish');
            
            } catch (error) {
              console.error("Failed to create a pet:", error);
            }

  };

    return(
    <>
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px]">
        <CardHeader className="flex gap-3 text-md justify-center items-center">
          <div className="flex flex-col justify-center">
            <p className="text-md">Adopción</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center">
            <div className="flex flex-wrap w-4/5">
            <Select
                placeholder="Seleccionar mascota"
                className="max-w-xs"
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
            >
            {filteredPets.map((pet) => (
            <SelectItem key={pet._id}>
                {pet.name}
            </SelectItem>
            ))}
            </Select>
            </div>
            <Spacer y={4} />
                <Input 
                  className="flex w-full flex-wrap md:flex-nowrap gap-4 w-4/5" 
                  type="Ciudad" 
                  label="Ciudad" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex justify-center items-center w-full">
            <Button color="primary" onClick={handleSubmit}>
              Publicar
            </Button>
            <Spacer x={3} />
            <Button color="primary" variant="flat" onClick={() => router.push('/Publish')}>
              Volver
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
    </>
    )

}