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

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return (
    <div className="absolute top-4 right-4 z-10 rounded-lg bg-card/80 px-4 py-2 text-right text-card-foreground shadow-sm backdrop-blur-sm">
      {time ? (
        <>
          <div className="text-xs font-medium text-muted-foreground">{time.toLocaleDateString(undefined, dateOptions)}</div>
          <div className="text-lg font-semibold">{time.toLocaleTimeString([], timeOptions)}</div>
        </>
      ) : (
        <div className="text-base font-semibold">Loading...</div>
      )}
    </div>
  );
}
