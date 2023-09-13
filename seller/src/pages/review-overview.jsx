import { TableReviewOverview, useGetReviewOverview } from "../features/review";

const ReviewOverview = () => {
  const reviews = useGetReviewOverview();
  console.log("Reviews", reviews);

  return (
    <main className="flex w-full flex-col overflow-auto bg-white">
      <section className="px-4 mt-3">
        <div className="mb-3">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            Reviews
          </h2>
          <p className="text-sm text-gray-600 leading-snug">
            Latest reviews about your products
          </p>
        </div>

        <TableReviewOverview {...reviews} hasPagination />
      </section>
    </main>
  );
};

export default ReviewOverview;
