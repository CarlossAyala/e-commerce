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

export const questionActionRoutes = {
  root: "/seller/questions",
  product: (productId, query) =>
    `/seller/questions/${productId}${query ? `?${query}` : ""}`,
};
