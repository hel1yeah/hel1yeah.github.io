// настройка карточки регион 
// при клике на div region у divа region-back появляеться класс show
// а у  divа region появляеться класс hide
$(function(){
  $('.region').on('click', function () {
    $('.region-back').toggleClass('show')
    $('.region').toggleClass('hide')
  });  
});

// зеркальная ситуация при клике на div  .region-back отбераем класс hide у divа region и у divа .region-back отбераем класс show
$(function(){
  $('.region-back').on('click', function () {
    $('.region').toggleClass('hide')
    $('.region-back').toggleClass('show')
  });  
});
// конец настройки карточки регион
//=============================================
// по анологии с первым 
$(function(){
  $('.beast').on('click', function () {
    $('.beast-back').toggleClass('show')
    $('.beast').toggleClass('hide')
  });  
});
$(function(){
  $('.beast-back').on('click', function () {
    $('.beast').toggleClass('hide')
    $('.beast-back').toggleClass('show')
  });  
});
//==============================================
// по анологии с первым 
$(function(){
  $('.time').on('click', function () {
    $('.time-back').toggleClass('show')
    $('.time').toggleClass('hide')
  });  
});
$(function(){
  $('.time-back').on('click', function () {
    $('.time').toggleClass('hide')
    $('.time-back').toggleClass('show')
  });  
});
//==============================================
// по анологии с первым 
$(function(){
  $('.patient').on('click', function () {
    $('.patient-back').toggleClass('show')
    $('.patient').toggleClass('hide')
  });  
});
$(function(){
  $('.patient-back').on('click', function () {
    $('.patient').toggleClass('hide')
    $('.patient-back').toggleClass('show')
  });  
});
//==============================================


// настройка карточки схема
// при клике на div ods-item у divа popup появляеться класс show
$(function () {
  $('.ods-item').on('click', function () {
    $('.ods__item-popup').toggleClass('show')
  });
});
//ри клике на div .popup-close у divа popup отбираеться класс show
$(function () {
  $('.popup-close-ods').on('click', function () {
    $('.ods__item-popup').toggleClass('show')
  });
});
//-=====================================
//-=====================================
$(function () {
  $('.ng103-item').on('click', function () {
    $('.ng103__item-popup').toggleClass('show')
  });
});
$(function () {
  $('.popup-close-ng103').on('click', function () {
    $('.ng103__item-popup').toggleClass('show')
  });
});
//-=====================================
//-=====================================
$(function () {
  $('.reactors-item').on('click', function () {
    $('.reactors__item-popup').toggleClass('show')
  });
});
$(function () {
  $('.popup-close-reactors').on('click', function () {
    $('.reactors__item-popup').toggleClass('show')
  });
});
//-=====================================
//-=====================================
$(function () {
  $('.interconnect-item').on('click', function () {
    $('.interconnect__item-popup').toggleClass('show')
  });
});
$(function () {
  $('.popup-close-interconnect').on('click', function () {
    $('.interconnect__item-popup').toggleClass('show')
  });
});
//-=====================================
//-=====================================
$(function () {
  $('.voice-item').on('click', function () {
    $('.voice__item-popup').toggleClass('show')
  });
});
$(function () {
  $('.popup-close-voice').on('click', function () {
    $('.voice__item-popup').toggleClass('show')
  });
});
//-=====================================
//-=====================================
$(function () {
  $('.operational-item').on('click', function () {
    $('.operational__item-popup').toggleClass('show')
  });
});
$(function () {
  $('.popup-close-operational').on('click', function () {
    $('.operational__item-popup').toggleClass('show')
  });
});
//-=====================================
//-=====================================
$(function () {
  $('.reporting-item').on('click', function () {
    $('.reporting__item-popup').toggleClass('show')
  });
});
$(function () {
  $('.popup-close-reporting').on('click', function () {
    $('.reporting__item-popup').toggleClass('show')
  });
});
//-=====================================