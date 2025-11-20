'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

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
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <Image
          src="/image/logo.png"
          alt="GaleLight Logo"
          width={250}
          height={250}
          className="mb-4"
        />
        <h1 className="text-4xl font-bold md:text-6xl animated-gradient-text">
          GaleLight
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80">
          Never lose your umbrella again. Our smart umbrella connects to your phone, providing left-behind alerts and real-time weather notifications.
        </p>
      </div>
    </section>
  );
}
