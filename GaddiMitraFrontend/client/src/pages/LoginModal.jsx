import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext"; // Adjust the path if needed

export default function LoginModal({ isOpen, onClose }) {
  const { mutate: loginUser } = useLogin(); // from React Query
  const { login: setAuthUser } = useAuth(); // from AuthContext

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  loginUser(loginData, {
    onSuccess: (userData) => {
      if (userData && userData.email) {
        // console.log(userData);
        localStorage.setItem("token", userData.token);
        setAuthUser(userData); // store user globally in AuthContext
        alert("Login successful!");
        onClose();
      } else {
        alert("Invalid user data received. Login failed.");
      }
    },
    onError: () => {
      alert("Login failed. Please check your credentials.");
    },
  });
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
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-400 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
