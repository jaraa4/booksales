/**
 * ============================================================
 * CONTROLLER: GenreController (API)
 * ============================================================
 * Menghubungkan GenreModel dengan response JSON untuk API.
 * Bertanggung jawab mengambil data dari Model dan mengembalikan
 * JSON sebagai response HTTP — tanpa View/HTML.
 *
 * Setara dengan "app/Http/Controllers/GenreController.php"
 * pada arsitektur Laravel dengan output JSON (API).
 * ============================================================
 */

import GenreModel from "../models/GenreModel.js";

const GenreController = {
  /**
   * GET /api/genres
   * Mengembalikan semua data genre beserta statistik agregat.
   * Setara dengan method index() pada Laravel Controller.
   */
  index: (req, res) => {
    const genreData = GenreModel;

    // ── Hitung total buku dari semua genre ────────────────
    const totalBuku = genreData.reduce((acc, g) => acc + g.jumlahBuku, 0);

    return res.status(200).json({
      success: true,
      message: "Data genre berhasil diambil",
      meta: {
        total: genreData.length,
        totalBuku,
      },
      data: genreData,
    });
  },

  /**
   * GET /api/genres/:id
   * Mengembalikan satu data genre berdasarkan ID.
   * Setara dengan method show($id) pada Laravel Controller.
   */
  show: (req, res) => {
    const id = parseInt(req.params.id);
    const genre = GenreModel.find((g) => g.id === id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: `Genre dengan ID ${id} tidak ditemukan`,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data genre berhasil diambil",
      data: genre,
    });
  },
};

export default GenreController;
