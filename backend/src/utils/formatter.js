class Formatter {
  constructor() {}

  static fullDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date(date));
  }

  static fullTime(date) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }).format(new Date(date));
  }

  static fullDateTime(date) {
    return [Formatter.fullDate(date), Formatter.fullTime(date)].join(" ");
  }

  static currency(value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
}

module.exports = Formatter;
