import { renderBookCard } from '../book-card/index.js';
import { isFavorite } from '../../features/add-to-favorites/index.js';

export function renderBookList(books, onToggleFavorite) {
  const container = document.createElement('div');
  container.className = 'book-list';

  if (!books.length) {
    container.innerHTML = '<p class="book-list__empty">No books to display.</p>';
    return container;
  }

  const grid = document.createElement('div');
  grid.className = 'book-list__grid';

  books.forEach((book) => {
    const card = renderBookCard(book, isFavorite(book.id), onToggleFavorite);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  return container;
}

export function renderBookListState(state, onToggleFavorite) {
  const container = document.createElement('div');
  container.className = 'book-list';

  if (state === 'loading') {
    container.innerHTML = '<p class="book-list__state">Loading...</p>';
    return container;
  }

  if (state === 'error') {
    container.innerHTML = '<p class="book-list__state book-list__state--error">Nothing found. Network error.</p>';
    return container;
  }

  if (state === 'empty') {
    container.innerHTML = '<p class="book-list__state">Enter query.</p>';
    return container;
  }

  if (state === 'no-results') {
    container.innerHTML = '<p class="book-list__state">Nothing found.</p>';
    return container;
  }

  if (Array.isArray(state)) {
    return renderBookList(state, onToggleFavorite);
  }

  return container;
}
