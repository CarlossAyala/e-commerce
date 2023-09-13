import { Pagination as PaginationCarbon } from "@carbon/react";
import usePagination from "./hooks/use-pagination";

const Pagination = ({ count }) => {
  const { onChange, page, pageSize, pageSizes } = usePagination();

  return (
    <div>
      <PaginationCarbon
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        onChange={onChange}
        page={page}
        pageSize={pageSize}
        pageSizes={pageSizes}
        size="md"
        totalItems={count}
      />
    </div>
  );
};

export default Pagination;
