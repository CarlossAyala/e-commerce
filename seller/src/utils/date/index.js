export * from "./get-time-ago";

export const ddMMYYFormatter = (date) => {
  const valid = new Date(date);

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(valid);
};

export const datePlusTimeFormatter = (date) => {
  const valid = new Date(date);

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(valid);
};

export const dateFullFormatter = (date) => {
  const valid = new Date(date);

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(valid);
};
