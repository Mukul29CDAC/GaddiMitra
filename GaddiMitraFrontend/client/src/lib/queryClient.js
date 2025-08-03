import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


const mockDB = {
  "/api/dashboard/stats": {
    totalVehicles: 10,
    activeRequests: 4,
    acceptedQuotations: 2,
    totalQuotations: 6,
    completedTransactions: 3,
    pendingQuotations: 1,
  },
  "/api/notifications": [
    {
      id: 1,
      title: "Service Reminder",
      message: "Your car is due for service this week.",
      createdAt: new Date().toISOString(),
      isRead: false,
    },
    {
      id: 2,
      title: "New Quotation",
      message: "You have received a new quotation.",
      createdAt: new Date().toISOString(),
      isRead: true,
    },
  ],
  "/api/auth/user": {
    id: "123",
    firstName: "Mukul",
    email: "mukul@example.com",
    role: "customer",
  },

};


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey}) => {
        const key = queryKey[0];

        if (key === "/api/vehicles+users") {
          // You’re asking for both
          const [vehicles, request, totalVehicles, totalRequest,totalQuotation,notification] = await apiRequestMultiple([
           
            "http://localhost:8080/veichles/allVeichles",
            "http://localhost:8080/requests/showallrequests",
            "http://localhost:8080/veichles/totalVeichle",
            "http://localhost:8080/veichleRequest/total",
            "http://localhost:8080/quotation/totalQuotation",
            "http://localhost:8080/getNotification"

          ]);
          return { vehicles, request ,totalVehicles, totalRequest,totalQuotation,notification};
        }

        // fallback to mock
        if (mockDB[key]) {
          return mockDB[key];
        }

        throw new Error(`No handler or mock data for ${key}`);
      },
      staleTime: 1000 * 60 * 5,
    },
  },
});
// Optional: utility function to simulate API post/patch
export async function apiRequestMultiple(urls, options = {}) {
  const responses = await Promise.all(
    urls.map(url =>
      fetch(url, {
        method: options.method || "GET",
        ...options,
      }).then(res => {
        if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
        return res.json();
      })
    )
  );

  return responses;
}

