// src/pages/SendQuotationForm.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../components/layout/header";

export default function SendQuotationForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state;

  const [quotation, setQuotation] = useState({
    requestid: request?.requestid || "",
    // customerid: request?.customerid || "",
    sendertype: "dealer", // or "dealer" based on context
    senderid: 1, // Replace with logged-in user ID if available
    ammount: "",
    estimatedtime: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuotation({ ...quotation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/quotation/addQuotation", quotation);
      alert("Quotation submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to send quotation:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Send Quotation</h2>
<form onSubmit={handleSubmit} className="space-y-4">

  <div>
    <label htmlFor="requestid" className="block font-medium text-gray-700 mb-1">Request ID</label>
    <input
      type="number"
      id="requestid"
      name="requestid"
      placeholder="Request ID"
      required
      value={quotation.requestid}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
  </div>
  <div>
   <label htmlFor="requestid" className="block font-medium text-gray-700 mb-1">Customer ID</label>
    <input
      type="number"
      id="customerid"
      name="customerid"
      placeholder="Customer ID"
      required
      value={quotation.customerid || request?.customerid}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
  </div>

  <div>
    <label htmlFor="sendertype" className="block font-medium text-gray-700 mb-1">Sender Type</label>
    <input
      type="text"
      id="sendertype"
      name="sendertype"
      placeholder="Sender Type"
      required
      value={quotation.sendertype}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
  </div>

  <div>
    <label htmlFor="senderid" className="block font-medium text-gray-700 mb-1">Sender ID</label>
    <input
      type="number"
      id="senderid"
      name="senderid"
      placeholder="Sender ID"
      required
      value={quotation.senderid}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
  </div>

  <div>
    <label htmlFor="ammount" className="block font-medium text-gray-700 mb-1">Amount (₹)</label>
    <input
      type="number"
      id="ammount"
      name="ammount"
      placeholder="Amount (₹)"
      required
      value={quotation.ammount}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
  </div>

  <div>
    <label htmlFor="estimatedtime" className="block font-medium text-gray-700 mb-1">Estimated Time</label>
    <input
      type="datetime-local"
      id="estimatedtime"
      name="estimatedtime"
      placeholder="Estimated Time"
      required
      value={quotation.estimatedtime}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
  </div>

  <div>
    <label htmlFor="description" className="block font-medium text-gray-700 mb-1">Description</label>
    <input
      type="text"
      id="description"
      name="description"
      placeholder="Description"
      required
      value={quotation.description}
      onChange={handleChange}
      className="w-full border rounded p-2"
    />
  </div>

  <div className="flex justify-between">
    <button
      type="button"
      onClick={() => navigate("/dashboard")}
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Submit Quotation
    </button>
  </div>

</form>

      </div>
    </div>
  );
}
