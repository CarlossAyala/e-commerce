const splitAndDecode = (str) => {
  if (!str) return [];
  return str.split(',').map((item) => decodeURIComponent(item));
};

module.exports = splitAndDecode;
