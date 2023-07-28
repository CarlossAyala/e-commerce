export const dateFormater = (date) => {
  const valid = new Date(date);

  return new Intl.DateTimeFormat('es-AR', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,

    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(valid);
};

export const orderListDateFormater = (date) => {
  const valid = new Date(date);

  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(valid);
};

export const monthYearFormat = (date) => {
  const currentDate = new Date();
  const resourceDate = new Date(date);

  const [currentMonth, currentYear] = [
    currentDate.getMonth() + 1,
    currentDate.getFullYear(),
  ];
  const [resourceMonth, resourceYear] = [
    resourceDate.getMonth() + 1,
    resourceDate.getFullYear(),
  ];

  if (currentMonth === resourceMonth && currentYear === resourceYear) {
    return 'This month';
  } else if (
    currentMonth - 1 === resourceMonth &&
    currentYear === resourceYear
  ) {
    return 'Last month';
  } else if (currentYear === resourceYear) {
    return new Intl.DateTimeFormat('es-AR', {
      month: 'long',
    }).format(resourceDate);
  } else {
    return new Intl.DateTimeFormat('es-AR', {
      month: 'long',
      year: 'numeric',
    }).format(resourceDate);
  }
};
