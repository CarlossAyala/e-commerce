export const dateHistoryFormat = (date) => {
  const actualDate = new Date();
  const tempDate = new Date(date);

  const [actualMonth, actualYear] = [
    actualDate.getMonth() + 1,
    actualDate.getFullYear(),
  ];
  const [historyMonth, historyYear] = [
    tempDate.getMonth() + 1,
    tempDate.getFullYear(),
  ];

  if (actualMonth === historyMonth && actualYear === historyYear) {
    return 'This month';
  } else if (actualMonth - 1 === historyMonth && actualYear === historyYear) {
    return 'Last month';
  } else if (actualYear === historyYear) {
    return new Intl.DateTimeFormat('es-AR', {
      month: 'long',
    }).format(tempDate);
  } else {
    return new Intl.DateTimeFormat('es-AR', {
      month: 'long',
      year: 'numeric',
    }).format(tempDate);
  }
};
