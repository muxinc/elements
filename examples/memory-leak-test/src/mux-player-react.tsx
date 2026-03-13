import React, { useState, useRef, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import MuxPlayer from "@mux/mux-player-react";

const PLAYBACK_ID = "23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I";

function App() {
  const [mounted, setMounted] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [loopCount, setLoopCount] = useState(10);
  const [loopDelay, setLoopDelay] = useState(500);
  const [status, setStatus] = useState("Ready");
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(false);
  const cycleRef = useRef(0);

  const doMount = useCallback(() => {
    if (!mountedRef.current) {
      setMounted(true);
      mountedRef.current = true;
      setStatus("Mounted");
    }
  }, []);

  const doUnmount = useCallback(() => {
    if (mountedRef.current) {
      setMounted(false);
      mountedRef.current = false;
      cycleRef.current++;
      setCycleCount(cycleRef.current);
      setStatus("Unmounted");
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (loopRef.current) {
      clearInterval(loopRef.current);
      loopRef.current = null;
    }
  }, []);

  const startLoop = useCallback(() => {
    if (loopRef.current) return;
    let remaining = loopCount * 2;
    let isMounted = false;
    const target = cycleRef.current + loopCount;
    setStatus(`Looping (${cycleRef.current}/${target})...`);
    loopRef.current = setInterval(() => {
      if (remaining <= 0) {
        stopLoop();
        setStatus(`Loop done (${cycleRef.current} cycles)`);
        return;
      }
      if (!isMounted) {
        doMount();
        isMounted = true;
      } else {
        doUnmount();
        isMounted = false;
        setStatus(`Looping (${cycleRef.current}/${target})...`);
      }
      remaining--;
    }, loopDelay);
  }, [loopCount, loopDelay, doMount, doUnmount, stopLoop]);

  const triggerGC = useCallback(() => {
    if ((window as any).gc) {
      (window as any).gc();
      setStatus(`GC triggered (${cycleRef.current} cycles)`);
    } else {
      setStatus("GC not available - launch Chrome with --js-flags='--expose-gc'");
    }
  }, []);

  useEffect(() => () => stopLoop(), [stopLoop]);

  return (
    <>
      <div className="controls">
        <button onClick={doMount}>Mount</button>
        <button onClick={doUnmount}>Unmount</button>
        <span className="sep">|</span>
        <label>
          Loops:{" "}
          <input
            type="number"
            value={loopCount}
            min={1}
            onChange={(e) => setLoopCount(+e.target.value)}
          />
        </label>
        <label>
          Delay (ms):{" "}
          <input
            type="number"
            value={loopDelay}
            min={100}
            step={100}
            onChange={(e) => setLoopDelay(+e.target.value)}
          />
        </label>
        <button onClick={startLoop}>Start Loop</button>
        <button onClick={stopLoop}>Stop</button>
        <span className="sep">|</span>
        <button onClick={triggerGC}>Force GC</button>
      </div>
      <div id="status">
        Cycles: {cycleCount} | {status}
      </div>
      <div id="container">
        {mounted && (
          <MuxPlayer
            playbackId={PLAYBACK_ID}
            streamType="on-demand"
            muted
          />
        )}
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
