import Swiper, { EffectFade } from 'swiper';
Swiper.use([EffectFade]);

export default class ProductGallery {
  constructor(root) {
    this._root = root;
    this._thumbs = this._root.querySelectorAll('.product-gallery__thumb');
    this._sliderContainer = this._root.querySelector('.product-gallery__slider-wrap');
    this._onThumbClick = this._onThumbClick.bind(this);

    this._slider = null;
    this._options = {
      effect: 'fade'
    };
  }

  _onThumbClick(evt) {
    evt.preventDefault();
    const currentThumb = evt.currentTarget;
    const index = parseInt(currentThumb.dataset.slide, 10);

    this._slider.slideTo(index);
  }

  init() {
    this._slider = new Swiper(this._sliderContainer, this._options);

    this._thumbs.forEach((element) => {
      element.addEventListener('click', this._onThumbClick);
    });
  }
}
