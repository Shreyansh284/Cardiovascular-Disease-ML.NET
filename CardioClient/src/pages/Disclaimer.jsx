import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Disclaimer = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const handleContinue = () => {
    if (accepted) {
      navigate("/predict");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="bg-amber-50 p-8 border-b border-amber-100 flex items-start gap-4">
          <div className="p-3 bg-amber-100 rounded-full shrink-0">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Medical Disclaimer
            </h2>
            <p className="text-slate-600">
              Please read efficiently before proceeding.
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="prose prose-slate max-w-none text-slate-600">
            <p>
              This Cardiovascular Disease Prediction Tool uses a machine
              learning model trained on historical medical data to estimate the
              risk of cardiovascular disease.
            </p>
            <p className="font-semibold text-slate-800">
              By using this tool, you acknowledge that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                This tool is for{" "}
                <strong>educational and informational purposes only</strong>.
              </li>
              <li>
                The results provided are <strong>estimates</strong> based on
                statistical patterns and may be inaccurate.
              </li>
              <li>
                This tool <strong>does not constitute medical advice</strong>,
                diagnosis, or treatment.
              </li>
              <li>
                You should always consult with a qualified healthcare
                professional regarding any medical condition or concerns.
              </li>
              <li>
                In case of a medical emergency, call your local emergency
                services immediately.
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-1">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <div className="w-6 h-6 border-2 border-slate-300 rounded-md peer-checked:bg-health-600 peer-checked:border-health-600 transition-colors"></div>
                <CheckCircle2 className="w-4 h-4 text-white absolute top-1 left-1 opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-slate-700 select-none group-hover:text-slate-900 transition-colors">
                I understand that this is not a medical device and I accept the
                terms above.
              </span>
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleContinue}
              disabled={!accepted}
              className={`
                                flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300
                                ${
                                  accepted
                                    ? "bg-health-600 text-white hover:bg-health-700 shadow-lg hover:shadow-xl translate-y-0"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }
                            `}
            >
              Accept & Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Disclaimer;
