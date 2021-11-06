# Deshabilitar animaciones según preferencias del usuario

## CSS

CSS dispone de una media para poder saber si el usuario tiene habilitado o no las animaciones

```
@media screen and (prefers-reduced-motion: reduce) {}
```

Con el uso de variables CSS se puede fácilmente cambiar los valores relacionados con <code>time</code>. Por defecto se le pueden asignar valores, y caso que el usuario tenga deshabilitadas las animaciones, setearlas a 0

```scss
:root {
  --t-delay-btn: .3s;
  --t-duration-btn: .5s;
}
@media screen and (prefers-reduced-motion: reduce) {
  :root {
    --t-delay-btn: 0s;
    --t-duration-btn: 0s;
  }
}
.btn {
  // otras definiciones
  transition: all var(--t-duration-btn) linear var(--t-delay-btn);
  &:hover,
  &:focus {
    // otras definiciones
    transition: all var(--t-duration-btn) linear var(--t-delay-btn);
  }
}
```

El ejemplo es aplicado a <code>transitions</code> pero también puede aplicarse a <code>animations</code>

### Javascript

Desde Javascript también es posible poder consultar las preferencias del usuario sobre animaciones

```javascript
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
```

En el ejemplo, se usar la librería <code>swiperjs</code>

Se crea un objeto para guardar las <code>settings</code> con las que incializaremos Swiper

```javascript
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
```

Como puede verse, no se especifica el efecto en la animación ni el tiempo de duración, más adelante se definen estas propiedades en función de la configuración del propio equipo del cliente

```javascript
if (!mediaQuery || mediaQuery.matches) {
  animationsDisabled(swiperSettings);
} else {
  animationsEnable(swiperSettings);
}
```

Se trata de un <code>if</code> que nos determinará la configuración del usuario. Según el caso, pasaremos una u otra configuración del usuario

```javascript
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
```

Después de esto, ya si creamos la instancia de Swiper

```javascript
let swiper = new Swiper(".swiper", swiperSettings);
```

Si se produce cambio en la configuración del usuario, entonces, quitamos Swiper y volvemos a instanciarlo. Para esto, registramos un evento <code>change</code> sobre la <code>@media</code>

```javascript
mediaQuery.addEventListener("change", () => {
  swiper.destroy();
  if (mediaQuery.matches) {
    animationsDisabled(swiperSettings);
  } else {
    animationsEnable(swiperSettings);
  }
  swiper = new Swiper(".swiper", swiperSettings);
});
```

### Recursos de interés

Codepen con el ejemplo: https://codepen.io/ivan_albizu/pen/QWMmmOm

https://a11y-101.com/development/reduced-motion

https://since1979.dev/respecting-prefers-reduced-motion-with-javascript-and-react/