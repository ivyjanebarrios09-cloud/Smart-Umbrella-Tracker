'use client';
import { useMemoFirebase, useDoc, useFirestore, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { format } from 'date-fns';
import type { UmbrellaLocation } from '@/lib/data';
import { useState, useEffect } from 'react';

export function useUmbrellaLocation() {
  const firestore = useFirestore();
  const { user } = useUser();
  const [location, setLocation] = useState<UmbrellaLocation | null>(null);

  const locationDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, `users/${user.uid}/weather/current`);
  }, [firestore, user]);

  const { data, isLoading, error } = useDoc<{
    latitude: number;
    longitude: number;
    updatedAt: number;
  }>(locationDocRef);

  useEffect(() => {
    if (data && data.latitude && data.longitude) {
      const { latitude, longitude, updatedAt } = data;
      
      const fetchAddress = async () => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const addressData = await response.json();
          const address = addressData.display_name || 'Address not found';

          const lastSeenDate = updatedAt ? new Date(updatedAt) : new Date();
          
          setLocation({
            lat: latitude,
            lng: longitude,
            lastSeen: format(lastSeenDate, "MMM d, yyyy 'at' h:mm a"),
            address: address,
          });

        } catch (e) {
          console.error("Failed to fetch address", e);
          const lastSeenDate = updatedAt ? new Date(updatedAt) : new Date();
          setLocation({
            lat: latitude,
            lng: longitude,
            lastSeen: format(lastSeenDate, "MMM d, yyyy 'at' h:mm a"),
            address: "Could not fetch address",
          });
        }
      };

      fetchAddress();
    } else {
        setLocation(null);
    }
  }, [data]);

  return { location, isLoading: isLoading || (!!data && !location), error };
}
