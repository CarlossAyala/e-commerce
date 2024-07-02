import { ArrowUturnLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Button, Label } from "@/shared/components";
import { cn } from "@/shared/utils";
import { themes as THEMES } from "../../../scripts/utils";
import { useTheme } from "../hooks";
import { MODES } from "../utils";

export const Customize = () => {
  const { mode, handleModeChange, theme, handleThemeChange } = useTheme();

  const handleReset = () => {
    handleThemeChange();
    handleModeChange();
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-6">
      <div className="flex items-start pt-4 md:pt-0">
        <div className="space-y-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Customize
          </div>
          <div className="text-xs text-muted-foreground">
            Pick a style and color for your components.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-[0.5rem]"
          onClick={handleReset}
        >
          <ArrowUturnLeftIcon className="size-5" />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <div className="space-y-1.5">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map((t) => {
              const isActive = theme === t.name;

              return (
                <Button
                  variant="outline"
                  size="sm"
                  key={t.name}
                  onClick={() => {
                    handleThemeChange(t.name);
                  }}
                  className={cn(
                    "justify-start",
                    isActive && "border-2 border-primary",
                  )}
                  style={{
                    "--theme-primary": `hsl(${
                      t?.activeColor[mode === "dark" ? "dark" : "light"]
                    })`,
                  }}
                >
                  <span
                    className={cn(
                      "mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[--theme-primary]",
                    )}
                  >
                    {isActive && <CheckIcon className="h-4 w-4 text-white" />}
                  </span>
                  {t.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((theme) => (
              <Button
                key={theme.value}
                variant="outline"
                size="sm"
                onClick={() => handleModeChange(theme.value)}
                className={cn(
                  mode === theme.value && "border-2 border-primary",
                )}
              >
                <theme.icon className="mr-1 size-5 -translate-x-1" />
                {theme.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
