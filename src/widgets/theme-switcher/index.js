import { getCurrentTheme, toggleTheme } from '../../shared/lib/theme.js';
import sunIcon from '../../shared/assets/icons/sun.svg?raw';
import moonIcon from '../../shared/assets/icons/moon.svg?raw';

export function createThemeSwitcher(initialTheme) {
  const theme = initialTheme || getCurrentTheme();

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-switcher';

  const sun = document.createElement('span');
  sun.className = 'theme-switcher__icon theme-switcher__icon--sun';
  sun.insertAdjacentHTML('afterbegin', sunIcon);

  const moon = document.createElement('span');
  moon.className = 'theme-switcher__icon theme-switcher__icon--moon';
  moon.insertAdjacentHTML('afterbegin', moonIcon);

  const thumb = document.createElement('span');
  thumb.className = 'theme-switcher__thumb';

  button.append(sun, moon, thumb);

  function applyState(nextTheme) {
    const isDark = nextTheme === 'dark';
    button.classList.toggle('theme-switcher--dark', isDark);
    button.setAttribute(
      'aria-label',
      isDark ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  applyState(theme);

  button.addEventListener('click', () => {
    const next = toggleTheme();
    applyState(next);
  });

  return button;
}

