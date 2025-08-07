// src/pages/centerDetails.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

const ServiceCenterDetail = () => {
  const location = useLocation();
  const { center } = location?.state;

  if (!center) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center text-red-600 p-8 bg-white shadow-lg rounded-lg">
          <p className="text-xl font-semibold">Center details not available.</p>
          <p className="text-gray-600 mt-2">Please go back and select a service center.</p>
        </div>
      </div>
    );
  }

  const mapQuery = encodeURIComponent(center.address);
  const mapSrc = `https://maps.google.com/maps?q=${mapQuery}&output=embed`;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-screen-lg w-full mx-auto mt-8 px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 text-center pb-5">{center.name}</h1>
            {/* <p className="text-gray-500 text-lg mb-8 text-center">Service Center Details</p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Info Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 10a2 2 0 01-2 2H7a2 2 0 01-2-2V9.309a2 2 0 01.111-.849l8.3-5.534a2 2 0 011.778 0l8.3 5.534A2 2 0 0121 9.309V18a2 2 0 01-2 2z" />
                  </svg>
                  <p className="font-medium">
                    <span className="font-semibold text-gray-900">Email:</span> {center.email}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.26.963a11.042 11.042 0 005.417 5.417l.962-2.26a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-3.28C8.91 21 3 15.09 3 7.28V5z" />
                  </svg>
                  <p className="font-medium">
                    <span className="font-semibold text-gray-900">Phone:</span> {center.phone}
                  </p>
                </div>
                <div className="flex items-start space-x-3 text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-medium">
                    <span className="font-semibold text-gray-900">Address:</span> {center.address}
                  </p>
                </div>
              </div>

              {/* Map Section */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <iframe
                  title="Service Center Location"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={mapSrc}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceCenterDetail;