export class AppStorage {
  // static storage: any = (window as any).sessionStorage;
  static storage: any = (window as any).localStorage;

  static getItem(key: string) {
    const storage = AppStorage.storage;
    if (key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i)) { // array format e.g., formFlows["foo"]
      const [_, groupKey, itemKey] = key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i) as string[];
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      return storageObj?.[itemKey];
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format formFlows.foo
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
    const storage = AppStorage.storage;
    if (key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i)) { // array format e.g., formFlows["foo"]
      const [_, groupKey, itemKey] = key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i) as string[];
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData) || [];
      storageObj[itemKey] = data;
      window.dispatchEvent(new CustomEvent('app-stroage', {detail: {storage, key: groupKey, data: storageObj}}));
      return storage.setItem(groupKey, JSON.stringify(storageObj));
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format formFlows.foo
      const [groupKey, itemKey] = key.split('.');
      const storageData = storage.getItem(groupKey);
      const storageObj = storageData ? JSON.parse(storageData) : {};
      storageObj[itemKey] = data;
      window.dispatchEvent(new CustomEvent('app-stroage', {detail: {storage, key: groupKey, data: storageObj}}));
      return storage.setItem(groupKey, JSON.stringify(storageObj));
    } else {
      window.dispatchEvent(new CustomEvent('app-stroage', {detail: {storage, key, data}}));
      return storage.setItem(key, JSON.stringify(data));
    }
  }

  static removeItem(key: string) {
    const storage = AppStorage.storage;
    if (key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i)) { // array format e.g., formFlows["foo"]
      const [_, groupKey, itemKey] = key.match(/^([a-z0-9]+)\[['"]?(.*?)['"]?\]$/i) as string[];
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData) || [];
      storageObj.splice(itemKey, 1);
      window.dispatchEvent(new CustomEvent('app-stroage', {detail: {storage, key: groupKey, data: storageObj}}));
      return storage.setItem(groupKey, JSON.stringify(storageObj));
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format formFlows.foo
      const [groupKey, itemKey] = key.split('.');
      const storageData = storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      delete storageObj[itemKey];
      window.dispatchEvent(new CustomEvent('app-stroage', {detail: {storage, key: groupKey, data: storageObj}}));
      return storage.setItem(groupKey, JSON.stringify(storageObj));
    } else {
      window.dispatchEvent(new CustomEvent('app-stroage', {detail: {storage, key, data: null}}));
      return storage.removeItem(key);
    }
  }
}