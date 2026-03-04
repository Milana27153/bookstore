# The Library

## Task

The task description is available at the following [link](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view)  


## Overview
The Library is a modern and stylish online bookstore created for book lovers. Its user-friendly interface, attractive design, and powerful functionality will help you easily find your favorite book.

## Quick start
[Open website](https://milana27153.github.io/bookstore/)

Or using a command in the terminal:
### Installing dependencies
```
npm install
```

### Launch a project
```
npm run dev
```

## Features
- **Book Search** – Search millions of books by title or author  
- **Favorites** – Save books to your personal collection (stored in localStorage)  
- **Responsive Design** – Optimized for both desktop and mobile devices  
- **Mobile Navigation** – Hamburger menu for mobile screens  
- **Dark & Light Theme** – Switch between dark and light modes  
- **No Dependencies** – Built with pure HTML, CSS, and JavaScript

---

## Project Structure 
The project follows Feature-Sliced Design (FSD) methodology adapted for JavaScript:

***src/app***
Application initialization and core setup.
- main.js – Entry point
- Global styles (../styles/index.css)
- App bootstrap logic

**src/pages**
- Full pages of the application.
- home/home.css and home/index.js – Main page with search and book listing

**src/widgets (css and js)**
Independent, reusable UI blocks.
- header/ – App header with logo
- search-panel/ – Search form component
- book-list/ – Grid of book cards
- book-card/ – Individual book display
- favorites-sidebar/ – Favorites list sidebar
- search-books/ – Book search functionality

***src/features***
- User interactions and business logic.
- add-to-favorites/index.js – Favorites management

***src/entities*** 
- Business entities.
- book/model.js – Book model and normalization logic

***src/shared***
- ui/indes.css - The global :root directory contains the theme's CSS variables.
- api/openLibrary.js – Open Library API integration
- config/constants.js – Constants and configuration
- lib/storage.js and lib/theme.js– Storage aids, utilities, and dark-light themes.
- assets/ – Icons (SVG format)


## Technologies Used
- HTML
- CSS
- JavaScript
- Vite 
