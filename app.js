import { BOOKS_DATA } from './data.js';

// Application State
let state = {
  books: [...BOOKS_DATA],
  selectedGenre: 'All',
  searchQuery: '',
  sortBy: 'rating',
  viewMode: 'grid',
  favorites: JSON.parse(localStorage.getItem('letterbooks_favs') || '[]')
};

// DOM Elements
const elements = {
  posterGrid: document.getElementById('posterGrid'),
  readCountLabel: document.getElementById('readCountLabel'),
  genreSelect: document.getElementById('genreSelect'),
  sortSelect: document.getElementById('sortSelect'),
  viewSelect: document.getElementById('viewSelect'),
  searchInput: document.getElementById('lbSearchInput'),
  modalOverlay: document.getElementById('lbModalOverlay'),
  modalClose: document.getElementById('lbModalClose'),
  modalCover: document.getElementById('modalCover'),
  modalTitle: document.getElementById('modalTitle'),
  modalMeta: document.getElementById('modalMeta'),
  modalQuote: document.getElementById('modalQuote'),
  modalStars: document.getElementById('modalStars'),
  favActionBtn: document.getElementById('favActionBtn'),
  logBookBtn: document.getElementById('logBookBtn')
};

document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  setupEvents();
});

function renderGrid() {
  let filtered = [...BOOKS_DATA];

  // Category / Genre Filter
  if (state.selectedGenre !== 'All') {
    filtered = filtered.filter(b => b.category === state.selectedGenre);
  }

  // Search Filter
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(b => 
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.quote.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (state.sortBy === 'title') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (state.sortBy === 'category') {
    filtered.sort((a, b) => a.category.localeCompare(b.category));
  } else if (state.sortBy === 'year') {
    filtered.sort((a, b) => (b.publishedYear || 2020) - (a.publishedYear || 2020));
  }

  elements.readCountLabel.textContent = `READ (${filtered.length} BOOKS)`;

  elements.posterGrid.className = `lb-poster-grid ${state.viewMode === 'list' ? 'list-mode' : ''}`;

  if (filtered.length === 0) {
    elements.posterGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--lb-text-muted);">
        No books found matching criteria.
      </div>
    `;
    return;
  }

  elements.posterGrid.innerHTML = filtered.map(book => {
    const isFav = state.favorites.includes(book.id);
    const starCount = Math.round(book.rating);
    const stars = '★'.repeat(starCount);

    return `
      <div class="lb-poster-card" data-id="${book.id}">
        <img class="lb-poster-img" src="${book.cover_url}" alt="${book.title}" loading="lazy" onError="this.src='https://covers.openlibrary.org/b/id/10523450-L.jpg'" />
        <div class="lb-poster-overlay">
          <div class="lb-overlay-top">
            ${isFav ? '<span class="lb-fav-heart">♥</span>' : ''}
          </div>
          <div class="lb-overlay-bottom">
            <div class="lb-poster-title">${book.title}</div>
            <div class="lb-poster-author">${book.author}</div>
            <div class="lb-poster-stars">${stars} ${book.rating}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupEvents() {
  elements.genreSelect.addEventListener('change', (e) => {
    state.selectedGenre = e.target.value;
    renderGrid();
  });

  elements.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderGrid();
  });

  elements.viewSelect.addEventListener('change', (e) => {
    state.viewMode = e.target.value;
    renderGrid();
  });

  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderGrid();
  });

  elements.posterGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.lb-poster-card');
    if (card) {
      const id = parseInt(card.dataset.id);
      openModal(id);
    }
  });

  elements.modalClose.addEventListener('click', closeModal);
  elements.modalOverlay.addEventListener('click', (e) => {
    if (e.target === elements.modalOverlay) closeModal();
  });

  elements.logBookBtn.addEventListener('click', () => {
    const title = prompt("Enter book title to log:");
    if (title) alert(`Logged "${title}" into your library!`);
  });
}

function openModal(id) {
  const book = BOOKS_DATA.find(b => b.id === id);
  if (!book) return;

  elements.modalCover.src = book.cover_url;
  elements.modalTitle.textContent = book.title;
  elements.modalMeta.textContent = `by ${book.author} • ${book.category}`;
  elements.modalQuote.textContent = `"${book.quote}"`;
  elements.modalStars.textContent = `★ ${book.rating} / 5.0 • ${book.pages || 280} Pages`;

  const isFav = state.favorites.includes(book.id);
  elements.favActionBtn.textContent = isFav ? '♥ Liked' : '♡ Like Book';

  elements.favActionBtn.onclick = () => {
    if (state.favorites.includes(book.id)) {
      state.favorites = state.favorites.filter(f => f !== book.id);
    } else {
      state.favorites.push(book.id);
    }
    localStorage.setItem('letterbooks_favs', JSON.stringify(state.favorites));
    openModal(book.id);
    renderGrid();
  };

  elements.modalOverlay.classList.add('active');
}

function closeModal() {
  elements.modalOverlay.classList.remove('active');
}
