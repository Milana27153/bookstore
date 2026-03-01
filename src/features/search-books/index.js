import { searchBooks } from '../../shared/api/openLibrary.js';
import { normalizeBook } from '../../entities/book/model.js';
import { DEFAULT_BOOKS_LIMIT } from '../../shared/config/constants.js';

export async function performSearch(query, limit = DEFAULT_BOOKS_LIMIT) {
  const docs = await searchBooks(query, limit);
  return docs.map(normalizeBook);
}
