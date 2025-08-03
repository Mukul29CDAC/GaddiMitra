import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge.jsx";
import { Button } from "../ui/button";
// import { useQuery } from "@tanstack/react-query";
// import {Button} from "../ui/button.jsx";

export default function VehicleListWithFilters() {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    fueltype: "",
    transmission: "",
    bodytype: "",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/veichles/allVeichles");
      console.log("Fetched vehicles:", response.data);
      setVehicles(response.data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };


  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      (!filters.fueltype || vehicle.fueltype === filters.fueltype) &&
      (!filters.transmission || vehicle.transmission === filters.transmission) &&
      (!filters.bodytype || vehicle.bodytype === filters.bodytype)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Filters */}
        <div className="bg-white p-4 shadow rounded space-y-4">
          <h2 className="text-xl font-bold mb-2 text-gray-700">Filters</h2>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Fuel Type</label>
            <select
              className="w-full border rounded p-2"
              value={filters.fueltype}
              onChange={(e) => handleFilterChange("fueltype", e.target.value)}
            >
              <option value="">All</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Transmission</label>
            <select
              className="w-full border rounded p-2"
              value={filters.transmission}
              onChange={(e) => handleFilterChange("transmission", e.target.value)}
            >
              <option value="">All</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Body Type</label>
            <select
              className="w-full border rounded p-2"
              value={filters.bodytype}
              onChange={(e) => handleFilterChange("bodytype", e.target.value)}
            >
              <option value="">All</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
            </select>
          </div>
        </div>

        {/* Right Vehicle List */}
        <div className="md:col-span-3 space-y-6 ">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Available Vehicles</h2>
          {filteredVehicles.length === 0 ? (
            <p className="text-gray-600">No vehicles match the selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="p-4 shadow hover:shadow-lg">
                  <img
                    src={vehicle.imageurl}
                    alt={vehicle.model}
                    className="w-full h-22 object-cover rounded"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-sm text-gray-500 mb-2">{vehicle.description}</p>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="secondary">{vehicle.fueltype}</Badge>
                      <Badge variant="secondary">{vehicle.transmission}</Badge>
                      <Badge variant="secondary">{vehicle.bodytype}</Badge>
                    </div>

                    <div className="flex items-center justify-between py-2">
<p className="font-bold text-orange-600">₹{(vehicle.price / 100000).toFixed(1)}L</p>
                    <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
