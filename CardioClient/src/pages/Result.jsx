import React, { useMemo } from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  RefreshCw,
  Activity,
  Heart,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

const Result = () => {
  const { state } = useLocation();

  if (!state || !state.result) {
    return <Navigate to="/predict" />;
  }

  const { result } = state;
  const probability = result.probability * 100;

  // Calculate Risk Level
  const risk = useMemo(() => {
    if (probability < 35)
      return {
        level: "Stable",
        color: "emerald",
        icon: <CheckCircle className="w-14 h-14" />,
        message: "Your heart health profile looks stable 💚",
        description:
          "Your physiological markers are well within the standard healthy distribution. Small preventive habits today create clinical resilience tomorrow.",
        advice: [
          "Maintain current physical activity levels.",
          "Continue a diet rich in omega-3 and complex fibers.",
          "Schedule your annual preventative screening.",
          "Optimize sleep quality for cardiac recovery.",
        ],
      };
    if (probability < 65)
      return {
        level: "Warning",
        color: "yellow",
        icon: <AlertTriangle className="w-14 h-14" />,
        message: "The AI has detected moderate risk markers.",
        description:
          "While not critical, several variables (BP, cholesterol, or habits) align with early cardiovascular strain. Early intervention is key.",
        advice: [
          "Reduce sodium and high-fructose corn syrup.",
          "Target 150 mins of zone-2 cardio per week.",
          "Consult a GP regarding your BP trends.",
          "Screen for hidden inflammatory markers.",
        ],
      };
    return {
      level: "Critical",
      color: "red",
      icon: <AlertOctagon className="w-14 h-14" />,
      message: "The AI has identified high correlation with CVD.",
      description:
        "Your metrics closely align with clinical datasets for heart disease. This warrants immediate professional clinical review and verification.",
      advice: [
        "Immediate clinical consultation recommended.",
        "Diagnostic blood work (CRP, Lipid Profile) needed.",
        "Review heart rate variability (HRV) with an MD.",
        "Drastic reduction of all high-salt processed foods.",
      ],
    };
  }, [probability]);

  const colorConfig = {
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-500/20",
      gradient: "from-emerald-400 to-teal-500",
      glow: "shadow-emerald-500/30",
    },
    yellow: {
      bg: "bg-amber-50 dark:bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-500/20",
      gradient: "from-amber-300 to-orange-500",
      glow: "shadow-amber-500/30",
    },
    red: {
      bg: "bg-rose-50 dark:bg-rose-500/10",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-100 dark:border-rose-500/20",
      gradient: "from-rose-500 to-red-600",
      glow: "shadow-rose-500/30",
    },
  };

  const config = colorConfig[risk.color];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16 transition-colors duration-500 relative">
      <div
        className={`absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_100%_0%,rgba(225,29,72,0.03),transparent)] pointer-events-none`}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 relative z-10"
      >
        <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
          <div className="grid lg:grid-cols-12">
            {/* Left Column: Result & Stats */}
            <div
              className={`lg:col-span-5 p-10 ${config.bg} border-r border-slate-100 dark:border-slate-800 flex flex-col items-center text-center`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className={`w-20 h-20 rounded-3xl bg-white dark:bg-slate-800 flex items-center justify-center mb-6 shadow-lg ${config.text}`}
              >
                {React.cloneElement(risk.icon, { className: "w-10 h-10" })}
              </motion.div>

              <div className="space-y-2 mb-10">
                <h3
                  className={`text-5xl font-black italic tracking-tighter leading-none ${config.text}`}
                >
                  {risk.level}
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 dark:bg-slate-950/50 rounded-full font-black text-[10px] uppercase tracking-widest border border-white dark:border-slate-800">
                  Risk Category
                </div>
              </div>

              <div className="w-full space-y-6">
                <div className="flex justify-between items-end px-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Probability
                  </span>
                  <span
                    className={`text-5xl font-black italic leading-none tracking-tighter ${config.text}`}
                  >
                    {probability.toFixed(1)}%
                  </span>
                </div>
                <div className="h-4 w-full bg-slate-200/50 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${probability}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                  />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-bold italic text-[10px] leading-relaxed">
                  Historical dataset correlation analysis.
                </p>
              </div>
            </div>

            {/* Right Column: Descriptions & Actions */}
            <div className="lg:col-span-7 p-10 space-y-10">
              <section className="space-y-4">
                <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight italic">
                  Diagnostic Insight
                </h4>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed italic">
                  {risk.description}
                </p>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-health-50 dark:bg-health-500/10 rounded-xl">
                    <Heart className="text-health-600 w-4 h-4" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                    Clinical Suggestions
                  </h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {risk.advice.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl group transition-all"
                    >
                      <CheckCircle
                        className={`w-4 h-4 shrink-0 mt-0.5 ${config.text}`}
                      />
                      <span className="text-slate-600 dark:text-slate-400 font-bold text-[11px] leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/predict" className="flex-1">
                  <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                    <RefreshCw size={18} />
                    Retake Scan
                  </button>
                </Link>
                <Link to="/" className="flex-1">
                  <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 dark:bg-health-600 text-white rounded-2xl font-black text-sm shadow-lg hover:-translate-y-0.5 transition-all">
                    Dashboard
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center items-center gap-3 text-slate-400 dark:text-slate-600"
        >
          <ShieldAlert size={14} />
          <span className="text-[10px] italic font-bold">
            Results are ephemeral and not cached.
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SuggestionItem = ({ text, color }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-sm transition-all"
  >
    <div
      className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
        color === "emerald"
          ? "bg-emerald-400"
          : color === "yellow"
          ? "bg-amber-400"
          : "bg-red-400"
      }`}
    ></div>
    <span className="text-slate-700 font-medium leading-tight">{text}</span>
  </motion.div>
);

export default Result;
