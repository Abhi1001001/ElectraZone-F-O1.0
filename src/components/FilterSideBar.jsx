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
    <div className="space-y-6 w-full overflow-scroll">
      {/* Header */}
      <div className="flex items-center justify-between mr-12 py-2">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button size="sm" onClick={clearFilters}>
          Clear
        </Button>
      </div>

      <Separator />

      {/* Category */}
      <div className="space-y-3">
        <p className="font-medium">Category</p>
        {uniqueCategory.map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <Checkbox
              checked={filters.categories.includes(cat)}
              onCheckedChange={() => handleCheckbox("categories", cat)}
            />
            <span className="text-sm">{cat}</span>
          </div>
        ))}
      </div>

      <Separator />

      {/* Brand */}
      <div className="space-y-3">
        <p className="font-medium">Brand</p>
        {uniqueBrands.map((brand) => (
          <div key={brand} className="flex items-center gap-2">
            <Checkbox
              checked={filters.brands.includes(brand)}
              onCheckedChange={() => handleCheckbox("brands", brand)}
            />
            <span className="text-sm">{brand}</span>
          </div>
        ))}
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-3">
        <p className="font-medium">Price Range</p>
        <Slider
          min={0}
          max={100000}
          step={500}
          value={filters.price}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, price: value }))
          }
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{filters.price[0]}</span>
          <span>₹{filters.price[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-3">
        <p className="font-medium">Customer Rating</p>
        {ratings.map((r) => (
          <button
            key={r}
            onClick={() => setFilters((prev) => ({ ...prev, rating: r }))}
            className={`flex items-center gap-1 text-sm px-3 py-1 rounded-md border transition ${
              filters.rating === r ? "bg-primary text-white" : "hover:bg-muted"
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
      <Card className="hidden md:block sticky top-20 h-fit rounded-2xl shadow">
        <CardContent className="p-5 lg:w-64 md:w-52">
          {SidebarContent}
        </CardContent>
      </Card>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <Filter size={18} /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 px-6">
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
