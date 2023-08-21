import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const StatItem = ({ title, value, to }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
      <div className="p-4 md:p-5 w-full">
        <p className="text-xs leading-tight uppercase tracking-wide text-gray-600">
          {title}
        </p>
        <p className="leading-tight text-xl mt-1 font-semibold text-gray-800">
          {value}
        </p>
      </div>
      <Link
        to={to}
        className="py-3 px-4 md:px-5 inline-flex w-full justify-between items-center text-sm text-gray-600 border-t border-gray-300 hover:bg-gray-50"
      >
        View
        <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default StatItem;
