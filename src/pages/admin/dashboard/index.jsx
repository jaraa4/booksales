import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getStoredGenres, fetchGenres } from "../../../services/genreService";
import { getStoredAuthors, fetchAuthors } from "../../../services/authorService";

export default function AdminDashboardPage() {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [genreRes, authorRes] = await Promise.all([
          fetchGenres(),
          fetchAuthors(),
        ]);
        setGenres(genreRes.data || getStoredGenres());
        setAuthors(authorRes.data || getStoredAuthors());
      } catch {
        setGenres(getStoredGenres());
        setAuthors(getStoredAuthors());
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const totalGenres = genres.length;
  const totalAuthors = authors.length;
  const totalBooksInGenres = genres.reduce((acc, g) => acc + (Number(g.jumlahBuku) || 0), 0);
  const totalBooksInAuthors = authors.reduce((acc, a) => acc + (Number(a.jumlahBuku) || 0), 0);

  return (
    <div>
      {/* ── Welcome Banner ──────────────────────────────────── */}
      <div
        className="rounded-4 p-4 p-md-5 text-white mb-4 position-relative overflow-hidden shadow-sm"
        style={{
          background: "linear-gradient(135deg, #15803d 0%, #166534 50%, #064e3b 100%)",
        }}
      >
        <div className="position-relative" style={{ zIndex: 1, maxWidth: "680px" }}>
          <span
            className="badge rounded-pill px-3 py-2 fw-semibold mb-3"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(4px)" }}
          >
            <i className="fa-solid fa-sparkles me-1 text-warning"></i>
            Panel Administrator Bookstore
          </span>
          <h2 className="fw-bold mb-2">Selamat Datang di Admin Panel!</h2>
          <p className="lead mb-4 text-white-50" style={{ fontSize: "16px" }}>
            Kelola data katalog toko buku Anda dengan mudah. Anda dapat melihat (Read)
            dan menambahkan (Create) data kategori genre serta profil author/penulis buku.
          </p>
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link
              to="/admin/genre?action=create"
              className="btn btn-light rounded-pill px-4 py-2 fw-bold text-success shadow-sm d-inline-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-plus-circle"></i>
              <span>Tambah Genre</span>
            </Link>
            <Link
              to="/admin/author?action=create"
              className="btn btn-outline-light rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-user-plus"></i>
              <span>Tambah Author</span>
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div
          className="position-absolute end-0 bottom-0 opacity-10"
          style={{
            transform: "translate(15%, 25%)",
            pointerEvents: "none",
          }}
        >
          <i className="fa-solid fa-book-bookmark" style={{ fontSize: "280px" }}></i>
        </div>
      </div>

      {/* ── Key Metrics Cards ───────────────────────────────── */}
      <div className="row g-3 mb-4">
        {/* Card 1: Total Genre */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-medium d-block mb-1">
                  Total Genre Buku
                </span>
                <h3 className="fw-bold mb-1 text-dark">
                  {loading ? "..." : totalGenres}
                </h3>
                <Link
                  to="/admin/genre"
                  className="small text-decoration-none fw-semibold text-primary d-inline-flex align-items-center gap-1"
                >
                  <span>Kelola Genre</span>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: "11px" }}></i>
                </Link>
              </div>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "rgba(99, 102, 241, 0.12)",
                  color: "#6366f1",
                }}
              >
                <i className="fa-solid fa-layer-group fs-4"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Author */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-medium d-block mb-1">
                  Total Author Terdaftar
                </span>
                <h3 className="fw-bold mb-1 text-dark">
                  {loading ? "..." : totalAuthors}
                </h3>
                <Link
                  to="/admin/author"
                  className="small text-decoration-none fw-semibold text-teal d-inline-flex align-items-center gap-1"
                  style={{ color: "#0d9488" }}
                >
                  <span>Kelola Author</span>
                  <i className="fa-solid fa-arrow-right" style={{ fontSize: "11px" }}></i>
                </Link>
              </div>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "rgba(13, 148, 136, 0.12)",
                  color: "#0d9488",
                }}
              >
                <i className="fa-solid fa-feather-pointed fs-4"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Buku Koleksi */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-medium d-block mb-1">
                  Total Koleksi Buku
                </span>
                <h3 className="fw-bold mb-1 text-dark">
                  {loading ? "..." : totalBooksInGenres}
                </h3>
                <span className="small text-muted d-inline-block">
                  Tercatat dalam {totalGenres} genre
                </span>
              </div>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "rgba(22, 163, 74, 0.12)",
                  color: "#16a34a",
                }}
              >
                <i className="fa-solid fa-book fs-4"></i>
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Total Karya Penulis */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-muted small fw-medium d-block mb-1">
                  Total Karya Penulis
                </span>
                <h3 className="fw-bold mb-1 text-dark">
                  {loading ? "..." : totalBooksInAuthors}
                </h3>
                <span className="small text-muted d-inline-block">
                  Dari {totalAuthors} penulis aktif
                </span>
              </div>
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "rgba(245, 158, 11, 0.12)",
                  color: "#f59e0b",
                }}
              >
                <i className="fa-solid fa-award fs-4"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Access & Previews ─────────────────────────── */}
      <div className="row g-4">
        {/* Recent Genres Preview */}
        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
            <div className="card-header bg-white border-0 pt-4 px-4 d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-0">Daftar Genre Buku</h5>
                <small className="text-muted">Kategori buku terkini yang aktif</small>
              </div>
              <Link
                to="/admin/genre"
                className="btn btn-outline-success btn-sm rounded-pill px-3"
              >
                Lihat Semua &rarr;
              </Link>
            </div>
            <div className="card-body px-4 pb-4">
              <div className="d-flex flex-column gap-2 mt-2">
                {genres.slice(0, 5).map((g) => (
                  <div
                    key={g.id}
                    className="p-3 rounded-3 bg-light d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-3 shadow-sm text-white"
                        style={{
                          width: "38px",
                          height: "38px",
                          backgroundColor: g.warna || "#6366f1",
                        }}
                      >
                        <i className={`fa-solid ${g.icon || "fa-book"}`}></i>
                      </span>
                      <div>
                        <div className="fw-bold text-dark">{g.nama}</div>
                        <small className="text-muted text-truncate d-inline-block" style={{ maxWidth: "240px" }}>
                          {g.deskripsi}
                        </small>
                      </div>
                    </div>
                    <span
                      className="badge rounded-pill px-3 py-2 fw-semibold"
                      style={{
                        backgroundColor: `${g.warna || "#6366f1"}20`,
                        color: g.warna || "#6366f1",
                      }}
                    >
                      {g.jumlahBuku || 0} Buku
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Authors Preview */}
        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
            <div className="card-header bg-white border-0 pt-4 px-4 d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-0">Daftar Penulis Buku</h5>
                <small className="text-muted">Profil author dan kontributor buku</small>
              </div>
              <Link
                to="/admin/author"
                className="btn btn-outline-success btn-sm rounded-pill px-3"
              >
                Lihat Semua &rarr;
              </Link>
            </div>
            <div className="card-body px-4 pb-4">
              <div className="d-flex flex-column gap-2 mt-2">
                {authors.slice(0, 5).map((a) => (
                  <div
                    key={a.id}
                    className="p-3 rounded-3 bg-light d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={
                          a.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            a.nama
                          )}&background=0d9488&color=fff`
                        }
                        alt={a.nama}
                        className="rounded-circle border shadow-sm"
                        style={{ width: "38px", height: "38px", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            a.nama
                          )}&background=0d9488&color=fff`;
                        }}
                      />
                      <div>
                        <div className="fw-bold text-dark">{a.nama}</div>
                        <small className="text-muted">
                          <i className="fa-solid fa-location-dot me-1 text-danger"></i>
                          {a.negara} &bull; {a.genre}
                        </small>
                      </div>
                    </div>
                    <span
                      className="badge rounded-pill px-3 py-2 fw-semibold"
                      style={{
                        backgroundColor: "#f0fdf4",
                        color: "#16a34a",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      {a.jumlahBuku || 0} Karya
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
