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

  /**
   * POST /api/genres
   * Menyimpan data genre baru.
   * Setara dengan method store(Request $request) pada Laravel Controller.
   */
  store: (req, res) => {
    const { nama, deskripsi, icon, warna, jumlahBuku } = req.body;

    if (!nama || !deskripsi) {
      return res.status(422).json({
        success: false,
        message: "Field nama dan deskripsi wajib diisi",
        errors: {
          nama: !nama ? "Nama genre wajib diisi" : null,
          deskripsi: !deskripsi ? "Deskripsi wajib diisi" : null,
        },
      });
    }

    const newGenre = {
      id: GenreModel.length > 0 ? Math.max(...GenreModel.map((g) => g.id)) + 1 : 1,
      nama: String(nama).trim(),
      deskripsi: String(deskripsi).trim(),
      icon: icon ? String(icon).trim() : "fa-book",
      warna: warna ? String(warna).trim() : "#4f46e5",
      jumlahBuku: parseInt(jumlahBuku, 10) || 0,
    };

    GenreModel.push(newGenre);

    return res.status(201).json({
      success: true,
      message: "Data genre berhasil ditambahkan",
      data: newGenre,
    });
  },
};

export default GenreController;
