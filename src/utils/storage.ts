export const setItem = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage item", error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting localStorage item", error);
    return null;
  }
};

export const removeItem = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage item", error);
  }
};
