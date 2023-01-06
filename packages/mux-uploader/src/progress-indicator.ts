import { globalThis, document } from 'shared-polyfills';

const template = document.createElement('template');
const TYPES = {
  BAR: 'bar',
  RADIAL: 'radial',
};

const ariaDescription = 'Media upload progress bar';

template.innerHTML = `
<style>
  :host {
    position: relative;
  }

  .bar-type {
    background: #e6e6e6;
    border-radius: 100px;
    position: relative;
    height: 4px;
    width: 100%;
  }
  
  .radial-type, .bar-type {
    display: none;
  }

  :host([type="radial"][upload-in-progress]) .radial-type {
    display: block;
  }
  
  :host([type="bar"][upload-in-progress]) .bar-type {
    display: block;
  }

  :host([type="bar"][upload-error]) .progress-bar {
    background: #e22c3e;
  }

  .progress-bar {
    box-shadow: 0 10px 40px -10px #fff;
    border-radius: 100px;
    background: var(--progress-bar-fill-color, #000000);
    height: 4px;
    width: 0%;
  }

  circle {
    stroke: var(--progress-radial-fill-color, black);
    stroke-width: 6;  /* Thickness of the circle */
    fill: transparent; /* Make inside of the circle see-through */
  
    /* Animation */ 
    transition: 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
  }
</style>

<slot></slot>
<div class="bar-type">
  <div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="progress-bar" id="progress-bar" tabindex="0"></div>
</div>
<div class="radial-type">
  <svg
    width="120"
    height="120">
    <!-- To prevent overflow of the SVG wrapper, radius must be  (svgWidth / 2) - (circleStrokeWidth * 2)
      or use overflow: visible on the svg.-->
    <circle
      r="52"
      cx="60"
      cy="60"
    />
  <svg>
</div>
`;

class ProgressIndicator extends globalThis.HTMLElement {
  svgCircle: SVGCircleElement | null | undefined;
  progressBar: HTMLElement | null | undefined;

  $isUploading = false;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.svgCircle = this.shadowRoot?.querySelector('circle');
    this.progressBar = this.shadowRoot?.getElementById('progress-bar');
    this.progressBar?.setAttribute('aria-description', ariaDescription);
  }

  connectedCallback() {
    this.setDefaultType();
    const parent = document.querySelector('mux-uploader');

    parent?.addEventListener('progress', (e) => {
      // @ts-ignore
      const percent = e.detail;
      this.progressBar?.setAttribute('aria-valuenow', `${Math.floor(percent)}`);

      switch (this.getAttribute('type')) {
        case TYPES.BAR: {
          if (this.progressBar) this.progressBar.style.width = `${percent}%`;
          break;
        }
        case TYPES.RADIAL: {
          if (this.svgCircle) {
            // The closer the upload percentage gets to 100%, the closer offset gets to 0.
            // The closer offset gets to 0, the more we can see the circumference of our circle. (TD).
            const offset = this.getCircumference() - (percent / 100) * this.getCircumference();

            this.svgCircle.style.strokeDashoffset = offset.toString();
          }
        }
      }
    });

    parent?.addEventListener('uploadstart', this.onUploadStart.bind(this));
  }

  onUploadStart() {
    this.progressBar?.focus();
    this.setAttribute('upload-in-progress', '');
  }

  getRadius() {
    return Number(this.svgCircle?.getAttribute('r'));
  }

  getCircumference() {
    return this.getRadius() * 2 * Math.PI;
  }

  setDefaultType() {
    const currentType = this.getAttribute('type');

    if (!currentType) {
      this.setAttribute('type', TYPES.BAR);
    }

    if (currentType === TYPES.RADIAL) {
      if (this.svgCircle) {
        // strokeDasharray is the size of dashes used to draw the circle with the size of gaps in between.
        // If the dash number is the same as the gap number, no gap is visible: a full circle.
        // strokeDashoffset defines where along our circle the dashes (in our case, a dash as long as the
        // circumference of our circle) begins. The larger the offset, the farther into the circle you're
        // starting the "dash". In the beginning, offset is the same as the circumference. Meaning, the visible
        // dash starts at the end so we don't see the full circle. Instead we see a gap the size of the circle.
        // When the percentage is 100%, offset is 0 meaning the dash starts at the beginning so we can see the circle. (TD).
        this.svgCircle.style.strokeDasharray = `${this.getCircumference()} ${this.getCircumference()}`;
        this.svgCircle.style.strokeDashoffset = `${this.getCircumference()}`;
      }
    }
  }
}

if (!globalThis.customElements.get('mux-uploader-progress-indicator')) {
  globalThis.customElements.define('mux-uploader-progress-indicator', ProgressIndicator);
}

export default ProgressIndicator;
