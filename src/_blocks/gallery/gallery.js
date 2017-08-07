if ($(".gallery").length) {
  galleryImgSize($(".gallery"));
  $(window).on("resize", function(){
    galleryImgSize($(".gallery"));
  });
  window.addEventListener("orientationchange", function(){
    galleryImgSize($(".gallery"));
  });
}

function galleryImgSize($obj){
  var allImg = $obj.find("img");
  if (window.innerWidth < 768 && $("html").hasClass("portrait")) {
    allImg.attr("style", "");
  } else {
    allImg.each(function(i){
      var itemWidth = $(this).width(),
          itemHeight = $(this).height(),
          $parent = $(this).closest(".gallery__img"),
          parentWidth = $parent.width(),
          parentHeight = $parent.height();
      if (itemWidth < parentWidth) {
        if ($(this).css("width") != "100%" || $(this).css("height") != "auto") {
          $(this).css({
            "width": "100%",
            "height": "auto"
          });
        }
      }
      else if (itemHeight < parentHeight) {
        if ($(this).css("height") != "100%" || $(this).css("width") != "auto") {
          $(this).css({
            "height": "100%",
            "width": "auto"
          });
        }
      }
    });
  }
}