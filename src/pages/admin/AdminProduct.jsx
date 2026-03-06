import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pencil,
  Trash2,
  Search,
  ImagePlus,
  Loader2,
  Upload,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";

// const dummyProducts = [
//   {
//     _id: "1",
//     productName: "iPhone Air 256 GB Light Gold",
//     productPrice: 119900,
//     image:
//       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-gold",
//   },
//   {
//     _id: "2",
//     productName: "iPhone 17 Pro Max Deep Blue",
//     productPrice: 149900,
//     image:
//       "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-blue",
//   },
//   {
//     _id: "3",
//     productName: "boAt Rockerz 421 Headphones",
//     productPrice: 1299,
//     image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SX679_.jpg",
//   },
// ];

export default function AdminProduct() {
  const products = useSelector((state) => state.products.products);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  // const [formData, setFormData] = useState(null);
  const [open, setOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  // Sorting + Filtering
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      p.productName.toLowerCase().includes(search.toLowerCase()),
    );

    if (sort === "low") {
      filtered = filtered.sort((a, b) => a.productPrice - b.productPrice);
    }

    if (sort === "high") {
      filtered = filtered.sort((a, b) => b.productPrice - a.productPrice);
    }

    return [...filtered];
  }, [products, search, sort]);

  // const handleDelete = (id) => {
  //   setProducts(products.filter((p) => p._id !== id));
  // };

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    formData.append("productDescription", editProduct.productDescription);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("productCategory", editProduct.productCategory);
    formData.append("productBrand", editProduct.productBrand);

    // add exiting images and public Id's
    const existingImages = editProduct.productImage
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    // add new files
    editProduct.productImage
      .filter((img) => img instanceof File)
      .forEach((img) => formData.append("files", img));

    try {
      const res = await axios.put(
        `${API_URL}/products/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(editProduct._id === res.data.product._id);
        const updatedProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );
        dispatch(setProducts(updatedProducts));
        setEditProduct(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
    }
    setLoading(false);

    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pl-72 py-6 pr-6">
      <h1 className="text-2xl font-semibold text-red-500 mb-6">
        Products Management
      </h1>
      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-zinc-900 border-zinc-700 focus:border-red-500"
          />
        </div>

        <Select onValueChange={(value) => setSort(value)}>
          <SelectTrigger className="w-full md:w-52 bg-zinc-900 border-zinc-700 focus:border-red-500">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white border-zinc-700">
            <SelectItem value="low">Price: Low to High</SelectItem>
            <SelectItem value="high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      <div className="space-y-5">
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            className="bg-zinc-900 border border-zinc-800 hover:border-red-600 transition rounded-2xl text-gray-400"
          >
            <CardContent className="flex items-center justify-between p-5 gap-4">
              <div className="flex items-center gap-5">
                <img
                  src={product.productImage[0].url}
                  alt={product.productName}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div>
                  <h2 className="font-medium text-lg">{product.productName}</h2>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-lg font-semibold">
                  ₹{product.productPrice}
                </span>

                <div className="flex gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-600 hover:text-white"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil size={18} />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-950 border border-red-600 text-white">
          <DialogHeader>
            <DialogTitle className="text-red-500">Edit Product</DialogTitle>
          </DialogHeader>

          {editProduct && (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Product Name</Label>
                <Input
                  name="productName"
                  value={editProduct.productName}
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
                  value={editProduct.productDescription}
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
                    value={editProduct.productPrice}
                    onChange={handleChange}
                    placeholder="0"
                    className="bg-zinc-900 border-zinc-700 text-white focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300">Category</Label>
                  <Input
                    name="productCategory"
                    value={editProduct.productCategory}
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
                  value={editProduct.productBrand}
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
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preview */}
                {editProduct.productImage.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-3">
                    {editProduct.productImage.map((file, i) => (
                      <div
                        key={i}
                        className="h-20 rounded-lg overflow-hidden border border-zinc-700 bg-black"
                      >
                        <img
                          src={file.url}
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
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-xl shadow-md shadow-red-600/30"
                >
                  {loading ? (
                    <div className="flex gap-2 justify-end">
                      <Loader2 className="animate-spin" />
                      loading
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <Upload className="mr-2 h-4 w-4" />
                      Add Product
                    </div>
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
