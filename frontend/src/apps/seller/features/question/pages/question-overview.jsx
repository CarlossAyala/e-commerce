import { Filters } from "@/components";
import { OverviewTable } from "../components/overview-table";

const filters = [
  {
    filter_type: "search",
  },
];

export const QuestionOverview = () => {
  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        Questions Overview
      </h2>

      <Filters filters={filters} />

      <OverviewTable />
    </main>
  );
};
