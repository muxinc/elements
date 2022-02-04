import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import MuxVideoPage from "./pages/MuxVideo";
import MuxAudioPage from "./pages/MuxAudio";
import MuxPlayerPage from "./pages/MuxPlayer";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        height: "calc(100vh - 40px)",
        width: "calc(100vw - 40px)",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="MuxVideo" element={<MuxVideoPage />} />
          <Route path="MuxAudio" element={<MuxAudioPage />} />
          <Route path="MuxPlayer" element={<MuxPlayerPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
