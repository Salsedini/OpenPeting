'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Checkbox,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Spacer,
  Button,
  Input,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { FaCat, FaDog } from 'react-icons/fa';


export default function HomeBox() {
  const router = useRouter();
  const {data: session} = useSession();

  const [selectedAdvertisementOption, setSelectedAdvertisementOption] =
    useState('');
  const [selectedSizeOption, setSelectedSizeOption] = useState('');
  const [selectedAnimalOption, setSelectedAnimalOption] = useState('');
  const [city, setCity] = useState('');

  const handleAdvertisementCheckboxChange = (advertisement: any) => {
    setSelectedAdvertisementOption(
      selectedAdvertisementOption === advertisement ? null : advertisement
    );
  };

  const handleSizeCheckboxChange = (size: any) => {
    setSelectedSizeOption(selectedAdvertisementOption === size ? null : size);
  };

  const handleAnimalCheckboxChange = (animal: any) => {
    setSelectedAnimalOption(
      selectedAdvertisementOption === animal ? null : animal
    );
  };

  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    const query = {
      advertisement: selectedAdvertisementOption,
      size: selectedSizeOption,
      animal: selectedAnimalOption,
      city,
    };

    const queryString = new URLSearchParams(query).toString();
    router.push(`/SearchResult?${queryString}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3 text-md justify-center items-center">
          <div className="flex flex-col justify-center">
            <p className="text-lg font-bold">¿Qué buscas?</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex justify-center items-center">
            <Checkbox
              isSelected={selectedAdvertisementOption === 'Acoger'}
              onChange={() => handleAdvertisementCheckboxChange('Acoger')}
            >
              Acoger
            </Checkbox>
            <Spacer x={2} />
            <Checkbox
              isSelected={selectedAdvertisementOption === 'Adoptar'}
              onChange={() => handleAdvertisementCheckboxChange('Adoptar')}
            >
              Adoptar
            </Checkbox>
          </div>
          <Spacer y={5} />
          <div className="flex justify-center items-center">
            <p className="text-md">Animal: </p>
            <Spacer x={2} />
            <Checkbox
              isSelected={selectedAnimalOption === 'Gato'}
              onChange={() => handleAnimalCheckboxChange('Gato')}
            >
              <FaCat size={24}/>
            </Checkbox>
            <Spacer x={1} />
            <Checkbox
              isSelected={selectedAnimalOption === 'Perro'}
              onChange={() => handleAnimalCheckboxChange('Perro')}
            >
              <FaDog size={24}/>
            </Checkbox>
          </div>
          <Spacer y={5} />
          <div className="flex justify-center items-center">
            <p className="text-md">Tamaño: </p>
            <Spacer x={2} />
            <Checkbox
              isSelected={selectedSizeOption === 'Pequeño'}
              onChange={() => handleSizeCheckboxChange('Pequeño')}
            >
              Pequeño
            </Checkbox>
            <Spacer x={1} />
            <Checkbox
              isSelected={selectedSizeOption === 'Mediano'}
              onChange={() => handleSizeCheckboxChange('Mediano')}
            >
              Mediano
            </Checkbox>
            <Spacer x={1} />
            <Checkbox
              isSelected={selectedSizeOption === 'Grande'}
              onChange={() => handleSizeCheckboxChange('Grande')}
            >
              Grande
            </Checkbox>
          </div>
          <Spacer y={5} />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="city"
              label="Ciudad"
              value={city}
              onChange={handleCityChange}
            />
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex justify-center items-center w-full">
            <Button color="primary" onClick={handleSearch}>
              Buscar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}