/**
 * ============================================================
 * VIEW: AuthorView
 * ============================================================
 * Menerima data authors dari AuthorController melalui props,
 * lalu menampilkannya sebagai tabel HTML yang terformat rapi.
 * ============================================================
 */

export default function AuthorView({ authors, totalBuku }) {
  return (
    <section className="py-4">
      {/* ── Page Header ───────────────────────────────────── */}
      <div
        className="rounded-4 mb-4 p-4 text-white"
        style={{
          background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
          boxShadow: "0 8px 32px rgba(15, 118, 110, 0.35)",
        }}
      >
        <div className="d-flex align-items-center gap-3 mb-2">
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-3 bg-white"
            style={{ width: 52, height: 52 }}
          >
            <i className="fa-solid fa-feather-pointed fs-4" style={{ color: "#0f766e" }}></i>
          </span>
          <div>
            <h1 className="mb-0 fw-bold fs-3">Daftar Author Buku</h1>
            <p className="mb-0 opacity-75 small">Profil para penulis buku di Bookstore kami</p>
          </div>
        </div>

        {/* Stat Badges */}
        <div className="d-flex gap-3 mt-3 flex-wrap">
          <span className="badge rounded-pill px-3 py-2 fs-6 fw-normal" style={{ background: "rgba(255,255,255,0.2)" }}>
            <i className="fa-solid fa-users me-2"></i>
            {authors.length} Author
          </span>
          <span className="badge rounded-pill px-3 py-2 fs-6 fw-normal" style={{ background: "rgba(255,255,255,0.2)" }}>
            <i className="fa-solid fa-book-open me-2"></i>
            {totalBuku} Total Karya
          </span>
        </div>
      </div>

      {/* ── Tabel Data Author ────────────────────────────── */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr style={{ background: "linear-gradient(90deg, #f0fdf4, #ecfdf5)" }}>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13, width: 60 }}>
                  #
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-user me-2"></i>Nama Author
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-envelope me-2"></i>Email
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-tag me-2"></i>Genre
                </th>
                <th className="px-4 py-3 text-muted fw-semibold" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-globe me-2"></i>Negara
                </th>
                <th className="px-4 py-3 text-muted fw-semibold text-center" style={{ fontSize: 13 }}>
                  <i className="fa-solid fa-book me-2"></i>Karya
                </th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => (
                <tr key={author.id} className="border-top" style={{ transition: "background 0.15s" }}>
                  {/* Nomor */}
                  <td className="px-4 py-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle fw-bold text-white"
                      style={{
                        width: 30,
                        height: 30,
                        fontSize: 12,
                        background: "linear-gradient(135deg, #0f766e, #0d9488)",
                      }}
                    >
                      {index + 1}
                    </span>
                  </td>

                  {/* Avatar + Nama + Bio */}
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={author.avatar}
                        alt={author.nama}
                        className="rounded-circle border border-2"
                        style={{
                          width: 46,
                          height: 46,
                          objectFit: "cover",
                          borderColor: "#0d9488 !important",
                          flexShrink: 0,
                        }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(author.nama) +
                            "&background=0d9488&color=fff";
                        }}
                      />
                      <div>
                        <p className="mb-0 fw-semibold text-dark" style={{ fontSize: 14 }}>
                          {author.nama}
                        </p>
                        <p className="mb-0 text-muted" style={{ fontSize: 12 }}>
                          {author.bioSingkat.length > 55
                            ? author.bioSingkat.slice(0, 55) + "…"
                            : author.bioSingkat}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-muted" style={{ fontSize: 13 }}>
                    {author.email}
                  </td>

                  {/* Genre */}
                  <td className="px-4 py-3">
                    <span
                      className="badge rounded-pill px-3 py-2 fw-normal"
                      style={{ background: "#ccfbf1", color: "#0f766e", fontSize: 12 }}
                    >
                      {author.genre}
                    </span>
                  </td>

                  {/* Negara */}
                  <td className="px-4 py-3 text-muted" style={{ fontSize: 13 }}>
                    <i className="fa-solid fa-location-dot me-1 text-danger"></i>
                    {author.negara}
                  </td>

                  {/* Jumlah Karya */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className="badge rounded-pill px-3 py-2 fw-semibold"
                      style={{ background: "#ccfbf1", color: "#0f766e", fontSize: 13 }}
                    >
                      {author.jumlahBuku}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Table Footer */}
            <tfoot>
              <tr style={{ background: "#f0fdf4" }}>
                <td colSpan={5} className="px-4 py-3 fw-semibold text-dark text-end">
                  Total Karya Seluruh Author:
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className="badge rounded-pill px-3 py-2 fw-bold"
                    style={{ background: "#0f766e", color: "#fff", fontSize: 13 }}
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
          Data ditampilkan dari <strong>AuthorModel</strong> melalui <strong>AuthorController</strong> →{" "}
          <strong>AuthorView</strong>
        </small>
      </div>
    </section>
  );
}
