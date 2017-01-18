import $ from 'jquery';
import { TweenLite, CSSPlugin } from 'gsap';
window.$ = $;

const carouselInit = () => {
  const $carousel = $(`.js-carousel`);
  const $prevPage = $(`.js-prev-page`);
  const $nextPage = $(`.js-next-page`);
  const $pages = $(`.js-page`);
  const $menu = $(`.js-menu`);
  const $menuLink = $(`.js-menu-link`);
  const menuLength = $menuLink.length;
  const firstImgId = $menuLink.eq(0).data(`id`) - 1;
  const lastImgId = $menuLink.eq(menuLength - 1).data(`id`) - 1;
  const pagesLength = $pages.length;
  const activeClass = `is-active`;
  const loadClass = `is-loaded`;
  let pageIndex = 0;

  const showMenu = () => {
    if (pageIndex > firstImgId) {
      $menu.addClass(activeClass);
    } else {
      $menu.removeClass(activeClass);
    }

    $menuLink.removeClass(activeClass);
    $menu.find(`[data-id="${pageIndex + 1}"]`)
      .addClass(activeClass);
  };

  const showPage = () => {
    const $currPage = $carousel.find(`.${activeClass}`);
    const $nextPage = $pages.eq(pageIndex);

    TweenLite.to($currPage, 0.2, {
      opacity: 0,
      clearProps: `opacity`,
      onComplete: () => {
        $currPage.removeClass(`${activeClass} ${loadClass}`);
        $nextPage.addClass(activeClass);
        TweenLite.set($nextPage, {
          className: `+=${loadClass}`,
        });
      }
    });

    showMenu();
  };

  const increasePageIndex = () => {
    pageIndex = pageIndex === 0 ? pagesLength - 1 : pageIndex - 1;

    showPage();
  };

  const lowerPageIndex = () => {
    pageIndex = pageIndex === pagesLength - 1 ? 0 : pageIndex + 1;

    showPage();
  };

  const setPageIndex = (e) => {
    const index = $(e.currentTarget).attr(`href`).substring(1);

    e.preventDefault();
    pageIndex = index - 1;

    showPage();
  };

  $nextPage.on(`click`, lowerPageIndex);
  $prevPage.on(`click`, increasePageIndex);
  $menuLink.on(`click`, setPageIndex);
};

export { carouselInit };