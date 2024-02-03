import { useSearchParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export const SwitchItem = ({ name, value, label }) => {
  const [params, setParams] = useSearchParams();

  const isChecked = params.get(name);

  const handleCheckedChange = () => {
    const newParams = new URLSearchParams(params);

    if (isChecked) {
      newParams.delete(name);
    } else {
      newParams.append(name, value);
    }
    setParams(newParams);
  };

  return (
    <Label
      htmlFor={name}
      className="mb-0 flex grow items-center gap-x-2 font-normal text-foreground"
    >
      <Switch
        id={name}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
      />
      {label}
    </Label>
  );
};
