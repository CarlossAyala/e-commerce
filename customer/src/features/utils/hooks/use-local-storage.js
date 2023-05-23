const useLocalStorage = () => {
  /**
   * Returns the local storage item for the specified
   *
   * @param key Returns the item specified by the key
   * @param serializer Optional function to serialize the item retrieved
   */
  const getItem = (key, serializer = false) => {
    const item = window.localStorage.getItem(key);

    return serializer ? serializer(item) : item;
  };

  const setItem = (key, value) => {
    return window.localStorage.setItem(key, value);
  };

  const removeItem = (key) => {
    return window.localStorage.removeItem(key);
  };

  return [getItem, setItem, removeItem];
};

export default useLocalStorage;
