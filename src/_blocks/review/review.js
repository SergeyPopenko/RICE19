if ($("#review-list").length) {
  initrRewSlider();
}
function initrRewSlider() {
  $("#review-list").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    prevArrow: $(".review__arrow--prev"),
    nextArrow: $(".review__arrow--next")
  });
}
