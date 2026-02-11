import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product, loading }) {
  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productImage,
  } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAddToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/cart/add`,
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

  return (
    <>
      <Card onClick={() => navigate(`/product/${product._id}`)} className="group rounded-2xl overflow-hidden bg-black text-white shadow-lg hover:shadow-red-500/30 transition py-0 gap-0 border border-red-600/40">
        {/* Image */}
        {loading ? (
          <Skeleton className="aspect-video w-11/12 m-auto bg-gray-800" />
        ) : (
          <div className="relative bg-gradient-to-br from-black to-gray-900 flex items-center justify-center overflow-hidden">
            <Link to={`/product/${product._id}`}>
            <img
              src={productImage[0].url}
              alt={productName}
              className="h-40 object-contain group-hover:scale-110 transition"
            />
            </Link>
            <Badge className="absolute top-3 left-3 bg-red-600 text-white">
              {productCategory}
            </Badge>
          </div>
        )}

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          {loading ? (
            <Skeleton className="h-4 w-2/3 bg-gray-800" />
          ) : (
            <div>
              <h3 className="font-semibold md:text-lg text-md line-clamp-1">
                {productName}
              </h3>
              <p className="md:text-sm text-xs text-gray-400 line-clamp-2">
                {productDescription}
              </p>
            </div>
          )}

          {/* Price + Action */}
          <div className="flex items-center justify-between pt-2">
            {loading ? (
              <Skeleton className="h-4 w-1/3 bg-gray-800" />
            ) : (
              <p className="md:text-xl text-md font-bold text-red-500">
                ₹{productPrice}
              </p>
            )}
            {loading ? (
              <Skeleton className="h-4 w-1/3 bg-gray-800" />
            ) : (
              <Button
                onClick={() => handleAddToCart(product._id)}
                size="sm"
                className="gap-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                <ShoppingCart size={16} /> Add
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
