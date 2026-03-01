import { getFavorites, saveFavorites } from '../../shared/lib/storage.js';
import { bookToStorage, storageToBook } from '../../entities/book/model.js';

export function isFavorite(bookId) {
  return getFavorites().some((b) => b.id === bookId);
}

export function addToFavorites(book) {
  const list = getFavorites();
  if (list.some((b) => b.id === book.id)) return list;
  const next = [...list, bookToStorage(book)];
  saveFavorites(next);
  return next;
}

export function removeFromFavorites(bookId) {
  const list = getFavorites().filter((b) => b.id !== bookId);
  saveFavorites(list);
  return list;
}

export function getFavoritesList() {
  return getFavorites().map(storageToBook);
}
