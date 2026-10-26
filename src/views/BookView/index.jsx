/**
 * ============================================================
 * VIEW: BookView
 * ============================================================
 * Menerima data books dari BookController melalui props,
 * lalu menampilkannya sebagai tabel HTML yang terformat rapi.
 *
 * Setara dengan "resources/views/books/index.blade.php"
 * pada arsitektur Laravel MVC.
 * ============================================================
 */

export default function BookView({ books, totalStok, rataRating }) {
  return (
    <section className="py-4">
      {/* ── Page Header ───────────────────────────────────── */}
      <div
        className="rounded-4 mb-4 p-4 text-white"
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
          boxShadow: "0 8px 32px rgba(29, 78, 216, 0.35)",
        }}
      >
        <div className="d-flex align-items-center gap-3 mb-2">
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-3 bg-white"
            style={{ width: 52, height: 52 }}
          >
            <i className="fa-solid fa-book-open fs-4" style={{ color: "#1d4ed8" }}></i>
          </span>
          <div>
            <h1 className="mb-0 fw-bold fs-3">Daftar Buku</h1>
            <p className="mb-0 opacity-75 small">
              Koleksi buku yang tersedia di Bookstore kami
            </p>
          </div>
        </div>

        {/* Stat Badges */}
        <div className="d-flex gap-3 mt-3 flex-wrap">
          <span
            className="badge rounded-pill px-3 py-2 fs-6 fw-normal"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <i className="fa-solid fa-book me-2"></i>
            {books.length} Judul Buku
          </span>
          <span
            className="badge rounded-pill px-3 py-2 fs-6 fw-normal"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <i className="fa-solid fa-boxes-stacked me-2"></i>
            {totalStok} Total Stok
          </span>
          <span
            className="badge rounded-pill px-3 py-2 fs-6 fw-normal"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <i className="fa-solid fa-star me-2"></i>
            {rataRating} Rata-rata Rating
          </span>
        </div>
      </div>

      {/* ── Tabel Data Buku ───────────────────────────────── */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr style={{ background: "linear-gradient(90deg, #eff6ff, #dbeafe)" }}>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13, width: 60 }}>
                  #
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-book me-2"></i>Judul Buku
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-feather-pointed me-2"></i>Penulis
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-tag me-2"></i>Genre
                </th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-calendar me-2"></i>Tahun
                </th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-star me-2"></i>Rating
                </th>
                <th className="px-4 py-3 text-muted fw-semibold text-end" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-tag me-2"></i>Harga
                </th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-boxes-stacked me-2"></i>Stok
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr
                  key={book.id}
                  className="border-top"
                  style={{ transition: "background 0.15s" }}
                >
                  {/* Nomor */}
                  <td className="px-4 py-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-white"
                      style={{
                        width: 30,
                        height: 30,
                        fontSize: 12,
                        background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                      }}
                    >
                      {index + 1}
                    </span>
                  </td>

                  {/* Cover + Judul + Deskripsi */}
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={book.cover}
                        alt={book.judul}
                        className="rounded-3 border"
                        style={{
                          width: 46,
                          height: 60,
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://via.placeholder.com/46x60?text=Book";
                        }}
                      />
                      <div>
                        <p className="mb-0 fw-semibold text-dark" style={{ fontSize: 14 }}>
                          {book.judul}
                        </p>
                        <p className="mb-0 text-muted" style={{ fontSize: 12 }}>
                          {book.deskripsi.length > 60
                            ? book.deskripsi.slice(0, 60) + "…"
                            : book.deskripsi}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Penulis */}
                  <td className="px-4 py-3 text-muted" style={{ fontSize: 13 }}>
                    <i className="fa-solid fa-user-pen me-1 text-primary opacity-50"></i>
                    {book.penulis}
                  </td>

                  {/* Genre */}
                  <td className="px-4 py-3">
                    <span
                      className="badge rounded-pill px-3 py-2 fw-normal"
                      style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: 12 }}
                    >
                      {book.genre}
                    </span>
                  </td>

                  {/* Tahun Terbit */}
                  <td className="px-4 py-3 text-center text-muted" style={{ fontSize: 13 }}>
                    {book.tahunTerbit}
                  </td>

                  {/* Rating */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className="badge rounded-pill px-3 py-2 fw-semibold"
                      style={{
                        background: book.rating >= 4.8 ? "#fef9c3" : "#fff7ed",
                        color: book.rating >= 4.8 ? "#854d0e" : "#9a3412",
                        fontSize: 13,
                      }}
                    >
                      <i className="fa-solid fa-star me-1"></i>
                      {book.rating.toFixed(1)}
                    </span>
                  </td>

                  {/* Harga */}
                  <td className="px-4 py-3 text-end fw-semibold" style={{ fontSize: 13, color: "#1d4ed8" }}>
                    {book.harga}
                  </td>

                  {/* Stok */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className="badge rounded-pill px-3 py-2 fw-semibold"
                      style={{
                        background: book.stok > 30 ? "#dcfce7" : "#fee2e2",
                        color: book.stok > 30 ? "#15803d" : "#b91c1c",
                        fontSize: 13,
                      }}
                    >
                      {book.stok}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Table Footer */}
            <tfoot>
              <tr style={{ background: "#eff6ff" }}>
                <td colSpan={7} className="px-4 py-3 fw-semibold text-dark text-end">
                  Total Stok Semua Buku:
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className="badge rounded-pill px-3 py-2 fw-bold"
                    style={{ background: "#1d4ed8", color: "#fff", fontSize: 13 }}
                  >
                    {totalStok}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── MVC Label ────────────────────────────────────── */}
      <div className="mt-3 text-center">
        <small className="text-muted">
          <i className="fa-solid fa-circle-info me-1"></i>
          Data ditampilkan dari <strong>BookModel</strong> melalui{" "}
          <strong>BookController</strong> → <strong>BookView</strong>
        </small>
      </div>
    </section>
  );
}
