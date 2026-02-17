import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Thumbs } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

export default function ProductDetails() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const accessToken = localStorage.getItem("token");

  const handleAddToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${API_URL}/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log("Response:", res);
      toast.success(res.data.message);
      dispatch(setCart(res.data.cart));
    } catch (error) {
      console.log("Error:", error.response || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/products/getproduct/${productId}`,
        );
        setProduct(res.data.product);
        console.log(res.data.product);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!product) return <p className="text-white p-6">Product not found</p>;

  return (
    <section className="bg-black md:h-[92vh]">
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 text-white rounded-xl">
      {/* Left: Image Gallery */}
      <div className="space-y-4">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="rounded-xl border border-red-600 bg-zinc-950"
        >
          {product.productImage.map((img) => (
            <SwiperSlide key={img._id}>
              <img
                src={img.url}
                alt={product.productName}
                className="w-full h-[420px] object-contain p-6"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={12}
          className="mt-2"
        >
          {product.productImage.map((img) => (
            <SwiperSlide key={img._id}>
              <img
                src={img.url}
                alt="thumb"
                className="h-20 w-full object-contain border border-zinc-700 rounded-md cursor-pointer hover:border-red-500 p-2 bg-zinc-900"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right: Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold leading-tight text-white">
            {product.productName}
          </h1>
          <div className="flex gap-2 mt-3">
            <Badge className="bg-red-600 text-white">
              {product.productBrand}
            </Badge>
            <Badge className="border border-red-600 text-red-500 bg-transparent">
              {product.productCategory}
            </Badge>
          </div>
        </div>

        <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
          {product.productDescription}
        </p>

        <div className="text-3xl font-bold text-red-500">
          ₹{product.productPrice.toLocaleString()}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => handleAddToCart(product._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 rounded-xl text-lg shadow-lg shadow-red-600/20"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
    </section>
  );
}
