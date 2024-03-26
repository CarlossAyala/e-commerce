import { Logo } from "@/shared/components";

export const Footer = () => {
  return (
    <footer className="border-t py-4">
      <div className="container space-y-4">
        <Logo />

        <section className="text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} <strong>Fake-Commerce</strong>.
            All rights reserved.
          </p>
        </section>
      </div>
    </footer>
  );
};
