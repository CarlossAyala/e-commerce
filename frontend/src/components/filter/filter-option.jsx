import { Label } from "../ui/label";
import { OptionItem } from "./option-item";

export const FilterOption = ({ headline, name, items }) => {
  return (
    <div className="grid">
      <Label htmlFor={name} className="mb-1">
        {headline}
      </Label>
      <div className="grid">
        {items.map((item, index) => (
          <OptionItem key={index} name={name} {...item} />
        ))}
      </div>
    </div>
  );
};
