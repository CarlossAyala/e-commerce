import { useSearchParams } from "react-router-dom";
import { cn } from "@/shared/utils";
import { Checkbox, Label } from "..";

export const OptionItem = ({ name, value, label }) => {
  const [params, setParams] = useSearchParams();

  const valueParam = params.get(name);
  const isSelected = valueParam === value;

  const handleCheckedChange = () => {
    const newParams = new URLSearchParams(params);

    if (isSelected) {
      newParams.delete(name);
    } else {
      newParams.delete(name);
      newParams.append(name, value);
    }
    setParams(newParams);
  };

  return (
    <Label className="mb-0 flex grow items-center gap-2 py-1 font-normal text-foreground">
      <Checkbox
        checked={isSelected}
        onCheckedChange={handleCheckedChange}
        name={name}
        value={value}
        className={cn("rounded-full shadow-none", !isSelected && "border")}
      />
      {label}
    </Label>
  );
};
