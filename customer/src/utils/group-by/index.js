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
