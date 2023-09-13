import { isEven } from "../../../../utils/number";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZES = [10, 20, 30, 40, 50];

const validPage = (page = DEFAULT_PAGE) => {
  const parsePage = +page;

  if (isNaN(parsePage)) return DEFAULT_PAGE;
  if (parsePage < 1) return DEFAULT_PAGE;
  if (!isEven(parsePage)) return DEFAULT_PAGE;

  return parsePage;
};
const validPageSize = (size = DEFAULT_PAGE_SIZE) => {
  const parseSize = +size;

  if (isNaN(parseSize)) return DEFAULT_PAGE_SIZE;
  if (!PAGE_SIZES.includes(parseSize)) return DEFAULT_PAGE_SIZE;

  return parseSize;
};

export const getValidPageSize = (size) => {
  const currentLimit = validPageSize(size);

  const isDefaultLimit = currentLimit === DEFAULT_PAGE_SIZE;

  return [currentLimit, isDefaultLimit];
};

export const getValidPage = (page) => {
  const currentPage = validPage(page);

  const isDefaultPage = currentPage === DEFAULT_PAGE;

  return [currentPage, isDefaultPage];
};
