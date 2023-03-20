
export class Section {
  constructor({ dataItems, rendererFunc }, container) {
    this._dataItems = dataItems;
    this._rendererFunc = rendererFunc;
    this._container = container;
  }

  //Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer
  renderItems() {
      if(Array.isArray(this._dataItems)) {
        this._dataItems.forEach((item) => {
          this._rendererFunc(item);
        });
      } else {
        this._rendererFunc(this._dataItems);
      }
  }

  //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItemOnPage(element) {
    this._container.prepend(element);
  }
}
