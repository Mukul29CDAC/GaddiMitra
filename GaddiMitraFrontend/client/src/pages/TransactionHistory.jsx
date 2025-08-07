// src/pages/TransactionHistory.jsx
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import Header from "../components/layout/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useState } from "react";

// // Mock data until the API is ready
const transactions = [
  {
    id: "txn_12345",
    date: "2024-05-20",
    description: "Service for Honda Amaze",
    amount: -4500,
    status: "Completed",
  },
  {
    id: "txn_12346",
    date: "2024-05-18",
    description: "Quotation Payment for Scorpio-N",
    amount: -25000,
    status: "Completed",
  },
  {
    id: "txn_12347",
    date: "2024-05-15",
    description: "Refund for cancelled service",
    amount: 500,
    status: "Completed",
  },
  {
    id: "txn_12348",
    date: "2024-05-12",
    description: "Payment for Vehicle Purchase",
    amount: -500000,
    status: "Completed",
  },
  {
    id: "txn_12349",
    date: "2024-05-10",
    description: "Pending service payment",
    amount: -3000,
    status: "Pending",
  },
  {
    id: "txn_12350",
    date: "2024-05-01",
    description: "Failed transaction",
    amount: -1500,
    status: "Failed",
  },
];

export default function TransactionHistory() {
  const { user ,token} = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //   // Replace with a real API call once the backend endpoint is available
  // //   const { data: transactions, isLoading, error } = useQuery({
  // //     queryKey: ["/api/transactions", user?.userid],
  // //     queryFn: () => Promise.resolve(MOCK_TRANSACTIONS), // Using mock data
  // //       retry: false, // or true based on your logic
  // //   suspense: false, // set true only if using Suspense
  // //   useErrorBoundary: false,

  // //   });

  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Transaction History
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Your Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <p>Loading transactions...</p>}
            {error && (
              <p className="text-red-500">Failed to load transactions.</p>
            )}

            {transactions && (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {transactions.length === 0 && (
                  <p>You have no transactions yet.</p>
                )}
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {txn.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(txn.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        | ID: {txn.id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold text-lg ${
                          txn.amount > 0 ? "text-green-600" : "text-gray-700"
                        }`}
                      >
                        {txn.amount > 0 ? "+" : ""}₹
                        {Math.abs(txn.amount).toLocaleString("en-IN")}
                      </p>
                      <Badge className={`mt-1 ${getStatusVariant(txn.status)}`}>
                        {txn.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
