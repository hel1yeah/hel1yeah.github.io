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

