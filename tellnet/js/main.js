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
//----------  burger --------------
$("#navToggle").click(function () {
  $(this).toggleClass("active");
  $(".overlay").toggleClass("open");
  // this line ▼ prevents content scroll-behind
  $("body").toggleClass("locked");
});
$(".menu-item").click(function () {
  $("#navToggle").toggleClass("active");
  $("body").toggleClass("locked");
  $(".overlay").toggleClass("open");
});

//---------- /burger --------------
//---------- модальное окно --------------
// схватил div body
let perBody = document.querySelector('body');
// схватил div overlay
let perOverlay = document.querySelector('.pop-up');
// схватил div modal__close
let modalClose = document.querySelector('.modal__close')
// всхватил div все кнопки c классом btn-modal
const btnModal = document.querySelectorAll('.btn-modal');
//проходим по ним циклом и каждой кнопке вешаем событие
btnModal.forEach((btnModalItem) => {
  //в btn попадает элемент, которому уже вешается событие
  btnModalItem.addEventListener('click', function (evt) {
    // overlay делаем видимым 
    perOverlay.style.display = "block";
     // убераю скрол по странице при открытом попапе присваиваем body overflow = "hidden"
    perBody.style.overflow = "hidden";
  })
});
// функция которая при клике меняет стили body  overlay
// закрывает модальное окно
modalClose.onclick = () => {
  perOverlay.style.display = "none";
  perBody.style.overflow = "visible";
}


