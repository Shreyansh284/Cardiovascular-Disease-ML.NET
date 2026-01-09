import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Activity, ArrowRight, Loader2 } from "lucide-react";
import { predictHeartDisease } from "../services/api";

const Prediction = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    ageYears: "",
    gender: "1", // Default 2 (Male) or 1 (Female) based on dataset usually? Let's check CSV. 1 women, 2 men usually in this dataset. I will use radio buttons.
    height: "",
    weight: "",
    apHi: "",
    apLo: "",
    cholesterol: "1", // 1: normal, 2: above normal, 3: well above normal
    gluc: "1",
    smoke: "0",
    alco: "0",
    active: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (
      !formData.ageYears ||
      !formData.height ||
      !formData.weight ||
      !formData.apHi ||
      !formData.apLo
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      // Convert types
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

      // Navigate to result
      navigate("/result", { state: { result, input: payload } });
    } catch (err) {
      console.error(err);
      setError(
        "Failed to get prediction from server. Please ensure the API is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Patient Health Profile
          </h2>
          <p className="mt-2 text-slate-600">
            Enter your health metrics for a comprehensive assessment.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12 space-y-8">
            {/* Section 1: Personal Info */}
            <div>
              <h3 className="text-lg font-semibold text-health-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-health-100 flex items-center justify-center text-health-600 text-sm">
                  1
                </span>
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Age (Years)"
                  name="ageYears"
                  type="number"
                  value={formData.ageYears}
                  onChange={handleChange}
                  placeholder="e.g. 45"
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    <label
                      className={`flex-1 border rounded-xl p-3 cursor-pointer transition-all ${
                        formData.gender === "1"
                          ? "border-health-500 bg-health-50 text-health-700"
                          : "border-slate-200 hover:border-health-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="1"
                        checked={formData.gender === "1"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-center">Female</div>
                    </label>
                    <label
                      className={`flex-1 border rounded-xl p-3 cursor-pointer transition-all ${
                        formData.gender === "2"
                          ? "border-health-500 bg-health-50 text-health-700"
                          : "border-slate-200 hover:border-health-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="2"
                        checked={formData.gender === "2"}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-center">Male</div>
                    </label>
                  </div>
                </div>

                <InputField
                  label="Height (cm)"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g. 175"
                />
                <InputField
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 70"
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 2: Vitals */}
            <div>
              <h3 className="text-lg font-semibold text-health-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-health-100 flex items-center justify-center text-health-600 text-sm">
                  2
                </span>
                Medical Vitals
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Systolic BP (High)"
                  name="apHi"
                  type="number"
                  value={formData.apHi}
                  onChange={handleChange}
                  placeholder="e.g. 120"
                />
                <InputField
                  label="Diastolic BP (Low)"
                  name="apLo"
                  type="number"
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
                    { value: "2", label: "Above Normal" },
                    { value: "3", label: "Well Above Normal" },
                  ]}
                />
                <SelectField
                  label="Glucose"
                  name="gluc"
                  value={formData.gluc}
                  onChange={handleChange}
                  options={[
                    { value: "1", label: "Normal" },
                    { value: "2", label: "Above Normal" },
                    { value: "3", label: "Well Above Normal" },
                  ]}
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 3: Lifestyle */}
            <div>
              <h3 className="text-lg font-semibold text-health-700 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-health-100 flex items-center justify-center text-health-600 text-sm">
                  3
                </span>
                Lifestyle Habits
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <ToggleCard
                  label="Smoking"
                  name="smoke"
                  value={formData.smoke}
                  onChange={handleChange}
                />
                <ToggleCard
                  label="Alcohol Intake"
                  name="alco"
                  value={formData.alco}
                  onChange={handleChange}
                />
                <ToggleCard
                  label="Physical Activity"
                  name="active"
                  value={formData.active}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-health-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-health-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center gap-3 w-full md:w-auto justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Risk Profile
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, type = "text", ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-slate-700">{label}</label>
    <input
      type={type}
      {...props}
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-health-500 focus:ring-4 focus:ring-health-500/10 outline-none transition-all placeholder:text-slate-400"
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-slate-700">{label}</label>
    <select
      {...props}
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-health-500 focus:ring-4 focus:ring-health-500/10 outline-none transition-all bg-white"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const ToggleCard = ({ label, name, value, onChange }) => {
  const isChecked = value === "1";
  return (
    <label
      className={`
            flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all
            ${
              isChecked
                ? "bg-health-50 border-health-300"
                : "bg-white border-slate-200 hover:border-health-200"
            }
        `}
    >
      <span
        className={`font-medium ${
          isChecked ? "text-health-800" : "text-slate-600"
        }`}
      >
        {label}
      </span>
      <div
        className={`
                w-12 h-6 rounded-full p-1 transition-colors relative
                ${isChecked ? "bg-health-500" : "bg-slate-300"}
            `}
      >
        <div
          className={`
                    w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
                    ${isChecked ? "translate-x-6" : "translate-x-0"}
                `}
        ></div>
      </div>
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={(e) =>
          onChange({ target: { name, value: e.target.checked ? "1" : "0" } })
        }
        className="hidden"
      />
    </label>
  );
};

export default Prediction;
