export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZES = [10, 20, 30, 40, 50];

export const getPageSize = (size) => {
  const parseSize = parseInt(size);

  return PAGE_SIZES.includes(parseSize) ? parseSize : DEFAULT_PAGE_SIZE;
};

export const getPage = (page) => {
  let parsePage = parseInt(page);

  if (isNaN(parsePage) || parsePage < DEFAULT_PAGE) {
    parsePage = DEFAULT_PAGE;
  }

  return parsePage;
};
