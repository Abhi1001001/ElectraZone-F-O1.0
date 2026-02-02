import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import axios from "axios";

export default function ProductCard({ product, loading }) {
  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productImage,
  } = product;

  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("token");

 const handleAddToCart = async (productId) => {

  try {
    const res = await axios.post(
      "http://localhost:4000/api/v1/cart/add",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
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
      <Card className="group rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
        {/* Image */}
        {loading ? (
          <Skeleton className="aspect-video w-11/12 m-auto" />
        ) : (
          <div className="relative bg-muted h-56 flex items-center justify-center overflow-hidden">
            <img
              src={productImage[0].url}
              alt={productName}
              className="h-full object-contain group-hover:scale-110 transition"
            />
            <Badge className="absolute top-3 left-3">{productCategory}</Badge>
          </div>
        )}

        {/* Content */}
        <CardContent className="p-4 space-y-3">
          {loading ? (
            <Skeleton className="h-4 w-2/3" />
          ) : (
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">
                {productName}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {productDescription}
              </p>
            </div>
          )}

          {/* Rating */}
          {/* <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={
                        i < Math.round(product.rating) ? "currentColor" : "none"
                      }
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {product.rating}
                  </span>
                </div> */}

          {/* Price + Action */}
          <div className="flex items-center justify-between pt-2">
            {loading ? (
              <Skeleton className="h-4 w-1/3" />
            ) : (
              <p className="text-xl font-bold text-primary">₹{productPrice}</p>
            )}
            {loading ? (
              <Skeleton className="h-4 w-1/3" />
            ) : (
              <Button
                onClick={() => handleAddToCart(product._id)}
                size="sm"
                className="gap-2"
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
