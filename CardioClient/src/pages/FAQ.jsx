import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-health-50 rounded-full text-health-600 font-medium text-sm mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            You have questions, we have answers.
          </h1>
          <p className="text-slate-600">
            Understanding how our prediction model works and what the results
            mean.
          </p>
        </div>

        <div className="space-y-4">
          <FAQItem
            question="How accurate is the prediction?"
            answer="Our model is trained on a large dataset of over 70,000 medical records. While it achieves high accuracy (~73%), it is a statistical tool and not a substitute for professional medical diagnosis. False positives and negatives can occur."
          />
          <FAQItem
            question="Is my data saved?"
            answer="No. All data processing for the prediction happens in real-time. We do not store your personal health metrics on our servers after the session ends. Your privacy is our priority."
          />
          <FAQItem
            question="What do the results mean?"
            answer="A 'High Risk' result indicates you share significant health markers with patients who have cardiovascular disease. It is a strong signal to consult a doctor. 'Low Risk' suggests your current metrics are within a healthier range."
          />
          <FAQItem
            question="What is 'ap_hi' and 'ap_lo'?"
            answer="'ap_hi' stands for Systolic Blood Pressure (the top number), and 'ap_lo' is Diastolic Blood Pressure (the bottom number). These are critical indicators of heart health."
          />
          <FAQItem
            question="Why do you need my lifestyle habits?"
            answer="Factors like smoking, alcohol consumption, and physical activity levels are major contributors to heart disease. Including them allows for a more comprehensive and accurate risk assessment."
          />
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={false}
      className={`rounded-2xl border transition-all duration-200 ${
        isOpen
          ? "bg-white border-health-100 shadow-md shadow-health-100/20"
          : "bg-white/50 border-slate-200 hover:border-health-100"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span
          className={`font-semibold transition-colors ${
            isOpen ? "text-health-600" : "text-slate-900"
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className={`w-5 h-5 ${
              isOpen ? "text-health-500" : "text-slate-400"
            }`}
          />
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 text-slate-600 leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
