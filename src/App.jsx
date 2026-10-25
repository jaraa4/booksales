import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages";
import Books from "./pages/books";
import Team from "./pages/team";
import Contact from "./pages/contact";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import NotFound from "./pages/NotFound";
import GenrePage from "./pages/genre";
import AuthorPage from "./pages/author";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================================================
            1. PUBLIC / MAIN LAYOUT ROUTES
            Membungkus halaman utama toko dengan Header & Footer bersama
            menggunakan MainLayout dan Outlet dari React Router.
            ======================================================== */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />

          {/* ================================================
              MVC ROUTES — Genre & Author
              Routing mengarahkan URL ke controller yang tepat
              ================================================ */}
          <Route path="genre" element={<GenrePage />} />
          <Route path="author" element={<AuthorPage />} />
        </Route>

        {/* ========================================================
            2. AUTHENTICATION ROUTES
            Halaman login dan register (tanpa header toko standar)
            ======================================================== */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* ========================================================
            3. NOT FOUND / FALLBACK ROUTE
            Menangani rute yang tidak cocok (404 Page Not Found)
            ======================================================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;