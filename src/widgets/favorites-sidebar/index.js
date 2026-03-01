import heartIcon from '../../shared/assets/icons/heart.svg?raw';
import heartFullIcon from '../../shared/assets/icons/heart-full.svg?raw';

export function renderFavoritesSidebar(favorites, onRemove, onToggleFavorite) {
  const sidebar = document.createElement('aside');
  sidebar.className = 'favorites-sidebar';

  const count = favorites.length;
  const countText = count === 1 ? '1 book saved' : `${count} books saved`;

  let listHtml = '';
  if (favorites.length === 0) {
    listHtml = '<p class="favorites-sidebar__empty">No favorites yet.</p>';
  } else {
    listHtml = favorites
      .map((book) => {
        const authors = Array.isArray(book.author_name) ? book.author_name.join(', ') : book.author_name;
        const year = book.first_publish_year ?? '—';
        const coverHtml = book.coverUrl
          ? `<img src="${book.coverUrl}" alt="" class="favorites-sidebar__cover" />`
          : `<div class="favorites-sidebar__no-cover">No cover</div>`;
        return `
          <div class="favorites-sidebar__item" data-book-id="${book.id}">
            ${coverHtml}
            <div class="favorites-sidebar__info">
              <div class="favorites-sidebar__title">${escapeHtml(book.title)}</div>
              <div class="favorites-sidebar__meta">${escapeHtml(authors)} · ${escapeHtml(String(year))}</div>
            </div>
            <button type="button" class="favorites-sidebar__remove" aria-label="Remove from favorites" data-action="remove">
              ${heartFullIcon}
            </button>
          </div>
        `;
      })
      .join('');
  }

  sidebar.innerHTML = `
    <div class="favorites-sidebar__header">
      <span class="favorites-sidebar__icon">${heartIcon}</span>
      <h2 class="favorites-sidebar__title">Favorites</h2>
    </div>
    <p class="favorites-sidebar__count">${countText}</p>
    <div class="favorites-sidebar__list">${listHtml}</div>
  `;

  sidebar.querySelectorAll('[data-action="remove"]').forEach((btn) => {
    const item = btn.closest('.favorites-sidebar__item');
    const bookId = item.dataset.bookId;
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to remove from favorites?')) {
        onRemove(bookId);
      }
    });
  });

  return sidebar;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
