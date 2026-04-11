import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrescriptionCanvas from "./pages/PrescriptionCanvas";
import AITranscriptionView from "./pages/AITranscriptionView";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/canvas" element={<PrescriptionCanvas />} />
          <Route path="/transcribe" element={<AITranscriptionView />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
