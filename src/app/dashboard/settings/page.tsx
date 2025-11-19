import { ProfileCard } from "@/components/dashboard/settings/profile-card";
import { ThemeCard } from "@/components/dashboard/settings/theme-card";
import { DevicesCard } from "@/components/dashboard/settings/devices-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
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
