import { LoginForm } from '@/components/auth/login-form';
import { Umbrella } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Umbrella className="mx-auto h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to track your umbrella</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
