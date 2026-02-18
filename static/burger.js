document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('mobileClose');

  if (!burger || !mobileNav || !overlay || !closeBtn) {
    console.error('Не найдены элементы меню. Проверь id: burger, mobileNav, navOverlay, mobileClose');
    return;
  }

  let scrollY = 0;
  let locked = false;

  function lockScroll() {
    if (locked) return;
    locked = true;

    scrollY = window.scrollY || document.documentElement.scrollTop;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    if (!locked) return;
    locked = false;

    // Временно отключаем smooth, чтобы не было "вверх -> плавно обратно"
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    // Снимаем фиксацию
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';

    // Возвращаем скролл строго на место (без рывков)
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = prevScrollBehavior;
    });
  }

  function openMenu() {
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    lockScroll();
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');

    unlockScroll();

    // можно скрывать overlay после анимации
    setTimeout(() => {
      overlay.hidden = true;
    }, 250);
  }

  function toggleMenu() {
    document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
  }

  burger.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu();
  });

  mobileNav.addEventListener('click', (e) => {
  const link = e.target.closest('.mobile-nav__link');
  if (!link) return;

  const href = link.getAttribute('href');

  // Если это якорь на этой странице (#services и т.п.)
  if (href && href.startsWith('#')) {
    e.preventDefault(); // отменяем стандартный прыжок (он ломается из-за lockScroll)

    const target = document.querySelector(href);

    closeMenu(); // снимет фикс и вернет скролл на место

    // Ждём кадр-два, чтобы unlockScroll успел отработать, затем скроллим к секции
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    return;
  }

  // Если ссылка обычная (не якорь) — просто закрываем меню
  closeMenu();
});
});
