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
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet="https://user-images.githubusercontent.com/360826/233653989-11cd8603-c20f-4008-8bf7-dc15b743c52b.svg" />
              <source media="(prefers-color-scheme: light)" srcSet="https://user-images.githubusercontent.com/360826/233653583-50dda726-cbe7-4182-a113-059a91ae83e6.svg" />
              <img alt="Mux Logo" src="https://user-images.githubusercontent.com/360826/233653583-50dda726-cbe7-4182-a113-059a91ae83e6.svg" />
            </picture>
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
