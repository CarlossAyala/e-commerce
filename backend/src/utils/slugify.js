const slug = require("slugify");
const slugOptions = {
  lower: true,
  locale: "la",
};

const slugify = (str) => {
  return slug(str, slugOptions);
};

module.exports = slugify;
