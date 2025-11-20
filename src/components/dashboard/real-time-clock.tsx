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
    <div className="absolute top-4 right-4 z-10 rounded-lg bg-card/80 px-4 py-2 text-base font-semibold text-card-foreground shadow-sm backdrop-blur-sm">
      {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Loading...'}
    </div>
  );
}
