const Home = () => {
  return (
    <main className="space-y-4 overflow-auto p-4">
      <section className="space-y-2">
        <h2 className="tracking-none scroll-m-20 text-3xl font-bold leading-none">
          Dashboard
        </h2>
        <p className="text-sm leading-tight">
          Welcome back, <strong>John Doe</strong>
        </p>
      </section>

      <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2 overflow-hidden rounded-md border p-4 shadow">
          <p className="text-sm font-medium text-muted-foreground">Revenue</p>
          <p className="text-2xl font-medium tabular-nums">$ 405,091.00</p>
        </div>
        <div className="space-y-2 overflow-hidden rounded-md border p-4 shadow">
          <p className="text-sm font-medium text-muted-foreground">Revenue</p>
          <p className="text-2xl font-medium tabular-nums">$ 405,091.00</p>
        </div>
        <div className="space-y-2 overflow-hidden rounded-md border p-4 shadow">
          <p className="text-sm font-medium text-muted-foreground">Revenue</p>
          <p className="text-2xl font-medium tabular-nums">$ 405,091.00</p>
        </div>
        <div className="space-y-2 overflow-hidden rounded-md border p-4 shadow">
          <p className="text-sm font-medium text-muted-foreground">Revenue</p>
          <p className="text-2xl font-medium tabular-nums">$ 405,091.00</p>
        </div>
      </section>
    </main>
  );
};

export default Home;
