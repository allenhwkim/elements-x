function fireEvent(key, data): void {
  const baseEl = StepperStorage.baseEl || (window as any).document;
  const storage = StepperStorage.storage;
  const customEvent = new CustomEvent('stepper-storage', {detail: {storage, key, data}})
  baseEl.dispatchEvent(customEvent);
}

export class StepperStorage {
  // static storage: any = (window as any).sessionStorage;
  static storage: any = (window as any).localStorage;
  static baseEl: any = (window as any).document;

  static getItem(key: string) {
    const storage = StepperStorage.storage;
    if (key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i)) { // array format e.g., groupName["foo"]
      const [_, groupKey, itemKey] = key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i) as string[];
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      return storageObj?.[itemKey];
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format groupName.foo
      const [groupKey, itemKey] = key.split('.');
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      return storageObj?.[itemKey];
    } else {
      const storageData = storage.getItem(key);
      const storageObj = JSON.parse(storageData);
      return storageObj;
    }
  }

  static setItem(key:string, data: any) {
    const storage = StepperStorage.storage;
    if (key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i)) { // array format e.g., groupName["foo"]
      const [_, groupKey, itemKey] = key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i) as string[];
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData) || [];
      storageObj[itemKey] = data;
      fireEvent(groupKey, storageObj);
      return storage.setItem(groupKey, JSON.stringify(storageObj));
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format groupName.foo
      const [groupKey, itemKey] = key.split('.');
      const storageData = storage.getItem(groupKey);
      const storageObj = storageData ? JSON.parse(storageData) : {};
      storageObj[itemKey] = data;
      fireEvent(groupKey, storageObj);
      return storage.setItem(groupKey, JSON.stringify(storageObj));
    } else {
      fireEvent(key, data);
      return storage.setItem(key, JSON.stringify(data));
    }
  }

  static removeItem(key: string) {
    const storage = StepperStorage.storage;
    if (key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i)) { // array format e.g., groupName["foo"]
      const [_, groupKey, itemKey] = key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i) as string[];
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData) || [];
      storageObj.splice(itemKey, 1);
      fireEvent(groupKey, storageObj);
      return storage.setItem(groupKey, JSON.stringify(storageObj));
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format groupName.foo
      const [groupKey, itemKey] = key.split('.');
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      delete storageObj[itemKey];
      fireEvent(groupKey, storageObj);
      return storage.setItem(groupKey, JSON.stringify(storageObj));
    } else {
      fireEvent(key, null);
      return storage.removeItem(key);
    }
  }
}