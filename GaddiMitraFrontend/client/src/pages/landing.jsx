import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Search, Filter, Star, Users, Shield, Headphones } from "lucide-react";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CounterSection from "../components/layout/countersection.jsx";
import TestimonialSection from "../components/layout/Testimonials.jsx";
import VehicleListWithFilters from "../components/layout/VehicleListWithFilters.jsx";
import VehicleCarasouel from "../components/layout/VehicleCarasouel.jsx";
import FeatureSection from "../components/layout/FeatureSection.jsx";



export default function Landing() {
    
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const { data: info } = useQuery({
  queryKey: ["/api/vehicles+users"]
  });

  const mockVehicles = info?.vehicles || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: "",
    fueltype: "",
    transmission: "",
    bodytype: ""
  });

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = !filters.priceRange || (
      filters.priceRange === "under-10" && parseInt(vehicle.price) < 1000000 ||
      filters.priceRange === "10-15" && parseInt(vehicle.price) >= 1000000 && parseInt(vehicle.price) <= 1500000 ||
      filters.priceRange === "above-15" && parseInt(vehicle.price) > 1500000
    );
    
    const matchesFilters = 
      (!filters.fueltype || vehicle.fueltype === filters.fueltype) &&
      (!filters.transmission || vehicle.transmission === filters.transmission) &&
      (!filters.bodytype || vehicle.bodytype === filters.bodytype);
    
    return matchesSearch && matchesPrice && matchesFilters;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Perfect Vehicle
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover quality vehicles from trusted dealers and service centers across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              <a href="/api/login">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-orange-600 hover:bg-gray-100 hover:text-orange-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
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
              <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10">Under ₹10L</SelectItem>
                  <SelectItem value="10-15">₹10L - ₹15L</SelectItem>
                  <SelectItem value="above-15">Above ₹15L</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filters.fueltype} onValueChange={(value) => setFilters({...filters, fueltype: value})}>
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
              
              <Select value={filters.transmission} onValueChange={(value) => setFilters({...filters, transmission: value})}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

     

    


      {/* Featured Vehicles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* <h2 className="text-3xl font-bold text-center mb-12">Featured Vehicles</h2> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="card-hover cursor-pointer">
                <div className="relative">
                  <img
                    src={   vehicle.imageurl
                            ? vehicle.imageurl
                            : vehicle.imagedata
                            ? `data:${vehicle.imagetype};base64,${vehicle.imagedata}`
                            : "https://via.placeholder.com/400x300?text=Vehicle+Image" }
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-22 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-orange-600">
                    {vehicle.year}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="text-gray-600 mb-4">{vehicle.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <Badge variant="secondary">{vehicle.fueltype}</Badge>
                      <Badge variant="secondary">{vehicle.transmission}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-orange-600">
                      ₹{(parseInt(vehicle.price) / 100000).toFixed(1)}L
                    </span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No vehicles found matching your criteria</p>
            </div>
          )}
        </div>
      </section>
       <FeatureSection/>

      
           <VehicleCarasouel/>
           {/* Features Section */}
         
      <VehicleListWithFilters/>

      
      <TestimonialSection />
      <CounterSection />
     
      <Footer />
    </div>
  );
}




function Feature({ icon, title, desc }) {
  return (
    <div className="text-center">
      <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}