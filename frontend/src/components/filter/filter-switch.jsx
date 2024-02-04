import { Label } from "../ui/label";
import { SwitchItem } from "./switch-item";

export const FilterSwitch = ({ headline, items }) => {
  return (
    <div className="grid">
      {headline && <Label>{headline}</Label>}
      <div className="grid space-y-2">
        {items.map((item, index) => (
          <SwitchItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};
