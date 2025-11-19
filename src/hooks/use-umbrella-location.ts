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
  
  // This state will track the combined loading status
  const [isProcessing, setIsProcessing] = useState(true);

  const locationDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, `users/${user.uid}/weather/current`);
  }, [firestore, user]);

  const { data: firestoreData, isLoading: isFirestoreLoading, error } = useDoc<{
    latitude: number;
    longitude: number;
    updatedAt: number;
    location_str?: string; // Nominatim might not be needed if address is in doc
  }>(locationDocRef);

  useEffect(() => {
    // Start processing whenever the source data changes or starts loading.
    if (!isFirestoreLoading) {
      if (firestoreData && firestoreData.latitude && firestoreData.longitude) {
        const { latitude, longitude, updatedAt, location_str } = firestoreData;
        
        const processLocation = async () => {
          let address = location_str; // Use address from doc if available
          
          // If address is not in the document, fetch it.
          if (!address) {
            try {
              const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              const addressData = await response.json();
              address = addressData.display_name || 'Address not found';
            } catch (e) {
              console.error("Failed to fetch address", e);
              address = "Could not fetch address";
            }
          }

          const lastSeenDate = updatedAt ? new Date(updatedAt * 1000) : new Date();
          
          setLocation({
            lat: latitude,
            lng: longitude,
            lastSeen: format(lastSeenDate, "MMM d, yyyy 'at' h:mm a"),
            address: address,
          });
          setIsProcessing(false); // Finished processing
        };

        processLocation();
      } else {
        // No data from firestore
        setLocation(null);
        setIsProcessing(false);
      }
    } else {
        // Still loading from firestore
        setIsProcessing(true);
    }
  }, [firestoreData, isFirestoreLoading]);

  // The hook's loading state is now the overall processing state
  return { location, isLoading: isProcessing, error };
}
