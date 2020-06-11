$(document).ready(function () {
  //----------КНОПКА ВОЗВРАЩЕНИЯ ВВЕРХ--------------
  //следит за тем, сколько пикеселей ушло вверх. При скроле 1700 пикселей появляется кнопка. Если меньше, она пропадает
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $('.aside').fadeIn('slow');
    } else {
      $('.aside').fadeOut('slow');
    }
  });
});

//---------- модальное окно --------------

let perBody = document.querySelector('body');
let perModal = document.querySelector('.modal');
let perOverlay = document.querySelector('.overlay');
let btnModal = document.querySelector('.btn-modal');

btnModal.onclick = () => {
  perOverlay.style.display = "block";
  perBody.style.overflow = "hidden";
}

perOverlay.onclick = () => {
  perOverlay.style.display = "none";
  perBody.style.overflow = "visible";
}
