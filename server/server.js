/**
 * ============================================================
 * SERVER: Express.js API Server (server.js)
 * ============================================================
 * Entry point untuk backend API aplikasi Booksales.
 * Setara dengan "bootstrap/app.php" + "artisan serve" pada
 * arsitektur Laravel.
 *
 * Menjalankan server Express yang melayani endpoint REST API
 * dengan output JSON — tanpa template/view HTML apapun.
 *
 * Cara menjalankan:
 *   node server.js
 *   (atau: npm run server dari root project)
 *
 * Server berjalan di: http://localhost:3000
 * ============================================================
 */

import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());               // Izinkan cross-origin request (untuk Postman / frontend)
app.use(express.json());       // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// ── API Routes ──────────────────────────────────────────────
// Semua route dari routes/api.js didaftarkan dengan prefix "/api"
// Setara dengan: Route::prefix('api')->group(...)  pada Laravel
app.use("/api", apiRouter);

// ── Root Endpoint ───────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Selamat datang di Booksales API",
    version: "1.0.0",
    endpoints: {
      books: "/api/books",
      bookById: "/api/books/:id",
      authors: "/api/authors",
      authorById: "/api/authors/:id",
      genres: "/api/genres",
      genreById: "/api/genres/:id",
    },
  });
});

// ── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint '${req.originalUrl}' tidak ditemukan`,
    data: null,
  });
});

// ── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Booksales API Server berjalan di http://localhost:${PORT}`);
  console.log(`📚 Endpoints:`);
  console.log(`   GET http://localhost:${PORT}/api/books`);
  console.log(`   GET http://localhost:${PORT}/api/books/:id`);
  console.log(`   GET http://localhost:${PORT}/api/authors`);
  console.log(`   GET http://localhost:${PORT}/api/authors/:id`);
  console.log(`   GET http://localhost:${PORT}/api/genres`);
  console.log(`   GET http://localhost:${PORT}/api/genres/:id`);
});
