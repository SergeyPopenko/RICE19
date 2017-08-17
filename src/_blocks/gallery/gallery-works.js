if($(".gallery__visible").length){
  var conteinerWidth = $(".gallery-tabs__item").length;
  $(".gallery__container").width(conteinerWidth*100 + "%");
}
$(".gallery-tabs__item").on("click", function(e){
  e.preventDefault();
  var number = $(this).index();
  $(this).addClass("gallery-tabs__item--active").siblings().removeClass("gallery-tabs__item--active");
  $(".gallery__container").css("margin-left", function(){
    return -number * 100 + "%"
  })
})

