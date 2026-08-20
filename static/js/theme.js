/* Gerenciamento de tema claro/escuro */
(function () {
  const STORAGE_KEY = 'arthur-portfolio-theme';
  const html = document.documentElement;
  const btn  = document.getElementById('theme-toggle');

  function getPreferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
      btn.setAttribute('title', theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    }
  }

  setTheme(getPreferred());

  if (btn) {
    btn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
