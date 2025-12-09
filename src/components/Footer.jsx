import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo + Description */}
          <div>
            <h2 className="text-3xl font-bold mb-3">
              Scholar <span className="text-secondary">Stream</span>
            </h2>
            <p className="opacity-90 leading-relaxed">
              Your trusted platform to explore scholarships, apply with
              guidance, and achieve global education opportunities effortlessly.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-5">
              <a href="#" className="hover:text-secondary text-xl transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-secondary text-xl transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-secondary text-xl transition">
                <FaYoutube />
              </a>
              <a href="#" className="hover:text-secondary text-xl transition">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-secondary pb-2 w-max">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-secondary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/scholarships"
                  className="hover:text-secondary transition"
                >
                  Scholarships
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-secondary transition">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-secondary transition">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-secondary transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-secondary pb-2 w-max">
              Contact Us
            </h3>

            <ul className="space-y-3 opacity-90">
              <li>Email: support@scholarstream.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Location: Kolkata, India</li>
            </ul>

            <Link
              to="/contact"
              className="inline-block mt-4 px-5 py-2 rounded-md bg-secondary text-primary font-semibold hover:bg-[#c8b78c] transition"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary mt-10 pt-5 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Scholar Stream. All Rights Reserved
            (Ikbal Mondal).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
