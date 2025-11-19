'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useFirebase } from '@/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  name: z.string().min(1, 'Device name is required.'),
  deviceId: z.string().min(1, 'Device ID is required.'),
});

type DeviceFormValue = z.infer<typeof formSchema>;

export function AddDeviceForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { firestore, user } = useFirebase();

  const form = useForm<DeviceFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      deviceId: '',
    },
  });

  const onSubmit = async (data: DeviceFormValue) => {
    if (!firestore || !user) {
        toast({ variant: 'destructive', title: 'Error', description: 'User not authenticated.' });
        return;
    }

    setLoading(true);

    const deviceRef = doc(firestore, `users/${user.uid}/devices`, data.deviceId);
    
    const newDevice = {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
    };

    setDoc(deviceRef, newDevice)
      .then(() => {
        toast({
          title: 'Device Added',
          description: `Device "${data.name}" has been registered.`,
        });
        form.reset();
      })
      .catch((error) => {
         const permissionError = new FirestorePermissionError({
          path: deviceRef.path,
          operation: 'create',
          requestResourceData: newDevice,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., My Smart Umbrella" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter the unique ID of your device" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Device
        </Button>
      </form>
    </Form>
  );
}
