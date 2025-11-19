'use client';
import { useMemoFirebase } from '@/firebase';
import { collection, query, limit, orderBy } from 'firebase/firestore';
import { useCollection, useFirestore } from '@/firebase';
import { format } from 'date-fns';
import type { UmbrellaLocation } from '@/lib/data';
import { useMemo } from 'react';

export function useUmbrellaLocation() {
  const firestore = useFirestore();

  const locationQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'locations'), orderBy('timestamp', 'desc'), limit(1));
  }, [firestore]);

  const { data, isLoading, error } = useCollection<{latitude: number, longitude: number, timestamp: { toDate: () => Date}}>(locationQuery);

  const location: UmbrellaLocation | null = useMemo(() => {
    if (data && data.length > 0) {
      const locationData = data[0];
      return {
        lat: locationData.latitude,
        lng: locationData.longitude,
        lastSeen: format(locationData.timestamp.toDate(), "MMM d, yyyy 'at' h:mm a"),
      };
    }
    return null;
  }, [data]);

  return { location, isLoading, error };
}
