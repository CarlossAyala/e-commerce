const locale = 'es-AR';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
const optionsPrice = {
  currency: 'ARS',
  currencyDisplay: {
    symbol: 'symbol',
    narrow: 'narrowSymbol',
    code: 'code',
    name: 'name',
  },
  signDisplay: {
    auto: 'auto',
    always: 'always',
    exceptZero: 'exceptZero',
    negative: 'negative',
    never: 'never',
  },
  style: {
    decimal: 'decimal',
    currency: 'currency',
    percent: 'percent',
    unit: 'unit',
  },
  maximumFractionDigits: 2,
};

/**
 * If price is not specified, defaults formated price with 0
 * @param {number} price To format
 * @returns formated price like price(1000) => '$ 1000'
 */
export const price = (price = 0) => {
  const {
    currency,
    currencyDisplay,
    signDisplay,
    style,
    maximumFractionDigits,
  } = optionsPrice;

  const formater = new Intl.NumberFormat(locale, {
    style: style.currency,
    currency,
    currencyDisplay: currencyDisplay.symbol,
    signDisplay: signDisplay.auto,
    maximumFractionDigits,
  });

  return formater.format(price);
};

export const creditCard = (number, style = false) => {
  if (style) {
    return number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, 'XXXX XXXX XXXX $4');
  } else {
    return number.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
  }
};

export const date = (date) => {
  const dateFormat = new Intl.DateTimeFormat(locale).format(date);
  return dateFormat.format(date);
};

/**
 *
 * @param {Date} date
 * @returns DD/YY
 */
export const expiration = (date) => {
  const d = new Date(date);
  let [month, year] = [d.getMonth(), d.getFullYear()];

  month = month < 10 ? `0${month + 1}` : month + 1;
  year = year.toString().slice(2);

  return `${month}/${year}`;
};

export const dateForm = (date) => {
  const dt = new Date(date);
  let [month, day, year] = [dt.getMonth(), dt.getDate(), dt.getFullYear()];

  month = month < 10 ? `0${month + 1}` : month + 1;
  day = day < 10 ? '0' + day : day;

  return `${year}-${month}-${day}`;
};
