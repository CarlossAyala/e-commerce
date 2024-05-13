export const parseURLSearchParams = (params = "") => {
  return Object.fromEntries(new URLSearchParams(params));
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Determines the current app based on the provided route.
 *
 * @param {string} pathname - The current route.
 * @returns {{label: string, to: string, originalTo: string,app: string}} An object containing information about the current app.
 */
export const getCurrentApp = (pathname) => {
  if (!pathname) {
    return {
      label: "E-Commerce",
      to: "/",
      originalTo: "/",
      app: "ecommerce",
    };
  }

  if (pathname.startsWith("/admin")) {
    return {
      label: "Admin",
      to: "/admin",
      originalTo: pathname,
      app: "admin",
    };
  } else if (pathname.startsWith("/seller")) {
    return {
      label: "Seller",
      to: "/seller",
      originalTo: pathname,
      app: "seller",
    };
  } else {
    const originalTo = ["/signin", "/signup"].includes(pathname)
      ? "/"
      : pathname;
    return {
      label: "E-Commerce",
      to: "/",
      originalTo,
      app: "ecommerce",
    };
  }
};

export const ITEMS_PER_PAGE = new Array(10).fill(0).map((_, i) => (i + 1) * 10);

export const paginateArray = ({ data, limit, page }) => {
  const count = data?.length;
  const start = Math.min(limit * (page - 1), count);
  const end = Math.min(page * limit, count);

  return data?.slice(start, end);
};

const IMAGE_TYPES = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export const validFileType = (file) => {
  return IMAGE_TYPES.includes(file.type);
};
export const validFileSize = (file) => {
  return file.size <= 2_000_000;
};
