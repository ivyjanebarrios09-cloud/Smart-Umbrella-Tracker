'use client';

import { useEffect, useState } from 'react';

export function RealTimeClock() {
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
    <div className="absolute top-0 right-0 z-20 rounded-md bg-background/80 px-3 py-1.5 text-sm font-semibold text-foreground backdrop-blur-sm">
      {time ? time.toLocaleTimeString() : 'Loading...'}
    </div>
  );
}
