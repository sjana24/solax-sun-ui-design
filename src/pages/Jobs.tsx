
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, MapPin, Calendar, DollarSign, Briefcase, Building, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { toast } = useToast();

  const jobs = [
    {
      id: 1,
      title: "Solar Installation Technician",
      company: "SolarTech Pro",
      location: "California, USA",
      type: "Full-time",
      experience: "2+ years",
      salary: "$45,000 - $65,000",
      posted: "2024-01-15",
      description: "Install residential and commercial solar panel systems. Must have electrical experience and be comfortable working on rooftops.",
      requirements: ["NABCEP certification preferred", "Valid driver's license", "Physical ability to lift 50+ lbs"],
      benefits: ["Health insurance", "401k matching", "Paid training"],
      contact: {
        email: "jobs@solartechpro.com",
        phone: "+1 (555) 123-4567"
      }
    },
    {
      id: 2,
      title: "Solar Sales Representative",
      company: "Green Energy Solutions",
      location: "Texas, USA",
      type: "Full-time",
      experience: "1+ years",
      salary: "$50,000 - $80,000 + Commission",
      posted: "2024-01-14",
      description: "Generate leads and close sales for residential solar systems. Experience in consultative sales preferred.",
      requirements: ["Sales experience", "Excellent communication skills", "Self-motivated"],
      benefits: ["Uncapped commission", "Company car", "Flexible schedule"],
      contact: {
        email: "careers@greenenergy.com",
        phone: "+1 (555) 234-5678"
      }
    },
    {
      id: 3,
      title: "Solar System Designer",
      company: "Enterprise Solar",
      location: "New York, USA",
      type: "Full-time",
      experience: "3+ years",
      salary: "$70,000 - $90,000",
      posted: "2024-01-13",
      description: "Design commercial solar systems using CAD software and perform site assessments. Engineering background required.",
      requirements: ["Engineering degree", "AutoCAD proficiency", "Solar design experience"],
      benefits: ["Remote work options", "Professional development", "Stock options"],
      contact: {
        email: "engineering@enterprisesolar.com",
        phone: "+1 (555) 345-6789"
      }
    },
    {
      id: 4,
      title: "Solar Project Manager",
      company: "Power Storage Pro",
      location: "Florida, USA",
      type: "Full-time",
      experience: "5+ years",
      salary: "$80,000 - $110,000",
      posted: "2024-01-12",
      description: "Manage multiple solar installation projects from conception to completion. PMP certification preferred.",
      requirements: ["Project management experience", "PMP certification preferred", "Solar industry knowledge"],
      benefits: ["Leadership role", "Bonus opportunities", "Company vehicle"],
      contact: {
        email: "pm@powerpro.com",
        phone: "+1 (555) 456-7890"
      }
    },
    {
      id: 5,
      title: "Solar Energy Consultant",
      company: "Solar Experts Inc",
      location: "Arizona, USA",
      type: "Contract",
      experience: "3+ years",
      salary: "$60 - $100 per hour",
      posted: "2024-01-11",
      description: "Provide expert consultation on solar energy systems for residential and commercial clients.",
      requirements: ["NABCEP certification", "Consulting experience", "Technical expertise"],
      benefits: ["Flexible hours", "High hourly rate", "Remote work"],
      contact: {
        email: "consulting@solarinc.com",
        phone: "+1 (555) 567-8901"
      }
    },
    {
      id: 6,
      title: "Solar Operations & Maintenance Specialist",
      company: "Efficiency First",
      location: "Colorado, USA",
      type: "Full-time",
      experience: "2+ years",
      salary: "$50,000 - $70,000",
      posted: "2024-01-10",
      description: "Monitor and maintain solar installations to ensure optimal performance and troubleshoot issues.",
      requirements: ["Electrical background", "Problem-solving skills", "Field service experience"],
      benefits: ["Travel opportunities", "Technical training", "Career advancement"],
      contact: {
        email: "operations@efficiencyfirst.com",
        phone: "+1 (555) 678-9012"
      }
    }
  ];

  const locations = ["all", "California, USA", "Texas, USA", "New York, USA", "Florida, USA", "Arizona, USA", "Colorado, USA"];
  const types = ["all", "Full-time", "Part-time", "Contract", "Internship"];

  const filteredJobs = jobs
    .filter(job => 
      (locationFilter === "all" || job.location === locationFilter) &&
      (typeFilter === "all" || job.type === typeFilter) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
       job.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleApply = (jobTitle: string, company: string) => {
    toast({
      title: "Application Submitted!",
      description: `Your application for ${jobTitle} at ${company} has been submitted.`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Solar Energy Jobs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover exciting career opportunities in the growing solar energy industry.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies, or keywords..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Jobs List */}
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-102 border-0 glass-effect">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {job.type}
                        </Badge>
                        <Badge variant="outline">
                          {job.experience}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Building className="h-4 w-4" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Posted {formatDate(job.posted)}</span>
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground mb-4">
                        {job.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Benefits</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Contact</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{job.contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{job.contact.phone}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 solar-gradient text-white group-hover:scale-105 transition-transform"
                        onClick={() => handleApply(job.title, job.company)}
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
