import { Label } from "../ui/label";
import { CheckboxItem } from "./checkbox-item";

export const FilterCheckbox = ({ headline, name, items }) => {
  return (
    <div className="grid">
      {headline && (
        <Label htmlFor={name} className="mb-1">
          {headline}
        </Label>
      )}
      <ul className="space-y-1.5">
        {items.map((item, index) => (
          <CheckboxItem key={index} name={name} {...item} />
        ))}
      </ul>
    </div>
  );
};
