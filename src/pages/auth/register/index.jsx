import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState(null);

  const styles = {
    card: {
      maxWidth: "420px",
      margin: "auto",
      borderRadius: "20px",
    },
    header: {
      textAlign: "center",
      fontSize: "28px",
      color: "#0d6efd",
    },
    input: {
      borderRadius: "10px",
    },
    button: {
      borderRadius: "10px",
      fontWeight: "bold",
      padding: "12px",
    },
    divider: {
      textAlign: "center",
      margin: "18px 0",
      fontWeight: "bold",
      color: "#6c757d",
    },
    socialBtn: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      cursor: "pointer",
      fontWeight: "500",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      transition: "background-color 0.2s, opacity 0.2s",
    },
    google: {
      border: "1px solid #db4437",
      color: "#db4437",
    },
    facebook: {
      border: "1px solid #1877f2",
      color: "#1877f2",
    },
    github: {
      border: "1px solid #333",
      color: "#333",
    },
    text: {
      textAlign: "center",
      marginTop: "16px",
    },
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setFeedback({
        type: "danger",
        text: "Harap lengkapi semua data formulir.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({
        type: "danger",
        text: "Konfirmasi password tidak cocok dengan password.",
      });
      return;
    }

    if (password.length < 6) {
      setFeedback({
        type: "warning",
        text: "Password minimal 6 karakter.",
      });
      return;
    }

    setFeedback({
      type: "success",
      text: `Pendaftaran berhasil untuk ${name}! Mengalihkan ke Login...`,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  const handleSocialRegister = (provider) => {
    setFeedback({
      type: "success",
      text: `Pendaftaran dengan ${provider} berhasil! Mengalihkan ke Login...`,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="modal modal-sheet position-static d-block p-4 py-md-5">
      <div className="modal-dialog" style={styles.card}>
        <div className="modal-content shadow border-0 rounded-4">
          <div className="modal-header border-0 pb-0 justify-content-between align-items-center">
            <Link to="/" className="text-decoration-none text-muted small fw-bold">
              <i className="fa-solid fa-arrow-left me-1"></i> Kembali ke Beranda
            </Link>
          </div>

          <div className="modal-header border-0 pt-2 pb-0">
            <h1 className="fw-bold w-100" style={styles.header}>
              <i className="fa-solid fa-user-plus me-2 text-primary"></i>
              Register
            </h1>
          </div>

          <div className="modal-body p-4 pt-2">
            {feedback && (
              <div
                className={`alert alert-${feedback.type} alert-dismissible fade show my-3`}
                role="alert"
              >
                <i
                  className={`fa-solid ${
                    feedback.type === "success"
                      ? "fa-circle-check"
                      : "fa-triangle-exclamation"
                  } me-2`}
                ></i>
                {feedback.text}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  style={styles.input}
                  placeholder="Nama Lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Nama Lengkap</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  style={styles.input}
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label>Konfirmasi Password</label>
              </div>

              <button
                type="submit"
                className="w-100 btn btn-primary"
                style={styles.button}
              >
                <i className="fa-solid fa-user-check me-2"></i>
                Register
              </button>
            </form>

            <div style={styles.divider}>ATAU</div>

            <button
              type="button"
              style={{ ...styles.socialBtn, ...styles.google }}
              onClick={() => handleSocialRegister("Google")}
            >
              <i className="fa-brands fa-google"></i>
              Register with Google
            </button>

            <button
              type="button"
              style={{ ...styles.socialBtn, ...styles.facebook }}
              onClick={() => handleSocialRegister("Facebook")}
            >
              <i className="fa-brands fa-facebook"></i>
              Register with Facebook
            </button>

            <button
              type="button"
              style={{ ...styles.socialBtn, ...styles.github }}
              onClick={() => handleSocialRegister("GitHub")}
            >
              <i className="fa-brands fa-github"></i>
              Register with GitHub
            </button>

            <p style={styles.text} className="text-secondary">
              Sudah punya akun?{" "}
              <Link to="/login" className="fw-bold text-decoration-none text-primary">
                Login di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}