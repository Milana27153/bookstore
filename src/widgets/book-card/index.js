import heartIcon from '../../shared/assets/icons/heart.svg?raw';
import heartFullIcon from '../../shared/assets/icons/heart-full.svg?raw';

export function renderBookCard(book, isFavorite, onToggleFavorite) {
  const card = document.createElement('article');
  card.className = 'book-card';
  card.dataset.bookId = book.id;

  const authors = Array.isArray(book.author_name) ? book.author_name.join(', ') : book.author_name;
  const year = book.first_publish_year ?? '—';
  const coverHtml = book.coverUrl
    ? `<img src="${book.coverUrl}" alt="${escapeHtml(book.title)}" class="book-card__cover" loading="lazy" />`
    : `<div class="book-card__no-cover">No cover</div>`;

  const heartSvg = isFavorite ? heartFullIcon : heartIcon;
  const heartClass = isFavorite ? 'book-card__heart book-card__heart--active' : 'book-card__heart';

  card.innerHTML = `
    <div class="book-card__cover-wrap">
      ${coverHtml}
      <button type="button" class="${heartClass}" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}" data-action="toggle-favorite">
        ${heartSvg}
      </button>
    </div>
    <h3 class="book-card__title">${escapeHtml(book.title)}</h3>
    <p class="book-card__author">${escapeHtml(authors)}</p>
    <p class="book-card__year">${escapeHtml(String(year))}</p>
  `;

  const btn = card.querySelector('[data-action="toggle-favorite"]');
  btn.addEventListener('click', () => onToggleFavorite(book, isFavorite));

  return card;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
