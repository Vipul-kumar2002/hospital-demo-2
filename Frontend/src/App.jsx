import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrescriptionCanvas from "./pages/PrescriptionCanvas";
import HomePage from "./pages/HomePage";
import AITranscriptionView from "./pages/AITranscriptionView";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/canvas" element={<PrescriptionCanvas />} />
          <Route path="/transcribe" element={<AITranscriptionView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
