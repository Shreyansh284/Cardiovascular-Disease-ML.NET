import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Loader2,
  Info,
  CheckCircle2,
} from "lucide-react";
import { predictHeartDisease } from "../services/api";

const Prediction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    ageYears: "",
    gender: "",
    height: "",
    weight: "",
    apHi: "",
    apLo: "",
    cholesterol: "",
    gluc: "",
    smoke: null,
    alco: null,
    active: null,
  });

  const [activeSegment, setActiveSegment] = useState(1);

  const isSegmentValid = (segment) => {
    if (segment === 1) {
      return (
        formData.ageYears &&
        formData.gender &&
        formData.height &&
        formData.weight
      );
    }
    if (segment === 2) {
      return (
        formData.apHi && formData.apLo && formData.cholesterol && formData.gluc
      );
    }
    if (segment === 3) {
      return (
        formData.smoke !== null && formData.alco !== null && formData.active !== null
      );
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation for all fields before AI submittal
    const required = [
      "ageYears",
      "height",
      "weight",
      "apHi",
      "apLo",
      "gender",
      "cholesterol",
      "gluc",
      "smoke",
      "alco",
      "active",
    ];
    const missing = required.filter((field) => !formData[field]);

    if (missing.length > 0) {
      setError(
        "Clinical parameters incomplete. Please provide all physiological metrics."
      );
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ageYears: parseFloat(formData.ageYears),
        gender: parseFloat(formData.gender),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        apHi: parseFloat(formData.apHi),
        apLo: parseFloat(formData.apLo),
        cholesterol: parseFloat(formData.cholesterol),
        gluc: parseFloat(formData.gluc),
        smoke: parseFloat(formData.smoke),
        alco: parseFloat(formData.alco),
        active: parseFloat(formData.active),
      };

      const result = await predictHeartDisease(payload);
      navigate("/result", { state: { result, input: payload } });
    } catch (err) {
      setError(
        "AI Engine Communication Failure. Please verify your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500 relative">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(225,29,72,0.03),transparent)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 mb-4 bg-health-50 dark:bg-health-500/10 px-4 py-1.5 rounded-full text-health-600 dark:text-health-500 font-black text-[10px] uppercase tracking-widest border border-health-100 dark:border-health-900/30"
          >
            <Activity size={12} />
            Diagnostic Engine Active
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
            Cardiac <span className="text-health-600">Scan</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800"
        >
          <div className="grid md:grid-cols-12">
            {/* Sidebar Navigation */}
            <div className="md:col-span-4 bg-slate-50 dark:bg-slate-950 p-8 border-r border-slate-100 dark:border-slate-800 space-y-6">
              <StepIndicator
                active={activeSegment === 1}
                number="01"
                title="Baseline"
                desc="Physical Metrics"
                onClick={() => setActiveSegment(1)}
              />
              <StepIndicator
                active={activeSegment === 2}
                number="02"
                title="Clinical"
                desc="Blood Vitals"
                disabled={!isSegmentValid(1)}
                onClick={() => isSegmentValid(1) && setActiveSegment(2)}
              />
              <StepIndicator
                active={activeSegment === 3}
                number="03"
                title="Behavior"
                desc="Lifestyle Habits"
                disabled={!isSegmentValid(1) || !isSegmentValid(2)}
                onClick={() =>
                  isSegmentValid(1) && isSegmentValid(2) && setActiveSegment(3)
                }
              />

              <div className="pt-12">
                <div className="p-6 bg-slate-900 rounded-3xl text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="text-health-500 w-4 h-4" />
                    <span className="font-black text-[10px] uppercase tracking-widest">
                      Privacy Guard
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic">
                    Binary processing only. No inputs are persisted to disk.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="md:col-span-8 p-8 md:p-10 flex flex-col justify-between min-h-[450px]">
              <AnimatePresence mode="wait">
                {activeSegment === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <InputField
                      label="Patient Age"
                      name="ageYears"
                      type="number"
                      suffix="yrs"
                      value={formData.ageYears}
                      onChange={handleChange}
                      placeholder="Age"
                    />
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                        Sex
                      </label>
                      <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl gap-1">
                        <SelectionButton
                          active={formData.gender === "1"}
                          onClick={() =>
                            setFormData((p) => ({ ...p, gender: "1" }))
                          }
                          label="Female"
                        />
                        <SelectionButton
                          active={formData.gender === "2"}
                          onClick={() =>
                            setFormData((p) => ({ ...p, gender: "2" }))
                          }
                          label="Male"
                        />
                      </div>
                    </div>
                    <InputField
                      label="Height"
                      name="height"
                      type="number"
                      suffix="cm"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="Height in cm"
                    />
                    <InputField
                      label="Weight"
                      name="weight"
                      type="number"
                      suffix="kg"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Weight in kg"
                    />
                  </motion.div>
                )}

                {activeSegment === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <InputField
                      label="Systolic (Hi)"
                      name="apHi"
                      type="number"
                      suffix="mmHg"
                      value={formData.apHi}
                      onChange={handleChange}
                      placeholder="e.g. 120"
                    />
                    <InputField
                      label="Diastolic (Lo)"
                      name="apLo"
                      type="number"
                      suffix="mmHg"
                      value={formData.apLo}
                      onChange={handleChange}
                      placeholder="e.g. 80"
                    />
                    <SelectField
                      label="Cholesterol"
                      name="cholesterol"
                      value={formData.cholesterol}
                      onChange={handleChange}
                      options={[
                        { value: "1", label: "Normal" },
                        { value: "2", label: "Elevated" },
                        { value: "3", label: "Critical" },
                      ]}
                    />
                    <SelectField
                      label="Glucose"
                      name="gluc"
                      value={formData.gluc}
                      onChange={handleChange}
                      options={[
                        { value: "1", label: "Normal" },
                        { value: "2", label: "Borderline" },
                        { value: "3", label: "High" },
                      ]}
                    />
                  </motion.div>
                )}

                {activeSegment === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-end ml-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          Tobacco Use
                        </label>
                        <span className="text-[9px] font-bold text-slate-300 dark:text-slate-700 italic">
                          Active or history of smoking
                        </span>
                      </div>
                      <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl gap-1.5 border border-slate-100 dark:border-slate-800">
                        <SelectionButton
                          active={formData.smoke === "1"}
                          onClick={() =>
                            setFormData((p) => ({ ...p, smoke: "1" }))
                          }
                          label="Yes"
                        />
                        <SelectionButton
                          active={formData.smoke === "0"}
                          onClick={() =>
                            setFormData((p) => ({ ...p, smoke: "0" }))
                          }
                          label="No"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-end ml-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          Alcohol Consumption
                        </label>
                        <span className="text-[9px] font-bold text-slate-300 dark:text-slate-700 italic">
                          Regular consumption
                        </span>
                      </div>
                      <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl gap-1.5 border border-slate-100 dark:border-slate-800">
                        <SelectionButton
                          active={formData.alco === "1"}
                          onClick={() =>
                            setFormData((p) => ({ ...p, alco: "1" }))
                          }
                          label="Yes"
                        />
                        <SelectionButton
                          active={formData.alco === "0"}
                          onClick={() =>
                            setFormData((p) => ({ ...p, alco: "0" }))
                          }
                          label="No"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-end ml-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          Physical Activity
                        </label>
                        <span className="text-[9px] font-bold text-slate-300 dark:text-slate-700 italic">
                          30+ mins regular exercise
                        </span>
                      </div>
                      <div className="flex bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl gap-1.5 border border-slate-100 dark:border-slate-800">
                        <SelectionButton
                          active={formData.active === "1"}
                          onClick={() =>
                            setFormData((p) => ({ ...p, active: "1" }))
                          }
                          label="Yes"
                        />
                        <SelectionButton
                          active={formData.active === "0"}
                          onClick={() =>
                            setFormData((p) => ({ ...p, active: "0" }))
                          }
                          label="No"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-10 space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl text-xs font-black italic flex items-center gap-3"
                  >
                    <Activity size={14} />
                    {error}
                  </motion.div>
                )}

                <div className="flex gap-3">
                  {activeSegment > 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveSegment((s) => s - 1)}
                      className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-xs transition-all hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      Back
                    </button>
                  )}
                  {activeSegment < 3 ? (
                    <button
                      type="button"
                      disabled={!isSegmentValid(activeSegment)}
                      onClick={() => setActiveSegment((s) => s + 1)}
                      className="flex-1 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-black text-sm shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      Continue
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || !isSegmentValid(3)}
                      className="flex-1 py-4 bg-health-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-health-900/20 hover:bg-health-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze
                          <Activity size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
//                       <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading}
//                       className="flex-1 py-6 bg-health-600 text-white rounded-[28px] font-black text-xl shadow-xl shadow-health-900/40 hover:bg-health-500 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
//                     >
//                       {loading ? (
//                         <>
//                           <Loader2 className="animate-spin" />
//                           Analyzing Dataset...
//                         </>
//                       ) : (
//                         <>
//                           Run Diagnostic Neural Network
//                           <Activity size={20} />
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

const StepIndicator = ({ number, title, desc, active, onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`w-full text-left group outline-none ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`text-2xl font-black italic tracking-tighter transition-all duration-500 ${
          active
            ? "text-health-600 scale-105"
            : "text-slate-200 dark:text-slate-800"
        }`}
      >
        {number}
      </div>
      <div>
        <h4
          className={`text-base font-black tracking-tight leading-none transition-colors ${
            active
              ? "text-slate-900 dark:text-white"
              : "text-slate-400 dark:text-slate-600"
          }`}
        >
          {title}
        </h4>
        <p
          className={`text-[9px] font-bold uppercase tracking-widest mt-1 transition-colors ${
            active ? "text-health-500" : "text-slate-300 dark:text-slate-700"
          }`}
        >
          {desc}
        </p>
      </div>
    </div>
  </button>
);

const InputField = ({ label, suffix, ...props }) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        {...props}
        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-3 px-5 focus:bg-white dark:focus:bg-slate-900 focus:border-health-400 dark:focus:border-health-500 focus:ring-0 outline-none transition-all font-black text-lg text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      {suffix && (
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 font-bold text-xs pointer-events-none group-focus-within:text-health-500 italic">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
      {label}
    </label>
    <select
      {...props}
      className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-3 px-5 focus:bg-white dark:focus:bg-slate-900 focus:border-health-400 dark:focus:border-health-500 outline-none transition-all font-black text-sm text-slate-900 dark:text-white appearance-none cursor-pointer"
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((opt) => (
        <option
          key={opt.value}
          value={opt.value}
          className="bg-white dark:bg-slate-900"
        >
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const SelectionButton = ({ active, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 py-3.5 rounded-[14px] font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
      active
        ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md border-slate-200 dark:border-slate-700"
        : "text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400 border-transparent"
    } border`}
  >
    {label}
  </button>
);

export default Prediction;
