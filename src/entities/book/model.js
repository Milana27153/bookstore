import { getCoverUrl } from '../../shared/api/openLibrary.js';

export function normalizeBook(doc) {
  const key = doc.key || doc.cover_edition_key || `book-${doc.cover_i || Math.random()}`;
  const id = typeof key === 'string' ? key.replace(/^\/works\//, '').replace(/^\/books\//, '') : key;
  return {
    id: id || `book-${doc.cover_i || Date.now()}`,
    key,
    title: doc.title || 'Unknown Title',
    author_name: Array.isArray(doc.author_name) ? doc.author_name : (doc.author_name ? [doc.author_name] : ['Unknown Author']),
    first_publish_year: doc.first_publish_year ?? null,
    cover_i: doc.cover_i ?? null,
    coverUrl: getCoverUrl(doc.cover_i),
  };
}

export function bookToStorage(book) {
  return {
    id: book.id,
    key: book.key,
    title: book.title,
    author_name: book.author_name,
    first_publish_year: book.first_publish_year,
    cover_i: book.cover_i,
    coverUrl: book.coverUrl,
  };
}

export function storageToBook(stored) {
  return {
    ...stored,
    coverUrl: stored.coverUrl || (stored.cover_i ? `https://covers.openlibrary.org/b/id/${stored.cover_i}-M.jpg` : null),
  };
}
