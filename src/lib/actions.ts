'use server';

import { revalidatePath } from 'next/cache';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';


export async function sendMissingAlert(userId: string, deviceId: string) {
  if (!userId) {
    return { error: 'User not authenticated.' };
  }
  if (!deviceId) {
    return { error: 'Device ID not provided.' };
  }

  try {
    // This now points to a specific document, 'controls', to be updated.
    const alertRef = doc(db, `users/${userId}/devices/${deviceId}/alerts`, 'controls');
    
    await setDoc(alertRef, {
      deviceId: deviceId,
      buzzer: true, // Example action
      light: true,  // Example action
      message: "Umbrella marked as missing",
      timestamp: serverTimestamp(),
    }, { merge: true });

    revalidatePath('/dashboard');
    return { success: 'Alert sent successfully!' };
  } catch (error: any) {
    console.error('Error sending alert:', error);
    // In a real app, you'd want to check the error type
    // and provide a more specific message.
    return { error: error.message || 'Failed to send alert. You may not have permission.' };
  }
}
