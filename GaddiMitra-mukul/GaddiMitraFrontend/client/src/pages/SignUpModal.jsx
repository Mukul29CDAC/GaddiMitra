import axios from "axios";
import { useState } from "react";

export default function SignUpModal({ isOpen, onClose, role }) {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    // imageData: null, // for storing image file
    // ensure role is in lowercase
  
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleData =
      role === "Service Center"
        ? { ...formData, type: formData.type ,role:role.toLowerCase() }
        : {...formData,role:role.toLowerCase()}; // ensure role is in lowercase

    try {
      const response = await axios.post(
        `http://localhost:8080/user/register`,
        roleData
      ); // replace with your real endpoint
    
      alert("Registration successful!");
       setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      type: "", // include type for service center reset
      // imageData: null, // reset image data
    });
      onClose();
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Register as {role}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

            {/* <div>
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
          </div> */}

          {/* Extra fields for Service Center */}
          {role === "ServiceCenter" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Service Center Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Type</option>
                <option value="Local">Local</option>
                <option value="Authorised">Authorised</option>
              </select>
            </div>
          )}

          {/* Extra fields for Dealer */}
          {/* {role === "Dealer" && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            </>
          )} */}

          <button
            type="submit"
            className="w-full bg-orange-600  text-white py-2 rounded hover:bg-orange-400 font-medium"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
