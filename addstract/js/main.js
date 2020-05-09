$(document).ready(function () {
  let $slider = $('.slider-logo');
  let $progressBar = $('.progress');

  $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    let calc = ((nextSlide) / (slick.slideCount - 1)) * 100;

    $progressBar
      .css('background-size', calc + '% 100%')
      .attr('aria-valuenow', calc);

  });

// слик слайдер сдайдер

  $('.slider-logo').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    initialSlide: 0,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplaySpeed: 3000,

        }
      },
      {
        breakpoint: 811,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 2500,
        }
      },
      {
        breakpoint: 621,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplaySpeed: 2000,
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 1300,
        }
      },
    ]
  });

  // Прогрес бар
  // создаём константу circle и помещаем туда по класу наш круг
  const circle = document.querySelector('.pie-chart__circle');
  // создаём константу radius
  const radius = circle.r.baseVal.value;
  // узнаём окружность 
  const circumfarence = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumfarence} ${circumfarence}`;
  circle.style.strokeDashoffset = circumfarence;

  function setProgress(percent) {
    const offset = circumfarence - percent / 100 * circumfarence;
    circle.style.strokeDashoffset = offset;
  };
  setProgress(67);


});
// .бургер меню 
$(document).ready(function () {
  // на  класс header__burger вешаем событие клика тогда прик клике на header__burger будет доавляться клас active таким блокам как header__burger и nav при повторном нажатии убераться
  $('.header__burger').click(function (event) {
    $('.header__burger,.nav,body').toggleClass('active');
  });
  $('.nav__list-item').click(function (event) {
    $('.header__burger,.nav').toggleClass('active');
  });
  
});