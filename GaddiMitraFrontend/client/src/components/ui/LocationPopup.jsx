import { useState } from "react";
import { X, MapPin, Search } from "lucide-react";

export default function LocationPopup({ show, onClose, onSelect }) {
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("city") || ""
  );
  const [search, setSearch] = useState("");

  const cities = [
    { name: "Ahmedabad", img: "/images/cities/ahmedabad.jpg" },
    { name: "Bangalore", img: "/images/cities/bangalore.jpg" },
    { name: "Chandigarh", img: "/images/cities/chandigarh.jpg" },
    { name: "Chennai", img: "/images/cities/chennai.jpg" },
    { name: "Delhi", img: "/images/cities/delhi.jpg" },
    { name: "Faridabad", img: "/images/cities/faridabad.jpg" },
    { name: "Ghaziabad", img: "/images/cities/ghaziabad.jpg" },
    { name: "Gurgaon", img: "/images/cities/gurgaon.jpg" },
    { name: "Hyderabad", img: "/images/cities/hyderabad.jpg" },
    { name: "Jaipur", img: "/images/cities/jaipur.jpg" },
    { name: "Mumbai", img: "/images/cities/mumbai.jpg" },
    { name: "Noida", img: "/images/cities/noida.jpg" },
    { name: "Pune", img: "/images/cities/pune.jpg" },
  ];

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCityClick = (city) => {
    setSelectedCity(city.name);
    localStorage.setItem("city", city.name);
    onSelect(city.name);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-[80%] h-[80%] rounded-xl shadow-2xl flex overflow-hidden">
        {/* Left Banner */}
        <div className="w-1/3 bg-orange-600 flex flex-col justify-center items-center p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Get great deals in your city!
          </h2>
          <img src="/images/cars-banner.png" alt="Cars" className="w-64" />
        </div>

        {/* Right City List */}
        <div className="w-2/3 bg-white p-6 overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Header */}
          <h3 className="text-xl font-bold mb-4 text-center">
            Select your city
          </h3>

          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search city"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-700"
            />
          </div>

          {/* Popular Cities */}
          <p className="font-semibold mb-3">Popular Cities</p>
          <div className="grid grid-cols-4 gap-4">
            {filteredCities.map((city) => (
              <div
                key={city.name}
                onClick={() => handleCityClick(city)}
                className={`flex flex-col items-center cursor-pointer border-2 rounded-lg p-2 transition ${
                  selectedCity === city.name
                    ? "border-orange-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-16 h-16 rounded-full object-cover mb-2"
                />
                <span className="text-gray-700 font-medium">{city.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
