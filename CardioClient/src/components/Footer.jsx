import React from "react";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <Heart className="text-health-500 w-6 h-6 fill-health-500" />
            CardioGuard
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Empowering you with AI-driven insights for better cardiovascular
            health. Early detection is the first step towards prevention.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-health-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/disclaimer"
                className="hover:text-health-400 transition-colors"
              >
                Check Health
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-health-400 transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-health-500" />
              <span>support@cardioguard.ai</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-health-500" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-health-500" />
              <span>123 Health Valley, CA</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/privacy"
                className="hover:text-health-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-health-400 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li className="text-xs text-slate-500 mt-4">
              © {new Date().getFullYear()} CardioGuard. <br />
              All rights reserved.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
        <p>Designed for educational purposes.</p>
        <div className="flex gap-4">
          <Github className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          <Twitter className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
          <Linkedin className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
