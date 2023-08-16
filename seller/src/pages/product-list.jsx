import { Fragment, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ChevronUpDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Disclosure, Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import { useGetProducts } from "../features/product";
import { useDebounce } from "../utils/hooks";

const options = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

const headerData = [
  {
    header: "Name",
    key: "name",
  },
  {
    header: "Protocol",
    key: "protocol",
  },
  {
    header: "Port",
    key: "port",
  },
  {
    header: "Rule",
    key: "rule",
  },
  {
    header: "Attached Groups",
    key: "attached_groups",
  },
  {
    header: "Status",
    key: "status",
  },
];

const ProductList = () => {
  const [selectedPerson, setSelectedPerson] = useState(options.at(0));
  const [sidebar, setSidebar] = useState(false);

  const [params, setParams] = useSearchParams();

  const debounceParams = useDebounce(params.toString(), 500);

  const products = useGetProducts(debounceParams);

  console.log("Products", products);

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 py-3">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          Product List
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here you will see a list of all the products you have made.
        </p>
      </section>

      <section className="px-4 py-2">
        <div className="flex items-center gap-x-4">
          <Listbox
            value={selectedPerson}
            onChange={setSelectedPerson}
            as={Fragment}
          >
            <div className="relative grow">
              <Listbox.Button className="flex w-full items-center justify-center gap-x-1 rounded-md border border-gray-300 px-2 py-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                <span className="leading-none">Sort by</span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-gray-300 focus:outline-none">
                  {options.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      as={Fragment}
                      value={person}
                    >
                      {({ active, selected }) => (
                        <li
                          className={clsx(
                            "cursor-default select-none px-4 py-2",
                            active && "bg-gray-100"
                          )}
                        >
                          <span
                            className={clsx(
                              "block text-sm",
                              selected
                                ? "font-semibold text-gray-900"
                                : "text-gray-600"
                            )}
                          >
                            {person.name}
                          </span>
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <button
            onClick={() => setSidebar(true)}
            className="flex grow items-center justify-center gap-x-1 rounded-md border border-gray-300 px-2 py-2"
          >
            <FunnelIcon className="h-5 w-5 text-gray-500" />
            <span className="leading-none">Filters</span>
          </button>

          <Transition.Root show={sidebar} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setSidebar}>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white">
                          <div className="flex h-12 items-center justify-between border-b border-black/10 bg-neutral-50 px-4">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              Filters
                            </Dialog.Title>

                            <button
                              type="button"
                              className="rounded-md text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-neutral-400"
                              onClick={() => setSidebar(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>

                          <div className="flex flex-1 flex-col overflow-y-auto">
                            <div className="my-2 space-y-4">
                              <Disclosure>
                                {({ open }) => (
                                  <div className="px-4">
                                    <Disclosure.Button className="flex w-full items-center justify-between py-3">
                                      <span className="leading-none">
                                        Is team pricing available?
                                      </span>
                                      {open ? (
                                        <MinusIcon className="h-4 w-4 text-gray-600" />
                                      ) : (
                                        <PlusIcon className="h-4 w-4 text-gray-600" />
                                      )}
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="text-gray-500">
                                      Yes! You can purchase a license that you
                                      can share with your entire team.
                                    </Disclosure.Panel>
                                  </div>
                                )}
                              </Disclosure>
                            </div>

                            <div className="sticky bottom-0 mt-auto w-full border-t border-black/20 bg-white p-4">
                              <button className="w-full rounded-md bg-indigo-600 py-3 text-center leading-none text-white">
                                Apply
                              </button>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </section>

      <section className="p-4">
        {/* <DataTable rows={rowData} headers={headerData}>
          {({ rows, headers, getHeaderProps, getTableProps }) => (
            <TableContainer title="DataTable">
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader key={header} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable> */}
      </section>
    </main>
  );
};

export default ProductList;
