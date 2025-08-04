import { QueryClient } from "@tanstack/react-query";

// Optional mock fallback (only used if API fails or not available)
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

// API utility function
export async function apiRequestMultiple(urls) {
 
  try {
    const responses = await Promise.all(
      urls.map((url) =>
        
       
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
            // ...( {}),
          },
          // ...options,
        }).then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Error fetching ${url}:\n${res.status} - ${text}`);
          }
          return res.json();
        })
      )
    );
    return responses;
  } catch (error) {
    console.error("❌ API error in apiRequestMultiple:", error);
    throw error;
  }
}

// QueryClient setup
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const key = queryKey[0];
        const id = queryKey[1];

        if (key === "/api/vehicles+users") {
          const [
            vehicles,
            request,
            totalVehicles,
            totalRequest,
            totalQuotation,
            notification,
          ] = await apiRequestMultiple([
            "http://localhost:8080/veichles/allVeichles",
            `http://localhost:8080//requests/showallrequests/${id}`,

            
           
          ]);
          return {
            vehicles,
            request,
            totalVehicles,
            totalRequest,
            totalQuotation,
            notification,
          };
        }

        // fallback to mock
        if (mockDB[key]) {
          return mockDB[key];
        }

        throw new Error(`No handler or mock data for ${key}`);
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1, // retry once on failure
      refetchOnWindowFocus: false,
    },
  },
});
