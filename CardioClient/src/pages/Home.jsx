import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Activity, ShieldCheck, UserRound } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="min-h-screen bg-slate-50">
      <section className="relative px-6 md:px-12 py-20 lg:py-32 hero-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-8 z-10 relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-health-600 font-medium text-sm">
              <Activity className="w-4 h-4" />
              <span>AI-Powered Health Analysis</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900">
              Listen to your <br />
              <span className="text-health-600">Heart.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Early detection saves lives. Use our advanced machine learning
              model to assess your cardiovascular risk factors in minutes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/disclaimer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-health-600 text-white rounded-full font-semibold shadow-lg hover:bg-health-700 transition-colors"
                >
                  Check Your Heart Health
                </motion.button>
              </Link>
              {/* <button className="px-8 py-4 bg-white text-slate-700 rounded-full font-semibold shadow-sm hover:bg-slate-50 border border-slate-200 transition-colors">
                                Learn More
                            </button> */}
            </div>
          </div>

          <div className="relative z-0 flex justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-80 h-80 md:w-96 md:h-96"
            >
              <div className="absolute inset-0 bg-health-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop"
                alt="Doctor holding heart"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8 text-health-600" />}
            title="Secure & Private"
            description="Your data is processed locally primarily and explicitly sent only for prediction. No personal identifiers are stored."
          />
          <FeatureCard
            icon={<Activity className="w-8 h-8 text-health-600" />}
            title="Instant Results"
            description="Get an immediate analysis of your risk profile based on clinical parameters like BP, BMI, and Glucose."
          />
          <FeatureCard
            icon={<UserRound className="w-8 h-8 text-health-600" />}
            title="User Friendly"
            description="Designed for everyone. Simple inputs, clear visualizations, and actionable health insights."
          />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-16">
            <span className="text-health-600 font-semibold tracking-wider text-sm uppercase">
              Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">
              How It Works
            </h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: "01",
                  title: "Enter Data",
                  desc: "Input your basic parameters.",
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  desc: "Our model processes the data.",
                },
                {
                  step: "03",
                  title: "Get Results",
                  desc: "Receive your risk assessment.",
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-health-50 border-4 border-white shadow-lg flex items-center justify-center text-xl font-bold text-health-600 mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
  >
    <div className="mb-4 bg-health-50 w-16 h-16 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default Home;
