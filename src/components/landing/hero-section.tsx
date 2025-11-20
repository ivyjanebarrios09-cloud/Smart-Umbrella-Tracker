'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function RealTimeClock() {
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
    <div className="absolute top-4 right-4 z-20 rounded-md bg-black/50 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
      {time ? time.toLocaleTimeString() : 'Loading...'}
    </div>
  );
}


export function HeroSection() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-background');

  return (
    <section className="relative h-[60vh] min-h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <RealTimeClock />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl font-bold md:text-6xl">
          Never lose your umbrella again.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80">
          Our Smart Umbrella connects to your phone. Get left-behind alerts,
          real-time weather notifications, and find your umbrella right from the
          app.
        </p>
      </div>
    </section>
  );
}
