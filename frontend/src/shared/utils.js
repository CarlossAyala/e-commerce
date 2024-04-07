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
