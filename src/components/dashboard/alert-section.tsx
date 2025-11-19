'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { BellRing, Loader2, Volume2, VolumeX, Lightbulb, LightbulbOff } from 'lucide-react';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '../ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useDoc } from '@/firebase/firestore/use-doc';

interface Device {
  id: string;
  name: string;
}

interface AlertControls {
  buzzer: boolean;
  light: boolean;
}

export function AlertSection() {
  const { toast } = useToast();
  const { firestore, user } = useFirebase();
  
  const [isUpdating, setIsUpdating] = useState< 'buzzer' | 'light' | null >(null);

  const devicesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, `users/${user.uid}/devices`);
  }, [firestore, user]);

  const { data: devices, isLoading: isLoadingDevices } = useCollection<Device>(devicesQuery);
  const firstDevice = devices?.[0];

  const alertControlsDocRef = useMemoFirebase(() => {
    if (!firestore || !user || !firstDevice) return null;
    return doc(firestore, `users/${user.uid}/devices/${firstDevice.id}/alerts`, 'controls');
  }, [firestore, user, firstDevice]);
  
  const { data: alertData, isLoading: isLoadingAlerts } = useDoc<AlertControls>(alertControlsDocRef);
  
  const buzzerOn = alertData?.buzzer ?? false;
  const lightOn = alertData?.light ?? false;

  const handleToggle = async (type: 'buzzer' | 'light') => {
    if (!alertControlsDocRef || !firstDevice) {
      toast({
        variant: 'destructive',
        title: 'No Device Found',
        description: 'You need to register a device first.',
      });
      return;
    }

    setIsUpdating(type);

    const newState = type === 'buzzer' ? !buzzerOn : !lightOn;
    const updateData = {
      [type]: newState,
      deviceId: firstDevice.id,
      message: 'Controls updated via dashboard',
      timestamp: serverTimestamp(),
    };

    setDoc(alertControlsDocRef, updateData, { merge: true })
      .then(() => {
        toast({
          title: `Success`,
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been turned ${newState ? 'ON' : 'OFF'}.`,
        });
      })
      .catch((error) => {
        const permissionError = new FirestorePermissionError({
            path: alertControlsDocRef.path,
            operation: 'update',
            requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsUpdating(null);
      });
  };

  const isLoading = isLoadingDevices || isLoadingAlerts;

  return (
    <Card className="flex-1 flex flex-col">
       <CardHeader className="flex flex-row items-start gap-4">
        <BellRing className="h-6 w-6 text-muted-foreground" />
        <div>
            <CardTitle className="text-base font-semibold">Alert System</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
                Activate buzzer or light on your device.
            </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex items-center">
        {isLoading ? (
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-12" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
        ) : !firstDevice ? (
            <p className="w-full text-center text-sm text-muted-foreground">Add a device in settings to enable alerts.</p>
        ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                        {buzzerOn ? <Volume2 className="h-5 w-5 text-primary" /> : <VolumeX className="h-5 w-5 text-muted-foreground" />}
                        <Label htmlFor="buzzer-switch" className="text-sm font-medium">
                        Buzzer
                        </Label>
                    </div>
                    {isUpdating === 'buzzer' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Switch id="buzzer-switch" checked={buzzerOn} onCheckedChange={() => handleToggle('buzzer')} />}
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-3">
                        {lightOn ? <Lightbulb className="h-5 w-5 text-primary" /> : <LightbulbOff className="h-5 w-5 text-muted-foreground" />}
                        <Label htmlFor="light-switch" className="text-sm font-medium">
                        Light
                        </Label>
                    </div>
                    {isUpdating === 'light' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Switch id="light-switch" checked={lightOn} onCheckedChange={() => handleToggle('light')} />}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
