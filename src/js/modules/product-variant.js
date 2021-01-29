const HOVER_SCALE_RATIO = 1.5;

export default class ProductVariant {
  constructor(root) {
    this._root = root;

    this._labels = this._root.querySelectorAll('label');
    this._totalWidth = this._root.offsetWidth;
  }

  init() {
    this._labels.forEach((element) => {
      const input = document.getElementById(element.getAttribute('for'));
      const isChecked = input && input.checked;

      const hoverAddWidth = isChecked ? 0 : element.offsetWidth * (HOVER_SCALE_RATIO - 1);
      this._totalWidth += hoverAddWidth;
    });
    this._root.style.minWidth = `${this._totalWidth}px`;
  }
}
