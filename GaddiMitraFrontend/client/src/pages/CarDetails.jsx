import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaPlus, FaMinus } from "react-icons/fa";

const dummyData = {
  1: {
    name: "Hyundai Creta 1.5 E",
    colors: {
      white: {
        label: "Atlas White",
        image:
          "https://imgd.aeplcdn.com/0x0/n/cw/ec/96847/creta-exterior-right-front-three-quarter.jpeg",
      },
      red: {
        label: "Fiery Red",
        image:
          "https://imgd.aeplcdn.com/0x0/n/cw/ec/129047/creta-exterior-right-front-three-quarter-11.jpeg",
      },
      black: {
        label: "Phantom Black",
        image:
          "https://imgd.aeplcdn.com/0x0/n/cw/ec/96857/creta-exterior-right-front-three-quarter-2.jpeg",
      },
    },
    price: "₹13.01 Lakh",
    year: "2025",
    fuel: "Petrol",
    transmission: "Manual",
    seats: "5 Seater",
    engine: "1497 cc",
    mileage: "17.40 km/l",
    power: "113@6300",
    torque: "143.8@4500",
    gearbox: "6 Speed",
    steering: "Electric",
    wheelType: "Steel with Cover",
    boot: "433 Ltrs",
    powerWindows: "Front & Rear",
    length: "4330 mm",
    width: "1790 mm",
    height: "1635 mm",
    description: "The Hyundai Creta is a stylish and powerful SUV...",
    expandableSections: {
      Comfort:
        "Comfort features include AC, rear AC vents, and ventilated seats.",
      Interior:
        "Interior has premium upholstery, touchscreen, and ambient lighting.",
      Safety: "6 airbags, ABS with EBD, ESP, and Hill Assist.",
      Exterior: "LED headlamps, DRLs, sporty grille, alloy wheels.",
      Engine: "1.5L Petrol engine generating 113bhp and 143.8Nm torque.",
      Dimensions: "Length: 4330mm, Width: 1790mm, Height: 1635mm.",
      Instrumentation:
        "Digital cluster, infotainment screen, trip meter, fuel meter.",
      Transmission: "6-speed manual transmission.",
    },
    priceBreakup: [
      { label: "Ex-Showroom Price", value: "₹11.00 Lakh" },
      { label: "RTO Charges", value: "₹1.20 Lakh" },
      { label: "Insurance", value: "₹0.70 Lakh" },
      { label: "Other Charges", value: "₹0.11 Lakh" },
      { label: "Total On-Road Price", value: "₹13.01 Lakh" },
    ],
  },
};

export default function CarDetails() {
  const { id } = useParams();
  const vehicle = dummyData[1]; // Replace with dummyData[id] in actual

  const [selectedColor, setSelectedColor] = useState("white");
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>

        {/* Image and Price with Price Breakdown */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-1/2">
            <img
              src={vehicle.colors[selectedColor].image}
              alt="Car"
              className="w-full rounded-lg shadow-md"
            />
            <div className="mt-4">
              <p className="text-xl font-semibold mb-4">{vehicle.price}</p>
              <p className="text-gray-600">{vehicle.description}</p>

              {/* Color Options */}
              <div className="mt-6">
                <h2 className="font-semibold text-lg mb-2">Available Colors</h2>
                <div className="flex gap-4">
                  {Object.entries(vehicle.colors).map(
                    ([colorKey, colorData]) => (
                      <div
                        key={colorKey}
                        onClick={() => setSelectedColor(colorKey)}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                          selectedColor === colorKey
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: colorKey }}
                        title={colorData.label}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Breakup */}
          <div className="w-full md:w-1/3 lg:sticky lg:top-24 h-fit bg-white shadow rounded p-4">
            <h3 className="text-xl font-semibold mb-4">
              {vehicle.name} Price Breakup
            </h3>
            <ul className="text-sm space-y-2">
              {vehicle.priceBreakup.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-gray-100 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Specifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Fuel:</strong> {vehicle.fuel}
            </div>
            <div>
              <strong>Engine:</strong> {vehicle.engine}
            </div>
            <div>
              <strong>Transmission:</strong> {vehicle.transmission}
            </div>
            <div>
              <strong>Body Type:</strong> SUV
            </div>
            <div>
              <strong>Model Year:</strong> {vehicle.year}
            </div>
            <div>
              <strong>Seating:</strong> {vehicle.seats}
            </div>
            <div>
              <strong>Mileage:</strong> {vehicle.mileage}
            </div>
            <div>
              <strong>Max Power:</strong> {vehicle.power}
            </div>
            <div>
              <strong>Max Torque:</strong> {vehicle.torque}
            </div>
            <div>
              <strong>Gear Box:</strong> {vehicle.gearbox}
            </div>
            <div>
              <strong>Steering Type:</strong> {vehicle.steering}
            </div>
            <div>
              <strong>Wheel Type:</strong> {vehicle.wheelType}
            </div>
            <div>
              <strong>Boot Space:</strong> {vehicle.boot}
            </div>
            <div>
              <strong>Power Windows:</strong> {vehicle.powerWindows}
            </div>
            <div>
              <strong>Length:</strong> {vehicle.length}
            </div>
            <div>
              <strong>Width:</strong> {vehicle.width}
            </div>
            <div>
              <strong>Height:</strong> {vehicle.height}
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">More Details</h2>
          {Object.entries(vehicle.expandableSections).map(
            ([title, content]) => (
              <div key={title} className="border-b py-3">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(title)}
                >
                  <span className="text-lg font-medium">{title}</span>
                  {expandedSection === title ? <FaMinus /> : <FaPlus />}
                </div>
                {expandedSection === title && (
                  <p className="mt-2 text-sm text-gray-700">{content}</p>
                )}
              </div>
            )
          )}
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          {[
            "What is the on-road price of this car?",
            "What is the mileage in city conditions?",
            "Does it come with automatic transmission?",
          ].map((question, idx) => (
            <div key={idx} className="border-b py-3">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection(question)}
              >
                <span className="text-lg font-medium">{question}</span>
                {expandedSection === question ? <FaMinus /> : <FaPlus />}
              </div>
              {expandedSection === question && (
                <p className="mt-2 text-sm text-gray-700">
                  This is a placeholder answer. You can customize it later.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
