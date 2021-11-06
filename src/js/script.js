const animationsDisabled = settings => {
  console.log('no animation');
  settings.effect = "fade";
  settings.speed = 0;
}
const animationsEnable = settings => {
  console.log('animation');
  settings.effect = "slide";
  settings.speed = 300;
}

document.addEventListener('DOMContentLoaded', () => {

  const swiperSettings = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  };

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!mediaQuery || mediaQuery.matches) {
    animationsDisabled(swiperSettings);
  } else {
    animationsEnable(swiperSettings);
  }

  let swiper = new Swiper(".swiper", swiperSettings);

  mediaQuery.addEventListener("change", () => {
    swiper.destroy();
    if (mediaQuery.matches) {
      animationsDisabled(swiperSettings);
    } else {
      animationsEnable(swiperSettings);
    }
    swiper = new Swiper(".swiper", swiperSettings);
  });
})
