/**
 * ============================================================
 * MODEL: BookModel
 * ============================================================
 * Representasi "tabel" Book dalam konsep MVC React.
 * Berisi 5 data dummy yang berfungsi seperti hasil Seeder
 * pada Laravel (data awal untuk pengembangan/demo).
 *
 * Kolom / Field (setara kolom Migration Laravel):
 *   - id          : Primary key (integer, auto increment)
 *   - judul       : Judul buku (string)
 *   - penulis     : Nama penulis / foreign key ke Author (string)
 *   - tahunTerbit : Tahun terbit buku (integer)
 *   - genre       : Kategori/genre buku (string)
 *   - harga       : Harga buku dalam rupiah (string, formatted)
 *   - rating      : Rating buku (float, 0-5)
 *   - stok        : Jumlah stok tersedia (integer)
 *   - deskripsi   : Deskripsi singkat buku (text)
 *   - cover       : URL gambar cover buku (string)
 * ============================================================
 */

const BookModel = [
  {
    id: 1,
    judul: "Laskar Pelangi",
    penulis: "Andrea Hirata",
    tahunTerbit: 2005,
    genre: "Fiksi Sastra",
    harga: "Rp85.000",
    rating: 4.9,
    stok: 42,
    deskripsi:
      "Kisah inspiratif sepuluh anak Belitung yang berjuang meraih pendidikan di sekolah sederhana Muhammadiyah.",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    judul: "Hujan",
    penulis: "Tere Liye",
    tahunTerbit: 2016,
    genre: "Fiksi & Romansa",
    harga: "Rp79.000",
    rating: 4.7,
    stok: 35,
    deskripsi:
      "Kisah persahabatan dan cinta Lail dan Soke Bahtera di tengah bencana dahsyat yang mengubah dunia selamanya.",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    judul: "Bumi Manusia",
    penulis: "Pramoedya Ananta Toer",
    tahunTerbit: 1980,
    genre: "Sejarah & Fiksi",
    harga: "Rp95.000",
    rating: 5.0,
    stok: 28,
    deskripsi:
      "Kisah Minke, seorang pribumi terpelajar di era kolonialisme Belanda, serta perjuangan melawan ketidakadilan.",
    cover:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    judul: "Kambing Jantan",
    penulis: "Raditya Dika",
    tahunTerbit: 2005,
    genre: "Humor & Komedi",
    harga: "Rp65.000",
    rating: 4.5,
    stok: 50,
    deskripsi:
      "Diari kocak seorang mahasiswa Indonesia yang berkuliah di Adelaide, Australia, penuh kisah konyol dan menggemaskan.",
    cover:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    judul: "Supernova: Ksatria, Puteri, dan Bintang Jatuh",
    penulis: "Dewi Lestari",
    tahunTerbit: 2001,
    genre: "Fiksi Filosofis",
    harga: "Rp90.000",
    rating: 4.8,
    stok: 22,
    deskripsi:
      "Novel pembuka serial Supernova yang memadukan sains, filsafat, dan kisah cinta dalam narasi yang memukau.",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80",
  },
];

export default BookModel;
