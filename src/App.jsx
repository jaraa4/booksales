import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages";
import Books from "./pages/books";
import Team from "./pages/team";
import Contact from "./pages/contact";
import GenrePage from "./pages/genre";
import AuthorPage from "./pages/author";
import BookPage from "./pages/book";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import NotFound from "./pages/NotFound";

// Admin Pages (Tugas React JS Lanjutan #1)
import AdminDashboardPage from "./pages/admin/dashboard";
import AdminGenrePage from "./pages/admin/genre";
import AdminAuthorPage from "./pages/admin/author";

/**
 * ============================================================
 * APP ROUTING (Booksales)
 * ============================================================
 * Mendukung:
 * 1. Public Storefront Layout (Home, Books, Team, Contact)
 * 2. Authentication Pages (Login, Register)
 * 3. Admin Panel Layout (Dashboard, Kelola Genre, Kelola Author)
 *    Fitur Read & Create data Genre & Author untuk Admin.
 * 4. Fallback 404 Route
 * ============================================================
 */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================================================
            1. PUBLIC / MAIN STOREFRONT ROUTES
            Membungkus halaman pengunjung toko buku
            ======================================================== */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          {/* Akses langsung /genre, /author, /book */}
          <Route path="genre" element={<GenrePage />} />
          <Route path="author" element={<AuthorPage />} />
          <Route path="book" element={<BookPage />} />
        </Route>

        {/* ========================================================
            2. ADMIN PANEL ROUTES (Tugas React JS Lanjutan #1)
            Halaman khusus administrator untuk Read & Create
            data Genre dan Author dengan layout dashboard terpisah.
            ======================================================== */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="genre" element={<AdminGenrePage />} />
          <Route path="genres" element={<Navigate to="/admin/genre" replace />} />
          <Route path="author" element={<AdminAuthorPage />} />
          <Route path="authors" element={<Navigate to="/admin/author" replace />} />
        </Route>

        {/* ========================================================
            3. AUTHENTICATION ROUTES
            ======================================================== */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* ========================================================
            4. NOT FOUND / FALLBACK ROUTE
            ======================================================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
