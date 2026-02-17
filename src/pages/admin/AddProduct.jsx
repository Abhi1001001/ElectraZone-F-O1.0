import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, ImagePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productBrand: "",
    files: [],
  });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, files: Array.from(e.target.files) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("productName", formData.productName);
    payload.append("productDescription", formData.productDescription);
    payload.append("productPrice", formData.productPrice);
    payload.append("productCategory", formData.productCategory);
    payload.append("productBrand", formData.productBrand);

    
    if (formData.files.length === 0)
      return toast.error("Please select at least one image");
    formData.files.forEach((file) => payload.append("files", file));
console.log("Submitting:", Object.fromEntries(payload));
    try {
      setLoading(true);
      const res = axios.post(`${API_URL}/products/add`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message);
        setFormData({
          productName: "",
          productDescription: "",
          productPrice: "",
          productCategory: "",
          productBrand: "",
          files: [],
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black border border-red-600/40 shadow-xl rounded-2xl">
          <CardHeader className="border-b border-red-600/40">
            <CardTitle className="text-2xl text-red-500">
              Add New Product
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Product Name</Label>
                <Input
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="bg-zinc-900 border-zinc-700 text-white focus:border-red-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Product Description</Label>
                <Textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter product description"
                  className="bg-zinc-900 border-zinc-700 text-white focus:border-red-500"
                />
              </div>

              {/* Price + Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Price (₹)</Label>
                  <Input
                    name="productPrice"
                    type="number"
                    value={formData.productPrice}
                    onChange={handleChange}
                    placeholder="0"
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Category</Label>
                  <Input
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                    placeholder="Laptop, Accessories..."
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-red-500"
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Brand</Label>
                <Input
                  name="productBrand"
                  value={formData.productBrand}
                  onChange={handleChange}
                  placeholder="HP, Acer, Boat..."
                  className="bg-zinc-900 border-zinc-700 text-white focus:border-red-500"
                />
              </div>

              {/* Images Upload */}
              <div className="space-y-3">
                <Label className="text-zinc-300">Product Images</Label>
                <div className="border-2 border-dashed border-red-600/40 rounded-xl p-6 text-center bg-zinc-900 hover:border-red-500 transition">
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <ImagePlus className="h-8 w-8 text-red-500" />
                    <span className="text-sm text-zinc-400">
                      Click to upload images (multiple allowed)
                    </span>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preview */}
                {formData.files.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-3">
                    {formData.files.map((file, i) => (
                      <div
                        key={i}
                        className="h-20 rounded-lg overflow-hidden border border-zinc-700 bg-black"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-xl shadow-md shadow-red-600/30"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
