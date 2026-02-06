import ProductCard from "@/components/ProductCard";
import React from "react";
import { useSelector } from "react-redux";

export default function Collection() {
  const products = useSelector((state) => state.products.collection);

  return (
    <>
      <section className="bg-zinc-900 h-[92vh]">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-red-500">
              {"Shop Our Collection"}
            </h1>
            <p className="text-zinc-200 max-w-2xl mx-auto">
              {
                "Explore top-quality electronics handpicked to upgrade your everyday life."}
            </p>
          </div>
          {products.length === 0 ? (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-2 text-center">
              <p className="md:text-2xl text-lg font-semibold text-red-500">
                Our server is starting up...
              </p>
              <p className="text-gray-400">
                Thanks for your patience, this usually takes a few seconds.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {products?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={products.length === 0 ? true : false}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
