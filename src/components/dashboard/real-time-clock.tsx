'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock } from 'lucide-react';

export function RealTimeClockCard() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set the initial time on the client to avoid hydration mismatch
    setTime(new Date());

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <Clock className="h-6 w-6 text-muted-foreground" />
        <div>
          <CardTitle className="text-base font-semibold">Current Time</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Your local time.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 flex-1 flex flex-col justify-center items-center">
        {time === null ? (
            <p className="text-sm text-muted-foreground">Loading time...</p>
        ) : (
             <div className="flex items-baseline">
                <div className="text-5xl font-bold">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
