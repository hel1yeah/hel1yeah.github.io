$(document).ready(function () {

  $('.header-communication__button').on("click", function () {
    $('.overlay').show();
  });
  
  $('.popup-close').on("click", function () {
    $('.overlay').hide();
  });
  // модальное окно открівается при нажатии на класс .header-communication__button и закріввется при нажатии на  .popup-close

  // =============== клики мышью 
  // $('.header-logo').click(function(){
  //   console.log('хз сам сделад и работает ');
  // }); выбераем елемент по его селектору потом .click на этот елемент и с помощью  команды console.log выводим то что нужнов консоль, можно alert что бы вылезло всплывающее окно 


  // ==================== полёты над єлементом, mouseenter, mouseleave
  // $('h2').dblclick(function(){
  //   $(this).toggleClass('blue');
  // }); добавляет класс при двойном клике .toggleClass отвечает за добавления класса .dblclick двойное нажатие 
  // $('h2').mouseenter(function () {
  //   $(this).toggleClass('blue');
  // });  добавляем клас при наведение на него мышкой но клас не уберается когда мышка с обекта уходит, клас уберётся при ещё одном наведении
  // $('h2').mouseleave(function () {
  //   $(this).toggleClass('blue');
  // }); класс применяется только после того как мышка уходит с обьекта

  // ==============формы focus, change
  // $('input').change(function(){
  //   $('#testJs').text(', '+$(this).val());
  // }); доавить текст при изминенни импута и тот текст что пишем в инпут пишем и в id


  // =========== клавиатура keypress keydown keyup

  // $('input').keydown(function(){
  //   $('#testJs').text(', ' + $(this).val());
  // });

});



