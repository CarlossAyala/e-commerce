const Dashboard = () => {
  return (
    <main className="flex w-full flex-col space-y-4 overflow-auto">
      <section className="mt-2 px-4">
        <h1 className="mb-5 text-2xl font-medium leading-tight text-neutral-800">
          Dashboard
        </h1>

        <h2 className="text-base font-semibold leading-snug text-gray-900">
          Last 30 days
        </h2>
        <p className="mt-1 text-sm leading-snug text-gray-600">
          Key information about your business performance.
        </p>
      </section>

      <section className="px-4">
        <h2 className="text-base font-semibold leading-snug text-gray-900">
          Last 30 days
        </h2>
        <p className="mt-1 text-sm leading-snug text-gray-600">
          Key information about your business performance.
        </p>
      </section>
    </main>
  );
};

export default Dashboard;
