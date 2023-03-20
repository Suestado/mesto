export class Section {
  constructor({ dataItems, rendererFunc }, container) {
    this._dataItems = dataItems;
    this._rendererFunc = rendererFunc;
    this._container = container;
  }

  renderItems() {
    if(Array.isArray(this._dataItems)) {
      this._dataItems.forEach((item) => {
        this._rendererFunc(item);
      });
    } else {
      this._rendererFunc(this._dataItems);
    }
  }

  addItemOnPage(element) {
    this._container.prepend(element);
  }
}
