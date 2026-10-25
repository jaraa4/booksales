/**
 * ============================================================
 * CONTROLLER: AuthorController
 * ============================================================
 * Menghubungkan AuthorModel dengan AuthorView.
 * Bertanggung jawab mengambil data dari Model dan meneruskannya
 * ke View untuk ditampilkan ke pengguna.
 * ============================================================
 */

import AuthorModel from "../../models/AuthorModel";
import AuthorView from "../../views/AuthorView";

export default function AuthorController() {
  // ── Ambil data dari Model ──────────────────────────────────
  const authorData = AuthorModel;

  // ── Hitung total buku dari semua author ───────────────────
  const totalBuku = authorData.reduce((acc, a) => acc + a.jumlahBuku, 0);

  // ── Teruskan data ke View ──────────────────────────────────
  return <AuthorView authors={authorData} totalBuku={totalBuku} />;
}
