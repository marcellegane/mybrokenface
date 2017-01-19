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
  const firstImgId = 1;
  const lastImgId = $menuLink.eq(menuLength - 1).data(`id`) - 1;
  const pagesLength = $pages.length;
  const activeClass = `is-active`;
  const loadClass = `is-loaded`;
  let pageIndex = 1;

  const showMenu = () => {
    if (pageIndex > firstImgId) {
      $menu.addClass(activeClass);
    } else {
      $menu.removeClass(activeClass);
    }

    $menuLink.removeClass(activeClass);
    $menu.find(`[data-id="${pageIndex}"]`)
      .addClass(activeClass)
      .focus();
  };

  const showPage = () => {
    const $currPage = $carousel.find(`.${activeClass}`);
    const $nextPage = $pages.eq(pageIndex - 1);

    window.location.hash = pageIndex;

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

  const lowerPageIndex = () => {
    pageIndex = pageIndex === 1 ? pagesLength : pageIndex - 1;

    showPage();
  };

  const increasePageIndex = () => {
    pageIndex = pageIndex === pagesLength ? 1 : pageIndex + 1;

    showPage();
  };

  const setPageIndex = (e) => {
    e.preventDefault();
    pageIndex = parseInt($(e.currentTarget).attr(`href`).substring(1));
    window.location.hash = pageIndex;
    showPage();
  };

  const swipeInit = () => {
    let xDown = null;
    let yDown = null;
    let doTouchBreak = null;
    const minDelta = 100;

    const handleTouchEnd = () => {
      doTouchBreak = null;
    };

    const handleTouchStart = (evt) => {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    };

    const handleTouchMove = (evt) => {
      if ( !xDown || !yDown || doTouchBreak) {
        return false;
      }

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;
      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > minDelta ) {
          increasePageIndex();
          doTouchBreak = true;
        } else if ( xDiff < -minDelta) {
          lowerPageIndex();
          doTouchBreak = true;
        }
      }

      if (doTouchBreak) {
        xDown = null;
        yDown = null;
      }
    };

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    document.addEventListener('touchcancel', handleTouchEnd, false);
  };

  if (window.location.hash) {
    const hash = window.location.hash;
    pageIndex = parseInt(hash.substring(1));
    showPage();
  } else {
    showPage();
  }

  $prevPage.on(`click`, lowerPageIndex);
  $nextPage.on(`click`, increasePageIndex);
  $menuLink.on(`click`, setPageIndex);
  swipeInit();

  $(`body`).keydown(function(e) {
    // Left, up, backspace
    if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 8) { lowerPageIndex(); }
    // Right, down
    else if (e.keyCode == 39 || e.keyCode == 40) { increasePageIndex(); }
  });
};

export { carouselInit };