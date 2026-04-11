import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Stethoscope,
  FileText,
  ShieldCheck,
  Zap,
  ChevronRight,
  Lock,
  Heart,
  UserCog,
  Building2,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [showAdminOptions, setShowAdminOptions] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAdminOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Stethoscope className="text-white" size={20} />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase">
            Ranchi City Hospital
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Admin Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowAdminOptions(!showAdminOptions)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
                showAdminOptions
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Lock size={14} /> Admin
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showAdminOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 z-50 overflow-hidden"
                >
                  <p className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Select Access Level
                  </p>

                  {/* Option 1: Deosoft Super Admin */}
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition-all group"
                  >
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <UserCog size={18} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-xs uppercase tracking-tight text-slate-800">
                        Deosoft Admin
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold">
                        Full System Control
                      </p>
                    </div>
                  </button>

                  <div className="h-[1px] bg-slate-100 my-1" />

                  {/* Option 2: Hospital Admin */}
                  <button
                    onClick={() => navigate("/hospital-login")}
                    className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-all group"
                  >
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <Building2 size={18} />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-xs uppercase tracking-tight text-slate-800">
                        Hospital Partner
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold">
                        Branch Management
                      </p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => navigate("/canvas")}
            className="bg-slate-900 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="pt-40 pb-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-6"
          >
            <Sparkles size={16} /> Powered by Gemini 3 Flash
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            DIGITIZE YOUR <br />
            <span className="text-blue-600">PRESCRIPTIONS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium"
          >
            A high-speed AI engine designed for doctors in Ranchi to convert
            handwriting into structured medical records instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <button
              onClick={() => navigate("/canvas")}
              className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all"
            >
              Start Transcribing <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="py-20 bg-slate-50 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="text-amber-500" />,
              title: "Instant Processing",
              desc: "Get digital medical reports in under 3 seconds using optimized AI pipelines.",
            },
            {
              icon: <ShieldCheck className="text-green-500" />,
              title: "Secure Storage",
              desc: "Patient data is protected with industry-standard encryption and secure local hosting.",
            },
            {
              icon: <FileText className="text-blue-500" />,
              title: "Auto-PDF Generation",
              desc: "Professional hospital-branded PDFs ready for print or WhatsApp sharing.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-black text-xl mb-3 uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── NEW FOOTER ─── */}
      <footer className="bg-slate-900 text-white py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Stethoscope className="text-blue-400" size={24} />
              <span className="font-black text-2xl tracking-tighter uppercase">
                Ranchi City Hospital
              </span>
            </div>
            <p className="text-slate-400 max-w-sm font-medium">
              Revolutionizing healthcare documentation in Jharkhand through
              cutting-edge AI technology.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Developed By
            </p>
            <span className="text-lg font-black text-blue-400">
              DEOSOFT IT SERVICES
            </span>
            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium mt-2">
              Made with{" "}
              <Heart size={14} className="text-red-500 fill-red-500" /> in
              Ranchi
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          © 2026 Ranchi City Hospital • All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
