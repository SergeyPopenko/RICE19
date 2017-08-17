
$(".btn-more-services").on("click", function(e){
  e.preventDefault();
  $(this).prev().addClass("no-margin").children(".services__hidden").slideDown();
  $(this).prev().children(".services__descr-text").slideUp(200);
  $(this).fadeOut();
  $(this).parents(".services__item").attr("style", "padding-bottom:10px");
  if (window.innerWidth < 480) {
    $(this).parents(".services__content").attr("style", "padding-bottom:0");

  }
});

$(".services__btn-hide").on("click", function(e){
  e.preventDefault();
  $(this).parents(".services__hidden").slideUp();
  $(this).parents(".no-margin").removeClass("no-margin");
  $(this).parents(".services__hidden").prev().show();
  $(this).parents(".services__descr").next(".btn-more-services").fadeIn();
  $(this).parents(".services__item").attr("style", "");
  $(this).parents(".services__content").attr("style", "");
});
