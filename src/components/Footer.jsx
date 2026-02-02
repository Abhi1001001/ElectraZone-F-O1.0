import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0b1220] to-[#111827] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-pink-500 font-bold text-xl">
            <span>🛒</span>
            ElectraZone
          </div>
          <p className="text-sm text-gray-400">
            Powering Your World with the Best in Electronics.
          </p>
          <div className="text-sm space-y-1 text-gray-400">
            <p>123 Electronics St, Style City, NY 10001</p>
            <p>Email: support@electrazone.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-white font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">
              Shipping & Returns
            </li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Order Tracking</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition cursor-pointer">
              <Facebook className="h-4 w-4 text-white" />
            </div>
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition cursor-pointer">
              <Instagram className="h-4 w-4 text-white" />
            </div>
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition cursor-pointer">
              <Twitter className="h-4 w-4 text-white" />
            </div>
            <div className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition cursor-pointer">
              <Youtube className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-4">Stay in the Loop</h4>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get special offers, free giveaways, and more.
          </p>
          <div className="flex flex-col gap-2 justify-center items-end rounded-md">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 text-sm bg-[#0f172a] border-2 border-gray-600 text-white outline-none focus:ring-2 focus:ring-pink-500 rounded-l-md"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center text-sm text-gray-400 py-4">
        © {new Date().getFullYear()} ElectraZone. All rights reserved.
      </div>
    </footer>
  );
}
