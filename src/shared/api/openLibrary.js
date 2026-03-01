import { API_BASE, COVERS_BASE, DEFAULT_SEARCH_QUERY, DEFAULT_BOOKS_LIMIT } from '../config/constants.js';

export function getCoverUrl(coverId, size = 'M') {
  if (!coverId) return null;
  return `${COVERS_BASE}/b/id/${coverId}-${size}.jpg`;
}

export async function searchBooks(query, limit = 20) {
  const q = query?.trim() || DEFAULT_SEARCH_QUERY;
  const url = `${API_BASE}/search.json?q=${encodeURIComponent(q)}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  return data.docs || [];
}
