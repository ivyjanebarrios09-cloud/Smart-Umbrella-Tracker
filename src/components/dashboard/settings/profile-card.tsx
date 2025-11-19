'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useFirebase, useMemoFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
});

type ProfileFormValue = z.infer<typeof formSchema>;

interface UserProfile {
    name?: string;
    email?: string;
}

export function ProfileCard() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { firestore, user } = useFirebase();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const form = useForm<ProfileFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  
  useEffect(() => {
      if (userProfile) {
          form.reset({ name: userProfile.name || '' });
      }
  }, [userProfile, form]);

  const onSubmit = async (data: ProfileFormValue) => {
    if (!firestore || !user || !userProfileRef) {
      toast({ variant: 'destructive', title: 'Error', description: 'User not authenticated.' });
      return;
    }

    setLoading(true);
    
    const profileUpdate = {
        name: data.name,
        email: user.email, // ensure email is preserved
        updatedAt: serverTimestamp(),
    };

    setDoc(userProfileRef, profileUpdate, { merge: true })
      .then(() => {
        toast({
          title: 'Profile Updated',
          description: 'Your name has been updated successfully.',
        });
      })
      .catch(() => {
         const permissionError = new FirestorePermissionError({
          path: userProfileRef.path,
          operation: 'update',
          requestResourceData: profileUpdate,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This is how others will see you on the site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Your name" {...field} disabled={isProfileLoading || loading}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormItem>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={user?.email || ''} disabled />
            </FormItem>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isProfileLoading || loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
