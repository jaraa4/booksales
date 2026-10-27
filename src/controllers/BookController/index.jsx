/**
 * ============================================================
 * CONTROLLER: BookController (API)
 * ============================================================
 * Controller ini telah direfaktor untuk arsitektur API.
 * Tidak lagi memanggil View — fokus pada logika bisnis dan
 * mengembalikan data dalam format JSON.
 *
 * Routing API (routes/api.js → server/):
 *   GET /api/books       → index  (semua buku)
 *   GET /api/books/:id   → show   (buku by ID)
 *
 * Setara dengan "app/Http/Controllers/BookController.php"
 * pada arsitektur Laravel API (return response()->json(...)).
 * ============================================================
 */

import BookModel from "../../models/BookModel";

// ── index: Ambil semua data buku ──────────────────────────
export function index() {
  const bookData = BookModel;

  // Hitung total stok dari semua buku
  const totalStok = bookData.reduce((acc, b) => acc + b.stok, 0);

  // Hitung rata-rata rating
  const rataRating = parseFloat(
    (bookData.reduce((acc, b) => acc + b.rating, 0) / bookData.length).toFixed(1)
  );

  // Output JSON (setara return response()->json(...) di Laravel)
  return {
    success: true,
    message: "Data buku berhasil diambil",
    meta: {
      total: bookData.length,
      totalStok,
      rataRating,
    },
    data: bookData,
  };
}

// ── show: Ambil satu buku berdasarkan ID ──────────────────
export function show(id) {
  const book = BookModel.find((b) => b.id === parseInt(id));

  if (!book) {
    return {
      success: false,
      message: `Buku dengan ID ${id} tidak ditemukan`,
      data: null,
    };
  }

  return {
    success: true,
    message: "Data buku berhasil diambil",
    data: book,
  };
}

export default { index, show };
