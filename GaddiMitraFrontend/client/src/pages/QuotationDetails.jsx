import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/header";
import { useAuth } from "../context/AuthContext";

export default function QuotationDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const quotation = location.state;

  const { user ,token} = useAuth();

  useEffect(() => {
    if (!quotation) navigate("/dashboard");
  }, [quotation, navigate]);

  if (!quotation) return null;

  const handlePayment = ()=>{
    navigate("/dashboard/quotation/details/payment",{state:{quotation},})
  }

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
          Quotation Details
        </h2>

        {/* Request Info Section */}
        <div className="space-y-3 text-gray-800">
          {[
            // { label: "Notification ID:", value: request.notificationid },
            { label: "Request ID:", value: quotation?.requestid },
            { label: "Customer ID:", value: quotation?.customerid },

            {
              label: "Sender Type:",
              value: `${quotation.sendertype?.toUpperCase()}`,
            },

            { label: "Message:", value: quotation.description },
            { label: "Ammount:", value: `₹ ${quotation.ammount}` },
            {
              label: "Created:",
              value: new Date(quotation.estimatedtime).toLocaleString(),
            },
            quotation.customerContact && {
              label: "Call Sender:",
              value: quotation.customerContact,
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
          {user.role !== "customer" ?(
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Delete Quotation
            </button>
          ):(  <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-800"
          onClick={handlePayment}>
              Go To Payment
            </button>)}

            {user.role === "customer" ?  (  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              Decline Quotation
            </button>):(<button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-red-700">
              Edit Quotation
            </button>)}
        </div>
      </div>
    </div>
  );
}
