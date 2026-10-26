// Inicialização da aplicação.
document.addEventListener('DOMContentLoaded', () => {
  window.ResumoController.init();

  const toggle = document.getElementById('theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const savedTheme = localStorage.getItem('color-theme');

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
    toggle.querySelector('.theme-button-label').textContent = isDark ? 'Modo claro' : 'Modo escuro';
    toggle.querySelector('[aria-hidden="true"]').textContent = isDark ? '☀' : '☾';
    themeColor.setAttribute('content', isDark ? '#202722' : '#f6f4ed');
  };

  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
  toggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('color-theme', theme);
    applyTheme(theme);
  });
});
