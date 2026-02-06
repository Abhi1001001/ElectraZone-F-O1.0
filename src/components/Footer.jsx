import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-500 font-bold text-xl tracking-wide">
            ⚡ ElectraZone
          </div>
          <p className="text-sm text-zinc-400">
            Powering your world with next-gen electronics and smart technology.
          </p>
          <div className="text-sm space-y-1 text-zinc-400">
            <p>123 Tech Street, Digital City</p>
            <p>Email: support@electrazone.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-white font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-500 cursor-pointer transition">
              Contact Us
            </li>
            <li className="hover:text-red-500 cursor-pointer transition">
              Shipping & Returns
            </li>
            <li className="hover:text-red-500 cursor-pointer transition">
              FAQs
            </li>
            <li className="hover:text-red-500 cursor-pointer transition">
              Order Tracking
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <div className="p-2 rounded-full bg-zinc-900 hover:bg-red-500 transition cursor-pointer">
              <Facebook className="h-4 w-4 text-white" />
            </div>
            <div className="p-2 rounded-full bg-zinc-900 hover:bg-red-500 transition cursor-pointer">
              <Instagram className="h-4 w-4 text-white" />
            </div>
            <div className="p-2 rounded-full bg-zinc-900 hover:bg-red-500 transition cursor-pointer">
              <Twitter className="h-4 w-4 text-white" />
            </div>
            <div className="p-2 rounded-full bg-zinc-900 hover:bg-red-500 transition cursor-pointer">
              <Youtube className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm text-zinc-400 mb-4">
            Get exclusive deals and latest product drops straight to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 text-sm bg-zinc-900 border border-zinc-700 text-white outline-none focus:ring-2 focus:ring-red-500 rounded-md"
            />
            <button className="bg-red-500 hover:bg-red-600 text-black px-5 py-2 text-sm font-semibold rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 text-center text-sm text-zinc-500 py-4">
        © {new Date().getFullYear()} ElectraZone. All rights reserved.
      </div>
    </footer>
  );
}
