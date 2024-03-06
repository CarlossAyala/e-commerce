export const Dashboard = () => {
  return (
    <main className="container flex-1">
      <section className="mt-3">
        <h1 className="text-3xl font-semibold leading-tight text-neutral-800">
          Dashboard
        </h1>
        <p className="mt-1 leading-tight text-neutral-600">
          Welcome back, <strong>John Doe</strong>!
        </p>
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            About your store
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are some statistics about your store.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Latest sales
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the latest sales from your store.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Stock Alert
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the products that are running low on stock.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Questions
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the latest questions about your products.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Reviews
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the latest reviews about your products.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold leading-tight tracking-tight">
            Products
          </h2>
          <p className="mt-1 leading-tight text-neutral-600">
            Here are the latest products.
          </p>
        </div>
      </section>
    </main>
  );
};
