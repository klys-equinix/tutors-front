export class LocalStorage {
  static propertyName = '__webapp';

  static __encode(data) {
    return btoa(JSON.stringify(data));
  }

  static __decode(data) {
    if (typeof data !== 'string') return {};

    try {
      return JSON.parse(atob(data));
    } catch (e) {
      return {};
    }
  }

  static __getData() {
    return this.__decode(sessionStorage.getItem(this.propertyName));
  }

  static __saveData(data) {
    sessionStorage.setItem(this.propertyName, this.__encode(data));
  }

  static create(key, payload) {
    const data = this.__getData();

    data[key] = payload;

    this.__saveData(data);
  }

  static has(key) {
    const data = this.__getData();

    return data[key] !== undefined;
  }

  static read(key) {
    const data = this.__getData();

    return data[key] || null;
  }

  static readAll() {
    return this.__getData();
  }

  static update(key, payload) {
    const data = this.__getData();

    data[key] = payload;

    this.__saveData(data);
  }

  static delete(key) {
    const data = this.__getData();

    delete data[key];

    this.__saveData(data);
  }

  static clear() {
    sessionStorage.removeItem(this.propertyName);
  }
}
