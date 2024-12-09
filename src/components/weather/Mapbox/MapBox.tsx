/* "use client";

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useLocationStore } from '@/store/locationStore';

interface MapComponentProps {
  coordinates: [number, number];
}

const MapComponent = dynamic<MapComponentProps>(() => 
  import('./MapComponent').then((mod) => mod.MapComponent),
{
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export const Mapbox = () => {

  const { location } = useLocationStore();
  const { lat, lon } = location;
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true)
  }, []);

  if ((!lat && !lon) || !isClient) return null

  return (
    <div className='w-full col-span-1 md:col-span-2 lg:col-span-3 min-h-60 md:min-h-full rounded-lg shadow-lg'>
      <MapComponent key={`map-${lat}-${lon}`} coordinates={[lat, lon]} />
    </div>
  )
}
 */