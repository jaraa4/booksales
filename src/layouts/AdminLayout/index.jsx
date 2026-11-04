import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);
  const location = useLocation();

  // Deteksi ukuran layar untuk responsivitas mobile
  useEffect(() => {
    const checkWidth = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Cek status server API secara berkala
  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/genres", {
          signal: AbortSignal.timeout(1500),
        });
        setApiOnline(res.ok);
      } catch {
        setApiOnline(false);
      }
    };
    checkApi();
    const interval = setInterval(checkApi, 10000);
    return () => clearInterval(interval);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none transition-all fw-medium ${
      isActive
        ? "bg-success text-white shadow-sm"
        : "text-secondary hover-bg-light"
    }`;

  // Judul halaman dinamis berdasarkan rute
  const getPageTitle = () => {
    if (location.pathname.includes("/admin/genre")) return "Manajemen Data Genre";
    if (location.pathname.includes("/admin/author")) return "Manajemen Data Author";
    return "Dashboard Admin";
  };

  return (
    <div className="d-flex min-vh-100 bg-light" style={{ overflowX: "hidden" }}>
      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside
        className={`bg-dark text-white border-end d-flex flex-column transition-all ${
          sidebarOpen ? "d-flex" : isMobile ? "d-none" : "d-none"
        }`}
        style={{
          width: "260px",
          minWidth: "260px",
          zIndex: 1040,
          position: isMobile ? "fixed" : "sticky",
          top: 0,
          bottom: 0,
          height: "100vh",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* Brand Header */}
        <div className="p-3 border-bottom border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
          <Link
            to="/admin"
            className="d-flex align-items-center gap-2 text-white text-decoration-none"
          >
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-3 shadow-sm text-white"
              style={{
                width: "38px",
                height: "38px",
                background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
              }}
            >
              <i className="fa-solid fa-gauge-high fs-5"></i>
            </span>
            <div>
              <div className="fw-bold lh-1 text-white" style={{ fontSize: "16px" }}>
                Bookstore
              </div>
              <span
                className="badge bg-success bg-opacity-25 text-success-emphasis border border-success border-opacity-25 px-1 py-0"
                style={{ fontSize: "10px" }}
              >
                ADMIN PANEL
              </span>
            </div>
          </Link>
          {isMobile && (
            <button
              className="btn btn-sm text-white-50 border-0 p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-xmark fs-5"></i>
            </button>
          )}
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex-grow-1 p-3 overflow-y-auto">
          <div className="text-uppercase text-white-50 fw-semibold mb-2" style={{ fontSize: "11px" }}>
            Menu Utama
          </div>
          <nav className="d-flex flex-column gap-1 mb-4">
            <NavLink to="/admin" end className={navLinkClass}>
              <i className="fa-solid fa-chart-pie" style={{ width: "20px" }}></i>
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/admin/genre" className={navLinkClass}>
              <i className="fa-solid fa-layer-group" style={{ width: "20px" }}></i>
              <span>Kelola Genre</span>
            </NavLink>

            <NavLink to="/admin/author" className={navLinkClass}>
              <i className="fa-solid fa-feather-pointed" style={{ width: "20px" }}></i>
              <span>Kelola Author</span>
            </NavLink>
          </nav>

          <div className="text-uppercase text-white-50 fw-semibold mb-2" style={{ fontSize: "11px" }}>
            Navigasi Toko
          </div>
          <nav className="d-flex flex-column gap-1">
            <Link
              to="/books"
              className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-secondary text-decoration-none"
            >
              <i className="fa-solid fa-book" style={{ width: "20px" }}></i>
              <span>Katalog Buku</span>
            </Link>
            <Link
              to="/"
              className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-secondary text-decoration-none"
            >
              <i className="fa-solid fa-store" style={{ width: "20px" }}></i>
              <span>Halaman Depan</span>
            </Link>
          </nav>
        </div>

        {/* Admin User Footer */}
        <div className="p-3 border-top border-secondary border-opacity-25 bg-black bg-opacity-25">
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center fw-bold"
              style={{ width: "36px", height: "36px", fontSize: "14px" }}
            >
              AD
            </div>
            <div className="flex-grow-1 overflow-hidden">
              <div className="fw-semibold text-truncate small text-white">Administrator</div>
              <div className="text-white-50 text-truncate" style={{ fontSize: "11px" }}>
                admin@bookstore.id
              </div>
            </div>
            <Link
              to="/"
              className="btn btn-outline-light btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
              style={{ width: "30px", height: "30px" }}
              title="Keluar ke Website"
            >
              <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: "12px" }}></i>
            </Link>
          </div>
        </div>
      </aside>

      {/* Backdrop saat sidebar mobile terbuka */}
      {isMobile && sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1030 }}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ── Main Layout Wrapper ────────────────────────────── */}
      <div className="flex-grow-1 d-flex flex-column min-vh-100" style={{ minWidth: 0 }}>
        {/* Top Header Bar */}
        <header className="sticky-top bg-white border-bottom shadow-sm px-3 px-md-4 py-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-outline-secondary btn-sm border-0 rounded-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title="Toggle Menu"
            >
              <i className="fa-solid fa-bars fs-5"></i>
            </button>
            <div>
              <h5 className="mb-0 fw-bold text-dark">{getPageTitle()}</h5>
              <small className="text-muted d-none d-sm-inline">
                Sistem Manajemen Toko Buku Online
              </small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 gap-md-3">
            {/* Status Server API */}
            <span
              className={`badge rounded-pill d-inline-flex align-items-center gap-1 px-2 py-1 ${
                apiOnline
                  ? "bg-success-subtle text-success border border-success"
                  : "bg-warning-subtle text-warning-emphasis border border-warning"
              }`}
              style={{ fontSize: "11px" }}
              title={
                apiOnline
                  ? "Server Express REST API aktif di port 3000"
                  : "Server Express offline, menggunakan penyimpanan Browser (localStorage)"
              }
            >
              <span
                className={`rounded-circle ${apiOnline ? "bg-success" : "bg-warning"}`}
                style={{ width: "7px", height: "7px" }}
              ></span>
              <span className="d-none d-md-inline">
                {apiOnline ? "REST API Aktif" : "Local Mode"}
              </span>
            </span>

            {/* Quick Create Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-success btn-sm dropdown-toggle rounded-pill px-3 fw-semibold shadow-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-plus me-1"></i>
                <span className="d-none d-sm-inline">Tambah Data</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3">
                <li>
                  <Link className="dropdown-item py-2 d-flex align-items-center gap-2" to="/admin/genre?action=create">
                    <i className="fa-solid fa-layer-group text-primary"></i>
                    <span>Tambah Genre Baru</span>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item py-2 d-flex align-items-center gap-2" to="/admin/author?action=create">
                    <i className="fa-solid fa-feather-pointed text-success"></i>
                    <span>Tambah Author Baru</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Button Link to Public Store */}
            <Link
              to="/"
              className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-none d-md-inline-flex align-items-center gap-1"
            >
              <i className="fa-solid fa-globe"></i>
              <span>Ke Toko</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </main>

        {/* Admin Footer */}
        <footer className="bg-white border-top py-3 px-4 text-center text-muted small">
          <div>
            &copy; 2026 <strong>Bookstore Admin</strong>. Tugas React JS Lanjutan #1.
          </div>
        </footer>
      </div>
    </div>
  );
}
