export const clearStorage = () => {
  sessionStorage.clear();
};

export const setItemToStorage = (key, item) => {
  sessionStorage.setItem(key, item);
};
