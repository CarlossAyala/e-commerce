const QueryParams = {
  setParam(searchParams, name, value) {
    if (value) {
      searchParams.set(name, encodeURIComponent(value));
    } else {
      searchParams.delete(name);
    }
  },

  setArrayParam(searchParams, name, values) {
    if (values.length) {
      searchParams.set(
        name,
        values.map((value) => encodeURIComponent(value)).join(',')
      );
    } else {
      searchParams.delete(name);
    }
  },

  setBooleanParam(searchParams, name, value) {
    if (typeof value === 'boolean') {
      if (value) searchParams.set(name, 'true');
      else searchParams.set(name, 'false');
    } else {
      searchParams.delete(name);
    }
  },

  setNumberParam(searchParams, name, value) {
    if (typeof value === 'number' && value > 0) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
  },

  getParam(searchParams, name) {
    const value = searchParams.get(name);
    return value ? decodeURIComponent(value) : null;
  },

  getArrayParam(searchParams, name) {
    const value = searchParams.get(name);
    return value
      ? value.split(',').map((value) => decodeURIComponent(value))
      : [];
  },

  getBooleanParam(searchParams, name, defaultValue) {
    let value = searchParams.get(name) || defaultValue;

    if (value === 'true') value = 'true';
    else value = 'false';

    return value === 'true';
  },

  getNumberParam(searchParams, name, defaultValue) {
    const number = searchParams.get(name);
    return number ? +number : defaultValue;
  },
};

export default QueryParams;
