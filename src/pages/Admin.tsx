
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Package, Wrench, MessageSquare, Briefcase, BarChart3, TrendingUp, DollarSign, Activity } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { title: "Total Users", value: "2,847", change: "+12%", icon: Users },
    { title: "Active Products", value: "156", change: "+5%", icon: Package },
    { title: "Service Providers", value: "89", change: "+8%", icon: Wrench },
    { title: "Forum Posts", value: "1,234", change: "+15%", icon: MessageSquare },
    { title: "Job Listings", value: "47", change: "+3%", icon: Briefcase },
    { title: "Monthly Revenue", value: "$124,567", change: "+18%", icon: DollarSign }
  ];

  const recentUsers = [
    { id: 1, name: "John Smith", email: "john@example.com", type: "Customer", joined: "2024-01-15" },
    { id: 2, name: "Sarah Johnson", email: "sarah@solarpro.com", type: "Provider", joined: "2024-01-14" },
    { id: 3, name: "Mike Chen", email: "mike@example.com", type: "Customer", joined: "2024-01-13" },
    { id: 4, name: "Lisa Rodriguez", email: "lisa@greentech.com", type: "Provider", joined: "2024-01-12" }
  ];

  const recentProducts = [
    { id: 1, name: "Solar Panel X300", provider: "SolarTech Pro", price: "$350", status: "Active" },
    { id: 2, name: "Battery System Pro", provider: "Energy Storage Inc", price: "$2,200", status: "Pending" },
    { id: 3, name: "Smart Inverter", provider: "Tech Solutions", price: "$900", status: "Active" },
    { id: 4, name: "Monitoring Kit", provider: "Solar Monitor Co", price: "$150", status: "Active" }
  ];

  const recentServices = [
    { id: 1, name: "Roof Installation", provider: "Install Pro", price: "$120/panel", status: "Active" },
    { id: 2, name: "Maintenance Service", provider: "Service Plus", price: "$90/month", status: "Active" },
    { id: 3, name: "Energy Audit", provider: "Audit Experts", price: "$200", status: "Pending" },
    { id: 4, name: "System Design", provider: "Design Masters", price: "$500", status: "Active" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage platform users, content, and monitor performance metrics.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-0 glass-effect">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <p className="text-sm text-accent">
                            <TrendingUp className="inline h-3 w-3 mr-1" />
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Users
                    </CardTitle>
                    <CardDescription>Latest user registrations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={user.type === "Provider" ? "default" : "secondary"}>
                              {user.type}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{user.joined}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 glass-effect">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Platform Analytics
                    </CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Daily Active Users</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Product Views</span>
                        <span className="font-semibold">8,934</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Service Bookings</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Forum Engagement</span>
                        <span className="font-semibold">89%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="border-0 glass-effect">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage platform users and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Input placeholder="Search users..." className="flex-1" />
                    <Button className="solar-gradient text-white">Search</Button>
                  </div>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.type === "Provider" ? "default" : "secondary"}>
                            {user.type}
                          </Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card className="border-0 glass-effect">
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage solar products and listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Input placeholder="Search products..." className="flex-1" />
                    <Button className="solar-gradient text-white">Add Product</Button>
                  </div>
                  <div className="space-y-4">
                    {recentProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.provider}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">{product.price}</span>
                          <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card className="border-0 glass-effect">
                <CardHeader>
                  <CardTitle>Service Management</CardTitle>
                  <CardDescription>Manage service providers and offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Input placeholder="Search services..." className="flex-1" />
                    <Button className="solar-gradient text-white">Add Service</Button>
                  </div>
                  <div className="space-y-4">
                    {recentServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">{service.name}</p>
                          <p className="text-sm text-muted-foreground">{service.provider}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">{service.price}</span>
                          <Badge variant={service.status === "Active" ? "default" : "secondary"}>
                            {service.status}
                          </Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card className="border-0 glass-effect">
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage blog posts, forum content, and job listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 border rounded-lg">
                      <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Blog Posts</h3>
                      <p className="text-2xl font-bold text-primary mb-2">23</p>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="text-center p-6 border rounded-lg">
                      <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Forum Topics</h3>
                      <p className="text-2xl font-bold text-primary mb-2">156</p>
                      <Button variant="outline" size="sm">Moderate</Button>
                    </div>
                    <div className="text-center p-6 border rounded-lg">
                      <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Job Listings</h3>
                      <p className="text-2xl font-bold text-primary mb-2">47</p>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
