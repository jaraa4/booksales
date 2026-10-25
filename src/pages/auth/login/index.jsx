import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState(null);

  // State untuk Modal Pilihan Akun Google
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [customGoogleAccount, setCustomGoogleAccount] = useState({
    name: "",
    email: "",
  });
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Daftar Akun Google yang Tersedia
  const googleAccounts = [
    {
      name: "Muhammad Fahmi",
      email: "fahmi.sttnf@gmail.com",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100",
    },
    {
      name: "Zahra",
      email: "zahra.student@gmail.com",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100",
    },
    {
      name: "Budi Santoso",
      email: "budi.santoso@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    },
  ];

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
    // Google Modal Styles
    googleModalBackdrop: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.65)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1060,
      padding: "15px",
    },
    googleModalCard: {
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      width: "100%",
      maxWidth: "440px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      overflow: "hidden",
      border: "1px solid #e0e0e0",
    },
    accountItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      borderBottom: "1px solid #f1f3f4",
      cursor: "pointer",
      transition: "background-color 0.15s ease",
      borderRadius: "8px",
      marginBottom: "4px",
    },
  };

  // Simpan data login dan redirect
  const saveUserAndRedirect = (userObj) => {
    localStorage.setItem("bookstore_user", JSON.stringify(userObj));
    window.dispatchEvent(new Event("bookstore_auth_change"));

    setFeedback({
      type: "success",
      text: `Selamat datang, ${userObj.name}! Login berhasil. Sedang mengalihkan ke Beranda...`,
    });

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  // Handler Login Form Biasa
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFeedback({
        type: "danger",
        text: "Harap masukkan email dan password.",
      });
      return;
    }

    const derivedName = email.split("@")[0];
    const formattedName =
      derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

    const user = {
      name: formattedName,
      email: email,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      provider: "Email",
    };

    saveUserAndRedirect(user);
  };

  // Handler Pilih Akun Google
  const handleSelectGoogleAccount = (account) => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setShowGoogleModal(false);
      saveUserAndRedirect({
        ...account,
        provider: "Google",
      });
    }, 800);
  };

  // Handler Tambah Akun Google Kustom
  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleAccount.name.trim() || !customGoogleAccount.email.trim()) {
      alert("Harap isi nama dan email Google.");
      return;
    }

    handleSelectGoogleAccount({
      name: customGoogleAccount.name.trim(),
      email: customGoogleAccount.email.trim(),
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
    });
  };

  const handleSocialLogin = (provider) => {
    if (provider === "Google") {
      setShowGoogleModal(true);
      return;
    }

    const user = {
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      provider: provider,
    };

    saveUserAndRedirect(user);
  };

  return (
    <>
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
                <i className="fa-solid fa-book-open me-2 text-primary"></i>
                Login
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

              <form onSubmit={handleLogin}>
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

                <button
                  type="submit"
                  className="w-100 btn btn-primary"
                  style={styles.button}
                >
                  <i className="fa-solid fa-right-to-bracket me-2"></i>
                  Login
                </button>
              </form>

              <div style={styles.divider}>ATAU</div>

              {/* TOMBOL LOGIN WITH GOOGLE (MEMBUKA MODAL PILIH AKUN) */}
              <button
                type="button"
                style={{ ...styles.socialBtn, ...styles.google }}
                onClick={() => setShowGoogleModal(true)}
              >
                <i className="fa-brands fa-google"></i>
                Login with Google
              </button>

              <button
                type="button"
                style={{ ...styles.socialBtn, ...styles.facebook }}
                onClick={() => handleSocialLogin("Facebook")}
              >
                <i className="fa-brands fa-facebook"></i>
                Login with Facebook
              </button>

              <button
                type="button"
                style={{ ...styles.socialBtn, ...styles.github }}
                onClick={() => handleSocialLogin("GitHub")}
              >
                <i className="fa-brands fa-github"></i>
                Login with GitHub
              </button>

              <p style={styles.text} className="text-secondary">
                Belum punya akun?{" "}
                <Link to="/register" className="fw-bold text-decoration-none text-primary">
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== GOOGLE ACCOUNT CHOOSER MODAL ===== */}
      {showGoogleModal && (
        <div
          style={styles.googleModalBackdrop}
          onClick={() => !googleLoading && setShowGoogleModal(false)}
        >
          <div
            style={styles.googleModalCard}
            onClick={(e) => e.stopPropagation()}
            className="p-4"
          >
            {/* Header Google Modal */}
            <div className="text-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 0 24 24"
                width="32"
                className="mb-2"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <h5 className="fw-bold mb-1">Pilih Akun Google</h5>
              <p className="text-muted small mb-0">
                untuk melanjutkan ke <strong>Bookstore</strong>
              </p>
            </div>

            {googleLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="fw-bold text-secondary mb-0">
                  Menghubungkan akun Google...
                </p>
              </div>
            ) : (
              <>
                {/* List Akun */}
                <div className="my-3">
                  {googleAccounts.map((acc, index) => (
                    <div
                      key={index}
                      style={styles.accountItem}
                      className="hover-bg-light border"
                      onClick={() => handleSelectGoogleAccount(acc)}
                    >
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="rounded-circle me-3"
                        style={{ width: "42px", height: "42px", objectFit: "cover" }}
                      />
                      <div className="text-start flex-grow-1">
                        <div className="fw-bold text-dark">{acc.name}</div>
                        <div className="text-muted small">{acc.email}</div>
                      </div>
                      <i className="fa-solid fa-chevron-right text-muted small"></i>
                    </div>
                  ))}

                  {/* Opsi Gunakan Akun Lain */}
                  {!showCustomInput ? (
                    <div
                      style={styles.accountItem}
                      className="hover-bg-light border"
                      onClick={() => setShowCustomInput(true)}
                    >
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                        style={{ width: "42px", height: "42px" }}
                      >
                        <i className="fa-solid fa-user-plus text-primary"></i>
                      </div>
                      <div className="text-start flex-grow-1">
                        <div className="fw-bold text-dark">Gunakan Akun Lain</div>
                        <div className="text-muted small">Masuk dengan akun Google berbeda</div>
                      </div>
                      <i className="fa-solid fa-plus text-primary small"></i>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleCustomGoogleSubmit}
                      className="p-3 border rounded bg-light mt-2"
                    >
                      <h6 className="fw-bold mb-2">Masuk Akun Google Baru</h6>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Nama Anda (misal: Zahra)"
                          value={customGoogleAccount.name}
                          onChange={(e) =>
                            setCustomGoogleAccount({
                              ...customGoogleAccount,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          placeholder="email@gmail.com"
                          value={customGoogleAccount.email}
                          onChange={(e) =>
                            setCustomGoogleAccount({
                              ...customGoogleAccount,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => setShowCustomInput(false)}
                        >
                          Batal
                        </button>
                        <button type="submit" className="btn btn-sm btn-primary">
                          Pilih Akun Ini
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                  <span className="text-muted small">
                    <i className="fa-solid fa-lock me-1"></i> Aman via Google OAuth
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setShowGoogleModal(false)}
                  >
                    Tutup
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}