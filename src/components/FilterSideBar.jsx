import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Star, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const ratings = [5, 4, 3, 2];

export default function FilterSidebar({ filters, setFilters, allProducts }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = allProducts.map((p) => p.productCategory);
  const uniqueCategory = ["All", ...new Set(categories)];

  const brands = allProducts.map((p) => p.productBrand);
  const uniqueBrands = ["All", ...new Set(brands)];

  const handleCheckbox = (type, value) => {
    setFilters((prev) => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value)
          ? list.filter((v) => v !== value)
          : [...list, value],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      price: [0, 100000],
      rating: null,
    });
  };

  const SidebarContent = (
    <div className="space-y-6 w-full text-white md:overflow-y-auto overflow-y-scroll">
      {/* Header */}
      <div className="flex items-center justify-between mr-12 lg:mr-0 py-2">
        <h3 className="text-lg font-semibold text-red-500">Filters</h3>
        <Button
          size="sm"
          onClick={clearFilters}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Clear
        </Button>
      </div>

      <Separator className="bg-gray-700" />

      {/* Category */}
      <div className="space-y-3">
        <p className="font-medium text-gray-300">Category</p>
        {uniqueCategory.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer"
          >
            <Checkbox
              checked={filters.categories.includes(cat)}
              onCheckedChange={() => handleCheckbox("categories", cat)}
              className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
            />
            {cat}
          </label>
        ))}
      </div>

      <Separator className="bg-gray-700" />

      {/* Brand */}
      <div className="space-y-3">
        <p className="font-medium text-gray-300">Brand</p>
        {uniqueBrands.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white cursor-pointer"
          >
            <Checkbox
              checked={filters.brands.includes(brand)}
              onCheckedChange={() => handleCheckbox("brands", brand)}
              className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
            />
            {brand}
          </label>
        ))}
      </div>

      <Separator className="bg-gray-700" />

      {/* Price */}
      <div className="space-y-3">
        <p className="font-medium text-gray-300">Price Range</p>
        <Slider
          min={0}
          max={100000}
          step={500}
          value={filters.price}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, price: value }))
          }
          className="[&_[role=slider]]:bg-red-600 [&_[role=slider]]:border-red-600"
        />
        <div className="flex justify-between text-sm text-gray-400">
          <span>₹{filters.price[0]}</span>
          <span>₹{filters.price[1]}</span>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Rating */}
      <div className="space-y-3">
        <p className="font-medium text-gray-300">Customer Rating</p>
        {ratings.map((r) => (
          <button
            key={r}
            onClick={() => setFilters((prev) => ({ ...prev, rating: r }))}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded-md border transition ${
              filters.rating === r
                ? "bg-red-600 border-red-600 text-white"
                : "border-gray-700 text-gray-400 hover:bg-red-600/20 hover:text-white"
            }`}
          >
            {Array.from({ length: r }).map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
            <span>& up</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Card className="hidden md:block sticky top-20 h-fit rounded-2xl shadow-xl bg-black border border-gray-800">
        <CardContent className="p-5 lg:w-64 md:w-52">
          {SidebarContent}
        </CardContent>
      </Card>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full gap-2 bg-black border-gray-700 text-white hover:bg-red-600 hover:text-white"
            >
              <Filter size={18} /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 px-6 bg-black border-r border-gray-800 text-white"
          >
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
