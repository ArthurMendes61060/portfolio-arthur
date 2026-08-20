/* Filtros de categoria na página de projetos */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const cat = btn.dataset.category || '';

      filterBtns.forEach(function (b) {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-pressed', 'true');

      cards.forEach(function (card) {
        const cats = card.dataset.categories || '';
        const show = !cat || cats.split(',').some(function (c) { return c.trim() === cat; });
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
