export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
   this._renderedItems.forEach(this._renderer);
  }

  addItemWithAppend(element) {
    this._container.append(element);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  setItems(items) {
    this._renderedItems = items;
  }
}
