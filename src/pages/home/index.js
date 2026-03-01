import { renderHeader } from '../../widgets/header/index.js';
import { renderSearchPanel } from '../../widgets/search-panel/index.js';
import { renderBookListState } from '../../widgets/book-list/index.js';
import { renderFavoritesSidebar } from '../../widgets/favorites-sidebar/index.js';
import { performSearch } from '../../features/search-books/index.js';
import {
  addToFavorites,
  removeFromFavorites,
  getFavoritesList,
  isFavorite,
} from '../../features/add-to-favorites/index.js';
import { DEFAULT_BOOKS_LIMIT } from '../../shared/config/constants.js';

import './home.css';
import '../../widgets/header/header.css';
import '../../widgets/search-panel/search-panel.css';
import '../../widgets/book-list/book-list.css';
import '../../widgets/book-card/book-card.css';
import '../../widgets/favorites-sidebar/favorites-sidebar.css';

export function renderHomePage() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const header = renderHeader();
  const searchPanel = renderSearchPanel(handleSearch);

  app.appendChild(header);
  app.appendChild(searchPanel);

  const main = document.createElement('main');
  main.className = 'layout';

  const content = document.createElement('div');
  content.className = 'layout__content';

  const bookListContainer = document.createElement('div');
  bookListContainer.className = 'layout__books';

  content.appendChild(bookListContainer);

  const sidebarWrapper = document.createElement('div');
  sidebarWrapper.className = 'layout__sidebar';

  main.appendChild(content);
  main.appendChild(sidebarWrapper);

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.textContent = 'Powered by Open Library';

  app.appendChild(main);
  app.appendChild(footer);

  let currentBooks = [];
  let currentQuery = '';

  function refreshBookList() {
    const state = getBookListState();
    const newList = renderBookListState(state, handleToggleFavorite);
    bookListContainer.innerHTML = '';
    bookListContainer.appendChild(newList);
  }

  function getBookListState() {
    if (currentBooks === 'loading') return 'loading';
    if (currentBooks === 'error') return 'error';
    if (currentBooks === 'empty') return 'empty';
    if (currentBooks === 'no-results') return 'no-results';
    return currentBooks;
  }

  const sidebarComponent = renderFavoritesSidebar(
    getFavoritesList(),
    handleRemoveFavorite,
    handleToggleFavorite
  );

  sidebarWrapper.appendChild(sidebarComponent);

  function refreshSidebar() {
    const favorites = getFavoritesList();

    const list = sidebarComponent.querySelector('.favorites-sidebar__list');
    const count = sidebarComponent.querySelector('.favorites-sidebar__count');

    if (!list || !count) return;

    count.textContent =
      favorites.length === 1
        ? '1 book saved'
        : `${favorites.length} books saved`;

    const updatedSidebar = renderFavoritesSidebar(
      favorites,
      handleRemoveFavorite,
      handleToggleFavorite
    );

    const newList = updatedSidebar.querySelector('.favorites-sidebar__list');
    list.innerHTML = newList.innerHTML;

    list.querySelectorAll('[data-action="remove"]').forEach((btn) => {
      const item = btn.closest('.favorites-sidebar__item');
      const bookId = item.dataset.bookId;
      btn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove from favorites?')) {
          handleRemoveFavorite(bookId);
        }
      });
    });
  }

  function handleSearch(query) {
    if (!query) {
      currentBooks = 'empty';
      refreshBookList();
      return;
    }

    currentQuery = query;
    currentBooks = 'loading';
    refreshBookList();

    performSearch(query, 20)
      .then((books) => {
        currentBooks = books.length ? books : 'no-results';
        refreshBookList();
      })
      .catch(() => {
        currentBooks = 'error';
        refreshBookList();
      });
  }

  function handleToggleFavorite(book, wasFavorite) {
    if (wasFavorite) {
      if (confirm('Are you sure you want to remove from favorites?')) {
        removeFromFavorites(book.id);
        refreshBookList();
        refreshSidebar();
      }
    } else {
      addToFavorites(book);
      refreshBookList();
      refreshSidebar();
    }
  }

  function handleRemoveFavorite(bookId) {
    removeFromFavorites(bookId);
    refreshBookList();
    refreshSidebar();
  }

  refreshSidebar();
  currentBooks = 'loading';
  refreshBookList();

  performSearch('', DEFAULT_BOOKS_LIMIT)
    .then((books) => {
      currentBooks = books.length ? books : 'no-results';
      refreshBookList();
    })
    .catch(() => {
      currentBooks = 'error';
      refreshBookList();
    });
}