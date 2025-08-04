import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Car, Settings, Users, TrendingUp } from "lucide-react";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

// import { useAuth } from "../hooks/useAuth.js";

export default function Home() {
  const { user } = useAuth();
  
  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: info } = useQuery({
    queryKey: ["/api/vehicles+users"], // triggers both API calls
  }); 

  const notifications = info?.notification || [];

  
  const { data: recentNotifications } = useQuery({
    queryKey: ["/api/notifications"],
  });

  const roleColors = {
    customer: "bg-blue-100 text-blue-800",
    dealer: "bg-green-100 text-green-800",
    service_center: "bg-purple-100 text-purple-800"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.firstName || "User"}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your automotive activities
              </p>
              <Badge className={`mt-2 ${roleColors[user?.role] || roleColors.customer}`}>
                {user?.role === 'service_center' ? 'Service Center' : 
                 user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Customer'}
              </Badge>
            </div>
            <Button asChild>
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {user?.role === 'dealer' ? 'Total Vehicles' : 'Active Requests'}
              </CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user?.role === 'dealer' ? stats?.totalVehicles || 0 : info?.totalRequest || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {user?.role === 'customer' ? 'Accepted Quotations' : 'Total Quotations'}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user?.role === 'customer' ? stats?.acceptedQuotations || 0 : info?.totalQuotation || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {user?.role === 'service_center' ? 'Pending Quotations' : 'Transactions'}
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user?.role === 'service_center' ? stats?.pendingQuotations || 0 : stats?.completedTransactions || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentNotifications?.filter(n => !n.isRead).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">Unread</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-orange-600" />
                Browse Vehicles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Explore our collection of quality vehicles from trusted dealers
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/cars">Browse Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-orange-600" />
                Manage Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Update your profile, preferences, and account settings
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Get Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Contact our support team for assistance with your needs
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        {notifications && notifications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium">{notification.veichletype}</h4>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.datetime).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}

