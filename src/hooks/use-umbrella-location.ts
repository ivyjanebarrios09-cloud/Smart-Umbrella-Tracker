'use client';

import { useState, useEffect } from 'react';
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

    // Fetch address from Nominatim only if coordinates have changed
    const fetchAddress = async () => {
      // Set location with coords and loading state for address
      setLocation({
        lat: latitude,
        lng: longitude,
        address: 'Loading address...',
      });
      setIsLoading(false);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        if (data && data.display_name) {
          setLocation((prev) =>
            prev && prev.lat === latitude && prev.lng === longitude
              ? { ...prev, address: data.display_name }
              : prev
          );
        } else {
           setLocation((prev) =>
             prev && prev.lat === latitude && prev.lng === longitude
              ? { ...prev, address: 'Address not found' }
              : prev
          );
        }
      } catch (error) {
        console.error('Error fetching address:', error);
         setLocation((prev) =>
            prev && prev.lat === latitude && prev.lng === longitude
            ? { ...prev, address: 'Could not fetch address' }
            : prev
          );
      }
    };

    // Only trigger if coordinates are different from current state
    if (location?.lat !== latitude || location?.lng !== longitude) {
        fetchAddress();
    } else {
        // if coordinates are same, just ensure loading is false
        setIsLoading(false)
    }
  // The dependency array is changed to only react to raw data changes
  }, [weatherData, isDocLoading]);

  return { location, isLoading };
}
