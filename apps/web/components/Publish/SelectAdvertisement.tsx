'use client'

import { Button, Spacer } from "@nextui-org/react"
import { useRouter } from "next/navigation";

export default function SelectAdvertisement(){

    const router = useRouter(); 

    return(
        <>
        
            <div className="flex flex-col justify-center items-center h-screen w-auto">
                <h1 className="text-3xl text-gray-900">¿Qué tipo de anuncio quieres publicar?</h1>
                <Spacer y={14} />
                <div className="flex gap-4">
                    <Button size="lg" color="primary" variant="ghost" onClick={() => router.push('/Publish/Adoptions')}>
                        Adopción
                    </Button>
                    <Spacer x={10} />
                    <Button size="lg" color="primary" variant="ghost" onClick={() => router.push('/Publish/CaringService')}>
                        Acogida
                    </Button>
                </div>
            </div>

        </>

    )

}