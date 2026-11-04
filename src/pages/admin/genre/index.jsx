import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  getStoredGenres,
  fetchGenres,
  createGenre,
  resetGenresToDefault,
} from "../../../services/genreService";

// Preset pilihan ikon FontAwesome untuk mempermudah admin
const PRESET_ICONS = [
  { icon: "fa-rocket", label: "Sci-Fi / Rocket" },
  { icon: "fa-heart", label: "Romansa / Heart" },
  { icon: "fa-wand-magic-sparkles", label: "Fantasi / Magic" },
  { icon: "fa-magnifying-glass", label: "Misteri / Search" },
  { icon: "fa-landmark", label: "Sejarah / Landmark" },
  { icon: "fa-book-open", label: "Edukasi / Book" },
  { icon: "fa-brain", label: "Psikologi / Brain" },
  { icon: "fa-masks-theater", label: "Drama / Theater" },
  { icon: "fa-briefcase", label: "Bisnis / Briefcase" },
  { icon: "fa-skull", label: "Horor / Skull" },
];

// Preset pilihan warna tema
const PRESET_COLORS = [
  "#6366f1", // Indigo
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#10b981", // Emerald
  "#f43f5e", // Rose
  "#06b6d4", // Cyan
  "#2563eb", // Blue
  "#0d9488", // Teal
  "#475569", // Slate
];

export default function AdminGenrePage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id-desc"); // id-desc, id-asc, name-asc, books-desc
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'cards'
  const [showModal, setShowModal] = useState(false);
  const [alertInfo, setAlertInfo] = useState(null); // { type: 'success'|'danger', text: '' }
  const [searchParams, setSearchParams] = useSearchParams();

  // Form State untuk Tambah Genre (Create)
  const initialForm = {
    nama: "",
    deskripsi: "",
    icon: "fa-rocket",
    warna: "#6366f1",
    jumlahBuku: 0,
  };
  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ambil data genre saat komponen di-mount
  useEffect(() => {
    loadData();

    // Listener custom event jika data genre berubah di tab lain atau modul lain
    const handleGenreChange = (e) => {
      if (e.detail) setGenres(e.detail);
      else setGenres(getStoredGenres());
    };
    window.addEventListener("bookstore_genres_changed", handleGenreChange);

    return () => {
      window.removeEventListener("bookstore_genres_changed", handleGenreChange);
    };
  }, []);

  // Periksa apakah ada parameter ?action=create di URL
  useEffect(() => {
    if (searchParams.get("action") === "create") {
      setShowModal(true);
      // Hapus query param setelah dibuka
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchGenres();
      setGenres(result.data || []);
    } catch {
      setGenres(getStoredGenres());
    } finally {
      setLoading(false);
    }
  };

  // Validasi Input Form
  const validateForm = () => {
    const errors = {};
    if (!formData.nama.trim()) {
      errors.nama = "Nama genre tidak boleh kosong";
    } else if (formData.nama.trim().length < 2) {
      errors.nama = "Nama genre minimal 2 karakter";
    }

    if (!formData.deskripsi.trim()) {
      errors.deskripsi = "Deskripsi genre tidak boleh kosong";
    } else if (formData.deskripsi.trim().length < 5) {
      errors.deskripsi = "Deskripsi minimal 5 karakter";
    }

    if (formData.jumlahBuku < 0) {
      errors.jumlahBuku = "Jumlah buku tidak boleh negatif";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit Form Tambah Genre (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const created = await createGenre(formData);
      setGenres((prev) => [created, ...prev]);
      setShowModal(false);
      setFormData(initialForm);
      setFormErrors({});

      setAlertInfo({
        type: "success",
        text: `Genre "${created.nama}" berhasil ditambahkan ke daftar!`,
      });

      // Auto dismiss alert setelah 4 detik
      setTimeout(() => {
        setAlertInfo(null);
      }, 4000);
    } catch {
      setAlertInfo({
        type: "danger",
        text: "Terjadi kesalahan saat menyimpan genre.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler Reset Data ke Awal
  const handleResetData = () => {
    if (window.confirm("Kembalikan data genre ke bawaan awal?")) {
      const reset = resetGenresToDefault();
      setGenres(reset);
      setAlertInfo({
        type: "info",
        text: "Data genre berhasil di-reset ke data bawaan awal.",
      });
      setTimeout(() => setAlertInfo(null), 3000);
    }
  };

  // Filter & Urutkan Data
  const filteredGenres = genres
    .filter((g) => {
      const query = searchTerm.toLowerCase();
      return (
        g.nama.toLowerCase().includes(query) ||
        (g.deskripsi && g.deskripsi.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === "id-desc") return (b.id || 0) - (a.id || 0);
      if (sortBy === "id-asc") return (a.id || 0) - (b.id || 0);
      if (sortBy === "name-asc") return a.nama.localeCompare(b.nama);
      if (sortBy === "books-desc") return (b.jumlahBuku || 0) - (a.jumlahBuku || 0);
      return 0;
    });

  // Statistik Agregat
  const totalGenre = genres.length;
  const totalBuku = genres.reduce((acc, g) => acc + (Number(g.jumlahBuku) || 0), 0);
  const avgBuku = totalGenre > 0 ? Math.round(totalBuku / totalGenre) : 0;

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
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              }}
            >
              <i className="fa-solid fa-layer-group fs-6"></i>
            </span>
            <span>Data Genre Buku</span>
          </h3>
          <p className="text-muted small mb-0">
            Kelola data kategori genre buku (fitur Read dan Create) pada panel admin
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
            <i className="fa-solid fa-plus-circle"></i>
            <span>Tambah Genre Baru</span>
          </button>
        </div>
      </div>

      {/* ── Summary Stats Cards ─────────────────────────────── */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-3 d-flex align-items-center gap-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4 text-primary"
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(99, 102, 241, 0.12)",
                }}
              >
                <i className="fa-solid fa-layer-group fs-4"></i>
              </span>
              <div>
                <div className="text-muted small fw-medium">Total Genre</div>
                <h4 className="fw-bold mb-0 text-dark">{totalGenre} Kategori</h4>
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
                  background: "rgba(16, 185, 129, 0.12)",
                }}
              >
                <i className="fa-solid fa-book fs-4"></i>
              </span>
              <div>
                <div className="text-muted small fw-medium">Total Buku Tercatat</div>
                <h4 className="fw-bold mb-0 text-dark">{totalBuku} Judul</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-body p-3 d-flex align-items-center gap-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-4 text-warning"
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(245, 158, 11, 0.12)",
                }}
              >
                <i className="fa-solid fa-chart-column fs-4"></i>
              </span>
              <div>
                <div className="text-muted small fw-medium">Rata-rata Koleksi</div>
                <h4 className="fw-bold mb-0 text-dark">{avgBuku} Buku / Genre</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Toolbar: Search, Sort, View Toggle ─────────────── */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white">
        <div className="card-body p-3">
          <div className="row g-2 align-items-center">
            {/* Search Box */}
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  placeholder="Cari berdasarkan nama atau deskripsi genre..."
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

            {/* Sorting Dropdown */}
            <div className="col-7 col-md-4">
              <select
                className="form-select bg-light"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="id-desc">Urutkan: Terbaru Ditambahkan</option>
                <option value="id-asc">Urutkan: ID Terkecil</option>
                <option value="name-asc">Urutkan: Nama Genre (A-Z)</option>
                <option value="books-desc">Urutkan: Jumlah Buku Terbanyak</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="col-5 col-md-3 d-flex justify-content-end">
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
                  title="Tampilan Kartu / Grid"
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
          <p className="text-muted mt-2 small">Memuat data genre...</p>
        </div>
      ) : filteredGenres.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center py-5 bg-white">
          <div className="card-body">
            <i className="fa-solid fa-folder-open text-muted opacity-50 display-4 mb-3"></i>
            <h5 className="fw-bold text-dark">Data Genre Tidak Ditemukan</h5>
            <p className="text-muted small mb-3">
              {searchTerm
                ? `Tidak ada genre yang cocok dengan pencarian "${searchTerm}".`
                : "Belum ada data genre yang tersimpan."}
            </p>
            {searchTerm ? (
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                onClick={() => setSearchTerm("")}
              >
                Reset Pencarian
              </button>
            ) : (
              <button
                className="btn btn-success btn-sm rounded-pill px-3"
                onClick={() => setShowModal(true)}
              >
                <i className="fa-solid fa-plus me-1"></i>
                Tambah Genre Sekarang
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
                  <th className="px-4 py-3" style={{ minWidth: "220px" }}>
                    Nama Genre
                  </th>
                  <th className="px-4 py-3" style={{ minWidth: "320px" }}>
                    Deskripsi
                  </th>
                  <th className="px-4 py-3 text-center" style={{ width: "140px" }}>
                    Warna Tema
                  </th>
                  <th className="px-4 py-3 text-center" style={{ width: "130px" }}>
                    Jumlah Buku
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGenres.map((genre, idx) => (
                  <tr key={genre.id || idx} className="border-bottom">
                    {/* ID */}
                    <td className="px-4 py-3">
                      <span className="badge bg-light text-secondary border fw-semibold">
                        #{genre.id}
                      </span>
                    </td>

                    {/* Nama & Icon */}
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-3 shadow-sm text-white"
                          style={{
                            width: "42px",
                            height: "42px",
                            backgroundColor: genre.warna || "#6366f1",
                            flexShrink: 0,
                          }}
                        >
                          <i className={`fa-solid ${genre.icon || "fa-book"} fs-5`}></i>
                        </span>
                        <div>
                          <div className="fw-bold text-dark">{genre.nama}</div>
                          <span
                            className="text-muted d-inline-flex align-items-center gap-1"
                            style={{ fontSize: "11px" }}
                          >
                            <i className="fa-solid fa-tag"></i>
                            {genre.icon || "fa-book"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Deskripsi */}
                    <td className="px-4 py-3 text-secondary" style={{ fontSize: "13px" }}>
                      {genre.deskripsi}
                    </td>

                    {/* Warna Preview */}
                    <td className="px-4 py-3 text-center">
                      <div className="d-inline-flex align-items-center gap-2 px-2 py-1 bg-light rounded-pill border">
                        <span
                          className="rounded-circle border"
                          style={{
                            width: "16px",
                            height: "16px",
                            backgroundColor: genre.warna || "#6366f1",
                          }}
                        ></span>
                        <code
                          className="text-dark fw-semibold"
                          style={{ fontSize: "11px" }}
                        >
                          {genre.warna || "#6366f1"}
                        </code>
                      </div>
                    </td>

                    {/* Jumlah Buku */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className="badge rounded-pill px-3 py-2 fw-bold"
                        style={{
                          backgroundColor: `${genre.warna || "#6366f1"}20`,
                          color: genre.warna || "#6366f1",
                          fontSize: "13px",
                        }}
                      >
                        <i className="fa-solid fa-book me-1"></i>
                        {genre.jumlahBuku || 0}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-light border-0 py-3 px-4 d-flex justify-content-between align-items-center small text-muted">
            <span>
              Menampilkan <strong>{filteredGenres.length}</strong> dari{" "}
              <strong>{totalGenre}</strong> genre
            </span>
            <span>
              Total Keseluruhan: <strong>{totalBuku}</strong> buku
            </span>
          </div>
        </div>
      ) : (
        /* ── CARDS / GRID VIEW ──────────────────────────────── */
        <div className="row g-3 mb-4">
          {filteredGenres.map((genre) => (
            <div className="col-12 col-md-6 col-xl-4" key={genre.id}>
              <div
                className="card border-0 shadow-sm rounded-4 h-100 bg-white position-relative overflow-hidden"
                style={{
                  borderTop: `4px solid ${genre.warna || "#6366f1"}`,
                }}
              >
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-3 shadow-sm text-white"
                      style={{
                        width: "46px",
                        height: "46px",
                        backgroundColor: genre.warna || "#6366f1",
                      }}
                    >
                      <i className={`fa-solid ${genre.icon || "fa-book"} fs-5`}></i>
                    </span>
                    <span className="badge bg-light text-secondary border">
                      ID #{genre.id}
                    </span>
                  </div>

                  <h5 className="fw-bold text-dark mb-2">{genre.nama}</h5>
                  <p className="text-muted small flex-grow-1 mb-3">
                    {genre.deskripsi}
                  </p>

                  <div className="pt-3 border-top d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-1 small text-muted">
                      <span
                        className="rounded-circle"
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: genre.warna,
                        }}
                      ></span>
                      <code>{genre.warna}</code>
                    </div>
                    <span
                      className="badge rounded-pill px-3 py-2 fw-bold"
                      style={{
                        backgroundColor: `${genre.warna || "#6366f1"}20`,
                        color: genre.warna || "#6366f1",
                      }}
                    >
                      <i className="fa-solid fa-book me-1"></i>
                      {genre.jumlahBuku || 0} Buku
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL CREATE DATA GENRE ─────────────────────────── */}
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
                    background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span
                      className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-success shadow-sm"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </span>
                    <div>
                      <h5 className="modal-title fw-bold mb-0">Tambah Data Genre Baru</h5>
                      <small className="text-white-50">
                        Input data genre buku baru ke sistem Bookstore
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
                      {/* Nama Genre */}
                      <div className="col-12 col-md-8">
                        <label className="form-label fw-semibold text-dark small">
                          Nama Genre <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="fa-solid fa-layer-group text-muted"></i>
                          </span>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.nama ? "is-invalid" : ""
                            }`}
                            placeholder="Contoh: Petualangan, Filosofi, dll"
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

                      {/* Jumlah Buku Awal */}
                      <div className="col-12 col-md-4">
                        <label className="form-label fw-semibold text-dark small">
                          Jumlah Koleksi Buku
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">
                            <i className="fa-solid fa-book text-muted"></i>
                          </span>
                          <input
                            type="number"
                            min="0"
                            className={`form-control ${
                              formErrors.jumlahBuku ? "is-invalid" : ""
                            }`}
                            placeholder="0"
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

                      {/* Deskripsi */}
                      <div className="col-12">
                        <label className="form-label fw-semibold text-dark small">
                          Deskripsi Genre <span className="text-danger">*</span>
                        </label>
                        <textarea
                          rows="3"
                          className={`form-control ${
                            formErrors.deskripsi ? "is-invalid" : ""
                          }`}
                          placeholder="Jelaskan karakteristik, tema, atau cakupan dari genre ini..."
                          value={formData.deskripsi}
                          onChange={(e) =>
                            setFormData({ ...formData, deskripsi: e.target.value })
                          }
                        ></textarea>
                        {formErrors.deskripsi && (
                          <div className="invalid-feedback d-block">
                            {formErrors.deskripsi}
                          </div>
                        )}
                      </div>

                      {/* Pilihan Warna Tema */}
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-dark small d-flex justify-content-between">
                          <span>Warna Aksen Genre</span>
                          <code className="text-muted">{formData.warna}</code>
                        </label>
                        <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
                          {PRESET_COLORS.map((clr) => (
                            <button
                              key={clr}
                              type="button"
                              className="rounded-circle border-0 p-0 position-relative"
                              style={{
                                width: "28px",
                                height: "28px",
                                backgroundColor: clr,
                                outline:
                                  formData.warna === clr
                                    ? "3px solid #16a34a"
                                    : "none",
                                outlineOffset: "2px",
                              }}
                              onClick={() => setFormData({ ...formData, warna: clr })}
                              title={clr}
                            >
                              {formData.warna === clr && (
                                <i
                                  className="fa-solid fa-check text-white position-absolute top-50 start-50 translate-middle"
                                  style={{ fontSize: "10px" }}
                                ></i>
                              )}
                            </button>
                          ))}
                          {/* Color Picker Native */}
                          <input
                            type="color"
                            className="form-control form-control-color border p-0 rounded-circle"
                            style={{ width: "28px", height: "28px" }}
                            value={formData.warna}
                            onChange={(e) =>
                              setFormData({ ...formData, warna: e.target.value })
                            }
                            title="Pilih warna kustom"
                          />
                        </div>
                      </div>

                      {/* Pilihan Ikon FontAwesome */}
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold text-dark small">
                          Pilihan Ikon Genre
                        </label>
                        <div className="d-flex align-items-center gap-1 flex-wrap">
                          {PRESET_ICONS.map((item) => (
                            <button
                              key={item.icon}
                              type="button"
                              className={`btn btn-sm ${
                                formData.icon === item.icon
                                  ? "btn-success"
                                  : "btn-outline-secondary bg-white"
                              } rounded-3 p-1 px-2`}
                              style={{ fontSize: "13px" }}
                              onClick={() =>
                                setFormData({ ...formData, icon: item.icon })
                              }
                              title={item.label}
                            >
                              <i className={`fa-solid ${item.icon}`}></i>
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm mt-2 bg-white"
                          placeholder="Atau ketik nama class ikon (misal: fa-ghost)"
                          value={formData.icon}
                          onChange={(e) =>
                            setFormData({ ...formData, icon: e.target.value })
                          }
                        />
                      </div>

                      {/* Live Preview Box */}
                      <div className="col-12">
                        <label className="form-label fw-semibold text-muted small">
                          <i className="fa-solid fa-eye me-1"></i>
                          Pratinjau Tampilan (Live Preview)
                        </label>
                        <div className="p-3 bg-white rounded-3 border d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <span
                              className="d-inline-flex align-items-center justify-content-center rounded-3 shadow-sm text-white"
                              style={{
                                width: "42px",
                                height: "42px",
                                backgroundColor: formData.warna || "#6366f1",
                              }}
                            >
                              <i
                                className={`fa-solid ${
                                  formData.icon || "fa-book"
                                } fs-5`}
                              ></i>
                            </span>
                            <div>
                              <div className="fw-bold text-dark">
                                {formData.nama.trim() || "Nama Genre Contoh"}
                              </div>
                              <small className="text-muted">
                                {formData.deskripsi.trim() ||
                                  "Deskripsi ringkas genre akan muncul di sini..."}
                              </small>
                            </div>
                          </div>
                          <span
                            className="badge rounded-pill px-3 py-2 fw-bold"
                            style={{
                              backgroundColor: `${formData.warna || "#6366f1"}20`,
                              color: formData.warna || "#6366f1",
                            }}
                          >
                            <i className="fa-solid fa-book me-1"></i>
                            {formData.jumlahBuku || 0} Buku
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
                          <span>Simpan Genre</span>
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
