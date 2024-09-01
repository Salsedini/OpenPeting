import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

interface InterestButtonProps {
    interestedUsers: string[];
    advertisementId: string;
}



export default function InterestButton({ interestedUsers, advertisementId }: InterestButtonProps) {
    const { data: session } = useSession();
    const userId = session?.user?.email ?? '';

    const isUserInterested: boolean = interestedUsers === undefined || interestedUsers.includes(userId) ? true : false;

    const [isInterested, setIsInterested] = useState(isUserInterested);
    
    const handleInterest: FormEventHandler = async (event: any) => {
        event.preventDefault();
      
        const body= {
            interestedUserId: userId,
        }
    
          try {
            const resp = await fetch(`http://localhost:3333/api/advertisement/${advertisementId}`, {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(body),
            });
      
            if(resp.ok)toast.success('Solicitud enviada correctamente');
            setIsInterested(true);
            
            } catch (error) {
              console.error("Failed to apply for advertisement:", error);
            }
        
    }
    
    return (
        <>
        {session ? (
            isInterested ? (
                <Button isDisabled color="primary">
                    Solicitud enviada
                </Button>
            ) : (
                <Button color="primary" onClick={handleInterest}>
                    Estoy interesado
                </Button>
            )
        ) : (
            <Button isDisabled color="primary">
                Inicia sesión para aplicar
            </Button>
        )}
        </>
    )

}