export const customRows = (rows) => {
  return rows.map((row) => {
    const entries = row.cells.reduce((acu, curr) => {
      acu.set(curr.info.header, curr.value);

      return acu;
    }, new Map());

    const values = Object.fromEntries(entries);

    return {
      ...row,
      values,
    };
  });
};
