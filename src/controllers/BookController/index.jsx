/**
 * ============================================================
 * CONTROLLER: BookController
 * ============================================================
 * Menghubungkan BookModel dengan BookView.
 * Bertanggung jawab mengambil data dari Model, melakukan
 * kalkulasi/logika bisnis, dan meneruskan hasilnya ke View.
 *
 * Setara dengan "app/Http/Controllers/BookController.php"
 * pada arsitektur Laravel MVC.
 * ============================================================
 */

import BookModel from "../../models/BookModel";
import BookView from "../../views/BookView";

export default function BookController() {
  // ── Ambil data dari Model ──────────────────────────────────
  const bookData = BookModel;

  // ── Hitung total stok dari semua buku ─────────────────────
  const totalStok = bookData.reduce((acc, b) => acc + b.stok, 0);

  // ── Hitung rata-rata rating ────────────────────────────────
  const rataRating = (
    bookData.reduce((acc, b) => acc + b.rating, 0) / bookData.length
  ).toFixed(1);

  // ── Teruskan data ke View ──────────────────────────────────
  return <BookView books={bookData} totalStok={totalStok} rataRating={rataRating} />;
}
