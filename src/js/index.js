import {getScrollBarWidth, isTouchDevice} from './modules/utils';

window.scrollbarWidth = getScrollBarWidth();
document.documentElement.style.setProperty('--scrollbar-width', `${window.scrollbarWidth}px`);

if (isTouchDevice()) {
  document.documentElement.classList.add('touch');
  document.documentElement.classList.remove('no-touch');
} else {
  document.documentElement.classList.add('no-touch');
  document.documentElement.classList.remove('touch');
}
