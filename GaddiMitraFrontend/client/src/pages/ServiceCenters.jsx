import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/layout/header";

export default function ServiceCenters() {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServiceCenters();
  }, []);

  const fetchServiceCenters = async () => {
    try {
      const response = await axios.get("http://localhost:8080/servicecenter/allcenters");
      setServiceCenters(response.data);
    } catch (err) {
      setError("Failed to fetch service centers.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Registered Service Centers</h2>

        {loading && <p className="text-center text-gray-500">Loading service centers...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCenters.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">No service centers registered yet.</p>
            ) : (
              serviceCenters.map((center) => (
                <div
                  key={center.id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{center.name}</h3>

                  <div className="space-y-1 text-gray-700 text-sm">
                    <p><span className="font-medium text-gray-600">📧 Email:</span> {center.email}</p>
                    <p><span className="font-medium text-gray-600">📞 Phone:</span> {center.phone}</p>
                    <p><span className="font-medium text-gray-600">📍 Location:</span> {center.address}</p>
                    <p><span className="font-medium text-gray-600">Type:</span> {center.type}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
