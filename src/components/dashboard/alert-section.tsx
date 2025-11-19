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
import { Bell, BellRing, Lightbulb, LightbulbOff, Loader2, Volume2, VolumeX } from 'lucide-react';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Skeleton } from '../ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

  // Get the list of devices to find the first one
  const devicesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, `users/${user.uid}/devices`);
  }, [firestore, user]);

  const { data: devices, isLoading: isLoadingDevices } = useCollection<Device>(devicesQuery);
  const firstDevice = devices?.[0];

  // Reference to the specific alert controls document for the first device
  const alertControlsDocRef = useMemoFirebase(() => {
    if (!firestore || !user || !firstDevice) return null;
    return doc(firestore, `users/${user.uid}/devices/${firstDevice.id}/alerts`, 'controls');
  }, [firestore, user, firstDevice]);
  
  // Use state to manage the local toggles
  const [buzzerOn, setBuzzerOn] = useState(false);
  const [lightOn, setLightOn] = useState(false);

  useEffect(() => {
    if (alertControlsDocRef) {
      const unsub = () => {};
      // To-Do: Replace with useDoc and handle live updates
      // For now, this sets initial state.
    }
  }, [alertControlsDocRef]);


  const handleToggle = async (type: 'buzzer' | 'light') => {
    if (!alertControlsDocRef) {
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
      deviceId: firstDevice?.id,
      message: 'Controls updated',
      timestamp: serverTimestamp(),
    };

    // Optimistically update UI
    if (type === 'buzzer') setBuzzerOn(newState);
    if (type === 'light') setLightOn(newState);

    setDoc(alertControlsDocRef, updateData, { merge: true })
      .then(() => {
        toast({
          title: `Success`,
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been turned ${newState ? 'ON' : 'OFF'}.`,
        });
      })
      .catch((error) => {
        // Revert optimistic update on failure
        if (type === 'buzzer') setBuzzerOn(!newState);
        if (type === 'light') setLightOn(!newState);

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

  if (isLoadingDevices) {
      return (
          <Card>
              <CardHeader>
                  <CardTitle>Alert System</CardTitle>
                  <CardDescription>Control your umbrella's buzzer and light.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
              </CardContent>
          </Card>
      )
  }
  
  if (!firstDevice) {
       return (
            <Card>
                <CardHeader>
                    <CardTitle>Alert System</CardTitle>
                    <CardDescription>Control your umbrella's buzzer and light.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Please add a device to enable the alert system.</p>
                </CardContent>
            </Card>
       )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert System</CardTitle>
        <CardDescription>
          Remotely control your umbrella's buzzer and light for device: <strong>{firstDevice.name}</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center space-x-3">
            {buzzerOn ? <Volume2 className="h-6 w-6 text-primary" /> : <VolumeX className="h-6 w-6 text-muted-foreground" />}
            <Label htmlFor="buzzer-switch" className="font-medium">
              Buzzer
            </Label>
          </div>
          {isUpdating === 'buzzer' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Switch id="buzzer-switch" checked={buzzerOn} onCheckedChange={() => handleToggle('buzzer')} />}
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
           <div className="flex items-center space-x-3">
             {lightOn ? <Lightbulb className="h-6 w-6 text-primary" /> : <LightbulbOff className="h-6 w-6 text-muted-foreground" />}
            <Label htmlFor="light-switch" className="font-medium">
              Light
            </Label>
          </div>
          {isUpdating === 'light' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Switch id="light-switch" checked={lightOn} onCheckedChange={() => handleToggle('light')} />}
        </div>
      </CardContent>
    </Card>
  );
}
