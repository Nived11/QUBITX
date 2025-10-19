import AppName from "./AppName";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#140b5b] to-[#102362] text-white  pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold pb-2 mb-3 border-b-2 border-blue-400 inline-block">
              {AppName}
            </h3>
            <p className="text-gray-300">
              Your one-stop shop for electronics and gadgets. Quality products, competitive prices, and excellent service.
            </p>
          </div>

          {/* About Us */}
          <div className="transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-semibold pb-2 mb-3 border-b-2 border-blue-400 inline-block">
              About Us
            </h3>
            <ul>
              <li className="py-1 hover:text-blue-300 transition-colors"><Link to="/our-story">Our Story</Link></li>
              <li className="py-1 hover:text-blue-300 transition-colors"><Link to="/team">Team</Link></li>
              <li className="py-1 hover:text-blue-300 transition-colors"><Link to="/careers">Careers</Link></li>
              <li className="py-1 hover:text-blue-300 transition-colors"><Link to="/press">Press</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-semibold pb-2 mb-3 border-b-2 border-blue-400 inline-block">
              Help & Support
            </h3>
            <ul>
              <li className="py-1 hover:text-blue-300 transition-colors"><Link to="/faq">FAQ</Link></li>
              <li className="py-1 hover:text-blue-300 transition-colors"><Link to="/shipping">Shipping</Link></li>
              <li className="py-1 hover:text-blue-300 transition-colors"><Link to="/returns">Returns</Link></li>
              <li className="py-1 hover:text-blue-300 transition-colors"><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="transition-transform duration-300 hover:-translate-y-1">
            <h3 className="text-lg font-semibold pb-2 mb-3 border-b-2 border-blue-400 inline-block">
              Follow Us
            </h3>
            <div className="flex space-x-3 mt-4">
              {/* X Logo */}
              <Link to="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-blue-800 transition-all">
               <FaXTwitter size={14} />
              </Link>

              <Link to="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-blue-800 transition-all">
                <FaFacebook />
              </Link>
              <Link to="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-blue-800 transition-all">
                <FaInstagram />
              </Link>
              <Link to="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-blue-800 transition-all">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-blue-700 text-center text-sm text-gray-300">
          <p>© 2025 {AppName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
