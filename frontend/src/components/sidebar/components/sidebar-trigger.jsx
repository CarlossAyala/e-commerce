import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { useSidebarContext } from "../hooks";

const SidebarTrigger = () => {
  const { handleOpen } = useSidebarContext();

  return (
    <button
      onClick={handleOpen}
      className="flex p-2 items-center justify-center"
    >
      <Bars3CenterLeftIcon className="h-6 w-6 text-gray-600" />
    </button>
  );
};

export default SidebarTrigger;
