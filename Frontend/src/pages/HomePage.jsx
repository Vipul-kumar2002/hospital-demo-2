import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Stethoscope,
  FileText,
  ShieldCheck,
  Zap,
  ChevronRight,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

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
        <button
          onClick={() => navigate("/canvas")}
          className="bg-slate-900 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-slate-800 transition-all"
        >
          Launch App
        </button>
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
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate("/canvas")}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all"
            >
              Start Transcribing <ChevronRight size={20} />
            </button>
            <button className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
              View Demo
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
              desc: "Patient data for Vipul Kumar and others is protected with industry-standard encryption.",
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

      {/* ─── FOOTER ─── */}
      <footer className="py-10 border-t text-center text-slate-400 text-sm font-bold uppercase tracking-widest">
        © 2026 Ranchi City Hospital • Developed by Vipul Kumar
      </footer>
    </div>
  );
};

export default HomePage;
