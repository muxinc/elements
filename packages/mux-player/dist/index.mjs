var He=t=>{throw TypeError(t)};var Ce=(t,a,e)=>a.has(t)||He("Cannot "+e);var u=(t,a,e)=>(Ce(t,a,"read from private field"),e?e.call(t):a.get(t)),C=(t,a,e)=>a.has(t)?He("Cannot add the same private member more than once"):a instanceof WeakSet?a.add(t):a.set(t,e),R=(t,a,e,i)=>(Ce(t,a,"write to private field"),i?i.call(t,e):a.set(t,e),e),b=(t,a,e)=>(Ce(t,a,"access private method"),e);var G=class{addEventListener(){}removeEventListener(){}dispatchEvent(a){return!0}};if(typeof DocumentFragment=="undefined"){class t extends G{}globalThis.DocumentFragment=t}var ee=class extends G{},ke=class extends G{},xt={get(t){},define(t,a,e){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(ee)}},te,xe=class{constructor(a,e={}){C(this,te);R(this,te,e==null?void 0:e.detail)}get detail(){return u(this,te)}initCustomEvent(){}};te=new WeakMap;function _t(t,a){return new ee}var Ye={document:{createElement:_t},DocumentFragment,customElements:xt,CustomEvent:xe,EventTarget:G,HTMLElement:ee,HTMLVideoElement:ke},Fe=typeof window=="undefined"||typeof globalThis.customElements=="undefined",v=Fe?Ye:globalThis,j=Fe?Ye.document:globalThis.document;import{MediaController as sa,MediaErrorDialog as vt}from"media-chrome";import{Attributes as De}from"media-chrome/dist/media-container.js";import{MediaStateChangeEvents as ct,MediaUIAttributes as Te,MediaUIEvents as pt}from"media-chrome/dist/constants.js";import"media-chrome/dist/experimental/index.js";import{MediaError as oe,Attributes as s}from"@mux/mux-video";import{StreamTypes as L,PlaybackTypes as Ae,addTextTrack as da,removeTextTrack as la,CmcdTypeValues as bt,i18n as W,parseJwt as Ve,MuxJWTAud as Ue,generatePlayerInitTime as ua}from"@mux/playback-core";import{VideoEvents as Nt}from"@mux/mux-video";import{i18n as St}from"@mux/playback-core";import{StreamTypes as Oe,parseJwt as We}from"@mux/playback-core";function $e(t){let a="";return Object.entries(t).forEach(([e,i])=>{i!=null&&(a+=`${pe(e)}: ${i}; `)}),a?a.trim():void 0}function pe(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function be(t){return t.replace(/[-_]([a-z])/g,(a,e)=>e.toUpperCase())}function T(t){if(t==null)return;let a=+t;return Number.isNaN(a)?void 0:a}function _e(t){let a=Rt(t).toString();return a?"?"+a:""}function Rt(t){let a={};for(let e in t)t[e]!=null&&(a[e]=t[e]);return new URLSearchParams(a)}var Re=(t,a)=>!t||!a?!1:t.contains(a)?!0:Re(t,a.getRootNode().host);var Ze="mux.com",Ot=()=>{try{return"3.4.0"}catch{}return"UNKNOWN"},Lt=Ot(),ge=()=>Lt,Ge=(t,{token:a,customDomain:e=Ze,thumbnailTime:i,programTime:r}={})=>{var l;let o=a==null?i:void 0,{aud:d}=(l=We(a))!=null?l:{};if(!(a&&d!=="t"))return`https://image.${e}/${t}/thumbnail.webp${_e({token:a,time:o,program_time:r})}`},je=(t,{token:a,customDomain:e=Ze,programStartTime:i,programEndTime:r}={})=>{var d;let{aud:o}=(d=We(a))!=null?d:{};if(!(a&&o!=="s"))return`https://image.${e}/${t}/storyboard.vtt${_e({token:a,format:"webp",program_start_time:i,program_end_time:r})}`},ae=t=>{if(t){if([Oe.LIVE,Oe.ON_DEMAND].includes(t))return t;if(t!=null&&t.includes("live"))return Oe.LIVE}};var Mt={crossorigin:"crossOrigin",playsinline:"playsInline"};function Xe(t){var a;return(a=Mt[t])!=null?a:be(t)}var H,Y,A,he=class{constructor(a,e){C(this,H);C(this,Y);C(this,A,[]);R(this,H,a),R(this,Y,e)}[Symbol.iterator](){return u(this,A).values()}get length(){return u(this,A).length}get value(){var a;return(a=u(this,A).join(" "))!=null?a:""}set value(a){var e;a!==this.value&&(R(this,A,[]),this.add(...(e=a==null?void 0:a.split(" "))!=null?e:[]))}toString(){return this.value}item(a){return u(this,A)[a]}values(){return u(this,A).values()}keys(){return u(this,A).keys()}forEach(a){u(this,A).forEach(a)}add(...a){var e,i;a.forEach(r=>{this.contains(r)||u(this,A).push(r)}),!(this.value===""&&!((e=u(this,H))!=null&&e.hasAttribute(`${u(this,Y)}`)))&&((i=u(this,H))==null||i.setAttribute(`${u(this,Y)}`,`${this.value}`))}remove(...a){var e;a.forEach(i=>{u(this,A).splice(u(this,A).indexOf(i),1)}),(e=u(this,H))==null||e.setAttribute(`${u(this,Y)}`,`${this.value}`)}contains(a){return u(this,A).includes(a)}toggle(a,e){return typeof e!="undefined"?e?(this.add(a),!0):(this.remove(a),!1):this.contains(a)?(this.remove(a),!1):(this.add(a),!0)}replace(a,e){this.remove(a),this.add(e)}};H=new WeakMap,Y=new WeakMap,A=new WeakMap;var ze=`[mux-player ${ge()}]`;function O(...t){console.warn(ze,...t)}function k(...t){console.error(ze,...t)}function Le(t){var e;let a=(e=t.message)!=null?e:"";t.context&&(a+=` ${t.context}`),t.file&&(a+=` ${St("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t.file}`),O(a)}var g={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},D={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted",MUX_VIDEO_ELEMENT:"mux-video-element"},wt={...g,...D},Qe=Object.freeze({length:0,start(t){let a=t>>>0;if(a>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${a}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let a=t>>>0;if(a>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${a}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),It=Nt.filter(t=>t!=="error"),Pt=Object.values(g).filter(t=>g.PLAYSINLINE!==t),Dt=Object.values(D),Vt=[...Pt,...Dt],Me=class extends v.HTMLElement{static get observedAttributes(){return Vt}constructor(){super()}init(){It.forEach(a=>{var e;(e=this.media)==null||e.addEventListener(a,i=>{this.dispatchEvent(new Event(i.type))})})}attributeChangedCallback(a,e,i){var r,o;switch(a){case D.MUTED:{this.media&&(this.media.muted=i!=null,this.media.defaultMuted=i!=null);return}case D.VOLUME:{let d=(r=T(i))!=null?r:1;this.media&&(this.media.volume=d);return}case D.PLAYBACKRATE:{let d=(o=T(i))!=null?o:1;this.media&&(this.media.playbackRate=d,this.media.defaultPlaybackRate=d);return}}}play(){var a,e;return(e=(a=this.media)==null?void 0:a.play())!=null?e:Promise.reject()}pause(){var a;(a=this.media)==null||a.pause()}load(){var a;(a=this.media)==null||a.load()}requestCast(a){var e;return(e=this.media)==null?void 0:e.requestCast(a)}get muxVideoElement(){var a;return(a=this.getAttribute(wt.MUX_VIDEO_ELEMENT))!=null?a:"mux-video"}get media(){var a;return(a=this.shadowRoot)==null?void 0:a.querySelector(this.muxVideoElement)}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var a,e;return(e=(a=this.media)==null?void 0:a.paused)!=null?e:!0}get duration(){var a,e;return(e=(a=this.media)==null?void 0:a.duration)!=null?e:NaN}get ended(){var a,e;return(e=(a=this.media)==null?void 0:a.ended)!=null?e:!1}get buffered(){var a,e;return(e=(a=this.media)==null?void 0:a.buffered)!=null?e:Qe}get seekable(){var a,e;return(e=(a=this.media)==null?void 0:a.seekable)!=null?e:Qe}get readyState(){var a,e;return(e=(a=this.media)==null?void 0:a.readyState)!=null?e:0}get videoWidth(){var a,e;return(e=(a=this.media)==null?void 0:a.videoWidth)!=null?e:0}get videoHeight(){var a,e;return(e=(a=this.media)==null?void 0:a.videoHeight)!=null?e:0}get currentSrc(){var a,e;return(e=(a=this.media)==null?void 0:a.currentSrc)!=null?e:""}get currentTime(){var a,e;return(e=(a=this.media)==null?void 0:a.currentTime)!=null?e:0}set currentTime(a){this.media&&(this.media.currentTime=Number(a))}get volume(){var a,e;return(e=(a=this.media)==null?void 0:a.volume)!=null?e:1}set volume(a){this.media&&(this.media.volume=Number(a))}get playbackRate(){var a,e;return(e=(a=this.media)==null?void 0:a.playbackRate)!=null?e:1}set playbackRate(a){this.media&&(this.media.playbackRate=Number(a))}get defaultPlaybackRate(){var a;return(a=T(this.getAttribute(D.PLAYBACKRATE)))!=null?a:1}set defaultPlaybackRate(a){a!=null?this.setAttribute(D.PLAYBACKRATE,`${a}`):this.removeAttribute(D.PLAYBACKRATE)}get crossOrigin(){return ie(this,g.CROSSORIGIN)}set crossOrigin(a){this.setAttribute(g.CROSSORIGIN,`${a}`)}get autoplay(){return ie(this,g.AUTOPLAY)!=null}set autoplay(a){a?this.setAttribute(g.AUTOPLAY,typeof a=="string"?a:""):this.removeAttribute(g.AUTOPLAY)}get loop(){return ie(this,g.LOOP)!=null}set loop(a){a?this.setAttribute(g.LOOP,""):this.removeAttribute(g.LOOP)}get muted(){var a,e;return(e=(a=this.media)==null?void 0:a.muted)!=null?e:!1}set muted(a){this.media&&(this.media.muted=!!a)}get defaultMuted(){return ie(this,g.MUTED)!=null}set defaultMuted(a){a?this.setAttribute(g.MUTED,""):this.removeAttribute(g.MUTED)}get playsInline(){return ie(this,g.PLAYSINLINE)!=null}set playsInline(a){k("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(a){["","none","metadata","auto"].includes(a)?this.setAttribute(g.PRELOAD,a):this.removeAttribute(g.PRELOAD)}};function ie(t,a){return t.media?t.media.getAttribute(a):t.getAttribute(a)}var Se=Me;import"media-chrome/dist/media-theme-element.js";var Je=`:host {
  --media-control-display: var(--controls);
  --media-loading-indicator-display: var(--loading-indicator);
  --media-dialog-display: var(--dialog);
  --media-play-button-display: var(--play-button);
  --media-live-button-display: var(--live-button);
  --media-seek-backward-button-display: var(--seek-backward-button);
  --media-seek-forward-button-display: var(--seek-forward-button);
  --media-mute-button-display: var(--mute-button);
  --media-captions-button-display: var(--captions-button);
  --media-captions-menu-button-display: var(--captions-menu-button, var(--media-captions-button-display));
  --media-rendition-menu-button-display: var(--rendition-menu-button);
  --media-audio-track-menu-button-display: var(--audio-track-menu-button);
  --media-airplay-button-display: var(--airplay-button);
  --media-pip-button-display: var(--pip-button);
  --media-fullscreen-button-display: var(--fullscreen-button);
  --media-cast-button-display: var(--cast-button, var(--_cast-button-drm-display));
  --media-playback-rate-button-display: var(--playback-rate-button);
  --media-playback-rate-menu-button-display: var(--playback-rate-menu-button);
  --media-volume-range-display: var(--volume-range);
  --media-time-range-display: var(--time-range);
  --media-time-display-display: var(--time-display);
  --media-duration-display-display: var(--duration-display);
  --media-title-display-display: var(--title-display);

  display: inline-block;
  line-height: 0;
  width: 100%;
}

a {
  color: #fff;
  font-size: 0.9em;
  text-decoration: underline;
}

media-theme {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  direction: ltr;
}

media-poster-image {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
}

media-poster-image:not([src]):not([placeholdersrc]) {
  display: none;
}

::part(top),
[part~='top'] {
  --media-control-display: var(--controls, var(--top-controls));
  --media-play-button-display: var(--play-button, var(--top-play-button));
  --media-live-button-display: var(--live-button, var(--top-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--top-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--top-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--top-mute-button));
  --media-captions-button-display: var(--captions-button, var(--top-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--top-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--top-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--top-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--top-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--top-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--top-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--top-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--top-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --captions-menu-button,
    var(--media-playback-rate-button-display, var(--top-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--top-volume-range));
  --media-time-range-display: var(--time-range, var(--top-time-range));
  --media-time-display-display: var(--time-display, var(--top-time-display));
  --media-duration-display-display: var(--duration-display, var(--top-duration-display));
  --media-title-display-display: var(--title-display, var(--top-title-display));
}

::part(center),
[part~='center'] {
  --media-control-display: var(--controls, var(--center-controls));
  --media-play-button-display: var(--play-button, var(--center-play-button));
  --media-live-button-display: var(--live-button, var(--center-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--center-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--center-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--center-mute-button));
  --media-captions-button-display: var(--captions-button, var(--center-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--center-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--center-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--center-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--center-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--center-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--center-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--center-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--center-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--center-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--center-volume-range));
  --media-time-range-display: var(--time-range, var(--center-time-range));
  --media-time-display-display: var(--time-display, var(--center-time-display));
  --media-duration-display-display: var(--duration-display, var(--center-duration-display));
}

::part(bottom),
[part~='bottom'] {
  --media-control-display: var(--controls, var(--bottom-controls));
  --media-play-button-display: var(--play-button, var(--bottom-play-button));
  --media-live-button-display: var(--live-button, var(--bottom-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--bottom-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--bottom-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--bottom-mute-button));
  --media-captions-button-display: var(--captions-button, var(--bottom-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--bottom-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--bottom-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--bottom-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--bottom-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--bottom-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--bottom-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--bottom-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--bottom-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--bottom-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--bottom-volume-range));
  --media-time-range-display: var(--time-range, var(--bottom-time-range));
  --media-time-display-display: var(--time-display, var(--bottom-time-display));
  --media-duration-display-display: var(--duration-display, var(--bottom-duration-display));
  --media-title-display-display: var(--title-display, var(--bottom-title-display));
}

:host([no-tooltips]) {
  --media-tooltip-display: none;
}
`;import{TemplateInstance as Bt,ChildNodePart as ye,AttrPart as ve}from"media-chrome/dist/media-theme-element.js";var re=new WeakMap,we=class t{constructor(a,e){this.element=a;this.type=e;this.element.addEventListener(this.type,this);let i=re.get(this.element);i&&i.set(this.type,this)}set(a){if(typeof a=="function")this.handleEvent=a.bind(this.element);else if(typeof a=="object"&&typeof a.handleEvent=="function")this.handleEvent=a.handleEvent.bind(a);else{this.element.removeEventListener(this.type,this);let e=re.get(this.element);e&&e.delete(this.type)}}static for(a){re.has(a.element)||re.set(a.element,new Map);let e=a.attributeName.slice(2),i=re.get(a.element);return i&&i.has(e)?i.get(e):new t(a.element,e)}};function Kt(t,a){return t instanceof ve&&t.attributeName.startsWith("on")?(we.for(t).set(a),t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),!0):!1}function Ht(t,a){return a instanceof fe&&t instanceof ye?(a.renderInto(t),!0):!1}function Yt(t,a){return a instanceof DocumentFragment&&t instanceof ye?(a.childNodes.length&&t.replace(...a.childNodes),!0):!1}function Ft(t,a){if(t instanceof ve){let e=t.attributeNamespace,i=t.element.getAttributeNS(e,t.attributeName);return String(a)!==i&&(t.value=String(a)),!0}return t.value=String(a),!0}function $t(t,a){if(t instanceof ve&&a instanceof Element){let e=t.element;return e[t.attributeName]!==a&&(t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),e[t.attributeName]=a),!0}return!1}function Wt(t,a){if(typeof a=="boolean"&&t instanceof ve){let e=t.attributeNamespace,i=t.element.hasAttributeNS(e,t.attributeName);return a!==i&&(t.booleanValue=a),!0}return!1}function Zt(t,a){return a===!1&&t instanceof ye?(t.replace(""),!0):!1}function Gt(t,a){$t(t,a)||Wt(t,a)||Kt(t,a)||Zt(t,a)||Ht(t,a)||Yt(t,a)||Ft(t,a)}var Ne=new Map,et=new WeakMap,tt=new WeakMap,fe=class{constructor(a,e,i){this.strings=a;this.values=e;this.processor=i;this.stringsKey=this.strings.join("")}get template(){if(Ne.has(this.stringsKey))return Ne.get(this.stringsKey);{let a=j.createElement("template"),e=this.strings.length-1;return a.innerHTML=this.strings.reduce((i,r,o)=>i+r+(o<e?`{{ ${o} }}`:""),""),Ne.set(this.stringsKey,a),a}}renderInto(a){var r;let e=this.template;if(et.get(a)!==e){et.set(a,e);let o=new Bt(e,this.values,this.processor);tt.set(a,o),a instanceof ye?a.replace(...o.children):a.appendChild(o);return}let i=tt.get(a);(r=i==null?void 0:i.update)==null||r.call(i,this.values)}},jt={processCallback(t,a,e){var i;if(e){for(let[r,o]of a)if(r in e){let d=(i=e[r])!=null?i:"";Gt(o,d)}}}};function F(t,...a){return new fe(t,a,jt)}function at(t,a){t.renderInto(a)}import{StreamTypes as Xt,toMuxVideoURL as it}from"@mux/playback-core";var zt=t=>{let{tokens:a}=t;return a.drm?":host { --_cast-button-drm-display: none; }":""},rt=t=>F`
  <style>
    ${zt(t)}
    ${Je}
  </style>
  ${ta(t)}
`,qt=t=>{let a=t.hotKeys?`${t.hotKeys}`:"";return ae(t.streamType)==="live"&&(a+=" noarrowleft noarrowright"),a},Qt={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},Jt=Object.values(Qt).join(", "),ea=(t,a)=>{var i,r,o,d,l,p,x,w,E,y,_,M,h,K,I,P,X,z,q,Q,J,me,ce;let e={"target-live-window":(i=a.targetLiveWindow)!=null?i:!1,"stream-type":(r=ae(a.streamType))!=null?r:!1,crossorigin:(o=a.crossOrigin)!=null?o:"",playsinline:"",autoplay:(d=a.autoplay)!=null?d:!1,muted:(l=a.muted)!=null?l:!1,loop:(p=a.loop)!=null?p:!1,preload:(x=a.preload)!=null?x:!1,debug:(w=a.debug)!=null?w:!1,"prefer-cmcd":(E=a.preferCmcd)!=null?E:!1,"disable-tracking":(y=a.disableTracking)!=null?y:!1,"disable-cookies":(_=a.disableCookies)!=null?_:!1,"prefer-playback":(M=a.preferPlayback)!=null?M:!1,"start-time":a.startTime!=null?a.startTime:!1,"beacon-collection-domain":(h=a.beaconCollectionDomain)!=null?h:!1,"player-init-time":(K=a.playerInitTime)!=null?K:!1,"player-software-name":(I=a.playerSoftwareName)!=null?I:!1,"player-software-version":(P=a.playerSoftwareVersion)!=null?P:!1,"env-key":(X=a.envKey)!=null?X:!1,"custom-domain":(z=a.customDomain)!=null?z:!1,src:a.src?a.src:a.playbackId?it(a):!1,"cast-src":a.src?a.src:a.playbackId?it(a):!1,"cast-receiver":(q=a.castReceiver)!=null?q:!1,"drm-token":(J=(Q=a.tokens)==null?void 0:Q.drm)!=null?J:!1,"allow-ad-blocker":(me=a.allowAdBlocker)!=null?me:!1,exportparts:"video"};switch(t){case"mux-video-ads":return{...e,adtagurl:(ce=a.adTagUrl)!=null?ce:!1};default:return e}},ta=t=>{var p,x,w,E,y,_,M,h,K,I,P,X,z,q,Q;let a=t.muxVideoElement||"mux-video",e=F`
    ${t.storyboard?F`<track label="thumbnails" default kind="metadata" src="${t.storyboard}" />`:F``}
    <slot></slot>
  `,i=ea(a,t),r=[`<${a} slot='media' `],o=[];Object.entries(i).forEach(([J,me],ce)=>{ce==0?r[0]+=` ${J}="`:r.push(`" ${J}="`),o.push(me)}),r.push('">'),r.push("</"+a+">"),o.push(e);let d=Object.assign([],r,{raw:r}),l=F(d,...o);return F`
    <media-theme
      template="${t.themeTemplate||!1}"
      mediaadbreak="${(p=t.adBreak)!=null?p:!1}"
      defaultstreamtype="${(x=t.defaultStreamType)!=null?x:!1}"
      hotkeys="${qt(t)||!1}"
      nohotkeys="${t.noHotKeys||!t.hasSrc||!1}"
      noautoseektolive="${!!((w=t.streamType)!=null&&w.includes(Xt.LIVE))&&t.targetLiveWindow!==0}"
      novolumepref="${t.novolumepref||!1}"
      disabled="${!t.hasSrc||t.isDialogOpen}"
      audio="${(E=t.audio)!=null?E:!1}"
      style="${(y=$e({"--media-primary-color":t.primaryColor,"--media-secondary-color":t.secondaryColor,"--media-accent-color":t.accentColor}))!=null?y:!1}"
      defaultsubtitles="${!t.defaultHiddenCaptions}"
      forwardseekoffset="${(_=t.forwardSeekOffset)!=null?_:!1}"
      backwardseekoffset="${(M=t.backwardSeekOffset)!=null?M:!1}"
      playbackrates="${(h=t.playbackRates)!=null?h:!1}"
      defaultshowremainingtime="${(K=t.defaultShowRemainingTime)!=null?K:!1}"
      defaultduration="${(I=t.defaultDuration)!=null?I:!1}"
      hideduration="${(P=t.hideDuration)!=null?P:!1}"
      title="${(X=t.title)!=null?X:!1}"
      videotitle="${(z=t.videoTitle)!=null?z:!1}"
      proudlydisplaymuxbadge="${(q=t.proudlyDisplayMuxBadge)!=null?q:!1}"
      exportparts="${Jt}"
      onclose="${t.onCloseErrorDialog}"
      onfocusin="${t.onFocusInErrorDialog}"
    >
      ${l}
      <slot name="poster" slot="poster">
        <media-poster-image
          part="poster"
          exportparts="poster, img"
          src="${t.poster?t.poster:!1}"
          placeholdersrc="${(Q=t.placeholder)!=null?Q:!1}"
        ></media-poster-image>
      </slot>
    </media-theme>
  `};import{errorCategoryToTokenNameOrPrefix as ot,i18n as f,MediaError as S,MuxErrorCategory as nt,MuxErrorCode as c}from"@mux/playback-core";var st=t=>t.charAt(0).toUpperCase()+t.slice(1),aa=(t,a=!1)=>{var e,i;if(t.muxCode){let r=st((e=t.errorCategory)!=null?e:"video"),o=ot((i=t.errorCategory)!=null?i:nt.VIDEO);if(t.muxCode===c.NETWORK_OFFLINE)return f("Your device appears to be offline",a);if(t.muxCode===c.NETWORK_TOKEN_EXPIRED)return f("{category} URL has expired",a).format({category:r});if([c.NETWORK_TOKEN_SUB_MISMATCH,c.NETWORK_TOKEN_AUD_MISMATCH,c.NETWORK_TOKEN_AUD_MISSING,c.NETWORK_TOKEN_MALFORMED].includes(t.muxCode))return f("{category} URL is formatted incorrectly",a).format({category:r});if(t.muxCode===c.NETWORK_TOKEN_MISSING)return f("Invalid {categoryName} URL",a).format({categoryName:o});if(t.muxCode===c.NETWORK_NOT_FOUND)return f("{category} does not exist",a).format({category:r});if(t.muxCode===c.NETWORK_NOT_READY)return f("{category} is not currently available",a).format({category:r})}if(t.code){if(t.code===S.MEDIA_ERR_NETWORK)return f("Network Error",a);if(t.code===S.MEDIA_ERR_DECODE)return f("Media Error",a);if(t.code===S.MEDIA_ERR_SRC_NOT_SUPPORTED)return f("Source Not Supported",a)}return f("Error",a)},ia=(t,a=!1)=>{var e,i;if(t.muxCode){let r=st((e=t.errorCategory)!=null?e:"video"),o=ot((i=t.errorCategory)!=null?i:nt.VIDEO);return t.muxCode===c.NETWORK_OFFLINE?f("Check your internet connection and try reloading this video.",a):t.muxCode===c.NETWORK_TOKEN_EXPIRED?f("The video\u2019s secured {tokenNamePrefix}-token has expired.",a).format({tokenNamePrefix:o}):t.muxCode===c.NETWORK_TOKEN_SUB_MISMATCH?f("The video\u2019s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",a).format({tokenNamePrefix:o}):t.muxCode===c.NETWORK_TOKEN_MALFORMED?f("{category} URL is formatted incorrectly",a).format({category:r}):[c.NETWORK_TOKEN_AUD_MISMATCH,c.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode)?f("The {tokenNamePrefix}-token is formatted with incorrect information.",a).format({tokenNamePrefix:o}):[c.NETWORK_TOKEN_MISSING,c.NETWORK_INVALID_URL].includes(t.muxCode)?f("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",a).format({tokenNamePrefix:o}):t.muxCode===c.NETWORK_NOT_FOUND?"":t.muxCode===c.NETWORK_NOT_READY?f("The live stream or video file are not yet ready.",a):t.message}return t.code&&(t.code===S.MEDIA_ERR_NETWORK||t.code===S.MEDIA_ERR_DECODE||t.code===S.MEDIA_ERR_SRC_NOT_SUPPORTED),t.message},dt=(t,a=!1)=>{let e=aa(t,a).toString(),i=ia(t,a).toString();return{title:e,message:i}},ra=t=>{if(t.muxCode){if(t.muxCode===c.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(t.muxCode===c.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([c.NETWORK_TOKEN_AUD_MISMATCH,c.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode))return"403-incorrect-aud-value.md";if(t.muxCode===c.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(t.muxCode===c.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(t.muxCode===c.NETWORK_NOT_FOUND)return"404-not-found.md";if(t.muxCode===c.NETWORK_NOT_READY)return"412-not-playable.md"}if(t.code){if(t.code===S.MEDIA_ERR_NETWORK)return"";if(t.code===S.MEDIA_ERR_DECODE)return"media-decode-error.md";if(t.code===S.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},Ie=(t,a)=>{let e=ra(t);return{message:t.message,context:t.context,file:e}};var lt=`<template id="media-theme-gerwig">
  <style>
    @keyframes pre-play-hide {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        transform: scale(0.7);
      }

      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    :host {
      --_primary-color: var(--media-primary-color, #fff);
      --_secondary-color: var(--media-secondary-color, transparent);
      --_accent-color: var(--media-accent-color, #fa50b5);
      --_text-color: var(--media-text-color, #000);

      --media-icon-color: var(--_primary-color);
      --media-control-background: var(--_secondary-color);
      --media-control-hover-background: var(--_accent-color);
      --media-time-buffered-color: rgba(255, 255, 255, 0.4);
      --media-preview-time-text-shadow: none;
      --media-control-height: 14px;
      --media-control-padding: 6px;
      --media-tooltip-container-margin: 6px;
      --media-tooltip-distance: 18px;

      color: var(--_primary-color);
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    :host([audio]) {
      --_secondary-color: var(--media-secondary-color, black);
      --media-preview-time-text-shadow: none;
    }

    :host([audio]) ::slotted([slot='media']) {
      height: 0px;
    }

    :host([audio]) media-loading-indicator {
      display: none;
    }

    :host([audio]) media-controller {
      background: transparent;
    }

    :host([audio]) media-controller::part(vertical-layer) {
      background: transparent;
    }

    :host([audio]) media-control-bar {
      width: 100%;
      background-color: var(--media-control-background);
    }

    /*
     * 0.433s is the transition duration for VTT Regions.
     * Borrowed here, so the captions don't move too fast.
     */
    media-controller {
      --media-webkit-text-track-transform: translateY(0) scale(0.98);
      --media-webkit-text-track-transition: transform 0.433s ease-out 0.3s;
    }
    media-controller:is([mediapaused], :not([userinactive])) {
      --media-webkit-text-track-transform: translateY(-50px) scale(0.98);
      --media-webkit-text-track-transition: transform 0.15s ease;
    }

    /*
     * CSS specific to iOS devices.
     * See: https://stackoverflow.com/questions/30102792/css-media-query-to-target-only-ios-devices/60220757#60220757
     */
    @supports (-webkit-touch-callout: none) {
      /* Disable subtitle adjusting for iOS Safari */
      media-controller[mediaisfullscreen] {
        --media-webkit-text-track-transform: unset;
        --media-webkit-text-track-transition: unset;
      }
    }

    media-time-range {
      --media-box-padding-left: 6px;
      --media-box-padding-right: 6px;
      --media-range-bar-color: var(--_accent-color);
      --media-time-range-buffered-color: var(--_primary-color);
      --media-range-track-color: transparent;
      --media-range-track-background: rgba(255, 255, 255, 0.4);
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_accent-color) 25%,
        var(--_accent-color)
      );
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-transform: scale(0);
      --media-range-thumb-transition: transform 0.3s;
      --media-range-thumb-opacity: 1;
      --media-preview-background: var(--_primary-color);
      --media-box-arrow-background: var(--_primary-color);
      --media-preview-thumbnail-border: 5px solid var(--_primary-color);
      --media-preview-border-radius: 5px;
      --media-text-color: var(--_text-color);
      --media-control-hover-background: transparent;
      --media-preview-chapter-text-shadow: none;
      color: var(--_accent-color);
      padding: 0 6px;
    }

    :host([audio]) media-time-range {
      --media-preview-time-padding: 1.5px 6px;
      --media-preview-box-margin: 0 0 -5px;
    }

    media-time-range:hover {
      --media-range-thumb-transform: scale(1);
    }

    media-preview-thumbnail {
      border-bottom-width: 0;
    }

    [part~='menu'] {
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      bottom: 50px;
      padding: 2.5px 10px;
    }

    [part~='menu']::part(indicator) {
      fill: var(--_accent-color);
    }

    [part~='menu']::part(menu-item) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      min-height: 34px;
    }

    [part~='menu']::part(checked) {
      font-weight: 700;
    }

    media-captions-menu,
    media-rendition-menu,
    media-audio-track-menu,
    media-playback-rate-menu {
      position: absolute; /* ensure they don't take up space in DOM on load */
      --media-menu-background: var(--_primary-color);
      --media-menu-item-checked-background: transparent;
      --media-text-color: var(--_text-color);
      --media-menu-item-hover-background: transparent;
      --media-menu-item-hover-outline: var(--_accent-color) solid 1px;
    }

    /* The icon is a circle so make it 16px high instead of 14px for more balance. */
    media-audio-track-menu-button {
      --media-control-padding: 5px;
      --media-control-height: 16px;
    }

    media-playback-rate-menu-button {
      --media-control-padding: 6px 3px;
      min-width: 4.4ch;
    }

    media-playback-rate-menu {
      --media-menu-flex-direction: row;
      --media-menu-item-checked-background: var(--_accent-color);
      --media-menu-item-checked-indicator-display: none;
      margin-right: 6px;
      padding: 0;
      --media-menu-gap: 0.25em;
    }

    media-playback-rate-menu[part~='menu']::part(menu-item) {
      padding: 6px 6px 6px 8px;
    }

    media-playback-rate-menu[part~='menu']::part(checked) {
      color: #fff;
    }

    :host(:not([audio])) media-time-range {
      /* Adding px is required here for calc() */
      --media-range-padding: 0px;
      background: transparent;
      z-index: 10;
      height: 10px;
      bottom: -3px;
      width: 100%;
    }

    media-control-bar :is([role='button'], [role='switch'], button) {
      line-height: 0;
    }

    media-control-bar :is([part*='button'], [part*='range'], [part*='display']) {
      border-radius: 3px;
    }

    .spacer {
      flex-grow: 1;
      background-color: var(--media-control-background, rgba(20, 20, 30, 0.7));
    }

    media-control-bar[slot~='top-chrome'] {
      min-height: 42px;
      pointer-events: none;
    }

    media-control-bar {
      --gradient-steps:
        hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%, hsl(0 0% 0% / 0.104) 22.5%,
        hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%, hsl(0 0% 0% / 0.352) 41.2%, hsl(0 0% 0% / 0.45) 47.1%,
        hsl(0 0% 0% / 0.55) 52.9%, hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%, hsl(0 0% 0% / 0.825) 71%,
        hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%, hsl(0 0% 0%) 100%;
    }

    :host([title]:not([audio])) media-control-bar[slot='top-chrome']::before {
      content: '';
      position: absolute;
      width: 100%;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to top, var(--gradient-steps));
      opacity: 0.8;
      pointer-events: none;
    }

    :host(:not([audio])) media-control-bar[part~='bottom']::before {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to bottom, var(--gradient-steps));
      opacity: 0.8;
      z-index: 1;
      pointer-events: none;
    }

    media-control-bar[part~='bottom'] > * {
      z-index: 20;
    }

    media-control-bar[part~='bottom'] {
      padding: 6px 6px;
    }

    media-control-bar[slot~='top-chrome'] > * {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      position: relative;
    }

    media-controller::part(vertical-layer) {
      transition: background-color 1s;
    }

    media-controller:is([mediapaused], :not([userinactive]))::part(vertical-layer) {
      background-color: var(--controls-backdrop-color, var(--controls, transparent));
      transition: background-color 0.25s;
    }

    .center-controls {
      --media-button-icon-width: 100%;
      --media-button-icon-height: auto;
      --media-tooltip-display: none;
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
      paint-order: stroke;
      stroke: rgba(102, 102, 102, 1);
      stroke-width: 0.3px;
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    .center-controls media-play-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      --media-control-padding: 0;
      width: 40px;
    }

    [breakpointsm] .center-controls media-play-button {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      transition: background 0.4s;
      padding: 24px;
      --media-control-background: #000;
      --media-control-hover-background: var(--_accent-color);
    }

    .center-controls media-seek-backward-button,
    .center-controls media-seek-forward-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      padding: 0;
      margin: 0 20px;
      width: max(33px, min(8%, 40px));
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback {
      display: grid;
      align-items: initial;
      justify-content: initial;
      height: 100%;
      overflow: hidden;
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback media-play-button {
      place-self: var(--_pre-playback-place, center);
      grid-area: 1 / 1;
      margin: 16px;
    }

    /* Show and hide controls or pre-playback state */

    [breakpointsm]:is([mediahasplayed], :not([mediapaused])):not([audio])
      .center-controls.pre-playback
      media-play-button {
      /* Using \`forwards\` would lead to a laggy UI after the animation got in the end state */
      animation: 0.3s linear pre-play-hide;
      opacity: 0;
      pointer-events: none;
    }

    .autoplay-unmute {
      --media-control-hover-background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    .autoplay-unmute-btn {
      --media-control-height: 16px;
      border-radius: 8px;
      background: #000;
      color: var(--_primary-color);
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }

    .autoplay-unmute-btn:hover {
      background: var(--_accent-color);
    }

    [breakpointsm] .autoplay-unmute-btn {
      --media-control-height: 30px;
      padding: 14px 24px;
      font-size: 26px;
    }

    .autoplay-unmute-btn svg {
      margin: 0 6px 0 0;
    }

    [breakpointsm] .autoplay-unmute-btn svg {
      margin: 0 10px 0 0;
    }

    media-controller:not([audio]):not([mediahasplayed]) *:is(media-control-bar, media-time-range) {
      display: none;
    }

    media-error-dialog:not([mediaerrorcode]) {
      opacity: 0;
    }

    media-loading-indicator {
      --media-loading-icon-width: 100%;
      --media-button-icon-height: auto;
      display: var(--media-control-display, var(--media-loading-indicator-display, flex));
      pointer-events: none;
      position: absolute;
      width: min(15%, 150px);
      flex-flow: row;
      align-items: center;
      justify-content: center;
    }

    /* Intentionally don't target the div for transition but the children
     of the div. Prevents messing with media-chrome's autohide feature. */
    media-loading-indicator + div * {
      transition: opacity 0.15s;
      opacity: 1;
    }

    media-loading-indicator[medialoading]:not([mediapaused]) ~ div > * {
      opacity: 0;
      transition-delay: 400ms;
    }

    media-volume-range {
      width: min(100%, 100px);
      --media-range-padding-left: 10px;
      --media-range-padding-right: 10px;
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_primary-color) 25%,
        var(--_primary-color)
      );
      --media-control-hover-background: none;
    }

    media-time-display {
      white-space: nowrap;
    }

    /* Generic style for explicitly disabled controls */
    media-control-bar[part~='bottom'] [disabled],
    media-control-bar[part~='bottom'] [aria-disabled='true'] {
      opacity: 60%;
      cursor: not-allowed;
    }

    media-text-display {
      --media-font-size: 16px;
      --media-control-padding: 14px;
      font-weight: 500;
    }

    media-play-button.animated *:is(g, path) {
      transition: all 0.3s;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt1 {
      opacity: 0;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt2 {
      transform-origin: center center;
      transform: scaleY(0);
    }

    media-play-button.animated[mediapaused] .play-icon {
      clip-path: inset(0 0 0 0);
    }

    media-play-button.animated:not([mediapaused]) .play-icon {
      clip-path: inset(0 0 0 100%);
    }

    media-seek-forward-button,
    media-seek-backward-button {
      --media-font-weight: 400;
    }

    .mute-icon {
      display: inline-block;
    }

    .mute-icon :is(path, g) {
      transition: opacity 0.5s;
    }

    .muted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='low'] :is(.volume-medium, .volume-high),
    media-mute-button[mediavolumelevel='medium'] :is(.volume-high) {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .unmuted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .muted {
      opacity: 1;
    }

    /**
     * Our defaults for these buttons are to hide them at small sizes
     * users can override this with CSS
     */
    media-controller:not([breakpointsm]):not([audio]) {
      --bottom-play-button: none;
      --bottom-seek-backward-button: none;
      --bottom-seek-forward-button: none;
      --bottom-time-display: none;
      --bottom-playback-rate-menu-button: none;
      --bottom-pip-button: none;
    }

    [part='mux-badge'] {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 2;
      opacity: 0.6;
      transition:
        opacity 0.2s ease-in-out,
        bottom 0.2s ease-in-out;
    }

    [part='mux-badge']:hover {
      opacity: 1;
    }

    [part='mux-badge'] a {
      font-size: 14px;
      font-family: var(--_font-family);
      color: var(--_primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    [part='mux-badge'] .mux-badge-text {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }

    [part='mux-badge'] .mux-badge-logo {
      width: 40px;
      height: auto;
      display: inline-block;
    }

    [part='mux-badge'] .mux-badge-logo svg {
      width: 100%;
      height: 100%;
      fill: white;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'],
    media-controller:not([userinactive]) [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      transition: bottom 0.1s ease-in-out;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      transition: bottom 0.2s ease-in-out 0.62s;
    }

    media-controller:not([userinactive]) [part='mux-badge'] .mux-badge-text,
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] .mux-badge-text {
      opacity: 1;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] .mux-badge-text {
      opacity: 0;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive])[mediahasplayed] [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      bottom: calc(28px + var(--media-control-height, 0px) + var(--media-control-padding, 0px) * 2);
    }
  </style>

  <template partial="TitleDisplay">
    <template if="videotitle">
      <template if="videotitle != true">
        <media-text-display part="top title display" class="title-display">{{videotitle}}</media-text-display>
      </template>
    </template>
    <template if="!videotitle">
      <template if="title">
        <media-text-display part="top title display" class="title-display">{{title}}</media-text-display>
      </template>
    </template>
  </template>

  <template partial="PlayButton">
    <media-play-button
      part="{{section ?? 'bottom'}} play button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      class="animated"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon">
        <g class="play-icon">
          <path
            d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
          />
        </g>
        <g class="pause-icon">
          <path
            class="pause-icon-pt1"
            d="M5.90709 0H2.96889C2.46857 0 2.06299 0.405585 2.06299 0.9059V13.0941C2.06299 13.5944 2.46857 14 2.96889 14H5.90709C6.4074 14 6.81299 13.5944 6.81299 13.0941V0.9059C6.81299 0.405585 6.4074 0 5.90709 0Z"
          />
          <path
            class="pause-icon-pt2"
            d="M15.1571 0H12.2189C11.7186 0 11.313 0.405585 11.313 0.9059V13.0941C11.313 13.5944 11.7186 14 12.2189 14H15.1571C15.6574 14 16.063 13.5944 16.063 13.0941V0.9059C16.063 0.405585 15.6574 0 15.1571 0Z"
          />
        </g>
      </svg>
    </media-play-button>
  </template>

  <template partial="PrePlayButton">
    <media-play-button
      part="{{section ?? 'center'}} play button pre-play"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon" style="transform: translate(3px, 0)">
        <path
          d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
        />
      </svg>
    </media-play-button>
  </template>

  <template partial="SeekBackwardButton">
    <media-seek-backward-button
      seekoffset="{{backwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-backward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <path
          d="M3.65 2.07888L0.0864 6.7279C-0.0288 6.87812 -0.0288 7.12188 0.0864 7.2721L3.65 11.9211C3.7792 12.0896 4 11.9703 4 11.7321V2.26787C4 2.02968 3.7792 1.9104 3.65 2.07888Z"
        />
        <text transform="translate(6 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
          {{backwardseekoffset}}
        </text>
      </svg>
    </media-seek-backward-button>
  </template>

  <template partial="SeekForwardButton">
    <media-seek-forward-button
      seekoffset="{{forwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-forward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <g>
          <text transform="translate(-1 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
            {{forwardseekoffset}}
          </text>
          <path
            d="M18.35 11.9211L21.9136 7.2721C22.0288 7.12188 22.0288 6.87812 21.9136 6.7279L18.35 2.07888C18.2208 1.91041 18 2.02968 18 2.26787V11.7321C18 11.9703 18.2208 12.0896 18.35 11.9211Z"
          />
        </g>
      </svg>
    </media-seek-forward-button>
  </template>

  <template partial="MuteButton">
    <media-mute-button part="bottom mute button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" slot="icon" class="mute-icon" aria-hidden="true">
        <g class="unmuted">
          <path
            d="M6.76786 1.21233L3.98606 3.98924H1.19937C0.593146 3.98924 0.101743 4.51375 0.101743 5.1607V6.96412L0 6.99998L0.101743 7.03583V8.83926C0.101743 9.48633 0.593146 10.0108 1.19937 10.0108H3.98606L6.76773 12.7877C7.23561 13.2547 8 12.9007 8 12.2171V1.78301C8 1.09925 7.23574 0.745258 6.76786 1.21233Z"
          />
          <path
            class="volume-low"
            d="M10 3.54781C10.7452 4.55141 11.1393 5.74511 11.1393 6.99991C11.1393 8.25471 10.7453 9.44791 10 10.4515L10.7988 11.0496C11.6734 9.87201 12.1356 8.47161 12.1356 6.99991C12.1356 5.52821 11.6735 4.12731 10.7988 2.94971L10 3.54781Z"
          />
          <path
            class="volume-medium"
            d="M12.3778 2.40086C13.2709 3.76756 13.7428 5.35806 13.7428 7.00026C13.7428 8.64246 13.2709 10.233 12.3778 11.5992L13.2106 12.1484C14.2107 10.6185 14.739 8.83796 14.739 7.00016C14.739 5.16236 14.2107 3.38236 13.2106 1.85156L12.3778 2.40086Z"
          />
          <path
            class="volume-high"
            d="M15.5981 0.75L14.7478 1.2719C15.7937 2.9919 16.3468 4.9723 16.3468 7C16.3468 9.0277 15.7937 11.0082 14.7478 12.7281L15.5981 13.25C16.7398 11.3722 17.343 9.211 17.343 7C17.343 4.789 16.7398 2.6268 15.5981 0.75Z"
          />
        </g>
        <g class="muted">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.39976 4.98924H1.19937C1.19429 4.98924 1.17777 4.98961 1.15296 5.01609C1.1271 5.04369 1.10174 5.09245 1.10174 5.1607V8.83926C1.10174 8.90761 1.12714 8.95641 1.15299 8.984C1.17779 9.01047 1.1943 9.01084 1.19937 9.01084H4.39977L7 11.6066V2.39357L4.39976 4.98924ZM7.47434 1.92006C7.4743 1.9201 7.47439 1.92002 7.47434 1.92006V1.92006ZM6.76773 12.7877L3.98606 10.0108H1.19937C0.593146 10.0108 0.101743 9.48633 0.101743 8.83926V7.03583L0 6.99998L0.101743 6.96412V5.1607C0.101743 4.51375 0.593146 3.98924 1.19937 3.98924H3.98606L6.76786 1.21233C7.23574 0.745258 8 1.09925 8 1.78301V12.2171C8 12.9007 7.23561 13.2547 6.76773 12.7877Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2677 9.30323C15.463 9.49849 15.7796 9.49849 15.9749 9.30323C16.1701 9.10796 16.1701 8.79138 15.9749 8.59612L14.2071 6.82841L15.9749 5.06066C16.1702 4.8654 16.1702 4.54882 15.9749 4.35355C15.7796 4.15829 15.4631 4.15829 15.2678 4.35355L13.5 6.1213L11.7322 4.35348C11.537 4.15822 11.2204 4.15822 11.0251 4.35348C10.8298 4.54874 10.8298 4.86532 11.0251 5.06058L12.7929 6.82841L11.0251 8.59619C10.8299 8.79146 10.8299 9.10804 11.0251 9.3033C11.2204 9.49856 11.537 9.49856 11.7323 9.3033L13.5 7.53552L15.2677 9.30323Z"
          />
        </g>
      </svg>
    </media-mute-button>
  </template>

  <template partial="PipButton">
    <media-pip-button part="bottom pip button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M15.9891 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.989C0 13.0996 0.9004 14 2.011 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0ZM17 11.9891C17 12.5465 16.5465 13 15.9891 13H2.011C1.4536 13 1.0001 12.5465 1.0001 11.9891V2.0109C1.0001 1.4535 1.4536 0.9999 2.011 0.9999H15.9891C16.5465 0.9999 17 1.4535 17 2.0109V11.9891Z"
        />
        <path
          d="M15.356 5.67822H8.19523C8.03253 5.67822 7.90063 5.81012 7.90063 5.97282V11.3836C7.90063 11.5463 8.03253 11.6782 8.19523 11.6782H15.356C15.5187 11.6782 15.6506 11.5463 15.6506 11.3836V5.97282C15.6506 5.81012 15.5187 5.67822 15.356 5.67822Z"
        />
      </svg>
    </media-pip-button>
  </template>

  <template partial="CaptionsMenu">
    <media-captions-menu-button part="bottom captions button">
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="on">
        <path
          d="M15.989 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9004 14 2.011 14H15.989C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.989 0ZM4.2292 8.7639C4.5954 9.1902 5.0935 9.4031 5.7233 9.4031C6.1852 9.4031 6.5544 9.301 6.8302 9.0969C7.1061 8.8933 7.2863 8.614 7.3702 8.26H8.4322C8.3062 8.884 8.0093 9.3733 7.5411 9.7273C7.0733 10.0813 6.4703 10.2581 5.732 10.2581C5.108 10.2581 4.5699 10.1219 4.1168 9.8489C3.6637 9.5759 3.3141 9.1946 3.0685 8.7058C2.8224 8.2165 2.6994 7.6511 2.6994 7.009C2.6994 6.3611 2.8224 5.7927 3.0685 5.3034C3.3141 4.8146 3.6637 4.4323 4.1168 4.1559C4.5699 3.88 5.108 3.7418 5.732 3.7418C6.4703 3.7418 7.0733 3.922 7.5411 4.2818C8.0094 4.6422 8.3062 5.1461 8.4322 5.794H7.3702C7.2862 5.4283 7.106 5.1368 6.8302 4.921C6.5544 4.7052 6.1852 4.5968 5.7233 4.5968C5.0934 4.5968 4.5954 4.8116 4.2292 5.2404C3.8635 5.6696 3.6804 6.259 3.6804 7.009C3.6804 7.7531 3.8635 8.3381 4.2292 8.7639ZM11.0974 8.7639C11.4636 9.1902 11.9617 9.4031 12.5915 9.4031C13.0534 9.4031 13.4226 9.301 13.6984 9.0969C13.9743 8.8933 14.1545 8.614 14.2384 8.26H15.3004C15.1744 8.884 14.8775 9.3733 14.4093 9.7273C13.9415 10.0813 13.3385 10.2581 12.6002 10.2581C11.9762 10.2581 11.4381 10.1219 10.985 9.8489C10.5319 9.5759 10.1823 9.1946 9.9367 8.7058C9.6906 8.2165 9.5676 7.6511 9.5676 7.009C9.5676 6.3611 9.6906 5.7927 9.9367 5.3034C10.1823 4.8146 10.5319 4.4323 10.985 4.1559C11.4381 3.88 11.9762 3.7418 12.6002 3.7418C13.3385 3.7418 13.9415 3.922 14.4093 4.2818C14.8776 4.6422 15.1744 5.1461 15.3004 5.794H14.2384C14.1544 5.4283 13.9742 5.1368 13.6984 4.921C13.4226 4.7052 13.0534 4.5968 12.5915 4.5968C11.9616 4.5968 11.4636 4.8116 11.0974 5.2404C10.7317 5.6696 10.5486 6.259 10.5486 7.009C10.5486 7.7531 10.7317 8.3381 11.0974 8.7639Z"
        />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="off">
        <path
          d="M5.73219 10.258C5.10819 10.258 4.57009 10.1218 4.11699 9.8488C3.66389 9.5758 3.31429 9.1945 3.06869 8.7057C2.82259 8.2164 2.69958 7.651 2.69958 7.0089C2.69958 6.361 2.82259 5.7926 3.06869 5.3033C3.31429 4.8145 3.66389 4.4322 4.11699 4.1558C4.57009 3.8799 5.10819 3.7417 5.73219 3.7417C6.47049 3.7417 7.07348 3.9219 7.54128 4.2817C8.00958 4.6421 8.30638 5.146 8.43238 5.7939H7.37039C7.28639 5.4282 7.10618 5.1367 6.83039 4.9209C6.55459 4.7051 6.18538 4.5967 5.72348 4.5967C5.09358 4.5967 4.59559 4.8115 4.22939 5.2403C3.86369 5.6695 3.68058 6.2589 3.68058 7.0089C3.68058 7.753 3.86369 8.338 4.22939 8.7638C4.59559 9.1901 5.09368 9.403 5.72348 9.403C6.18538 9.403 6.55459 9.3009 6.83039 9.0968C7.10629 8.8932 7.28649 8.6139 7.37039 8.2599H8.43238C8.30638 8.8839 8.00948 9.3732 7.54128 9.7272C7.07348 10.0812 6.47049 10.258 5.73219 10.258Z"
        />
        <path
          d="M12.6003 10.258C11.9763 10.258 11.4382 10.1218 10.9851 9.8488C10.532 9.5758 10.1824 9.1945 9.93685 8.7057C9.69075 8.2164 9.56775 7.651 9.56775 7.0089C9.56775 6.361 9.69075 5.7926 9.93685 5.3033C10.1824 4.8145 10.532 4.4322 10.9851 4.1558C11.4382 3.8799 11.9763 3.7417 12.6003 3.7417C13.3386 3.7417 13.9416 3.9219 14.4094 4.2817C14.8777 4.6421 15.1745 5.146 15.3005 5.7939H14.2385C14.1545 5.4282 13.9743 5.1367 13.6985 4.9209C13.4227 4.7051 13.0535 4.5967 12.5916 4.5967C11.9617 4.5967 11.4637 4.8115 11.0975 5.2403C10.7318 5.6695 10.5487 6.2589 10.5487 7.0089C10.5487 7.753 10.7318 8.338 11.0975 8.7638C11.4637 9.1901 11.9618 9.403 12.5916 9.403C13.0535 9.403 13.4227 9.3009 13.6985 9.0968C13.9744 8.8932 14.1546 8.6139 14.2385 8.2599H15.3005C15.1745 8.8839 14.8776 9.3732 14.4094 9.7272C13.9416 10.0812 13.3386 10.258 12.6003 10.258Z"
        />
        <path
          d="M15.9891 1C16.5465 1 17 1.4535 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H2.0109C1.4535 13 1 12.5465 1 11.9891V2.0109C1 1.4535 1.4535 0.9999 2.0109 0.9999L15.9891 1ZM15.9891 0H2.0109C0.9003 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9003 14 2.0109 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0Z"
        />
      </svg>
    </media-captions-menu-button>
    <media-captions-menu
      hidden
      anchor="auto"
      part="bottom captions menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg></div
    ></media-captions-menu>
  </template>

  <template partial="AirplayButton">
    <media-airplay-button part="bottom airplay button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M16.1383 0H1.8618C0.8335 0 0 0.8335 0 1.8617V10.1382C0 11.1664 0.8335 12 1.8618 12H3.076C3.1204 11.9433 3.1503 11.8785 3.2012 11.826L4.004 11H1.8618C1.3866 11 1 10.6134 1 10.1382V1.8617C1 1.3865 1.3866 0.9999 1.8618 0.9999H16.1383C16.6135 0.9999 17.0001 1.3865 17.0001 1.8617V10.1382C17.0001 10.6134 16.6135 11 16.1383 11H13.9961L14.7989 11.826C14.8499 11.8785 14.8798 11.9432 14.9241 12H16.1383C17.1665 12 18.0001 11.1664 18.0001 10.1382V1.8617C18 0.8335 17.1665 0 16.1383 0Z"
        />
        <path
          d="M9.55061 8.21903C9.39981 8.06383 9.20001 7.98633 9.00011 7.98633C8.80021 7.98633 8.60031 8.06383 8.44951 8.21903L4.09771 12.697C3.62471 13.1838 3.96961 13.9998 4.64831 13.9998H13.3518C14.0304 13.9998 14.3754 13.1838 13.9023 12.697L9.55061 8.21903Z"
        />
      </svg>
    </media-airplay-button>
  </template>

  <template partial="FullscreenButton">
    <media-fullscreen-button part="bottom fullscreen button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M1.00745 4.39539L1.01445 1.98789C1.01605 1.43049 1.47085 0.978289 2.02835 0.979989L6.39375 0.992589L6.39665 -0.007411L2.03125 -0.020011C0.920646 -0.023211 0.0176463 0.874489 0.0144463 1.98509L0.00744629 4.39539H1.00745Z"
        />
        <path
          d="M17.0144 2.03431L17.0076 4.39541H18.0076L18.0144 2.03721C18.0176 0.926712 17.1199 0.0237125 16.0093 0.0205125L11.6439 0.0078125L11.641 1.00781L16.0064 1.02041C16.5638 1.02201 17.016 1.47681 17.0144 2.03431Z"
        />
        <path
          d="M16.9925 9.60498L16.9855 12.0124C16.9839 12.5698 16.5291 13.022 15.9717 13.0204L11.6063 13.0078L11.6034 14.0078L15.9688 14.0204C17.0794 14.0236 17.9823 13.1259 17.9855 12.0153L17.9925 9.60498H16.9925Z"
        />
        <path
          d="M0.985626 11.9661L0.992426 9.60498H-0.0074737L-0.0142737 11.9632C-0.0174737 13.0738 0.880226 13.9767 1.99083 13.98L6.35623 13.9926L6.35913 12.9926L1.99373 12.98C1.43633 12.9784 0.983926 12.5236 0.985626 11.9661Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M5.39655 -0.0200195L5.38955 2.38748C5.38795 2.94488 4.93315 3.39708 4.37565 3.39538L0.0103463 3.38278L0.00744629 4.38278L4.37285 4.39538C5.48345 4.39858 6.38635 3.50088 6.38965 2.39028L6.39665 -0.0200195H5.39655Z"
        />
        <path
          d="M12.6411 2.36891L12.6479 0.0078125H11.6479L11.6411 2.36601C11.6379 3.47651 12.5356 4.37951 13.6462 4.38271L18.0116 4.39531L18.0145 3.39531L13.6491 3.38271C13.0917 3.38111 12.6395 2.92641 12.6411 2.36891Z"
        />
        <path
          d="M12.6034 14.0204L12.6104 11.613C12.612 11.0556 13.0668 10.6034 13.6242 10.605L17.9896 10.6176L17.9925 9.61759L13.6271 9.60499C12.5165 9.60179 11.6136 10.4995 11.6104 11.6101L11.6034 14.0204H12.6034Z"
        />
        <path
          d="M5.359 11.6315L5.3522 13.9926H6.3522L6.359 11.6344C6.3622 10.5238 5.4645 9.62088 4.3539 9.61758L-0.0115043 9.60498L-0.0144043 10.605L4.351 10.6176C4.9084 10.6192 5.3607 11.074 5.359 11.6315Z"
        />
      </svg>
    </media-fullscreen-button>
  </template>

  <template partial="CastButton">
    <media-cast-button part="bottom cast button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M16.0072 0H2.0291C0.9185 0 0.0181 0.9003 0.0181 2.011V5.5009C0.357 5.5016 0.6895 5.5275 1.0181 5.5669V2.011C1.0181 1.4536 1.4716 1 2.029 1H16.0072C16.5646 1 17.0181 1.4536 17.0181 2.011V11.9891C17.0181 12.5465 16.5646 13 16.0072 13H8.4358C8.4746 13.3286 8.4999 13.6611 8.4999 13.9999H16.0071C17.1177 13.9999 18.018 13.0996 18.018 11.989V2.011C18.0181 0.9003 17.1178 0 16.0072 0ZM0 6.4999V7.4999C3.584 7.4999 6.5 10.4159 6.5 13.9999H7.5C7.5 9.8642 4.1357 6.4999 0 6.4999ZM0 8.7499V9.7499C2.3433 9.7499 4.25 11.6566 4.25 13.9999H5.25C5.25 11.1049 2.895 8.7499 0 8.7499ZM0.0181 11V14H3.0181C3.0181 12.3431 1.675 11 0.0181 11Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M15.9891 0H2.01103C0.900434 0 3.35947e-05 0.9003 3.35947e-05 2.011V5.5009C0.338934 5.5016 0.671434 5.5275 1.00003 5.5669V2.011C1.00003 1.4536 1.45353 1 2.01093 1H15.9891C16.5465 1 17 1.4536 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H8.41773C8.45653 13.3286 8.48183 13.6611 8.48183 13.9999H15.989C17.0996 13.9999 17.9999 13.0996 17.9999 11.989V2.011C18 0.9003 17.0997 0 15.9891 0ZM-0.0180664 6.4999V7.4999C3.56593 7.4999 6.48193 10.4159 6.48193 13.9999H7.48193C7.48193 9.8642 4.11763 6.4999 -0.0180664 6.4999ZM-0.0180664 8.7499V9.7499C2.32523 9.7499 4.23193 11.6566 4.23193 13.9999H5.23193C5.23193 11.1049 2.87693 8.7499 -0.0180664 8.7499ZM3.35947e-05 11V14H3.00003C3.00003 12.3431 1.65693 11 3.35947e-05 11Z"
        />
        <path d="M2.15002 5.634C5.18352 6.4207 7.57252 8.8151 8.35282 11.8499H15.8501V2.1499H2.15002V5.634Z" />
      </svg>
    </media-cast-button>
  </template>

  <template partial="LiveButton">
    <media-live-button part="{{section ?? 'top'}} live button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <span slot="text">Live</span>
    </media-live-button>
  </template>

  <template partial="PlaybackRateMenu">
    <media-playback-rate-menu-button part="bottom playback-rate button"></media-playback-rate-menu-button>
    <media-playback-rate-menu
      hidden
      anchor="auto"
      rates="{{playbackrates}}"
      exportparts="menu-item"
      part="bottom playback-rate menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-playback-rate-menu>
  </template>

  <template partial="VolumeRange">
    <media-volume-range
      part="bottom volume range"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-volume-range>
  </template>

  <template partial="TimeDisplay">
    <media-time-display
      remaining="{{defaultshowremainingtime}}"
      showduration="{{!hideduration}}"
      part="bottom time display"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-time-display>
  </template>

  <template partial="TimeRange">
    <media-time-range part="bottom time range" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
      <media-preview-chapter-display slot="preview"></media-preview-chapter-display>
      <media-preview-time-display slot="preview"></media-preview-time-display>
      <div slot="preview" part="arrow"></div>
    </media-time-range>
  </template>

  <template partial="AudioTrackMenu">
    <media-audio-track-menu-button part="bottom audio-track button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 16">
        <path d="M9 15A7 7 0 1 1 9 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 9 0a8 8 0 0 0 0 16Z" />
        <path
          d="M5.2 6.3a.5.5 0 0 1 .5.5v2.4a.5.5 0 1 1-1 0V6.8a.5.5 0 0 1 .5-.5Zm2.4-2.4a.5.5 0 0 1 .5.5v7.2a.5.5 0 0 1-1 0V4.4a.5.5 0 0 1 .5-.5ZM10 5.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.4-.8a.5.5 0 0 1 .5.5v5.6a.5.5 0 0 1-1 0V5.2a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </media-audio-track-menu-button>
    <media-audio-track-menu
      hidden
      anchor="auto"
      part="bottom audio-track menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-audio-track-menu>
  </template>

  <template partial="RenditionMenu">
    <media-rendition-menu-button part="bottom rendition button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 14">
        <path
          d="M2.25 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6.75 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
      </svg>
    </media-rendition-menu-button>
    <media-rendition-menu
      hidden
      anchor="auto"
      part="bottom rendition menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-rendition-menu>
  </template>

  <template partial="MuxBadge">
    <div part="mux-badge">
      <a href="https://www.mux.com/player" target="_blank">
        <span class="mux-badge-text">Powered by</span>
        <div class="mux-badge-logo">
          <svg
            viewBox="0 0 1600 500"
            style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
          >
            <g>
              <path
                d="M994.287,93.486c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m0,-93.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,68.943 -56.09,125.033 -125.032,125.033c-68.942,-0 -125.03,-56.09 -125.03,-125.033l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,137.853 112.149,250.003 249.999,250.003c137.851,-0 250.001,-112.15 250.001,-250.003l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M1537.51,468.511c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m-275.883,-218.509l-143.33,143.329c-24.402,24.402 -24.402,63.966 0,88.368c24.402,24.402 63.967,24.402 88.369,-0l143.33,-143.329l143.328,143.329c24.402,24.4 63.967,24.402 88.369,-0c24.403,-24.402 24.403,-63.966 0.001,-88.368l-143.33,-143.329l0.001,-0.004l143.329,-143.329c24.402,-24.402 24.402,-63.965 0,-88.367c-24.402,-24.402 -63.967,-24.402 -88.369,-0l-143.329,143.328l-143.329,-143.328c-24.402,-24.401 -63.967,-24.402 -88.369,-0c-24.402,24.402 -24.402,63.965 0,88.367l143.329,143.329l0,0.004Z"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729"
                style="fill-rule: nonzero"
              ></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  </template>

  <media-controller
    part="controller"
    defaultstreamtype="{{defaultstreamtype ?? 'on-demand'}}"
    breakpoints="sm:470"
    gesturesdisabled="{{disabled}}"
    hotkeys="{{hotkeys}}"
    nohotkeys="{{nohotkeys}}"
    novolumepref="{{novolumepref}}"
    audio="{{audio}}"
    noautoseektolive="{{noautoseektolive}}"
    defaultsubtitles="{{defaultsubtitles}}"
    defaultduration="{{defaultduration ?? false}}"
    keyboardforwardseekoffset="{{forwardseekoffset}}"
    keyboardbackwardseekoffset="{{backwardseekoffset}}"
    exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
    style="--_pre-playback-place:{{preplaybackplace ?? 'center'}}"
  >
    <slot name="media" slot="media"></slot>
    <slot name="poster" slot="poster"></slot>

    <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>
    <media-error-dialog slot="dialog" noautohide></media-error-dialog>

    <template if="!audio">
      <!-- Pre-playback UI -->
      <!-- same for both on-demand and live -->
      <div slot="centered-chrome" class="center-controls pre-playback">
        <template if="!breakpointsm">{{>PlayButton section="center"}}</template>
        <template if="breakpointsm">{{>PrePlayButton section="center"}}</template>
      </div>

      <!-- Mux Badge -->
      <template if="proudlydisplaymuxbadge"> {{>MuxBadge}} </template>

      <!-- Autoplay centered unmute button -->
      <!--
        todo: figure out how show this with available state variables
        needs to show when:
        - autoplay is enabled
        - playback has been successful
        - audio is muted
        - in place / instead of the pre-plaback play button
        - not to show again after user has interacted with this button
          - OR user has interacted with the mute button in the control bar
      -->
      <!--
        There should be a >MuteButton to the left of the "Unmute" text, but a templating bug
        makes it appear even if commented out in the markup, add it back when code is un-commented
      -->
      <!-- <div slot="centered-chrome" class="autoplay-unmute">
        <div role="button" class="autoplay-unmute-btn">Unmute</div>
      </div> -->

      <template if="streamtype == 'on-demand'">
        <template if="breakpointsm">
          <media-control-bar part="control-bar top" slot="top-chrome">{{>TitleDisplay}} </media-control-bar>
        </template>
        {{>TimeRange}}
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>SeekBackwardButton}} {{>SeekForwardButton}} {{>TimeDisplay}} {{>MuteButton}}
          {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>PlaybackRateMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}}
          {{>CastButton}} {{>PipButton}} {{>FullscreenButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <media-control-bar part="control-bar top" slot="top-chrome">
          {{>LiveButton}}
          <template if="breakpointsm"> {{>TitleDisplay}} </template>
        </media-control-bar>
        <template if="targetlivewindow > 0">{{>TimeRange}}</template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="targetlivewindow > 0">{{>SeekBackwardButton}} {{>SeekForwardButton}}</template>
          {{>MuteButton}} {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}} {{>CastButton}} {{>PipButton}}
          {{>FullscreenButton}}
        </media-control-bar>
      </template>
    </template>

    <template if="audio">
      <template if="streamtype == 'on-demand'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="breakpointsm"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          {{>MuteButton}}
          <template if="breakpointsm">{{>VolumeRange}}</template>
          {{>TimeDisplay}} {{>TimeRange}}
          <template if="breakpointsm">{{>PlaybackRateMenu}}</template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>LiveButton section="bottom"}} {{>MuteButton}}
          <template if="breakpointsm">
            {{>VolumeRange}}
            <template if="targetlivewindow > 0"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          </template>
          <template if="targetlivewindow > 0"> {{>TimeDisplay}} {{>TimeRange}} </template>
          <template if="!targetlivewindow"><div class="spacer"></div></template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>
    </template>

    <slot></slot>
  </media-controller>
</template>
`;import{MediaThemeElement as na}from"media-chrome/dist/media-theme-element.js";import"media-chrome/dist/menu";var Pe=j.createElement("template");"innerHTML"in Pe&&(Pe.innerHTML=lt);var ut,mt,Ee=class extends na{};Ee.template=(mt=(ut=Pe.content)==null?void 0:ut.children)==null?void 0:mt[0];v.customElements.get("media-theme-gerwig")||v.customElements.define("media-theme-gerwig",Ee);var ma="gerwig";var N={SRC:"src",POSTER:"poster"},n={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",AD_TAG_URL:"adtagurl"},Be=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","proudlydisplaymuxbadge","mediaadbreak"];function ca(t,a){var i,r,o;return{src:!t.playbackId&&t.src,playbackId:t.playbackId,hasSrc:!!t.playbackId||!!t.src||!!t.currentSrc,poster:t.poster,storyboard:t.storyboard,storyboardSrc:t.getAttribute(n.STORYBOARD_SRC),placeholder:t.getAttribute("placeholder"),themeTemplate:ba(t),thumbnailTime:!t.tokens.thumbnail&&t.thumbnailTime,autoplay:t.autoplay,crossOrigin:t.crossOrigin,loop:t.loop,noHotKeys:t.hasAttribute(n.NOHOTKEYS),hotKeys:t.getAttribute(n.HOTKEYS),muted:t.muted,paused:t.paused,preload:t.preload,envKey:t.envKey,preferCmcd:t.preferCmcd,debug:t.debug,disableTracking:t.disableTracking,disableCookies:t.disableCookies,tokens:t.tokens,beaconCollectionDomain:t.beaconCollectionDomain,maxResolution:t.maxResolution,minResolution:t.minResolution,programStartTime:t.programStartTime,programEndTime:t.programEndTime,assetStartTime:t.assetStartTime,assetEndTime:t.assetEndTime,renditionOrder:t.renditionOrder,metadata:t.metadata,playerInitTime:t.playerInitTime,playerSoftwareName:t.playerSoftwareName,playerSoftwareVersion:t.playerSoftwareVersion,startTime:t.startTime,preferPlayback:t.preferPlayback,audio:t.audio,defaultStreamType:t.defaultStreamType,targetLiveWindow:t.getAttribute(s.TARGET_LIVE_WINDOW),streamType:ae(t.getAttribute(s.STREAM_TYPE)),primaryColor:t.getAttribute(n.PRIMARY_COLOR),secondaryColor:t.getAttribute(n.SECONDARY_COLOR),accentColor:t.getAttribute(n.ACCENT_COLOR),forwardSeekOffset:t.forwardSeekOffset,backwardSeekOffset:t.backwardSeekOffset,defaultHiddenCaptions:t.defaultHiddenCaptions,defaultDuration:t.defaultDuration,defaultShowRemainingTime:t.defaultShowRemainingTime,hideDuration:ha(t),playbackRates:t.getAttribute(n.PLAYBACK_RATES),customDomain:(i=t.getAttribute(s.CUSTOM_DOMAIN))!=null?i:void 0,title:t.getAttribute(n.TITLE),videoTitle:(r=t.getAttribute(n.VIDEO_TITLE))!=null?r:t.getAttribute(n.TITLE),novolumepref:t.hasAttribute(n.NO_VOLUME_PREF),castReceiver:t.castReceiver,muxVideoElement:t.muxVideoElement,adTagUrl:(o=t.getAttribute(n.AD_TAG_URL))!=null?o:void 0,adBreak:t.adBreak,proudlyDisplayMuxBadge:t.hasAttribute(n.PROUDLY_DISPLAY_MUX_BADGE),...a,extraSourceParams:t.extraSourceParams,allowAdBlocker:t.getAttribute("allow-ad-blocker")}}var pa=vt.formatErrorMessage;vt.formatErrorMessage=t=>{var a,e;if(t instanceof oe){let i=dt(t,!1);return`
      ${i!=null&&i.title?`<h3>${i.title}</h3>`:""}
      ${i!=null&&i.message||i!=null&&i.linkUrl?`<p>
        ${i==null?void 0:i.message}
        ${i!=null&&i.linkUrl?`<a
              href="${i.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(a=i.linkText)!=null?a:""} ${W("(opens in a new window)")}"
              >${(e=i.linkText)!=null?e:i.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return pa(t)};function ba(t){var e,i;let a=t.theme;if(a){let r=(i=(e=t.getRootNode())==null?void 0:e.getElementById)==null?void 0:i.call(e,a);if(r&&r instanceof HTMLTemplateElement)return r;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let o=v.customElements.get(a);if(o!=null&&o.template)return o.template}}function ha(t){var e;let a=(e=t.mediaController)==null?void 0:e.querySelector("media-time-display");return a&&getComputedStyle(a).getPropertyValue("--media-duration-display-display").trim()==="none"}function ht(t){let a=t.videoTitle?{video_title:t.videoTitle}:{};return t.getAttributeNames().filter(e=>e.startsWith("metadata-")).reduce((e,i)=>{let r=t.getAttribute(i);return r!==null&&(e[i.replace(/^metadata-/,"").replace(/-/g,"_")]=r),e},a)}var ga=Object.values(s),fa=Object.values(N),ya=Object.values(n),gt=ge(),ft="mux-player",yt={isDialogOpen:!1},va={redundant_streams:!0},se,de,le,B,ue,Z,m,V,Et,Ke,U,Tt,At,Ct,kt,ne=class extends Se{constructor(){super();C(this,m);C(this,se);C(this,de,!1);C(this,le,{});C(this,B,!0);C(this,ue,new he(this,"hotkeys"));C(this,Z,{...yt,onCloseErrorDialog:e=>{var r;((r=e.composedPath()[0])==null?void 0:r.localName)==="media-error-dialog"&&b(this,m,Ke).call(this,{isDialogOpen:!1})},onFocusInErrorDialog:e=>{var o;if(((o=e.composedPath()[0])==null?void 0:o.localName)!=="media-error-dialog")return;Re(this,j.activeElement)||e.preventDefault()}});R(this,se,ua()),this.attachShadow({mode:"open"}),b(this,m,Et).call(this),this.isConnected&&b(this,m,V).call(this)}static get NAME(){return ft}static get VERSION(){return gt}static get observedAttributes(){var e;return[...(e=Se.observedAttributes)!=null?e:[],...fa,...ga,...ya]}get mediaTheme(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("media-theme")}get mediaController(){var e,i;return(i=(e=this.mediaTheme)==null?void 0:e.shadowRoot)==null?void 0:i.querySelector("media-controller")}connectedCallback(){var i;let e=this.media;e&&((i=this.media)==null||i.addEventListener("adbreakchange",()=>{b(this,m,U).call(this)}),e.metadata=ht(this))}attributeChangedCallback(e,i,r){switch(b(this,m,V).call(this),super.attributeChangedCallback(e,i,r),e){case n.HOTKEYS:u(this,ue).value=r;break;case n.THUMBNAIL_TIME:{r!=null&&this.tokens.thumbnail&&O(W("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case n.THUMBNAIL_TOKEN:{if(r){let d=Ve(r);if(d){let{aud:l}=d,p=Ue.THUMBNAIL;l!==p&&O(W("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:l,expectedAud:p,tokenNamePrefix:"thumbnail"}))}}break}case n.STORYBOARD_TOKEN:{if(r){let d=Ve(r);if(d){let{aud:l}=d,p=Ue.STORYBOARD;l!==p&&O(W("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:l,expectedAud:p,tokenNamePrefix:"storyboard"}))}}break}case n.DRM_TOKEN:{if(r){let d=Ve(r);if(d){let{aud:l}=d,p=Ue.DRM;l!==p&&O(W("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:l,expectedAud:p,tokenNamePrefix:"drm"}))}}break}case s.PLAYBACK_ID:{r!=null&&r.includes("?token")&&k(W("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:r}));break}case s.STREAM_TYPE:r&&![L.LIVE,L.ON_DEMAND,L.UNKNOWN].includes(r)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=r.includes("dvr")?Number.POSITIVE_INFINITY:0:Le({file:"invalid-stream-type.md",message:W("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):r===L.LIVE?this.getAttribute(n.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN}[s.PLAYBACK_ID,N.SRC,n.PLAYBACK_TOKEN].includes(e)&&i!==r&&R(this,Z,{...u(this,Z),...yt}),b(this,m,U).call(this,{[Xe(e)]:r})}async requestFullscreen(e){var i;if(!(!this.mediaController||this.mediaController.hasAttribute(Te.MEDIA_IS_FULLSCREEN)))return(i=this.mediaController)==null||i.dispatchEvent(new v.CustomEvent(pt.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((r,o)=>{var d;(d=this.mediaController)==null||d.addEventListener(ct.MEDIA_IS_FULLSCREEN,()=>r(),{once:!0})})}async exitFullscreen(){var e;if(!(!this.mediaController||!this.mediaController.hasAttribute(Te.MEDIA_IS_FULLSCREEN)))return(e=this.mediaController)==null||e.dispatchEvent(new v.CustomEvent(pt.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((i,r)=>{var o;(o=this.mediaController)==null||o.addEventListener(ct.MEDIA_IS_FULLSCREEN,()=>i(),{once:!0})})}get preferCmcd(){var e;return(e=this.getAttribute(s.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?bt.includes(e)?this.setAttribute(s.PREFER_CMCD,e):O(`Invalid value for preferCmcd. Must be one of ${bt.join()}`):this.removeAttribute(s.PREFER_CMCD))}get hasPlayed(){var e,i;return(i=(e=this.mediaController)==null?void 0:e.hasAttribute(Te.MEDIA_HAS_PLAYED))!=null?i:!1}get inLiveWindow(){var e;return(e=this.mediaController)==null?void 0:e.hasAttribute(Te.MEDIA_TIME_IS_LIVE)}get _hls(){var e;return(e=this.media)==null?void 0:e._hls}get mux(){var e;return(e=this.media)==null?void 0:e.mux}get theme(){var e;return(e=this.getAttribute(n.THEME))!=null?e:ma}set theme(e){this.setAttribute(n.THEME,`${e}`)}get themeProps(){let e=this.mediaTheme;if(!e)return;let i={};for(let r of e.getAttributeNames()){if(Be.includes(r))continue;let o=e.getAttribute(r);i[be(r)]=o===""?!0:o}return i}set themeProps(e){var r,o;b(this,m,V).call(this);let i={...this.themeProps,...e};for(let d in i){if(Be.includes(d))continue;let l=e==null?void 0:e[d];typeof l=="boolean"||l==null?(r=this.mediaTheme)==null||r.toggleAttribute(pe(d),!!l):(o=this.mediaTheme)==null||o.setAttribute(pe(d),l)}}get playbackId(){var e;return(e=this.getAttribute(s.PLAYBACK_ID))!=null?e:void 0}set playbackId(e){e?this.setAttribute(s.PLAYBACK_ID,e):this.removeAttribute(s.PLAYBACK_ID)}get src(){var e,i;return this.playbackId?(e=$(this,N.SRC))!=null?e:void 0:(i=this.getAttribute(N.SRC))!=null?i:void 0}set src(e){e?this.setAttribute(N.SRC,e):this.removeAttribute(N.SRC)}get poster(){var r;let e=this.getAttribute(N.POSTER);if(e!=null)return e;let{tokens:i}=this;if(i.playback&&!i.thumbnail){O("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return Ge(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(r=this.thumbnailTime)!=null?r:this.startTime,programTime:this.programStartTime,token:i.thumbnail})}set poster(e){e||e===""?this.setAttribute(N.POSTER,e):this.removeAttribute(N.POSTER)}get storyboardSrc(){var e;return(e=this.getAttribute(n.STORYBOARD_SRC))!=null?e:void 0}set storyboardSrc(e){e?this.setAttribute(n.STORYBOARD_SRC,e):this.removeAttribute(n.STORYBOARD_SRC)}get storyboard(){let{tokens:e}=this;if(this.storyboardSrc&&!e.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[L.LIVE,L.UNKNOWN].includes(this.streamType)||e.playback&&!e.storyboard))return je(this.playbackId,{customDomain:this.customDomain,token:e.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(n.AUDIO)}set audio(e){if(!e){this.removeAttribute(n.AUDIO);return}this.setAttribute(n.AUDIO,"")}get hotkeys(){return u(this,ue)}get nohotkeys(){return this.hasAttribute(n.NOHOTKEYS)}set nohotkeys(e){if(!e){this.removeAttribute(n.NOHOTKEYS);return}this.setAttribute(n.NOHOTKEYS,"")}get thumbnailTime(){return T(this.getAttribute(n.THUMBNAIL_TIME))}set thumbnailTime(e){this.setAttribute(n.THUMBNAIL_TIME,`${e}`)}get videoTitle(){var e,i;return(i=(e=this.getAttribute(n.VIDEO_TITLE))!=null?e:this.getAttribute(n.TITLE))!=null?i:""}set videoTitle(e){e!==this.videoTitle&&(e?this.setAttribute(n.VIDEO_TITLE,e):this.removeAttribute(n.VIDEO_TITLE))}get placeholder(){var e;return(e=$(this,n.PLACEHOLDER))!=null?e:""}set placeholder(e){this.setAttribute(n.PLACEHOLDER,`${e}`)}get primaryColor(){var i,r;let e=this.getAttribute(n.PRIMARY_COLOR);if(e!=null||this.mediaTheme&&(e=(r=(i=v.getComputedStyle(this.mediaTheme))==null?void 0:i.getPropertyValue("--_primary-color"))==null?void 0:r.trim(),e))return e}set primaryColor(e){this.setAttribute(n.PRIMARY_COLOR,`${e}`)}get secondaryColor(){var i,r;let e=this.getAttribute(n.SECONDARY_COLOR);if(e!=null||this.mediaTheme&&(e=(r=(i=v.getComputedStyle(this.mediaTheme))==null?void 0:i.getPropertyValue("--_secondary-color"))==null?void 0:r.trim(),e))return e}set secondaryColor(e){this.setAttribute(n.SECONDARY_COLOR,`${e}`)}get accentColor(){var i,r;let e=this.getAttribute(n.ACCENT_COLOR);if(e!=null||this.mediaTheme&&(e=(r=(i=v.getComputedStyle(this.mediaTheme))==null?void 0:i.getPropertyValue("--_accent-color"))==null?void 0:r.trim(),e))return e}set accentColor(e){this.setAttribute(n.ACCENT_COLOR,`${e}`)}get defaultShowRemainingTime(){return this.hasAttribute(n.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(e){e?this.setAttribute(n.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(n.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(n.PLAYBACK_RATES))return this.getAttribute(n.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(e=>Number(e)).filter(e=>!Number.isNaN(e)).sort((e,i)=>e-i)}set playbackRates(e){if(!e){this.removeAttribute(n.PLAYBACK_RATES);return}this.setAttribute(n.PLAYBACK_RATES,e.join(" "))}get forwardSeekOffset(){var e;return(e=T(this.getAttribute(n.FORWARD_SEEK_OFFSET)))!=null?e:10}set forwardSeekOffset(e){this.setAttribute(n.FORWARD_SEEK_OFFSET,`${e}`)}get backwardSeekOffset(){var e;return(e=T(this.getAttribute(n.BACKWARD_SEEK_OFFSET)))!=null?e:10}set backwardSeekOffset(e){this.setAttribute(n.BACKWARD_SEEK_OFFSET,`${e}`)}get defaultHiddenCaptions(){return this.hasAttribute(n.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(e){e?this.setAttribute(n.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(n.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return T(this.getAttribute(n.DEFAULT_DURATION))}set defaultDuration(e){e==null?this.removeAttribute(n.DEFAULT_DURATION):this.setAttribute(n.DEFAULT_DURATION,`${e}`)}get playerInitTime(){return this.hasAttribute(s.PLAYER_INIT_TIME)?T(this.getAttribute(s.PLAYER_INIT_TIME)):u(this,se)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(s.PLAYER_INIT_TIME):this.setAttribute(s.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=this.getAttribute(s.PLAYER_SOFTWARE_NAME))!=null?e:ft}get playerSoftwareVersion(){var e;return(e=this.getAttribute(s.PLAYER_SOFTWARE_VERSION))!=null?e:gt}get beaconCollectionDomain(){var e;return(e=this.getAttribute(s.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(s.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(s.BEACON_COLLECTION_DOMAIN))}get adBreak(){var i;let e=this.media;return e&&(i=e.getAttribute("adBreak"))!=null?i:!1}get maxResolution(){var e;return(e=this.getAttribute(s.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(s.MAX_RESOLUTION,e):this.removeAttribute(s.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(s.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(s.MIN_RESOLUTION,e):this.removeAttribute(s.MIN_RESOLUTION))}get renditionOrder(){var e;return(e=this.getAttribute(s.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(s.RENDITION_ORDER,e):this.removeAttribute(s.RENDITION_ORDER))}get programStartTime(){return T(this.getAttribute(s.PROGRAM_START_TIME))}set programStartTime(e){e==null?this.removeAttribute(s.PROGRAM_START_TIME):this.setAttribute(s.PROGRAM_START_TIME,`${e}`)}get programEndTime(){return T(this.getAttribute(s.PROGRAM_END_TIME))}set programEndTime(e){e==null?this.removeAttribute(s.PROGRAM_END_TIME):this.setAttribute(s.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){return T(this.getAttribute(s.ASSET_START_TIME))}set assetStartTime(e){e==null?this.removeAttribute(s.ASSET_START_TIME):this.setAttribute(s.ASSET_START_TIME,`${e}`)}get assetEndTime(){return T(this.getAttribute(s.ASSET_END_TIME))}set assetEndTime(e){e==null?this.removeAttribute(s.ASSET_END_TIME):this.setAttribute(s.ASSET_END_TIME,`${e}`)}get extraSourceParams(){return this.hasAttribute(n.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(n.EXTRA_SOURCE_PARAMS)).entries()].reduce((e,[i,r])=>(e[i]=r,e),{}):va}set extraSourceParams(e){e==null?this.removeAttribute(n.EXTRA_SOURCE_PARAMS):this.setAttribute(n.EXTRA_SOURCE_PARAMS,new URLSearchParams(e).toString())}get customDomain(){var e;return(e=this.getAttribute(s.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(s.CUSTOM_DOMAIN,e):this.removeAttribute(s.CUSTOM_DOMAIN))}get envKey(){var e;return(e=$(this,s.ENV_KEY))!=null?e:void 0}set envKey(e){this.setAttribute(s.ENV_KEY,`${e}`)}get noVolumePref(){return this.hasAttribute(n.NO_VOLUME_PREF)}set noVolumePref(e){e?this.setAttribute(n.NO_VOLUME_PREF,""):this.removeAttribute(n.NO_VOLUME_PREF)}get debug(){return $(this,s.DEBUG)!=null}set debug(e){e?this.setAttribute(s.DEBUG,""):this.removeAttribute(s.DEBUG)}get disableTracking(){return $(this,s.DISABLE_TRACKING)!=null}set disableTracking(e){this.toggleAttribute(s.DISABLE_TRACKING,!!e)}get disableCookies(){return $(this,s.DISABLE_COOKIES)!=null}set disableCookies(e){e?this.setAttribute(s.DISABLE_COOKIES,""):this.removeAttribute(s.DISABLE_COOKIES)}get streamType(){var e,i,r;return(r=(i=this.getAttribute(s.STREAM_TYPE))!=null?i:(e=this.media)==null?void 0:e.streamType)!=null?r:L.UNKNOWN}set streamType(e){this.setAttribute(s.STREAM_TYPE,`${e}`)}get defaultStreamType(){var e,i,r;return(r=(i=this.getAttribute(n.DEFAULT_STREAM_TYPE))!=null?i:(e=this.mediaController)==null?void 0:e.getAttribute(n.DEFAULT_STREAM_TYPE))!=null?r:L.ON_DEMAND}set defaultStreamType(e){e?this.setAttribute(n.DEFAULT_STREAM_TYPE,e):this.removeAttribute(n.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var e,i;return this.hasAttribute(n.TARGET_LIVE_WINDOW)?+this.getAttribute(n.TARGET_LIVE_WINDOW):(i=(e=this.media)==null?void 0:e.targetLiveWindow)!=null?i:Number.NaN}set targetLiveWindow(e){e==this.targetLiveWindow||Number.isNaN(e)&&Number.isNaN(this.targetLiveWindow)||(e==null?this.removeAttribute(n.TARGET_LIVE_WINDOW):this.setAttribute(n.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e;return(e=this.media)==null?void 0:e.liveEdgeStart}get startTime(){return T($(this,s.START_TIME))}set startTime(e){this.setAttribute(s.START_TIME,`${e}`)}get preferPlayback(){let e=this.getAttribute(s.PREFER_PLAYBACK);if(e===Ae.MSE||e===Ae.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===Ae.MSE||e===Ae.NATIVE?this.setAttribute(s.PREFER_PLAYBACK,e):this.removeAttribute(s.PREFER_PLAYBACK))}get metadata(){var e;return(e=this.media)==null?void 0:e.metadata}set metadata(e){if(b(this,m,V).call(this),!this.media){k("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...ht(this),...e}}get _hlsConfig(){var e;return(e=this.media)==null?void 0:e._hlsConfig}set _hlsConfig(e){if(b(this,m,V).call(this),!this.media){k("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=e}async addCuePoints(e){var i;if(b(this,m,V).call(this),!this.media){k("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(i=this.media)==null?void 0:i.addCuePoints(e)}get activeCuePoint(){var e;return(e=this.media)==null?void 0:e.activeCuePoint}get cuePoints(){var e,i;return(i=(e=this.media)==null?void 0:e.cuePoints)!=null?i:[]}addChapters(e){var i;if(b(this,m,V).call(this),!this.media){k("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(i=this.media)==null?void 0:i.addChapters(e)}get activeChapter(){var e;return(e=this.media)==null?void 0:e.activeChapter}get chapters(){var e,i;return(i=(e=this.media)==null?void 0:e.chapters)!=null?i:[]}getStartDate(){var e;return(e=this.media)==null?void 0:e.getStartDate()}get currentPdt(){var e;return(e=this.media)==null?void 0:e.currentPdt}get tokens(){let e=this.getAttribute(n.PLAYBACK_TOKEN),i=this.getAttribute(n.DRM_TOKEN),r=this.getAttribute(n.THUMBNAIL_TOKEN),o=this.getAttribute(n.STORYBOARD_TOKEN);return{...u(this,le),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{},...r!=null?{thumbnail:r}:{},...o!=null?{storyboard:o}:{}}}set tokens(e){R(this,le,e!=null?e:{})}get playbackToken(){var e;return(e=this.getAttribute(n.PLAYBACK_TOKEN))!=null?e:void 0}set playbackToken(e){this.setAttribute(n.PLAYBACK_TOKEN,`${e}`)}get drmToken(){var e;return(e=this.getAttribute(n.DRM_TOKEN))!=null?e:void 0}set drmToken(e){this.setAttribute(n.DRM_TOKEN,`${e}`)}get thumbnailToken(){var e;return(e=this.getAttribute(n.THUMBNAIL_TOKEN))!=null?e:void 0}set thumbnailToken(e){this.setAttribute(n.THUMBNAIL_TOKEN,`${e}`)}get storyboardToken(){var e;return(e=this.getAttribute(n.STORYBOARD_TOKEN))!=null?e:void 0}set storyboardToken(e){this.setAttribute(n.STORYBOARD_TOKEN,`${e}`)}addTextTrack(e,i,r,o){var l;let d=(l=this.media)==null?void 0:l.nativeEl;if(d)return da(d,e,i,r,o)}removeTextTrack(e){var r;let i=(r=this.media)==null?void 0:r.nativeEl;if(i)return la(i,e)}get textTracks(){var e;return(e=this.media)==null?void 0:e.textTracks}get castReceiver(){var e;return(e=this.getAttribute(n.CAST_RECEIVER))!=null?e:void 0}set castReceiver(e){e!==this.castReceiver&&(e?this.setAttribute(n.CAST_RECEIVER,e):this.removeAttribute(n.CAST_RECEIVER))}get castCustomData(){var e;return(e=this.media)==null?void 0:e.castCustomData}set castCustomData(e){if(!this.media){k("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=e}get noTooltips(){return this.hasAttribute(n.NO_TOOLTIPS)}set noTooltips(e){if(!e){this.removeAttribute(n.NO_TOOLTIPS);return}this.setAttribute(n.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(n.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(e){e?this.setAttribute(n.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(n.PROUDLY_DISPLAY_MUX_BADGE)}};se=new WeakMap,de=new WeakMap,le=new WeakMap,B=new WeakMap,ue=new WeakMap,Z=new WeakMap,m=new WeakSet,V=function(){var e,i,r,o;if(!u(this,de)){R(this,de,!0),b(this,m,U).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof v.HTMLElement))throw""}catch{k("<media-theme> failed to upgrade!")}try{if(customElements.upgrade(this.media),this.muxVideoElement.includes("-")){customElements.upgrade(this.media);let d=customElements.get(this.muxVideoElement);if(!(d&&this.media instanceof d))throw""}}catch{k("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof sa))throw""}catch{k("<media-controller> failed to upgrade!")}this.init(),b(this,m,Tt).call(this),b(this,m,At).call(this),b(this,m,Ct).call(this),R(this,B,(i=(e=this.mediaController)==null?void 0:e.hasAttribute(De.USER_INACTIVE))!=null?i:!0),b(this,m,kt).call(this),(r=this.media)==null||r.addEventListener("streamtypechange",()=>b(this,m,U).call(this)),(o=this.media)==null||o.addEventListener("loadstart",()=>b(this,m,U).call(this))}},Et=function(){var e,i;try{(e=window==null?void 0:window.CSS)==null||e.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(i=window==null?void 0:window.CSS)==null||i.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},Ke=function(e){Object.assign(u(this,Z),e),b(this,m,U).call(this)},U=function(e={}){at(rt(ca(this,{...u(this,Z),...e})),this.shadowRoot)},Tt=function(){let e=r=>{var l,p;if(!(r!=null&&r.startsWith("theme-")))return;let o=r.replace(/^theme-/,"");if(Be.includes(o))return;let d=this.getAttribute(r);d!=null?(l=this.mediaTheme)==null||l.setAttribute(o,d):(p=this.mediaTheme)==null||p.removeAttribute(o)};new MutationObserver(r=>{for(let{attributeName:o}of r)e(o)}).observe(this,{attributes:!0}),this.getAttributeNames().forEach(e)},At=function(){var i;let e=r=>{let{detail:o}=r;if(o instanceof oe||(o=new oe(o.message,o.code,o.fatal)),!(o!=null&&o.fatal)){O(o),o.data&&O(`${o.name} data:`,o.data);return}let d=Ie(o,!1);d.message&&Le(d),k(o),o.data&&k(`${o.name} data:`,o.data),b(this,m,Ke).call(this,{isDialogOpen:!0})};this.addEventListener("error",e),this.media&&(this.media.errorTranslator=(r={})=>{var d,l,p;if(!(((d=this.media)==null?void 0:d.error)instanceof oe))return r;let o=Ie((l=this.media)==null?void 0:l.error,!1);return{player_error_code:(p=this.media)==null?void 0:p.error.code,player_error_message:o.message?String(o.message):r.player_error_message,player_error_context:o.context?String(o.context):r.player_error_context}}),(i=this.media)==null||i.addEventListener("error",r=>{var d,l;let{detail:o}=r;if(!o){let{message:p,code:x}=(l=(d=this.media)==null?void 0:d.error)!=null?l:{};o=new oe(p,x)}o!=null&&o.fatal&&this.dispatchEvent(new CustomEvent("error",{detail:o}))})},Ct=function(){var i,r,o,d;let e=()=>b(this,m,U).call(this);(r=(i=this.media)==null?void 0:i.textTracks)==null||r.addEventListener("addtrack",e),(d=(o=this.media)==null?void 0:o.textTracks)==null||d.addEventListener("removetrack",e)},kt=function(){var x,w;if(!/Firefox/i.test(navigator.userAgent))return;let i,r=new WeakMap,o=()=>this.streamType===L.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,d=(E,y,_=!1)=>{if(o())return;Array.from(E&&E.activeCues||[]).forEach(h=>{if(!(!h.snapToLines||h.line<-5||h.line>=0&&h.line<10))if(!y||this.paused){let K=h.text.split(`
`).length,I=-3;this.streamType===L.LIVE&&(I=-2);let P=I-K;if(h.line===P&&!_)return;r.has(h)||r.set(h,h.line),h.line=P}else setTimeout(()=>{h.line=r.get(h)||"auto"},500)})},l=()=>{var E,y;d(i,(y=(E=this.mediaController)==null?void 0:E.hasAttribute(De.USER_INACTIVE))!=null?y:!1)},p=()=>{var _,M;let y=Array.from(((M=(_=this.mediaController)==null?void 0:_.media)==null?void 0:M.textTracks)||[]).filter(h=>["subtitles","captions"].includes(h.kind)&&h.mode==="showing")[0];y!==i&&(i==null||i.removeEventListener("cuechange",l)),i=y,i==null||i.addEventListener("cuechange",l),d(i,u(this,B))};p(),(x=this.textTracks)==null||x.addEventListener("change",p),(w=this.textTracks)==null||w.addEventListener("addtrack",p),this.addEventListener("userinactivechange",()=>{var y,_;let E=(_=(y=this.mediaController)==null?void 0:y.hasAttribute(De.USER_INACTIVE))!=null?_:!0;u(this,B)!==E&&(R(this,B,E),d(i,u(this,B)))})};function $(t,a){return t.media?t.media.getAttribute(a):t.getAttribute(a)}v.customElements.get("mux-player")||(v.customElements.define("mux-player",ne),v.MuxPlayerElement=ne);var hi=ne;export{oe as MediaError,hi as default,ua as generatePlayerInitTime,$ as getVideoAttribute,ft as playerSoftwareName,gt as playerSoftwareVersion};
