const canvasDiv = document.getElementById('bg-nodes');

function drawParticle(theme) {
  canvasDiv.innerHTML = '';
  new ParticleNetwork(canvasDiv, {
    particleColor: '#91FF35',
    background: theme === 'dark' ? '#000' : '#fff',
    interactive: false,
    speed: 'medium',
    density: 'high'
  });
}

function initParticle() {
  const theme = document.body.getAttribute('data-theme');
  if (theme) {
    drawParticle(theme);
  }
}

function burger() {
  const burger = document.querySelector('.header-burger');
  const header = document.querySelector('.header');

  if (burger && header) {
    burger.addEventListener('click', function() {
      const isMenuOpen = this.classList.contains('active');
      if (!isMenuOpen) {
        this.classList.add('active');
        header.classList.add('open');
        window.bodyScrollLock.disableBodyScroll(document.body, {
          allowTouchMove: () => true,
        });
      } else {
        this.classList.remove('active');
        header.classList.remove('open');
        window.bodyScrollLock.enableBodyScroll(document.body);
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
        drawParticle('dark');
      } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        drawParticle('light');
      }
    })
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    document.body.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    localStorage.setItem('theme', e.matches ? 'dark' : 'light');
    drawParticle(e.matches ? 'dark' : 'light');
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

initParticle();
burger();
theme();
desktopNav();
