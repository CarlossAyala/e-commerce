export const LocalStorage = {
  get(key) {
    const value = localStorage.getItem(key);

    if (value == null) {
      return;
    }

    return JSON.parse(value);
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

export const SessionStorage = {
  get(key) {
    const value = sessionStorage.getItem(key);

    if (value == null) {
      return;
    }

    return JSON.parse(value);
  },
  save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    sessionStorage.removeItem(key);
  },
};

// export class MemoryStorage {
//   create() {
//     const storage = new Map();

//     const get = (key) => storage.get(key);
//     const set = (key, value) => storage.set(key, value);
//     const remove = (key) => storage.delete(key);
//     const clear = () => storage.clear();

//     return {
//       get,
//       set,
//       remove,
//       clear,
//     };
//   }
// }
