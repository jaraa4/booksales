import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  getStoredAuthors,
  fetchAuthors,
  createAuthor,
  resetAuthorsToDefault,
} from "../../../services/authorService";
import { getStoredGenres } from "../../../services/genreService";

const COMMON_COUNTRIES = [
  "Indonesia",
  "Jepang",
  "Inggris",
  "Amerika Serikat",
  "Korea Selatan",
  "Jerman",
  "Prancis",
  "Kanada",
];

export default function AdminAuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");
  const [sortBy, setSortBy] = useState("id-desc"); // id-desc, id-asc, name-asc, books-desc
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'cards'
  const [showModal, setShowModal] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Form State untuk Tambah Author (Create)
  const initialForm = {
    nama: "",
    email: "",
    negara: "Indonesia",
    genre: "Fiksi Sastra",
    jumlahBuku: 1,
    avatar: "",
    bioSingkat: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ambil data author & list genre saat di-mount
  useEffect(() => {
    loadData();
    setGenresList(getStoredGenres());

    const handleAuthorChange = (e) => {
      if (e.detail) setAuthors(e.detail);
      else setAuthors(getStoredAuthors());
    };
    window.addEventListener("bookstore_authors_changed", handleAuthorChange);

    return () => {
      window.removeEventListener("bookstore_authors_changed", handleAuthorChange);
    };
  }, []);

  // Periksa apakah ada parameter ?action=create di URL
  useEffect(() => {
    if (searchParams.get("action") === "create") {
      setShowModal(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchAuthors();
      setAuthors(result.data || []);
    } catch {
      setAuthors(getStoredAuthors());
    } finally {
      setLoading(false);
    }
  };

  // Helper untuk generate avatar acak otomatis
  const handleRandomizeAvatar = () => {
    const randomId = Math.floor(Math.random() * 70) + 1;
    const randomAvatarUrl = `https://i.pravatar.cc/150?img=${randomId}`;
    setFormData((prev) => ({ ...prev, avatar: randomAvatarUrl }));
  };

  // Validasi Input Form
  const validateForm = () => {
    const errors = {};
    if (!formData.nama.trim()) {
      errors.nama = "Nama lengkap author wajib diisi";
    } else if (formData.nama.trim().length < 2) {
      errors.nama = "Nama minimal 2 karakter";
    }

    if (!formData.email.trim()) {
      errors.email = "Alamat email wajib diisi";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = "Format email tidak valid (contoh: nama@domain.com)";
      }
    }

    if (!formData.bioSingkat.trim()) {
      errors.bioSingkat = "Biografi singkat wajib diisi";
    } else if (formData.bioSingkat.trim().length < 10) {
      errors.bioSingkat = "Biografi singkat minimal 10 karakter";
    }

    if (formData.jumlahBuku < 0) {
      errors.jumlahBuku = "Jumlah karya buku tidak boleh negatif";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Form Tambah Author (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const created = await createAuthor(formData);
      setAuthors((prev) => [created, ...prev]);
      setShowModal(false);
      setFormData(initialForm);
      setFormErrors({});

      setAlertInfo({
        type: "success",
        text: `Author "${created.nama}" berhasil ditambahkan ke database!`,
      });

      setTimeout(() => {
        setAlertInfo(null);
      }, 4000);
    } catch {
      setAlertInfo({
        type: "danger",
        text: "Terjadi kesalahan saat menyimpan data author.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Data ke Awal
  const handleResetData = () => {
    if (window.confirm("Kembalikan data author ke bawaan awal?")) {
      const reset = resetAuthorsToDefault();
      setAuthors(reset);
      setAlertInfo({
        type: "info",
        text: "Data author berhasil di-reset ke data bawaan awal.",
      });
      setTimeout(() => setAlertInfo(null), 3000);
    }
  };

  // Filter & Urutkan Data
  const filteredAuthors = authors
    .filter((a) => {
      const query = searchTerm.toLowerCase();
      const matchSearch =
        a.nama.toLowerCase().includes(query) ||
        (a.email && a.email.toLowerCase().includes(query)) ||
        (a.negara && a.negara.toLowerCase().includes(query)) ||
        (a.genre && a.genre.toLowerCase().includes(query));

      const matchGenre =
        filterGenre === "all" ||
        (a.genre && a.genre.toLowerCase().includes(filterGenre.toLowerCase()));

      return matchSearch && matchGenre;
    })
    .sort((a, b) => {
      if (sortBy === "id-desc") return (b.id || 0) - (a.id || 0);
      if (sortBy === "id-asc") return (a.id || 0) - (b.id || 0);
      if (sortBy === "name-asc") return a.nama.localeCompare(b.nama);
      if (sortBy === "books-desc") return (b.jumlahBuku || 0) - (a.jumlahBuku || 0);
      return 0;
    });

  // Statistik Agregat
  const totalAuthor = authors.length;
  const totalKarya = authors.reduce((acc, a) => acc + (Number(a.jumlahBuku) || 0), 0);
  const uniqueCountries = new Set(authors.map((a) => a.negara)).size;

  return (
    <div>
      {/* ── Alert Notifikasi ────────────────────────────────── */}
      {alertInfo && (
        <div
          className={`alert alert-${alertInfo.type} alert-dismissible fade show rounded-3 shadow-sm mb-4 d-flex align-items-center gap-2`}
          role="alert"
        >
          <i
            className={`fa-solid ${
              alertInfo.type === "success"
                ? "fa-circle-check fs-5"
                : alertInfo.type === "info"
                ? "fa-circle-info fs-5"
                : "fa-triangle-exclamation fs-5"
            }`}
          ></i>
          <span className="flex-grow-1">{alertInfo.text}</span>
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlertInfo(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* ── Header Halaman & Tombol Action ────────────────── */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-3 text-white"
              style={{
                width: "36px",
                height: "36px",
                background: "linear-gradient(135deg, #0f766e, #0d9488)",
              }}
            >
              <i className="fa-solid fa-feather-pointed fs-6"></i>
            </span>
            <span>Data Author / Penulis</span>
          </h3>
          <p className="text-muted small mb-0">
            Kelola profil penulis buku (fitur Read dan Create) pada panel admin
          </p>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            className="btn btn-outline-secondary btn-sm rounded-pill px-3"
            onClick={handleResetData}
            title="Reset data ke data bawaan awal"
          >
            <i className="fa-solid fa-rotate-left me-1"></i>
            Reset Default
          </button>
          <button
            className="btn btn-success rounded-pill px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
            onClick={() => {
              setFormData(initialForm);
              setFormErrors({});
              setShowModal(true);
            }}
          >
            <i className="fa-solid fa-user-plus"></i>
            <span>Tambah Author Baru</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats Cards ─────────────────────────────── */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-3 d-flex align-items-center gap-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4 text-teal"
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(13, 148, 136, 0.12)",
                  color: "#0d9488",
                }}
              >
                <i className="fa-solid fa-users fs-4"></i>
              </span>
              <div>
                <div className="text-muted small fw-medium">Total Author Terdaftar</div>
                <h4 className="fw-bold mb-0 text-dark">{totalAuthor} Penulis</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-3 d-flex align-items-center gap-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4 text-success"
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(22, 163, 74, 0.12)",
                }}
              >
                <i className="fa-solid fa-book-open fs-4"></i>
              </span>
              <div>
                <div className="text-muted small fw-medium">Total Karya / Buku</div>
                <h4 className="fw-bold mb-0 text-dark">{totalKarya} Judul Buku</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-3 d-flex align-items-center gap-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4 text-primary"
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(37, 99, 235, 0.12)",
                }}
              >
                <i className="fa-solid fa-earth-asia fs-4"></i>
              </span>
              <div>
                <div className="text-muted small fw-medium">Asal Negara Penulis</div>
                <h4 className="fw-bold mb-0 text-dark">{uniqueCountries} Negara</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toolbar: Search, Genre Filter, Sort, View Mode ─── */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
        <div className="card-body p-3">
          <div className="row g-2 align-items-center">
            {/* Search Box */}
            <div className="col-12 col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="Cari nama, email, negara, genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="btn btn-light border"
                    type="button"
                    onClick={() => setSearchTerm("")}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Filter Genre */}
            <div className="col-6 col-md-3">
              <select
                className="form-select bg-light"
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
              >
                <option value="all">Semua Genre</option>
                {genresList.map((g) => (
                  <option key={g.id} value={g.nama}>
                    {g.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* Sorting Dropdown */}
            <div className="col-6 col-md-3">
              <select
                className="form-select bg-light"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id-desc">Urutkan: Terbaru Ditambahkan</option>
                <option value="id-asc">Urutkan: ID Terkecil</option>
                <option value="name-asc">Urutkan: Nama Penulis (A-Z)</option>
                <option value="books-desc">Urutkan: Karya Terbanyak</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="col-12 col-md-2 d-flex justify-content-end">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-sm ${
                    viewMode === "table" ? "btn-success" : "btn-outline-secondary"
                  }`}
                  onClick={() => setViewMode("table")}
                  title="Tampilan Tabel"
                >
                  <i className="fa-solid fa-table-list me-1"></i>
                  Tabel
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${
                    viewMode === "cards" ? "btn-success" : "btn-outline-secondary"
                  }`}
                  onClick={() => setViewMode("cards")}
                  title="Tampilan Kartu"
                >
                  <i className="fa-solid fa-grip me-1"></i>
                  Kartu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Konten READ DATA (Tabel atau Grid) ─────────────── */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading data...</span>
          </div>
          <p className="text-muted mt-2 small">Memuat data author...</p>
        </div>
      ) : filteredAuthors.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center py-5 bg-white">
          <div className="card-body">
            <i className="fa-solid fa-user-slash text-muted opacity-50 display-4 mb-3"></i>
            <h5 className="fw-bold text-dark">Data Author Tidak Ditemukan</h5>
            <p className="text-muted small mb-3">
              {searchTerm || filterGenre !== "all"
                ? "Tidak ada author yang cocok dengan filter / pencarian saat ini."
                : "Belum ada data author yang tersimpan."}
            </p>
            {searchTerm || filterGenre !== "all" ? (
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                onClick={() => {
                  setSearchTerm("");
                  setFilterGenre("all");
                }}
              >
                Reset Filter & Pencarian
              </button>
            ) : (
              <button
                className="btn btn-success btn-sm rounded-pill px-3"
                onClick={() => setShowModal(true)}
              >
                <i className="fa-solid fa-plus me-1"></i>
                Tambah Author Sekarang
              </button>
            )}
          </div>
        </div>
      ) : viewMode === "table" ? (
        /* ── TABLE VIEW ─────────────────────────────────────── */
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="border-bottom text-muted small fw-semibold">
                  <th className="px-4 py-3" style={{ width: "60px" }}>
                    #ID
                  </th>
                  <th className="px-4 py-3" style={{ minWidth: "260px" }}>
                    Author / Penulis
                  </th>
                  <th className="px-4 py-3" style={{ minWidth: "200px" }}>
                    Email
                  </th>
                  <th className="px-4 py-3" style={{ minWidth: "150px" }}>
                    Spesialisasi Genre
                  </th>
                  <th className="px-4 py-3" style={{ minWidth: "140px" }}>
                    Negara Asal
                  </th>
                  <th className="px-4 py-3 text-center" style={{ width: "130px" }}>
                    Jumlah Karya
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthors.map((author, idx) => (
                  <tr key={author.id || idx} className="border-bottom">
                    {/* ID */}
                    <td className="px-4 py-3">
                      <span className="badge bg-light text-secondary border fw-semibold">
                        #{author.id}
                      </span>
                    </td>

                    {/* Avatar + Nama + Bio */}
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={
                            author.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              author.nama
                            )}&background=0d9488&color=fff`
                          }
                          alt={author.nama}
                          className="rounded-circle border shadow-sm"
                          style={{
                            width: "44px",
                            height: "44px",
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              author.nama
                            )}&background=0d9488&color=fff`;
                          }}
                        />
                        <div>
                          <div className="fw-bold text-dark">{author.nama}</div>
                          <div
                            className="text-muted text-truncate"
                            style={{ fontSize: "12px", maxWidth: "280px" }}
                            title={author.bioSingkat}
                          >
                            {author.bioSingkat || "-"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${author.email}`}
                        className="text-decoration-none text-secondary d-inline-flex align-items-center gap-1 small"
                      >
                        <i className="fa-solid fa-envelope text-muted"></i>
                        <span>{author.email}</span>
                      </a>
                    </td>

                    {/* Genre */}
                    <td className="px-4 py-3">
                      <span
                        className="badge rounded-pill px-3 py-2 fw-semibold"
                        style={{
                          backgroundColor: "#ccfbf1",
                          color: "#0f766e",
                          fontSize: "12px",
                        }}
                      >
                        {author.genre}
                      </span>
                    </td>

                    {/* Negara */}
                    <td className="px-4 py-3">
                      <span className="d-inline-flex align-items-center gap-1 text-secondary small">
                        <i className="fa-solid fa-location-dot text-danger"></i>
                        <span>{author.negara}</span>
                      </span>
                    </td>

                    {/* Jumlah Karya Buku */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className="badge rounded-pill px-3 py-2 fw-bold"
                        style={{
                          backgroundColor: "#f0fdf4",
                          color: "#16a34a",
                          border: "1px solid #bbf7d0",
                          fontSize: "13px",
                        }}
                      >
                        <i className="fa-solid fa-book-open me-1"></i>
                        {author.jumlahBuku || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light border-0 py-3 px-4 d-flex justify-content-between align-items-center small text-muted">
            <span>
              Menampilkan <strong>{filteredAuthors.length}</strong> dari{" "}
              <strong>{totalAuthor}</strong> penulis
            </span>
            <span>
              Total Keseluruhan: <strong>{totalKarya}</strong> judul karya
            </span>
          </div>
        </div>
      ) : (
        /* ── CARDS / GRID VIEW ──────────────────────────────── */
        <div className="row g-3 mb-4">
          {filteredAuthors.map((author) => (
            <div className="col-12 col-md-6 col-xl-4" key={author.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <img
                      src={
                        author.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          author.nama
                        )}&background=0d9488&color=fff`
                      }
                      alt={author.nama}
                      className="rounded-circle border shadow-sm"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          author.nama
                        )}&background=0d9488&color=fff`;
                      }}
                    />
                    <span className="badge bg-light text-secondary border">
                      ID #{author.id}
                    </span>
                  </div>

                  <h5 className="fw-bold text-dark mb-1">{author.nama}</h5>
                  <div className="text-muted small mb-2 d-flex align-items-center gap-1">
                    <i className="fa-solid fa-location-dot text-danger"></i>
                    <span>{author.negara}</span> &bull;
                    <span className="text-teal fw-medium">{author.genre}</span>
                  </div>

                  <p
                    className="text-secondary small flex-grow-1 mb-3"
                    style={{ lineHeight: "1.5" }}
                  >
                    {author.bioSingkat}
                  </p>

                  <div className="pt-3 border-top d-flex align-items-center justify-content-between">
                    <a
                      href={`mailto:${author.email}`}
                      className="text-decoration-none text-muted small text-truncate me-2"
                      style={{ maxWidth: "160px" }}
                    >
                      <i className="fa-solid fa-envelope me-1"></i>
                      {author.email}
                    </a>
                    <span
                      className="badge rounded-pill px-3 py-2 fw-bold"
                      style={{
                        backgroundColor: "#f0fdf4",
                        color: "#16a34a",
                        border: "1px solid #bbf7d0",
                      }}
                    >
                      <i className="fa-solid fa-book-open me-1"></i>
                      {author.jumlahBuku || 0} Karya
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL CREATE DATA AUTHOR ────────────────────────── */}
      {showModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.55)", zIndex: 1050 }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                {/* Modal Header */}
                <div
                  className="modal-header text-white p-3 px-4 border-0"
                  style={{
                    background: "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-teal shadow-sm"
                      style={{ width: "32px", height: "32px", color: "#0d9488" }}
                    >
                      <i className="fa-solid fa-user-plus"></i>
                    </span>
                    <div>
                      <h5 className="modal-title fw-bold mb-0">Tambah Data Author Baru</h5>
                      <small className="text-white-50">
                        Input profil dan biografi penulis buku baru
                      </small>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>

                {/* Form Input */}
                <form onSubmit={handleSubmit}>
                  <div className="modal-body p-4 bg-light">
                    <div className="row g-3">
                      {/* Nama Lengkap Author */}
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-dark small">
                          Nama Lengkap Author <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="fa-solid fa-user text-muted"></i>
                          </span>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.nama ? "is-invalid" : ""
                            }`}
                            placeholder="Contoh: Andrea Hirata, Tere Liye..."
                            value={formData.nama}
                            onChange={(e) =>
                              setFormData({ ...formData, nama: e.target.value })
                            }
                          />
                          {formErrors.nama && (
                            <div className="invalid-feedback">{formErrors.nama}</div>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-dark small">
                          Email Resmi Penulis <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="fa-solid fa-envelope text-muted"></i>
                          </span>
                          <input
                            type="email"
                            className={`form-control ${
                              formErrors.email ? "is-invalid" : ""
                            }`}
                            placeholder="penulis@bookstore.id"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                          />
                          {formErrors.email && (
                            <div className="invalid-feedback">{formErrors.email}</div>
                          )}
                        </div>
                      </div>

                      {/* Negara Asal */}
                      <div className="col-12 col-md-4">
                        <label className="form-label fw-semibold text-dark small">
                          Negara Asal
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="fa-solid fa-globe text-muted"></i>
                          </span>
                          <select
                            className="form-select"
                            value={formData.negara}
                            onChange={(e) =>
                              setFormData({ ...formData, negara: e.target.value })
                            }
                          >
                            {COMMON_COUNTRIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Spesialisasi Genre */}
                      <div className="col-12 col-md-4">
                        <label className="form-label fw-semibold text-dark small">
                          Spesialisasi Genre
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="fa-solid fa-tag text-muted"></i>
                          </span>
                          <select
                            className="form-select"
                            value={formData.genre}
                            onChange={(e) =>
                              setFormData({ ...formData, genre: e.target.value })
                            }
                          >
                            <option value="Fiksi Sastra">Fiksi Sastra</option>
                            <option value="Fiksi & Romansa">Fiksi & Romansa</option>
                            <option value="Sejarah & Fiksi">Sejarah & Fiksi</option>
                            <option value="Humor & Komedi">Humor & Komedi</option>
                            <option value="Fiksi Filosofis">Fiksi Filosofis</option>
                            <option value="Misteri & Thriller">Misteri & Thriller</option>
                            <option value="Fantasi">Fantasi</option>
                            <option value="Edukasi & Bisnis">Edukasi & Bisnis</option>
                          </select>
                        </div>
                      </div>

                      {/* Jumlah Karya Buku */}
                      <div className="col-12 col-md-4">
                        <label className="form-label fw-semibold text-dark small">
                          Jumlah Buku Terbit
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="fa-solid fa-book-open text-muted"></i>
                          </span>
                          <input
                            type="number"
                            min="0"
                            className="form-control"
                            value={formData.jumlahBuku}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                jumlahBuku: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {/* URL Avatar + Tombol Acak */}
                      <div className="col-12">
                        <label className="form-label fw-semibold text-dark small d-flex justify-content-between">
                          <span>Foto Profil / Avatar (URL)</span>
                          <button
                            type="button"
                            className="btn btn-link btn-sm p-0 text-decoration-none fw-semibold"
                            onClick={handleRandomizeAvatar}
                            style={{ fontSize: "12px", color: "#0d9488" }}
                          >
                            <i className="fa-solid fa-dice me-1"></i>
                            Pilih Avatar Acak
                          </button>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="fa-solid fa-image text-muted"></i>
                          </span>
                          <input
                            type="url"
                            className="form-control"
                            placeholder="https://i.pravatar.cc/150?img=12 (kosongkan untuk avatar nama otomatis)"
                            value={formData.avatar}
                            onChange={(e) =>
                              setFormData({ ...formData, avatar: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Biografi Singkat */}
                      <div className="col-12">
                        <label className="form-label fw-semibold text-dark small">
                          Biografi Singkat <span className="text-danger">*</span>
                        </label>
                        <textarea
                          rows="3"
                          className={`form-control ${
                            formErrors.bioSingkat ? "is-invalid" : ""
                          }`}
                          placeholder="Tuliskan latar belakang, prestasi, atau karya terkenal dari penulis ini..."
                          value={formData.bioSingkat}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bioSingkat: e.target.value,
                            })
                          }
                        ></textarea>
                        {formErrors.bioSingkat && (
                          <div className="invalid-feedback d-block">
                            {formErrors.bioSingkat}
                          </div>
                        )}
                      </div>

                      {/* Live Preview Box */}
                      <div className="col-12">
                        <label className="form-label fw-semibold text-muted small">
                          <i className="fa-solid fa-eye me-1"></i>
                          Pratinjau Profil Author (Live Preview)
                        </label>
                        <div className="p-3 bg-white rounded-3 border d-flex align-items-center gap-3">
                          <img
                            src={
                              formData.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                formData.nama || "Penulis"
                              )}&background=0d9488&color=fff`
                            }
                            alt="Preview"
                            className="rounded-circle border shadow-sm"
                            style={{
                              width: "48px",
                              height: "48px",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                formData.nama || "Penulis"
                              )}&background=0d9488&color=fff`;
                            }}
                          />
                          <div className="flex-grow-1 overflow-hidden">
                            <div className="fw-bold text-dark text-truncate">
                              {formData.nama.trim() || "Nama Penulis Contoh"}
                            </div>
                            <div className="small text-muted text-truncate">
                              {formData.email || "email@bookstore.id"} &bull;{" "}
                              <span className="badge bg-light text-secondary border">
                                {formData.genre}
                              </span>
                            </div>
                            <div
                              className="small text-secondary text-truncate mt-1"
                              style={{ fontSize: "11px" }}
                            >
                              {formData.bioSingkat.trim() ||
                                "Biografi singkat akan ditampilkan di sini..."}
                            </div>
                          </div>
                          <span
                            className="badge rounded-pill px-3 py-2 fw-bold"
                            style={{
                              backgroundColor: "#f0fdf4",
                              color: "#16a34a",
                              border: "1px solid #bbf7d0",
                            }}
                          >
                            {formData.jumlahBuku || 0} Karya
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="modal-footer bg-white border-top p-3 px-4 d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-pill px-4"
                      onClick={() => setShowModal(false)}
                      disabled={isSubmitting}
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success rounded-pill px-4 fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span>Menyimpan...</span>
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-check"></i>
                          <span>Simpan Author</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
