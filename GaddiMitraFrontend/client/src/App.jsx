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
import AboutUs from './pages/AboutUs.jsx'
import LocationPopup from "./components/ui/LocationPopup.jsx";

function Router() {
  // const { isAuthenticated, isLoading } = useAuth();

  return (
   
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/login" element={<LoginModal />}/> */}
            <Route path="/servicecenters" element={<ServiceCenters/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/vehicles/add" element={<AddVehicle />} />
            <Route path="/dashboard/vehicles/edit" element={<EditVehicle />} />
            <Route path="/dashboard/request/details" element={<RequestDetails />} />
            <Route path="/dashboard/send-quotation" element={<SendQuotationForm />} />
            <Route path="/dashboard/request/service" element={<ServiceVehicleForm />} />
          
            <Route path="/about" element={<AboutUs />} />
            {/* Add other routes as needed */}
            <Route path="*" element={<NotFound />} />
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
