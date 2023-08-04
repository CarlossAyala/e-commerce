export const groupByMonthYear = (dates, key) => {
  if (!Array.isArray(dates) || dates.length === 0) {
    return [];
  }

  const map = new Map();

  for (const date of dates) {
    const tempDate = new Date(date[key]);
    const groupKey = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-01`;
    const group = map.get(groupKey) || {
      key: groupKey,
      values: [],
    };
    group.values.push(date);
    map.set(groupKey, group);
  }

  return Array.from(map.values());
};

export const groupByFirstLetter = (items, key) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const map = new Map();

  for (const item of items) {
    const groupKey = item[key][0].toUpperCase();
    const group = map.get(groupKey) || {
      key: groupKey,
      values: [],
    };
    group.values.push(item);
    map.set(groupKey, group);
  }

  return Array.from(map.values());
};
