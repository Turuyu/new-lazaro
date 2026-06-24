// jsdom tests for src/scripts/theme.ts
import { initTheme } from '../../src/scripts/theme.ts';

describe('initTheme', () => {
  beforeEach(() => {
    // Reset body class and DOM before each test
    document.body.className = '';
    document.body.innerHTML = `<button id="themeToggle"><i class="fa-solid fa-moon"></i></button>`;
    localStorage.setItem('theme', '');
  });

  it('applies dark-theme when localStorage theme is "dark"', () => {
    localStorage.setItem('theme', 'dark');
    initTheme();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('does not apply dark-theme when localStorage theme is "light"', () => {
    localStorage.setItem('theme', 'light');
    initTheme();
    expect(document.body.classList.contains('dark-theme')).toBe(false);
  });

  it('toggles theme on button click and persists choice to localStorage', () => {
    initTheme();
    document.getElementById('themeToggle')!.click();
    expect(document.body.classList.contains('dark-theme')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    document.getElementById('themeToggle')!.click();
    expect(document.body.classList.contains('dark-theme')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('updates toggle icon to sun when dark mode is active', () => {
    initTheme();
    document.getElementById('themeToggle')!.click();
    const btn = document.getElementById('themeToggle')!;
    expect(btn.innerHTML).toContain('fa-sun');
  });

  it('updates toggle icon to moon when returning to light mode', () => {
    initTheme();
    document.getElementById('themeToggle')!.click(); // dark on
    document.getElementById('themeToggle')!.click(); // light on
    const btn = document.getElementById('themeToggle')!;
    expect(btn.innerHTML).toContain('fa-moon');
  });

  it('handles missing themeToggle element gracefully', () => {
    document.body.innerHTML = `<div>No button</div>`;
    expect(() => initTheme()).not.toThrow();
  });
});
