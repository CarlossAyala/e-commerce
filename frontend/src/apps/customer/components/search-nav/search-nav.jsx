import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDebounced } from "../../../../hooks";
import { SearchCategories } from "./search-categories";
import { SearchProducts } from "./search-products";
import { SearchStores } from "./search-stores";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Separator,
} from "../../../../components";

export const SearchNav = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const debounced = useDebounced(search);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const cleanUp = () => {
    setSearch("");
    setOpen(false);
  };

  const handleClick = () => {
    setOpen((open) => !open);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={handleClick}
        >
          <MagnifyingGlassIcon className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent
        closeIcon={false}
        className="top-4 flex max-h-[75vh] max-w-lg translate-y-0 flex-col gap-0 overflow-hidden p-0 sm:top-20 sm:rounded-md md:top-24 lg:top-[10vh]"
      >
        <div className="flex items-center border-b px-3">
          <MagnifyingGlassIcon className="mr-2 size-5 shrink-0 opacity-50" />
          <Input
            className="h-12 border-0 px-0 shadow-none outline-none focus-visible:ring-0"
            placeholder="Search for Categories, Products and Stores"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto">
          <SearchCategories search={search} cleanUp={cleanUp} />
          <Separator className="" />
          <SearchProducts search={debounced} cleanUp={cleanUp} />
          <Separator className="" />
          <SearchStores search={debounced} cleanUp={cleanUp} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
