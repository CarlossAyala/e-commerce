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

const DATE_UNITS = [
  ['year', 31536000],
  ['month', 2629800],
  ['day', 86400],
  ['hour', 3600],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];
const getSecondsDiff = (timestamp) => (Date.now() - timestamp) / 1000;
const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, seconds] of DATE_UNITS) {
    if (secondsElapsed >= seconds || unit === 'second') {
      const value = Math.floor(secondsElapsed / seconds) * -1;
      return { value, unit };
    }
  }
};
export const getTimeAgo = (date) => {
  const timestamp = new Date(date).getTime();

  const secondsElapsed = getSecondsDiff(timestamp);
  const { value, unit } = getUnitAndValueDate(secondsElapsed);
  return new Intl.RelativeTimeFormat('es-AR').format(value, unit);
};

export const joinedAt = (date) => {
  const valid = new Date(date);

  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
  }).format(valid);
};

export const ddMMYYFormatter = (date) => {
  const valid = new Date(date);

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(valid);
};
