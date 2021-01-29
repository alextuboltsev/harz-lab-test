export default class LikeBtn {
  constructor(btn) {
    this._btn = btn;

    this._onBtnClick = this._onBtnClick.bind(this);
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    this._btn.classList.toggle('like--active');
  }

  init() {
    this._btn.addEventListener('click', this._onBtnClick);
  }
}
