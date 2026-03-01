import bookIcon from '../../shared/assets/icons/book.svg?raw';

export function renderHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
    <div class="header__logo">
      <span class="header__icon">${bookIcon}</span>
      <div class="header__brand">
        <h1 class="header__title">The Library</h1>
        <p class="header__tagline">Discover your next favorite book.</p>
      </div>
    </div>
  `;
  return header;
}
