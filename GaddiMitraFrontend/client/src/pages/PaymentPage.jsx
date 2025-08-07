// src/pages/PaymentPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // The quotation details should be passed via navigation state
  const { quotation } = location.state || {};

  if (!quotation) {
    return <p className="text-red-500">No payment details data found.</p>;
  }

  const handlePayment = () => {
   
    alert("Payment successful!");
    navigate("/dashboard"); // Go back to dashboard or confirmation page
  };

    const handleCancel = () => {
   
    // alert("Payment successful!");
    navigate("/"); // Go back to dashboard or confirmation page
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
            <strong>Reciever:</strong> {quotation.sendername}
          </div>
          <div>
            <strong>Amount:</strong> ₹{quotation.ammount}
          </div>
          <div>
            <strong>Description:</strong> {quotation.description}
          </div>


        <div className="flex justify-around items-center">
               <Button className="w-auto mt-4 bg-indigo-600" onClick={handlePayment}>
            Confirm
          </Button>

            <Button className="w-auto mt-4 bg-red-600" onClick={()=>handleCancel()}>
            Cancel
          </Button>
        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
