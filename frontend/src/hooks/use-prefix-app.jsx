import { useLocation } from "react-router-dom";

// TODO: Add validation for prefix ["admin","seller", "customer"]
const usePrefixApp = () => {
  const location = useLocation();
  const prefix = location.pathname.split("/")[1];

  return prefix;
};

export default usePrefixApp;
