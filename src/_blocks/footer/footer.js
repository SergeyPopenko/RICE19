if($("#year-start").length) {
  $("#year-start").text(function(){
    return $("#year-start").text() || "2012";
  });
  $("#year-current").text(function(){
    return new Date().getFullYear();
  });
}