import { useState } from 'react';
import { Tooltip, Modal, ModalContent, ModalHeader, ModalBody, Spacer, Image, ModalFooter, Button } from '@nextui-org/react';
import { EyeIcon } from './EyeIcon';

interface AdvertisementInfoProps{
    advertisementType: string;
    petName: string;
    petPicture: string;
    advertisementCity: string;
    advertisementPrice: number;
    startDate: Date;
    endDate: Date;
}

export function CaringServiceContent({ petName, petPicture, advertisementCity, advertisementPrice, startDate, endDate }:
    { petName: string, petPicture: string, advertisementCity: string, advertisementPrice: number, startDate: Date, endDate: Date }){

        const start = new Date(startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) 
        const end = new Date(endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
  <div className="flex justify-center items-center">
    <Image
        alt="Foto de perfil"
        className="rounded-full"
        src={petPicture}
        width={150}
    />
    <Spacer x={3} />
    <ul className="text-lg font-bold">
        <li>Nombre de mascota: <span className="font-normal italic">{petName}</span></li>
        <Spacer y={3} />
        <li>Ciudad: <span className="font-normal italic">{advertisementCity}</span></li>
        <Spacer y={3} />
        <li>Pago: <span className="font-normal italic">{advertisementPrice}€</span></li>
        <Spacer y={3} />
        <li>Desde el <span className="font-normal italic">{start}</span> hasta el <span className="font-normal italic">{end}</span></li>
    </ul>
  </div>
  );
}
export function AdoptionContent({ petName, petPicture, advertisementCity }: { petName: string, petPicture: string, advertisementCity: string }){
    return (
        <div className="flex justify-center items-center">
          <Image
              alt="Foto de perfil"
              className="rounded-full"
              src={petPicture}
              width={150}
          />
          <Spacer x={3} />
          <ul className="text-lg font-bold">
              <li>Nombre de mascota: <span className="font-normal italic">{petName}</span></li>
              <Spacer y={3} />
              <li>Ciudad: <span className="font-normal italic">{advertisementCity}</span></li>
          </ul>
          <Spacer y={3} />
        </div>
    );
}

export default function AdvertisementInfo({ advertisementType, petName, petPicture, advertisementCity, advertisementPrice, startDate, endDate }: AdvertisementInfoProps) {

  const [isOpen, setIsOpen] = useState(false);

  const type = advertisementType === 'CARING_SERVICE' ? 'Acogida' : 'Adopción';

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Tooltip content="Ver anuncio">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={handleOpen}>
                <EyeIcon />
            </span>
      </Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="lg"
      >
        <ModalContent>
          <ModalHeader>Información de la {type}</ModalHeader>
          <ModalBody>
            {type === 'Acogida' ? 
            <CaringServiceContent 
                petName={petName} 
                petPicture={petPicture}
                advertisementCity={advertisementCity}
                advertisementPrice={advertisementPrice}
                startDate={startDate}
                endDate={endDate}
            /> 
            : 
            <AdoptionContent
                petName={petName} 
                petPicture={petPicture}
                advertisementCity={advertisementCity}
            />}
          </ModalBody>
          <ModalFooter>
            <Button variant="bordered" onClick={handleClose}>Volver</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}