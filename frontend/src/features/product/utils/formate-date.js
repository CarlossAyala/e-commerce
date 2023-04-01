const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formateDate = (date) => {
  const d = new Date(date);

  const [month, day, year] = [d.getMonth(), d.getDate(), d.getFullYear()];

  return `${day} ${months[month]} ${year} `;
};

export default formateDate;
