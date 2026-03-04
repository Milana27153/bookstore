import { renderFavoritesSidebar } from '../favorites-sidebar/index.js';

export function openFavoritesModal(favorites, onRemoveFavorite) {
  const existing = document.querySelector('.favorites-modal');
  if (existing) {
    existing.remove();
  }

  const root = document.createElement('div');
  root.className = 'favorites-modal';

  root.innerHTML = `
    <div class="favorites-modal__backdrop" data-action="close"></div>
    <div class="favorites-modal__panel">
      <div class="favorites-modal__header">
        <h2 class="favorites-modal__title">Favorites</h2>
        <button type="button" class="favorites-modal__close" aria-label="Close" data-action="close">×</button>
      </div>
      <div class="favorites-modal__body"></div>
    </div>
  `;

  const body = root.querySelector('.favorites-modal__body');
  const sidebar = renderFavoritesSidebar(favorites, (bookId) => {
    onRemoveFavorite(bookId);
  });
  body.appendChild(sidebar);

  root.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    if (action === 'close') {
      root.remove();
    }
  });

  document.body.appendChild(root);
  return root;
}

