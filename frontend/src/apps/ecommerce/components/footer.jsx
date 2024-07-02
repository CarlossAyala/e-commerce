import { StyleCustomize } from "@/features/theme";
import { Logo } from "@/shared/components";

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-[22px] fill-muted-foreground hover:fill-primary"
  >
    <title>X</title>
    <path d="M9.52373 6.77566L15.4811 0H14.0699L8.89493 5.88201L4.7648 0H0L6.24693 8.89549L0 15.9999H1.4112L6.87253 9.78701L11.2352 15.9999H16M1.92053 1.04126H4.08853L14.0688 15.0098H11.9003" />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="size-6 fill-muted-foreground hover:fill-primary"
  >
    <title>Github</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.18063 0C4.11532 0 0.0205078 4.125 0.0205078 9.22819C0.0205078 13.3074 2.64419 16.7604 6.28394 17.9826C6.739 18.0744 6.90569 17.784 6.90569 17.5397C6.90569 17.3258 6.89069 16.5924 6.89069 15.8284C4.34257 16.3785 3.81194 14.7283 3.81194 14.7283C3.40244 13.6588 2.79569 13.3839 2.79569 13.3839C1.96169 12.8186 2.85644 12.8186 2.85644 12.8186C3.78157 12.8797 4.26701 13.7659 4.26701 13.7659C5.08582 15.1714 6.40525 14.7742 6.93607 14.5297C7.01182 13.9339 7.25463 13.5214 7.51244 13.2922C5.48013 13.0783 3.34188 12.2839 3.34188 8.73919C3.34188 7.73081 3.70563 6.90581 4.28201 6.26419C4.19107 6.03506 3.87251 5.08763 4.37313 3.81956C4.37313 3.81956 5.14657 3.57506 6.8905 4.76681C7.63715 4.56481 8.40714 4.46205 9.18063 4.46119C9.95407 4.46119 10.7425 4.56825 11.4706 4.76681C13.2147 3.57506 13.9881 3.81956 13.9881 3.81956C14.4888 5.08763 14.17 6.03506 14.0791 6.26419C14.6706 6.90581 15.0194 7.73081 15.0194 8.73919C15.0194 12.2839 12.8811 13.0629 10.8336 13.2922C11.1674 13.5825 11.4554 14.1324 11.4554 15.0034C11.4554 16.2409 11.4404 17.2341 11.4404 17.5395C11.4404 17.784 11.6073 18.0744 12.0621 17.9827C15.7019 16.7603 18.3256 13.3074 18.3256 9.22819C18.3406 4.125 14.2308 0 9.18063 0Z"
    />
  </svg>
);

const socials = [
  {
    href: "https://x.com/carloss_ayala",
    icon: XIcon,
  },
  {
    href: "https://github.com/CarlossAyala",
    icon: GithubIcon,
  },
];

export const Footer = () => {
  return (
    <footer className="border-t py-8">
      <div className="container space-y-6">
        <section className="flex items-center justify-between">
          <Logo />

          <StyleCustomize />
        </section>
        <section className="flex items-center justify-between">
          <div>
            <p className="text-center text-sm text-muted-foreground">
              {new Date().getFullYear()} &copy; Carlos Ayala
            </p>
          </div>
          <div className="flex items-center justify-center gap-x-2">
            {socials.map((social) => (
              <a
                key={social.href}
                target="_blank"
                rel="noreferrer"
                href={social.href}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
};
