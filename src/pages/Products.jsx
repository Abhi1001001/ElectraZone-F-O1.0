import FilterSidebar from "@/components/FilterSideBar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// const products = [
//   {
//     id: 1,
//     productName: "Wireless Headphones",
//     productDescription: "Noise cancelling, 30h battery life",
//     productPrice: 3499,
//     productCategory: "Electronics",
//     productBrand: "SoundPro",
//     productImage:
//       "https://images.unsplash.com/photo-1518441902113-fcda83e78e6b",
//     rating: 4.6,
//   },
//   {
//     id: 2,
//     productName: "Smartphone 5G",
//     productDescription: "Fast performance, stunning camera",
//     productPrice: 24999,
//     productCategory: "Mobiles",
//     productBrand: "TechMax",
//     productImage:
//       "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     rating: 4.5,
//   },
//   {
//     id: 3,
//     productName: "Gaming Laptop",
//     productDescription: "RTX graphics, ultra smooth gameplay",
//     productPrice: 74999,
//     productCategory: "Computers",
//     productBrand: "GameX",
//     productImage:
//       "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
//     rating: 4.7,
//   },
//   {
//     id: 4,
//     productName: "Smart Watch",
//     productDescription: "Fitness tracking & notifications",
//     productPrice: 4999,
//     productCategory: "Wearables",
//     productBrand: "FitPro",
//     productImage:
//       "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
//     rating: 4.4,
//   },
// ];
export default function Products() {
  const products = useSelector((state) => state.products.products);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    price: [0, 100000],
    rating: null,
  });
  const [sortOrder, setSortOrder] = useState("");

  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;
  // const loading = true;

  const getAllProducts = async () => {
    try {
      setLoading(true);
      console.log("getAllProducts api called");
      const res = await axios.get(`${API_URL}/api/v1/products/getallproducts`);

      if (res.data.success) {
        console.log("product from product page", res.data.products);
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("product from store", products);
  console.log("all products", allProducts);

  useEffect(() => {
    const filteredProducts = allProducts.filter((p) => {
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(p.productCategory);

      const matchBrand =
        filters.brands.length === 0 || filters.brands.includes(p.productBrand);

      const matchPrice =
        p.productPrice >= filters.price[0] &&
        p.productPrice <= filters.price[1];

      // const matchRating = !filters.rating || p.rating >= filters.rating;

      return matchCategory && matchBrand && matchPrice;
    });
    console.log(sortOrder);

    if (sortOrder === "lowToHigh") {
      filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
    }
    if (sortOrder === "highToLow") {
      filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
    }
    dispatch(setProducts(filteredProducts));
  }, [filters, sortOrder]);

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <section className="bg-zinc-900">
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-4 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="md:text-3xl text-2xl font-bold text-red-500">
          Featured Products
        </h2>

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-32 md:max-w-48 bg-black border-gray-700 text-white focus:ring-red-500 focus:border-red-500">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent className="bg-black border-gray-700 text-white">
            <SelectGroup>
              <SelectLabel className="text-gray-400">Sort</SelectLabel>
              <SelectItem value="lowToHigh" className="hover:bg-red-600/20">
                Price Low to High
              </SelectItem>
              <SelectItem value="highToLow" className="hover:bg-red-600/20">
                Price High to Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex md:flex-row flex-col justify-start items-start md:gap-6 gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            allProducts={allProducts}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>

        {/* Products */}
        {loading ? (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-2 text-center">
            <p className="md:text-2xl text-lg font-semibold text-red-500">
              Our server is starting up...
            </p>
            <p className="text-gray-400">
              Thanks for your patience, this usually takes a few seconds.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-fit w-full">
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loading={loading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </section>
  );
}
