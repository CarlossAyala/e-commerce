import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { themes } from "../../scripts/utils";

export const THEMES_NAMES = themes.map((theme) => theme.name);

export const MODES = [
  {
    value: "system",
    icon: ComputerDesktopIcon,
    label: "System",
  },
  {
    value: "light",
    icon: SunIcon,
    label: "Light",
  },
  {
    value: "dark",
    icon: MoonIcon,
    label: "Dark",
  },
];
