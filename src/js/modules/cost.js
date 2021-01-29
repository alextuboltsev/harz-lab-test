export default class Cost {
  constructor(root) {
    this._root = root;
    this._minusBtn = this._root.querySelector('.cost__btn--minus');
    this._plusBtn = this._root.querySelector('.cost__btn--plus');
    this._countNumElement = this._root.querySelector('.cost__count-num');
    this._price = parseInt(this._root.dataset.price, 10);
    this._count = parseInt(this._root.dataset.currentCount, 10);
    this._maxCount = parseInt(this._root.dataset.maxCount, 10);

    this._onMinusBtnClick = this._onMinusBtnClick.bind(this);
    this._onPlusBtnClick = this._onPlusBtnClick.bind(this);
  }

  _updateCount () {
    if (this._count > 0) {
      this._root.classList.remove('cost--empty');
      this._root.classList.add('cost--added');
    } else {
      this._root.classList.add('cost--empty');
      this._root.classList.remove('cost--added');
    }

    this._minusBtn.disabled = this._count <= 0;
    this._plusBtn.disabled = this._count >= this._maxCount;
    this._countNumElement.textContent = this._count;
  }

  _onMinusBtnClick() {
    this.decrease();
  }

  _onPlusBtnClick() {
    this.increase();
  }

  increase () {
    this._count++;
    this._updateCount();
  }

  decrease () {
    this._count--;
    this._updateCount();
  }

  init () {
    this._minusBtn.addEventListener('click', this._onMinusBtnClick);
    this._plusBtn.addEventListener('click', this._onPlusBtnClick);
    this._updateCount();
  }
}
