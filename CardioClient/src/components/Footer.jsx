import React from "react";
import {
  HeartPulse,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5 relative overflow-hidden transition-colors">
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-health-950/20 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-black text-xl tracking-tighter">
            <div className="bg-health-600 p-2 rounded-xl shadow-lg shadow-health-600/20">
              <HeartPulse className="text-white w-4 h-4" />
            </div>
            CardioGuard
          </div>
          <p className="text-slate-400 font-bold leading-relaxed text-xs italic opacity-80">
            "Empowering global health with ethical AI diagnostics.
            Precision-based cardiovascular risk assessments."
          </p>
          <div className="flex gap-3">
            <SocialIcon icon={<Twitter size={16} />} />
            <SocialIcon icon={<Linkedin size={16} />} />
            <SocialIcon icon={<Github size={16} />} />
          </div>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6 opacity-30">
            Navigation
          </h4>
          <ul className="space-y-3 font-bold text-sm italic">
            <li>
              <Link
                to="/"
                className="hover:text-health-500 transition-colors flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-health-500 transition-colors"></div>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/predict"
                className="hover:text-health-500 transition-colors flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-health-500 transition-colors"></div>
                Assessment
              </Link>
            </li>
            <li>
              <Link
                to="/disclaimer"
                className="hover:text-health-500 transition-colors flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-health-500 transition-colors"></div>
                Disclosure
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-health-500 transition-colors flex items-center gap-2 group"
              >
                <div className="w-1 h-1 rounded-full bg-slate-800 group-hover:bg-health-500 transition-colors"></div>
                Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6 opacity-30">
            Contact
          </h4>
          <ul className="space-y-4 font-bold">
            <li className="flex items-center gap-3 group">
              <div className="p-2 bg-slate-900 rounded-xl group-hover:bg-health-600 transition-all shadow-inner">
                <Mail className="w-4 h-4 text-health-500 group-hover:text-white" />
              </div>
              <span className="text-slate-300 group-hover:text-white transition-colors text-xs italic">
                diagnostics@cardioguard.ai
              </span>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="p-2 bg-slate-900 rounded-xl group-hover:bg-health-600 transition-all shadow-inner">
                <MapPin className="w-4 h-4 text-health-500 group-hover:text-white" />
              </div>
              <span className="text-slate-300 group-hover:text-white transition-colors text-xs italic">
                Health Valley, Silicon Oasis
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6 opacity-30">
            Security
          </h4>
          <div className="p-5 bg-slate-900/50 backdrop-blur-sm rounded-[24px] border border-white/5 hover:border-health-500/30 transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-1.5 bg-health-500/10 rounded-lg">
                <ShieldCheck className="text-health-500 w-5 h-5" />
              </div>
              <span className="text-white font-black text-sm tracking-tight italic">
                HIPAA Certified
              </span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic group-hover:text-slate-400 transition-colors">
              Advanced RSA-4096 encryption for state handling. Your clinical
              inputs are processed in-memory and never persisted.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-[10px] font-black text-slate-700 tracking-widest uppercase italic">
          © {new Date().getFullYear()} CardioGuard AI Systems
        </p>
        <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">
          <a href="#" className="hover:text-health-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-health-500 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-health-500 transition-colors">
            Compliance
          </a>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-500 hover:bg-health-600 hover:text-white transition-all cursor-pointer shadow-inner"
  >
    {icon}
  </a>
);

export default Footer;
