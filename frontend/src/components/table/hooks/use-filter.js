import { useContext } from "react";
import { ToolbarFilterContext } from "../context/toolbar-filter";

export const useFilter = () => {
  return useContext(ToolbarFilterContext);
};
