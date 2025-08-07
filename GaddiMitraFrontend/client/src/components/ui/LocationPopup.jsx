import { useState } from "react";
import { X, Search } from "lucide-react";


const cityIcons = {
  Pune: "https://cdn-icons-png.flaticon.com/512/16025/16025176.png",
  Mumbai: "https://cdn-icons-png.flaticon.com/128/774/774282.png",
  Delhi: "https://cdn-icons-png.flaticon.com/128/2465/2465341.png",
  Bengaluru: "https://cdn-icons-png.flaticon.com/128/10706/10706892.png",
  Chennai: "https://cdn-icons-png.flaticon.com/128/16025/16025209.png",
  Hyderabad: "https://cdn-icons-png.flaticon.com/128/4369/4369467.png",
  Jaipur: "https://cdn-icons-png.flaticon.com/128/11240/11240902.png",
  Chandigarh: "https://cdn-icons-png.flaticon.com/128/16025/16025212.png",
  Ahmedabad: "https://cdn-icons-png.flaticon.com/512/16025/16025219.png",
  Noida: "https://cdn-icons-png.flaticon.com/128/12539/12539950.png",
  Ghaziabad: "https://cdn-icons-png.flaticon.com/128/4093/4093118.png",
  Gurgaon: "https://cdn-icons-png.flaticon.com/128/2942/2942076.png",
};

export default function LocationPopup({ show, onClose, onSelect }) {
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("city") || ""
  );
  const [search, setSearch] = useState("");

  const cities = Object.keys(cityIcons).map((name) => ({
    name,
    icon: cityIcons[name],
  }));

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
        {/* Left Side*/}
        <div className="w-1/3 bg-orange-600 flex flex-col justify-center items-center p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Get great deals in your city!</h2>
          <div className="text-6xl">📍</div>
        </div>

        {/* City list */}
        <div className="w-2/3 bg-white p-6 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-black"
          >
            <X className="h-6 w-6" />
          </button>

          <h3 className="text-xl font-bold mb-4 text-center">Select your city</h3>
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

          <p className="font-semibold mb-3">Popular Cities</p>
          <div className="grid grid-cols-4 gap-4">
            {filteredCities.map((city) => (
              <div
                key={city.name}
                onClick={() => handleCityClick(city)}
                className={`flex flex-col items-center cursor-pointer border-2 rounded-lg p-4 transition ${
                  selectedCity === city.name
                    ? "border-orange-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <img
                    src={city.icon}
                    alt={`${city.name} landmark`}
                    className="w-10 h-10"
                  />
                </div>
                <span className="text-gray-700 font-medium">{city.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
