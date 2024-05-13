import { useState } from "react";

export const useLocalSearchParams = (init) => {
  const [params, setParams] = useState(new URLSearchParams(init));

  return {
    params,
    setParams,
  };
};
