"use strict";var Ao=Object.defineProperty;var hh=Object.getOwnPropertyDescriptor;var ph=Object.getOwnPropertyNames;var fh=Object.prototype.hasOwnProperty;var Cd=i=>{throw TypeError(i)};var vh=(i,e)=>{for(var t in e)Ao(i,t,{get:e[t],enumerable:!0})},Eh=(i,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of ph(e))!fh.call(i,r)&&r!==t&&Ao(i,r,{get:()=>e[r],enumerable:!(a=hh(e,r))||a.enumerable});return i};var bh=i=>Eh(Ao({},"__esModule",{value:!0}),i);var To=(i,e,t)=>e.has(i)||Cd("Cannot "+t);var B=(i,e,t)=>(To(i,e,"read from private field"),t?t.call(i):e.get(i)),pe=(i,e,t)=>e.has(i)?Cd("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),Ae=(i,e,t,a)=>(To(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Q=(i,e,t)=>(To(i,e,"access private method"),t);var _v={};vh(_v,{MediaError:()=>b.MediaError,default:()=>gv,generatePlayerInitTime:()=>R.generatePlayerInitTime,getVideoAttribute:()=>Pt,playerSoftwareName:()=>Xl,playerSoftwareVersion:()=>Ql});module.exports=bh(_v);var gi=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if(typeof DocumentFragment=="undefined"){class i extends gi{}globalThis.DocumentFragment=i}var oa=class extends gi{},yo=class extends gi{},gh={get(i){},define(i,e,t){},getName(i){return null},upgrade(i){},whenDefined(i){return Promise.resolve(oa)}},sa,ko=class{constructor(e,t={}){pe(this,sa);Ae(this,sa,t==null?void 0:t.detail)}get detail(){return B(this,sa)}initCustomEvent(){}};sa=new WeakMap;function _h(i,e){return new oa}var Md={document:{createElement:_h},DocumentFragment,customElements:gh,CustomEvent:ko,EventTarget:gi,HTMLElement:oa,HTMLVideoElement:yo},Ld=typeof window=="undefined"||typeof globalThis.customElements=="undefined",le=Ld?Md:globalThis,_i=Ld?Md.document:globalThis.document;var f={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},w={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},So={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_WIDTH:"mediaWidth"},wd=Object.entries(So),o=wd.reduce((i,[e,t])=>(i[e]=t.toLowerCase(),i),{}),Ah={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Ce=wd.reduce((i,[e,t])=>(i[e]=t.toLowerCase(),i),{...Ah}),Sv=Object.entries(Ce).reduce((i,[e,t])=>{let a=o[e];return a&&(i[t]=a),i},{userinactivechange:"userinactive"}),Rd=Object.entries(o).reduce((i,[e,t])=>{let a=Ce[e];return a&&(i[t]=a),i},{userinactive:"userinactivechange"}),fe={SUBTITLES:"subtitles",CAPTIONS:"captions",DESCRIPTIONS:"descriptions",CHAPTERS:"chapters",METADATA:"metadata"},gt={DISABLED:"disabled",HIDDEN:"hidden",SHOWING:"showing"};var Io={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},Te={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},xe={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"};var xd={INLINE:"inline",FULLSCREEN:"fullscreen",PICTURE_IN_PICTURE:"picture-in-picture"};function Dd(i){return i==null?void 0:i.map(yh).join(" ")}function Od(i){return i==null?void 0:i.split(/\s+/).map(kh)}function yh(i){if(i){let{id:e,width:t,height:a}=i;return[e,t,a].filter(r=>r!=null).join(":")}}function kh(i){if(i){let[e,t,a]=i.split(":");return{id:e,width:+t,height:+a}}}function Nd(i){return i==null?void 0:i.map(Sh).join(" ")}function Pd(i){return i==null?void 0:i.split(/\s+/).map(Ih)}function Sh(i){if(i){let{id:e,kind:t,language:a,label:r}=i;return[e,t,a,r].filter(n=>n!=null).join(":")}}function Ih(i){if(i){let[e,t,a,r]=i.split(":");return{id:e,kind:t,language:a,label:r}}}function Ud(i){return i.replace(/[-_]([a-z])/g,(e,t)=>t.toUpperCase())}function Ai(i){return typeof i=="number"&&!Number.isNaN(i)&&Number.isFinite(i)}function ur(i){return typeof i!="string"?!1:!isNaN(i)&&!isNaN(parseFloat(i))}var cr=i=>new Promise(e=>setTimeout(e,i));var Bd=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],Ch=(i,e)=>{let t=i===1?Bd[e].singular:Bd[e].plural;return`${i} ${t}`},Wt=i=>{if(!Ai(i))return"";let e=Math.abs(i),t=e!==i,a=new Date(0,0,0,0,0,e,0);return`${[a.getHours(),a.getMinutes(),a.getSeconds()].map((l,u)=>l&&Ch(l,u)).filter(l=>l).join(", ")}${t?" remaining":""}`};function He(i,e){let t=!1;i<0&&(t=!0,i=0-i),i=i<0?0:i;let a=Math.floor(i%60),r=Math.floor(i/60%60),n=Math.floor(i/3600),s=Math.floor(e/60%60),l=Math.floor(e/3600);return(isNaN(i)||i===1/0)&&(n=r=a="0"),n=n>0||l>0?n+":":"",r=((n||s>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(t?"-":"")+n+r+a}var Mv=Object.freeze({length:0,start(i){let e=i>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(i){let e=i>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var Co={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute",live:"live","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."};var Hd,Wd,Lh={en:Co},$d=((Wd=(Hd=globalThis.navigator)==null?void 0:Hd.language)==null?void 0:Wd.split("-")[0])||"en",Fd=i=>{$d=i};var v=(i,e={})=>{var t;return(((t=Lh[$d])==null?void 0:t[i])||Co[i]).replace(/\{(\w+)\}/g,(r,n)=>e[n]!==void 0?String(e[n]):`{${n}}`)};var mr=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},hr=class extends mr{},pr=class extends hr{constructor(){super(...arguments),this.role=null}},Mo=class{observe(){}unobserve(){}disconnect(){}},Vd={createElement:function(){return new la.HTMLElement},createElementNS:function(){return new la.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(i){return!1}},la={ResizeObserver:Mo,document:Vd,Node:hr,Element:pr,HTMLElement:class extends pr{constructor(){super(...arguments),this.innerHTML=""}get content(){return new la.DocumentFragment}},DocumentFragment:class extends mr{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(i){return null},setItem(i,e){},removeItem(i){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(i){return{matches:!1,media:i}}},Kd=typeof window=="undefined"||typeof window.customElements=="undefined",Gd=Object.keys(la).every(i=>i in globalThis),d=Kd&&!Gd?la:globalThis,h=Kd&&!Gd?Vd:globalThis.document;var Yd=new WeakMap,Lo=i=>{let e=Yd.get(i);return e||Yd.set(i,e=new Set),e},qd=new d.ResizeObserver(i=>{for(let e of i)for(let t of Lo(e.target))t(e)});function ot(i,e){Lo(i).add(e),qd.observe(i)}function st(i,e){let t=Lo(i);t.delete(e),t.size||qd.unobserve(i)}function Zd(i){let e={};for(let t of i)e[t.name]=t.value;return e}function q(i){var e;return(e=fr(i))!=null?e:We(i,"media-controller")}function fr(i){var e;let{MEDIA_CONTROLLER:t}=w,a=i.getAttribute(t);if(a)return(e=$t(i))==null?void 0:e.getElementById(a)}var vr=(i,e,t=".value")=>{let a=i.querySelector(t);a&&(a.textContent=e)},wh=(i,e)=>{let t=`slot[name="${e}"]`,a=i.shadowRoot.querySelector(t);return a?a.children:[]},Er=(i,e)=>wh(i,e)[0],ue=(i,e)=>!i||!e?!1:i!=null&&i.contains(e)?!0:ue(i,e.getRootNode().host),We=(i,e)=>{if(!i)return null;let t=i.closest(e);return t||We(i.getRootNode().host,e)};function da(i=document){var e;let t=i==null?void 0:i.activeElement;return t?(e=da(t.shadowRoot))!=null?e:t:null}function $t(i){var e;let t=(e=i==null?void 0:i.getRootNode)==null?void 0:e.call(i);return t instanceof ShadowRoot||t instanceof Document?t:null}function br(i,{depth:e=3,checkOpacity:t=!0,checkVisibilityCSS:a=!0}={}){if(i.checkVisibility)return i.checkVisibility({checkOpacity:t,checkVisibilityCSS:a});let r=i;for(;r&&e>0;){let n=getComputedStyle(r);if(t&&n.opacity==="0"||a&&n.visibility==="hidden"||n.display==="none")return!1;r=r.parentElement,e--}return!0}function zd(i,e,t,a){let r=a.x-t.x,n=a.y-t.y,s=r*r+n*n;if(s===0)return 0;let l=((i-t.x)*r+(e-t.y)*n)/s;return Math.max(0,Math.min(1,l))}function $(i,e){let t=Rh(i,a=>a===e);return t||wo(i,e)}function Rh(i,e){var t,a;let r;for(r of(t=i.querySelectorAll("style:not([media])"))!=null?t:[]){let n;try{n=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(let s of n!=null?n:[])if(e(s.selectorText))return s}}function wo(i,e){var t,a;let r=(t=i.querySelectorAll("style:not([media])"))!=null?t:[],n=r==null?void 0:r[r.length-1];return n!=null&&n.sheet?(n==null||n.sheet.insertRule(`${e}{}`,n.sheet.cssRules.length),(a=n.sheet.cssRules)==null?void 0:a[n.sheet.cssRules.length-1]):(console.warn("Media Chrome: No style sheet found on style tag of",i),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}})}function x(i,e,t=Number.NaN){let a=i.getAttribute(e);return a!=null?+a:t}function P(i,e,t){let a=+t;if(t==null||Number.isNaN(a)){i.hasAttribute(e)&&i.removeAttribute(e);return}x(i,e,void 0)!==a&&i.setAttribute(e,`${a}`)}function S(i,e){return i.hasAttribute(e)}function I(i,e,t){if(t==null){i.hasAttribute(e)&&i.removeAttribute(e);return}S(i,e)!=t&&i.toggleAttribute(e,t)}function M(i,e,t=null){var a;return(a=i.getAttribute(e))!=null?a:t}function L(i,e,t){if(t==null){i.hasAttribute(e)&&i.removeAttribute(e);return}let a=`${t}`;M(i,e,void 0)!==a&&i.setAttribute(e,a)}var Qd=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},_t=(i,e,t)=>(Qd(i,e,"read from private field"),t?t.call(i):e.get(i)),xh=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},gr=(i,e,t,a)=>(Qd(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),ve,Xd=h.createElement("template");Xd.innerHTML=`
<style>
  :host {
    display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
    box-sizing: border-box;
  }
</style>
`;var Ro=class extends d.HTMLElement{constructor(e={}){if(super(),xh(this,ve,void 0),!this.shadowRoot){let t=this.attachShadow({mode:"open"}),a=Xd.content.cloneNode(!0);this.nativeEl=a;let r=e.slotTemplate;r||(r=h.createElement("template"),r.innerHTML=`<slot>${e.defaultContent||""}</slot>`),this.nativeEl.appendChild(r.content.cloneNode(!0)),t.appendChild(a)}}static get observedAttributes(){return[w.MEDIA_CONTROLLER,o.MEDIA_PAUSED]}attributeChangedCallback(e,t,a){var r,n,s,l,u;e===w.MEDIA_CONTROLLER&&(t&&((n=(r=_t(this,ve))==null?void 0:r.unassociateElement)==null||n.call(r,this),gr(this,ve,null)),a&&this.isConnected&&(gr(this,ve,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(u=(l=_t(this,ve))==null?void 0:l.associateElement)==null||u.call(l,this)))}connectedCallback(){var e,t,a,r;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),gr(this,ve,Dh(this)),this.getAttribute(w.MEDIA_CONTROLLER)&&((t=(e=_t(this,ve))==null?void 0:e.associateElement)==null||t.call(e,this)),(a=_t(this,ve))==null||a.addEventListener("pointerdown",this),(r=_t(this,ve))==null||r.addEventListener("click",this)}disconnectedCallback(){var e,t,a,r;this.getAttribute(w.MEDIA_CONTROLLER)&&((t=(e=_t(this,ve))==null?void 0:e.unassociateElement)==null||t.call(e,this)),(a=_t(this,ve))==null||a.removeEventListener("pointerdown",this),(r=_t(this,ve))==null||r.removeEventListener("click",this),gr(this,ve,null)}handleEvent(e){var t;let a=(t=e.composedPath())==null?void 0:t[0];if(["video","media-controller"].includes(a==null?void 0:a.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){let{clientX:n,clientY:s}=e,{left:l,top:u,width:c,height:A}=this.getBoundingClientRect(),_=n-l,p=s-u;if(_<0||p<0||_>c||p>A||c===0&&A===0)return;let{pointerType:E=this._pointerType}=e;if(this._pointerType=void 0,E===Io.TOUCH){this.handleTap(e);return}else if(E===Io.MOUSE){this.handleMouseClick(e);return}}}}get mediaPaused(){return S(this,o.MEDIA_PAUSED)}set mediaPaused(e){I(this,o.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let t=this.mediaPaused?f.MEDIA_PLAY_REQUEST:f.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new d.CustomEvent(t,{composed:!0,bubbles:!0}))}};ve=new WeakMap;function Dh(i){var e;let t=i.getAttribute(w.MEDIA_CONTROLLER);return t?(e=i.getRootNode())==null?void 0:e.getElementById(t):We(i,"media-controller")}d.customElements.get("media-gesture-receiver")||d.customElements.define("media-gesture-receiver",Ro);var No=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},ke=(i,e,t)=>(No(i,e,"read from private field"),t?t.call(i):e.get(i)),ye=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Ft=(i,e,t,a)=>(No(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Me=(i,e,t)=>(No(i,e,"access private method"),t),Tr,Ti,ca,yi,_r,xo,Jd,ua,Ar,Do,jd,Oo,eu,ma,yr,kr,Po,ki,ha,k={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"},tu=h.createElement("template");tu.innerHTML=`
  <style>
    
    :host([${o.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
      outline: none;
    }

    :host {
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      line-height: 0;
      background-color: var(--media-background-color, #000);
    }

    :host(:not([${k.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-flow: column nowrap;
      align-items: start;
      pointer-events: none;
      background: none;
    }

    slot[name=media] {
      display: var(--media-slot-display, contents);
    }

    
    :host([${k.AUDIO}]) slot[name=media] {
      display: var(--media-slot-display, none);
    }

    
    :host([${k.AUDIO}]) [part~=layer][part~=gesture-layer] {
      height: 0;
      display: block;
    }

    
    :host(:not([${k.AUDIO}])[${k.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
    :host(:not([${k.AUDIO}])[${k.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
      display: none;
    }

    
    ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
      pointer-events: auto;
    }

    :host(:not([${k.AUDIO}])) *[part~=layer][part~=centered-layer] {
      align-items: center;
      justify-content: center;
    }

    :host(:not([${k.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
    :host(:not([${k.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
      align-self: stretch;
      flex-grow: 1;
    }

    slot[name=middle-chrome] {
      display: inline;
      flex-grow: 1;
      pointer-events: none;
      background: none;
    }

    
    ::slotted([slot=media]),
    ::slotted([slot=poster]) {
      width: 100%;
      height: 100%;
    }

    
    :host(:not([${k.AUDIO}])) .spacer {
      flex-grow: 1;
    }

    
    :host(:-webkit-full-screen) {
      
      width: 100% !important;
      height: 100% !important;
    }

    
    ::slotted(:not([slot=media]):not([slot=poster]):not([${k.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
      opacity: 1;
      transition: var(--media-control-transition-in, opacity 0.25s);
    }

    
    :host([${k.USER_INACTIVE}]:not([${o.MEDIA_PAUSED}]):not([${o.MEDIA_IS_AIRPLAYING}]):not([${o.MEDIA_IS_CASTING}]):not([${k.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${k.NO_AUTOHIDE}]):not([role=dialog])) {
      opacity: 0;
      transition: var(--media-control-transition-out, opacity 1s);
    }

    :host([${k.USER_INACTIVE}]:not([${k.NO_AUTOHIDE}]):not([${o.MEDIA_PAUSED}]):not([${o.MEDIA_IS_CASTING}]):not([${k.AUDIO}])) ::slotted([slot=media]) {
      cursor: none;
    }

    :host([${k.USER_INACTIVE}][${k.AUTOHIDE_OVER_CONTROLS}]:not([${k.NO_AUTOHIDE}]):not([${o.MEDIA_PAUSED}]):not([${o.MEDIA_IS_CASTING}]):not([${k.AUDIO}])) * {
     --media-cursor: none;
     cursor: none;
    }


    ::slotted(media-control-bar)  {
      align-self: stretch;
    }

    
    :host(:not([${k.AUDIO}])[${o.MEDIA_HAS_PLAYED}]) slot[name=poster] {
      display: none;
    }

    ::slotted([role=dialog]) {
      width: 100%;
      height: 100%;
      align-self: center;
    }

    ::slotted([role=menu]) {
      align-self: end;
    }
  </style>

  <slot name="media" part="layer media-layer"></slot>
  <slot name="poster" part="layer poster-layer"></slot>
  <slot name="gestures-chrome" part="layer gesture-layer">
    <media-gesture-receiver slot="gestures-chrome"></media-gesture-receiver>
  </slot>
  <span part="layer vertical-layer">
    <slot name="top-chrome" part="top chrome"></slot>
    <slot name="middle-chrome" part="middle chrome"></slot>
    <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
    
    <slot part="bottom chrome"></slot>
  </span>
  <slot name="dialog" part="layer dialog-layer"></slot>
`;var Oh=Object.values(o),Nh="sm:384 md:576 lg:768 xl:960";function Ph(i){iu(i.target,i.contentRect.width)}function iu(i,e){var t;if(!i.isConnected)return;let a=(t=i.getAttribute(k.BREAKPOINTS))!=null?t:Nh,r=Uh(a),n=Bh(r,e),s=!1;if(Object.keys(r).forEach(l=>{if(n.includes(l)){i.hasAttribute(`breakpoint${l}`)||(i.setAttribute(`breakpoint${l}`,""),s=!0);return}i.hasAttribute(`breakpoint${l}`)&&(i.removeAttribute(`breakpoint${l}`),s=!0)}),s){let l=new CustomEvent(Ce.BREAKPOINTS_CHANGE,{detail:n});i.dispatchEvent(l)}i.breakpointsComputed||(i.breakpointsComputed=!0,i.dispatchEvent(new CustomEvent(Ce.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function Uh(i){let e=i.split(/\s+/);return Object.fromEntries(e.map(t=>t.split(":")))}function Bh(i,e){return Object.keys(i).filter(t=>e>=parseInt(i[t]))}var pa=class extends d.HTMLElement{constructor(){super(),ye(this,xo),ye(this,Do),ye(this,Oo),ye(this,ma),ye(this,kr),ye(this,ki),ye(this,Tr,0),ye(this,Ti,null),ye(this,ca,null),ye(this,yi,void 0),this.breakpointsComputed=!1,ye(this,_r,new MutationObserver(Me(this,xo,Jd).bind(this))),ye(this,ua,!1),ye(this,Ar,t=>{ke(this,ua)||(setTimeout(()=>{Ph(t),Ft(this,ua,!1)},0),Ft(this,ua,!0))}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(tu.content.cloneNode(!0)));let e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){ke(this,Ti)&&this.mediaUnsetCallback(ke(this,Ti));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[k.AUTOHIDE,k.GESTURES_DISABLED].concat(Oh).filter(e=>![o.MEDIA_RENDITION_LIST,o.MEDIA_AUDIO_TRACK_LIST,o.MEDIA_CHAPTERS_CUES,o.MEDIA_WIDTH,o.MEDIA_HEIGHT,o.MEDIA_ERROR,o.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,t,a){e.toLowerCase()==k.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return(e==null?void 0:e.nodeName)=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Ft(this,Ti,e),e.localName.includes("-")&&await d.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;ke(this,_r).observe(this,{childList:!0,subtree:!0}),ot(this,ke(this,Ar));let a=this.getAttribute(k.AUDIO)!=null?v("audio player"):v("video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(k.USER_INACTIVE,""),iu(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=d.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;ke(this,_r).disconnect(),st(this,ke(this,Ar)),this.media&&this.mediaUnsetCallback(this.media),(e=d.window)==null||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){Ft(this,Ti,null)}handleEvent(e){switch(e.type){case"pointerdown":Ft(this,Tr,e.timeStamp);break;case"pointermove":Me(this,Do,jd).call(this,e);break;case"pointerup":Me(this,Oo,eu).call(this,e);break;case"mouseleave":Me(this,ma,yr).call(this);break;case"mouseup":this.removeAttribute(k.KEYBOARD_CONTROL);break;case"keyup":Me(this,ki,ha).call(this),this.setAttribute(k.KEYBOARD_CONTROL,"");break}}set autohide(e){let t=Number(e);Ft(this,yi,isNaN(t)?0:t)}get autohide(){return(ke(this,yi)===void 0?2:ke(this,yi)).toString()}get breakpoints(){return M(this,k.BREAKPOINTS)}set breakpoints(e){L(this,k.BREAKPOINTS,e)}get audio(){return S(this,k.AUDIO)}set audio(e){I(this,k.AUDIO,e)}get gesturesDisabled(){return S(this,k.GESTURES_DISABLED)}set gesturesDisabled(e){I(this,k.GESTURES_DISABLED,e)}get keyboardControl(){return S(this,k.KEYBOARD_CONTROL)}set keyboardControl(e){I(this,k.KEYBOARD_CONTROL,e)}get noAutohide(){return S(this,k.NO_AUTOHIDE)}set noAutohide(e){I(this,k.NO_AUTOHIDE,e)}get autohideOverControls(){return S(this,k.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){I(this,k.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return S(this,k.USER_INACTIVE)}set userInteractive(e){I(this,k.USER_INACTIVE,e)}};Tr=new WeakMap;Ti=new WeakMap;ca=new WeakMap;yi=new WeakMap;_r=new WeakMap;xo=new WeakSet;Jd=function(i){let e=this.media;for(let t of i){if(t.type!=="childList")continue;let a=t.removedNodes;for(let r of a){if(r.slot!="media"||t.target!=this)continue;let n=t.previousSibling&&t.previousSibling.previousElementSibling;if(!n||!e)this.mediaUnsetCallback(r);else{let s=n.slot!=="media";for(;(n=n.previousSibling)!==null;)n.slot=="media"&&(s=!1);s&&this.mediaUnsetCallback(r)}}if(e)for(let r of t.addedNodes)r===e&&this.handleMediaUpdated(e)}};ua=new WeakMap;Ar=new WeakMap;Do=new WeakSet;jd=function(i){if(i.pointerType!=="mouse"&&i.timeStamp-ke(this,Tr)<250)return;Me(this,kr,Po).call(this),clearTimeout(ke(this,ca));let e=this.hasAttribute(k.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(i.target)||e)&&Me(this,ki,ha).call(this)};Oo=new WeakSet;eu=function(i){if(i.pointerType==="touch"){let e=!this.hasAttribute(k.USER_INACTIVE);[this,this.media].includes(i.target)&&e?Me(this,ma,yr).call(this):Me(this,ki,ha).call(this)}else i.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e==null?void 0:e.localName))&&Me(this,ki,ha).call(this)};ma=new WeakSet;yr=function(){if(ke(this,yi)<0||this.hasAttribute(k.USER_INACTIVE))return;this.setAttribute(k.USER_INACTIVE,"");let i=new d.CustomEvent(Ce.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(i)};kr=new WeakSet;Po=function(){if(!this.hasAttribute(k.USER_INACTIVE))return;this.removeAttribute(k.USER_INACTIVE);let i=new d.CustomEvent(Ce.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(i)};ki=new WeakSet;ha=function(){Me(this,kr,Po).call(this),clearTimeout(ke(this,ca));let i=parseInt(this.autohide);i<0||Ft(this,ca,setTimeout(()=>{Me(this,ma,yr).call(this)},i*1e3))};d.customElements.get("media-container")||d.customElements.define("media-container",pa);var au=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},te=(i,e,t)=>(au(i,e,"read from private field"),t?t.call(i):e.get(i)),fa=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Sr=(i,e,t,a)=>(au(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Si,Ii,Ir,Vt,lt,At,$e=class{constructor(e,t,{defaultValue:a}={defaultValue:void 0}){fa(this,lt),fa(this,Si,void 0),fa(this,Ii,void 0),fa(this,Ir,void 0),fa(this,Vt,new Set),Sr(this,Si,e),Sr(this,Ii,t),Sr(this,Ir,new Set(a))}[Symbol.iterator](){return te(this,lt,At).values()}get length(){return te(this,lt,At).size}get value(){var e;return(e=[...te(this,lt,At)].join(" "))!=null?e:""}set value(e){var t;e!==this.value&&(Sr(this,Vt,new Set),this.add(...(t=e==null?void 0:e.split(" "))!=null?t:[]))}toString(){return this.value}item(e){return[...te(this,lt,At)][e]}values(){return te(this,lt,At).values()}forEach(e,t){te(this,lt,At).forEach(e,t)}add(...e){var t,a;e.forEach(r=>te(this,Vt).add(r)),!(this.value===""&&!((t=te(this,Si))!=null&&t.hasAttribute(`${te(this,Ii)}`)))&&((a=te(this,Si))==null||a.setAttribute(`${te(this,Ii)}`,`${this.value}`))}remove(...e){var t;e.forEach(a=>te(this,Vt).delete(a)),(t=te(this,Si))==null||t.setAttribute(`${te(this,Ii)}`,`${this.value}`)}contains(e){return te(this,lt,At).has(e)}toggle(e,t){return typeof t!="undefined"?t?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,t){return this.remove(e),this.add(t),e===t}};Si=new WeakMap;Ii=new WeakMap;Ir=new WeakMap;Vt=new WeakMap;lt=new WeakSet;At=function(){return te(this,Vt).size?te(this,Vt):te(this,Ir)};var Hh=(i="")=>i.split(/\s+/),ru=(i="")=>{let[e,t,a]=i.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?fe.CAPTIONS:fe.SUBTITLES,language:t,label:r}},Kt=(i="",e={})=>Hh(i).map(t=>{let a=ru(t);return{...e,...a}}),Uo=i=>i?Array.isArray(i)?i.map(e=>typeof e=="string"?ru(e):e):typeof i=="string"?Kt(i):[i]:[],Cr=({kind:i,label:e,language:t}={kind:"subtitles"})=>e?`${i==="captions"?"cc":"sb"}:${t}:${encodeURIComponent(e)}`:t,dt=(i=[])=>Array.prototype.map.call(i,Cr).join(" "),Wh=(i,e)=>t=>t[i]===e,nu=i=>{let e=Object.entries(i).map(([t,a])=>Wh(t,a));return t=>e.every(a=>a(t))},Gt=(i,e=[],t=[])=>{let a=Uo(t).map(nu),r=n=>a.some(s=>s(n));Array.from(e).filter(r).forEach(n=>{n.mode=i})},Yt=(i,e=()=>!0)=>{if(!(i!=null&&i.textTracks))return[];let t=typeof e=="function"?e:nu(e);return Array.from(i.textTracks).filter(t)},Mr=i=>{var e;return!!((e=i.mediaSubtitlesShowing)!=null&&e.length)||i.hasAttribute(o.MEDIA_SUBTITLES_SHOWING)};var su=i=>{var e;let{media:t,fullscreenElement:a}=i;try{let r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){let n=(e=a[r])==null?void 0:e.call(a);if(n instanceof Promise)return n.catch(()=>{})}else t!=null&&t.webkitEnterFullscreen?t.webkitEnterFullscreen():t!=null&&t.requestFullscreen&&t.requestFullscreen()}catch(r){console.error(r)}},ou="exitFullscreen"in h?"exitFullscreen":"webkitExitFullscreen"in h?"webkitExitFullscreen":"webkitCancelFullScreen"in h?"webkitCancelFullScreen":void 0,lu=i=>{var e;let{documentElement:t}=i;if(ou){let a=(e=t==null?void 0:t[ou])==null?void 0:e.call(t);if(a instanceof Promise)return a.catch(()=>{})}},va="fullscreenElement"in h?"fullscreenElement":"webkitFullscreenElement"in h?"webkitFullscreenElement":void 0,$h=i=>{let{documentElement:e,media:t}=i,a=e==null?void 0:e[va];return!a&&"webkitDisplayingFullscreen"in t&&"webkitPresentationMode"in t&&t.webkitDisplayingFullscreen&&t.webkitPresentationMode===xd.FULLSCREEN?t:a},du=i=>{var e;let{media:t,documentElement:a,fullscreenElement:r=t}=i;if(!t||!a)return!1;let n=$h(i);if(!n)return!1;if(n===r||n===t)return!0;if(n.localName.includes("-")){let s=n.shadowRoot;if(!(va in s))return ue(n,r);for(;s!=null&&s[va];){if(s[va]===r)return!0;s=(e=s[va])==null?void 0:e.shadowRoot}}return!1},Fh="fullscreenEnabled"in h?"fullscreenEnabled":"webkitFullscreenEnabled"in h?"webkitFullscreenEnabled":void 0,uu=i=>{let{documentElement:e,media:t}=i;return!!(e!=null&&e[Fh])||t&&"webkitSupportsFullscreen"in t};var Lr,Bo=()=>{var i,e;return Lr||(Lr=(e=(i=h)==null?void 0:i.createElement)==null?void 0:e.call(i,"video"),Lr)},cu=async(i=Bo())=>{if(!i)return!1;let e=i.volume;i.volume=e/2+.1;let t=new AbortController,a=await Promise.race([Vh(i,t.signal),Kh(i,e)]);return t.abort(),a},Vh=(i,e)=>new Promise(t=>{i.addEventListener("volumechange",()=>t(!0),{signal:e})}),Kh=async(i,e)=>{for(let t=0;t<10;t++){if(i.volume===e)return!1;await cr(10)}return i.volume!==e},Gh=/.*Version\/.*Safari\/.*/.test(d.navigator.userAgent),Ho=(i=Bo())=>d.matchMedia("(display-mode: standalone)").matches&&Gh?!1:typeof(i==null?void 0:i.requestPictureInPicture)=="function",Wo=(i=Bo())=>uu({documentElement:h,media:i}),mu=Wo(),hu=Ho(),pu=!!d.WebKitPlaybackTargetAvailabilityEvent,fu=!!d.chrome;var Ci=i=>Yt(i.media,e=>[fe.SUBTITLES,fe.CAPTIONS].includes(e.kind)).sort((e,t)=>e.kind>=t.kind?1:-1),$o=i=>Yt(i.media,e=>e.mode===gt.SHOWING&&[fe.SUBTITLES,fe.CAPTIONS].includes(e.kind)),wr=(i,e)=>{let t=Ci(i),a=$o(i),r=!!a.length;if(t.length){if(e===!1||r&&e!==!0)Gt(gt.DISABLED,t,a);else if(e===!0||!r&&e!==!1){let n=t[0],{options:s}=i;if(!(s!=null&&s.noSubtitlesLangPref)){let A=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),_=A?[A,...globalThis.navigator.languages]:globalThis.navigator.languages,p=t.filter(E=>_.some(O=>E.language.toLowerCase().startsWith(O.split("-")[0]))).sort((E,O)=>{let y=_.findIndex(U=>E.language.toLowerCase().startsWith(U.split("-")[0])),C=_.findIndex(U=>O.language.toLowerCase().startsWith(U.split("-")[0]));return y-C});p[0]&&(n=p[0])}let{language:l,label:u,kind:c}=n;Gt(gt.DISABLED,t,a),Gt(gt.SHOWING,t,[{language:l,label:u,kind:c}])}}},Rr=(i,e)=>i===e?!0:i==null||e==null||typeof i!=typeof e?!1:typeof i=="number"&&Number.isNaN(i)&&Number.isNaN(e)?!0:typeof i!="object"?!1:Array.isArray(i)?Yh(i,e):Object.entries(i).every(([t,a])=>t in e&&Rr(a,e[t])),Yh=(i,e)=>{let t=Array.isArray(i),a=Array.isArray(e);return t!==a?!1:t||a?i.length!==e.length?!1:i.every((r,n)=>Rr(r,e[n])):!0};var qh=Object.values(xe),xr,Zh=cu().then(i=>(xr=i,xr)),vu=async(...i)=>{await Promise.all(i.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof d.HTMLElement))return;let t=e.localName;if(!t.includes("-"))return;let a=d.customElements.get(t);a&&e instanceof a||(await d.customElements.whenDefined(t),d.customElements.upgrade(e))}))},Mi={mediaError:{get(i,e){let{media:t}=i;if((e==null?void 0:e.type)!=="playing")return t==null?void 0:t.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(i,e){var t;let{media:a}=i;if((e==null?void 0:e.type)!=="playing")return(t=a==null?void 0:a.error)==null?void 0:t.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(i,e){var t,a;let{media:r}=i;if((e==null?void 0:e.type)!=="playing")return(a=(t=r==null?void 0:r.error)==null?void 0:t.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(i){var e;let{media:t}=i;return(e=t==null?void 0:t.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(i){var e;let{media:t}=i;return(e=t==null?void 0:t.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(i){var e;let{media:t}=i;return(e=t==null?void 0:t.paused)!=null?e:!0},set(i,e){var t;let{media:a}=e;a&&(i?a.pause():(t=a.play())==null||t.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(i,e){let{media:t}=i;return t?e?e.type==="playing":!t.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(i){var e;let{media:t}=i;return(e=t==null?void 0:t.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(i){var e;let{media:t}=i;return(e=t==null?void 0:t.playbackRate)!=null?e:1},set(i,e){let{media:t}=e;t&&Number.isFinite(+i)&&(t.playbackRate=+i)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(i){var e;let{media:t}=i;return(e=t==null?void 0:t.muted)!=null?e:!1},set(i,e){let{media:t}=e;if(t){try{d.localStorage.setItem("media-chrome-pref-muted",i?"true":"false")}catch(a){console.debug("Error setting muted pref",a)}t.muted=i}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(i,e)=>{let{options:{noMutedPref:t}}=e,{media:a}=e;if(!(!a||a.muted||t))try{let r=d.localStorage.getItem("media-chrome-pref-muted")==="true";Mi.mediaMuted.set(r,e),i(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaVolume:{get(i){var e;let{media:t}=i;return(e=t==null?void 0:t.volume)!=null?e:1},set(i,e){let{media:t}=e;if(t){try{i==null?d.localStorage.removeItem("media-chrome-pref-volume"):d.localStorage.setItem("media-chrome-pref-volume",i.toString())}catch(a){console.debug("Error setting volume pref",a)}Number.isFinite(+i)&&(t.volume=+i)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(i,e)=>{let{options:{noVolumePref:t}}=e;if(!t)try{let{media:a}=e;if(!a)return;let r=d.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;Mi.mediaVolume.set(+r,e),i(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(i){let{media:e}=i;return typeof(e==null?void 0:e.volume)=="undefined"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(i){var e;let{media:t}=i;return(e=t==null?void 0:t.currentTime)!=null?e:0},set(i,e){let{media:t}=e;!t||!Ai(i)||(t.currentTime=i)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(i){let{media:e,options:{defaultDuration:t}={}}=i;return t&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?t:Number.isFinite(e==null?void 0:e.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(i){let{media:e}=i;return(e==null?void 0:e.readyState)<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(i){var e;let{media:t}=i;if(!((e=t==null?void 0:t.seekable)!=null&&e.length))return;let a=t.seekable.start(0),r=t.seekable.end(t.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(i){var e;let{media:t}=i,a=(e=t==null?void 0:t.buffered)!=null?e:[];return Array.from(a).map((r,n)=>[Number(a.start(n).toFixed(3)),Number(a.end(n).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(i){let{media:e,options:{defaultStreamType:t}={}}=i,a=[xe.LIVE,xe.ON_DEMAND].includes(t)?t:void 0;if(!e)return a;let{streamType:r}=e;if(qh.includes(r))return r===xe.UNKNOWN?a:r;let n=e.duration;return n===1/0?xe.LIVE:Number.isFinite(n)?xe.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(i){let{media:e}=i;if(!e)return Number.NaN;let{targetLiveWindow:t}=e,a=Mi.mediaStreamType.get(i);return(t==null||Number.isNaN(t))&&a===xe.LIVE?0:t},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(i){let{media:e,options:{liveEdgeOffset:t=10}={}}=i;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Mi.mediaStreamType.get(i)===xe.LIVE))return!1;let r=e.seekable;if(!r)return!0;if(!r.length)return!1;let n=r.end(r.length-1)-t;return e.currentTime>=n},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(i){return Ci(i).map(({kind:e,label:t,language:a})=>({kind:e,label:t,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(i){return $o(i).map(({kind:e,label:t,language:a})=>({kind:e,label:t,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(i,e)=>{var t,a;let{media:r,options:n}=e;if(!r)return;let s=l=>{var u;!n.defaultSubtitles||l&&![fe.CAPTIONS,fe.SUBTITLES].includes((u=l==null?void 0:l.track)==null?void 0:u.kind)||wr(e,!0)};return r.addEventListener("loadstart",s),(t=r.textTracks)==null||t.addEventListener("addtrack",s),(a=r.textTracks)==null||a.addEventListener("removetrack",s),()=>{var l,u;r.removeEventListener("loadstart",s),(l=r.textTracks)==null||l.removeEventListener("addtrack",s),(u=r.textTracks)==null||u.removeEventListener("removetrack",s)}}]},mediaChaptersCues:{get(i){var e;let{media:t}=i;if(!t)return[];let[a]=Yt(t,{kind:fe.CHAPTERS});return Array.from((e=a==null?void 0:a.cues)!=null?e:[]).map(({text:r,startTime:n,endTime:s})=>({text:r,startTime:n,endTime:s}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(i,e)=>{var t;let{media:a}=e;if(!a)return;let r=a.querySelector('track[kind="chapters"][default][src]'),n=(t=a.shadowRoot)==null?void 0:t.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r==null||r.addEventListener("load",i),n==null||n.addEventListener("load",i),()=>{r==null||r.removeEventListener("load",i),n==null||n.removeEventListener("load",i)}}]},mediaIsPip:{get(i){var e,t;let{media:a,documentElement:r}=i;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?ue(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let n=r.pictureInPictureElement.shadowRoot;for(;n!=null&&n.pictureInPictureElement;){if(n.pictureInPictureElement===a)return!0;n=(t=n.pictureInPictureElement)==null?void 0:t.shadowRoot}}return!1},set(i,e){let{media:t}=e;if(t)if(i){if(!h.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!t.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}let a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};t.requestPictureInPicture().catch(r=>{if(r.code===11){if(!t.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(t.readyState===0&&t.preload==="none"){let n=()=>{t.removeEventListener("loadedmetadata",s),t.preload="none"},s=()=>{t.requestPictureInPicture().catch(a),n()};t.addEventListener("loadedmetadata",s),t.preload="metadata",setTimeout(()=>{t.readyState===0&&a(),n()},1e3)}else throw r}else throw r})}else h.pictureInPictureElement&&h.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(i){var e;let{media:t}=i;return[...(e=t==null?void 0:t.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(i){var e,t,a;let{media:r}=i;return(a=(t=r==null?void 0:r.videoRenditions)==null?void 0:t[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(i,e){let{media:t}=e;if(!(t!=null&&t.videoRenditions)){console.warn("MediaController: Rendition selection not supported by this media.");return}let a=i,r=Array.prototype.findIndex.call(t.videoRenditions,n=>n.id==a);t.videoRenditions.selectedIndex!=r&&(t.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(i){var e;let{media:t}=i;return[...(e=t==null?void 0:t.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(i){var e,t;let{media:a}=i;return(t=[...(e=a==null?void 0:a.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:t.id},set(i,e){let{media:t}=e;if(!(t!=null&&t.audioTracks)){console.warn("MediaChrome: Audio track selection not supported by this media.");return}let a=i;for(let r of t.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(i){return du(i)},set(i,e){i?su(e):lu(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(i){var e;let{media:t}=i;return!(t!=null&&t.remote)||((e=t.remote)==null?void 0:e.state)==="disconnected"?!1:!!t.remote.state},set(i,e){var t,a;let{media:r}=e;if(r&&!(i&&((t=r.remote)==null?void 0:t.state)!=="disconnected")&&!(!i&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(i,e){let{media:t}=e;if(t){if(!(t.webkitShowPlaybackTargetPicker&&d.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}t.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(i){let{media:e}=i;if(!mu||!Wo(e))return Te.UNSUPPORTED}},mediaPipUnavailable:{get(i){let{media:e}=i;if(!hu||!Ho(e))return Te.UNSUPPORTED}},mediaVolumeUnavailable:{get(i){let{media:e}=i;if(xr===!1||(e==null?void 0:e.volume)==null)return Te.UNSUPPORTED},stateOwnersUpdateHandlers:[i=>{xr==null&&Zh.then(e=>i(e?void 0:Te.UNSUPPORTED))}]},mediaCastUnavailable:{get(i,{availability:e="not-available"}={}){var t;let{media:a}=i;if(!fu||!((t=a==null?void 0:a.remote)!=null&&t.state))return Te.UNSUPPORTED;if(!(e==null||e==="available"))return Te.UNAVAILABLE},stateOwnersUpdateHandlers:[(i,e)=>{var t;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(t=a==null?void 0:a.remote)==null||t.watchAvailability(n=>{i({availability:n?"available":"not-available"})}).catch(n=>{n.name==="NotSupportedError"?i({availability:null}):i({availability:"not-available"})}),()=>{var n;(n=a==null?void 0:a.remote)==null||n.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(i,e){if(!pu)return Te.UNSUPPORTED;if((e==null?void 0:e.availability)==="not-available")return Te.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(i,e)=>{var t;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(t=a==null?void 0:a.remote)==null||t.watchAvailability(n=>{i({availability:n?"available":"not-available"})}).catch(n=>{n.name==="NotSupportedError"?i({availability:null}):i({availability:"not-available"})}),()=>{var n;(n=a==null?void 0:a.remote)==null||n.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(i){var e;let{media:t}=i;if(!(t!=null&&t.videoRenditions))return Te.UNSUPPORTED;if(!((e=t.videoRenditions)!=null&&e.length))return Te.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(i){var e,t;let{media:a}=i;if(!(a!=null&&a.audioTracks))return Te.UNSUPPORTED;if(((t=(e=a.audioTracks)==null?void 0:e.length)!=null?t:0)<=1)return Te.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]}};var Eu={[f.MEDIA_PREVIEW_REQUEST](i,e,{detail:t}){var a,r,n;let{media:s}=e,l=t!=null?t:void 0,u,c;if(s&&l!=null){let[E]=Yt(s,{kind:fe.METADATA,label:"thumbnails"}),O=Array.prototype.find.call((a=E==null?void 0:E.cues)!=null?a:[],(y,C,U)=>C===0?y.endTime>l:C===U.length-1?y.startTime<=l:y.startTime<=l&&y.endTime>l);if(O){let y=/'^(?:[a-z]+:)?\/\//i.test(O.text)||(r=s==null?void 0:s.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,C=new URL(O.text,y);c=new URLSearchParams(C.hash).get("#xywh").split(",").map(z=>+z),u=C.href}}let A=i.mediaDuration.get(e),p=(n=i.mediaChaptersCues.get(e).find((E,O,y)=>O===y.length-1&&A===E.endTime?E.startTime<=l&&E.endTime>=l:E.startTime<=l&&E.endTime>l))==null?void 0:n.text;return t!=null&&p==null&&(p=""),{mediaPreviewTime:l,mediaPreviewImage:u,mediaPreviewCoords:c,mediaPreviewChapter:p}},[f.MEDIA_PAUSE_REQUEST](i,e){i["mediaPaused"].set(!0,e)},[f.MEDIA_PLAY_REQUEST](i,e){var t,a,r,n;let s="mediaPaused",u=i.mediaStreamType.get(e)===xe.LIVE,c=!((t=e.options)!=null&&t.noAutoSeekToLive),A=i.mediaTargetLiveWindow.get(e)>0;if(u&&c&&!A){let _=(a=i.mediaSeekable.get(e))==null?void 0:a[1];if(_){let p=(n=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?n:0,E=_-p;i.mediaCurrentTime.set(E,e)}}i[s].set(!1,e)},[f.MEDIA_PLAYBACK_RATE_REQUEST](i,e,{detail:t}){let a="mediaPlaybackRate",r=t;i[a].set(r,e)},[f.MEDIA_MUTE_REQUEST](i,e){i["mediaMuted"].set(!0,e)},[f.MEDIA_UNMUTE_REQUEST](i,e){let t="mediaMuted";i.mediaVolume.get(e)||i.mediaVolume.set(.25,e),i[t].set(!1,e)},[f.MEDIA_VOLUME_REQUEST](i,e,{detail:t}){let a="mediaVolume",r=t;r&&i.mediaMuted.get(e)&&i.mediaMuted.set(!1,e),i[a].set(r,e)},[f.MEDIA_SEEK_REQUEST](i,e,{detail:t}){let a="mediaCurrentTime",r=t;i[a].set(r,e)},[f.MEDIA_SEEK_TO_LIVE_REQUEST](i,e){var t,a,r;let n="mediaCurrentTime",s=(t=i.mediaSeekable.get(e))==null?void 0:t[1];if(Number.isNaN(Number(s)))return;let l=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,u=s-l;i[n].set(u,e)},[f.MEDIA_SHOW_SUBTITLES_REQUEST](i,e,{detail:t}){var a;let{options:r}=e,n=Ci(e),s=Uo(t),l=(a=s[0])==null?void 0:a.language;l&&!r.noSubtitlesLangPref&&d.localStorage.setItem("media-chrome-pref-subtitles-lang",l),Gt(gt.SHOWING,n,s)},[f.MEDIA_DISABLE_SUBTITLES_REQUEST](i,e,{detail:t}){let a=Ci(e),r=t!=null?t:[];Gt(gt.DISABLED,a,r)},[f.MEDIA_TOGGLE_SUBTITLES_REQUEST](i,e,{detail:t}){wr(e,t)},[f.MEDIA_RENDITION_REQUEST](i,e,{detail:t}){let a="mediaRenditionSelected",r=t;i[a].set(r,e)},[f.MEDIA_AUDIO_TRACK_REQUEST](i,e,{detail:t}){let a="mediaAudioTrackEnabled",r=t;i[a].set(r,e)},[f.MEDIA_ENTER_PIP_REQUEST](i,e){let t="mediaIsPip";i.mediaIsFullscreen.get(e)&&i.mediaIsFullscreen.set(!1,e),i[t].set(!0,e)},[f.MEDIA_EXIT_PIP_REQUEST](i,e){i["mediaIsPip"].set(!1,e)},[f.MEDIA_ENTER_FULLSCREEN_REQUEST](i,e){let t="mediaIsFullscreen";i.mediaIsPip.get(e)&&i.mediaIsPip.set(!1,e),i[t].set(!0,e)},[f.MEDIA_EXIT_FULLSCREEN_REQUEST](i,e){i["mediaIsFullscreen"].set(!1,e)},[f.MEDIA_ENTER_CAST_REQUEST](i,e){let t="mediaIsCasting";i.mediaIsFullscreen.get(e)&&i.mediaIsFullscreen.set(!1,e),i[t].set(!0,e)},[f.MEDIA_EXIT_CAST_REQUEST](i,e){i["mediaIsCasting"].set(!1,e)},[f.MEDIA_AIRPLAY_REQUEST](i,e){i["mediaIsAirplaying"].set(!0,e)}};var bu=({media:i,fullscreenElement:e,documentElement:t,stateMediator:a=Mi,requestMap:r=Eu,options:n={},monitorStateOwnersOnlyWithSubscriptions:s=!0})=>{let l=[],u={options:{...n}},c=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),A=y=>{y!=null&&(Rr(y,c)||(c=Object.freeze({...c,...y}),l.forEach(C=>C(c))))},_=()=>{let y=Object.entries(a).reduce((C,[U,{get:z}])=>(C[U]=z(u),C),{});A(y)},p={},E,O=async(y,C)=>{var U,z,se,we,Ie,Et,bt,Bt,Ht,jl,ed,td,id,ad,rd,nd;let nh=!!E;if(E={...u,...E!=null?E:{},...y},nh)return;await vu(...Object.values(y));let Ei=l.length>0&&C===0&&s,od=u.media!==E.media,sd=((U=u.media)==null?void 0:U.textTracks)!==((z=E.media)==null?void 0:z.textTracks),ld=((se=u.media)==null?void 0:se.videoRenditions)!==((we=E.media)==null?void 0:we.videoRenditions),dd=((Ie=u.media)==null?void 0:Ie.audioTracks)!==((Et=E.media)==null?void 0:Et.audioTracks),ud=((bt=u.media)==null?void 0:bt.remote)!==((Bt=E.media)==null?void 0:Bt.remote),cd=u.documentElement!==E.documentElement,md=!!u.media&&(od||Ei),hd=!!((Ht=u.media)!=null&&Ht.textTracks)&&(sd||Ei),pd=!!((jl=u.media)!=null&&jl.videoRenditions)&&(ld||Ei),fd=!!((ed=u.media)!=null&&ed.audioTracks)&&(dd||Ei),vd=!!((td=u.media)!=null&&td.remote)&&(ud||Ei),Ed=!!u.documentElement&&(cd||Ei),bd=md||hd||pd||fd||vd||Ed,bi=l.length===0&&C===1&&s,gd=!!E.media&&(od||bi),_d=!!((id=E.media)!=null&&id.textTracks)&&(sd||bi),Ad=!!((ad=E.media)!=null&&ad.videoRenditions)&&(ld||bi),Td=!!((rd=E.media)!=null&&rd.audioTracks)&&(dd||bi),yd=!!((nd=E.media)!=null&&nd.remote)&&(ud||bi),kd=!!E.documentElement&&(cd||bi),Sd=gd||_d||Ad||Td||yd||kd;if(!(bd||Sd)){Object.entries(E).forEach(([F,na])=>{u[F]=na}),_(),E=void 0;return}Object.entries(a).forEach(([F,{get:na,mediaEvents:oh=[],textTracksEvents:sh=[],videoRenditionsEvents:lh=[],audioTracksEvents:dh=[],remoteEvents:uh=[],rootEvents:ch=[],stateOwnersUpdateHandlers:mh=[]}])=>{p[F]||(p[F]={});let ge=X=>{let _e=na(u,X);A({[F]:_e})},ee;ee=p[F].mediaEvents,oh.forEach(X=>{ee&&md&&(u.media.removeEventListener(X,ee),p[F].mediaEvents=void 0),gd&&(E.media.addEventListener(X,ge),p[F].mediaEvents=ge)}),ee=p[F].textTracksEvents,sh.forEach(X=>{var _e,Re;ee&&hd&&((_e=u.media.textTracks)==null||_e.removeEventListener(X,ee),p[F].textTracksEvents=void 0),_d&&((Re=E.media.textTracks)==null||Re.addEventListener(X,ge),p[F].textTracksEvents=ge)}),ee=p[F].videoRenditionsEvents,lh.forEach(X=>{var _e,Re;ee&&pd&&((_e=u.media.videoRenditions)==null||_e.removeEventListener(X,ee),p[F].videoRenditionsEvents=void 0),Ad&&((Re=E.media.videoRenditions)==null||Re.addEventListener(X,ge),p[F].videoRenditionsEvents=ge)}),ee=p[F].audioTracksEvents,dh.forEach(X=>{var _e,Re;ee&&fd&&((_e=u.media.audioTracks)==null||_e.removeEventListener(X,ee),p[F].audioTracksEvents=void 0),Td&&((Re=E.media.audioTracks)==null||Re.addEventListener(X,ge),p[F].audioTracksEvents=ge)}),ee=p[F].remoteEvents,uh.forEach(X=>{var _e,Re;ee&&vd&&((_e=u.media.remote)==null||_e.removeEventListener(X,ee),p[F].remoteEvents=void 0),yd&&((Re=E.media.remote)==null||Re.addEventListener(X,ge),p[F].remoteEvents=ge)}),ee=p[F].rootEvents,ch.forEach(X=>{ee&&Ed&&(u.documentElement.removeEventListener(X,ee),p[F].rootEvents=void 0),kd&&(E.documentElement.addEventListener(X,ge),p[F].rootEvents=ge)});let Id=p[F].stateOwnersUpdateHandlers;mh.forEach(X=>{Id&&bd&&Id(),Sd&&(p[F].stateOwnersUpdateHandlers=X(ge,E))})}),Object.entries(E).forEach(([F,na])=>{u[F]=na}),_(),E=void 0};return O({media:i,fullscreenElement:e,documentElement:t,options:n}),{dispatch(y){let{type:C,detail:U}=y;if(r[C]&&c.mediaErrorCode==null){A(r[C](a,u,y));return}C==="mediaelementchangerequest"?O({media:U}):C==="fullscreenelementchangerequest"?O({fullscreenElement:U}):C==="documentelementchangerequest"?O({documentElement:U}):C==="optionschangerequest"&&Object.entries(U!=null?U:{}).forEach(([z,se])=>{u.options[z]=se})},getState(){return c},subscribe(y){return O({},l.length+1),l.push(y),y(c),()=>{let C=l.indexOf(y);C>=0&&(O({},l.length-1),l.splice(C,1))}}}};var Go=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},N=(i,e,t)=>(Go(i,e,"read from private field"),t?t.call(i):e.get(i)),ut=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Tt=(i,e,t,a)=>(Go(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),yt=(i,e,t)=>(Go(i,e,"access private method"),t),Zt,Ea,V,ba,Fe,Dr,Or,Fo,Li,ga,Nr,Vo,yu=["ArrowLeft","ArrowRight","Enter"," ","f","m","k","c"],gu=10,g={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYS_USED:"keysused",LIVE_EDGE_OFFSET:"liveedgeoffset",SEEK_TO_LIVE_OFFSET:"seektoliveoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_HOTKEYS:"nohotkeys",NO_VOLUME_PREF:"novolumepref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_DEFAULT_STORE:"nodefaultstore",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",LANG:"lang"},Pr=class extends pa{constructor(){super(),ut(this,Or),ut(this,Li),ut(this,Nr),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,ut(this,Zt,new $e(this,g.HOTKEYS)),ut(this,Ea,void 0),ut(this,V,void 0),ut(this,ba,void 0),ut(this,Fe,void 0),ut(this,Dr,t=>{var a;(a=N(this,V))==null||a.dispatch(t)}),this.associateElement(this);let e={};Tt(this,ba,t=>{Object.entries(t).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);let n=a.toLowerCase(),s=new d.CustomEvent(Rd[n],{composed:!0,detail:r});this.dispatchEvent(s)}),e=t}),this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(g.NO_HOTKEYS,g.HOTKEYS,g.DEFAULT_STREAM_TYPE,g.DEFAULT_SUBTITLES,g.DEFAULT_DURATION,g.LANG)}get mediaStore(){return N(this,V)}set mediaStore(e){var t,a;if(N(this,V)&&((t=N(this,Fe))==null||t.call(this),Tt(this,Fe,void 0)),Tt(this,V,e),!N(this,V)&&!this.hasAttribute(g.NO_DEFAULT_STORE)){yt(this,Or,Fo).call(this);return}Tt(this,Fe,(a=N(this,V))==null?void 0:a.subscribe(N(this,ba)))}get fullscreenElement(){var e;return(e=N(this,Ea))!=null?e:this}set fullscreenElement(e){var t;this.hasAttribute(g.FULLSCREEN_ELEMENT)&&this.removeAttribute(g.FULLSCREEN_ELEMENT),Tt(this,Ea,e),(t=N(this,V))==null||t.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return S(this,g.DEFAULT_SUBTITLES)}set defaultSubtitles(e){I(this,g.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return M(this,g.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){L(this,g.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return x(this,g.DEFAULT_DURATION)}set defaultDuration(e){P(this,g.DEFAULT_DURATION,e)}get noHotkeys(){return S(this,g.NO_HOTKEYS)}set noHotkeys(e){I(this,g.NO_HOTKEYS,e)}get keysUsed(){return M(this,g.KEYS_USED)}set keysUsed(e){L(this,g.KEYS_USED,e)}get liveEdgeOffset(){return x(this,g.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){P(this,g.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return S(this,g.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){I(this,g.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return S(this,g.NO_VOLUME_PREF)}set noVolumePref(e){I(this,g.NO_VOLUME_PREF,e)}get noSubtitlesLangPref(){return S(this,g.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){I(this,g.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return S(this,g.NO_DEFAULT_STORE)}set noDefaultStore(e){I(this,g.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,t,a){var r,n,s,l,u,c,A,_;if(super.attributeChangedCallback(e,t,a),e===g.NO_HOTKEYS)a!==t&&a===""?(this.hasAttribute(g.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==t&&a===null&&this.enableHotkeys();else if(e===g.HOTKEYS)N(this,Zt).value=a;else if(e===g.DEFAULT_SUBTITLES&&a!==t)(r=N(this,V))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(g.DEFAULT_SUBTITLES)}});else if(e===g.DEFAULT_STREAM_TYPE)(s=N(this,V))==null||s.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(n=this.getAttribute(g.DEFAULT_STREAM_TYPE))!=null?n:void 0}});else if(e===g.LIVE_EDGE_OFFSET)(l=N(this,V))==null||l.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(g.LIVE_EDGE_OFFSET)?+this.getAttribute(g.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(g.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(g.LIVE_EDGE_OFFSET)}});else if(e===g.SEEK_TO_LIVE_OFFSET)(u=N(this,V))==null||u.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(g.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(g.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===g.NO_AUTO_SEEK_TO_LIVE)(c=N(this,V))==null||c.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(g.NO_AUTO_SEEK_TO_LIVE)}});else if(e===g.FULLSCREEN_ELEMENT){let p=a?(A=this.getRootNode())==null?void 0:A.getElementById(a):void 0;Tt(this,Ea,p),(_=N(this,V))==null||_.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===g.LANG&&a!==t&&Fd(a)}connectedCallback(){var e,t;!N(this,V)&&!this.hasAttribute(g.NO_DEFAULT_STORE)&&yt(this,Or,Fo).call(this),(e=N(this,V))==null||e.dispatch({type:"documentelementchangerequest",detail:h}),super.connectedCallback(),N(this,V)&&!N(this,Fe)&&Tt(this,Fe,(t=N(this,V))==null?void 0:t.subscribe(N(this,ba))),this.enableHotkeys()}disconnectedCallback(){var e,t,a,r;(e=super.disconnectedCallback)==null||e.call(this),N(this,V)&&((t=N(this,V))==null||t.dispatch({type:"documentelementchangerequest",detail:void 0}),(a=N(this,V))==null||a.dispatch({type:f.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})),N(this,Fe)&&((r=N(this,Fe))==null||r.call(this),Tt(this,Fe,void 0))}mediaSetCallback(e){var t;super.mediaSetCallback(e),(t=N(this,V))==null||t.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var t;super.mediaUnsetCallback(e),(t=N(this,V))==null||t.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,t){Tu(this.mediaStateReceivers,e,t)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(t.has(e))return;let a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),n=ep(e,a,r);Object.values(f).forEach(s=>{e.addEventListener(s,N(this,Dr))}),t.set(e,n)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(!t.has(e))return;t.get(e)(),t.delete(e),Object.values(f).forEach(r=>{e.removeEventListener(r,N(this,Dr))})}registerMediaStateReceiver(e){if(!e)return;let t=this.mediaStateReceivers;t.indexOf(e)>-1||(t.push(e),N(this,V)&&Object.entries(N(this,V).getState()).forEach(([r,n])=>{Tu([e],r,n)}))}unregisterMediaStateReceiver(e){let t=this.mediaStateReceivers,a=t.indexOf(e);a<0||t.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",yt(this,Nr,Vo))}disableHotkeys(){this.removeEventListener("keydown",yt(this,Nr,Vo)),this.removeEventListener("keyup",yt(this,Li,ga))}get hotkeys(){return M(this,g.HOTKEYS)}set hotkeys(e){L(this,g.HOTKEYS,e)}keyboardShortcutHandler(e){var t,a,r,n,s;let l=e.target;if(((r=(a=(t=l.getAttribute(g.KEYS_USED))==null?void 0:t.split(" "))!=null?a:l==null?void 0:l.keysUsed)!=null?r:[]).map(p=>p==="Space"?" ":p).filter(Boolean).includes(e.key))return;let c,A,_;if(!N(this,Zt).contains(`no${e.key.toLowerCase()}`)&&!(e.key===" "&&N(this,Zt).contains("nospace")))switch(e.key){case" ":case"k":c=N(this,V).getState().mediaPaused?f.MEDIA_PLAY_REQUEST:f.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new d.CustomEvent(c,{composed:!0,bubbles:!0}));break;case"m":c=this.mediaStore.getState().mediaVolumeLevel==="off"?f.MEDIA_UNMUTE_REQUEST:f.MEDIA_MUTE_REQUEST,this.dispatchEvent(new d.CustomEvent(c,{composed:!0,bubbles:!0}));break;case"f":c=this.mediaStore.getState().mediaIsFullscreen?f.MEDIA_EXIT_FULLSCREEN_REQUEST:f.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new d.CustomEvent(c,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new d.CustomEvent(f.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":{let p=this.hasAttribute(g.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(g.KEYBOARD_BACKWARD_SEEK_OFFSET):gu;A=Math.max(((n=this.mediaStore.getState().mediaCurrentTime)!=null?n:0)-p,0),_=new d.CustomEvent(f.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:A}),this.dispatchEvent(_);break}case"ArrowRight":{let p=this.hasAttribute(g.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(g.KEYBOARD_FORWARD_SEEK_OFFSET):gu;A=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)+p,0),_=new d.CustomEvent(f.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:A}),this.dispatchEvent(_);break}default:break}}};Zt=new WeakMap;Ea=new WeakMap;V=new WeakMap;ba=new WeakMap;Fe=new WeakMap;Dr=new WeakMap;Or=new WeakSet;Fo=function(){var i;this.mediaStore=bu({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(g.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(g.DEFAULT_DURATION)?+this.getAttribute(g.DEFAULT_DURATION):void 0,defaultStreamType:(i=this.getAttribute(g.DEFAULT_STREAM_TYPE))!=null?i:void 0,liveEdgeOffset:this.hasAttribute(g.LIVE_EDGE_OFFSET)?+this.getAttribute(g.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(g.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(g.SEEK_TO_LIVE_OFFSET):this.hasAttribute(g.LIVE_EDGE_OFFSET)?+this.getAttribute(g.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(g.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(g.NO_VOLUME_PREF),noSubtitlesLangPref:this.hasAttribute(g.NO_SUBTITLES_LANG_PREF)}})};Li=new WeakSet;ga=function(i){let{key:e}=i;if(!yu.includes(e)){this.removeEventListener("keyup",yt(this,Li,ga));return}this.keyboardShortcutHandler(i)};Nr=new WeakSet;Vo=function(i){let{metaKey:e,altKey:t,key:a}=i;if(e||t||!yu.includes(a)){this.removeEventListener("keyup",yt(this,Li,ga));return}[" ","ArrowLeft","ArrowRight"].includes(a)&&!(N(this,Zt).contains(`no${a.toLowerCase()}`)||a===" "&&N(this,Zt).contains("nospace"))&&i.preventDefault(),this.addEventListener("keyup",yt(this,Li,ga),{once:!0})};var zh=Object.values(o),Qh=Object.values(So),ku=i=>{var e,t,a,r;let{observedAttributes:n}=i.constructor;!n&&((e=i.nodeName)!=null&&e.includes("-"))&&(d.customElements.upgrade(i),{observedAttributes:n}=i.constructor);let s=(r=(a=(t=i==null?void 0:i.getAttribute)==null?void 0:t.call(i,w.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(n||s)?(n||s).filter(l=>zh.includes(l)):[]},Xh=i=>{var e,t;return(e=i.nodeName)!=null&&e.includes("-")&&d.customElements.get((t=i.nodeName)==null?void 0:t.toLowerCase())&&!(i instanceof d.customElements.get(i.nodeName.toLowerCase()))&&d.customElements.upgrade(i),Qh.some(a=>a in i)},Ko=i=>Xh(i)||!!ku(i).length,_u=i=>{var e;return(e=i==null?void 0:i.join)==null?void 0:e.call(i,":")},Au={[o.MEDIA_SUBTITLES_LIST]:dt,[o.MEDIA_SUBTITLES_SHOWING]:dt,[o.MEDIA_SEEKABLE]:_u,[o.MEDIA_BUFFERED]:i=>i==null?void 0:i.map(_u).join(" "),[o.MEDIA_PREVIEW_COORDS]:i=>i==null?void 0:i.join(" "),[o.MEDIA_RENDITION_LIST]:Dd,[o.MEDIA_AUDIO_TRACK_LIST]:Nd},Jh=async(i,e,t)=>{var a,r;if(i.isConnected||await cr(0),typeof t=="boolean"||t==null)return I(i,e,t);if(typeof t=="number")return P(i,e,t);if(typeof t=="string")return L(i,e,t);if(Array.isArray(t)&&!t.length)return i.removeAttribute(e);let n=(r=(a=Au[e])==null?void 0:a.call(Au,t))!=null?r:t;return i.setAttribute(e,n)},jh=i=>{var e;return!!((e=i.closest)!=null&&e.call(i,'*[slot="media"]'))},qt=(i,e)=>{if(jh(i))return;let t=(r,n)=>{var s,l;Ko(r)&&n(r);let{children:u=[]}=r!=null?r:{},c=(l=(s=r==null?void 0:r.shadowRoot)==null?void 0:s.children)!=null?l:[];[...u,...c].forEach(_=>qt(_,n))},a=i==null?void 0:i.nodeName.toLowerCase();if(a.includes("-")&&!Ko(i)){d.customElements.whenDefined(a).then(()=>{t(i,e)});return}t(i,e)},Tu=(i,e,t)=>{i.forEach(a=>{if(e in a){a[e]=t;return}let r=ku(a),n=e.toLowerCase();r.includes(n)&&Jh(a,n,t)})},ep=(i,e,t)=>{qt(i,e);let a=A=>{var _;let p=(_=A==null?void 0:A.composedPath()[0])!=null?_:A.target;e(p)},r=A=>{var _;let p=(_=A==null?void 0:A.composedPath()[0])!=null?_:A.target;t(p)};i.addEventListener(f.REGISTER_MEDIA_STATE_RECEIVER,a),i.addEventListener(f.UNREGISTER_MEDIA_STATE_RECEIVER,r);let n=A=>{A.forEach(_=>{let{addedNodes:p=[],removedNodes:E=[],type:O,target:y,attributeName:C}=_;O==="childList"?(Array.prototype.forEach.call(p,U=>qt(U,e)),Array.prototype.forEach.call(E,U=>qt(U,t))):O==="attributes"&&C===w.MEDIA_CHROME_ATTRIBUTES&&(Ko(y)?e(y):t(y))})},s=[],l=A=>{let _=A.target;_.name!=="media"&&(s.forEach(p=>qt(p,t)),s=[..._.assignedElements({flatten:!0})],s.forEach(p=>qt(p,e)))};i.addEventListener("slotchange",l);let u=new MutationObserver(n);return u.observe(i,{childList:!0,attributes:!0,subtree:!0}),()=>{qt(i,t),i.removeEventListener("slotchange",l),u.disconnect(),i.removeEventListener(f.REGISTER_MEDIA_STATE_RECEIVER,a),i.removeEventListener(f.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};d.customElements.get("media-controller")||d.customElements.define("media-controller",Pr);var Yo=Pr;var Zo=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},J=(i,e,t)=>(Zo(i,e,"read from private field"),t?t.call(i):e.get(i)),wi=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Ur=(i,e,t,a)=>(Zo(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),tp=(i,e,t)=>(Zo(i,e,"access private method"),t),Ve,xi,St,Ri,Br,qo,Su,kt={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"},Iu=h.createElement("template");Iu.innerHTML=`
<style>
  :host {
    position: relative;
    font: var(--media-font,
      var(--media-font-weight, bold)
      var(--media-font-size, 14px) /
      var(--media-text-content-height, var(--media-control-height, 24px))
      var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
    color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
    background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
    padding: var(--media-button-padding, var(--media-control-padding, 10px));
    justify-content: var(--media-button-justify-content, center);
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    box-sizing: border-box;
    transition: background .15s linear;
    pointer-events: auto;
    cursor: var(--media-cursor, pointer);
    -webkit-tap-highlight-color: transparent;
  }

  
  :host(:focus-visible) {
    box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
    outline: 0;
  }
  
  :host(:where(:focus)) {
    box-shadow: none;
    outline: 0;
  }

  :host(:hover) {
    background: var(--media-control-hover-background, rgba(50 50 70 / .7));
  }

  svg, img, ::slotted(svg), ::slotted(img) {
    width: var(--media-button-icon-width);
    height: var(--media-button-icon-height, var(--media-control-height, 24px));
    transform: var(--media-button-icon-transform);
    transition: var(--media-button-icon-transition);
    fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
    min-width: 100%;
  }

  media-tooltip {
    
    max-width: 0;
    overflow-x: clip;
    opacity: 0;
    transition: opacity .3s, max-width 0s 9s;
  }

  :host(:hover) media-tooltip,
  :host(:focus-visible) media-tooltip {
    max-width: 100vw;
    opacity: 1;
    transition: opacity .3s;
  }

  :host([notooltip]) slot[name="tooltip"] {
    display: none;
  }
</style>

<slot name="tooltip">
  <media-tooltip part="tooltip" aria-hidden="true">
    <slot name="tooltip-content"></slot>
  </media-tooltip>
</slot>
`;var K=class extends d.HTMLElement{constructor(e={}){var t;if(super(),wi(this,qo),wi(this,Ve,void 0),this.preventClick=!1,this.tooltipEl=null,this.tooltipContent="",wi(this,xi,a=>{this.preventClick||this.handleClick(a),setTimeout(J(this,St),0)}),wi(this,St,()=>{var a,r;(r=(a=this.tooltipEl)==null?void 0:a.updateXOffset)==null||r.call(a)}),wi(this,Ri,a=>{let{key:r}=a;if(!this.keysUsed.includes(r)){this.removeEventListener("keyup",J(this,Ri));return}this.preventClick||this.handleClick(a)}),wi(this,Br,a=>{let{metaKey:r,altKey:n,key:s}=a;if(r||n||!this.keysUsed.includes(s)){this.removeEventListener("keyup",J(this,Ri));return}this.addEventListener("keyup",J(this,Ri),{once:!0})}),!this.shadowRoot){this.attachShadow({mode:"open"});let a=Iu.content.cloneNode(!0);this.nativeEl=a;let r=e.slotTemplate;r||(r=h.createElement("template"),r.innerHTML=`<slot>${e.defaultContent||""}</slot>`),e.tooltipContent&&(a.querySelector('slot[name="tooltip-content"]').innerHTML=(t=e.tooltipContent)!=null?t:"",this.tooltipContent=e.tooltipContent),this.nativeEl.appendChild(r.content.cloneNode(!0)),this.shadowRoot.appendChild(a)}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",kt.TOOLTIP_PLACEMENT,w.MEDIA_CONTROLLER]}enable(){this.addEventListener("click",J(this,xi)),this.addEventListener("keydown",J(this,Br)),this.tabIndex=0}disable(){this.removeEventListener("click",J(this,xi)),this.removeEventListener("keydown",J(this,Br)),this.removeEventListener("keyup",J(this,Ri)),this.tabIndex=-1}attributeChangedCallback(e,t,a){var r,n,s,l,u;e===w.MEDIA_CONTROLLER?(t&&((n=(r=J(this,Ve))==null?void 0:r.unassociateElement)==null||n.call(r,this),Ur(this,Ve,null)),a&&this.isConnected&&(Ur(this,Ve,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(u=(l=J(this,Ve))==null?void 0:l.associateElement)==null||u.call(l,this))):e==="disabled"&&a!==t?a==null?this.enable():this.disable():e===kt.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==t&&(this.tooltipEl.placement=a),J(this,St).call(this)}connectedCallback(){var e,t,a;let{style:r}=$(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");let n=this.getAttribute(w.MEDIA_CONTROLLER);n&&(Ur(this,Ve,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(t=J(this,Ve))==null?void 0:t.associateElement)==null||a.call(t,this)),d.customElements.whenDefined("media-tooltip").then(()=>tp(this,qo,Su).call(this))}disconnectedCallback(){var e,t;this.disable(),(t=(e=J(this,Ve))==null?void 0:e.unassociateElement)==null||t.call(e,this),Ur(this,Ve,null),this.removeEventListener("mouseenter",J(this,St)),this.removeEventListener("focus",J(this,St)),this.removeEventListener("click",J(this,xi))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return M(this,kt.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){L(this,kt.TOOLTIP_PLACEMENT,e)}get mediaController(){return M(this,w.MEDIA_CONTROLLER)}set mediaController(e){L(this,w.MEDIA_CONTROLLER,e)}get disabled(){return S(this,kt.DISABLED)}set disabled(e){I(this,kt.DISABLED,e)}get noTooltip(){return S(this,kt.NO_TOOLTIP)}set noTooltip(e){I(this,kt.NO_TOOLTIP,e)}handleClick(e){}};Ve=new WeakMap;xi=new WeakMap;St=new WeakMap;Ri=new WeakMap;Br=new WeakMap;qo=new WeakSet;Su=function(){this.addEventListener("mouseenter",J(this,St)),this.addEventListener("focus",J(this,St)),this.addEventListener("click",J(this,xi));let i=this.tooltipPlacement;i&&this.tooltipEl&&(this.tooltipEl.placement=i)};d.customElements.get("media-chrome-button")||d.customElements.define("media-chrome-button",K);var Cu=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`,Lu=h.createElement("template");Lu.innerHTML=`
  <style>
    :host([${o.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
      display: none !important;
    }

    
    :host(:not([${o.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
      display: none !important;
    }

    :host([${o.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
    :host(:not([${o.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="enter">${Cu}</slot>
    <slot name="exit">${Cu}</slot>
  </slot>
`;var ip=`
  <slot name="tooltip-enter">${v("start airplay")}</slot>
  <slot name="tooltip-exit">${v("stop airplay")}</slot>
`,Mu=i=>{let e=i.mediaIsAirplaying?v("stop airplay"):v("start airplay");i.setAttribute("aria-label",e)},zo=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_IS_AIRPLAYING,o.MEDIA_AIRPLAY_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Lu,tooltipContent:ip,...e})}connectedCallback(){super.connectedCallback(),Mu(this)}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_IS_AIRPLAYING&&Mu(this)}get mediaIsAirplaying(){return S(this,o.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){I(this,o.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return M(this,o.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){L(this,o.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new d.CustomEvent(f.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};d.customElements.get("media-airplay-button")||d.customElements.define("media-airplay-button",zo);var ap=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,rp=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,Du=h.createElement("template");Du.innerHTML=`
  <style>
    :host([aria-checked="true"]) slot[name=off] {
      display: none !important;
    }

    
    :host(:not([aria-checked="true"])) slot[name=on] {
      display: none !important;
    }

    :host([aria-checked="true"]) slot[name=tooltip-enable],
    :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="on">${ap}</slot>
    <slot name="off">${rp}</slot>
  </slot>
`;var np=`
  <slot name="tooltip-enable">${v("Enable captions")}</slot>
  <slot name="tooltip-disable">${v("Disable captions")}</slot>
`,wu=i=>{i.setAttribute("aria-checked",Mr(i).toString())},Qo=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_SUBTITLES_LIST,o.MEDIA_SUBTITLES_SHOWING]}constructor(e={}){super({slotTemplate:Du,tooltipContent:np,...e}),this._captionsReady=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",v("closed captions")),wu(this)}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_SUBTITLES_SHOWING&&wu(this)}get mediaSubtitlesList(){return Ru(this,o.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){xu(this,o.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Ru(this,o.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){xu(this,o.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new d.CustomEvent(f.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}},Ru=(i,e)=>{let t=i.getAttribute(e);return t?Kt(t):[]},xu=(i,e,t)=>{if(!(t!=null&&t.length)){i.removeAttribute(e);return}let a=dt(t);i.getAttribute(e)!==a&&i.setAttribute(e,a)};d.customElements.get("media-captions-button")||d.customElements.define("media-captions-button",Qo);var op='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',sp='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>',Nu=h.createElement("template");Nu.innerHTML=`
  <style>
  :host([${o.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
    display: none !important;
  }

  
  :host(:not([${o.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
    display: none !important;
  }

  :host([${o.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
    :host(:not([${o.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="enter">${op}</slot>
    <slot name="exit">${sp}</slot>
  </slot>
`;var lp=`
  <slot name="tooltip-enter">${v("Start casting")}</slot>
  <slot name="tooltip-exit">${v("Stop casting")}</slot>
`,Ou=i=>{let e=i.mediaIsCasting?v("stop casting"):v("start casting");i.setAttribute("aria-label",e)},Xo=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_IS_CASTING,o.MEDIA_CAST_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Nu,tooltipContent:lp,...e})}connectedCallback(){super.connectedCallback(),Ou(this)}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_IS_CASTING&&Ou(this)}get mediaIsCasting(){return S(this,o.MEDIA_IS_CASTING)}set mediaIsCasting(e){I(this,o.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return M(this,o.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){L(this,o.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?f.MEDIA_EXIT_CAST_REQUEST:f.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}};d.customElements.get("media-cast-button")||d.customElements.define("media-cast-button",Xo);var rs=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Qt=(i,e,t)=>(rs(i,e,"read from private field"),t?t.call(i):e.get(i)),ct=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},ns=(i,e,t,a)=>(rs(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),zt=(i,e,t)=>(rs(i,e,"access private method"),t),Wr,Aa,Xt,Hr,Jo,jo,Pu,es,Uu,ts,Bu,is,Hu,as,Wu;function dp(i){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(i)}
  `}function up(i){return`
    <slot id="content"></slot>
  `}var _a={OPEN:"open",ANCHOR:"anchor"},Jt=class extends d.HTMLElement{constructor(){super(),ct(this,Hr),ct(this,jo),ct(this,es),ct(this,ts),ct(this,is),ct(this,as),ct(this,Wr,!1),ct(this,Aa,null),ct(this,Xt,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[_a.OPEN,_a.ANCHOR]}get open(){return S(this,_a.OPEN)}set open(e){I(this,_a.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":zt(this,ts,Bu).call(this,e);break;case"focusout":zt(this,is,Hu).call(this,e);break;case"keydown":zt(this,as,Wu).call(this,e);break}}connectedCallback(){zt(this,Hr,Jo).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,t,a){zt(this,Hr,Jo).call(this),e===_a.OPEN&&a!==t&&(this.open?zt(this,jo,Pu).call(this):zt(this,es,Uu).call(this))}focus(){ns(this,Aa,da());let e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),t=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||t)return;let a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a==null||a.focus()}get keysUsed(){return["Escape","Tab"]}};Wr=new WeakMap;Aa=new WeakMap;Xt=new WeakMap;Hr=new WeakSet;Jo=function(){if(!Qt(this,Wr)&&(ns(this,Wr,!0),!this.shadowRoot)){this.attachShadow({mode:"open"});let i=Zd(this.attributes);this.shadowRoot.innerHTML=`
        ${this.constructor.getTemplateHTML(i)}
      `,queueMicrotask(()=>{let{style:e}=$(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};jo=new WeakSet;Pu=function(){var i;(i=Qt(this,Xt))==null||i.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};es=new WeakSet;Uu=function(){var i;(i=Qt(this,Xt))==null||i.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};ts=new WeakSet;Bu=function(i){ns(this,Xt,i.relatedTarget),ue(this,i.relatedTarget)||(this.open=!this.open)};is=new WeakSet;Hu=function(i){var e;ue(this,i.relatedTarget)||((e=Qt(this,Aa))==null||e.focus(),Qt(this,Xt)&&Qt(this,Xt)!==i.relatedTarget&&this.open&&(this.open=!1))};as=new WeakSet;Wu=function(i){var e,t,a,r,n;let{key:s,ctrlKey:l,altKey:u,metaKey:c}=i;l||u||c||this.keysUsed.includes(s)&&(i.preventDefault(),i.stopPropagation(),s==="Tab"?(i.shiftKey?(t=(e=this.previousElementSibling)==null?void 0:e.focus)==null||t.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):s==="Escape"&&((n=Qt(this,Aa))==null||n.focus(),this.open=!1))};Jt.getTemplateHTML=dp;Jt.getSlotTemplateHTML=up;d.customElements.get("media-chrome-dialog")||d.customElements.define("media-chrome-dialog",Jt);var ms=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Z=(i,e,t)=>(ms(i,e,"read from private field"),t?t.call(i):e.get(i)),re=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},It=(i,e,t,a)=>(ms(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),De=(i,e,t)=>(ms(i,e,"access private method"),t),Ke,Qr,$r,Fr,Oe,Zr,Vr,Kr,Gr,hs,$u,Yr,os,qr,ss,zr,ps,ls,Fu,ds,Vu,us,Ku,cs,Gu,Yu=h.createElement("template");Yu.innerHTML=`
  <style>
    :host {
      --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
      --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

      box-shadow: var(--_focus-visible-box-shadow, none);
      background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
      height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
      display: inline-flex;
      align-items: center;
      
      vertical-align: middle;
      box-sizing: border-box;
      position: relative;
      width: 100px;
      transition: background .15s linear;
      cursor: var(--media-cursor, pointer);
      pointer-events: auto;
      touch-action: none; 
    }

    
    input[type=range]:focus {
      outline: 0;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
      outline: 0;
    }

    :host(:hover) {
      background: var(--media-control-hover-background, rgb(50 50 70 / .7));
    }

    #leftgap {
      padding-left: var(--media-range-padding-left, var(--_media-range-padding));
    }

    #rightgap {
      padding-right: var(--media-range-padding-right, var(--_media-range-padding));
    }

    #startpoint,
    #endpoint {
      position: absolute;
    }

    #endpoint {
      right: 0;
    }

    #container {
      
      width: var(--media-range-track-width, 100%);
      transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      min-width: 40px;
    }

    #range {
      
      display: var(--media-time-range-hover-display, block);
      bottom: var(--media-time-range-hover-bottom, -7px);
      height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
      width: 100%;
      position: absolute;
      cursor: var(--media-cursor, pointer);

      -webkit-appearance: none; 
      -webkit-tap-highlight-color: transparent;
      background: transparent; 
      margin: 0;
      z-index: 1;
    }

    @media (hover: hover) {
      #range {
        bottom: var(--media-time-range-hover-bottom, -5px);
        height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
      }
    }

    
    
    #range::-webkit-slider-thumb {
      -webkit-appearance: none;
      background: transparent;
      width: .1px;
      height: .1px;
    }

    
    #range::-moz-range-thumb {
      background: transparent;
      border: transparent;
      width: .1px;
      height: .1px;
    }

    #appearance {
      height: var(--media-range-track-height, 4px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      position: absolute;
      
      will-change: transform;
    }

    #track {
      background: var(--media-range-track-background, rgb(255 255 255 / .2));
      border-radius: var(--media-range-track-border-radius, 1px);
      border: var(--media-range-track-border, none);
      outline: var(--media-range-track-outline);
      outline-offset: var(--media-range-track-outline-offset);
      backdrop-filter: var(--media-range-track-backdrop-filter);
      -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
      box-shadow: var(--media-range-track-box-shadow, none);
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    #progress,
    #pointer {
      position: absolute;
      height: 100%;
      will-change: width;
    }

    #progress {
      background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
      transition: var(--media-range-track-transition);
    }

    #pointer {
      background: var(--media-range-track-pointer-background);
      border-right: var(--media-range-track-pointer-border-right);
      transition: visibility .25s, opacity .25s;
      visibility: hidden;
      opacity: 0;
    }

    @media (hover: hover) {
      :host(:hover) #pointer {
        transition: visibility .5s, opacity .5s;
        visibility: visible;
        opacity: 1;
      }
    }

    #thumb,
    ::slotted([slot=thumb]) {
      width: var(--media-range-thumb-width, 10px);
      height: var(--media-range-thumb-height, 10px);
      transition: var(--media-range-thumb-transition);
      transform: var(--media-range-thumb-transform, none);
      opacity: var(--media-range-thumb-opacity, 1);
      translate: -50%;
      position: absolute;
      left: 0;
      cursor: var(--media-cursor, pointer);
    }

    #thumb {
      border-radius: var(--media-range-thumb-border-radius, 10px);
      background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
      box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
      border: var(--media-range-thumb-border, none);
    }

    :host([disabled]) #thumb {
      background-color: #777;
    }

    .segments #appearance {
      height: var(--media-range-segment-hover-height, 7px);
    }

    #track {
      clip-path: url(#segments-clipping);
    }

    #segments {
      --segments-gap: var(--media-range-segments-gap, 2px);
      position: absolute;
      width: 100%;
      height: 100%;
    }

    #segments-clipping {
      transform: translateX(calc(var(--segments-gap) / 2));
    }

    #segments-clipping:empty {
      display: none;
    }

    #segments-clipping rect {
      height: var(--media-range-track-height, 4px);
      y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
      transition: var(--media-range-segment-transition, transform .1s ease-in-out);
      transform: var(--media-range-segment-transform, scaleY(1));
      transform-origin: center;
    }
  </style>
  <div id="leftgap"></div>
  <div id="container">
    <div id="startpoint"></div>
    <div id="endpoint"></div>
    <div id="appearance">
      <div id="track" part="track">
        <div id="pointer"></div>
        <div id="progress" part="progress"></div>
      </div>
      <slot name="thumb">
        <div id="thumb" part="thumb"></div>
      </slot>
      <svg id="segments"><clipPath id="segments-clipping"></clipPath></svg>
    </div>
    <input id="range" type="range" min="0" max="1" step="any" value="0">
  </div>
  <div id="rightgap"></div>
`;var jt=class extends d.HTMLElement{constructor(){super(),re(this,hs),re(this,Yr),re(this,qr),re(this,zr),re(this,ls),re(this,ds),re(this,us),re(this,cs),re(this,Ke,void 0),re(this,Qr,void 0),re(this,$r,void 0),re(this,Fr,void 0),re(this,Oe,{}),re(this,Zr,[]),re(this,Vr,()=>{if(this.range.matches(":focus-visible")){let{style:e}=$(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),re(this,Kr,()=>{let{style:e}=$(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),re(this,Gr,()=>{let e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Yu.content.cloneNode(!0))),this.container=this.shadowRoot.querySelector("#container"),It(this,$r,this.shadowRoot.querySelector("#startpoint")),It(this,Fr,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",w.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,a){var r,n,s,l,u;e===w.MEDIA_CONTROLLER?(t&&((n=(r=Z(this,Ke))==null?void 0:r.unassociateElement)==null||n.call(r,this),It(this,Ke,null)),a&&this.isConnected&&(It(this,Ke,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(u=(l=Z(this,Ke))==null?void 0:l.associateElement)==null||u.call(l,this))):(e==="disabled"||e==="aria-disabled"&&t!==a)&&(a==null?(this.range.removeAttribute(e),De(this,Yr,os).call(this)):(this.range.setAttribute(e,a),De(this,qr,ss).call(this)))}connectedCallback(){var e,t,a;let{style:r}=$(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),Z(this,Oe).pointer=$(this.shadowRoot,"#pointer"),Z(this,Oe).progress=$(this.shadowRoot,"#progress"),Z(this,Oe).thumb=$(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),Z(this,Oe).activeSegment=$(this.shadowRoot,"#segments-clipping rect:nth-child(0)");let n=this.getAttribute(w.MEDIA_CONTROLLER);n&&(It(this,Ke,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(t=Z(this,Ke))==null?void 0:t.associateElement)==null||a.call(t,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",Z(this,Vr)),this.shadowRoot.addEventListener("focusout",Z(this,Kr)),De(this,Yr,os).call(this),ot(this.container,Z(this,Gr))}disconnectedCallback(){var e,t;De(this,qr,ss).call(this),(t=(e=Z(this,Ke))==null?void 0:e.unassociateElement)==null||t.call(e,this),It(this,Ke,null),this.shadowRoot.removeEventListener("focusin",Z(this,Vr)),this.shadowRoot.removeEventListener("focusout",Z(this,Kr)),st(this.container,Z(this,Gr))}updatePointerBar(e){var t;(t=Z(this,Oe).pointer)==null||t.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,t;let a=this.range.valueAsNumber*100;(e=Z(this,Oe).progress)==null||e.style.setProperty("width",`${a}%`),(t=Z(this,Oe).thumb)==null||t.style.setProperty("left",`${a}%`)}updateSegments(e){let t=this.shadowRoot.querySelector("#segments-clipping");if(t.textContent="",this.container.classList.toggle("segments",!!(e!=null&&e.length)),!(e!=null&&e.length))return;let a=[...new Set([+this.range.min,...e.flatMap(n=>[n.start,n.end]),+this.range.max])];It(this,Zr,[...a]);let r=a.pop();for(let[n,s]of a.entries()){let[l,u]=[n===0,n===a.length-1],c=l?"calc(var(--segments-gap) / -1)":`${s*100}%`,_=`calc(${((u?r:a[n+1])-s)*100}%${l||u?"":" - var(--segments-gap)"})`,p=h.createElementNS("http://www.w3.org/2000/svg","rect"),E=$(this.shadowRoot,`#segments-clipping rect:nth-child(${n+1})`);E.style.setProperty("x",c),E.style.setProperty("width",_),t.append(p)}}getPointerRatio(e){return zd(e.clientX,e.clientY,Z(this,$r).getBoundingClientRect(),Z(this,Fr).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":De(this,cs,Gu).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":De(this,ls,Fu).call(this,e);break;case"pointerdown":De(this,zr,ps).call(this,e);break;case"pointerup":De(this,ds,Vu).call(this);break;case"pointerleave":De(this,us,Ku).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}};Ke=new WeakMap;Qr=new WeakMap;$r=new WeakMap;Fr=new WeakMap;Oe=new WeakMap;Zr=new WeakMap;Vr=new WeakMap;Kr=new WeakMap;Gr=new WeakMap;hs=new WeakSet;$u=function(i){let e=Z(this,Oe).activeSegment;if(!e)return;let t=this.getPointerRatio(i),r=`#segments-clipping rect:nth-child(${Z(this,Zr).findIndex((n,s,l)=>{let u=l[s+1];return u!=null&&t>=n&&t<=u})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};Yr=new WeakSet;os=function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};qr=new WeakSet;ss=function(){var i,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),(i=d.window)==null||i.removeEventListener("pointerup",this),(e=d.window)==null||e.removeEventListener("pointermove",this)};zr=new WeakSet;ps=function(i){var e;It(this,Qr,i.composedPath().includes(this.range)),(e=d.window)==null||e.addEventListener("pointerup",this)};ls=new WeakSet;Fu=function(i){var e;i.pointerType!=="mouse"&&De(this,zr,ps).call(this,i),this.addEventListener("pointerleave",this),(e=d.window)==null||e.addEventListener("pointermove",this)};ds=new WeakSet;Vu=function(){var i;(i=d.window)==null||i.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};us=new WeakSet;Ku=function(){var i,e;this.removeEventListener("pointerleave",this),(i=d.window)==null||i.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=Z(this,Oe).activeSegment)==null||e.style.removeProperty("transform")};cs=new WeakSet;Gu=function(i){this.toggleAttribute("dragging",i.buttons===1||i.pointerType!=="mouse"),this.updatePointerBar(i),De(this,hs,$u).call(this,i),this.dragging&&(i.pointerType!=="mouse"||!Z(this,Qr))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(i),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})))};d.customElements.get("media-chrome-range")||d.customElements.define("media-chrome-range",jt);var qu=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Xr=(i,e,t)=>(qu(i,e,"read from private field"),t?t.call(i):e.get(i)),cp=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Jr=(i,e,t,a)=>(qu(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Ge,Zu=h.createElement("template");Zu.innerHTML=`
  <style>
    :host {
      
      box-sizing: border-box;
      display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
      color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
      --media-loading-indicator-icon-height: 44px;
    }

    ::slotted(media-time-range),
    ::slotted(media-volume-range) {
      min-height: 100%;
    }

    ::slotted(media-time-range),
    ::slotted(media-clip-selector) {
      flex-grow: 1;
    }

    ::slotted([role="menu"]) {
      position: absolute;
    }
  </style>

  <slot></slot>
`;var fs=class extends d.HTMLElement{constructor(){super(),cp(this,Ge,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Zu.content.cloneNode(!0)))}static get observedAttributes(){return[w.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,a){var r,n,s,l,u;e===w.MEDIA_CONTROLLER&&(t&&((n=(r=Xr(this,Ge))==null?void 0:r.unassociateElement)==null||n.call(r,this),Jr(this,Ge,null)),a&&this.isConnected&&(Jr(this,Ge,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(u=(l=Xr(this,Ge))==null?void 0:l.associateElement)==null||u.call(l,this)))}connectedCallback(){var e,t,a;let r=this.getAttribute(w.MEDIA_CONTROLLER);r&&(Jr(this,Ge,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(t=Xr(this,Ge))==null?void 0:t.associateElement)==null||a.call(t,this))}disconnectedCallback(){var e,t;(t=(e=Xr(this,Ge))==null?void 0:e.unassociateElement)==null||t.call(e,this),Jr(this,Ge,null)}};Ge=new WeakMap;d.customElements.get("media-control-bar")||d.customElements.define("media-control-bar",fs);var zu=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},jr=(i,e,t)=>(zu(i,e,"read from private field"),t?t.call(i):e.get(i)),mp=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},en=(i,e,t,a)=>(zu(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Ye,Qu=h.createElement("template");Qu.innerHTML=`
  <style>
    :host {
      font: var(--media-font,
        var(--media-font-weight, normal)
        var(--media-font-size, 14px) /
        var(--media-text-content-height, var(--media-control-height, 24px))
        var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
      color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
      background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
      padding: var(--media-control-padding, 10px);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      box-sizing: border-box;
      text-align: center;
      pointer-events: auto;
    }

    
    :host(:focus-visible) {
      box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
      outline: 0;
    }

    
    :host(:where(:focus)) {
      box-shadow: none;
      outline: 0;
    }
  </style>
  <slot></slot>
`;var Ne=class extends d.HTMLElement{constructor(){super(),mp(this,Ye,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Qu.content.cloneNode(!0)))}static get observedAttributes(){return[w.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,a){var r,n,s,l,u;e===w.MEDIA_CONTROLLER&&(t&&((n=(r=jr(this,Ye))==null?void 0:r.unassociateElement)==null||n.call(r,this),en(this,Ye,null)),a&&this.isConnected&&(en(this,Ye,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(u=(l=jr(this,Ye))==null?void 0:l.associateElement)==null||u.call(l,this)))}connectedCallback(){var e,t,a;let{style:r}=$(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let n=this.getAttribute(w.MEDIA_CONTROLLER);n&&(en(this,Ye,(e=this.getRootNode())==null?void 0:e.getElementById(n)),(a=(t=jr(this,Ye))==null?void 0:t.associateElement)==null||a.call(t,this))}disconnectedCallback(){var e,t;(t=(e=jr(this,Ye))==null?void 0:e.unassociateElement)==null||t.call(e,this),en(this,Ye,null)}};Ye=new WeakMap;d.customElements.get("media-text-display")||d.customElements.define("media-text-display",Ne);var Ju=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Xu=(i,e,t)=>(Ju(i,e,"read from private field"),t?t.call(i):e.get(i)),hp=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},pp=(i,e,t,a)=>(Ju(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Ta,vs=class extends Ne{constructor(){super(),hp(this,Ta,void 0),pp(this,Ta,this.shadowRoot.querySelector("slot")),Xu(this,Ta).textContent=He(0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_DURATION]}attributeChangedCallback(e,t,a){e===o.MEDIA_DURATION&&(Xu(this,Ta).textContent=He(+a)),super.attributeChangedCallback(e,t,a)}get mediaDuration(){return x(this,o.MEDIA_DURATION)}set mediaDuration(e){P(this,o.MEDIA_DURATION,e)}};Ta=new WeakMap;d.customElements.get("media-duration-display")||d.customElements.define("media-duration-display",vs);var fp={2:v("Network Error"),3:v("Decode Error"),4:v("Source Not Supported"),5:v("Encryption Error")},vp={2:v("A network error caused the media download to fail."),3:v("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:v("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:v("The media is encrypted and there are no keys to decrypt it.")},Es=i=>{var e,t;return i.code===1?null:{title:(e=fp[i.code])!=null?e:`Error ${i.code}`,message:(t=vp[i.code])!=null?t:i.message}};var ec=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Ep=(i,e,t)=>(ec(i,e,"read from private field"),t?t.call(i):e.get(i)),bp=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},gp=(i,e,t,a)=>(ec(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),tn;function _p(i){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${i.mediaerrorcode}" id="content">
      ${tc({code:+i.mediaerrorcode,message:i.mediaerrormessage})}
    </slot>
  `}function Ap(i){return i.code&&Es(i)!==null}function tc(i){var e;let{title:t,message:a}=(e=Es(i))!=null?e:{},r="";return t&&(r+=`<slot name="error-${i.code}-title"><h3>${t}</h3></slot>`),a&&(r+=`<slot name="error-${i.code}-message"><p>${a}</p></slot>`),r}var ju=[o.MEDIA_ERROR_CODE,o.MEDIA_ERROR_MESSAGE],Di=class extends Jt{constructor(){super(...arguments),bp(this,tn,null)}static get observedAttributes(){return[...super.observedAttributes,...ju]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,t,a){var r;if(super.attributeChangedCallback(e,t,a),!ju.includes(e))return;let n=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=Ap(n),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(n))}get mediaError(){return Ep(this,tn)}set mediaError(e){gp(this,tn,e)}get mediaErrorCode(){return x(this,"mediaerrorcode")}set mediaErrorCode(e){P(this,"mediaerrorcode",e)}get mediaErrorMessage(){return M(this,"mediaerrormessage")}set mediaErrorMessage(e){L(this,"mediaerrormessage",e)}};tn=new WeakMap;Di.getSlotTemplateHTML=_p;Di.formatErrorMessage=tc;d.customElements.get("media-error-dialog")||d.customElements.define("media-error-dialog",Di);var an=Di;var Tp=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,yp=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`,ac=h.createElement("template");ac.innerHTML=`
  <style>
    :host([${o.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
      display: none !important;
    }

    
    :host(:not([${o.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
      display: none !important;
    }

    :host([${o.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
    :host(:not([${o.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="enter">${Tp}</slot>
    <slot name="exit">${yp}</slot>
  </slot>
`;var kp=`
  <slot name="tooltip-enter">${v("Enter fullscreen mode")}</slot>
  <slot name="tooltip-exit">${v("Exit fullscreen mode")}</slot>
`,ic=i=>{let e=i.mediaIsFullscreen?v("exit fullscreen mode"):v("enter fullscreen mode");i.setAttribute("aria-label",e)},bs=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_IS_FULLSCREEN,o.MEDIA_FULLSCREEN_UNAVAILABLE]}constructor(e={}){super({slotTemplate:ac,tooltipContent:kp,...e})}connectedCallback(){super.connectedCallback(),ic(this)}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_IS_FULLSCREEN&&ic(this)}get mediaFullscreenUnavailable(){return M(this,o.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){L(this,o.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return S(this,o.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){I(this,o.MEDIA_IS_FULLSCREEN,e)}handleClick(){let e=this.mediaIsFullscreen?f.MEDIA_EXIT_FULLSCREEN_REQUEST:f.MEDIA_ENTER_FULLSCREEN_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}};d.customElements.get("media-fullscreen-button")||d.customElements.define("media-fullscreen-button",bs);var{MEDIA_TIME_IS_LIVE:rn,MEDIA_PAUSED:ya}=o,{MEDIA_SEEK_TO_LIVE_REQUEST:Sp,MEDIA_PLAY_REQUEST:Ip}=f,Cp='<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>',nc=h.createElement("template");nc.innerHTML=`
  <style>
  :host { --media-tooltip-display: none; }
  
  slot[name=indicator] > *,
  :host ::slotted([slot=indicator]) {
    
    min-width: auto;
    fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
    color: var(--media-live-button-icon-color, rgb(140, 140, 140));
  }

  :host([${rn}]:not([${ya}])) slot[name=indicator] > *,
  :host([${rn}]:not([${ya}])) ::slotted([slot=indicator]) {
    fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
    color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
  }

  :host([${rn}]:not([${ya}])) {
    cursor: var(--media-cursor, not-allowed);
  }

  slot[name=text]{
    text-transform: uppercase;
  }

  </style>

  <slot name="indicator">${Cp}</slot>
  
  <slot name="spacer">&nbsp;</slot><slot name="text">${v("live")}</slot>
`;var rc=i=>{let e=i.mediaPaused||!i.mediaTimeIsLive,t=e?v("seek to live"):v("playing live");i.setAttribute("aria-label",t),e?i.removeAttribute("aria-disabled"):i.setAttribute("aria-disabled","true")},gs=class extends K{static get observedAttributes(){return[...super.observedAttributes,ya,rn]}constructor(e={}){super({slotTemplate:nc,...e})}connectedCallback(){rc(this),super.connectedCallback()}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),rc(this)}get mediaPaused(){return S(this,o.MEDIA_PAUSED)}set mediaPaused(e){I(this,o.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return S(this,o.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){I(this,o.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new d.CustomEvent(Sp,{composed:!0,bubbles:!0})),this.hasAttribute(ya)&&this.dispatchEvent(new d.CustomEvent(Ip,{composed:!0,bubbles:!0})))}};d.customElements.get("media-live-button")||d.customElements.define("media-live-button",gs);var sc=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},ka=(i,e,t)=>(sc(i,e,"read from private field"),t?t.call(i):e.get(i)),oc=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Sa=(i,e,t,a)=>(sc(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),qe,on,nn={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},lc=500,dc=h.createElement("template"),Mp=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;dc.innerHTML=`
<style>
:host {
  display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
  vertical-align: middle;
  box-sizing: border-box;
  --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${lc}ms);
}

#status {
  color: rgba(0,0,0,0);
  width: 0px;
  height: 0px;
}

:host slot[name=icon] > *,
:host ::slotted([slot=icon]) {
  opacity: var(--media-loading-indicator-opacity, 0);
  transition: opacity 0.15s;
}

:host([${o.MEDIA_LOADING}]:not([${o.MEDIA_PAUSED}])) slot[name=icon] > *,
:host([${o.MEDIA_LOADING}]:not([${o.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
  opacity: var(--media-loading-indicator-opacity, 1);
  transition: opacity 0.15s var(--_loading-indicator-delay);
}

:host #status {
  visibility: var(--media-loading-indicator-opacity, hidden);
  transition: visibility 0.15s;
}

:host([${o.MEDIA_LOADING}]:not([${o.MEDIA_PAUSED}])) #status {
  visibility: var(--media-loading-indicator-opacity, visible);
  transition: visibility 0.15s var(--_loading-indicator-delay);
}

svg, img, ::slotted(svg), ::slotted(img) {
  width: var(--media-loading-indicator-icon-width);
  height: var(--media-loading-indicator-icon-height, 100px);
  fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
  vertical-align: middle;
}
</style>

<slot name="icon">${Mp}</slot>
<div id="status" role="status" aria-live="polite">${v("media loading")}</div>
`;var _s=class extends d.HTMLElement{constructor(){if(super(),oc(this,qe,void 0),oc(this,on,lc),!this.shadowRoot){let e=this.attachShadow({mode:"open"}),t=dc.content.cloneNode(!0);e.appendChild(t)}}static get observedAttributes(){return[w.MEDIA_CONTROLLER,o.MEDIA_PAUSED,o.MEDIA_LOADING,nn.LOADING_DELAY]}attributeChangedCallback(e,t,a){var r,n,s,l,u;e===nn.LOADING_DELAY&&t!==a?this.loadingDelay=Number(a):e===w.MEDIA_CONTROLLER&&(t&&((n=(r=ka(this,qe))==null?void 0:r.unassociateElement)==null||n.call(r,this),Sa(this,qe,null)),a&&this.isConnected&&(Sa(this,qe,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(u=(l=ka(this,qe))==null?void 0:l.associateElement)==null||u.call(l,this)))}connectedCallback(){var e,t,a;let r=this.getAttribute(w.MEDIA_CONTROLLER);r&&(Sa(this,qe,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(t=ka(this,qe))==null?void 0:t.associateElement)==null||a.call(t,this))}disconnectedCallback(){var e,t;(t=(e=ka(this,qe))==null?void 0:e.unassociateElement)==null||t.call(e,this),Sa(this,qe,null)}get loadingDelay(){return ka(this,on)}set loadingDelay(e){Sa(this,on,e);let{style:t}=$(this.shadowRoot,":host");t.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return S(this,o.MEDIA_PAUSED)}set mediaPaused(e){I(this,o.MEDIA_PAUSED,e)}get mediaLoading(){return S(this,o.MEDIA_LOADING)}set mediaLoading(e){I(this,o.MEDIA_LOADING,e)}get mediaController(){return M(this,w.MEDIA_CONTROLLER)}set mediaController(e){L(this,w.MEDIA_CONTROLLER,e)}get noAutohide(){return S(this,nn.NO_AUTOHIDE)}set noAutohide(e){I(this,nn.NO_AUTOHIDE,e)}};qe=new WeakMap;on=new WeakMap;d.customElements.get("media-loading-indicator")||d.customElements.define("media-loading-indicator",_s);var{MEDIA_VOLUME_LEVEL:ei}=o,Lp=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,uc=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,wp=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`,mc=h.createElement("template");mc.innerHTML=`
  <style>
  
  :host(:not([${ei}])) slot[name=icon] slot:not([name=high]), 
  :host([${ei}=high]) slot[name=icon] slot:not([name=high]) {
    display: none !important;
  }

  :host([${ei}=off]) slot[name=icon] slot:not([name=off]) {
    display: none !important;
  }

  :host([${ei}=low]) slot[name=icon] slot:not([name=low]) {
    display: none !important;
  }

  :host([${ei}=medium]) slot[name=icon] slot:not([name=medium]) {
    display: none !important;
  }

  :host(:not([${ei}=off])) slot[name=tooltip-unmute],
  :host([${ei}=off]) slot[name=tooltip-mute] {
    display: none;
  }
  </style>

  <slot name="icon">
    <slot name="off">${Lp}</slot>
    <slot name="low">${uc}</slot>
    <slot name="medium">${uc}</slot>
    <slot name="high">${wp}</slot>
  </slot>
`;var Rp=`
  <slot name="tooltip-mute">${v("Mute")}</slot>
  <slot name="tooltip-unmute">${v("Unmute")}</slot>
`,cc=i=>{let t=i.mediaVolumeLevel==="off"?v("unmute"):v("mute");i.setAttribute("aria-label",t)},As=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_VOLUME_LEVEL]}constructor(e={}){super({slotTemplate:mc,tooltipContent:Rp,...e})}connectedCallback(){cc(this),super.connectedCallback()}attributeChangedCallback(e,t,a){e===o.MEDIA_VOLUME_LEVEL&&cc(this),super.attributeChangedCallback(e,t,a)}get mediaVolumeLevel(){return M(this,o.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){L(this,o.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel==="off"?f.MEDIA_UNMUTE_REQUEST:f.MEDIA_MUTE_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}};d.customElements.get("media-mute-button")||d.customElements.define("media-mute-button",As);var hc=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`,fc=h.createElement("template");fc.innerHTML=`
  <style>
  :host([${o.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
    display: none !important;
  }

  
  :host(:not([${o.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
    display: none !important;
  }

  :host([${o.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
  :host(:not([${o.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
    display: none;
  }
  </style>

  <slot name="icon">
    <slot name="enter">${hc}</slot>
    <slot name="exit">${hc}</slot>
  </slot>
`;var xp=`
  <slot name="tooltip-enter">${v("Enter picture in picture mode")}</slot>
  <slot name="tooltip-exit">${v("Exit picture in picture mode")}</slot>
`,pc=i=>{let e=i.mediaIsPip?v("exit picture in picture mode"):v("enter picture in picture mode");i.setAttribute("aria-label",e)},Ts=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_IS_PIP,o.MEDIA_PIP_UNAVAILABLE]}constructor(e={}){super({slotTemplate:fc,tooltipContent:xp,...e})}connectedCallback(){pc(this),super.connectedCallback()}attributeChangedCallback(e,t,a){e===o.MEDIA_IS_PIP&&pc(this),super.attributeChangedCallback(e,t,a)}get mediaPipUnavailable(){return M(this,o.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){L(this,o.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return S(this,o.MEDIA_IS_PIP)}set mediaIsPip(e){I(this,o.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?f.MEDIA_EXIT_PIP_REQUEST:f.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}};d.customElements.get("media-pip-button")||d.customElements.define("media-pip-button",Ts);var Dp=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},sn=(i,e,t)=>(Dp(i,e,"read from private field"),t?t.call(i):e.get(i)),Op=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Oi,ys={RATES:"rates"},Ss=[1,1.2,1.5,1.7,2],Ni=1,vc=h.createElement("template");vc.innerHTML=`
  <style>
    :host {
      min-width: 5ch;
      padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
    }
  </style>
  <slot name="icon"></slot>
`;var ks=class extends K{constructor(e={}){super({slotTemplate:vc,tooltipContent:v("Playback rate"),...e}),Op(this,Oi,new $e(this,ys.RATES,{defaultValue:Ss})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${Ni}x`}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE,ys.RATES]}attributeChangedCallback(e,t,a){if(super.attributeChangedCallback(e,t,a),e===ys.RATES&&(sn(this,Oi).value=a),e===o.MEDIA_PLAYBACK_RATE){let r=a?+a:Number.NaN,n=Number.isNaN(r)?Ni:r;this.container.innerHTML=`${n}x`,this.setAttribute("aria-label",v("Playback rate {playbackRate}",{playbackRate:n}))}}get rates(){return sn(this,Oi)}set rates(e){e?Array.isArray(e)&&(sn(this,Oi).value=e.join(" ")):sn(this,Oi).value=""}get mediaPlaybackRate(){return x(this,o.MEDIA_PLAYBACK_RATE,Ni)}set mediaPlaybackRate(e){P(this,o.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,t;let a=Array.from(this.rates.values(),s=>+s).sort((s,l)=>s-l),r=(t=(e=a.find(s=>s>this.mediaPlaybackRate))!=null?e:a[0])!=null?t:Ni,n=new d.CustomEvent(f.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(n)}};Oi=new WeakMap;d.customElements.get("media-playback-rate-button")||d.customElements.define("media-playback-rate-button",ks);var Np=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,Pp=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`,bc=h.createElement("template");bc.innerHTML=`
  <style>
    :host([${o.MEDIA_PAUSED}]) slot[name=pause],
    :host(:not([${o.MEDIA_PAUSED}])) slot[name=play] {
      display: none !important;
    }

    :host([${o.MEDIA_PAUSED}]) slot[name=tooltip-pause],
    :host(:not([${o.MEDIA_PAUSED}])) slot[name=tooltip-play] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="play">${Np}</slot>
    <slot name="pause">${Pp}</slot>
  </slot>
`;var Up=`
  <slot name="tooltip-play">${v("Play")}</slot>
  <slot name="tooltip-pause">${v("Pause")}</slot>
`,Ec=i=>{let e=i.mediaPaused?v("play"):v("pause");i.setAttribute("aria-label",e)},Is=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PAUSED,o.MEDIA_ENDED]}constructor(e={}){super({slotTemplate:bc,tooltipContent:Up,...e})}connectedCallback(){Ec(this),super.connectedCallback()}attributeChangedCallback(e,t,a){e===o.MEDIA_PAUSED&&Ec(this),super.attributeChangedCallback(e,t,a)}get mediaPaused(){return S(this,o.MEDIA_PAUSED)}set mediaPaused(e){I(this,o.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?f.MEDIA_PLAY_REQUEST:f.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new d.CustomEvent(e,{composed:!0,bubbles:!0}))}};d.customElements.get("media-play-button")||d.customElements.define("media-play-button",Is);var Ze={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"},gc=h.createElement("template");gc.innerHTML=`
  <style>
    :host {
      pointer-events: none;
      display: var(--media-poster-image-display, inline-block);
      box-sizing: border-box;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      min-width: 100%;
      min-height: 100%;
      background-repeat: no-repeat;
      background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
      background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
      object-fit: var(--media-object-fit, contain);
      object-position: var(--media-object-position, center);
    }
  </style>

  <img part="poster img" aria-hidden="true" id="image"/>
`;var Bp=i=>{i.style.removeProperty("background-image")},Hp=(i,e)=>{i.style["background-image"]=`url('${e}')`},Cs=class extends d.HTMLElement{static get observedAttributes(){return[Ze.PLACEHOLDER_SRC,Ze.SRC]}constructor(){super(),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(gc.content.cloneNode(!0))),this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,t,a){e===Ze.SRC&&(a==null?this.image.removeAttribute(Ze.SRC):this.image.setAttribute(Ze.SRC,a)),e===Ze.PLACEHOLDER_SRC&&(a==null?Bp(this.image):Hp(this.image,a))}get placeholderSrc(){return M(this,Ze.PLACEHOLDER_SRC)}set placeholderSrc(e){L(this,Ze.SRC,e)}get src(){return M(this,Ze.SRC)}set src(e){L(this,Ze.SRC,e)}};d.customElements.get("media-poster-image")||d.customElements.define("media-poster-image",Cs);var _c=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Wp=(i,e,t)=>(_c(i,e,"read from private field"),t?t.call(i):e.get(i)),$p=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Fp=(i,e,t,a)=>(_c(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),ln,Ms=class extends Ne{constructor(){super(),$p(this,ln,void 0),Fp(this,ln,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PREVIEW_CHAPTER]}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_PREVIEW_CHAPTER&&a!==t&&a!=null&&(Wp(this,ln).textContent=a,a!==""?this.setAttribute("aria-valuetext",`chapter: ${a}`):this.removeAttribute("aria-valuetext"))}get mediaPreviewChapter(){return M(this,o.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){L(this,o.MEDIA_PREVIEW_CHAPTER,e)}};ln=new WeakMap;d.customElements.get("media-preview-chapter-display")||d.customElements.define("media-preview-chapter-display",Ms);var Ac=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},dn=(i,e,t)=>(Ac(i,e,"read from private field"),t?t.call(i):e.get(i)),Vp=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},un=(i,e,t,a)=>(Ac(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),ze,Tc=h.createElement("template");Tc.innerHTML=`
  <style>
    :host {
      box-sizing: border-box;
      display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
      overflow: hidden;
    }

    img {
      display: none;
      position: relative;
    }
  </style>
  <img crossorigin loading="eager" decoding="async">
`;var Ls=class extends d.HTMLElement{constructor(){super(),Vp(this,ze,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Tc.content.cloneNode(!0)))}static get observedAttributes(){return[w.MEDIA_CONTROLLER,o.MEDIA_PREVIEW_IMAGE,o.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,t,a;let r=this.getAttribute(w.MEDIA_CONTROLLER);r&&(un(this,ze,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(t=dn(this,ze))==null?void 0:t.associateElement)==null||a.call(t,this))}disconnectedCallback(){var e,t;(t=(e=dn(this,ze))==null?void 0:e.unassociateElement)==null||t.call(e,this),un(this,ze,null)}attributeChangedCallback(e,t,a){var r,n,s,l,u;[o.MEDIA_PREVIEW_IMAGE,o.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===w.MEDIA_CONTROLLER&&(t&&((n=(r=dn(this,ze))==null?void 0:r.unassociateElement)==null||n.call(r,this),un(this,ze,null)),a&&this.isConnected&&(un(this,ze,(s=this.getRootNode())==null?void 0:s.getElementById(a)),(u=(l=dn(this,ze))==null?void 0:l.associateElement)==null||u.call(l,this)))}get mediaPreviewImage(){return M(this,o.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){L(this,o.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(o.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(t=>+t)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(o.MEDIA_PREVIEW_COORDS);return}this.setAttribute(o.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){let e=this.mediaPreviewCoords,t=this.mediaPreviewImage;if(!(e&&t))return;let[a,r,n,s]=e,l=t.split("#")[0],u=getComputedStyle(this),{maxWidth:c,maxHeight:A,minWidth:_,minHeight:p}=u,E=Math.min(parseInt(c)/n,parseInt(A)/s),O=Math.max(parseInt(_)/n,parseInt(p)/s),y=E<1,C=y?E:O>1?O:1,{style:U}=$(this.shadowRoot,":host"),z=$(this.shadowRoot,"img").style,se=this.shadowRoot.querySelector("img"),we=y?"min":"max";U.setProperty(`${we}-width`,"initial","important"),U.setProperty(`${we}-height`,"initial","important"),U.width=`${n*C}px`,U.height=`${s*C}px`;let Ie=()=>{z.width=`${this.imgWidth*C}px`,z.height=`${this.imgHeight*C}px`,z.display="block"};se.src!==l&&(se.onload=()=>{this.imgWidth=se.naturalWidth,this.imgHeight=se.naturalHeight,Ie()},se.src=l,Ie()),Ie(),z.transform=`translate(-${a*C}px, -${r*C}px)`}};ze=new WeakMap;d.customElements.get("media-preview-thumbnail")||d.customElements.define("media-preview-thumbnail",Ls);var kc=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},yc=(i,e,t)=>(kc(i,e,"read from private field"),t?t.call(i):e.get(i)),Kp=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Gp=(i,e,t,a)=>(kc(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Ia,ws=class extends Ne{constructor(){super(),Kp(this,Ia,void 0),Gp(this,Ia,this.shadowRoot.querySelector("slot")),yc(this,Ia).textContent=He(0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_PREVIEW_TIME&&a!=null&&(yc(this,Ia).textContent=He(parseFloat(a)))}get mediaPreviewTime(){return x(this,o.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){P(this,o.MEDIA_PREVIEW_TIME,e)}};Ia=new WeakMap;d.customElements.get("media-preview-time-display")||d.customElements.define("media-preview-time-display",ws);var Pi={SEEK_OFFSET:"seekoffset"},cn=30,Yp=`<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(2.18 19.87)">${cn}</text><path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/></svg>`,Sc=h.createElement("template");Sc.innerHTML=`
  <slot name="icon">${Yp}</slot>
`;var qp=0,Rs=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_CURRENT_TIME,Pi.SEEK_OFFSET]}constructor(e={}){super({slotTemplate:Sc,tooltipContent:v("Seek backward"),...e})}connectedCallback(){this.seekOffset=x(this,Pi.SEEK_OFFSET,cn),super.connectedCallback()}attributeChangedCallback(e,t,a){e===Pi.SEEK_OFFSET&&(this.seekOffset=x(this,Pi.SEEK_OFFSET,cn)),super.attributeChangedCallback(e,t,a)}get seekOffset(){return x(this,Pi.SEEK_OFFSET,cn)}set seekOffset(e){P(this,Pi.SEEK_OFFSET,e),this.setAttribute("aria-label",v("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),vr(Er(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return x(this,o.MEDIA_CURRENT_TIME,qp)}set mediaCurrentTime(e){P(this,o.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),t=new d.CustomEvent(f.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};d.customElements.get("media-seek-backward-button")||d.customElements.define("media-seek-backward-button",Rs);var Ui={SEEK_OFFSET:"seekoffset"},mn=30,Zp=`<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(8.9 19.87)">${mn}</text><path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/></svg>`,Ic=h.createElement("template");Ic.innerHTML=`
  <slot name="icon">${Zp}</slot>
`;var zp=0,xs=class extends K{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_CURRENT_TIME,Ui.SEEK_OFFSET]}constructor(e={}){super({slotTemplate:Ic,tooltipContent:v("Seek forward"),...e})}connectedCallback(){this.seekOffset=x(this,Ui.SEEK_OFFSET,mn),super.connectedCallback()}attributeChangedCallback(e,t,a){e===Ui.SEEK_OFFSET&&(this.seekOffset=x(this,Ui.SEEK_OFFSET,mn)),super.attributeChangedCallback(e,t,a)}get seekOffset(){return x(this,Ui.SEEK_OFFSET,mn)}set seekOffset(e){P(this,Ui.SEEK_OFFSET,e),this.setAttribute("aria-label",v("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),vr(Er(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return x(this,o.MEDIA_CURRENT_TIME,zp)}set mediaCurrentTime(e){P(this,o.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,t=new d.CustomEvent(f.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}};d.customElements.get("media-seek-forward-button")||d.customElements.define("media-seek-forward-button",xs);var wc=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Ds=(i,e,t)=>(wc(i,e,"read from private field"),t?t.call(i):e.get(i)),Qp=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Xp=(i,e,t,a)=>(wc(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Bi,Pe={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},Cc=[...Object.values(Pe),o.MEDIA_CURRENT_TIME,o.MEDIA_DURATION,o.MEDIA_SEEKABLE],Mc=["Enter"," "],Jp="&nbsp;/&nbsp;",Lc=(i,{timesSep:e=Jp}={})=>{var t,a;let r=i.hasAttribute(Pe.REMAINING),n=i.hasAttribute(Pe.SHOW_DURATION),s=(t=i.mediaCurrentTime)!=null?t:0,[,l]=(a=i.mediaSeekable)!=null?a:[],u=0;Number.isFinite(i.mediaDuration)?u=i.mediaDuration:Number.isFinite(l)&&(u=l);let c=r?He(0-(u-s)):He(s);return n?`${c}${e}${He(u)}`:c},jp="video not loaded, unknown time.",ef=i=>{var e;let t=i.mediaCurrentTime,[,a]=(e=i.mediaSeekable)!=null?e:[],r=null;if(Number.isFinite(i.mediaDuration)?r=i.mediaDuration:Number.isFinite(a)&&(r=a),t==null||r===null){i.setAttribute("aria-valuetext",jp);return}let n=i.hasAttribute(Pe.REMAINING),s=i.hasAttribute(Pe.SHOW_DURATION),l=n?Wt(0-(r-t)):Wt(t);if(!s){i.setAttribute("aria-valuetext",l);return}let u=Wt(r),c=`${l} of ${u}`;i.setAttribute("aria-valuetext",c)},Os=class extends Ne{constructor(){super(),Qp(this,Bi,void 0),Xp(this,Bi,this.shadowRoot.querySelector("slot")),Ds(this,Bi).innerHTML=`${Lc(this)}`}static get observedAttributes(){return[...super.observedAttributes,...Cc,"disabled"]}connectedCallback(){let{style:e}=$(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",v("playback time"));let t=a=>{let{key:r}=a;if(!Mc.includes(r)){this.removeEventListener("keyup",t);return}this.toggleTimeDisplay()};this.addEventListener("keydown",a=>{let{metaKey:r,altKey:n,key:s}=a;if(r||n||!Mc.includes(s)){this.removeEventListener("keyup",t);return}this.addEventListener("keyup",t)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,t,a){Cc.includes(e)?this.update():e==="disabled"&&a!==t&&(a==null?this.enable():this.disable()),super.attributeChangedCallback(e,t,a)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return S(this,Pe.REMAINING)}set remaining(e){I(this,Pe.REMAINING,e)}get showDuration(){return S(this,Pe.SHOW_DURATION)}set showDuration(e){I(this,Pe.SHOW_DURATION,e)}get noToggle(){return S(this,Pe.NO_TOGGLE)}set noToggle(e){I(this,Pe.NO_TOGGLE,e)}get mediaDuration(){return x(this,o.MEDIA_DURATION)}set mediaDuration(e){P(this,o.MEDIA_DURATION,e)}get mediaCurrentTime(){return x(this,o.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){P(this,o.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(o.MEDIA_SEEKABLE);if(e)return e.split(":").map(t=>+t)}set mediaSeekable(e){if(e==null){this.removeAttribute(o.MEDIA_SEEKABLE);return}this.setAttribute(o.MEDIA_SEEKABLE,e.join(":"))}update(){let e=Lc(this);ef(this),e!==Ds(this,Bi).innerHTML&&(Ds(this,Bi).innerHTML=e)}};Bi=new WeakMap;d.customElements.get("media-time-display")||d.customElements.define("media-time-display",Os);var Rc=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},ie=(i,e,t)=>(Rc(i,e,"read from private field"),t?t.call(i):e.get(i)),Qe=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Se=(i,e,t,a)=>(Rc(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),tf=(i,e,t,a)=>({set _(r){Se(i,e,r,t)},get _(){return ie(i,e,a)}}),Hi,hn,Wi,Ca,pn,fn,vn,$i,ti,En,bn=class{constructor(e,t,a){Qe(this,Hi,void 0),Qe(this,hn,void 0),Qe(this,Wi,void 0),Qe(this,Ca,void 0),Qe(this,pn,void 0),Qe(this,fn,void 0),Qe(this,vn,void 0),Qe(this,$i,void 0),Qe(this,ti,0),Qe(this,En,(r=performance.now())=>{Se(this,ti,requestAnimationFrame(ie(this,En))),Se(this,Ca,performance.now()-ie(this,Wi));let n=1e3/this.fps;if(ie(this,Ca)>n){Se(this,Wi,r-ie(this,Ca)%n);let s=1e3/((r-ie(this,hn))/++tf(this,pn)._),l=(r-ie(this,fn))/1e3/this.duration,u=ie(this,vn)+l*this.playbackRate;u-ie(this,Hi).valueAsNumber>0?Se(this,$i,this.playbackRate/this.duration/s):(Se(this,$i,.995*ie(this,$i)),u=ie(this,Hi).valueAsNumber+ie(this,$i)),this.callback(u)}}),Se(this,Hi,e),this.callback=t,this.fps=a}start(){ie(this,ti)===0&&(Se(this,Wi,performance.now()),Se(this,hn,ie(this,Wi)),Se(this,pn,0),ie(this,En).call(this))}stop(){ie(this,ti)!==0&&(cancelAnimationFrame(ie(this,ti)),Se(this,ti,0))}update({start:e,duration:t,playbackRate:a}){let r=e-ie(this,Hi).valueAsNumber,n=Math.abs(t-this.duration);(r>0||r<-.03||n>=.5)&&this.callback(e),Se(this,vn,e),Se(this,fn,performance.now()),this.duration=t,this.playbackRate=a}};Hi=new WeakMap;hn=new WeakMap;Wi=new WeakMap;Ca=new WeakMap;pn=new WeakMap;fn=new WeakMap;vn=new WeakMap;$i=new WeakMap;ti=new WeakMap;En=new WeakMap;var Hs=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},j=(i,e,t)=>(Hs(i,e,"read from private field"),t?t.call(i):e.get(i)),ae=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Xe=(i,e,t,a)=>(Hs(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),de=(i,e,t)=>(Hs(i,e,"access private method"),t),Fi,ii,An,La,Tn,_n,wa,Ra,Vi,Ki,Ma,Ws,xc,Ns,yn,$s,kn,Fs,Sn,Vs,Ps,Dc,xa,In,Us,Oc,af="video not loaded, unknown time.",rf=i=>{let e=i.range,t=Wt(+Pc(i)),a=Wt(+i.mediaSeekableEnd),r=t&&a?`${t} of ${a}`:af;e.setAttribute("aria-valuetext",r)},Nc=h.createElement("template");Nc.innerHTML=`
  <style>
    :host {
      --media-box-border-radius: 4px;
      --media-box-padding-left: 10px;
      --media-box-padding-right: 10px;
      --media-preview-border-radius: var(--media-box-border-radius);
      --media-box-arrow-offset: var(--media-box-border-radius);
      --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
      --_preview-background: var(--media-preview-background, var(--_control-background));

      
      contain: layout;
    }

    #buffered {
      background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
      position: absolute;
      height: 100%;
      will-change: width;
    }

    #preview-rail,
    #current-rail {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 100%;
      pointer-events: none;
      will-change: transform;
    }

    [part~="box"] {
      width: min-content;
      
      position: absolute;
      bottom: 100%;
      flex-direction: column;
      align-items: center;
      transform: translateX(-50%);
    }

    [part~="current-box"] {
      display: var(--media-current-box-display, var(--media-box-display, flex));
      margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
      visibility: hidden;
    }

    [part~="preview-box"] {
      display: var(--media-preview-box-display, var(--media-box-display, flex));
      margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
      transition-property: var(--media-preview-transition-property, visibility, opacity);
      transition-duration: var(--media-preview-transition-duration-out, .25s);
      transition-delay: var(--media-preview-transition-delay-out, 0s);
      visibility: hidden;
      opacity: 0;
    }

    :host(:is([${o.MEDIA_PREVIEW_IMAGE}], [${o.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
      transition-duration: var(--media-preview-transition-duration-in, .5s);
      transition-delay: var(--media-preview-transition-delay-in, .25s);
      visibility: visible;
      opacity: 1;
    }

    @media (hover: hover) {
      :host(:is([${o.MEDIA_PREVIEW_IMAGE}], [${o.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }
    }

    media-preview-thumbnail,
    ::slotted(media-preview-thumbnail) {
      visibility: hidden;
      
      transition: visibility 0s .25s;
      transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
      background: var(--media-preview-thumbnail-background, var(--_preview-background));
      box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
      max-width: var(--media-preview-thumbnail-max-width, 180px);
      max-height: var(--media-preview-thumbnail-max-height, 160px);
      min-width: var(--media-preview-thumbnail-min-width, 120px);
      min-height: var(--media-preview-thumbnail-min-height, 80px);
      border: var(--media-preview-thumbnail-border);
      border-radius: var(--media-preview-thumbnail-border-radius,
        var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
    }

    :host([${o.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
    :host([${o.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
      transition-delay: var(--media-preview-transition-delay-in, .25s);
      visibility: visible;
    }

    @media (hover: hover) {
      :host([${o.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
      :host([${o.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      :host([${o.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }
    }

    media-preview-chapter-display,
    ::slotted(media-preview-chapter-display) {
      font-size: var(--media-font-size, 13px);
      line-height: 17px;
      min-width: 0;
      visibility: hidden;
      
      transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
      transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
      background: var(--media-preview-chapter-background, var(--_preview-background));
      border-radius: var(--media-preview-chapter-border-radius,
        var(--media-preview-border-radius) var(--media-preview-border-radius)
        var(--media-preview-border-radius) var(--media-preview-border-radius));
      padding: var(--media-preview-chapter-padding, 3.5px 9px);
      margin: var(--media-preview-chapter-margin, 0 0 5px);
      text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
    }

    :host([${o.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
    :host([${o.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
      transition-delay: var(--media-preview-transition-delay-in, .25s);
      border-radius: var(--media-preview-chapter-border-radius, 0);
      padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
      margin: var(--media-preview-chapter-margin, 0);
      min-width: 100%;
    }

    media-preview-chapter-display[${o.MEDIA_PREVIEW_CHAPTER}],
    ::slotted(media-preview-chapter-display[${o.MEDIA_PREVIEW_CHAPTER}]) {
      visibility: visible;
    }

    media-preview-chapter-display:not([aria-valuetext]),
    ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
      display: none;
    }

    media-preview-time-display,
    ::slotted(media-preview-time-display),
    media-time-display,
    ::slotted(media-time-display) {
      font-size: var(--media-font-size, 13px);
      line-height: 17px;
      min-width: 0;
      
      transition: min-width 0s, border-radius 0s;
      transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
      background: var(--media-preview-time-background, var(--_preview-background));
      border-radius: var(--media-preview-time-border-radius,
        var(--media-preview-border-radius) var(--media-preview-border-radius)
        var(--media-preview-border-radius) var(--media-preview-border-radius));
      padding: var(--media-preview-time-padding, 3.5px 9px);
      margin: var(--media-preview-time-margin, 0);
      text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      transform: translateX(min(
        max(calc(50% - var(--_box-width) / 2),
        calc(var(--_box-shift, 0))),
        calc(var(--_box-width) / 2 - 50%)
      ));
    }

    :host([${o.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
    :host([${o.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
      transition-delay: var(--media-preview-transition-delay-in, .25s);
      border-radius: var(--media-preview-time-border-radius,
        0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
      min-width: 100%;
    }

    :host([${o.MEDIA_PREVIEW_TIME}]:hover) {
      --media-time-range-hover-display: block;
    }

    [part~="arrow"],
    ::slotted([part~="arrow"]) {
      display: var(--media-box-arrow-display, inline-block);
      transform: translateX(min(
        max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
        calc(var(--_box-shift, 0))),
        calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
      ));
      
      border-color: transparent;
      border-top-color: var(--media-box-arrow-background, var(--_control-background));
      border-width: var(--media-box-arrow-border-width,
        var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
      border-style: solid;
      justify-content: center;
      height: 0;
    }
  </style>
  <div id="preview-rail">
    <slot name="preview" part="box preview-box">
      <media-preview-thumbnail></media-preview-thumbnail>
      <media-preview-chapter-display></media-preview-chapter-display>
      <media-preview-time-display></media-preview-time-display>
      <slot name="preview-arrow"><div part="arrow"></div></slot>
    </slot>
  </div>
  <div id="current-rail">
    <slot name="current" part="box current-box">
      
    </slot>
  </div>
`;var gn=(i,e=i.mediaCurrentTime)=>{let t=Number.isFinite(i.mediaSeekableStart)?i.mediaSeekableStart:0,a=Number.isFinite(i.mediaDuration)?i.mediaDuration:i.mediaSeekableEnd;if(Number.isNaN(a))return 0;let r=(e-t)/(a-t);return Math.max(0,Math.min(r,1))},Pc=(i,e=i.range.valueAsNumber)=>{let t=Number.isFinite(i.mediaSeekableStart)?i.mediaSeekableStart:0,a=Number.isFinite(i.mediaDuration)?i.mediaDuration:i.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-t)+t},Bs=class extends jt{constructor(){super(),ae(this,Ki),ae(this,Ws),ae(this,yn),ae(this,kn),ae(this,Sn),ae(this,Ps),ae(this,xa),ae(this,Us),ae(this,Fi,void 0),ae(this,ii,void 0),ae(this,An,void 0),ae(this,La,void 0),ae(this,Tn,void 0),ae(this,_n,void 0),ae(this,wa,void 0),ae(this,Ra,void 0),ae(this,Vi,void 0),ae(this,Ns,a=>{this.dragging||(Ai(a)&&(this.range.valueAsNumber=a),this.updateBar())}),this.container.appendChild(Nc.content.cloneNode(!0)),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),Xe(this,An,this.shadowRoot.querySelectorAll('[part~="box"]')),Xe(this,Tn,this.shadowRoot.querySelector('[part~="preview-box"]')),Xe(this,_n,this.shadowRoot.querySelector('[part~="current-box"]'));let t=getComputedStyle(this);Xe(this,wa,parseInt(t.getPropertyValue("--media-box-padding-left"))),Xe(this,Ra,parseInt(t.getPropertyValue("--media-box-padding-right"))),Xe(this,ii,new bn(this.range,j(this,Ns),60))}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PAUSED,o.MEDIA_DURATION,o.MEDIA_SEEKABLE,o.MEDIA_CURRENT_TIME,o.MEDIA_PREVIEW_IMAGE,o.MEDIA_PREVIEW_TIME,o.MEDIA_PREVIEW_CHAPTER,o.MEDIA_BUFFERED,o.MEDIA_PLAYBACK_RATE,o.MEDIA_LOADING,o.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",v("seek")),de(this,Ki,Ma).call(this),Xe(this,Fi,this.getRootNode()),(e=j(this,Fi))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),de(this,Ki,Ma).call(this),(e=j(this,Fi))==null||e.removeEventListener("transitionstart",this),Xe(this,Fi,null)}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),t!=a&&(e===o.MEDIA_CURRENT_TIME||e===o.MEDIA_PAUSED||e===o.MEDIA_ENDED||e===o.MEDIA_LOADING||e===o.MEDIA_DURATION||e===o.MEDIA_SEEKABLE?(j(this,ii).update({start:gn(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),de(this,Ki,Ma).call(this),rf(this)):e===o.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===o.MEDIA_DURATION||e===o.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=j(this,Vi),this.updateBar()))}get mediaChaptersCues(){return j(this,Vi)}set mediaChaptersCues(e){var t;Xe(this,Vi,e),this.updateSegments((t=j(this,Vi))==null?void 0:t.map(a=>({start:gn(this,a.startTime),end:gn(this,a.endTime)})))}get mediaPaused(){return S(this,o.MEDIA_PAUSED)}set mediaPaused(e){I(this,o.MEDIA_PAUSED,e)}get mediaLoading(){return S(this,o.MEDIA_LOADING)}set mediaLoading(e){I(this,o.MEDIA_LOADING,e)}get mediaDuration(){return x(this,o.MEDIA_DURATION)}set mediaDuration(e){P(this,o.MEDIA_DURATION,e)}get mediaCurrentTime(){return x(this,o.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){P(this,o.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return x(this,o.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){P(this,o.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(o.MEDIA_BUFFERED);return e?e.split(" ").map(t=>t.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(o.MEDIA_BUFFERED);return}let t=e.map(a=>a.join(":")).join(" ");this.setAttribute(o.MEDIA_BUFFERED,t)}get mediaSeekable(){let e=this.getAttribute(o.MEDIA_SEEKABLE);if(e)return e.split(":").map(t=>+t)}set mediaSeekable(e){if(e==null){this.removeAttribute(o.MEDIA_SEEKABLE);return}this.setAttribute(o.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;let[,t=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return t}get mediaSeekableStart(){var e;let[t=0]=(e=this.mediaSeekable)!=null?e:[];return t}get mediaPreviewImage(){return M(this,o.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){L(this,o.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return x(this,o.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){P(this,o.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return S(this,o.MEDIA_ENDED)}set mediaEnded(e){I(this,o.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;let t=this.mediaBuffered;if(!t.length)return;let a;if(this.mediaEnded)a=1;else{let n=this.mediaCurrentTime,[,s=this.mediaSeekableStart]=(e=t.find(([l,u])=>l<=n&&n<=u))!=null?e:[];a=gn(this,s)}let{style:r}=$(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;let t=$(this.shadowRoot,"#current-rail"),a=$(this.shadowRoot,'[part~="current-box"]'),r=de(this,yn,$s).call(this,j(this,_n)),n=de(this,kn,Fs).call(this,r,this.range.valueAsNumber),s=de(this,Sn,Vs).call(this,r,this.range.valueAsNumber);t.style.transform=`translateX(${n})`,t.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${s}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":de(this,Us,Oc).call(this);break;case"pointermove":de(this,Ps,Dc).call(this,e);break;case"pointerup":case"pointerleave":de(this,xa,In).call(this,null);break;case"transitionstart":ue(e.target,this)&&setTimeout(()=>de(this,Ki,Ma).call(this),0);break}}};Fi=new WeakMap;ii=new WeakMap;An=new WeakMap;La=new WeakMap;Tn=new WeakMap;_n=new WeakMap;wa=new WeakMap;Ra=new WeakMap;Vi=new WeakMap;Ki=new WeakSet;Ma=function(){de(this,Ws,xc).call(this)?j(this,ii).start():j(this,ii).stop()};Ws=new WeakSet;xc=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&br(this)};Ns=new WeakMap;yn=new WeakSet;$s=function(i){var e;let a=((e=this.getAttribute("bounds")?We(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),n=i.offsetWidth,s=-(r.left-a.left-n/2),l=a.right-r.left-n/2;return{box:{width:n,min:s,max:l},bounds:a,range:r}};kn=new WeakSet;Fs=function(i,e){let t=`${e*100}%`,{width:a,min:r,max:n}=i.box;if(!a)return t;if(Number.isNaN(r)||(t=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${t})`),!Number.isNaN(n)){let l=`calc(1 / var(--_range-width) * 100 * ${n}% - var(--media-box-padding-right))`;t=`min(${t}, ${l})`}return t};Sn=new WeakSet;Vs=function(i,e){let{width:t,min:a,max:r}=i.box,n=e*i.range.width;if(n<a+j(this,wa)){let s=i.range.left-i.bounds.left-j(this,wa);return`${n-t/2+s}px`}if(n>r-j(this,Ra)){let s=i.bounds.right-i.range.right-j(this,Ra);return`${n+t/2-s-i.range.width}px`}return 0};Ps=new WeakSet;Dc=function(i){let e=[...j(this,An)].some(A=>i.composedPath().includes(A));if(!this.dragging&&(e||!i.composedPath().includes(this))){de(this,xa,In).call(this,null);return}let t=this.mediaSeekableEnd;if(!t)return;let a=$(this.shadowRoot,"#preview-rail"),r=$(this.shadowRoot,'[part~="preview-box"]'),n=de(this,yn,$s).call(this,j(this,Tn)),s=(i.clientX-n.range.left)/n.range.width;s=Math.max(0,Math.min(1,s));let l=de(this,kn,Fs).call(this,n,s),u=de(this,Sn,Vs).call(this,n,s);a.style.transform=`translateX(${l})`,a.style.setProperty("--_range-width",`${n.range.width}`),r.style.setProperty("--_box-shift",`${u}`),r.style.setProperty("--_box-width",`${n.box.width}px`);let c=Math.round(j(this,La))-Math.round(s*t);Math.abs(c)<1&&s>.01&&s<.99||(Xe(this,La,s*t),de(this,xa,In).call(this,j(this,La)))};xa=new WeakSet;In=function(i){this.dispatchEvent(new d.CustomEvent(f.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:i}))};Us=new WeakSet;Oc=function(){j(this,ii).stop();let i=Pc(this);this.dispatchEvent(new d.CustomEvent(f.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:i}))};d.customElements.get("media-time-range")||d.customElements.define("media-time-range",Bs);var Gi={PLACEMENT:"placement",BOUNDS:"bounds"},Uc=h.createElement("template");Uc.innerHTML=`
  <style>
    :host {
      --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
      --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
      --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
      --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
      --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
      position: relative;
      pointer-events: none;
      display: var(--media-tooltip-display, inline-flex);
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      z-index: var(--media-tooltip-z-index, 1);
      background: var(--_tooltip-background);
      color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
      font: var(--media-font,
        var(--media-font-weight, 400)
        var(--media-font-size, 13px) /
        var(--media-text-content-height, var(--media-control-height, 18px))
        var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
      padding: var(--media-tooltip-padding, .35em .7em);
      border: var(--media-tooltip-border, none);
      border-radius: var(--media-tooltip-border-radius, 5px);
      filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
      white-space: var(--media-tooltip-white-space, nowrap);
    }

    :host([hidden]) {
      display: none;
    }

    img, svg {
      display: inline-block;
    }

    #arrow {
      position: absolute;
      width: 0px;
      height: 0px;
      border-style: solid;
      display: var(--media-tooltip-arrow-display, block);
    }

    :host(:not([placement])),
    :host([placement="top"]) {
      position: absolute;
      bottom: calc(100% + var(--media-tooltip-distance, 12px));
      left: 50%;
      transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
    }
    :host(:not([placement])) #arrow,
    :host([placement="top"]) #arrow {
      top: 100%;
      left: 50%;
      border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
      border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
      transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
    }

    :host([placement="right"]) {
      position: absolute;
      left: calc(100% + var(--media-tooltip-distance, 12px));
      top: 50%;
      transform: translate(0, -50%);
    }
    :host([placement="right"]) #arrow {
      top: 50%;
      right: 100%;
      border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
      border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
      transform: translate(0, -50%);
    }

    :host([placement="bottom"]) {
      position: absolute;
      top: calc(100% + var(--media-tooltip-distance, 12px));
      left: 50%;
      transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
    }
    :host([placement="bottom"]) #arrow {
      bottom: 100%;
      left: 50%;
      border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
      border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
      transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
    }

    :host([placement="left"]) {
      position: absolute;
      right: calc(100% + var(--media-tooltip-distance, 12px));
      top: 50%;
      transform: translate(0, -50%);
    }
    :host([placement="left"]) #arrow {
      top: 50%;
      left: 100%;
      border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
      border-color: transparent transparent transparent var(--_tooltip-arrow-background);
      transform: translate(0, -50%);
    }
    
    :host([placement="none"]) #arrow {
      display: none;
    }

  </style>
  <slot></slot>
  <div id="arrow"></div>
`;var Ks=class extends d.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!br(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let t=this.placement;if(t==="left"||t==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}let a=getComputedStyle(this),r=(e=We(this,"#"+this.bounds))!=null?e:q(this);if(!r)return;let{x:n,width:s}=r.getBoundingClientRect(),{x:l,width:u}=this.getBoundingClientRect(),c=l+u,A=n+s,_=a.getPropertyValue("--media-tooltip-offset-x"),p=_?parseFloat(_.replace("px","")):0,E=a.getPropertyValue("--media-tooltip-container-margin"),O=E?parseFloat(E.replace("px","")):0,y=l-n+p-O,C=c-A+p+O;if(y<0){this.style.setProperty("--media-tooltip-offset-x",`${y}px`);return}if(C>0){this.style.setProperty("--media-tooltip-offset-x",`${C}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Uc.content.cloneNode(!0))),this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Gi.PLACEMENT,Gi.BOUNDS]}get placement(){return M(this,Gi.PLACEMENT)}set placement(e){L(this,Gi.PLACEMENT,e)}get bounds(){return M(this,Gi.BOUNDS)}set bounds(e){L(this,Gi.BOUNDS,e)}};d.customElements.get("media-tooltip")||d.customElements.define("media-tooltip",Ks);var nf=1,of=i=>i.mediaMuted?0:i.mediaVolume,sf=i=>`${Math.round(i*100)}%`,Gs=class extends jt{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_VOLUME,o.MEDIA_MUTED,o.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{let e=this.range.value,t=new d.CustomEvent(f.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",v("volume"))}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),(e===o.MEDIA_VOLUME||e===o.MEDIA_MUTED)&&(this.range.valueAsNumber=of(this),this.range.setAttribute("aria-valuetext",sf(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return x(this,o.MEDIA_VOLUME,nf)}set mediaVolume(e){P(this,o.MEDIA_VOLUME,e)}get mediaMuted(){return S(this,o.MEDIA_MUTED)}set mediaMuted(e){I(this,o.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return M(this,o.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){L(this,o.MEDIA_VOLUME_UNAVAILABLE,e)}};d.customElements.get("media-volume-range")||d.customElements.define("media-volume-range",Gs);var b=require("@mux/mux-video"),R=require("@mux/playback-core");var qc=require("@mux/mux-video");var Vc=require("@mux/playback-core");var ni=require("@mux/playback-core");function Bc(i){let e="";return Object.entries(i).forEach(([t,a])=>{a!=null&&(e+=`${Cn(t)}: ${a}; `)}),e?e.trim():void 0}function Cn(i){return i.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}function Mn(i){return i.replace(/[-_]([a-z])/g,(e,t)=>t.toUpperCase())}function ce(i){if(i==null)return;let e=+i;return Number.isNaN(e)?void 0:e}function Ys(i){let e=lf(i).toString();return e?"?"+e:""}function lf(i){let e={};for(let t in i)i[t]!=null&&(e[t]=i[t]);return new URLSearchParams(e)}var qs=(i,e)=>!i||!e?!1:i.contains(e)?!0:qs(i,e.getRootNode().host);var Hc="mux.com",df=()=>{try{return"3.4.0"}catch{}return"UNKNOWN"},uf=df(),wn=()=>uf,Wc=(i,{token:e,customDomain:t=Hc,thumbnailTime:a,programTime:r}={})=>{var l;let n=e==null?a:void 0,{aud:s}=(l=(0,ni.parseJwt)(e))!=null?l:{};if(!(e&&s!=="t"))return`https://image.${t}/${i}/thumbnail.webp${Ys({token:e,time:n,program_time:r})}`},$c=(i,{token:e,customDomain:t=Hc,programStartTime:a,programEndTime:r}={})=>{var s;let{aud:n}=(s=(0,ni.parseJwt)(e))!=null?s:{};if(!(e&&n!=="s"))return`https://image.${t}/${i}/storyboard.vtt${Ys({token:e,format:"webp",program_start_time:a,program_end_time:r})}`},Da=i=>{if(i){if([ni.StreamTypes.LIVE,ni.StreamTypes.ON_DEMAND].includes(i))return i;if(i!=null&&i.includes("live"))return ni.StreamTypes.LIVE}};var cf={crossorigin:"crossOrigin",playsinline:"playsInline"};function Fc(i){var e;return(e=cf[i])!=null?e:Mn(i)}var ai,ri,me,Ln=class{constructor(e,t){pe(this,ai);pe(this,ri);pe(this,me,[]);Ae(this,ai,e),Ae(this,ri,t)}[Symbol.iterator](){return B(this,me).values()}get length(){return B(this,me).length}get value(){var e;return(e=B(this,me).join(" "))!=null?e:""}set value(e){var t;e!==this.value&&(Ae(this,me,[]),this.add(...(t=e==null?void 0:e.split(" "))!=null?t:[]))}toString(){return this.value}item(e){return B(this,me)[e]}values(){return B(this,me).values()}keys(){return B(this,me).keys()}forEach(e){B(this,me).forEach(e)}add(...e){var t,a;e.forEach(r=>{this.contains(r)||B(this,me).push(r)}),!(this.value===""&&!((t=B(this,ai))!=null&&t.hasAttribute(`${B(this,ri)}`)))&&((a=B(this,ai))==null||a.setAttribute(`${B(this,ri)}`,`${this.value}`))}remove(...e){var t;e.forEach(a=>{B(this,me).splice(B(this,me).indexOf(a),1)}),(t=B(this,ai))==null||t.setAttribute(`${B(this,ri)}`,`${this.value}`)}contains(e){return B(this,me).includes(e)}toggle(e,t){return typeof t!="undefined"?t?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,t){this.remove(e),this.add(t)}};ai=new WeakMap,ri=new WeakMap,me=new WeakMap;var Kc=`[mux-player ${wn()}]`;function Je(...i){console.warn(Kc,...i)}function Ee(...i){console.error(Kc,...i)}function Zs(i){var t;let e=(t=i.message)!=null?t:"";i.context&&(e+=` ${i.context}`),i.file&&(e+=` ${(0,Vc.i18n)("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${i.file}`),Je(e)}var ne={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},Ct={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted",MUX_VIDEO_ELEMENT:"mux-video-element"},mf={...ne,...Ct},Yc=Object.freeze({length:0,start(i){let e=i>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(i){let e=i>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),hf=qc.VideoEvents.filter(i=>i!=="error"),pf=Object.values(ne).filter(i=>ne.PLAYSINLINE!==i),ff=Object.values(Ct),vf=[...pf,...ff],zs=class extends le.HTMLElement{static get observedAttributes(){return vf}constructor(){super()}init(){hf.forEach(e=>{var t;(t=this.media)==null||t.addEventListener(e,a=>{this.dispatchEvent(new Event(a.type))})})}attributeChangedCallback(e,t,a){var r,n;switch(e){case Ct.MUTED:{this.media&&(this.media.muted=a!=null,this.media.defaultMuted=a!=null);return}case Ct.VOLUME:{let s=(r=ce(a))!=null?r:1;this.media&&(this.media.volume=s);return}case Ct.PLAYBACKRATE:{let s=(n=ce(a))!=null?n:1;this.media&&(this.media.playbackRate=s,this.media.defaultPlaybackRate=s);return}}}play(){var e,t;return(t=(e=this.media)==null?void 0:e.play())!=null?t:Promise.reject()}pause(){var e;(e=this.media)==null||e.pause()}load(){var e;(e=this.media)==null||e.load()}requestCast(e){var t;return(t=this.media)==null?void 0:t.requestCast(e)}get muxVideoElement(){var e;return(e=this.getAttribute(mf.MUX_VIDEO_ELEMENT))!=null?e:"mux-video"}get media(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector(this.muxVideoElement)}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var e,t;return(t=(e=this.media)==null?void 0:e.paused)!=null?t:!0}get duration(){var e,t;return(t=(e=this.media)==null?void 0:e.duration)!=null?t:NaN}get ended(){var e,t;return(t=(e=this.media)==null?void 0:e.ended)!=null?t:!1}get buffered(){var e,t;return(t=(e=this.media)==null?void 0:e.buffered)!=null?t:Yc}get seekable(){var e,t;return(t=(e=this.media)==null?void 0:e.seekable)!=null?t:Yc}get readyState(){var e,t;return(t=(e=this.media)==null?void 0:e.readyState)!=null?t:0}get videoWidth(){var e,t;return(t=(e=this.media)==null?void 0:e.videoWidth)!=null?t:0}get videoHeight(){var e,t;return(t=(e=this.media)==null?void 0:e.videoHeight)!=null?t:0}get currentSrc(){var e,t;return(t=(e=this.media)==null?void 0:e.currentSrc)!=null?t:""}get currentTime(){var e,t;return(t=(e=this.media)==null?void 0:e.currentTime)!=null?t:0}set currentTime(e){this.media&&(this.media.currentTime=Number(e))}get volume(){var e,t;return(t=(e=this.media)==null?void 0:e.volume)!=null?t:1}set volume(e){this.media&&(this.media.volume=Number(e))}get playbackRate(){var e,t;return(t=(e=this.media)==null?void 0:e.playbackRate)!=null?t:1}set playbackRate(e){this.media&&(this.media.playbackRate=Number(e))}get defaultPlaybackRate(){var e;return(e=ce(this.getAttribute(Ct.PLAYBACKRATE)))!=null?e:1}set defaultPlaybackRate(e){e!=null?this.setAttribute(Ct.PLAYBACKRATE,`${e}`):this.removeAttribute(Ct.PLAYBACKRATE)}get crossOrigin(){return Oa(this,ne.CROSSORIGIN)}set crossOrigin(e){this.setAttribute(ne.CROSSORIGIN,`${e}`)}get autoplay(){return Oa(this,ne.AUTOPLAY)!=null}set autoplay(e){e?this.setAttribute(ne.AUTOPLAY,typeof e=="string"?e:""):this.removeAttribute(ne.AUTOPLAY)}get loop(){return Oa(this,ne.LOOP)!=null}set loop(e){e?this.setAttribute(ne.LOOP,""):this.removeAttribute(ne.LOOP)}get muted(){var e,t;return(t=(e=this.media)==null?void 0:e.muted)!=null?t:!1}set muted(e){this.media&&(this.media.muted=!!e)}get defaultMuted(){return Oa(this,ne.MUTED)!=null}set defaultMuted(e){e?this.setAttribute(ne.MUTED,""):this.removeAttribute(ne.MUTED)}get playsInline(){return Oa(this,ne.PLAYSINLINE)!=null}set playsInline(e){Ee("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(e){["","none","metadata","auto"].includes(e)?this.setAttribute(ne.PRELOAD,e):this.removeAttribute(ne.PRELOAD)}};function Oa(i,e){return i.media?i.media.getAttribute(e):i.getAttribute(e)}var Qs=zs;var Jc=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},D=(i,e,t)=>(Jc(i,e,"read from private field"),t?t.call(i):e.get(i)),je=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},mt=(i,e,t,a)=>(Jc(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Yi,Rn,oi,Na,Mt,Lt,wt,si,qi,xn,Ue,Zc=1,zc=0,Ef=1,bf={processCallback(i,e,t){if(t){for(let[a,r]of e)if(a in t){let n=t[a];typeof n=="boolean"&&r instanceof he&&typeof r.element[r.attributeName]=="boolean"?r.booleanValue=n:typeof n=="function"&&r instanceof he?r.element[r.attributeName]=n:r.value=n}}}},ht=class extends d.DocumentFragment{constructor(e,t,a=bf){var r;super(),je(this,Yi,void 0),je(this,Rn,void 0),this.append(e.content.cloneNode(!0)),mt(this,Yi,jc(this)),mt(this,Rn,a),(r=a.createCallback)==null||r.call(a,this,D(this,Yi),t),a.processCallback(this,D(this,Yi),t)}update(e){D(this,Rn).processCallback(this,D(this,Yi),e)}};Yi=new WeakMap;Rn=new WeakMap;var jc=(i,e=[])=>{let t,a;for(let r of i.attributes||[])if(r.value.includes("{{")){let n=new Xs;for([t,a]of Xc(r.value))if(!t)n.append(a);else{let s=new he(i,r.name,r.namespaceURI);n.append(s),e.push([a,s])}r.value=n.toString()}for(let r of i.childNodes)if(r.nodeType===Zc&&!(r instanceof HTMLTemplateElement))jc(r,e);else{let n=r.data;if(r.nodeType===Zc||n.includes("{{")){let s=[];if(n)for([t,a]of Xc(n))if(!t)s.push(new Text(a));else{let l=new pt(i);s.push(l),e.push([a,l])}else if(r instanceof HTMLTemplateElement){let l=new Pa(i,r);s.push(l),e.push([l.expression,l])}r.replaceWith(...s.flatMap(l=>l.replacementNodes||[l]))}}return e},Qc={},Xc=i=>{let e="",t=0,a=Qc[i],r=0,n;if(a)return a;for(a=[];n=i[r];r++)n==="{"&&i[r+1]==="{"&&i[r-1]!=="\\"&&i[r+2]&&++t==1?(e&&a.push([zc,e]),e="",r++):n==="}"&&i[r+1]==="}"&&i[r-1]!=="\\"&&!--t?(a.push([Ef,e.trim()]),e="",r++):e+=n||"";return e&&a.push([zc,(t>0?"{{":"")+e]),Qc[i]=a},gf=11,Dn=class{get value(){return""}set value(e){}toString(){return this.value}},em=new WeakMap,Xs=class{constructor(){je(this,oi,[])}[Symbol.iterator](){return D(this,oi).values()}get length(){return D(this,oi).length}item(e){return D(this,oi)[e]}append(...e){for(let t of e)t instanceof he&&em.set(t,this),D(this,oi).push(t)}toString(){return D(this,oi).join("")}};oi=new WeakMap;var he=class extends Dn{constructor(e,t,a){super(),je(this,si),je(this,Na,""),je(this,Mt,void 0),je(this,Lt,void 0),je(this,wt,void 0),mt(this,Mt,e),mt(this,Lt,t),mt(this,wt,a)}get attributeName(){return D(this,Lt)}get attributeNamespace(){return D(this,wt)}get element(){return D(this,Mt)}get value(){return D(this,Na)}set value(e){D(this,Na)!==e&&(mt(this,Na,e),!D(this,si,qi)||D(this,si,qi).length===1?e==null?D(this,Mt).removeAttributeNS(D(this,wt),D(this,Lt)):D(this,Mt).setAttributeNS(D(this,wt),D(this,Lt),e):D(this,Mt).setAttributeNS(D(this,wt),D(this,Lt),D(this,si,qi).toString()))}get booleanValue(){return D(this,Mt).hasAttributeNS(D(this,wt),D(this,Lt))}set booleanValue(e){if(!D(this,si,qi)||D(this,si,qi).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}};Na=new WeakMap;Mt=new WeakMap;Lt=new WeakMap;wt=new WeakMap;si=new WeakSet;qi=function(){return em.get(this)};var pt=class extends Dn{constructor(e,t){super(),je(this,xn,void 0),je(this,Ue,void 0),mt(this,xn,e),mt(this,Ue,t?[...t]:[new Text])}get replacementNodes(){return D(this,Ue)}get parentNode(){return D(this,xn)}get nextSibling(){return D(this,Ue)[D(this,Ue).length-1].nextSibling}get previousSibling(){return D(this,Ue)[0].previousSibling}get value(){return D(this,Ue).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){let t=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===gf?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);t.length||t.push(new Text),mt(this,Ue,_f(D(this,Ue)[0].parentNode,D(this,Ue),t,this.nextSibling))}};xn=new WeakMap;Ue=new WeakMap;var Pa=class extends pt{constructor(e,t){let a=t.getAttribute("directive")||t.getAttribute("type"),r=t.getAttribute("expression")||t.getAttribute(a)||"";r.startsWith("{{")&&(r=r.trim().slice(2,-2).trim()),super(e),this.expression=r,this.template=t,this.directive=a}};function _f(i,e,t,a=null){let r=0,n,s,l,u=t.length,c=e.length;for(;r<u&&r<c&&e[r]==t[r];)r++;for(;r<u&&r<c&&t[u-1]==e[c-1];)a=t[--c,--u];if(r==c)for(;r<u;)i.insertBefore(t[r++],a);if(r==u)for(;r<c;)i.removeChild(e[r++]);else{for(n=e[r];r<u;)l=t[r++],s=n?n.nextSibling:a,n==l?n=s:r<u&&t[r]==s?(i.replaceChild(l,n),n=s):i.insertBefore(l,n);for(;n!=a;)s=n.nextSibling,i.removeChild(n),n=s}return t}var tm={string:i=>String(i)},Nn=class{constructor(e){this.template=e,this.state=void 0}},li=new WeakMap,di=new WeakMap,Js={partial:(i,e)=>{e[i.expression]=new Nn(i.template)},if:(i,e)=>{var t;if(am(i.expression,e))if(li.get(i)!==i.template){li.set(i,i.template);let a=new ht(i.template,e,Pn);i.replace(a),di.set(i,a)}else(t=di.get(i))==null||t.update(e);else i.replace(""),li.delete(i),di.delete(i)}},Af=Object.keys(Js),Pn={processCallback(i,e,t){var a,r;if(t)for(let[n,s]of e){if(s instanceof Pa){if(!s.directive){let u=Af.find(c=>s.template.hasAttribute(c));u&&(s.directive=u,s.expression=s.template.getAttribute(u))}(a=Js[s.directive])==null||a.call(Js,s,t);continue}let l=am(n,t);if(l instanceof Nn){li.get(s)!==l.template?(li.set(s,l.template),l=new ht(l.template,l.state,Pn),s.value=l,di.set(s,l)):(r=di.get(s))==null||r.update(l.state);continue}l?(s instanceof he&&s.attributeName.startsWith("aria-")&&(l=String(l)),s instanceof he?typeof l=="boolean"?s.booleanValue=l:typeof l=="function"?s.element[s.attributeName]=l:s.value=l:(s.value=l,li.delete(s),di.delete(s))):s instanceof he?s.value=void 0:(s.value=void 0,li.delete(s),di.delete(s))}}},im={"!":i=>!i,"!!":i=>!!i,"==":(i,e)=>i==e,"!=":(i,e)=>i!=e,">":(i,e)=>i>e,">=":(i,e)=>i>=e,"<":(i,e)=>i<e,"<=":(i,e)=>i<=e,"??":(i,e)=>i!=null?i:e,"|":(i,e)=>{var t;return(t=tm[e])==null?void 0:t.call(tm,i)}};function Tf(i){return yf(i,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}function am(i,e={}){var t,a,r,n,s,l,u;let c=Tf(i);if(c.length===0||c.some(({type:A})=>!A))return Ua(i);if(((t=c[0])==null?void 0:t.token)===">"){let A=e[(a=c[1])==null?void 0:a.token];if(!A)return Ua(i);let _={...e};A.state=_;let p=c.slice(2);for(let E=0;E<p.length;E+=3){let O=(r=p[E])==null?void 0:r.token,y=(n=p[E+1])==null?void 0:n.token,C=(s=p[E+2])==null?void 0:s.token;O&&y==="="&&(_[O]=Ba(C,e))}return A}if(c.length===1)return On(c[0])?Ba(c[0].token,e):Ua(i);if(c.length===2){let A=(l=c[0])==null?void 0:l.token,_=im[A];if(!_||!On(c[1]))return Ua(i);let p=Ba(c[1].token,e);return _(p)}if(c.length===3){let A=(u=c[1])==null?void 0:u.token,_=im[A];if(!_||!On(c[0])||!On(c[2]))return Ua(i);let p=Ba(c[0].token,e);if(A==="|")return _(p,c[2].token);let E=Ba(c[2].token,e);return _(p,E)}}function Ua(i){return console.warn(`Warning: invalid expression \`${i}\``),!1}function On({type:i}){return["number","boolean","string","param"].includes(i)}function Ba(i,e){let t=i[0],a=i.slice(-1);return i==="true"||i==="false"?i==="true":t===a&&["'",'"'].includes(t)?i.slice(1,-1):ur(i)?parseFloat(i):e[i]}function yf(i,e){let t,a,r,n=[];for(;i;){r=null,t=i.length;for(let s in e)a=e[s].exec(i),a&&a.index<t&&(r={token:a[0],type:s,matches:a.slice(1)},t=a.index);t&&n.push({token:i.substr(0,t),type:void 0}),r&&n.push(r),i=i.substr(t+(r?r.token.length:0))}return n}var rl=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},tl=(i,e,t)=>(rl(i,e,"read from private field"),t?t.call(i):e.get(i)),Ha=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},ui=(i,e,t,a)=>(rl(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),js=(i,e,t)=>(rl(i,e,"access private method"),t),Zi,Un,zi,il,rm,Bn,al,el={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},nm=h.createElement("template");nm.innerHTML=`
  <style>
    :host {
      display: inline-block;
      line-height: 0;
    }

    media-controller {
      width: 100%;
      height: 100%;
    }

    media-captions-button:not([mediasubtitleslist]),
    media-captions-menu:not([mediasubtitleslist]),
    media-captions-menu-button:not([mediasubtitleslist]),
    media-audio-track-menu[mediaaudiotrackunavailable],
    media-audio-track-menu-button[mediaaudiotrackunavailable],
    media-rendition-menu[mediarenditionunavailable],
    media-rendition-menu-button[mediarenditionunavailable],
    media-volume-range[mediavolumeunavailable],
    media-airplay-button[mediaairplayunavailable],
    media-fullscreen-button[mediafullscreenunavailable],
    media-cast-button[mediacastunavailable],
    media-pip-button[mediapipunavailable] {
      display: none;
    }
  </style>
`;var ci=class extends d.HTMLElement{constructor(){super(),Ha(this,il),Ha(this,Bn),Ha(this,Zi,void 0),Ha(this,Un,void 0),Ha(this,zi,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer());let e=new MutationObserver(t=>{var a;this.mediaController&&!((a=this.mediaController)!=null&&a.breakpointsComputed)||t.some(r=>{let n=r.target;return n===this?!0:n.localName!=="media-controller"?!1:!!(el[r.attributeName]||r.attributeName.startsWith("breakpoint"))})&&this.render()});e.observe(this,{attributes:!0}),e.observe(this.renderRoot,{attributes:!0,subtree:!0}),this.addEventListener(Ce.BREAKPOINTS_COMPUTED,this.render),js(this,il,rm).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=tl(this,Zi))!=null?e:this.constructor.template}set template(e){ui(this,zi,null),ui(this,Zi,e),this.createRenderer()}get props(){var e,t,a;let r=[...Array.from((t=(e=this.mediaController)==null?void 0:e.attributes)!=null?t:[]).filter(({name:s})=>el[s]||s.startsWith("breakpoint")),...Array.from(this.attributes)],n={};for(let s of r){let l=(a=el[s.name])!=null?a:Ud(s.name),{value:u}=s;u!=null?(ur(u)&&(u=parseFloat(u)),n[l]=u===""?!0:u):n[l]=!1}return n}attributeChangedCallback(e,t,a){e==="template"&&t!=a&&js(this,Bn,al).call(this)}connectedCallback(){js(this,Bn,al).call(this)}createRenderer(){this.template&&this.template!==tl(this,Un)&&(ui(this,Un,this.template),this.renderer=new ht(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(nm.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}};Zi=new WeakMap;Un=new WeakMap;zi=new WeakMap;il=new WeakSet;rm=function(i){if(Object.prototype.hasOwnProperty.call(this,i)){let e=this[i];delete this[i],this[i]=e}};Bn=new WeakSet;al=function(){var i;let e=this.getAttribute("template");if(!e||e===tl(this,zi))return;let t=this.getRootNode(),a=(i=t==null?void 0:t.getElementById)==null?void 0:i.call(t,e);if(a){ui(this,zi,e),ui(this,Zi,a),this.createRenderer();return}kf(e)&&(ui(this,zi,e),Sf(e).then(r=>{let n=h.createElement("template");n.innerHTML=r,ui(this,Zi,n),this.createRenderer()}).catch(console.error))};ci.observedAttributes=["template"];ci.processor=Pn;function kf(i){if(!/^(\/|\.\/|https?:\/\/)/.test(i))return!1;let e=/^https?:\/\//.test(i)?void 0:location.origin;try{new URL(i,e)}catch{return!1}return!0}async function Sf(i){let e=await fetch(i);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}d.customElements.get("media-theme")||d.customElements.define("media-theme",ci);var om=`:host {
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
`;var Wa=new WeakMap,ol=class i{constructor(e,t){this.element=e;this.type=t;this.element.addEventListener(this.type,this);let a=Wa.get(this.element);a&&a.set(this.type,this)}set(e){if(typeof e=="function")this.handleEvent=e.bind(this.element);else if(typeof e=="object"&&typeof e.handleEvent=="function")this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let t=Wa.get(this.element);t&&t.delete(this.type)}}static for(e){Wa.has(e.element)||Wa.set(e.element,new Map);let t=e.attributeName.slice(2),a=Wa.get(e.element);return a&&a.has(t)?a.get(t):new i(e.element,t)}};function Cf(i,e){return i instanceof he&&i.attributeName.startsWith("on")?(ol.for(i).set(e),i.element.removeAttributeNS(i.attributeNamespace,i.attributeName),!0):!1}function Mf(i,e){return e instanceof Hn&&i instanceof pt?(e.renderInto(i),!0):!1}function Lf(i,e){return e instanceof DocumentFragment&&i instanceof pt?(e.childNodes.length&&i.replace(...e.childNodes),!0):!1}function wf(i,e){if(i instanceof he){let t=i.attributeNamespace,a=i.element.getAttributeNS(t,i.attributeName);return String(e)!==a&&(i.value=String(e)),!0}return i.value=String(e),!0}function Rf(i,e){if(i instanceof he&&e instanceof Element){let t=i.element;return t[i.attributeName]!==e&&(i.element.removeAttributeNS(i.attributeNamespace,i.attributeName),t[i.attributeName]=e),!0}return!1}function xf(i,e){if(typeof e=="boolean"&&i instanceof he){let t=i.attributeNamespace,a=i.element.hasAttributeNS(t,i.attributeName);return e!==a&&(i.booleanValue=e),!0}return!1}function Df(i,e){return e===!1&&i instanceof pt?(i.replace(""),!0):!1}function Of(i,e){Rf(i,e)||xf(i,e)||Cf(i,e)||Df(i,e)||Mf(i,e)||Lf(i,e)||wf(i,e)}var nl=new Map,sm=new WeakMap,lm=new WeakMap,Hn=class{constructor(e,t,a){this.strings=e;this.values=t;this.processor=a;this.stringsKey=this.strings.join("")}get template(){if(nl.has(this.stringsKey))return nl.get(this.stringsKey);{let e=_i.createElement("template"),t=this.strings.length-1;return e.innerHTML=this.strings.reduce((a,r,n)=>a+r+(n<t?`{{ ${n} }}`:""),""),nl.set(this.stringsKey,e),e}}renderInto(e){var r;let t=this.template;if(sm.get(e)!==t){sm.set(e,t);let n=new ht(t,this.values,this.processor);lm.set(e,n),e instanceof pt?e.replace(...n.children):e.appendChild(n);return}let a=lm.get(e);(r=a==null?void 0:a.update)==null||r.call(a,this.values)}},Nf={processCallback(i,e,t){var a;if(t){for(let[r,n]of e)if(r in t){let s=(a=t[r])!=null?a:"";Of(n,s)}}}};function mi(i,...e){return new Hn(i,e,Nf)}function dm(i,e){i.renderInto(e)}var $a=require("@mux/playback-core"),Pf=i=>{let{tokens:e}=i;return e.drm?":host { --_cast-button-drm-display: none; }":""},um=i=>mi`
  <style>
    ${Pf(i)}
    ${om}
  </style>
  ${$f(i)}
`,Uf=i=>{let e=i.hotKeys?`${i.hotKeys}`:"";return Da(i.streamType)==="live"&&(e+=" noarrowleft noarrowright"),e},Bf={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},Hf=Object.values(Bf).join(", "),Wf=(i,e)=>{var a,r,n,s,l,u,c,A,_,p,E,O,y,C,U,z,se,we,Ie,Et,bt,Bt,Ht;let t={"target-live-window":(a=e.targetLiveWindow)!=null?a:!1,"stream-type":(r=Da(e.streamType))!=null?r:!1,crossorigin:(n=e.crossOrigin)!=null?n:"",playsinline:"",autoplay:(s=e.autoplay)!=null?s:!1,muted:(l=e.muted)!=null?l:!1,loop:(u=e.loop)!=null?u:!1,preload:(c=e.preload)!=null?c:!1,debug:(A=e.debug)!=null?A:!1,"prefer-cmcd":(_=e.preferCmcd)!=null?_:!1,"disable-tracking":(p=e.disableTracking)!=null?p:!1,"disable-cookies":(E=e.disableCookies)!=null?E:!1,"prefer-playback":(O=e.preferPlayback)!=null?O:!1,"start-time":e.startTime!=null?e.startTime:!1,"beacon-collection-domain":(y=e.beaconCollectionDomain)!=null?y:!1,"player-init-time":(C=e.playerInitTime)!=null?C:!1,"player-software-name":(U=e.playerSoftwareName)!=null?U:!1,"player-software-version":(z=e.playerSoftwareVersion)!=null?z:!1,"env-key":(se=e.envKey)!=null?se:!1,"custom-domain":(we=e.customDomain)!=null?we:!1,src:e.src?e.src:e.playbackId?(0,$a.toMuxVideoURL)(e):!1,"cast-src":e.src?e.src:e.playbackId?(0,$a.toMuxVideoURL)(e):!1,"cast-receiver":(Ie=e.castReceiver)!=null?Ie:!1,"drm-token":(bt=(Et=e.tokens)==null?void 0:Et.drm)!=null?bt:!1,"allow-ad-blocker":(Bt=e.allowAdBlocker)!=null?Bt:!1,exportparts:"video"};switch(i){case"mux-video-ads":return{...t,adtagurl:(Ht=e.adTagUrl)!=null?Ht:!1};default:return t}},$f=i=>{var u,c,A,_,p,E,O,y,C,U,z,se,we,Ie,Et;let e=i.muxVideoElement||"mux-video",t=mi`
    ${i.storyboard?mi`<track label="thumbnails" default kind="metadata" src="${i.storyboard}" />`:mi``}
    <slot></slot>
  `,a=Wf(e,i),r=[`<${e} slot='media' `],n=[];Object.entries(a).forEach(([bt,Bt],Ht)=>{Ht==0?r[0]+=` ${bt}="`:r.push(`" ${bt}="`),n.push(Bt)}),r.push('">'),r.push("</"+e+">"),n.push(t);let s=Object.assign([],r,{raw:r}),l=mi(s,...n);return mi`
    <media-theme
      template="${i.themeTemplate||!1}"
      mediaadbreak="${(u=i.adBreak)!=null?u:!1}"
      defaultstreamtype="${(c=i.defaultStreamType)!=null?c:!1}"
      hotkeys="${Uf(i)||!1}"
      nohotkeys="${i.noHotKeys||!i.hasSrc||!1}"
      noautoseektolive="${!!((A=i.streamType)!=null&&A.includes($a.StreamTypes.LIVE))&&i.targetLiveWindow!==0}"
      novolumepref="${i.novolumepref||!1}"
      disabled="${!i.hasSrc||i.isDialogOpen}"
      audio="${(_=i.audio)!=null?_:!1}"
      style="${(p=Bc({"--media-primary-color":i.primaryColor,"--media-secondary-color":i.secondaryColor,"--media-accent-color":i.accentColor}))!=null?p:!1}"
      defaultsubtitles="${!i.defaultHiddenCaptions}"
      forwardseekoffset="${(E=i.forwardSeekOffset)!=null?E:!1}"
      backwardseekoffset="${(O=i.backwardSeekOffset)!=null?O:!1}"
      playbackrates="${(y=i.playbackRates)!=null?y:!1}"
      defaultshowremainingtime="${(C=i.defaultShowRemainingTime)!=null?C:!1}"
      defaultduration="${(U=i.defaultDuration)!=null?U:!1}"
      hideduration="${(z=i.hideDuration)!=null?z:!1}"
      title="${(se=i.title)!=null?se:!1}"
      videotitle="${(we=i.videoTitle)!=null?we:!1}"
      proudlydisplaymuxbadge="${(Ie=i.proudlyDisplayMuxBadge)!=null?Ie:!1}"
      exportparts="${Hf}"
      onclose="${i.onCloseErrorDialog}"
      onfocusin="${i.onFocusInErrorDialog}"
    >
      ${l}
      <slot name="poster" slot="poster">
        <media-poster-image
          part="poster"
          exportparts="poster, img"
          src="${i.poster?i.poster:!1}"
          placeholdersrc="${(Et=i.placeholder)!=null?Et:!1}"
        ></media-poster-image>
      </slot>
    </media-theme>
  `};var T=require("@mux/playback-core"),cm=i=>i.charAt(0).toUpperCase()+i.slice(1),Ff=(i,e=!1)=>{var t,a;if(i.muxCode){let r=cm((t=i.errorCategory)!=null?t:"video"),n=(0,T.errorCategoryToTokenNameOrPrefix)((a=i.errorCategory)!=null?a:T.MuxErrorCategory.VIDEO);if(i.muxCode===T.MuxErrorCode.NETWORK_OFFLINE)return(0,T.i18n)("Your device appears to be offline",e);if(i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_EXPIRED)return(0,T.i18n)("{category} URL has expired",e).format({category:r});if([T.MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH,T.MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH,T.MuxErrorCode.NETWORK_TOKEN_AUD_MISSING,T.MuxErrorCode.NETWORK_TOKEN_MALFORMED].includes(i.muxCode))return(0,T.i18n)("{category} URL is formatted incorrectly",e).format({category:r});if(i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_MISSING)return(0,T.i18n)("Invalid {categoryName} URL",e).format({categoryName:n});if(i.muxCode===T.MuxErrorCode.NETWORK_NOT_FOUND)return(0,T.i18n)("{category} does not exist",e).format({category:r});if(i.muxCode===T.MuxErrorCode.NETWORK_NOT_READY)return(0,T.i18n)("{category} is not currently available",e).format({category:r})}if(i.code){if(i.code===T.MediaError.MEDIA_ERR_NETWORK)return(0,T.i18n)("Network Error",e);if(i.code===T.MediaError.MEDIA_ERR_DECODE)return(0,T.i18n)("Media Error",e);if(i.code===T.MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED)return(0,T.i18n)("Source Not Supported",e)}return(0,T.i18n)("Error",e)},Vf=(i,e=!1)=>{var t,a;if(i.muxCode){let r=cm((t=i.errorCategory)!=null?t:"video"),n=(0,T.errorCategoryToTokenNameOrPrefix)((a=i.errorCategory)!=null?a:T.MuxErrorCategory.VIDEO);return i.muxCode===T.MuxErrorCode.NETWORK_OFFLINE?(0,T.i18n)("Check your internet connection and try reloading this video.",e):i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_EXPIRED?(0,T.i18n)("The video\u2019s secured {tokenNamePrefix}-token has expired.",e).format({tokenNamePrefix:n}):i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH?(0,T.i18n)("The video\u2019s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",e).format({tokenNamePrefix:n}):i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_MALFORMED?(0,T.i18n)("{category} URL is formatted incorrectly",e).format({category:r}):[T.MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH,T.MuxErrorCode.NETWORK_TOKEN_AUD_MISSING].includes(i.muxCode)?(0,T.i18n)("The {tokenNamePrefix}-token is formatted with incorrect information.",e).format({tokenNamePrefix:n}):[T.MuxErrorCode.NETWORK_TOKEN_MISSING,T.MuxErrorCode.NETWORK_INVALID_URL].includes(i.muxCode)?(0,T.i18n)("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",e).format({tokenNamePrefix:n}):i.muxCode===T.MuxErrorCode.NETWORK_NOT_FOUND?"":i.muxCode===T.MuxErrorCode.NETWORK_NOT_READY?(0,T.i18n)("The live stream or video file are not yet ready.",e):i.message}return i.code&&(i.code===T.MediaError.MEDIA_ERR_NETWORK||i.code===T.MediaError.MEDIA_ERR_DECODE||i.code===T.MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED),i.message},mm=(i,e=!1)=>{let t=Ff(i,e).toString(),a=Vf(i,e).toString();return{title:t,message:a}},Kf=i=>{if(i.muxCode){if(i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([T.MuxErrorCode.NETWORK_TOKEN_AUD_MISMATCH,T.MuxErrorCode.NETWORK_TOKEN_AUD_MISSING].includes(i.muxCode))return"403-incorrect-aud-value.md";if(i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(i.muxCode===T.MuxErrorCode.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(i.muxCode===T.MuxErrorCode.NETWORK_NOT_FOUND)return"404-not-found.md";if(i.muxCode===T.MuxErrorCode.NETWORK_NOT_READY)return"412-not-playable.md"}if(i.code){if(i.code===T.MediaError.MEDIA_ERR_NETWORK)return"";if(i.code===T.MediaError.MEDIA_ERR_DECODE)return"media-decode-error.md";if(i.code===T.MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},sl=(i,e)=>{let t=Kf(i);return{message:i.message,context:i.context,file:t}};var hm=`<template id="media-theme-gerwig">
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
`;function pm({anchor:i,floating:e,placement:t}){let a=Yf({anchor:i,floating:e}),{x:r,y:n}=Zf(a,t);return{x:r,y:n}}function Yf({anchor:i,floating:e}){return{anchor:qf(i,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}function qf(i,e){var t;let a=i.getBoundingClientRect(),r=(t=e==null?void 0:e.getBoundingClientRect())!=null?t:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}function Zf({anchor:i,floating:e},t){let a=zf(t)==="x"?"y":"x",r=a==="y"?"height":"width",n=fm(t),s=i.x+i.width/2-e.width/2,l=i.y+i.height/2-e.height/2,u=i[r]/2-e[r]/2,c;switch(n){case"top":c={x:s,y:i.y-e.height};break;case"bottom":c={x:s,y:i.y+i.height};break;case"right":c={x:i.x+i.width,y:l};break;case"left":c={x:i.x-e.width,y:l};break;default:c={x:i.x,y:i.y}}switch(t.split("-")[1]){case"start":c[a]-=u;break;case"end":c[a]+=u;break}return c}function fm(i){return i.split("-")[0]}function zf(i){return["top","bottom"].includes(fm(i))?"y":"x"}var Rt=class extends Event{constructor({action:e="auto",relatedTarget:t,...a}){super("invoke",a),this.action=e,this.relatedTarget=t}},Wn=class extends Event{constructor({newState:e,oldState:t,...a}){super("toggle",a),this.newState=e,this.oldState=t}};var gl=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},H=(i,e,t)=>(gl(i,e,"read from private field"),t?t.call(i):e.get(i)),G=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},et=(i,e,t,a)=>(gl(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Y=(i,e,t)=>(gl(i,e,"access private method"),t),tt,pi,xt,$n,Fn,fi,Ka,ll,vm,Gn,Vn,dl,ul,Em,cl,bm,ml,gm,Qi,Xi,Ji,Ga,Yn,_l,hl,_m,Al,Am,pl,Tm,Tl,ym,fl,km,vl,Sm,Fa,qn,El,Im,Va,Zn,Kn,bl;function it({type:i,text:e,value:t,checked:a}){let r=h.createElement("media-chrome-menu-item");r.type=i!=null?i:"",r.part.add("menu-item"),i&&r.part.add(i),r.value=t,r.checked=a;let n=h.createElement("span");return n.textContent=e,r.append(n),r}function Be(i,e){let t=i.querySelector(`:scope > [slot="${e}"]`);if((t==null?void 0:t.nodeName)=="SLOT"&&(t=t.assignedElements({flatten:!0})[0]),t)return t=t.cloneNode(!0),t;let a=i.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}var Cm=h.createElement("template");Cm.innerHTML=`
  <style>
    :host {
      font: var(--media-font,
        var(--media-font-weight, normal)
        var(--media-font-size, 14px) /
        var(--media-text-content-height, var(--media-control-height, 24px))
        var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
      color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
      --_menu-bg: rgb(20 20 30 / .8);
      background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
      border-radius: var(--media-menu-border-radius);
      border: var(--media-menu-border, none);
      display: var(--media-menu-display, inline-flex);
      transition: var(--media-menu-transition-in,
        visibility 0s,
        opacity .2s ease-out,
        transform .15s ease-out,
        left .2s ease-in-out,
        min-width .2s ease-in-out,
        min-height .2s ease-in-out
      ) !important;
      
      visibility: var(--media-menu-visibility, visible);
      opacity: var(--media-menu-opacity, 1);
      max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
      transform: var(--media-menu-transform-in, translateY(0) scale(1));
      flex-direction: column;
      
      min-height: 0;
      position: relative;
      bottom: var(--_menu-bottom);
      box-sizing: border-box;
    } 

    @-moz-document url-prefix() {
      :host{
        --_menu-bg: rgb(20 20 30);
      }
    }

    :host([hidden]) {
      transition: var(--media-menu-transition-out,
        visibility .15s ease-in,
        opacity .15s ease-in,
        transform .15s ease-in
      ) !important;
      visibility: var(--media-menu-hidden-visibility, hidden);
      opacity: var(--media-menu-hidden-opacity, 0);
      max-height: var(--media-menu-hidden-max-height,
        var(--media-menu-max-height, var(--_menu-max-height, 300px)));
      transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
      pointer-events: none;
    }

    :host([slot="submenu"]) {
      background: none;
      width: 100%;
      min-height: 100%;
      position: absolute;
      bottom: 0;
      right: -100%;
    }

    #container {
      display: flex;
      flex-direction: column;
      min-height: 0;
      transition: transform .2s ease-out;
      transform: translate(0, 0);
    }

    #container.has-expanded {
      transition: transform .2s ease-in;
      transform: translate(-100%, 0);
    }

    button {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      outline: inherit;
      display: inline-flex;
      align-items: center;
    }

    slot[name="header"][hidden] {
      display: none;
    }

    slot[name="header"] > *,
    slot[name="header"]::slotted(*) {
      padding: .4em .7em;
      border-bottom: 1px solid rgb(255 255 255 / .25);
      cursor: var(--media-cursor, default);
    }

    slot[name="header"] > button[part~="back"],
    slot[name="header"]::slotted(button[part~="back"]) {
      cursor: var(--media-cursor, pointer);
    }

    svg[part~="back"] {
      height: var(--media-menu-icon-height, var(--media-control-height, 24px));
      fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
      display: block;
      margin-right: .5ch;
    }

    slot:not([name]) {
      gap: var(--media-menu-gap);
      flex-direction: var(--media-menu-flex-direction, column);
      overflow: var(--media-menu-overflow, hidden auto);
      display: flex;
      min-height: 0;
    }

    :host([role="menu"]) slot:not([name]) {
      padding-block: .4em;
    }

    slot:not([name])::slotted([role="menu"]) {
      background: none;
    }

    media-chrome-menu-item > span {
      margin-right: .5ch;
      max-width: var(--media-menu-item-max-width);
      text-overflow: ellipsis;
      overflow: hidden;
    }
  </style>
  <style id="layout-row" media="width:0">

    slot[name="header"] > *,
    slot[name="header"]::slotted(*) {
      padding: .4em .5em;
    }

    slot:not([name]) {
      gap: var(--media-menu-gap, .25em);
      flex-direction: var(--media-menu-flex-direction, row);
      padding-inline: .5em;
    }

    media-chrome-menu-item {
      padding: .3em .5em;
    }

    media-chrome-menu-item[aria-checked="true"] {
      background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
    }

    
    media-chrome-menu-item::part(checked-indicator) {
      display: var(--media-menu-item-checked-indicator-display, none);
    }
  </style>
  <div id="container">
    <slot name="header" hidden>
      <button part="back button" aria-label="Back to previous menu">
        <slot name="back-icon">
          <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
            <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
          </svg>
        </slot>
        <slot name="title"></slot>
      </button>
    </slot>
    <slot></slot>
  </div>
  <slot name="checked-indicator" hidden></slot>
`;var hi={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"},oe=class extends d.HTMLElement{constructor(){super(),G(this,ll),G(this,Vn),G(this,ul),G(this,cl),G(this,ml),G(this,Ji),G(this,Yn),G(this,hl),G(this,Al),G(this,pl),G(this,Tl),G(this,fl),G(this,vl),G(this,Fa),G(this,El),G(this,Va),G(this,Kn),G(this,tt,null),G(this,pi,null),G(this,xt,null),G(this,$n,new Set),G(this,Fn,void 0),G(this,fi,!1),G(this,Ka,null),G(this,Gn,()=>{let e=H(this,$n),t=new Set(this.items);for(let a of e)t.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(let a of t)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));et(this,$n,t)}),G(this,Qi,()=>{Y(this,Ji,Ga).call(this),Y(this,Yn,_l).call(this,!1)}),G(this,Xi,()=>{Y(this,Ji,Ga).call(this)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.nativeEl=this.constructor.template.content.cloneNode(!0),this.shadowRoot.append(this.nativeEl)),this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),this.shadowRoot.addEventListener("slotchange",this),et(this,Fn,new MutationObserver(H(this,Gn))),H(this,Fn).observe(this.defaultSlot,{childList:!0})}static get observedAttributes(){return[hi.DISABLED,hi.HIDDEN,hi.STYLE,hi.ANCHOR,w.MEDIA_CONTROLLER]}static formatMenuItemText(e,t){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":Y(this,ll,vm).call(this,e);break;case"invoke":Y(this,ul,Em).call(this,e);break;case"click":Y(this,hl,_m).call(this,e);break;case"toggle":Y(this,pl,Tm).call(this,e);break;case"focusout":Y(this,fl,km).call(this,e);break;case"keydown":Y(this,vl,Sm).call(this,e);break}}connectedCallback(){var e,t;et(this,Ka,wo(this.shadowRoot,":host")),Y(this,Vn,dl).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),et(this,tt,fr(this)),(t=(e=H(this,tt))==null?void 0:e.associateElement)==null||t.call(e,this),this.hidden||(ot(Ya(this),H(this,Qi)),ot(this,H(this,Xi)))}disconnectedCallback(){var e,t;st(Ya(this),H(this,Qi)),st(this,H(this,Xi)),this.disable(),(t=(e=H(this,tt))==null?void 0:e.unassociateElement)==null||t.call(e,this),et(this,tt,null)}attributeChangedCallback(e,t,a){var r,n,s,l;e===hi.HIDDEN&&a!==t?(H(this,fi)||et(this,fi,!0),this.hidden?Y(this,ml,gm).call(this):Y(this,cl,bm).call(this),this.dispatchEvent(new Wn({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===w.MEDIA_CONTROLLER?(t&&((n=(r=H(this,tt))==null?void 0:r.unassociateElement)==null||n.call(r,this),et(this,tt,null)),a&&this.isConnected&&(et(this,tt,fr(this)),(l=(s=H(this,tt))==null?void 0:s.associateElement)==null||l.call(s,this))):e===hi.DISABLED&&a!==t?a==null?this.enable():this.disable():e===hi.STYLE&&a!==t&&Y(this,Vn,dl).call(this)}formatMenuItemText(e,t){return this.constructor.formatMenuItemText(e,t)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=$t(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(Qf)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,t;return(t=(e=this.checkedItems[0])==null?void 0:e.value)!=null?t:""}set value(e){let t=this.items.find(a=>a.value===e);t&&Y(this,Kn,bl).call(this,t)}focus(){if(et(this,pi,da()),this.items.length){Y(this,Va,Zn).call(this,this.items[0]),this.items[0].focus();return}let e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e==null||e.focus()}handleSelect(e){var t;let a=Y(this,Fa,qn).call(this,e);a&&(Y(this,Kn,bl).call(this,a,a.type==="checkbox"),H(this,xt)&&!this.hidden&&((t=H(this,pi))==null||t.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var t,a;let{key:r}=e,n=this.items,s=(a=(t=Y(this,Fa,qn).call(this,e))!=null?t:Y(this,El,Im).call(this))!=null?a:n[0],l=n.indexOf(s),u=Math.max(0,l);r==="ArrowDown"?u++:r==="ArrowUp"?u--:e.key==="Home"?u=0:e.key==="End"&&(u=n.length-1),u<0&&(u=n.length-1),u>n.length-1&&(u=0),Y(this,Va,Zn).call(this,n[u]),n[u].focus()}};tt=new WeakMap;pi=new WeakMap;xt=new WeakMap;$n=new WeakMap;Fn=new WeakMap;fi=new WeakMap;Ka=new WeakMap;ll=new WeakSet;vm=function(i){let e=i.target;for(let t of e.assignedNodes({flatten:!0}))t.nodeType===3&&t.textContent.trim()===""&&t.remove();if(["header","title"].includes(e.name)){let t=this.shadowRoot.querySelector('slot[name="header"]');t.hidden=e.assignedNodes().length===0}e.name||H(this,Gn).call(this)};Gn=new WeakMap;Vn=new WeakSet;dl=function(){var i;let e=this.shadowRoot.querySelector("#layout-row"),t=(i=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:i.trim();e.setAttribute("media",t==="row"?"":"width:0")};ul=new WeakSet;Em=function(i){et(this,xt,i.relatedTarget),ue(this,i.relatedTarget)||(this.hidden=!this.hidden)};cl=new WeakSet;bm=function(){var i;(i=H(this,xt))==null||i.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),ot(Ya(this),H(this,Qi)),ot(this,H(this,Xi))};ml=new WeakSet;gm=function(){var i;(i=H(this,xt))==null||i.setAttribute("aria-expanded","false"),st(Ya(this),H(this,Qi)),st(this,H(this,Xi))};Qi=new WeakMap;Xi=new WeakMap;Ji=new WeakSet;Ga=function(i){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;let{x:e,y:t}=pm({anchor:this.anchorElement,floating:this,placement:"top-start"});i!=null||(i=this.offsetWidth);let r=Ya(this).getBoundingClientRect(),n=r.width-e-i,s=r.height-t-this.offsetHeight,{style:l}=H(this,Ka);l.setProperty("position","absolute"),l.setProperty("right",`${Math.max(0,n)}px`),l.setProperty("--_menu-bottom",`${s}px`);let u=getComputedStyle(this),A=l.getPropertyValue("--_menu-bottom")===u.bottom?s:parseFloat(u.bottom),_=r.height-A-parseFloat(u.marginBottom);this.style.setProperty("--_menu-max-height",`${_}px`)};Yn=new WeakSet;_l=function(i){let e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),t=e==null?void 0:e.querySelector('[role="menu"]'),{style:a}=H(this,Ka);if(i||a.setProperty("--media-menu-transition-in","none"),t){let r=t.offsetHeight,n=Math.max(t.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${n}px`),this.style.setProperty("min-height",`${r}px`),Y(this,Ji,Ga).call(this,n)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),Y(this,Ji,Ga).call(this);a.removeProperty("--media-menu-transition-in")};hl=new WeakSet;_m=function(i){var e;if(i.stopPropagation(),i.composedPath().includes(H(this,Al,Am))){(e=H(this,pi))==null||e.focus(),this.hidden=!0;return}let t=Y(this,Fa,qn).call(this,i);!t||t.hasAttribute("disabled")||(Y(this,Va,Zn).call(this,t),this.handleSelect(i))};Al=new WeakSet;Am=function(){var i;return(i=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:i.find(t=>t.matches('button[part~="back"]'))};pl=new WeakSet;Tm=function(i){if(i.target===this)return;Y(this,Tl,ym).call(this);let e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(let t of e)t.invokeTargetElement!=i.target&&i.newState=="open"&&t.getAttribute("aria-expanded")=="true"&&!t.invokeTargetElement.hidden&&t.invokeTargetElement.dispatchEvent(new Rt({relatedTarget:t}));for(let t of e)t.setAttribute("aria-expanded",`${!t.submenuElement.hidden}`);Y(this,Yn,_l).call(this,!0)};Tl=new WeakSet;ym=function(){let e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)};fl=new WeakSet;km=function(i){var e;ue(this,i.relatedTarget)||(H(this,fi)&&((e=H(this,pi))==null||e.focus()),H(this,xt)&&H(this,xt)!==i.relatedTarget&&!this.hidden&&(this.hidden=!0))};vl=new WeakSet;Sm=function(i){var e,t,a,r,n;let{key:s,ctrlKey:l,altKey:u,metaKey:c}=i;if(!(l||u||c)&&this.keysUsed.includes(s))if(i.preventDefault(),i.stopPropagation(),s==="Tab"){if(H(this,fi)){this.hidden=!0;return}i.shiftKey?(t=(e=this.previousElementSibling)==null?void 0:e.focus)==null||t.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else s==="Escape"?((n=H(this,pi))==null||n.focus(),H(this,fi)&&(this.hidden=!0)):s==="Enter"||s===" "?this.handleSelect(i):this.handleMove(i)};Fa=new WeakSet;qn=function(i){return i.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))};El=new WeakSet;Im=function(){return this.items.find(i=>i.tabIndex===0)};Va=new WeakSet;Zn=function(i){for(let e of this.items)e.tabIndex=e===i?0:-1};Kn=new WeakSet;bl=function(i,e){let t=[...this.checkedItems];i.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?i.checked=!i.checked:i.checked=!0,this.checkedItems.some((a,r)=>a!=t[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};oe.template=Cm;function Qf(i){return["menuitem","menuitemradio","menuitemcheckbox"].includes(i==null?void 0:i.role)}function Ya(i){var e;return(e=i.getAttribute("bounds")?We(i,`#${i.getAttribute("bounds")}`):q(i)||i.parentElement)!=null?e:i}d.customElements.get("media-chrome-menu")||d.customElements.define("media-chrome-menu",oe);var Ml=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},rt=(i,e,t)=>(Ml(i,e,"read from private field"),t?t.call(i):e.get(i)),ft=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},yl=(i,e,t,a)=>(Ml(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),at=(i,e,t)=>(Ml(i,e,"access private method"),t),zn,Za,kl,Mm,Ll,Lm,wl,wm,nt,ji,za,Sl,Rm,Qn,Il,xm=h.createElement("template");xm.innerHTML=`
  <style>
    :host {
      transition: var(--media-menu-item-transition,
        background .15s linear,
        opacity .2s ease-in-out
      );
      outline: var(--media-menu-item-outline, 0);
      outline-offset: var(--media-menu-item-outline-offset, -1px);
      cursor: var(--media-cursor, pointer);
      display: flex;
      align-items: center;
      align-self: stretch;
      justify-self: stretch;
      white-space: nowrap;
      white-space-collapse: collapse;
      text-wrap: nowrap;
      padding: .4em .8em .4em 1em;
    }

    :host(:focus-visible) {
      box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
      outline: var(--media-menu-item-hover-outline, 0);
      outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
    }

    :host(:hover) {
      cursor: var(--media-cursor, pointer);
      background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
      outline: var(--media-menu-item-hover-outline);
      outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
    }

    :host([aria-checked="true"]) {
      background: var(--media-menu-item-checked-background);
    }

    :host([hidden]) {
      display: none;
    }

    :host([disabled]) {
      pointer-events: none;
      color: rgba(255, 255, 255, .3);
    }

    slot:not([name]) {
      width: 100%;
    }

    slot:not([name="submenu"]) {
      display: inline-flex;
      align-items: center;
      transition: inherit;
      opacity: var(--media-menu-item-opacity, 1);
    }

    slot[name="description"] {
      justify-content: end;
    }

    slot[name="description"] > span {
      display: inline-block;
      margin-inline: 1em .2em;
      max-width: var(--media-menu-item-description-max-width, 100px);
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: .8em;
      font-weight: 400;
      text-align: right;
      position: relative;
      top: .04em;
    }

    slot[name="checked-indicator"] {
      display: none;
    }

    :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
      display: var(--media-menu-item-checked-indicator-display, inline-block);
    }

    
    svg, img, ::slotted(svg), ::slotted(img) {
      height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
      fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
      display: block;
    }

    
    [part~="indicator"],
    ::slotted([part~="indicator"]) {
      fill: var(--media-menu-item-indicator-fill,
        var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
      height: var(--media-menu-item-indicator-height, 1.25em);
      margin-right: .5ch;
    }

    [part~="checked-indicator"] {
      visibility: hidden;
    }

    :host([aria-checked="true"]) [part~="checked-indicator"] {
      visibility: visible;
    }
  </style>
  <slot name="checked-indicator">
    <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
      <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
    </svg>
  </slot>
  <slot name="prefix"></slot>
  <slot></slot>
  <slot name="description"></slot>
  <slot name="suffix"></slot>
  <slot name="submenu"></slot>
`;var Le={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"},Dt=class extends d.HTMLElement{constructor(){super(),ft(this,kl),ft(this,Ll),ft(this,wl),ft(this,ji),ft(this,Sl),ft(this,Qn),ft(this,zn,!1),ft(this,Za,void 0),ft(this,nt,()=>{var e,t;this.setAttribute("submenusize",`${this.submenuElement.items.length}`);let a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],n=(t=r==null?void 0:r.dataset.description)!=null?t:r==null?void 0:r.text,s=h.createElement("span");s.textContent=n!=null?n:"",a.replaceChildren(s)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.append(this.constructor.template.content.cloneNode(!0))),this.shadowRoot.addEventListener("slotchange",this)}static get observedAttributes(){return[Le.TYPE,Le.DISABLED,Le.CHECKED,Le.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),qa(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":at(this,kl,Mm).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":at(this,Sl,Rm).call(this,e);break;case"keyup":at(this,ji,za).call(this,e);break}}attributeChangedCallback(e,t,a){e===Le.CHECKED&&qa(this)&&!rt(this,zn)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===Le.TYPE&&a!==t?this.role="menuitem"+a:e===Le.DISABLED&&a!==t&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(Le.DISABLED)||this.enable(),this.role="menuitem"+this.type,yl(this,Za,Cl(this,this.parentNode)),at(this,Qn,Il).call(this)}disconnectedCallback(){this.disable(),at(this,Qn,Il).call(this),yl(this,Za,null)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=$t(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(Le.TYPE))!=null?e:""}set type(e){this.setAttribute(Le.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(Le.VALUE))!=null?e:this.text}set value(e){this.setAttribute(Le.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(qa(this))return this.getAttribute("aria-checked")==="true"}set checked(e){qa(this)&&(yl(this,zn,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){qa(this)||this.invokeTargetElement&&ue(this,e.target)&&this.invokeTargetElement.dispatchEvent(new Rt({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};zn=new WeakMap;Za=new WeakMap;kl=new WeakSet;Mm=function(i){let e=i.target;if(!(e!=null&&e.name))for(let a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?at(this,Ll,Lm).call(this):at(this,wl,wm).call(this))};Ll=new WeakSet;Lm=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",rt(this,nt)),this.submenuElement.addEventListener("addmenuitem",rt(this,nt)),this.submenuElement.addEventListener("removemenuitem",rt(this,nt)),rt(this,nt).call(this)};wl=new WeakSet;wm=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",rt(this,nt)),this.submenuElement.removeEventListener("addmenuitem",rt(this,nt)),this.submenuElement.removeEventListener("removemenuitem",rt(this,nt)),rt(this,nt).call(this)};nt=new WeakMap;ji=new WeakSet;za=function(i){let{key:e}=i;if(!this.keysUsed.includes(e)){this.removeEventListener("keyup",at(this,ji,za));return}this.handleClick(i)};Sl=new WeakSet;Rm=function(i){let{metaKey:e,altKey:t,key:a}=i;if(e||t||!this.keysUsed.includes(a)){this.removeEventListener("keyup",at(this,ji,za));return}this.addEventListener("keyup",at(this,ji,za),{once:!0})};Qn=new WeakSet;Il=function(){var i;let e=(i=rt(this,Za))==null?void 0:i.radioGroupItems;if(!e)return;let t=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();t||(t=e[0]);for(let a of e)a.setAttribute("aria-checked","false");t==null||t.setAttribute("aria-checked","true")};Dt.template=xm;function qa(i){return i.type==="radio"||i.type==="checkbox"}function Cl(i,e){if(!i)return null;let{host:t}=i.getRootNode();return!e&&t?Cl(i,t):e!=null&&e.items?e:Cl(e,e==null?void 0:e.parentNode)}d.customElements.get("media-chrome-menu-item")||d.customElements.define("media-chrome-menu-item",Dt);var Dm=h.createElement("template");Dm.innerHTML=oe.template.innerHTML+`
  <style>
    :host {
      --_menu-bg: rgb(20 20 30 / .8);
      background: var(--media-settings-menu-background,
          var(--media-menu-background,
            var(--media-control-background,
              var(--media-secondary-color, var(--_menu-bg)))));
      min-width: var(--media-settings-menu-min-width, 170px);
      border-radius: 2px 2px 0 0;
      overflow: hidden;
    }

    @-moz-document url-prefix() {
      :host{
        --_menu-bg: rgb(20 20 30);
      }
    }

    :host([role="menu"]) {
      
      justify-content: end;
    }

    slot:not([name]) {
      justify-content: var(--media-settings-menu-justify-content);
      flex-direction: var(--media-settings-menu-flex-direction, column);
      overflow: visible;
    }

    #container.has-expanded {
      --media-settings-menu-item-opacity: 0;
    }
  </style>
`;var Qa=class extends oe{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:q(this).querySelector("media-settings-menu-button")}};Qa.template=Dm;d.customElements.get("media-settings-menu")||d.customElements.define("media-settings-menu",Qa);var Om,Xn=h.createElement("template");Xn.innerHTML=Dt.template.innerHTML+`
  <style>
    slot:not([name="submenu"]) {
      opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
    }

    :host([aria-expanded="true"]:hover) {
      background: transparent;
    }
  </style>
`;(Om=Xn.content)!=null&&Om.querySelector&&(Xn.content.querySelector('slot[name="suffix"]').innerHTML=`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `);var Xa=class extends Dt{};Xa.template=Xn;d.customElements.get("media-settings-menu-item")||d.customElements.define("media-settings-menu-item",Xa);var be=class extends K{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=$t(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new Rt({relatedTarget:this}))}};d.customElements.get("media-chrome-menu-button")||d.customElements.define("media-chrome-menu-button",be);var Nm=h.createElement("template");Nm.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
    </svg>
  </slot>
`;var Jn=class extends be{static get observedAttributes(){return[...super.observedAttributes,"target"]}constructor(){super({slotTemplate:Nm,tooltipContent:v("Settings")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",v("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:q(this).querySelector("media-settings-menu")}};d.customElements.get("media-settings-menu-button")||d.customElements.define("media-settings-menu-button",Jn);var Ol=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Pm=(i,e,t)=>(Ol(i,e,"read from private field"),t?t.call(i):e.get(i)),jn=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Rl=(i,e,t,a)=>(Ol(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),eo=(i,e,t)=>(Ol(i,e,"access private method"),t),Ja,ao,to,xl,io,Dl,ro=class extends oe{constructor(){super(...arguments),jn(this,to),jn(this,io),jn(this,Ja,[]),jn(this,ao,void 0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_AUDIO_TRACK_LIST,o.MEDIA_AUDIO_TRACK_ENABLED,o.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_AUDIO_TRACK_ENABLED&&t!==a?this.value=a:e===o.MEDIA_AUDIO_TRACK_LIST&&t!==a&&(Rl(this,Ja,Pd(a!=null?a:"")),eo(this,to,xl).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",eo(this,io,Dl))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",eo(this,io,Dl))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=q(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return Pm(this,Ja)}set mediaAudioTrackList(e){Rl(this,Ja,e),eo(this,to,xl).call(this)}get mediaAudioTrackEnabled(){var e;return(e=M(this,o.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){L(this,o.MEDIA_AUDIO_TRACK_ENABLED,e)}};Ja=new WeakMap;ao=new WeakMap;to=new WeakSet;xl=function(){if(Pm(this,ao)===JSON.stringify(this.mediaAudioTrackList))return;Rl(this,ao,JSON.stringify(this.mediaAudioTrackList));let i=this.mediaAudioTrackList;this.defaultSlot.textContent="";for(let e of i){let t=this.formatMenuItemText(e.label,e),a=it({type:"radio",text:t,value:`${e.id}`,checked:e.enabled});a.prepend(Be(this,"checked-indicator")),this.defaultSlot.append(a)}};io=new WeakSet;Dl=function(){if(this.value==null)return;let i=new d.CustomEvent(f.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(i)};d.customElements.get("media-audio-track-menu")||d.customElements.define("media-audio-track-menu",ro);var Xf=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`,Um=h.createElement("template");Um.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">${Xf}</slot>
`;var no=class extends be{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_AUDIO_TRACK_ENABLED,o.MEDIA_AUDIO_TRACK_UNAVAILABLE]}constructor(){super({slotTemplate:Um,tooltipContent:v("Audio")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",v("Audio"))}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=q(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=M(this,o.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){L(this,o.MEDIA_AUDIO_TRACK_ENABLED,e)}};d.customElements.get("media-audio-track-menu-button")||d.customElements.define("media-audio-track-menu-button",no);var Hl=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},Jf=(i,e,t)=>(Hl(i,e,"read from private field"),t?t.call(i):e.get(i)),Nl=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},jf=(i,e,t,a)=>(Hl(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Pl=(i,e,t)=>(Hl(i,e,"access private method"),t),so,Ul,Wm,oo,Bl,ev=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`,$m=h.createElement("template");$m.innerHTML=oe.template.innerHTML+`
  <slot name="captions-indicator" hidden>${ev}</slot>`;var ja=class extends oe{constructor(){super(...arguments),Nl(this,Ul),Nl(this,oo),Nl(this,so,void 0)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_SUBTITLES_LIST,o.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_SUBTITLES_LIST&&t!==a?Pl(this,Ul,Wm).call(this):e===o.MEDIA_SUBTITLES_SHOWING&&t!==a&&(this.value=a)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Pl(this,oo,Bl))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Pl(this,oo,Bl))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:q(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return Bm(this,o.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Hm(this,o.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Bm(this,o.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Hm(this,o.MEDIA_SUBTITLES_SHOWING,e)}};so=new WeakMap;Ul=new WeakSet;Wm=function(){var i;if(Jf(this,so)===JSON.stringify(this.mediaSubtitlesList))return;jf(this,so,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";let e=!this.value,t=it({type:"radio",text:this.formatMenuItemText("Off"),value:"off",checked:e});t.prepend(Be(this,"checked-indicator")),this.defaultSlot.append(t);let a=this.mediaSubtitlesList;for(let r of a){let n=it({type:"radio",text:this.formatMenuItemText(r.label,r),value:Cr(r),checked:this.value==Cr(r)});n.prepend(Be(this,"checked-indicator")),((i=r.kind)!=null?i:"subs")==="captions"&&n.append(Be(this,"captions-indicator")),this.defaultSlot.append(n)}};oo=new WeakSet;Bl=function(){let i=this.mediaSubtitlesShowing,e=this.getAttribute(o.MEDIA_SUBTITLES_SHOWING),t=this.value!==e;if(i!=null&&i.length&&t&&this.dispatchEvent(new d.CustomEvent(f.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:i})),!this.value||!t)return;let a=new d.CustomEvent(f.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};ja.template=$m;var Bm=(i,e)=>{let t=i.getAttribute(e);return t?Kt(t):[]},Hm=(i,e,t)=>{if(!(t!=null&&t.length)){i.removeAttribute(e);return}let a=dt(t);i.getAttribute(e)!==a&&i.setAttribute(e,a)};d.customElements.get("media-captions-menu")||d.customElements.define("media-captions-menu",ja);var tv=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},iv=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},av=(i,e,t,a)=>(tv(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),Wl,rv=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,nv=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,Gm=h.createElement("template");Gm.innerHTML=`
  <style>
    :host([aria-checked="true"]) slot[name=off] {
      display: none !important;
    }

    
    :host(:not([aria-checked="true"])) slot[name=on] {
      display: none !important;
    }

    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="on">${rv}</slot>
    <slot name="off">${nv}</slot>
  </slot>
`;var Fm=i=>{i.setAttribute("aria-checked",Mr(i).toString())},lo=class extends be{constructor(e={}){super({slotTemplate:Gm,tooltipContent:v("Captions"),...e}),iv(this,Wl,void 0),av(this,Wl,!1)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_SUBTITLES_LIST,o.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",v("closed captions")),Fm(this)}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_SUBTITLES_SHOWING&&Fm(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=q(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return Vm(this,o.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Km(this,o.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Vm(this,o.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Km(this,o.MEDIA_SUBTITLES_SHOWING,e)}};Wl=new WeakMap;var Vm=(i,e)=>{let t=i.getAttribute(e);return t?Kt(t):[]},Km=(i,e,t)=>{if(!(t!=null&&t.length)){i.removeAttribute(e);return}let a=dt(t);i.getAttribute(e)!==a&&i.setAttribute(e,a)};d.customElements.get("media-captions-menu-button")||d.customElements.define("media-captions-menu-button",lo);var Ym=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},uo=(i,e,t)=>(Ym(i,e,"read from private field"),t?t.call(i):e.get(i)),$l=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},er=(i,e,t)=>(Ym(i,e,"access private method"),t),ea,tr,co,mo,Vl,Fl={RATES:"rates"},ho=class extends oe{constructor(){super(),$l(this,tr),$l(this,mo),$l(this,ea,new $e(this,Fl.RATES,{defaultValue:Ss})),er(this,tr,co).call(this)}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE,Fl.RATES]}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_PLAYBACK_RATE&&t!=a?this.value=a:e===Fl.RATES&&t!=a&&(uo(this,ea).value=a,er(this,tr,co).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",er(this,mo,Vl))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",er(this,mo,Vl))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:q(this).querySelector("media-playback-rate-menu-button")}get rates(){return uo(this,ea)}set rates(e){e?Array.isArray(e)&&(uo(this,ea).value=e.join(" ")):uo(this,ea).value="",er(this,tr,co).call(this)}get mediaPlaybackRate(){return x(this,o.MEDIA_PLAYBACK_RATE,Ni)}set mediaPlaybackRate(e){P(this,o.MEDIA_PLAYBACK_RATE,e)}};ea=new WeakMap;tr=new WeakSet;co=function(){this.defaultSlot.textContent="";for(let i of this.rates){let e=it({type:"radio",text:this.formatMenuItemText(`${i}x`,i),value:i,checked:this.mediaPlaybackRate==i});e.prepend(Be(this,"checked-indicator")),this.defaultSlot.append(e)}};mo=new WeakSet;Vl=function(){if(!this.value)return;let i=new d.CustomEvent(f.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(i)};d.customElements.get("media-playback-rate-menu")||d.customElements.define("media-playback-rate-menu",ho);var ov=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},po=(i,e,t)=>(ov(i,e,"read from private field"),t?t.call(i):e.get(i)),sv=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},ta,Kl={RATES:"rates"},lv=[1,1.2,1.5,1.7,2],Gl=1,qm=h.createElement("template");qm.innerHTML=`
  <style>
    :host {
      min-width: 5ch;
      padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
    }
    
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon"></slot>
`;var fo=class extends be{constructor(e={}){super({slotTemplate:qm,tooltipContent:v("Playback rate"),...e}),sv(this,ta,new $e(this,Kl.RATES,{defaultValue:lv})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${Gl}x`}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_PLAYBACK_RATE,Kl.RATES]}attributeChangedCallback(e,t,a){if(super.attributeChangedCallback(e,t,a),e===Kl.RATES&&(po(this,ta).value=a),e===o.MEDIA_PLAYBACK_RATE){let r=a?+a:Number.NaN,n=Number.isNaN(r)?Gl:r;this.container.innerHTML=`${n}x`,this.setAttribute("aria-label",v("Playback rate {playbackRate}",{playbackRate:n}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:q(this).querySelector("media-playback-rate-menu")}get rates(){return po(this,ta)}set rates(e){e?Array.isArray(e)&&(po(this,ta).value=e.join(" ")):po(this,ta).value=""}get mediaPlaybackRate(){return x(this,o.MEDIA_PLAYBACK_RATE,Gl)}set mediaPlaybackRate(e){P(this,o.MEDIA_PLAYBACK_RATE,e)}};ta=new WeakMap;d.customElements.get("media-playback-rate-menu-button")||d.customElements.define("media-playback-rate-menu-button",fo);var ql=(i,e,t)=>{if(!e.has(i))throw TypeError("Cannot "+t)},ir=(i,e,t)=>(ql(i,e,"read from private field"),t?t.call(i):e.get(i)),vo=(i,e,t)=>{if(e.has(i))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(i):e.set(i,t)},Zm=(i,e,t,a)=>(ql(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),ia=(i,e,t)=>(ql(i,e,"access private method"),t),ar,ra,aa,rr,Eo,Yl,bo=class extends oe{constructor(){super(...arguments),vo(this,aa),vo(this,Eo),vo(this,ar,[]),vo(this,ra,{})}static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_RENDITION_LIST,o.MEDIA_RENDITION_SELECTED,o.MEDIA_RENDITION_UNAVAILABLE,o.MEDIA_HEIGHT]}attributeChangedCallback(e,t,a){super.attributeChangedCallback(e,t,a),e===o.MEDIA_RENDITION_SELECTED&&t!==a?(this.value=a!=null?a:"auto",ia(this,aa,rr).call(this)):e===o.MEDIA_RENDITION_LIST&&t!==a?(Zm(this,ar,Od(a)),ia(this,aa,rr).call(this)):e===o.MEDIA_HEIGHT&&t!==a&&ia(this,aa,rr).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ia(this,Eo,Yl))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ia(this,Eo,Yl))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:q(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return ir(this,ar)}set mediaRenditionList(e){Zm(this,ar,e),ia(this,aa,rr).call(this)}get mediaRenditionSelected(){return M(this,o.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){L(this,o.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return x(this,o.MEDIA_HEIGHT)}set mediaHeight(e){P(this,o.MEDIA_HEIGHT,e)}};ar=new WeakMap;ra=new WeakMap;aa=new WeakSet;rr=function(){if(ir(this,ra).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&ir(this,ra).mediaHeight===this.mediaHeight)return;ir(this,ra).mediaRenditionList=JSON.stringify(this.mediaRenditionList),ir(this,ra).mediaHeight=this.mediaHeight;let i=this.mediaRenditionList.sort((n,s)=>s.height-n.height);for(let n of i)n.selected=n.id===this.mediaRenditionSelected;this.defaultSlot.textContent="";let e=!this.mediaRenditionSelected;for(let n of i){let s=this.formatMenuItemText(`${Math.min(n.width,n.height)}p`,n),l=it({type:"radio",text:s,value:`${n.id}`,checked:n.selected&&!e});l.prepend(Be(this,"checked-indicator")),this.defaultSlot.append(l)}let t=e?this.formatMenuItemText(`Auto (${this.mediaHeight}p)`):this.formatMenuItemText("Auto"),a=it({type:"radio",text:t,value:"auto",checked:e}),r=this.mediaHeight>0?`Auto (${this.mediaHeight}p)`:"Auto";a.dataset.description=r,a.prepend(Be(this,"checked-indicator")),this.defaultSlot.append(a)};Eo=new WeakSet;Yl=function(){if(this.value==null)return;let i=new d.CustomEvent(f.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(i)};d.customElements.get("media-rendition-menu")||d.customElements.define("media-rendition-menu",bo);var dv=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`,zm=h.createElement("template");zm.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">${dv}</slot>
`;var go=class extends be{static get observedAttributes(){return[...super.observedAttributes,o.MEDIA_RENDITION_SELECTED,o.MEDIA_RENDITION_UNAVAILABLE,o.MEDIA_HEIGHT]}constructor(){super({slotTemplate:zm,tooltipContent:v("Quality")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",v("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:q(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return M(this,o.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){L(this,o.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return x(this,o.MEDIA_HEIGHT)}set mediaHeight(e){P(this,o.MEDIA_HEIGHT,e)}};d.customElements.get("media-rendition-menu-button")||d.customElements.define("media-rendition-menu-button",go);var Zl=_i.createElement("template");"innerHTML"in Zl&&(Zl.innerHTML=hm);var Qm,Xm,_o=class extends ci{};_o.template=(Xm=(Qm=Zl.content)==null?void 0:Qm.children)==null?void 0:Xm[0];le.customElements.get("media-theme-gerwig")||le.customElements.define("media-theme-gerwig",_o);var uv="gerwig";var vt={SRC:"src",POSTER:"poster"},m={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",AD_TAG_URL:"adtagurl"},zl=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","proudlydisplaymuxbadge","mediaadbreak"];function cv(i,e){var a,r,n;return{src:!i.playbackId&&i.src,playbackId:i.playbackId,hasSrc:!!i.playbackId||!!i.src||!!i.currentSrc,poster:i.poster,storyboard:i.storyboard,storyboardSrc:i.getAttribute(m.STORYBOARD_SRC),placeholder:i.getAttribute("placeholder"),themeTemplate:hv(i),thumbnailTime:!i.tokens.thumbnail&&i.thumbnailTime,autoplay:i.autoplay,crossOrigin:i.crossOrigin,loop:i.loop,noHotKeys:i.hasAttribute(m.NOHOTKEYS),hotKeys:i.getAttribute(m.HOTKEYS),muted:i.muted,paused:i.paused,preload:i.preload,envKey:i.envKey,preferCmcd:i.preferCmcd,debug:i.debug,disableTracking:i.disableTracking,disableCookies:i.disableCookies,tokens:i.tokens,beaconCollectionDomain:i.beaconCollectionDomain,maxResolution:i.maxResolution,minResolution:i.minResolution,programStartTime:i.programStartTime,programEndTime:i.programEndTime,assetStartTime:i.assetStartTime,assetEndTime:i.assetEndTime,renditionOrder:i.renditionOrder,metadata:i.metadata,playerInitTime:i.playerInitTime,playerSoftwareName:i.playerSoftwareName,playerSoftwareVersion:i.playerSoftwareVersion,startTime:i.startTime,preferPlayback:i.preferPlayback,audio:i.audio,defaultStreamType:i.defaultStreamType,targetLiveWindow:i.getAttribute(b.Attributes.TARGET_LIVE_WINDOW),streamType:Da(i.getAttribute(b.Attributes.STREAM_TYPE)),primaryColor:i.getAttribute(m.PRIMARY_COLOR),secondaryColor:i.getAttribute(m.SECONDARY_COLOR),accentColor:i.getAttribute(m.ACCENT_COLOR),forwardSeekOffset:i.forwardSeekOffset,backwardSeekOffset:i.backwardSeekOffset,defaultHiddenCaptions:i.defaultHiddenCaptions,defaultDuration:i.defaultDuration,defaultShowRemainingTime:i.defaultShowRemainingTime,hideDuration:pv(i),playbackRates:i.getAttribute(m.PLAYBACK_RATES),customDomain:(a=i.getAttribute(b.Attributes.CUSTOM_DOMAIN))!=null?a:void 0,title:i.getAttribute(m.TITLE),videoTitle:(r=i.getAttribute(m.VIDEO_TITLE))!=null?r:i.getAttribute(m.TITLE),novolumepref:i.hasAttribute(m.NO_VOLUME_PREF),castReceiver:i.castReceiver,muxVideoElement:i.muxVideoElement,adTagUrl:(n=i.getAttribute(m.AD_TAG_URL))!=null?n:void 0,adBreak:i.adBreak,proudlyDisplayMuxBadge:i.hasAttribute(m.PROUDLY_DISPLAY_MUX_BADGE),...e,extraSourceParams:i.extraSourceParams,allowAdBlocker:i.getAttribute("allow-ad-blocker")}}var mv=an.formatErrorMessage;an.formatErrorMessage=i=>{var e,t;if(i instanceof b.MediaError){let a=mm(i,!1);return`
      ${a!=null&&a.title?`<h3>${a.title}</h3>`:""}
      ${a!=null&&a.message||a!=null&&a.linkUrl?`<p>
        ${a==null?void 0:a.message}
        ${a!=null&&a.linkUrl?`<a
              href="${a.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(e=a.linkText)!=null?e:""} ${(0,R.i18n)("(opens in a new window)")}"
              >${(t=a.linkText)!=null?t:a.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return mv(i)};function hv(i){var t,a;let e=i.theme;if(e){let r=(a=(t=i.getRootNode())==null?void 0:t.getElementById)==null?void 0:a.call(t,e);if(r&&r instanceof HTMLTemplateElement)return r;e.startsWith("media-theme-")||(e=`media-theme-${e}`);let n=le.customElements.get(e);if(n!=null&&n.template)return n.template}}function pv(i){var t;let e=(t=i.mediaController)==null?void 0:t.querySelector("media-time-display");return e&&getComputedStyle(e).getPropertyValue("--media-duration-display-display").trim()==="none"}function Jm(i){let e=i.videoTitle?{video_title:i.videoTitle}:{};return i.getAttributeNames().filter(t=>t.startsWith("metadata-")).reduce((t,a)=>{let r=i.getAttribute(a);return r!==null&&(t[a.replace(/^metadata-/,"").replace(/-/g,"_")]=r),t},e)}var fv=Object.values(b.Attributes),vv=Object.values(vt),Ev=Object.values(m),Ql=wn(),Xl="mux-player",jm={isDialogOpen:!1},bv={redundant_streams:!0},or,sr,lr,Ut,dr,vi,W,Ot,eh,Jl,Nt,th,ih,ah,rh,nr=class extends Qs{constructor(){super();pe(this,W);pe(this,or);pe(this,sr,!1);pe(this,lr,{});pe(this,Ut,!0);pe(this,dr,new Ln(this,"hotkeys"));pe(this,vi,{...jm,onCloseErrorDialog:t=>{var r;((r=t.composedPath()[0])==null?void 0:r.localName)==="media-error-dialog"&&Q(this,W,Jl).call(this,{isDialogOpen:!1})},onFocusInErrorDialog:t=>{var n;if(((n=t.composedPath()[0])==null?void 0:n.localName)!=="media-error-dialog")return;qs(this,_i.activeElement)||t.preventDefault()}});Ae(this,or,(0,R.generatePlayerInitTime)()),this.attachShadow({mode:"open"}),Q(this,W,eh).call(this),this.isConnected&&Q(this,W,Ot).call(this)}static get NAME(){return Xl}static get VERSION(){return Ql}static get observedAttributes(){var t;return[...(t=Qs.observedAttributes)!=null?t:[],...vv,...fv,...Ev]}get mediaTheme(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("media-theme")}get mediaController(){var t,a;return(a=(t=this.mediaTheme)==null?void 0:t.shadowRoot)==null?void 0:a.querySelector("media-controller")}connectedCallback(){var a;let t=this.media;t&&((a=this.media)==null||a.addEventListener("adbreakchange",()=>{Q(this,W,Nt).call(this)}),t.metadata=Jm(this))}attributeChangedCallback(t,a,r){switch(Q(this,W,Ot).call(this),super.attributeChangedCallback(t,a,r),t){case m.HOTKEYS:B(this,dr).value=r;break;case m.THUMBNAIL_TIME:{r!=null&&this.tokens.thumbnail&&Je((0,R.i18n)("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case m.THUMBNAIL_TOKEN:{if(r){let s=(0,R.parseJwt)(r);if(s){let{aud:l}=s,u=R.MuxJWTAud.THUMBNAIL;l!==u&&Je((0,R.i18n)("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:l,expectedAud:u,tokenNamePrefix:"thumbnail"}))}}break}case m.STORYBOARD_TOKEN:{if(r){let s=(0,R.parseJwt)(r);if(s){let{aud:l}=s,u=R.MuxJWTAud.STORYBOARD;l!==u&&Je((0,R.i18n)("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:l,expectedAud:u,tokenNamePrefix:"storyboard"}))}}break}case m.DRM_TOKEN:{if(r){let s=(0,R.parseJwt)(r);if(s){let{aud:l}=s,u=R.MuxJWTAud.DRM;l!==u&&Je((0,R.i18n)("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:l,expectedAud:u,tokenNamePrefix:"drm"}))}}break}case b.Attributes.PLAYBACK_ID:{r!=null&&r.includes("?token")&&Ee((0,R.i18n)("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:r}));break}case b.Attributes.STREAM_TYPE:r&&![R.StreamTypes.LIVE,R.StreamTypes.ON_DEMAND,R.StreamTypes.UNKNOWN].includes(r)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=r.includes("dvr")?Number.POSITIVE_INFINITY:0:Zs({file:"invalid-stream-type.md",message:(0,R.i18n)("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):r===R.StreamTypes.LIVE?this.getAttribute(m.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN}[b.Attributes.PLAYBACK_ID,vt.SRC,m.PLAYBACK_TOKEN].includes(t)&&a!==r&&Ae(this,vi,{...B(this,vi),...jm}),Q(this,W,Nt).call(this,{[Fc(t)]:r})}async requestFullscreen(t){var a;if(!(!this.mediaController||this.mediaController.hasAttribute(o.MEDIA_IS_FULLSCREEN)))return(a=this.mediaController)==null||a.dispatchEvent(new le.CustomEvent(f.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((r,n)=>{var s;(s=this.mediaController)==null||s.addEventListener(Ce.MEDIA_IS_FULLSCREEN,()=>r(),{once:!0})})}async exitFullscreen(){var t;if(!(!this.mediaController||!this.mediaController.hasAttribute(o.MEDIA_IS_FULLSCREEN)))return(t=this.mediaController)==null||t.dispatchEvent(new le.CustomEvent(f.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((a,r)=>{var n;(n=this.mediaController)==null||n.addEventListener(Ce.MEDIA_IS_FULLSCREEN,()=>a(),{once:!0})})}get preferCmcd(){var t;return(t=this.getAttribute(b.Attributes.PREFER_CMCD))!=null?t:void 0}set preferCmcd(t){t!==this.preferCmcd&&(t?R.CmcdTypeValues.includes(t)?this.setAttribute(b.Attributes.PREFER_CMCD,t):Je(`Invalid value for preferCmcd. Must be one of ${R.CmcdTypeValues.join()}`):this.removeAttribute(b.Attributes.PREFER_CMCD))}get hasPlayed(){var t,a;return(a=(t=this.mediaController)==null?void 0:t.hasAttribute(o.MEDIA_HAS_PLAYED))!=null?a:!1}get inLiveWindow(){var t;return(t=this.mediaController)==null?void 0:t.hasAttribute(o.MEDIA_TIME_IS_LIVE)}get _hls(){var t;return(t=this.media)==null?void 0:t._hls}get mux(){var t;return(t=this.media)==null?void 0:t.mux}get theme(){var t;return(t=this.getAttribute(m.THEME))!=null?t:uv}set theme(t){this.setAttribute(m.THEME,`${t}`)}get themeProps(){let t=this.mediaTheme;if(!t)return;let a={};for(let r of t.getAttributeNames()){if(zl.includes(r))continue;let n=t.getAttribute(r);a[Mn(r)]=n===""?!0:n}return a}set themeProps(t){var r,n;Q(this,W,Ot).call(this);let a={...this.themeProps,...t};for(let s in a){if(zl.includes(s))continue;let l=t==null?void 0:t[s];typeof l=="boolean"||l==null?(r=this.mediaTheme)==null||r.toggleAttribute(Cn(s),!!l):(n=this.mediaTheme)==null||n.setAttribute(Cn(s),l)}}get playbackId(){var t;return(t=this.getAttribute(b.Attributes.PLAYBACK_ID))!=null?t:void 0}set playbackId(t){t?this.setAttribute(b.Attributes.PLAYBACK_ID,t):this.removeAttribute(b.Attributes.PLAYBACK_ID)}get src(){var t,a;return this.playbackId?(t=Pt(this,vt.SRC))!=null?t:void 0:(a=this.getAttribute(vt.SRC))!=null?a:void 0}set src(t){t?this.setAttribute(vt.SRC,t):this.removeAttribute(vt.SRC)}get poster(){var r;let t=this.getAttribute(vt.POSTER);if(t!=null)return t;let{tokens:a}=this;if(a.playback&&!a.thumbnail){Je("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return Wc(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(r=this.thumbnailTime)!=null?r:this.startTime,programTime:this.programStartTime,token:a.thumbnail})}set poster(t){t||t===""?this.setAttribute(vt.POSTER,t):this.removeAttribute(vt.POSTER)}get storyboardSrc(){var t;return(t=this.getAttribute(m.STORYBOARD_SRC))!=null?t:void 0}set storyboardSrc(t){t?this.setAttribute(m.STORYBOARD_SRC,t):this.removeAttribute(m.STORYBOARD_SRC)}get storyboard(){let{tokens:t}=this;if(this.storyboardSrc&&!t.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[R.StreamTypes.LIVE,R.StreamTypes.UNKNOWN].includes(this.streamType)||t.playback&&!t.storyboard))return $c(this.playbackId,{customDomain:this.customDomain,token:t.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(m.AUDIO)}set audio(t){if(!t){this.removeAttribute(m.AUDIO);return}this.setAttribute(m.AUDIO,"")}get hotkeys(){return B(this,dr)}get nohotkeys(){return this.hasAttribute(m.NOHOTKEYS)}set nohotkeys(t){if(!t){this.removeAttribute(m.NOHOTKEYS);return}this.setAttribute(m.NOHOTKEYS,"")}get thumbnailTime(){return ce(this.getAttribute(m.THUMBNAIL_TIME))}set thumbnailTime(t){this.setAttribute(m.THUMBNAIL_TIME,`${t}`)}get videoTitle(){var t,a;return(a=(t=this.getAttribute(m.VIDEO_TITLE))!=null?t:this.getAttribute(m.TITLE))!=null?a:""}set videoTitle(t){t!==this.videoTitle&&(t?this.setAttribute(m.VIDEO_TITLE,t):this.removeAttribute(m.VIDEO_TITLE))}get placeholder(){var t;return(t=Pt(this,m.PLACEHOLDER))!=null?t:""}set placeholder(t){this.setAttribute(m.PLACEHOLDER,`${t}`)}get primaryColor(){var a,r;let t=this.getAttribute(m.PRIMARY_COLOR);if(t!=null||this.mediaTheme&&(t=(r=(a=le.getComputedStyle(this.mediaTheme))==null?void 0:a.getPropertyValue("--_primary-color"))==null?void 0:r.trim(),t))return t}set primaryColor(t){this.setAttribute(m.PRIMARY_COLOR,`${t}`)}get secondaryColor(){var a,r;let t=this.getAttribute(m.SECONDARY_COLOR);if(t!=null||this.mediaTheme&&(t=(r=(a=le.getComputedStyle(this.mediaTheme))==null?void 0:a.getPropertyValue("--_secondary-color"))==null?void 0:r.trim(),t))return t}set secondaryColor(t){this.setAttribute(m.SECONDARY_COLOR,`${t}`)}get accentColor(){var a,r;let t=this.getAttribute(m.ACCENT_COLOR);if(t!=null||this.mediaTheme&&(t=(r=(a=le.getComputedStyle(this.mediaTheme))==null?void 0:a.getPropertyValue("--_accent-color"))==null?void 0:r.trim(),t))return t}set accentColor(t){this.setAttribute(m.ACCENT_COLOR,`${t}`)}get defaultShowRemainingTime(){return this.hasAttribute(m.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(t){t?this.setAttribute(m.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(m.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(m.PLAYBACK_RATES))return this.getAttribute(m.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(t=>Number(t)).filter(t=>!Number.isNaN(t)).sort((t,a)=>t-a)}set playbackRates(t){if(!t){this.removeAttribute(m.PLAYBACK_RATES);return}this.setAttribute(m.PLAYBACK_RATES,t.join(" "))}get forwardSeekOffset(){var t;return(t=ce(this.getAttribute(m.FORWARD_SEEK_OFFSET)))!=null?t:10}set forwardSeekOffset(t){this.setAttribute(m.FORWARD_SEEK_OFFSET,`${t}`)}get backwardSeekOffset(){var t;return(t=ce(this.getAttribute(m.BACKWARD_SEEK_OFFSET)))!=null?t:10}set backwardSeekOffset(t){this.setAttribute(m.BACKWARD_SEEK_OFFSET,`${t}`)}get defaultHiddenCaptions(){return this.hasAttribute(m.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(t){t?this.setAttribute(m.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(m.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return ce(this.getAttribute(m.DEFAULT_DURATION))}set defaultDuration(t){t==null?this.removeAttribute(m.DEFAULT_DURATION):this.setAttribute(m.DEFAULT_DURATION,`${t}`)}get playerInitTime(){return this.hasAttribute(b.Attributes.PLAYER_INIT_TIME)?ce(this.getAttribute(b.Attributes.PLAYER_INIT_TIME)):B(this,or)}set playerInitTime(t){t!=this.playerInitTime&&(t==null?this.removeAttribute(b.Attributes.PLAYER_INIT_TIME):this.setAttribute(b.Attributes.PLAYER_INIT_TIME,`${+t}`))}get playerSoftwareName(){var t;return(t=this.getAttribute(b.Attributes.PLAYER_SOFTWARE_NAME))!=null?t:Xl}get playerSoftwareVersion(){var t;return(t=this.getAttribute(b.Attributes.PLAYER_SOFTWARE_VERSION))!=null?t:Ql}get beaconCollectionDomain(){var t;return(t=this.getAttribute(b.Attributes.BEACON_COLLECTION_DOMAIN))!=null?t:void 0}set beaconCollectionDomain(t){t!==this.beaconCollectionDomain&&(t?this.setAttribute(b.Attributes.BEACON_COLLECTION_DOMAIN,t):this.removeAttribute(b.Attributes.BEACON_COLLECTION_DOMAIN))}get adBreak(){var a;let t=this.media;return t&&(a=t.getAttribute("adBreak"))!=null?a:!1}get maxResolution(){var t;return(t=this.getAttribute(b.Attributes.MAX_RESOLUTION))!=null?t:void 0}set maxResolution(t){t!==this.maxResolution&&(t?this.setAttribute(b.Attributes.MAX_RESOLUTION,t):this.removeAttribute(b.Attributes.MAX_RESOLUTION))}get minResolution(){var t;return(t=this.getAttribute(b.Attributes.MIN_RESOLUTION))!=null?t:void 0}set minResolution(t){t!==this.minResolution&&(t?this.setAttribute(b.Attributes.MIN_RESOLUTION,t):this.removeAttribute(b.Attributes.MIN_RESOLUTION))}get renditionOrder(){var t;return(t=this.getAttribute(b.Attributes.RENDITION_ORDER))!=null?t:void 0}set renditionOrder(t){t!==this.renditionOrder&&(t?this.setAttribute(b.Attributes.RENDITION_ORDER,t):this.removeAttribute(b.Attributes.RENDITION_ORDER))}get programStartTime(){return ce(this.getAttribute(b.Attributes.PROGRAM_START_TIME))}set programStartTime(t){t==null?this.removeAttribute(b.Attributes.PROGRAM_START_TIME):this.setAttribute(b.Attributes.PROGRAM_START_TIME,`${t}`)}get programEndTime(){return ce(this.getAttribute(b.Attributes.PROGRAM_END_TIME))}set programEndTime(t){t==null?this.removeAttribute(b.Attributes.PROGRAM_END_TIME):this.setAttribute(b.Attributes.PROGRAM_END_TIME,`${t}`)}get assetStartTime(){return ce(this.getAttribute(b.Attributes.ASSET_START_TIME))}set assetStartTime(t){t==null?this.removeAttribute(b.Attributes.ASSET_START_TIME):this.setAttribute(b.Attributes.ASSET_START_TIME,`${t}`)}get assetEndTime(){return ce(this.getAttribute(b.Attributes.ASSET_END_TIME))}set assetEndTime(t){t==null?this.removeAttribute(b.Attributes.ASSET_END_TIME):this.setAttribute(b.Attributes.ASSET_END_TIME,`${t}`)}get extraSourceParams(){return this.hasAttribute(m.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(m.EXTRA_SOURCE_PARAMS)).entries()].reduce((t,[a,r])=>(t[a]=r,t),{}):bv}set extraSourceParams(t){t==null?this.removeAttribute(m.EXTRA_SOURCE_PARAMS):this.setAttribute(m.EXTRA_SOURCE_PARAMS,new URLSearchParams(t).toString())}get customDomain(){var t;return(t=this.getAttribute(b.Attributes.CUSTOM_DOMAIN))!=null?t:void 0}set customDomain(t){t!==this.customDomain&&(t?this.setAttribute(b.Attributes.CUSTOM_DOMAIN,t):this.removeAttribute(b.Attributes.CUSTOM_DOMAIN))}get envKey(){var t;return(t=Pt(this,b.Attributes.ENV_KEY))!=null?t:void 0}set envKey(t){this.setAttribute(b.Attributes.ENV_KEY,`${t}`)}get noVolumePref(){return this.hasAttribute(m.NO_VOLUME_PREF)}set noVolumePref(t){t?this.setAttribute(m.NO_VOLUME_PREF,""):this.removeAttribute(m.NO_VOLUME_PREF)}get debug(){return Pt(this,b.Attributes.DEBUG)!=null}set debug(t){t?this.setAttribute(b.Attributes.DEBUG,""):this.removeAttribute(b.Attributes.DEBUG)}get disableTracking(){return Pt(this,b.Attributes.DISABLE_TRACKING)!=null}set disableTracking(t){this.toggleAttribute(b.Attributes.DISABLE_TRACKING,!!t)}get disableCookies(){return Pt(this,b.Attributes.DISABLE_COOKIES)!=null}set disableCookies(t){t?this.setAttribute(b.Attributes.DISABLE_COOKIES,""):this.removeAttribute(b.Attributes.DISABLE_COOKIES)}get streamType(){var t,a,r;return(r=(a=this.getAttribute(b.Attributes.STREAM_TYPE))!=null?a:(t=this.media)==null?void 0:t.streamType)!=null?r:R.StreamTypes.UNKNOWN}set streamType(t){this.setAttribute(b.Attributes.STREAM_TYPE,`${t}`)}get defaultStreamType(){var t,a,r;return(r=(a=this.getAttribute(m.DEFAULT_STREAM_TYPE))!=null?a:(t=this.mediaController)==null?void 0:t.getAttribute(m.DEFAULT_STREAM_TYPE))!=null?r:R.StreamTypes.ON_DEMAND}set defaultStreamType(t){t?this.setAttribute(m.DEFAULT_STREAM_TYPE,t):this.removeAttribute(m.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var t,a;return this.hasAttribute(m.TARGET_LIVE_WINDOW)?+this.getAttribute(m.TARGET_LIVE_WINDOW):(a=(t=this.media)==null?void 0:t.targetLiveWindow)!=null?a:Number.NaN}set targetLiveWindow(t){t==this.targetLiveWindow||Number.isNaN(t)&&Number.isNaN(this.targetLiveWindow)||(t==null?this.removeAttribute(m.TARGET_LIVE_WINDOW):this.setAttribute(m.TARGET_LIVE_WINDOW,`${+t}`))}get liveEdgeStart(){var t;return(t=this.media)==null?void 0:t.liveEdgeStart}get startTime(){return ce(Pt(this,b.Attributes.START_TIME))}set startTime(t){this.setAttribute(b.Attributes.START_TIME,`${t}`)}get preferPlayback(){let t=this.getAttribute(b.Attributes.PREFER_PLAYBACK);if(t===R.PlaybackTypes.MSE||t===R.PlaybackTypes.NATIVE)return t}set preferPlayback(t){t!==this.preferPlayback&&(t===R.PlaybackTypes.MSE||t===R.PlaybackTypes.NATIVE?this.setAttribute(b.Attributes.PREFER_PLAYBACK,t):this.removeAttribute(b.Attributes.PREFER_PLAYBACK))}get metadata(){var t;return(t=this.media)==null?void 0:t.metadata}set metadata(t){if(Q(this,W,Ot).call(this),!this.media){Ee("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...Jm(this),...t}}get _hlsConfig(){var t;return(t=this.media)==null?void 0:t._hlsConfig}set _hlsConfig(t){if(Q(this,W,Ot).call(this),!this.media){Ee("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=t}async addCuePoints(t){var a;if(Q(this,W,Ot).call(this),!this.media){Ee("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(a=this.media)==null?void 0:a.addCuePoints(t)}get activeCuePoint(){var t;return(t=this.media)==null?void 0:t.activeCuePoint}get cuePoints(){var t,a;return(a=(t=this.media)==null?void 0:t.cuePoints)!=null?a:[]}addChapters(t){var a;if(Q(this,W,Ot).call(this),!this.media){Ee("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(a=this.media)==null?void 0:a.addChapters(t)}get activeChapter(){var t;return(t=this.media)==null?void 0:t.activeChapter}get chapters(){var t,a;return(a=(t=this.media)==null?void 0:t.chapters)!=null?a:[]}getStartDate(){var t;return(t=this.media)==null?void 0:t.getStartDate()}get currentPdt(){var t;return(t=this.media)==null?void 0:t.currentPdt}get tokens(){let t=this.getAttribute(m.PLAYBACK_TOKEN),a=this.getAttribute(m.DRM_TOKEN),r=this.getAttribute(m.THUMBNAIL_TOKEN),n=this.getAttribute(m.STORYBOARD_TOKEN);return{...B(this,lr),...t!=null?{playback:t}:{},...a!=null?{drm:a}:{},...r!=null?{thumbnail:r}:{},...n!=null?{storyboard:n}:{}}}set tokens(t){Ae(this,lr,t!=null?t:{})}get playbackToken(){var t;return(t=this.getAttribute(m.PLAYBACK_TOKEN))!=null?t:void 0}set playbackToken(t){this.setAttribute(m.PLAYBACK_TOKEN,`${t}`)}get drmToken(){var t;return(t=this.getAttribute(m.DRM_TOKEN))!=null?t:void 0}set drmToken(t){this.setAttribute(m.DRM_TOKEN,`${t}`)}get thumbnailToken(){var t;return(t=this.getAttribute(m.THUMBNAIL_TOKEN))!=null?t:void 0}set thumbnailToken(t){this.setAttribute(m.THUMBNAIL_TOKEN,`${t}`)}get storyboardToken(){var t;return(t=this.getAttribute(m.STORYBOARD_TOKEN))!=null?t:void 0}set storyboardToken(t){this.setAttribute(m.STORYBOARD_TOKEN,`${t}`)}addTextTrack(t,a,r,n){var l;let s=(l=this.media)==null?void 0:l.nativeEl;if(s)return(0,R.addTextTrack)(s,t,a,r,n)}removeTextTrack(t){var r;let a=(r=this.media)==null?void 0:r.nativeEl;if(a)return(0,R.removeTextTrack)(a,t)}get textTracks(){var t;return(t=this.media)==null?void 0:t.textTracks}get castReceiver(){var t;return(t=this.getAttribute(m.CAST_RECEIVER))!=null?t:void 0}set castReceiver(t){t!==this.castReceiver&&(t?this.setAttribute(m.CAST_RECEIVER,t):this.removeAttribute(m.CAST_RECEIVER))}get castCustomData(){var t;return(t=this.media)==null?void 0:t.castCustomData}set castCustomData(t){if(!this.media){Ee("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=t}get noTooltips(){return this.hasAttribute(m.NO_TOOLTIPS)}set noTooltips(t){if(!t){this.removeAttribute(m.NO_TOOLTIPS);return}this.setAttribute(m.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(m.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(t){t?this.setAttribute(m.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(m.PROUDLY_DISPLAY_MUX_BADGE)}};or=new WeakMap,sr=new WeakMap,lr=new WeakMap,Ut=new WeakMap,dr=new WeakMap,vi=new WeakMap,W=new WeakSet,Ot=function(){var t,a,r,n;if(!B(this,sr)){Ae(this,sr,!0),Q(this,W,Nt).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof le.HTMLElement))throw""}catch{Ee("<media-theme> failed to upgrade!")}try{if(customElements.upgrade(this.media),this.muxVideoElement.includes("-")){customElements.upgrade(this.media);let s=customElements.get(this.muxVideoElement);if(!(s&&this.media instanceof s))throw""}}catch{Ee("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof Yo))throw""}catch{Ee("<media-controller> failed to upgrade!")}this.init(),Q(this,W,th).call(this),Q(this,W,ih).call(this),Q(this,W,ah).call(this),Ae(this,Ut,(a=(t=this.mediaController)==null?void 0:t.hasAttribute(k.USER_INACTIVE))!=null?a:!0),Q(this,W,rh).call(this),(r=this.media)==null||r.addEventListener("streamtypechange",()=>Q(this,W,Nt).call(this)),(n=this.media)==null||n.addEventListener("loadstart",()=>Q(this,W,Nt).call(this))}},eh=function(){var t,a;try{(t=window==null?void 0:window.CSS)==null||t.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(a=window==null?void 0:window.CSS)==null||a.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},Jl=function(t){Object.assign(B(this,vi),t),Q(this,W,Nt).call(this)},Nt=function(t={}){dm(um(cv(this,{...B(this,vi),...t})),this.shadowRoot)},th=function(){let t=r=>{var l,u;if(!(r!=null&&r.startsWith("theme-")))return;let n=r.replace(/^theme-/,"");if(zl.includes(n))return;let s=this.getAttribute(r);s!=null?(l=this.mediaTheme)==null||l.setAttribute(n,s):(u=this.mediaTheme)==null||u.removeAttribute(n)};new MutationObserver(r=>{for(let{attributeName:n}of r)t(n)}).observe(this,{attributes:!0}),this.getAttributeNames().forEach(t)},ih=function(){var a;let t=r=>{let{detail:n}=r;if(n instanceof b.MediaError||(n=new b.MediaError(n.message,n.code,n.fatal)),!(n!=null&&n.fatal)){Je(n),n.data&&Je(`${n.name} data:`,n.data);return}let s=sl(n,!1);s.message&&Zs(s),Ee(n),n.data&&Ee(`${n.name} data:`,n.data),Q(this,W,Jl).call(this,{isDialogOpen:!0})};this.addEventListener("error",t),this.media&&(this.media.errorTranslator=(r={})=>{var s,l,u;if(!(((s=this.media)==null?void 0:s.error)instanceof b.MediaError))return r;let n=sl((l=this.media)==null?void 0:l.error,!1);return{player_error_code:(u=this.media)==null?void 0:u.error.code,player_error_message:n.message?String(n.message):r.player_error_message,player_error_context:n.context?String(n.context):r.player_error_context}}),(a=this.media)==null||a.addEventListener("error",r=>{var s,l;let{detail:n}=r;if(!n){let{message:u,code:c}=(l=(s=this.media)==null?void 0:s.error)!=null?l:{};n=new b.MediaError(u,c)}n!=null&&n.fatal&&this.dispatchEvent(new CustomEvent("error",{detail:n}))})},ah=function(){var a,r,n,s;let t=()=>Q(this,W,Nt).call(this);(r=(a=this.media)==null?void 0:a.textTracks)==null||r.addEventListener("addtrack",t),(s=(n=this.media)==null?void 0:n.textTracks)==null||s.addEventListener("removetrack",t)},rh=function(){var c,A;if(!/Firefox/i.test(navigator.userAgent))return;let a,r=new WeakMap,n=()=>this.streamType===R.StreamTypes.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,s=(_,p,E=!1)=>{if(n())return;Array.from(_&&_.activeCues||[]).forEach(y=>{if(!(!y.snapToLines||y.line<-5||y.line>=0&&y.line<10))if(!p||this.paused){let C=y.text.split(`
`).length,U=-3;this.streamType===R.StreamTypes.LIVE&&(U=-2);let z=U-C;if(y.line===z&&!E)return;r.has(y)||r.set(y,y.line),y.line=z}else setTimeout(()=>{y.line=r.get(y)||"auto"},500)})},l=()=>{var _,p;s(a,(p=(_=this.mediaController)==null?void 0:_.hasAttribute(k.USER_INACTIVE))!=null?p:!1)},u=()=>{var E,O;let p=Array.from(((O=(E=this.mediaController)==null?void 0:E.media)==null?void 0:O.textTracks)||[]).filter(y=>["subtitles","captions"].includes(y.kind)&&y.mode==="showing")[0];p!==a&&(a==null||a.removeEventListener("cuechange",l)),a=p,a==null||a.addEventListener("cuechange",l),s(a,B(this,Ut))};u(),(c=this.textTracks)==null||c.addEventListener("change",u),(A=this.textTracks)==null||A.addEventListener("addtrack",u),this.addEventListener("userinactivechange",()=>{var p,E;let _=(E=(p=this.mediaController)==null?void 0:p.hasAttribute(k.USER_INACTIVE))!=null?E:!0;B(this,Ut)!==_&&(Ae(this,Ut,_),s(a,B(this,Ut)))})};function Pt(i,e){return i.media?i.media.getAttribute(e):i.getAttribute(e)}le.customElements.get("mux-player")||(le.customElements.define("mux-player",nr),le.MuxPlayerElement=nr);var gv=nr;
