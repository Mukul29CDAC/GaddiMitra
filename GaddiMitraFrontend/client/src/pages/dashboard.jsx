// import { useAuth } from "../hooks/useAuth.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs.jsx";
import { Car, Users, TrendingUp, Settings } from "lucide-react";
import Header from "../components/layout/header.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: stats } = useQuery({ queryKey: ["/api/dashboard/stats"] });
  const { data: info } = useQuery({ queryKey: ["/api/vehicles+users",user.userid] });

  const vehicles = info?.vehicles || [];
  const requests = info?.request || [];
  console.log(requests);

  const roleColors = {
    customer: "bg-blue-100 text-blue-800",
    dealer: "bg-green-100 text-green-800",
    service_center: "bg-purple-100 text-purple-800",
  };

  const handleEdit = (vec) => {
    navigate("/dashboard/vehicles/edit", { state: vec });
  };

  const handleDelete = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;

    try {
      await axios.delete(
        `http://localhost:8080/veichles/removeVeichle/${vehicleId}`
      );
      alert("Vehicle deleted successfully!");
    } catch (error) {
      // console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle.");
    }
  };

  



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Manage your automotive activities
              </p>
              <Badge
                className={`mt-2 ${
                  roleColors[user?.role] || roleColors.customer
                }`}
              >
                {user?.role === "service_center"
                  ? "Service Center"
                  : user?.role?.charAt(0).toUpperCase() +
                      user?.role?.slice(1) || "Customer"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">
                {user?.role === "dealer" ? "Total Vehicles" : "Active Requests"}
              </CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center">
                {user?.role === "dealer"
                  ? info?.totalVehicles || 0
                  : info?.totalRequest || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">Quotations</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center">
                {info?.totalQuotation || stats?.acceptedQuotations || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center">
                {stats?.completedTransactions || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm font-medium">
                {user?.role === "service_center" ? "Pending" : "Total"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center">
                {stats?.pendingQuotations || stats?.totalVehicles || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {user?.role === "dealer" && (
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            )}
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.slice(0, 3).map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">
                            {request.type} Request
                          </h4>
                          <p className="text-sm text-gray-600">
                            {request.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Status:{" "}
                            <Badge variant="secondary">{request.status}</Badge>
                          </p>
                        </div>
                      </div>
                    ))}
                    {requests.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No recent activity
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user?.role === "customer" && (
                      <>
                        <button
                          className="w-full p-3 text-left rounded-lg hover:bg-gray-50 border"
                          onClick={() => navigate("/dashboard/request/service")}
                        >
                          <h4 className="font-medium">Request Service</h4>
                          <p className="text-sm text-gray-600">
                            Get your vehicle serviced
                          </p>
                        </button>
                        <button
                          className="w-full p-3 text-left rounded-lg hover:bg-gray-50 border"
                          onClick={() => navigate("/cars")}
                        >
                          <h4 className="font-medium">Buy Vehicle</h4>
                          <p className="text-sm text-gray-600">
                            Find your perfect car
                          </p>
                        </button>
                      </>
                    )}
                    {user?.role === "dealer" && (
                      <>
                        <button
                          onClick={() => navigate("/dashboard/vehicles/add")}
                          className="w-full p-3 text-left rounded-lg hover:bg-gray-50 border"
                        >
                          <h4 className="font-medium">Add Vehicle</h4>
                          <p className="text-sm text-gray-600">
                            List a new vehicle
                          </p>
                        </button>
                        <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 border">
                          <h4 className="font-medium">Manage Inventory</h4>
                          <p className="text-sm text-gray-600">
                            Update vehicle details
                          </p>
                        </button>
                      </>
                    )}
                    {user?.role === "service_center" && (
                      <>
                        <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 border">
                          <h4 className="font-medium">Service Requests</h4>
                          <p className="text-sm text-gray-600">
                            View pending requests
                          </p>
                        </button>
                        <button className="w-full p-3 text-left rounded-lg hover:bg-gray-50 border">
                          <h4 className="font-medium">Create Quotation</h4>
                          <p className="text-sm text-gray-600">
                            Provide service quotes
                          </p>
                        </button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vehicles Tab */}
          {user?.role === "dealer" && (
            <TabsContent value="vehicles">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto space-y-4 pr-1">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="flex items-center space-x-4 p-4 border rounded-lg"
                      >
                       <img
  src={
    vehicle.imageurl
      ? vehicle.imageurl
      : vehicle.imagedata
      ? `data:${vehicle.imagetype};base64,${vehicle.imagedata}`
      : "https://via.placeholder.com/80x60?text=Car"
  }
  alt={`${vehicle.brand} ${vehicle.model}`}
  className="w-20 h-15 object-cover rounded"
/>

                        <div className="flex-1">
                          <h4 className="font-medium">
                            {vehicle.brand} {vehicle.model}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {vehicle.year} • {vehicle.fueltype} •{" "}
                            {vehicle.transmission}
                          </p>
                          <p className="text-lg font-semibold text-orange-600">
                            ₹{(parseFloat(vehicle.price) / 100000).toFixed(1)}L
                          </p>
                        </div>
                        <Badge
                          variant={vehicle.isActive ? "default" : "secondary"}
                        >
                          {vehicle.isActive ? "Inactive" : "Active"}
                        </Badge>
                        <div className="space-x-2">
                          <button
                            onClick={() => handleEdit(vehicle)}
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {vehicles.length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        No vehicles in inventory
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-96 overflow-y-auto space-y-4 pr-1">
                  {requests.map((request) => (
                    <div
                      key={request.requestid}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() =>
                        navigate("/dashboard/request/details", {
                          state: request,
                        })
                      }
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium capitalize">
                          {request.veichletype} Wheeler
                        </h4>
                        <Badge variant="secondary">
                          {request.requestid}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{request.model}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>
                          Created:{" "}
                          {new Date(request.datetime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {requests.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No requests available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-500 text-center py-8">
                  No transactions available
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
