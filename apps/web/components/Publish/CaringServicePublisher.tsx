'use client'

import { Card, CardHeader, Divider, CardBody, Select, SelectItem, Spacer, CardFooter, Button, Input, DateRangePicker, CircularProgress } from "@nextui-org/react"
import { useAllPets } from "apps/web/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { DateValue } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function CaringServicePublisher(){

  const { data: session } = useSession();
  const { pets, isLoadingPets, isErrorPets } = useAllPets();

  const router = useRouter(); 

  
  
  const [caringServiceAdvertisement, setCaringServiceAdvertisement] = useState({
    petId: "" ,
    city: "",
    price: "",
    startDate: undefined as unknown as DateValue, 
    endDate: undefined as unknown as DateValue,
  });

  const handleChange = (e: any) => {
    setCaringServiceAdvertisement({
      ...caringServiceAdvertisement,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (newDateRange: { start: DateValue, end: DateValue }) => {
    setCaringServiceAdvertisement({
      ...caringServiceAdvertisement,
      startDate: newDateRange.start,
      endDate: newDateRange.end
    });
  };

  const handleSubmit: FormEventHandler = async (event: any) => {
    event.preventDefault();

    const start = new Date(caringServiceAdvertisement.startDate.year, caringServiceAdvertisement.startDate.month - 1, caringServiceAdvertisement.startDate.day).toISOString();
    const end = new Date(caringServiceAdvertisement.endDate.year, caringServiceAdvertisement.endDate.month - 1, caringServiceAdvertisement.endDate.day).toISOString();

    console.log("start", start);
    console.log("end", end);

        const body= {
            ownerId: userId,
            petId: caringServiceAdvertisement.petId,
            city: caringServiceAdvertisement.city,
            price: caringServiceAdvertisement.price,
            start: start,
            end: end,
          };
      
          try {
            const resp = await fetch(`http://localhost:3333/api/advertisement/caringService`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(body),
            });
      
            if(resp.ok)toast.success('Acogida registrada correctamente');
            router.push('/Publish');
            
            } catch (error) {
              console.error("Failed to create a pet:", error);
            }

  };



  if (isErrorPets) return <p>Failed to load pets</p>;
  if (isLoadingPets) return <p><CircularProgress size="lg" aria-label="Loading..." /></p>;

  const userId = session?.user?.email;
  const filteredPets = pets.filter(pet => pet.ownerId === userId);


    return(

        <>
        <div className="flex justify-center items-center h-screen">
        <Card className="w-[400px] flex flex-col items-center justify-center">
        <CardHeader className="flex gap-3 text-md justify-center items-center">
          <div className="flex flex-col justify-center">
            <p className="text-md">Acogida</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col justify-center items-center">
            <div className="flex flex-wrap md:flex-nowrap w-4/5 justify-center items-center">
                <Select
                  placeholder="Seleccionar mascota"
                  className="max-w-xs"
                  name="petId"
                  onChange={handleChange}
                  value={caringServiceAdvertisement.petId}
                >
                {filteredPets.map((pet) => (
                <SelectItem key={pet._id}>
                  {pet.name}
                </SelectItem>
                ))}
            </Select>
            </div>
            <Spacer y={5} />
                <Input 
                  className="w-4/5" 
                  type="text" 
                  label="Ciudad" 
                  name="city" 
                  value={caringServiceAdvertisement.city} 
                  onChange={handleChange} 
                />
                <Spacer y={5} />
                <Input
                    className="w-4/5"
                    type="number"
                    label="Pago"
                    placeholder="0.00"
                    min="0"
                    name="price"
                    value={caringServiceAdvertisement.price}
                    onChange={handleChange}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">€</span>
                      </div>
                    }
                />
                <Spacer y={5} />
                <DateRangePicker 
                    label="Duración de la acogida" 
                    className="w-4/5" 
                    value={{ start: caringServiceAdvertisement.startDate, end: caringServiceAdvertisement.endDate }}
                    onChange={handleDateChange}
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