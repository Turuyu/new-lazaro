// headerScroll.ts — mirrors script.js DOMContentLoaded header scroll section
// Toggles .scrolled class on header when scrollY > 20

export function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}
