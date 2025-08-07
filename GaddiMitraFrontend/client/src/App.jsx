import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.js";
import { Toaster } from "./components/ui/toaster.jsx";
import { TooltipProvider } from "./components/ui/tooltip.jsx";

import Landing from "./pages/landing.jsx";
import Home from "./pages/home.jsx";
import Cars from "./pages/cars.jsx";
import Dashboard from "./pages/dashboard.jsx";
import AddVehicle from "./pages/AddVehicle.jsx";
import NotFound from "./pages/not-found.jsx";
import EditVehicle from "./pages/EditVehicle.jsx";
import RequestDetails from "./pages/RequestDetails.jsx";
import SendQuotationForm from "./pages/SendQuotationForm.jsx";
import ServiceCenters from "./pages/ServiceCenters.jsx";
import BuyVehicleForm from "./pages/ServiceVehicleForm.jsx";
import ServiceVehicleForm from "./pages/ServiceVehicleForm.jsx";
import LoginModal from "./pages/LoginModal.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import LocationPopup from "./components/ui/LocationPopup.jsx";
import VechileDetails from "./pages/VechicleDetails.jsx";
import VehicleDetails from "./pages/VechicleDetails.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import Notification from "./pages/Notification.jsx";
import Notify from "./pages/Notification.jsx";
import NotifyPop from "./pages/Notification.jsx";
import TransactionHistory from "./pages/TransactionHistory.jsx";
import ContactSupport from "./pages/ContactSupport.jsx";
import Profile from "./pages/Profile.jsx";
import QuotationDetails from "./pages/QuotationDetails.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/dashboard/transactions" element={<TransactionHistory />} />
            <Route path="/contact" element={<ContactSupport />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/servicecenters" element={<ServiceCenters />} />
            <Route path="/dashboard/quotation/detail" element={<QuotationDetails/>}/>
            <Route path="/dashboard/quotation/details/payment" element={<PaymentPage/>}></Route>
            
                 <Route
              path="/dashboard/request/service"
              element={<ServiceVehicleForm />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/login" element={<LoginModal />}/> */}
            <Route path="/servicecenters" element={<ServiceCenters />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/vehicles/add" element={<AddVehicle />} />
            <Route path="/dashboard/vehicles/edit" element={<EditVehicle />} />
            <Route
              path="/dashboard/request/details"
              element={<RequestDetails />}
            />
            <Route
              path="/dashboard/send-quotation"
              element={<SendQuotationForm />}
            />
            <Route
              path="/dashboard/request/service"
              element={<ServiceVehicleForm />}
            />
                <Route path="/dashboard/quotation/details/payment" element={<PaymentPage/>}></Route>

            <Route path="/about" element={<AboutUs />} />
            <Route path="/cars/details" element={<VehicleDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/dashboard/transactions"
              element={<TransactionHistory />}
            />
            <Route path="/dashboard/quotation/detail" element={<QuotationDetails/>}/>
            <Route path="/contact" element={<ContactSupport />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/notify" element={<NotifyPop />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <LocationPopup />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
