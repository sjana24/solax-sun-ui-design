
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Calendar, User, ArrowRight, BookOpen } from "lucide-react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Solar Energy: 2024 Trends and Innovations",
      excerpt: "Discover the latest technological advances and market trends shaping the solar industry this year.",
      author: "Dr. Emily Carter",
      date: "2024-01-15",
      category: "Technology",
      readTime: "5 min read",
      image: "/placeholder.svg",
      tags: ["Innovation", "Technology", "Trends"]
    },
    {
      id: 2,
      title: "How to Calculate Solar ROI for Your Home",
      excerpt: "A comprehensive guide to understanding the financial benefits and return on investment for residential solar systems.",
      author: "Michael Johnson",
      date: "2024-01-12",
      category: "Finance",
      readTime: "7 min read",
      image: "/placeholder.svg",
      tags: ["ROI", "Finance", "Residential"]
    },
    {
      id: 3,
      title: "Battery Storage Systems: Complete Buyer's Guide",
      excerpt: "Everything you need to know about home battery storage systems, from types to installation considerations.",
      author: "Sarah Green",
      date: "2024-01-10",
      category: "Technology",
      readTime: "8 min read",
      image: "/placeholder.svg",
      tags: ["Battery", "Storage", "Guide"]
    },
    {
      id: 4,
      title: "Solar Panel Maintenance: Best Practices for Maximum Efficiency",
      excerpt: "Learn how to maintain your solar panels properly to ensure optimal performance and longevity.",
      author: "David Wilson",
      date: "2024-01-08",
      category: "Maintenance",
      readTime: "6 min read",
      image: "/placeholder.svg",
      tags: ["Maintenance", "Efficiency", "Tips"]
    },
    {
      id: 5,
      title: "Commercial Solar: Benefits for Businesses of All Sizes",
      excerpt: "Explore how commercial solar installations can reduce operating costs and improve sustainability metrics.",
      author: "Lisa Rodriguez",
      date: "2024-01-05",
      category: "Commercial",
      readTime: "9 min read",
      image: "/placeholder.svg",
      tags: ["Commercial", "Business", "Sustainability"]
    },
    {
      id: 6,
      title: "Off-Grid Solar Systems: Complete Independence Guide",
      excerpt: "A detailed look at designing and implementing off-grid solar systems for remote locations and energy independence.",
      author: "John Solar",
      date: "2024-01-03",
      category: "Off-Grid",
      readTime: "10 min read",
      image: "/placeholder.svg",
      tags: ["Off-Grid", "Independence", "Remote"]
    }
  ];

  const categories = ["all", "Technology", "Finance", "Maintenance", "Commercial", "Off-Grid"];

  const filteredPosts = blogPosts
    .filter(post => 
      (categoryFilter === "all" || post.category === categoryFilter) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Solar Energy Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert insights, industry trends, and practical guides from solar energy professionals.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles, authors, or topics..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <Card className="mb-12 border-0 glass-effect overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-64 md:h-full bg-secondary/30 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <Badge className="mb-4">{filteredPosts[0].category}</Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-4">{filteredPosts[0].title}</h2>
                  <p className="text-muted-foreground mb-6 text-lg">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{filteredPosts[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(filteredPosts[0].date)}</span>
                      </div>
                      <span>{filteredPosts[0].readTime}</span>
                    </div>
                    <Button className="solar-gradient text-white">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 glass-effect">
                <CardHeader>
                  <div className="w-full h-48 bg-secondary/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/50 transition-colors">
                    <BookOpen className="h-12 w-12 text-primary" />
                  </div>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-colors">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
