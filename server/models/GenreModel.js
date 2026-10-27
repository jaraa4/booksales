/**
 * ============================================================
 * MODEL: GenreModel
 * ============================================================
 * Berisi data array Genre yang digunakan oleh GenreController
 * untuk dikembalikan sebagai response JSON melalui API.
 *
 * Setara dengan Model Eloquent atau tabel "genres" pada Laravel.
 * ============================================================
 */

const GenreModel = [
  {
    id: 1,
    nama: "Fiksi Ilmiah",
    deskripsi: "Genre yang mengeksplorasi konsep ilmu pengetahuan futuristik dan teknologi canggih.",
    icon: "fa-rocket",
    warna: "#6366f1",
    jumlahBuku: 124,
  },
  {
    id: 2,
    nama: "Romansa",
    deskripsi: "Genre yang berfokus pada kisah cinta dan hubungan romantis antar karakter.",
    icon: "fa-heart",
    warna: "#ec4899",
    jumlahBuku: 98,
  },
  {
    id: 3,
    nama: "Misteri & Thriller",
    deskripsi: "Genre yang penuh dengan teka-teki, ketegangan, dan alur cerita yang tak terduga.",
    icon: "fa-magnifying-glass",
    warna: "#f59e0b",
    jumlahBuku: 87,
  },
  {
    id: 4,
    nama: "Fantasi",
    deskripsi: "Genre yang membawa pembaca ke dunia magis dengan makhluk mitos dan petualangan epik.",
    icon: "fa-wand-magic-sparkles",
    warna: "#8b5cf6",
    jumlahBuku: 112,
  },
  {
    id: 5,
    nama: "Sejarah",
    deskripsi: "Genre yang mengisahkan peristiwa nyata atau fiksi berlatar belakang era historis.",
    icon: "fa-landmark",
    warna: "#10b981",
    jumlahBuku: 63,
  },
];

export default GenreModel;
