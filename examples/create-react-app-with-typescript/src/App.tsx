import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import MuxVideoPage from "./pages/MuxVideo";
import MuxAudioPage from "./pages/MuxAudio";
import MuxPlayerPage from "./pages/MuxPlayer";
import MuxPlayerLazyPage from "./pages/MuxPlayerLazy";
import MuxUploaderPage from "./pages/MuxUploader";

function App() {
  return (
    <>
      <header>
        <div className="left-header">
          <a className="mux-logo" href="https://www.mux.com/player" target="_blank" rel="noreferrer">
            <img width="81" height="26" src="./images/mux-logo@2x.webp" alt="Mux logo" decoding="async" />
          </a>
          <h1><a href="/">Elements</a></h1>
        </div>
        <div className="right-header">
          <a className="github-logo" href="https://github.com/muxinc/elements" target="_blank" rel="noreferrer">
            <img width="32" height="32" src="./images/github-logo.svg" alt="Github logo" />
          </a>
        </div>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="MuxVideo" element={<MuxVideoPage />} />
          <Route path="MuxAudio" element={<MuxAudioPage />} />
          <Route path="MuxPlayer" element={<MuxPlayerPage />} />
          <Route path="MuxPlayerLazy" element={<MuxPlayerLazyPage />} />
          <Route path="MuxUploader" element={<MuxUploaderPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
