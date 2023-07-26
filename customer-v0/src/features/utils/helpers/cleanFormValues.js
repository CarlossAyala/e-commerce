const cleanFormValues = (values) => {
  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      delete values[key];
    }
  });

  return values;
};

export default cleanFormValues;
