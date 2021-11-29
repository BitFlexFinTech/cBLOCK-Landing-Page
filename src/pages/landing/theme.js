function detectTheme() {
  let theme = 'light';
  const themeFromLocalStorage = localStorage.getItem('theme');

  if (themeFromLocalStorage) {
    if (themeFromLocalStorage === 'dark') {
      theme = 'dark';
    }
    document.body.setAttribute('data-theme', theme);
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
    document.body.setAttribute('data-theme', theme);
  }
}

detectTheme();
