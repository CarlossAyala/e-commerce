import { Outlet } from "react-router-dom";
import { Separator } from "@/components";
import { SettingsNav } from "../components/settings-nav";

export const Settings = () => {
  return (
    <main className="container flex-1 space-y-4">
      <section className="mt-2 space-y-0.5">
        <h2 className="tracking-none text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </section>

      <Separator className="hidden sm:block" />

      <section className="grid gap-4 sm:grid-cols-[200px_1fr]">
        <SettingsNav />
        <Outlet />
      </section>
    </main>
  );
};
