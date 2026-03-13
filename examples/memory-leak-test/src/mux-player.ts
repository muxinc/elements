import "@mux/mux-player";

const PLAYBACK_ID = "23s11nz72DsoN657h4314PjKKjsF2JG33eBQQt6B95I";

let cycleCount = 0;
let loopInterval: ReturnType<typeof setInterval> | null = null;

const container = document.getElementById("container")!;
const counter = document.getElementById("counter")!;
const statusEl = document.getElementById("status")!;

function updateStatus(msg: string) {
  statusEl.textContent = `Cycles: ${cycleCount} | ${msg}`;
}

function mount() {
  if (container.querySelector("mux-player")) return;
  const el = document.createElement("mux-player");
  el.setAttribute("playback-id", PLAYBACK_ID);
  el.setAttribute("stream-type", "on-demand");
  el.setAttribute("muted", "");
  container.appendChild(el);
  updateStatus("Mounted");
}

function unmount() {
  const el = container.querySelector("mux-player");
  if (!el) return;
  (el as any).pause?.();
  el.removeAttribute("src");
  el.remove();
  cycleCount++;
  counter.textContent = String(cycleCount);
  updateStatus("Unmounted");
}

document.getElementById("btn-mount")!.addEventListener("click", mount);
document.getElementById("btn-unmount")!.addEventListener("click", unmount);

document.getElementById("btn-loop")!.addEventListener("click", () => {
  if (loopInterval) return;
  const n = parseInt((document.getElementById("loop-count") as HTMLInputElement).value) || 10;
  const delay = parseInt((document.getElementById("loop-delay") as HTMLInputElement).value) || 500;
  let remaining = n * 2;
  let isMounted = false;
  updateStatus(`Looping (0/${n})...`);
  loopInterval = setInterval(() => {
    if (remaining <= 0) {
      stopLoop();
      return;
    }
    if (!isMounted) {
      mount();
      isMounted = true;
    } else {
      unmount();
      isMounted = false;
      updateStatus(`Looping (${cycleCount}/${cycleCount + remaining / 2})...`);
    }
    remaining--;
  }, delay);
});

function stopLoop() {
  if (loopInterval) {
    clearInterval(loopInterval);
    loopInterval = null;
  }
  updateStatus(`Loop done (${cycleCount} cycles)`);
}

document.getElementById("btn-stop")!.addEventListener("click", stopLoop);

document.getElementById("btn-gc")!.addEventListener("click", () => {
  if ((window as any).gc) {
    (window as any).gc();
    updateStatus(`GC triggered (${cycleCount} cycles)`);
  } else {
    updateStatus("GC not available - launch Chrome with --js-flags='--expose-gc'");
  }
});
