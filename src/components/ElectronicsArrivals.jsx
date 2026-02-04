import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ElectronicsArrivals() {
  const products = useSelector((state) => state.products.products);

  return (
    <section className="max-w-7xl mx-auto px-4 md:py-14 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="md:text-3xl text-2xl font-bold">New Arrivals</h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover the latest electronics designed to upgrade your everyday
            life with performance, speed, and comfort.
          </p>
        </div>

        <Link to="/products" className="gap-2 w-fit">
          View all →
        </Link>
      </div>
      {!products.length === 0 && (
        <div className="w-full h-[70vh] flex flex-col justify-center items-center gap-2">
          <p className="md:text-2xl text-lg font-semibold">
            Our server is starting up...
          </p>
          <p>Thanks for your patience, this usually takes a few seconds.</p>
        </div>
      )}
      {/* Horizontal Scroll */}
      <div className="relative overflow-scroll">
        <div className="flex w-fit justify-center items-center gap-6 scrollbar-hide pb-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-65 max-w-65 rounded-2xl shadow hover:shadow-xl transition group"
            >
              <ProductCard key={product._id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
