if ($(".case").length) {
  function showCaseBtn(){
    $(".case__btn").on("click", function(){
      if (!$(this).hasClass("case__btn--open")) {
        $(this).addClass("case__btn--open");
        $(".case__item--hide").removeClass("case__item--hide");
      } else {
        $(".case__item").each(function(index){
          if (index > 2) {
            $(this).addClass("case__item--hide");
          }
        });
        $(this).removeClass("case__btn--open");
      }
    });
  }

  showCaseBtn();

  $(window).on("resize", function(){
    showCaseBtn()
  });

  $(window).on("load", function(){
    $(".case__link").each(function(){
      var $link = $(this),
          url = $link.attr("data-src");
      $.ajax({
        url: url,
        success: function(data){
          var a = new XMLSerializer().serializeToString(data.documentElement);
          $link.prepend(a);
          if ($link.attr("data-width")) {
            $link.find("svg").attr("width", $link.attr("data-width"));
          } else {
            $link.find("svg").attr("height", $link.attr("data-height"));
          }
        }
      });
    });
  });
}
