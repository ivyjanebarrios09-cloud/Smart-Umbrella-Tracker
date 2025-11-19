'use client';
import { useMemoFirebase, useDoc, useFirestore, useUser } from '@/firebase';
import { doc } from 'firebase/firestore';
import { format } from 'date-fns';
import type { UmbrellaLocation } from '@/lib/data';
import { useMemo } from 'react';

export function useUmbrellaLocation() {
  const firestore = useFirestore();
  const { user } = useUser();

  const locationDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    // The location data is now part of the user's 'current' weather document.
    return doc(firestore, `users/${user.uid}/weather/current`);
  }, [firestore, user]);

  const { data, isLoading, error } = useDoc<{
    latitude: number;
    longitude: number;
    updatedAt: number; // Assuming updatedAt is a unix timestamp or similar
  }>(locationDocRef);

  const location: UmbrellaLocation | null = useMemo(() => {
    if (data && data.latitude && data.longitude) {
      // The 'updatedAt' field seems to be a number, not a timestamp object.
      // We will create a date from it, assuming it's in milliseconds. If not, this might need adjustment.
      const lastSeenDate = data.updatedAt ? new Date(data.updatedAt) : new Date();
      return {
        lat: data.latitude,
        lng: data.longitude,
        lastSeen: format(lastSeenDate, "MMM d, yyyy 'at' h:mm a"),
      };
    }
    return null;
  }, [data]);

  return { location, isLoading, error };
}
