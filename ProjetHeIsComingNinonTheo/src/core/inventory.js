// inventory.js
export default class Inventory {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  getAll() {
    return this.items;
  }

  has(item) {
    return this.items.includes(item);
  }
}
