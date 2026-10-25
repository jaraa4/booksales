import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("bookstore_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export default function Hero() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getStoredUser());
    };

    window.addEventListener("bookstore_auth_change", handleAuthChange);
    return () => window.removeEventListener("bookstore_auth_change", handleAuthChange);
  }, []);

  const handleScrollToBooks = () => {
    const el = document.getElementById("daftar-buku");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/books");
    }
  };

  return (
    <>
      <section className="py-4 py-md-5 container">
        <div
          className="row p-4 p-lg-5 align-items-center rounded-4 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #f0fdf4 0%, #e8f7ee 50%, #f5faf6 100%)",
            border: "1px solid #bbf7d0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Decorative Nature Circle */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: "rgba(187, 247, 208, 0.4)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          ></div>

          {/* TEXT CONTENT */}
          <div className="col-lg-7 text-center text-lg-start z-1">
            {/* Tag / Badge Gen Z */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-white border border-success-subtle shadow-sm">
              <span className="badge bg-success rounded-pill px-2 py-1 small">
                <i className="fa-solid fa-seedling me-1"></i> Eco-Vibe
              </span>
              <span className="small text-secondary fw-semibold">
                #BookTok Trending • Slow Living & Mindful Reads 🌿
              </span>
            </div>

            {/* Sapaan Pengguna Login */}
            {currentUser && (
              <div className="alert alert-success d-inline-flex align-items-center mb-3 py-2 px-3 rounded-pill shadow-sm border-0 w-100 w-md-auto">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="rounded-circle me-2 border border-success"
                  style={{ width: "30px", height: "30px", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
                  }}
                />
                <span className="small text-dark">
                  🍃 <strong>Hai {currentUser.name}!</strong> Waktunya me time & recharge bareng buku favoritmu.
                </span>
              </div>
            )}

            {/* Headline Kekinian */}
            <h1
              className="display-5 fw-bolder lh-sm mb-3"
              style={{
                color: "#14532d",
                letterSpacing: "-0.5px",
                fontWeight: 800,
              }}
            >
              Reading is Healing:{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #15803d 0%, #059669 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Recharge Jiwa
              </span>{" "}
              Bareng Alam 🍃✨
            </h1>

            {/* Subheadline Relatable Gen Z */}
            <p
              className="lead text-secondary mb-4"
              style={{ fontSize: "16px", lineHeight: "1.7" }}
            >
              Capek doom-scrolling dan burn-out di sosmed? Yuk rehat sejenak, nikmati momen
              mindful reading bareng ratusan buku terkurasi. Dari fiksi estetik sampai self-growth,
              temukan bacaan yang bikin pikiran adem & energi positifmu mekar kembali. 🌸🪴
            </p>

            {/* Feature Pills */}
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start mb-4">
              <span className="badge bg-white text-success border border-success-subtle py-2 px-3 rounded-pill fw-medium shadow-2xs">
                <i className="fa-solid fa-tree me-1 text-success"></i> 1 Buku = 1 Bibit Pohon
              </span>
              <span className="badge bg-white text-dark border py-2 px-3 rounded-pill fw-medium shadow-2xs">
                <i className="fa-solid fa-mug-hot me-1 text-warning"></i> Cozy Reading Club
              </span>
              <span className="badge bg-white text-dark border py-2 px-3 rounded-pill fw-medium shadow-2xs">
                <i className="fa-solid fa-bolt me-1 text-primary"></i> 15K+ Gen-Z Readers
              </span>
            </div>

            {/* Call to Action Buttons */}
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center justify-content-lg-start">
              <Link
                to="/books"
                className="btn btn-lg px-4 py-3 fw-bold text-white shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #15803d 0%, #16a34a 100%)",
                  borderRadius: "12px",
                  border: "none",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                <i className="fa-solid fa-leaf me-2"></i>
                Mulai Healing Sekarang
              </Link>

              <button
                type="button"
                onClick={handleScrollToBooks}
                className="btn btn-outline-success btn-lg px-4 py-3 fw-bold"
                style={{
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  backdropFilter: "blur(5px)",
                }}
              >
                <i className="fa-solid fa-compass me-2"></i>
                Jelajahi Koleksi Cozy
              </button>
            </div>
          </div>

          {/* IMAGE BANNER WITH NATURE VIBES */}
          <div className="col-lg-5 mt-4 mt-lg-0 text-center position-relative">
            <div
              className="position-relative mx-auto rounded-4 overflow-hidden shadow-lg border border-2 border-white"
              style={{ maxWidth: "420px" }}
            >
              <img
                className="w-100 h-100"
                src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80"
                alt="Mindful Nature Reading"
                style={{
                  objectFit: "cover",
                  maxHeight: "380px",
                  transition: "transform 0.5s ease",
                }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80";
                }}
              />

              {/* Floating Aesthetic Overlay Badge 1 */}
              <div
                className="position-absolute bottom-0 start-0 m-3 p-2 px-3 rounded-3 bg-white bg-opacity-90 shadow-sm border border-success-subtle text-start"
                style={{ backdropFilter: "blur(6px)" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-4">🪴</span>
                  <div>
                    <div className="fw-bold text-dark small">Cozy Book Sanctuary</div>
                    <div className="text-muted" style={{ fontSize: "11px" }}>
                      Suasana membaca tenang & asri
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Aesthetic Overlay Badge 2 */}
              <div
                className="position-absolute top-0 end-0 m-3 py-1 px-3 rounded-pill bg-success text-white shadow-sm fw-bold small"
              >
                <i className="fa-solid fa-star text-warning me-1"></i> 4.9/5 Vibe Rating
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}