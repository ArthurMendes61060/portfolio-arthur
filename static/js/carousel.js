/* Carrossel de projetos em destaque
   - Navegação por teclado (ArrowLeft / ArrowRight)
   - Suporte a gestos de arrastar (touch e mouse)
   - Pausa ao interagir
   - Respeito ao prefers-reduced-motion
*/
(function () {
  const carousel    = document.getElementById('main-carousel');
  if (!carousel) return;

  const track       = document.getElementById('carousel-track');
  const slides      = Array.from(track ? track.children : []);
  const prevBtn     = document.getElementById('carousel-prev');
  const nextBtn     = document.getElementById('carousel-next');
  const indicators  = Array.from(document.querySelectorAll('.carousel-indicator'));

  if (!slides.length) return;

  const INTERVAL = 6000;
  const REDUCED  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current    = 0;
  let timer      = null;
  let isDragging = false;
  let startX     = 0;
  let dragDelta  = 0;

  /* --- Ir para slide --- */
  function goTo(index) {
    current = (index + slides.length) % slides.length;
    if (track) {
      track.style.transform = `translateX(-${current * 100}%)`;
    }
    indicators.forEach((ind, i) => {
      const active = i === current;
      ind.classList.toggle('carousel-indicator--active', active);
      ind.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* --- Reprodução automática --- */
  function startAuto() {
    if (REDUCED || slides.length <= 1) return;
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  function stopAuto() {
    clearInterval(timer);
    timer = null;
  }

  /* --- Botões de navegação --- */
  if (nextBtn) nextBtn.addEventListener('click', function () { stopAuto(); next(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { stopAuto(); prev(); });

  /* --- Indicadores --- */
  indicators.forEach(function (ind) {
    ind.addEventListener('click', function () {
      stopAuto();
      goTo(parseInt(ind.dataset.index, 10));
    });
  });

  /* --- Teclado --- */
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { stopAuto(); prev(); e.preventDefault(); }
    if (e.key === 'ArrowRight') { stopAuto(); next(); e.preventDefault(); }
  });

  /* --- Touch / Arrastar --- */
  function onDragStart(x) {
    isDragging = true;
    startX     = x;
    dragDelta  = 0;
    stopAuto();
  }

  function onDragMove(x) {
    if (!isDragging) return;
    dragDelta = x - startX;
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (dragDelta < -50) next();
    else if (dragDelta > 50) prev();
    dragDelta = 0;
  }

  carousel.addEventListener('touchstart', function (e) { onDragStart(e.touches[0].clientX); }, { passive: true });
  carousel.addEventListener('touchmove',  function (e) { onDragMove(e.touches[0].clientX);  }, { passive: true });
  carousel.addEventListener('touchend',   onDragEnd);

  carousel.addEventListener('mousedown',  function (e) { onDragStart(e.clientX); });
  window.addEventListener  ('mousemove',  function (e) { onDragMove(e.clientX); });
  window.addEventListener  ('mouseup',    onDragEnd);

  /* --- Pausa ao focar / passar o mouse --- */
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('focusin',    stopAuto);
  carousel.addEventListener('mouseleave', startAuto);
  carousel.addEventListener('focusout',   startAuto);

  /* --- Inicializar --- */
  goTo(0);
  startAuto();
})();
