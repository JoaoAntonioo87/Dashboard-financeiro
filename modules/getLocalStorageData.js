export default function getLocalStorageData(key) {
  const data = localStorage.getItem(key);

  if (data === null) {
    console.warn(`Missing localStorage key: ${key}`);
    return null;
  }

  try {
    const parsedData = JSON.parse(data);

    if (parsedData === null || typeof parsedData !== "object") {
      console.warn(`Invalid data structure: ${key}`);
      return null;
    }

    return Object.values(parsedData);
  } catch (error) {
    console.warn(`Invalid JSON in ${key}`, error);
    return null;
  }
}
