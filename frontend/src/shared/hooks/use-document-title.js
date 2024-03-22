import { useEffect } from "react";

export const useDocumentTitle = (title) => {
  useEffect(() => {
    if (!title) return;
    document.title = title;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
};
