function animateText(item, interval, timeout){
  var a = new String,
      c,
      j = 0,
      interval = interval || 150;
  a = item.text();
  item.text("");
  c = a.length;
  if (timeout) {
    timer = setTimeout(function(){
      writeText();
    }, timeout);
  } else {
    writeText();
  }
  function writeText(){
    item.addClass("promo__title-cursor");
    var timer;
    timer = setInterval(function(){
      if (j < c){
        item.text(item.text() + a[j]);
        j = j + 1; 
      } else {
        item.removeClass("promo__title-cursor");
        clearInterval(timer);
      } 
    }, interval);
  }
}

if ($(".promo__title-descr").length) {
  animateText($(".promo__title-main"), 150);
  animateText($(".promo__title-descr"), 150, 2000);
}

if ($(".promo__info--inner").length) {
  if (window.innerWidth < 768) {
    animateText($(".promo__name"), 150);
  }
  animateText($(".promo__title-main"), 150, 1200);
}