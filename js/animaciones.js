/* ============================================================
   js/animaciones.js
   Inicializa AOS (Animate On Scroll), la librería que anima los
   bloques a medida que entran en pantalla.

   Los elementos que se animan llevan el atributo data-aos en el
   HTML; acá solo se configura el comportamiento general.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS === 'undefined') {
    return; // si la librería no cargó, la página funciona igual
  }

  AOS.init({
    duration: 700, // milisegundos que dura cada animación
    easing: 'ease-out-cubic', // misma curva que el resto del sitio
    once: true, // se anima una sola vez, no al volver a subir
    offset: 80, // se dispara 80px antes de entrar en pantalla

    // Si la persona pidió menos movimiento en su sistema operativo,
    // AOS se desactiva y el contenido aparece directamente.
    disable: function () {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
  });
});
