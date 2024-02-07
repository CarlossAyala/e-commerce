const PREFIX = "fake-commerce-";

export const localStorageManager = {
  setItem(key, value) {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  },

  getItem(key) {
    const storedValue = localStorage.getItem(`${PREFIX}${key}`);
    return storedValue ? JSON.parse(storedValue) : null;
  },

  removeItem(key) {
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  clear() {
    const keysToRemove = Object.keys(localStorage).filter((key) =>
      key.startsWith(PREFIX),
    );

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  },
  getToken() {
    return this.getItem("token");
  },
  setToken(token) {
    this.setItem("token", token);
  },
  removeToken() {
    this.removeItem("token");
  },
};
