import { RegisterForm } from '@/components/auth/register-form';
import { Umbrella } from 'lucide-react';

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
           <Umbrella className="mx-auto h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Create an Account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to get started
          </p>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
