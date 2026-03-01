import searchIcon from '../../shared/assets/icons/search.svg?raw';

export function renderSearchPanel(onSearch) {
  const section = document.createElement('section');
  section.className = 'search-panel';
  section.innerHTML = `
    <h2 class="search-panel__title">Discover Your Next Great Read</h2>
    <p class="search-panel__subtitle">Search millions of books, build your personal library, and never lose track of what to read next.</p>
    <form class="search-panel__form" autocomplete="off">
      <div class="search-panel__field">
        <span class="search-panel__icon">${searchIcon}</span>
        <input type="text" class="search-panel__input" placeholder="Search for books by title or author..." name="q" />
        <button type="submit" class="search-panel__btn">Search</button>
      </div>
    </form>
  `;

  const form = section.querySelector('.search-panel__form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.search-panel__input');
    const query = input.value.trim();
    onSearch(query);
  });

  return section;
}
