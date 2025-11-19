'use client';

import { useState, useEffect, useMemo } from 'react';
import { useDoc, useFirebase, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UmbrellaLocation } from '@/lib/data';

export function useUmbrellaLocation() {
  const { firestore, user } = useFirebase();
  const [location, setLocation] = useState<UmbrellaLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const weatherDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'weather', 'current');
  }, [firestore, user]);

  const { data: weatherData, isLoading: isDocLoading } = useDoc<{
    latitude: number;
    longitude: number;
  }>(weatherDocRef);

  useEffect(() => {
    if (isDocLoading) {
      setIsLoading(true);
      return;
    }

    if (!weatherData) {
      setLocation(null);
      setIsLoading(false);
      return;
    }

    const { latitude, longitude } = weatherData;

    if (
      location &&
      location.lat === latitude &&
      location.lng === longitude &&
      location.address !== 'Loading address...'
    ) {
      return;
    }

    // Set initial location with coords, address will be fetched next
    const initialLocation: UmbrellaLocation = {
      lat: latitude,
      lng: longitude,
      address: 'Loading address...',
    };
    setLocation(initialLocation);
    setIsLoading(false); // We have coords, so main loading is done.

    // Fetch address from Nominatim
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        if (data && data.display_name) {
          setLocation((prev) =>
            prev ? { ...prev, address: data.display_name } : null
          );
        } else {
           setLocation((prev) =>
            prev ? { ...prev, address: 'Address not found' } : null
          );
        }
      } catch (error) {
        console.error('Error fetching address:', error);
         setLocation((prev) =>
            prev ? { ...prev, address: 'Could not fetch address' } : null
          );
      }
    };

    fetchAddress();
  }, [weatherData, isDocLoading, location]);

  return { location, isLoading };
}
