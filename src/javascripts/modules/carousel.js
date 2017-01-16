const carouselInit = () => {
  const $prevPage = $(`.js-prev-page`);
  const $nextPage = $(`.js-next-page`);
  const $pages = $(`.js-page`);
  const $menuLink = $(`.js-menu-link`);
  const pagesLength = $pages.length;
  const activeClass = `is-active`;
  let pageIndex = 0;

  const showPage = () => {
    $pages.removeClass(activeClass);
    $pages.eq(pageIndex).addClass(activeClass);
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