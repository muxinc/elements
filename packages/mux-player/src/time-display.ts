const styles = `
  :host {
    cursor: pointer;
  }
`;

const template = document.createElement("template");
template.innerHTML = `
  <style>
    ${styles}
  </style>
  <media-time-display show-duration></media-time-display>
`;

const ButtonPressedKeys = ["Enter", " "];

class MediaTimeDisplayToggle extends HTMLElement {
  static styles: string = styles;
  static template: HTMLTemplateElement = template;
  timeDisplayEl: HTMLElement | null | undefined;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(
      (this.constructor as any).template.content.cloneNode(true)
    );
    this.timeDisplayEl = this.shadowRoot?.querySelector("media-time-display");
  }

  toggleTimeDisplay() {
    if (this.timeDisplayEl?.hasAttribute("remaining")) {
      this.timeDisplayEl?.removeAttribute("remaining");
    } else {
      this.timeDisplayEl?.setAttribute("remaining", "");
    }
  }

  connectedCallback() {
    const keyUpHandler = (e: KeyboardEvent) => {
      const { key } = e;
      if (!ButtonPressedKeys.includes(key)) {
        this.removeEventListener("keyup", keyUpHandler);
        return;
      }

      this.toggleTimeDisplay();
    };

    this.addEventListener("keydown", (e) => {
      const { metaKey, altKey, key } = e;
      if (metaKey || altKey || !ButtonPressedKeys.includes(key)) {
        this.removeEventListener("keyup", keyUpHandler);
        return;
      }
      this.addEventListener("keyup", keyUpHandler);
    });

    this.addEventListener("click", this.toggleTimeDisplay);
  }
}

if (!globalThis.customElements.get("mxp-time-display")) {
  globalThis.customElements.define("mxp-time-display", MediaTimeDisplayToggle);
  (globalThis as any).MediaTimeDisplayToggle = MediaTimeDisplayToggle;
}

export default MediaTimeDisplayToggle;
