const carouselInit = () => {
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
  let pageIndex = 0;

  const showPage = () => {
    $pages.removeClass(activeClass);
    $pages.eq(pageIndex).addClass(activeClass);

    if (pageIndex >= firstImgId && pageIndex <= lastImgId) {
      $menu.addClass(activeClass);
    } else {
      $menu.removeClass(activeClass);
    }

    $menuLink.removeClass(activeClass);
    $menu.find(`[data-id="${pageIndex + 1}"]`)
      .addClass(activeClass);
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