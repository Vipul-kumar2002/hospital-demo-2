import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Eraser,
  Pen,
  Plus,
  Sparkles,
  User,
  Loader2,
  Search,
  CheckCircle2,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// ✅ Import dynamic API URL
import { API_BASE_URL } from "../config";

const PrescriptionCanvas = () => {
  const navigate = useNavigate();

  // --- UI & CANVAS STATES ---
  const [pages, setPages] = useState([{ id: Date.now(), strokes: [] }]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // --- PATIENT DATA STATES ---
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  const canvasRefs = useRef([]);
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 800;
  const HEADER_HEIGHT = 140;

  // --- 🏥 STEP 1: FETCH FROM POSTMAN MOCK URL ---
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        // Using your specific Postman Mock URL
        const response = await fetch("https://d4c5cce4-b1af-4f81-852b-edd97f9bf7e7.mock.pstmn.io/patients");
        const data = await response.json();

        if (Array.isArray(data)) {
          // Setting the first patient (Vipul Kumar) as default
          setPatientData(data[0]); 
        }
      } catch (err) {
        console.error("Mock Data Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, []);

  // --- 🤖 STEP 2: SEND TO AI BACKEND ---
  const handleAutomatedFlow = async () => {
    if (!patientData) return;
    setIsProcessingAI(true);

    try {
      const allImages = canvasRefs.current
        .filter(Boolean)
        .map((canvas) => {
          // Prepare the official Hospital Template for Gemini
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = CANVAS_WIDTH;
          tempCanvas.height = CANVAS_HEIGHT;
          const ctx = tempCanvas.getContext("2d");

          // Draw Background & Header [cite: 1, 12]
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 2;
          ctx.strokeRect(0, 0, CANVAS_WIDTH, HEADER_HEIGHT);

          ctx.fillStyle = "#000000";
          ctx.font = "bold 22px Arial";
          ctx.fillText("RANCHI CITY HOSPITAL", 20, 50);

          ctx.font = "bold 14px Arial";
          ctx.fillText(`PATIENT: ${patientData.name}`, 20, 90);
          ctx.fillText(`ID: ${patientData.pid || patientData.patientId}`, 20, 115);

          // Vitals Section [cite: 3, 5, 7, 14]
          ctx.fillText("BP:", 350, 50);
          ctx.fillText("BLOOD GROUP:", 350, 85);
          ctx.fillText("HB:", 350, 120);

          // Overlay the Doctor's Handwriting
          ctx.drawImage(canvas, 0, 0);

          return tempCanvas.toDataURL("image/jpeg", 0.8);
        });

      // Navigate to your result page with images
      navigate("/transcribe", {
        state: {
          images: allImages,
          patientData: patientData,
          autoProcess: true, // Triggers AI automatically on the next page
        },
      });
    } catch (error) {
      console.error("AI Flow Error:", error);
    } finally {
      setIsProcessingAI(false);
    }
  };

  // --- 🎨 CANVAS ENGINE (Logic preserved) ---
  const processPoint = (e, isNewStroke, pageIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (y < 0 || y > CANVAS_HEIGHT) return;

    setPages((prev) => {
      const newPages = [...prev];
      const targetPage = newPages[pageIndex];
      if (isNewStroke) {
        targetPage.strokes.push({
          type: isEraser ? "eraser" : "pen",
          points: [{ x, y }],
        });
      } else if (targetPage.strokes.length > 0) {
        targetPage.strokes[targetPage.strokes.length - 1].points.push({ x, y });
      }
      return newPages;
    });
  };

  const renderAll = useCallback(() => {
    pages.forEach((page, idx) => {
      const canvas = canvasRefs.current[idx];
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Draw Grid Lines for writing
      ctx.strokeStyle = "#eff6ff";
      ctx.lineWidth = 1;
      for (let y = HEADER_HEIGHT + 40; y < CANVAS_HEIGHT; y += 35) {
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      page.strokes.forEach((stroke) => {
        ctx.beginPath();
        ctx.strokeStyle = stroke.type === "eraser" ? "#ffffff" : "#1e293b";
        ctx.lineWidth = stroke.type === "eraser" ? 25 : 2.5;
        stroke.points.forEach((p, i) =>
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
        );
        ctx.stroke();
      });
    });
  }, [pages]);

  useEffect(() => { renderAll(); }, [renderAll]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── TOOLBAR ── */}
      <header className="fixed top-0 w-full z-50 bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Stethoscope className="text-blue-600" />
          <span className="font-black text-blue-600 uppercase text-xs">Ranchi Hospital</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button onClick={() => setIsEraser(false)} className={`p-2 rounded-lg ${!isEraser ? "bg-white shadow" : ""}`}><Pen size={16}/></button>
            <button onClick={() => setIsEraser(true)} className={`p-2 rounded-lg ${isEraser ? "bg-white shadow" : ""}`}><Eraser size={16}/></button>
          </div>
          <button onClick={handleAutomatedFlow} className="bg-violet-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
            <Sparkles size={16} /> Run AI
          </button>
        </div>
      </header>

      {/* ── PATIENT BANNER ── */}
      <div className="pt-24 flex justify-center">
        <div className="w-full max-w-[600px] bg-white p-6 rounded-3xl border shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-blue-500 uppercase">Patient ID: {patientData?.pid || patientData?.patientId}</p>
            <h2 className="text-xl font-black text-slate-800 uppercase">{patientData?.name || patientData?.patientName}</h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Age / Gender</p>
            <p className="font-bold">{patientData?.age || "24"} / {patientData?.gender || "Male"}</p>
          </div>
        </div>
      </div>

      {/* ── CANVAS ── */}
      <main className="py-10 flex flex-col items-center gap-8">
        {pages.map((page, index) => (
          <div key={page.id} className="relative bg-white shadow-2xl border-2 border-slate-200"
               style={{ width: "min(600px, 95vw)", aspectRatio: "600/800", touchAction: "none" }}
               onPointerDown={(e) => { setIsDrawing(true); processPoint(e, true, index); }}
               onPointerMove={(e) => { if (isDrawing) processPoint(e, false, index); }}
               onPointerUp={() => setIsDrawing(false)}>
            
            {/* Template Header Overlay */}
            <div className="absolute top-0 w-full h-[140px] border-b-2 flex pointer-events-none">
                <div className="w-1/2 p-4 border-r">
                    <h1 className="font-black text-lg">RANCHI CITY HOSPITAL</h1>
                    <p className="text-[10px] mt-4">NAME: {patientData?.name}</p>
                </div>
                <div className="w-1/2 p-4 bg-slate-50">
                    <p className="text-[10px] font-bold">BP: ___________</p>
                    <p className="text-[10px] font-bold mt-2">GROUP: ___________</p>
                    <p className="text-[10px] font-bold mt-2">HB: ___________</p>
                </div>
            </div>

            <canvas
              ref={(el) => (canvasRefs.current[index] = el)}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="relative z-10 w-full h-full bg-transparent"
            />
          </div>
        ))}
      </main>

      {/* ── FLOATING ACTION ── */}
      <button 
        onClick={handleAutomatedFlow}
        className="fixed bottom-8 right-8 bg-green-600 text-white px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-2"
      >
        <CheckCircle2 size={20} /> AI Transcribe
      </button>
    </div>
  );
};

export default PrescriptionCanvas;