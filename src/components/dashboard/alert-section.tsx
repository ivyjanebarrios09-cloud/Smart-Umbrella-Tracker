'use client';

import { useState, useEffect } from 'react';
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
import { BellRing, Loader2, Sparkles } from 'lucide-react';
import { proactiveMissingAlert, type ProactiveMissingAlertOutput } from '@/ai/flows/proactive-missing-alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function AlertSection({ initialLocation, initialForecast }: { initialLocation: string, initialForecast: string }) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [showSmartAlert, setShowSmartAlert] = useState(false);
  const [smartAlertReason, setSmartAlertReason] = useState('');
  
  useEffect(() => {
    const checkSmartAlert = async () => {
      try {
        const result: ProactiveMissingAlertOutput = await proactiveMissingAlert({
          weatherForecast: initialForecast,
          umbrellaLocation: `Last seen at coordinates near Los Angeles on ${initialLocation}`,
          userBehavior: 'User generally takes the umbrella when rain is forecasted.',
        });

        if (result.shouldSendAlert) {
          setSmartAlertReason(result.reason);
          setShowSmartAlert(true);
        }
      } catch (error) {
        console.error("Smart Alert AI check failed:", error);
      }
    };

    // Run smart alert check after a short delay
    const timer = setTimeout(checkSmartAlert, 5000);
    return () => clearTimeout(timer);
  }, [initialForecast, initialLocation]);

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
    setShowSmartAlert(false);
  };

  return (
    <>
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
      
      <AlertDialog open={showSmartAlert} onOpenChange={setShowSmartAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <AlertDialogTitle>Possible Missing Umbrella?</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              {smartAlertReason} Would you like to mark your umbrella as missing?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, It's Fine</AlertDialogCancel>
            <AlertDialogAction onClick={handleSendAlert} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Yes, Send Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
