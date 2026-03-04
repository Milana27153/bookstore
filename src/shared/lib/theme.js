const THEME_KEY = 'bookstore-theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

function readStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    if (value === THEME_LIGHT || value === THEME_DARK) {
      return value;
    }
  } catch {}
  return null;
}

export function getInitialTheme() {
  const stored = readStoredTheme();
  if (stored) return stored;
  return THEME_LIGHT;
}

export function applyTheme(theme) {
  const value = theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  document.documentElement.setAttribute('data-theme', value);
}

export function setTheme(theme) {
  const value = theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  applyTheme(value);
  try {
    localStorage.setItem(THEME_KEY, value);
  } catch {}
  return value;
}

export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  return setTheme(next);
}

export function initTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
}

export function getCurrentTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === THEME_LIGHT || attr === THEME_DARK) {
    return attr;
  }
  return getInitialTheme();
}

