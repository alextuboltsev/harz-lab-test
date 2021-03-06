import {getScrollBarWidth, isTouchDevice} from './modules/utils';
import Cost from './modules/cost';
import LikeBtn from './modules/like-btn';
import ProductGallery from './modules/product-gallery';
import ProductVariant from './modules/product-variant';

window.scrollbarWidth = getScrollBarWidth();
document.documentElement.style.setProperty('--scrollbar-width', `${window.scrollbarWidth}px`);

if (isTouchDevice()) {
  document.documentElement.classList.add('touch');
  document.documentElement.classList.remove('no-touch');
} else {
  document.documentElement.classList.add('no-touch');
  document.documentElement.classList.remove('touch');
}


const costElements = document.querySelectorAll('.cost');

costElements.forEach((element) => {
  const costInstance = new Cost(element);
  costInstance.init();
});


const likeBtns = document.querySelectorAll('.like');

likeBtns.forEach((element) => {
  const likeBtnInstance = new LikeBtn(element);
  likeBtnInstance.init();
});


const productGalleryElements = document.querySelectorAll('.product-gallery');
productGalleryElements.forEach((element) => {
  const productGalleryInstance = new ProductGallery(element);
  productGalleryInstance.init();
});


window.onload = () => {
  const productVariantElements = document.querySelectorAll('.product-variant');
  productVariantElements.forEach((element) => {
    const productVariantInstance = new ProductVariant(element);
    productVariantInstance.init();
  });
};
