import slug from "slugify";

const slugOptions = {
  lower: true,
  locale: "la",
};

export const slugify = (str) => slug(str, slugOptions);
