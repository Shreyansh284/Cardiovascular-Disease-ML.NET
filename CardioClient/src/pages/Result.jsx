import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, AlertOctagon, RefreshCw, Activity } from "lucide-react";

const Result = () => {
  const { state } = useLocation();

  // Redirect if no data
  if (!state || !state.result) {
    return <Navigate to="/predict" />;
  }

  const { result, input } = state;
  const isHighRisk = result.hasDisease;
  const probability = result.probability * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div
            className={`p-12 text-center relative overflow-hidden ${
              isHighRisk ? "bg-red-50" : "bg-emerald-50"
            }`}
          >
            {/* Background Decoration */}
            <div
              className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${
                isHighRisk
                  ? "from-red-300 to-red-600"
                  : "from-emerald-300 to-emerald-600"
              }`}
            ></div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg ${
                isHighRisk
                  ? "bg-red-100 text-red-600"
                  : "bg-emerald-100 text-emerald-600"
              }`}
            >
              {isHighRisk ? (
                <AlertOctagon className="w-12 h-12" />
              ) : (
                <CheckCircle className="w-12 h-12" />
              )}
            </motion.div>

            <h2
              className={`text-3xl font-bold mb-2 ${
                isHighRisk ? "text-red-900" : "text-emerald-900"
              }`}
            >
              {isHighRisk ? "Action Required" : "Looking Good!"}
            </h2>

            <p
              className={`text-lg font-medium mb-8 ${
                isHighRisk ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {isHighRisk
                ? "Our analysis suggests a higher likelihood of cardiovascular issues."
                : "Our analysis suggests a low risk level based on your inputs."}
            </p>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto border border-white/50">
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">
                Risk Probability
              </div>
              <div className="text-4xl font-bold text-slate-800">
                {probability.toFixed(1)}%
              </div>
              <div className="mt-2 text-xs text-slate-400">
                This is a statistical estimate provided by AI.
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 bg-white">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-health-600" />
              Recommended Actions
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {isHighRisk ? (
                <>
                  <SuggestionItem
                    type="warning"
                    text="Schedule a check-up with a cardiologist soon."
                  />
                  <SuggestionItem
                    type="neutral"
                    text="Monitor your blood pressure daily."
                  />
                  <SuggestionItem
                    type="neutral"
                    text="Reduce sodium and saturated fat intake."
                  />
                  <SuggestionItem
                    type="neutral"
                    text="Avoid smoking and alcohol consumption."
                  />
                </>
              ) : (
                <>
                  <SuggestionItem
                    type="success"
                    text="Continue maintaining an active lifestyle."
                  />
                  <SuggestionItem
                    type="neutral"
                    text="Keep a balanced diet rich in vegetables."
                  />
                  <SuggestionItem
                    type="neutral"
                    text="Regular yearly check-ups are still reliable."
                  />
                  <SuggestionItem
                    type="neutral"
                    text="Stay hydrated and sleep well."
                  />
                </>
              )}
            </div>

            <div className="flex justify-center">
              <Link to="/predict">
                <button className="flex items-center gap-2 text-slate-500 font-medium hover:text-health-600 transition-colors px-6 py-2 rounded-lg hover:bg-slate-50">
                  <RefreshCw className="w-4 h-4" />
                  Check Another Person
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SuggestionItem = ({ text, type = "neutral" }) => {
  let bulletColor = "bg-slate-300";
  if (type === "warning") bulletColor = "bg-red-400";
  if (type === "success") bulletColor = "bg-emerald-400";

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
      <div
        className={`w-2 h-2 rounded-full mt-2 shrink-0 ${bulletColor}`}
      ></div>
      <span className="text-slate-600 leading-normal">{text}</span>
    </div>
  );
};

export default Result;
