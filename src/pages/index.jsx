import Contact from "../components/shared/Contact";
import Hero from "../components/shared/Hero";
import ProductList from "../components/shared/ProductList";
import Team from "../components/shared/Team";

export default function Home() {
  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <Hero />

      {/* ===== POPULAR BOOKS LIST ===== */}
      <ProductList
        title="Buku Terpopuler"
        subtitle="Koleksi buku terpopuler dan rekomendasi pilihan editor kami untukmu."
      />

      {/* ===== TEAM SECTION ===== */}
      <Team />

      {/* ===== CONTACT SECTION ===== */}
      <Contact />
    </>
  );
}