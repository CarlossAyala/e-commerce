import { useSearchParams } from "react-router-dom";
import { PAGE_SIZES, getValidPage, getValidPageSize } from "../utils";

const usePagination = () => {
  const [params, setParams] = useSearchParams();

  const setPage = (page) => {
    const [newPage, isDefaultPage] = getValidPage(page);

    if (!isDefaultPage) {
      params.delete("page");
      params.set("page", newPage);
    }
    setParams(params);
  };

  const setPageSize = () => {
    const [pageSize, isDefault] = getValidPageSize(params.get("limit"));

    if (!isDefault) {
      params.delete("limit");
      params.set("limit", pageSize);
    }
    setParams(params);
  };

  const onChange = ({ page, pageSize }) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const [page] = getValidPage(params.get("page"));
  const [pageSize] = getValidPage(params.get("limit"));
  const pageSizes = PAGE_SIZES;

  return { onChange, page, pageSize, pageSizes };
};

export default usePagination;
