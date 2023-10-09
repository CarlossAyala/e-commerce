import { Outlet } from "react-router-dom";
import { MainContent, Separator } from "../../../../../components";
import { SettingsNav } from "../components/settings-nav";

const Settings = () => {
  return (
    <MainContent className="max-w-5xl space-y-6">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold">
          Settings
        </h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </section>

      <Separator className="hidden sm:block" />

      <section className="grid gap-6 sm:grid-cols-[200px_1fr]">
        <SettingsNav />
        <Outlet />
      </section>
    </MainContent>
  );
};

export default Settings;
