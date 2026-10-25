import ProductList from "../../components/shared/ProductList";

export default function Books() {
  return (
    <div className="py-2">
      <ProductList
        title="Daftar Katalog Buku"
        subtitle="Koleksi lengkap buku Bookstore dan rekomendasi editor untukmu."
      />
    </div>
  );
}