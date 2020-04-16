document.addEventListener('DOMContentLoaded', function () {

  const hoverOneMap = document.querySelector('.hover-rivne-region'),
    showPopupOne = document.querySelector('.map-popup_rivne-region');

  const hoverTwoMap = document.querySelector('.hover-kiev-region'),
    showPopupTwo = document.querySelector('.map-popup_kiev-region');

  const hoverThreeMap = document.querySelector('.hover-chernihiv-region'),
    showPopupThree = document.querySelector('.map-popup_chernihiv-region');

  const hoverFourMap = document.querySelector('.hover-ternopil-region'),
    showPopupFour = document.querySelector('.map-popup_ternopil-region');

  const hoverFiveMap = document.querySelector('.hover-kharkiv-region'),
    showPopupFive = document.querySelector('.map-popup_kharkiv-region');

  const hoverSixMap = document.querySelector('.hover-ivano-frankivsk'),
    showPopupSix = document.querySelector('.map-popup_ivano-frankivsk');

  const hoverSevenMap = document.querySelector('.hover-vinnytsia-region'),
    showPopupSeven = document.querySelector('.map-popup_vinnytsia-region');

  const hoverEightMap = document.querySelector('.hover-dnipropetrovsk-region'),
    showPopupEight = document.querySelector('.map-popup_dnipropetrovsk-region');

  const hoverNineMap = document.querySelector('.hover-odessa-region'),
    showPopupNine = document.querySelector('.map-popup_odessa-region');

  const hoverTenMap = document.querySelector('.hover-kherson-region'),
    showPopupTen = document.querySelector('.map-popup_kherson-region');

  const hoverElevenMap = document.querySelector('.hover-zaporozhye-region'),
    showPopupEleven = document.querySelector('.map-popup_zaporozhye-region');

  const hoverTwelveMap = document.querySelector('.hover-volyn-region'),
    showPopupTwelve = document.querySelector('.map-popup_volyn-region');

  const hoverThirteenMap = document.querySelector('.hover-lviv-region'),
    showPopupThirteen = document.querySelector('.map-popup_lviv-region');

  const hoverFourteenMap = document.querySelector('.hover-zakarpattia-region'),
    showPopupFourteen = document.querySelector('.map-popup_zakarpattia-region');

  const hoverFifteenMap = document.querySelector('.hover-khmelnytsky-region'),
    showPopupFifteen = document.querySelector('.map-popup_khmelnytsky-region');

  const hoverSixteenMap = document.querySelector('.hover-chernivtsi-region'),
    showPopupSixteen = document.querySelector('.map-popup_chernivtsi-region');

  const hoverSeventeenMap = document.querySelector('.hover-zhytomyr-region'),
    showPopupSeventeen = document.querySelector('.map-popup_zhytomyr-region');

  const hoverEighteenMap = document.querySelector('.hover-cherkasy-region'),
    showPopupEighteen = document.querySelector('.map-popup_cherkasy-region');

  const hoverNineteenMap = document.querySelector('.hover-kirovograd-region'),
    showPopupNineteen = document.querySelector('.map-popup_kirovograd-region');

  const hoverTwentyMap = document.querySelector('.hover-mykolaiv-region'),
    showPopupTwenty = document.querySelector('.map-popup_mykolaiv-region');

  const hoverTwentyOneMap = document.querySelector('.hover-sumy-region'),
    showPopupTwentyOne = document.querySelector('.map-popup_sumy-region');

  const hoverTwentyTwoMap = document.querySelector('.hover-poltava-region'),
    showPopupTwentyTwo = document.querySelector('.map-popup_poltava-region');

  const hoverTwentyThreeMap = document.querySelector('.hover-donetsk-region'),
    showPopupTwentyThree = document.querySelector('.map-popup_donetsk-region');

  const hoverTwentyFourMap = document.querySelector('.hover-lugansk-region'),
    showPopupTwentyFour = document.querySelector('.map-popup_lugansk-region');

  const hoverTwentyFiveMap = document.querySelector('.hover-crimea-region'),
    showPopupTwentyFive = document.querySelector('.map-popup_crimea-region');

  const hoverTwentySixMap = document.querySelector('.hover-kiev-city'),
    showPopupTwentySix = document.querySelector('.map-popup_kiev-city');


  function hoverMap(area, popup) {
    area.addEventListener('mousemove', () => {
      popup.classList.add('show');
    });
    area.addEventListener('mouseout', () => {
      popup.classList.remove('show');
    });
  }

  hoverMap(hoverOneMap, showPopupOne);
  hoverMap(hoverTwoMap, showPopupTwo);
  hoverMap(hoverThreeMap, showPopupThree);
  hoverMap(hoverFourMap, showPopupFour);
  hoverMap(hoverFiveMap, showPopupFive);
  hoverMap(hoverSixMap, showPopupSix);
  hoverMap(hoverSevenMap, showPopupSeven);
  hoverMap(hoverEightMap, showPopupEight);
  hoverMap(hoverNineMap, showPopupNine);
  hoverMap(hoverTenMap, showPopupTen);
  hoverMap(hoverElevenMap, showPopupEleven);
  hoverMap(hoverTwelveMap, showPopupTwelve);
  hoverMap(hoverThirteenMap, showPopupThirteen);
  hoverMap(hoverFourteenMap, showPopupFourteen);
  hoverMap(hoverFifteenMap, showPopupFifteen);
  hoverMap(hoverSixteenMap, showPopupSixteen);
  hoverMap(hoverSeventeenMap, showPopupSeventeen);
  hoverMap(hoverEighteenMap, showPopupEighteen);
  hoverMap(hoverNineteenMap, showPopupNineteen);
  hoverMap(hoverTwentyMap, showPopupTwenty);
  hoverMap(hoverTwentyOneMap, showPopupTwentyOne);
  hoverMap(hoverTwentyTwoMap, showPopupTwentyTwo);
  hoverMap(hoverTwentyThreeMap, showPopupTwentyThree);
  hoverMap(hoverTwentyFourMap, showPopupTwentyFour);
  hoverMap(hoverTwentyFiveMap, showPopupTwentyFive);
  hoverMap(hoverTwentySixMap , showPopupTwentySix);

  function hoverHandler(e) {
    this.querySelectorAll('.hover-opacity').forEach(n => {
      n.classList.toggle('hover', n !== e.target && this !== e.target);
    });
  }
  const map = document.querySelector('.status__map svg');
  map.addEventListener('mouseover', hoverHandler);
  map.addEventListener('mouseout', hoverHandler);

});

