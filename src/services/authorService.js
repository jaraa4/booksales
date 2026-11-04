import AuthorModel from "../models/AuthorModel";

const STORAGE_KEY = "bookstore_authors";
const API_URL = "http://localhost:3000/api/authors";

/**
 * Mengambil data author dari localStorage atau inisialisasi awal dari AuthorModel.
 */
export function getStoredAuthors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Gagal membaca author dari localStorage:", err);
  }
  // Default fallback ke AuthorModel jika belum ada di localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(AuthorModel));
  return [...AuthorModel];
}

/**
 * Menyimpan array data author ke localStorage dan trigger event perubahan.
 */
export function saveStoredAuthors(authors) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authors));
    window.dispatchEvent(new CustomEvent("bookstore_authors_changed", { detail: authors }));
  } catch (err) {
    console.error("Gagal menyimpan author ke localStorage:", err);
  }
}

/**
 * Mengambil data author secara asinkron dari REST API Express.
 * Jika server tidak berjalan atau gagal, otomatis fallback ke data localStorage.
 */
export async function fetchAuthors() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result && Array.isArray(result.data)) {
        // Sinkronisasi data server ke localStorage
        saveStoredAuthors(result.data);
        return { data: result.data, source: "api", success: true };
      }
    }
  } catch {
    // API server offline atau unreachable, gunakan localStorage
  }

  const localData = getStoredAuthors();
  return { data: localData, source: "local", success: true };
}

/**
 * Menambahkan data author baru (Create).
 * Menyimpan ke localStorage dan mengirim POST ke REST API jika server aktif.
 */
export async function createAuthor(newAuthorData) {
  const currentAuthors = getStoredAuthors();
  const nextId =
    currentAuthors.length > 0
      ? Math.max(...currentAuthors.map((a) => Number(a.id) || 0)) + 1
      : 1;

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    newAuthorData.nama || "Author"
  )}&background=0d9488&color=fff&bold=true`;

  const createdAuthor = {
    id: nextId,
    nama: String(newAuthorData.nama || "").trim(),
    email: String(newAuthorData.email || "").trim(),
    negara: String(newAuthorData.negara || "Indonesia").trim(),
    genre: String(newAuthorData.genre || "Umum").trim(),
    jumlahBuku: parseInt(newAuthorData.jumlahBuku, 10) || 0,
    avatar:
      newAuthorData.avatar && String(newAuthorData.avatar).trim() !== ""
        ? String(newAuthorData.avatar).trim()
        : defaultAvatar,
    bioSingkat:
      newAuthorData.bioSingkat && String(newAuthorData.bioSingkat).trim() !== ""
        ? String(newAuthorData.bioSingkat).trim()
        : "Penulis dan kontributor literatur di Bookstore.",
  };

  const updatedList = [createdAuthor, ...currentAuthors];
  saveStoredAuthors(updatedList);

  // Coba kirim POST ke API backend Express
  try {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createdAuthor),
    }).catch(() => {
      // Background POST gagal ditoleransi, data sudah aman di local
    });
  } catch {
    // Abaikan error jaringan
  }

  return createdAuthor;
}

/**
 * Reset data author ke data default awal (AuthorModel).
 */
export function resetAuthorsToDefault() {
  saveStoredAuthors([...AuthorModel]);
  return [...AuthorModel];
}

export default {
  getStoredAuthors,
  saveStoredAuthors,
  fetchAuthors,
  createAuthor,
  resetAuthorsToDefault,
};
