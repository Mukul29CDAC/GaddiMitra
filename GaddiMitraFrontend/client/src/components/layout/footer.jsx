import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cars" className="text-gray-400 hover:text-white transition-colors">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div> 

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Buy Cars</span>
              </li>
              <li>
                <span className="text-gray-400">Sell Cars</span>
              </li>
              <li>
                <span className="text-gray-400">Car Service</span>
              </li>
              <li>
                <span className="text-gray-400">Insurance</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">support@gaaddimitra.com</span>
              </li>
              <li>
                <span className="text-gray-400">+91 1800-123-4567</span>
              </li>
              <li>
                <span className="text-gray-400">Mon-Fri: 9AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Gaaddi Mitra. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}