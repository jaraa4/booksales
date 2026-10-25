/**
 * ============================================================
 * PAGE: Genre
 * ============================================================
 * Halaman route "/genre" — cukup memanggil GenreController
 * yang sudah menghubungkan Model dan View secara otomatis.
 * ============================================================
 */

import GenreController from "../../controllers/GenreController";

export default function GenrePage() {
  return <GenreController />;
}
