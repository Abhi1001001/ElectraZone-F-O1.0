// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ElectronicsArrivals({ products, loading }) {

  return (
    <section className="px-4 bg-black text-white">
     <div className="max-w-7xl md:py-14 py-6 m-auto">
       {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="md:text-3xl text-2xl font-bold tracking-tight">
            New Arrivals
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            Discover the latest electronics designed to upgrade your everyday
            life with performance, speed, and comfort.
          </p>
        </div>

        <Link
          to="/products"
          className="text-sm font-semibold text-red-500 hover:text-red-400 transition"
        >
          View all →
        </Link>
      </div>

      {loading && (
        <div className="w-full h-[40vh] flex flex-col justify-center items-center gap-2 text-center">
          <p className="md:text-2xl text-lg font-semibold text-white">
            Our server is starting up...
          </p>
          <p className="text-zinc-400">
            Thanks for your patience, this usually takes a few seconds.
          </p>
        </div>
      )}

      {/* Horizontal Scroll */}
      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex w-fit gap-6 pb-4">
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className="min-w-[260px] max-w-[260px] rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] transition group"
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
     </div>
    </section>
  );
}
