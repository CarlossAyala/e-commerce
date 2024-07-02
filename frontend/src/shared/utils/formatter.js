export const Formatter = {
  currency(amount) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
    }).format(amount);
  },

  shortDate(date) {
    return new Intl.DateTimeFormat("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  },
  fullDate(date) {
    return new Intl.DateTimeFormat("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(new Date(date))
      .replace(",", " -");
  },
  monthAndYearDate(date) {
    return new Intl.DateTimeFormat("es-AR", {
      year: "numeric",
      month: "long",
    }).format(new Date(date));
  },
  precisionTwo(num) {
    const valid = +num;
    return valid.toFixed(2);
  },
  getKeyGroup(obj, accessor) {
    if (typeof accessor === "string") {
      return obj[accessor].toUpperCase().charAt(0);
    }

    return accessor(obj).toUpperCase().charAt(0);
  },
  groupByFirstLetter(arr, accessor) {
    if (!Array.isArray(arr) || arr.length === 0) return [];

    const map = new Map();

    for (const item of arr) {
      const firstLetter = Formatter.getKeyGroup(item, accessor);
      const keyGroup = map.get(firstLetter) ?? { key: firstLetter, group: [] };
      keyGroup.group.push(item);
      map.set(firstLetter, keyGroup);
    }

    return Array.from(map.values());
  },
};
