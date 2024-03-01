import { useEffect } from "react";
import { APP_NAME } from "@/configs";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    if (!title) return;
    document.title = `${title} | ${APP_NAME}`;

    return () => {
      document.title = APP_NAME;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
};
