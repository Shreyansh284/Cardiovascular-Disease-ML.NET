import React from "react";
import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-health-100">
      <Link to="/" className="flex items-center gap-2 group cursor-pointer">
        <div className="bg-health-50 p-2 rounded-full group-hover:bg-health-100 transition-colors">
          <HeartPulse className="text-health-600 w-6 h-6 animate-pulse" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-health-700 to-health-500">
          CardioGuard
        </span>
      </Link>

      <div className="flex gap-4">
        <Link
          to="/"
          className="text-slate-600 hover:text-health-600 font-medium transition-colors"
        >
          Home
        </Link>
        <Link
          to="/disclaimer"
          className="text-slate-600 hover:text-health-600 font-medium transition-colors"
        >
          Check Health
        </Link>
        <Link
          to="/faq"
          className="text-slate-600 hover:text-health-600 font-medium transition-colors"
        >
          FAQ
        </Link>
      </div>
    </nav>
  );
};

export default Header;
