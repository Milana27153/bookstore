import bookIcon from '../../shared/assets/icons/book.svg?raw';

export function renderHeader(onMenuClick) {
  const header = document.createElement('header');
  header.className = 'header';

  const inner = document.createElement('div');
  inner.className = 'header__inner';

  const logo = document.createElement('a');
  logo.className = 'header__logo';
  logo.href = '/';

  const iconWrapper = document.createElement('span');
  iconWrapper.className = 'header__icon';
  iconWrapper.insertAdjacentHTML('afterbegin', bookIcon);

  const brand = document.createElement('div');
  brand.className = 'header__brand';

  const title = document.createElement('h1');
  title.className = 'header__title';
  title.textContent = 'The Library';

  const tagline = document.createElement('p');
  tagline.className = 'header__tagline';
  tagline.textContent = 'Discover your next favorite book.';

  brand.append(title, tagline);
  logo.append(iconWrapper, brand);

  const menuButton = document.createElement('button');
  menuButton.className = 'header__menu-toggle';
  menuButton.type = 'button';
  menuButton.setAttribute('aria-label', 'Open navigation');

  for (let i = 0; i < 3; i++) {
    const bar = document.createElement('span');
    bar.className = 'header__menu-bar';
    menuButton.appendChild(bar);
  }

  if (typeof onMenuClick === 'function') {
    menuButton.addEventListener('click', onMenuClick);
  }

  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768 && window.scrollY > 80) {
      menuButton.classList.add('header__menu-toggle--floating');
    } else {
      menuButton.classList.remove('header__menu-toggle--floating');
    }
  });

  inner.append(logo, menuButton);
  header.appendChild(inner);

  return header;
}