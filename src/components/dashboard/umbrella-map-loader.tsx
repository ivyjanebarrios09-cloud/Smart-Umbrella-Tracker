'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const UmbrellaMap = dynamic(() => import('@/components/dashboard/umbrella-map').then(mod => mod.UmbrellaMap), {
  ssr: false,
  loading: () => <Skeleton className="h-[434px]" />,
});

export function UmbrellaMapLoader() {
  return <UmbrellaMap />;
}
