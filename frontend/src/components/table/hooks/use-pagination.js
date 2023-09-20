import { useSearchParams } from "react-router-dom";
import { DEFAULT_PAGE, PAGE_SIZES, getPage, getPageSize } from "../utils";

const usePagination = () => {
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

export default usePagination;
