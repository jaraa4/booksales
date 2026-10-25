import { Outlet } from "react-router";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <div className="container">
        <Header />
      </div>
      <main className="flex-grow-1">
        <div className="container pb-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
