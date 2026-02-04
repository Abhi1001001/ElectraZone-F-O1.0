import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";


const slides = [
  {
    id: 1,
    tag: "Limited Time Offer",
    title: "Up to 30% Off on Smart Gadgets!",
    desc: "Upgrade your lifestyle with the latest smart devices. Grab top deals on headphones, wearables, and accessories before the offer ends.",
    img: "/images/banner-3.jpg",
    product: "Wireless Headphones",
    price: "₹3,499.00",
  },
  {
    id: 2,
    tag: "New Arrival",
    title: "Experience Power with the Latest Smartphones",
    desc: "Capture stunning photos, enjoy blazing-fast performance, and stay connected all day with next-gen smartphones.",
    img: "/images/banner-4.jpg",
    product: "5G Smartphone",
    price: "₹24,999.00",
  },
  {
    id: 3,
    tag: "Hot Deal",
    title: "Immersive Sound. Zero Distractions.",
    desc: "Feel every beat with noise-cancelling headphones designed for comfort, clarity, and all-day listening.",
    img: "/images/banner-2.jpg",
    product: "Noise Cancelling Earbuds",
    price: "₹2,999.00",
  },
  {
    id: 4,
    tag: "Trending Now",
    title: "Smarter Living Starts at Home",
    desc: "Control your lights, security, and appliances from anywhere with smart home devices built for convenience.",
    img: "/images/banner-6.jpg",
    product: "Smart Home Hub",
    price: "₹5,499.00",
  },
  {
    id: 5,
    tag: "Top Picks",
    title: "Work Faster with High-Performance Laptops",
    desc: "From work to play, enjoy powerful performance, sleek design, and long battery life with our latest laptops.",
    img: "/images/banner-5.jpg",
    product: "Ultra Slim Laptop",
    price: "₹54,990.00",
  },
];

export default function Hero() {
  return (
    <section className="w-full md:h-[80vh] bg-[#fafafa]">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id} className="flex items-center">
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-20 md:gap-10 gap-4">
              {/* Left Content */}
              <div className="md:space-y-6 space-y-2 md:mt-0 mt-2">
                <p className="md:text-sm text-xs font-semibold uppercase tracking-wide text-white bg-[#ef233c] w-max px-3 py-1 rounded-bl-xl rounded-tr-xl">
                  {item.tag}
                </p>

                <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {item.title}
                </h1>

                <p className="text-md text-gray-600 max-w-xl">{item.desc}</p>

                <div className="flex md:justify-self-start justify-between flex-wrap gap-4">
                  <Link to="/products" className="md:px-7 px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
                    Get Yours Now
                  </Link>
                  <Link to="/products" className="md:px-7 px-4 py-3 border border-black rounded-md hover:bg-black hover:text-white transition">
                    Discover More
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative flex justify-center items-center">
                <div className="absolute -z-10 h-full w-80 md:h-105 md:w-105 rounded-full bg-gray-100" />
                <img
                  src={item.img}
                  alt={item.product}
                  className="w-full h-full md:w-85 lg:w-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
