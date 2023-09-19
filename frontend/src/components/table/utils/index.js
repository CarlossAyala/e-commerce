export const DEFAULT_PAGE = 1;
export const PAGE_SIZES = [2, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
export const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];

const validatePage = (page = DEFAULT_PAGE) => {
  const parsePage = +page;

  if (isNaN(parsePage)) return DEFAULT_PAGE;
  if (parsePage < DEFAULT_PAGE) return DEFAULT_PAGE;

  return parseInt(parsePage, 10);
};
const validatePageSize = (size = DEFAULT_PAGE_SIZE) => {
  const parseSize = +size;

  if (isNaN(parseSize)) return DEFAULT_PAGE_SIZE;
  if (!PAGE_SIZES.includes(parseSize)) return DEFAULT_PAGE_SIZE;

  return parseSize;
};

export const getPageSize = (size) => {
  const pageSize = validatePageSize(size);

  const isDefault = pageSize === DEFAULT_PAGE_SIZE;

  return [pageSize, isDefault];
};

export const getPage = (pageValue) => {
  const page = validatePage(pageValue);

  const isDefault = page === DEFAULT_PAGE;

  return [page, isDefault];
};
