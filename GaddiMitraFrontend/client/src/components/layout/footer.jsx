import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-orange-600 text-white px-3 py-1 rounded-lg font-bold">
                GAADDI
              </div>
              <span className="font-semibold text-xl">Mitra</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted automotive platform connecting customers, dealers, and service centers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/cars" className="text-gray-400 hover:text-white transition-colors">Browse Cars</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
<<<<<<< HEAD
              <li><span className="text-gray-400"><Link to="/cars">Buy Cars</Link></span></li>
              <li><span className="text-gray-400">Sell Cars</span></li>
              <li><span className="text-gray-400">Car Service</span></li>
=======
              <li><span className="text-gray-400">Buy Cars</span></li>
              <li><span className="text-gray-400">Sell Cars</span></li>
              <li><span className="text-gray-400">Car Service</span></li>
              <li><span className="text-gray-400">Insurance</span></li>
>>>>>>> main
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">support@gaaddimitra.com</span></li>
              <li><span className="text-gray-400">+91 1800-123-4567</span></li>
              <li><span className="text-gray-400">Mon-Fri: 9AM-6PM</span></li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Gaaddi Mitra. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
