import { Logo } from "@/shared/components";

export const Footer = () => {
  return (
    <footer className="border-t py-8">
      <section className="container flex items-center justify-between">
        <Logo />

        <div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Legger
          </p>
        </div>
      </section>
    </footer>
  );
};
