import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Search, Filter } from "lucide-react";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function Cars() {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicles,setVehicles] = useState([]);
  const [error,setError] = useState();
  const[isLoading,setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: "",
    fueltype: "",
    transmission: "",
    bodytype: "",
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/veichles/allVeichles");
        setVehicles(response.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to load vehicles");
      } 
    };

    fetchVehicles();
  }, []);




  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      !filters.priceRange ||
      (filters.priceRange === "under-10" &&
        parseFloat(vehicle.price) < 1000000) ||
      (filters.priceRange === "10-15" &&
        parseFloat(vehicle.price) >= 1000000 &&
        parseFloat(vehicle.price) <= 1500000) ||
      (filters.priceRange === "above-15" &&
        parseFloat(vehicle.price) > 1500000);

    const matchesFilters =
      (!filters.fueltype || vehicle.fueltype === filters.fueltype) &&
      (!filters.transmission ||
        vehicle.transmission === filters.transmission) &&
      (!filters.bodytype || vehicle.bodytype === filters.bodytype);

    return matchesSearch && matchesPrice && matchesFilters;
  });

  const navigate = useNavigate();
  
  const handleVehicleClick = (vehicle) => {
    navigate("/cars/details", {
      state: { vehicle },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Browse Our Vehicle Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover quality vehicles from verified dealers across India
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-4 items-center max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by brand, model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select
                value={filters.priceRange}
                onValueChange={(value) =>
                  setFilters({ ...filters, priceRange: value })
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10">Under ₹10L</SelectItem>
                  <SelectItem value="10-15">₹10L - ₹15L</SelectItem>
                  <SelectItem value="above-15">Above ₹15L</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.fueltype}
                onValueChange={(value) =>
                  setFilters({ ...filters, fueltype: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Fuel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="CNG">CNG</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.transmission}
                onValueChange={(value) =>
                  setFilters({ ...filters, transmission: value })
                }
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    priceRange: "",
                    fueltype: "",
                    transmission: "",
                    bodytype: "",
                  })
                }
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredVehicles.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600">
                  Showing {filteredVehicles.length} of {vehicles.length}{" "}
                  vehicles
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="card-hover cursor-pointer">
                    <div className="relative">
                      <img
                        src={
                          vehicle.imageurl
                            ? vehicle.imageurl
                            : vehicle.imagedata
                            ? `data:${vehicle.imagetype};base64,${vehicle.imagedata}`
                            : "https://via.placeholder.com/400x300?text=Vehicle+Image"
                        }
                        alt={`${vehicle.brand} ${vehicle.model}`}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 right-3 bg-orange-600">
                        {vehicle.year}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      {vehicle.variant && (
                        <p className="text-gray-600 mb-2">{vehicle.variant}</p>
                      )}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {vehicle.description ||
                          "Premium vehicle with excellent features"}
                      </p>

                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="secondary">{vehicle.fueltype}</Badge>
                          <Badge variant="secondary">
                            {vehicle.transmission}
                          </Badge>
                          <Badge variant="secondary">{vehicle.bodytype}</Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-orange-600">
                          ₹{(parseFloat(vehicle.price) / 100000).toFixed(1)}L
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleVehicleClick(vehicle)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No vehicles found
                </h3>
                <p className="text-gray-500">
                  {searchTerm || Object.values(filters).some((f) => f)
                    ? "Try adjusting your search criteria or filters"
                    : "No vehicles are currently available"}
                </p>
              </div>
              {(searchTerm || Object.values(filters).some((f) => f)) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      priceRange: "",
                      fueltype: "",
                      transmission: "",
                      bodytype: "",
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
