import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import MuxVideoPage from "./pages/MuxVideo";
import MuxAudioPage from "./pages/MuxAudio";
import MuxPlayerPage from "./pages/MuxPlayer";
import MuxPlayerLazyPage from "./pages/MuxPlayerLazy";
import MuxUploaderPage from "./pages/MuxUploader";
import MuxPlayerWCPage from "./pages/mux-player";
import MuxVideoWCPage from "./pages/mux-video";

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
          <Route path="MuxPlayerLazy" element={<MuxPlayerLazyPage />} />
          <Route path="MuxUploader" element={<MuxUploaderPage />} />
          <Route path="mux-video" element={<MuxVideoWCPage />} />
          <Route path="mux-player" element={<MuxPlayerWCPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
