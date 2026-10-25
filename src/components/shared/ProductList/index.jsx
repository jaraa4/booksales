import { useState, useEffect } from "react";
import booksData from "../../../utils/books";
import styles from "../../../styles/books.module.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80";

const CATEGORIES = [
  "Semua",
  "Web Dev",
  "Software Engineering",
  "Mobile & Framework",
  "Algoritma & Data",
  "AI & Machine Learning",
  "DevOps & Security",
];

const getStoredCart = () => {
  try {
    const stored = localStorage.getItem("bookstore_cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export default function ProductList({
  title = "Daftar Buku",
  subtitle = "Koleksi terbaru dan rekomendasi editor kami untukmu.",
}) {
  // State buku (HOOKS)
  const [books, setBooks] = useState([...booksData]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // State Keranjang Belanja (Cart)
  const [cartItems, setCartItems] = useState(getStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State Feedback Notifikasi
  const [alertMessage, setAlertMessage] = useState(null);

  // State Modal Pembelian Langsung (Beli)
  const [buyModalBook, setBuyModalBook] = useState(null);
  const [buyQty, setBuyQty] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank BCA");

  // State Modal Checkout dari Keranjang
  const [isCartCheckoutOpen, setIsCartCheckoutOpen] = useState(false);
  const [cartCheckoutForm, setCartCheckoutForm] = useState({
    name: "",
    address: "",
    payment: "Transfer Bank BCA",
  });

  // State Modal Tambah Buku
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBookForm, setNewBookForm] = useState({
    title: "",
    author: "",
    year: new Date().getFullYear(),
    category: "Web Dev",
    price: "",
    originalPrice: "",
    description: "",
    image: "",
    tag: "Buku Baru ✨",
  });

  // State Modal Detail Buku
  const [detailModalBook, setDetailModalBook] = useState(null);

  // Simpan keranjang ke localStorage
  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("bookstore_cart", JSON.stringify(items));
    window.dispatchEvent(new Event("bookstore_cart_change"));
  };

  useEffect(() => {
    const handleCartChange = () => {
      setCartItems(getStoredCart());
    };
    window.addEventListener("bookstore_cart_change", handleCartChange);
    return () =>
      window.removeEventListener("bookstore_cart_change", handleCartChange);
  }, []);

  // Otomatis bersihkan pesan alert setelah 4 detik
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  // Helper untuk parsing harga numerik
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const clean = String(priceStr).replace(/[^0-9]/g, "");
    return parseInt(clean, 10) || 0;
  };

  const formatPrice = (num) => {
    return "Rp" + num.toLocaleString("id-ID");
  };

  // Handler Tambah ke Keranjang
  const handleAddToCart = (book) => {
    const existingIndex = cartItems.findIndex((item) => item.id === book.id);
    let updated;

    if (existingIndex > -1) {
      updated = cartItems.map((item, idx) =>
        idx === existingIndex ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updated = [
        ...cartItems,
        {
          id: book.id,
          title: book.title,
          price: book.price,
          image: book.image,
          author: book.author || "Bookstore",
          qty: 1,
        },
      ];
    }

    saveCart(updated);
    setAlertMessage(`🛒 "${book.title}" berhasil ditambahkan ke keranjang!`);
  };

  // Handler Update Qty Keranjang
  const handleUpdateCartQty = (bookId, delta) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === bookId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      })
      .filter(Boolean);

    saveCart(updated);
  };

  // Handler Hapus Item dari Keranjang
  const handleRemoveFromCart = (bookId) => {
    const updated = cartItems.filter((item) => item.id !== bookId);
    saveCart(updated);
  };

  // Handler Kosongkan Keranjang
  const handleClearCart = () => {
    if (window.confirm("Kosongkan semua buku dari keranjang belanja?")) {
      saveCart([]);
    }
  };

  // Total Belanja Keranjang
  const cartTotalPrice = cartItems.reduce((acc, item) => {
    return acc + parsePrice(item.price) * item.qty;
  }, 0);

  const cartTotalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // Handler Konfirmasi Checkout dari Keranjang
  const handleConfirmCartCheckout = (e) => {
    e.preventDefault();
    if (!cartCheckoutForm.name.trim()) {
      alert("Harap masukkan nama lengkap.");
      return;
    }

    const message = `🎉 Pesanan sebesar ${formatPrice(
      cartTotalPrice
    )} (${cartTotalQty} buku) atas nama ${cartCheckoutForm.name} berhasil dibuat dengan ${
      cartCheckoutForm.payment
    }!`;

    setAlertMessage(message);
    saveCart([]);
    setIsCartCheckoutOpen(false);
    setIsCartOpen(false);
    setCartCheckoutForm({
      name: "",
      address: "",
      payment: "Transfer Bank BCA",
    });
  };

  // Handler Buka Modal Beli Langsung
  const handleOpenBuyModal = (book) => {
    setBuyModalBook(book);
    setBuyQty(1);
    setBuyerName("");
    setPaymentMethod("Transfer Bank BCA");
  };

  // Handler Konfirmasi Beli Langsung
  const handleConfirmBuy = (e) => {
    e.preventDefault();
    if (!buyerName.trim()) {
      alert("Silakan masukkan nama pembeli terlebih dahulu.");
      return;
    }

    const priceNum = parsePrice(buyModalBook.price);
    const totalPrice = formatPrice(priceNum * buyQty);

    const message = `Terima kasih ${buyerName}! Pesanan "${buyModalBook.title}" (x${buyQty}) senilai ${totalPrice} berhasil diproses.`;
    setAlertMessage(message);
    setBuyModalBook(null);
  };

  // Handler Simpan Buku Baru
  const handleSaveNewBook = (e) => {
    e.preventDefault();
    if (!newBookForm.title.trim()) {
      alert("Judul buku wajib diisi!");
      return;
    }

    const formattedPrice = newBookForm.price.trim().startsWith("Rp")
      ? newBookForm.price.trim()
      : `Rp${newBookForm.price.trim() || "100.000"}`;

    const newBook = {
      id: Date.now(),
      title: newBookForm.title.trim(),
      author: newBookForm.author.trim() || "Penulis Bookstore",
      year: parseInt(newBookForm.year, 10) || new Date().getFullYear(),
      category: newBookForm.category || "Fiksi",
      tag: newBookForm.tag || "Buku Baru ✨",
      rating: 5.0,
      reviews: 1,
      originalPrice: newBookForm.originalPrice || formattedPrice,
      price: formattedPrice,
      image: newBookForm.image.trim() || FALLBACK_IMAGE,
      description:
        newBookForm.description.trim() || "Buku rekomendasi pilihan pembaca.",
    };

    setBooks((prevBooks) => [newBook, ...prevBooks]);
    setAlertMessage(`Buku "${newBook.title}" berhasil ditambahkan ke katalog!`);
    setIsAddModalOpen(false);
    setNewBookForm({
      title: "",
      author: "",
      year: new Date().getFullYear(),
      category: "Fiksi",
      price: "",
      originalPrice: "",
      description: "",
      image: "",
      tag: "Buku Baru ✨",
    });
  };

  // Handler Cepat Tambah Buku
  const handleQuickAddBook = () => {
    const newBook = {
      id: Date.now(),
      title: "Learning TypeScript & Node.js",
      author: "Kevin Sanjaya",
      year: 2024,
      category: "Web Dev",
      tag: "Bestseller 🔥",
      rating: 4.9,
      reviews: 310,
      originalPrice: "Rp145.000",
      price: "Rp115.000",
      image:
        "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=500&q=80",
      description: "Panduan praktis pembuatan REST API scalable menggunakan TypeScript, Node.js, dan Express.",
    };

    setBooks((prevBooks) => [newBook, ...prevBooks]);
    setAlertMessage('Buku "Learning TypeScript & Node.js" berhasil ditambahkan ke katalog!');
    setIsAddModalOpen(false);
  };

  // Filter buku berdasarkan kategori dan pencarian
  const filteredBooks = books.filter((b) => {
    const matchCategory =
      selectedCategory === "Semua" || b.category === selectedCategory;
    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.description &&
        b.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.author && b.author.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <section id="daftar-buku" className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>{title}</h2>
        <p className={styles.headerText}>{subtitle}</p>
      </div>

      {/* ALERT NOTIFIKASI */}
      {alertMessage && (
        <div className={styles.alertSuccess}>
          <div>
            <i className="fa-solid fa-circle-check me-2"></i>
            <strong>Info:</strong> {alertMessage}
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setAlertMessage(null)}
          ></button>
        </div>
      )}

      {/* CATEGORY FILTER TABS */}
      <div className={styles.categoryTabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.categoryBtn} ${
              selectedCategory === cat ? styles.categoryBtnActive : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ACTION & SEARCH BAR */}
      <div className={styles.actionBar}>
        <div className={styles.searchBox}>
          <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}></i>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Cari buku berdasarkan judul, penulis, atau kata kunci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="btn btn-sm btn-link position-absolute end-0 top-50 translate-middle-y text-muted text-decoration-none pe-3"
            >
              ✕
            </button>
          )}
        </div>

        <div className="d-flex gap-2 align-items-center">
          <button
            type="button"
            className="btn btn-outline-primary fw-bold"
            onClick={() => setIsCartOpen(true)}
          >
            <i className="fa-solid fa-cart-shopping me-1"></i> Keranjang
            <span className="badge bg-primary text-white ms-2">
              {cartTotalQty}
            </span>
          </button>

          <span className="badge bg-light text-dark border fs-6 py-2 px-3">
            {filteredBooks.length} Buku
          </span>
        </div>
      </div>

      {/* LIST BUKU GRID */}
      {filteredBooks.length > 0 ? (
        <div className={styles.grid}>
          {filteredBooks.map((book) => (
            <div className={styles.card} key={book.id}>
              {/* Tag / Badge Promo */}
              {book.tag && <span className={styles.tagBadge}>{book.tag}</span>}
              {book.category && (
                <span className={styles.categoryBadge}>{book.category}</span>
              )}

              {/* Cover Gambar */}
              <div
                className={styles.imageContainer}
                onClick={() => setDetailModalBook(book)}
                title="Klik untuk melihat detail lengkap"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className={styles.image}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>

              {/* Body Rincian */}
              <div className={styles.body}>
                <div className={styles.author}>
                  {book.author || "Bookstore Edition"}{book.year ? ` • ${book.year}` : ""}
                </div>
                <h5
                  className={styles.title}
                  onClick={() => setDetailModalBook(book)}
                  title={book.title}
                >
                  {book.title}
                </h5>

                {/* Rating & Reviews */}
                <div className={styles.ratingRow}>
                  <i className={`fa-solid fa-star ${styles.starIcon}`}></i>
                  <strong>{book.rating || 4.8}</strong>
                  <span className={styles.reviewCount}>
                    ({book.reviews || 100} ulasan)
                  </span>
                </div>

                <p className={styles.desc}>{book.description}</p>
              </div>

              {/* Footer Harga & Tombol Aksi */}
              <div className={styles.footer}>
                <div className={styles.priceContainer}>
                  <div>
                    <span className={styles.price}>{book.price}</span>
                    {book.originalPrice && book.originalPrice !== book.price && (
                      <span className={styles.oldPrice}>
                        {book.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    className={styles.detailButton}
                    onClick={() => setDetailModalBook(book)}
                    title="Pratinjau detail"
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </div>

                <div className={styles.cardButtons}>
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => handleAddToCart(book)}
                    title="Tambah buku ini ke Keranjang Belanja"
                  >
                    <i className="fa-solid fa-cart-plus"></i> + Keranjang
                  </button>
                  <button
                    className={styles.buyBtn}
                    onClick={() => handleOpenBuyModal(book)}
                    title="Beli sekarang langsung"
                  >
                    <i className="fa-solid fa-bolt"></i> Beli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <i className="fa-solid fa-book-skull fa-3x mb-3 text-secondary"></i>
          <h5>Buku tidak ditemukan</h5>
          <p>Coba pilih kategori lain atau reset kata kunci pencarian.</p>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Semua");
            }}
          >
            Reset Filter & Pencarian
          </button>
        </div>
      )}

      {/* BUTTON TAMBAH BUKU */}
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className={styles.addButton}
          title="Buka form penambahan buku baru"
        >
          <i className="fa-solid fa-plus me-1"></i> Tambah Buku Baru
        </button>
      </div>

      {/* ===== FLOATING CART BUTTON ===== */}
      <button
        type="button"
        className={styles.floatingCartBtn}
        onClick={() => setIsCartOpen(true)}
        title="Buka Keranjang Belanja"
      >
        <i className="fa-solid fa-cart-shopping"></i>
        {cartTotalQty > 0 && (
          <span className={styles.cartBadgeCount}>{cartTotalQty}</span>
        )}
      </button>

      {/* ===== CART DRAWER / OFFCANVAS ===== */}
      {isCartOpen && (
        <div
          className={styles.drawerBackdrop}
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className={styles.cartDrawer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <h5 className="fw-bold mb-0">
                <i className="fa-solid fa-bag-shopping text-primary me-2"></i>
                Keranjang Belanja ({cartTotalQty})
              </h5>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsCartOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className={styles.drawerBody}>
              {cartItems.length > 0 ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                    <span className="text-muted small">Daftar Buku Dipilih</span>
                    <button
                      type="button"
                      className="btn btn-link btn-sm text-danger text-decoration-none p-0"
                      onClick={handleClearCart}
                    >
                      <i className="fa-solid fa-trash-can me-1"></i> Kosongkan
                    </button>
                  </div>

                  {cartItems.map((item) => (
                    <div className={styles.cartItem} key={item.id}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.cartItemImg}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />
                      <div className={styles.cartItemDetails}>
                        <div className={styles.cartItemTitle}>{item.title}</div>
                        <div className={styles.cartItemPrice}>
                          {item.price}{" "}
                          <span className="text-muted small fw-normal">
                            x {item.qty} ={" "}
                            {formatPrice(parsePrice(item.price) * item.qty)}
                          </span>
                        </div>
                        <div className={styles.cartQtyControls}>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => handleUpdateCartQty(item.id, -1)}
                          >
                            -
                          </button>
                          <span className="small fw-bold px-2">{item.qty}</span>
                          <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => handleUpdateCartQty(item.id, 1)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-link text-danger ms-auto p-0"
                            onClick={() => handleRemoveFromCart(item.id)}
                            title="Hapus item"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-5 text-muted">
                  <i className="fa-solid fa-cart-arrow-down fa-3x mb-3 text-secondary"></i>
                  <h6>Keranjang belanja kosong</h6>
                  <p className="small">
                    Yuk pilih buku favoritmu dan klik tombol "+ Keranjang".
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Mulai Belanja
                  </button>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className={styles.drawerFooter}>
                <div className={styles.summaryRow}>
                  <span className="text-muted">Subtotal:</span>
                  <strong>{formatPrice(cartTotalPrice)}</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span className="text-muted">Ongkos Kirim:</span>
                  <span className="text-success fw-bold">Gratis Ongkir 🚚</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total Tagihan:</span>
                  <span className="text-primary">
                    {formatPrice(cartTotalPrice)}
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.checkoutBtn}
                  onClick={() => setIsCartCheckoutOpen(true)}
                >
                  <i className="fa-solid fa-credit-card me-2"></i>
                  Lanjut ke Checkout ({cartTotalQty} Buku)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== MODAL CHECKOUT DARI KERANJANG ===== */}
      {isCartCheckoutOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsCartCheckoutOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4>
                <i className="fa-solid fa-bag-shopping text-primary me-2"></i>
                Konfirmasi Checkout Keranjang
              </h4>
              <button
                className={styles.closeBtn}
                onClick={() => setIsCartCheckoutOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleConfirmCartCheckout}>
              <div className={styles.modalBody}>
                {/* Ringkasan Item Keranjang */}
                <div className="mb-3 p-3 bg-light rounded border">
                  <h6 className="fw-bold mb-2">Ringkasan Pesanan ({cartTotalQty} item):</h6>
                  <ul className="list-unstyled mb-2 small">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="d-flex justify-content-between py-1 border-bottom"
                      >
                        <span>
                          {item.title} x {item.qty}
                        </span>
                        <strong className="text-primary">
                          {formatPrice(parsePrice(item.price) * item.qty)}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between fw-bold pt-1">
                    <span>Total Pembayaran:</span>
                    <span className="text-primary fs-5">
                      {formatPrice(cartTotalPrice)}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Nama Lengkap Pembeli *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan nama penerima..."
                    value={cartCheckoutForm.name}
                    onChange={(e) =>
                      setCartCheckoutForm({
                        ...cartCheckoutForm,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Alamat Pengiriman</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Alamat lengkap tujuan pengiriman buku..."
                    value={cartCheckoutForm.address}
                    onChange={(e) =>
                      setCartCheckoutForm({
                        ...cartCheckoutForm,
                        address: e.target.value,
                      })
                    }
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Metode Pembayaran</label>
                  <select
                    className="form-select"
                    value={cartCheckoutForm.payment}
                    onChange={(e) =>
                      setCartCheckoutForm({
                        ...cartCheckoutForm,
                        payment: e.target.value,
                      })
                    }
                  >
                    <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                    <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                    <option value="QRIS / GoPay / OVO">QRIS / GoPay / OVO</option>
                    <option value="COD (Bayar di Tempat)">COD (Bayar di Tempat)</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsCartCheckoutOpen(false)}
                >
                  Kembali
                </button>
                <button type="submit" className="btn btn-primary fw-bold">
                  <i className="fa-solid fa-check me-1"></i> Bayar Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL BELI LANGSUNG ===== */}
      {buyModalBook && (
        <div className={styles.modalBackdrop} onClick={() => setBuyModalBook(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4>
                <i className="fa-solid fa-bolt text-warning me-2"></i>
                Beli Langsung
              </h4>
              <button
                className={styles.closeBtn}
                onClick={() => setBuyModalBook(null)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleConfirmBuy}>
              <div className={styles.modalBody}>
                {/* Info Buku */}
                <div className="d-flex align-items-center mb-3 p-3 bg-light rounded border">
                  <img
                    src={buyModalBook.image}
                    alt={buyModalBook.title}
                    style={{
                      width: "65px",
                      height: "85px",
                      objectFit: "contain",
                      marginRight: "15px",
                    }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                  <div>
                    <h6 className="fw-bold mb-1">{buyModalBook.title}</h6>
                    <small className="text-muted d-block mb-1">
                      Penulis: {buyModalBook.author || "Bookstore"}
                    </small>
                    <span className="text-primary fw-bold fs-6">
                      {buyModalBook.price}
                    </span>
                  </div>
                </div>

                {/* Input Nama Pembeli */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Nama Lengkap</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan nama Anda..."
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    required
                  />
                </div>

                {/* Input Jumlah Buku */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Jumlah Buku</label>
                  <div className="input-group" style={{ maxWidth: "160px" }}>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setBuyQty((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={buyQty}
                      min="1"
                      onChange={(e) =>
                        setBuyQty(Math.max(1, parseInt(e.target.value) || 1))
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setBuyQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Metode Pembayaran</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                    <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                    <option value="QRIS / GoPay / OVO">QRIS / GoPay / OVO</option>
                    <option value="COD (Bayar di Tempat)">COD (Bayar di Tempat)</option>
                  </select>
                </div>

                {/* Ringkasan Total */}
                <div className="p-3 border rounded bg-light d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Total Pembayaran:</span>
                  <span className="fs-5 fw-bold text-primary">
                    {formatPrice(parsePrice(buyModalBook.price) * buyQty)}
                  </span>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setBuyModalBook(null)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary fw-bold">
                  <i className="fa-solid fa-check me-1"></i> Konfirmasi Beli
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL TAMBAH BUKU ===== */}
      {isAddModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4>
                <i className="fa-solid fa-plus-circle text-primary me-2"></i>
                Tambah Buku Baru
              </h4>
              <button
                className={styles.closeBtn}
                onClick={() => setIsAddModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveNewBook}>
              <div className={styles.modalBody}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted small">
                    Contoh cepat tugas:
                  </span>
                  <button
                    type="button"
                    onClick={handleQuickAddBook}
                    className="btn btn-sm btn-outline-info"
                  >
                    + Isi Cepat (Learning TypeScript)
                  </button>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Judul Buku *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contoh: Arsitektur Microservices"
                    value={newBookForm.title}
                    onChange={(e) =>
                      setNewBookForm({ ...newBookForm, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Penulis</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Penulis"
                      value={newBookForm.author}
                      onChange={(e) =>
                        setNewBookForm({
                          ...newBookForm,
                          author: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Tahun Terbit</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="2024"
                      value={newBookForm.year}
                      onChange={(e) =>
                        setNewBookForm({
                          ...newBookForm,
                          year: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold">Kategori</label>
                    <select
                      className="form-select"
                      value={newBookForm.category}
                      onChange={(e) =>
                        setNewBookForm({
                          ...newBookForm,
                          category: e.target.value,
                        })
                      }
                    >
                      {CATEGORIES.filter((c) => c !== "Semua").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Harga Jual *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rp100.000"
                      value={newBookForm.price}
                      onChange={(e) =>
                        setNewBookForm({
                          ...newBookForm,
                          price: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Badge Promo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Diskon 20% 🔥"
                      value={newBookForm.tag}
                      onChange={(e) =>
                        setNewBookForm({ ...newBookForm, tag: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">URL Cover Buku (Opsional)</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://..."
                    value={newBookForm.image}
                    onChange={(e) =>
                      setNewBookForm({ ...newBookForm, image: e.target.value })
                    }
                  />
                  <small className="text-muted">
                    Kosongkan jika ingin memakai cover default.
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Deskripsi Singkat</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Deskripsi cerita atau topik buku..."
                    value={newBookForm.description}
                    onChange={(e) =>
                      setNewBookForm({
                        ...newBookForm,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary fw-bold">
                  <i className="fa-solid fa-floppy-disk me-1"></i> Simpan Buku
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL DETAIL BUKU ===== */}
      {detailModalBook && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setDetailModalBook(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h4>
                <i className="fa-solid fa-circle-info text-primary me-2"></i>
                Detail Buku
              </h4>
              <button
                className={styles.closeBtn}
                onClick={() => setDetailModalBook(null)}
              >
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className="text-center mb-3">
                <img
                  src={detailModalBook.image}
                  alt={detailModalBook.title}
                  style={{
                    maxHeight: "220px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-primary">
                  {detailModalBook.category || "Umum"}
                </span>
                <span className="text-muted small">
                  Penulis: <strong>{detailModalBook.author || "Bookstore"}</strong>
                </span>
              </div>

              <h4 className="fw-bold mb-1">{detailModalBook.title}</h4>

              <div className="d-flex align-items-center gap-2 mb-3">
                <i className="fa-solid fa-star text-warning"></i>
                <strong>{detailModalBook.rating || 4.9}</strong>
                <span className="text-muted small">
                  ({detailModalBook.reviews || 100} pembaca memberi ulasan)
                </span>
              </div>

              <h5 className="text-primary fw-bold mb-3">
                {detailModalBook.price}
                {detailModalBook.originalPrice &&
                  detailModalBook.originalPrice !== detailModalBook.price && (
                    <span className="text-muted text-decoration-line-through fs-6 ms-2">
                      {detailModalBook.originalPrice}
                    </span>
                  )}
              </h5>

              <h6 className="fw-bold text-muted mb-1">Sinopsis & Deskripsi:</h6>
              <p className="text-secondary" style={{ lineHeight: "1.6" }}>
                {detailModalBook.description}
              </p>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className="btn btn-outline-primary fw-bold"
                onClick={() => {
                  handleAddToCart(detailModalBook);
                  setDetailModalBook(null);
                }}
              >
                <i className="fa-solid fa-cart-plus me-1"></i> + Keranjang
              </button>
              <button
                type="button"
                className="btn btn-primary fw-bold"
                onClick={() => {
                  const book = detailModalBook;
                  setDetailModalBook(null);
                  handleOpenBuyModal(book);
                }}
              >
                <i className="fa-solid fa-bolt me-1"></i> Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}