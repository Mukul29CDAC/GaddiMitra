import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/header";
import { useAuth } from "../context/AuthContext";

export default function RequestDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const request = location.state;

  const { user, token } = useAuth();

  useEffect(() => {
    if (!request) navigate("/dashboard");
  }, [request, navigate]);

  if (!request) return null;

  const handleDeclineRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/request/decline",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          requestId: request.request?.requestid,
          customerId: request.request?.customerid,
          reason: "Request declined by service center.",
        }
      );

      alert("Request declined.");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to decline request.");
    }
  };

  const handleDeleteForCustomer = () => {
    axios
      .delete(`http://localhost:8080/request/delete/${request.requestid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate("/dashboard");
        alert("Deleted Succesfully");
        
      })
      .catch((error) => {
        alert("error occured");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded mt-6">
        {/* Back to Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Request Details
        </h2>

        {/* Request Info Section */}
        <div className="space-y-3 text-gray-800">
          {[
            // { label: "Notification ID:", value: request.notificationid },
            { label: "Request ID:", value: request?.requestid },
            { label: "Customer ID:", value: request?.customerid },

            {
              label: "Vehicle Type:",
              value: `${request.veichletype?.toUpperCase()} Wheeler`,
            },
            { label: "Brand:", value: request.brand },
            { label: "Model:", value: request.model },
            { label: "Message:", value: request.description },
            {
              label: "Created:",
              value: new Date(request.datetime).toLocaleString(),
            },
            request.customerContact && {
              label: "Customer Phone:",
              value: request.customerContact,
            },
          ]
            .filter(Boolean)
            .map((item, idx) => (
              <div key={idx} className="flex">
                <div className="w-48 font-semibold">{item.label}</div>
                <div className="flex-1">{item.value}</div>
              </div>
            ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-between mt-8">
          {user.role !== "customer" && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() =>
                navigate("/dashboard/send-quotation", { state: request })
              }
            >
              Send Quotation
            </button>
          )}

          {user.role === "customer" ? (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => handleDeleteForCustomer()}
            >
              Delete Request
            </button>
          ) : (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={handleDeclineRequest}
            >
              Decline Request
            </button>
          )}

          {user.role !== "customer" ? (
            <button
              disabled={!request.customerContact}
              onClick={() => {
                if (request.customerContact) {
                  window.location.href = `tel:${request.customerContact}`;
                }
              }}
              className={`px-4 py-2 rounded text-white ${
                request.customerContact
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Call Customer
            </button>
          ) : (
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-red-700"
             onClick={() => navigate("/dashboard/request/edit",{state:request},)}>
              Edit Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
