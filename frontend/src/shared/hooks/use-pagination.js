import { useSearchParams } from "react-router-dom";

const DEFAULT_PAGE = 1;
const PAGE_SIZES = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];

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

const getPageSize = (size) => {
  const pageSize = validatePageSize(size);

  const isDefault = pageSize === DEFAULT_PAGE_SIZE;

  return [pageSize, isDefault];
};

const getPage = (pageValue) => {
  const page = validatePage(pageValue);

  const isDefault = page === DEFAULT_PAGE;

  return [page, isDefault];
};

export const usePagination = () => {
  const [params, setParams] = useSearchParams();

  const setPage = (pageValue) => {
    const [page, isDefault] = getPage(pageValue);

    if (isDefault) params.delete("page");
    else params.set("page", page);

    setParams(params);
  };

  const setPageSize = (pageSizeValue) => {
    const [pageSize, isDefault] = getPageSize(pageSizeValue);

    if (isDefault) params.delete("limit");
    else params.set("limit", pageSize);

    setParams(params);
  };

  const handlePage = (page) => {
    setPage(page);
  };
  const handlePageSize = (pageSize) => {
    setPage(DEFAULT_PAGE);
    setPageSize(pageSize);
  };

  const [page] = getPage(params.get("page"));
  const [pageSize] = getPageSize(params.get("limit"));
  const pageSizes = PAGE_SIZES;
  const initialPage = DEFAULT_PAGE;

  return {
    initialPage,
    page,
    pageSize,
    pageSizes,
    handlePage,
    handlePageSize,
  };
};
