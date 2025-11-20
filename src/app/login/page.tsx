import { LoginForm } from '@/components/auth/login-form';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <Button asChild variant="ghost" className="absolute top-4 left-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Image src="/image/logoo.png" alt="Smart Umbrella Logo" width={48} height={48} className="mx-auto h-12 w-12" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to track your umbrella</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
