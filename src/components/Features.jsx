import { Truck, ShieldCheck, Headphones } from "lucide-react";

export default function Features() {
  return (
    <section className="w-full bg-black border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:py-10 py-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Free Shipping */}
        <div className="flex flex-col md:flex-row items-center gap-4 m-auto">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-500/15 text-red-500">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold md:text-lg text-md text-white">
              Free Shipping
            </h4>
            <p className="text-zinc-400 md:text-sm text-xs">
              On orders over ₹99
            </p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="flex flex-col md:flex-row items-center gap-4 m-auto">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-500/15 text-red-500">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold md:text-lg text-md text-white">
              Secure Payment
            </h4>
            <p className="text-zinc-400 md:text-sm text-xs">
              100% secure transactions
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="flex-col md:flex-row items-center gap-4 m-auto md:flex hidden">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-500/15 text-red-500">
            <Headphones className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-semibold text-lg text-white">24/7 Support</h4>
            <p className="text-zinc-400 text-sm">Always here to help</p>
          </div>
        </div>
      </div>
    </section>
  );
}
