export class Section {
  constructor({ rendererFunc }, container) {
    this._rendererFunc = rendererFunc;
    this._container = container;
  }

  renderItems(dataItems) {
    if(Array.isArray(dataItems)) {
      dataItems.forEach((item) => {
        this._rendererFunc(item);
      });
    } else {
      this._rendererFunc(dataItems);
    }
  }

  rendererUserItems(item) {
    this._rendererFunc(item);
  }

  addItemOnPage(element) {
    this._container.prepend(element);
  }
}
