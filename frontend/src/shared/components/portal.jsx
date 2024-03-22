import { Portals } from ".";
import { useDocumentTitle } from "../hooks";

export const Portal = () => {
  useDocumentTitle("Portal");

  return (
    <main className="grid min-h-screen place-content-center p-6">
      <section className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-medium tracking-tight">Portal</h2>
          <p className="text-sm text-muted-foreground">
            Select the app you want to access.
          </p>
        </div>

        <Portals />
      </section>
    </main>
  );
};
