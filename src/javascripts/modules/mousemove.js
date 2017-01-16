import $ from 'jquery';
window.$ = $;

const $pageImages = $(`.page__img`);

const moveImages = (e) => {
  const x = e.pageX;
  const y = e.pageY;
  const xValue = (x / $(window).width()) - 0.5;
  const yValue = y / $(window).height() - 0.5;

  $pageImages.css({
    transform: `translate(${xValue * 2}%, 0) translateZ(0)`
  });
};

const mousemoveInit = () => {
  $(`body`).on(`mousemove`, moveImages);
};

export { mousemoveInit };