'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { sendMissingAlert } from '@/lib/actions';
import { useAuth } from '@/components/auth/auth-provider';
import { BellRing, Loader2 } from 'lucide-react';

export function AlertSection() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  
  const handleSendAlert = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be logged in to send an alert.',
      });
      return;
    }

    setIsSending(true);
    const result = await sendMissingAlert(user.uid);

    if (result.success) {
      toast({
        title: 'Alert Sent!',
        description: 'Your umbrella has been marked as missing.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to Send Alert',
        description: result.error,
      });
    }
    setIsSending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert System</CardTitle>
        <CardDescription>
          If you can't find your umbrella, mark it as missing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={handleSendAlert}
          disabled={isSending}
        >
          {isSending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BellRing className="mr-2 h-4 w-4" />
          )}
          Send Missing Alert
        </Button>
      </CardContent>
    </Card>
  );
}
