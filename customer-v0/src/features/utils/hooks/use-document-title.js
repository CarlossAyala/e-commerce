import { useLayoutEffect } from 'react';

const DEFAULT_TITLE = 'Fak-Ommerce';

const useDocumentTitle = (title = DEFAULT_TITLE) => {
  useLayoutEffect(() => {
    window.document.title = title;
  }, [title]);
};

export default useDocumentTitle;
