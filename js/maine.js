
$(document).ready(function () {
  //----------КНОПКА ВОЗВРАЩЕНИЯ ВВЕРХ--------------
  //следит за тем, сколько пикеселей ушло вверх. При скроле 1700 пикселей появляется кнопка. Если меньше, она пропадает
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $('.arrow_up-wrapper').fadeIn('slow');
    } else {
      $('.arrow_up-wrapper').fadeOut('slow');
    }
  });

});

var wrapperMenu = document.querySelector('.wrapper-menu');
wrapperMenu.addEventListener('click', function () {
  wrapperMenu.classList.toggle('open');
})

$(document).ready(function () {
  $('.wrapper-menu').click(function (event) {
    $('.menu').toggleClass('active')
    $('body').toggleClass('lock');
  });
  $('.menu').click(function (event) {
    $('.menu').toggleClass('active')
    $('body').toggleClass('lock');
  });


  // particles -------------------------
  particlesJS.load('particles', '/libs/particles/particles.json');

});