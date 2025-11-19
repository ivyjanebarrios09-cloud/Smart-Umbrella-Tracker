'use server';

import { revalidatePath } from 'next/cache';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';


export async function sendMissingAlert(userId: string) {
  if (!userId) {
    return { error: 'User not authenticated.' };
  }

  try {
    await addDoc(collection(db, "alerts"), {
      userId: userId,
      timestamp: serverTimestamp(),
      message: "Umbrella marked as missing"
    });

    revalidatePath('/dashboard');
    return { success: 'Alert sent successfully!' };
  } catch (error: any) {
    console.error('Error sending alert:', error);
    // In a real app, you'd want to check the error type
    // and provide a more specific message.
    return { error: error.message || 'Failed to send alert. You may not have permission.' };
  }
}
