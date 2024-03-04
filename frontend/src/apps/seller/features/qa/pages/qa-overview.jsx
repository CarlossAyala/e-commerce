import { Filters } from "@/components";
import { QAOverviewTable } from "../components/qa-overview-table";
import { QUESTION_STATUS } from "../utils";

const filters = [
  {
    filter_type: "search",
  },
  {
    filter_type: "full-checkbox",
    name: "status",
    headline: "Status",
    items: Object.values(QUESTION_STATUS).map(({ value, label }) => ({
      value,
      label,
    })),
  },
];

export const QAOverview = () => {
  return (
    <main className="flex-1 space-y-4 px-6 py-4">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
        QA Overview
      </h2>

      <Filters filters={filters} />

      <QAOverviewTable />
    </main>
  );
};
