import { Label, Switch } from "../../../../../components";
import { cn } from "../../../../../libs/utils";

export const StoresFilters = ({ className }) => {
  return (
    <aside className={cn("space-y-2", className)}>
      <p className="text-sm font-medium tracking-tight">Filters</p>

      <Label className="m-0 flex items-center justify-between space-x-2 rounded border border-dashed px-3 py-2 font-normal leading-tight text-muted-foreground">
        <span>Official Stores</span>
        <Switch />
      </Label>
    </aside>
  );
};
