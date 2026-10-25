import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center py-5 min-vh-75 text-center">
      <div className="p-4" style={{ maxWidth: "550px" }}>
        <div
          className="d-inline-flex align-items-center justify-content-center bg-danger-subtle text-danger rounded-circle mb-4"
          style={{ width: "90px", height: "90px" }}
        >
          <i className="fa-solid fa-triangle-exclamation fa-3x"></i>
        </div>
        <h1 className="display-4 fw-bold text-dark mb-2">404</h1>
        <h3 className="fw-semibold text-secondary mb-3">Halaman Tidak Ditemukan</h3>
        <p className="text-muted mb-4">
          Maaf, halaman yang Anda cari tidak tersedia atau rute URL yang Anda tuju salah.
          Silakan kembali ke halaman utama untuk melanjutkan eksplorasi buku.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <Link to="/" className="btn btn-success rounded-pill px-4 py-2 shadow-sm">
            <i className="fa-solid fa-house me-2"></i>
            Kembali ke Beranda
          </Link>
          <Link to="/books" className="btn btn-outline-secondary rounded-pill px-4 py-2">
            <i className="fa-solid fa-book me-2"></i>
            Lihat Buku
          </Link>
        </div>
      </div>
    </div>
  );
}
