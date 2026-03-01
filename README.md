# The Library

## Task

The task description is available at the following link:  
https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view

## Overview
The Library is a modern and stylish online bookstore created for book lovers. Its user-friendly interface, attractive design, and powerful functionality will help you easily find your favorite book.

## Quick start
```
npm run dev
```

## Features
***Book Search*** – Search millions of books by title or author

***Favorites*** – Save books to your personal collection (stored in localStorage)

***Responsive Design*** – Optimized for both desktop and mobile devices

***No Dependencies*** – Built with pure HTML, CSS, and JavaScript

---

## Project Structure 
The project follows Feature-Sliced Design (FSD) methodology adapted for JavaScript:

***src/app***
Application initialization and core setup.
- main.js – Entry point
- Global styles
- App bootstrap logic

**src/pages**
- Full pages of the application.
- home/ – Main page with search and book listing

**src/widgets**
Independent, reusable UI blocks.
- header/ – App header with logo
- search-panel/ – Search form component
- book-list/ – Grid of book cards
- book-card/ – Individual book display
- favorites-sidebar/ – Favorites list sidebar

***src/features***
- User interactions and business logic.
- search-books/ – Book search functionality
- add-to-favorites/ – Favorites management

***src/entities*** 
- Business entities.
- book/ – Book model and normalization logic

***src/shared***
- Reusable utilities and configuration.
- api/ – Open Library API integration
- config/ – Constants and configuration
- lib/ – Storage helpers and utilities
- assets/ – Icons (SVG format)


## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)
- Vite 
