'use client'

import React from "react";
import { useSearchParams } from "next/navigation";
import AdoptionsSearchResultBox from "apps/web/components/AdvertisementsSearchResultBox/AdoptionSearchresultBox";
import CaringServiceSearchResultBox from "../../components/AdvertisementsSearchResultBox/CaringServiceSearchResultBox";


export default async function Index() {

    const searchParams = useSearchParams();

    const advertisement = searchParams.get('advertisement');
    const size = searchParams.get('size');
    const animal = searchParams.get('animal');
    const city = searchParams.get('city');

    return (
      <>
        {
        advertisement === 'Adoptar' ? (
        <AdoptionsSearchResultBox
          size={size}
          type={animal} 
          city={city}
        />
      ) : (
        <CaringServiceSearchResultBox
          size={size}
          type={animal}
          city={city}
        />
      )
    }
      </>
    );
  }