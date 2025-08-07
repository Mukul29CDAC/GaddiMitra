import { QueryClient } from "@tanstack/react-query";

// Optional mock fallback
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
      queryFn: async ({ queryKey }) => {
        const key = queryKey[0];
       



        if (key === "/api/transactions") {
          return []; // Placeholder
        }

        if (mockDB[key]) {
          return mockDB[key];
        }

        throw new Error(`No handler or mock data for ${key}`);
      },
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
