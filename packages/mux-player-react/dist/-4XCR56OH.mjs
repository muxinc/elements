"use client";import Hn,{useEffect as ip,useState as ap}from"react";import{MaxResolution as a1,MinResolution as r1,RenditionOrder as n1,generatePlayerInitTime as rp}from"@mux/playback-core";import{MediaError as s1}from"@mux/mux-player";import yc from"react";var _l=parseInt(yc.version)>=19,bl={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate",adTagUrl:"adtagurl"},Tc=t=>t==null,kc=(t,e)=>Tc(e)?!1:t in e,Ic=t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),Sc=(t,e)=>{if(!(!_l&&typeof e=="boolean"&&!e)){if(kc(t,bl))return bl[t];if(typeof e!="undefined")return/[A-Z]/.test(t)?Ic(t):t}};var Mc=(t,e)=>!_l&&typeof t=="boolean"?"":t,Al=(t={})=>Object.entries(t).reduce((e,[i,a])=>{let r=Sc(i,a);if(!r)return e;let o=Mc(a,i);return e[r]=o,e},{});import{useRef as np}from"react";import{useEffect as Cc,useRef as wc}from"react";var yl=(...t)=>{let e=wc(null);return Cc(()=>{t.forEach(i=>{i&&(typeof i=="function"?i(e.current):i.current=e.current)})},[t]),e};import{useEffect as Lc}from"react";var xc=Object.prototype.hasOwnProperty,Rc=(t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((r,o)=>e[o]===r);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let r=0;r<i.length;r++)if(!xc.call(e,i[r])||!Object.is(t[i[r]],e[i[r]]))return!1;return!0},Wn=(t,e,i)=>!Rc(e,t[i]),Dc=(t,e,i)=>{t[i]=e},Pc=(t,e,i,a=Dc,r=Wn)=>Lc(()=>{let o=i==null?void 0:i.current;o&&r(o,e,t)&&a(o,e,t)},[i==null?void 0:i.current,e]),Se=Pc;var Uc=()=>{try{return"3.4.0"}catch{}return"UNKNOWN"},Oc=Uc(),Tl=()=>Oc;import Bn,{useRef as Xh,useState as Ri}from"react";import q,{useEffect as Bc,useState as Hc}from"react";var kl=`/* Main Playlist Container */
.playlist {
  /* Ensure it wraps on smaller screens */
  display: inline;
  position: relative;
  background-color: #12121263;
  z-index: 2;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

@media (min-width: 1336px) {
  .playlist {
    align-items: center;
    justify-content: center;
  }
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
  z-index: 1;
}

.post-video-section {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  padding: 1.5rem 2rem;
  position: relative;
  gap: 1rem;
  padding: 1.5rem 2rem;
  height: max-content;
  box-sizing: border-box;
  z-index: 2;
  max-width: 1200px;
}

.post-video-section hr {
  border: none;
  background: rgba(255, 255, 255, 0.5);
  height: 100%;
  width: 1px;
}

/* Video Section */
.video-section {
  flex: 2;
}

.video-container {
  position: relative;
}

.title {
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 3rem;
  margin: 0;
  margin-bottom: 1rem;
}

.video-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.video-container > .video-title {
  font-size: 1.3rem;
  font-weight: 600;
}

.video-thumbnail {
  width: 100%;
  display: block;
}

.video-title {
  font-size: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  color: #ffffff;
  text-decoration: none;
  line-height: 1.4;
  /* Adjusted for better readability */
  word-wrap: break-word;
  font-weight: 500;
  margin-bottom: 0;
}

.video-title:hover {
  text-decoration: underline;
}

/* Countdown Timer */
.countdown-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3.75rem;
  height: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.countdown-ring {
  position: absolute;
}

.circle-background {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 0.25rem;
}

.circle-progress {
  fill: none;
  stroke: #00a3dd;
  stroke-width: 0.25rem;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s linear;
}

.count-text {
  position: absolute;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
}

/* Related Videos */
.related-videos-section {
  flex: 1;
  width: 100%;
}

.related-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0;
  line-height: 2rem;
}

.related-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-item {
  display: flex;
  align-items: start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 0;
  background: none;
}

.related-item:hover {
  background: none;
}
.related-thumbnail {
  width: 7rem;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

.related-text {
  font-size: 0.9rem;
  color: white;
  line-height: 1.4;
  word-wrap: break-word;
  max-width: 100%;
  margin-top: 0.25rem;
  display: block;
}

.related-text:hover {
  text-decoration: underline;
}

/* Responsive  */

@media (max-width: 768px) {
  .post-video-section {
    grid-template-columns: 1fr;
    margin: auto;
  }

  .post-video-section h2 {
    display: none;
  }

  hr {
    display: none;
  }

  .video-section {
    width: 60%;
    margin: auto;
  }

  .related-videos-section {
    display: none;
  }
}
`;var $c=({video:t,relatedVideos:e,isVisible:i,selectVideoCallback:a,timerCallback:r})=>{let[o,l]=Hc(3);return Bc(()=>{if(!i){l(3);return}if(o<0){r();return}let d=setInterval(()=>{l(u=>Math.max(u-1,-1))},1e3);return()=>clearInterval(d)},[o,i]),q.createElement(q.Fragment,null,q.createElement("style",null,kl),q.createElement("div",{className:"playlist",style:{display:i?"grid":"none"}},q.createElement("div",{className:"overlay",style:{display:i?"grid":"none"}}),q.createElement("div",{className:"post-video-section",style:{display:i?"grid":"none",zIndex:99}},q.createElement("div",{className:"video-section"},q.createElement("div",{className:"video-container"},q.createElement("h2",{className:"title"},"Video"),q.createElement("div",{className:"video-wrapper"},q.createElement("img",{className:"video-thumbnail",src:t.imageUrl,alt:t.title}),q.createElement("div",{className:"countdown-overlay"},q.createElement("svg",{className:"countdown-ring",width:"50",height:"50"},q.createElement("circle",{cx:"25",cy:"25",r:"22",className:"circle-background"}),q.createElement("circle",{cx:"25",cy:"25",r:"22",className:"circle-progress",style:{strokeDasharray:"138",strokeDashoffset:`${o/3*138}`}})),q.createElement("span",{className:"count-text"},o))),q.createElement("p",{className:"video-title"},t.title))),q.createElement("hr",null),q.createElement("div",{className:"related-videos-section"},q.createElement("h3",{className:"related-title"},"Related Videos"),q.createElement("ul",{className:"related-list"},e.map((d,u)=>q.createElement("li",{key:u},q.createElement("button",{className:"related-item",onClick:()=>a(u)},q.createElement("img",{className:"related-thumbnail",src:d.imageUrl,alt:d.title}),q.createElement("p",{className:"related-text"},d.title)))))))))},Fn=$c;import"@mux/mux-video-ads";import Jh from"@mux/mux-player-react";import U from"react";var Wc=new Set(["style","children","ref","key","suppressContentEditableWarning","suppressHydrationWarning","dangerouslySetInnerHTML"]),Fc={className:"class",htmlFor:"for"};function Vc(t){return t.toLowerCase()}function Gc(t){if(typeof t=="boolean")return t?"":void 0;if(typeof t!="function"&&!(typeof t=="object"&&t!==null))return t}function I({react:t,tagName:e,elementClass:i,events:a,displayName:r,toAttributeName:o=Vc,toAttributeValue:l=Gc}){let d=Number.parseInt(t.version)>=19,u=t.forwardRef((E,b)=>{var R,F,Y,ge,ye;let g=t.useRef(null),v=t.useRef(new Map),f={},D={},T={},k={};for(let[O,K]of Object.entries(E)){if(Wc.has(O)){T[O]=K;continue}let ee=o((R=Fc[O])!=null?R:O);if(O in i.prototype&&!(O in((Y=(F=globalThis.HTMLElement)==null?void 0:F.prototype)!=null?Y:{}))&&!((ge=i.observedAttributes)!=null&&ge.some(Re=>Re===ee))){k[O]=K;continue}if(O.startsWith("on")){f[O]=K;continue}let Te=l(K);ee&&Te!=null&&(D[ee]=String(Te),d||(T[ee]=Te)),ee&&d&&(T[ee]=K)}if(typeof window!="undefined"){for(let O in f){let K=f[O],ee=O.endsWith("Capture"),Te=((ye=a==null?void 0:a[O])!=null?ye:O.slice(2).toLowerCase()).slice(0,ee?-7:void 0);t.useLayoutEffect(()=>{let Re=g==null?void 0:g.current;if(!(!Re||typeof K!="function"))return Re.addEventListener(Te,K,ee),()=>{Re.removeEventListener(Te,K,ee)}},[g==null?void 0:g.current,K])}t.useLayoutEffect(()=>{if(g.current===null)return;let O=new Map;for(let K in k)Il(g.current,K,k[K]),v.current.delete(K),O.set(K,k[K]);for(let[K,ee]of v.current)Il(g.current,K,void 0);v.current=O})}if(typeof window=="undefined"&&(i!=null&&i.getTemplateHTML)&&(i!=null&&i.shadowRootOptions)){let{mode:O,delegatesFocus:K}=i.shadowRootOptions,ee=t.createElement("template",{shadowrootmode:O,shadowrootdelegatesfocus:K,dangerouslySetInnerHTML:{__html:i.getTemplateHTML(D)}});T.children=[ee,T.children]}return t.createElement(e,{...T,ref:t.useCallback(O=>{g.current=O,typeof b=="function"?b(O):b!==null&&(b.current=O)},[b])})});return u.displayName=r!=null?r:i.name,u}function Il(t,e,i){var a,r;t[e]=i,i==null&&e in((r=(a=globalThis.HTMLElement)==null?void 0:a.prototype)!=null?r:{})&&t.removeAttribute(e)}var m={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},C={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},Vn={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_WIDTH:"mediaWidth"},Sl=Object.entries(Vn),n=Sl.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),Kc={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},_t=Sl.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...Kc}),kp=Object.entries(_t).reduce((t,[e,i])=>{let a=n[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"}),Ml=Object.entries(n).reduce((t,[e,i])=>{let a=_t[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),de={SUBTITLES:"subtitles",CAPTIONS:"captions",DESCRIPTIONS:"descriptions",CHAPTERS:"chapters",METADATA:"metadata"},lt={DISABLED:"disabled",HIDDEN:"hidden",SHOWING:"showing"};var Gn={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},pe={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},Me={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"};var Cl={INLINE:"inline",FULLSCREEN:"fullscreen",PICTURE_IN_PICTURE:"picture-in-picture"};function wl(t){return t==null?void 0:t.map(Yc).join(" ")}function Ll(t){return t==null?void 0:t.split(/\s+/).map(Zc)}function Yc(t){if(t){let{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}function Zc(t){if(t){let[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}function xl(t){return t==null?void 0:t.map(zc).join(" ")}function Rl(t){return t==null?void 0:t.split(/\s+/).map(Qc)}function zc(t){if(t){let{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(o=>o!=null).join(":")}}function Qc(t){if(t){let[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}function Vt(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}var wa=t=>new Promise(e=>setTimeout(e,t));var Dl=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],Xc=(t,e)=>{let i=t===1?Dl[e].singular:Dl[e].plural;return`${t} ${i}`},At=t=>{if(!Vt(t))return"";let e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0);return`${[a.getHours(),a.getMinutes(),a.getSeconds()].map((d,u)=>d&&Xc(d,u)).filter(d=>d).join(", ")}${i?" remaining":""}`};function Pe(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),o=Math.floor(t/3600),l=Math.floor(e/60%60),d=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(o=r=a="0"),o=o>0||d>0?o+":":"",r=((o||l>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+o+r+a}var Mp=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var Kn={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute",live:"live","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."};var Pl,Ul,jc={en:Kn},Ol=((Ul=(Pl=globalThis.navigator)==null?void 0:Pl.language)==null?void 0:Ul.split("-")[0])||"en",Nl=t=>{Ol=t};var h=(t,e={})=>{var i;return(((i=jc[Ol])==null?void 0:i[t])||Kn[t]).replace(/\{(\w+)\}/g,(r,o)=>e[o]!==void 0?String(e[o]):`{${o}}`)};var La=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},xa=class extends La{},Ra=class extends xa{constructor(){super(...arguments),this.role=null}},qn=class{observe(){}unobserve(){}disconnect(){}},Bl={createElement:function(){return new Pi.HTMLElement},createElementNS:function(){return new Pi.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},Pi={ResizeObserver:qn,document:Bl,Node:xa,Element:Ra,HTMLElement:class extends Ra{constructor(){super(...arguments),this.innerHTML=""}get content(){return new Pi.DocumentFragment}},DocumentFragment:class extends La{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}}},Hl=typeof window=="undefined"||typeof window.customElements=="undefined",$l=Object.keys(Pi).every(t=>t in globalThis),s=Hl&&!$l?Pi:globalThis,c=Hl&&!$l?Bl:globalThis.document;var Wl=new WeakMap,Yn=t=>{let e=Wl.get(t);return e||Wl.set(t,e=new Set),e},Fl=new s.ResizeObserver(t=>{for(let e of t)for(let i of Yn(e.target))i(e)});function et(t,e){Yn(t).add(e),Fl.observe(t)}function tt(t,e){let i=Yn(t);i.delete(e),i.size||Fl.unobserve(t)}function Vl(t){let e={};for(let i of t)e[i.name]=i.value;return e}function Z(t){var e;return(e=Da(t))!=null?e:Ue(t,"media-controller")}function Da(t){var e;let{MEDIA_CONTROLLER:i}=C,a=t.getAttribute(i);if(a)return(e=yt(t))==null?void 0:e.getElementById(a)}var Pa=(t,e,i=".value")=>{let a=t.querySelector(i);a&&(a.textContent=e)},em=(t,e)=>{let i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},Ua=(t,e)=>em(t,e)[0],le=(t,e)=>!t||!e?!1:t!=null&&t.contains(e)?!0:le(t,e.getRootNode().host),Ue=(t,e)=>{if(!t)return null;let i=t.closest(e);return i||Ue(t.getRootNode().host,e)};function Ui(t=document){var e;let i=t==null?void 0:t.activeElement;return i?(e=Ui(i.shadowRoot))!=null?e:i:null}function yt(t){var e;let i=(e=t==null?void 0:t.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function Oa(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){let o=getComputedStyle(r);if(i&&o.opacity==="0"||a&&o.visibility==="hidden"||o.display==="none")return!1;r=r.parentElement,e--}return!0}function Gl(t,e,i,a){let r=a.x-i.x,o=a.y-i.y,l=r*r+o*o;if(l===0)return 0;let d=((t-i.x)*r+(e-i.y)*o)/l;return Math.max(0,Math.min(1,d))}function N(t,e){let i=tm(t,a=>a===e);return i||Zn(t,e)}function tm(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let o;try{o=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(let l of o!=null?o:[])if(e(l.selectorText))return l}}function Zn(t,e){var i,a;let r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],o=r==null?void 0:r[r.length-1];return o!=null&&o.sheet?(o==null||o.sheet.insertRule(`${e}{}`,o.sheet.cssRules.length),(a=o.sheet.cssRules)==null?void 0:a[o.sheet.cssRules.length-1]):(console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}})}function w(t,e,i=Number.NaN){let a=t.getAttribute(e);return a!=null?+a:i}function x(t,e,i){let a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}w(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function A(t,e){return t.hasAttribute(e)}function y(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}A(t,e)!=i&&t.toggleAttribute(e,i)}function S(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function M(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}let a=`${i}`;S(t,e,void 0)!==a&&t.setAttribute(e,a)}var Kl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},dt=(t,e,i)=>(Kl(t,e,"read from private field"),i?i.call(t):e.get(t)),im=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Na=(t,e,i,a)=>(Kl(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ue,ql=c.createElement("template");ql.innerHTML=`
<style>
  :host {
    display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
    box-sizing: border-box;
  }
</style>
`;var Ba=class extends s.HTMLElement{constructor(e={}){if(super(),im(this,ue,void 0),!this.shadowRoot){let i=this.attachShadow({mode:"open"}),a=ql.content.cloneNode(!0);this.nativeEl=a;let r=e.slotTemplate;r||(r=c.createElement("template"),r.innerHTML=`<slot>${e.defaultContent||""}</slot>`),this.nativeEl.appendChild(r.content.cloneNode(!0)),i.appendChild(a)}}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=dt(this,ue))==null?void 0:r.unassociateElement)==null||o.call(r,this),Na(this,ue,null)),a&&this.isConnected&&(Na(this,ue,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=dt(this,ue))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a,r;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Na(this,ue,am(this)),this.getAttribute(C.MEDIA_CONTROLLER)&&((i=(e=dt(this,ue))==null?void 0:e.associateElement)==null||i.call(e,this)),(a=dt(this,ue))==null||a.addEventListener("pointerdown",this),(r=dt(this,ue))==null||r.addEventListener("click",this)}disconnectedCallback(){var e,i,a,r;this.getAttribute(C.MEDIA_CONTROLLER)&&((i=(e=dt(this,ue))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=dt(this,ue))==null||a.removeEventListener("pointerdown",this),(r=dt(this,ue))==null||r.removeEventListener("click",this),Na(this,ue,null)}handleEvent(e){var i;let a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a==null?void 0:a.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){let{clientX:o,clientY:l}=e,{left:d,top:u,width:E,height:b}=this.getBoundingClientRect(),g=o-d,v=l-u;if(g<0||v<0||g>E||v>b||E===0&&b===0)return;let{pointerType:f=this._pointerType}=e;if(this._pointerType=void 0,f===Gn.TOUCH){this.handleTap(e);return}else if(f===Gn.MOUSE){this.handleMouseClick(e);return}}}}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let i=this.mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new s.CustomEvent(i,{composed:!0,bubbles:!0}))}};ue=new WeakMap;function am(t){var e;let i=t.getAttribute(C.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):Ue(t,"media-controller")}s.customElements.get("media-gesture-receiver")||s.customElements.define("media-gesture-receiver",Ba);var zn=Ba;var jn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ee=(t,e,i)=>(jn(t,e,"read from private field"),i?i.call(t):e.get(t)),ve=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Tt=(t,e,i,a)=>(jn(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),be=(t,e,i)=>(jn(t,e,"access private method"),i),Wa,Gt,Ni,Kt,Ha,Qn,Yl,Oi,$a,Xn,Zl,Jn,zl,Bi,Fa,Va,eo,qt,Hi,_={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"},Ql=c.createElement("template");Ql.innerHTML=`
  <style>
    
    :host([${n.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
      outline: none;
    }

    :host {
      box-sizing: border-box;
      position: relative;
      display: inline-block;
      line-height: 0;
      background-color: var(--media-background-color, #000);
    }

    :host(:not([${_.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
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

    
    :host([${_.AUDIO}]) slot[name=media] {
      display: var(--media-slot-display, none);
    }

    
    :host([${_.AUDIO}]) [part~=layer][part~=gesture-layer] {
      height: 0;
      display: block;
    }

    
    :host(:not([${_.AUDIO}])[${_.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
    :host(:not([${_.AUDIO}])[${_.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
      display: none;
    }

    
    ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
      pointer-events: auto;
    }

    :host(:not([${_.AUDIO}])) *[part~=layer][part~=centered-layer] {
      align-items: center;
      justify-content: center;
    }

    :host(:not([${_.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
    :host(:not([${_.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
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

    
    :host(:not([${_.AUDIO}])) .spacer {
      flex-grow: 1;
    }

    
    :host(:-webkit-full-screen) {
      
      width: 100% !important;
      height: 100% !important;
    }

    
    ::slotted(:not([slot=media]):not([slot=poster]):not([${_.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
      opacity: 1;
      transition: var(--media-control-transition-in, opacity 0.25s);
    }

    
    :host([${_.USER_INACTIVE}]:not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_AIRPLAYING}]):not([${n.MEDIA_IS_CASTING}]):not([${_.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${_.NO_AUTOHIDE}]):not([role=dialog])) {
      opacity: 0;
      transition: var(--media-control-transition-out, opacity 1s);
    }

    :host([${_.USER_INACTIVE}]:not([${_.NO_AUTOHIDE}]):not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_CASTING}]):not([${_.AUDIO}])) ::slotted([slot=media]) {
      cursor: none;
    }

    :host([${_.USER_INACTIVE}][${_.AUTOHIDE_OVER_CONTROLS}]:not([${_.NO_AUTOHIDE}]):not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_CASTING}]):not([${_.AUDIO}])) * {
     --media-cursor: none;
     cursor: none;
    }


    ::slotted(media-control-bar)  {
      align-self: stretch;
    }

    
    :host(:not([${_.AUDIO}])[${n.MEDIA_HAS_PLAYED}]) slot[name=poster] {
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
`;var rm=Object.values(n),nm="sm:384 md:576 lg:768 xl:960";function om(t){Xl(t.target,t.contentRect.width)}function Xl(t,e){var i;if(!t.isConnected)return;let a=(i=t.getAttribute(_.BREAKPOINTS))!=null?i:nm,r=sm(a),o=lm(r,e),l=!1;if(Object.keys(r).forEach(d=>{if(o.includes(d)){t.hasAttribute(`breakpoint${d}`)||(t.setAttribute(`breakpoint${d}`,""),l=!0);return}t.hasAttribute(`breakpoint${d}`)&&(t.removeAttribute(`breakpoint${d}`),l=!0)}),l){let d=new CustomEvent(_t.BREAKPOINTS_CHANGE,{detail:o});t.dispatchEvent(d)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(_t.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function sm(t){let e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function lm(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}var Yt=class extends s.HTMLElement{constructor(){super(),ve(this,Qn),ve(this,Xn),ve(this,Jn),ve(this,Bi),ve(this,Va),ve(this,qt),ve(this,Wa,0),ve(this,Gt,null),ve(this,Ni,null),ve(this,Kt,void 0),this.breakpointsComputed=!1,ve(this,Ha,new MutationObserver(be(this,Qn,Yl).bind(this))),ve(this,Oi,!1),ve(this,$a,i=>{Ee(this,Oi)||(setTimeout(()=>{om(i),Tt(this,Oi,!1)},0),Tt(this,Oi,!0))}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ql.content.cloneNode(!0)));let e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){Ee(this,Gt)&&this.mediaUnsetCallback(Ee(this,Gt));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[_.AUTOHIDE,_.GESTURES_DISABLED].concat(rm).filter(e=>![n.MEDIA_RENDITION_LIST,n.MEDIA_AUDIO_TRACK_LIST,n.MEDIA_CHAPTERS_CUES,n.MEDIA_WIDTH,n.MEDIA_HEIGHT,n.MEDIA_ERROR,n.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==_.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return(e==null?void 0:e.nodeName)=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Tt(this,Gt,e),e.localName.includes("-")&&await s.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;Ee(this,Ha).observe(this,{childList:!0,subtree:!0}),et(this,Ee(this,$a));let a=this.getAttribute(_.AUDIO)!=null?h("audio player"):h("video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(_.USER_INACTIVE,""),Xl(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=s.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;Ee(this,Ha).disconnect(),tt(this,Ee(this,$a)),this.media&&this.mediaUnsetCallback(this.media),(e=s.window)==null||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){Tt(this,Gt,null)}handleEvent(e){switch(e.type){case"pointerdown":Tt(this,Wa,e.timeStamp);break;case"pointermove":be(this,Xn,Zl).call(this,e);break;case"pointerup":be(this,Jn,zl).call(this,e);break;case"mouseleave":be(this,Bi,Fa).call(this);break;case"mouseup":this.removeAttribute(_.KEYBOARD_CONTROL);break;case"keyup":be(this,qt,Hi).call(this),this.setAttribute(_.KEYBOARD_CONTROL,"");break}}set autohide(e){let i=Number(e);Tt(this,Kt,isNaN(i)?0:i)}get autohide(){return(Ee(this,Kt)===void 0?2:Ee(this,Kt)).toString()}get breakpoints(){return S(this,_.BREAKPOINTS)}set breakpoints(e){M(this,_.BREAKPOINTS,e)}get audio(){return A(this,_.AUDIO)}set audio(e){y(this,_.AUDIO,e)}get gesturesDisabled(){return A(this,_.GESTURES_DISABLED)}set gesturesDisabled(e){y(this,_.GESTURES_DISABLED,e)}get keyboardControl(){return A(this,_.KEYBOARD_CONTROL)}set keyboardControl(e){y(this,_.KEYBOARD_CONTROL,e)}get noAutohide(){return A(this,_.NO_AUTOHIDE)}set noAutohide(e){y(this,_.NO_AUTOHIDE,e)}get autohideOverControls(){return A(this,_.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){y(this,_.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return A(this,_.USER_INACTIVE)}set userInteractive(e){y(this,_.USER_INACTIVE,e)}};Wa=new WeakMap;Gt=new WeakMap;Ni=new WeakMap;Kt=new WeakMap;Ha=new WeakMap;Qn=new WeakSet;Yl=function(t){let e=this.media;for(let i of t){if(i.type!=="childList")continue;let a=i.removedNodes;for(let r of a){if(r.slot!="media"||i.target!=this)continue;let o=i.previousSibling&&i.previousSibling.previousElementSibling;if(!o||!e)this.mediaUnsetCallback(r);else{let l=o.slot!=="media";for(;(o=o.previousSibling)!==null;)o.slot=="media"&&(l=!1);l&&this.mediaUnsetCallback(r)}}if(e)for(let r of i.addedNodes)r===e&&this.handleMediaUpdated(e)}};Oi=new WeakMap;$a=new WeakMap;Xn=new WeakSet;Zl=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-Ee(this,Wa)<250)return;be(this,Va,eo).call(this),clearTimeout(Ee(this,Ni));let e=this.hasAttribute(_.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&be(this,qt,Hi).call(this)};Jn=new WeakSet;zl=function(t){if(t.pointerType==="touch"){let e=!this.hasAttribute(_.USER_INACTIVE);[this,this.media].includes(t.target)&&e?be(this,Bi,Fa).call(this):be(this,qt,Hi).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e==null?void 0:e.localName))&&be(this,qt,Hi).call(this)};Bi=new WeakSet;Fa=function(){if(Ee(this,Kt)<0||this.hasAttribute(_.USER_INACTIVE))return;this.setAttribute(_.USER_INACTIVE,"");let t=new s.CustomEvent(_t.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};Va=new WeakSet;eo=function(){if(!this.hasAttribute(_.USER_INACTIVE))return;this.removeAttribute(_.USER_INACTIVE);let t=new s.CustomEvent(_t.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};qt=new WeakSet;Hi=function(){be(this,Va,eo).call(this),clearTimeout(Ee(this,Ni));let t=parseInt(this.autohide);t<0||Tt(this,Ni,setTimeout(()=>{be(this,Bi,Fa).call(this)},t*1e3))};s.customElements.get("media-container")||s.customElements.define("media-container",Yt);var to=Yt;var Jl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ie=(t,e,i)=>(Jl(t,e,"read from private field"),i?i.call(t):e.get(t)),$i=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ga=(t,e,i,a)=>(Jl(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Zt,zt,Ka,kt,it,ut,Oe=class{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){$i(this,it),$i(this,Zt,void 0),$i(this,zt,void 0),$i(this,Ka,void 0),$i(this,kt,new Set),Ga(this,Zt,e),Ga(this,zt,i),Ga(this,Ka,new Set(a))}[Symbol.iterator](){return ie(this,it,ut).values()}get length(){return ie(this,it,ut).size}get value(){var e;return(e=[...ie(this,it,ut)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Ga(this,kt,new Set),this.add(...(i=e==null?void 0:e.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...ie(this,it,ut)][e]}values(){return ie(this,it,ut).values()}forEach(e,i){ie(this,it,ut).forEach(e,i)}add(...e){var i,a;e.forEach(r=>ie(this,kt).add(r)),!(this.value===""&&!((i=ie(this,Zt))!=null&&i.hasAttribute(`${ie(this,zt)}`)))&&((a=ie(this,Zt))==null||a.setAttribute(`${ie(this,zt)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>ie(this,kt).delete(a)),(i=ie(this,Zt))==null||i.setAttribute(`${ie(this,zt)}`,`${this.value}`)}contains(e){return ie(this,it,ut).has(e)}toggle(e,i){return typeof i!="undefined"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}};Zt=new WeakMap;zt=new WeakMap;Ka=new WeakMap;kt=new WeakMap;it=new WeakSet;ut=function(){return ie(this,kt).size?ie(this,kt):ie(this,Ka)};var dm=(t="")=>t.split(/\s+/),jl=(t="")=>{let[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?de.CAPTIONS:de.SUBTITLES,language:i,label:r}},It=(t="",e={})=>dm(t).map(i=>{let a=jl(i);return{...e,...a}}),io=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?jl(e):e):typeof t=="string"?It(t):[t]:[],qa=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,at=(t=[])=>Array.prototype.map.call(t,qa).join(" "),um=(t,e)=>i=>i[t]===e,ed=t=>{let e=Object.entries(t).map(([i,a])=>um(i,a));return i=>e.every(a=>a(i))},St=(t,e=[],i=[])=>{let a=io(i).map(ed),r=o=>a.some(l=>l(o));Array.from(e).filter(r).forEach(o=>{o.mode=t})},Mt=(t,e=()=>!0)=>{if(!(t!=null&&t.textTracks))return[];let i=typeof e=="function"?e:ed(e);return Array.from(t.textTracks).filter(i)},Ya=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(n.MEDIA_SUBTITLES_SHOWING)};var id=t=>{var e;let{media:i,fullscreenElement:a}=t;try{let r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){let o=(e=a[r])==null?void 0:e.call(a);if(o instanceof Promise)return o.catch(()=>{})}else i!=null&&i.webkitEnterFullscreen?i.webkitEnterFullscreen():i!=null&&i.requestFullscreen&&i.requestFullscreen()}catch(r){console.error(r)}},td="exitFullscreen"in c?"exitFullscreen":"webkitExitFullscreen"in c?"webkitExitFullscreen":"webkitCancelFullScreen"in c?"webkitCancelFullScreen":void 0,ad=t=>{var e;let{documentElement:i}=t;if(td){let a=(e=i==null?void 0:i[td])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},Wi="fullscreenElement"in c?"fullscreenElement":"webkitFullscreenElement"in c?"webkitFullscreenElement":void 0,cm=t=>{let{documentElement:e,media:i}=t,a=e==null?void 0:e[Wi];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===Cl.FULLSCREEN?i:a},rd=t=>{var e;let{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;let o=cm(t);if(!o)return!1;if(o===r||o===i)return!0;if(o.localName.includes("-")){let l=o.shadowRoot;if(!(Wi in l))return le(o,r);for(;l!=null&&l[Wi];){if(l[Wi]===r)return!0;l=(e=l[Wi])==null?void 0:e.shadowRoot}}return!1},mm="fullscreenEnabled"in c?"fullscreenEnabled":"webkitFullscreenEnabled"in c?"webkitFullscreenEnabled":void 0,nd=t=>{let{documentElement:e,media:i}=t;return!!(e!=null&&e[mm])||i&&"webkitSupportsFullscreen"in i};var Za,ao=()=>{var t,e;return Za||(Za=(e=(t=c)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),Za)},od=async(t=ao())=>{if(!t)return!1;let e=t.volume;t.volume=e/2+.1;let i=new AbortController,a=await Promise.race([hm(t,i.signal),pm(t,e)]);return i.abort(),a},hm=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),pm=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await wa(10)}return t.volume!==e},vm=/.*Version\/.*Safari\/.*/.test(s.navigator.userAgent),ro=(t=ao())=>s.matchMedia("(display-mode: standalone)").matches&&vm?!1:typeof(t==null?void 0:t.requestPictureInPicture)=="function",no=(t=ao())=>nd({documentElement:c,media:t}),sd=no(),ld=ro(),dd=!!s.WebKitPlaybackTargetAvailabilityEvent,ud=!!s.chrome;var Qt=t=>Mt(t.media,e=>[de.SUBTITLES,de.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),oo=t=>Mt(t.media,e=>e.mode===lt.SHOWING&&[de.SUBTITLES,de.CAPTIONS].includes(e.kind)),za=(t,e)=>{let i=Qt(t),a=oo(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)St(lt.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let o=i[0],{options:l}=t;if(!(l!=null&&l.noSubtitlesLangPref)){let b=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),g=b?[b,...globalThis.navigator.languages]:globalThis.navigator.languages,v=i.filter(f=>g.some(D=>f.language.toLowerCase().startsWith(D.split("-")[0]))).sort((f,D)=>{let T=g.findIndex(R=>f.language.toLowerCase().startsWith(R.split("-")[0])),k=g.findIndex(R=>D.language.toLowerCase().startsWith(R.split("-")[0]));return T-k});v[0]&&(o=v[0])}let{language:d,label:u,kind:E}=o;St(lt.DISABLED,i,a),St(lt.SHOWING,i,[{language:d,label:u,kind:E}])}}},Qa=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?Em(t,e):Object.entries(t).every(([i,a])=>i in e&&Qa(a,e[i])),Em=(t,e)=>{let i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,o)=>Qa(r,e[o])):!0};var fm=Object.values(Me),Xa,gm=od().then(t=>(Xa=t,Xa)),cd=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof s.HTMLElement))return;let i=e.localName;if(!i.includes("-"))return;let a=s.customElements.get(i);a&&e instanceof a||(await s.customElements.whenDefined(i),s.customElements.upgrade(e))}))},Xt={mediaError:{get(t,e){let{media:i}=t;if((e==null?void 0:e.type)!=="playing")return i==null?void 0:i.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;let{media:a}=t;if((e==null?void 0:e.type)!=="playing")return(i=a==null?void 0:a.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;let{media:r}=t;if((e==null?void 0:e.type)!=="playing")return(a=(i=r==null?void 0:r.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.paused)!=null?e:!0},set(t,e){var i;let{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){let{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.playbackRate)!=null?e:1},set(t,e){let{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.muted)!=null?e:!1},set(t,e){let{media:i}=e;if(i){try{s.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(a){console.debug("Error setting muted pref",a)}i.muted=t}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{let{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{let r=s.localStorage.getItem("media-chrome-pref-muted")==="true";Xt.mediaMuted.set(r,e),t(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaVolume:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.volume)!=null?e:1},set(t,e){let{media:i}=e;if(i){try{t==null?s.localStorage.removeItem("media-chrome-pref-volume"):s.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(a){console.debug("Error setting volume pref",a)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{let{options:{noVolumePref:i}}=e;if(!i)try{let{media:a}=e;if(!a)return;let r=s.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;Xt.mediaVolume.set(+r,e),t(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){let{media:e}=t;return typeof(e==null?void 0:e.volume)=="undefined"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.currentTime)!=null?e:0},set(t,e){let{media:i}=e;!i||!Vt(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){let{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e==null?void 0:e.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){let{media:e}=t;return(e==null?void 0:e.readyState)<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;let{media:i}=t;if(!((e=i==null?void 0:i.seekable)!=null&&e.length))return;let a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;let{media:i}=t,a=(e=i==null?void 0:i.buffered)!=null?e:[];return Array.from(a).map((r,o)=>[Number(a.start(o).toFixed(3)),Number(a.end(o).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){let{media:e,options:{defaultStreamType:i}={}}=t,a=[Me.LIVE,Me.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;let{streamType:r}=e;if(fm.includes(r))return r===Me.UNKNOWN?a:r;let o=e.duration;return o===1/0?Me.LIVE:Number.isFinite(o)?Me.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){let{media:e}=t;if(!e)return Number.NaN;let{targetLiveWindow:i}=e,a=Xt.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===Me.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){let{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Xt.mediaStreamType.get(t)===Me.LIVE))return!1;let r=e.seekable;if(!r)return!0;if(!r.length)return!1;let o=r.end(r.length-1)-i;return e.currentTime>=o},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return Qt(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return oo(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;let{media:r,options:o}=e;if(!r)return;let l=d=>{var u;!o.defaultSubtitles||d&&![de.CAPTIONS,de.SUBTITLES].includes((u=d==null?void 0:d.track)==null?void 0:u.kind)||za(e,!0)};return r.addEventListener("loadstart",l),(i=r.textTracks)==null||i.addEventListener("addtrack",l),(a=r.textTracks)==null||a.addEventListener("removetrack",l),()=>{var d,u;r.removeEventListener("loadstart",l),(d=r.textTracks)==null||d.removeEventListener("addtrack",l),(u=r.textTracks)==null||u.removeEventListener("removetrack",l)}}]},mediaChaptersCues:{get(t){var e;let{media:i}=t;if(!i)return[];let[a]=Mt(i,{kind:de.CHAPTERS});return Array.from((e=a==null?void 0:a.cues)!=null?e:[]).map(({text:r,startTime:o,endTime:l})=>({text:r,startTime:o,endTime:l}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;if(!a)return;let r=a.querySelector('track[kind="chapters"][default][src]'),o=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r==null||r.addEventListener("load",t),o==null||o.addEventListener("load",t),()=>{r==null||r.removeEventListener("load",t),o==null||o.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;let{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?le(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let o=r.pictureInPictureElement.shadowRoot;for(;o!=null&&o.pictureInPictureElement;){if(o.pictureInPictureElement===a)return!0;o=(i=o.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){let{media:i}=e;if(i)if(t){if(!c.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}let a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){let o=()=>{i.removeEventListener("loadedmetadata",l),i.preload="none"},l=()=>{i.requestPictureInPicture().catch(a),o()};i.addEventListener("loadedmetadata",l),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),o()},1e3)}else throw r}else throw r})}else c.pictureInPictureElement&&c.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;let{media:i}=t;return[...(e=i==null?void 0:i.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;let{media:r}=t;return(a=(i=r==null?void 0:r.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){let{media:i}=e;if(!(i!=null&&i.videoRenditions)){console.warn("MediaController: Rendition selection not supported by this media.");return}let a=t,r=Array.prototype.findIndex.call(i.videoRenditions,o=>o.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;let{media:i}=t;return[...(e=i==null?void 0:i.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;let{media:a}=t;return(i=[...(e=a==null?void 0:a.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){let{media:i}=e;if(!(i!=null&&i.audioTracks)){console.warn("MediaChrome: Audio track selection not supported by this media.");return}let a=t;for(let r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return rd(t)},set(t,e){t?id(e):ad(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;let{media:i}=t;return!(i!=null&&i.remote)||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;let{media:r}=e;if(r&&!(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){let{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&s.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){let{media:e}=t;if(!sd||!no(e))return pe.UNSUPPORTED}},mediaPipUnavailable:{get(t){let{media:e}=t;if(!ld||!ro(e))return pe.UNSUPPORTED}},mediaVolumeUnavailable:{get(t){let{media:e}=t;if(Xa===!1||(e==null?void 0:e.volume)==null)return pe.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{Xa==null&&gm.then(e=>t(e?void 0:pe.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;let{media:a}=t;if(!ud||!((i=a==null?void 0:a.remote)!=null&&i.state))return pe.UNSUPPORTED;if(!(e==null||e==="available"))return pe.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(o=>{t({availability:o?"available":"not-available"})}).catch(o=>{o.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var o;(o=a==null?void 0:a.remote)==null||o.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!dd)return pe.UNSUPPORTED;if((e==null?void 0:e.availability)==="not-available")return pe.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(o=>{t({availability:o?"available":"not-available"})}).catch(o=>{o.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var o;(o=a==null?void 0:a.remote)==null||o.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;let{media:i}=t;if(!(i!=null&&i.videoRenditions))return pe.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return pe.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;let{media:a}=t;if(!(a!=null&&a.audioTracks))return pe.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return pe.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]}};var md={[m.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,o;let{media:l}=e,d=i!=null?i:void 0,u,E;if(l&&d!=null){let[f]=Mt(l,{kind:de.METADATA,label:"thumbnails"}),D=Array.prototype.find.call((a=f==null?void 0:f.cues)!=null?a:[],(T,k,R)=>k===0?T.endTime>d:k===R.length-1?T.startTime<=d:T.startTime<=d&&T.endTime>d);if(D){let T=/'^(?:[a-z]+:)?\/\//i.test(D.text)||(r=l==null?void 0:l.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,k=new URL(D.text,T);E=new URLSearchParams(k.hash).get("#xywh").split(",").map(F=>+F),u=k.href}}let b=t.mediaDuration.get(e),v=(o=t.mediaChaptersCues.get(e).find((f,D,T)=>D===T.length-1&&b===f.endTime?f.startTime<=d&&f.endTime>=d:f.startTime<=d&&f.endTime>d))==null?void 0:o.text;return i!=null&&v==null&&(v=""),{mediaPreviewTime:d,mediaPreviewImage:u,mediaPreviewCoords:E,mediaPreviewChapter:v}},[m.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[m.MEDIA_PLAY_REQUEST](t,e){var i,a,r,o;let l="mediaPaused",u=t.mediaStreamType.get(e)===Me.LIVE,E=!((i=e.options)!=null&&i.noAutoSeekToLive),b=t.mediaTargetLiveWindow.get(e)>0;if(u&&E&&!b){let g=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(g){let v=(o=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?o:0,f=g-v;t.mediaCurrentTime.set(f,e)}}t[l].set(!1,e)},[m.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){let a="mediaPlaybackRate",r=i;t[a].set(r,e)},[m.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[m.MEDIA_UNMUTE_REQUEST](t,e){let i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[m.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){let a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[m.MEDIA_SEEK_REQUEST](t,e,{detail:i}){let a="mediaCurrentTime",r=i;t[a].set(r,e)},[m.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;let o="mediaCurrentTime",l=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(l)))return;let d=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,u=l-d;t[o].set(u,e)},[m.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;let{options:r}=e,o=Qt(e),l=io(i),d=(a=l[0])==null?void 0:a.language;d&&!r.noSubtitlesLangPref&&s.localStorage.setItem("media-chrome-pref-subtitles-lang",d),St(lt.SHOWING,o,l)},[m.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){let a=Qt(e),r=i!=null?i:[];St(lt.DISABLED,a,r)},[m.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){za(e,i)},[m.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){let a="mediaRenditionSelected",r=i;t[a].set(r,e)},[m.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){let a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[m.MEDIA_ENTER_PIP_REQUEST](t,e){let i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[m.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e){let i="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[m.MEDIA_ENTER_CAST_REQUEST](t,e){let i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[m.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}};var hd=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=Xt,requestMap:r=md,options:o={},monitorStateOwnersOnlyWithSubscriptions:l=!0})=>{let d=[],u={options:{...o}},E=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),b=T=>{T!=null&&(Qa(T,E)||(E=Object.freeze({...E,...T}),d.forEach(k=>k(E))))},g=()=>{let T=Object.entries(a).reduce((k,[R,{get:F}])=>(k[R]=F(u),k),{});b(T)},v={},f,D=async(T,k)=>{var R,F,Y,ge,ye,O,K,ee,Te,Re,ga,ba,_a,Aa,ya,Ta;let $n=!!f;if(f={...u,...f!=null?f:{},...T},$n)return;await cd(...Object.values(T));let st=d.length>0&&k===0&&l,ka=u.media!==f.media,Ia=((R=u.media)==null?void 0:R.textTracks)!==((F=f.media)==null?void 0:F.textTracks),Sa=((Y=u.media)==null?void 0:Y.videoRenditions)!==((ge=f.media)==null?void 0:ge.videoRenditions),Ma=((ye=u.media)==null?void 0:ye.audioTracks)!==((O=f.media)==null?void 0:O.audioTracks),ke=((K=u.media)==null?void 0:K.remote)!==((ee=f.media)==null?void 0:ee.remote),De=u.documentElement!==f.documentElement,Ca=!!u.media&&(ka||st),nl=!!((Te=u.media)!=null&&Te.textTracks)&&(Ia||st),ol=!!((Re=u.media)!=null&&Re.videoRenditions)&&(Sa||st),sl=!!((ga=u.media)!=null&&ga.audioTracks)&&(Ma||st),ll=!!((ba=u.media)!=null&&ba.remote)&&(ke||st),dl=!!u.documentElement&&(De||st),ul=Ca||nl||ol||sl||ll||dl,Ft=d.length===0&&k===1&&l,cl=!!f.media&&(ka||Ft),ml=!!((_a=f.media)!=null&&_a.textTracks)&&(Ia||Ft),hl=!!((Aa=f.media)!=null&&Aa.videoRenditions)&&(Sa||Ft),pl=!!((ya=f.media)!=null&&ya.audioTracks)&&(Ma||Ft),vl=!!((Ta=f.media)!=null&&Ta.remote)&&(ke||Ft),El=!!f.documentElement&&(De||Ft),fl=cl||ml||hl||pl||vl||El;if(!(ul||fl)){Object.entries(f).forEach(([H,Di])=>{u[H]=Di}),g(),f=void 0;return}Object.entries(a).forEach(([H,{get:Di,mediaEvents:vc=[],textTracksEvents:Ec=[],videoRenditionsEvents:fc=[],audioTracksEvents:gc=[],remoteEvents:bc=[],rootEvents:_c=[],stateOwnersUpdateHandlers:Ac=[]}])=>{v[H]||(v[H]={});let me=Q=>{let he=Di(u,Q);b({[H]:he})},te;te=v[H].mediaEvents,vc.forEach(Q=>{te&&Ca&&(u.media.removeEventListener(Q,te),v[H].mediaEvents=void 0),cl&&(f.media.addEventListener(Q,me),v[H].mediaEvents=me)}),te=v[H].textTracksEvents,Ec.forEach(Q=>{var he,Ie;te&&nl&&((he=u.media.textTracks)==null||he.removeEventListener(Q,te),v[H].textTracksEvents=void 0),ml&&((Ie=f.media.textTracks)==null||Ie.addEventListener(Q,me),v[H].textTracksEvents=me)}),te=v[H].videoRenditionsEvents,fc.forEach(Q=>{var he,Ie;te&&ol&&((he=u.media.videoRenditions)==null||he.removeEventListener(Q,te),v[H].videoRenditionsEvents=void 0),hl&&((Ie=f.media.videoRenditions)==null||Ie.addEventListener(Q,me),v[H].videoRenditionsEvents=me)}),te=v[H].audioTracksEvents,gc.forEach(Q=>{var he,Ie;te&&sl&&((he=u.media.audioTracks)==null||he.removeEventListener(Q,te),v[H].audioTracksEvents=void 0),pl&&((Ie=f.media.audioTracks)==null||Ie.addEventListener(Q,me),v[H].audioTracksEvents=me)}),te=v[H].remoteEvents,bc.forEach(Q=>{var he,Ie;te&&ll&&((he=u.media.remote)==null||he.removeEventListener(Q,te),v[H].remoteEvents=void 0),vl&&((Ie=f.media.remote)==null||Ie.addEventListener(Q,me),v[H].remoteEvents=me)}),te=v[H].rootEvents,_c.forEach(Q=>{te&&dl&&(u.documentElement.removeEventListener(Q,te),v[H].rootEvents=void 0),El&&(f.documentElement.addEventListener(Q,me),v[H].rootEvents=me)});let gl=v[H].stateOwnersUpdateHandlers;Ac.forEach(Q=>{gl&&ul&&gl(),fl&&(v[H].stateOwnersUpdateHandlers=Q(me,f))})}),Object.entries(f).forEach(([H,Di])=>{u[H]=Di}),g(),f=void 0};return D({media:t,fullscreenElement:e,documentElement:i,options:o}),{dispatch(T){let{type:k,detail:R}=T;if(r[k]&&E.mediaErrorCode==null){b(r[k](a,u,T));return}k==="mediaelementchangerequest"?D({media:R}):k==="fullscreenelementchangerequest"?D({fullscreenElement:R}):k==="documentelementchangerequest"?D({documentElement:R}):k==="optionschangerequest"&&Object.entries(R!=null?R:{}).forEach(([F,Y])=>{u.options[F]=Y})},getState(){return E},subscribe(T){return D({},d.length+1),d.push(T),T(E),()=>{let k=d.indexOf(T);k>=0&&(D({},d.length-1),d.splice(k,1))}}}};var co=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},L=(t,e,i)=>(co(t,e,"read from private field"),i?i.call(t):e.get(t)),rt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ct=(t,e,i,a)=>(co(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),mt=(t,e,i)=>(co(t,e,"access private method"),i),wt,Fi,$,Vi,Ne,Ja,ja,so,Jt,Gi,er,lo,gd=["ArrowLeft","ArrowRight","Enter"," ","f","m","k","c"],pd=10,p={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYS_USED:"keysused",LIVE_EDGE_OFFSET:"liveedgeoffset",SEEK_TO_LIVE_OFFSET:"seektoliveoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_HOTKEYS:"nohotkeys",NO_VOLUME_PREF:"novolumepref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_DEFAULT_STORE:"nodefaultstore",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",LANG:"lang"},tr=class extends Yt{constructor(){super(),rt(this,ja),rt(this,Jt),rt(this,er),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,rt(this,wt,new Oe(this,p.HOTKEYS)),rt(this,Fi,void 0),rt(this,$,void 0),rt(this,Vi,void 0),rt(this,Ne,void 0),rt(this,Ja,i=>{var a;(a=L(this,$))==null||a.dispatch(i)}),this.associateElement(this);let e={};ct(this,Vi,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);let o=a.toLowerCase(),l=new s.CustomEvent(Ml[o],{composed:!0,detail:r});this.dispatchEvent(l)}),e=i}),this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(p.NO_HOTKEYS,p.HOTKEYS,p.DEFAULT_STREAM_TYPE,p.DEFAULT_SUBTITLES,p.DEFAULT_DURATION,p.LANG)}get mediaStore(){return L(this,$)}set mediaStore(e){var i,a;if(L(this,$)&&((i=L(this,Ne))==null||i.call(this),ct(this,Ne,void 0)),ct(this,$,e),!L(this,$)&&!this.hasAttribute(p.NO_DEFAULT_STORE)){mt(this,ja,so).call(this);return}ct(this,Ne,(a=L(this,$))==null?void 0:a.subscribe(L(this,Vi)))}get fullscreenElement(){var e;return(e=L(this,Fi))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(p.FULLSCREEN_ELEMENT)&&this.removeAttribute(p.FULLSCREEN_ELEMENT),ct(this,Fi,e),(i=L(this,$))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return A(this,p.DEFAULT_SUBTITLES)}set defaultSubtitles(e){y(this,p.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return S(this,p.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){M(this,p.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return w(this,p.DEFAULT_DURATION)}set defaultDuration(e){x(this,p.DEFAULT_DURATION,e)}get noHotkeys(){return A(this,p.NO_HOTKEYS)}set noHotkeys(e){y(this,p.NO_HOTKEYS,e)}get keysUsed(){return S(this,p.KEYS_USED)}set keysUsed(e){M(this,p.KEYS_USED,e)}get liveEdgeOffset(){return w(this,p.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){x(this,p.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return A(this,p.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){y(this,p.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return A(this,p.NO_VOLUME_PREF)}set noVolumePref(e){y(this,p.NO_VOLUME_PREF,e)}get noSubtitlesLangPref(){return A(this,p.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){y(this,p.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return A(this,p.NO_DEFAULT_STORE)}set noDefaultStore(e){y(this,p.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var r,o,l,d,u,E,b,g;if(super.attributeChangedCallback(e,i,a),e===p.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(p.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===p.HOTKEYS)L(this,wt).value=a;else if(e===p.DEFAULT_SUBTITLES&&a!==i)(r=L(this,$))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(p.DEFAULT_SUBTITLES)}});else if(e===p.DEFAULT_STREAM_TYPE)(l=L(this,$))==null||l.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(o=this.getAttribute(p.DEFAULT_STREAM_TYPE))!=null?o:void 0}});else if(e===p.LIVE_EDGE_OFFSET)(d=L(this,$))==null||d.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(p.LIVE_EDGE_OFFSET)}});else if(e===p.SEEK_TO_LIVE_OFFSET)(u=L(this,$))==null||u.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===p.NO_AUTO_SEEK_TO_LIVE)(E=L(this,$))==null||E.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(p.NO_AUTO_SEEK_TO_LIVE)}});else if(e===p.FULLSCREEN_ELEMENT){let v=a?(b=this.getRootNode())==null?void 0:b.getElementById(a):void 0;ct(this,Fi,v),(g=L(this,$))==null||g.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===p.LANG&&a!==i&&Nl(a)}connectedCallback(){var e,i;!L(this,$)&&!this.hasAttribute(p.NO_DEFAULT_STORE)&&mt(this,ja,so).call(this),(e=L(this,$))==null||e.dispatch({type:"documentelementchangerequest",detail:c}),super.connectedCallback(),L(this,$)&&!L(this,Ne)&&ct(this,Ne,(i=L(this,$))==null?void 0:i.subscribe(L(this,Vi))),this.enableHotkeys()}disconnectedCallback(){var e,i,a,r;(e=super.disconnectedCallback)==null||e.call(this),L(this,$)&&((i=L(this,$))==null||i.dispatch({type:"documentelementchangerequest",detail:void 0}),(a=L(this,$))==null||a.dispatch({type:m.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})),L(this,Ne)&&((r=L(this,Ne))==null||r.call(this),ct(this,Ne,void 0))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=L(this,$))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=L(this,$))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){fd(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:i}=this;if(i.has(e))return;let a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),o=km(e,a,r);Object.values(m).forEach(l=>{e.addEventListener(l,L(this,Ja))}),i.set(e,o)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(m).forEach(r=>{e.removeEventListener(r,L(this,Ja))})}registerMediaStateReceiver(e){if(!e)return;let i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),L(this,$)&&Object.entries(L(this,$).getState()).forEach(([r,o])=>{fd([e],r,o)}))}unregisterMediaStateReceiver(e){let i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",mt(this,er,lo))}disableHotkeys(){this.removeEventListener("keydown",mt(this,er,lo)),this.removeEventListener("keyup",mt(this,Jt,Gi))}get hotkeys(){return S(this,p.HOTKEYS)}set hotkeys(e){M(this,p.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,o,l;let d=e.target;if(((r=(a=(i=d.getAttribute(p.KEYS_USED))==null?void 0:i.split(" "))!=null?a:d==null?void 0:d.keysUsed)!=null?r:[]).map(v=>v==="Space"?" ":v).filter(Boolean).includes(e.key))return;let E,b,g;if(!L(this,wt).contains(`no${e.key.toLowerCase()}`)&&!(e.key===" "&&L(this,wt).contains("nospace")))switch(e.key){case" ":case"k":E=L(this,$).getState().mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"m":E=this.mediaStore.getState().mediaVolumeLevel==="off"?m.MEDIA_UNMUTE_REQUEST:m.MEDIA_MUTE_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"f":E=this.mediaStore.getState().mediaIsFullscreen?m.MEDIA_EXIT_FULLSCREEN_REQUEST:m.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new s.CustomEvent(m.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":{let v=this.hasAttribute(p.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(p.KEYBOARD_BACKWARD_SEEK_OFFSET):pd;b=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)-v,0),g=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(g);break}case"ArrowRight":{let v=this.hasAttribute(p.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(p.KEYBOARD_FORWARD_SEEK_OFFSET):pd;b=Math.max(((l=this.mediaStore.getState().mediaCurrentTime)!=null?l:0)+v,0),g=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(g);break}default:break}}};wt=new WeakMap;Fi=new WeakMap;$=new WeakMap;Vi=new WeakMap;Ne=new WeakMap;Ja=new WeakMap;ja=new WeakSet;so=function(){var t;this.mediaStore=hd({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(p.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(p.DEFAULT_DURATION)?+this.getAttribute(p.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(p.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(p.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(p.NO_VOLUME_PREF),noSubtitlesLangPref:this.hasAttribute(p.NO_SUBTITLES_LANG_PREF)}})};Jt=new WeakSet;Gi=function(t){let{key:e}=t;if(!gd.includes(e)){this.removeEventListener("keyup",mt(this,Jt,Gi));return}this.keyboardShortcutHandler(t)};er=new WeakSet;lo=function(t){let{metaKey:e,altKey:i,key:a}=t;if(e||i||!gd.includes(a)){this.removeEventListener("keyup",mt(this,Jt,Gi));return}[" ","ArrowLeft","ArrowRight"].includes(a)&&!(L(this,wt).contains(`no${a.toLowerCase()}`)||a===" "&&L(this,wt).contains("nospace"))&&t.preventDefault(),this.addEventListener("keyup",mt(this,Jt,Gi),{once:!0})};var bm=Object.values(n),_m=Object.values(Vn),bd=t=>{var e,i,a,r;let{observedAttributes:o}=t.constructor;!o&&((e=t.nodeName)!=null&&e.includes("-"))&&(s.customElements.upgrade(t),{observedAttributes:o}=t.constructor);let l=(r=(a=(i=t==null?void 0:t.getAttribute)==null?void 0:i.call(t,C.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(o||l)?(o||l).filter(d=>bm.includes(d)):[]},Am=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&s.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof s.customElements.get(t.nodeName.toLowerCase()))&&s.customElements.upgrade(t),_m.some(a=>a in t)},uo=t=>Am(t)||!!bd(t).length,vd=t=>{var e;return(e=t==null?void 0:t.join)==null?void 0:e.call(t,":")},Ed={[n.MEDIA_SUBTITLES_LIST]:at,[n.MEDIA_SUBTITLES_SHOWING]:at,[n.MEDIA_SEEKABLE]:vd,[n.MEDIA_BUFFERED]:t=>t==null?void 0:t.map(vd).join(" "),[n.MEDIA_PREVIEW_COORDS]:t=>t==null?void 0:t.join(" "),[n.MEDIA_RENDITION_LIST]:wl,[n.MEDIA_AUDIO_TRACK_LIST]:xl},ym=async(t,e,i)=>{var a,r;if(t.isConnected||await wa(0),typeof i=="boolean"||i==null)return y(t,e,i);if(typeof i=="number")return x(t,e,i);if(typeof i=="string")return M(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);let o=(r=(a=Ed[e])==null?void 0:a.call(Ed,i))!=null?r:i;return t.setAttribute(e,o)},Tm=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},Ct=(t,e)=>{if(Tm(t))return;let i=(r,o)=>{var l,d;uo(r)&&o(r);let{children:u=[]}=r!=null?r:{},E=(d=(l=r==null?void 0:r.shadowRoot)==null?void 0:l.children)!=null?d:[];[...u,...E].forEach(g=>Ct(g,o))},a=t==null?void 0:t.nodeName.toLowerCase();if(a.includes("-")&&!uo(t)){s.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},fd=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}let r=bd(a),o=e.toLowerCase();r.includes(o)&&ym(a,o,i)})},km=(t,e,i)=>{Ct(t,e);let a=b=>{var g;let v=(g=b==null?void 0:b.composedPath()[0])!=null?g:b.target;e(v)},r=b=>{var g;let v=(g=b==null?void 0:b.composedPath()[0])!=null?g:b.target;i(v)};t.addEventListener(m.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(m.UNREGISTER_MEDIA_STATE_RECEIVER,r);let o=b=>{b.forEach(g=>{let{addedNodes:v=[],removedNodes:f=[],type:D,target:T,attributeName:k}=g;D==="childList"?(Array.prototype.forEach.call(v,R=>Ct(R,e)),Array.prototype.forEach.call(f,R=>Ct(R,i))):D==="attributes"&&k===C.MEDIA_CHROME_ATTRIBUTES&&(uo(T)?e(T):i(T))})},l=[],d=b=>{let g=b.target;g.name!=="media"&&(l.forEach(v=>Ct(v,i)),l=[...g.assignedElements({flatten:!0})],l.forEach(v=>Ct(v,e)))};t.addEventListener("slotchange",d);let u=new MutationObserver(o);return u.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{Ct(t,i),t.removeEventListener("slotchange",d),u.disconnect(),t.removeEventListener(m.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(m.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};s.customElements.get("media-controller")||s.customElements.define("media-controller",tr);var mo=tr;var po=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},X=(t,e,i)=>(po(t,e,"read from private field"),i?i.call(t):e.get(t)),jt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ir=(t,e,i,a)=>(po(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Im=(t,e,i)=>(po(t,e,"access private method"),i),Be,ti,pt,ei,ar,ho,_d,ht={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"},Ad=c.createElement("template");Ad.innerHTML=`
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
`;var B=class extends s.HTMLElement{constructor(e={}){var i;if(super(),jt(this,ho),jt(this,Be,void 0),this.preventClick=!1,this.tooltipEl=null,this.tooltipContent="",jt(this,ti,a=>{this.preventClick||this.handleClick(a),setTimeout(X(this,pt),0)}),jt(this,pt,()=>{var a,r;(r=(a=this.tooltipEl)==null?void 0:a.updateXOffset)==null||r.call(a)}),jt(this,ei,a=>{let{key:r}=a;if(!this.keysUsed.includes(r)){this.removeEventListener("keyup",X(this,ei));return}this.preventClick||this.handleClick(a)}),jt(this,ar,a=>{let{metaKey:r,altKey:o,key:l}=a;if(r||o||!this.keysUsed.includes(l)){this.removeEventListener("keyup",X(this,ei));return}this.addEventListener("keyup",X(this,ei),{once:!0})}),!this.shadowRoot){this.attachShadow({mode:"open"});let a=Ad.content.cloneNode(!0);this.nativeEl=a;let r=e.slotTemplate;r||(r=c.createElement("template"),r.innerHTML=`<slot>${e.defaultContent||""}</slot>`),e.tooltipContent&&(a.querySelector('slot[name="tooltip-content"]').innerHTML=(i=e.tooltipContent)!=null?i:"",this.tooltipContent=e.tooltipContent),this.nativeEl.appendChild(r.content.cloneNode(!0)),this.shadowRoot.appendChild(a)}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",ht.TOOLTIP_PLACEMENT,C.MEDIA_CONTROLLER]}enable(){this.addEventListener("click",X(this,ti)),this.addEventListener("keydown",X(this,ar)),this.tabIndex=0}disable(){this.removeEventListener("click",X(this,ti)),this.removeEventListener("keydown",X(this,ar)),this.removeEventListener("keyup",X(this,ei)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER?(i&&((o=(r=X(this,Be))==null?void 0:r.unassociateElement)==null||o.call(r,this),ir(this,Be,null)),a&&this.isConnected&&(ir(this,Be,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=X(this,Be))==null?void 0:d.associateElement)==null||u.call(d,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===ht.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i&&(this.tooltipEl.placement=a),X(this,pt).call(this)}connectedCallback(){var e,i,a;let{style:r}=N(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(ir(this,Be,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=X(this,Be))==null?void 0:i.associateElement)==null||a.call(i,this)),s.customElements.whenDefined("media-tooltip").then(()=>Im(this,ho,_d).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=X(this,Be))==null?void 0:e.unassociateElement)==null||i.call(e,this),ir(this,Be,null),this.removeEventListener("mouseenter",X(this,pt)),this.removeEventListener("focus",X(this,pt)),this.removeEventListener("click",X(this,ti))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return S(this,ht.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){M(this,ht.TOOLTIP_PLACEMENT,e)}get mediaController(){return S(this,C.MEDIA_CONTROLLER)}set mediaController(e){M(this,C.MEDIA_CONTROLLER,e)}get disabled(){return A(this,ht.DISABLED)}set disabled(e){y(this,ht.DISABLED,e)}get noTooltip(){return A(this,ht.NO_TOOLTIP)}set noTooltip(e){y(this,ht.NO_TOOLTIP,e)}handleClick(e){}};Be=new WeakMap;ti=new WeakMap;pt=new WeakMap;ei=new WeakMap;ar=new WeakMap;ho=new WeakSet;_d=function(){this.addEventListener("mouseenter",X(this,pt)),this.addEventListener("focus",X(this,pt)),this.addEventListener("click",X(this,ti));let t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)};s.customElements.get("media-chrome-button")||s.customElements.define("media-chrome-button",B);var vo=B;var yd=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`,kd=c.createElement("template");kd.innerHTML=`
  <style>
    :host([${n.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
      display: none !important;
    }

    
    :host(:not([${n.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
      display: none !important;
    }

    :host([${n.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
    :host(:not([${n.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="enter">${yd}</slot>
    <slot name="exit">${yd}</slot>
  </slot>
`;var Sm=`
  <slot name="tooltip-enter">${h("start airplay")}</slot>
  <slot name="tooltip-exit">${h("stop airplay")}</slot>
`,Td=t=>{let e=t.mediaIsAirplaying?h("stop airplay"):h("start airplay");t.setAttribute("aria-label",e)},rr=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_AIRPLAYING,n.MEDIA_AIRPLAY_UNAVAILABLE]}constructor(e={}){super({slotTemplate:kd,tooltipContent:Sm,...e})}connectedCallback(){super.connectedCallback(),Td(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_AIRPLAYING&&Td(this)}get mediaIsAirplaying(){return A(this,n.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){y(this,n.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return S(this,n.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){M(this,n.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new s.CustomEvent(m.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};s.customElements.get("media-airplay-button")||s.customElements.define("media-airplay-button",rr);var Eo=rr;var Mm=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Cm=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,Cd=c.createElement("template");Cd.innerHTML=`
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
    <slot name="on">${Mm}</slot>
    <slot name="off">${Cm}</slot>
  </slot>
`;var wm=`
  <slot name="tooltip-enable">${h("Enable captions")}</slot>
  <slot name="tooltip-disable">${h("Disable captions")}</slot>
`,Id=t=>{t.setAttribute("aria-checked",Ya(t).toString())},nr=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}constructor(e={}){super({slotTemplate:Cd,tooltipContent:wm,...e}),this._captionsReady=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",h("closed captions")),Id(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_SHOWING&&Id(this)}get mediaSubtitlesList(){return Sd(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Md(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Sd(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Md(this,n.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new s.CustomEvent(m.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}},Sd=(t,e)=>{let i=t.getAttribute(e);return i?It(i):[]},Md=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=at(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-button")||s.customElements.define("media-captions-button",nr);var fo=nr;var Lm='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',xm='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>',Ld=c.createElement("template");Ld.innerHTML=`
  <style>
  :host([${n.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
    display: none !important;
  }

  
  :host(:not([${n.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
    display: none !important;
  }

  :host([${n.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
    :host(:not([${n.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="enter">${Lm}</slot>
    <slot name="exit">${xm}</slot>
  </slot>
`;var Rm=`
  <slot name="tooltip-enter">${h("Start casting")}</slot>
  <slot name="tooltip-exit">${h("Stop casting")}</slot>
`,wd=t=>{let e=t.mediaIsCasting?h("stop casting"):h("start casting");t.setAttribute("aria-label",e)},or=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_CASTING,n.MEDIA_CAST_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Ld,tooltipContent:Rm,...e})}connectedCallback(){super.connectedCallback(),wd(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_CASTING&&wd(this)}get mediaIsCasting(){return A(this,n.MEDIA_IS_CASTING)}set mediaIsCasting(e){y(this,n.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return S(this,n.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){M(this,n.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?m.MEDIA_EXIT_CAST_REQUEST:m.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-cast-button")||s.customElements.define("media-cast-button",or);var go=or;var Io=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},xt=(t,e,i)=>(Io(t,e,"read from private field"),i?i.call(t):e.get(t)),nt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},So=(t,e,i,a)=>(Io(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Lt=(t,e,i)=>(Io(t,e,"access private method"),i),lr,qi,Rt,sr,bo,_o,xd,Ao,Rd,yo,Dd,To,Pd,ko,Ud;function Dm(t){return`
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
    ${this.getSlotTemplateHTML(t)}
  `}function Pm(t){return`
    <slot id="content"></slot>
  `}var Ki={OPEN:"open",ANCHOR:"anchor"},vt=class extends s.HTMLElement{constructor(){super(),nt(this,sr),nt(this,_o),nt(this,Ao),nt(this,yo),nt(this,To),nt(this,ko),nt(this,lr,!1),nt(this,qi,null),nt(this,Rt,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[Ki.OPEN,Ki.ANCHOR]}get open(){return A(this,Ki.OPEN)}set open(e){y(this,Ki.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":Lt(this,yo,Dd).call(this,e);break;case"focusout":Lt(this,To,Pd).call(this,e);break;case"keydown":Lt(this,ko,Ud).call(this,e);break}}connectedCallback(){Lt(this,sr,bo).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,i,a){Lt(this,sr,bo).call(this),e===Ki.OPEN&&a!==i&&(this.open?Lt(this,_o,xd).call(this):Lt(this,Ao,Rd).call(this))}focus(){So(this,qi,Ui());let e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;let a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a==null||a.focus()}get keysUsed(){return["Escape","Tab"]}};lr=new WeakMap;qi=new WeakMap;Rt=new WeakMap;sr=new WeakSet;bo=function(){if(!xt(this,lr)&&(So(this,lr,!0),!this.shadowRoot)){this.attachShadow({mode:"open"});let t=Vl(this.attributes);this.shadowRoot.innerHTML=`
        ${this.constructor.getTemplateHTML(t)}
      `,queueMicrotask(()=>{let{style:e}=N(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};_o=new WeakSet;xd=function(){var t;(t=xt(this,Rt))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};Ao=new WeakSet;Rd=function(){var t;(t=xt(this,Rt))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};yo=new WeakSet;Dd=function(t){So(this,Rt,t.relatedTarget),le(this,t.relatedTarget)||(this.open=!this.open)};To=new WeakSet;Pd=function(t){var e;le(this,t.relatedTarget)||((e=xt(this,qi))==null||e.focus(),xt(this,Rt)&&xt(this,Rt)!==t.relatedTarget&&this.open&&(this.open=!1))};ko=new WeakSet;Ud=function(t){var e,i,a,r,o;let{key:l,ctrlKey:d,altKey:u,metaKey:E}=t;d||u||E||this.keysUsed.includes(l)&&(t.preventDefault(),t.stopPropagation(),l==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):l==="Escape"&&((o=xt(this,qi))==null||o.focus(),this.open=!1))};vt.getTemplateHTML=Dm;vt.getSlotTemplateHTML=Pm;s.customElements.get("media-chrome-dialog")||s.customElements.define("media-chrome-dialog",vt);var Mo=vt;var Po=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},z=(t,e,i)=>(Po(t,e,"read from private field"),i?i.call(t):e.get(t)),ne=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Et=(t,e,i,a)=>(Po(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ce=(t,e,i)=>(Po(t,e,"access private method"),i),He,gr,dr,ur,we,Er,cr,mr,hr,Uo,Od,pr,Co,vr,wo,fr,Oo,Lo,Nd,xo,Bd,Ro,Hd,Do,$d,Wd=c.createElement("template");Wd.innerHTML=`
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
`;var ft=class extends s.HTMLElement{constructor(){super(),ne(this,Uo),ne(this,pr),ne(this,vr),ne(this,fr),ne(this,Lo),ne(this,xo),ne(this,Ro),ne(this,Do),ne(this,He,void 0),ne(this,gr,void 0),ne(this,dr,void 0),ne(this,ur,void 0),ne(this,we,{}),ne(this,Er,[]),ne(this,cr,()=>{if(this.range.matches(":focus-visible")){let{style:e}=N(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),ne(this,mr,()=>{let{style:e}=N(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),ne(this,hr,()=>{let e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Wd.content.cloneNode(!0))),this.container=this.shadowRoot.querySelector("#container"),Et(this,dr,this.shadowRoot.querySelector("#startpoint")),Et(this,ur,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER?(i&&((o=(r=z(this,He))==null?void 0:r.unassociateElement)==null||o.call(r,this),Et(this,He,null)),a&&this.isConnected&&(Et(this,He,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=z(this,He))==null?void 0:d.associateElement)==null||u.call(d,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),Ce(this,pr,Co).call(this)):(this.range.setAttribute(e,a),Ce(this,vr,wo).call(this)))}connectedCallback(){var e,i,a;let{style:r}=N(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),z(this,we).pointer=N(this.shadowRoot,"#pointer"),z(this,we).progress=N(this.shadowRoot,"#progress"),z(this,we).thumb=N(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),z(this,we).activeSegment=N(this.shadowRoot,"#segments-clipping rect:nth-child(0)");let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(Et(this,He,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=z(this,He))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",z(this,cr)),this.shadowRoot.addEventListener("focusout",z(this,mr)),Ce(this,pr,Co).call(this),et(this.container,z(this,hr))}disconnectedCallback(){var e,i;Ce(this,vr,wo).call(this),(i=(e=z(this,He))==null?void 0:e.unassociateElement)==null||i.call(e,this),Et(this,He,null),this.shadowRoot.removeEventListener("focusin",z(this,cr)),this.shadowRoot.removeEventListener("focusout",z(this,mr)),tt(this.container,z(this,hr))}updatePointerBar(e){var i;(i=z(this,we).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;let a=this.range.valueAsNumber*100;(e=z(this,we).progress)==null||e.style.setProperty("width",`${a}%`),(i=z(this,we).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){let i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!(e!=null&&e.length)),!(e!=null&&e.length))return;let a=[...new Set([+this.range.min,...e.flatMap(o=>[o.start,o.end]),+this.range.max])];Et(this,Er,[...a]);let r=a.pop();for(let[o,l]of a.entries()){let[d,u]=[o===0,o===a.length-1],E=d?"calc(var(--segments-gap) / -1)":`${l*100}%`,g=`calc(${((u?r:a[o+1])-l)*100}%${d||u?"":" - var(--segments-gap)"})`,v=c.createElementNS("http://www.w3.org/2000/svg","rect"),f=N(this.shadowRoot,`#segments-clipping rect:nth-child(${o+1})`);f.style.setProperty("x",E),f.style.setProperty("width",g),i.append(v)}}getPointerRatio(e){return Gl(e.clientX,e.clientY,z(this,dr).getBoundingClientRect(),z(this,ur).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":Ce(this,Do,$d).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":Ce(this,Lo,Nd).call(this,e);break;case"pointerdown":Ce(this,fr,Oo).call(this,e);break;case"pointerup":Ce(this,xo,Bd).call(this);break;case"pointerleave":Ce(this,Ro,Hd).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}};He=new WeakMap;gr=new WeakMap;dr=new WeakMap;ur=new WeakMap;we=new WeakMap;Er=new WeakMap;cr=new WeakMap;mr=new WeakMap;hr=new WeakMap;Uo=new WeakSet;Od=function(t){let e=z(this,we).activeSegment;if(!e)return;let i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${z(this,Er).findIndex((o,l,d)=>{let u=d[l+1];return u!=null&&i>=o&&i<=u})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};pr=new WeakSet;Co=function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};vr=new WeakSet;wo=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),(t=s.window)==null||t.removeEventListener("pointerup",this),(e=s.window)==null||e.removeEventListener("pointermove",this)};fr=new WeakSet;Oo=function(t){var e;Et(this,gr,t.composedPath().includes(this.range)),(e=s.window)==null||e.addEventListener("pointerup",this)};Lo=new WeakSet;Nd=function(t){var e;t.pointerType!=="mouse"&&Ce(this,fr,Oo).call(this,t),this.addEventListener("pointerleave",this),(e=s.window)==null||e.addEventListener("pointermove",this)};xo=new WeakSet;Bd=function(){var t;(t=s.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};Ro=new WeakSet;Hd=function(){var t,e;this.removeEventListener("pointerleave",this),(t=s.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=z(this,we).activeSegment)==null||e.style.removeProperty("transform")};Do=new WeakSet;$d=function(t){this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),Ce(this,Uo,Od).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!z(this,gr))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})))};s.customElements.get("media-chrome-range")||s.customElements.define("media-chrome-range",ft);var No=ft;var Fd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},br=(t,e,i)=>(Fd(t,e,"read from private field"),i?i.call(t):e.get(t)),Um=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},_r=(t,e,i,a)=>(Fd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),$e,Vd=c.createElement("template");Vd.innerHTML=`
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
`;var Ar=class extends s.HTMLElement{constructor(){super(),Um(this,$e,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Vd.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=br(this,$e))==null?void 0:r.unassociateElement)==null||o.call(r,this),_r(this,$e,null)),a&&this.isConnected&&(_r(this,$e,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=br(this,$e))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(_r(this,$e,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=br(this,$e))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=br(this,$e))==null?void 0:e.unassociateElement)==null||i.call(e,this),_r(this,$e,null)}};$e=new WeakMap;s.customElements.get("media-control-bar")||s.customElements.define("media-control-bar",Ar);var Bo=Ar;var Gd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},yr=(t,e,i)=>(Gd(t,e,"read from private field"),i?i.call(t):e.get(t)),Om=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Tr=(t,e,i,a)=>(Gd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),We,Kd=c.createElement("template");Kd.innerHTML=`
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
`;var _e=class extends s.HTMLElement{constructor(){super(),Om(this,We,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Kd.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=yr(this,We))==null?void 0:r.unassociateElement)==null||o.call(r,this),Tr(this,We,null)),a&&this.isConnected&&(Tr(this,We,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=yr(this,We))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let{style:r}=N(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(Tr(this,We,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=yr(this,We))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=yr(this,We))==null?void 0:e.unassociateElement)==null||i.call(e,this),Tr(this,We,null)}};We=new WeakMap;s.customElements.get("media-text-display")||s.customElements.define("media-text-display",_e);var Ho=_e;var Yd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},qd=(t,e,i)=>(Yd(t,e,"read from private field"),i?i.call(t):e.get(t)),Nm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Bm=(t,e,i,a)=>(Yd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Yi,kr=class extends _e{constructor(){super(),Nm(this,Yi,void 0),Bm(this,Yi,this.shadowRoot.querySelector("slot")),qd(this,Yi).textContent=Pe(0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===n.MEDIA_DURATION&&(qd(this,Yi).textContent=Pe(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){x(this,n.MEDIA_DURATION,e)}};Yi=new WeakMap;s.customElements.get("media-duration-display")||s.customElements.define("media-duration-display",kr);var $o=kr;var Hm={2:h("Network Error"),3:h("Decode Error"),4:h("Source Not Supported"),5:h("Encryption Error")},$m={2:h("A network error caused the media download to fail."),3:h("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:h("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:h("The media is encrypted and there are no keys to decrypt it.")},Wo=t=>{var e,i;return t.code===1?null:{title:(e=Hm[t.code])!=null?e:`Error ${t.code}`,message:(i=$m[t.code])!=null?i:t.message}};var zd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Wm=(t,e,i)=>(zd(t,e,"read from private field"),i?i.call(t):e.get(t)),Fm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Vm=(t,e,i,a)=>(zd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ir;function Gm(t){return`
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
    <slot name="error-${t.mediaerrorcode}" id="content">
      ${Qd({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function Km(t){return t.code&&Wo(t)!==null}function Qd(t){var e;let{title:i,message:a}=(e=Wo(t))!=null?e:{},r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}var Zd=[n.MEDIA_ERROR_CODE,n.MEDIA_ERROR_MESSAGE],ii=class extends vt{constructor(){super(...arguments),Fm(this,Ir,null)}static get observedAttributes(){return[...super.observedAttributes,...Zd]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!Zd.includes(e))return;let o=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=Km(o),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(o))}get mediaError(){return Wm(this,Ir)}set mediaError(e){Vm(this,Ir,e)}get mediaErrorCode(){return w(this,"mediaerrorcode")}set mediaErrorCode(e){x(this,"mediaerrorcode",e)}get mediaErrorMessage(){return S(this,"mediaerrormessage")}set mediaErrorMessage(e){M(this,"mediaerrormessage",e)}};Ir=new WeakMap;ii.getSlotTemplateHTML=Gm;ii.formatErrorMessage=Qd;s.customElements.get("media-error-dialog")||s.customElements.define("media-error-dialog",ii);var Fo=ii;var qm=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,Ym=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`,Jd=c.createElement("template");Jd.innerHTML=`
  <style>
    :host([${n.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
      display: none !important;
    }

    
    :host(:not([${n.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
      display: none !important;
    }

    :host([${n.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
    :host(:not([${n.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="enter">${qm}</slot>
    <slot name="exit">${Ym}</slot>
  </slot>
`;var Zm=`
  <slot name="tooltip-enter">${h("Enter fullscreen mode")}</slot>
  <slot name="tooltip-exit">${h("Exit fullscreen mode")}</slot>
`,Xd=t=>{let e=t.mediaIsFullscreen?h("exit fullscreen mode"):h("enter fullscreen mode");t.setAttribute("aria-label",e)},Sr=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_FULLSCREEN,n.MEDIA_FULLSCREEN_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Jd,tooltipContent:Zm,...e})}connectedCallback(){super.connectedCallback(),Xd(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_FULLSCREEN&&Xd(this)}get mediaFullscreenUnavailable(){return S(this,n.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){M(this,n.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return A(this,n.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){y(this,n.MEDIA_IS_FULLSCREEN,e)}handleClick(){let e=this.mediaIsFullscreen?m.MEDIA_EXIT_FULLSCREEN_REQUEST:m.MEDIA_ENTER_FULLSCREEN_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-fullscreen-button")||s.customElements.define("media-fullscreen-button",Sr);var Vo=Sr;var{MEDIA_TIME_IS_LIVE:Mr,MEDIA_PAUSED:Zi}=n,{MEDIA_SEEK_TO_LIVE_REQUEST:zm,MEDIA_PLAY_REQUEST:Qm}=m,Xm='<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>',eu=c.createElement("template");eu.innerHTML=`
  <style>
  :host { --media-tooltip-display: none; }
  
  slot[name=indicator] > *,
  :host ::slotted([slot=indicator]) {
    
    min-width: auto;
    fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
    color: var(--media-live-button-icon-color, rgb(140, 140, 140));
  }

  :host([${Mr}]:not([${Zi}])) slot[name=indicator] > *,
  :host([${Mr}]:not([${Zi}])) ::slotted([slot=indicator]) {
    fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
    color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
  }

  :host([${Mr}]:not([${Zi}])) {
    cursor: var(--media-cursor, not-allowed);
  }

  slot[name=text]{
    text-transform: uppercase;
  }

  </style>

  <slot name="indicator">${Xm}</slot>
  
  <slot name="spacer">&nbsp;</slot><slot name="text">${h("live")}</slot>
`;var jd=t=>{let e=t.mediaPaused||!t.mediaTimeIsLive,i=e?h("seek to live"):h("playing live");t.setAttribute("aria-label",i),e?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")},Cr=class extends B{static get observedAttributes(){return[...super.observedAttributes,Zi,Mr]}constructor(e={}){super({slotTemplate:eu,...e})}connectedCallback(){jd(this),super.connectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),jd(this)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return A(this,n.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){y(this,n.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new s.CustomEvent(zm,{composed:!0,bubbles:!0})),this.hasAttribute(Zi)&&this.dispatchEvent(new s.CustomEvent(Qm,{composed:!0,bubbles:!0})))}};s.customElements.get("media-live-button")||s.customElements.define("media-live-button",Cr);var Go=Cr;var iu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},zi=(t,e,i)=>(iu(t,e,"read from private field"),i?i.call(t):e.get(t)),tu=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Qi=(t,e,i,a)=>(iu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Fe,Lr,wr={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},au=500,ru=c.createElement("template"),Jm=`
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
`;ru.innerHTML=`
<style>
:host {
  display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
  vertical-align: middle;
  box-sizing: border-box;
  --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${au}ms);
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

:host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) slot[name=icon] > *,
:host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
  opacity: var(--media-loading-indicator-opacity, 1);
  transition: opacity 0.15s var(--_loading-indicator-delay);
}

:host #status {
  visibility: var(--media-loading-indicator-opacity, hidden);
  transition: visibility 0.15s;
}

:host([${n.MEDIA_LOADING}]:not([${n.MEDIA_PAUSED}])) #status {
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

<slot name="icon">${Jm}</slot>
<div id="status" role="status" aria-live="polite">${h("media loading")}</div>
`;var xr=class extends s.HTMLElement{constructor(){if(super(),tu(this,Fe,void 0),tu(this,Lr,au),!this.shadowRoot){let e=this.attachShadow({mode:"open"}),i=ru.content.cloneNode(!0);e.appendChild(i)}}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PAUSED,n.MEDIA_LOADING,wr.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===wr.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===C.MEDIA_CONTROLLER&&(i&&((o=(r=zi(this,Fe))==null?void 0:r.unassociateElement)==null||o.call(r,this),Qi(this,Fe,null)),a&&this.isConnected&&(Qi(this,Fe,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=zi(this,Fe))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(Qi(this,Fe,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=zi(this,Fe))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=zi(this,Fe))==null?void 0:e.unassociateElement)==null||i.call(e,this),Qi(this,Fe,null)}get loadingDelay(){return zi(this,Lr)}set loadingDelay(e){Qi(this,Lr,e);let{style:i}=N(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return A(this,n.MEDIA_LOADING)}set mediaLoading(e){y(this,n.MEDIA_LOADING,e)}get mediaController(){return S(this,C.MEDIA_CONTROLLER)}set mediaController(e){M(this,C.MEDIA_CONTROLLER,e)}get noAutohide(){return A(this,wr.NO_AUTOHIDE)}set noAutohide(e){y(this,wr.NO_AUTOHIDE,e)}};Fe=new WeakMap;Lr=new WeakMap;s.customElements.get("media-loading-indicator")||s.customElements.define("media-loading-indicator",xr);var Ko=xr;var{MEDIA_VOLUME_LEVEL:Dt}=n,jm=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,nu=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,eh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`,su=c.createElement("template");su.innerHTML=`
  <style>
  
  :host(:not([${Dt}])) slot[name=icon] slot:not([name=high]), 
  :host([${Dt}=high]) slot[name=icon] slot:not([name=high]) {
    display: none !important;
  }

  :host([${Dt}=off]) slot[name=icon] slot:not([name=off]) {
    display: none !important;
  }

  :host([${Dt}=low]) slot[name=icon] slot:not([name=low]) {
    display: none !important;
  }

  :host([${Dt}=medium]) slot[name=icon] slot:not([name=medium]) {
    display: none !important;
  }

  :host(:not([${Dt}=off])) slot[name=tooltip-unmute],
  :host([${Dt}=off]) slot[name=tooltip-mute] {
    display: none;
  }
  </style>

  <slot name="icon">
    <slot name="off">${jm}</slot>
    <slot name="low">${nu}</slot>
    <slot name="medium">${nu}</slot>
    <slot name="high">${eh}</slot>
  </slot>
`;var th=`
  <slot name="tooltip-mute">${h("Mute")}</slot>
  <slot name="tooltip-unmute">${h("Unmute")}</slot>
`,ou=t=>{let i=t.mediaVolumeLevel==="off"?h("unmute"):h("mute");t.setAttribute("aria-label",i)},Rr=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME_LEVEL]}constructor(e={}){super({slotTemplate:su,tooltipContent:th,...e})}connectedCallback(){ou(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_VOLUME_LEVEL&&ou(this),super.attributeChangedCallback(e,i,a)}get mediaVolumeLevel(){return S(this,n.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){M(this,n.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel==="off"?m.MEDIA_UNMUTE_REQUEST:m.MEDIA_MUTE_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-mute-button")||s.customElements.define("media-mute-button",Rr);var qo=Rr;var lu=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`,uu=c.createElement("template");uu.innerHTML=`
  <style>
  :host([${n.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
    display: none !important;
  }

  
  :host(:not([${n.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
    display: none !important;
  }

  :host([${n.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
  :host(:not([${n.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
    display: none;
  }
  </style>

  <slot name="icon">
    <slot name="enter">${lu}</slot>
    <slot name="exit">${lu}</slot>
  </slot>
`;var ih=`
  <slot name="tooltip-enter">${h("Enter picture in picture mode")}</slot>
  <slot name="tooltip-exit">${h("Exit picture in picture mode")}</slot>
`,du=t=>{let e=t.mediaIsPip?h("exit picture in picture mode"):h("enter picture in picture mode");t.setAttribute("aria-label",e)},Dr=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_PIP,n.MEDIA_PIP_UNAVAILABLE]}constructor(e={}){super({slotTemplate:uu,tooltipContent:ih,...e})}connectedCallback(){du(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_IS_PIP&&du(this),super.attributeChangedCallback(e,i,a)}get mediaPipUnavailable(){return S(this,n.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){M(this,n.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return A(this,n.MEDIA_IS_PIP)}set mediaIsPip(e){y(this,n.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?m.MEDIA_EXIT_PIP_REQUEST:m.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-pip-button")||s.customElements.define("media-pip-button",Dr);var Yo=Dr;var ah=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Pr=(t,e,i)=>(ah(t,e,"read from private field"),i?i.call(t):e.get(t)),rh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ai,Zo={RATES:"rates"},zo=[1,1.2,1.5,1.7,2],ri=1,cu=c.createElement("template");cu.innerHTML=`
  <style>
    :host {
      min-width: 5ch;
      padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
    }
  </style>
  <slot name="icon"></slot>
`;var Ur=class extends B{constructor(e={}){super({slotTemplate:cu,tooltipContent:h("Playback rate"),...e}),rh(this,ai,new Oe(this,Zo.RATES,{defaultValue:zo})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${ri}x`}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,Zo.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Zo.RATES&&(Pr(this,ai).value=a),e===n.MEDIA_PLAYBACK_RATE){let r=a?+a:Number.NaN,o=Number.isNaN(r)?ri:r;this.container.innerHTML=`${o}x`,this.setAttribute("aria-label",h("Playback rate {playbackRate}",{playbackRate:o}))}}get rates(){return Pr(this,ai)}set rates(e){e?Array.isArray(e)&&(Pr(this,ai).value=e.join(" ")):Pr(this,ai).value=""}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,ri)}set mediaPlaybackRate(e){x(this,n.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;let a=Array.from(this.rates.values(),l=>+l).sort((l,d)=>l-d),r=(i=(e=a.find(l=>l>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:ri,o=new s.CustomEvent(m.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(o)}};ai=new WeakMap;s.customElements.get("media-playback-rate-button")||s.customElements.define("media-playback-rate-button",Ur);var Qo=Ur;var nh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,oh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`,hu=c.createElement("template");hu.innerHTML=`
  <style>
    :host([${n.MEDIA_PAUSED}]) slot[name=pause],
    :host(:not([${n.MEDIA_PAUSED}])) slot[name=play] {
      display: none !important;
    }

    :host([${n.MEDIA_PAUSED}]) slot[name=tooltip-pause],
    :host(:not([${n.MEDIA_PAUSED}])) slot[name=tooltip-play] {
      display: none;
    }
  </style>

  <slot name="icon">
    <slot name="play">${nh}</slot>
    <slot name="pause">${oh}</slot>
  </slot>
`;var sh=`
  <slot name="tooltip-play">${h("Play")}</slot>
  <slot name="tooltip-pause">${h("Pause")}</slot>
`,mu=t=>{let e=t.mediaPaused?h("play"):h("pause");t.setAttribute("aria-label",e)},Or=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_ENDED]}constructor(e={}){super({slotTemplate:hu,tooltipContent:sh,...e})}connectedCallback(){mu(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_PAUSED&&mu(this),super.attributeChangedCallback(e,i,a)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-play-button")||s.customElements.define("media-play-button",Or);var Xo=Or;var Ve={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"},pu=c.createElement("template");pu.innerHTML=`
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
`;var lh=t=>{t.style.removeProperty("background-image")},dh=(t,e)=>{t.style["background-image"]=`url('${e}')`},Nr=class extends s.HTMLElement{static get observedAttributes(){return[Ve.PLACEHOLDER_SRC,Ve.SRC]}constructor(){super(),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(pu.content.cloneNode(!0))),this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Ve.SRC&&(a==null?this.image.removeAttribute(Ve.SRC):this.image.setAttribute(Ve.SRC,a)),e===Ve.PLACEHOLDER_SRC&&(a==null?lh(this.image):dh(this.image,a))}get placeholderSrc(){return S(this,Ve.PLACEHOLDER_SRC)}set placeholderSrc(e){M(this,Ve.SRC,e)}get src(){return S(this,Ve.SRC)}set src(e){M(this,Ve.SRC,e)}};s.customElements.get("media-poster-image")||s.customElements.define("media-poster-image",Nr);var Jo=Nr;var vu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},uh=(t,e,i)=>(vu(t,e,"read from private field"),i?i.call(t):e.get(t)),ch=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},mh=(t,e,i,a)=>(vu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Br,Hr=class extends _e{constructor(){super(),ch(this,Br,void 0),mh(this,Br,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_CHAPTER]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PREVIEW_CHAPTER&&a!==i&&a!=null&&(uh(this,Br).textContent=a,a!==""?this.setAttribute("aria-valuetext",`chapter: ${a}`):this.removeAttribute("aria-valuetext"))}get mediaPreviewChapter(){return S(this,n.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){M(this,n.MEDIA_PREVIEW_CHAPTER,e)}};Br=new WeakMap;s.customElements.get("media-preview-chapter-display")||s.customElements.define("media-preview-chapter-display",Hr);var jo=Hr;var Eu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},$r=(t,e,i)=>(Eu(t,e,"read from private field"),i?i.call(t):e.get(t)),hh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Wr=(t,e,i,a)=>(Eu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ge,fu=c.createElement("template");fu.innerHTML=`
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
`;var Fr=class extends s.HTMLElement{constructor(){super(),hh(this,Ge,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(fu.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(Wr(this,Ge,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=$r(this,Ge))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=$r(this,Ge))==null?void 0:e.unassociateElement)==null||i.call(e,this),Wr(this,Ge,null)}attributeChangedCallback(e,i,a){var r,o,l,d,u;[n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===C.MEDIA_CONTROLLER&&(i&&((o=(r=$r(this,Ge))==null?void 0:r.unassociateElement)==null||o.call(r,this),Wr(this,Ge,null)),a&&this.isConnected&&(Wr(this,Ge,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=$r(this,Ge))==null?void 0:d.associateElement)==null||u.call(d,this)))}get mediaPreviewImage(){return S(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){M(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(n.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(n.MEDIA_PREVIEW_COORDS);return}this.setAttribute(n.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){let e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;let[a,r,o,l]=e,d=i.split("#")[0],u=getComputedStyle(this),{maxWidth:E,maxHeight:b,minWidth:g,minHeight:v}=u,f=Math.min(parseInt(E)/o,parseInt(b)/l),D=Math.max(parseInt(g)/o,parseInt(v)/l),T=f<1,k=T?f:D>1?D:1,{style:R}=N(this.shadowRoot,":host"),F=N(this.shadowRoot,"img").style,Y=this.shadowRoot.querySelector("img"),ge=T?"min":"max";R.setProperty(`${ge}-width`,"initial","important"),R.setProperty(`${ge}-height`,"initial","important"),R.width=`${o*k}px`,R.height=`${l*k}px`;let ye=()=>{F.width=`${this.imgWidth*k}px`,F.height=`${this.imgHeight*k}px`,F.display="block"};Y.src!==d&&(Y.onload=()=>{this.imgWidth=Y.naturalWidth,this.imgHeight=Y.naturalHeight,ye()},Y.src=d,ye()),ye(),F.transform=`translate(-${a*k}px, -${r*k}px)`}};Ge=new WeakMap;s.customElements.get("media-preview-thumbnail")||s.customElements.define("media-preview-thumbnail",Fr);var es=Fr;var bu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},gu=(t,e,i)=>(bu(t,e,"read from private field"),i?i.call(t):e.get(t)),ph=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},vh=(t,e,i,a)=>(bu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Xi,Vr=class extends _e{constructor(){super(),ph(this,Xi,void 0),vh(this,Xi,this.shadowRoot.querySelector("slot")),gu(this,Xi).textContent=Pe(0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PREVIEW_TIME&&a!=null&&(gu(this,Xi).textContent=Pe(parseFloat(a)))}get mediaPreviewTime(){return w(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){x(this,n.MEDIA_PREVIEW_TIME,e)}};Xi=new WeakMap;s.customElements.get("media-preview-time-display")||s.customElements.define("media-preview-time-display",Vr);var ts=Vr;var ni={SEEK_OFFSET:"seekoffset"},Gr=30,Eh=`<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(2.18 19.87)">${Gr}</text><path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/></svg>`,_u=c.createElement("template");_u.innerHTML=`
  <slot name="icon">${Eh}</slot>
`;var fh=0,Kr=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,ni.SEEK_OFFSET]}constructor(e={}){super({slotTemplate:_u,tooltipContent:h("Seek backward"),...e})}connectedCallback(){this.seekOffset=w(this,ni.SEEK_OFFSET,Gr),super.connectedCallback()}attributeChangedCallback(e,i,a){e===ni.SEEK_OFFSET&&(this.seekOffset=w(this,ni.SEEK_OFFSET,Gr)),super.attributeChangedCallback(e,i,a)}get seekOffset(){return w(this,ni.SEEK_OFFSET,Gr)}set seekOffset(e){x(this,ni.SEEK_OFFSET,e),this.setAttribute("aria-label",h("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),Pa(Ua(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME,fh)}set mediaCurrentTime(e){x(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};s.customElements.get("media-seek-backward-button")||s.customElements.define("media-seek-backward-button",Kr);var is=Kr;var oi={SEEK_OFFSET:"seekoffset"},qr=30,gh=`<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(8.9 19.87)">${qr}</text><path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/></svg>`,Au=c.createElement("template");Au.innerHTML=`
  <slot name="icon">${gh}</slot>
`;var bh=0,Yr=class extends B{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,oi.SEEK_OFFSET]}constructor(e={}){super({slotTemplate:Au,tooltipContent:h("Seek forward"),...e})}connectedCallback(){this.seekOffset=w(this,oi.SEEK_OFFSET,qr),super.connectedCallback()}attributeChangedCallback(e,i,a){e===oi.SEEK_OFFSET&&(this.seekOffset=w(this,oi.SEEK_OFFSET,qr)),super.attributeChangedCallback(e,i,a)}get seekOffset(){return w(this,oi.SEEK_OFFSET,qr)}set seekOffset(e){x(this,oi.SEEK_OFFSET,e),this.setAttribute("aria-label",h("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),Pa(Ua(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME,bh)}set mediaCurrentTime(e){x(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,i=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};s.customElements.get("media-seek-forward-button")||s.customElements.define("media-seek-forward-button",Yr);var as=Yr;var Iu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},rs=(t,e,i)=>(Iu(t,e,"read from private field"),i?i.call(t):e.get(t)),_h=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ah=(t,e,i,a)=>(Iu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),si,Le={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},yu=[...Object.values(Le),n.MEDIA_CURRENT_TIME,n.MEDIA_DURATION,n.MEDIA_SEEKABLE],Tu=["Enter"," "],yh="&nbsp;/&nbsp;",ku=(t,{timesSep:e=yh}={})=>{var i,a;let r=t.hasAttribute(Le.REMAINING),o=t.hasAttribute(Le.SHOW_DURATION),l=(i=t.mediaCurrentTime)!=null?i:0,[,d]=(a=t.mediaSeekable)!=null?a:[],u=0;Number.isFinite(t.mediaDuration)?u=t.mediaDuration:Number.isFinite(d)&&(u=d);let E=r?Pe(0-(u-l)):Pe(l);return o?`${E}${e}${Pe(u)}`:E},Th="video not loaded, unknown time.",kh=t=>{var e;let i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[],r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-valuetext",Th);return}let o=t.hasAttribute(Le.REMAINING),l=t.hasAttribute(Le.SHOW_DURATION),d=o?At(0-(r-i)):At(i);if(!l){t.setAttribute("aria-valuetext",d);return}let u=At(r),E=`${d} of ${u}`;t.setAttribute("aria-valuetext",E)},Zr=class extends _e{constructor(){super(),_h(this,si,void 0),Ah(this,si,this.shadowRoot.querySelector("slot")),rs(this,si).innerHTML=`${ku(this)}`}static get observedAttributes(){return[...super.observedAttributes,...yu,"disabled"]}connectedCallback(){let{style:e}=N(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",h("playback time"));let i=a=>{let{key:r}=a;if(!Tu.includes(r)){this.removeEventListener("keyup",i);return}this.toggleTimeDisplay()};this.addEventListener("keydown",a=>{let{metaKey:r,altKey:o,key:l}=a;if(r||o||!Tu.includes(l)){this.removeEventListener("keyup",i);return}this.addEventListener("keyup",i)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,i,a){yu.includes(e)?this.update():e==="disabled"&&a!==i&&(a==null?this.enable():this.disable()),super.attributeChangedCallback(e,i,a)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return A(this,Le.REMAINING)}set remaining(e){y(this,Le.REMAINING,e)}get showDuration(){return A(this,Le.SHOW_DURATION)}set showDuration(e){y(this,Le.SHOW_DURATION,e)}get noToggle(){return A(this,Le.NO_TOGGLE)}set noToggle(e){y(this,Le.NO_TOGGLE,e)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){x(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){x(this,n.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}update(){let e=ku(this);kh(this),e!==rs(this,si).innerHTML&&(rs(this,si).innerHTML=e)}};si=new WeakMap;s.customElements.get("media-time-display")||s.customElements.define("media-time-display",Zr);var ns=Zr;var Su=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ae=(t,e,i)=>(Su(t,e,"read from private field"),i?i.call(t):e.get(t)),Ke=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},fe=(t,e,i,a)=>(Su(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ih=(t,e,i,a)=>({set _(r){fe(t,e,r,i)},get _(){return ae(t,e,a)}}),li,zr,di,Ji,Qr,Xr,Jr,ui,Pt,jr,en=class{constructor(e,i,a){Ke(this,li,void 0),Ke(this,zr,void 0),Ke(this,di,void 0),Ke(this,Ji,void 0),Ke(this,Qr,void 0),Ke(this,Xr,void 0),Ke(this,Jr,void 0),Ke(this,ui,void 0),Ke(this,Pt,0),Ke(this,jr,(r=performance.now())=>{fe(this,Pt,requestAnimationFrame(ae(this,jr))),fe(this,Ji,performance.now()-ae(this,di));let o=1e3/this.fps;if(ae(this,Ji)>o){fe(this,di,r-ae(this,Ji)%o);let l=1e3/((r-ae(this,zr))/++Ih(this,Qr)._),d=(r-ae(this,Xr))/1e3/this.duration,u=ae(this,Jr)+d*this.playbackRate;u-ae(this,li).valueAsNumber>0?fe(this,ui,this.playbackRate/this.duration/l):(fe(this,ui,.995*ae(this,ui)),u=ae(this,li).valueAsNumber+ae(this,ui)),this.callback(u)}}),fe(this,li,e),this.callback=i,this.fps=a}start(){ae(this,Pt)===0&&(fe(this,di,performance.now()),fe(this,zr,ae(this,di)),fe(this,Qr,0),ae(this,jr).call(this))}stop(){ae(this,Pt)!==0&&(cancelAnimationFrame(ae(this,Pt)),fe(this,Pt,0))}update({start:e,duration:i,playbackRate:a}){let r=e-ae(this,li).valueAsNumber,o=Math.abs(i-this.duration);(r>0||r<-.03||o>=.5)&&this.callback(e),fe(this,Jr,e),fe(this,Xr,performance.now()),this.duration=i,this.playbackRate=a}};li=new WeakMap;zr=new WeakMap;di=new WeakMap;Ji=new WeakMap;Qr=new WeakMap;Xr=new WeakMap;Jr=new WeakMap;ui=new WeakMap;Pt=new WeakMap;jr=new WeakMap;var ds=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},J=(t,e,i)=>(ds(t,e,"read from private field"),i?i.call(t):e.get(t)),re=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},qe=(t,e,i,a)=>(ds(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),oe=(t,e,i)=>(ds(t,e,"access private method"),i),ci,Ut,rn,ea,nn,an,ta,ia,mi,hi,ji,us,Mu,os,on,cs,sn,ms,ln,hs,ss,Cu,aa,dn,ls,wu,Sh="video not loaded, unknown time.",Mh=t=>{let e=t.range,i=At(+xu(t)),a=At(+t.mediaSeekableEnd),r=i&&a?`${i} of ${a}`:Sh;e.setAttribute("aria-valuetext",r)},Lu=c.createElement("template");Lu.innerHTML=`
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

    :host(:is([${n.MEDIA_PREVIEW_IMAGE}], [${n.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
      transition-duration: var(--media-preview-transition-duration-in, .5s);
      transition-delay: var(--media-preview-transition-delay-in, .25s);
      visibility: visible;
      opacity: 1;
    }

    @media (hover: hover) {
      :host(:is([${n.MEDIA_PREVIEW_IMAGE}], [${n.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
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

    :host([${n.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
    :host([${n.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
      transition-delay: var(--media-preview-transition-delay-in, .25s);
      visibility: visible;
    }

    @media (hover: hover) {
      :host([${n.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
      :host([${n.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      :host([${n.MEDIA_PREVIEW_TIME}]:hover) {
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

    :host([${n.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
    :host([${n.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
      transition-delay: var(--media-preview-transition-delay-in, .25s);
      border-radius: var(--media-preview-chapter-border-radius, 0);
      padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
      margin: var(--media-preview-chapter-margin, 0);
      min-width: 100%;
    }

    media-preview-chapter-display[${n.MEDIA_PREVIEW_CHAPTER}],
    ::slotted(media-preview-chapter-display[${n.MEDIA_PREVIEW_CHAPTER}]) {
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

    :host([${n.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
    :host([${n.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
      transition-delay: var(--media-preview-transition-delay-in, .25s);
      border-radius: var(--media-preview-time-border-radius,
        0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
      min-width: 100%;
    }

    :host([${n.MEDIA_PREVIEW_TIME}]:hover) {
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
`;var tn=(t,e=t.mediaCurrentTime)=>{let i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;let r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},xu=(t,e=t.range.valueAsNumber)=>{let i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i},un=class extends ft{constructor(){super(),re(this,hi),re(this,us),re(this,on),re(this,sn),re(this,ln),re(this,ss),re(this,aa),re(this,ls),re(this,ci,void 0),re(this,Ut,void 0),re(this,rn,void 0),re(this,ea,void 0),re(this,nn,void 0),re(this,an,void 0),re(this,ta,void 0),re(this,ia,void 0),re(this,mi,void 0),re(this,os,a=>{this.dragging||(Vt(a)&&(this.range.valueAsNumber=a),this.updateBar())}),this.container.appendChild(Lu.content.cloneNode(!0)),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),qe(this,rn,this.shadowRoot.querySelectorAll('[part~="box"]')),qe(this,nn,this.shadowRoot.querySelector('[part~="preview-box"]')),qe(this,an,this.shadowRoot.querySelector('[part~="current-box"]'));let i=getComputedStyle(this);qe(this,ta,parseInt(i.getPropertyValue("--media-box-padding-left"))),qe(this,ia,parseInt(i.getPropertyValue("--media-box-padding-right"))),qe(this,Ut,new en(this.range,J(this,os),60))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_DURATION,n.MEDIA_SEEKABLE,n.MEDIA_CURRENT_TIME,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_TIME,n.MEDIA_PREVIEW_CHAPTER,n.MEDIA_BUFFERED,n.MEDIA_PLAYBACK_RATE,n.MEDIA_LOADING,n.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",h("seek")),oe(this,hi,ji).call(this),qe(this,ci,this.getRootNode()),(e=J(this,ci))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),oe(this,hi,ji).call(this),(e=J(this,ci))==null||e.removeEventListener("transitionstart",this),qe(this,ci,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===n.MEDIA_CURRENT_TIME||e===n.MEDIA_PAUSED||e===n.MEDIA_ENDED||e===n.MEDIA_LOADING||e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE?(J(this,Ut).update({start:tn(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),oe(this,hi,ji).call(this),Mh(this)):e===n.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=J(this,mi),this.updateBar()))}get mediaChaptersCues(){return J(this,mi)}set mediaChaptersCues(e){var i;qe(this,mi,e),this.updateSegments((i=J(this,mi))==null?void 0:i.map(a=>({start:tn(this,a.startTime),end:tn(this,a.endTime)})))}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return A(this,n.MEDIA_LOADING)}set mediaLoading(e){y(this,n.MEDIA_LOADING,e)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){x(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){x(this,n.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){x(this,n.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(n.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(n.MEDIA_BUFFERED);return}let i=e.map(a=>a.join(":")).join(" ");this.setAttribute(n.MEDIA_BUFFERED,i)}get mediaSeekable(){let e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;let[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;let[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return S(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){M(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return w(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){x(this,n.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return A(this,n.MEDIA_ENDED)}set mediaEnded(e){y(this,n.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;let i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{let o=this.mediaCurrentTime,[,l=this.mediaSeekableStart]=(e=i.find(([d,u])=>d<=o&&o<=u))!=null?e:[];a=tn(this,l)}let{style:r}=N(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;let i=N(this.shadowRoot,"#current-rail"),a=N(this.shadowRoot,'[part~="current-box"]'),r=oe(this,on,cs).call(this,J(this,an)),o=oe(this,sn,ms).call(this,r,this.range.valueAsNumber),l=oe(this,ln,hs).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${o})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${l}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":oe(this,ls,wu).call(this);break;case"pointermove":oe(this,ss,Cu).call(this,e);break;case"pointerup":case"pointerleave":oe(this,aa,dn).call(this,null);break;case"transitionstart":le(e.target,this)&&setTimeout(()=>oe(this,hi,ji).call(this),0);break}}};ci=new WeakMap;Ut=new WeakMap;rn=new WeakMap;ea=new WeakMap;nn=new WeakMap;an=new WeakMap;ta=new WeakMap;ia=new WeakMap;mi=new WeakMap;hi=new WeakSet;ji=function(){oe(this,us,Mu).call(this)?J(this,Ut).start():J(this,Ut).stop()};us=new WeakSet;Mu=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Oa(this)};os=new WeakMap;on=new WeakSet;cs=function(t){var e;let a=((e=this.getAttribute("bounds")?Ue(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),o=t.offsetWidth,l=-(r.left-a.left-o/2),d=a.right-r.left-o/2;return{box:{width:o,min:l,max:d},bounds:a,range:r}};sn=new WeakSet;ms=function(t,e){let i=`${e*100}%`,{width:a,min:r,max:o}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(o)){let d=`calc(1 / var(--_range-width) * 100 * ${o}% - var(--media-box-padding-right))`;i=`min(${i}, ${d})`}return i};ln=new WeakSet;hs=function(t,e){let{width:i,min:a,max:r}=t.box,o=e*t.range.width;if(o<a+J(this,ta)){let l=t.range.left-t.bounds.left-J(this,ta);return`${o-i/2+l}px`}if(o>r-J(this,ia)){let l=t.bounds.right-t.range.right-J(this,ia);return`${o+i/2-l-t.range.width}px`}return 0};ss=new WeakSet;Cu=function(t){let e=[...J(this,rn)].some(b=>t.composedPath().includes(b));if(!this.dragging&&(e||!t.composedPath().includes(this))){oe(this,aa,dn).call(this,null);return}let i=this.mediaSeekableEnd;if(!i)return;let a=N(this.shadowRoot,"#preview-rail"),r=N(this.shadowRoot,'[part~="preview-box"]'),o=oe(this,on,cs).call(this,J(this,nn)),l=(t.clientX-o.range.left)/o.range.width;l=Math.max(0,Math.min(1,l));let d=oe(this,sn,ms).call(this,o,l),u=oe(this,ln,hs).call(this,o,l);a.style.transform=`translateX(${d})`,a.style.setProperty("--_range-width",`${o.range.width}`),r.style.setProperty("--_box-shift",`${u}`),r.style.setProperty("--_box-width",`${o.box.width}px`);let E=Math.round(J(this,ea))-Math.round(l*i);Math.abs(E)<1&&l>.01&&l<.99||(qe(this,ea,l*i),oe(this,aa,dn).call(this,J(this,ea)))};aa=new WeakSet;dn=function(t){this.dispatchEvent(new s.CustomEvent(m.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};ls=new WeakSet;wu=function(){J(this,Ut).stop();let t=xu(this);this.dispatchEvent(new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};s.customElements.get("media-time-range")||s.customElements.define("media-time-range",un);var ps=un;var pi={PLACEMENT:"placement",BOUNDS:"bounds"},Ru=c.createElement("template");Ru.innerHTML=`
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
`;var cn=class extends s.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Oa(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}let a=getComputedStyle(this),r=(e=Ue(this,"#"+this.bounds))!=null?e:Z(this);if(!r)return;let{x:o,width:l}=r.getBoundingClientRect(),{x:d,width:u}=this.getBoundingClientRect(),E=d+u,b=o+l,g=a.getPropertyValue("--media-tooltip-offset-x"),v=g?parseFloat(g.replace("px","")):0,f=a.getPropertyValue("--media-tooltip-container-margin"),D=f?parseFloat(f.replace("px","")):0,T=d-o+v-D,k=E-b+v+D;if(T<0){this.style.setProperty("--media-tooltip-offset-x",`${T}px`);return}if(k>0){this.style.setProperty("--media-tooltip-offset-x",`${k}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ru.content.cloneNode(!0))),this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[pi.PLACEMENT,pi.BOUNDS]}get placement(){return S(this,pi.PLACEMENT)}set placement(e){M(this,pi.PLACEMENT,e)}get bounds(){return S(this,pi.BOUNDS)}set bounds(e){M(this,pi.BOUNDS,e)}};s.customElements.get("media-tooltip")||s.customElements.define("media-tooltip",cn);var vs=cn;var Ch=1,wh=t=>t.mediaMuted?0:t.mediaVolume,Lh=t=>`${Math.round(t*100)}%`,mn=class extends ft{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME,n.MEDIA_MUTED,n.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{let e=this.range.value,i=new s.CustomEvent(m.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",h("volume"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===n.MEDIA_VOLUME||e===n.MEDIA_MUTED)&&(this.range.valueAsNumber=wh(this),this.range.setAttribute("aria-valuetext",Lh(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return w(this,n.MEDIA_VOLUME,Ch)}set mediaVolume(e){x(this,n.MEDIA_VOLUME,e)}get mediaMuted(){return A(this,n.MEDIA_MUTED)}set mediaMuted(e){y(this,n.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return S(this,n.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){M(this,n.MEDIA_VOLUME_UNAVAILABLE,e)}};s.customElements.get("media-volume-range")||s.customElements.define("media-volume-range",mn);var Es=mn;var ub=I({tagName:"media-gesture-receiver",elementClass:zn,react:U}),cb=I({tagName:"media-container",elementClass:to,react:U}),mb=I({tagName:"media-controller",elementClass:mo,react:U}),hb=I({tagName:"media-chrome-button",elementClass:vo,react:U}),pb=I({tagName:"media-airplay-button",elementClass:Eo,react:U}),vb=I({tagName:"media-captions-button",elementClass:fo,react:U}),Eb=I({tagName:"media-cast-button",elementClass:go,react:U}),fb=I({tagName:"media-chrome-dialog",elementClass:Mo,react:U}),gb=I({tagName:"media-chrome-range",elementClass:No,react:U}),bb=I({tagName:"media-control-bar",elementClass:Bo,react:U}),_b=I({tagName:"media-text-display",elementClass:Ho,react:U}),Ab=I({tagName:"media-duration-display",elementClass:$o,react:U}),yb=I({tagName:"media-error-dialog",elementClass:Fo,react:U}),Tb=I({tagName:"media-fullscreen-button",elementClass:Vo,react:U}),kb=I({tagName:"media-live-button",elementClass:Go,react:U}),Ib=I({tagName:"media-loading-indicator",elementClass:Ko,react:U}),Sb=I({tagName:"media-mute-button",elementClass:qo,react:U}),Mb=I({tagName:"media-pip-button",elementClass:Yo,react:U}),Cb=I({tagName:"media-playback-rate-button",elementClass:Qo,react:U}),wb=I({tagName:"media-play-button",elementClass:Xo,react:U}),Lb=I({tagName:"media-poster-image",elementClass:Jo,react:U}),xb=I({tagName:"media-preview-chapter-display",elementClass:jo,react:U}),Rb=I({tagName:"media-preview-thumbnail",elementClass:es,react:U}),Db=I({tagName:"media-preview-time-display",elementClass:ts,react:U}),Pb=I({tagName:"media-seek-backward-button",elementClass:is,react:U}),Ub=I({tagName:"media-seek-forward-button",elementClass:as,react:U}),Ob=I({tagName:"media-time-display",elementClass:ns,react:U}),Nb=I({tagName:"media-time-range",elementClass:ps,react:U}),Bb=I({tagName:"media-tooltip",elementClass:vs,react:U}),Hb=I({tagName:"media-volume-range",elementClass:Es,react:U});import ce from"react";function Du({anchor:t,floating:e,placement:i}){let a=Rh({anchor:t,floating:e}),{x:r,y:o}=Ph(a,i);return{x:r,y:o}}function Rh({anchor:t,floating:e}){return{anchor:Dh(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}function Dh(t,e){var i;let a=t.getBoundingClientRect(),r=(i=e==null?void 0:e.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}function Ph({anchor:t,floating:e},i){let a=Uh(i)==="x"?"y":"x",r=a==="y"?"height":"width",o=Pu(i),l=t.x+t.width/2-e.width/2,d=t.y+t.height/2-e.height/2,u=t[r]/2-e[r]/2,E;switch(o){case"top":E={x:l,y:t.y-e.height};break;case"bottom":E={x:l,y:t.y+t.height};break;case"right":E={x:t.x+t.width,y:d};break;case"left":E={x:t.x-e.width,y:d};break;default:E={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":E[a]-=u;break;case"end":E[a]+=u;break}return E}function Pu(t){return t.split("-")[0]}function Uh(t){return["top","bottom"].includes(Pu(t))?"y":"x"}var gt=class extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}},hn=class extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}};var Cs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},P=(t,e,i)=>(Cs(t,e,"read from private field"),i?i.call(t):e.get(t)),W=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ye=(t,e,i,a)=>(Cs(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),V=(t,e,i)=>(Cs(t,e,"access private method"),i),Ze,Nt,bt,pn,vn,Bt,oa,fs,Uu,gn,En,gs,bs,Ou,_s,Nu,As,Bu,vi,Ei,fi,sa,bn,ws,ys,Hu,Ls,$u,Ts,Wu,xs,Fu,ks,Vu,Is,Gu,ra,_n,Ss,Ku,na,An,fn,Ms;function ze({type:t,text:e,value:i,checked:a}){let r=c.createElement("media-chrome-menu-item");r.type=t!=null?t:"",r.part.add("menu-item"),t&&r.part.add(t),r.value=i,r.checked=a;let o=c.createElement("span");return o.textContent=e,r.append(o),r}function xe(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if((i==null?void 0:i.nodeName)=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;let a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}var qu=c.createElement("template");qu.innerHTML=`
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
`;var Ot={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"},j=class extends s.HTMLElement{constructor(){super(),W(this,fs),W(this,En),W(this,bs),W(this,_s),W(this,As),W(this,fi),W(this,bn),W(this,ys),W(this,Ls),W(this,Ts),W(this,xs),W(this,ks),W(this,Is),W(this,ra),W(this,Ss),W(this,na),W(this,fn),W(this,Ze,null),W(this,Nt,null),W(this,bt,null),W(this,pn,new Set),W(this,vn,void 0),W(this,Bt,!1),W(this,oa,null),W(this,gn,()=>{let e=P(this,pn),i=new Set(this.items);for(let a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(let a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));Ye(this,pn,i)}),W(this,vi,()=>{V(this,fi,sa).call(this),V(this,bn,ws).call(this,!1)}),W(this,Ei,()=>{V(this,fi,sa).call(this)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.nativeEl=this.constructor.template.content.cloneNode(!0),this.shadowRoot.append(this.nativeEl)),this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),this.shadowRoot.addEventListener("slotchange",this),Ye(this,vn,new MutationObserver(P(this,gn))),P(this,vn).observe(this.defaultSlot,{childList:!0})}static get observedAttributes(){return[Ot.DISABLED,Ot.HIDDEN,Ot.STYLE,Ot.ANCHOR,C.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":V(this,fs,Uu).call(this,e);break;case"invoke":V(this,bs,Ou).call(this,e);break;case"click":V(this,ys,Hu).call(this,e);break;case"toggle":V(this,Ts,Wu).call(this,e);break;case"focusout":V(this,ks,Vu).call(this,e);break;case"keydown":V(this,Is,Gu).call(this,e);break}}connectedCallback(){var e,i;Ye(this,oa,Zn(this.shadowRoot,":host")),V(this,En,gs).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),Ye(this,Ze,Da(this)),(i=(e=P(this,Ze))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(et(la(this),P(this,vi)),et(this,P(this,Ei)))}disconnectedCallback(){var e,i;tt(la(this),P(this,vi)),tt(this,P(this,Ei)),this.disable(),(i=(e=P(this,Ze))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ye(this,Ze,null)}attributeChangedCallback(e,i,a){var r,o,l,d;e===Ot.HIDDEN&&a!==i?(P(this,Bt)||Ye(this,Bt,!0),this.hidden?V(this,As,Bu).call(this):V(this,_s,Nu).call(this),this.dispatchEvent(new hn({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===C.MEDIA_CONTROLLER?(i&&((o=(r=P(this,Ze))==null?void 0:r.unassociateElement)==null||o.call(r,this),Ye(this,Ze,null)),a&&this.isConnected&&(Ye(this,Ze,Da(this)),(d=(l=P(this,Ze))==null?void 0:l.associateElement)==null||d.call(l,this))):e===Ot.DISABLED&&a!==i?a==null?this.enable():this.disable():e===Ot.STYLE&&a!==i&&V(this,En,gs).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=yt(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(Oh)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){let i=this.items.find(a=>a.value===e);i&&V(this,fn,Ms).call(this,i)}focus(){if(Ye(this,Nt,Ui()),this.items.length){V(this,na,An).call(this,this.items[0]),this.items[0].focus();return}let e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e==null||e.focus()}handleSelect(e){var i;let a=V(this,ra,_n).call(this,e);a&&(V(this,fn,Ms).call(this,a,a.type==="checkbox"),P(this,bt)&&!this.hidden&&((i=P(this,Nt))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;let{key:r}=e,o=this.items,l=(a=(i=V(this,ra,_n).call(this,e))!=null?i:V(this,Ss,Ku).call(this))!=null?a:o[0],d=o.indexOf(l),u=Math.max(0,d);r==="ArrowDown"?u++:r==="ArrowUp"?u--:e.key==="Home"?u=0:e.key==="End"&&(u=o.length-1),u<0&&(u=o.length-1),u>o.length-1&&(u=0),V(this,na,An).call(this,o[u]),o[u].focus()}};Ze=new WeakMap;Nt=new WeakMap;bt=new WeakMap;pn=new WeakMap;vn=new WeakMap;Bt=new WeakMap;oa=new WeakMap;fs=new WeakSet;Uu=function(t){let e=t.target;for(let i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();if(["header","title"].includes(e.name)){let i=this.shadowRoot.querySelector('slot[name="header"]');i.hidden=e.assignedNodes().length===0}e.name||P(this,gn).call(this)};gn=new WeakMap;En=new WeakSet;gs=function(){var t;let e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")};bs=new WeakSet;Ou=function(t){Ye(this,bt,t.relatedTarget),le(this,t.relatedTarget)||(this.hidden=!this.hidden)};_s=new WeakSet;Nu=function(){var t;(t=P(this,bt))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),et(la(this),P(this,vi)),et(this,P(this,Ei))};As=new WeakSet;Bu=function(){var t;(t=P(this,bt))==null||t.setAttribute("aria-expanded","false"),tt(la(this),P(this,vi)),tt(this,P(this,Ei))};vi=new WeakMap;Ei=new WeakMap;fi=new WeakSet;sa=function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;let{x:e,y:i}=Du({anchor:this.anchorElement,floating:this,placement:"top-start"});t!=null||(t=this.offsetWidth);let r=la(this).getBoundingClientRect(),o=r.width-e-t,l=r.height-i-this.offsetHeight,{style:d}=P(this,oa);d.setProperty("position","absolute"),d.setProperty("right",`${Math.max(0,o)}px`),d.setProperty("--_menu-bottom",`${l}px`);let u=getComputedStyle(this),b=d.getPropertyValue("--_menu-bottom")===u.bottom?l:parseFloat(u.bottom),g=r.height-b-parseFloat(u.marginBottom);this.style.setProperty("--_menu-max-height",`${g}px`)};bn=new WeakSet;ws=function(t){let e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e==null?void 0:e.querySelector('[role="menu"]'),{style:a}=P(this,oa);if(t||a.setProperty("--media-menu-transition-in","none"),i){let r=i.offsetHeight,o=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${o}px`),this.style.setProperty("min-height",`${r}px`),V(this,fi,sa).call(this,o)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),V(this,fi,sa).call(this);a.removeProperty("--media-menu-transition-in")};ys=new WeakSet;Hu=function(t){var e;if(t.stopPropagation(),t.composedPath().includes(P(this,Ls,$u))){(e=P(this,Nt))==null||e.focus(),this.hidden=!0;return}let i=V(this,ra,_n).call(this,t);!i||i.hasAttribute("disabled")||(V(this,na,An).call(this,i),this.handleSelect(t))};Ls=new WeakSet;$u=function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))};Ts=new WeakSet;Wu=function(t){if(t.target===this)return;V(this,xs,Fu).call(this);let e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(let i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new gt({relatedTarget:i}));for(let i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);V(this,bn,ws).call(this,!0)};xs=new WeakSet;Fu=function(){let e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)};ks=new WeakSet;Vu=function(t){var e;le(this,t.relatedTarget)||(P(this,Bt)&&((e=P(this,Nt))==null||e.focus()),P(this,bt)&&P(this,bt)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))};Is=new WeakSet;Gu=function(t){var e,i,a,r,o;let{key:l,ctrlKey:d,altKey:u,metaKey:E}=t;if(!(d||u||E)&&this.keysUsed.includes(l))if(t.preventDefault(),t.stopPropagation(),l==="Tab"){if(P(this,Bt)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else l==="Escape"?((o=P(this,Nt))==null||o.focus(),P(this,Bt)&&(this.hidden=!0)):l==="Enter"||l===" "?this.handleSelect(t):this.handleMove(t)};ra=new WeakSet;_n=function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))};Ss=new WeakSet;Ku=function(){return this.items.find(t=>t.tabIndex===0)};na=new WeakSet;An=function(t){for(let e of this.items)e.tabIndex=e===t?0:-1};fn=new WeakSet;Ms=function(t,e){let i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};j.template=qu;function Oh(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t==null?void 0:t.role)}function la(t){var e;return(e=t.getAttribute("bounds")?Ue(t,`#${t.getAttribute("bounds")}`):Z(t)||t.parentElement)!=null?e:t}s.customElements.get("media-chrome-menu")||s.customElements.define("media-chrome-menu",j);var Ns=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Xe=(t,e,i)=>(Ns(t,e,"read from private field"),i?i.call(t):e.get(t)),ot=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Rs=(t,e,i,a)=>(Ns(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Qe=(t,e,i)=>(Ns(t,e,"access private method"),i),yn,ua,Ds,Yu,Bs,Zu,Hs,zu,Je,gi,ca,Ps,Qu,Tn,Us,Xu=c.createElement("template");Xu.innerHTML=`
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
`;var Ae={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"},je=class extends s.HTMLElement{constructor(){super(),ot(this,Ds),ot(this,Bs),ot(this,Hs),ot(this,gi),ot(this,Ps),ot(this,Tn),ot(this,yn,!1),ot(this,ua,void 0),ot(this,Je,()=>{var e,i;this.setAttribute("submenusize",`${this.submenuElement.items.length}`);let a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],o=(i=r==null?void 0:r.dataset.description)!=null?i:r==null?void 0:r.text,l=c.createElement("span");l.textContent=o!=null?o:"",a.replaceChildren(l)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.append(this.constructor.template.content.cloneNode(!0))),this.shadowRoot.addEventListener("slotchange",this)}static get observedAttributes(){return[Ae.TYPE,Ae.DISABLED,Ae.CHECKED,Ae.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),da(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":Qe(this,Ds,Yu).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":Qe(this,Ps,Qu).call(this,e);break;case"keyup":Qe(this,gi,ca).call(this,e);break}}attributeChangedCallback(e,i,a){e===Ae.CHECKED&&da(this)&&!Xe(this,yn)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===Ae.TYPE&&a!==i?this.role="menuitem"+a:e===Ae.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(Ae.DISABLED)||this.enable(),this.role="menuitem"+this.type,Rs(this,ua,Os(this,this.parentNode)),Qe(this,Tn,Us).call(this)}disconnectedCallback(){this.disable(),Qe(this,Tn,Us).call(this),Rs(this,ua,null)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=yt(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(Ae.TYPE))!=null?e:""}set type(e){this.setAttribute(Ae.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(Ae.VALUE))!=null?e:this.text}set value(e){this.setAttribute(Ae.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(da(this))return this.getAttribute("aria-checked")==="true"}set checked(e){da(this)&&(Rs(this,yn,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){da(this)||this.invokeTargetElement&&le(this,e.target)&&this.invokeTargetElement.dispatchEvent(new gt({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};yn=new WeakMap;ua=new WeakMap;Ds=new WeakSet;Yu=function(t){let e=t.target;if(!(e!=null&&e.name))for(let a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?Qe(this,Bs,Zu).call(this):Qe(this,Hs,zu).call(this))};Bs=new WeakSet;Zu=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",Xe(this,Je)),this.submenuElement.addEventListener("addmenuitem",Xe(this,Je)),this.submenuElement.addEventListener("removemenuitem",Xe(this,Je)),Xe(this,Je).call(this)};Hs=new WeakSet;zu=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",Xe(this,Je)),this.submenuElement.removeEventListener("addmenuitem",Xe(this,Je)),this.submenuElement.removeEventListener("removemenuitem",Xe(this,Je)),Xe(this,Je).call(this)};Je=new WeakMap;gi=new WeakSet;ca=function(t){let{key:e}=t;if(!this.keysUsed.includes(e)){this.removeEventListener("keyup",Qe(this,gi,ca));return}this.handleClick(t)};Ps=new WeakSet;Qu=function(t){let{metaKey:e,altKey:i,key:a}=t;if(e||i||!this.keysUsed.includes(a)){this.removeEventListener("keyup",Qe(this,gi,ca));return}this.addEventListener("keyup",Qe(this,gi,ca),{once:!0})};Tn=new WeakSet;Us=function(){var t;let e=(t=Xe(this,ua))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(let a of e)a.setAttribute("aria-checked","false");i==null||i.setAttribute("aria-checked","true")};je.template=Xu;function da(t){return t.type==="radio"||t.type==="checkbox"}function Os(t,e){if(!t)return null;let{host:i}=t.getRootNode();return!e&&i?Os(t,i):e!=null&&e.items?e:Os(e,e==null?void 0:e.parentNode)}s.customElements.get("media-chrome-menu-item")||s.customElements.define("media-chrome-menu-item",je);var Ju=c.createElement("template");Ju.innerHTML=j.template.innerHTML+`
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
`;var Ht=class extends j{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Z(this).querySelector("media-settings-menu-button")}};Ht.template=Ju;s.customElements.get("media-settings-menu")||s.customElements.define("media-settings-menu",Ht);var ju,kn=c.createElement("template");kn.innerHTML=je.template.innerHTML+`
  <style>
    slot:not([name="submenu"]) {
      opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
    }

    :host([aria-expanded="true"]:hover) {
      background: transparent;
    }
  </style>
`;(ju=kn.content)!=null&&ju.querySelector&&(kn.content.querySelector('slot[name="suffix"]').innerHTML=`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `);var $t=class extends je{};$t.template=kn;s.customElements.get("media-settings-menu-item")||s.customElements.define("media-settings-menu-item",$t);var se=class extends B{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=yt(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new gt({relatedTarget:this}))}};s.customElements.get("media-chrome-menu-button")||s.customElements.define("media-chrome-menu-button",se);var ec=c.createElement("template");ec.innerHTML=`
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
`;var bi=class extends se{static get observedAttributes(){return[...super.observedAttributes,"target"]}constructor(){super({slotTemplate:ec,tooltipContent:h("Settings")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Z(this).querySelector("media-settings-menu")}};s.customElements.get("media-settings-menu-button")||s.customElements.define("media-settings-menu-button",bi);var Vs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},tc=(t,e,i)=>(Vs(t,e,"read from private field"),i?i.call(t):e.get(t)),In=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},$s=(t,e,i,a)=>(Vs(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Sn=(t,e,i)=>(Vs(t,e,"access private method"),i),ma,wn,Mn,Ws,Cn,Fs,_i=class extends j{constructor(){super(...arguments),In(this,Mn),In(this,Cn),In(this,ma,[]),In(this,wn,void 0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_AUDIO_TRACK_LIST,n.MEDIA_AUDIO_TRACK_ENABLED,n.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===n.MEDIA_AUDIO_TRACK_LIST&&i!==a&&($s(this,ma,Rl(a!=null?a:"")),Sn(this,Mn,Ws).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Sn(this,Cn,Fs))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Sn(this,Cn,Fs))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=Z(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return tc(this,ma)}set mediaAudioTrackList(e){$s(this,ma,e),Sn(this,Mn,Ws).call(this)}get mediaAudioTrackEnabled(){var e;return(e=S(this,n.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){M(this,n.MEDIA_AUDIO_TRACK_ENABLED,e)}};ma=new WeakMap;wn=new WeakMap;Mn=new WeakSet;Ws=function(){if(tc(this,wn)===JSON.stringify(this.mediaAudioTrackList))return;$s(this,wn,JSON.stringify(this.mediaAudioTrackList));let t=this.mediaAudioTrackList;this.defaultSlot.textContent="";for(let e of t){let i=this.formatMenuItemText(e.label,e),a=ze({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(xe(this,"checked-indicator")),this.defaultSlot.append(a)}};Cn=new WeakSet;Fs=function(){if(this.value==null)return;let t=new s.CustomEvent(m.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-audio-track-menu")||s.customElements.define("media-audio-track-menu",_i);var Nh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`,ic=c.createElement("template");ic.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">${Nh}</slot>
`;var Ai=class extends se{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_AUDIO_TRACK_ENABLED,n.MEDIA_AUDIO_TRACK_UNAVAILABLE]}constructor(){super({slotTemplate:ic,tooltipContent:h("Audio")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("Audio"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Z(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=S(this,n.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){M(this,n.MEDIA_AUDIO_TRACK_ENABLED,e)}};s.customElements.get("media-audio-track-menu-button")||s.customElements.define("media-audio-track-menu-button",Ai);var Zs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Bh=(t,e,i)=>(Zs(t,e,"read from private field"),i?i.call(t):e.get(t)),Gs=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Hh=(t,e,i,a)=>(Zs(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ks=(t,e,i)=>(Zs(t,e,"access private method"),i),xn,qs,nc,Ln,Ys,$h=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`,oc=c.createElement("template");oc.innerHTML=j.template.innerHTML+`
  <slot name="captions-indicator" hidden>${$h}</slot>`;var Wt=class extends j{constructor(){super(...arguments),Gs(this,qs),Gs(this,Ln),Gs(this,xn,void 0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_LIST&&i!==a?Ks(this,qs,nc).call(this):e===n.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Ks(this,Ln,Ys))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Ks(this,Ln,Ys))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Z(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return ac(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){rc(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return ac(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){rc(this,n.MEDIA_SUBTITLES_SHOWING,e)}};xn=new WeakMap;qs=new WeakSet;nc=function(){var t;if(Bh(this,xn)===JSON.stringify(this.mediaSubtitlesList))return;Hh(this,xn,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";let e=!this.value,i=ze({type:"radio",text:this.formatMenuItemText("Off"),value:"off",checked:e});i.prepend(xe(this,"checked-indicator")),this.defaultSlot.append(i);let a=this.mediaSubtitlesList;for(let r of a){let o=ze({type:"radio",text:this.formatMenuItemText(r.label,r),value:qa(r),checked:this.value==qa(r)});o.prepend(xe(this,"checked-indicator")),((t=r.kind)!=null?t:"subs")==="captions"&&o.append(xe(this,"captions-indicator")),this.defaultSlot.append(o)}};Ln=new WeakSet;Ys=function(){let t=this.mediaSubtitlesShowing,e=this.getAttribute(n.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t!=null&&t.length&&i&&this.dispatchEvent(new s.CustomEvent(m.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;let a=new s.CustomEvent(m.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};Wt.template=oc;var ac=(t,e)=>{let i=t.getAttribute(e);return i?It(i):[]},rc=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=at(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-menu")||s.customElements.define("media-captions-menu",Wt);var Wh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Fh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Vh=(t,e,i,a)=>(Wh(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),zs,Gh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Kh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,uc=c.createElement("template");uc.innerHTML=`
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
    <slot name="on">${Gh}</slot>
    <slot name="off">${Kh}</slot>
  </slot>
`;var sc=t=>{t.setAttribute("aria-checked",Ya(t).toString())},yi=class extends se{constructor(e={}){super({slotTemplate:uc,tooltipContent:h("Captions"),...e}),Fh(this,zs,void 0),Vh(this,zs,!1)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("closed captions")),sc(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_SHOWING&&sc(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Z(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return lc(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){dc(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return lc(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){dc(this,n.MEDIA_SUBTITLES_SHOWING,e)}};zs=new WeakMap;var lc=(t,e)=>{let i=t.getAttribute(e);return i?It(i):[]},dc=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=at(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-menu-button")||s.customElements.define("media-captions-menu-button",yi);var cc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Rn=(t,e,i)=>(cc(t,e,"read from private field"),i?i.call(t):e.get(t)),Qs=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ha=(t,e,i)=>(cc(t,e,"access private method"),i),Ti,pa,Dn,Pn,Js,Xs={RATES:"rates"},ki=class extends j{constructor(){super(),Qs(this,pa),Qs(this,Pn),Qs(this,Ti,new Oe(this,Xs.RATES,{defaultValue:zo})),ha(this,pa,Dn).call(this)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,Xs.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PLAYBACK_RATE&&i!=a?this.value=a:e===Xs.RATES&&i!=a&&(Rn(this,Ti).value=a,ha(this,pa,Dn).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ha(this,Pn,Js))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ha(this,Pn,Js))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Z(this).querySelector("media-playback-rate-menu-button")}get rates(){return Rn(this,Ti)}set rates(e){e?Array.isArray(e)&&(Rn(this,Ti).value=e.join(" ")):Rn(this,Ti).value="",ha(this,pa,Dn).call(this)}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,ri)}set mediaPlaybackRate(e){x(this,n.MEDIA_PLAYBACK_RATE,e)}};Ti=new WeakMap;pa=new WeakSet;Dn=function(){this.defaultSlot.textContent="";for(let t of this.rates){let e=ze({type:"radio",text:this.formatMenuItemText(`${t}x`,t),value:t,checked:this.mediaPlaybackRate==t});e.prepend(xe(this,"checked-indicator")),this.defaultSlot.append(e)}};Pn=new WeakSet;Js=function(){if(!this.value)return;let t=new s.CustomEvent(m.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-playback-rate-menu")||s.customElements.define("media-playback-rate-menu",ki);var qh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Un=(t,e,i)=>(qh(t,e,"read from private field"),i?i.call(t):e.get(t)),Yh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ii,js={RATES:"rates"},Zh=[1,1.2,1.5,1.7,2],el=1,mc=c.createElement("template");mc.innerHTML=`
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
`;var Si=class extends se{constructor(e={}){super({slotTemplate:mc,tooltipContent:h("Playback rate"),...e}),Yh(this,Ii,new Oe(this,js.RATES,{defaultValue:Zh})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${el}x`}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,js.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===js.RATES&&(Un(this,Ii).value=a),e===n.MEDIA_PLAYBACK_RATE){let r=a?+a:Number.NaN,o=Number.isNaN(r)?el:r;this.container.innerHTML=`${o}x`,this.setAttribute("aria-label",h("Playback rate {playbackRate}",{playbackRate:o}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Z(this).querySelector("media-playback-rate-menu")}get rates(){return Un(this,Ii)}set rates(e){e?Array.isArray(e)&&(Un(this,Ii).value=e.join(" ")):Un(this,Ii).value=""}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,el)}set mediaPlaybackRate(e){x(this,n.MEDIA_PLAYBACK_RATE,e)}};Ii=new WeakMap;s.customElements.get("media-playback-rate-menu-button")||s.customElements.define("media-playback-rate-menu-button",Si);var il=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},va=(t,e,i)=>(il(t,e,"read from private field"),i?i.call(t):e.get(t)),On=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},hc=(t,e,i,a)=>(il(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Mi=(t,e,i)=>(il(t,e,"access private method"),i),Ea,wi,Ci,fa,Nn,tl,Li=class extends j{constructor(){super(...arguments),On(this,Ci),On(this,Nn),On(this,Ea,[]),On(this,wi,{})}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_RENDITION_LIST,n.MEDIA_RENDITION_SELECTED,n.MEDIA_RENDITION_UNAVAILABLE,n.MEDIA_HEIGHT]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_RENDITION_SELECTED&&i!==a?(this.value=a!=null?a:"auto",Mi(this,Ci,fa).call(this)):e===n.MEDIA_RENDITION_LIST&&i!==a?(hc(this,Ea,Ll(a)),Mi(this,Ci,fa).call(this)):e===n.MEDIA_HEIGHT&&i!==a&&Mi(this,Ci,fa).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Mi(this,Nn,tl))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Mi(this,Nn,tl))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Z(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return va(this,Ea)}set mediaRenditionList(e){hc(this,Ea,e),Mi(this,Ci,fa).call(this)}get mediaRenditionSelected(){return S(this,n.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){M(this,n.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return w(this,n.MEDIA_HEIGHT)}set mediaHeight(e){x(this,n.MEDIA_HEIGHT,e)}};Ea=new WeakMap;wi=new WeakMap;Ci=new WeakSet;fa=function(){if(va(this,wi).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&va(this,wi).mediaHeight===this.mediaHeight)return;va(this,wi).mediaRenditionList=JSON.stringify(this.mediaRenditionList),va(this,wi).mediaHeight=this.mediaHeight;let t=this.mediaRenditionList.sort((o,l)=>l.height-o.height);for(let o of t)o.selected=o.id===this.mediaRenditionSelected;this.defaultSlot.textContent="";let e=!this.mediaRenditionSelected;for(let o of t){let l=this.formatMenuItemText(`${Math.min(o.width,o.height)}p`,o),d=ze({type:"radio",text:l,value:`${o.id}`,checked:o.selected&&!e});d.prepend(xe(this,"checked-indicator")),this.defaultSlot.append(d)}let i=e?this.formatMenuItemText(`Auto (${this.mediaHeight}p)`):this.formatMenuItemText("Auto"),a=ze({type:"radio",text:i,value:"auto",checked:e}),r=this.mediaHeight>0?`Auto (${this.mediaHeight}p)`:"Auto";a.dataset.description=r,a.prepend(xe(this,"checked-indicator")),this.defaultSlot.append(a)};Nn=new WeakSet;tl=function(){if(this.value==null)return;let t=new s.CustomEvent(m.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-rendition-menu")||s.customElements.define("media-rendition-menu",Li);var zh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`,pc=c.createElement("template");pc.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">${zh}</slot>
`;var xi=class extends se{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_RENDITION_SELECTED,n.MEDIA_RENDITION_UNAVAILABLE,n.MEDIA_HEIGHT]}constructor(){super({slotTemplate:pc,tooltipContent:h("Quality")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Z(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return S(this,n.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){M(this,n.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return w(this,n.MEDIA_HEIGHT)}set mediaHeight(e){x(this,n.MEDIA_HEIGHT,e)}};s.customElements.get("media-rendition-menu-button")||s.customElements.define("media-rendition-menu-button",xi);var L_=I({tagName:"media-chrome-menu",elementClass:j,react:ce}),x_=I({tagName:"media-chrome-menu-item",elementClass:je,react:ce}),R_=I({tagName:"media-settings-menu",elementClass:Ht,react:ce}),D_=I({tagName:"media-settings-menu-item",elementClass:$t,react:ce}),P_=I({tagName:"media-chrome-menu-button",elementClass:se,react:ce}),U_=I({tagName:"media-settings-menu-button",elementClass:bi,react:ce}),O_=I({tagName:"media-audio-track-menu",elementClass:_i,react:ce}),N_=I({tagName:"media-audio-track-menu-button",elementClass:Ai,react:ce}),B_=I({tagName:"media-captions-menu",elementClass:Wt,react:ce}),H_=I({tagName:"media-captions-menu-button",elementClass:yi,react:ce}),$_=I({tagName:"media-playback-rate-menu",elementClass:ki,react:ce}),W_=I({tagName:"media-playback-rate-menu-button",elementClass:Si,react:ce}),F_=I({tagName:"media-rendition-menu",elementClass:Li,react:ce}),V_=I({tagName:"media-rendition-menu-button",elementClass:xi,react:ce});import al from"react";function rl(){return al.createElement(al.Fragment,null,al.createElement("template",{id:"news-theme",dangerouslySetInnerHTML:{__html:`
          <style>
            media-controller {
              font-size: 13px;
              font-family: Roboto, Arial, sans-serif;
              --media-font-family: Roboto, helvetica neue, segoe ui, arial, sans-serif;
              -webkit-font-smoothing: antialiased;
              --media-secondary-color: transparent;
              --media-menu-background: rgba(28, 28, 28, 0.9);
              --media-control-hover-background: var(--media-secondary-color);
              --media-range-track-height: 3px;
              --media-range-thumb-height: 13px;
              --media-range-thumb-width: 13px;
              --media-range-thumb-border-radius: 13px;
              --media-preview-thumbnail-border: 2px solid #fff;
              --media-preview-thumbnail-border-radius: 2px;
              --media-tooltip-display: none;
            }

            /* The biggest size controller is tied to going fullscreen
                instead of a player width */
            media-controller[mediaisfullscreen] {
              font-size: 17px;
              --media-range-thumb-height: 20px;
              --media-range-thumb-width: 20px;
              --media-range-thumb-border-radius: 10px;
              --media-range-track-height: 4px;
            }

            .nw-button {
              position: relative;
              display: inline-block;
              width: 36px;
              padding: 0 2px;
              height: 100%;
              opacity: 0.9;
              transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
            }
            [breakpointmd] .nw-button {
              width: 48px;
            }
            [mediaisfullscreen] .nw-button {
              width: 54px;
            }

            .nw-button svg {
              height: 100%;
              width: 100%;
              fill: var(--media-primary-color, #fff);
              fill-rule: evenodd;
            }

            .svg-shadow {
              stroke: #000;
              stroke-opacity: 0.15;
              stroke-width: 2px;
              fill: none;
            }
          </style>

          
<media-controller
  breakpoints="md:480"
  defaultsubtitles="{{defaultsubtitles}}"
  defaultduration="{{defaultduration}}"
  gesturesdisabled="{{disabled}}"
  hotkeys="{{hotkeys}}"
  nohotkeys="{{nohotkeys}}"
  mediaadbreak="{{mediaadbreak}}"
  part="controller"
>
  <slot name="media" slot="media"></slot>
  <slot name="poster" slot="poster"></slot>
  <media-error-dialog slot="dialog"></media-error-dialog>

  <!-- Gradient -->
  <style>
    .nw-gradient-bottom {
      padding-top: 37px;
      position: absolute;
      width: 100%;
      height: 170px;
      bottom: 0;
      z-index: 2;
      pointer-events: none;
      background-position: bottom;
      background-repeat: repeat-x;
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACqCAYAAABsziWkAAAAAXNSR0IArs4c6QAAAQVJREFUOE9lyNdHBQAAhfHb3nvvuu2997jNe29TJJEkkkgSSSSJJJJEEkkiifRH5jsP56Xz8PM5gcC/xfDEmjhKxEOCSaREEiSbFEqkQppJpzJMJiWyINvkUCIX8kw+JQqg0BRRxaaEEqVQZsopUQGVpooS1VBjglStqaNEPTSYRko0QbNpoUQrtJl2qsN0UqILuk0PJXqhz/RTYgAGzRA1bEYoMQpjZpwSExAyk5SYgmkzQ82aOUqEIWKilJiHBbNIiSVYhhVYhTVYhw3YhC3Yhh3YhT3YhwM4hCM4hhM4hTM4hwu4hCu4hhu4hTu4hwd4hCd4hhd4hTd4hw/4hC/4hh/4/QM2/id28uIEJAAAAABJRU5ErkJggg==');
    }
  </style>
  <div class="nw-gradient-bottom"></div>

  <!-- Rendition Menu -->
  <style>
    media-rendition-menu, media-captions-menu {
      position: absolute;
      border-radius: 0.3rem;
      right: 12px;
      bottom: 61px;
      z-index: 70;
      will-change: width, height;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      transition: opacity 0.1s cubic-bezier(0, 0, 0.2, 1);
      user-select: none;
      --media-settings-menu-min-width: 220px;
      --media-menu-item-checked-background: #f72210;
      --media-menu-item-checked-indicator-display: none;
      font-weight: 500; 
    }

    [mediaisfullscreen] media-rendition-menu {
      --media-settings-menu-min-width: 320px;
      right: 24px;
      bottom: 70px;
    }
    media-chrome-menu-item {
      height: 40px;
      font-size: 13px;
      font-weight: 500;
      padding-top: 0;
      padding-bottom: 0;
    }

    [mediaisfullscreen] media-settings-menu-item {
      font-size: 20px;
      height: 50px;
    }

    media-settings-menu-item[submenusize='0'] {
      display: none;
    }

    /* Also hide if only 'Auto' is added. */
    .quality-settings[submenusize='1'] {
      display: none;
    }

  </style>

  <media-rendition-menu anchor="auto" hidden>
  </media-rendition-menu>
  <media-captions-menu hidden anchor="auto"></media-captions-menu>
  <!-- Time Range / Progress Bar -->

  <style>
    media-play-button[slot="centered-chrome"] {
      display: grid;
      grid-template-columns: 1.5rem auto;
      align-items: center;
      gap: 1.2rem;
      background: #000;
      border-radius: 2rem;
      opacity: 1;
      padding: 1rem;
      font-size: 1.3rem;
      font-weight: 400;
      text-transform: uppercase;
      margin: 0;
    }

    media-play-button[slot="centered-chrome"] {
      display: none;
    }

    media-play-button[slot="centered-chrome"][mediapaused] {
      display: block;
      line-height: 1;
      color: white;
    }

    media-play-button[slot="centered-chrome"][mediapaused]:hover {
      color: #f72210;
    }

    media-play-button[slot="centered-chrome"] p {
      margin: 0;
      align-items: center;
      display: flex;
      gap: .25rem;
    }

    media-play-button[slot="centered-chrome"] svg {
      width: 1.8rem;
      height: auto;
    }

    media-play-button[slot="centered-chrome"] media-duration-display{
      display: none;
      font-size: 1.3rem;  
    }

    media-controller[mediacurrenttime="0"] media-duration-display {
      display: block;
      color: inherit;
      padding: 0 0.3rem;  
    }

    media-controller:not([mediacurrenttime="0"]) media-duration-display {
      display: none;
    }

    media-controller[mediacurrenttime="0"] media-play-button[slot="centered-chrome"] span {
      display: none;
    }

  </style>

  <media-play-button slot="centered-chrome">
    <p slot="play">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM8 14.5L14 10L8 5.5V14.5Z" fill="currentColor"/>
      </svg>
 
      <span>Continue</span>
      <media-duration-display></media-duration-display>
    </p>
  </media-play-button>
  


  <!-- Time Range / Progress Bar -->
  <style>
    media-time-range {
      position: absolute;
      bottom: 36px;
      width: 100%;
      height: 5px;
      z-index: 2;
      --media-range-track-background: rgba(255, 255, 255, 0.2);
      --media-range-track-pointer-background: rgba(255, 255, 255, 0.5);
      --media-time-range-buffered-color: rgba(255, 255, 255, 0.4);
      --media-range-bar-color: var(--media-accent-color, #f72210);
      --media-range-thumb-border-radius: 13px;
      --media-range-thumb-background: var(--media-accent-color, #f72210);
      --media-range-thumb-transition: transform 0.1s linear;
      --media-range-thumb-transform: scale(0) translate(0%, 0%);
    }
    media-time-range:hover {
      --media-range-track-height: 5px;
      --media-range-thumb-transform: scale(1) translate(0%, 0%);
    }
    [breakpointmd] media-time-range {
      bottom: 47px;
    }
    [mediaisfullscreen] media-time-range {
      bottom: 52.5px;
      height: 8px;
    }
    [mediaisfullscreen] media-time-range:hover {
      --media-range-track-height: 8px;
    }

    media-preview-thumbnail {
      margin-bottom: 5px;
    }

    media-preview-chapter-display {
      padding-block: 0;
    }

    media-preview-time-display {
      padding-top: 0;
      background: #d8d8d8;
      color: black;
      padding: 0.25rem 0.5rem;
      text-shadow: none;
      display: block !important;
      opacity: 1;
      margin-bottom: 1rem;
    }
  </style>
  <media-time-range>
    <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
    <media-preview-chapter-display
      slot="preview"
    ></media-preview-chapter-display>
    <media-preview-time-display slot="preview"></media-preview-time-display>
  </media-time-range>

  <!-- Control Bar -->
  <style>
    media-control-bar {
      position: absolute;
      height: 36px;
      line-height: 36px;
      bottom: 0;
      left: 12px;
      right: 12px;
      z-index: 3;
    }
    [breakpointmd] media-control-bar {
      height: 48px;
      line-height: 48px;
    }
    [mediaisfullscreen] media-control-bar {
      height: 54px;
      line-height: 54px;
    }
  </style>
  <media-control-bar>
    <!-- Play/Pause -->
    <style>
      media-play-button {
        --media-button-icon-width: 30px;
        padding: 6px 10px;
      }

      media-play-button :is(#play-p1, #play-p2, #pause-p1, #pause-p2) {
        transition: clip-path 0.25s ease-in;
      }

      /* Slow down the play icon part hiding slightly
                    to achieve the morphing look a little better */
      media-play-button:not([mediapaused]) #play-p2,
      media-play-button:not([mediapaused]) #play-p2 {
        transition: clip-path 0.35s ease-in;
      }

      /* Show icon */
      media-play-button :is(#pause-p1, #pause-p2),
      media-play-button[mediapaused] :is(#play-p1, #play-p2) {
        clip-path: inset(0);
      }

      /* Hide icon wth clip path mask */
      media-play-button #play-p1 {
        clip-path: inset(0 100% 0 0);
      }
      media-play-button #play-p2 {
        clip-path: inset(0 20% 0 100%);
      }
      media-play-button[mediapaused] #pause-p1 {
        clip-path: inset(50% 0 50% 0);
      }
      media-play-button[mediapaused] #pause-p2 {
        clip-path: inset(50% 0 50% 0);
      }
    </style>
    <media-play-button mediapaused class="nw-button">
      <svg slot="icon" viewBox="0 0 36 36">
        <use class="svg-shadow" xlink:href="#icon-play"></use>
        <g id="icon-play">
          <path id="play-p1" d="M18.5 14L12 10V26L18.5 22V14Z" />
          <path id="play-p2" d="M18 13.6953L25 18L18 22.3086V13.6953Z" />
          <path id="pause-p1" d="M16 10H12V26H16V10Z" />
          <path id="pause-p2" d="M21 10H25V26H21V10Z" />
        </g>
      </svg>
    </media-play-button>

    
    <template if="mediaadbreak == null">
      <media-seek-backward-button seekoffset="10">
      <svg slot="icon" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.908 21.7465C16.616 21.2426 16.2047 20.8212 15.7116 20.5206C15.2185 20.22 14.6594 20.0499 14.0851 20.0257C13.5109 20.0499 12.9518 20.22 12.4587 20.5206C11.9656 20.8212 11.5543 21.2426 11.2623 21.7465C10.5893 22.8804 10.2336 24.18 10.2336 25.5047C10.2336 26.8295 10.5893 28.129 11.2623 29.2629C11.5543 29.7668 11.9656 30.1882 12.4587 30.4888C12.9518 30.7894 13.5109 30.9595 14.0851 30.9838C14.6594 30.9595 15.2185 30.7894 15.7116 30.4888C16.2047 30.1882 16.616 29.7668 16.908 29.2629C17.581 28.129 17.9367 26.8295 17.9367 25.5047C17.9367 24.18 17.581 22.8804 16.908 21.7465ZM14.0851 29.409C12.8412 29.409 11.7886 27.6233 11.7886 25.4966C11.7886 23.3699 12.8412 21.5841 14.0851 21.5841C15.3291 21.5841 16.3817 23.3699 16.3817 25.4966C16.3817 27.6233 15.3451 29.409 14.0851 29.409ZM7.16351 30.9838V22.7043L6.39798 23.4836L5.31349 22.3796L7.38679 20.2692C7.49386 20.1598 7.63043 20.0853 7.77917 20.0551C7.92792 20.0248 8.08213 20.0403 8.22225 20.0994C8.36236 20.1585 8.48206 20.2587 8.56615 20.3872C8.65024 20.5157 8.69493 20.6667 8.69456 20.8211V31L7.16351 30.9838ZM33 9.8468V30.1883C32.9972 30.3941 32.9157 30.5907 32.7727 30.7362C32.6298 30.8817 32.4366 30.9647 32.2345 30.9675H22.2348V27.8343H29.9219V12.1845H11.4696V15.3177C11.4696 16.1782 10.8954 16.4866 10.1937 16.0158L3.52726 11.4865C3.30225 11.371 3.13094 11.17 3.05035 10.927C2.96977 10.6839 2.98641 10.4184 3.09666 10.1877C3.18836 9.99697 3.33987 9.84275 3.52726 9.7494L10.1937 5.22005C10.8954 4.74926 11.4696 5.05771 11.4696 5.91812V9.05133H32.2185C32.4248 9.05443 32.6218 9.13923 32.7677 9.28775C32.9136 9.43626 32.997 9.6368 33 9.8468Z" fill="currentColor"/>
      </svg>
      </media-seek-backward-button>
    </template>

    <!-- Time Display -->
    <style>
      media-time-display {
        padding-top: 6px;
        padding-bottom: 6px;
        font-size: 13px;
      }

      [mediaisfullscreen] media-time-display {
        font-size: 20px;
      }
    </style>

    <template if="mediaadbreak == null">
      <media-time-display showduration></media-time-display>
    </template>

    <template if="mediaadbreak != null">
      Advertisement
      <media-time-display remaining></media-time-display>
    </template>

    <!-- Control Spacer -->
    <style>
      .control-spacer {
        flex-grow: 1;
      }
    </style>
    <span class="control-spacer"></span>

    <!-- Volume/Mute -->
    <style>
      media-mute-button :is(#icon-muted, #icon-volume) {
        transition: clip-path 0.3s ease-out;
      }
      media-mute-button #icon-muted {
        clip-path: inset(0 0 100% 0);
      }
      media-mute-button[mediavolumelevel='off'] #icon-muted {
        clip-path: inset(0);
      }
      media-mute-button #icon-volume {
        clip-path: inset(0);
      }
      media-mute-button[mediavolumelevel='off'] #icon-volume {
        clip-path: inset(100% 0 0 0);
      }

      media-mute-button #volume-high,
      media-mute-button[mediavolumelevel='off'] #volume-high {
        opacity: 1;
        transition: opacity 0.3s;
      }
      media-mute-button[mediavolumelevel='low'] #volume-high,
      media-mute-button[mediavolumelevel='medium'] #volume-high {
        opacity: 0.2;
      }

      media-volume-range {
        height: 36px;
        --media-range-track-background: rgba(255, 255, 255, 0.2);
      }

      media-mute-button + media-volume-range {
        width: 0;
        overflow: hidden;
        transition: width 0.2s ease-in;
      }

      /* Expand volume control in all relevant states */
      media-mute-button:hover + media-volume-range,
      media-mute-button:focus + media-volume-range,
      media-mute-button:focus-within + media-volume-range,
      media-volume-range:hover,
      media-volume-range:focus,
      media-volume-range:focus-within {
        width: 70px;
      }
    </style>
    <media-mute-button class="nw-button">
      <svg slot="icon" viewBox="0 0 36 36">
        <g id="icon-volume">
          <path id="speaker" d="M13 15H9V21H13L18 26V10L13 15Z" />
          <path
            id="volume-low"
            d="M20 22.0323C21.4818 21.2959 22.5 19.7669 22.5 18C22.5 16.2332 21.4818 14.7041 20 13.9678V22.0323Z"
          />
          <path
            id="volume-high"
            d="M20 9.22302V11.2899C22.8915 12.1505 25 14.829 25 18C25 21.171 22.8915 23.8495 20 24.7101V26.777C24.008 25.8675 27 22.2832 27 18C27 13.7168 24.008 10.1325 20 9.22302Z"
          />
        </g>
        <g id="icon-muted">
          <path
            d="M10.2207 8.80817L8.80762 10.2213L13.2929 14.7065L13 14.9995H9V20.9995H13L18 25.9995V19.4136L22.1922 23.6058C21.5401 24.0942 20.8 24.4715 20 24.7096V26.7764C21.3453 26.4712 22.5761 25.8646 23.6177 25.0314L25.7782 27.1918L27.1924 25.7776L27.1913 25.7766L27.1902 25.7776L10.2207 8.80817Z"
          />
          <path
            d="M25.8817 22.3478C26.5944 21.0589 27 19.5766 27 17.9995C27 13.7163 24.008 10.132 20 9.22247V11.2894C22.8915 12.1499 25 14.8284 25 17.9995C25 19.0177 24.7826 19.9851 24.3917 20.8578L25.8817 22.3478Z"
          />
          <path
            d="M22.4139 18.88C22.4704 18.5952 22.5 18.3008 22.5 17.9995C22.5 16.2326 21.4818 14.7036 20 13.9672V16.4661L22.4139 18.88Z"
          />
          <path d="M18 14.4661V9.99945L15.7667 12.2328L18 14.4661Z" />
        </g>
      </svg>
    </media-mute-button>
    <media-volume-range></media-volume-range>

    <!-- Settings Menu Button -->
    <template if="mediaadbreak == null">
    <style>
      media-settings-menu-button svg {
        transition: transform 0.1s cubic-bezier(0.4, 0, 1, 1);
        transform: rotateZ(0deg);
      }
      media-settings-menu-button[aria-expanded='true'] svg {
        transform: rotateZ(30deg);
      }
    </style>
    <media-rendition-menu-button class="nw-button">
      <svg slot="icon" viewBox="0 0 36 36">
        <use class="svg-shadow" xlink:href="#settings-icon"></use>
        <path
          id="settings-icon"
          d="M11.8153 12.0477L14.2235 12.9602C14.6231 12.6567 15.0599 12.3996 15.5258 12.1971L15.9379 9.66561C16.5985 9.50273 17.2891 9.41632 18 9.41632C18.7109 9.41632 19.4016 9.50275 20.0622 9.66566L20.4676 12.1555C20.9584 12.3591 21.418 12.6227 21.8372 12.9372L24.1846 12.0477C25.1391 13.0392 25.8574 14.2597 26.249 15.6186L24.3196 17.1948C24.3531 17.4585 24.3704 17.7272 24.3704 18C24.3704 18.2727 24.3531 18.5415 24.3196 18.8051L26.249 20.3814C25.8574 21.7403 25.1391 22.9607 24.1846 23.9522L21.8372 23.0628C21.4179 23.3772 20.9584 23.6408 20.4676 23.8445L20.0622 26.3343C19.4016 26.4972 18.7109 26.5836 18 26.5836C17.2891 26.5836 16.5985 26.4972 15.9379 26.3344L15.5258 23.8029C15.0599 23.6003 14.6231 23.3433 14.2236 23.0398L11.8154 23.9523C10.8609 22.9608 10.1426 21.7404 9.75098 20.3815L11.7633 18.7375C11.7352 18.4955 11.7208 18.2495 11.7208 18C11.7208 17.7505 11.7352 17.5044 11.7633 17.2625L9.75098 15.6185C10.1426 14.2596 10.8609 13.0392 11.8153 12.0477ZM18 20.75C19.5188 20.75 20.75 19.5188 20.75 18C20.75 16.4812 19.5188 15.25 18 15.25C16.4812 15.25 15.25 16.4812 15.25 18C15.25 19.5188 16.4812 20.75 18 20.75Z"
        />
      </svg>

    </media-rendition-menu-button>
    <media-captions-menu-button></media-captions-menu-button>
    </template>

    <!-- Fullscreen Button -->
    <style>
      /* Having trouble getting @property to work in the shadow dom
                   to clean this up. Like https://codepen.io/luwes/pen/oNRyZyx */

      media-fullscreen-button path {
        translate: 0% 0%;
      }
      media-fullscreen-button:hover path {
        animation: 0.35s up-left-bounce cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      media-fullscreen-button:hover .urbounce {
        animation-name: up-right-bounce;
      }
      media-fullscreen-button:hover .dlbounce {
        animation-name: down-left-bounce;
      }
      media-fullscreen-button:hover .drbounce {
        animation-name: down-right-bounce;
      }

      @keyframes up-left-bounce {
        0% {
          translate: 0 0;
        }
        50% {
          translate: -4% -4%;
        }
      }
      @keyframes up-right-bounce {
        0% {
          translate: 0 0;
        }
        50% {
          translate: 4% -4%;
        }
      }
      @keyframes down-left-bounce {
        0% {
          translate: 0 0;
        }
        50% {
          translate: -4% 4%;
        }
      }
      @keyframes down-right-bounce {
        0% {
          translate: 0 0;
        }
        50% {
          translate: 4% 4%;
        }
      }
    </style>
    <media-fullscreen-button class="nw-button">
      <svg slot="enter" viewBox="0 0 36 36">
        <use class="svg-shadow" xlink:href="#fs-enter-paths"></use>
        <g id="fs-enter-paths">
          <path class="ulbounce" d="M11 15H9V9H15V11H11V15Z" />
          <path
            class="urbounce"
            d="M21 11L21 9L27 9L27 15L25 15L25 11L21 11Z"
          />
          <path
            class="dlbounce"
            d="M15 25L15 27L9 27L9 21L11 21L11 25L15 25Z"
          />
          <path
            class="drbounce"
            d="M25 21L27 21L27 27L21 27L21 25L25 25L25 21Z"
          />
        </g>
      </svg>
      <svg slot="exit" viewBox="0 0 36 36">
        <use class="svg-shadow" xlink:href="#fs-exit-paths"></use>
        <g id="fs-exit-paths">
          <path class="drbounce" d="M14 9L16 9L16 16L9 16L9 14L14 14L14 9Z" />
          <path
            class="dlbounce"
            d="M27 14L27 16L20 16L20 9L22 9L22 14L27 14Z"
          />
          <path class="urbounce" d="M9 22L9 20L16 20L16 27L14 27L14 22L9 22Z" />
          <path class="ulbounce" d="M22 27H20V20H27V22H22V27Z" />
        </g>
      </svg>
    </media-fullscreen-button>
  </media-control-bar>`}}))}var jh=!1,ep=!1,tp=({videoList:t,allowAdBlocker:e,...i})=>{let a=Xh(null),[r,o]=Ri(jh),[l,d]=Ri(ep),[u,E]=Ri(!0),[b,g]=Ri(0),[v,f]=Ri(!1),[D,T]=Ri(0);function k(){f(!1),g(b+1),setTimeout(()=>{a.current.play()},200)}function R(F){f(!1),g(F),setTimeout(()=>{a.current.play()},200)}return Bn.createElement("div",null,Bn.createElement(rl,null),Bn.createElement(Jh,{...i,allowAdBlocker:e,ref:a,theme:"news-theme",themeProps:{controlBarVertical:!0,controlBarPlace:"start start"},key:`player-${D}`,playbackId:t[b].playbackId,style:{aspectRatio:"16/9"},muxVideoElement:"mux-video-ads",autoPlay:r,muted:l,maxResolution:"2160p",minResolution:"540p",renditionOrder:"desc",preferPlayback:"mse",adTagUrl:t[b].adTagUrl,onPlay:F=>{var Y;E(!1),(Y=i.onPlay)==null||Y.call(i,F)},onPause:F=>{var Y;E(!0),(Y=i.onPause)==null||Y.call(i,F)},onEnded:F=>{var Y;b<t.length-1?f(!0):(g(0),T(ge=>ge+1)),(Y=i.onEnded)==null||Y.call(i,F)}},Bn.createElement(Fn,{video:b<t.length-1?t[b+1]:t[0],relatedVideos:t,isVisible:v,selectVideoCallback:R,timerCallback:k})))};var op=Hn.forwardRef(({children:t,...e},i)=>Hn.createElement("mux-player",Al({...e,ref:i}),t)),G=(t,e,i)=>ip(()=>{let a=e==null?void 0:e.current;if(!(!a||!i))return a.addEventListener(t,i),()=>{a.removeEventListener(t,i)}},[e==null?void 0:e.current,i]),sp=(t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:o,onLoadStart:l,onLoadedData:d,onLoadedMetadata:u,onProgress:E,onDurationChange:b,onVolumeChange:g,onRateChange:v,onResize:f,onWaiting:D,onPlay:T,onPlaying:k,onTimeUpdate:R,onPause:F,onSeeking:Y,onSeeked:ge,onStalled:ye,onSuspend:O,onEnded:K,onError:ee,onCuePointChange:Te,onCuePointsChange:Re,onChapterChange:ga,metadata:ba,tokens:_a,paused:Aa,playbackId:ya,playbackRates:Ta,currentTime:$n,themeProps:st,extraSourceParams:ka,castCustomData:Ia,_hlsConfig:Sa,...Ma}=e;return Se("playbackRates",Ta,t),Se("metadata",ba,t),Se("extraSourceParams",ka,t),Se("_hlsConfig",Sa,t),Se("themeProps",st,t),Se("tokens",_a,t),Se("playbackId",ya,t),Se("castCustomData",Ia,t),Se("paused",Aa,t,(ke,De)=>{De!=null&&(De?ke.pause():ke.play())},(ke,De,Ca)=>ke.hasAttribute("autoplay")&&!ke.hasPlayed?!1:Wn(ke,De,Ca)),Se("currentTime",$n,t,(ke,De)=>{De!=null&&(ke.currentTime=De)}),G("abort",t,i),G("canplay",t,a),G("canplaythrough",t,r),G("emptied",t,o),G("loadstart",t,l),G("loadeddata",t,d),G("loadedmetadata",t,u),G("progress",t,E),G("durationchange",t,b),G("volumechange",t,g),G("ratechange",t,v),G("resize",t,f),G("waiting",t,D),G("play",t,T),G("playing",t,k),G("timeupdate",t,R),G("pause",t,F),G("seeking",t,Y),G("seeked",t,ge),G("stalled",t,ye),G("suspend",t,O),G("ended",t,K),G("error",t,ee),G("cuepointchange",t,Te),G("cuepointschange",t,Re),G("chapterchange",t,ga),[Ma]},lp=Tl(),dp="mux-player-react",up=Hn.forwardRef((t,e)=>{var l;let i=np(null),a=yl(i,e),[r]=sp(i,t),[o]=ap((l=t.playerInitTime)!=null?l:rp());return Hn.createElement(op,{ref:a,muxVideoElement:t.muxVideoElement,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:dp,playerSoftwareVersion:lp,playerInitTime:o,...r})}),p1=up;export{a1 as MaxResolution,s1 as MediaError,r1 as MinResolution,tp as MuxNewsPlayer,Fn as PlaylistEndScreen,n1 as RenditionOrder,p1 as default,rp as generatePlayerInitTime,dp as playerSoftwareName,lp as playerSoftwareVersion};
/*! Bundled license information:

ce-la-react/dist/ce-la-react.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *
   * Modified version of `@lit/react` for vanilla custom elements with support for SSR.
   *)
*/
//# sourceMappingURL=-4XCR56OH.mjs.map
