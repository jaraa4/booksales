/**
 * ============================================================
 * CONTROLLER: AuthorController (API)
 * ============================================================
 * Menghubungkan AuthorModel dengan response JSON untuk API.
 * Bertanggung jawab mengambil data dari Model dan mengembalikan
 * JSON sebagai response HTTP — tanpa View/HTML.
 *
 * Setara dengan "app/Http/Controllers/AuthorController.php"
 * pada arsitektur Laravel dengan output JSON (API).
 * ============================================================
 */

import AuthorModel from "../models/AuthorModel.js";

const AuthorController = {
  /**
   * GET /api/authors
   * Mengembalikan semua data author beserta statistik agregat.
   * Setara dengan method index() pada Laravel Controller.
   */
  index: (req, res) => {
    const authorData = AuthorModel;

    // ── Hitung total buku dari semua author ───────────────
    const totalBuku = authorData.reduce((acc, a) => acc + a.jumlahBuku, 0);

    return res.status(200).json({
      success: true,
      message: "Data author berhasil diambil",
      meta: {
        total: authorData.length,
        totalBuku,
      },
      data: authorData,
    });
  },

  /**
   * GET /api/authors/:id
   * Mengembalikan satu data author berdasarkan ID.
   * Setara dengan method show($id) pada Laravel Controller.
   */
  show: (req, res) => {
    const id = parseInt(req.params.id);
    const author = AuthorModel.find((a) => a.id === id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: `Author dengan ID ${id} tidak ditemukan`,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data author berhasil diambil",
      data: author,
    });
  },
};

export default AuthorController;
