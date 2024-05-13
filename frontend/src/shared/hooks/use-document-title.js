import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentApp } from "../utils";

export const useDocumentTitle = (title) => {
  const location = useLocation();

  useEffect(() => {
    if (!title) return;
    const { label } = getCurrentApp(location.pathname);

    document.title = `${title} | Legger x ${label}`;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
};
