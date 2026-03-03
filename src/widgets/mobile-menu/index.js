import bookIcon from '../../shared/assets/icons/book.svg?raw';

export function renderMobileMenu({ favoritesCount, onClose, onOpenFavorites }) {
  const root = document.createElement('div');
  root.className = 'mobile-menu';

  const countLabel = favoritesCount === 1
    ? '1 book'
    : `${favoritesCount} books`;

  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-menu__backdrop';
  backdrop.dataset.action = 'close';

  const panel = document.createElement('nav');
  panel.className = 'mobile-menu__panel';

  const header = document.createElement('div');
  header.className = 'mobile-menu__header';

  const logo = document.createElement('div');
  logo.className = 'mobile-menu__logo';

  const logoIcon = document.createElement('span');
  logoIcon.className = 'mobile-menu__logo-icon';
  logoIcon.insertAdjacentHTML('afterbegin', bookIcon);

  const logoText = document.createElement('span');
  logoText.className = 'mobile-menu__logo-text';
  logoText.textContent = 'The Library';

  logo.append(logoIcon, logoText);

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'mobile-menu__close';
  closeBtn.setAttribute('aria-label', 'Close menu');
  closeBtn.dataset.action = 'close';
  closeBtn.textContent = '×';

  header.append(logo, closeBtn);

  const navList = document.createElement('ul');
  navList.className = 'mobile-menu__nav';

  function createNavItem(label, action, extraClass = '') {
    const li = document.createElement('li');
    li.className = 'mobile-menu__item';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `mobile-menu__link ${extraClass}`.trim();
    btn.dataset.action = action;
    btn.textContent = label;

    li.appendChild(btn);
    return li;
  }

  const homeItem = createNavItem('Home', 'home');
  const aboutItem = createNavItem('About', 'about');

  const favoritesItem = document.createElement('li');
  favoritesItem.className = 'mobile-menu__item';

  const favoritesBtn = document.createElement('button');
  favoritesBtn.type = 'button';
  favoritesBtn.className = 'mobile-menu__link mobile-menu__link--favorites';
  favoritesBtn.dataset.action = 'favorites';

  const favText = document.createElement('span');
  favText.textContent = 'Favorites';

  const badge = document.createElement('span');
  badge.className = 'mobile-menu__badge';
  badge.textContent = countLabel;

  favoritesBtn.append(favText, badge);
  favoritesItem.appendChild(favoritesBtn);

  navList.append(homeItem, aboutItem, favoritesItem);

  panel.append(header, navList);
  root.append(backdrop, panel);

  root.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const button = target.closest('[data-action]');
    if (!button) return;

    const action = button.dataset.action;

    if (action === 'close') {
      onClose();
      return;
    }

    if (action === 'home' || action === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onClose();
      return;
    }

    if (action === 'favorites') {
      onClose();
      onOpenFavorites();
    }
  });

  return root;
}