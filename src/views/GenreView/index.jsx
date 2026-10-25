/**
 * ============================================================
 * VIEW: GenreView
 * ============================================================
 * Menerima data genres dari GenreController melalui props,
 * lalu menampilkannya sebagai tabel HTML yang terformat rapi.
 * ============================================================
 */

export default function GenreView({ genres, totalBuku }) {
  return (
    <section className="py-4">
      {/* ── Page Header ───────────────────────────────────── */}
      <div
        className="rounded-4 mb-4 p-4 text-white"
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          boxShadow: "0 8px 32px rgba(79, 70, 229, 0.35)",
        }}
      >
        <div className="d-flex align-items-center gap-3 mb-2">
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-3 bg-white"
            style={{ width: 52, height: 52 }}
          >
            <i className="fa-solid fa-layer-group fs-4" style={{ color: "#4f46e5" }}></i>
          </span>
          <div>
            <h1 className="mb-0 fw-bold fs-3">Daftar Genre Buku</h1>
            <p className="mb-0 opacity-75 small">Katalog kategori genre buku yang tersedia</p>
          </div>
        </div>

        {/* Stat Badges */}
        <div className="d-flex gap-3 mt-3 flex-wrap">
          <span className="badge rounded-pill px-3 py-2 fs-6 fw-normal" style={{ background: "rgba(255,255,255,0.2)" }}>
            <i className="fa-solid fa-list me-2"></i>
            {genres.length} Genre
          </span>
          <span className="badge rounded-pill px-3 py-2 fs-6 fw-normal" style={{ background: "rgba(255,255,255,0.2)" }}>
            <i className="fa-solid fa-book me-2"></i>
            {totalBuku} Total Buku
          </span>
        </div>
      </div>

      {/* ── Tabel Data Genre ─────────────────────────────── */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr style={{ background: "linear-gradient(90deg, #f8fafc, #f1f5f9)" }}>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13, width: 60 }}>
                  #
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-layer-group me-2 text-indigo-500"></i>Nama Genre
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-align-left me-2"></i>Deskripsi
                </th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-book me-2"></i>Jml Buku
                </th>
              </tr>
            </thead>
            <tbody>
              {genres.map((genre, index) => (
                <tr
                  key={genre.id}
                  className="border-top"
                  style={{ transition: "background 0.15s" }}
                >
                  {/* Nomor Urut */}
                  <td className="px-4 py-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-white"
                      style={{
                        width: 30,
                        height: 30,
                        fontSize: 12,
                        background: genre.warna,
                      }}
                    >
                      {index + 1}
                    </span>
                  </td>

                  {/* Nama Genre dengan Icon */}
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-3"
                        style={{
                          width: 44,
                          height: 44,
                          background: `${genre.warna}1a`,
                          flexShrink: 0,
                        }}
                      >
                        <i
                          className={`fa-solid ${genre.icon} fs-5`}
                          style={{ color: genre.warna }}
                        ></i>
                      </span>
                      <span className="fw-semibold text-dark">{genre.nama}</span>
                    </div>
                  </td>

                  {/* Deskripsi */}
                  <td className="px-4 py-3 text-muted" style={{ fontSize: 14, maxWidth: 360 }}>
                    {genre.deskripsi}
                  </td>

                  {/* Jumlah Buku */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className="badge rounded-pill px-3 py-2 fw-semibold"
                      style={{
                        background: `${genre.warna}1a`,
                        color: genre.warna,
                        fontSize: 13,
                      }}
                    >
                      {genre.jumlahBuku}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Table Footer */}
            <tfoot>
              <tr style={{ background: "#f8fafc" }}>
                <td colSpan={3} className="px-4 py-3 fw-semibold text-dark text-end">
                  Total Keseluruhan Buku:
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className="badge rounded-pill px-3 py-2 fw-bold"
                    style={{ background: "#4f46e5", color: "#fff", fontSize: 13 }}
                  >
                    {totalBuku}
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
          Data ditampilkan dari <strong>GenreModel</strong> melalui <strong>GenreController</strong> →{" "}
          <strong>GenreView</strong>
        </small>
      </div>
    </section>
  );
}
