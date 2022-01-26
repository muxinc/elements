class VideoApiElement extends HTMLElement {
  constructor() {
    super();

    // Initialize all the attribute properties
    Array.prototype.forEach.call(this.attributes, (attrNode) => {
      this.attributeChangedCallback(attrNode.name, null, attrNode.value);
    });

    this.querySelectorAll(":scope > track").forEach((track) => {
      this.video?.append(track.cloneNode());
    });

    // Watch for child adds/removes and update the native element if necessary
    const mutationCallback = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          // Child being removed
          mutation.removedNodes.forEach((node) => {
            const track = this.video?.querySelector(`track[src="${node.src}"]`);
            if (track) this.video?.removeChild(track);
          });

          mutation.addedNodes.forEach((node) => {
            this.video?.append(node.cloneNode());
          });
        }
      }
    };

    const observer = new MutationObserver(mutationCallback);
    observer.observe(this, { childList: true, subtree: true });
  }

  get video() {
    return this.shadowRoot?.querySelector("mux-video");
  }
}

export default VideoApiElement;
