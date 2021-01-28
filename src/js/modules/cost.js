export default class Cost {
  constructor(root) {
    this.root = root;
    this.minusBtn = this.root.querySelector('.cost__btn--minus');
    this.plusBtn = this.root.querySelector('.cost__btn--plus');
    this.countNumElement = this.root.querySelector('.cost__count-num');
    this.price = parseInt(this.root.dataset.price, 10);
    this.count = parseInt(this.root.dataset.currentCount, 10);
    this.maxCount = parseInt(this.root.dataset.maxCount, 10);

    this._onMinusBtnClick = this._onMinusBtnClick.bind(this);
    this._onPlusBtnClick = this._onPlusBtnClick.bind(this);
  }

  _updateCount () {
    if (this.count > 0) {
      this.root.classList.remove('cost--empty');
      this.root.classList.add('cost--added');
    } else {
      this.root.classList.add('cost--empty');
      this.root.classList.remove('cost--added');
    }

    this.minusBtn.disabled = this.count <= 0;
    this.plusBtn.disabled = this.count >= this.maxCount;
    this.countNumElement.textContent = this.count;
  }

  _onMinusBtnClick() {
    this.decrease();
  }

  _onPlusBtnClick() {
    this.increase();
  }

  increase () {
    this.count++;
    this._updateCount();
  }

  decrease () {
    this.count--;
    this._updateCount();
  }

  init () {
    this.minusBtn.addEventListener('click', this._onMinusBtnClick);
    this.plusBtn.addEventListener('click', this._onPlusBtnClick);
    this._updateCount();
  }
}
