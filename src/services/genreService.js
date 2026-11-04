import GenreModel from "../models/GenreModel";

const STORAGE_KEY = "bookstore_genres";
const API_URL = "http://localhost:3000/api/genres";

/**
 * Mengambil data genre dari localStorage atau inisialisasi awal dari GenreModel.
 */
export function getStoredGenres() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Gagal membaca genre dari localStorage:", err);
  }
  // Default fallback ke GenreModel jika belum ada di localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(GenreModel));
  return [...GenreModel];
}

/**
 * Menyimpan array data genre ke localStorage dan trigger event perubahan.
 */
export function saveStoredGenres(genres) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(genres));
    window.dispatchEvent(new CustomEvent("bookstore_genres_changed", { detail: genres }));
  } catch (err) {
    console.error("Gagal menyimpan genre ke localStorage:", err);
  }
}

/**
 * Mengambil data genre secara asinkron dari REST API Express.
 * Jika server tidak berjalan atau gagal, otomatis fallback ke data localStorage.
 */
export async function fetchGenres() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result && Array.isArray(result.data)) {
        // Sinkronisasi data server ke localStorage
        saveStoredGenres(result.data);
        return { data: result.data, source: "api", success: true };
      }
    }
  } catch {
    // API server offline atau unreachable, gunakan localStorage
  }

  const localData = getStoredGenres();
  return { data: localData, source: "local", success: true };
}

/**
 * Menambahkan data genre baru (Create).
 * Menyimpan ke localStorage dan mengirim POST ke REST API jika server aktif.
 */
export async function createGenre(newGenreData) {
  const currentGenres = getStoredGenres();
  const nextId =
    currentGenres.length > 0
      ? Math.max(...currentGenres.map((g) => Number(g.id) || 0)) + 1
      : 1;

  const createdGenre = {
    id: nextId,
    nama: String(newGenreData.nama || "").trim(),
    deskripsi: String(newGenreData.deskripsi || "").trim(),
    icon: newGenreData.icon ? String(newGenreData.icon).trim() : "fa-layer-group",
    warna: newGenreData.warna ? String(newGenreData.warna).trim() : "#6366f1",
    jumlahBuku: parseInt(newGenreData.jumlahBuku, 10) || 0,
  };

  const updatedList = [createdGenre, ...currentGenres];
  saveStoredGenres(updatedList);

  // Coba kirim POST ke API backend Express
  try {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createdGenre),
    }).catch(() => {
      // Background POST gagal ditoleransi, data sudah aman di local
    });
  } catch {
    // Abaikan error jaringan
  }

  return createdGenre;
}

/**
 * Reset data genre ke data default awal (GenreModel).
 */
export function resetGenresToDefault() {
  saveStoredGenres([...GenreModel]);
  return [...GenreModel];
}

export default {
  getStoredGenres,
  saveStoredGenres,
  fetchGenres,
  createGenre,
  resetGenresToDefault,
};
