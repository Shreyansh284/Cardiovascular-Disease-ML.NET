import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Activity,
  ShieldCheck,
  HeartPulse,
} from "lucide-react";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-32 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full text-health-600 dark:text-health-500 font-black text-[10px] mb-4 shadow-sm border border-health-50 dark:border-health-900/30 uppercase tracking-widest"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Documentation</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter italic"
          >
            Common <span className="text-health-600">Inquiries</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-sm font-bold max-w-lg mx-auto leading-relaxed italic"
          >
            Clinical insights into our algorithmic architecture and data
            protocols.
          </motion.p>
        </div>

        <div className="space-y-3">
          <FAQItem
            question="Accuracy benchmark?"
            answer="Our model is trained on a verified medical dataset of 70,000+ records. While it achieves high statistical accuracy (~73%), it is a predictive tool and should not replace clinical diagnostics."
          />
          <FAQItem
            question="Data privacy?"
            answer="Absolutely not. Your inputs are processed in-memory and purged immediately. We do not store, sell, or track your health identity."
          />
          <FAQItem
            question="Interpretation of results?"
            answer="A 'High Risk' classification means your physiology aligns with data patterns of patients with cardiovascular issues. Seek professional consultation for confirmation."
          />
          <FAQItem
            question="What are BP metrics?"
            answer="'ap_hi' is Systolic (heart beat pressure) and 'ap_lo' is Diastolic (between beats pressure). These are critical markers of cardiovascular strain."
          />
          <FAQItem
            question="Official diagnosis?"
            answer="No. This tool is for risk estimation and awareness. Official diagnoses require physical exams and lab tests by a licensed cardiologist."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-slate-900 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-xl"
        >
          <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(225,29,72,0.1),transparent)] pointer-events-none"></div>

          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl font-black mb-1 italic tracking-tight">
              Need help?
            </h3>
            <p className="text-slate-400 font-bold text-xs italic">
              Our clinical data team is available for technical support.
            </p>
          </div>
          <button className="relative z-10 px-6 py-3 bg-health-600 text-white rounded-2xl font-black text-xs hover:bg-health-500 transition-all shadow-lg hover:-translate-y-0.5">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      layout
      className={`rounded-3xl border transition-all duration-300 ${
        isOpen
          ? "bg-white dark:bg-slate-900 border-health-200 dark:border-health-900/50 shadow-xl"
          : "bg-white/60 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/50 hover:border-health-100 dark:hover:border-health-900/30"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none group"
      >
        <span
          className={`text-base md:text-lg font-black transition-colors tracking-tight italic ${
            isOpen
              ? "text-health-600 dark:text-health-500"
              : "text-slate-900 dark:text-slate-300 group-hover:text-health-600 dark:group-hover:text-health-500"
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ 
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1
          }}
          className={`p-1.5 rounded-xl transition-colors ${
            isOpen
              ? "bg-health-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 group-hover:bg-health-50 dark:group-hover:bg-health-500/10 group-hover:text-health-600"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 font-bold text-sm leading-relaxed italic border-l-2 border-health-600/30 ml-6 mr-6">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;
