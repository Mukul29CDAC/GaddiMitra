import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/layout/header";
import { useAuth } from "../context/AuthContext";

export default function AddVehicle() {
  const [vehicle, setVehicle] = useState({
    brand: "",
    model: "",
    variant: "",
    year: "",
    fueltype: "",
    transmission: "",
    bodytype: "",
    price: "",
    imageurl: "",
    description: "",
    imageData: null
  });

  const navigate = useNavigate();

  const {user, token} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const payload = new FormData();

  payload.append("obj", new Blob([JSON.stringify(vehicle)], { type: "application/json" }));
  payload.append("image", vehicle.imageData);
    try {
      await axios.post(`http://localhost:8080/veichles/addVeichle/${user.userid}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` 
        },});

      alert("Vehicle added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding vehicle:", error);
      alert("Failed to add vehicle.");
    }
  };

  const handleImageChange = (e) => {
    setVehicle((prev) => ({ ...prev, imageData: e.target.files[0]

     }));
  };

  const handleClear = () => {
    setVehicle({
      brand: "",
      model: "",
      variant: "",
      year: "",
      fueltype: "",
      transmission: "",
      bodytype: "",
      price: "",
      imageurl: "",
      description: "",
      imageData: null, // reset image file
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto p-8">
        {/* Back to Dashboard Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Dashboard
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Vehicle</h2>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand */}
            <div>
              <label className="block font-medium mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={vehicle.brand}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Model */}
            <div>
              <label className="block font-medium mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={vehicle.model}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Vehicle Variant */}
              <div>
              <label className="block font-medium mb-1">Variant</label>
              <input
                type="text"
                name="variant"
                value={vehicle.variant}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="block font-medium mb-1">Year</label>
              <input
                type="number"
                name="year"
                value={vehicle.year}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block font-medium mb-1">Fuel Type</label>
              <select
                name="fueltype"
                value={vehicle.fueltype}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block font-medium mb-1">Transmission</label>
              <select
                name="transmission"
                value={vehicle.transmission}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block font-medium mb-1">Body Type</label>
              <select
                name="bodytype"
                value={vehicle.bodytype}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Convertible">Convertible</option>
                <option value="MPV">MPV</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={vehicle.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block font-medium mb-1">Image URL</label>
              <input
                type="text"
                name="imageurl"
                value={vehicle.imageurl}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {vehicle.imageurl && (
                <img
                  src={vehicle.imageurl}
                  alt="Preview"
                  className="w-full h-32 object-cover mt-2 rounded border"
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={vehicle.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows="3"
              maxLength={200}
            />
            <p className="text-sm text-gray-500 text-right">
              {vehicle.description.length}/200 characters
            </p>
          </div>

             <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="imageData"
              // value={formData.imageData}
              onChange={handleImageChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
