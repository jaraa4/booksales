/**
 * ============================================================
 * CONTROLLER: GenreController (API)
 * ============================================================
 * Controller ini telah direfaktor untuk arsitektur API.
 * Tidak lagi memanggil View — fokus pada logika bisnis dan
 * mengembalikan data dalam format JSON.
 *
 * Routing API (routes/api.js → server/):
 *   GET /api/genres       → index  (semua genre)
 *   GET /api/genres/:id   → show   (genre by ID)
 *
 * Setara dengan "app/Http/Controllers/GenreController.php"
 * pada arsitektur Laravel API (return response()->json(...)).
 * ============================================================
 */

import GenreModel from "../../models/GenreModel";

// ── index: Ambil semua data genre ─────────────────────────
export function index() {
  const genreData = GenreModel;

  // Hitung total buku dari semua genre
  const totalBuku = genreData.reduce((acc, g) => acc + g.jumlahBuku, 0);

  // Output JSON (setara return response()->json(...) di Laravel)
  return {
    success: true,
    message: "Data genre berhasil diambil",
    meta: {
      total: genreData.length,
      totalBuku,
    },
    data: genreData,
  };
}

// ── show: Ambil satu genre berdasarkan ID ─────────────────
export function show(id) {
  const genre = GenreModel.find((g) => g.id === parseInt(id));

  if (!genre) {
    return {
      success: false,
      message: `Genre dengan ID ${id} tidak ditemukan`,
      data: null,
    };
  }

  return {
    success: true,
    message: "Data genre berhasil diambil",
    data: genre,
  };
}

export default { index, show };
