"use strict";var ie=Object.create;var P=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,oe=Object.prototype.hasOwnProperty;var W=a=>{throw TypeError(a)};var re=(a,i)=>{for(var t in i)P(a,t,{get:i[t],enumerable:!0})},$=(a,i,t,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let h of ae(i))!oe.call(a,h)&&h!==t&&P(a,h,{get:()=>i[h],enumerable:!(s=se(i,h))||s.enumerable});return a};var J=(a,i,t)=>(t=a!=null?ie(ne(a)):{},$(i||!a||!a.__esModule?P(t,"default",{value:a,enumerable:!0}):t,a)),de=a=>$(P({},"__esModule",{value:!0}),a);var I=(a,i,t)=>i.has(a)||W("Cannot "+t);var e=(a,i,t)=>(I(a,i,"read from private field"),t?t.call(a):i.get(a)),u=(a,i,t)=>i.has(a)?W("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(a):i.set(a,t),o=(a,i,t,s)=>(I(a,i,"write to private field"),s?s.call(a,t):i.set(a,t),t),E=(a,i,t)=>(I(a,i,"access private method"),t);var ue={};re(ue,{default:()=>he});module.exports=de(ue);var Y=J(require("@mux/mux-video")),Z=J(require("@mux/mux-data-google-ima"));var A,c,r,D,w,b,T,m,d,L,y,p,R,O,X,_=class{constructor(i){u(this,O);u(this,A);u(this,c);u(this,r);u(this,D);u(this,w);u(this,b,!1);u(this,T,!1);u(this,m);u(this,d);u(this,L);u(this,y,null);u(this,p);u(this,R);o(this,d,i.videoElement),o(this,m,i.contentVideoElement),o(this,T,!e(this,m).paused),e(this,T)||e(this,m).addEventListener("play",()=>{o(this,T,!0)},{once:!0}),o(this,L,google.ima.ViewMode.NORMAL),o(this,p,i.originalSize),o(this,R,i.adContainer)}setupAdsManager(){e(this,A)||(o(this,A,new google.ima.AdDisplayContainer(e(this,R),e(this,m))),o(this,c,new google.ima.AdsLoader(e(this,A))),console.log("adsLoader",e(this,c)),e(this,c).addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,i=>{console.log("Ad Manager loaded",i);let t=new google.ima.AdsRenderingSettings;o(this,r,i.getAdsManager(e(this,m),t)),console.log("adsManager",e(this,r)),E(this,O,X).call(this)},!1),e(this,c).addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,i=>{console.log("AD_ERROR Loader",i),e(this,d).dispatchEvent(new Event("onAdsCompleted"))},!1))}static isGoogleImaSDKAvailable(){return"google"in globalThis&&"ima"in globalThis.google?!0:(console.error("Missing google.ima SDK. Make sure you include it via a script tag."),!1)}isReadyForInitialization(){return e(this,A)&&!e(this,r)}isInitialized(){return e(this,A)&&e(this,r)}isReadyForComplete(){return e(this,c)&&e(this,r)}initializeAdDisplayContainer(){var i;(i=e(this,A))==null||i.initialize()}requestAds(i){var s;console.log("requestAds",i);let t=new google.ima.AdsRequest;t.adTagUrl=i,(s=e(this,c))==null||s.requestAds(t)}contentComplete(){var i;(i=e(this,c))==null||i.contentComplete()}isAdPaused(){return e(this,r)&&e(this,b)}resumeAdManager(){var i;(i=e(this,r))==null||i.resume(),o(this,b,!1)}pauseAdManager(){e(this,r)&&e(this,r).pause()}getDuration(){var i,t,s;return(s=(i=e(this,w))==null?void 0:i.duration)!=null?s:(t=e(this,D))==null?void 0:t.getDuration()}getCurrentTime(){var i;return(i=e(this,w))==null?void 0:i.currentTime}getVolume(){var i,t;return(t=(i=e(this,r))==null?void 0:i.getVolume())!=null?t:1}setVolume(i){var t;(t=e(this,r))==null||t.setVolume(i)}isUsingSameVideoElement(){let i=e(this,R).querySelectorAll("video");return console.log("videoElements",i.length,i),i.length===0}updateViewMode(i){o(this,L,i?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL)}updateAdsManagerSize(i,t){var s;o(this,p,{...e(this,p),width:i,height:t}),(s=e(this,r))==null||s.resize(e(this,p).width,e(this,p).height,e(this,L))}get adsLoader(){return e(this,c)}};A=new WeakMap,c=new WeakMap,r=new WeakMap,D=new WeakMap,w=new WeakMap,b=new WeakMap,T=new WeakMap,m=new WeakMap,d=new WeakMap,L=new WeakMap,y=new WeakMap,p=new WeakMap,R=new WeakMap,O=new WeakSet,X=function(){var t,s,h,M,v,f,x,B,V,F,H;console.log("startAdsManager",e(this,r)),(t=e(this,r))==null||t.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,()=>{var j,Q;console.log("CONTENT_PAUSE_REQUESTED");let g=e(this,d).currentTime,C=!e(this,d).paused;(j=e(this,m))!=null&&j.paused||(Q=e(this,m))==null||Q.pause(),o(this,b,!1),o(this,y,{contentTime:g,wasPlaying:C,originalSrc:e(this,d).src}),this.isUsingSameVideoElement()?(e(this,d).muxDataKeepSession=!0,e(this,d).unload(),e(this,d).muxDataKeepSession=!1):e(this,m).style.display="none"}),(s=e(this,r))==null||s.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,()=>{var g;console.log("CONTENT_RESUME_REQUESTED"),e(this,y)&&this.isUsingSameVideoElement()?(e(this,d).muxDataKeepSession=!0,e(this,d).load(),e(this,d).muxDataKeepSession=!1,(g=e(this,y))!=null&&g.contentTime&&(e(this,d).currentTime=e(this,y).contentTime)):e(this,m).style.display="",o(this,y,null),o(this,w,void 0),o(this,D,void 0),e(this,d).dispatchEvent(new Event("durationchange")),e(this,d).dispatchEvent(new Event("onAdsCompleted"))},!1),(h=e(this,r))==null||h.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,console.log.bind(null,"AD_ERROR Manager"),!1),(M=e(this,r))==null||M.addEventListener(google.ima.AdEvent.Type.CLICK,g=>{this.updateViewMode(!1)},!1),(v=e(this,r))==null||v.addEventListener(google.ima.AdEvent.Type.LOADED,g=>{console.log("loaded",g),o(this,D,g.getAd()),e(this,d).dispatchEvent(new Event("durationchange")),e(this,d).dispatchEvent(new Event("timeupdate")),e(this,d).dispatchEvent(new Event("adbreaktotaladschange"))},!1),(f=e(this,r))==null||f.addEventListener(google.ima.AdEvent.Type.STARTED,g=>{console.log("started",g),o(this,D,g.getAd()),e(this,d).dispatchEvent(new Event("playing")),e(this,d).dispatchEvent(new Event("adbreakadpositionchange"))},!1),(x=e(this,r))==null||x.addEventListener(google.ima.AdEvent.Type.PAUSED,()=>{console.log("Ads paused"),o(this,b,!0),e(this,d).dispatchEvent(new Event("pause"))}),(B=e(this,r))==null||B.addEventListener(google.ima.AdEvent.Type.RESUMED,()=>{console.log("Ads resumed"),o(this,b,!1)}),(V=e(this,r))==null||V.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS,g=>{let C=e(this,d).duration;o(this,w,g.getAdData()),C!==e(this,d).duration&&e(this,d).dispatchEvent(new Event("durationchange")),e(this,d).dispatchEvent(new Event("timeupdate"))},!1),(F=e(this,r))==null||F.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED,()=>{console.log("volumeChanged"),e(this,d).dispatchEvent(new Event("volumechange"))},!1),(H=e(this,r))==null||H.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,()=>{console.log("allAdsCompleted")},!1);let i=()=>{var g,C;(g=e(this,r))==null||g.init(e(this,p).width,e(this,p).height,e(this,L)),(C=e(this,r))==null||C.start()};try{e(this,T)?i():e(this,m).addEventListener("play",()=>{o(this,T,!0),e(this,m).pause(),i()},{once:!0})}catch{console.error("Failed to start ads! Make sure you include the google.ima SDK as a script tag and that it is loaded before attempting ad playback")}};var le=(a={})=>" "+Object.entries(a).map(([i,t])=>t===""?`${i}`:`${i}="${t}"`).join(" "),k={AD_TAG_URL:"adtagurl",AD_BREAK:"adbreak",ALLOW_AD_BLOCKER:"allow-ad-blocker"},n,U,l,ee,te,N,z,q,K,G,S=class extends Y.default{constructor(){super();u(this,l);u(this,n);u(this,U);new ResizeObserver(s=>{var h;for(let M of s){let{width:v,height:f}=M.contentRect;v>0&&f>0&&((h=e(this,n))==null||h.updateAdsManagerSize(v,f))}}).observe(this)}connectedCallback(){if(console.log("MuxVideoAds connectedCallback"),super.connectedCallback(),!_.isGoogleImaSDKAvailable()){console.error("Missing google.ima SDK. Make sure you include it via a script tag."),this.allowAdBlocker?o(this,l,!1,z):E(this,l,ee).call(this);return}console.log("AdBreak connectedCallbk",this.adBreak,this.adTagUrl);let t={videoElement:this,contentVideoElement:this.nativeEl,originalSize:this.getBoundingClientRect(),adContainer:e(this,l,N)};o(this,n,new _(t)),e(this,n).setupAdsManager(),E(this,l,te).call(this)}get adTagUrl(){var t;return(t=this.getAttribute(k.AD_TAG_URL))!=null?t:void 0}set adTagUrl(t){if(t!==this.adTagUrl){if(t===void 0){this.removeAttribute(k.AD_TAG_URL);return}this.setAttribute(k.AD_TAG_URL,t)}}get adBreak(){return this.hasAttribute(k.AD_BREAK)}onEnded(){var t;this.adTagUrl&&((t=e(this,n))!=null&&t.isReadyForComplete())&&e(this,n).contentComplete()}handleEvent(t){this.adBreak&&t.type==="ended"||super.handleEvent(t)}play(){var h,M,v,f,x,B,V;if(this.adTagUrl&&this.adBreak)return(h=e(this,n))!=null&&h.isAdPaused()&&((M=e(this,n))==null||M.resumeAdManager()),Promise.resolve().then(()=>{this.dispatchEvent(new Event("play")),this.dispatchEvent(new Event("playing"))});let s=!((v=e(this,n))!=null&&v.adsLoader)&&this.allowAdBlocker;return this.adTagUrl&&!s?(o(this,U,this.nativeEl.currentTime),o(this,l,!0,z),this.dispatchEvent(new Event("durationchange")),E(this,l,K).call(this,!0),(f=e(this,n))!=null&&f.isReadyForInitialization()&&e(this,n).initializeAdDisplayContainer(),(x=e(this,n))!=null&&x.isReadyForInitialization()||(B=e(this,n))!=null&&B.isInitialized()?(e(this,n).requestAds(this.adTagUrl),super.play()):((V=e(this,n))!=null&&V.isAdPaused()&&e(this,n).resumeAdManager(),Promise.resolve().then(()=>{this.dispatchEvent(new Event("play"))}))):(E(this,l,K).call(this,!1),super.play())}pause(){var t;this.adBreak&&((t=e(this,n))==null||t.pauseAdManager()),super.pause()}get paused(){var t,s;return this.adBreak?(s=(t=e(this,n))==null?void 0:t.isAdPaused())!=null?s:!1:super.paused}get duration(){var t,s;return this.adBreak?(s=(t=e(this,n))==null?void 0:t.getDuration())!=null?s:0:super.duration}get currentTime(){var t,s;return this.adBreak?(s=(t=e(this,n))==null?void 0:t.getCurrentTime())!=null?s:0:super.currentTime}set currentTime(t){if(this.adBreak){console.error("CANNOT SEEK DURING AD BREAK");return}super.currentTime=t}get volume(){var t,s;return this.adBreak?(s=(t=e(this,n))==null?void 0:t.getVolume())!=null?s:0:super.volume}set volume(t){var s;this.adBreak&&((s=e(this,n))==null||s.setVolume(t)),super.volume=t}get muted(){var t;return this.adBreak?!((t=e(this,n))!=null&&t.getVolume()):super.muted}set muted(t){var s;this.adBreak&&((s=e(this,n))==null||s.setVolume(t?0:this.volume)),super.muted=t}get readyState(){return this.adBreak?4:super.readyState}async requestPictureInPicture(){if(this.adBreak)throw new Error("Cannot use PiP while ads are playing!");return super.requestPictureInPicture()}get muxDataSDK(){return Z.default}get muxDataSDKOptions(){var t;return{imaAdsLoader:(t=e(this,n))==null?void 0:t.adsLoader}}set muxDataKeepSession(t){this.toggleAttribute("mux-data-keep-session",!!t)}get muxDataKeepSession(){return this.hasAttribute("mux-data-keep-session")}get allowAdBlocker(){return this.hasAttribute(k.ALLOW_AD_BLOCKER)}set allowAdBlocker(t){this.toggleAttribute(k.ALLOW_AD_BLOCKER,!!t)}};n=new WeakMap,U=new WeakMap,l=new WeakSet,ee=function(){var s,h;let t=document.createElement("div");t.id="imaUnavailableMessage",t.innerHTML=`
  <h4>Ad experience unavailable.</h4>
  <span>This may be due to a missing SDK, network issue, or ad blocker.</span>
`,(h=(s=this.shadowRoot)==null?void 0:s.getElementById("mainContainer"))==null||h.appendChild(t)},te=function(){this.addEventListener("loadedmetadata",()=>{var t,s;if(console.log("loadedmetadata",{adTagUrl:this.adTagUrl,isReady:(t=e(this,n))==null?void 0:t.isReadyForInitialization()}),this.adTagUrl&&((s=e(this,n))!=null&&s.isReadyForInitialization())){e(this,n).initializeAdDisplayContainer();let h=this.nativeEl.paused;this.nativeEl.paused||this.nativeEl.pause(),h||e(this,n).requestAds(this.adTagUrl)}},{once:!0}),this.nativeEl.addEventListener("play",t=>{if(this.adBreak&&!e(this,l,G)){console.warn("Video play prevented during ad break"),this.nativeEl.pause();return}}),this.nativeEl.addEventListener("seeking",t=>{var s;this.adBreak&&!e(this,l,G)&&(console.warn("Seek prevented during ad break"),this.nativeEl.currentTime=(s=e(this,U))!=null?s:0,this.nativeEl.dispatchEvent(new Event("timeupdate")))}),this.addEventListener("onAdsCompleted",()=>{o(this,l,!1,z),this.dispatchEvent(new Event("durationchange")),this.adTagUrl=void 0,E(this,l,K).call(this,!1),E(this,l,q).call(this,!1),this.addEventListener("ended",this.onEnded,{once:!0}),setTimeout(()=>{this.play()},100)}),globalThis.addEventListener("mediaenterfullscreenrequest",()=>{var t;(t=e(this,n))==null||t.updateViewMode(!0)}),globalThis.addEventListener("mediaexitfullscreenrequest",()=>{var t;(t=e(this,n))==null||t.updateViewMode(!1)})},N=function(){var t;return(t=this.shadowRoot)==null?void 0:t.getElementById("adContainer")},z=function(t){t!==this.adBreak&&(this.toggleAttribute(k.AD_BREAK,!!t),E(this,l,q).call(this,t))},q=function(t){this.dispatchEvent(new CustomEvent("adbreakchange",{detail:{isAdBreak:t},composed:!0,bubbles:!0}))},K=function(t){var s;(s=e(this,l,N))==null||s.classList.toggle("ad-playing",t)},G=function(){if(e(this,n))return e(this,n).isUsingSameVideoElement()},S.getTemplateHTML=t=>`
<style>
:host {
  aspect-ratio: var(--media-aspect-ratio, 16 / 9);
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  display: block;
}
video {
  display: block;
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  object-fit: var(--media-object-fit, contain);
  object-position: var(--media-object-position, 50% 50%);
}
video::-webkit-media-text-track-container {
  transform: var(--media-webkit-text-track-transform);
  transition: var(--media-webkit-text-track-transition);
}
#mainContainer {
    position: relative;
    width: 100%;
    height: 100%;
}
#adContainer {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
    width: 100%;
    height: 100%;
}
#mainContainer #adContainer.ad-playing {
    z-index: 2;
}
#imaUnavailableMessage {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 0.9em;
  text-align: center;
  line-height: 1.4;
  width: 100%;
  height: 100%;
  align-items: center;
  align-content: center;
  cursor: not-allowed;

  h4{
    font-size: 1rem;
    margin:0;
  }
}
</style>
<div id="mainContainer">
    <slot name="media">
      <video id="contentElement" ${le(t)}></video>
    </slot>
  <div id="adContainer"></div>
</div>
<slot></slot>
  `;globalThis.customElements&&!globalThis.customElements.get("mux-video-ads")&&(globalThis.customElements.define("mux-video-ads",S),globalThis.MuxVideoAds=S);var he=S;
//# sourceMappingURL=index.cjs.js.map
