/**
 * @param {string} str - string to be slugified
 * @returns {string} string - with dashes instead of non-alphanumeric characters
 */
const slugify = (str) => {
  return (
    str
      // Replace non-alphanumeric characters with a dash
      .replace(/[^a-zA-Z0-9]/g, "-")
      // Remove consecutive dashes
      .replace(/-+/g, "-")
      // Remove leading and trailing dashes
      .replace(/^-|-$/g, "")
      // Convert to lowercase
      .toLowerCase()
  );
};

module.exports = slugify;
