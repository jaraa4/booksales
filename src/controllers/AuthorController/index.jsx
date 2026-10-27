/**
 * ============================================================
 * CONTROLLER: AuthorController (API)
 * ============================================================
 * Controller ini telah direfaktor untuk arsitektur API.
 * Tidak lagi memanggil View — fokus pada logika bisnis dan
 * mengembalikan data dalam format JSON.
 *
 * Routing API (routes/api.js → server/):
 *   GET /api/authors       → index  (semua author)
 *   GET /api/authors/:id   → show   (author by ID)
 *
 * Setara dengan "app/Http/Controllers/AuthorController.php"
 * pada arsitektur Laravel API (return response()->json(...)).
 * ============================================================
 */

import AuthorModel from "../../models/AuthorModel";

// ── index: Ambil semua data author ────────────────────────
export function index() {
  const authorData = AuthorModel;

  // Hitung total buku dari semua author
  const totalBuku = authorData.reduce((acc, a) => acc + a.jumlahBuku, 0);

  // Output JSON (setara return response()->json(...) di Laravel)
  return {
    success: true,
    message: "Data author berhasil diambil",
    meta: {
      total: authorData.length,
      totalBuku,
    },
    data: authorData,
  };
}

// ── show: Ambil satu author berdasarkan ID ────────────────
export function show(id) {
  const author = AuthorModel.find((a) => a.id === parseInt(id));

  if (!author) {
    return {
      success: false,
      message: `Author dengan ID ${id} tidak ditemukan`,
      data: null,
    };
  }

  return {
    success: true,
    message: "Data author berhasil diambil",
    data: author,
  };
}

export default { index, show };
