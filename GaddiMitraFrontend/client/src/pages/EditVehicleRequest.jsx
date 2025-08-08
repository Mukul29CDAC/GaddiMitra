import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditVehicleRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state;

  const [form, setForm] = useState({
    brand: request?.brand || "",
    datetime: request?.datetime || "",
    description: request?.description || "",
    model: request?.model || "",
    veichletype: request?.veichletype || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/request/update/${request.requestid}`,
        form,{
            headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
        }
      );
      alert("Request updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to update request.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow rounded" style={{ minHeight: "400px" }}>
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Vehicle Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} className="w-full border px-3 py-1.5 rounded" />
        </div>
    
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-1.5 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Model</label>
          <input name="model" value={form.model} onChange={handleChange} className="w-full border px-3 py-1.5 rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Request Type</label>
          <input name="requesttype" value={request.requesttype} onChange={handleChange} className="w-full border px-3 py-1.5 rounded" />
        </div>
       
        <div>
          <label className="block font-semibold mb-1">Vehicle Type</label>
          <input name="veichletype" value={form.veichletype} onChange={handleChange} className="w-full border px-3 py-1.5 rounded" />
        </div>
        <div className="flex justify-between mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 mx-10 py-2 rounded hover:bg-blue-700">Update</button>
          <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 mx-10">Cancel</button>
        </div>
      </form>
    </div>
  );
}
export default EditVehicleRequest;