import { Outlet } from "react-router-dom";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { SettingsNav } from "../components/settings-nav";
import { Separator } from "@/components";

export const Settings = () => {
  return (
    <main className="container flex-1 space-y-6">
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your account settings and preferences.
        </PageHeaderDescription>
      </PageHeader>

      <Separator />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
