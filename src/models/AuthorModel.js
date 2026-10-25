/**
 * ============================================================
 * MODEL: AuthorModel
 * ============================================================
 * Berisi data array Author yang digunakan oleh AuthorController
 * untuk kemudian ditampilkan melalui View (AuthorView).
 * ============================================================
 */

const AuthorModel = [
  {
    id: 1,
    nama: "Andrea Hirata",
    email: "andrea.hirata@bookstore.id",
    negara: "Indonesia",
    genre: "Fiksi Sastra",
    jumlahBuku: 9,
    avatar: "https://i.pravatar.cc/150?img=11",
    bioSingkat: "Penulis novel Laskar Pelangi, salah satu novel terlaris sepanjang masa di Indonesia.",
  },
  {
    id: 2,
    nama: "Tere Liye",
    email: "tere.liye@bookstore.id",
    negara: "Indonesia",
    genre: "Fiksi & Romansa",
    jumlahBuku: 42,
    avatar: "https://i.pravatar.cc/150?img=12",
    bioSingkat: "Penulis prolifik Indonesia yang dikenal lewat karya-karya bernuansa keluarga dan cinta.",
  },
  {
    id: 3,
    nama: "Pramoedya Ananta Toer",
    email: "pramoedya@bookstore.id",
    negara: "Indonesia",
    genre: "Sejarah & Fiksi",
    jumlahBuku: 50,
    avatar: "https://i.pravatar.cc/150?img=13",
    bioSingkat: "Sastrawan besar Indonesia, terkenal dengan Tetralogi Pulau Buru yang monumental.",
  },
  {
    id: 4,
    nama: "Raditya Dika",
    email: "raditya.dika@bookstore.id",
    negara: "Indonesia",
    genre: "Humor & Komedi",
    jumlahBuku: 14,
    avatar: "https://i.pravatar.cc/150?img=14",
    bioSingkat: "Penulis, komika, dan sutradara yang terkenal dengan gaya penulisan humor autobiografi.",
  },
  {
    id: 5,
    nama: "Dewi Lestari",
    email: "dewi.lestari@bookstore.id",
    negara: "Indonesia",
    genre: "Fiksi Filosofis",
    jumlahBuku: 11,
    avatar: "https://i.pravatar.cc/150?img=16",
    bioSingkat: "Dikenal dengan nama pena Dee Lestari, penulis serial Supernova yang fenomenal.",
  },
];

export default AuthorModel;
