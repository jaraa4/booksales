import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setAlert({
        type: "danger",
        text: "Harap isi semua kolom formulir yang bertanda wajib.",
      });
      return;
    }

    setAlert({
      type: "success",
      text: `Terima kasih, ${formData.name}! Pesan Anda telah kami terima dan tim Bookstore akan segera menghubungi Anda di ${formData.email}.`,
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="py-5" id="kontak">
      <div className="text-center mb-5">
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 bg-success-subtle text-success rounded-pill mb-2 fw-semibold small">
          <i className="fa-solid fa-headset"></i>
          <span>Layanan Pelanggan</span>
        </div>
        <h2 className="fw-bold mb-3 display-6" style={{ color: "#1e293b" }}>
          Hubungi Kami
        </h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Punya pertanyaan seputar ketersediaan buku, pesanan, atau kerja sama?
          Jangan ragu untuk menghubungi tim kami melalui formulir atau kontak di bawah ini.
        </p>
      </div>

      <div className="row g-4 align-items-stretch">
        {/* Kolom Informasi Kontak */}
        <div className="col-lg-5">
          <div
            className="p-4 p-md-5 rounded-4 text-white h-100 d-flex flex-column justify-content-between shadow-sm"
            style={{
              background: "linear-gradient(135deg, #15803d 0%, #166534 100%)",
            }}
          >
            <div>
              <h4 className="fw-bold mb-4">Informasi Kontak</h4>
              <p className="text-white-50 mb-4">
                Kunjungi toko kami atau hubungi kami pada hari dan jam kerja. Kami siap membantu Anda dengan senang hati.
              </p>

              <div className="d-flex align-items-start mb-4">
                <div
                  className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="fa-solid fa-location-dot fs-5 text-white"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Alamat Toko</h6>
                  <p className="text-white-50 small mb-0">
                    Jl. Margonda Raya No. 525, Beji, Depok, Jawa Barat 16424
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <div
                  className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="fa-solid fa-envelope fs-5 text-white"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Email Resmi</h6>
                  <p className="text-white-50 small mb-0">
                    support@bookstore.id<br />info@bookstore.id
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <div
                  className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="fa-solid fa-phone fs-5 text-white"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Telepon & WhatsApp</h6>
                  <p className="text-white-50 small mb-0">
                    +62 812-3456-7890 (CS Bookstore)
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <div
                  className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{ width: "48px", height: "48px" }}
                >
                  <i className="fa-solid fa-clock fs-5 text-white"></i>
                </div>
                <div>
                  <h6 className="fw-bold mb-1">Jam Operasional</h6>
                  <p className="text-white-50 small mb-0">
                    Senin - Sabtu: 08:00 - 20:00 WIB<br />Minggu: 09:00 - 17:00 WIB
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-top border-white border-opacity-25 mt-4">
              <span className="small text-white-50 d-block mb-2">Media Sosial:</span>
              <div className="d-flex gap-2">
                <a href="#instagram" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: "36px", height: "36px" }}>
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#facebook" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: "36px", height: "36px" }}>
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#twitter" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: "36px", height: "36px" }}>
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#whatsapp" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: "36px", height: "36px" }}>
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Form Kontak */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4 h-100">
            <div className="card-body p-4 p-md-5">
              <h4 className="fw-bold text-dark mb-2">Kirimkan Pesan Anda</h4>
              <p className="text-muted small mb-4">
                Isi data diri Anda di bawah dan kami akan merespons dalam kurun waktu 1x24 jam.
              </p>

              {alert && (
                <div
                  className={`alert alert-${alert.type} alert-dismissible fade show`}
                  role="alert"
                >
                  <i
                    className={`fa-solid ${
                      alert.type === "success"
                        ? "fa-circle-check"
                        : "fa-triangle-exclamation"
                    } me-2`}
                  ></i>
                  {alert.text}
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setAlert(null)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-secondary">
                      Nama Lengkap <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fa-solid fa-user text-muted"></i>
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control border-start-0 ps-0"
                        placeholder="Nama lengkap Anda"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold small text-secondary">
                      Alamat Email <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fa-solid fa-envelope text-muted"></i>
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control border-start-0 ps-0"
                        placeholder="contoh@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold small text-secondary">
                      Subjek Pesan
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fa-solid fa-tag text-muted"></i>
                      </span>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control border-start-0 ps-0"
                        placeholder="Contoh: Ketersediaan Buku / Kerja Sama"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold small text-secondary">
                      Isi Pesan <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-control"
                      rows="5"
                      placeholder="Tuliskan pertanyaan, masukan, atau pesan Anda di sini secara jelas..."
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 pt-2">
                    <button
                      type="submit"
                      className="btn btn-success px-4 py-2 fw-semibold rounded-pill shadow-sm"
                    >
                      <i className="fa-solid fa-paper-plane me-2"></i>
                      Kirim Pesan Sekarang
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}