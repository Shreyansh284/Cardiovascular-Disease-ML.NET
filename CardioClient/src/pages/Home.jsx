import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ShieldCheck,
  UserRound,
  Heart,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(textRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power4.out",
      });

      // Simple Heartbeat pulse on the image/icon
      gsap.to(".heart-beat", {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Scroll reveals
      const sections = [statsRef.current, stepsRef.current];
      sections.forEach((section) => {
        gsap.from(section.children, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="bg-slate-50 dark:bg-slate-950 pt-16 transition-colors duration-300"
    >
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-16 lg:py-24 flex items-center overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] h-[400px] bg-red-100 dark:bg-health-950/20 rounded-full blur-[100px] opacity-30 z-0"></div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div ref={textRef} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-900 rounded-full shadow-sm text-health-600 dark:text-health-500 font-bold text-xs border border-health-50 dark:border-health-900/30">
              <Activity className="w-3.5 h-3.5 heart-beat" />
              <span>Advanced AI Cardiac Assessment</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight text-slate-900 dark:text-white tracking-tighter italic">
              Prioritize Your <br />
              <span className="text-health-600 dark:text-health-500">
                Health.
              </span>
            </h1>

            <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-bold italic">
              Understand your heart's profile with precision. We use verified
              clinical data and proprietary AI to provide an ethical look at
              cardiac risk factors.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/disclaimer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-health-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-health-200 dark:shadow-health-950/30 hover:bg-health-700 transition-all flex items-center gap-2"
                >
                  Start Scan <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/faq">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-2xl font-black text-sm border-2 border-slate-100 dark:border-slate-800 hover:border-health-100 dark:hover:border-health-900/50 transition-all"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              {/* Floating decorative cards (Shrunken) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-5 -left-5 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-slate-50 dark:border-slate-800"
              >
                <div className="bg-health-50 dark:bg-health-950/30 p-2 rounded-xl">
                  <Heart
                    className="w-5 h-5 text-health-600 dark:text-health-500 heart-beat"
                    fill="currentColor"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase">
                    BPM
                  </div>
                  <div className="text-lg font-black text-slate-800 dark:text-white leading-none">
                    72
                  </div>
                </div>
              </motion.div>

              <div className="relative h-full w-full rounded-[32px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
                <img
                  src="./heart.jpg"
                  alt="Medical Professional"
                  className="w-full h-full object-cover dark:grayscale-[0.2] transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section (Shrunken) */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div ref={statsRef} className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={
              <ShieldCheck className="w-8 h-8 text-health-600 dark:text-health-500" />
            }
            title="Privacy First"
            description="Your medical data is never stored on our servers. Ephemeral processing."
          />
          <FeatureCard
            icon={
              <Activity className="w-8 h-8 text-health-600 dark:text-health-500" />
            }
            title="Instant AI"
            description="Our neural network processes inputs instantly for real-time results."
          />
          <FeatureCard
            icon={
              <UserRound className="w-8 h-8 text-health-600 dark:text-health-500" />
            }
            title="Clinical Standard"
            description="Standard medical parameters used by licensed cardiologists worldwide."
          />
        </div>
      </section>

      {/* How it Works Section (Shrunken) */}
      <section className="py-20 bg-slate-900 dark:bg-slate-900/40 text-white rounded-[40px] mx-4 md:mx-12 mb-12 overflow-hidden relative border border-slate-800 transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-health-600 rounded-full blur-[120px] opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter italic">
              Simple Steps to{" "}
              <span className="text-health-500">Peace of Mind</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto font-bold italic">
              We've simplified the process of understanding your cardiac health.
            </p>
          </div>

          <div ref={stepsRef} className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register Metrics",
                desc: "Provide blood pressure and lifestyle markers.",
              },
              {
                step: "02",
                title: "AI Processing",
                desc: "Our model compares your profile against 70k+ records.",
              },
              {
                step: "03",
                title: "Risk Profile",
                desc: "Receive immediate insights on cardiac risk factors.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-black text-health-400 mb-6 group-hover:bg-health-600 group-hover:text-white transition-all duration-300 rotate-3 group-hover:rotate-0 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-black mb-2 tracking-tight italic">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-bold italic">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-500 group"
  >
    <div className="mb-6 bg-slate-50 dark:bg-slate-800 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-health-50 dark:group-hover:bg-health-900/30 transition-colors">
      {icon}
    </div>
    <h3 className="text-lg font-black mb-2 text-slate-900 dark:text-white tracking-tight italic">
      {title}
    </h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs font-bold italic">
      {description}
    </p>
  </motion.div>
);

export default Home;
