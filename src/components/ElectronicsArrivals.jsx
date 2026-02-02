import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function ElectronicsArrivals() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const handleAddToCart = async (productId) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover the latest electronics designed to upgrade your everyday
            life with performance, speed, and comfort.
          </p>
        </div>

        <Link to="/products" className="gap-2 w-fit">
          View all →
        </Link>
      </div>

      {/* Horizontal Scroll */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {products.map((product, index) => (
            <Card
              key={product._id}
              className="min-w-[260px] max-w-[260px] rounded-2xl shadow hover:shadow-xl transition group"
            >
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative bg-muted h-60 flex items-center justify-center overflow-hidden rounded-t-2xl">
                  <img
                    src={product.productImage?.[0]?.url}
                    alt={product.productName}
                    className="h-full object-contain group-hover:scale-110 transition"
                  />

                  {/* Badges */}
                  {index === 0 && (
                    <Badge className="absolute top-3 left-3 bg-blue-600">
                      New
                    </Badge>
                  )}
                  {index === products.length - 1 && (
                    <Badge className="absolute top-3 left-3 bg-red-600">
                      On Sale
                    </Badge>
                  )}

                  {/* Wishlist */}
                  <button className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow hover:bg-muted">
                    <Heart size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground capitalize">
                    {product.productBrand}
                  </p>

                  <h3 className="font-semibold text-[15px] leading-tight line-clamp-2">
                    {product.productName}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < 4 ? "currentColor" : "none"}
                      />
                    ))}
                    <span className="text-muted-foreground ml-1">4.3</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div>
                      <span className="font-bold text-lg">
                        ₹{product.productPrice.toLocaleString()}
                      </span>
                      <span className="text-sm line-through text-muted-foreground">
                        ₹{(product.productPrice + 1200).toLocaleString()}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product._id)}
                      size="sm"
                      className="gap-2"
                    >
                      <ShoppingCart size={16} /> Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
