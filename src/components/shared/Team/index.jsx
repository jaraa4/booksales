import mi from "../../../assets/mi.jpg";
import hikmal from "../../../assets/hikmal.jpg";
import yowa from "../../../assets/yowa.jpg";

export default function Team() {
  const teamMembers = [
    {
      name: "Muhammad Hikmal Akbar",
      role: "SDM of Bookstore",
      image: hikmal,
      bio: "Fokus pada pengembangan sumber daya manusia dan tata kelola tim.",
      fallback:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Zahra Zaskia Aulia Putri",
      role: "Owner of Bookstore",
      image: mi,
      bio: "Inisiator dan pengarah visi toko buku dalam mendukung literasi.",
      fallback:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Yolla Azzahra Syabilla",
      role: "CEO of Bookstore",
      image: yowa,
      bio: "Memimpin strategi operasional dan inovasi layanan pelanggan.",
      fallback:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className="py-5" id="tim">
      <div className="text-center">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-success-subtle text-success rounded-pill mb-2 fw-semibold small">
          <i className="fa-solid fa-users"></i>
          <span>Kenali Tim Kami</span>
        </div>
        <h2 className="fw-bold mb-3 display-6" style={{ color: "#1e293b" }}>
          Tim Bookstore
        </h2>
        <p className="text-muted mb-5 mx-auto" style={{ maxWidth: "600px" }}>
          Tim kami yang berdedikasi penuh untuk membantu Anda menemukan buku-buku terbaik
          dan memberikan pengalaman belanja buku yang menyenangkan.
        </p>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          {teamMembers.map((member, index) => (
            <div className="col" key={index}>
              <div
                className="card h-100 shadow-sm border-0 rounded-4 text-center p-4"
                style={{
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  backgroundColor: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="position-relative d-inline-block mx-auto mt-2 mb-3">
                  <img
                    src={member.image}
                    className="card-img-top img-fluid rounded-circle shadow-sm border border-3 border-success-subtle"
                    alt={member.name}
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = member.fallback;
                    }}
                  />
                  <span
                    className="position-absolute bottom-0 end-0 bg-success text-white rounded-circle p-1 border border-2 border-white"
                    style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    title="Aktif"
                  >
                    <i className="fa-solid fa-check" style={{ fontSize: "11px" }}></i>
                  </span>
                </div>

                <div className="card-body p-0 d-flex flex-column">
                  <h5 className="card-title fw-bold mb-1 text-dark">
                    {member.name}
                  </h5>
                  <span
                    className="badge bg-success-subtle text-success rounded-pill align-self-center px-3 py-1 mb-2 fw-semibold"
                    style={{ fontSize: "12px" }}
                  >
                    {member.role}
                  </span>
                  <p className="text-muted small mb-4 flex-grow-1">
                    {member.bio}
                  </p>

                  <div className="d-flex justify-content-center gap-2 pt-2 border-top">
                    <a
                      href="mailto:contact@bookstore.id"
                      className="btn btn-sm btn-outline-success rounded-circle d-inline-flex align-items-center justify-content-center"
                      title={`Kirim Email ke ${member.name}`}
                      style={{ width: "36px", height: "36px" }}
                    >
                      <i className="fa-solid fa-envelope"></i>
                    </a>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                      title={`LinkedIn ${member.name}`}
                      style={{ width: "36px", height: "36px" }}
                      onClick={() =>
                        alert(`Membuka profil LinkedIn ${member.name}`)
                      }
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-dark rounded-circle d-inline-flex align-items-center justify-content-center"
                      title={`GitHub ${member.name}`}
                      style={{ width: "36px", height: "36px" }}
                      onClick={() =>
                        alert(`Membuka profil GitHub ${member.name}`)
                      }
                    >
                      <i className="fa-brands fa-github"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}