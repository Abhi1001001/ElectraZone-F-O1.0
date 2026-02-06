import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch } from "react-redux";
import { setCollection } from "@/redux/productSlice";
import { Link, useNavigate } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Headphones",
    image: "./images/headphones.png",
  },
  {
    id: 2,
    title: "Smart Watches",
    image: "./images/smartwatches.png",
  },
  {
    id: 3,
    title: "Speakers",
    image: "./images/speakers.png",
  },
  {
    id: 4,
    title: "Laptops",
    image: "./images/laptops.png",
  },
  {
    id: 5,
    title: "Mobiles",
    image: "./images/mobiles.png",
  },
  {
    id: 6,
    title: "Accessories",
    image: "./images/accessories.png",
  },
];

export default function ExploreCollections({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCollectionClick = (selectedCategory) => {
    const filteredProducts = products.filter(
      (p) => p.productCategory.toLowerCase() === selectedCategory.toLowerCase(),
    );
    dispatch(setCollection(filteredProducts));
    navigate(`/collections/${selectedCategory.toLowerCase()}`);
  };
  return (
    <section className="w-full py-14 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Explore the Collections
          </h2>
          <Link to="/products" className="flex items-center gap-1 text-sm font-semibold text-red-500 hover:text-red-400">
            View all →
          </Link>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {collections.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                onClick={() => handleCollectionClick(item.title)}
                className="group rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500 transition p-5 flex flex-col items-center cursor-pointer"
              >
                <div className="h-28 flex items-center justify-center mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-sm font-semibold text-white group-hover:text-red-500 transition">
                  {item.title}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
