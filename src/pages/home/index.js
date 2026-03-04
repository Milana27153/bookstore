import { renderHeader } from '../../widgets/header/index.js';
import { renderSearchPanel } from '../../widgets/search-panel/index.js';
import { renderBookListState } from '../../widgets/book-list/index.js';
import { renderFavoritesSidebar } from '../../widgets/favorites-sidebar/index.js';
import { renderMobileMenu } from '../../widgets/mobile-menu/index.js';
import { openFavoritesModal } from '../../widgets/favorites-modal/index.js';
import { performSearch } from '../../features/search-books/index.js';
import {
  addToFavorites,
  removeFromFavorites,
  getFavoritesList,
} from '../../features/add-to-favorites/index.js';
import { DEFAULT_BOOKS_LIMIT } from '../../shared/config/constants.js';

import './home.css';
import '../../widgets/header/header.css';
import '../../widgets/search-panel/search-panel.css';
import '../../widgets/book-list/book-list.css';
import '../../widgets/book-card/book-card.css';
import '../../widgets/favorites-sidebar/favorites-sidebar.css';
import '../../widgets/mobile-menu/mobile-menu.css';
import '../../widgets/favorites-modal/favorites-modal.css';

export function renderHomePage() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const header = renderHeader(handleToggleMenu);
  app.appendChild(header);

  const main = document.createElement('main');
  main.className = 'layout';

  const content = document.createElement('div');
  content.className = 'layout__content';

  const searchPanel = renderSearchPanel(handleSearch);

  const bookListContainer = document.createElement('div');
  bookListContainer.className = 'layout__books';

  content.appendChild(searchPanel);
  content.appendChild(bookListContainer);

  const sidebarWrapper = document.createElement('div');
  sidebarWrapper.className = 'layout__sidebar';

  main.appendChild(content);
  main.appendChild(sidebarWrapper);

  app.appendChild(main);

  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.textContent = 'Powered by Open Library';

  app.appendChild(footer);

  const sidebarComponent = renderFavoritesSidebar(
    getFavoritesList(),
    handleRemoveFavorite
  );

  sidebarWrapper.appendChild(sidebarComponent);

  let currentBooks = [];
  let currentMenu = null;

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

  function refreshSidebar() {
    const favorites = getFavoritesList();
    const wrapper = sidebarWrapper;
    wrapper.innerHTML = '';
    const updated = renderFavoritesSidebar(favorites, handleRemoveFavorite);
    wrapper.appendChild(updated);
  }

  function handleSearch(query) {
    if (!query) {
      currentBooks = 'empty';
      refreshBookList();
      return;
    }

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

  const existingModal = document.querySelector('.favorites-modal');
  if (existingModal) {
    existingModal.remove();
    openFavoritesPopup();
  }
}

  function openFavoritesPopup() {
    const favorites = getFavoritesList();
    openFavoritesModal(favorites, handleRemoveFavorite);
  }

  function handleToggleMenu() {
    if (currentMenu) {
      currentMenu.remove();
      currentMenu = null;
      return;
    }

  const favoritesCount = getFavoritesList().length;
  const menu = renderMobileMenu({
    favoritesCount,
    onClose: () => {
      if (currentMenu) {
        currentMenu.remove();
        currentMenu = null;
      }
    },
    onOpenFavorites: () => {
    openFavoritesPopup();
    },
  });

    menu.classList.add('mobile-menu--visible');
    document.body.appendChild(menu);
    currentMenu = menu;
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