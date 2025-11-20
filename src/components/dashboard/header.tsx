'use client';

import Link from 'next/link';
import { LogOut, Loader2, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/components/auth/auth-provider';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';

interface UserProfile {
    name?: string;
    email?: string;
}

export function DashboardHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  const { firestore } = useFirebase();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [firestore, user]);

  const { data: userProfile } = useDoc<UserProfile>(userProfileRef);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Sign out error', error);
      setIsSigningOut(false);
    }
  };

  const getInitials = () => {
    if (userProfile?.name) {
        return userProfile.name.charAt(0).toUpperCase();
    }
    if (user?.email) {
        return user.email.charAt(0).toUpperCase();
    }
    return '';
  }

  return (
    <header className="sticky top-0 flex h-16 items-center justify-center md:justify-between border-b bg-background px-4 md:px-6 z-50">
      <div className="hidden md:flex flex-1">
        {/* Empty div to balance the flex container on desktop */}
      </div>

      <nav className="flex items-center justify-center">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Image src="/image/logo.png" alt="GaleLight Logo" width={60} height={60} className="h-14 w-14 transition-transform group-hover:rotate-12" />
          <span className="font-bold whitespace-nowrap text-xl animated-gradient-text">GaleLight</span>
        </Link>
      </nav>

      <div className="absolute md:relative right-4 md:right-auto flex flex-1 items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userProfile?.name || user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
              {isSigningOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
