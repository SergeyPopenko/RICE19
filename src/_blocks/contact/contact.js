$("[href='#popup-form']").on("click", function(e){
  e.preventDefault();
  $("#popup-form").addClass("popup--active");
  $("body").addClass("body-popup");
});
