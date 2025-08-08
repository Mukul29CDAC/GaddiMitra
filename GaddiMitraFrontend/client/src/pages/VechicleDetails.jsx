import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

// Data for the Mahindra Scorpio-N, updated to reflect June 2025 information
const scorpioNData = {
  name: 'Mahindra Scorpio-N',
  onRoadPrice: { min: '₹16.65 Lakh', max: '₹30.69 Lakh' }, // Updated on-road price range for Pune
  exShowroomPrice: { min: '₹13.99 Lakh', max: '₹25.42 Lakh' },
  latestUpdate: 'June 2025: ADAS added to Z8L variant at ₹21.35 Lakh (ex-showroom); a new Z8T variant is priced from ₹20.29 Lakh.',
  variants: [
    { name: 'Z2', exShowroom: '₹13.99 Lakh', onRoad: '₹16.65 Lakh', engine: '2.0L Petrol MT', power: '200 bhp', seating: '7-seater' },
    { name: 'Z4', exShowroom: '₹16.21 Lakh', onRoad: '₹19.59 Lakh', engine: '2.2L Diesel MT', power: '130 bhp', seating: '7-seater' },
    { name: 'Z6', exShowroom: '₹17.25 Lakh', onRoad: '₹20.82 Lakh', engine: '2.2L Diesel MT', power: '172 bhp', seating: '7-seater' },
    { name: 'Z8', exShowroom: '₹21.22 Lakh', onRoad: '₹25.72 Lakh', engine: '2.2L Diesel AT', power: '172 bhp', seating: '7-seater' },
    { name: 'Z8L (ADAS)', exShowroom: '₹21.35 Lakh', onRoad: '₹25.45 Lakh', engine: '2.0L Petrol MT', power: '200 bhp', seating: '7-seater' },
    { name: 'Z8L 4WD', exShowroom: '₹25.42 Lakh', onRoad: '₹30.73 Lakh', engine: '2.2L Diesel AT 4x4', power: '172 bhp', seating: '7-seater' },
  ],
  image:
    'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Scorpio/10764/1749625690756/front-left-side-47.jpg?tr=w-664',
  engines: [
    { fuel: 'Petrol (2.0L mStallion)', displacement: '1997 cc', power: '200 bhp (149 kW)', torque: '370-380 Nm' },
    { fuel: 'Diesel (2.2L mHawk)', displacement: '2184 cc', power: '130 bhp or 172 bhp (97 kW or 128 kW)', torque: '300-400 Nm' },
  ],
  mileage: '12.1 - 15.4 kmpl (ARAI)',
  dimensions: {
    length: '4,662 mm',
    width: '1,917 mm',
    height: '1,857 mm',
    wheelbase: '2,750 mm',
    groundClearance: '187 mm',
  },
  seating: '6/7-seater',
  features: [
    '5-Star Global NCAP Safety Rating',
    '8-inch touchscreen with AdrenoX UI',
    'Sony 12-speaker 3D audio system',
    'Dual-zone climate control',
    'Level 2 ADAS (Advanced Driver-Assistance Systems)',
    'Shift-on-fly 4XPLOR 4x4 system',
    'Built-in Amazon Alexa integration',
    'Wired Android Auto & Apple CarPlay',
    '6-way power-adjustable driver’s seat',
    'Sunroof and wireless charger',
  ],
  colors: ['Dazzling Silver', 'Deep Forest', 'Everest White', 'Stealth Black', 'Grand Canyon'],
};

// Section Header Component
const SectionHeader = ({ title }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-2 pb-2 border-blue-600">
    {title}
  </h2>
);

// Feature List Item Component with a stylish icon
const FeatureItem = ({ children }) => (
  <li className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm">
    <svg
      className="w-6 h-6 text-blue-600 flex-shrink-0 mr-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span className="text-gray-700 font-medium">{children}</span>
  </li>
);

export default function VehicleDetails() {
  const location = useLocation();
  const vehicle = scorpioNData;


  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
          {/* Hero Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 lg:gap-16">
            <div className="md:w-3/5">
              <img
                src={ vehicle.image}
                alt={vehicle.name}
                className="w-full h-auto rounded-xl shadow-2xl object-cover"
              />
            </div>
            <div className="flex-1 space-y-3 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-orange-600 leading-tight">
                {vehicle.name}
              </h1>
              {/* New 3-line description added here */}
              <p className="text-xs text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0">
                The Mahindra Scorpio-N is a modern, rugged SUV that perfectly blends a bold design
                with a premium, tech-savvy cabin. It offers powerful performance from its petrol and diesel
                engines, making it a strong contender for both city drives and adventurous getaways.
              </p>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-orange-600">
                  <span className="text-orange-600">
                    {vehicle.onRoadPrice.min}
                  </span>{' '}
                  –{' '}
                  <span className="text-orange-600">
                    {vehicle.onRoadPrice.max}
                  </span>
                </p>
                <p className="text-xs text-gray-500 italic font-semibold">
                  (On-Road Price in Pune)
                </p>
                <p className="text-xs text-gray-500">
                  Ex-showroom: {vehicle.exShowroomPrice.min} – {vehicle.exShowroomPrice.max}
                </p>
              </div>
              <p className="text-xs text-gray-600 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                <span className="font-semibold text-gray-800">Latest Update:</span>{' '}
                {vehicle.latestUpdate}
              </p>
              <button className="w-full md:w-auto bg-orange-600 text-white px-8 py-4 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg">
                Book a Test Drive
              </button>
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Variants Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <SectionHeader title="Available Variants" />
              <div className="overflow-x-auto">
                <table className="w-full text-left table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Variant</th>
                      <th className="py-3 px-6 text-left">Engine</th>
                      <th className="py-3 px-6 text-left">Power</th>
                      <th className="py-3 px-6 text-left">Price (Ex-Showroom)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 text-sm font-light">
                    {vehicle.variants.map((variant, idx) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50">
                        <td className="py-3 px-6 whitespace-nowrap font-medium text-gray-900">{variant.name}</td>
                        <td className="py-3 px-6">{variant.engine}</td>
                        <td className="py-3 px-6">{variant.power}</td>
                        <td className="py-3 px-6 font-bold text-blue-600">{variant.exShowroom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right-side cards */}
            <div className="space-y-8">
              {/* Engine & Performance Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <SectionHeader title="Engine & Performance" />
                <ul className="space-y-4 text-gray-700">
                  {vehicle.engines.map((e, idx) => (
                    <li key={idx} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <p className="font-semibold text-gray-900">{e.fuel}</p>
                      <ul className="list-disc list-inside ml-4 text-gray-600">
                        <li>Displacement: {e.displacement}</li>
                        <li>Power: {e.power}</li>
                        <li>Torque: {e.torque}</li>
                      </ul>
                    </li>
                  ))}
                  <li className="font-bold pt-2 text-gray-900">
                    Mileage (ARAI):{' '}
                    <span className="font-normal text-blue-600">{vehicle.mileage}</span>
                  </li>
                </ul>
              </div>

              {/* Dimensions & Colors Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <SectionHeader title="Dimensions & Colors" />
                <div className="grid grid-cols-2 gap-6 text-gray-700">
                  <p className="p-2 bg-gray-50 rounded-lg">
                    <strong className="font-semibold text-gray-900">Length:</strong>{' '}
                    {vehicle.dimensions.length}
                  </p>
                  <p className="p-2 bg-gray-50 rounded-lg">
                    <strong className="font-semibold text-gray-900">Width:</strong>{' '}
                    {vehicle.dimensions.width}
                  </p>
                  <p className="p-2 bg-gray-50 rounded-lg">
                    <strong className="font-semibold text-gray-900">Wheelbase:</strong>{' '}
                    {vehicle.dimensions.wheelbase}
                  </p>
                  <p className="p-2 bg-gray-50 rounded-lg">
                    <strong className="font-semibold text-gray-900">Ground Clearance:</strong>{' '}
                    {vehicle.dimensions.groundClearance}
                  </p>
                  <p className="col-span-2 p-2 bg-gray-50 rounded-lg">
                    <strong className="font-semibold text-gray-900">Seating:</strong>{' '}
                    {vehicle.seating}
                  </p>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {vehicle.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="px-5 py-2 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-200 transition-colors hover:bg-blue-100"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <SectionHeader title="Top Features" />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {vehicle.features.map((feat, idx) => (
                <FeatureItem key={idx}>{feat}</FeatureItem>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}