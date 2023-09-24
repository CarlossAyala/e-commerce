export class Formatter {
  static money(amount) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  static shortDate(date) {
    const validDate = new Date(date);

    return new Intl.DateTimeFormat("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(validDate);
  }

  static precisionTwo(num) {
    const valid = +num;
    return valid.toFixed(2);
  }
}
