export const openDatabase = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export const saveToDatabase = async (dbName, storeName, data) => {
  const db = await openDatabase(dbName, storeName);
  const transaction = db.transaction(storeName, "readwrite");
  const store = transaction.objectStore(storeName);
  return new Promise((resolve, reject) => {
    const request = store.put(data);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getFromDatabase = async (dbName, storeName, id) => {
  const db = await openDatabase(dbName, storeName);
  const transaction = db.transaction(storeName, "readonly");
  const store = transaction.objectStore(storeName);
  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const clearDatabase = async (dbName) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(dbName);

    request.onsuccess = () => {
      console.log(`Database '${dbName}' cleared successfully.`);
      resolve(true);
    };

    request.onerror = (event) => {
      console.error("Error clearing the database:", event.target.error);
      reject(event.target.error);
    };

    request.onblocked = () => {
      console.warn("Database deletion is blocked. Close other connections.");
      reject(new Error("Database deletion blocked"));
    };
  });
};
