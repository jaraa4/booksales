/**
 * ============================================================
 * CONTROLLER: GenreController
 * ============================================================
 * Menghubungkan GenreModel dengan GenreView.
 * Bertanggung jawab mengambil data dari Model dan meneruskannya
 * ke View untuk ditampilkan ke pengguna.
 * ============================================================
 */

import GenreModel from "../../models/GenreModel";
import GenreView from "../../views/GenreView";

export default function GenreController() {
  // ── Ambil data dari Model ──────────────────────────────────
  const genreData = GenreModel;

  // ── Hitung total buku dari semua genre ────────────────────
  const totalBuku = genreData.reduce((acc, g) => acc + g.jumlahBuku, 0);

  // ── Teruskan data ke View ──────────────────────────────────
  return <GenreView genres={genreData} totalBuku={totalBuku} />;
}
