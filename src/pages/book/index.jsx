/**
 * ============================================================
 * PAGE: Book (MVC)
 * ============================================================
 * Halaman route "/book" — cukup memanggil BookController
 * yang sudah menghubungkan Model dan View secara otomatis.
 *
 * Setara dengan route "Route::get('/book', [BookController::class, 'index'])"
 * pada Laravel routing (routes/web.php).
 * ============================================================
 */

import BookController from "../../controllers/BookController";

export default function BookPage() {
  return <BookController />;
}
