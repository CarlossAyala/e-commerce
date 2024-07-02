export const formatDate = (input) => {
  const date = new Date(input);
  const _date = new Date(input);
  _date.setHours(23, 59, 59, 999);

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const yesterday = new Date();
  yesterday.setHours(23, 59, 59, 999);
  yesterday.setDate(today.getDate() - 1);

  const last7Days = new Date();
  last7Days.setDate(today.getDate() - 7);
  last7Days.setHours(23, 59, 59, 999);

  if (_date.getTime() === today.getTime()) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  }
  if (_date.getTime() === yesterday.getTime()) {
    return `Yesterday ${new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date)}`;
  }
  if (
    _date.getTime() >= last7Days.getTime() &&
    _date.getTime() <= today.getTime()
  ) {
    return `${new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)} ${new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "numeric",
        minute: "numeric",
      },
    ).format(date)}`;
  }
  return `${new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
  }).format(date)} ${new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(date)}`;
};
