'use client';

import { AddDeviceForm } from '@/components/dashboard/devices/add-device-form';
import { DeviceList } from '@/components/dashboard/devices/device-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DevicesPage() {
  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Add New Device</CardTitle>
                <CardDescription>Register a new device by providing a name and its unique device ID.</CardDescription>
            </CardHeader>
            <CardContent>
                <AddDeviceForm />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Your Devices</CardTitle>
                <CardDescription>A list of all your registered devices.</CardDescription>
            </CardHeader>
            <CardContent>
                <DeviceList />
            </CardContent>
        </Card>
    </div>
  );
}
