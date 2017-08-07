if ($("#clients-list").length) {
  var sliderInit = false;
  initSlider();
  $(window).on("resize", function(){
    initSlider();
  });
}
function initSlider() {
  if (window.innerWidth < 768) {
    if (!sliderInit) {
      $("#clients-list").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        prevArrow: $(".clients__arrow--prev"),
        nextArrow: $(".clients__arrow--next"),
        responsive: [
          {
            breakpoint: 550,
            settings: {
              infinite: true,
              slidesToShow: 2
            }
          }
        ]
      });
      sliderInit = true;
    }
  } else {
    if (sliderInit) {
      $("#clients-list").slick("unslick");
      sliderInit = false;
    }
  }
}
