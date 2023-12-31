import { useEffect, useRef, useState } from "react";
import { useIsFirstRender } from "../hooks";
import { cn } from "../libs/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Slider = ({ items, itemWidth, containerGap }) => {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = calculateItemsPerPage(
        containerRef.current.offsetWidth,
        itemWidth,
        containerGap,
      );

      setItemsPerPage(newItemsPerPage);

      const currentTotalPages = Math.ceil(items.length / newItemsPerPage);
      setCurrentPage((prevPage) => Math.min(prevPage, currentTotalPages));
    };

    if (isFirstRender) handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const visibleSlides = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4">
        {visibleSlides.map((slide, index) => (
          <div
            className="flex h-24 items-center justify-center bg-slate-400"
            key={index}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap justify-between gap-4">
        <button
          onClick={goToPrevPage}
          className={cn(
            "rounded p-1 text-white",
            currentPage === 1
              ? "cursor-not-allowed bg-gray-500"
              : "bg-gray-800",
          )}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>

        <div className="flex items-center justify-center space-x-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "inline-block h-1 w-4",
                currentPage === index + 1 ? "bg-gray-800" : "bg-gray-400",
              )}
            ></span>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          className={cn(
            "rounded p-1 text-white",
            currentPage === totalPages
              ? "cursor-not-allowed bg-gray-500"
              : "bg-gray-800",
          )}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

function calculateItemsPerPage(containerSize, itemSize, gapSize) {
  return Math.max(
    1,
    Math.floor((containerSize + gapSize) / (itemSize + gapSize)),
  );
}
