export * from "./price.formatter";
export * from "./date.formatter";

export const ratingFormatter = (rating) => {
  return Number(rating).toFixed(2);
};
