import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrescriptionCanvas from "./pages/PrescriptionCanvas";
import AITranscriptionView from "./pages/AITranscriptionView";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 🎨 The Drawing Pad (Main Page) */}
          <Route path="/" element={<PrescriptionCanvas />} />

          {/* 🧠 The AI Processing & Download Page */}
          <Route path="/transcribe" element={<AITranscriptionView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;