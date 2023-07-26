class GroupBy {
  static letter(arr, key) {
    return Array.from(
      arr.reduce((map, item) => {
        const firstLetter = item[key].at(0).toUpperCase();
        const group = map.get(firstLetter) || { letter: firstLetter, items: [] };
        group.items.push(item);
        map.set(firstLetter, group);
        return map;
      }, new Map()),
      ([, value]) => value
    );
  }

  static monthYear(arr, key) {
    return Array.from(
      arr.reduce((map, item) => {
        const date = new Date(item[key]);
        const groupKey = `${date.getFullYear()}-${date.getMonth() + 1}-1`;
        const group = map.get(groupKey) || { group: groupKey, items: [] };
        group.items.push(item);
        map.set(groupKey, group);
        return map;
      }, new Map()),
      ([, value]) => value
    );
  }
}

export default GroupBy;
