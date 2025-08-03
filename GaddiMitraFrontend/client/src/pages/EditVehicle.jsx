import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/layout/header";

export default function EditVehicle() {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicleData = location.state;

  console.log("Editing vehicle data:", vehicleData);

  const [vehicle, setVehicle] = useState({
    id: vehicleData?.id || "",
    brand: vehicleData?.brand || "",
    model: vehicleData?.model || "",
    variant: vehicleData?.variant || "",
    year: vehicleData?.year || "",
    fueltype: vehicleData?.fueltype || "",
    transmission: vehicleData?.transmission || "",
    bodytype: vehicleData?.bodytype || "",
    price: vehicleData?.price || "",
    imageurl: vehicleData?.imageurl || "",
    description: vehicleData?.description || "",
  });

  useEffect(() => {
    if (vehicleData) {
      setVehicle(vehicleData);
    }
  }, [vehicleData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/vehicles/update/${vehicle.id}`, vehicle);
      alert("Vehicle updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      // console.error("Error updating vehicle:", error);
      alert("Failed to update vehicle.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Vehicle</h2>

        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Brand */}
          <div>
            <label htmlFor="brand" className="block mb-1 font-medium">Brand</label>
            <input
              id="brand"
              type="text"
              name="brand"
              value={vehicle.brand}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Model */}
          <div>
            <label htmlFor="model" className="block mb-1 font-medium">Model</label>
            <input
              id="model"
              type="text"
              name="model"
              value={vehicle.model}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Variant */}
          <div>
            <label htmlFor="variant" className="block mb-1 font-medium">Variant</label>
            <input
              id="variant"
              type="text"
              name="variant"
              value={vehicle.variant}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Year */}
          <div>
            <label htmlFor="year" className="block mb-1 font-medium">Year</label>
            <input
              id="year"
              type="number"
              name="year"
              value={vehicle.year}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label htmlFor="fuelType" className="block mb-1 font-medium">Fuel Type</label>
            <select
              id="fuelType"
              name="fueltype"
              value={vehicle.fueltype}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Fuel Type</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>CNG</option>
              <option>Electric</option>
            </select>
          </div>

          {/* Transmission */}
          <div>
            <label htmlFor="transmission" className="block mb-1 font-medium">Transmission</label>
            <select
              id="transmission"
              name="transmission"
              value={vehicle.transmission}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Transmission</option>
              <option>Manual</option>
              <option>Automatic</option>
            </select>
          </div>

          {/* Body Type */}
          <div>
            <label htmlFor="bodyType" className="block mb-1 font-medium">Body Type</label>
            <select
              id="bodyType"
              name="bodytype"
              value={vehicle.bodytype}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Body Type</option>
              <option>Hatchback</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Convertible</option>
              <option>MPV</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block mb-1 font-medium">Price (₹)</label>
            <input
              id="price"
              type="number"
              name="price"
              value={vehicle.price}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block mb-1 font-medium">Image URL</label>
            <input
              id="imageUrl"
              type="text"
              name="imageurl"
              value={vehicle.imageurl}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label htmlFor="description" className="block mb-1 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={vehicle.description}
              onChange={handleChange}
              rows="3"
              className="border p-2 rounded w-full"
              placeholder="Enter description"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
