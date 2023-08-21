const StatContainer = ({ children }) => {
  return (
    <>
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        Last 30 days
      </h1>
      <p className="text-sm text-gray-600">
        Key information about your business performance.
      </p>
      <div className="grid mt-4 gap-4 grid-cols-2">{children}</div>
    </>
  );
};

export default StatContainer;
