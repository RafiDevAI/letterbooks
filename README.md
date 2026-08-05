# 📚 Letterbooks

> **A Letterboxd-Style Personal Book Collection Portal**
> 
> *Created on August 2, 2026*

Letterbooks is a modern, responsive, and visually stunning web application designed to catalog, display, and review a curated collection of landmark books. Inspired by the sleek, dark design language of **Letterboxd**, it displays books as rich covers (posters) with interactive overlays, detailed slide-in overlays, real-time search, category filters, multi-criteria sorting, grid/list view toggles, and persistent favorites.

This project showcases 64 classic and highly-influential books spanning personal development, finance, business, psychology, and startup strategies.

---

## 🎨 Visual Preview & Design System

The application closely mirrors the signature **Letterboxd** aesthetic:
- **Color Palette**: Sleek dark theme (`#14181c` body, `#181c22` navbar, `#1c2228` cards) with the iconic three-dot logo (Green, Orange, Blue) and glowing highlights.
- **Micro-Animations**: Smooth hover transitions, scale-up effects on book covers, and soft slide-in animations for the details modal.
- **Glassmorphism**: Soft background blur overlays for modal screens to create high visual depth.
- **Responsive Typography**: Rendered in clean sans-serif typography (`Inter`, fallback to Apple system fonts) designed for high readability.

---

## ✨ Core Features

1. **Dual Layout Views**:
   - **Grid View**: A dense grid of high-quality book covers featuring a hover overlay showing the title, author, and rating.
   - **List View**: A clean, structured list view ideal for reading longer lists.
2. **Dynamic Filtering**:
   - **Search Bar**: Real-time filtering matching book titles, authors, or quotes as you type.
   - **Category Select**: Dropdown filter to narrow down books by specific genres or fields.
3. **Advanced Sorting**:
   - **Rating**: Sort books from highest to lowest score (default).
   - **Title (A-Z)**: Alphabetical sort.
   - **Category**: Group books by their categories.
   - **Year**: Sort by release/publication year.
4. **Interactive Details Modal**:
   - Clicking a book cover displays an immersive modal featuring:
     - Enlarged book cover.
     - Book metadata (Title, Author, Category, Page Count).
     - Iconic quote from the book.
     - Rating display (out of 5.0) with star graphics.
     - A persistent "Like/Favorite" action button.
5. **Persistent Favorites**:
   - Users can "Like" books. Liked books are saved to the browser's `localStorage` and display a small pink heart (♥) badge on the cover.
6. **Log Book Trigger**:
   - A mockup interactive button that simulates logging a book in the user's library.

---

## 📂 Project Directory Structure

```filepath
BOOK/
├── index.html          # Core layout, HTML structure, navbar, subnav, and modal markup
├── styles.css          # Design system, CSS custom properties, grid/list systems, and animations
├── app.js              # State manager, event handlers, list renderers, and modal controllers (ES Module)
├── data.js             # Local database containing the 64 book records (ES Module export)
├── books_enriched.json # JSON representation of the catalog data
├── books_structured.txt# Structured list of categories and books
├── books_raw.txt       # Raw text dump of the books list
├── .gitignore          # Rules for files excluded from Git tracking
└── README.md           # This comprehensive documentation file
```

---

## 💾 Data Schema & Structure

Book data is stored in [data.js](file:///c:/Users/ksa/Downloads/BOOK/data.js) and exported as `BOOKS_DATA`. Each book record is an object adhering to the following schema:

```json
{
  "id": 1,
  "category": "Mindset & Personal Growth",
  "title": "Atomic Habits",
  "author": "James Clear",
  "quote": "Build good habits, break bad ones.",
  "cover_url": "https://covers.openlibrary.org/b/id/15105773-L.jpg",
  "rating": 4.8,
  "publishedYear": "2020",
  "pages": 280,
  "isbn": "9780735211292"
}
```

### 📚 Catalog Categories Included
*   `Productivity & Habits`
*   `Mindset & Personal Growth`
*   `Psychology & Social Dynamics`
*   `Wealth & Personal Finance`
*   `Business & Entrepreneurship`
*   `Power, Negotiation & Influence`
*   `Creativity & Innovation`
*   `Biographies & Memoirs`

---

## 🛠️ Local Development Setup

Since this application uses native ES Modules (`import`/`export`), opening `index.html` directly via the file protocol (`file:///...`) will trigger CORS policy restrictions in modern browsers. 

To run it locally, serve the directory from a local web server:

### Option 1: Using Python (Recommended & Easiest)
Run the following command in your terminal inside the project directory:
```bash
python -m http.server 8080
```
Then, open your browser and navigate to:
```
http://localhost:8080
```

### Option 2: Using Node.js (http-server)
If you have Node.js installed, you can run:
```bash
npx http-server -p 8080
```
Then open `http://localhost:8080`.

### Option 3: Using VS Code "Live Server" Extension
1. Open the project folder in VS Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Click the **Go Live** button in the status bar at the bottom right.

---

