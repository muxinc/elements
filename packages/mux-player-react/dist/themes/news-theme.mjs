import D from"react";var sc=new Set(["style","children","ref","key","suppressContentEditableWarning","suppressHydrationWarning","dangerouslySetInnerHTML"]),lc={className:"class",htmlFor:"for"};function dc(t){return t.toLowerCase()}function uc(t){if(typeof t=="boolean")return t?"":void 0;if(typeof t!="function"&&!(typeof t=="object"&&t!==null))return t}function I({react:t,tagName:e,elementClass:i,events:a,displayName:r,toAttributeName:o=dc,toAttributeValue:l=uc}){let d=Number.parseInt(t.version)>=19,u=t.forwardRef((E,_)=>{var U,te,de,et,Ke;let g=t.useRef(null),v=t.useRef(new Map),f={},P={},k={},M={};for(let[W,G]of Object.entries(E)){if(sc.has(W)){k[W]=G;continue}let ie=o((U=lc[W])!=null?U:W);if(W in i.prototype&&!(W in((de=(te=globalThis.HTMLElement)==null?void 0:te.prototype)!=null?de:{}))&&!((et=i.observedAttributes)!=null&&et.some(tt=>tt===ie))){M[W]=G;continue}if(W.startsWith("on")){f[W]=G;continue}let qe=l(G);ie&&qe!=null&&(P[ie]=String(qe),d||(k[ie]=qe)),ie&&d&&(k[ie]=G)}if(typeof window!="undefined"){for(let W in f){let G=f[W],ie=W.endsWith("Capture"),qe=((Ke=a==null?void 0:a[W])!=null?Ke:W.slice(2).toLowerCase()).slice(0,ie?-7:void 0);t.useLayoutEffect(()=>{let tt=g==null?void 0:g.current;if(!(!tt||typeof G!="function"))return tt.addEventListener(qe,G,ie),()=>{tt.removeEventListener(qe,G,ie)}},[g==null?void 0:g.current,G])}t.useLayoutEffect(()=>{if(g.current===null)return;let W=new Map;for(let G in M)dl(g.current,G,M[G]),v.current.delete(G),W.set(G,M[G]);for(let[G,ie]of v.current)dl(g.current,G,void 0);v.current=W})}if(typeof window=="undefined"&&(i!=null&&i.getTemplateHTML)&&(i!=null&&i.shadowRootOptions)){let{mode:W,delegatesFocus:G}=i.shadowRootOptions,ie=t.createElement("template",{shadowrootmode:W,shadowrootdelegatesfocus:G,dangerouslySetInnerHTML:{__html:i.getTemplateHTML(P)}});k.children=[ie,k.children]}return t.createElement(e,{...k,ref:t.useCallback(W=>{g.current=W,typeof _=="function"?_(W):_!==null&&(_.current=W)},[_])})});return u.displayName=r!=null?r:i.name,u}function dl(t,e,i){var a,r;t[e]=i,i==null&&e in((r=(a=globalThis.HTMLElement)==null?void 0:a.prototype)!=null?r:{})&&t.removeAttribute(e)}var m={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},C={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},An={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_WIDTH:"mediaWidth"},ul=Object.entries(An),n=ul.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),cc={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},pt=ul.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...cc}),_h=Object.entries(pt).reduce((t,[e,i])=>{let a=n[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"}),cl=Object.entries(n).reduce((t,[e,i])=>{let a=pt[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),oe={SUBTITLES:"subtitles",CAPTIONS:"captions",DESCRIPTIONS:"descriptions",CHAPTERS:"chapters",METADATA:"metadata"},it={DISABLED:"disabled",HIDDEN:"hidden",SHOWING:"showing"};var Tn={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},me={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},_e={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"};var ml={INLINE:"inline",FULLSCREEN:"fullscreen",PICTURE_IN_PICTURE:"picture-in-picture"};function hl(t){return t==null?void 0:t.map(hc).join(" ")}function pl(t){return t==null?void 0:t.split(/\s+/).map(pc)}function hc(t){if(t){let{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}function pc(t){if(t){let[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}function vl(t){return t==null?void 0:t.map(vc).join(" ")}function El(t){return t==null?void 0:t.split(/\s+/).map(Ec)}function vc(t){if(t){let{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(o=>o!=null).join(":")}}function Ec(t){if(t){let[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}function Bt(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}var ma=t=>new Promise(e=>setTimeout(e,t));var fl=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],fc=(t,e)=>{let i=t===1?fl[e].singular:fl[e].plural;return`${t} ${i}`},vt=t=>{if(!Bt(t))return"";let e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0);return`${[a.getHours(),a.getMinutes(),a.getSeconds()].map((d,u)=>d&&fc(d,u)).filter(d=>d).join(", ")}${i?" remaining":""}`};function ye(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),o=Math.floor(t/3600),l=Math.floor(e/60%60),d=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(o=r=a="0"),o=o>0||d>0?o+":":"",r=((o||l>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+o+r+a}var Ih=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});var In={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute",live:"live","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."};var gl,bl,bc={en:In},_l=((bl=(gl=globalThis.navigator)==null?void 0:gl.language)==null?void 0:bl.split("-")[0])||"en",Al=t=>{_l=t};var h=(t,e={})=>{var i;return(((i=bc[_l])==null?void 0:i[t])||In[t]).replace(/\{(\w+)\}/g,(r,o)=>e[o]!==void 0?String(e[o]):`{${o}}`)};var ha=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},pa=class extends ha{},va=class extends pa{constructor(){super(...arguments),this.role=null}},Sn=class{observe(){}unobserve(){}disconnect(){}},Tl={createElement:function(){return new Ci.HTMLElement},createElementNS:function(){return new Ci.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},Ci={ResizeObserver:Sn,document:Tl,Node:pa,Element:va,HTMLElement:class extends va{constructor(){super(...arguments),this.innerHTML=""}get content(){return new Ci.DocumentFragment}},DocumentFragment:class extends ha{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}}},Il=typeof window=="undefined"||typeof window.customElements=="undefined",Sl=Object.keys(Ci).every(t=>t in globalThis),s=Il&&!Sl?Ci:globalThis,c=Il&&!Sl?Tl:globalThis.document;var yl=new WeakMap,yn=t=>{let e=yl.get(t);return e||yl.set(t,e=new Set),e},kl=new s.ResizeObserver(t=>{for(let e of t)for(let i of yn(e.target))i(e)});function Ye(t,e){yn(t).add(e),kl.observe(t)}function Ze(t,e){let i=yn(t);i.delete(e),i.size||kl.unobserve(t)}function Ml(t){let e={};for(let i of t)e[i.name]=i.value;return e}function V(t){var e;return(e=Ea(t))!=null?e:ke(t,"media-controller")}function Ea(t){var e;let{MEDIA_CONTROLLER:i}=C,a=t.getAttribute(i);if(a)return(e=Et(t))==null?void 0:e.getElementById(a)}var fa=(t,e,i=".value")=>{let a=t.querySelector(i);a&&(a.textContent=e)},_c=(t,e)=>{let i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},ga=(t,e)=>_c(t,e)[0],ne=(t,e)=>!t||!e?!1:t!=null&&t.contains(e)?!0:ne(t,e.getRootNode().host),ke=(t,e)=>{if(!t)return null;let i=t.closest(e);return i||ke(t.getRootNode().host,e)};function wi(t=document){var e;let i=t==null?void 0:t.activeElement;return i?(e=wi(i.shadowRoot))!=null?e:i:null}function Et(t){var e;let i=(e=t==null?void 0:t.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}function ba(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){let o=getComputedStyle(r);if(i&&o.opacity==="0"||a&&o.visibility==="hidden"||o.display==="none")return!1;r=r.parentElement,e--}return!0}function Cl(t,e,i,a){let r=a.x-i.x,o=a.y-i.y,l=r*r+o*o;if(l===0)return 0;let d=((t-i.x)*r+(e-i.y)*o)/l;return Math.max(0,Math.min(1,d))}function O(t,e){let i=Ac(t,a=>a===e);return i||kn(t,e)}function Ac(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let o;try{o=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(let l of o!=null?o:[])if(e(l.selectorText))return l}}function kn(t,e){var i,a;let r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],o=r==null?void 0:r[r.length-1];return o!=null&&o.sheet?(o==null||o.sheet.insertRule(`${e}{}`,o.sheet.cssRules.length),(a=o.sheet.cssRules)==null?void 0:a[o.sheet.cssRules.length-1]):(console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}})}function w(t,e,i=Number.NaN){let a=t.getAttribute(e);return a!=null?+a:i}function R(t,e,i){let a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}w(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}function A(t,e){return t.hasAttribute(e)}function T(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}A(t,e)!=i&&t.toggleAttribute(e,i)}function S(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}function y(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}let a=`${i}`;S(t,e,void 0)!==a&&t.setAttribute(e,a)}var wl=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},at=(t,e,i)=>(wl(t,e,"read from private field"),i?i.call(t):e.get(t)),Tc=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},_a=(t,e,i,a)=>(wl(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),se,Ll=c.createElement("template");Ll.innerHTML=`
<style>
  :host {
    display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
    box-sizing: border-box;
  }
</style>
`;var Aa=class extends s.HTMLElement{constructor(e={}){if(super(),Tc(this,se,void 0),!this.shadowRoot){let i=this.attachShadow({mode:"open"}),a=Ll.content.cloneNode(!0);this.nativeEl=a;let r=e.slotTemplate;r||(r=c.createElement("template"),r.innerHTML=`<slot>${e.defaultContent||""}</slot>`),this.nativeEl.appendChild(r.content.cloneNode(!0)),i.appendChild(a)}}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=at(this,se))==null?void 0:r.unassociateElement)==null||o.call(r,this),_a(this,se,null)),a&&this.isConnected&&(_a(this,se,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=at(this,se))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a,r;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),_a(this,se,Ic(this)),this.getAttribute(C.MEDIA_CONTROLLER)&&((i=(e=at(this,se))==null?void 0:e.associateElement)==null||i.call(e,this)),(a=at(this,se))==null||a.addEventListener("pointerdown",this),(r=at(this,se))==null||r.addEventListener("click",this)}disconnectedCallback(){var e,i,a,r;this.getAttribute(C.MEDIA_CONTROLLER)&&((i=(e=at(this,se))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=at(this,se))==null||a.removeEventListener("pointerdown",this),(r=at(this,se))==null||r.removeEventListener("click",this),_a(this,se,null)}handleEvent(e){var i;let a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a==null?void 0:a.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){let{clientX:o,clientY:l}=e,{left:d,top:u,width:E,height:_}=this.getBoundingClientRect(),g=o-d,v=l-u;if(g<0||v<0||g>E||v>_||E===0&&_===0)return;let{pointerType:f=this._pointerType}=e;if(this._pointerType=void 0,f===Tn.TOUCH){this.handleTap(e);return}else if(f===Tn.MOUSE){this.handleMouseClick(e);return}}}}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){T(this,n.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let i=this.mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new s.CustomEvent(i,{composed:!0,bubbles:!0}))}};se=new WeakMap;function Ic(t){var e;let i=t.getAttribute(C.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):ke(t,"media-controller")}s.customElements.get("media-gesture-receiver")||s.customElements.define("media-gesture-receiver",Aa);var Mn=Aa;var Rn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},pe=(t,e,i)=>(Rn(t,e,"read from private field"),i?i.call(t):e.get(t)),he=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ft=(t,e,i,a)=>(Rn(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ee=(t,e,i)=>(Rn(t,e,"access private method"),i),Sa,Ht,Ri,$t,Ta,Cn,Rl,Li,Ia,wn,xl,Ln,Dl,xi,ya,ka,xn,Wt,Di,b={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"},Ul=c.createElement("template");Ul.innerHTML=`
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

    :host(:not([${b.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
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

    
    :host([${b.AUDIO}]) slot[name=media] {
      display: var(--media-slot-display, none);
    }

    
    :host([${b.AUDIO}]) [part~=layer][part~=gesture-layer] {
      height: 0;
      display: block;
    }

    
    :host(:not([${b.AUDIO}])[${b.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
    :host(:not([${b.AUDIO}])[${b.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
      display: none;
    }

    
    ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
      pointer-events: auto;
    }

    :host(:not([${b.AUDIO}])) *[part~=layer][part~=centered-layer] {
      align-items: center;
      justify-content: center;
    }

    :host(:not([${b.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
    :host(:not([${b.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
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

    
    :host(:not([${b.AUDIO}])) .spacer {
      flex-grow: 1;
    }

    
    :host(:-webkit-full-screen) {
      
      width: 100% !important;
      height: 100% !important;
    }

    
    ::slotted(:not([slot=media]):not([slot=poster]):not([${b.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
      opacity: 1;
      transition: var(--media-control-transition-in, opacity 0.25s);
    }

    
    :host([${b.USER_INACTIVE}]:not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_AIRPLAYING}]):not([${n.MEDIA_IS_CASTING}]):not([${b.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${b.NO_AUTOHIDE}]):not([role=dialog])) {
      opacity: 0;
      transition: var(--media-control-transition-out, opacity 1s);
    }

    :host([${b.USER_INACTIVE}]:not([${b.NO_AUTOHIDE}]):not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_CASTING}]):not([${b.AUDIO}])) ::slotted([slot=media]) {
      cursor: none;
    }

    :host([${b.USER_INACTIVE}][${b.AUTOHIDE_OVER_CONTROLS}]:not([${b.NO_AUTOHIDE}]):not([${n.MEDIA_PAUSED}]):not([${n.MEDIA_IS_CASTING}]):not([${b.AUDIO}])) * {
     --media-cursor: none;
     cursor: none;
    }


    ::slotted(media-control-bar)  {
      align-self: stretch;
    }

    
    :host(:not([${b.AUDIO}])[${n.MEDIA_HAS_PLAYED}]) slot[name=poster] {
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
`;var Sc=Object.values(n),yc="sm:384 md:576 lg:768 xl:960";function kc(t){Pl(t.target,t.contentRect.width)}function Pl(t,e){var i;if(!t.isConnected)return;let a=(i=t.getAttribute(b.BREAKPOINTS))!=null?i:yc,r=Mc(a),o=Cc(r,e),l=!1;if(Object.keys(r).forEach(d=>{if(o.includes(d)){t.hasAttribute(`breakpoint${d}`)||(t.setAttribute(`breakpoint${d}`,""),l=!0);return}t.hasAttribute(`breakpoint${d}`)&&(t.removeAttribute(`breakpoint${d}`),l=!0)}),l){let d=new CustomEvent(pt.BREAKPOINTS_CHANGE,{detail:o});t.dispatchEvent(d)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(pt.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}function Mc(t){let e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}function Cc(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}var Ft=class extends s.HTMLElement{constructor(){super(),he(this,Cn),he(this,wn),he(this,Ln),he(this,xi),he(this,ka),he(this,Wt),he(this,Sa,0),he(this,Ht,null),he(this,Ri,null),he(this,$t,void 0),this.breakpointsComputed=!1,he(this,Ta,new MutationObserver(Ee(this,Cn,Rl).bind(this))),he(this,Li,!1),he(this,Ia,i=>{pe(this,Li)||(setTimeout(()=>{kc(i),ft(this,Li,!1)},0),ft(this,Li,!0))}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Ul.content.cloneNode(!0)));let e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){pe(this,Ht)&&this.mediaUnsetCallback(pe(this,Ht));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[b.AUTOHIDE,b.GESTURES_DISABLED].concat(Sc).filter(e=>![n.MEDIA_RENDITION_LIST,n.MEDIA_AUDIO_TRACK_LIST,n.MEDIA_CHAPTERS_CUES,n.MEDIA_WIDTH,n.MEDIA_HEIGHT,n.MEDIA_ERROR,n.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==b.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return(e==null?void 0:e.nodeName)=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(ft(this,Ht,e),e.localName.includes("-")&&await s.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;pe(this,Ta).observe(this,{childList:!0,subtree:!0}),Ye(this,pe(this,Ia));let a=this.getAttribute(b.AUDIO)!=null?h("audio player"):h("video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(b.USER_INACTIVE,""),Pl(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=s.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;pe(this,Ta).disconnect(),Ze(this,pe(this,Ia)),this.media&&this.mediaUnsetCallback(this.media),(e=s.window)==null||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){ft(this,Ht,null)}handleEvent(e){switch(e.type){case"pointerdown":ft(this,Sa,e.timeStamp);break;case"pointermove":Ee(this,wn,xl).call(this,e);break;case"pointerup":Ee(this,Ln,Dl).call(this,e);break;case"mouseleave":Ee(this,xi,ya).call(this);break;case"mouseup":this.removeAttribute(b.KEYBOARD_CONTROL);break;case"keyup":Ee(this,Wt,Di).call(this),this.setAttribute(b.KEYBOARD_CONTROL,"");break}}set autohide(e){let i=Number(e);ft(this,$t,isNaN(i)?0:i)}get autohide(){return(pe(this,$t)===void 0?2:pe(this,$t)).toString()}get breakpoints(){return S(this,b.BREAKPOINTS)}set breakpoints(e){y(this,b.BREAKPOINTS,e)}get audio(){return A(this,b.AUDIO)}set audio(e){T(this,b.AUDIO,e)}get gesturesDisabled(){return A(this,b.GESTURES_DISABLED)}set gesturesDisabled(e){T(this,b.GESTURES_DISABLED,e)}get keyboardControl(){return A(this,b.KEYBOARD_CONTROL)}set keyboardControl(e){T(this,b.KEYBOARD_CONTROL,e)}get noAutohide(){return A(this,b.NO_AUTOHIDE)}set noAutohide(e){T(this,b.NO_AUTOHIDE,e)}get autohideOverControls(){return A(this,b.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){T(this,b.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return A(this,b.USER_INACTIVE)}set userInteractive(e){T(this,b.USER_INACTIVE,e)}};Sa=new WeakMap;Ht=new WeakMap;Ri=new WeakMap;$t=new WeakMap;Ta=new WeakMap;Cn=new WeakSet;Rl=function(t){let e=this.media;for(let i of t){if(i.type!=="childList")continue;let a=i.removedNodes;for(let r of a){if(r.slot!="media"||i.target!=this)continue;let o=i.previousSibling&&i.previousSibling.previousElementSibling;if(!o||!e)this.mediaUnsetCallback(r);else{let l=o.slot!=="media";for(;(o=o.previousSibling)!==null;)o.slot=="media"&&(l=!1);l&&this.mediaUnsetCallback(r)}}if(e)for(let r of i.addedNodes)r===e&&this.handleMediaUpdated(e)}};Li=new WeakMap;Ia=new WeakMap;wn=new WeakSet;xl=function(t){if(t.pointerType!=="mouse"&&t.timeStamp-pe(this,Sa)<250)return;Ee(this,ka,xn).call(this),clearTimeout(pe(this,Ri));let e=this.hasAttribute(b.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&Ee(this,Wt,Di).call(this)};Ln=new WeakSet;Dl=function(t){if(t.pointerType==="touch"){let e=!this.hasAttribute(b.USER_INACTIVE);[this,this.media].includes(t.target)&&e?Ee(this,xi,ya).call(this):Ee(this,Wt,Di).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e==null?void 0:e.localName))&&Ee(this,Wt,Di).call(this)};xi=new WeakSet;ya=function(){if(pe(this,$t)<0||this.hasAttribute(b.USER_INACTIVE))return;this.setAttribute(b.USER_INACTIVE,"");let t=new s.CustomEvent(pt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)};ka=new WeakSet;xn=function(){if(!this.hasAttribute(b.USER_INACTIVE))return;this.removeAttribute(b.USER_INACTIVE);let t=new s.CustomEvent(pt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)};Wt=new WeakSet;Di=function(){Ee(this,ka,xn).call(this),clearTimeout(pe(this,Ri));let t=parseInt(this.autohide);t<0||ft(this,Ri,setTimeout(()=>{Ee(this,xi,ya).call(this)},t*1e3))};s.customElements.get("media-container")||s.customElements.define("media-container",Ft);var Dn=Ft;var Ol=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},X=(t,e,i)=>(Ol(t,e,"read from private field"),i?i.call(t):e.get(t)),Ui=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ma=(t,e,i,a)=>(Ol(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Vt,Gt,Ca,gt,Qe,rt,Me=class{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){Ui(this,Qe),Ui(this,Vt,void 0),Ui(this,Gt,void 0),Ui(this,Ca,void 0),Ui(this,gt,new Set),Ma(this,Vt,e),Ma(this,Gt,i),Ma(this,Ca,new Set(a))}[Symbol.iterator](){return X(this,Qe,rt).values()}get length(){return X(this,Qe,rt).size}get value(){var e;return(e=[...X(this,Qe,rt)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Ma(this,gt,new Set),this.add(...(i=e==null?void 0:e.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...X(this,Qe,rt)][e]}values(){return X(this,Qe,rt).values()}forEach(e,i){X(this,Qe,rt).forEach(e,i)}add(...e){var i,a;e.forEach(r=>X(this,gt).add(r)),!(this.value===""&&!((i=X(this,Vt))!=null&&i.hasAttribute(`${X(this,Gt)}`)))&&((a=X(this,Vt))==null||a.setAttribute(`${X(this,Gt)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>X(this,gt).delete(a)),(i=X(this,Vt))==null||i.setAttribute(`${X(this,Gt)}`,`${this.value}`)}contains(e){return X(this,Qe,rt).has(e)}toggle(e,i){return typeof i!="undefined"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}};Vt=new WeakMap;Gt=new WeakMap;Ca=new WeakMap;gt=new WeakMap;Qe=new WeakSet;rt=function(){return X(this,gt).size?X(this,gt):X(this,Ca)};var wc=(t="")=>t.split(/\s+/),Nl=(t="")=>{let[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?oe.CAPTIONS:oe.SUBTITLES,language:i,label:r}},bt=(t="",e={})=>wc(t).map(i=>{let a=Nl(i);return{...e,...a}}),Un=t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?Nl(e):e):typeof t=="string"?bt(t):[t]:[],wa=({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,ze=(t=[])=>Array.prototype.map.call(t,wa).join(" "),Lc=(t,e)=>i=>i[t]===e,Bl=t=>{let e=Object.entries(t).map(([i,a])=>Lc(i,a));return i=>e.every(a=>a(i))},_t=(t,e=[],i=[])=>{let a=Un(i).map(Bl),r=o=>a.some(l=>l(o));Array.from(e).filter(r).forEach(o=>{o.mode=t})},At=(t,e=()=>!0)=>{if(!(t!=null&&t.textTracks))return[];let i=typeof e=="function"?e:Bl(e);return Array.from(t.textTracks).filter(i)},La=t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(n.MEDIA_SUBTITLES_SHOWING)};var $l=t=>{var e;let{media:i,fullscreenElement:a}=t;try{let r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){let o=(e=a[r])==null?void 0:e.call(a);if(o instanceof Promise)return o.catch(()=>{})}else i!=null&&i.webkitEnterFullscreen?i.webkitEnterFullscreen():i!=null&&i.requestFullscreen&&i.requestFullscreen()}catch(r){console.error(r)}},Hl="exitFullscreen"in c?"exitFullscreen":"webkitExitFullscreen"in c?"webkitExitFullscreen":"webkitCancelFullScreen"in c?"webkitCancelFullScreen":void 0,Wl=t=>{var e;let{documentElement:i}=t;if(Hl){let a=(e=i==null?void 0:i[Hl])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},Pi="fullscreenElement"in c?"fullscreenElement":"webkitFullscreenElement"in c?"webkitFullscreenElement":void 0,Rc=t=>{let{documentElement:e,media:i}=t,a=e==null?void 0:e[Pi];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===ml.FULLSCREEN?i:a},Fl=t=>{var e;let{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;let o=Rc(t);if(!o)return!1;if(o===r||o===i)return!0;if(o.localName.includes("-")){let l=o.shadowRoot;if(!(Pi in l))return ne(o,r);for(;l!=null&&l[Pi];){if(l[Pi]===r)return!0;l=(e=l[Pi])==null?void 0:e.shadowRoot}}return!1},xc="fullscreenEnabled"in c?"fullscreenEnabled":"webkitFullscreenEnabled"in c?"webkitFullscreenEnabled":void 0,Vl=t=>{let{documentElement:e,media:i}=t;return!!(e!=null&&e[xc])||i&&"webkitSupportsFullscreen"in i};var Ra,Pn=()=>{var t,e;return Ra||(Ra=(e=(t=c)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),Ra)},Gl=async(t=Pn())=>{if(!t)return!1;let e=t.volume;t.volume=e/2+.1;let i=new AbortController,a=await Promise.race([Dc(t,i.signal),Uc(t,e)]);return i.abort(),a},Dc=(t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),Uc=async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await ma(10)}return t.volume!==e},Pc=/.*Version\/.*Safari\/.*/.test(s.navigator.userAgent),On=(t=Pn())=>s.matchMedia("(display-mode: standalone)").matches&&Pc?!1:typeof(t==null?void 0:t.requestPictureInPicture)=="function",Nn=(t=Pn())=>Vl({documentElement:c,media:t}),Kl=Nn(),ql=On(),Yl=!!s.WebKitPlaybackTargetAvailabilityEvent,Zl=!!s.chrome;var Kt=t=>At(t.media,e=>[oe.SUBTITLES,oe.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),Bn=t=>At(t.media,e=>e.mode===it.SHOWING&&[oe.SUBTITLES,oe.CAPTIONS].includes(e.kind)),xa=(t,e)=>{let i=Kt(t),a=Bn(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)_t(it.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let o=i[0],{options:l}=t;if(!(l!=null&&l.noSubtitlesLangPref)){let _=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),g=_?[_,...globalThis.navigator.languages]:globalThis.navigator.languages,v=i.filter(f=>g.some(P=>f.language.toLowerCase().startsWith(P.split("-")[0]))).sort((f,P)=>{let k=g.findIndex(U=>f.language.toLowerCase().startsWith(U.split("-")[0])),M=g.findIndex(U=>P.language.toLowerCase().startsWith(U.split("-")[0]));return k-M});v[0]&&(o=v[0])}let{language:d,label:u,kind:E}=o;_t(it.DISABLED,i,a),_t(it.SHOWING,i,[{language:d,label:u,kind:E}])}}},Da=(t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?Oc(t,e):Object.entries(t).every(([i,a])=>i in e&&Da(a,e[i])),Oc=(t,e)=>{let i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,o)=>Da(r,e[o])):!0};var Nc=Object.values(_e),Ua,Bc=Gl().then(t=>(Ua=t,Ua)),Ql=async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof s.HTMLElement))return;let i=e.localName;if(!i.includes("-"))return;let a=s.customElements.get(i);a&&e instanceof a||(await s.customElements.whenDefined(i),s.customElements.upgrade(e))}))},qt={mediaError:{get(t,e){let{media:i}=t;if((e==null?void 0:e.type)!=="playing")return i==null?void 0:i.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;let{media:a}=t;if((e==null?void 0:e.type)!=="playing")return(i=a==null?void 0:a.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;let{media:r}=t;if((e==null?void 0:e.type)!=="playing")return(a=(i=r==null?void 0:r.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.paused)!=null?e:!0},set(t,e){var i;let{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){let{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.playbackRate)!=null?e:1},set(t,e){let{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.muted)!=null?e:!1},set(t,e){let{media:i}=e;if(i){try{s.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(a){console.debug("Error setting muted pref",a)}i.muted=t}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{let{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{let r=s.localStorage.getItem("media-chrome-pref-muted")==="true";qt.mediaMuted.set(r,e),t(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaVolume:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.volume)!=null?e:1},set(t,e){let{media:i}=e;if(i){try{t==null?s.localStorage.removeItem("media-chrome-pref-volume"):s.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(a){console.debug("Error setting volume pref",a)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{let{options:{noVolumePref:i}}=e;if(!i)try{let{media:a}=e;if(!a)return;let r=s.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;qt.mediaVolume.set(+r,e),t(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){let{media:e}=t;return typeof(e==null?void 0:e.volume)=="undefined"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;let{media:i}=t;return(e=i==null?void 0:i.currentTime)!=null?e:0},set(t,e){let{media:i}=e;!i||!Bt(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){let{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e==null?void 0:e.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){let{media:e}=t;return(e==null?void 0:e.readyState)<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;let{media:i}=t;if(!((e=i==null?void 0:i.seekable)!=null&&e.length))return;let a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;let{media:i}=t,a=(e=i==null?void 0:i.buffered)!=null?e:[];return Array.from(a).map((r,o)=>[Number(a.start(o).toFixed(3)),Number(a.end(o).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){let{media:e,options:{defaultStreamType:i}={}}=t,a=[_e.LIVE,_e.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;let{streamType:r}=e;if(Nc.includes(r))return r===_e.UNKNOWN?a:r;let o=e.duration;return o===1/0?_e.LIVE:Number.isFinite(o)?_e.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){let{media:e}=t;if(!e)return Number.NaN;let{targetLiveWindow:i}=e,a=qt.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===_e.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){let{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(qt.mediaStreamType.get(t)===_e.LIVE))return!1;let r=e.seekable;if(!r)return!0;if(!r.length)return!1;let o=r.end(r.length-1)-i;return e.currentTime>=o},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return Kt(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return Bn(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;let{media:r,options:o}=e;if(!r)return;let l=d=>{var u;!o.defaultSubtitles||d&&![oe.CAPTIONS,oe.SUBTITLES].includes((u=d==null?void 0:d.track)==null?void 0:u.kind)||xa(e,!0)};return r.addEventListener("loadstart",l),(i=r.textTracks)==null||i.addEventListener("addtrack",l),(a=r.textTracks)==null||a.addEventListener("removetrack",l),()=>{var d,u;r.removeEventListener("loadstart",l),(d=r.textTracks)==null||d.removeEventListener("addtrack",l),(u=r.textTracks)==null||u.removeEventListener("removetrack",l)}}]},mediaChaptersCues:{get(t){var e;let{media:i}=t;if(!i)return[];let[a]=At(i,{kind:oe.CHAPTERS});return Array.from((e=a==null?void 0:a.cues)!=null?e:[]).map(({text:r,startTime:o,endTime:l})=>({text:r,startTime:o,endTime:l}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;if(!a)return;let r=a.querySelector('track[kind="chapters"][default][src]'),o=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r==null||r.addEventListener("load",t),o==null||o.addEventListener("load",t),()=>{r==null||r.removeEventListener("load",t),o==null||o.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;let{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?ne(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let o=r.pictureInPictureElement.shadowRoot;for(;o!=null&&o.pictureInPictureElement;){if(o.pictureInPictureElement===a)return!0;o=(i=o.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){let{media:i}=e;if(i)if(t){if(!c.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}let a=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){let o=()=>{i.removeEventListener("loadedmetadata",l),i.preload="none"},l=()=>{i.requestPictureInPicture().catch(a),o()};i.addEventListener("loadedmetadata",l),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),o()},1e3)}else throw r}else throw r})}else c.pictureInPictureElement&&c.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;let{media:i}=t;return[...(e=i==null?void 0:i.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;let{media:r}=t;return(a=(i=r==null?void 0:r.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){let{media:i}=e;if(!(i!=null&&i.videoRenditions)){console.warn("MediaController: Rendition selection not supported by this media.");return}let a=t,r=Array.prototype.findIndex.call(i.videoRenditions,o=>o.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;let{media:i}=t;return[...(e=i==null?void 0:i.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;let{media:a}=t;return(i=[...(e=a==null?void 0:a.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){let{media:i}=e;if(!(i!=null&&i.audioTracks)){console.warn("MediaChrome: Audio track selection not supported by this media.");return}let a=t;for(let r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return Fl(t)},set(t,e){t?$l(e):Wl(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;let{media:i}=t;return!(i!=null&&i.remote)||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;let{media:r}=e;if(r&&!(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){let{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&s.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){let{media:e}=t;if(!Kl||!Nn(e))return me.UNSUPPORTED}},mediaPipUnavailable:{get(t){let{media:e}=t;if(!ql||!On(e))return me.UNSUPPORTED}},mediaVolumeUnavailable:{get(t){let{media:e}=t;if(Ua===!1||(e==null?void 0:e.volume)==null)return me.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{Ua==null&&Bc.then(e=>t(e?void 0:me.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;let{media:a}=t;if(!Zl||!((i=a==null?void 0:a.remote)!=null&&i.state))return me.UNSUPPORTED;if(!(e==null||e==="available"))return me.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(o=>{t({availability:o?"available":"not-available"})}).catch(o=>{o.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var o;(o=a==null?void 0:a.remote)==null||o.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!Yl)return me.UNSUPPORTED;if((e==null?void 0:e.availability)==="not-available")return me.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;let{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a==null?void 0:a.remote)==null||i.watchAvailability(o=>{t({availability:o?"available":"not-available"})}).catch(o=>{o.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var o;(o=a==null?void 0:a.remote)==null||o.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;let{media:i}=t;if(!(i!=null&&i.videoRenditions))return me.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return me.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;let{media:a}=t;if(!(a!=null&&a.audioTracks))return me.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return me.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]}};var zl={[m.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,o;let{media:l}=e,d=i!=null?i:void 0,u,E;if(l&&d!=null){let[f]=At(l,{kind:oe.METADATA,label:"thumbnails"}),P=Array.prototype.find.call((a=f==null?void 0:f.cues)!=null?a:[],(k,M,U)=>M===0?k.endTime>d:M===U.length-1?k.startTime<=d:k.startTime<=d&&k.endTime>d);if(P){let k=/'^(?:[a-z]+:)?\/\//i.test(P.text)||(r=l==null?void 0:l.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,M=new URL(P.text,k);E=new URLSearchParams(M.hash).get("#xywh").split(",").map(te=>+te),u=M.href}}let _=t.mediaDuration.get(e),v=(o=t.mediaChaptersCues.get(e).find((f,P,k)=>P===k.length-1&&_===f.endTime?f.startTime<=d&&f.endTime>=d:f.startTime<=d&&f.endTime>d))==null?void 0:o.text;return i!=null&&v==null&&(v=""),{mediaPreviewTime:d,mediaPreviewImage:u,mediaPreviewCoords:E,mediaPreviewChapter:v}},[m.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[m.MEDIA_PLAY_REQUEST](t,e){var i,a,r,o;let l="mediaPaused",u=t.mediaStreamType.get(e)===_e.LIVE,E=!((i=e.options)!=null&&i.noAutoSeekToLive),_=t.mediaTargetLiveWindow.get(e)>0;if(u&&E&&!_){let g=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(g){let v=(o=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?o:0,f=g-v;t.mediaCurrentTime.set(f,e)}}t[l].set(!1,e)},[m.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){let a="mediaPlaybackRate",r=i;t[a].set(r,e)},[m.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[m.MEDIA_UNMUTE_REQUEST](t,e){let i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[m.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){let a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[m.MEDIA_SEEK_REQUEST](t,e,{detail:i}){let a="mediaCurrentTime",r=i;t[a].set(r,e)},[m.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;let o="mediaCurrentTime",l=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(l)))return;let d=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,u=l-d;t[o].set(u,e)},[m.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;let{options:r}=e,o=Kt(e),l=Un(i),d=(a=l[0])==null?void 0:a.language;d&&!r.noSubtitlesLangPref&&s.localStorage.setItem("media-chrome-pref-subtitles-lang",d),_t(it.SHOWING,o,l)},[m.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){let a=Kt(e),r=i!=null?i:[];_t(it.DISABLED,a,r)},[m.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){xa(e,i)},[m.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){let a="mediaRenditionSelected",r=i;t[a].set(r,e)},[m.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){let a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[m.MEDIA_ENTER_PIP_REQUEST](t,e){let i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[m.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e){let i="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[m.MEDIA_ENTER_CAST_REQUEST](t,e){let i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[m.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[m.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}};var Xl=({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=qt,requestMap:r=zl,options:o={},monitorStateOwnersOnlyWithSubscriptions:l=!0})=>{let d=[],u={options:{...o}},E=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),_=k=>{k!=null&&(Da(k,E)||(E=Object.freeze({...E,...k}),d.forEach(M=>M(E))))},g=()=>{let k=Object.entries(a).reduce((M,[U,{get:te}])=>(M[U]=te(u),M),{});_(k)},v={},f,P=async(k,M)=>{var U,te,de,et,Ke,W,G,ie,qe,tt,Os,Ns,Bs,Hs,$s,Ws;let ju=!!f;if(f={...u,...f!=null?f:{},...k},ju)return;await Ql(...Object.values(k));let Ot=d.length>0&&M===0&&l,Fs=u.media!==f.media,Vs=((U=u.media)==null?void 0:U.textTracks)!==((te=f.media)==null?void 0:te.textTracks),Gs=((de=u.media)==null?void 0:de.videoRenditions)!==((et=f.media)==null?void 0:et.videoRenditions),Ks=((Ke=u.media)==null?void 0:Ke.audioTracks)!==((W=f.media)==null?void 0:W.audioTracks),qs=((G=u.media)==null?void 0:G.remote)!==((ie=f.media)==null?void 0:ie.remote),Ys=u.documentElement!==f.documentElement,Zs=!!u.media&&(Fs||Ot),Qs=!!((qe=u.media)!=null&&qe.textTracks)&&(Vs||Ot),zs=!!((tt=u.media)!=null&&tt.videoRenditions)&&(Gs||Ot),Xs=!!((Os=u.media)!=null&&Os.audioTracks)&&(Ks||Ot),Js=!!((Ns=u.media)!=null&&Ns.remote)&&(qs||Ot),js=!!u.documentElement&&(Ys||Ot),el=Zs||Qs||zs||Xs||Js||js,Nt=d.length===0&&M===1&&l,tl=!!f.media&&(Fs||Nt),il=!!((Bs=f.media)!=null&&Bs.textTracks)&&(Vs||Nt),al=!!((Hs=f.media)!=null&&Hs.videoRenditions)&&(Gs||Nt),rl=!!(($s=f.media)!=null&&$s.audioTracks)&&(Ks||Nt),nl=!!((Ws=f.media)!=null&&Ws.remote)&&(qs||Nt),ol=!!f.documentElement&&(Ys||Nt),sl=tl||il||al||rl||nl||ol;if(!(el||sl)){Object.entries(f).forEach(([B,Mi])=>{u[B]=Mi}),g(),f=void 0;return}Object.entries(a).forEach(([B,{get:Mi,mediaEvents:ec=[],textTracksEvents:tc=[],videoRenditionsEvents:ic=[],audioTracksEvents:ac=[],remoteEvents:rc=[],rootEvents:nc=[],stateOwnersUpdateHandlers:oc=[]}])=>{v[B]||(v[B]={});let ue=q=>{let ce=Mi(u,q);_({[B]:ce})},z;z=v[B].mediaEvents,ec.forEach(q=>{z&&Zs&&(u.media.removeEventListener(q,z),v[B].mediaEvents=void 0),tl&&(f.media.addEventListener(q,ue),v[B].mediaEvents=ue)}),z=v[B].textTracksEvents,tc.forEach(q=>{var ce,be;z&&Qs&&((ce=u.media.textTracks)==null||ce.removeEventListener(q,z),v[B].textTracksEvents=void 0),il&&((be=f.media.textTracks)==null||be.addEventListener(q,ue),v[B].textTracksEvents=ue)}),z=v[B].videoRenditionsEvents,ic.forEach(q=>{var ce,be;z&&zs&&((ce=u.media.videoRenditions)==null||ce.removeEventListener(q,z),v[B].videoRenditionsEvents=void 0),al&&((be=f.media.videoRenditions)==null||be.addEventListener(q,ue),v[B].videoRenditionsEvents=ue)}),z=v[B].audioTracksEvents,ac.forEach(q=>{var ce,be;z&&Xs&&((ce=u.media.audioTracks)==null||ce.removeEventListener(q,z),v[B].audioTracksEvents=void 0),rl&&((be=f.media.audioTracks)==null||be.addEventListener(q,ue),v[B].audioTracksEvents=ue)}),z=v[B].remoteEvents,rc.forEach(q=>{var ce,be;z&&Js&&((ce=u.media.remote)==null||ce.removeEventListener(q,z),v[B].remoteEvents=void 0),nl&&((be=f.media.remote)==null||be.addEventListener(q,ue),v[B].remoteEvents=ue)}),z=v[B].rootEvents,nc.forEach(q=>{z&&js&&(u.documentElement.removeEventListener(q,z),v[B].rootEvents=void 0),ol&&(f.documentElement.addEventListener(q,ue),v[B].rootEvents=ue)});let ll=v[B].stateOwnersUpdateHandlers;oc.forEach(q=>{ll&&el&&ll(),sl&&(v[B].stateOwnersUpdateHandlers=q(ue,f))})}),Object.entries(f).forEach(([B,Mi])=>{u[B]=Mi}),g(),f=void 0};return P({media:t,fullscreenElement:e,documentElement:i,options:o}),{dispatch(k){let{type:M,detail:U}=k;if(r[M]&&E.mediaErrorCode==null){_(r[M](a,u,k));return}M==="mediaelementchangerequest"?P({media:U}):M==="fullscreenelementchangerequest"?P({fullscreenElement:U}):M==="documentelementchangerequest"?P({documentElement:U}):M==="optionschangerequest"&&Object.entries(U!=null?U:{}).forEach(([te,de])=>{u.options[te]=de})},getState(){return E},subscribe(k){return P({},d.length+1),d.push(k),k(E),()=>{let M=d.indexOf(k);M>=0&&(P({},d.length-1),d.splice(M,1))}}}};var Fn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},L=(t,e,i)=>(Fn(t,e,"read from private field"),i?i.call(t):e.get(t)),Xe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},nt=(t,e,i,a)=>(Fn(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ot=(t,e,i)=>(Fn(t,e,"access private method"),i),It,Oi,H,Ni,Ce,Pa,Oa,Hn,Yt,Bi,Na,$n,id=["ArrowLeft","ArrowRight","Enter"," ","f","m","k","c"],Jl=10,p={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYS_USED:"keysused",LIVE_EDGE_OFFSET:"liveedgeoffset",SEEK_TO_LIVE_OFFSET:"seektoliveoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_HOTKEYS:"nohotkeys",NO_VOLUME_PREF:"novolumepref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_DEFAULT_STORE:"nodefaultstore",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",LANG:"lang"},Ba=class extends Ft{constructor(){super(),Xe(this,Oa),Xe(this,Yt),Xe(this,Na),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,Xe(this,It,new Me(this,p.HOTKEYS)),Xe(this,Oi,void 0),Xe(this,H,void 0),Xe(this,Ni,void 0),Xe(this,Ce,void 0),Xe(this,Pa,i=>{var a;(a=L(this,H))==null||a.dispatch(i)}),this.associateElement(this);let e={};nt(this,Ni,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);let o=a.toLowerCase(),l=new s.CustomEvent(cl[o],{composed:!0,detail:r});this.dispatchEvent(l)}),e=i}),this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(p.NO_HOTKEYS,p.HOTKEYS,p.DEFAULT_STREAM_TYPE,p.DEFAULT_SUBTITLES,p.DEFAULT_DURATION,p.LANG)}get mediaStore(){return L(this,H)}set mediaStore(e){var i,a;if(L(this,H)&&((i=L(this,Ce))==null||i.call(this),nt(this,Ce,void 0)),nt(this,H,e),!L(this,H)&&!this.hasAttribute(p.NO_DEFAULT_STORE)){ot(this,Oa,Hn).call(this);return}nt(this,Ce,(a=L(this,H))==null?void 0:a.subscribe(L(this,Ni)))}get fullscreenElement(){var e;return(e=L(this,Oi))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(p.FULLSCREEN_ELEMENT)&&this.removeAttribute(p.FULLSCREEN_ELEMENT),nt(this,Oi,e),(i=L(this,H))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return A(this,p.DEFAULT_SUBTITLES)}set defaultSubtitles(e){T(this,p.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return S(this,p.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){y(this,p.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return w(this,p.DEFAULT_DURATION)}set defaultDuration(e){R(this,p.DEFAULT_DURATION,e)}get noHotkeys(){return A(this,p.NO_HOTKEYS)}set noHotkeys(e){T(this,p.NO_HOTKEYS,e)}get keysUsed(){return S(this,p.KEYS_USED)}set keysUsed(e){y(this,p.KEYS_USED,e)}get liveEdgeOffset(){return w(this,p.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){R(this,p.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return A(this,p.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){T(this,p.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return A(this,p.NO_VOLUME_PREF)}set noVolumePref(e){T(this,p.NO_VOLUME_PREF,e)}get noSubtitlesLangPref(){return A(this,p.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){T(this,p.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return A(this,p.NO_DEFAULT_STORE)}set noDefaultStore(e){T(this,p.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var r,o,l,d,u,E,_,g;if(super.attributeChangedCallback(e,i,a),e===p.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(p.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===p.HOTKEYS)L(this,It).value=a;else if(e===p.DEFAULT_SUBTITLES&&a!==i)(r=L(this,H))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(p.DEFAULT_SUBTITLES)}});else if(e===p.DEFAULT_STREAM_TYPE)(l=L(this,H))==null||l.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(o=this.getAttribute(p.DEFAULT_STREAM_TYPE))!=null?o:void 0}});else if(e===p.LIVE_EDGE_OFFSET)(d=L(this,H))==null||d.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(p.LIVE_EDGE_OFFSET)}});else if(e===p.SEEK_TO_LIVE_OFFSET)(u=L(this,H))==null||u.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===p.NO_AUTO_SEEK_TO_LIVE)(E=L(this,H))==null||E.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(p.NO_AUTO_SEEK_TO_LIVE)}});else if(e===p.FULLSCREEN_ELEMENT){let v=a?(_=this.getRootNode())==null?void 0:_.getElementById(a):void 0;nt(this,Oi,v),(g=L(this,H))==null||g.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===p.LANG&&a!==i&&Al(a)}connectedCallback(){var e,i;!L(this,H)&&!this.hasAttribute(p.NO_DEFAULT_STORE)&&ot(this,Oa,Hn).call(this),(e=L(this,H))==null||e.dispatch({type:"documentelementchangerequest",detail:c}),super.connectedCallback(),L(this,H)&&!L(this,Ce)&&nt(this,Ce,(i=L(this,H))==null?void 0:i.subscribe(L(this,Ni))),this.enableHotkeys()}disconnectedCallback(){var e,i,a,r;(e=super.disconnectedCallback)==null||e.call(this),L(this,H)&&((i=L(this,H))==null||i.dispatch({type:"documentelementchangerequest",detail:void 0}),(a=L(this,H))==null||a.dispatch({type:m.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})),L(this,Ce)&&((r=L(this,Ce))==null||r.call(this),nt(this,Ce,void 0))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=L(this,H))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=L(this,H))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){td(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:i}=this;if(i.has(e))return;let a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),o=Gc(e,a,r);Object.values(m).forEach(l=>{e.addEventListener(l,L(this,Pa))}),i.set(e,o)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(m).forEach(r=>{e.removeEventListener(r,L(this,Pa))})}registerMediaStateReceiver(e){if(!e)return;let i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),L(this,H)&&Object.entries(L(this,H).getState()).forEach(([r,o])=>{td([e],r,o)}))}unregisterMediaStateReceiver(e){let i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",ot(this,Na,$n))}disableHotkeys(){this.removeEventListener("keydown",ot(this,Na,$n)),this.removeEventListener("keyup",ot(this,Yt,Bi))}get hotkeys(){return S(this,p.HOTKEYS)}set hotkeys(e){y(this,p.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,o,l;let d=e.target;if(((r=(a=(i=d.getAttribute(p.KEYS_USED))==null?void 0:i.split(" "))!=null?a:d==null?void 0:d.keysUsed)!=null?r:[]).map(v=>v==="Space"?" ":v).filter(Boolean).includes(e.key))return;let E,_,g;if(!L(this,It).contains(`no${e.key.toLowerCase()}`)&&!(e.key===" "&&L(this,It).contains("nospace")))switch(e.key){case" ":case"k":E=L(this,H).getState().mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"m":E=this.mediaStore.getState().mediaVolumeLevel==="off"?m.MEDIA_UNMUTE_REQUEST:m.MEDIA_MUTE_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"f":E=this.mediaStore.getState().mediaIsFullscreen?m.MEDIA_EXIT_FULLSCREEN_REQUEST:m.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new s.CustomEvent(E,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new s.CustomEvent(m.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":{let v=this.hasAttribute(p.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(p.KEYBOARD_BACKWARD_SEEK_OFFSET):Jl;_=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)-v,0),g=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:_}),this.dispatchEvent(g);break}case"ArrowRight":{let v=this.hasAttribute(p.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(p.KEYBOARD_FORWARD_SEEK_OFFSET):Jl;_=Math.max(((l=this.mediaStore.getState().mediaCurrentTime)!=null?l:0)+v,0),g=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:_}),this.dispatchEvent(g);break}default:break}}};It=new WeakMap;Oi=new WeakMap;H=new WeakMap;Ni=new WeakMap;Ce=new WeakMap;Pa=new WeakMap;Oa=new WeakSet;Hn=function(){var t;this.mediaStore=Xl({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(p.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(p.DEFAULT_DURATION)?+this.getAttribute(p.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(p.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(p.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(p.SEEK_TO_LIVE_OFFSET):this.hasAttribute(p.LIVE_EDGE_OFFSET)?+this.getAttribute(p.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(p.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(p.NO_VOLUME_PREF),noSubtitlesLangPref:this.hasAttribute(p.NO_SUBTITLES_LANG_PREF)}})};Yt=new WeakSet;Bi=function(t){let{key:e}=t;if(!id.includes(e)){this.removeEventListener("keyup",ot(this,Yt,Bi));return}this.keyboardShortcutHandler(t)};Na=new WeakSet;$n=function(t){let{metaKey:e,altKey:i,key:a}=t;if(e||i||!id.includes(a)){this.removeEventListener("keyup",ot(this,Yt,Bi));return}[" ","ArrowLeft","ArrowRight"].includes(a)&&!(L(this,It).contains(`no${a.toLowerCase()}`)||a===" "&&L(this,It).contains("nospace"))&&t.preventDefault(),this.addEventListener("keyup",ot(this,Yt,Bi),{once:!0})};var Hc=Object.values(n),$c=Object.values(An),ad=t=>{var e,i,a,r;let{observedAttributes:o}=t.constructor;!o&&((e=t.nodeName)!=null&&e.includes("-"))&&(s.customElements.upgrade(t),{observedAttributes:o}=t.constructor);let l=(r=(a=(i=t==null?void 0:t.getAttribute)==null?void 0:i.call(t,C.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(o||l)?(o||l).filter(d=>Hc.includes(d)):[]},Wc=t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&s.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof s.customElements.get(t.nodeName.toLowerCase()))&&s.customElements.upgrade(t),$c.some(a=>a in t)},Wn=t=>Wc(t)||!!ad(t).length,jl=t=>{var e;return(e=t==null?void 0:t.join)==null?void 0:e.call(t,":")},ed={[n.MEDIA_SUBTITLES_LIST]:ze,[n.MEDIA_SUBTITLES_SHOWING]:ze,[n.MEDIA_SEEKABLE]:jl,[n.MEDIA_BUFFERED]:t=>t==null?void 0:t.map(jl).join(" "),[n.MEDIA_PREVIEW_COORDS]:t=>t==null?void 0:t.join(" "),[n.MEDIA_RENDITION_LIST]:hl,[n.MEDIA_AUDIO_TRACK_LIST]:vl},Fc=async(t,e,i)=>{var a,r;if(t.isConnected||await ma(0),typeof i=="boolean"||i==null)return T(t,e,i);if(typeof i=="number")return R(t,e,i);if(typeof i=="string")return y(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);let o=(r=(a=ed[e])==null?void 0:a.call(ed,i))!=null?r:i;return t.setAttribute(e,o)},Vc=t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},Tt=(t,e)=>{if(Vc(t))return;let i=(r,o)=>{var l,d;Wn(r)&&o(r);let{children:u=[]}=r!=null?r:{},E=(d=(l=r==null?void 0:r.shadowRoot)==null?void 0:l.children)!=null?d:[];[...u,...E].forEach(g=>Tt(g,o))},a=t==null?void 0:t.nodeName.toLowerCase();if(a.includes("-")&&!Wn(t)){s.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},td=(t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}let r=ad(a),o=e.toLowerCase();r.includes(o)&&Fc(a,o,i)})},Gc=(t,e,i)=>{Tt(t,e);let a=_=>{var g;let v=(g=_==null?void 0:_.composedPath()[0])!=null?g:_.target;e(v)},r=_=>{var g;let v=(g=_==null?void 0:_.composedPath()[0])!=null?g:_.target;i(v)};t.addEventListener(m.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(m.UNREGISTER_MEDIA_STATE_RECEIVER,r);let o=_=>{_.forEach(g=>{let{addedNodes:v=[],removedNodes:f=[],type:P,target:k,attributeName:M}=g;P==="childList"?(Array.prototype.forEach.call(v,U=>Tt(U,e)),Array.prototype.forEach.call(f,U=>Tt(U,i))):P==="attributes"&&M===C.MEDIA_CHROME_ATTRIBUTES&&(Wn(k)?e(k):i(k))})},l=[],d=_=>{let g=_.target;g.name!=="media"&&(l.forEach(v=>Tt(v,i)),l=[...g.assignedElements({flatten:!0})],l.forEach(v=>Tt(v,e)))};t.addEventListener("slotchange",d);let u=new MutationObserver(o);return u.observe(t,{childList:!0,attributes:!0,subtree:!0}),()=>{Tt(t,i),t.removeEventListener("slotchange",d),u.disconnect(),t.removeEventListener(m.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(m.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};s.customElements.get("media-controller")||s.customElements.define("media-controller",Ba);var Vn=Ba;var Kn=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Y=(t,e,i)=>(Kn(t,e,"read from private field"),i?i.call(t):e.get(t)),Zt=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ha=(t,e,i,a)=>(Kn(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Kc=(t,e,i)=>(Kn(t,e,"access private method"),i),we,zt,lt,Qt,$a,Gn,rd,st={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"},nd=c.createElement("template");nd.innerHTML=`
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
`;var N=class extends s.HTMLElement{constructor(e={}){var i;if(super(),Zt(this,Gn),Zt(this,we,void 0),this.preventClick=!1,this.tooltipEl=null,this.tooltipContent="",Zt(this,zt,a=>{this.preventClick||this.handleClick(a),setTimeout(Y(this,lt),0)}),Zt(this,lt,()=>{var a,r;(r=(a=this.tooltipEl)==null?void 0:a.updateXOffset)==null||r.call(a)}),Zt(this,Qt,a=>{let{key:r}=a;if(!this.keysUsed.includes(r)){this.removeEventListener("keyup",Y(this,Qt));return}this.preventClick||this.handleClick(a)}),Zt(this,$a,a=>{let{metaKey:r,altKey:o,key:l}=a;if(r||o||!this.keysUsed.includes(l)){this.removeEventListener("keyup",Y(this,Qt));return}this.addEventListener("keyup",Y(this,Qt),{once:!0})}),!this.shadowRoot){this.attachShadow({mode:"open"});let a=nd.content.cloneNode(!0);this.nativeEl=a;let r=e.slotTemplate;r||(r=c.createElement("template"),r.innerHTML=`<slot>${e.defaultContent||""}</slot>`),e.tooltipContent&&(a.querySelector('slot[name="tooltip-content"]').innerHTML=(i=e.tooltipContent)!=null?i:"",this.tooltipContent=e.tooltipContent),this.nativeEl.appendChild(r.content.cloneNode(!0)),this.shadowRoot.appendChild(a)}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",st.TOOLTIP_PLACEMENT,C.MEDIA_CONTROLLER]}enable(){this.addEventListener("click",Y(this,zt)),this.addEventListener("keydown",Y(this,$a)),this.tabIndex=0}disable(){this.removeEventListener("click",Y(this,zt)),this.removeEventListener("keydown",Y(this,$a)),this.removeEventListener("keyup",Y(this,Qt)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER?(i&&((o=(r=Y(this,we))==null?void 0:r.unassociateElement)==null||o.call(r,this),Ha(this,we,null)),a&&this.isConnected&&(Ha(this,we,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=Y(this,we))==null?void 0:d.associateElement)==null||u.call(d,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===st.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i&&(this.tooltipEl.placement=a),Y(this,lt).call(this)}connectedCallback(){var e,i,a;let{style:r}=O(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(Ha(this,we,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=Y(this,we))==null?void 0:i.associateElement)==null||a.call(i,this)),s.customElements.whenDefined("media-tooltip").then(()=>Kc(this,Gn,rd).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=Y(this,we))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ha(this,we,null),this.removeEventListener("mouseenter",Y(this,lt)),this.removeEventListener("focus",Y(this,lt)),this.removeEventListener("click",Y(this,zt))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return S(this,st.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){y(this,st.TOOLTIP_PLACEMENT,e)}get mediaController(){return S(this,C.MEDIA_CONTROLLER)}set mediaController(e){y(this,C.MEDIA_CONTROLLER,e)}get disabled(){return A(this,st.DISABLED)}set disabled(e){T(this,st.DISABLED,e)}get noTooltip(){return A(this,st.NO_TOOLTIP)}set noTooltip(e){T(this,st.NO_TOOLTIP,e)}handleClick(e){}};we=new WeakMap;zt=new WeakMap;lt=new WeakMap;Qt=new WeakMap;$a=new WeakMap;Gn=new WeakSet;rd=function(){this.addEventListener("mouseenter",Y(this,lt)),this.addEventListener("focus",Y(this,lt)),this.addEventListener("click",Y(this,zt));let t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)};s.customElements.get("media-chrome-button")||s.customElements.define("media-chrome-button",N);var qn=N;var od=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`,ld=c.createElement("template");ld.innerHTML=`
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
    <slot name="enter">${od}</slot>
    <slot name="exit">${od}</slot>
  </slot>
`;var qc=`
  <slot name="tooltip-enter">${h("start airplay")}</slot>
  <slot name="tooltip-exit">${h("stop airplay")}</slot>
`,sd=t=>{let e=t.mediaIsAirplaying?h("stop airplay"):h("start airplay");t.setAttribute("aria-label",e)},Wa=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_AIRPLAYING,n.MEDIA_AIRPLAY_UNAVAILABLE]}constructor(e={}){super({slotTemplate:ld,tooltipContent:qc,...e})}connectedCallback(){super.connectedCallback(),sd(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_AIRPLAYING&&sd(this)}get mediaIsAirplaying(){return A(this,n.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){T(this,n.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return S(this,n.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){y(this,n.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new s.CustomEvent(m.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};s.customElements.get("media-airplay-button")||s.customElements.define("media-airplay-button",Wa);var Yn=Wa;var Yc=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Zc=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,md=c.createElement("template");md.innerHTML=`
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
    <slot name="on">${Yc}</slot>
    <slot name="off">${Zc}</slot>
  </slot>
`;var Qc=`
  <slot name="tooltip-enable">${h("Enable captions")}</slot>
  <slot name="tooltip-disable">${h("Disable captions")}</slot>
`,dd=t=>{t.setAttribute("aria-checked",La(t).toString())},Fa=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}constructor(e={}){super({slotTemplate:md,tooltipContent:Qc,...e}),this._captionsReady=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",h("closed captions")),dd(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_SHOWING&&dd(this)}get mediaSubtitlesList(){return ud(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){cd(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return ud(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){cd(this,n.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new s.CustomEvent(m.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}},ud=(t,e)=>{let i=t.getAttribute(e);return i?bt(i):[]},cd=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=ze(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-button")||s.customElements.define("media-captions-button",Fa);var Zn=Fa;var zc='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',Xc='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>',pd=c.createElement("template");pd.innerHTML=`
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
    <slot name="enter">${zc}</slot>
    <slot name="exit">${Xc}</slot>
  </slot>
`;var Jc=`
  <slot name="tooltip-enter">${h("Start casting")}</slot>
  <slot name="tooltip-exit">${h("Stop casting")}</slot>
`,hd=t=>{let e=t.mediaIsCasting?h("stop casting"):h("start casting");t.setAttribute("aria-label",e)},Va=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_CASTING,n.MEDIA_CAST_UNAVAILABLE]}constructor(e={}){super({slotTemplate:pd,tooltipContent:Jc,...e})}connectedCallback(){super.connectedCallback(),hd(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_CASTING&&hd(this)}get mediaIsCasting(){return A(this,n.MEDIA_IS_CASTING)}set mediaIsCasting(e){T(this,n.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return S(this,n.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){y(this,n.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?m.MEDIA_EXIT_CAST_REQUEST:m.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-cast-button")||s.customElements.define("media-cast-button",Va);var Qn=Va;var io=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},yt=(t,e,i)=>(io(t,e,"read from private field"),i?i.call(t):e.get(t)),Je=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ao=(t,e,i,a)=>(io(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),St=(t,e,i)=>(io(t,e,"access private method"),i),Ka,$i,kt,Ga,zn,Xn,vd,Jn,Ed,jn,fd,eo,gd,to,bd;function jc(t){return`
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
  `}function em(t){return`
    <slot id="content"></slot>
  `}var Hi={OPEN:"open",ANCHOR:"anchor"},dt=class extends s.HTMLElement{constructor(){super(),Je(this,Ga),Je(this,Xn),Je(this,Jn),Je(this,jn),Je(this,eo),Je(this,to),Je(this,Ka,!1),Je(this,$i,null),Je(this,kt,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[Hi.OPEN,Hi.ANCHOR]}get open(){return A(this,Hi.OPEN)}set open(e){T(this,Hi.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":St(this,jn,fd).call(this,e);break;case"focusout":St(this,eo,gd).call(this,e);break;case"keydown":St(this,to,bd).call(this,e);break}}connectedCallback(){St(this,Ga,zn).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,i,a){St(this,Ga,zn).call(this),e===Hi.OPEN&&a!==i&&(this.open?St(this,Xn,vd).call(this):St(this,Jn,Ed).call(this))}focus(){ao(this,$i,wi());let e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;let a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a==null||a.focus()}get keysUsed(){return["Escape","Tab"]}};Ka=new WeakMap;$i=new WeakMap;kt=new WeakMap;Ga=new WeakSet;zn=function(){if(!yt(this,Ka)&&(ao(this,Ka,!0),!this.shadowRoot)){this.attachShadow({mode:"open"});let t=Ml(this.attributes);this.shadowRoot.innerHTML=`
        ${this.constructor.getTemplateHTML(t)}
      `,queueMicrotask(()=>{let{style:e}=O(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}};Xn=new WeakSet;vd=function(){var t;(t=yt(this,kt))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})};Jn=new WeakSet;Ed=function(){var t;(t=yt(this,kt))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))};jn=new WeakSet;fd=function(t){ao(this,kt,t.relatedTarget),ne(this,t.relatedTarget)||(this.open=!this.open)};eo=new WeakSet;gd=function(t){var e;ne(this,t.relatedTarget)||((e=yt(this,$i))==null||e.focus(),yt(this,kt)&&yt(this,kt)!==t.relatedTarget&&this.open&&(this.open=!1))};to=new WeakSet;bd=function(t){var e,i,a,r,o;let{key:l,ctrlKey:d,altKey:u,metaKey:E}=t;d||u||E||this.keysUsed.includes(l)&&(t.preventDefault(),t.stopPropagation(),l==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):l==="Escape"&&((o=yt(this,$i))==null||o.focus(),this.open=!1))};dt.getTemplateHTML=jc;dt.getSlotTemplateHTML=em;s.customElements.get("media-chrome-dialog")||s.customElements.define("media-chrome-dialog",dt);var ro=dt;var mo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},K=(t,e,i)=>(mo(t,e,"read from private field"),i?i.call(t):e.get(t)),ee=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ut=(t,e,i,a)=>(mo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ae=(t,e,i)=>(mo(t,e,"access private method"),i),Le,tr,qa,Ya,Te,ja,Za,Qa,za,ho,_d,Xa,no,Ja,oo,er,po,so,Ad,lo,Td,uo,Id,co,Sd,yd=c.createElement("template");yd.innerHTML=`
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
`;var ct=class extends s.HTMLElement{constructor(){super(),ee(this,ho),ee(this,Xa),ee(this,Ja),ee(this,er),ee(this,so),ee(this,lo),ee(this,uo),ee(this,co),ee(this,Le,void 0),ee(this,tr,void 0),ee(this,qa,void 0),ee(this,Ya,void 0),ee(this,Te,{}),ee(this,ja,[]),ee(this,Za,()=>{if(this.range.matches(":focus-visible")){let{style:e}=O(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),ee(this,Qa,()=>{let{style:e}=O(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),ee(this,za,()=>{let e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(yd.content.cloneNode(!0))),this.container=this.shadowRoot.querySelector("#container"),ut(this,qa,this.shadowRoot.querySelector("#startpoint")),ut(this,Ya,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER?(i&&((o=(r=K(this,Le))==null?void 0:r.unassociateElement)==null||o.call(r,this),ut(this,Le,null)),a&&this.isConnected&&(ut(this,Le,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=K(this,Le))==null?void 0:d.associateElement)==null||u.call(d,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),Ae(this,Xa,no).call(this)):(this.range.setAttribute(e,a),Ae(this,Ja,oo).call(this)))}connectedCallback(){var e,i,a;let{style:r}=O(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),K(this,Te).pointer=O(this.shadowRoot,"#pointer"),K(this,Te).progress=O(this.shadowRoot,"#progress"),K(this,Te).thumb=O(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),K(this,Te).activeSegment=O(this.shadowRoot,"#segments-clipping rect:nth-child(0)");let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(ut(this,Le,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=K(this,Le))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",K(this,Za)),this.shadowRoot.addEventListener("focusout",K(this,Qa)),Ae(this,Xa,no).call(this),Ye(this.container,K(this,za))}disconnectedCallback(){var e,i;Ae(this,Ja,oo).call(this),(i=(e=K(this,Le))==null?void 0:e.unassociateElement)==null||i.call(e,this),ut(this,Le,null),this.shadowRoot.removeEventListener("focusin",K(this,Za)),this.shadowRoot.removeEventListener("focusout",K(this,Qa)),Ze(this.container,K(this,za))}updatePointerBar(e){var i;(i=K(this,Te).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;let a=this.range.valueAsNumber*100;(e=K(this,Te).progress)==null||e.style.setProperty("width",`${a}%`),(i=K(this,Te).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){let i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!(e!=null&&e.length)),!(e!=null&&e.length))return;let a=[...new Set([+this.range.min,...e.flatMap(o=>[o.start,o.end]),+this.range.max])];ut(this,ja,[...a]);let r=a.pop();for(let[o,l]of a.entries()){let[d,u]=[o===0,o===a.length-1],E=d?"calc(var(--segments-gap) / -1)":`${l*100}%`,g=`calc(${((u?r:a[o+1])-l)*100}%${d||u?"":" - var(--segments-gap)"})`,v=c.createElementNS("http://www.w3.org/2000/svg","rect"),f=O(this.shadowRoot,`#segments-clipping rect:nth-child(${o+1})`);f.style.setProperty("x",E),f.style.setProperty("width",g),i.append(v)}}getPointerRatio(e){return Cl(e.clientX,e.clientY,K(this,qa).getBoundingClientRect(),K(this,Ya).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":Ae(this,co,Sd).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":Ae(this,so,Ad).call(this,e);break;case"pointerdown":Ae(this,er,po).call(this,e);break;case"pointerup":Ae(this,lo,Td).call(this);break;case"pointerleave":Ae(this,uo,Id).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}};Le=new WeakMap;tr=new WeakMap;qa=new WeakMap;Ya=new WeakMap;Te=new WeakMap;ja=new WeakMap;Za=new WeakMap;Qa=new WeakMap;za=new WeakMap;ho=new WeakSet;_d=function(t){let e=K(this,Te).activeSegment;if(!e)return;let i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${K(this,ja).findIndex((o,l,d)=>{let u=d[l+1];return u!=null&&i>=o&&i<=u})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))};Xa=new WeakSet;no=function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))};Ja=new WeakSet;oo=function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),(t=s.window)==null||t.removeEventListener("pointerup",this),(e=s.window)==null||e.removeEventListener("pointermove",this)};er=new WeakSet;po=function(t){var e;ut(this,tr,t.composedPath().includes(this.range)),(e=s.window)==null||e.addEventListener("pointerup",this)};so=new WeakSet;Ad=function(t){var e;t.pointerType!=="mouse"&&Ae(this,er,po).call(this,t),this.addEventListener("pointerleave",this),(e=s.window)==null||e.addEventListener("pointermove",this)};lo=new WeakSet;Td=function(){var t;(t=s.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")};uo=new WeakSet;Id=function(){var t,e;this.removeEventListener("pointerleave",this),(t=s.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=K(this,Te).activeSegment)==null||e.style.removeProperty("transform")};co=new WeakSet;Sd=function(t){this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),Ae(this,ho,_d).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!K(this,tr))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})))};s.customElements.get("media-chrome-range")||s.customElements.define("media-chrome-range",ct);var vo=ct;var kd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},ir=(t,e,i)=>(kd(t,e,"read from private field"),i?i.call(t):e.get(t)),tm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ar=(t,e,i,a)=>(kd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Re,Md=c.createElement("template");Md.innerHTML=`
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
`;var rr=class extends s.HTMLElement{constructor(){super(),tm(this,Re,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Md.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=ir(this,Re))==null?void 0:r.unassociateElement)==null||o.call(r,this),ar(this,Re,null)),a&&this.isConnected&&(ar(this,Re,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=ir(this,Re))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(ar(this,Re,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=ir(this,Re))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=ir(this,Re))==null?void 0:e.unassociateElement)==null||i.call(e,this),ar(this,Re,null)}};Re=new WeakMap;s.customElements.get("media-control-bar")||s.customElements.define("media-control-bar",rr);var Eo=rr;var Cd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},nr=(t,e,i)=>(Cd(t,e,"read from private field"),i?i.call(t):e.get(t)),im=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},or=(t,e,i,a)=>(Cd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),xe,wd=c.createElement("template");wd.innerHTML=`
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
`;var fe=class extends s.HTMLElement{constructor(){super(),im(this,xe,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(wd.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===C.MEDIA_CONTROLLER&&(i&&((o=(r=nr(this,xe))==null?void 0:r.unassociateElement)==null||o.call(r,this),or(this,xe,null)),a&&this.isConnected&&(or(this,xe,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=nr(this,xe))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let{style:r}=O(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let o=this.getAttribute(C.MEDIA_CONTROLLER);o&&(or(this,xe,(e=this.getRootNode())==null?void 0:e.getElementById(o)),(a=(i=nr(this,xe))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=nr(this,xe))==null?void 0:e.unassociateElement)==null||i.call(e,this),or(this,xe,null)}};xe=new WeakMap;s.customElements.get("media-text-display")||s.customElements.define("media-text-display",fe);var fo=fe;var Rd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ld=(t,e,i)=>(Rd(t,e,"read from private field"),i?i.call(t):e.get(t)),am=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},rm=(t,e,i,a)=>(Rd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Wi,sr=class extends fe{constructor(){super(),am(this,Wi,void 0),rm(this,Wi,this.shadowRoot.querySelector("slot")),Ld(this,Wi).textContent=ye(0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===n.MEDIA_DURATION&&(Ld(this,Wi).textContent=ye(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){R(this,n.MEDIA_DURATION,e)}};Wi=new WeakMap;s.customElements.get("media-duration-display")||s.customElements.define("media-duration-display",sr);var go=sr;var nm={2:h("Network Error"),3:h("Decode Error"),4:h("Source Not Supported"),5:h("Encryption Error")},om={2:h("A network error caused the media download to fail."),3:h("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:h("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:h("The media is encrypted and there are no keys to decrypt it.")},bo=t=>{var e,i;return t.code===1?null:{title:(e=nm[t.code])!=null?e:`Error ${t.code}`,message:(i=om[t.code])!=null?i:t.message}};var Dd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},sm=(t,e,i)=>(Dd(t,e,"read from private field"),i?i.call(t):e.get(t)),lm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},dm=(t,e,i,a)=>(Dd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),lr;function um(t){return`
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
      ${Ud({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}function cm(t){return t.code&&bo(t)!==null}function Ud(t){var e;let{title:i,message:a}=(e=bo(t))!=null?e:{},r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}var xd=[n.MEDIA_ERROR_CODE,n.MEDIA_ERROR_MESSAGE],Xt=class extends dt{constructor(){super(...arguments),lm(this,lr,null)}static get observedAttributes(){return[...super.observedAttributes,...xd]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!xd.includes(e))return;let o=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=cm(o),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(o))}get mediaError(){return sm(this,lr)}set mediaError(e){dm(this,lr,e)}get mediaErrorCode(){return w(this,"mediaerrorcode")}set mediaErrorCode(e){R(this,"mediaerrorcode",e)}get mediaErrorMessage(){return S(this,"mediaerrormessage")}set mediaErrorMessage(e){y(this,"mediaerrormessage",e)}};lr=new WeakMap;Xt.getSlotTemplateHTML=um;Xt.formatErrorMessage=Ud;s.customElements.get("media-error-dialog")||s.customElements.define("media-error-dialog",Xt);var _o=Xt;var mm=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,hm=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`,Od=c.createElement("template");Od.innerHTML=`
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
    <slot name="enter">${mm}</slot>
    <slot name="exit">${hm}</slot>
  </slot>
`;var pm=`
  <slot name="tooltip-enter">${h("Enter fullscreen mode")}</slot>
  <slot name="tooltip-exit">${h("Exit fullscreen mode")}</slot>
`,Pd=t=>{let e=t.mediaIsFullscreen?h("exit fullscreen mode"):h("enter fullscreen mode");t.setAttribute("aria-label",e)},dr=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_FULLSCREEN,n.MEDIA_FULLSCREEN_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Od,tooltipContent:pm,...e})}connectedCallback(){super.connectedCallback(),Pd(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_IS_FULLSCREEN&&Pd(this)}get mediaFullscreenUnavailable(){return S(this,n.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){y(this,n.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return A(this,n.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){T(this,n.MEDIA_IS_FULLSCREEN,e)}handleClick(){let e=this.mediaIsFullscreen?m.MEDIA_EXIT_FULLSCREEN_REQUEST:m.MEDIA_ENTER_FULLSCREEN_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-fullscreen-button")||s.customElements.define("media-fullscreen-button",dr);var Ao=dr;var{MEDIA_TIME_IS_LIVE:ur,MEDIA_PAUSED:Fi}=n,{MEDIA_SEEK_TO_LIVE_REQUEST:vm,MEDIA_PLAY_REQUEST:Em}=m,fm='<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>',Bd=c.createElement("template");Bd.innerHTML=`
  <style>
  :host { --media-tooltip-display: none; }
  
  slot[name=indicator] > *,
  :host ::slotted([slot=indicator]) {
    
    min-width: auto;
    fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
    color: var(--media-live-button-icon-color, rgb(140, 140, 140));
  }

  :host([${ur}]:not([${Fi}])) slot[name=indicator] > *,
  :host([${ur}]:not([${Fi}])) ::slotted([slot=indicator]) {
    fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
    color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
  }

  :host([${ur}]:not([${Fi}])) {
    cursor: var(--media-cursor, not-allowed);
  }

  slot[name=text]{
    text-transform: uppercase;
  }

  </style>

  <slot name="indicator">${fm}</slot>
  
  <slot name="spacer">&nbsp;</slot><slot name="text">${h("live")}</slot>
`;var Nd=t=>{let e=t.mediaPaused||!t.mediaTimeIsLive,i=e?h("seek to live"):h("playing live");t.setAttribute("aria-label",i),e?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")},cr=class extends N{static get observedAttributes(){return[...super.observedAttributes,Fi,ur]}constructor(e={}){super({slotTemplate:Bd,...e})}connectedCallback(){Nd(this),super.connectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Nd(this)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){T(this,n.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return A(this,n.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){T(this,n.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new s.CustomEvent(vm,{composed:!0,bubbles:!0})),this.hasAttribute(Fi)&&this.dispatchEvent(new s.CustomEvent(Em,{composed:!0,bubbles:!0})))}};s.customElements.get("media-live-button")||s.customElements.define("media-live-button",cr);var To=cr;var $d=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Vi=(t,e,i)=>($d(t,e,"read from private field"),i?i.call(t):e.get(t)),Hd=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Gi=(t,e,i,a)=>($d(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),De,hr,mr={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},Wd=500,Fd=c.createElement("template"),gm=`
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
`;Fd.innerHTML=`
<style>
:host {
  display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
  vertical-align: middle;
  box-sizing: border-box;
  --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${Wd}ms);
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

<slot name="icon">${gm}</slot>
<div id="status" role="status" aria-live="polite">${h("media loading")}</div>
`;var pr=class extends s.HTMLElement{constructor(){if(super(),Hd(this,De,void 0),Hd(this,hr,Wd),!this.shadowRoot){let e=this.attachShadow({mode:"open"}),i=Fd.content.cloneNode(!0);e.appendChild(i)}}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PAUSED,n.MEDIA_LOADING,mr.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,o,l,d,u;e===mr.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===C.MEDIA_CONTROLLER&&(i&&((o=(r=Vi(this,De))==null?void 0:r.unassociateElement)==null||o.call(r,this),Gi(this,De,null)),a&&this.isConnected&&(Gi(this,De,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=Vi(this,De))==null?void 0:d.associateElement)==null||u.call(d,this)))}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(Gi(this,De,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Vi(this,De))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Vi(this,De))==null?void 0:e.unassociateElement)==null||i.call(e,this),Gi(this,De,null)}get loadingDelay(){return Vi(this,hr)}set loadingDelay(e){Gi(this,hr,e);let{style:i}=O(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){T(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return A(this,n.MEDIA_LOADING)}set mediaLoading(e){T(this,n.MEDIA_LOADING,e)}get mediaController(){return S(this,C.MEDIA_CONTROLLER)}set mediaController(e){y(this,C.MEDIA_CONTROLLER,e)}get noAutohide(){return A(this,mr.NO_AUTOHIDE)}set noAutohide(e){T(this,mr.NO_AUTOHIDE,e)}};De=new WeakMap;hr=new WeakMap;s.customElements.get("media-loading-indicator")||s.customElements.define("media-loading-indicator",pr);var Io=pr;var{MEDIA_VOLUME_LEVEL:Mt}=n,bm=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,Vd=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,_m=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`,Kd=c.createElement("template");Kd.innerHTML=`
  <style>
  
  :host(:not([${Mt}])) slot[name=icon] slot:not([name=high]), 
  :host([${Mt}=high]) slot[name=icon] slot:not([name=high]) {
    display: none !important;
  }

  :host([${Mt}=off]) slot[name=icon] slot:not([name=off]) {
    display: none !important;
  }

  :host([${Mt}=low]) slot[name=icon] slot:not([name=low]) {
    display: none !important;
  }

  :host([${Mt}=medium]) slot[name=icon] slot:not([name=medium]) {
    display: none !important;
  }

  :host(:not([${Mt}=off])) slot[name=tooltip-unmute],
  :host([${Mt}=off]) slot[name=tooltip-mute] {
    display: none;
  }
  </style>

  <slot name="icon">
    <slot name="off">${bm}</slot>
    <slot name="low">${Vd}</slot>
    <slot name="medium">${Vd}</slot>
    <slot name="high">${_m}</slot>
  </slot>
`;var Am=`
  <slot name="tooltip-mute">${h("Mute")}</slot>
  <slot name="tooltip-unmute">${h("Unmute")}</slot>
`,Gd=t=>{let i=t.mediaVolumeLevel==="off"?h("unmute"):h("mute");t.setAttribute("aria-label",i)},vr=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME_LEVEL]}constructor(e={}){super({slotTemplate:Kd,tooltipContent:Am,...e})}connectedCallback(){Gd(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_VOLUME_LEVEL&&Gd(this),super.attributeChangedCallback(e,i,a)}get mediaVolumeLevel(){return S(this,n.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){y(this,n.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e=this.mediaVolumeLevel==="off"?m.MEDIA_UNMUTE_REQUEST:m.MEDIA_MUTE_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-mute-button")||s.customElements.define("media-mute-button",vr);var So=vr;var qd=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`,Zd=c.createElement("template");Zd.innerHTML=`
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
    <slot name="enter">${qd}</slot>
    <slot name="exit">${qd}</slot>
  </slot>
`;var Tm=`
  <slot name="tooltip-enter">${h("Enter picture in picture mode")}</slot>
  <slot name="tooltip-exit">${h("Exit picture in picture mode")}</slot>
`,Yd=t=>{let e=t.mediaIsPip?h("exit picture in picture mode"):h("enter picture in picture mode");t.setAttribute("aria-label",e)},Er=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_IS_PIP,n.MEDIA_PIP_UNAVAILABLE]}constructor(e={}){super({slotTemplate:Zd,tooltipContent:Tm,...e})}connectedCallback(){Yd(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_IS_PIP&&Yd(this),super.attributeChangedCallback(e,i,a)}get mediaPipUnavailable(){return S(this,n.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){y(this,n.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return A(this,n.MEDIA_IS_PIP)}set mediaIsPip(e){T(this,n.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?m.MEDIA_EXIT_PIP_REQUEST:m.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-pip-button")||s.customElements.define("media-pip-button",Er);var yo=Er;var Im=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},fr=(t,e,i)=>(Im(t,e,"read from private field"),i?i.call(t):e.get(t)),Sm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Jt,ko={RATES:"rates"},Mo=[1,1.2,1.5,1.7,2],jt=1,Qd=c.createElement("template");Qd.innerHTML=`
  <style>
    :host {
      min-width: 5ch;
      padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
    }
  </style>
  <slot name="icon"></slot>
`;var gr=class extends N{constructor(e={}){super({slotTemplate:Qd,tooltipContent:h("Playback rate"),...e}),Sm(this,Jt,new Me(this,ko.RATES,{defaultValue:Mo})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${jt}x`}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,ko.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===ko.RATES&&(fr(this,Jt).value=a),e===n.MEDIA_PLAYBACK_RATE){let r=a?+a:Number.NaN,o=Number.isNaN(r)?jt:r;this.container.innerHTML=`${o}x`,this.setAttribute("aria-label",h("Playback rate {playbackRate}",{playbackRate:o}))}}get rates(){return fr(this,Jt)}set rates(e){e?Array.isArray(e)&&(fr(this,Jt).value=e.join(" ")):fr(this,Jt).value=""}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,jt)}set mediaPlaybackRate(e){R(this,n.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;let a=Array.from(this.rates.values(),l=>+l).sort((l,d)=>l-d),r=(i=(e=a.find(l=>l>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:jt,o=new s.CustomEvent(m.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(o)}};Jt=new WeakMap;s.customElements.get("media-playback-rate-button")||s.customElements.define("media-playback-rate-button",gr);var Co=gr;var ym=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,km=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`,Xd=c.createElement("template");Xd.innerHTML=`
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
    <slot name="play">${ym}</slot>
    <slot name="pause">${km}</slot>
  </slot>
`;var Mm=`
  <slot name="tooltip-play">${h("Play")}</slot>
  <slot name="tooltip-pause">${h("Pause")}</slot>
`,zd=t=>{let e=t.mediaPaused?h("play"):h("pause");t.setAttribute("aria-label",e)},br=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_ENDED]}constructor(e={}){super({slotTemplate:Xd,tooltipContent:Mm,...e})}connectedCallback(){zd(this),super.connectedCallback()}attributeChangedCallback(e,i,a){e===n.MEDIA_PAUSED&&zd(this),super.attributeChangedCallback(e,i,a)}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){T(this,n.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?m.MEDIA_PLAY_REQUEST:m.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new s.CustomEvent(e,{composed:!0,bubbles:!0}))}};s.customElements.get("media-play-button")||s.customElements.define("media-play-button",br);var wo=br;var Ue={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"},Jd=c.createElement("template");Jd.innerHTML=`
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
`;var Cm=t=>{t.style.removeProperty("background-image")},wm=(t,e)=>{t.style["background-image"]=`url('${e}')`},_r=class extends s.HTMLElement{static get observedAttributes(){return[Ue.PLACEHOLDER_SRC,Ue.SRC]}constructor(){super(),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Jd.content.cloneNode(!0))),this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Ue.SRC&&(a==null?this.image.removeAttribute(Ue.SRC):this.image.setAttribute(Ue.SRC,a)),e===Ue.PLACEHOLDER_SRC&&(a==null?Cm(this.image):wm(this.image,a))}get placeholderSrc(){return S(this,Ue.PLACEHOLDER_SRC)}set placeholderSrc(e){y(this,Ue.SRC,e)}get src(){return S(this,Ue.SRC)}set src(e){y(this,Ue.SRC,e)}};s.customElements.get("media-poster-image")||s.customElements.define("media-poster-image",_r);var Lo=_r;var jd=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Lm=(t,e,i)=>(jd(t,e,"read from private field"),i?i.call(t):e.get(t)),Rm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},xm=(t,e,i,a)=>(jd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ar,Tr=class extends fe{constructor(){super(),Rm(this,Ar,void 0),xm(this,Ar,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_CHAPTER]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PREVIEW_CHAPTER&&a!==i&&a!=null&&(Lm(this,Ar).textContent=a,a!==""?this.setAttribute("aria-valuetext",`chapter: ${a}`):this.removeAttribute("aria-valuetext"))}get mediaPreviewChapter(){return S(this,n.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){y(this,n.MEDIA_PREVIEW_CHAPTER,e)}};Ar=new WeakMap;s.customElements.get("media-preview-chapter-display")||s.customElements.define("media-preview-chapter-display",Tr);var Ro=Tr;var eu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Ir=(t,e,i)=>(eu(t,e,"read from private field"),i?i.call(t):e.get(t)),Dm=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Sr=(t,e,i,a)=>(eu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Pe,tu=c.createElement("template");tu.innerHTML=`
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
`;var yr=class extends s.HTMLElement{constructor(){super(),Dm(this,Pe,void 0),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(tu.content.cloneNode(!0)))}static get observedAttributes(){return[C.MEDIA_CONTROLLER,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;let r=this.getAttribute(C.MEDIA_CONTROLLER);r&&(Sr(this,Pe,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Ir(this,Pe))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Ir(this,Pe))==null?void 0:e.unassociateElement)==null||i.call(e,this),Sr(this,Pe,null)}attributeChangedCallback(e,i,a){var r,o,l,d,u;[n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===C.MEDIA_CONTROLLER&&(i&&((o=(r=Ir(this,Pe))==null?void 0:r.unassociateElement)==null||o.call(r,this),Sr(this,Pe,null)),a&&this.isConnected&&(Sr(this,Pe,(l=this.getRootNode())==null?void 0:l.getElementById(a)),(u=(d=Ir(this,Pe))==null?void 0:d.associateElement)==null||u.call(d,this)))}get mediaPreviewImage(){return S(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){y(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(n.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(n.MEDIA_PREVIEW_COORDS);return}this.setAttribute(n.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){let e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;let[a,r,o,l]=e,d=i.split("#")[0],u=getComputedStyle(this),{maxWidth:E,maxHeight:_,minWidth:g,minHeight:v}=u,f=Math.min(parseInt(E)/o,parseInt(_)/l),P=Math.max(parseInt(g)/o,parseInt(v)/l),k=f<1,M=k?f:P>1?P:1,{style:U}=O(this.shadowRoot,":host"),te=O(this.shadowRoot,"img").style,de=this.shadowRoot.querySelector("img"),et=k?"min":"max";U.setProperty(`${et}-width`,"initial","important"),U.setProperty(`${et}-height`,"initial","important"),U.width=`${o*M}px`,U.height=`${l*M}px`;let Ke=()=>{te.width=`${this.imgWidth*M}px`,te.height=`${this.imgHeight*M}px`,te.display="block"};de.src!==d&&(de.onload=()=>{this.imgWidth=de.naturalWidth,this.imgHeight=de.naturalHeight,Ke()},de.src=d,Ke()),Ke(),te.transform=`translate(-${a*M}px, -${r*M}px)`}};Pe=new WeakMap;s.customElements.get("media-preview-thumbnail")||s.customElements.define("media-preview-thumbnail",yr);var xo=yr;var au=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},iu=(t,e,i)=>(au(t,e,"read from private field"),i?i.call(t):e.get(t)),Um=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Pm=(t,e,i,a)=>(au(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ki,kr=class extends fe{constructor(){super(),Um(this,Ki,void 0),Pm(this,Ki,this.shadowRoot.querySelector("slot")),iu(this,Ki).textContent=ye(0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PREVIEW_TIME&&a!=null&&(iu(this,Ki).textContent=ye(parseFloat(a)))}get mediaPreviewTime(){return w(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){R(this,n.MEDIA_PREVIEW_TIME,e)}};Ki=new WeakMap;s.customElements.get("media-preview-time-display")||s.customElements.define("media-preview-time-display",kr);var Do=kr;var ei={SEEK_OFFSET:"seekoffset"},Mr=30,Om=`<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(2.18 19.87)">${Mr}</text><path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/></svg>`,ru=c.createElement("template");ru.innerHTML=`
  <slot name="icon">${Om}</slot>
`;var Nm=0,Cr=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,ei.SEEK_OFFSET]}constructor(e={}){super({slotTemplate:ru,tooltipContent:h("Seek backward"),...e})}connectedCallback(){this.seekOffset=w(this,ei.SEEK_OFFSET,Mr),super.connectedCallback()}attributeChangedCallback(e,i,a){e===ei.SEEK_OFFSET&&(this.seekOffset=w(this,ei.SEEK_OFFSET,Mr)),super.attributeChangedCallback(e,i,a)}get seekOffset(){return w(this,ei.SEEK_OFFSET,Mr)}set seekOffset(e){R(this,ei.SEEK_OFFSET,e),this.setAttribute("aria-label",h("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),fa(ga(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME,Nm)}set mediaCurrentTime(e){R(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};s.customElements.get("media-seek-backward-button")||s.customElements.define("media-seek-backward-button",Cr);var Uo=Cr;var ti={SEEK_OFFSET:"seekoffset"},wr=30,Bm=`<svg aria-hidden="true" viewBox="0 0 20 24"><defs><style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style></defs><text class="text value" transform="translate(8.9 19.87)">${wr}</text><path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/></svg>`,nu=c.createElement("template");nu.innerHTML=`
  <slot name="icon">${Bm}</slot>
`;var Hm=0,Lr=class extends N{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_CURRENT_TIME,ti.SEEK_OFFSET]}constructor(e={}){super({slotTemplate:nu,tooltipContent:h("Seek forward"),...e})}connectedCallback(){this.seekOffset=w(this,ti.SEEK_OFFSET,wr),super.connectedCallback()}attributeChangedCallback(e,i,a){e===ti.SEEK_OFFSET&&(this.seekOffset=w(this,ti.SEEK_OFFSET,wr)),super.attributeChangedCallback(e,i,a)}get seekOffset(){return w(this,ti.SEEK_OFFSET,wr)}set seekOffset(e){R(this,ti.SEEK_OFFSET,e),this.setAttribute("aria-label",h("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),fa(ga(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME,Hm)}set mediaCurrentTime(e){R(this,n.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,i=new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};s.customElements.get("media-seek-forward-button")||s.customElements.define("media-seek-forward-button",Lr);var Po=Lr;var du=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Oo=(t,e,i)=>(du(t,e,"read from private field"),i?i.call(t):e.get(t)),$m=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Wm=(t,e,i,a)=>(du(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ii,Ie={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},ou=[...Object.values(Ie),n.MEDIA_CURRENT_TIME,n.MEDIA_DURATION,n.MEDIA_SEEKABLE],su=["Enter"," "],Fm="&nbsp;/&nbsp;",lu=(t,{timesSep:e=Fm}={})=>{var i,a;let r=t.hasAttribute(Ie.REMAINING),o=t.hasAttribute(Ie.SHOW_DURATION),l=(i=t.mediaCurrentTime)!=null?i:0,[,d]=(a=t.mediaSeekable)!=null?a:[],u=0;Number.isFinite(t.mediaDuration)?u=t.mediaDuration:Number.isFinite(d)&&(u=d);let E=r?ye(0-(u-l)):ye(l);return o?`${E}${e}${ye(u)}`:E},Vm="video not loaded, unknown time.",Gm=t=>{var e;let i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[],r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-valuetext",Vm);return}let o=t.hasAttribute(Ie.REMAINING),l=t.hasAttribute(Ie.SHOW_DURATION),d=o?vt(0-(r-i)):vt(i);if(!l){t.setAttribute("aria-valuetext",d);return}let u=vt(r),E=`${d} of ${u}`;t.setAttribute("aria-valuetext",E)},Rr=class extends fe{constructor(){super(),$m(this,ii,void 0),Wm(this,ii,this.shadowRoot.querySelector("slot")),Oo(this,ii).innerHTML=`${lu(this)}`}static get observedAttributes(){return[...super.observedAttributes,...ou,"disabled"]}connectedCallback(){let{style:e}=O(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",h("playback time"));let i=a=>{let{key:r}=a;if(!su.includes(r)){this.removeEventListener("keyup",i);return}this.toggleTimeDisplay()};this.addEventListener("keydown",a=>{let{metaKey:r,altKey:o,key:l}=a;if(r||o||!su.includes(l)){this.removeEventListener("keyup",i);return}this.addEventListener("keyup",i)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,i,a){ou.includes(e)?this.update():e==="disabled"&&a!==i&&(a==null?this.enable():this.disable()),super.attributeChangedCallback(e,i,a)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return A(this,Ie.REMAINING)}set remaining(e){T(this,Ie.REMAINING,e)}get showDuration(){return A(this,Ie.SHOW_DURATION)}set showDuration(e){T(this,Ie.SHOW_DURATION,e)}get noToggle(){return A(this,Ie.NO_TOGGLE)}set noToggle(e){T(this,Ie.NO_TOGGLE,e)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){R(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){R(this,n.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}update(){let e=lu(this);Gm(this),e!==Oo(this,ii).innerHTML&&(Oo(this,ii).innerHTML=e)}};ii=new WeakMap;s.customElements.get("media-time-display")||s.customElements.define("media-time-display",Rr);var No=Rr;var uu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},J=(t,e,i)=>(uu(t,e,"read from private field"),i?i.call(t):e.get(t)),Oe=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},ve=(t,e,i,a)=>(uu(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Km=(t,e,i,a)=>({set _(r){ve(t,e,r,i)},get _(){return J(t,e,a)}}),ai,xr,ri,qi,Dr,Ur,Pr,ni,Ct,Or,Nr=class{constructor(e,i,a){Oe(this,ai,void 0),Oe(this,xr,void 0),Oe(this,ri,void 0),Oe(this,qi,void 0),Oe(this,Dr,void 0),Oe(this,Ur,void 0),Oe(this,Pr,void 0),Oe(this,ni,void 0),Oe(this,Ct,0),Oe(this,Or,(r=performance.now())=>{ve(this,Ct,requestAnimationFrame(J(this,Or))),ve(this,qi,performance.now()-J(this,ri));let o=1e3/this.fps;if(J(this,qi)>o){ve(this,ri,r-J(this,qi)%o);let l=1e3/((r-J(this,xr))/++Km(this,Dr)._),d=(r-J(this,Ur))/1e3/this.duration,u=J(this,Pr)+d*this.playbackRate;u-J(this,ai).valueAsNumber>0?ve(this,ni,this.playbackRate/this.duration/l):(ve(this,ni,.995*J(this,ni)),u=J(this,ai).valueAsNumber+J(this,ni)),this.callback(u)}}),ve(this,ai,e),this.callback=i,this.fps=a}start(){J(this,Ct)===0&&(ve(this,ri,performance.now()),ve(this,xr,J(this,ri)),ve(this,Dr,0),J(this,Or).call(this))}stop(){J(this,Ct)!==0&&(cancelAnimationFrame(J(this,Ct)),ve(this,Ct,0))}update({start:e,duration:i,playbackRate:a}){let r=e-J(this,ai).valueAsNumber,o=Math.abs(i-this.duration);(r>0||r<-.03||o>=.5)&&this.callback(e),ve(this,Pr,e),ve(this,Ur,performance.now()),this.duration=i,this.playbackRate=a}};ai=new WeakMap;xr=new WeakMap;ri=new WeakMap;qi=new WeakMap;Dr=new WeakMap;Ur=new WeakMap;Pr=new WeakMap;ni=new WeakMap;Ct=new WeakMap;Or=new WeakMap;var Wo=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Z=(t,e,i)=>(Wo(t,e,"read from private field"),i?i.call(t):e.get(t)),j=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Ne=(t,e,i,a)=>(Wo(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ae=(t,e,i)=>(Wo(t,e,"access private method"),i),oi,wt,$r,Zi,Wr,Hr,Qi,zi,si,li,Yi,Fo,cu,Bo,Fr,Vo,Vr,Go,Gr,Ko,Ho,mu,Xi,Kr,$o,hu,qm="video not loaded, unknown time.",Ym=t=>{let e=t.range,i=vt(+vu(t)),a=vt(+t.mediaSeekableEnd),r=i&&a?`${i} of ${a}`:qm;e.setAttribute("aria-valuetext",r)},pu=c.createElement("template");pu.innerHTML=`
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
`;var Br=(t,e=t.mediaCurrentTime)=>{let i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;let r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},vu=(t,e=t.range.valueAsNumber)=>{let i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i},qr=class extends ct{constructor(){super(),j(this,li),j(this,Fo),j(this,Fr),j(this,Vr),j(this,Gr),j(this,Ho),j(this,Xi),j(this,$o),j(this,oi,void 0),j(this,wt,void 0),j(this,$r,void 0),j(this,Zi,void 0),j(this,Wr,void 0),j(this,Hr,void 0),j(this,Qi,void 0),j(this,zi,void 0),j(this,si,void 0),j(this,Bo,a=>{this.dragging||(Bt(a)&&(this.range.valueAsNumber=a),this.updateBar())}),this.container.appendChild(pu.content.cloneNode(!0)),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),Ne(this,$r,this.shadowRoot.querySelectorAll('[part~="box"]')),Ne(this,Wr,this.shadowRoot.querySelector('[part~="preview-box"]')),Ne(this,Hr,this.shadowRoot.querySelector('[part~="current-box"]'));let i=getComputedStyle(this);Ne(this,Qi,parseInt(i.getPropertyValue("--media-box-padding-left"))),Ne(this,zi,parseInt(i.getPropertyValue("--media-box-padding-right"))),Ne(this,wt,new Nr(this.range,Z(this,Bo),60))}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PAUSED,n.MEDIA_DURATION,n.MEDIA_SEEKABLE,n.MEDIA_CURRENT_TIME,n.MEDIA_PREVIEW_IMAGE,n.MEDIA_PREVIEW_TIME,n.MEDIA_PREVIEW_CHAPTER,n.MEDIA_BUFFERED,n.MEDIA_PLAYBACK_RATE,n.MEDIA_LOADING,n.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",h("seek")),ae(this,li,Yi).call(this),Ne(this,oi,this.getRootNode()),(e=Z(this,oi))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),ae(this,li,Yi).call(this),(e=Z(this,oi))==null||e.removeEventListener("transitionstart",this),Ne(this,oi,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===n.MEDIA_CURRENT_TIME||e===n.MEDIA_PAUSED||e===n.MEDIA_ENDED||e===n.MEDIA_LOADING||e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE?(Z(this,wt).update({start:Br(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),ae(this,li,Yi).call(this),Ym(this)):e===n.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===n.MEDIA_DURATION||e===n.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=Z(this,si),this.updateBar()))}get mediaChaptersCues(){return Z(this,si)}set mediaChaptersCues(e){var i;Ne(this,si,e),this.updateSegments((i=Z(this,si))==null?void 0:i.map(a=>({start:Br(this,a.startTime),end:Br(this,a.endTime)})))}get mediaPaused(){return A(this,n.MEDIA_PAUSED)}set mediaPaused(e){T(this,n.MEDIA_PAUSED,e)}get mediaLoading(){return A(this,n.MEDIA_LOADING)}set mediaLoading(e){T(this,n.MEDIA_LOADING,e)}get mediaDuration(){return w(this,n.MEDIA_DURATION)}set mediaDuration(e){R(this,n.MEDIA_DURATION,e)}get mediaCurrentTime(){return w(this,n.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){R(this,n.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){R(this,n.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(n.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(n.MEDIA_BUFFERED);return}let i=e.map(a=>a.join(":")).join(" ");this.setAttribute(n.MEDIA_BUFFERED,i)}get mediaSeekable(){let e=this.getAttribute(n.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(n.MEDIA_SEEKABLE);return}this.setAttribute(n.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;let[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;let[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return S(this,n.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){y(this,n.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return w(this,n.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){R(this,n.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return A(this,n.MEDIA_ENDED)}set mediaEnded(e){T(this,n.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;let i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{let o=this.mediaCurrentTime,[,l=this.mediaSeekableStart]=(e=i.find(([d,u])=>d<=o&&o<=u))!=null?e:[];a=Br(this,l)}let{style:r}=O(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;let i=O(this.shadowRoot,"#current-rail"),a=O(this.shadowRoot,'[part~="current-box"]'),r=ae(this,Fr,Vo).call(this,Z(this,Hr)),o=ae(this,Vr,Go).call(this,r,this.range.valueAsNumber),l=ae(this,Gr,Ko).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${o})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${l}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":ae(this,$o,hu).call(this);break;case"pointermove":ae(this,Ho,mu).call(this,e);break;case"pointerup":case"pointerleave":ae(this,Xi,Kr).call(this,null);break;case"transitionstart":ne(e.target,this)&&setTimeout(()=>ae(this,li,Yi).call(this),0);break}}};oi=new WeakMap;wt=new WeakMap;$r=new WeakMap;Zi=new WeakMap;Wr=new WeakMap;Hr=new WeakMap;Qi=new WeakMap;zi=new WeakMap;si=new WeakMap;li=new WeakSet;Yi=function(){ae(this,Fo,cu).call(this)?Z(this,wt).start():Z(this,wt).stop()};Fo=new WeakSet;cu=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&ba(this)};Bo=new WeakMap;Fr=new WeakSet;Vo=function(t){var e;let a=((e=this.getAttribute("bounds")?ke(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),o=t.offsetWidth,l=-(r.left-a.left-o/2),d=a.right-r.left-o/2;return{box:{width:o,min:l,max:d},bounds:a,range:r}};Vr=new WeakSet;Go=function(t,e){let i=`${e*100}%`,{width:a,min:r,max:o}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(o)){let d=`calc(1 / var(--_range-width) * 100 * ${o}% - var(--media-box-padding-right))`;i=`min(${i}, ${d})`}return i};Gr=new WeakSet;Ko=function(t,e){let{width:i,min:a,max:r}=t.box,o=e*t.range.width;if(o<a+Z(this,Qi)){let l=t.range.left-t.bounds.left-Z(this,Qi);return`${o-i/2+l}px`}if(o>r-Z(this,zi)){let l=t.bounds.right-t.range.right-Z(this,zi);return`${o+i/2-l-t.range.width}px`}return 0};Ho=new WeakSet;mu=function(t){let e=[...Z(this,$r)].some(_=>t.composedPath().includes(_));if(!this.dragging&&(e||!t.composedPath().includes(this))){ae(this,Xi,Kr).call(this,null);return}let i=this.mediaSeekableEnd;if(!i)return;let a=O(this.shadowRoot,"#preview-rail"),r=O(this.shadowRoot,'[part~="preview-box"]'),o=ae(this,Fr,Vo).call(this,Z(this,Wr)),l=(t.clientX-o.range.left)/o.range.width;l=Math.max(0,Math.min(1,l));let d=ae(this,Vr,Go).call(this,o,l),u=ae(this,Gr,Ko).call(this,o,l);a.style.transform=`translateX(${d})`,a.style.setProperty("--_range-width",`${o.range.width}`),r.style.setProperty("--_box-shift",`${u}`),r.style.setProperty("--_box-width",`${o.box.width}px`);let E=Math.round(Z(this,Zi))-Math.round(l*i);Math.abs(E)<1&&l>.01&&l<.99||(Ne(this,Zi,l*i),ae(this,Xi,Kr).call(this,Z(this,Zi)))};Xi=new WeakSet;Kr=function(t){this.dispatchEvent(new s.CustomEvent(m.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))};$o=new WeakSet;hu=function(){Z(this,wt).stop();let t=vu(this);this.dispatchEvent(new s.CustomEvent(m.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))};s.customElements.get("media-time-range")||s.customElements.define("media-time-range",qr);var qo=qr;var di={PLACEMENT:"placement",BOUNDS:"bounds"},Eu=c.createElement("template");Eu.innerHTML=`
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
`;var Yr=class extends s.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!ba(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}let a=getComputedStyle(this),r=(e=ke(this,"#"+this.bounds))!=null?e:V(this);if(!r)return;let{x:o,width:l}=r.getBoundingClientRect(),{x:d,width:u}=this.getBoundingClientRect(),E=d+u,_=o+l,g=a.getPropertyValue("--media-tooltip-offset-x"),v=g?parseFloat(g.replace("px","")):0,f=a.getPropertyValue("--media-tooltip-container-margin"),P=f?parseFloat(f.replace("px","")):0,k=d-o+v-P,M=E-_+v+P;if(k<0){this.style.setProperty("--media-tooltip-offset-x",`${k}px`);return}if(M>0){this.style.setProperty("--media-tooltip-offset-x",`${M}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Eu.content.cloneNode(!0))),this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[di.PLACEMENT,di.BOUNDS]}get placement(){return S(this,di.PLACEMENT)}set placement(e){y(this,di.PLACEMENT,e)}get bounds(){return S(this,di.BOUNDS)}set bounds(e){y(this,di.BOUNDS,e)}};s.customElements.get("media-tooltip")||s.customElements.define("media-tooltip",Yr);var Yo=Yr;var Zm=1,Qm=t=>t.mediaMuted?0:t.mediaVolume,zm=t=>`${Math.round(t*100)}%`,Zr=class extends ct{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_VOLUME,n.MEDIA_MUTED,n.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{let e=this.range.value,i=new s.CustomEvent(m.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",h("volume"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===n.MEDIA_VOLUME||e===n.MEDIA_MUTED)&&(this.range.valueAsNumber=Qm(this),this.range.setAttribute("aria-valuetext",zm(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return w(this,n.MEDIA_VOLUME,Zm)}set mediaVolume(e){R(this,n.MEDIA_VOLUME,e)}get mediaMuted(){return A(this,n.MEDIA_MUTED)}set mediaMuted(e){T(this,n.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return S(this,n.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){y(this,n.MEDIA_VOLUME_UNAVAILABLE,e)}};s.customElements.get("media-volume-range")||s.customElements.define("media-volume-range",Zr);var Zo=Zr;var og=I({tagName:"media-gesture-receiver",elementClass:Mn,react:D}),sg=I({tagName:"media-container",elementClass:Dn,react:D}),lg=I({tagName:"media-controller",elementClass:Vn,react:D}),dg=I({tagName:"media-chrome-button",elementClass:qn,react:D}),ug=I({tagName:"media-airplay-button",elementClass:Yn,react:D}),cg=I({tagName:"media-captions-button",elementClass:Zn,react:D}),mg=I({tagName:"media-cast-button",elementClass:Qn,react:D}),hg=I({tagName:"media-chrome-dialog",elementClass:ro,react:D}),pg=I({tagName:"media-chrome-range",elementClass:vo,react:D}),vg=I({tagName:"media-control-bar",elementClass:Eo,react:D}),Eg=I({tagName:"media-text-display",elementClass:fo,react:D}),fg=I({tagName:"media-duration-display",elementClass:go,react:D}),gg=I({tagName:"media-error-dialog",elementClass:_o,react:D}),bg=I({tagName:"media-fullscreen-button",elementClass:Ao,react:D}),_g=I({tagName:"media-live-button",elementClass:To,react:D}),Ag=I({tagName:"media-loading-indicator",elementClass:Io,react:D}),Tg=I({tagName:"media-mute-button",elementClass:So,react:D}),Ig=I({tagName:"media-pip-button",elementClass:yo,react:D}),Sg=I({tagName:"media-playback-rate-button",elementClass:Co,react:D}),yg=I({tagName:"media-play-button",elementClass:wo,react:D}),kg=I({tagName:"media-poster-image",elementClass:Lo,react:D}),Mg=I({tagName:"media-preview-chapter-display",elementClass:Ro,react:D}),Cg=I({tagName:"media-preview-thumbnail",elementClass:xo,react:D}),wg=I({tagName:"media-preview-time-display",elementClass:Do,react:D}),Lg=I({tagName:"media-seek-backward-button",elementClass:Uo,react:D}),Rg=I({tagName:"media-seek-forward-button",elementClass:Po,react:D}),xg=I({tagName:"media-time-display",elementClass:No,react:D}),Dg=I({tagName:"media-time-range",elementClass:qo,react:D}),Ug=I({tagName:"media-tooltip",elementClass:Yo,react:D}),Pg=I({tagName:"media-volume-range",elementClass:Zo,react:D});import le from"react";function fu({anchor:t,floating:e,placement:i}){let a=Jm({anchor:t,floating:e}),{x:r,y:o}=eh(a,i);return{x:r,y:o}}function Jm({anchor:t,floating:e}){return{anchor:jm(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}function jm(t,e){var i;let a=t.getBoundingClientRect(),r=(i=e==null?void 0:e.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}function eh({anchor:t,floating:e},i){let a=th(i)==="x"?"y":"x",r=a==="y"?"height":"width",o=gu(i),l=t.x+t.width/2-e.width/2,d=t.y+t.height/2-e.height/2,u=t[r]/2-e[r]/2,E;switch(o){case"top":E={x:l,y:t.y-e.height};break;case"bottom":E={x:l,y:t.y+t.height};break;case"right":E={x:t.x+t.width,y:d};break;case"left":E={x:t.x-e.width,y:d};break;default:E={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":E[a]-=u;break;case"end":E[a]+=u;break}return E}function gu(t){return t.split("-")[0]}function th(t){return["top","bottom"].includes(gu(t))?"y":"x"}var mt=class extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}},Qr=class extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}};var os=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},x=(t,e,i)=>(os(t,e,"read from private field"),i?i.call(t):e.get(t)),$=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Be=(t,e,i,a)=>(os(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),F=(t,e,i)=>(os(t,e,"access private method"),i),He,Rt,ht,zr,Xr,xt,ea,Qo,bu,en,Jr,zo,Xo,_u,Jo,Au,jo,Tu,ui,ci,mi,ta,tn,ss,es,Iu,ls,Su,ts,yu,ds,ku,is,Mu,as,Cu,Ji,an,rs,wu,ji,rn,jr,ns;function $e({type:t,text:e,value:i,checked:a}){let r=c.createElement("media-chrome-menu-item");r.type=t!=null?t:"",r.part.add("menu-item"),t&&r.part.add(t),r.value=i,r.checked=a;let o=c.createElement("span");return o.textContent=e,r.append(o),r}function Se(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if((i==null?void 0:i.nodeName)=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;let a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}var Lu=c.createElement("template");Lu.innerHTML=`
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
`;var Lt={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"},Q=class extends s.HTMLElement{constructor(){super(),$(this,Qo),$(this,Jr),$(this,Xo),$(this,Jo),$(this,jo),$(this,mi),$(this,tn),$(this,es),$(this,ls),$(this,ts),$(this,ds),$(this,is),$(this,as),$(this,Ji),$(this,rs),$(this,ji),$(this,jr),$(this,He,null),$(this,Rt,null),$(this,ht,null),$(this,zr,new Set),$(this,Xr,void 0),$(this,xt,!1),$(this,ea,null),$(this,en,()=>{let e=x(this,zr),i=new Set(this.items);for(let a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(let a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));Be(this,zr,i)}),$(this,ui,()=>{F(this,mi,ta).call(this),F(this,tn,ss).call(this,!1)}),$(this,ci,()=>{F(this,mi,ta).call(this)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.nativeEl=this.constructor.template.content.cloneNode(!0),this.shadowRoot.append(this.nativeEl)),this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),this.shadowRoot.addEventListener("slotchange",this),Be(this,Xr,new MutationObserver(x(this,en))),x(this,Xr).observe(this.defaultSlot,{childList:!0})}static get observedAttributes(){return[Lt.DISABLED,Lt.HIDDEN,Lt.STYLE,Lt.ANCHOR,C.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":F(this,Qo,bu).call(this,e);break;case"invoke":F(this,Xo,_u).call(this,e);break;case"click":F(this,es,Iu).call(this,e);break;case"toggle":F(this,ts,yu).call(this,e);break;case"focusout":F(this,is,Mu).call(this,e);break;case"keydown":F(this,as,Cu).call(this,e);break}}connectedCallback(){var e,i;Be(this,ea,kn(this.shadowRoot,":host")),F(this,Jr,zo).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),Be(this,He,Ea(this)),(i=(e=x(this,He))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(Ye(ia(this),x(this,ui)),Ye(this,x(this,ci)))}disconnectedCallback(){var e,i;Ze(ia(this),x(this,ui)),Ze(this,x(this,ci)),this.disable(),(i=(e=x(this,He))==null?void 0:e.unassociateElement)==null||i.call(e,this),Be(this,He,null)}attributeChangedCallback(e,i,a){var r,o,l,d;e===Lt.HIDDEN&&a!==i?(x(this,xt)||Be(this,xt,!0),this.hidden?F(this,jo,Tu).call(this):F(this,Jo,Au).call(this),this.dispatchEvent(new Qr({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===C.MEDIA_CONTROLLER?(i&&((o=(r=x(this,He))==null?void 0:r.unassociateElement)==null||o.call(r,this),Be(this,He,null)),a&&this.isConnected&&(Be(this,He,Ea(this)),(d=(l=x(this,He))==null?void 0:l.associateElement)==null||d.call(l,this))):e===Lt.DISABLED&&a!==i?a==null?this.enable():this.disable():e===Lt.STYLE&&a!==i&&F(this,Jr,zo).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=Et(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(ih)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){let i=this.items.find(a=>a.value===e);i&&F(this,jr,ns).call(this,i)}focus(){if(Be(this,Rt,wi()),this.items.length){F(this,ji,rn).call(this,this.items[0]),this.items[0].focus();return}let e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e==null||e.focus()}handleSelect(e){var i;let a=F(this,Ji,an).call(this,e);a&&(F(this,jr,ns).call(this,a,a.type==="checkbox"),x(this,ht)&&!this.hidden&&((i=x(this,Rt))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;let{key:r}=e,o=this.items,l=(a=(i=F(this,Ji,an).call(this,e))!=null?i:F(this,rs,wu).call(this))!=null?a:o[0],d=o.indexOf(l),u=Math.max(0,d);r==="ArrowDown"?u++:r==="ArrowUp"?u--:e.key==="Home"?u=0:e.key==="End"&&(u=o.length-1),u<0&&(u=o.length-1),u>o.length-1&&(u=0),F(this,ji,rn).call(this,o[u]),o[u].focus()}};He=new WeakMap;Rt=new WeakMap;ht=new WeakMap;zr=new WeakMap;Xr=new WeakMap;xt=new WeakMap;ea=new WeakMap;Qo=new WeakSet;bu=function(t){let e=t.target;for(let i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();if(["header","title"].includes(e.name)){let i=this.shadowRoot.querySelector('slot[name="header"]');i.hidden=e.assignedNodes().length===0}e.name||x(this,en).call(this)};en=new WeakMap;Jr=new WeakSet;zo=function(){var t;let e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")};Xo=new WeakSet;_u=function(t){Be(this,ht,t.relatedTarget),ne(this,t.relatedTarget)||(this.hidden=!this.hidden)};Jo=new WeakSet;Au=function(){var t;(t=x(this,ht))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),Ye(ia(this),x(this,ui)),Ye(this,x(this,ci))};jo=new WeakSet;Tu=function(){var t;(t=x(this,ht))==null||t.setAttribute("aria-expanded","false"),Ze(ia(this),x(this,ui)),Ze(this,x(this,ci))};ui=new WeakMap;ci=new WeakMap;mi=new WeakSet;ta=function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;let{x:e,y:i}=fu({anchor:this.anchorElement,floating:this,placement:"top-start"});t!=null||(t=this.offsetWidth);let r=ia(this).getBoundingClientRect(),o=r.width-e-t,l=r.height-i-this.offsetHeight,{style:d}=x(this,ea);d.setProperty("position","absolute"),d.setProperty("right",`${Math.max(0,o)}px`),d.setProperty("--_menu-bottom",`${l}px`);let u=getComputedStyle(this),_=d.getPropertyValue("--_menu-bottom")===u.bottom?l:parseFloat(u.bottom),g=r.height-_-parseFloat(u.marginBottom);this.style.setProperty("--_menu-max-height",`${g}px`)};tn=new WeakSet;ss=function(t){let e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e==null?void 0:e.querySelector('[role="menu"]'),{style:a}=x(this,ea);if(t||a.setProperty("--media-menu-transition-in","none"),i){let r=i.offsetHeight,o=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${o}px`),this.style.setProperty("min-height",`${r}px`),F(this,mi,ta).call(this,o)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),F(this,mi,ta).call(this);a.removeProperty("--media-menu-transition-in")};es=new WeakSet;Iu=function(t){var e;if(t.stopPropagation(),t.composedPath().includes(x(this,ls,Su))){(e=x(this,Rt))==null||e.focus(),this.hidden=!0;return}let i=F(this,Ji,an).call(this,t);!i||i.hasAttribute("disabled")||(F(this,ji,rn).call(this,i),this.handleSelect(t))};ls=new WeakSet;Su=function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))};ts=new WeakSet;yu=function(t){if(t.target===this)return;F(this,ds,ku).call(this);let e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(let i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new mt({relatedTarget:i}));for(let i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);F(this,tn,ss).call(this,!0)};ds=new WeakSet;ku=function(){let e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)};is=new WeakSet;Mu=function(t){var e;ne(this,t.relatedTarget)||(x(this,xt)&&((e=x(this,Rt))==null||e.focus()),x(this,ht)&&x(this,ht)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))};as=new WeakSet;Cu=function(t){var e,i,a,r,o;let{key:l,ctrlKey:d,altKey:u,metaKey:E}=t;if(!(d||u||E)&&this.keysUsed.includes(l))if(t.preventDefault(),t.stopPropagation(),l==="Tab"){if(x(this,xt)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else l==="Escape"?((o=x(this,Rt))==null||o.focus(),x(this,xt)&&(this.hidden=!0)):l==="Enter"||l===" "?this.handleSelect(t):this.handleMove(t)};Ji=new WeakSet;an=function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))};rs=new WeakSet;wu=function(){return this.items.find(t=>t.tabIndex===0)};ji=new WeakSet;rn=function(t){for(let e of this.items)e.tabIndex=e===t?0:-1};jr=new WeakSet;ns=function(t,e){let i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))};Q.template=Lu;function ih(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t==null?void 0:t.role)}function ia(t){var e;return(e=t.getAttribute("bounds")?ke(t,`#${t.getAttribute("bounds")}`):V(t)||t.parentElement)!=null?e:t}s.customElements.get("media-chrome-menu")||s.customElements.define("media-chrome-menu",Q);var vs=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Fe=(t,e,i)=>(vs(t,e,"read from private field"),i?i.call(t):e.get(t)),je=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},us=(t,e,i,a)=>(vs(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),We=(t,e,i)=>(vs(t,e,"access private method"),i),nn,ra,cs,Ru,Es,xu,fs,Du,Ve,hi,na,ms,Uu,on,hs,Pu=c.createElement("template");Pu.innerHTML=`
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
`;var ge={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"},Ge=class extends s.HTMLElement{constructor(){super(),je(this,cs),je(this,Es),je(this,fs),je(this,hi),je(this,ms),je(this,on),je(this,nn,!1),je(this,ra,void 0),je(this,Ve,()=>{var e,i;this.setAttribute("submenusize",`${this.submenuElement.items.length}`);let a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],o=(i=r==null?void 0:r.dataset.description)!=null?i:r==null?void 0:r.text,l=c.createElement("span");l.textContent=o!=null?o:"",a.replaceChildren(l)}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.append(this.constructor.template.content.cloneNode(!0))),this.shadowRoot.addEventListener("slotchange",this)}static get observedAttributes(){return[ge.TYPE,ge.DISABLED,ge.CHECKED,ge.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),aa(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":We(this,cs,Ru).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":We(this,ms,Uu).call(this,e);break;case"keyup":We(this,hi,na).call(this,e);break}}attributeChangedCallback(e,i,a){e===ge.CHECKED&&aa(this)&&!Fe(this,nn)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===ge.TYPE&&a!==i?this.role="menuitem"+a:e===ge.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(ge.DISABLED)||this.enable(),this.role="menuitem"+this.type,us(this,ra,ps(this,this.parentNode)),We(this,on,hs).call(this)}disconnectedCallback(){this.disable(),We(this,on,hs).call(this),us(this,ra,null)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=Et(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(ge.TYPE))!=null?e:""}set type(e){this.setAttribute(ge.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(ge.VALUE))!=null?e:this.text}set value(e){this.setAttribute(ge.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(aa(this))return this.getAttribute("aria-checked")==="true"}set checked(e){aa(this)&&(us(this,nn,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){aa(this)||this.invokeTargetElement&&ne(this,e.target)&&this.invokeTargetElement.dispatchEvent(new mt({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};nn=new WeakMap;ra=new WeakMap;cs=new WeakSet;Ru=function(t){let e=t.target;if(!(e!=null&&e.name))for(let a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?We(this,Es,xu).call(this):We(this,fs,Du).call(this))};Es=new WeakSet;xu=async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",Fe(this,Ve)),this.submenuElement.addEventListener("addmenuitem",Fe(this,Ve)),this.submenuElement.addEventListener("removemenuitem",Fe(this,Ve)),Fe(this,Ve).call(this)};fs=new WeakSet;Du=function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",Fe(this,Ve)),this.submenuElement.removeEventListener("addmenuitem",Fe(this,Ve)),this.submenuElement.removeEventListener("removemenuitem",Fe(this,Ve)),Fe(this,Ve).call(this)};Ve=new WeakMap;hi=new WeakSet;na=function(t){let{key:e}=t;if(!this.keysUsed.includes(e)){this.removeEventListener("keyup",We(this,hi,na));return}this.handleClick(t)};ms=new WeakSet;Uu=function(t){let{metaKey:e,altKey:i,key:a}=t;if(e||i||!this.keysUsed.includes(a)){this.removeEventListener("keyup",We(this,hi,na));return}this.addEventListener("keyup",We(this,hi,na),{once:!0})};on=new WeakSet;hs=function(){var t;let e=(t=Fe(this,ra))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(let a of e)a.setAttribute("aria-checked","false");i==null||i.setAttribute("aria-checked","true")};Ge.template=Pu;function aa(t){return t.type==="radio"||t.type==="checkbox"}function ps(t,e){if(!t)return null;let{host:i}=t.getRootNode();return!e&&i?ps(t,i):e!=null&&e.items?e:ps(e,e==null?void 0:e.parentNode)}s.customElements.get("media-chrome-menu-item")||s.customElements.define("media-chrome-menu-item",Ge);var Ou=c.createElement("template");Ou.innerHTML=Q.template.innerHTML+`
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
`;var Dt=class extends Q{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:V(this).querySelector("media-settings-menu-button")}};Dt.template=Ou;s.customElements.get("media-settings-menu")||s.customElements.define("media-settings-menu",Dt);var Nu,sn=c.createElement("template");sn.innerHTML=Ge.template.innerHTML+`
  <style>
    slot:not([name="submenu"]) {
      opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
    }

    :host([aria-expanded="true"]:hover) {
      background: transparent;
    }
  </style>
`;(Nu=sn.content)!=null&&Nu.querySelector&&(sn.content.querySelector('slot[name="suffix"]').innerHTML=`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `);var Ut=class extends Ge{};Ut.template=sn;s.customElements.get("media-settings-menu-item")||s.customElements.define("media-settings-menu-item",Ut);var re=class extends N{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=Et(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new mt({relatedTarget:this}))}};s.customElements.get("media-chrome-menu-button")||s.customElements.define("media-chrome-menu-button",re);var Bu=c.createElement("template");Bu.innerHTML=`
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
`;var pi=class extends re{static get observedAttributes(){return[...super.observedAttributes,"target"]}constructor(){super({slotTemplate:Bu,tooltipContent:h("Settings")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:V(this).querySelector("media-settings-menu")}};s.customElements.get("media-settings-menu-button")||s.customElements.define("media-settings-menu-button",pi);var As=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},Hu=(t,e,i)=>(As(t,e,"read from private field"),i?i.call(t):e.get(t)),ln=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},gs=(t,e,i,a)=>(As(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),dn=(t,e,i)=>(As(t,e,"access private method"),i),oa,mn,un,bs,cn,_s,vi=class extends Q{constructor(){super(...arguments),ln(this,un),ln(this,cn),ln(this,oa,[]),ln(this,mn,void 0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_AUDIO_TRACK_LIST,n.MEDIA_AUDIO_TRACK_ENABLED,n.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===n.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(gs(this,oa,El(a!=null?a:"")),dn(this,un,bs).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",dn(this,cn,_s))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",dn(this,cn,_s))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=V(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return Hu(this,oa)}set mediaAudioTrackList(e){gs(this,oa,e),dn(this,un,bs).call(this)}get mediaAudioTrackEnabled(){var e;return(e=S(this,n.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){y(this,n.MEDIA_AUDIO_TRACK_ENABLED,e)}};oa=new WeakMap;mn=new WeakMap;un=new WeakSet;bs=function(){if(Hu(this,mn)===JSON.stringify(this.mediaAudioTrackList))return;gs(this,mn,JSON.stringify(this.mediaAudioTrackList));let t=this.mediaAudioTrackList;this.defaultSlot.textContent="";for(let e of t){let i=this.formatMenuItemText(e.label,e),a=$e({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(Se(this,"checked-indicator")),this.defaultSlot.append(a)}};cn=new WeakSet;_s=function(){if(this.value==null)return;let t=new s.CustomEvent(m.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-audio-track-menu")||s.customElements.define("media-audio-track-menu",vi);var ah=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`,$u=c.createElement("template");$u.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">${ah}</slot>
`;var Ei=class extends re{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_AUDIO_TRACK_ENABLED,n.MEDIA_AUDIO_TRACK_UNAVAILABLE]}constructor(){super({slotTemplate:$u,tooltipContent:h("Audio")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("Audio"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=V(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=S(this,n.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){y(this,n.MEDIA_AUDIO_TRACK_ENABLED,e)}};s.customElements.get("media-audio-track-menu-button")||s.customElements.define("media-audio-track-menu-button",Ei);var ks=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},rh=(t,e,i)=>(ks(t,e,"read from private field"),i?i.call(t):e.get(t)),Ts=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},nh=(t,e,i,a)=>(ks(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Is=(t,e,i)=>(ks(t,e,"access private method"),i),pn,Ss,Vu,hn,ys,oh=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`,Gu=c.createElement("template");Gu.innerHTML=Q.template.innerHTML+`
  <slot name="captions-indicator" hidden>${oh}</slot>`;var Pt=class extends Q{constructor(){super(...arguments),Ts(this,Ss),Ts(this,hn),Ts(this,pn,void 0)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_LIST&&i!==a?Is(this,Ss,Vu).call(this):e===n.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Is(this,hn,ys))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Is(this,hn,ys))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:V(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return Wu(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Fu(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Wu(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Fu(this,n.MEDIA_SUBTITLES_SHOWING,e)}};pn=new WeakMap;Ss=new WeakSet;Vu=function(){var t;if(rh(this,pn)===JSON.stringify(this.mediaSubtitlesList))return;nh(this,pn,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";let e=!this.value,i=$e({type:"radio",text:this.formatMenuItemText("Off"),value:"off",checked:e});i.prepend(Se(this,"checked-indicator")),this.defaultSlot.append(i);let a=this.mediaSubtitlesList;for(let r of a){let o=$e({type:"radio",text:this.formatMenuItemText(r.label,r),value:wa(r),checked:this.value==wa(r)});o.prepend(Se(this,"checked-indicator")),((t=r.kind)!=null?t:"subs")==="captions"&&o.append(Se(this,"captions-indicator")),this.defaultSlot.append(o)}};hn=new WeakSet;ys=function(){let t=this.mediaSubtitlesShowing,e=this.getAttribute(n.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t!=null&&t.length&&i&&this.dispatchEvent(new s.CustomEvent(m.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;let a=new s.CustomEvent(m.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)};Pt.template=Gu;var Wu=(t,e)=>{let i=t.getAttribute(e);return i?bt(i):[]},Fu=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=ze(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-menu")||s.customElements.define("media-captions-menu",Pt);var sh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},lh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},dh=(t,e,i,a)=>(sh(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ms,uh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,ch=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,Zu=c.createElement("template");Zu.innerHTML=`
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
    <slot name="on">${uh}</slot>
    <slot name="off">${ch}</slot>
  </slot>
`;var Ku=t=>{t.setAttribute("aria-checked",La(t).toString())},fi=class extends re{constructor(e={}){super({slotTemplate:Zu,tooltipContent:h("Captions"),...e}),lh(this,Ms,void 0),dh(this,Ms,!1)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_SUBTITLES_LIST,n.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("closed captions")),Ku(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_SUBTITLES_SHOWING&&Ku(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=V(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return qu(this,n.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Yu(this,n.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return qu(this,n.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Yu(this,n.MEDIA_SUBTITLES_SHOWING,e)}};Ms=new WeakMap;var qu=(t,e)=>{let i=t.getAttribute(e);return i?bt(i):[]},Yu=(t,e,i)=>{if(!(i!=null&&i.length)){t.removeAttribute(e);return}let a=ze(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)};s.customElements.get("media-captions-menu-button")||s.customElements.define("media-captions-menu-button",fi);var Qu=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},vn=(t,e,i)=>(Qu(t,e,"read from private field"),i?i.call(t):e.get(t)),Cs=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},sa=(t,e,i)=>(Qu(t,e,"access private method"),i),gi,la,En,fn,Ls,ws={RATES:"rates"},bi=class extends Q{constructor(){super(),Cs(this,la),Cs(this,fn),Cs(this,gi,new Me(this,ws.RATES,{defaultValue:Mo})),sa(this,la,En).call(this)}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,ws.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_PLAYBACK_RATE&&i!=a?this.value=a:e===ws.RATES&&i!=a&&(vn(this,gi).value=a,sa(this,la,En).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",sa(this,fn,Ls))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",sa(this,fn,Ls))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:V(this).querySelector("media-playback-rate-menu-button")}get rates(){return vn(this,gi)}set rates(e){e?Array.isArray(e)&&(vn(this,gi).value=e.join(" ")):vn(this,gi).value="",sa(this,la,En).call(this)}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,jt)}set mediaPlaybackRate(e){R(this,n.MEDIA_PLAYBACK_RATE,e)}};gi=new WeakMap;la=new WeakSet;En=function(){this.defaultSlot.textContent="";for(let t of this.rates){let e=$e({type:"radio",text:this.formatMenuItemText(`${t}x`,t),value:t,checked:this.mediaPlaybackRate==t});e.prepend(Se(this,"checked-indicator")),this.defaultSlot.append(e)}};fn=new WeakSet;Ls=function(){if(!this.value)return;let t=new s.CustomEvent(m.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-playback-rate-menu")||s.customElements.define("media-playback-rate-menu",bi);var mh=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},gn=(t,e,i)=>(mh(t,e,"read from private field"),i?i.call(t):e.get(t)),hh=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},_i,Rs={RATES:"rates"},ph=[1,1.2,1.5,1.7,2],xs=1,zu=c.createElement("template");zu.innerHTML=`
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
`;var Ai=class extends re{constructor(e={}){super({slotTemplate:zu,tooltipContent:h("Playback rate"),...e}),hh(this,_i,new Me(this,Rs.RATES,{defaultValue:ph})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${xs}x`}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_PLAYBACK_RATE,Rs.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Rs.RATES&&(gn(this,_i).value=a),e===n.MEDIA_PLAYBACK_RATE){let r=a?+a:Number.NaN,o=Number.isNaN(r)?xs:r;this.container.innerHTML=`${o}x`,this.setAttribute("aria-label",h("Playback rate {playbackRate}",{playbackRate:o}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:V(this).querySelector("media-playback-rate-menu")}get rates(){return gn(this,_i)}set rates(e){e?Array.isArray(e)&&(gn(this,_i).value=e.join(" ")):gn(this,_i).value=""}get mediaPlaybackRate(){return w(this,n.MEDIA_PLAYBACK_RATE,xs)}set mediaPlaybackRate(e){R(this,n.MEDIA_PLAYBACK_RATE,e)}};_i=new WeakMap;s.customElements.get("media-playback-rate-menu-button")||s.customElements.define("media-playback-rate-menu-button",Ai);var Us=(t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},da=(t,e,i)=>(Us(t,e,"read from private field"),i?i.call(t):e.get(t)),bn=(t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},Xu=(t,e,i,a)=>(Us(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),Ti=(t,e,i)=>(Us(t,e,"access private method"),i),ua,Si,Ii,ca,_n,Ds,yi=class extends Q{constructor(){super(...arguments),bn(this,Ii),bn(this,_n),bn(this,ua,[]),bn(this,Si,{})}static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_RENDITION_LIST,n.MEDIA_RENDITION_SELECTED,n.MEDIA_RENDITION_UNAVAILABLE,n.MEDIA_HEIGHT]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===n.MEDIA_RENDITION_SELECTED&&i!==a?(this.value=a!=null?a:"auto",Ti(this,Ii,ca).call(this)):e===n.MEDIA_RENDITION_LIST&&i!==a?(Xu(this,ua,pl(a)),Ti(this,Ii,ca).call(this)):e===n.MEDIA_HEIGHT&&i!==a&&Ti(this,Ii,ca).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Ti(this,_n,Ds))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Ti(this,_n,Ds))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:V(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return da(this,ua)}set mediaRenditionList(e){Xu(this,ua,e),Ti(this,Ii,ca).call(this)}get mediaRenditionSelected(){return S(this,n.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){y(this,n.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return w(this,n.MEDIA_HEIGHT)}set mediaHeight(e){R(this,n.MEDIA_HEIGHT,e)}};ua=new WeakMap;Si=new WeakMap;Ii=new WeakSet;ca=function(){if(da(this,Si).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&da(this,Si).mediaHeight===this.mediaHeight)return;da(this,Si).mediaRenditionList=JSON.stringify(this.mediaRenditionList),da(this,Si).mediaHeight=this.mediaHeight;let t=this.mediaRenditionList.sort((o,l)=>l.height-o.height);for(let o of t)o.selected=o.id===this.mediaRenditionSelected;this.defaultSlot.textContent="";let e=!this.mediaRenditionSelected;for(let o of t){let l=this.formatMenuItemText(`${Math.min(o.width,o.height)}p`,o),d=$e({type:"radio",text:l,value:`${o.id}`,checked:o.selected&&!e});d.prepend(Se(this,"checked-indicator")),this.defaultSlot.append(d)}let i=e?this.formatMenuItemText(`Auto (${this.mediaHeight}p)`):this.formatMenuItemText("Auto"),a=$e({type:"radio",text:i,value:"auto",checked:e}),r=this.mediaHeight>0?`Auto (${this.mediaHeight}p)`:"Auto";a.dataset.description=r,a.prepend(Se(this,"checked-indicator")),this.defaultSlot.append(a)};_n=new WeakSet;Ds=function(){if(this.value==null)return;let t=new s.CustomEvent(m.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)};s.customElements.get("media-rendition-menu")||s.customElements.define("media-rendition-menu",yi);var vh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`,Ju=c.createElement("template");Ju.innerHTML=`
  <style>
    :host([aria-expanded="true"]) slot[name=tooltip] {
      display: none;
    }
  </style>
  <slot name="icon">${vh}</slot>
`;var ki=class extends re{static get observedAttributes(){return[...super.observedAttributes,n.MEDIA_RENDITION_SELECTED,n.MEDIA_RENDITION_UNAVAILABLE,n.MEDIA_HEIGHT]}constructor(){super({slotTemplate:Ju,tooltipContent:h("Quality")})}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",h("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:V(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return S(this,n.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){y(this,n.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return w(this,n.MEDIA_HEIGHT)}set mediaHeight(e){R(this,n.MEDIA_HEIGHT,e)}};s.customElements.get("media-rendition-menu-button")||s.customElements.define("media-rendition-menu-button",ki);var k0=I({tagName:"media-chrome-menu",elementClass:Q,react:le}),M0=I({tagName:"media-chrome-menu-item",elementClass:Ge,react:le}),C0=I({tagName:"media-settings-menu",elementClass:Dt,react:le}),w0=I({tagName:"media-settings-menu-item",elementClass:Ut,react:le}),L0=I({tagName:"media-chrome-menu-button",elementClass:re,react:le}),R0=I({tagName:"media-settings-menu-button",elementClass:pi,react:le}),x0=I({tagName:"media-audio-track-menu",elementClass:vi,react:le}),D0=I({tagName:"media-audio-track-menu-button",elementClass:Ei,react:le}),U0=I({tagName:"media-captions-menu",elementClass:Pt,react:le}),P0=I({tagName:"media-captions-menu-button",elementClass:fi,react:le}),O0=I({tagName:"media-playback-rate-menu",elementClass:bi,react:le}),N0=I({tagName:"media-playback-rate-menu-button",elementClass:Ai,react:le}),B0=I({tagName:"media-rendition-menu",elementClass:yi,react:le}),H0=I({tagName:"media-rendition-menu-button",elementClass:ki,react:le});import Ps from"react";function fh(){return Ps.createElement(Ps.Fragment,null,Ps.createElement("template",{id:"news-theme",dangerouslySetInnerHTML:{__html:`
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
  </media-control-bar>`}}))}export{fh as default};
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
//# sourceMappingURL=news-theme.mjs.map
