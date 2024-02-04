import { useSearchParams } from "react-router-dom";
import { FilterGroup } from "./filter-group";
import { FilterFullOption } from "./filter-full-option";
import { FilterFullCheckbox } from "./filter-full-checkbox";
import { getAllFiltersNames, getFiltersActiveLabels } from "./utils";
import { Button } from "../ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Search } from "./search";
import { cn } from "../../libs/utils";

const FILTER_TYPES = {
  search: Search,
  "full-checkbox": FilterFullCheckbox,
  "full-option": FilterFullOption,
  group: FilterGroup,
};

// const ITEMS = ["Option One", "Option Two", "Option Three", "Option Four"];
// const filters = [
//   {
//     filter_type: "search",
//   },
//   {
//     filter_type: "full-checkbox",
//     name: "full-checkbox",
//     headline: "Full Checkbox",
//     items: ITEMS.map((value) => ({ value, label: value })),
//   },
//   {
//     filter_type: "full-option",
//     name: "full-option",
//     headline: "Full Option",
//     items: ITEMS.map((value) => ({ value, label: value })),
//   },
//   {
//     filter_type: "group",
//     headline: "Group",
//     groups: [
//       {
//         filter_type: "input",
//         type: "number",
//         name: "price_min",
//         label: "Price min",
//         placeholder: "Price min",
//       },
//       {
//         filter_type: "input",
//         type: "number",
//         name: "price_max",
//         label: "Price max",
//         placeholder: "Price max",
//       },
//       {
//         filter_type: "input",
//         type: "text",
//         name: "tag",
//         label: "Tag",
//         placeholder: "Tag",
//       },
//       {
//         filter_type: "switch",
//         headline: "Switch group",
//         items: [
//           {
//             name: "switch_1",
//             label: "Switch 1",
//             value: "switch_1",
//           },
//           {
//             name: "switch_2",
//             label: "Switch 2",
//             value: "switch_2",
//           },
//         ],
//       },
//       {
//         filter_type: "checkbox",
//         headline: "Checkbox group",
//         name: "checkbox",
//         items: [
//           {
//             label: "Checkbox 1",
//             value: "checkbox_1",
//           },
//           {
//             label: "Checkbox 2",
//             value: "checkbox_2",
//           },
//           {
//             label: "Checkbox 3",
//             value: "checkbox_3",
//           },
//         ],
//       },
//       {
//         filter_type: "option",
//         headline: "Option group",
//         name: "option",
//         items: [
//           {
//             label: "Option 1",
//             value: "option_1",
//           },
//           {
//             label: "Option 2",
//             value: "option_2",
//           },
//           {
//             label: "Option 3",
//             value: "option_3",
//           },
//         ],
//       },
//     ],
//   },
// ];

export const Filters = ({ filters = [], className = "" }) => {
  const [params, setParams] = useSearchParams();

  // TODO
  const handleReset = () => {
    const newParams = new URLSearchParams(params);
    const names = getAllFiltersNames(filters);

    for (const name of names) {
      newParams.delete(name);
    }

    setParams(newParams);
  };

  const activeFilters = getFiltersActiveLabels(params, filters);

  return (
    <section
      className={cn("flex flex-1 flex-wrap items-center gap-2", className)}
    >
      {filters.map((filter, index) => {
        const FilterComponent = FILTER_TYPES[filter.filter_type];

        return <FilterComponent key={index} {...filter} />;
      })}

      {activeFilters.length > 0 && (
        <Button
          variant="ghost"
          onClick={handleReset}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <XMarkIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </section>
  );
};
