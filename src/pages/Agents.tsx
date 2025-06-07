
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Search, Phone, Mail, MapPin, Award, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const { toast } = useToast();

  const agents = [
    {
      id: 1,
      name: "John Solar",
      company: "SolarTech Pro",
      experience: "5 years",
      rating: 4.9,
      reviews: 127,
      specialties: ["Residential", "Commercial", "Battery Storage"],
      location: "California, USA",
      phone: "+1 (555) 123-4567",
      email: "john@solartechpro.com",
      description: "Certified solar installer with expertise in residential and commercial projects. Specializes in high-efficiency systems.",
      projects: 200,
      certifications: ["NABCEP Certified", "Tesla Powerwall Certified"]
    },
    {
      id: 2,
      name: "Sarah Green",
      company: "Green Energy Solutions",
      experience: "8 years",
      rating: 4.8,
      reviews: 89,
      specialties: ["Grid-Tie Systems", "Off-Grid", "Maintenance"],
      location: "Texas, USA",
      phone: "+1 (555) 234-5678",
      email: "sarah@greenenergy.com",
      description: "Expert in grid-tie and off-grid solar systems. Passionate about sustainable energy solutions for rural communities.",
      projects: 150,
      certifications: ["NABCEP Certified", "SolarEdge Certified"]
    },
    {
      id: 3,
      name: "Michael Chen",
      company: "Enterprise Solar",
      experience: "10 years",
      rating: 5.0,
      reviews: 156,
      specialties: ["Large Commercial", "Industrial", "Design"],
      location: "New York, USA",
      phone: "+1 (555) 345-6789",
      email: "michael@enterprisesolar.com",
      description: "Senior solar engineer specializing in large-scale commercial and industrial solar installations.",
      projects: 75,
      certifications: ["Professional Engineer", "NABCEP Certified", "PV System Inspector"]
    },
    {
      id: 4,
      name: "Lisa Rodriguez",
      company: "Power Storage Pro",
      experience: "6 years",
      rating: 4.7,
      reviews: 98,
      specialties: ["Battery Systems", "Energy Storage", "Smart Homes"],
      location: "Florida, USA",
      phone: "+1 (555) 456-7890",
      email: "lisa@powerpro.com",
      description: "Battery storage specialist with extensive experience in residential and commercial energy storage solutions.",
      projects: 180,
      certifications: ["Energy Storage Certified", "Smart Grid Professional"]
    },
    {
      id: 5,
      name: "David Johnson",
      company: "Solar Experts Inc",
      experience: "12 years",
      rating: 4.9,
      reviews: 203,
      specialties: ["Consultation", "System Design", "ROI Analysis"],
      location: "Arizona, USA",
      phone: "+1 (555) 567-8901",
      email: "david@solarinc.com",
      description: "Senior solar consultant with over a decade of experience in system design and financial analysis.",
      projects: 300,
      certifications: ["NABCEP Certified", "Solar Sales Professional", "Energy Auditor"]
    },
    {
      id: 6,
      name: "Amanda Wilson",
      company: "Efficiency First",
      experience: "7 years",
      rating: 4.8,
      reviews: 134,
      specialties: ["Energy Audits", "Efficiency Optimization", "Monitoring"],
      location: "Colorado, USA",
      phone: "+1 (555) 678-9012",
      email: "amanda@efficiencyfirst.com",
      description: "Energy efficiency expert focused on optimizing solar system performance and energy consumption.",
      projects: 220,
      certifications: ["Certified Energy Manager", "Building Performance Institute"]
    }
  ];

  const filteredAgents = agents
    .filter(agent => 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        case "rating":
          return b.rating - a.rating;
        case "projects":
          return b.projects - a.projects;
        case "location":
          return a.location.localeCompare(b.location);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handleContact = (agentName: string) => {
    toast({
      title: "Contact Request Sent!",
      description: `Your contact request to ${agentName} has been submitted.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Solar Agents
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with certified solar energy professionals and experienced agents in your area.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents, companies, or locations..."
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
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="projects">Most Projects</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 glass-effect">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl">{agent.name}</CardTitle>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-primary fill-current" />
                          <span className="text-sm font-medium">{agent.rating}</span>
                          <span className="text-xs text-muted-foreground">({agent.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium mb-2">{agent.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4" />
                          <span>{agent.experience} experience</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{agent.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardDescription className="text-muted-foreground mb-4">
                    {agent.description}
                  </CardDescription>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {agent.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Projects Completed:</span>
                      <span className="font-semibold text-primary">{agent.projects}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{agent.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{agent.email}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full solar-gradient text-white group-hover:scale-105 transition-transform"
                      onClick={() => handleContact(agent.name)}
                    >
                      Contact Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No agents found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Agents;
