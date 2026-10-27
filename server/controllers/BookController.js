/**
 * ============================================================
 * CONTROLLER: BookController (API)
 * ============================================================
 * Menghubungkan BookModel dengan response JSON untuk API.
 * Bertanggung jawab mengambil data dari Model, melakukan
 * kalkulasi/logika bisnis, dan mengembalikan JSON sebagai
 * response HTTP — tanpa View/HTML.
 *
 * Setara dengan "app/Http/Controllers/BookController.php"
 * pada arsitektur Laravel dengan output JSON (API).
 * ============================================================
 */

import BookModel from "../models/BookModel.js";

const BookController = {
  /**
   * GET /api/books
   * Mengembalikan semua data buku beserta statistik agregat.
   * Setara dengan method index() pada Laravel Controller.
   */
  index: (req, res) => {
    const bookData = BookModel;

    // ── Hitung total stok dari semua buku ─────────────────
    const totalStok = bookData.reduce((acc, b) => acc + b.stok, 0);

    // ── Hitung rata-rata rating ────────────────────────────
    const rataRating = parseFloat(
      (bookData.reduce((acc, b) => acc + b.rating, 0) / bookData.length).toFixed(1)
    );

    return res.status(200).json({
      success: true,
      message: "Data buku berhasil diambil",
      meta: {
        total: bookData.length,
        totalStok,
        rataRating,
      },
      data: bookData,
    });
  },

  /**
   * GET /api/books/:id
   * Mengembalikan satu data buku berdasarkan ID.
   * Setara dengan method show($id) pada Laravel Controller.
   */
  show: (req, res) => {
    const id = parseInt(req.params.id);
    const book = BookModel.find((b) => b.id === id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: `Buku dengan ID ${id} tidak ditemukan`,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data buku berhasil diambil",
      data: book,
    });
  },
};

export default BookController;
