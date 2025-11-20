'use client';

import { AddDeviceForm } from '@/components/dashboard/devices/add-device-form';
import { DeviceList } from '@/components/dashboard/devices/device-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function DevicesCard() {
  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="animated-gradient-text">Add New Device</CardTitle>
                <CardDescription>Register a new device by providing a name and its unique device ID.</CardDescription>
            </CardHeader>
            <CardContent>
                <AddDeviceForm />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="animated-gradient-text">Your Devices</CardTitle>
                <CardDescription>A list of all your registered devices.</CardDescription>
            </CardHeader>
            <CardContent>
                <DeviceList />
            </CardContent>
        </Card>
    </div>
  );
}
