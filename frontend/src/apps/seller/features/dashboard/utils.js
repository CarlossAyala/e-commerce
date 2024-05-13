export const INTERVALS = [
  {
    name: "7d",
    value: "7d",
  },
  {
    name: "30d",
    value: "30d",
  },
  {
    name: "3m",
    value: "3m",
  },
  {
    name: "6m",
    value: "6m",
  },
  {
    name: "1y",
    value: "1y",
  },
  {
    name: "All Time",
    value: "all-time",
  },
];

export const formatDateMetric = (inputDate, interval) => {
  if (interval === "7d") {
    return new Date(inputDate).toLocaleDateString("en-US", {
      weekday: "long",
    });
  } else {
    return new Date(inputDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    });
  }
};
