# 📚 Bookstore - Aplikasi Penjualan Buku (React JS)

Proyek aplikasi web Toko Buku Online (**Bookstore**) berbasis React JS dan Express REST API.

---

## 🎯 Tugas React JS Lanjutan #1

### Deskripsi Tugas
1. **Fitur Read dan Create Data**:
   - **Data Genre**: Menampilkan daftar genre buku beserta statistik, pencarian, pengurutan, dan formulir penambahan genre baru (lengkap dengan pilihan ikon FontAwesome, color palette, serta live preview).
   - **Data Author**: Menampilkan daftar profil penulis buku, pencarian, filter genre, pengurutan, dan formulir penambahan author baru (lengkap dengan generator avatar acak dan live preview).
2. **Tampilan Admin (Admin Panel)**:
   - Dibuat dengan layout terdedikasi (`AdminLayout`) yang memiliki sidebar navigasi responsif, header dengan status API/Local mode, quick action dropdown, kartu statistik, dan beralih antara tampilan tabel atau grid kartu.
3. **Backend REST API (Express.js)**:
   - Didukung endpoint `GET` dan `POST` untuk data genres dan authors (`POST /api/genres`, `POST /api/authors`).
   - Frontend mendukung mode hibrida: otomatis tersinkronisasi dengan REST API jika server berjalan, dan tetap dapat berfungsi secara mandiri via `localStorage`.

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Menjalankan Frontend (React + Vite)
```bash
# Jalankan development server frontend
npm run dev
```
Akses di browser: **`http://localhost:5173`** (atau port yang tertera pada terminal).
- Halaman Utama Toko: `http://localhost:5173/`
- **Dashboard Admin**: `http://localhost:5173/admin`
- **Kelola Genre (Read & Create)**: `http://localhost:5173/admin/genre`
- **Kelola Author (Read & Create)**: `http://localhost:5173/admin/author`

### 2. Menjalankan Backend REST API (Opsional)
```bash
# Dari root project
npm run server
```
Server REST API akan berjalan di: **`http://localhost:3000`**
- `GET /api/genres` & `POST /api/genres`
- `GET /api/authors` & `POST /api/authors`
- `GET /api/books` & `GET /api/books/:id`

---

## 🛠️ Fitur Tampilan Admin

| Halaman | Fitur Utama |
| :--- | :--- |
| **Dashboard Admin** (`/admin`) | Ringkasan statistik (Total Genre, Total Penulis, Total Buku), status koneksi API, tombol aksi cepat, pratinjau data terkini. |
| **Kelola Genre** (`/admin/genre`) | **Read**: Kartu statistik, filter/pencarian real-time, sortir, switch view (Tabel/Kartu), badge warna & ikon.<br>**Create**: Modal form tambah genre, validasi input, color picker & preset warna, icon picker, live preview card. |
| **Kelola Author** (`/admin/author`) | **Read**: Kartu statistik, pencarian nama/email/negara, filter genre, sortir karya terbanyak, switch view (Tabel/Kartu).<br>**Create**: Modal form tambah author, validasi email & biografi, tombol generate avatar acak, live preview card. |

---

## 📦 Struktur Folder Terkait Admin

```text
src/
├── layouts/
│   ├── MainLayout.jsx          # Layout toko publik
│   └── AdminLayout/            # Layout admin (Sidebar, Topbar, Status)
│       └── index.jsx
├── pages/
│   ├── admin/
│   │   ├── dashboard/index.jsx # Halaman Dashboard Admin
│   │   ├── genre/index.jsx     # Read & Create Genre Admin
│   │   └── author/index.jsx    # Read & Create Author Admin
├── services/
│   ├── genreService.js         # Service API + LocalStorage Genre
│   └── authorService.js        # Service API + LocalStorage Author
server/
├── controllers/
│   ├── GenreController.js      # index, show, store (POST)
│   └── AuthorController.js     # index, show, store (POST)
└── routes/
    └── api.js                  # Routing REST API
```

---

## 📝 Langkah Pengumpulan Tugas

1. **Commit & Push ke GitHub**:
   ```bash
   git add .
   git commit -m "feat: implement Read and Create for Genre and Author in Admin Panel (Tugas React JS Lanjutan #1)"
   git push origin main
   ```
2. **Repository Private**:
   - Pastikan repository GitHub diatur ke **Private**.
   - Buka menu **Settings** > **Collaborators** pada repository GitHub.
   - Klik **Add people** lalu masukkan username mentor Anda.
3. **Dokumen Pengumpulan**:
   - Salin link repository GitHub ke dokumen **MS Word**.
   - Tambahkan screenshot tampilan Admin (Dashboard, Kelola Genre, Kelola Author, dan Form Create).
   - Simpan / Export dokumen ke format **PDF**.
   - Unggah file PDF ke **LMS**.
