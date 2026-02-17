import ElectronicsArrivals from "@/components/ElectronicsArrivals";
import ExploreCollections from "@/components/ExploreCollections";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      setLoading(true);
      console.log("getAllProducts api called");
      const res = await axios.get(`${API_URL}/products/getallproducts`);

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

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Hero />
      <Features />
      <ElectronicsArrivals
      products={allProducts}
      loading={loading}
      />
      <ExploreCollections
      products={allProducts}
      loading={loading}
      />
    </>
  );
}
