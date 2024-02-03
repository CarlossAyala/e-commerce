import { Label } from "../ui/label";
import { CheckboxItem } from "./checkbox-item";

export const FilterCheckbox = ({ headline, name, items }) => {
  return (
    <div className="grid">
      <Label htmlFor={name} className="mb-1">
        {headline}
      </Label>
      <div className="grid">
        {items.map((item, index) => (
          <CheckboxItem key={index} name={name} {...item} />
        ))}
      </div>
    </div>
  );
};
