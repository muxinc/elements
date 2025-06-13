"use strict";"use client";var Pc=Object.create;var Ra=Object.defineProperty;var Uc=Object.getOwnPropertyDescriptor;var Oc=Object.getOwnPropertyNames;var Nc=Object.getPrototypeOf,Bc=Object.prototype.hasOwnProperty;var Hc=(t,e)=>{for(var i in e)Ra(t,i,{get:e[i],enumerable:!0})},yl=(t,e,i,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Oc(e))!Bc.call(t,r)&&r!==i&&Ra(t,r,{get:()=>e[r],enumerable:!(a=Uc(e,r))||a.enumerable});return t};var ct=(t,e,i)=>(i=t!=null?Pc(Nc(t)):{},yl(e||!t||!t.__esModule?Ra(i,"default",{value:t,enumerable:!0}):i,t)),$c=t=>yl(Ra({},"__esModule",{value:!0}),t);var Ep={};Hc(Ep,{MaxResolution:()=>dt.MaxResolution,MediaError:()=>Tc.MediaError,MinResolution:()=>dt.MinResolution,MuxNewsPlayer:()=>yc,PlaylistEndScreen:()=>Pa,RenditionOrder:()=>dt.RenditionOrder,default:()=>vp,generatePlayerInitTime:()=>dt.generatePlayerInitTime,playerSoftwareName:()=>Sc,playerSoftwareVersion:()=>Ic});module.exports=$c(Ep);var lt=ct(require("react")),dt=require("@mux/playback-core"),Tc=require("@mux/mux-player");var kl=ct(require("react")),Il=parseInt(kl.default.version)>=19,Tl={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate",adTagUrl:"adtagurl"},Wc=t=>t==null,Fc=(t,e)=>Wc(e)?!1:t in e,Vc=t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),Gc=(t,e)=>{if(!(!Il&&typeof e=="boolean"&&!e)){if(Fc(t,Tl))return Tl[t];if(typeof e!="undefined")return/[A-Z]/.test(t)?Vc(t):t}};var Kc=(t,e)=>!Il&&typeof t=="boolean"?"":t,Sl=(t={})=>Object.entries(t).reduce((e,[i,a])=>{let r=Gc(i,a);if(!r)return e;let o=Kc(a,i);return e[r]=o,e},{});var kc=require("react");var Da=require("react"),Ml=(...t)=>{let e=(0,Da.useRef)(null);return(0,Da.useEffect)(()=>{t.forEach(i=>{i&&(typeof i=="function"?i(e.current):i.current=e.current)})},[t]),e};var Cl=require("react"),qc=Object.prototype.hasOwnProperty,Yc=(t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((r,o)=>e[o]===r);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let r=0;r<i.length;r++)if(!qc.call(e,i[r])||!Object.is(t[i[r]],e[i[r]]))return!1;return!0},qn=(t,e,i)=>!Yc(e,t[i]),Zc=(t,e,i)=>{t[i]=e},zc=(t,e,i,a=Zc,r=qn)=>(0,Cl.useEffect)(()=>{let o=i==null?void 0:i.current;o&&r(o,e,t)&&a(o,e,t)},[i==null?void 0:i.current,e]),Me=zc;var Qc=()=>{try{return"3.4.0"}catch{}return"UNKNOWN"},Xc=Qc(),wl=()=>Xc;var me=ct(require("react"));var O=ct(require("react"));var Ll=`/* Main Playlist Container */
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
`;var jc=({video:t,relatedVideos:e,isVisible:i,selectVideoCallback:a,timerCallback:r})=>{let[o,l]=(0,O.useState)(3);return(0,O.useEffect)(()=>{if(!i){l(3);return}if(o<0){r();return}let d=setInterval(()=>{l(u=>Math.max(u-1,-1))},1e3);return()=>clearInterval(d)},[o,i]),O.default.createElement(O.default.Fragment,null,O.default.createElement("style",null,Ll),O.default.createElement("div",{className:"playlist",style:{display:i?"grid":"none"}},O.default.createElement("div",{className:"overlay",style:{display:i?"grid":"none"}}),O.default.createElement("div",{className:"post-video-section",style:{display:i?"grid":"none",zIndex:99}},O.default.createElement("div",{className:"video-section"},O.default.createElement("div",{className:"video-container"},O.default.createElement("h2",{className:"title"},"Video"),O.default.createElement("div",{className:"video-wrapper"},O.default.createElement("img",{className:"video-thumbnail",src:t.imageUrl,alt:t.title}),O.default.createElement("div",{className:"countdown-overlay"},O.default.createElement("svg",{className:"countdown-ring",width:"50",height:"50"},O.default.createElement("circle",{cx:"25",cy:"25",r:"22",className:"circle-background"}),O.default.createElement("circle",{cx:"25",cy:"25",r:"22",className:"circle-progress",style:{strokeDasharray:"138",strokeDashoffset:`${o/3*138}`}})),O.default.createElement("span",{className:"count-text"},o))),O.default.createElement("p",{className:"video-title"},t.title))),O.default.createElement("hr",null),O.default.createElement("div",{className:"related-videos-section"},O.default.createElement("h3",{className:"related-title"},"Related Videos"),O.default.createElement("ul",{className:"related-list"},e.map((d,u)=>O.default.createElement("li",{key:u},O.default.createElement("button",{className:"related-item",onClick:()=>a(u)},O.default.createElement("img",{className:"related-thumbnail",src:d.imageUrl,alt:d.title}),O.default.createElement("p",{className:"related-text"},d.title)))))))))},Pa=jc;var Q_=require("@mux/mux-video-ads"),Ac=ct(require("@mux/mux-player-react"));var U=ct(require("react"),1);var em=new Set(["style","children","ref","key","suppressContentEditableWarning","suppressHydrationWarning","dangerouslySetInnerHTML"]),tm={className:"class",htmlFor:"for"};function im(t){return t.toLowerCase()}function am(t){if(typeof t=="boolean")return t?"":void 0;if(typeof t!="function"&&!(typeof t=="object"&&t!==null))return t}function I({react:t,tagName:e,elementClass:i,events:a,displayName:r,toAttributeName:o=im,toAttributeValue:l=am}){let d=Number.parseInt(t.version)>=19,u=t.forwardRef((E,b)=>{var R,V,Y,be,Te;let g=t.useRef(null),v=t.useRef(new Map),f={},D={},T={},k={};for(let[N,q]of Object.entries(E)){if(em.has(N)){T[N]=q;continue}let ee=o((R=tm[N])!=null?R:N);if(N in i.prototype&&!(N in((Y=(V=globalThis.HTMLElement)==null?void 0:V.prototype)!=null?Y:{}))&&!((be=i.observedAttributes)!=null&&be.some(De=>De===ee))){k[N]=q;continue}if(N.startsWith("on")){f[N]=q;continue}let ke=l(q);ee&&ke!=null&&(D[ee]=String(ke),d||(T[ee]=ke)),ee&&d&&(T[ee]=q)}if(typeof window!="undefined"){for(let N in f){let q=f[N],ee=N.endsWith("Capture"),ke=((Te=a==null?void 0:a[N])!=null?Te:N.slice(2).toLowerCase()).slice(0,ee?-7:void 0);t.useLayoutEffect(()=>{let De=g==null?void 0:g.current;if(!(!De||typeof q!="function"))return De.addEventListener(ke,q,ee),()=>{De.removeEventListener(ke,q,ee)}},[g==null?void 0:g.current,q])}t.useLayoutEffect(()=>{if(g.current===null)return;let N=new Map;for(let q in k)xl(g.current,q,k[q]),v.current.delete(q),N.set(q,k[q]);for(let[q,ee]of v.current)xl(g.current,q,void 0);v.current=N})}if(typeof window=="undefined"&&(i!=null&&i.getTemplateHTML)&&(i!=null&&i.shadowRootOptions)){let{mode:N,delegatesFocus:q}=i.shadowRootOptions,ee=t.createElement("template",{shadowrootmode:N,shadowrootdelegatesfocus:q,dangerouslySetInnerHTML:{__html:i.getTemplateHTML(D)}});T.children=[ee,T.children]}return t.createElement(e,{...T,ref:t.useCallback(N=>{g.current=N,typeof b=="function"?b(N):b!==null&&(b.current=N)},[b])})});return u.displayName=r!=null?r:i.name,u}function xl(t,e,i){var a,r;t[e]=i,i==null&&e in((r=(a=globalThis.HTMLElement)==null?void 0:a.prototype)!=null?r:{})&&t.removeAttribute(e)}var m={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},C={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},Yn={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_WIDTH:"mediaWidth"},Rl=Object.entries(Yn),n=Rl.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),rm={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},kt=Rl.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...rm}),Mp=Object.entries(kt).reduce((t,[e,i])=>{let a=n[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"}),Dl=Object.entries(n).reduce((t,[e,i])=>{let a=kt[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),ue={SUBTITLES:"subtitles",CAPTIONS:"captions",DESCRIPTIONS:"descriptions",CHAPTERS:"chapters",METADATA:"metadata"},mt={DISABLED:"disabled",HIDDEN:"hidden",SHOWING:"showing"};var Zn={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},ve={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},Ce={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"};var Pl={INLINE:"inline",FULLSCREEN:"fullscreen",PICTURE_IN_PICTURE:"picture-in-picture"};function Ul(t){return t==null?void 0:t.map(om).join(" ")}function Ol(t){return t==null?void 0:t.split(/\s+/).map(sm)}function om(t){if(t){let{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}function sm(t){if(t){let[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}function Nl(t){return t==null?void 0:t.map(lm).join(" ")}function Bl(t){return t==null?void 0:t.split(/\s+/).map(dm)}function lm(t){if(t){let{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(o=>o!=null).join(":")}}function dm(t){if(t){let[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}function Yt(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}var Ua=t=>new Promise(e=>setTimeout(e,t));var Hl=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],um=(t,e)=>{let i=t===1?Hl[e].singular:Hl[e].plural;return`${t} ${i}`},It=t=>{if(!Yt(t))return"";let e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0);return`${[a.getHours(),a.getMinutes(),a.getSeconds()].map((d,u)=>d&&um(d,u)).filter(d=>d).join(", ")}${i?" remaining":""}`};function Ue(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),o=Math.floor(t/3600),l=Math.floor(e/60%60),d=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(o=r=a="0"),o=o>0||d>0?o+":":"",r=((o||l>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+o+r+a}var Lp=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var zn={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute",live:"live","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."};var $l,Wl,mm={en:zn},Fl=((Wl=($l=globalThis.navigator)==null?void 0:$l.language)==null?void 0:Wl.split("-")[0])||"en",Vl=t=>{Fl=t};var h=(t,e={})=>{var i;return(((i=mm[Fl])==null?void 0:i[t])||zn[t]).replace(/\{(\w+)\}/g,(r,o)=>e[o]!==void 0?String(e[o]):`{${o}}`)};var Oa=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},Na=class extends Oa{},Ba=class extends Na{constructor(){super(...arguments),this.role=null}},Qn=class{observe(){}unobserve(){}disconnect(){}},Gl={createElement:function(){return new Ni.HTMLElement},createElementNS:function(){return new Ni.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},Ni={ResizeObserver:Qn,document:Gl,Node:Na,Element:Ba,HTMLElement:class extends Ba{constructor(){super(...arguments),this.innerHTML=""}get content(){return new Ni.DocumentFragment}},DocumentFragment:class extends Oa{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}}},Kl=typeof window=="undefined"||typeof window.customElements=="undefined",ql=Object.keys(Ni).every(t=>t in globalThis),s=Kl&&!ql?Ni:globalThis,c=Kl&&!ql?Gl:globalThis.document;var Yl=new WeakMap,Xn=t=>{let e=Yl.get(t);return e||Yl.set(t,e=new Set),e},Zl=new s.ResizeObserver(t=>{for(let e of t)for(let i of Xn(e.target))i(e)});function tt(t,e){Xn(t).add(e),Zl.observe(t)}function it(t,e){let i=Xn(t);i.delete(e),i.size||Zl.unobserve(t)}function zl(t){let e={};for(let i of t)e[i.name]=i.value;return e}function Z(t){var e;return(e=Ha(t))!=null?e:Oe(t,"media-controller")}function Ha(t){var e;let{MEDIA_CONTROLLER:i}=C,a=t.getAttribute(i);if(a)return(e=St(t))==null?void 0:e.getElementById(a)}var $a=(t,e,i=".value")=>{let a=t.querySelector(i);a&&(a.textContent=e)},hm=(t,e)=>{let i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},Wa=(t,e)=>hm(t,e)[0],le=(t,e)=>!t||!e?!1:t!=null&&t.contains(e)?!0:le(t,e.getRootNode().host),Oe=(t,e)=>{if(!t)return null;let i=t.closest(e);return i||Oe(t.getRootNode().host,e)};function Bi(t=document){var e;let i=t==null?void 0:t.activeElement;return i?(e=Bi(i.shadowRoot))!=null?e:i:null}function St(t){var e;let i=(e=t==null?void 0:t.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function Fa(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){let o=getComputedStyle(r);if(i&&o.opacity==="0"||a&&o.visibility==="hidden"||o.display==="none")return!1;r=r.parentElement,e--}return!0}function Ql(t,e,i,a){let r=a.x-i.x,o=a.y-i.y,l=r*r+o*o;if(l===0)return 0;let d=((t-i.x)*r+(e-i.y)*o)/l;return Math.max(0,Math.min(1,d))}function B(t,e){let i=pm(t,a=>a===e);return i||Jn(t,e)}function pm(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let o;try{o=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(let l of o!=null?o:[])if(e(l.selectorText))return l}}function Jn(t,e){var i,a;let r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],o=r==null?void 0:r[r.length-1];return o!=null&&o.sheet?(o==null||o.sheet.insertRule(`${e}{}`,o.sheet.cssRules.length),(a=o.sheet.cssRules)==null?void 0:a[o.sheet.cssRules.length-1]):(console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}})}function w(t,e,i=Number.NaN){let a=t.getAttribute(e);return a!=null?+a:i}function x(t,e,i){let a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}w(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function A(t,e){return t.hasAttribute(e)}function y(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}A(t,e)!=i&&t.toggleAttribute(e,i)}function S(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function M(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}let a=`${i}`;S(t,e,void 0)!==a&&t.setAttribute(e,a)}var Xl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ht=(t,e,i)=>(Xl(t,e,"read from private field"),i?i.call(t):e.get(t)),vm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Va=(t,e,i,a)=>(Xl(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ce,Jl=c.createElement("template");Jl.innerHTML=`
<style>
  :host {
    display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
    box-sizing: border-box;
  }
</style>
`;var Ga=class extends s.HTMLElement{constructor(e={}){if(super(),vm(this,ce,void 0),!this.shadowRoot){let i=this.attachShadow({mode:"open"}),a=Jl.content.cloneNode(!0);this.nativeEl=a;let r=e.slotTemplate;r||(r=c.createElement("template"),r.innerHTML=`<slot>${e.defaultContent||""}</slot>`),this.nativeEl.appendChild(r.content.cloneNode(!0)),i.appendChild(a)}}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=ht(this,ce))==null?void 0:r.unassociateElement)==null||o.call(r,this),Va(this,ce,null)),a&&this.isConnected&&(Va(this,ce,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=ht(this,ce))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a,r;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Va(this,ce,Em(this)),this.getAttribute(C.MEDIA_CONTROLLER)&&((i=(e=ht(this,ce))==null?void 0:e.associateElement)==null||i.call(e,this)),(a=ht(this,ce))==null||a.addEventListener("pointerdown",this),(r=ht(this,ce))==null||r.addEventListener("click",this)}disconnectedCallback(){var e,i,a,r;this.getAttribute(C.MEDIA_CONTROLLER)&&((i=(e=ht(this,ce))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=ht(this,ce))==null||a.removeEventListener("pointerdown",this),(r=ht(this,ce))==null||r.removeEventListener("click",this),Va(this,ce,null)}handleEvent(e){var i;let a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a==null?void 0:a.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){let{clientX:o,clientY:l}=e,{left:d,top:u,width:E,height:b}=this.getBoundingClientRect(),g=o-d,v=l-u;if(g<0||v<0||g>E||v>b||E===0&&b===0)return;let{pointerType:f=this._pointerType}=e;if(this._pointerType=void 0,f===Zn.TOUCH){this.handleTap(e);return}else if(f===Zn.MOUSE){this.handleMouseClick(e);return}}}}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let i=this.mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new s.CustomEvent(i,{composed:!0,bubbles:!0}))}};ce=new WeakMap;function Em(t){var e;let i=t.getAttribute(C.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):Oe(t,"media-controller")}s.customElements.get("media-gesture-receiver")||s.customElements.define("media-gesture-receiver",Ga);var jn=Ga;var ao=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},fe=(t,e,i)=>(ao(t,e,"read from private field"),i?i.call(t):e.get(t)),Ee=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Mt=(t,e,i,a)=>(ao(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),_e=(t,e,i)=>(ao(t,e,"access private method"),i),Ya,Zt,$i,zt,Ka,eo,jl,Hi,qa,to,ed,io,td,Wi,Za,za,ro,Qt,Fi,_={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"},id=c.createElement("template");id.innerHTML=`
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
`;var fm=Object.values(n),gm="sm:384 md:576 lg:768 xl:960";function bm(t){ad(t.target,t.contentRect.width)}function ad(t,e){var i;if(!t.isConnected)return;let a=(i=t.getAttribute(_.BREAKPOINTS))!=null?i:gm,r=_m(a),o=Am(r,e),l=!1;if(Object.keys(r).forEach(d=>{if(o.includes(d)){t.hasAttribute(`breakpoint${d}`)||(t.setAttribute(`breakpoint${d}`,""),l=!0);return}t.hasAttribute(`breakpoint${d}`)&&(t.removeAttribute(`breakpoint${d}`),l=!0)}),l){let d=new CustomEvent(kt.BREAKPOINTS_CHANGE,{detail:o});t.dispatchEvent(d)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(kt.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function _m(t){let e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function Am(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}var Xt=class extends s.HTMLElement{constructor(){super(),Ee(this,eo),Ee(this,to),Ee(this,io),Ee(this,Wi),Ee(this,za),Ee(this,Qt),Ee(this,Ya,0),Ee(this,Zt,null),Ee(this,$i,null),Ee(this,zt,void 0),this.breakpointsComputed=!1,Ee(this,Ka,new MutationObserver(_e(this,eo,jl).bind(this))),Ee(this,Hi,!1),Ee(this,qa,i=>{fe(this,Hi)||(setTimeout(()=>{bm(i),Mt(this,Hi,!1)},0),Mt(this,Hi,!0))}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(id.content.cloneNode(!0)));let e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){fe(this,Zt)&&this.mediaUnsetCallback(fe(this,Zt));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[_.AUTOHIDE,_.GESTURES_DISABLED].concat(fm).filter(e=>![n.MEDIA_RENDITION_LIST,n.MEDIA_AUDIO_TRACK_LIST,n.MEDIA_CHAPTERS_CUES,n.MEDIA_WIDTH,n.MEDIA_HEIGHT,n.MEDIA_ERROR,n.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==_.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return(e==null?void 0:e.nodeName)=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Mt(this,Zt,e),e.localName.includes("-")&&await s.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;fe(this,Ka).observe(this,{childList:!0,subtree:!0}),tt(this,fe(this,qa));let a=this.getAttribute(_.AUDIO)!=null?h("audio player"):h("video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(_.USER_INACTIVE,""),ad(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=s.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;fe(this,Ka).disconnect(),it(this,fe(this,qa)),this.media&&this.mediaUnsetCallback(this.media),(e=s.window)==null||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){Mt(this,Zt,null)}handleEvent(e){switch(e.type){case"pointerdown":Mt(this,Ya,e.timeStamp);break;case"pointermove":_e(this,to,ed).call(this,e);break;case"pointerup":_e(this,io,td).call(this,e);break;case"mouseleave":_e(this,Wi,Za).call(this);break;case"mouseup":this.removeAttribute(_.KEYBOARD_CONTROL);break;case"keyup":_e(this,Qt,Fi).call(this),this.setAttribute(_.KEYBOARD_CONTROL,"");break}}set autohide(e){let i=Number(e);Mt(this,zt,isNaN(i)?0:i)}get autohide(){return(fe(this,zt)===void 0?2:fe(this,zt)).toString()}get breakpoints(){return S(this,_.BREAKPOINTS)}set breakpoints(e){M(this,_.BREAKPOINTS,e)}get audio(){return A(this,_.AUDIO)}set audio(e){y(this,_.AUDIO,e)}get gesturesDisabled(){return A(this,_.GESTURES_DISABLED)}set gesturesDisabled(e){y(this,_.GESTURES_DISABLED,e)}get keyboardControl(){return A(this,_.KEYBOARD_CONTROL)}set keyboardControl(e){y(this,_.KEYBOARD_CONTROL,e)}get noAutohide(){return A(this,_.NO_AUTOHIDE)}set noAutohide(e){y(this,_.NO_AUTOHIDE,e)}get autohideOverControls(){return A(this,_.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){y(this,_.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return A(this,_.USER_INACTIVE)}set userInteractive(e){y(this,_.USER_INACTIVE,e)}};Ya=new WeakMap;Zt=new WeakMap;$i=new WeakMap;zt=new WeakMap;Ka=new WeakMap;eo=new WeakSet;jl=function(t){let e=this.media;for(let i of t){if(i.type!=="childList")continue;let a=i.removedNodes;for(let r of a){if(r.slot!="media"||i.target!=this)continue;let o=i.previousSibling&&i.previousSibling.previousElementSibling;if(!o||!e)this.mediaUnsetCallback(r);else{let l=o.slot!=="media";for(;(o=o.previousSibling)!==null;)o.slot=="media"&&(l=!1);l&&this.mediaUnsetCallback(r)}}if(e)for(let r of i.addedNodes)r===e&&this.handleMediaUpdated(e)}};Hi=new WeakMap;qa=new WeakMap;to=new WeakSet;ed=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-fe(this,Ya)<250)return;_e(this,za,ro).call(this),clearTimeout(fe(this,$i));let e=this.hasAttribute(_.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&_e(this,Qt,Fi).call(this)};io=new WeakSet;td=function(t){if(t.pointerType==="touch"){let e=!this.hasAttribute(_.USER_INACTIVE);[this,this.media].includes(t.target)&&e?_e(this,Wi,Za).call(this):_e(this,Qt,Fi).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e==null?void 0:e.localName))&&_e(this,Qt,Fi).call(this)};Wi=new WeakSet;Za=function(){if(fe(this,zt)<0||this.hasAttribute(_.USER_INACTIVE))return;this.setAttribute(_.USER_INACTIVE,"");let t=new s.CustomEvent(kt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};za=new WeakSet;ro=function(){if(!this.hasAttribute(_.USER_INACTIVE))return;this.removeAttribute(_.USER_INACTIVE);let t=new s.CustomEvent(kt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};Qt=new WeakSet;Fi=function(){_e(this,za,ro).call(this),clearTimeout(fe(this,$i));let t=parseInt(this.autohide);t<0||Mt(this,$i,setTimeout(()=>{_e(this,Wi,Za).call(this)},t*1e3))};s.customElements.get("media-container")||s.customElements.define("media-container",Xt);var no=Xt;var rd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ie=(t,e,i)=>(rd(t,e,"read from private field"),i?i.call(t):e.get(t)),Vi=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Qa=(t,e,i,a)=>(rd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Jt,jt,Xa,Ct,at,pt,Ne=class{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){Vi(this,at),Vi(this,Jt,void 0),Vi(this,jt,void 0),Vi(this,Xa,void 0),Vi(this,Ct,new Set),Qa(this,Jt,e),Qa(this,jt,i),Qa(this,Xa,new Set(a))}[Symbol.iterator](){return ie(this,at,pt).values()}get length(){return ie(this,at,pt).size}get value(){var e;return(e=[...ie(this,at,pt)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Qa(this,Ct,new Set),this.add(...(i=e==null?void 0:e.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...ie(this,at,pt)][e]}values(){return ie(this,at,pt).values()}forEach(e,i){ie(this,at,pt).forEach(e,i)}add(...e){var i,a;e.forEach(r=>ie(this,Ct).add(r)),!(this.value===""&&!((i=ie(this,Jt))!=null&&i.hasAttribute(`${ie(this,jt)}`)))&&((a=ie(this,Jt))==null||a.setAttribute(`${ie(this,jt)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>ie(this,Ct).delete(a)),(i=ie(this,Jt))==null||i.setAttribute(`${ie(this,jt)}`,`${this.value}`)}contains(e){return ie(this,at,pt).has(e)}toggle(e,i){return typeof i!="undefined"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}};Jt=new WeakMap;jt=new WeakMap;Xa=new WeakMap;Ct=new WeakMap;at=new WeakSet;pt=function(){return ie(this,Ct).size?ie(this,Ct):ie(this,Xa)};var ym=(t="")=>t.split(/\s+/),nd=(t="")=>{let[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?ue.CAPTIONS:ue.SUBTITLES,language:i,label:r}},wt=(t="",e={})=>ym(t).map(i=>{let a=nd(i);return{...e,...a}}),oo=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?nd(e):e):typeof t=="string"?wt(t):[t]:[],Ja=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,rt=(t=[])=>Array.prototype.map.call(t,Ja).join(" "),Tm=(t,e)=>i=>i[t]===e,od=t=>{let e=Object.entries(t).map(([i,a])=>Tm(i,a));return i=>e.every(a=>a(i))},Lt=(t,e=[],i=[])=>{let a=oo(i).map(od),r=o=>a.some(l=>l(o));Array.from(e).filter(r).forEach(o=>{o.mode=t})},xt=(t,e=()=>!0)=>{if(!(t!=null&&t.textTracks))return[];let i=typeof e=="function"?e:od(e);return Array.from(t.textTracks).filter(i)},ja=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(n.MEDIA_SUBTITLES_SHOWING)};var ld=t=>{var e;let{media:i,fullscreenElement:a}=t;try{let r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){let o=(e=a[r])==null?void 0:e.call(a);if(o instanceof Promise)return o.catch(()=>{})}else i!=null&&i.webkitEnterFullscreen?i.webkitEnterFullscreen():i!=null&&i.requestFullscreen&&i.requestFullscreen()}catch(r){console.error(r)}},sd="exitFullscreen"in c?"exitFullscreen":"webkitExitFullscreen"in c?"webkitExitFullscreen":"webkitCancelFullScreen"in c?"webkitCancelFullScreen":void 0,dd=t=>{var e;let{documentElement:i}=t;if(sd){let a=(e=i==null?void 0:i[sd])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},Gi="fullscreenElement"in c?"fullscreenElement":"webkitFullscreenElement"in c?"webkitFullscreenElement":void 0,km=t=>{let{documentElement:e,media:i}=t,a=e==null?void 0:e[Gi];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===Pl.FULLSCREEN?i:a},ud=t=>{var e;let{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;let o=km(t);if(!o)return!1;if(o===r||o===i)return!0;if(o.localName.includes("-")){let l=o.shadowRoot;if(!(Gi in l))return le(o,r);for(;l!=null&&l[Gi];){if(l[Gi]===r)return!0;l=(e=l[Gi])==null?void 0:e.shadowRoot}}return!1},Im="fullscreenEnabled"in c?"fullscreenEnabled":"webkitFullscreenEnabled"in c?"webkitFullscreenEnabled":void 0,cd=t=>{let{documentElement:e,media:i}=t;return!!(e!=null&&e[Im])||i&&"webkitSupportsFullscreen"in i};var er,so=()=>{var t,e;return er||(er=(e=(t=c)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),er)},md=async(t=so())=>{if(!t)return!1;let e=t.volume;t.volume=e/2+.1;let i=new AbortController,a=await Promise.race([Sm(t,i.signal),Mm(t,e)]);return i.abort(),a},Sm=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),Mm=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Ua(10)}return t.volume!==e},Cm=/.*Version\/.*Safari\/.*/.test(s.navigator.userAgent),lo=(t=so())=>s.matchMedia("(display-mode: standalone)").matches&&Cm?!1:typeof(t==null?void 0:t.requestPictureInPicture)=="function",uo=(t=so())=>cd({documentElement:c,media:t}),hd=uo(),pd=lo(),vd=!!s.WebKitPlaybackTargetAvailabilityEvent,Ed=!!s.chrome;var ei=t=>xt(t.media,e=>[ue.SUBTITLES,ue.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),co=t=>xt(t.media,e=>e.mode===mt.SHOWING&&[ue.SUBTITLES,ue.CAPTIONS].includes(e.kind)),tr=(t,e)=>{let i=ei(t),a=co(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)Lt(mt.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let o=i[0],{options:l}=t;if(!(l!=null&&l.noSubtitlesLangPref)){let b=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),g=b?[b,...globalThis.navigator.languages]:globalThis.navigator.languages,v=i.filter(f=>g.some(D=>f.language.toLowerCase().startsWith(D.split("-")[0]))).sort((f,D)=>{let T=g.findIndex(R=>f.language.toLowerCase().startsWith(R.split("-")[0])),k=g.findIndex(R=>D.language.toLowerCase().startsWith(R.split("-")[0]));return T-k});v[0]&&(o=v[0])}let{language:d,label:u,kind:E}=o;Lt(mt.DISABLED,i,a),Lt(mt.SHOWING,i,[{language:d,label:u,kind:E}])}}},ir=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?wm(t,e):Object.entries(t).every(([i,a])=>i in e&&ir(a,e[i])),wm=(t,e)=>{let i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,o)=>ir(r,e[o])):!0};var Lm=Object.values(Ce),ar,xm=md().then(t=>(ar=t,ar)),fd=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof s.HTMLElement))return;let i=e.localName;if(!i.includes("-"))return;let a=s.customElements.get(i);a&&e instanceof a||(await s.customElements.whenDefined(i),s.customElements.upgrade(e))}))},ti={mediaError:{get(t,e){let{media:i}=t;if((e==null?void 0:e.type)!=="playing")return i==null?void 0:i.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;let{media:a}=t;if((e==null?void 0:e.type)!=="playing")return(i=a==null?void 0:a.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;let{media:r}=t;if((e==null?void 0:e.type)!=="playing")return(a=(i=r==null?void 0:r.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.paused)!=null?e:!0},set(t,e){var i;let{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){let{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.playbackRate)!=null?e:1},set(t,e){let{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.muted)!=null?e:!1},set(t,e){let{media:i}=e;if(i){try{s.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(a){console.debug("Error setting muted pref",a)}i.muted=t}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{let{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{let r=s.localStorage.getItem("media-chrome-pref-muted")==="true";ti.mediaMuted.set(r,e),t(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaVolume:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.volume)!=null?e:1},set(t,e){let{media:i}=e;if(i){try{t==null?s.localStorage.removeItem("media-chrome-pref-volume"):s.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(a){console.debug("Error setting volume pref",a)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{let{options:{noVolumePref:i}}=e;if(!i)try{let{media:a}=e;if(!a)return;let r=s.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;ti.mediaVolume.set(+r,e),t(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){let{media:e}=t;return typeof(e==null?void 0:e.volume)=="undefined"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.currentTime)!=null?e:0},set(t,e){let{media:i}=e;!i||!Yt(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){let{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e==null?void 0:e.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){let{media:e}=t;return(e==null?void 0:e.readyState)<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;let{media:i}=t;if(!((e=i==null?void 0:i.seekable)!=null&&e.length))return;let a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;let{media:i}=t,a=(e=i==null?void 0:i.buffered)!=null?e:[];return Array.from(a).map((r,o)=>[Number(a.start(o).toFixed(3)),Number(a.end(o).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){let{media:e,options:{defaultStreamType:i}={}}=t,a=[Ce.LIVE,Ce.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;let{streamType:r}=e;if(Lm.includes(r))return r===Ce.UNKNOWN?a:r;let o=e.duration;return o===1/0?Ce.LIVE:Number.isFinite(o)?Ce.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){let{media:e}=t;if(!e)return Number.NaN;let{targetLiveWindow:i}=e,a=ti.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===Ce.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){let{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(ti.mediaStreamType.get(t)===Ce.LIVE))return!1;let r=e.seekable;if(!r)return!0;if(!r.length)return!1;let o=r.end(r.length-1)-i;return e.currentTime>=o},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return ei(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return co(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;let{media:r,options:o}=e;if(!r)return;let l=d=>{var u;!o.defaultSubtitles||d&&![ue.CAPTIONS,ue.SUBTITLES].includes((u=d==null?void 0:d.track)==null?void 0:u.kind)||tr(e,!0)};return r.addEventListener("loadstart",l),(i=r.textTracks)==null||i.addEventListener("addtrack",l),(a=r.textTracks)==null||a.addEventListener("removetrack",l),()=>{var d,u;r.removeEventListener("loadstart",l),(d=r.textTracks)==null||d.removeEventListener("addtrack",l),(u=r.textTracks)==null||u.removeEventListener("removetrack",l)}}]},mediaChaptersCues:{get(t){var e;let{media:i}=t;if(!i)return[];let[a]=xt(i,{kind:ue.CHAPTERS});return Array.from((e=a==null?void 0:a.cues)!=null?e:[]).map(({text:r,startTime:o,endTime:l})=>({text:r,startTime:o,endTime:l}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;if(!a)return;let r=a.querySelector('track[kind="chapters"][default][src]'),o=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r==null||r.addEventListener("load",t),o==null||o.addEventListener("load",t),()=>{r==null||r.removeEventListener("load",t),o==null||o.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;let{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?le(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let o=r.pictureInPictureElement.shadowRoot;for(;o!=null&&o.pictureInPictureElement;){if(o.pictureInPictureElement===a)return!0;o=(i=o.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){let{media:i}=e;if(i)if(t){if(!c.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}let a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){let o=()=>{i.removeEventListener("loadedmetadata",l),i.preload="none"},l=()=>{i.requestPictureInPicture().catch(a),o()};i.addEventListener("loadedmetadata",l),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),o()},1e3)}else throw r}else throw r})}else c.pictureInPictureElement&&c.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;let{media:i}=t;return[...(e=i==null?void 0:i.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;let{media:r}=t;return(a=(i=r==null?void 0:r.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){let{media:i}=e;if(!(i!=null&&i.videoRenditions)){console.warn("MediaController: Rendition selection not supported by this media.");return}let a=t,r=Array.prototype.findIndex.call(i.videoRenditions,o=>o.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;let{media:i}=t;return[...(e=i==null?void 0:i.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;let{media:a}=t;return(i=[...(e=a==null?void 0:a.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){let{media:i}=e;if(!(i!=null&&i.audioTracks)){console.warn("MediaChrome: Audio track selection not supported by this media.");return}let a=t;for(let r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return ud(t)},set(t,e){t?ld(e):dd(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;let{media:i}=t;return!(i!=null&&i.remote)||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;let{media:r}=e;if(r&&!(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){let{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&s.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){let{media:e}=t;if(!hd||!uo(e))return ve.UNSUPPORTED}},mediaPipUnavailable:{get(t){let{media:e}=t;if(!pd||!lo(e))return ve.UNSUPPORTED}},mediaVolumeUnavailable:{get(t){let{media:e}=t;if(ar===!1||(e==null?void 0:e.volume)==null)return ve.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{ar==null&&xm.then(e=>t(e?void 0:ve.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;let{media:a}=t;if(!Ed||!((i=a==null?void 0:a.remote)!=null&&i.state))return ve.UNSUPPORTED;if(!(e==null||e==="available"))return ve.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(o=>{t({availability:o?"available":"not-available"})}).catch(o=>{o.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var o;(o=a==null?void 0:a.remote)==null||o.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!vd)return ve.UNSUPPORTED;if((e==null?void 0:e.availability)==="not-available")return ve.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(o=>{t({availability:o?"available":"not-available"})}).catch(o=>{o.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var o;(o=a==null?void 0:a.remote)==null||o.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;let{media:i}=t;if(!(i!=null&&i.videoRenditions))return ve.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return ve.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;let{media:a}=t;if(!(a!=null&&a.audioTracks))return ve.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return ve.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]}};var gd={[m.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,o;let{media:l}=e,d=i!=null?i:void 0,u,E;if(l&&d!=null){let[f]=xt(l,{kind:ue.METADATA,label:"thumbnails"}),D=Array.prototype.find.call((a=f==null?void 0:f.cues)!=null?a:[],(T,k,R)=>k===0?T.endTime>d:k===R.length-1?T.startTime<=d:T.startTime<=d&&T.endTime>d);if(D){let T=/'^(?:[a-z]+:)?\/\//i.test(D.text)||(r=l==null?void 0:l.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,k=new URL(D.text,T);E=new URLSearchParams(k.hash).get("#xywh").split(",").map(V=>+V),u=k.href}}let b=t.mediaDuration.get(e),v=(o=t.mediaChaptersCues.get(e).find((f,D,T)=>D===T.length-1&&b===f.endTime?f.startTime<=d&&f.endTime>=d:f.startTime<=d&&f.endTime>d))==null?void 0:o.text;return i!=null&&v==null&&(v=""),{mediaPreviewTime:d,mediaPreviewImage:u,mediaPreviewCoords:E,mediaPreviewChapter:v}},[m.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[m.MEDIA_PLAY_REQUEST](t,e){var i,a,r,o;let l="mediaPaused",u=t.mediaStreamType.get(e)===Ce.LIVE,E=!((i=e.options)!=null&&i.noAutoSeekToLive),b=t.mediaTargetLiveWindow.get(e)>0;if(u&&E&&!b){let g=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(g){let v=(o=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?o:0,f=g-v;t.mediaCurrentTime.set(f,e)}}t[l].set(!1,e)},[m.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){let a="mediaPlaybackRate",r=i;t[a].set(r,e)},[m.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[m.MEDIA_UNMUTE_REQUEST](t,e){let i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[m.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){let a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[m.MEDIA_SEEK_REQUEST](t,e,{detail:i}){let a="mediaCurrentTime",r=i;t[a].set(r,e)},[m.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;let o="mediaCurrentTime",l=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(l)))return;let d=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,u=l-d;t[o].set(u,e)},[m.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;let{options:r}=e,o=ei(e),l=oo(i),d=(a=l[0])==null?void 0:a.language;d&&!r.noSubtitlesLangPref&&s.localStorage.setItem("media-chrome-pref-subtitles-lang",d),Lt(mt.SHOWING,o,l)},[m.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){let a=ei(e),r=i!=null?i:[];Lt(mt.DISABLED,a,r)},[m.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){tr(e,i)},[m.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){let a="mediaRenditionSelected",r=i;t[a].set(r,e)},[m.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){let a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[m.MEDIA_ENTER_PIP_REQUEST](t,e){let i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[m.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e){let i="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[m.MEDIA_ENTER_CAST_REQUEST](t,e){let i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[m.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}};var bd=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=ti,requestMap:r=gd,options:o={},monitorStateOwnersOnlyWithSubscriptions:l=!0})=>{let d=[],u={options:{...o}},E=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),b=T=>{T!=null&&(ir(T,E)||(E=Object.freeze({...E,...T}),d.forEach(k=>k(E))))},g=()=>{let T=Object.entries(a).reduce((k,[R,{get:V}])=>(k[R]=V(u),k),{});b(T)},v={},f,D=async(T,k)=>{var R,V,Y,be,Te,N,q,ee,ke,De,Aa,ya,Ta,ka,Ia,Sa;let Kn=!!f;if(f={...u,...f!=null?f:{},...T},Kn)return;await fd(...Object.values(T));let ut=d.length>0&&k===0&&l,Ma=u.media!==f.media,Ca=((R=u.media)==null?void 0:R.textTracks)!==((V=f.media)==null?void 0:V.textTracks),wa=((Y=u.media)==null?void 0:Y.videoRenditions)!==((be=f.media)==null?void 0:be.videoRenditions),La=((Te=u.media)==null?void 0:Te.audioTracks)!==((N=f.media)==null?void 0:N.audioTracks),Ie=((q=u.media)==null?void 0:q.remote)!==((ee=f.media)==null?void 0:ee.remote),Pe=u.documentElement!==f.documentElement,xa=!!u.media&&(Ma||ut),ll=!!((ke=u.media)!=null&&ke.textTracks)&&(Ca||ut),dl=!!((De=u.media)!=null&&De.videoRenditions)&&(wa||ut),ul=!!((Aa=u.media)!=null&&Aa.audioTracks)&&(La||ut),cl=!!((ya=u.media)!=null&&ya.remote)&&(Ie||ut),ml=!!u.documentElement&&(Pe||ut),hl=xa||ll||dl||ul||cl||ml,qt=d.length===0&&k===1&&l,pl=!!f.media&&(Ma||qt),vl=!!((Ta=f.media)!=null&&Ta.textTracks)&&(Ca||qt),El=!!((ka=f.media)!=null&&ka.videoRenditions)&&(wa||qt),fl=!!((Ia=f.media)!=null&&Ia.audioTracks)&&(La||qt),gl=!!((Sa=f.media)!=null&&Sa.remote)&&(Ie||qt),bl=!!f.documentElement&&(Pe||qt),_l=pl||vl||El||fl||gl||bl;if(!(hl||_l)){Object.entries(f).forEach(([$,Oi])=>{u[$]=Oi}),g(),f=void 0;return}Object.entries(a).forEach(([$,{get:Oi,mediaEvents:Mc=[],textTracksEvents:Cc=[],videoRenditionsEvents:wc=[],audioTracksEvents:Lc=[],remoteEvents:xc=[],rootEvents:Rc=[],stateOwnersUpdateHandlers:Dc=[]}])=>{v[$]||(v[$]={});let he=Q=>{let pe=Oi(u,Q);b({[$]:pe})},te;te=v[$].mediaEvents,Mc.forEach(Q=>{te&&xa&&(u.media.removeEventListener(Q,te),v[$].mediaEvents=void 0),pl&&(f.media.addEventListener(Q,he),v[$].mediaEvents=he)}),te=v[$].textTracksEvents,Cc.forEach(Q=>{var pe,Se;te&&ll&&((pe=u.media.textTracks)==null||pe.removeEventListener(Q,te),v[$].textTracksEvents=void 0),vl&&((Se=f.media.textTracks)==null||Se.addEventListener(Q,he),v[$].textTracksEvents=he)}),te=v[$].videoRenditionsEvents,wc.forEach(Q=>{var pe,Se;te&&dl&&((pe=u.media.videoRenditions)==null||pe.removeEventListener(Q,te),v[$].videoRenditionsEvents=void 0),El&&((Se=f.media.videoRenditions)==null||Se.addEventListener(Q,he),v[$].videoRenditionsEvents=he)}),te=v[$].audioTracksEvents,Lc.forEach(Q=>{var pe,Se;te&&ul&&((pe=u.media.audioTracks)==null||pe.removeEventListener(Q,te),v[$].audioTracksEvents=void 0),fl&&((Se=f.media.audioTracks)==null||Se.addEventListener(Q,he),v[$].audioTracksEvents=he)}),te=v[$].remoteEvents,xc.forEach(Q=>{var pe,Se;te&&cl&&((pe=u.media.remote)==null||pe.removeEventListener(Q,te),v[$].remoteEvents=void 0),gl&&((Se=f.media.remote)==null||Se.addEventListener(Q,he),v[$].remoteEvents=he)}),te=v[$].rootEvents,Rc.forEach(Q=>{te&&ml&&(u.documentElement.removeEventListener(Q,te),v[$].rootEvents=void 0),bl&&(f.documentElement.addEventListener(Q,he),v[$].rootEvents=he)});let Al=v[$].stateOwnersUpdateHandlers;Dc.forEach(Q=>{Al&&hl&&Al(),_l&&(v[$].stateOwnersUpdateHandlers=Q(he,f))})}),Object.entries(f).forEach(([$,Oi])=>{u[$]=Oi}),g(),f=void 0};return D({media:t,fullscreenElement:e,documentElement:i,options:o}),{dispatch(T){let{type:k,detail:R}=T;if(r[k]&&E.mediaErrorCode==null){b(r[k](a,u,T));return}k==="mediaelementchangerequest"?D({media:R}):k==="fullscreenelementchangerequest"?D({fullscreenElement:R}):k==="documentelementchangerequest"?D({documentElement:R}):k==="optionschangerequest"&&Object.entries(R!=null?R:{}).forEach(([V,Y])=>{u.options[V]=Y})},getState(){return E},subscribe(T){return D({},d.length+1),d.push(T),T(E),()=>{let k=d.indexOf(T);k>=0&&(D({},d.length-1),d.splice(k,1))}}}};var vo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},L=(t,e,i)=>(vo(t,e,"read from private field"),i?i.call(t):e.get(t)),nt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},vt=(t,e,i,a)=>(vo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Et=(t,e,i)=>(vo(t,e,"access private method"),i),Dt,Ki,W,qi,Be,rr,nr,mo,ii,Yi,or,ho,kd=["ArrowLeft","ArrowRight","Enter"," ","f","m","k","c"],_d=10,p={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYS_USED:"keysused",LIVE_EDGE_OFFSET:"liveedgeoffset",SEEK_TO_LIVE_OFFSET:"seektoliveoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_HOTKEYS:"nohotkeys",NO_VOLUME_PREF:"novolumepref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_DEFAULT_STORE:"nodefaultstore",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",LANG:"lang"},sr=class extends Xt{constructor(){super(),nt(this,nr),nt(this,ii),nt(this,or),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,nt(this,Dt,new Ne(this,p.HOTKEYS)),nt(this,Ki,void 0),nt(this,W,void 0),nt(this,qi,void 0),nt(this,Be,void 0),nt(this,rr,i=>{var a;(a=L(this,W))==null||a.dispatch(i)}),this.associateElement(this);let e={};vt(this,qi,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);let o=a.toLowerCase(),l=new s.CustomEvent(Dl[o],{composed:!0,detail:r});this.dispatchEvent(l)}),e=i}),this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(p.NO_HOTKEYS,p.HOTKEYS,p.DEFAULT_STREAM_TYPE,p.DEFAULT_SUBTITLES,p.DEFAULT_DURATION,p.LANG)}get mediaStore(){return L(this,W)}set mediaStore(e){var i,a;if(L(this,W)&&((i=L(this,Be))==null||i.call(this),vt(this,Be,void 0)),vt(this,W,e),!L(this,W)&&!this.hasAttribute(p.NO_DEFAULT_STORE)){Et(this,nr,mo).call(this);return}vt(this,Be,(a=L(this,W))==null?void 0:a.subscribe(L(this,qi)))}get fullscreenElement(){var e;return(e=L(this,Ki))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(p.FULLSCREEN_ELEMENT)&&this.removeAttribute(p.FULLSCREEN_ELEMENT),vt(this,Ki,e),(i=L(this,W))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return A(this,p.DEFAULT_SUBTITLES)}set defaultSubtitles(e){y(this,p.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return S(this,p.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){M(this,p.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return w(this,p.DEFAULT_DURATION)}set defaultDuration(e){x(this,p.DEFAULT_DURATION,e)}get noHotkeys(){return A(this,p.NO_HOTKEYS)}set noHotkeys(e){y(this,p.NO_HOTKEYS,e)}get keysUsed(){return S(this,p.KEYS_USED)}set keysUsed(e){M(this,p.KEYS_USED,e)}get liveEdgeOffset(){return w(this,p.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){x(this,p.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return A(this,p.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){y(this,p.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return A(this,p.NO_VOLUME_PREF)}set noVolumePref(e){y(this,p.NO_VOLUME_PREF,e)}get noSubtitlesLangPref(){return A(this,p.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){y(this,p.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return A(this,p.NO_DEFAULT_STORE)}set noDefaultStore(e){y(this,p.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var r,o,l,d,u,E,b,g;if(super.attributeChangedCallback(e,i,a),e===p.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(p.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===p.HOTKEYS)L(this,Dt).value=a;else if(e===p.DEFAULT_SUBTITLES&&a!==i)(r=L(this,W))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(p.DEFAULT_SUBTITLES)}});else if(e===p.DEFAULT_STREAM_TYPE)(l=L(this,W))==null||l.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(o=this.getAttribute(p.DEFAULT_STREAM_TYPE))!=null?o:void 0}});else if(e===p.LIVE_EDGE_OFFSET)(d=L(this,W))==null||d.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(p.LIVE_EDGE_OFFSET)}});else if(e===p.SEEK_TO_LIVE_OFFSET)(u=L(this,W))==null||u.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===p.NO_AUTO_SEEK_TO_LIVE)(E=L(this,W))==null||E.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(p.NO_AUTO_SEEK_TO_LIVE)}});else if(e===p.FULLSCREEN_ELEMENT){let v=a?(b=this.getRootNode())==null?void 0:b.getElementById(a):void 0;vt(this,Ki,v),(g=L(this,W))==null||g.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===p.LANG&&a!==i&&Vl(a)}connectedCallback(){var e,i;!L(this,W)&&!this.hasAttribute(p.NO_DEFAULT_STORE)&&Et(this,nr,mo).call(this),(e=L(this,W))==null||e.dispatch({type:"documentelementchangerequest",detail:c}),super.connectedCallback(),L(this,W)&&!L(this,Be)&&vt(this,Be,(i=L(this,W))==null?void 0:i.subscribe(L(this,qi))),this.enableHotkeys()}disconnectedCallback(){var e,i,a,r;(e=super.disconnectedCallback)==null||e.call(this),L(this,W)&&((i=L(this,W))==null||i.dispatch({type:"documentelementchangerequest",detail:void 0}),(a=L(this,W))==null||a.dispatch({type:m.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})),L(this,Be)&&((r=L(this,Be))==null||r.call(this),vt(this,Be,void 0))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=L(this,W))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=L(this,W))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){Td(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:i}=this;if(i.has(e))return;let a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),o=Nm(e,a,r);Object.values(m).forEach(l=>{e.addEventListener(l,L(this,rr))}),i.set(e,o)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(m).forEach(r=>{e.removeEventListener(r,L(this,rr))})}registerMediaStateReceiver(e){if(!e)return;let i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),L(this,W)&&Object.entries(L(this,W).getState()).forEach(([r,o])=>{Td([e],r,o)}))}unregisterMediaStateReceiver(e){let i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",Et(this,or,ho))}disableHotkeys(){this.removeEventListener("keydown",Et(this,or,ho)),this.removeEventListener("keyup",Et(this,ii,Yi))}get hotkeys(){return S(this,p.HOTKEYS)}set hotkeys(e){M(this,p.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,o,l;let d=e.target;if(((r=(a=(i=d.getAttribute(p.KEYS_USED))==null?void 0:i.split(" "))!=null?a:d==null?void 0:d.keysUsed)!=null?r:[]).map(v=>v==="Space"?" ":v).filter(Boolean).includes(e.key))return;let E,b,g;if(!L(this,Dt).contains(`no${e.key.toLowerCase()}`)&&!(e.key===" "&&L(this,Dt).contains("nospace")))switch(e.key){case" ":case"k":E=L(this,W).getState().mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"m":E=this.mediaStore.getState().mediaVolumeLevel==="off"?m.MEDIA_UNMUTE_REQUEST:m.MEDIA_MUTE_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"f":E=this.mediaStore.getState().mediaIsFullscreen?m.MEDIA_EXIT_FULLSCREEN_REQUEST:m.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new s.CustomEvent(m.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":{let v=this.hasAttribute(p.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(p.KEYBOARD_BACKWARD_SEEK_OFFSET):_d;b=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)-v,0),g=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(g);break}case"ArrowRight":{let v=this.hasAttribute(p.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(p.KEYBOARD_FORWARD_SEEK_OFFSET):_d;b=Math.max(((l=this.mediaStore.getState().mediaCurrentTime)!=null?l:0)+v,0),g=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:b}),this.dispatchEvent(g);break}default:break}}};Dt=new WeakMap;Ki=new WeakMap;W=new WeakMap;qi=new WeakMap;Be=new WeakMap;rr=new WeakMap;nr=new WeakSet;mo=function(){var t;this.mediaStore=bd({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(p.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(p.DEFAULT_DURATION)?+this.getAttribute(p.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(p.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(p.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(p.NO_VOLUME_PREF),noSubtitlesLangPref:this.hasAttribute(p.NO_SUBTITLES_LANG_PREF)}})};ii=new WeakSet;Yi=function(t){let{key:e}=t;if(!kd.includes(e)){this.removeEventListener("keyup",Et(this,ii,Yi));return}this.keyboardShortcutHandler(t)};or=new WeakSet;ho=function(t){let{metaKey:e,altKey:i,key:a}=t;if(e||i||!kd.includes(a)){this.removeEventListener("keyup",Et(this,ii,Yi));return}[" ","ArrowLeft","ArrowRight"].includes(a)&&!(L(this,Dt).contains(`no${a.toLowerCase()}`)||a===" "&&L(this,Dt).contains("nospace"))&&t.preventDefault(),this.addEventListener("keyup",Et(this,ii,Yi),{once:!0})};var Rm=Object.values(n),Dm=Object.values(Yn),Id=t=>{var e,i,a,r;let{observedAttributes:o}=t.constructor;!o&&((e=t.nodeName)!=null&&e.includes("-"))&&(s.customElements.upgrade(t),{observedAttributes:o}=t.constructor);let l=(r=(a=(i=t==null?void 0:t.getAttribute)==null?void 0:i.call(t,C.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(o||l)?(o||l).filter(d=>Rm.includes(d)):[]},Pm=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&s.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof s.customElements.get(t.nodeName.toLowerCase()))&&s.customElements.upgrade(t),Dm.some(a=>a in t)},po=t=>Pm(t)||!!Id(t).length,Ad=t=>{var e;return(e=t==null?void 0:t.join)==null?void 0:e.call(t,":")},yd={[n.MEDIA_SUBTITLES_LIST]:rt,[n.MEDIA_SUBTITLES_SHOWING]:rt,[n.MEDIA_SEEKABLE]:Ad,[n.MEDIA_BUFFERED]:t=>t==null?void 0:t.map(Ad).join(" "),[n.MEDIA_PREVIEW_COORDS]:t=>t==null?void 0:t.join(" "),[n.MEDIA_RENDITION_LIST]:Ul,[n.MEDIA_AUDIO_TRACK_LIST]:Nl},Um=async(t,e,i)=>{var a,r;if(t.isConnected||await Ua(0),typeof i=="boolean"||i==null)return y(t,e,i);if(typeof i=="number")return x(t,e,i);if(typeof i=="string")return M(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);let o=(r=(a=yd[e])==null?void 0:a.call(yd,i))!=null?r:i;return t.setAttribute(e,o)},Om=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},Rt=(t,e)=>{if(Om(t))return;let i=(r,o)=>{var l,d;po(r)&&o(r);let{children:u=[]}=r!=null?r:{},E=(d=(l=r==null?void 0:r.shadowRoot)==null?void 0:l.children)!=null?d:[];[...u,...E].forEach(g=>Rt(g,o))},a=t==null?void 0:t.nodeName.toLowerCase();if(a.includes("-")&&!po(t)){s.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},Td=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}let r=Id(a),o=e.toLowerCase();r.includes(o)&&Um(a,o,i)})},Nm=(t,e,i)=>{Rt(t,e);let a=b=>{var g;let v=(g=b==null?void 0:b.composedPath()[0])!=null?g:b.target;e(v)},r=b=>{var g;let v=(g=b==null?void 0:b.composedPath()[0])!=null?g:b.target;i(v)};t.addEventListener(m.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(m.UNREGISTER_MEDIA_STATE_RECEIVER,r);let o=b=>{b.forEach(g=>{let{addedNodes:v=[],removedNodes:f=[],type:D,target:T,attributeName:k}=g;D==="childList"?(Array.prototype.forEach.call(v,R=>Rt(R,e)),Array.prototype.forEach.call(f,R=>Rt(R,i))):D==="attributes"&&k===C.MEDIA_CHROME_ATTRIBUTES&&(po(T)?e(T):i(T))})},l=[],d=b=>{let g=b.target;g.name!=="media"&&(l.forEach(v=>Rt(v,i)),l=[...g.assignedElements({flatten:!0})],l.forEach(v=>Rt(v,e)))};t.addEventListener("slotchange",d);let u=new MutationObserver(o);return u.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{Rt(t,i),t.removeEventListener("slotchange",d),u.disconnect(),t.removeEventListener(m.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(m.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};s.customElements.get("media-controller")||s.customElements.define("media-controller",sr);var Eo=sr;var go=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},X=(t,e,i)=>(go(t,e,"read from private field"),i?i.call(t):e.get(t)),ai=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},lr=(t,e,i,a)=>(go(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Bm=(t,e,i)=>(go(t,e,"access private method"),i),He,ni,gt,ri,dr,fo,Sd,ft={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"},Md=c.createElement("template");Md.innerHTML=`
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
`;var H=class extends s.HTMLElement{constructor(e={}){var i;if(super(),ai(this,fo),ai(this,He,void 0),this.preventClick=!1,this.tooltipEl=null,this.tooltipContent="",ai(this,ni,a=>{this.preventClick||this.handleClick(a),setTimeout(X(this,gt),0)}),ai(this,gt,()=>{var a,r;(r=(a=this.tooltipEl)==null?void 0:a.updateXOffset)==null||r.call(a)}),ai(this,ri,a=>{let{key:r}=a;if(!this.keysUsed.includes(r)){this.removeEventListener("keyup",X(this,ri));return}this.preventClick||this.handleClick(a)}),ai(this,dr,a=>{let{metaKey:r,altKey:o,key:l}=a;if(r||o||!this.keysUsed.includes(l)){this.removeEventListener("keyup",X(this,ri));return}this.addEventListener("keyup",X(this,ri),{once:!0})}),!this.shadowRoot){this.attachShadow({mode:"open"});let a=Md.content.cloneNode(!0);this.nativeEl=a;let r=e.slotTemplate;r||(r=c.createElement("template"),r.innerHTML=`<slot>${e.defaultContent||""}</slot>`),e.tooltipContent&&(a.querySelector('slot[name="tooltip-content"]').innerHTML=(i=e.tooltipContent)!=null?i:"",this.tooltipContent=e.tooltipContent),this.nativeEl.appendChild(r.content.cloneNode(!0)),this.shadowRoot.appendChild(a)}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",ft.TOOLTIP_PLACEMENT,C.MEDIA_CONTROLLER]}enable(){this.addEventListener("click",X(this,ni)),this.addEventListener("keydown",X(this,dr)),this.tabIndex=0}disable(){this.removeEventListener("click",X(this,ni)),this.removeEventListener("keydown",X(this,dr)),this.removeEventListener("keyup",X(this,ri)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER?(i&&((o=(r=X(this,He))==null?void 0:r.unassociateElement)==null||o.call(r,this),lr(this,He,null)),a&&this.isConnected&&(lr(this,He,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=X(this,He))==null?void 0:d.associateElement)==null||u.call(d,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===ft.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i&&(this.tooltipEl.placement=a),X(this,gt).call(this)}connectedCallback(){var e,i,a;let{style:r}=B(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(lr(this,He,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=X(this,He))==null?void 0:i.associateElement)==null||a.call(i,this)),s.customElements.whenDefined("media-tooltip").then(()=>Bm(this,fo,Sd).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=X(this,He))==null?void 0:e.unassociateElement)==null||i.call(e,this),lr(this,He,null),this.removeEventListener("mouseenter",X(this,gt)),this.removeEventListener("focus",X(this,gt)),this.removeEventListener("click",X(this,ni))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return S(this,ft.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){M(this,ft.TOOLTIP_PLACEMENT,e)}get mediaController(){return S(this,C.MEDIA_CONTROLLER)}set mediaController(e){M(this,C.MEDIA_CONTROLLER,e)}get disabled(){return A(this,ft.DISABLED)}set disabled(e){y(this,ft.DISABLED,e)}get noTooltip(){return A(this,ft.NO_TOOLTIP)}set noTooltip(e){y(this,ft.NO_TOOLTIP,e)}handleClick(e){}};He=new WeakMap;ni=new WeakMap;gt=new WeakMap;ri=new WeakMap;dr=new WeakMap;fo=new WeakSet;Sd=function(){this.addEventListener("mouseenter",X(this,gt)),this.addEventListener("focus",X(this,gt)),this.addEventListener("click",X(this,ni));let t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)};s.customElements.get("media-chrome-button")||s.customElements.define("media-chrome-button",H);var bo=H;var Cd=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`,Ld=c.createElement("template");Ld.innerHTML=`
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
    <slot name="enter">${Cd}</slot>
    <slot name="exit">${Cd}</slot>
  </slot>
`;var Hm=`
  <slot name="tooltip-enter">${h("start airplay")}</slot>
  <slot name="tooltip-exit">${h("stop airplay")}</slot>
`,wd=t=>{let e=t.mediaIsAirplaying?h("stop airplay"):h("start airplay");t.setAttribute("aria-label",e)},ur=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_AIRPLAYING,n.MEDIA_AIRPLAY_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Ld,tooltipContent:Hm,...e})}connectedCallback(){super.connectedCallback(),wd(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_AIRPLAYING&&wd(this)}get mediaIsAirplaying(){return A(this,n.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){y(this,n.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return S(this,n.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){M(this,n.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new s.CustomEvent(m.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};s.customElements.get("media-airplay-button")||s.customElements.define("media-airplay-button",ur);var _o=ur;var $m=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Wm=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,Pd=c.createElement("template");Pd.innerHTML=`
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
    <slot name="on">${$m}</slot>
    <slot name="off">${Wm}</slot>
  </slot>
`;var Fm=`
  <slot name="tooltip-enable">${h("Enable captions")}</slot>
  <slot name="tooltip-disable">${h("Disable captions")}</slot>
`,xd=t=>{t.setAttribute("aria-checked",ja(t).toString())},cr=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}constructor(e={}){super({slotTemplate:Pd,tooltipContent:Fm,...e}),this._captionsReady=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",h("closed captions")),xd(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_SHOWING&&xd(this)}get mediaSubtitlesList(){return Rd(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Dd(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Rd(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Dd(this,n.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new s.CustomEvent(m.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}},Rd=(t,e)=>{let i=t.getAttribute(e);return i?wt(i):[]},Dd=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=rt(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-button")||s.customElements.define("media-captions-button",cr);var Ao=cr;var Vm='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',Gm='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>',Od=c.createElement("template");Od.innerHTML=`
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
    <slot name="enter">${Vm}</slot>
    <slot name="exit">${Gm}</slot>
  </slot>
`;var Km=`
  <slot name="tooltip-enter">${h("Start casting")}</slot>
  <slot name="tooltip-exit">${h("Stop casting")}</slot>
`,Ud=t=>{let e=t.mediaIsCasting?h("stop casting"):h("start casting");t.setAttribute("aria-label",e)},mr=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_CASTING,n.MEDIA_CAST_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Od,tooltipContent:Km,...e})}connectedCallback(){super.connectedCallback(),Ud(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_CASTING&&Ud(this)}get mediaIsCasting(){return A(this,n.MEDIA_IS_CASTING)}set mediaIsCasting(e){y(this,n.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return S(this,n.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){M(this,n.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?m.MEDIA_EXIT_CAST_REQUEST:m.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-cast-button")||s.customElements.define("media-cast-button",mr);var yo=mr;var wo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ut=(t,e,i)=>(wo(t,e,"read from private field"),i?i.call(t):e.get(t)),ot=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Lo=(t,e,i,a)=>(wo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Pt=(t,e,i)=>(wo(t,e,"access private method"),i),pr,zi,Ot,hr,To,ko,Nd,Io,Bd,So,Hd,Mo,$d,Co,Wd;function qm(t){return`
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
  `}function Ym(t){return`
    <slot id="content"></slot>
  `}var Zi={OPEN:"open",ANCHOR:"anchor"},bt=class extends s.HTMLElement{constructor(){super(),ot(this,hr),ot(this,ko),ot(this,Io),ot(this,So),ot(this,Mo),ot(this,Co),ot(this,pr,!1),ot(this,zi,null),ot(this,Ot,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[Zi.OPEN,Zi.ANCHOR]}get open(){return A(this,Zi.OPEN)}set open(e){y(this,Zi.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":Pt(this,So,Hd).call(this,e);break;case"focusout":Pt(this,Mo,$d).call(this,e);break;case"keydown":Pt(this,Co,Wd).call(this,e);break}}connectedCallback(){Pt(this,hr,To).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,i,a){Pt(this,hr,To).call(this),e===Zi.OPEN&&a!==i&&(this.open?Pt(this,ko,Nd).call(this):Pt(this,Io,Bd).call(this))}focus(){Lo(this,zi,Bi());let e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;let a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a==null||a.focus()}get keysUsed(){return["Escape","Tab"]}};pr=new WeakMap;zi=new WeakMap;Ot=new WeakMap;hr=new WeakSet;To=function(){if(!Ut(this,pr)&&(Lo(this,pr,!0),!this.shadowRoot)){this.attachShadow({mode:"open"});let t=zl(this.attributes);this.shadowRoot.innerHTML=`
        ${this.constructor.getTemplateHTML(t)}
      `,queueMicrotask(()=>{let{style:e}=B(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};ko=new WeakSet;Nd=function(){var t;(t=Ut(this,Ot))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};Io=new WeakSet;Bd=function(){var t;(t=Ut(this,Ot))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};So=new WeakSet;Hd=function(t){Lo(this,Ot,t.relatedTarget),le(this,t.relatedTarget)||(this.open=!this.open)};Mo=new WeakSet;$d=function(t){var e;le(this,t.relatedTarget)||((e=Ut(this,zi))==null||e.focus(),Ut(this,Ot)&&Ut(this,Ot)!==t.relatedTarget&&this.open&&(this.open=!1))};Co=new WeakSet;Wd=function(t){var e,i,a,r,o;let{key:l,ctrlKey:d,altKey:u,metaKey:E}=t;d||u||E||this.keysUsed.includes(l)&&(t.preventDefault(),t.stopPropagation(),l==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):l==="Escape"&&((o=Ut(this,zi))==null||o.focus(),this.open=!1))};bt.getTemplateHTML=qm;bt.getSlotTemplateHTML=Ym;s.customElements.get("media-chrome-dialog")||s.customElements.define("media-chrome-dialog",bt);var xo=bt;var Bo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},z=(t,e,i)=>(Bo(t,e,"read from private field"),i?i.call(t):e.get(t)),ne=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},_t=(t,e,i,a)=>(Bo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),we=(t,e,i)=>(Bo(t,e,"access private method"),i),$e,kr,vr,Er,Le,yr,fr,gr,br,Ho,Fd,_r,Ro,Ar,Do,Tr,$o,Po,Vd,Uo,Gd,Oo,Kd,No,qd,Yd=c.createElement("template");Yd.innerHTML=`
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
`;var At=class extends s.HTMLElement{constructor(){super(),ne(this,Ho),ne(this,_r),ne(this,Ar),ne(this,Tr),ne(this,Po),ne(this,Uo),ne(this,Oo),ne(this,No),ne(this,$e,void 0),ne(this,kr,void 0),ne(this,vr,void 0),ne(this,Er,void 0),ne(this,Le,{}),ne(this,yr,[]),ne(this,fr,()=>{if(this.range.matches(":focus-visible")){let{style:e}=B(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),ne(this,gr,()=>{let{style:e}=B(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),ne(this,br,()=>{let e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Yd.content.cloneNode(!0))),this.container=this.shadowRoot.querySelector("#container"),_t(this,vr,this.shadowRoot.querySelector("#startpoint")),_t(this,Er,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER?(i&&((o=(r=z(this,$e))==null?void 0:r.unassociateElement)==null||o.call(r,this),_t(this,$e,null)),a&&this.isConnected&&(_t(this,$e,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=z(this,$e))==null?void 0:d.associateElement)==null||u.call(d,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),we(this,_r,Ro).call(this)):(this.range.setAttribute(e,a),we(this,Ar,Do).call(this)))}connectedCallback(){var e,i,a;let{style:r}=B(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),z(this,Le).pointer=B(this.shadowRoot,"#pointer"),z(this,Le).progress=B(this.shadowRoot,"#progress"),z(this,Le).thumb=B(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),z(this,Le).activeSegment=B(this.shadowRoot,"#segments-clipping rect:nth-child(0)");let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(_t(this,$e,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=z(this,$e))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",z(this,fr)),this.shadowRoot.addEventListener("focusout",z(this,gr)),we(this,_r,Ro).call(this),tt(this.container,z(this,br))}disconnectedCallback(){var e,i;we(this,Ar,Do).call(this),(i=(e=z(this,$e))==null?void 0:e.unassociateElement)==null||i.call(e,this),_t(this,$e,null),this.shadowRoot.removeEventListener("focusin",z(this,fr)),this.shadowRoot.removeEventListener("focusout",z(this,gr)),it(this.container,z(this,br))}updatePointerBar(e){var i;(i=z(this,Le).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;let a=this.range.valueAsNumber*100;(e=z(this,Le).progress)==null||e.style.setProperty("width",`${a}%`),(i=z(this,Le).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){let i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!(e!=null&&e.length)),!(e!=null&&e.length))return;let a=[...new Set([+this.range.min,...e.flatMap(o=>[o.start,o.end]),+this.range.max])];_t(this,yr,[...a]);let r=a.pop();for(let[o,l]of a.entries()){let[d,u]=[o===0,o===a.length-1],E=d?"calc(var(--segments-gap) / -1)":`${l*100}%`,g=`calc(${((u?r:a[o+1])-l)*100}%${d||u?"":" - var(--segments-gap)"})`,v=c.createElementNS("http://www.w3.org/2000/svg","rect"),f=B(this.shadowRoot,`#segments-clipping rect:nth-child(${o+1})`);f.style.setProperty("x",E),f.style.setProperty("width",g),i.append(v)}}getPointerRatio(e){return Ql(e.clientX,e.clientY,z(this,vr).getBoundingClientRect(),z(this,Er).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":we(this,No,qd).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":we(this,Po,Vd).call(this,e);break;case"pointerdown":we(this,Tr,$o).call(this,e);break;case"pointerup":we(this,Uo,Gd).call(this);break;case"pointerleave":we(this,Oo,Kd).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}};$e=new WeakMap;kr=new WeakMap;vr=new WeakMap;Er=new WeakMap;Le=new WeakMap;yr=new WeakMap;fr=new WeakMap;gr=new WeakMap;br=new WeakMap;Ho=new WeakSet;Fd=function(t){let e=z(this,Le).activeSegment;if(!e)return;let i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${z(this,yr).findIndex((o,l,d)=>{let u=d[l+1];return u!=null&&i>=o&&i<=u})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};_r=new WeakSet;Ro=function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};Ar=new WeakSet;Do=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),(t=s.window)==null||t.removeEventListener("pointerup",this),(e=s.window)==null||e.removeEventListener("pointermove",this)};Tr=new WeakSet;$o=function(t){var e;_t(this,kr,t.composedPath().includes(this.range)),(e=s.window)==null||e.addEventListener("pointerup",this)};Po=new WeakSet;Vd=function(t){var e;t.pointerType!=="mouse"&&we(this,Tr,$o).call(this,t),this.addEventListener("pointerleave",this),(e=s.window)==null||e.addEventListener("pointermove",this)};Uo=new WeakSet;Gd=function(){var t;(t=s.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};Oo=new WeakSet;Kd=function(){var t,e;this.removeEventListener("pointerleave",this),(t=s.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=z(this,Le).activeSegment)==null||e.style.removeProperty("transform")};No=new WeakSet;qd=function(t){this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),we(this,Ho,Fd).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!z(this,kr))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})))};s.customElements.get("media-chrome-range")||s.customElements.define("media-chrome-range",At);var Wo=At;var Zd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ir=(t,e,i)=>(Zd(t,e,"read from private field"),i?i.call(t):e.get(t)),Zm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Sr=(t,e,i,a)=>(Zd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),We,zd=c.createElement("template");zd.innerHTML=`
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
`;var Mr=class extends s.HTMLElement{constructor(){super(),Zm(this,We,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(zd.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=Ir(this,We))==null?void 0:r.unassociateElement)==null||o.call(r,this),Sr(this,We,null)),a&&this.isConnected&&(Sr(this,We,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=Ir(this,We))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(Sr(this,We,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Ir(this,We))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Ir(this,We))==null?void 0:e.unassociateElement)==null||i.call(e,this),Sr(this,We,null)}};We=new WeakMap;s.customElements.get("media-control-bar")||s.customElements.define("media-control-bar",Mr);var Fo=Mr;var Qd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Cr=(t,e,i)=>(Qd(t,e,"read from private field"),i?i.call(t):e.get(t)),zm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wr=(t,e,i,a)=>(Qd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Fe,Xd=c.createElement("template");Xd.innerHTML=`
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
`;var Ae=class extends s.HTMLElement{constructor(){super(),zm(this,Fe,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Xd.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=Cr(this,Fe))==null?void 0:r.unassociateElement)==null||o.call(r,this),wr(this,Fe,null)),a&&this.isConnected&&(wr(this,Fe,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=Cr(this,Fe))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let{style:r}=B(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(wr(this,Fe,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=Cr(this,Fe))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Cr(this,Fe))==null?void 0:e.unassociateElement)==null||i.call(e,this),wr(this,Fe,null)}};Fe=new WeakMap;s.customElements.get("media-text-display")||s.customElements.define("media-text-display",Ae);var Vo=Ae;var jd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Jd=(t,e,i)=>(jd(t,e,"read from private field"),i?i.call(t):e.get(t)),Qm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Xm=(t,e,i,a)=>(jd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Qi,Lr=class extends Ae{constructor(){super(),Qm(this,Qi,void 0),Xm(this,Qi,this.shadowRoot.querySelector("slot")),Jd(this,Qi).textContent=Ue(0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===n.MEDIA_DURATION&&(Jd(this,Qi).textContent=Ue(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){x(this,n.MEDIA_DURATION,e)}};Qi=new WeakMap;s.customElements.get("media-duration-display")||s.customElements.define("media-duration-display",Lr);var Go=Lr;var Jm={2:h("Network Error"),3:h("Decode Error"),4:h("Source Not Supported"),5:h("Encryption Error")},jm={2:h("A network error caused the media download to fail."),3:h("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:h("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:h("The media is encrypted and there are no keys to decrypt it.")},Ko=t=>{var e,i;return t.code===1?null:{title:(e=Jm[t.code])!=null?e:`Error ${t.code}`,message:(i=jm[t.code])!=null?i:t.message}};var tu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},eh=(t,e,i)=>(tu(t,e,"read from private field"),i?i.call(t):e.get(t)),th=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ih=(t,e,i,a)=>(tu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),xr;function ah(t){return`
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
      ${iu({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function rh(t){return t.code&&Ko(t)!==null}function iu(t){var e;let{title:i,message:a}=(e=Ko(t))!=null?e:{},r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}var eu=[n.MEDIA_ERROR_CODE,n.MEDIA_ERROR_MESSAGE],oi=class extends bt{constructor(){super(...arguments),th(this,xr,null)}static get observedAttributes(){return[...super.observedAttributes,...eu]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!eu.includes(e))return;let o=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=rh(o),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(o))}get mediaError(){return eh(this,xr)}set mediaError(e){ih(this,xr,e)}get mediaErrorCode(){return w(this,"mediaerrorcode")}set mediaErrorCode(e){x(this,"mediaerrorcode",e)}get mediaErrorMessage(){return S(this,"mediaerrormessage")}set mediaErrorMessage(e){M(this,"mediaerrormessage",e)}};xr=new WeakMap;oi.getSlotTemplateHTML=ah;oi.formatErrorMessage=iu;s.customElements.get("media-error-dialog")||s.customElements.define("media-error-dialog",oi);var qo=oi;var nh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,oh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`,ru=c.createElement("template");ru.innerHTML=`
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
    <slot name="enter">${nh}</slot>
    <slot name="exit">${oh}</slot>
  </slot>
`;var sh=`
  <slot name="tooltip-enter">${h("Enter fullscreen mode")}</slot>
  <slot name="tooltip-exit">${h("Exit fullscreen mode")}</slot>
`,au=t=>{let e=t.mediaIsFullscreen?h("exit fullscreen mode"):h("enter fullscreen mode");t.setAttribute("aria-label",e)},Rr=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_FULLSCREEN,n.MEDIA_FULLSCREEN_UNAVAILABLE]}constructor(e={}){super({slotTemplate:ru,tooltipContent:sh,...e})}connectedCallback(){super.connectedCallback(),au(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_FULLSCREEN&&au(this)}get mediaFullscreenUnavailable(){return S(this,n.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){M(this,n.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return A(this,n.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){y(this,n.MEDIA_IS_FULLSCREEN,e)}handleClick(){let e=this.mediaIsFullscreen?m.MEDIA_EXIT_FULLSCREEN_REQUEST:m.MEDIA_ENTER_FULLSCREEN_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-fullscreen-button")||s.customElements.define("media-fullscreen-button",Rr);var Yo=Rr;var{MEDIA_TIME_IS_LIVE:Dr,MEDIA_PAUSED:Xi}=n,{MEDIA_SEEK_TO_LIVE_REQUEST:lh,MEDIA_PLAY_REQUEST:dh}=m,uh='<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>',ou=c.createElement("template");ou.innerHTML=`
  <style>
  :host { --media-tooltip-display: none; }
  
  slot[name=indicator] > *,
  :host ::slotted([slot=indicator]) {
    
    min-width: auto;
    fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
    color: var(--media-live-button-icon-color, rgb(140, 140, 140));
  }

  :host([${Dr}]:not([${Xi}])) slot[name=indicator] > *,
  :host([${Dr}]:not([${Xi}])) ::slotted([slot=indicator]) {
    fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
    color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
  }

  :host([${Dr}]:not([${Xi}])) {
    cursor: var(--media-cursor, not-allowed);
  }

  slot[name=text]{
    text-transform: uppercase;
  }

  </style>

  <slot name="indicator">${uh}</slot>
  
  <slot name="spacer">&nbsp;</slot><slot name="text">${h("live")}</slot>
`;var nu=t=>{let e=t.mediaPaused||!t.mediaTimeIsLive,i=e?h("seek to live"):h("playing live");t.setAttribute("aria-label",i),e?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")},Pr=class extends H{static get observedAttributes(){return[...super.observedAttributes,Xi,Dr]}constructor(e={}){super({slotTemplate:ou,...e})}connectedCallback(){nu(this),super.connectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),nu(this)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return A(this,n.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){y(this,n.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new s.CustomEvent(lh,{composed:!0,bubbles:!0})),this.hasAttribute(Xi)&&this.dispatchEvent(new s.CustomEvent(dh,{composed:!0,bubbles:!0})))}};s.customElements.get("media-live-button")||s.customElements.define("media-live-button",Pr);var Zo=Pr;var lu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ji=(t,e,i)=>(lu(t,e,"read from private field"),i?i.call(t):e.get(t)),su=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ji=(t,e,i,a)=>(lu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ve,Or,Ur={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},du=500,uu=c.createElement("template"),ch=`
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
`;uu.innerHTML=`
<style>
:host {
  display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
  vertical-align: middle;
  box-sizing: border-box;
  --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${du}ms);
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

<slot name="icon">${ch}</slot>
<div id="status" role="status" aria-live="polite">${h("media loading")}</div>
`;var Nr=class extends s.HTMLElement{constructor(){if(super(),su(this,Ve,void 0),su(this,Or,du),!this.shadowRoot){let e=this.attachShadow({mode:"open"}),i=uu.content.cloneNode(!0);e.appendChild(i)}}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PAUSED,n.MEDIA_LOADING,Ur.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===Ur.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===C.MEDIA_CONTROLLER&&(i&&((o=(r=Ji(this,Ve))==null?void 0:r.unassociateElement)==null||o.call(r,this),ji(this,Ve,null)),a&&this.isConnected&&(ji(this,Ve,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=Ji(this,Ve))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(ji(this,Ve,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Ji(this,Ve))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Ji(this,Ve))==null?void 0:e.unassociateElement)==null||i.call(e,this),ji(this,Ve,null)}get loadingDelay(){return Ji(this,Or)}set loadingDelay(e){ji(this,Or,e);let{style:i}=B(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return A(this,n.MEDIA_LOADING)}set mediaLoading(e){y(this,n.MEDIA_LOADING,e)}get mediaController(){return S(this,C.MEDIA_CONTROLLER)}set mediaController(e){M(this,C.MEDIA_CONTROLLER,e)}get noAutohide(){return A(this,Ur.NO_AUTOHIDE)}set noAutohide(e){y(this,Ur.NO_AUTOHIDE,e)}};Ve=new WeakMap;Or=new WeakMap;s.customElements.get("media-loading-indicator")||s.customElements.define("media-loading-indicator",Nr);var zo=Nr;var{MEDIA_VOLUME_LEVEL:Nt}=n,mh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,cu=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,hh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`,hu=c.createElement("template");hu.innerHTML=`
  <style>
  
  :host(:not([${Nt}])) slot[name=icon] slot:not([name=high]), 
  :host([${Nt}=high]) slot[name=icon] slot:not([name=high]) {
    display: none !important;
  }

  :host([${Nt}=off]) slot[name=icon] slot:not([name=off]) {
    display: none !important;
  }

  :host([${Nt}=low]) slot[name=icon] slot:not([name=low]) {
    display: none !important;
  }

  :host([${Nt}=medium]) slot[name=icon] slot:not([name=medium]) {
    display: none !important;
  }

  :host(:not([${Nt}=off])) slot[name=tooltip-unmute],
  :host([${Nt}=off]) slot[name=tooltip-mute] {
    display: none;
  }
  </style>

  <slot name="icon">
    <slot name="off">${mh}</slot>
    <slot name="low">${cu}</slot>
    <slot name="medium">${cu}</slot>
    <slot name="high">${hh}</slot>
  </slot>
`;var ph=`
  <slot name="tooltip-mute">${h("Mute")}</slot>
  <slot name="tooltip-unmute">${h("Unmute")}</slot>
`,mu=t=>{let i=t.mediaVolumeLevel==="off"?h("unmute"):h("mute");t.setAttribute("aria-label",i)},Br=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME_LEVEL]}constructor(e={}){super({slotTemplate:hu,tooltipContent:ph,...e})}connectedCallback(){mu(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_VOLUME_LEVEL&&mu(this),super.attributeChangedCallback(e,i,a)}get mediaVolumeLevel(){return S(this,n.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){M(this,n.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel==="off"?m.MEDIA_UNMUTE_REQUEST:m.MEDIA_MUTE_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-mute-button")||s.customElements.define("media-mute-button",Br);var Qo=Br;var pu=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`,Eu=c.createElement("template");Eu.innerHTML=`
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
    <slot name="enter">${pu}</slot>
    <slot name="exit">${pu}</slot>
  </slot>
`;var vh=`
  <slot name="tooltip-enter">${h("Enter picture in picture mode")}</slot>
  <slot name="tooltip-exit">${h("Exit picture in picture mode")}</slot>
`,vu=t=>{let e=t.mediaIsPip?h("exit picture in picture mode"):h("enter picture in picture mode");t.setAttribute("aria-label",e)},Hr=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_PIP,n.MEDIA_PIP_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Eu,tooltipContent:vh,...e})}connectedCallback(){vu(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_IS_PIP&&vu(this),super.attributeChangedCallback(e,i,a)}get mediaPipUnavailable(){return S(this,n.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){M(this,n.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return A(this,n.MEDIA_IS_PIP)}set mediaIsPip(e){y(this,n.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?m.MEDIA_EXIT_PIP_REQUEST:m.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-pip-button")||s.customElements.define("media-pip-button",Hr);var Xo=Hr;var Eh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},$r=(t,e,i)=>(Eh(t,e,"read from private field"),i?i.call(t):e.get(t)),fh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},si,Jo={RATES:"rates"},jo=[1,1.2,1.5,1.7,2],li=1,fu=c.createElement("template");fu.innerHTML=`
  <style>
    :host {
      min-width: 5ch;
      padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
    }
  </style>
  <slot name="icon"></slot>
`;var Wr=class extends H{constructor(e={}){super({slotTemplate:fu,tooltipContent:h("Playback rate"),...e}),fh(this,si,new Ne(this,Jo.RATES,{defaultValue:jo})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${li}x`}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,Jo.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Jo.RATES&&($r(this,si).value=a),e===n.MEDIA_PLAYBACK_RATE){let r=a?+a:Number.NaN,o=Number.isNaN(r)?li:r;this.container.innerHTML=`${o}x`,this.setAttribute("aria-label",h("Playback rate {playbackRate}",{playbackRate:o}))}}get rates(){return $r(this,si)}set rates(e){e?Array.isArray(e)&&($r(this,si).value=e.join(" ")):$r(this,si).value=""}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,li)}set mediaPlaybackRate(e){x(this,n.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;let a=Array.from(this.rates.values(),l=>+l).sort((l,d)=>l-d),r=(i=(e=a.find(l=>l>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:li,o=new s.CustomEvent(m.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(o)}};si=new WeakMap;s.customElements.get("media-playback-rate-button")||s.customElements.define("media-playback-rate-button",Wr);var es=Wr;var gh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,bh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`,bu=c.createElement("template");bu.innerHTML=`
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
    <slot name="play">${gh}</slot>
    <slot name="pause">${bh}</slot>
  </slot>
`;var _h=`
  <slot name="tooltip-play">${h("Play")}</slot>
  <slot name="tooltip-pause">${h("Pause")}</slot>
`,gu=t=>{let e=t.mediaPaused?h("play"):h("pause");t.setAttribute("aria-label",e)},Fr=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_ENDED]}constructor(e={}){super({slotTemplate:bu,tooltipContent:_h,...e})}connectedCallback(){gu(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_PAUSED&&gu(this),super.attributeChangedCallback(e,i,a)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-play-button")||s.customElements.define("media-play-button",Fr);var ts=Fr;var Ge={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"},_u=c.createElement("template");_u.innerHTML=`
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
`;var Ah=t=>{t.style.removeProperty("background-image")},yh=(t,e)=>{t.style["background-image"]=`url('${e}')`},Vr=class extends s.HTMLElement{static get observedAttributes(){return[Ge.PLACEHOLDER_SRC,Ge.SRC]}constructor(){super(),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(_u.content.cloneNode(!0))),this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Ge.SRC&&(a==null?this.image.removeAttribute(Ge.SRC):this.image.setAttribute(Ge.SRC,a)),e===Ge.PLACEHOLDER_SRC&&(a==null?Ah(this.image):yh(this.image,a))}get placeholderSrc(){return S(this,Ge.PLACEHOLDER_SRC)}set placeholderSrc(e){M(this,Ge.SRC,e)}get src(){return S(this,Ge.SRC)}set src(e){M(this,Ge.SRC,e)}};s.customElements.get("media-poster-image")||s.customElements.define("media-poster-image",Vr);var is=Vr;var Au=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Th=(t,e,i)=>(Au(t,e,"read from private field"),i?i.call(t):e.get(t)),kh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ih=(t,e,i,a)=>(Au(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Gr,Kr=class extends Ae{constructor(){super(),kh(this,Gr,void 0),Ih(this,Gr,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_CHAPTER]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PREVIEW_CHAPTER&&a!==i&&a!=null&&(Th(this,Gr).textContent=a,a!==""?this.setAttribute("aria-valuetext",`chapter: ${a}`):this.removeAttribute("aria-valuetext"))}get mediaPreviewChapter(){return S(this,n.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){M(this,n.MEDIA_PREVIEW_CHAPTER,e)}};Gr=new WeakMap;s.customElements.get("media-preview-chapter-display")||s.customElements.define("media-preview-chapter-display",Kr);var as=Kr;var yu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},qr=(t,e,i)=>(yu(t,e,"read from private field"),i?i.call(t):e.get(t)),Sh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Yr=(t,e,i,a)=>(yu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ke,Tu=c.createElement("template");Tu.innerHTML=`
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
`;var Zr=class extends s.HTMLElement{constructor(){super(),Sh(this,Ke,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Tu.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(Yr(this,Ke,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=qr(this,Ke))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=qr(this,Ke))==null?void 0:e.unassociateElement)==null||i.call(e,this),Yr(this,Ke,null)}attributeChangedCallback(e,i,a){var r,o,l,d,u;[n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===C.MEDIA_CONTROLLER&&(i&&((o=(r=qr(this,Ke))==null?void 0:r.unassociateElement)==null||o.call(r,this),Yr(this,Ke,null)),a&&this.isConnected&&(Yr(this,Ke,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=qr(this,Ke))==null?void 0:d.associateElement)==null||u.call(d,this)))}get mediaPreviewImage(){return S(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){M(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(n.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(n.MEDIA_PREVIEW_COORDS);return}this.setAttribute(n.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){let e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;let[a,r,o,l]=e,d=i.split("#")[0],u=getComputedStyle(this),{maxWidth:E,maxHeight:b,minWidth:g,minHeight:v}=u,f=Math.min(parseInt(E)/o,parseInt(b)/l),D=Math.max(parseInt(g)/o,parseInt(v)/l),T=f<1,k=T?f:D>1?D:1,{style:R}=B(this.shadowRoot,":host"),V=B(this.shadowRoot,"img").style,Y=this.shadowRoot.querySelector("img"),be=T?"min":"max";R.setProperty(`${be}-width`,"initial","important"),R.setProperty(`${be}-height`,"initial","important"),R.width=`${o*k}px`,R.height=`${l*k}px`;let Te=()=>{V.width=`${this.imgWidth*k}px`,V.height=`${this.imgHeight*k}px`,V.display="block"};Y.src!==d&&(Y.onload=()=>{this.imgWidth=Y.naturalWidth,this.imgHeight=Y.naturalHeight,Te()},Y.src=d,Te()),Te(),V.transform=`translate(-${a*k}px, -${r*k}px)`}};Ke=new WeakMap;s.customElements.get("media-preview-thumbnail")||s.customElements.define("media-preview-thumbnail",Zr);var rs=Zr;var Iu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ku=(t,e,i)=>(Iu(t,e,"read from private field"),i?i.call(t):e.get(t)),Mh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ch=(t,e,i,a)=>(Iu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ea,zr=class extends Ae{constructor(){super(),Mh(this,ea,void 0),Ch(this,ea,this.shadowRoot.querySelector("slot")),ku(this,ea).textContent=Ue(0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PREVIEW_TIME&&a!=null&&(ku(this,ea).textContent=Ue(parseFloat(a)))}get mediaPreviewTime(){return w(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){x(this,n.MEDIA_PREVIEW_TIME,e)}};ea=new WeakMap;s.customElements.get("media-preview-time-display")||s.customElements.define("media-preview-time-display",zr);var ns=zr;var di={SEEK_OFFSET:"seekoffset"},Qr=30,wh=`<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(2.18 19.87)">${Qr}</text><path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/></svg>`,Su=c.createElement("template");Su.innerHTML=`
  <slot name="icon">${wh}</slot>
`;var Lh=0,Xr=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,di.SEEK_OFFSET]}constructor(e={}){super({slotTemplate:Su,tooltipContent:h("Seek backward"),...e})}connectedCallback(){this.seekOffset=w(this,di.SEEK_OFFSET,Qr),super.connectedCallback()}attributeChangedCallback(e,i,a){e===di.SEEK_OFFSET&&(this.seekOffset=w(this,di.SEEK_OFFSET,Qr)),super.attributeChangedCallback(e,i,a)}get seekOffset(){return w(this,di.SEEK_OFFSET,Qr)}set seekOffset(e){x(this,di.SEEK_OFFSET,e),this.setAttribute("aria-label",h("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),$a(Wa(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME,Lh)}set mediaCurrentTime(e){x(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};s.customElements.get("media-seek-backward-button")||s.customElements.define("media-seek-backward-button",Xr);var os=Xr;var ui={SEEK_OFFSET:"seekoffset"},Jr=30,xh=`<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(8.9 19.87)">${Jr}</text><path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/></svg>`,Mu=c.createElement("template");Mu.innerHTML=`
  <slot name="icon">${xh}</slot>
`;var Rh=0,jr=class extends H{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,ui.SEEK_OFFSET]}constructor(e={}){super({slotTemplate:Mu,tooltipContent:h("Seek forward"),...e})}connectedCallback(){this.seekOffset=w(this,ui.SEEK_OFFSET,Jr),super.connectedCallback()}attributeChangedCallback(e,i,a){e===ui.SEEK_OFFSET&&(this.seekOffset=w(this,ui.SEEK_OFFSET,Jr)),super.attributeChangedCallback(e,i,a)}get seekOffset(){return w(this,ui.SEEK_OFFSET,Jr)}set seekOffset(e){x(this,ui.SEEK_OFFSET,e),this.setAttribute("aria-label",h("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),$a(Wa(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME,Rh)}set mediaCurrentTime(e){x(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,i=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};s.customElements.get("media-seek-forward-button")||s.customElements.define("media-seek-forward-button",jr);var ss=jr;var xu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ls=(t,e,i)=>(xu(t,e,"read from private field"),i?i.call(t):e.get(t)),Dh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ph=(t,e,i,a)=>(xu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ci,xe={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},Cu=[...Object.values(xe),n.MEDIA_CURRENT_TIME,n.MEDIA_DURATION,n.MEDIA_SEEKABLE],wu=["Enter"," "],Uh="&nbsp;/&nbsp;",Lu=(t,{timesSep:e=Uh}={})=>{var i,a;let r=t.hasAttribute(xe.REMAINING),o=t.hasAttribute(xe.SHOW_DURATION),l=(i=t.mediaCurrentTime)!=null?i:0,[,d]=(a=t.mediaSeekable)!=null?a:[],u=0;Number.isFinite(t.mediaDuration)?u=t.mediaDuration:Number.isFinite(d)&&(u=d);let E=r?Ue(0-(u-l)):Ue(l);return o?`${E}${e}${Ue(u)}`:E},Oh="video not loaded, unknown time.",Nh=t=>{var e;let i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[],r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-valuetext",Oh);return}let o=t.hasAttribute(xe.REMAINING),l=t.hasAttribute(xe.SHOW_DURATION),d=o?It(0-(r-i)):It(i);if(!l){t.setAttribute("aria-valuetext",d);return}let u=It(r),E=`${d} of ${u}`;t.setAttribute("aria-valuetext",E)},en=class extends Ae{constructor(){super(),Dh(this,ci,void 0),Ph(this,ci,this.shadowRoot.querySelector("slot")),ls(this,ci).innerHTML=`${Lu(this)}`}static get observedAttributes(){return[...super.observedAttributes,...Cu,"disabled"]}connectedCallback(){let{style:e}=B(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",h("playback time"));let i=a=>{let{key:r}=a;if(!wu.includes(r)){this.removeEventListener("keyup",i);return}this.toggleTimeDisplay()};this.addEventListener("keydown",a=>{let{metaKey:r,altKey:o,key:l}=a;if(r||o||!wu.includes(l)){this.removeEventListener("keyup",i);return}this.addEventListener("keyup",i)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,i,a){Cu.includes(e)?this.update():e==="disabled"&&a!==i&&(a==null?this.enable():this.disable()),super.attributeChangedCallback(e,i,a)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return A(this,xe.REMAINING)}set remaining(e){y(this,xe.REMAINING,e)}get showDuration(){return A(this,xe.SHOW_DURATION)}set showDuration(e){y(this,xe.SHOW_DURATION,e)}get noToggle(){return A(this,xe.NO_TOGGLE)}set noToggle(e){y(this,xe.NO_TOGGLE,e)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){x(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){x(this,n.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}update(){let e=Lu(this);Nh(this),e!==ls(this,ci).innerHTML&&(ls(this,ci).innerHTML=e)}};ci=new WeakMap;s.customElements.get("media-time-display")||s.customElements.define("media-time-display",en);var ds=en;var Ru=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ae=(t,e,i)=>(Ru(t,e,"read from private field"),i?i.call(t):e.get(t)),qe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ge=(t,e,i,a)=>(Ru(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Bh=(t,e,i,a)=>({set _(r){ge(t,e,r,i)},get _(){return ae(t,e,a)}}),mi,tn,hi,ta,an,rn,nn,pi,Bt,on,sn=class{constructor(e,i,a){qe(this,mi,void 0),qe(this,tn,void 0),qe(this,hi,void 0),qe(this,ta,void 0),qe(this,an,void 0),qe(this,rn,void 0),qe(this,nn,void 0),qe(this,pi,void 0),qe(this,Bt,0),qe(this,on,(r=performance.now())=>{ge(this,Bt,requestAnimationFrame(ae(this,on))),ge(this,ta,performance.now()-ae(this,hi));let o=1e3/this.fps;if(ae(this,ta)>o){ge(this,hi,r-ae(this,ta)%o);let l=1e3/((r-ae(this,tn))/++Bh(this,an)._),d=(r-ae(this,rn))/1e3/this.duration,u=ae(this,nn)+d*this.playbackRate;u-ae(this,mi).valueAsNumber>0?ge(this,pi,this.playbackRate/this.duration/l):(ge(this,pi,.995*ae(this,pi)),u=ae(this,mi).valueAsNumber+ae(this,pi)),this.callback(u)}}),ge(this,mi,e),this.callback=i,this.fps=a}start(){ae(this,Bt)===0&&(ge(this,hi,performance.now()),ge(this,tn,ae(this,hi)),ge(this,an,0),ae(this,on).call(this))}stop(){ae(this,Bt)!==0&&(cancelAnimationFrame(ae(this,Bt)),ge(this,Bt,0))}update({start:e,duration:i,playbackRate:a}){let r=e-ae(this,mi).valueAsNumber,o=Math.abs(i-this.duration);(r>0||r<-.03||o>=.5)&&this.callback(e),ge(this,nn,e),ge(this,rn,performance.now()),this.duration=i,this.playbackRate=a}};mi=new WeakMap;tn=new WeakMap;hi=new WeakMap;ta=new WeakMap;an=new WeakMap;rn=new WeakMap;nn=new WeakMap;pi=new WeakMap;Bt=new WeakMap;on=new WeakMap;var hs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},J=(t,e,i)=>(hs(t,e,"read from private field"),i?i.call(t):e.get(t)),re=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ye=(t,e,i,a)=>(hs(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),oe=(t,e,i)=>(hs(t,e,"access private method"),i),vi,Ht,un,aa,cn,dn,ra,na,Ei,fi,ia,ps,Du,us,mn,vs,hn,Es,pn,fs,cs,Pu,oa,vn,ms,Uu,Hh="video not loaded, unknown time.",$h=t=>{let e=t.range,i=It(+Nu(t)),a=It(+t.mediaSeekableEnd),r=i&&a?`${i} of ${a}`:Hh;e.setAttribute("aria-valuetext",r)},Ou=c.createElement("template");Ou.innerHTML=`
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
`;var ln=(t,e=t.mediaCurrentTime)=>{let i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;let r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},Nu=(t,e=t.range.valueAsNumber)=>{let i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i},En=class extends At{constructor(){super(),re(this,fi),re(this,ps),re(this,mn),re(this,hn),re(this,pn),re(this,cs),re(this,oa),re(this,ms),re(this,vi,void 0),re(this,Ht,void 0),re(this,un,void 0),re(this,aa,void 0),re(this,cn,void 0),re(this,dn,void 0),re(this,ra,void 0),re(this,na,void 0),re(this,Ei,void 0),re(this,us,a=>{this.dragging||(Yt(a)&&(this.range.valueAsNumber=a),this.updateBar())}),this.container.appendChild(Ou.content.cloneNode(!0)),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),Ye(this,un,this.shadowRoot.querySelectorAll('[part~="box"]')),Ye(this,cn,this.shadowRoot.querySelector('[part~="preview-box"]')),Ye(this,dn,this.shadowRoot.querySelector('[part~="current-box"]'));let i=getComputedStyle(this);Ye(this,ra,parseInt(i.getPropertyValue("--media-box-padding-left"))),Ye(this,na,parseInt(i.getPropertyValue("--media-box-padding-right"))),Ye(this,Ht,new sn(this.range,J(this,us),60))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_DURATION,n.MEDIA_SEEKABLE,n.MEDIA_CURRENT_TIME,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_TIME,n.MEDIA_PREVIEW_CHAPTER,n.MEDIA_BUFFERED,n.MEDIA_PLAYBACK_RATE,n.MEDIA_LOADING,n.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",h("seek")),oe(this,fi,ia).call(this),Ye(this,vi,this.getRootNode()),(e=J(this,vi))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),oe(this,fi,ia).call(this),(e=J(this,vi))==null||e.removeEventListener("transitionstart",this),Ye(this,vi,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===n.MEDIA_CURRENT_TIME||e===n.MEDIA_PAUSED||e===n.MEDIA_ENDED||e===n.MEDIA_LOADING||e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE?(J(this,Ht).update({start:ln(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),oe(this,fi,ia).call(this),$h(this)):e===n.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=J(this,Ei),this.updateBar()))}get mediaChaptersCues(){return J(this,Ei)}set mediaChaptersCues(e){var i;Ye(this,Ei,e),this.updateSegments((i=J(this,Ei))==null?void 0:i.map(a=>({start:ln(this,a.startTime),end:ln(this,a.endTime)})))}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){y(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return A(this,n.MEDIA_LOADING)}set mediaLoading(e){y(this,n.MEDIA_LOADING,e)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){x(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){x(this,n.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){x(this,n.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(n.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(n.MEDIA_BUFFERED);return}let i=e.map(a=>a.join(":")).join(" ");this.setAttribute(n.MEDIA_BUFFERED,i)}get mediaSeekable(){let e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;let[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;let[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return S(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){M(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return w(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){x(this,n.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return A(this,n.MEDIA_ENDED)}set mediaEnded(e){y(this,n.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;let i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{let o=this.mediaCurrentTime,[,l=this.mediaSeekableStart]=(e=i.find(([d,u])=>d<=o&&o<=u))!=null?e:[];a=ln(this,l)}let{style:r}=B(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;let i=B(this.shadowRoot,"#current-rail"),a=B(this.shadowRoot,'[part~="current-box"]'),r=oe(this,mn,vs).call(this,J(this,dn)),o=oe(this,hn,Es).call(this,r,this.range.valueAsNumber),l=oe(this,pn,fs).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${o})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${l}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":oe(this,ms,Uu).call(this);break;case"pointermove":oe(this,cs,Pu).call(this,e);break;case"pointerup":case"pointerleave":oe(this,oa,vn).call(this,null);break;case"transitionstart":le(e.target,this)&&setTimeout(()=>oe(this,fi,ia).call(this),0);break}}};vi=new WeakMap;Ht=new WeakMap;un=new WeakMap;aa=new WeakMap;cn=new WeakMap;dn=new WeakMap;ra=new WeakMap;na=new WeakMap;Ei=new WeakMap;fi=new WeakSet;ia=function(){oe(this,ps,Du).call(this)?J(this,Ht).start():J(this,Ht).stop()};ps=new WeakSet;Du=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Fa(this)};us=new WeakMap;mn=new WeakSet;vs=function(t){var e;let a=((e=this.getAttribute("bounds")?Oe(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),o=t.offsetWidth,l=-(r.left-a.left-o/2),d=a.right-r.left-o/2;return{box:{width:o,min:l,max:d},bounds:a,range:r}};hn=new WeakSet;Es=function(t,e){let i=`${e*100}%`,{width:a,min:r,max:o}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(o)){let d=`calc(1 / var(--_range-width) * 100 * ${o}% - var(--media-box-padding-right))`;i=`min(${i}, ${d})`}return i};pn=new WeakSet;fs=function(t,e){let{width:i,min:a,max:r}=t.box,o=e*t.range.width;if(o<a+J(this,ra)){let l=t.range.left-t.bounds.left-J(this,ra);return`${o-i/2+l}px`}if(o>r-J(this,na)){let l=t.bounds.right-t.range.right-J(this,na);return`${o+i/2-l-t.range.width}px`}return 0};cs=new WeakSet;Pu=function(t){let e=[...J(this,un)].some(b=>t.composedPath().includes(b));if(!this.dragging&&(e||!t.composedPath().includes(this))){oe(this,oa,vn).call(this,null);return}let i=this.mediaSeekableEnd;if(!i)return;let a=B(this.shadowRoot,"#preview-rail"),r=B(this.shadowRoot,'[part~="preview-box"]'),o=oe(this,mn,vs).call(this,J(this,cn)),l=(t.clientX-o.range.left)/o.range.width;l=Math.max(0,Math.min(1,l));let d=oe(this,hn,Es).call(this,o,l),u=oe(this,pn,fs).call(this,o,l);a.style.transform=`translateX(${d})`,a.style.setProperty("--_range-width",`${o.range.width}`),r.style.setProperty("--_box-shift",`${u}`),r.style.setProperty("--_box-width",`${o.box.width}px`);let E=Math.round(J(this,aa))-Math.round(l*i);Math.abs(E)<1&&l>.01&&l<.99||(Ye(this,aa,l*i),oe(this,oa,vn).call(this,J(this,aa)))};oa=new WeakSet;vn=function(t){this.dispatchEvent(new s.CustomEvent(m.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};ms=new WeakSet;Uu=function(){J(this,Ht).stop();let t=Nu(this);this.dispatchEvent(new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};s.customElements.get("media-time-range")||s.customElements.define("media-time-range",En);var gs=En;var gi={PLACEMENT:"placement",BOUNDS:"bounds"},Bu=c.createElement("template");Bu.innerHTML=`
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
`;var fn=class extends s.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Fa(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}let a=getComputedStyle(this),r=(e=Oe(this,"#"+this.bounds))!=null?e:Z(this);if(!r)return;let{x:o,width:l}=r.getBoundingClientRect(),{x:d,width:u}=this.getBoundingClientRect(),E=d+u,b=o+l,g=a.getPropertyValue("--media-tooltip-offset-x"),v=g?parseFloat(g.replace("px","")):0,f=a.getPropertyValue("--media-tooltip-container-margin"),D=f?parseFloat(f.replace("px","")):0,T=d-o+v-D,k=E-b+v+D;if(T<0){this.style.setProperty("--media-tooltip-offset-x",`${T}px`);return}if(k>0){this.style.setProperty("--media-tooltip-offset-x",`${k}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Bu.content.cloneNode(!0))),this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[gi.PLACEMENT,gi.BOUNDS]}get placement(){return S(this,gi.PLACEMENT)}set placement(e){M(this,gi.PLACEMENT,e)}get bounds(){return S(this,gi.BOUNDS)}set bounds(e){M(this,gi.BOUNDS,e)}};s.customElements.get("media-tooltip")||s.customElements.define("media-tooltip",fn);var bs=fn;var Wh=1,Fh=t=>t.mediaMuted?0:t.mediaVolume,Vh=t=>`${Math.round(t*100)}%`,gn=class extends At{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME,n.MEDIA_MUTED,n.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{let e=this.range.value,i=new s.CustomEvent(m.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",h("volume"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===n.MEDIA_VOLUME||e===n.MEDIA_MUTED)&&(this.range.valueAsNumber=Fh(this),this.range.setAttribute("aria-valuetext",Vh(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return w(this,n.MEDIA_VOLUME,Wh)}set mediaVolume(e){x(this,n.MEDIA_VOLUME,e)}get mediaMuted(){return A(this,n.MEDIA_MUTED)}set mediaMuted(e){y(this,n.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return S(this,n.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){M(this,n.MEDIA_VOLUME_UNAVAILABLE,e)}};s.customElements.get("media-volume-range")||s.customElements.define("media-volume-range",gn);var _s=gn;var mb=I({tagName:"media-gesture-receiver",elementClass:jn,react:U.default}),hb=I({tagName:"media-container",elementClass:no,react:U.default}),pb=I({tagName:"media-controller",elementClass:Eo,react:U.default}),vb=I({tagName:"media-chrome-button",elementClass:bo,react:U.default}),Eb=I({tagName:"media-airplay-button",elementClass:_o,react:U.default}),fb=I({tagName:"media-captions-button",elementClass:Ao,react:U.default}),gb=I({tagName:"media-cast-button",elementClass:yo,react:U.default}),bb=I({tagName:"media-chrome-dialog",elementClass:xo,react:U.default}),_b=I({tagName:"media-chrome-range",elementClass:Wo,react:U.default}),Ab=I({tagName:"media-control-bar",elementClass:Fo,react:U.default}),yb=I({tagName:"media-text-display",elementClass:Vo,react:U.default}),Tb=I({tagName:"media-duration-display",elementClass:Go,react:U.default}),kb=I({tagName:"media-error-dialog",elementClass:qo,react:U.default}),Ib=I({tagName:"media-fullscreen-button",elementClass:Yo,react:U.default}),Sb=I({tagName:"media-live-button",elementClass:Zo,react:U.default}),Mb=I({tagName:"media-loading-indicator",elementClass:zo,react:U.default}),Cb=I({tagName:"media-mute-button",elementClass:Qo,react:U.default}),wb=I({tagName:"media-pip-button",elementClass:Xo,react:U.default}),Lb=I({tagName:"media-playback-rate-button",elementClass:es,react:U.default}),xb=I({tagName:"media-play-button",elementClass:ts,react:U.default}),Rb=I({tagName:"media-poster-image",elementClass:is,react:U.default}),Db=I({tagName:"media-preview-chapter-display",elementClass:as,react:U.default}),Pb=I({tagName:"media-preview-thumbnail",elementClass:rs,react:U.default}),Ub=I({tagName:"media-preview-time-display",elementClass:ns,react:U.default}),Ob=I({tagName:"media-seek-backward-button",elementClass:os,react:U.default}),Nb=I({tagName:"media-seek-forward-button",elementClass:ss,react:U.default}),Bb=I({tagName:"media-time-display",elementClass:ds,react:U.default}),Hb=I({tagName:"media-time-range",elementClass:gs,react:U.default}),$b=I({tagName:"media-tooltip",elementClass:bs,react:U.default}),Wb=I({tagName:"media-volume-range",elementClass:_s,react:U.default});var de=ct(require("react"),1);function Hu({anchor:t,floating:e,placement:i}){let a=Kh({anchor:t,floating:e}),{x:r,y:o}=Yh(a,i);return{x:r,y:o}}function Kh({anchor:t,floating:e}){return{anchor:qh(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}function qh(t,e){var i;let a=t.getBoundingClientRect(),r=(i=e==null?void 0:e.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}function Yh({anchor:t,floating:e},i){let a=Zh(i)==="x"?"y":"x",r=a==="y"?"height":"width",o=$u(i),l=t.x+t.width/2-e.width/2,d=t.y+t.height/2-e.height/2,u=t[r]/2-e[r]/2,E;switch(o){case"top":E={x:l,y:t.y-e.height};break;case"bottom":E={x:l,y:t.y+t.height};break;case"right":E={x:t.x+t.width,y:d};break;case"left":E={x:t.x-e.width,y:d};break;default:E={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":E[a]-=u;break;case"end":E[a]+=u;break}return E}function $u(t){return t.split("-")[0]}function Zh(t){return["top","bottom"].includes($u(t))?"y":"x"}var yt=class extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}},bn=class extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}};var Rs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},P=(t,e,i)=>(Rs(t,e,"read from private field"),i?i.call(t):e.get(t)),F=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ze=(t,e,i,a)=>(Rs(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),G=(t,e,i)=>(Rs(t,e,"access private method"),i),ze,Wt,Tt,_n,An,Ft,da,As,Wu,kn,yn,ys,Ts,Fu,ks,Vu,Is,Gu,bi,_i,Ai,ua,In,Ds,Ss,Ku,Ps,qu,Ms,Yu,Us,Zu,Cs,zu,ws,Qu,sa,Sn,Ls,Xu,la,Mn,Tn,xs;function Qe({type:t,text:e,value:i,checked:a}){let r=c.createElement("media-chrome-menu-item");r.type=t!=null?t:"",r.part.add("menu-item"),t&&r.part.add(t),r.value=i,r.checked=a;let o=c.createElement("span");return o.textContent=e,r.append(o),r}function Re(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if((i==null?void 0:i.nodeName)=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;let a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}var Ju=c.createElement("template");Ju.innerHTML=`
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
`;var $t={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"},j=class extends s.HTMLElement{constructor(){super(),F(this,As),F(this,yn),F(this,Ts),F(this,ks),F(this,Is),F(this,Ai),F(this,In),F(this,Ss),F(this,Ps),F(this,Ms),F(this,Us),F(this,Cs),F(this,ws),F(this,sa),F(this,Ls),F(this,la),F(this,Tn),F(this,ze,null),F(this,Wt,null),F(this,Tt,null),F(this,_n,new Set),F(this,An,void 0),F(this,Ft,!1),F(this,da,null),F(this,kn,()=>{let e=P(this,_n),i=new Set(this.items);for(let a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(let a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));Ze(this,_n,i)}),F(this,bi,()=>{G(this,Ai,ua).call(this),G(this,In,Ds).call(this,!1)}),F(this,_i,()=>{G(this,Ai,ua).call(this)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.nativeEl=this.constructor.template.content.cloneNode(!0),this.shadowRoot.append(this.nativeEl)),this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),this.shadowRoot.addEventListener("slotchange",this),Ze(this,An,new MutationObserver(P(this,kn))),P(this,An).observe(this.defaultSlot,{childList:!0})}static get observedAttributes(){return[$t.DISABLED,$t.HIDDEN,$t.STYLE,$t.ANCHOR,C.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":G(this,As,Wu).call(this,e);break;case"invoke":G(this,Ts,Fu).call(this,e);break;case"click":G(this,Ss,Ku).call(this,e);break;case"toggle":G(this,Ms,Yu).call(this,e);break;case"focusout":G(this,Cs,zu).call(this,e);break;case"keydown":G(this,ws,Qu).call(this,e);break}}connectedCallback(){var e,i;Ze(this,da,Jn(this.shadowRoot,":host")),G(this,yn,ys).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),Ze(this,ze,Ha(this)),(i=(e=P(this,ze))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(tt(ca(this),P(this,bi)),tt(this,P(this,_i)))}disconnectedCallback(){var e,i;it(ca(this),P(this,bi)),it(this,P(this,_i)),this.disable(),(i=(e=P(this,ze))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ze(this,ze,null)}attributeChangedCallback(e,i,a){var r,o,l,d;e===$t.HIDDEN&&a!==i?(P(this,Ft)||Ze(this,Ft,!0),this.hidden?G(this,Is,Gu).call(this):G(this,ks,Vu).call(this),this.dispatchEvent(new bn({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===C.MEDIA_CONTROLLER?(i&&((o=(r=P(this,ze))==null?void 0:r.unassociateElement)==null||o.call(r,this),Ze(this,ze,null)),a&&this.isConnected&&(Ze(this,ze,Ha(this)),(d=(l=P(this,ze))==null?void 0:l.associateElement)==null||d.call(l,this))):e===$t.DISABLED&&a!==i?a==null?this.enable():this.disable():e===$t.STYLE&&a!==i&&G(this,yn,ys).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=St(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(zh)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){let i=this.items.find(a=>a.value===e);i&&G(this,Tn,xs).call(this,i)}focus(){if(Ze(this,Wt,Bi()),this.items.length){G(this,la,Mn).call(this,this.items[0]),this.items[0].focus();return}let e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e==null||e.focus()}handleSelect(e){var i;let a=G(this,sa,Sn).call(this,e);a&&(G(this,Tn,xs).call(this,a,a.type==="checkbox"),P(this,Tt)&&!this.hidden&&((i=P(this,Wt))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;let{key:r}=e,o=this.items,l=(a=(i=G(this,sa,Sn).call(this,e))!=null?i:G(this,Ls,Xu).call(this))!=null?a:o[0],d=o.indexOf(l),u=Math.max(0,d);r==="ArrowDown"?u++:r==="ArrowUp"?u--:e.key==="Home"?u=0:e.key==="End"&&(u=o.length-1),u<0&&(u=o.length-1),u>o.length-1&&(u=0),G(this,la,Mn).call(this,o[u]),o[u].focus()}};ze=new WeakMap;Wt=new WeakMap;Tt=new WeakMap;_n=new WeakMap;An=new WeakMap;Ft=new WeakMap;da=new WeakMap;As=new WeakSet;Wu=function(t){let e=t.target;for(let i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();if(["header","title"].includes(e.name)){let i=this.shadowRoot.querySelector('slot[name="header"]');i.hidden=e.assignedNodes().length===0}e.name||P(this,kn).call(this)};kn=new WeakMap;yn=new WeakSet;ys=function(){var t;let e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")};Ts=new WeakSet;Fu=function(t){Ze(this,Tt,t.relatedTarget),le(this,t.relatedTarget)||(this.hidden=!this.hidden)};ks=new WeakSet;Vu=function(){var t;(t=P(this,Tt))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),tt(ca(this),P(this,bi)),tt(this,P(this,_i))};Is=new WeakSet;Gu=function(){var t;(t=P(this,Tt))==null||t.setAttribute("aria-expanded","false"),it(ca(this),P(this,bi)),it(this,P(this,_i))};bi=new WeakMap;_i=new WeakMap;Ai=new WeakSet;ua=function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;let{x:e,y:i}=Hu({anchor:this.anchorElement,floating:this,placement:"top-start"});t!=null||(t=this.offsetWidth);let r=ca(this).getBoundingClientRect(),o=r.width-e-t,l=r.height-i-this.offsetHeight,{style:d}=P(this,da);d.setProperty("position","absolute"),d.setProperty("right",`${Math.max(0,o)}px`),d.setProperty("--_menu-bottom",`${l}px`);let u=getComputedStyle(this),b=d.getPropertyValue("--_menu-bottom")===u.bottom?l:parseFloat(u.bottom),g=r.height-b-parseFloat(u.marginBottom);this.style.setProperty("--_menu-max-height",`${g}px`)};In=new WeakSet;Ds=function(t){let e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e==null?void 0:e.querySelector('[role="menu"]'),{style:a}=P(this,da);if(t||a.setProperty("--media-menu-transition-in","none"),i){let r=i.offsetHeight,o=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${o}px`),this.style.setProperty("min-height",`${r}px`),G(this,Ai,ua).call(this,o)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),G(this,Ai,ua).call(this);a.removeProperty("--media-menu-transition-in")};Ss=new WeakSet;Ku=function(t){var e;if(t.stopPropagation(),t.composedPath().includes(P(this,Ps,qu))){(e=P(this,Wt))==null||e.focus(),this.hidden=!0;return}let i=G(this,sa,Sn).call(this,t);!i||i.hasAttribute("disabled")||(G(this,la,Mn).call(this,i),this.handleSelect(t))};Ps=new WeakSet;qu=function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))};Ms=new WeakSet;Yu=function(t){if(t.target===this)return;G(this,Us,Zu).call(this);let e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(let i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new yt({relatedTarget:i}));for(let i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);G(this,In,Ds).call(this,!0)};Us=new WeakSet;Zu=function(){let e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)};Cs=new WeakSet;zu=function(t){var e;le(this,t.relatedTarget)||(P(this,Ft)&&((e=P(this,Wt))==null||e.focus()),P(this,Tt)&&P(this,Tt)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))};ws=new WeakSet;Qu=function(t){var e,i,a,r,o;let{key:l,ctrlKey:d,altKey:u,metaKey:E}=t;if(!(d||u||E)&&this.keysUsed.includes(l))if(t.preventDefault(),t.stopPropagation(),l==="Tab"){if(P(this,Ft)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else l==="Escape"?((o=P(this,Wt))==null||o.focus(),P(this,Ft)&&(this.hidden=!0)):l==="Enter"||l===" "?this.handleSelect(t):this.handleMove(t)};sa=new WeakSet;Sn=function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))};Ls=new WeakSet;Xu=function(){return this.items.find(t=>t.tabIndex===0)};la=new WeakSet;Mn=function(t){for(let e of this.items)e.tabIndex=e===t?0:-1};Tn=new WeakSet;xs=function(t,e){let i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};j.template=Ju;function zh(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t==null?void 0:t.role)}function ca(t){var e;return(e=t.getAttribute("bounds")?Oe(t,`#${t.getAttribute("bounds")}`):Z(t)||t.parentElement)!=null?e:t}s.customElements.get("media-chrome-menu")||s.customElements.define("media-chrome-menu",j);var Ws=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Je=(t,e,i)=>(Ws(t,e,"read from private field"),i?i.call(t):e.get(t)),st=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Os=(t,e,i,a)=>(Ws(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Xe=(t,e,i)=>(Ws(t,e,"access private method"),i),Cn,ha,Ns,ju,Fs,ec,Vs,tc,je,yi,pa,Bs,ic,wn,Hs,ac=c.createElement("template");ac.innerHTML=`
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
`;var ye={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"},et=class extends s.HTMLElement{constructor(){super(),st(this,Ns),st(this,Fs),st(this,Vs),st(this,yi),st(this,Bs),st(this,wn),st(this,Cn,!1),st(this,ha,void 0),st(this,je,()=>{var e,i;this.setAttribute("submenusize",`${this.submenuElement.items.length}`);let a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],o=(i=r==null?void 0:r.dataset.description)!=null?i:r==null?void 0:r.text,l=c.createElement("span");l.textContent=o!=null?o:"",a.replaceChildren(l)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.append(this.constructor.template.content.cloneNode(!0))),this.shadowRoot.addEventListener("slotchange",this)}static get observedAttributes(){return[ye.TYPE,ye.DISABLED,ye.CHECKED,ye.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),ma(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":Xe(this,Ns,ju).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":Xe(this,Bs,ic).call(this,e);break;case"keyup":Xe(this,yi,pa).call(this,e);break}}attributeChangedCallback(e,i,a){e===ye.CHECKED&&ma(this)&&!Je(this,Cn)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===ye.TYPE&&a!==i?this.role="menuitem"+a:e===ye.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(ye.DISABLED)||this.enable(),this.role="menuitem"+this.type,Os(this,ha,$s(this,this.parentNode)),Xe(this,wn,Hs).call(this)}disconnectedCallback(){this.disable(),Xe(this,wn,Hs).call(this),Os(this,ha,null)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=St(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(ye.TYPE))!=null?e:""}set type(e){this.setAttribute(ye.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(ye.VALUE))!=null?e:this.text}set value(e){this.setAttribute(ye.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(ma(this))return this.getAttribute("aria-checked")==="true"}set checked(e){ma(this)&&(Os(this,Cn,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){ma(this)||this.invokeTargetElement&&le(this,e.target)&&this.invokeTargetElement.dispatchEvent(new yt({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};Cn=new WeakMap;ha=new WeakMap;Ns=new WeakSet;ju=function(t){let e=t.target;if(!(e!=null&&e.name))for(let a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?Xe(this,Fs,ec).call(this):Xe(this,Vs,tc).call(this))};Fs=new WeakSet;ec=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",Je(this,je)),this.submenuElement.addEventListener("addmenuitem",Je(this,je)),this.submenuElement.addEventListener("removemenuitem",Je(this,je)),Je(this,je).call(this)};Vs=new WeakSet;tc=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",Je(this,je)),this.submenuElement.removeEventListener("addmenuitem",Je(this,je)),this.submenuElement.removeEventListener("removemenuitem",Je(this,je)),Je(this,je).call(this)};je=new WeakMap;yi=new WeakSet;pa=function(t){let{key:e}=t;if(!this.keysUsed.includes(e)){this.removeEventListener("keyup",Xe(this,yi,pa));return}this.handleClick(t)};Bs=new WeakSet;ic=function(t){let{metaKey:e,altKey:i,key:a}=t;if(e||i||!this.keysUsed.includes(a)){this.removeEventListener("keyup",Xe(this,yi,pa));return}this.addEventListener("keyup",Xe(this,yi,pa),{once:!0})};wn=new WeakSet;Hs=function(){var t;let e=(t=Je(this,ha))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(let a of e)a.setAttribute("aria-checked","false");i==null||i.setAttribute("aria-checked","true")};et.template=ac;function ma(t){return t.type==="radio"||t.type==="checkbox"}function $s(t,e){if(!t)return null;let{host:i}=t.getRootNode();return!e&&i?$s(t,i):e!=null&&e.items?e:$s(e,e==null?void 0:e.parentNode)}s.customElements.get("media-chrome-menu-item")||s.customElements.define("media-chrome-menu-item",et);var rc=c.createElement("template");rc.innerHTML=j.template.innerHTML+`
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
`;var Vt=class extends j{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Z(this).querySelector("media-settings-menu-button")}};Vt.template=rc;s.customElements.get("media-settings-menu")||s.customElements.define("media-settings-menu",Vt);var nc,Ln=c.createElement("template");Ln.innerHTML=et.template.innerHTML+`
  <style>
    slot:not([name="submenu"]) {
      opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
    }

    :host([aria-expanded="true"]:hover) {
      background: transparent;
    }
  </style>
`;(nc=Ln.content)!=null&&nc.querySelector&&(Ln.content.querySelector('slot[name="suffix"]').innerHTML=`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `);var Gt=class extends et{};Gt.template=Ln;s.customElements.get("media-settings-menu-item")||s.customElements.define("media-settings-menu-item",Gt);var se=class extends H{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=St(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new yt({relatedTarget:this}))}};s.customElements.get("media-chrome-menu-button")||s.customElements.define("media-chrome-menu-button",se);var oc=c.createElement("template");oc.innerHTML=`
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
`;var Ti=class extends se{static get observedAttributes(){return[...super.observedAttributes,"target"]}constructor(){super({slotTemplate:oc,tooltipContent:h("Settings")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Z(this).querySelector("media-settings-menu")}};s.customElements.get("media-settings-menu-button")||s.customElements.define("media-settings-menu-button",Ti);var Ys=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},sc=(t,e,i)=>(Ys(t,e,"read from private field"),i?i.call(t):e.get(t)),xn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Gs=(t,e,i,a)=>(Ys(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Rn=(t,e,i)=>(Ys(t,e,"access private method"),i),va,Un,Dn,Ks,Pn,qs,ki=class extends j{constructor(){super(...arguments),xn(this,Dn),xn(this,Pn),xn(this,va,[]),xn(this,Un,void 0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_AUDIO_TRACK_LIST,n.MEDIA_AUDIO_TRACK_ENABLED,n.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===n.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(Gs(this,va,Bl(a!=null?a:"")),Rn(this,Dn,Ks).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Rn(this,Pn,qs))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Rn(this,Pn,qs))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=Z(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return sc(this,va)}set mediaAudioTrackList(e){Gs(this,va,e),Rn(this,Dn,Ks).call(this)}get mediaAudioTrackEnabled(){var e;return(e=S(this,n.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){M(this,n.MEDIA_AUDIO_TRACK_ENABLED,e)}};va=new WeakMap;Un=new WeakMap;Dn=new WeakSet;Ks=function(){if(sc(this,Un)===JSON.stringify(this.mediaAudioTrackList))return;Gs(this,Un,JSON.stringify(this.mediaAudioTrackList));let t=this.mediaAudioTrackList;this.defaultSlot.textContent="";for(let e of t){let i=this.formatMenuItemText(e.label,e),a=Qe({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(Re(this,"checked-indicator")),this.defaultSlot.append(a)}};Pn=new WeakSet;qs=function(){if(this.value==null)return;let t=new s.CustomEvent(m.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-audio-track-menu")||s.customElements.define("media-audio-track-menu",ki);var Qh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`,lc=c.createElement("template");lc.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">${Qh}</slot>
`;var Ii=class extends se{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_AUDIO_TRACK_ENABLED,n.MEDIA_AUDIO_TRACK_UNAVAILABLE]}constructor(){super({slotTemplate:lc,tooltipContent:h("Audio")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("Audio"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Z(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=S(this,n.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){M(this,n.MEDIA_AUDIO_TRACK_ENABLED,e)}};s.customElements.get("media-audio-track-menu-button")||s.customElements.define("media-audio-track-menu-button",Ii);var Js=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Xh=(t,e,i)=>(Js(t,e,"read from private field"),i?i.call(t):e.get(t)),Zs=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Jh=(t,e,i,a)=>(Js(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),zs=(t,e,i)=>(Js(t,e,"access private method"),i),Nn,Qs,cc,On,Xs,jh=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`,mc=c.createElement("template");mc.innerHTML=j.template.innerHTML+`
  <slot name="captions-indicator" hidden>${jh}</slot>`;var Kt=class extends j{constructor(){super(...arguments),Zs(this,Qs),Zs(this,On),Zs(this,Nn,void 0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_LIST&&i!==a?zs(this,Qs,cc).call(this):e===n.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",zs(this,On,Xs))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",zs(this,On,Xs))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Z(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return dc(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){uc(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return dc(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){uc(this,n.MEDIA_SUBTITLES_SHOWING,e)}};Nn=new WeakMap;Qs=new WeakSet;cc=function(){var t;if(Xh(this,Nn)===JSON.stringify(this.mediaSubtitlesList))return;Jh(this,Nn,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";let e=!this.value,i=Qe({type:"radio",text:this.formatMenuItemText("Off"),value:"off",checked:e});i.prepend(Re(this,"checked-indicator")),this.defaultSlot.append(i);let a=this.mediaSubtitlesList;for(let r of a){let o=Qe({type:"radio",text:this.formatMenuItemText(r.label,r),value:Ja(r),checked:this.value==Ja(r)});o.prepend(Re(this,"checked-indicator")),((t=r.kind)!=null?t:"subs")==="captions"&&o.append(Re(this,"captions-indicator")),this.defaultSlot.append(o)}};On=new WeakSet;Xs=function(){let t=this.mediaSubtitlesShowing,e=this.getAttribute(n.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t!=null&&t.length&&i&&this.dispatchEvent(new s.CustomEvent(m.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;let a=new s.CustomEvent(m.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};Kt.template=mc;var dc=(t,e)=>{let i=t.getAttribute(e);return i?wt(i):[]},uc=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=rt(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-menu")||s.customElements.define("media-captions-menu",Kt);var ep=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},tp=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ip=(t,e,i,a)=>(ep(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),js,ap=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,rp=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,Ec=c.createElement("template");Ec.innerHTML=`
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
    <slot name="on">${ap}</slot>
    <slot name="off">${rp}</slot>
  </slot>
`;var hc=t=>{t.setAttribute("aria-checked",ja(t).toString())},Si=class extends se{constructor(e={}){super({slotTemplate:Ec,tooltipContent:h("Captions"),...e}),tp(this,js,void 0),ip(this,js,!1)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("closed captions")),hc(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_SHOWING&&hc(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Z(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return pc(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){vc(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return pc(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){vc(this,n.MEDIA_SUBTITLES_SHOWING,e)}};js=new WeakMap;var pc=(t,e)=>{let i=t.getAttribute(e);return i?wt(i):[]},vc=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=rt(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-menu-button")||s.customElements.define("media-captions-menu-button",Si);var fc=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Bn=(t,e,i)=>(fc(t,e,"read from private field"),i?i.call(t):e.get(t)),el=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ea=(t,e,i)=>(fc(t,e,"access private method"),i),Mi,fa,Hn,$n,il,tl={RATES:"rates"},Ci=class extends j{constructor(){super(),el(this,fa),el(this,$n),el(this,Mi,new Ne(this,tl.RATES,{defaultValue:jo})),Ea(this,fa,Hn).call(this)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,tl.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PLAYBACK_RATE&&i!=a?this.value=a:e===tl.RATES&&i!=a&&(Bn(this,Mi).value=a,Ea(this,fa,Hn).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Ea(this,$n,il))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Ea(this,$n,il))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Z(this).querySelector("media-playback-rate-menu-button")}get rates(){return Bn(this,Mi)}set rates(e){e?Array.isArray(e)&&(Bn(this,Mi).value=e.join(" ")):Bn(this,Mi).value="",Ea(this,fa,Hn).call(this)}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,li)}set mediaPlaybackRate(e){x(this,n.MEDIA_PLAYBACK_RATE,e)}};Mi=new WeakMap;fa=new WeakSet;Hn=function(){this.defaultSlot.textContent="";for(let t of this.rates){let e=Qe({type:"radio",text:this.formatMenuItemText(`${t}x`,t),value:t,checked:this.mediaPlaybackRate==t});e.prepend(Re(this,"checked-indicator")),this.defaultSlot.append(e)}};$n=new WeakSet;il=function(){if(!this.value)return;let t=new s.CustomEvent(m.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-playback-rate-menu")||s.customElements.define("media-playback-rate-menu",Ci);var np=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Wn=(t,e,i)=>(np(t,e,"read from private field"),i?i.call(t):e.get(t)),op=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},wi,al={RATES:"rates"},sp=[1,1.2,1.5,1.7,2],rl=1,gc=c.createElement("template");gc.innerHTML=`
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
`;var Li=class extends se{constructor(e={}){super({slotTemplate:gc,tooltipContent:h("Playback rate"),...e}),op(this,wi,new Ne(this,al.RATES,{defaultValue:sp})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${rl}x`}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,al.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===al.RATES&&(Wn(this,wi).value=a),e===n.MEDIA_PLAYBACK_RATE){let r=a?+a:Number.NaN,o=Number.isNaN(r)?rl:r;this.container.innerHTML=`${o}x`,this.setAttribute("aria-label",h("Playback rate {playbackRate}",{playbackRate:o}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Z(this).querySelector("media-playback-rate-menu")}get rates(){return Wn(this,wi)}set rates(e){e?Array.isArray(e)&&(Wn(this,wi).value=e.join(" ")):Wn(this,wi).value=""}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,rl)}set mediaPlaybackRate(e){x(this,n.MEDIA_PLAYBACK_RATE,e)}};wi=new WeakMap;s.customElements.get("media-playback-rate-menu-button")||s.customElements.define("media-playback-rate-menu-button",Li);var ol=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ga=(t,e,i)=>(ol(t,e,"read from private field"),i?i.call(t):e.get(t)),Fn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},bc=(t,e,i,a)=>(ol(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),xi=(t,e,i)=>(ol(t,e,"access private method"),i),ba,Di,Ri,_a,Vn,nl,Pi=class extends j{constructor(){super(...arguments),Fn(this,Ri),Fn(this,Vn),Fn(this,ba,[]),Fn(this,Di,{})}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_RENDITION_LIST,n.MEDIA_RENDITION_SELECTED,n.MEDIA_RENDITION_UNAVAILABLE,n.MEDIA_HEIGHT]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_RENDITION_SELECTED&&i!==a?(this.value=a!=null?a:"auto",xi(this,Ri,_a).call(this)):e===n.MEDIA_RENDITION_LIST&&i!==a?(bc(this,ba,Ol(a)),xi(this,Ri,_a).call(this)):e===n.MEDIA_HEIGHT&&i!==a&&xi(this,Ri,_a).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",xi(this,Vn,nl))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",xi(this,Vn,nl))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Z(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return ga(this,ba)}set mediaRenditionList(e){bc(this,ba,e),xi(this,Ri,_a).call(this)}get mediaRenditionSelected(){return S(this,n.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){M(this,n.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return w(this,n.MEDIA_HEIGHT)}set mediaHeight(e){x(this,n.MEDIA_HEIGHT,e)}};ba=new WeakMap;Di=new WeakMap;Ri=new WeakSet;_a=function(){if(ga(this,Di).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&ga(this,Di).mediaHeight===this.mediaHeight)return;ga(this,Di).mediaRenditionList=JSON.stringify(this.mediaRenditionList),ga(this,Di).mediaHeight=this.mediaHeight;let t=this.mediaRenditionList.sort((o,l)=>l.height-o.height);for(let o of t)o.selected=o.id===this.mediaRenditionSelected;this.defaultSlot.textContent="";let e=!this.mediaRenditionSelected;for(let o of t){let l=this.formatMenuItemText(`${Math.min(o.width,o.height)}p`,o),d=Qe({type:"radio",text:l,value:`${o.id}`,checked:o.selected&&!e});d.prepend(Re(this,"checked-indicator")),this.defaultSlot.append(d)}let i=e?this.formatMenuItemText(`Auto (${this.mediaHeight}p)`):this.formatMenuItemText("Auto"),a=Qe({type:"radio",text:i,value:"auto",checked:e}),r=this.mediaHeight>0?`Auto (${this.mediaHeight}p)`:"Auto";a.dataset.description=r,a.prepend(Re(this,"checked-indicator")),this.defaultSlot.append(a)};Vn=new WeakSet;nl=function(){if(this.value==null)return;let t=new s.CustomEvent(m.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-rendition-menu")||s.customElements.define("media-rendition-menu",Pi);var lp=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`,_c=c.createElement("template");_c.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">${lp}</slot>
`;var Ui=class extends se{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_RENDITION_SELECTED,n.MEDIA_RENDITION_UNAVAILABLE,n.MEDIA_HEIGHT]}constructor(){super({slotTemplate:_c,tooltipContent:h("Quality")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Z(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return S(this,n.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){M(this,n.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return w(this,n.MEDIA_HEIGHT)}set mediaHeight(e){x(this,n.MEDIA_HEIGHT,e)}};s.customElements.get("media-rendition-menu-button")||s.customElements.define("media-rendition-menu-button",Ui);var x_=I({tagName:"media-chrome-menu",elementClass:j,react:de.default}),R_=I({tagName:"media-chrome-menu-item",elementClass:et,react:de.default}),D_=I({tagName:"media-settings-menu",elementClass:Vt,react:de.default}),P_=I({tagName:"media-settings-menu-item",elementClass:Gt,react:de.default}),U_=I({tagName:"media-chrome-menu-button",elementClass:se,react:de.default}),O_=I({tagName:"media-settings-menu-button",elementClass:Ti,react:de.default}),N_=I({tagName:"media-audio-track-menu",elementClass:ki,react:de.default}),B_=I({tagName:"media-audio-track-menu-button",elementClass:Ii,react:de.default}),H_=I({tagName:"media-captions-menu",elementClass:Kt,react:de.default}),$_=I({tagName:"media-captions-menu-button",elementClass:Si,react:de.default}),W_=I({tagName:"media-playback-rate-menu",elementClass:Ci,react:de.default}),F_=I({tagName:"media-playback-rate-menu-button",elementClass:Li,react:de.default}),V_=I({tagName:"media-rendition-menu",elementClass:Pi,react:de.default}),G_=I({tagName:"media-rendition-menu-button",elementClass:Ui,react:de.default});var Gn=ct(require("react"));function sl(){return Gn.default.createElement(Gn.default.Fragment,null,Gn.default.createElement("template",{id:"news-theme",dangerouslySetInnerHTML:{__html:`
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
  </media-control-bar>`}}))}var up=!1,cp=!1,yc=({videoList:t,allowAdBlocker:e,...i})=>{let a=(0,me.useRef)(null),[r,o]=(0,me.useState)(up),[l,d]=(0,me.useState)(cp),[u,E]=(0,me.useState)(!0),[b,g]=(0,me.useState)(0),[v,f]=(0,me.useState)(!1),[D,T]=(0,me.useState)(0);function k(){f(!1),g(b+1),setTimeout(()=>{a.current.play()},200)}function R(V){f(!1),g(V),setTimeout(()=>{a.current.play()},200)}return me.default.createElement("div",null,me.default.createElement(sl,null),me.default.createElement(Ac.default,{...i,allowAdBlocker:e,ref:a,theme:"news-theme",themeProps:{controlBarVertical:!0,controlBarPlace:"start start"},key:`player-${D}`,playbackId:t[b].playbackId,style:{aspectRatio:"16/9"},muxVideoElement:"mux-video-ads",autoPlay:r,muted:l,maxResolution:"2160p",minResolution:"540p",renditionOrder:"desc",preferPlayback:"mse",adTagUrl:t[b].adTagUrl,onPlay:V=>{var Y;E(!1),(Y=i.onPlay)==null||Y.call(i,V)},onPause:V=>{var Y;E(!0),(Y=i.onPause)==null||Y.call(i,V)},onEnded:V=>{var Y;b<t.length-1?f(!0):(g(0),T(be=>be+1)),(Y=i.onEnded)==null||Y.call(i,V)}},me.default.createElement(Pa,{video:b<t.length-1?t[b+1]:t[0],relatedVideos:t,isVisible:v,selectVideoCallback:R,timerCallback:k})))};var mp=lt.default.forwardRef(({children:t,...e},i)=>lt.default.createElement("mux-player",Sl({...e,ref:i}),t)),K=(t,e,i)=>(0,lt.useEffect)(()=>{let a=e==null?void 0:e.current;if(!(!a||!i))return a.addEventListener(t,i),()=>{a.removeEventListener(t,i)}},[e==null?void 0:e.current,i]),hp=(t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:o,onLoadStart:l,onLoadedData:d,onLoadedMetadata:u,onProgress:E,onDurationChange:b,onVolumeChange:g,onRateChange:v,onResize:f,onWaiting:D,onPlay:T,onPlaying:k,onTimeUpdate:R,onPause:V,onSeeking:Y,onSeeked:be,onStalled:Te,onSuspend:N,onEnded:q,onError:ee,onCuePointChange:ke,onCuePointsChange:De,onChapterChange:Aa,metadata:ya,tokens:Ta,paused:ka,playbackId:Ia,playbackRates:Sa,currentTime:Kn,themeProps:ut,extraSourceParams:Ma,castCustomData:Ca,_hlsConfig:wa,...La}=e;return Me("playbackRates",Sa,t),Me("metadata",ya,t),Me("extraSourceParams",Ma,t),Me("_hlsConfig",wa,t),Me("themeProps",ut,t),Me("tokens",Ta,t),Me("playbackId",Ia,t),Me("castCustomData",Ca,t),Me("paused",ka,t,(Ie,Pe)=>{Pe!=null&&(Pe?Ie.pause():Ie.play())},(Ie,Pe,xa)=>Ie.hasAttribute("autoplay")&&!Ie.hasPlayed?!1:qn(Ie,Pe,xa)),Me("currentTime",Kn,t,(Ie,Pe)=>{Pe!=null&&(Ie.currentTime=Pe)}),K("abort",t,i),K("canplay",t,a),K("canplaythrough",t,r),K("emptied",t,o),K("loadstart",t,l),K("loadeddata",t,d),K("loadedmetadata",t,u),K("progress",t,E),K("durationchange",t,b),K("volumechange",t,g),K("ratechange",t,v),K("resize",t,f),K("waiting",t,D),K("play",t,T),K("playing",t,k),K("timeupdate",t,R),K("pause",t,V),K("seeking",t,Y),K("seeked",t,be),K("stalled",t,Te),K("suspend",t,N),K("ended",t,q),K("error",t,ee),K("cuepointchange",t,ke),K("cuepointschange",t,De),K("chapterchange",t,Aa),[La]},Ic=wl(),Sc="mux-player-react",pp=lt.default.forwardRef((t,e)=>{var l;let i=(0,kc.useRef)(null),a=Ml(i,e),[r]=hp(i,t),[o]=(0,lt.useState)((l=t.playerInitTime)!=null?l:(0,dt.generatePlayerInitTime)());return lt.default.createElement(mp,{ref:a,muxVideoElement:t.muxVideoElement,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:Sc,playerSoftwareVersion:Ic,playerInitTime:o,...r})}),vp=pp;
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
//# sourceMappingURL=index.cjs.js.map
