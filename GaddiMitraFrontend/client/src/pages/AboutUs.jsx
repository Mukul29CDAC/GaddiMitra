import { Link } from "react-router-dom";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      <Header></Header>
      {/* Top Banner Section */}
      <div className="bg-orange-600 text-white py-16 px-6 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-4">About <span className="text-yellow-300">Gaaddi Mitra</span></h1>
        <p className="text-lg max-w-3xl mx-auto">
          Your trusted automotive platform that connects customers, dealers, and service centers.  
          Our goal is to simplify vehicle management, service quotations, and transactions.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 text-gray-800">
        
        {/* Mission Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-orange-600 mb-3">🚗 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To provide seamless vehicle management and service solutions with an easy-to-use platform.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-10 bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-200">
          <h2 className="text-2xl font-bold text-orange-600 mb-3">🔥 Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Manage vehicles easily with an intuitive dashboard.</li>
            <li>Request and compare service quotations in seconds.</li>
            <li>Secure and easy online payment options.</li>
            <li>Reliable dealer and service center network across multiple cities.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-4">Ready to experience hassle-free vehicle management?</h3>
          <Link
            to="/cars" 
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
          >
            Browse Cars →
          </Link>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
