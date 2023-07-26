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
