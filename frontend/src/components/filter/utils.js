export const getGroupNames = (groups) => {
  const names = groups.map((group) => {
    switch (group.filter_type) {
      case "input":
        return group.name;
      case "switch":
        return group.items.map((option) => option.name);
      case "checkbox":
        return group.name;
      case "option":
        return group.name;
    }
  });

  return names.flat();
};
export const getAllFiltersNames = (filters) => {
  const names = filters.map((filter) => {
    switch (filter.filter_type) {
      case "full-checkbox":
        return filter.name;
      case "full-option":
        return filter.name;
      case "group": {
        return getGroupNames(filter.groups);
      }
    }
  });

  return names.flat();
};

export const getGroupActiveLabels = (params, groups) => {
  const actives = [];

  for (const group of groups) {
    switch (group.filter_type) {
      case "input": {
        const value = params.get(group.name);
        if (value) actives.push(group.label);
        break;
      }
      case "switch": {
        for (const option of group.items) {
          const value = params.get(option.name);
          if (value) actives.push(option.label);
        }
        break;
      }
      case "checkbox": {
        const allValues = params.getAll(group.name);
        const values = group.items.filter((option) =>
          allValues.includes(option.value),
        );

        if (values.length) {
          const labels = values.map((option) => option.label);
          actives.push(labels);
        }
        break;
      }
      case "option": {
        const paramValue = params.get(group.name);
        const value = group.items.find((option) => option.value === paramValue);

        if (value) {
          actives.push(value.label);
        }
        break;
      }
    }
  }

  return actives.flat();
};
export const getCheckboxActiveLabels = (params, name, items) => {
  const allValues = params.getAll(name);
  const values = items.filter((item) =>
    allValues.find((value) => value === item.value),
  );

  if (values.length) {
    const labels = values.map((option) => option.label);
    return labels;
  } else {
    return [];
  }
};
export const getFiltersActiveLabels = (params, filters) => {
  const actives = [];

  for (const filter of filters) {
    switch (filter.filter_type) {
      case "full-checkbox": {
        const value = params.get(filter.name);
        if (value) actives.push(filter.label);
        break;
      }
      case "full-option": {
        const value = params.get(filter.name);
        if (value) actives.push(filter.label);
        break;
      }
      case "group": {
        const activeValues = getGroupActiveLabels(params, filter.groups);
        if (activeValues.length) actives.push(activeValues);
        break;
      }
    }
  }

  return actives.flat();
};
