/**
 * ============================================================
 * PAGE: Author
 * ============================================================
 * Halaman route "/author" — cukup memanggil AuthorController
 * yang sudah menghubungkan Model dan View secara otomatis.
 * ============================================================
 */

import AuthorController from "../../controllers/AuthorController";

export default function AuthorPage() {
  return <AuthorController />;
}
