import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "@/shared/components";
import { Tabs, TabsList, TabsTrigger } from "@/components";
import { cn } from "@/libs";

const THEMES = [
  {
    value: "system",
    icon: ComputerDesktopIcon,
  },
  {
    value: "light",
    icon: SunIcon,
  },
  {
    value: "dark",
    icon: MoonIcon,
  },
];

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs value={theme} onValueChange={setTheme}>
      <TabsList>
        {THEMES.map((_theme) => (
          <TabsTrigger key={_theme.value} value={_theme.value}>
            <_theme.icon
              className={cn(
                "size-5 stroke-muted-foreground hover:stroke-primary",
                _theme.value === theme ? "stroke-primary" : "",
              )}
            />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
