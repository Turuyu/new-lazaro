// mobileMenu.ts — mirrors script.js DOMContentLoaded mobile menu section
// + Escape key closes, link click closes, focus trap

export function initMobileMenu(): void {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.getElementById('mobileMenu');

  if (!toggle || !menu) return;

  function open(): void {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    animateBars(true);
  }

  function close(): void {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    animateBars(false);
  }

  function animateBars(isOpen: boolean): void {
    const bars = toggle.querySelectorAll<HTMLElement>('span');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      close();
    } else {
      open();
    }
  });

  // Link click closes menu
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  // Escape key closes menu
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      close();
      toggle.focus();
    }
  });

  // Focus trap inside menu
  menu.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const focusable = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button')
    ).filter((el) => !el.hasAttribute('disabled'));

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
