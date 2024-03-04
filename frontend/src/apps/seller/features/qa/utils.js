export const QUESTION_STATUS = {
  answered: {
    value: "answered",
    label: "Answered",
  },
  queue: {
    value: "queue",
    label: "Queue",
  },
  rejected: {
    value: "rejected",
    label: "Rejected",
  },
};

export const qaActionRoutes = {
  root: "/seller/qa",
  product: (productId, query) => `/seller/qa/${productId}${query}`,
};
