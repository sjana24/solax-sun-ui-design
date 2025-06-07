
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, MessageSquare, User, Calendar, ThumbsUp, Reply, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "", category: "" });
  const { toast } = useToast();

  const forumPosts = [
    {
      id: 1,
      title: "Best solar panel angle for winter efficiency?",
      content: "I'm in Minnesota and wondering what the optimal tilt angle should be for my solar panels during winter months. Any experts have recommendations?",
      author: "SolarNewbie2024",
      date: "2024-01-15",
      category: "Installation",
      replies: 12,
      likes: 25,
      status: "solved",
      tags: ["Angle", "Winter", "Efficiency"]
    },
    {
      id: 2,
      title: "Tesla Powerwall vs. other battery options",
      content: "Looking to add battery storage to my existing solar system. Comparing Tesla Powerwall with Enphase and LG Chem options. Pros and cons?",
      author: "EnergyEnthusiast",
      date: "2024-01-14",
      category: "Storage",
      replies: 8,
      likes: 18,
      status: "active",
      tags: ["Battery", "Tesla", "Storage"]
    },
    {
      id: 3,
      title: "Solar panel cleaning frequency - how often?",
      content: "I installed my system 6 months ago. How often should I clean the panels? I live in a dusty area. What's the best cleaning method?",
      author: "CleanEnergy123",
      date: "2024-01-13",
      category: "Maintenance",
      replies: 15,
      likes: 31,
      status: "solved",
      tags: ["Cleaning", "Maintenance", "Frequency"]
    },
    {
      id: 4,
      title: "Net metering rates changing - what to expect?",
      content: "My utility company announced changes to net metering rates. How will this affect my solar savings? Should I add battery storage now?",
      author: "GridTiedSolar",
      date: "2024-01-12",
      category: "Finance",
      replies: 6,
      likes: 14,
      status: "active",
      tags: ["Net Metering", "Rates", "Policy"]
    },
    {
      id: 5,
      title: "Micro-inverters vs string inverters for shaded roof",
      content: "Part of my roof gets shaded by trees in the afternoon. Would micro-inverters be worth the extra cost compared to string inverters?",
      author: "ShadedRoof",
      date: "2024-01-11",
      category: "Technology",
      replies: 9,
      likes: 22,
      status: "active",
      tags: ["Inverters", "Shading", "Technology"]
    },
    {
      id: 6,
      title: "DIY solar installation - permit requirements",
      content: "Thinking about installing solar panels myself. What permits do I need? Any pitfalls to avoid? Looking for experiences from DIY installers.",
      author: "DIYSolarDave",
      date: "2024-01-10",
      category: "Installation",
      replies: 20,
      likes: 35,
      status: "active",
      tags: ["DIY", "Permits", "Installation"]
    }
  ];

  const categories = ["all", "Installation", "Storage", "Maintenance", "Finance", "Technology"];

  const filteredPosts = forumPosts
    .filter(post => 
      (categoryFilter === "all" || post.category === categoryFilter) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleNewQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Question Posted!",
      description: "Your question has been submitted to the community.",
    });
    setNewQuestion({ title: "", content: "", category: "" });
    setShowNewQuestion(false);
  };

  const handleLike = (postTitle: string) => {
    toast({
      title: "Thank you!",
      description: `You liked: ${postTitle}`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Q&A Forum
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get answers from solar experts and community members. Share your knowledge and help others.
            </p>
          </div>

          {/* Search, Filter and New Question */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions, topics, or users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-48">
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
            <Button 
              className="solar-gradient text-white"
              onClick={() => setShowNewQuestion(!showNewQuestion)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Ask Question
            </Button>
          </div>

          {/* New Question Form */}
          {showNewQuestion && (
            <Card className="mb-8 border-0 glass-effect">
              <CardHeader>
                <CardTitle>Ask a New Question</CardTitle>
                <CardDescription>Share your solar energy question with the community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewQuestion} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Question title..."
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Select value={newQuestion.category} onValueChange={(value) => setNewQuestion(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Textarea
                      placeholder="Describe your question in detail..."
                      rows={4}
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, content: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="solar-gradient text-white">
                      Post Question
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowNewQuestion(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Forum Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-0 glass-effect">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={post.status === "solved" ? "default" : "secondary"}>
                          {post.category}
                        </Badge>
                        {post.status === "solved" && (
                          <Badge variant="default" className="bg-green-500">
                            Solved
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mb-4">
                        {post.content}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.replies} replies</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLike(post.title)}
                        className="flex items-center space-x-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center space-x-1">
                        <Reply className="h-4 w-4" />
                        <span>Reply</span>
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
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Forum;
