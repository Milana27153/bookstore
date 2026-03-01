import { FAVORITES_STORAGE_KEY } from '../config/constants.js';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(books) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(books));
}
