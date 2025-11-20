'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-end space-x-2">
        <nav className="flex items-center">
          <Button asChild variant="ghost">
              <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
              <Link href="/register">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
