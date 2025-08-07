// src/pages/PaymentPage.jsx
import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { quotation } = location.state || {};
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;


  if (!quotation) {
    return <p className="text-red-500">No payment details data found.</p>;
  }

  // --- THIS IS THE UPDATED PAYMENT LOGIC ---
  const handlePayment = async () => {
    try {
 
      const createOrderResponse = await fetch('http://localhost:8080/api/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          amount: quotation.ammount, // The amount from your quotation
          customerId: quotation.customerid, // You must have these IDs in your quotation object
          requestId: quotation.requestid,
          receiverType: quotation.sendertype, // Example value
          receiverId: quotation.senderid, // Example value
          transactionType: "Online" // Example value
        }),
      });

      

      if (!createOrderResponse.ok) {
        throw new Error("Failed to create order.");
      }

      // The backend returns the order details as a string, so we parse it to JSON
      const order = await createOrderResponse.json();
      // Step 2: Configure the Razorpay options object
      const options = {
        key: razorpayKey, // Your public key from .env
        amount: order.amount, // Amount in the smallest currency unit (e.g., paise)
        currency: createOrderResponse.currency,
        name: "GaaddiMitra", // Your company name
        description: `Payment for Quotation #${quotation.quotationid}`,
        order_id: order.id, // This is the 'order_id' from your backend

        // Step 3: Define the handler function for payment success
        handler: async function (response) {
          const verificationPayload = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          // Step 4: Call your backend's /verify endpoint
          const verificationResponse = await fetch('http://localhost:8080/api/transaction/verify', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}` 
             },
            body: JSON.stringify("Abc",verificationPayload),
          }); 
          if (!verificationResponse.ok) {
             throw new Error("Payment verification failed.");
          }
          alert("Payment successful and verified!");
          navigate("/dashboard"); // Or a dedicated success page
        },

        // (Optional) Prefill user details
        prefill: {
          name: quotation.sendername,
          // email: "customer.email@example.com",
          // contact: "9999999999",
        },
        theme: {
          color: "#4f46e5", // Indigo color
        },
      };

      // Step 5: Create a new Razorpay instance and open the checkout modal
      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (response) {
        // Handle payment failure
        alert(`Payment Failed: ${response.error.description}`);
        console.error("Payment Failed:", response.error);
      });

      rzp.open();

    } catch (error) {
      console.error("An error occurred during payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Go back to the previous or home page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Confirm Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Quotation ID:</strong> {quotation.quotationid}
          </div>
          <div>
            <strong>Recipient:</strong> {quotation.sendername}
          </div>
          <div>
            {/* Note: In your backend, you were using 'amount', but here it's 'ammount'. Ensure consistency. */}
            <strong>Amount:</strong> ₹{quotation.ammount}
          </div>
          <div>
            <strong>Description:</strong> {quotation.description}
          </div>

          <div className="flex justify-around items-center pt-4">
            <Button className="w-auto bg-indigo-600 hover:bg-indigo-700" onClick={handlePayment}>
              Confirm & Pay
            </Button>
            <Button className="w-auto bg-red-600 hover:bg-red-700" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;