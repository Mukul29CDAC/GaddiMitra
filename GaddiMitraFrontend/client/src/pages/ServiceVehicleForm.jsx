import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/layout/header";
import { useAuth } from "../context/AuthContext.jsx";
import Footer from "../components/layout/footer.jsx";

export default function ServiceVehicleForm() {
  const {user} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    requesttype: "service",
    veichletype: "",
    brand: "",
    model: "",
    description: "",
    status: "pending",
    imageData: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, imageData: e.target.files[0]

     }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       const payload = new FormData();

  payload.append("obj", new Blob([JSON.stringify({...formData,customerid:user.userid})], { type: "application/json" }));
  payload.append("image", formData.imageData);
    try {
      await axios.post("http://localhost:8080/requests/addRequest", payload,{
      headers: {
        "Content-Type": "multipart/form-data",
      },});
      alert("Vehicle request submitted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error submitting vehicle request:", err);
      alert("Failed to submit vehicle request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto p-6 mt-12 mb-12 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Vehicle Service Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-medium text-gray-700">Vehicle Type</label>
            <input
              type="text"
              name="veichletype"
              placeholder="e.g. 2 or 4"
              required
              value={formData.veichletype}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              required
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              required
              value={formData.model}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* <div>
            <label className="block font-medium text-gray-700">Estimated Date/Time</label>
            <input
              type="datetime-local"
              name="datetime"
              required
              value={formData.datetime}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div> */}

          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
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

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}
