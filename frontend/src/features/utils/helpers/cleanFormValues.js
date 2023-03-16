const cleanFormValues = (values) => {
  Object.keys(values).forEach((key) => {
    if (values[key] === '' || values[key] === null) {
      delete values[key];
    }
  });

  return values;
};

export default cleanFormValues;
