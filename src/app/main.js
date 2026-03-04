import { renderHomePage } from '../pages/home/index.js';
import { initTheme } from '../shared/lib/theme.js';
import '../shared/ui/index.css';
import './styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const initialTheme = initTheme();
  renderHomePage({ initialTheme });
});
