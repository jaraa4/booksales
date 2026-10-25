import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("bookstore_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const getStoredCartCount = () => {
  try {
    const stored = localStorage.getItem("bookstore_cart");
    if (!stored) return 0;
    const items = JSON.parse(stored);
    return Array.isArray(items)
      ? items.reduce((acc, item) => acc + (item.qty || 1), 0)
      : 0;
  } catch {
    return 0;
  }
};

export default function Header() {
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [cartCount, setCartCount] = useState(getStoredCartCount);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getStoredUser());
    };

    const handleCartChange = () => {
      setCartCount(getStoredCartCount());
    };

    window.addEventListener("bookstore_auth_change", handleAuthChange);
    window.addEventListener("bookstore_cart_change", handleCartChange);
    window.addEventListener("storage", handleAuthChange);
    window.addEventListener("storage", handleCartChange);

    return () => {
      window.removeEventListener("bookstore_auth_change", handleAuthChange);
      window.removeEventListener("bookstore_cart_change", handleCartChange);
      window.removeEventListener("storage", handleAuthChange);
      window.removeEventListener("storage", handleCartChange);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      localStorage.removeItem("bookstore_user");
      setCurrentUser(null);
      window.dispatchEvent(new Event("bookstore_auth_change"));
    }
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#15803d" : "#475569",
    fontWeight: isActive ? "600" : "500",
    backgroundColor: isActive ? "#dcfce7" : "transparent",
    border: isActive ? "1px solid #86efac" : "1px solid transparent",
    borderRadius: "50px",
    padding: "8px 16px",
    transition: "all 0.2s ease-in-out",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: isActive ? "0 2px 6px rgba(22, 101, 52, 0.12)" : "none",
  });

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm mb-4 py-2">
      <nav className="navbar navbar-expand-lg navbar-light py-2">
        <div className="container-fluid px-0">
          {/* Brand Logo */}
          <Link
            to="/"
            className="navbar-brand d-inline-flex align-items-center me-4 text-decoration-none"
          >
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-3 me-2 shadow-sm text-white"
              style={{
                width: "42px",
                height: "42px",
                background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
              }}
            >
              <i className="fa-solid fa-book-open-reader fs-5"></i>
            </span>
            <div className="d-flex flex-column">
              <span
                className="fs-4 fw-bold lh-1"
                style={{ color: "#15803d", letterSpacing: "-0.5px" }}
              >
                Bookstore
              </span>
              <span className="text-muted" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                Toko Buku Online
              </span>
            </div>
          </Link>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-controls="mainNavbar"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Content */}
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""} justify-content-between`}
            id="mainNavbar"
          >
            {/* Nav Links */}
            <ul className="navbar-nav mx-auto mb-3 mb-lg-0 gap-1 gap-lg-2 py-2 py-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  style={navLinkStyle}
                  className="nav-link"
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="fa-solid fa-house-chimney"></i>
                  <span>Home</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/books"
                  style={navLinkStyle}
                  className="nav-link"
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="fa-solid fa-book"></i>
                  <span>Books</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/team"
                  style={navLinkStyle}
                  className="nav-link"
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="fa-solid fa-users"></i>
                  <span>Team</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  style={navLinkStyle}
                  className="nav-link"
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="fa-solid fa-envelope-open-text"></i>
                  <span>Contact</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/genre"
                  style={navLinkStyle}
                  className="nav-link"
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="fa-solid fa-layer-group"></i>
                  <span>Genre</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/author"
                  style={navLinkStyle}
                  className="nav-link"
                  onClick={() => setIsNavOpen(false)}
                >
                  <i className="fa-solid fa-feather-pointed"></i>
                  <span>Author</span>
                </NavLink>
              </li>
            </ul>

            {/* User Login & Cart Action Area */}
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {/* Cart Button */}
              <Link
                to="/books"
                className="btn btn-outline-success position-relative rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2"
                title="Lihat Keranjang Belanja di Halaman Buku"
                onClick={() => setIsNavOpen(false)}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="d-none d-sm-inline small fw-semibold">Keranjang</span>
                {cartCount > 0 && (
                  <span className="badge rounded-pill bg-danger ms-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Profile or Login/Register */}
              {currentUser ? (
                <div className="d-inline-flex align-items-center gap-2">
                  <div className="d-flex align-items-center bg-light px-2 py-1 rounded-pill border">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="rounded-circle me-2 border border-success"
                      style={{
                        width: "32px",
                        height: "32px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
                      }}
                    />
                    <div className="pe-2 text-start">
                      <span
                        className="text-muted d-block"
                        style={{ fontSize: "10px", lineHeight: "1" }}
                      >
                        Halo,
                      </span>
                      <strong
                        className="text-dark d-inline-block text-truncate"
                        style={{ maxWidth: "100px", fontSize: "12px" }}
                      >
                        {currentUser.name}
                      </strong>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 fw-semibold"
                    title="Keluar dari akun"
                  >
                    <i className="fa-solid fa-right-from-bracket me-1"></i>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="d-inline-flex align-items-center gap-2">
                  <Link
                    to="/login"
                    className="btn btn-outline-success rounded-pill px-3 py-2 fw-semibold"
                    onClick={() => setIsNavOpen(false)}
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket me-1"></i>
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-success rounded-pill px-3 py-2 fw-semibold shadow-sm"
                    onClick={() => setIsNavOpen(false)}
                  >
                    <i className="fa-solid fa-user-plus me-1"></i>
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}