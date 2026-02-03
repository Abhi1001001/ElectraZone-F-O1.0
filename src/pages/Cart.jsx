import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingBag, Tag } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function CartPage() {
  const cart = useSelector((state) => state.products.cart);

  const items = cart?.items || [];
  const dispatch = useDispatch();
  const subtotal = cart?.totalPrice || 0;
  const taxRate = 0.05;
  const tax = Math.round(subtotal * taxRate);
  const shipping = 0;

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const API = `${API_URL}/api/v1/cart`;
  const accessToken = localStorage.getItem("token");

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          productId,
        },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        console.log(res.data.cart);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const loadCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(0.1 * subtotal);
      setPromoError("");
    } else if (promoCode.toLowerCase() === "newuser") {
      setDiscount(0.15 * subtotal);
      setPromoError("");
    } else {
      setDiscount(0);
      setPromoError("Invalid promo code");
    }
  };
  const total = Math.max(subtotal + tax + shipping - discount, 0);

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag size={28} />
        <h1 className="md:text-3xl text-2xl font-bold">Your Cart</h1>
        <span className="text-muted-foreground">({items.length} items)</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-semibold mb-2">Your cart is empty</p>
          <p className="text-muted-foreground mb-4">
            Looks like you haven’t added anything yet.
          </p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const product = item.productId;
              return (
                <Card
                  key={item._id}
                  className="rounded-2xl shadow hover:shadow-lg transition"
                >
                  <CardContent className="p-5 flex flex-col sm:flex-row gap-5">
                    {/* Image */}
                    <div className="w-full sm:w-36 h-36 bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                      <img
                        src={product.productImage?.[0]?.url}
                        alt={product.productName}
                        className="h-full object-contain hover:scale-105 transition"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {product.productName}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {product.productBrand} • {product.productCategory}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-3">
                        {/* Quantity */}
                        <div className="flex items-center gap-3 border rounded-lg px-3 py-1">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId._id,
                                "decrease",
                              )
                            }
                            className="hover:text-primary"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId._id,
                                "increase",
                              )
                            }
                            className="hover:text-primary"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="text-lg font-bold text-primary">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(item.productId._id)}
                        className="flex items-center gap-2 text-sm text-red-500 hover:underline mt-2"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Checkout Summary */}
          <div className="sticky top-24 h-fit">
            <Card className="rounded-2xl shadow-lg">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-xl font-semibold">Order Summary</h3>

                {/* Promo Code */}
                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Tag size={16} /> Promo Code
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-red-500">{promoError}</p>
                  )}
                  {discount > 0 && (
                    <p className="text-xs text-green-600">
                      Promo applied! You saved ₹{Math.round(discount)}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{Math.round(discount)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{Math.round(total).toLocaleString()}</span>
                </div>

                <Button className="w-full mt-3">Proceed to Checkout</Button>

                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout • Easy returns • Fast delivery
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
