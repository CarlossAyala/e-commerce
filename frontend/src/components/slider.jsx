import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useIsFirstRender } from "@/shared/hooks";
import { cn } from "@/libs";
import { Skeleton } from ".";

function calculateItemsPerPage(containerSize, itemSize, gapSize) {
  return Math.max(
    1,
    Math.floor((containerSize + gapSize) / (itemSize + gapSize)),
  );
}
const CONTAINER_GAP = 16;

export const Slider = ({
  items,
  containerClassName,
  itemWidth,
  renderSlide,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = calculateItemsPerPage(
        containerRef.current.offsetWidth,
        itemWidth,
        CONTAINER_GAP,
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
      <div className={containerClassName}>
        {visibleSlides.map((slide, index) => renderSlide(slide, index))}
      </div>

      <div className="mt-2 flex justify-between gap-4">
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

        <div className="flex flex-wrap items-center justify-center gap-1">
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

Slider.Skeleton = function SliderSkeleton({ containerClassName, itemWidth }) {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const containerRef = useRef(null);

  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = calculateItemsPerPage(
        containerRef.current.offsetWidth,
        itemWidth,
        CONTAINER_GAP,
      );

      setItemsPerPage(newItemsPerPage);
    };

    if (isFirstRender) handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className={containerClassName}>
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
};

Slider.Error = function SliderError({ message = "Error" }) {
  return (
    <div className="flex w-full items-center justify-center rounded border border-dashed py-12">
      <p className="text-center text-gray-500">{message}</p>
    </div>
  );
};
