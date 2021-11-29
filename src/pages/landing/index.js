function burger() {
  const burger = document.querySelector('.header-burger');
  const header = document.querySelector('.header');

  if (burger && header) {
    burger.addEventListener('click', function(e) {
      const isMenuOpen = this.classList.contains('active');
      if (!isMenuOpen) {
        this.classList.add('active');
        header.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        this.classList.remove('active');
        header.classList.remove('open');
        document.body.style.overflow = 'auto';
      }
    })
  }
}

function theme() {
  const switchers = document.querySelectorAll('[data-theme-switcher]');

  switchers.forEach((switcher) => {
    switcher.checked = document.body.getAttribute('data-theme') === 'dark';

    switcher.addEventListener('change', function(e) {
      if (e.target.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    })
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    localStorage.setItem('theme', e.matches ? 'dark' : 'light');
    switchers.forEach((switcher) => {
      switcher.checked = e.matches;
    });
  });
}

function desktopNav() {
  const btn = document.querySelector('.header-nav--btn');
  const menu = document.querySelector('.header-nav--menu');
  if (btn && menu) {
    btn.addEventListener('click', function(e) {
      const isOpen = this.classList.contains('open');
      if (!isOpen) {
        this.classList.add('open');
        menu.style.display = 'block';
      } else {
        this.classList.remove('open');
        menu.style.display = 'none';
      }

      e.stopPropagation();
    });
  }

  document.addEventListener('mousedown', function(e) {
    if (btn.classList.contains('open') && !btn.contains(e.target) && !menu.contains(e.target)) {
      btn.classList.remove('open');
      menu.style.display = 'none';
    }
  });
}

burger();
theme();
desktopNav();
