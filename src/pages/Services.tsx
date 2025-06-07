
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Search, Calendar, Wrench, Home, Building, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const { toast } = useToast();

  const services = [
    {
      id: 1,
      name: "Solar Panel Installation",
      provider: "SolarTech Pro",
      description: "Professional residential and commercial solar panel installation with warranty",
      price: 100,
      priceUnit: "per panel",
      rating: 4.9,
      image: "/placeholder.svg",
      category: "installation",
      icon: Home,
      features: ["Free consultation", "25-year warranty", "Same-day installation"],
      phone: "+1 (555) 123-4567",
      email: "contact@solartechpro.com"
    },
    {
      id: 2,
      name: "System Maintenance",
      provider: "Green Energy Solutions",
      description: "Comprehensive solar system maintenance and performance optimization",
      price: 80,
      priceUnit: "per month",
      rating: 4.8,
      image: "/placeholder.svg",
      category: "maintenance",
      icon: Wrench,
      features: ["Monthly inspections", "Performance monitoring", "24/7 support"],
      phone: "+1 (555) 234-5678",
      email: "service@greenenergy.com"
    },
    {
      id: 3,
      name: "Home Solar Consultation",
      provider: "Solar Experts Inc",
      description: "Expert analysis and recommendations for residential solar solutions",
      price: 0,
      priceUnit: "consultation",
      rating: 5.0,
      image: "/placeholder.svg",
      category: "consultation",
      icon: Home,
      features: ["Energy assessment", "Custom design", "ROI analysis"],
      phone: "+1 (555) 345-6789",
      email: "experts@solarinc.com"
    },
    {
      id: 4,
      name: "Commercial Solar Design",
      provider: "Enterprise Solar",
      description: "Large-scale commercial solar system design and implementation",
      price: 500,
      priceUnit: "per project",
      rating: 4.7,
      image: "/placeholder.svg",
      category: "commercial",
      icon: Building,
      features: ["Custom engineering", "Permit handling", "Grid integration"],
      phone: "+1 (555) 456-7890",
      email: "commercial@enterprisesolar.com"
    },
    {
      id: 5,
      name: "Battery Storage Setup",
      provider: "Power Storage Pro",
      description: "Professional installation of home and commercial battery storage systems",
      price: 200,
      priceUnit: "per kWh",
      rating: 4.6,
      image: "/placeholder.svg",
      category: "storage",
      icon: Wrench,
      features: ["Smart integration", "Backup power", "App monitoring"],
      phone: "+1 (555) 567-8901",
      email: "storage@powerpro.com"
    },
    {
      id: 6,
      name: "Energy Audit Service",
      provider: "Efficiency First",
      description: "Comprehensive energy audit to optimize solar system performance",
      price: 150,
      priceUnit: "per audit",
      rating: 4.8,
      image: "/placeholder.svg",
      category: "audit",
      icon: Home,
      features: ["Detailed report", "Optimization tips", "Follow-up support"],
      phone: "+1 (555) 678-9012",
      email: "audit@efficiencyfirst.com"
    }
  ];

  const filteredServices = services
    .filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "provider":
          return a.provider.localeCompare(b.provider);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleBookService = (serviceName: string, provider: string) => {
    toast({
      title: "Service Booking Request Sent!",
      description: `Your request for ${serviceName} from ${provider} has been submitted.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Solar Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with certified solar professionals for installation, maintenance, and consultation services.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services or providers..."
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
                <SelectItem value="name">Service Name</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 glass-effect">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <p className="text-sm text-muted-foreground font-medium">{service.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground mb-4">
                    {service.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {service.price === 0 ? "Free" : `$${service.price}`}
                        </div>
                        <div className="text-sm text-muted-foreground">{service.priceUnit}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{service.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{service.email}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full solar-gradient text-white group-hover:scale-105 transition-transform"
                      onClick={() => handleBookService(service.name, service.provider)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No services found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
