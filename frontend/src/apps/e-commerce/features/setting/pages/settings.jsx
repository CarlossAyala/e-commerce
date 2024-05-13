import { Outlet } from "react-router-dom";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/shared/components";
import { Separator } from "@/components";
import { SettingsNav } from "../components/settings-nav";

export const Settings = () => {
  return (
    <main className="container flex-1 space-y-4 pb-10">
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          Manage your account settings and preferences.
        </PageHeaderDescription>
      </PageHeader>

      <Separator />

      <section className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <SettingsNav />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </section>
    </main>
  );
};
