import { ProfileCard } from "@/components/dashboard/settings/profile-card";
import { ThemeCard } from "@/components/dashboard/settings/theme-card";
import { DevicesCard } from "@/components/dashboard/settings/devices-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
       <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
      </Link>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold tracking-tight">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings, devices, and theme preferences.
        </p>
      </div>
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileCard />
        </TabsContent>
        <TabsContent value="devices">
          <DevicesCard />
        </TabsContent>
        <TabsContent value="appearance">
          <ThemeCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
