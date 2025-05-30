"use strict";var G=Object.defineProperty;var Le=Object.getOwnPropertyDescriptor;var ke=Object.getOwnPropertyNames;var Me=Object.prototype.hasOwnProperty;var J=o=>{throw TypeError(o)};var Q=(o,t)=>{for(var e in t)G(o,e,{get:t[e],enumerable:!0})},Ce=(o,t,e,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ke(t))!Me.call(o,i)&&i!==e&&G(o,i,{get:()=>t[i],enumerable:!(s=Le(t,i))||s.enumerable});return o};var Te=o=>Ce(G({},"__esModule",{value:!0}),o);var Z=(o,t,e)=>t.has(o)||J("Cannot "+e);var r=(o,t,e)=>(Z(o,t,"read from private field"),e?e.call(o):t.get(o)),l=(o,t,e)=>t.has(o)?J("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,e),u=(o,t,e,s)=>(Z(o,t,"write to private field"),s?s.call(o,e):t.set(o,e),e);var He={};Q(He,{MuxUploaderDropElement:()=>se,MuxUploaderFileSelectElement:()=>me,MuxUploaderPauseElement:()=>he,MuxUploaderProgressElement:()=>ne,MuxUploaderRetryElement:()=>de,MuxUploaderSrTextElement:()=>ye,MuxUploaderStatusElement:()=>le,constants:()=>D,default:()=>Pe});module.exports=Te(He);var D={};Q(D,{ProgressTypes:()=>x});var x={BAR:"bar",RADIAL:"radial",PERCENTAGE:"percentage"};var L=class{addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment=="undefined"){class o extends L{}globalThis.DocumentFragment=o}var R=class extends L{},W=class extends L{},we={get(o){},define(o,t,e){},getName(o){return null},upgrade(o){},whenDefined(o){return Promise.resolve(R)}},P,q=class{constructor(t,e={}){l(this,P);u(this,P,e==null?void 0:e.detail)}get detail(){return r(this,P)}initCustomEvent(){}};P=new WeakMap;function Se(o,t){return new R}var V={document:{createElement:Se},DocumentFragment,customElements:we,CustomEvent:q,EventTarget:L,HTMLElement:R,HTMLVideoElement:W},ee=typeof window=="undefined"||typeof globalThis.customElements=="undefined",a=ee?V:globalThis,p=ee?V.document:globalThis.document;var ge=require("@mux/upchunk");var te=(o,t)=>{if(!o)return null;let e=o.closest(t);return e||te(o.getRootNode().host,t)},h=o=>{let t=o.getAttribute("mux-uploader");return t?document.getElementById(t):te(o,"mux-uploader")};var re=p.createElement("template");re.innerHTML=`
<style>
  :host {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    padding: 2.5rem 2rem;
    border-radius: .25rem;
  }

  slot[name='heading'] > * {
    margin-bottom: 0.75rem;
    font-size: 1.75rem;
    text-align: center;
  }

  slot[name='separator'] > * {
    margin-bottom: 0.75rem;
  }

  #overlay {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  :host([active][overlay]) > #overlay {
    background: var(--overlay-background-color, rgba(226, 253, 255, 0.95));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  :host([file-ready])::part(heading),
  :host([file-ready])::part(separator) {
    display: none;
  }
</style>

<slot name="heading" part="heading">
  <span>Drop a video file here to upload</span>
</slot>
<slot name="separator" part="separator">
  <span>or</span>
</slot>
<slot></slot>

<div id="overlay">
  <h1 id="overlay-label"></h1>
</div>
`;var j={MUX_UPLOADER:"mux-uploader",OVERLAY_TEXT:"overlay-text"},z,m,k,H=class extends a.HTMLElement{constructor(){super();l(this,z);l(this,m);l(this,k);let e=this.attachShadow({mode:"open"});e.appendChild(re.content.cloneNode(!0)),u(this,z,e.getElementById("overlay-label"))}connectedCallback(){if(u(this,m,h(this)),u(this,k,new AbortController),r(this,m)){let e={signal:r(this,k).signal};r(this,m).addEventListener("file-ready",()=>this.toggleAttribute("file-ready",!0),e),r(this,m).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),e),r(this,m).addEventListener("success",()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)},e),r(this,m).addEventListener("reset",()=>{this.toggleAttribute("file-ready",!1),this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!1)},e),this.setupDragEvents(e),this.toggleAttribute("upload-in-progress",r(this,m).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",r(this,m).hasAttribute("upload-complete")),this.toggleAttribute("file-ready",r(this,m).hasAttribute("file-ready"))}}disconnectedCallback(){var e;(e=r(this,k))==null||e.abort()}attributeChangedCallback(e,s,i){e===j.OVERLAY_TEXT&&s!==i?r(this,z).innerHTML=i!=null?i:"":e==="active"&&this.hasAttribute("overlay")&&i!=null&&(this._currentDragTarget=this)}static get observedAttributes(){return[j.OVERLAY_TEXT,j.MUX_UPLOADER,"active"]}setupDragEvents(e){this.addEventListener("dragenter",s=>{this._currentDragTarget=s.target,s.preventDefault(),s.stopPropagation(),this.toggleAttribute("active",!0)},e),this.addEventListener("dragleave",s=>{this._currentDragTarget===s.target&&(this._currentDragTarget=void 0,this.toggleAttribute("active",!1))},e),this.addEventListener("dragover",s=>{s.preventDefault(),s.stopPropagation()},e),this.addEventListener("drop",s=>{var A;s.preventDefault(),s.stopPropagation();let{dataTransfer:i}=s,{files:n}=i,y=n[0];((A=r(this,m))!=null?A:this).dispatchEvent(new CustomEvent("file-ready",{composed:!0,bubbles:!0,detail:y})),this.removeAttribute("active")},e)}};z=new WeakMap,m=new WeakMap,k=new WeakMap;a.customElements.get("mux-uploader-drop")||(a.customElements.define("mux-uploader-drop",H),a.MuxUploaderDropElement=H);var se=H;function oe(o){return`${Math.floor(o)}%`}var ie=p.createElement("template"),Ue="Media upload progress bar";ie.innerHTML=`
<style>
  :host {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .bar-type {
    background: var(--progress-bar-background-color, #e6e6e6);
    border-radius: var(--progress-bar-border-radius, 100px);
    height: var(--progress-bar-height, 4px);
    width: 100%;
  }

  .radial-type,
  .bar-type,
  #percentage-type,
  :host([type="bar"][upload-error]) #percentage-type {
    display: none;
  }

  :host([type="radial"][upload-in-progress]) .radial-type,
  :host([type="bar"][upload-in-progress]) .bar-type {
    display: block;
  }

  :host([type="percentage"][upload-in-progress]) #percentage-type {
    display: var(--progress-percentage-display, block);
  }

  :host([type="bar"][upload-error]) .progress-bar {
    background: #e22c3e;
  }

  .progress-bar {
    box-shadow: var(--progress-bar-box-shadow, 0 10px 40px -10px #fff);
    border-radius: var(--progress-bar-border-radius, 100px);
    background: var(--progress-bar-fill-color, #000000);
    height: var(--progress-bar-height, 4px);
    width: 0%;
    transition: width 0.25s;
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

  #percentage-type {
    font-size: inherit;
    margin: 0 0 1em;
  }
</style>

<slot></slot>

<p id="percentage-type"></p>
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
`;var f,M,F=class extends a.HTMLElement{constructor(){var s,i,n,y;super();l(this,f);l(this,M);this.onUploadStart=()=>{var e;(e=this.progressBar)==null||e.focus(),this.toggleAttribute("upload-in-progress",!0)};this.onProgress=e=>{var i;let s=e.detail;switch((i=this.progressBar)==null||i.setAttribute("aria-valuenow",`${Math.floor(s)}`),this.getAttribute("type")){case x.BAR:{this.progressBar&&(this.progressBar.style.width=`${s}%`);break}case x.RADIAL:{if(this.svgCircle){let n=this.getCircumference()-s/100*this.getCircumference();this.svgCircle.style.strokeDashoffset=n.toString()}break}case x.PERCENTAGE:{this.uploadPercentage&&(this.uploadPercentage.innerHTML=oe(s));break}}};this.onSuccess=()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)};this.onReset=()=>{this.toggleAttribute("upload-in-progress",!1),this.uploadPercentage&&(this.uploadPercentage.innerHTML=""),this.svgCircle&&(this.svgCircle.style.strokeDashoffset=`${this.getCircumference()}`)};this.attachShadow({mode:"open"}).appendChild(ie.content.cloneNode(!0)),this.svgCircle=(s=this.shadowRoot)==null?void 0:s.querySelector("circle"),this.progressBar=(i=this.shadowRoot)==null?void 0:i.getElementById("progress-bar"),this.uploadPercentage=(n=this.shadowRoot)==null?void 0:n.getElementById("percentage-type"),(y=this.progressBar)==null||y.setAttribute("aria-description",Ue)}connectedCallback(){if(this.setDefaultType(),u(this,f,h(this)),u(this,M,new AbortController),r(this,f)){let e={signal:r(this,M).signal};r(this,f).addEventListener("uploadstart",this.onUploadStart,e),r(this,f).addEventListener("reset",this.onReset),r(this,f).addEventListener("progress",this.onProgress),r(this,f).addEventListener("success",this.onSuccess),this.toggleAttribute("upload-in-progress",r(this,f).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",r(this,f).hasAttribute("upload-complete"))}}disconnectedCallback(){var e;(e=r(this,M))==null||e.abort()}getRadius(){var e;return Number((e=this.svgCircle)==null?void 0:e.getAttribute("r"))}getCircumference(){return this.getRadius()*2*Math.PI}setDefaultType(){let e=this.getAttribute("type");e||this.setAttribute("type",x.BAR),e===x.RADIAL&&this.svgCircle&&(this.svgCircle.style.strokeDasharray=`${this.getCircumference()} ${this.getCircumference()}`,this.svgCircle.style.strokeDashoffset=`${this.getCircumference()}`)}};f=new WeakMap,M=new WeakMap;a.customElements.get("mux-uploader-progress")||a.customElements.define("mux-uploader-progress",F);var ne=F;var ae=p.createElement("template");ae.innerHTML=`
<style>

:host([upload-error]) {
  color: #e22c3e;
}
</style>

<span id="status-message" role="status" aria-live="polite"></span>
`;var c,C,_=class extends a.HTMLElement{constructor(){var s;super();l(this,c);l(this,C);this.clearStatusMessage=()=>{this.toggleAttribute("upload-error",!1),this.statusMessage&&(this.statusMessage.innerHTML="")};this.onUploadError=e=>{this.toggleAttribute("upload-error",!0),this.statusMessage&&(this.statusMessage.innerHTML=e.detail.message)};this.onSuccess=()=>{this.toggleAttribute("upload-error",!1);let e="Upload complete!";this.statusMessage&&(this.statusMessage.innerHTML=e),console.info(e)};this.onOffline=()=>{this.toggleAttribute("upload-error",!1);let e="Currently offline. Upload will resume automatically when online.";this.statusMessage&&(this.statusMessage.innerHTML=e)};this.attachShadow({mode:"open"}).appendChild(ae.content.cloneNode(!0)),this.statusMessage=(s=this.shadowRoot)==null?void 0:s.getElementById("status-message")}connectedCallback(){if(u(this,c,h(this)),u(this,C,new AbortController),r(this,c)){let e={signal:r(this,C).signal};r(this,c).addEventListener("reset",this.clearStatusMessage,e),r(this,c).addEventListener("uploaderror",this.onUploadError,e),r(this,c).addEventListener("success",this.onSuccess,e),r(this,c).addEventListener("uploadstart",this.clearStatusMessage,e),r(this,c).addEventListener("offline",this.onOffline,e),r(this,c).addEventListener("online",this.clearStatusMessage,e),this.toggleAttribute("upload-in-progress",r(this,c).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",r(this,c).hasAttribute("upload-complete")),this.toggleAttribute("upload-error",r(this,c).hasAttribute("upload-error"))}}disconnectedCallback(){var e;(e=r(this,C))==null||e.abort()}};c=new WeakMap,C=new WeakMap;a.customElements.get("mux-uploader-status")||a.customElements.define("mux-uploader-status",_);var le=_;var ue=p.createElement("template");ue.innerHTML=`
<style>
  #retry-button {
    color: #e22c3e;
    text-decoration-line: underline;
    cursor: pointer;
    position: relative;
    display: none;
  }

  :host([upload-error]) #retry-button {
    display: inline-block;
  }
</style>

<span id="retry-button" role="button" tabindex="0">Try again</span>
`;var E,T,O=class extends a.HTMLElement{constructor(){var s;super();l(this,E);l(this,T);this.handleKeyup=e=>{let s=["Enter"," "],{key:i}=e;s.includes(i)&&this.triggerReset()};this.triggerReset=()=>{var e;(e=r(this,E))==null||e.dispatchEvent(new CustomEvent("reset"))};this.attachShadow({mode:"open"}).appendChild(ue.content.cloneNode(!0)),this.retryButton=(s=this.shadowRoot)==null?void 0:s.getElementById("retry-button")}connectedCallback(){var e,s;if(u(this,E,h(this)),u(this,T,new AbortController),r(this,E)){let i={signal:r(this,T).signal};r(this,E).addEventListener("uploaderror",()=>this.toggleAttribute("upload-error",!0)),r(this,E).addEventListener("reset",()=>this.toggleAttribute("upload-error",!1)),(e=this.retryButton)==null||e.addEventListener("click",this.triggerReset,i),(s=this.retryButton)==null||s.addEventListener("keyup",this.handleKeyup,i),this.toggleAttribute("upload-error",r(this,E).hasAttribute("upload-error"))}}disconnectedCallback(){var e;(e=r(this,T))==null||e.abort()}};E=new WeakMap,T=new WeakMap;a.customElements.get("mux-uploader-retry")||a.customElements.define("mux-uploader-retry",O);var de=O;var pe=p.createElement("template");pe.innerHTML=`
<style>
#pause-button {
  cursor: pointer;
  line-height: 16px;
  background: #fff;
  border: 1px solid #000;
  color: #000000;
  padding: 16px 24px;
  border-radius: 4px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: none;
}

#pause-button:hover:not(:disabled) {
  color: #fff;
  background: #404040;
}

#pause-button:active {
  color: #fff;
  background: #000;
}

#pause-button:disabled {
  cursor: not-allowed;
}

:host([upload-in-progress]:not([upload-error], [upload-complete])) #pause-button {
  display: initial;
}
</style>

<button id="pause-button">Pause</span>
`;var d,w,I=class extends a.HTMLElement{constructor(){super();l(this,d);l(this,w);this.triggerPause=()=>{if(!r(this,d)){console.warn("pausing before a mux-uploader element is associated is unsupported!");return}this.pauseButton.disabled||(r(this,d).paused=!r(this,d).paused)};this.attachShadow({mode:"open"}).appendChild(pe.content.cloneNode(!0))}connectedCallback(){if(u(this,d,h(this)),u(this,w,new AbortController),r(this,d)){let e={signal:r(this,w).signal};r(this,d).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),e),r(this,d).addEventListener("uploaderror",()=>{this.toggleAttribute("upload-error",!0),this.toggleAttribute("upload-complete",!1),this.toggleAttribute("upload-in-progress",!1)}),r(this,d).addEventListener("success",()=>{this.toggleAttribute("upload-complete",!0),this.toggleAttribute("upload-error",!1),this.toggleAttribute("upload-in-progress",!1)}),r(this,d).addEventListener("reset",()=>{this.toggleAttribute("upload-error",!1),this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!1)}),r(this,d).addEventListener("pausedchange",()=>{var i;if(this.pauseButton.disabled=!1,!r(this,d))return;let s=(i=r(this,d).paused)!=null?i:!1;this.pauseButton.innerHTML=s?"Pausing...":"Pause",s&&(this.pauseButton.disabled=!0,r(this,d).addEventListener("chunksuccess",()=>{var n;this.pauseButton.innerHTML=(n=r(this,d))!=null&&n.paused?"Resume":"Pause",this.pauseButton.disabled=!1},{once:!0}))}),this.pauseButton.addEventListener("click",this.triggerPause,e),this.toggleAttribute("upload-in-progress",r(this,d).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",r(this,d).hasAttribute("upload-complete")),this.toggleAttribute("upload-error",r(this,d).hasAttribute("upload-error"))}}disconnectedCallback(){var e;(e=r(this,w))==null||e.abort()}get pauseButton(){var e;return(e=this.shadowRoot)==null?void 0:e.getElementById("pause-button")}};d=new WeakMap,w=new WeakMap;a.customElements.get("mux-uploader-pause")||a.customElements.define("mux-uploader-pause",I);var he=I;var X=`
  <style>
  #file-select {
    cursor: pointer;
    line-height: 16px;
    background: #fff;
    border: 1px solid #000;
    color: #000000;
    padding: 16px 24px;
    border-radius: 4px;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    font-family: inherit;
    font-size: inherit;
    position: relative;
  }

  #file-select:hover {
    color: #fff;
    background: #404040;
  }

  #file-select:active {
    color: #fff;
    background: #000;
  }

  </style>

  <button id="file-select" type="button" part="file-select-button">Upload a video</button>
`,ce=p.createElement("template");ce.innerHTML=`
  <style>
    :host { display: inline-block; }

    :host([file-ready]) > slot  {
      display: none;
    }
  </style>

  <slot>
    ${X}
  </slot>
`;var b,g,S,N=class extends a.HTMLElement{constructor(){var s,i,n;super();l(this,b);l(this,g);l(this,S);this.attachShadow({mode:"open"}).appendChild(ce.content.cloneNode(!0)),this.handleFilePickerElClick=this.handleFilePickerElClick.bind(this),this.filePickerEl=(s=this.shadowRoot)==null?void 0:s.querySelector("button"),(n=(i=this.shadowRoot)==null?void 0:i.querySelector("slot"))==null||n.addEventListener("slotchange",y=>{let U=y.currentTarget;this.filePickerEl=U.assignedElements({flatten:!0}).filter(A=>!["STYLE"].includes(A.nodeName))[0]})}connectedCallback(){if(u(this,g,h(this)),u(this,S,new AbortController),r(this,g)){let e={signal:r(this,S).signal};r(this,g).addEventListener("file-ready",()=>{this.toggleAttribute("file-ready",!0)},e),r(this,g).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),e),r(this,g).addEventListener("success",()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)},e),r(this,g).addEventListener("reset",()=>{this.toggleAttribute("file-ready",!1)},e),this.toggleAttribute("upload-in-progress",r(this,g).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",r(this,g).hasAttribute("upload-complete")),this.toggleAttribute("file-ready",r(this,g).hasAttribute("file-ready"))}}disconnectedCallback(){var e;(e=r(this,S))==null||e.abort()}get filePickerEl(){return r(this,b)}set filePickerEl(e){e!==r(this,b)&&(r(this,b)&&r(this,b).removeEventListener("click",this.handleFilePickerElClick),u(this,b,e),r(this,b)&&r(this,b).addEventListener("click",this.handleFilePickerElClick))}handleFilePickerElClick(){var i,n;let e=this.getAttribute("mux-uploader"),s=e?p.getElementById(e):this.getRootNode().host;(n=(i=s==null?void 0:s.shadowRoot)==null?void 0:i.querySelector("#hidden-file-input"))==null||n.click()}};b=new WeakMap,g=new WeakMap,S=new WeakMap;a.customElements.get("mux-uploader-file-select")||a.customElements.define("mux-uploader-file-select",N);var me=N;function $(o,t){return o?"":t}var Re=(o,t)=>{if(t==null||t===!1)return"";let e=t===!0?"":`${t}`;return`${o}="${e}"`};function Y(o){let{noDrop:t,noProgress:e,noStatus:s,noRetry:i,pausable:n,type:y}=o,U=t?"div":'mux-uploader-drop overlay part="drop"',A=$(e,`
      <mux-uploader-progress part="progress progress-percentage" type="percentage"></mux-uploader-progress>
      <mux-uploader-progress part="progress progress-bar" ${Re("type",y)}></mux-uploader-progress>
    `),ve=$(s,'<mux-uploader-status part="status"></mux-uploader-status>'),xe=$(i,'<mux-uploader-retry part="retry"></mux-uploader-retry>'),Ae=$(!n,'<mux-uploader-pause part="pause"></mux-uploader-pause>');return p.createRange().createContextualFragment(`
    <${U}>
      ${ve}
      ${xe}
      ${Ae}

      <mux-uploader-file-select part="file-select">
        <slot name="file-select">
          ${X}
        </slot>
      </mux-uploader-file-select>

      ${A}
    </${U}>
  `)}var fe=p.createElement("template");fe.innerHTML=`
<style>
  :host {
    display: flex;
    flex-direction: column;
  }

  mux-uploader-drop {
    flex-grow: 1;
  }

  input[type="file"] {
    display: none;
  }
</style>

<input id="hidden-file-input" type="file" accept="video/*, audio/*" />
<mux-uploader-sr-text></mux-uploader-sr-text>
`;var B=class extends a.HTMLElement{static get observedAttributes(){return["pausable","type","no-drop","no-progress","no-status","no-retry","max-file-size","use-large-file-workaround"]}constructor(){var e;super(),this.attachShadow({mode:"open"}).appendChild(fe.content.cloneNode(!0)),this.updateLayout(),(e=this.hiddenFileInput)==null||e.addEventListener("change",()=>{var i,n;let s=(n=(i=this.hiddenFileInput)==null?void 0:i.files)==null?void 0:n[0];this.toggleAttribute("file-ready",!!s),s&&this.dispatchEvent(new CustomEvent("file-ready",{composed:!0,bubbles:!0,detail:s}))})}connectedCallback(){this.addEventListener("file-ready",this.handleUpload),this.addEventListener("reset",this.resetState)}disconnectedCallback(){this.removeEventListener("file-ready",this.handleUpload,!1),this.removeEventListener("reset",this.resetState)}attributeChangedCallback(){this.updateLayout()}get hiddenFileInput(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("#hidden-file-input")}get endpoint(){var t;return(t=this.getAttribute("endpoint"))!=null?t:this._endpoint}set endpoint(t){t!==this.endpoint&&(typeof t=="string"?this.setAttribute("endpoint",t):t==null&&this.removeAttribute("endpoint"),this._endpoint=t)}get type(){var t;return(t=this.getAttribute("type"))!=null?t:void 0}set type(t){t!=this.type&&(t?this.setAttribute("type",t):this.removeAttribute("type"))}get noDrop(){return this.hasAttribute("no-drop")}set noDrop(t){this.toggleAttribute("no-drop",!!t)}get noProgress(){return this.hasAttribute("no-progress")}set noProgress(t){this.toggleAttribute("no-progress",!!t)}get noStatus(){return this.hasAttribute("no-status")}set noStatus(t){this.toggleAttribute("no-status",!!t)}get noRetry(){return this.hasAttribute("no-retry")}set noRetry(t){this.toggleAttribute("no-retry",!!t)}get pausable(){return this.hasAttribute("pausable")}set pausable(t){this.toggleAttribute("pausable",!!t)}get dynamicChunkSize(){return this.hasAttribute("dynamic-chunk-size")}set dynamicChunkSize(t){t!==this.hasAttribute("dynamic-chunk-size")&&(t?this.setAttribute("dynamic-chunk-size",""):this.removeAttribute("dynamic-chunk-size"))}get useLargeFileWorkaround(){return this.hasAttribute("use-large-file-workaround")}set useLargeFileWorkaround(t){t!=this.useLargeFileWorkaround&&this.toggleAttribute("use-large-file-workaround",!!t)}get maxFileSize(){let t=this.getAttribute("max-file-size");return t!==null?parseInt(t):void 0}set maxFileSize(t){t?this.setAttribute("max-file-size",t.toString()):this.removeAttribute("max-file-size")}get chunkSize(){let t=this.getAttribute("chunk-size");return t!==null?parseInt(t):void 0}set chunkSize(t){t?this.setAttribute("chunk-size",t.toString()):this.removeAttribute("chunk-size")}get upload(){return this._upload}get paused(){var t,e;return(e=(t=this.upload)==null?void 0:t.paused)!=null?e:!1}set paused(t){if(!this.upload){console.warn("Pausing before an upload has begun is unsupported");return}let e=!!t;e!==this.paused&&(e?this.upload.pause():this.upload.resume(),this.toggleAttribute("paused",e),this.dispatchEvent(new CustomEvent("pausedchange",{detail:e})))}updateLayout(){var s,i;let t=(s=this.shadowRoot)==null?void 0:s.querySelector("mux-uploader-drop, div");t&&t.remove();let e=Y(this);(i=this.shadowRoot)==null||i.appendChild(e)}setError(t){this.setAttribute("upload-error",""),this.dispatchEvent(new CustomEvent("uploaderror",{detail:{message:t}}))}resetState(){this.removeAttribute("upload-error"),this.removeAttribute("upload-in-progress"),this.removeAttribute("upload-complete"),this.hiddenFileInput.value=""}handleUpload(t){let e=this.endpoint,s=this.dynamicChunkSize;if(e)this.removeAttribute("upload-error");else{this.setError("No url or endpoint specified -- cannot handleUpload");return}try{let i=ge.UpChunk.createUpload({endpoint:e,dynamicChunkSize:s,file:t.detail,maxFileSize:this.maxFileSize,chunkSize:this.chunkSize,useLargeFileWorkaround:this.useLargeFileWorkaround});this._upload=i,this.dispatchEvent(new CustomEvent("uploadstart",{detail:{file:i.file,chunkSize:i.chunkSize}})),this.setAttribute("upload-in-progress",""),i.offline&&this.dispatchEvent(new CustomEvent("offline")),i.on("attempt",n=>{this.dispatchEvent(new CustomEvent("chunkattempt",n))}),i.on("chunkSuccess",n=>{this.dispatchEvent(new CustomEvent("chunksuccess",n))}),i.on("error",n=>{this.setAttribute("upload-error",""),console.error("error handler",n.detail.message),this.dispatchEvent(new CustomEvent("uploaderror",n))}),i.on("progress",n=>{this.dispatchEvent(new CustomEvent("progress",n))}),i.on("success",n=>{this.removeAttribute("upload-in-progress"),this.setAttribute("upload-complete",""),this.dispatchEvent(new CustomEvent("success",n))}),i.on("offline",n=>{this.dispatchEvent(new CustomEvent("offline",n))}),i.on("online",n=>{this.dispatchEvent(new CustomEvent("online",n))})}catch(i){i instanceof Error&&this.setError(i.message)}}};a.customElements.get("mux-uploader")||(a.customElements.define("mux-uploader",B),a.MuxUploaderElement=B);var be=B;var Ee=p.createElement("template");Ee.innerHTML=`
<style>

.sr-only {
  position:absolute;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
}
</style>

<div class="sr-only" id="sr-only" aria-live="polite"></div>
`;var v,K=class extends a.HTMLElement{constructor(){var s;super();l(this,v);this.attachShadow({mode:"open"}).appendChild(Ee.content.cloneNode(!0)),this.srOnlyText=(s=this.shadowRoot)==null?void 0:s.getElementById("sr-only")}connectedCallback(){u(this,v,h(this)),r(this,v)&&r(this,v).addEventListener("success",this.updateText.bind(this))}disconnectedCallback(){r(this,v)&&r(this,v).removeEventListener("success",this.updateText.bind(this))}updateText(){this.srOnlyText&&(this.srOnlyText.textContent="Upload complete!")}};v=new WeakMap;a.customElements.get("mux-uploader-sr-text")||a.customElements.define("mux-uploader-sr-text",K);var ye=K;var Pe=be;
//# sourceMappingURL=index.cjs.js.map
