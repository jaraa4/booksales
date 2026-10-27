/**
 * ============================================================
 * ROUTES: API Routes (routes/api.js)
 * ============================================================
 * Mendefinisikan semua endpoint API RESTful untuk aplikasi
 * Booksales. File ini setara dengan "routes/api.php" pada
 * arsitektur Laravel.
 *
 * Semua route diawali prefix "/api" (didaftarkan di server.js).
 *
 * Endpoint yang tersedia:
 *   Books:
 *     GET  /api/books        → BookController.index  (semua buku)
 *     GET  /api/books/:id    → BookController.show   (buku by ID)
 *
 *   Authors:
 *     GET  /api/authors      → AuthorController.index  (semua author)
 *     GET  /api/authors/:id  → AuthorController.show   (author by ID)
 *
 *   Genres:
 *     GET  /api/genres       → GenreController.index  (semua genre)
 *     GET  /api/genres/:id   → GenreController.show   (genre by ID)
 * ============================================================
 */

import { Router } from "express";
import BookController from "../controllers/BookController.js";
import AuthorController from "../controllers/AuthorController.js";
import GenreController from "../controllers/GenreController.js";

const router = Router();

// ── BOOK ROUTES ────────────────────────────────────────────
// Setara: Route::get('/books', [BookController::class, 'index']);
// Setara: Route::get('/books/{id}', [BookController::class, 'show']);
router.get("/books", BookController.index);
router.get("/books/:id", BookController.show);

// ── AUTHOR ROUTES ──────────────────────────────────────────
// Setara: Route::get('/authors', [AuthorController::class, 'index']);
// Setara: Route::get('/authors/{id}', [AuthorController::class, 'show']);
router.get("/authors", AuthorController.index);
router.get("/authors/:id", AuthorController.show);

// ── GENRE ROUTES ───────────────────────────────────────────
// Setara: Route::get('/genres', [GenreController::class, 'index']);
// Setara: Route::get('/genres/{id}', [GenreController::class, 'show']);
router.get("/genres", GenreController.index);
router.get("/genres/:id", GenreController.show);

export default router;
