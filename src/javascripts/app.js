import $ from 'jquery';
window.$ = $;

const $carousel = $(`.carousel`);
const $pages = $(`.page`);
const pagesLength = $pages.length;
const activeClass = `is-active`;
let pageIndex = 0;

const showNextPage = () => {
  if (pageIndex === pagesLength - 1) {
    pageIndex = 0;
  } else {
    pageIndex++;
  }

  $pages.removeClass(activeClass);
  $pages.eq(pageIndex).addClass(activeClass);
};

$carousel.on(`click`, showNextPage);