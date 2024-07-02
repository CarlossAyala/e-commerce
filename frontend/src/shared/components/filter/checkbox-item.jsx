import { useSearchParams } from "react-router-dom";
import { cn } from "@/shared/utils";
import { Checkbox, Label } from "..";

export const CheckboxItem = ({ name, value, label }) => {
  const [params, setParams] = useSearchParams();

  const values = params.getAll(name);
  const isChecked = values.includes(value);

  const handleCheckedChange = () => {
    const newParams = new URLSearchParams(params);

    if (isChecked) {
      newParams.delete(name, value);
    } else {
      newParams.append(name, value);
    }
    setParams(newParams);
  };

  return (
    <div>
      <Label className="mb-0 flex grow items-center gap-2 font-normal text-foreground">
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckedChange}
          name={name}
          value={value}
          className={cn("shadow-none", !isChecked && "border-black/30")}
        />
        {label}
      </Label>
    </div>
  );
};
