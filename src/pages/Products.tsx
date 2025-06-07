
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Search, ShoppingCart, Zap, Battery, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: "Solar Panel X200",
      description: "High-efficiency monocrystalline solar panel with 22% efficiency rating",
      price: 250,
      rating: 4.8,
      image: "/placeholder.svg",
      category: "panels",
      icon: Sun,
      specs: "300W, 25-year warranty"
    },
    {
      id: 2,
      name: "Solar Battery Y500",
      description: "Reliable lithium-ion battery system for 24-hour backup power",
      price: 1500,
      rating: 4.7,
      image: "/placeholder.svg",
      category: "batteries",
      icon: Battery,
      specs: "10kWh capacity, 10-year warranty"
    },
    {
      id: 3,
      name: "Inverter Z100",
      description: "Smart inverter with 95% efficiency and grid-tie capabilities",
      price: 800,
      rating: 4.9,
      image: "/placeholder.svg",
      category: "inverters",
      icon: Zap,
      specs: "5kW, Wi-Fi monitoring included"
    },
    {
      id: 4,
      name: "Premium Solar Panel Pro",
      description: "Top-tier bifacial solar panels for maximum energy generation",
      price: 350,
      rating: 5.0,
      image: "/placeholder.svg",
      category: "panels",
      icon: Sun,
      specs: "400W, 30-year warranty"
    },
    {
      id: 5,
      name: "Home Battery System",
      description: "Complete home energy storage solution with smart management",
      price: 2200,
      rating: 4.6,
      image: "/placeholder.svg",
      category: "batteries",
      icon: Battery,
      specs: "15kWh capacity, App control"
    },
    {
      id: 6,
      name: "Micro Inverter Kit",
      description: "Individual panel optimization with micro inverter technology",
      price: 150,
      rating: 4.8,
      image: "/placeholder.svg",
      category: "inverters",
      icon: Zap,
      specs: "300W per unit, 25-year warranty"
    }
  ];

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart!",
      description: `${productName} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Solar Products
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of high-quality solar products from trusted manufacturers.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 glass-effect">
                <CardHeader>
                  <div className="w-full h-48 bg-secondary/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/50 transition-colors">
                    <product.icon className="h-16 w-16 text-primary" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {product.description}
                  </CardDescription>
                  <div className="text-xs text-muted-foreground mt-2">
                    {product.specs}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-primary">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>
                  <Button 
                    className="w-full solar-gradient text-white group-hover:scale-105 transition-transform"
                    onClick={() => handleAddToCart(product.name)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Sun className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
