"use strict";var ie=Object.create;var _=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,oe=Object.prototype.hasOwnProperty;var W=a=>{throw TypeError(a)};var re=(a,i)=>{for(var e in i)_(a,e,{get:i[e],enumerable:!0})},$=(a,i,e,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let h of ae(i))!oe.call(a,h)&&h!==e&&_(a,h,{get:()=>i[h],enumerable:!(s=se(i,h))||s.enumerable});return a};var J=(a,i,e)=>(e=a!=null?ie(ne(a)):{},$(i||!a||!a.__esModule?_(e,"default",{value:a,enumerable:!0}):e,a)),de=a=>$(_({},"__esModule",{value:!0}),a);var K=(a,i,e)=>i.has(a)||W("Cannot "+e);var t=(a,i,e)=>(K(a,i,"read from private field"),e?e.call(a):i.get(a)),u=(a,i,e)=>i.has(a)?W("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(a):i.set(a,e),r=(a,i,e,s)=>(K(a,i,"write to private field"),s?s.call(a,e):i.set(a,e),e),c=(a,i,e)=>(K(a,i,"access private method"),e);var ue={};re(ue,{default:()=>he});module.exports=de(ue);var Y=J(require("@mux/mux-video")),Z=J(require("@mux/mux-data-google-ima"));var A,m,o,y,D,b,E,d,w,T,p,k,U,X,B=class{constructor(i){u(this,U);u(this,A);u(this,m);u(this,o);u(this,y);u(this,D);u(this,b,!1);u(this,E);u(this,d);u(this,w);u(this,T,null);u(this,p);u(this,k);r(this,d,i.videoElement),r(this,E,i.contentVideoElement),r(this,w,google.ima.ViewMode.NORMAL),r(this,p,i.originalSize),r(this,k,i.adContainer)}setupAdsManager(){t(this,A)||(r(this,A,new google.ima.AdDisplayContainer(t(this,k),t(this,E))),r(this,m,new google.ima.AdsLoader(t(this,A))),console.log("adsLoader",t(this,m)),t(this,m).addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,i=>{console.log("Ad Manager loaded",i);let e=new google.ima.AdsRenderingSettings;r(this,o,i.getAdsManager(t(this,E),e)),console.log("adsManager",t(this,o)),c(this,U,X).call(this)},!1),t(this,m).addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,i=>{console.log("AD_ERROR Loader",i),t(this,d).dispatchEvent(new Event("onAdsCompleted"))},!1))}static isGoogleImaSDKAvailable(){return"google"in globalThis&&"ima"in globalThis.google?!0:(console.error("Missing google.ima SDK. Make sure you include it via a script tag."),!1)}isReadyForInitialization(){return t(this,A)&&!t(this,o)}isInitialized(){return t(this,A)&&t(this,o)}isReadyForComplete(){return t(this,m)&&t(this,o)}initializeAdDisplayContainer(){var i;(i=t(this,A))==null||i.initialize()}requestAds(i){var s;console.log("requestAds",i);let e=new google.ima.AdsRequest;e.adTagUrl=i,(s=t(this,m))==null||s.requestAds(e)}contentComplete(){var i;(i=t(this,m))==null||i.contentComplete()}isAdPaused(){return t(this,o)&&t(this,b)}resumeAdManager(){var i;(i=t(this,o))==null||i.resume(),r(this,b,!1)}pauseAdManager(){t(this,o)&&t(this,o).pause()}getDuration(){var i,e,s;return(s=(i=t(this,D))==null?void 0:i.duration)!=null?s:(e=t(this,y))==null?void 0:e.getDuration()}getCurrentTime(){var i;return(i=t(this,D))==null?void 0:i.currentTime}getVolume(){var i,e;return(e=(i=t(this,o))==null?void 0:i.getVolume())!=null?e:1}setVolume(i){var e;(e=t(this,o))==null||e.setVolume(i)}isUsingSameVideoElement(){let i=t(this,k).querySelectorAll("video");return console.log("videoElements",i.length,i),i.length===0}updateViewMode(i){r(this,w,i?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL)}updateAdsManagerSize(i,e){var s;r(this,p,{...t(this,p),width:i,height:e}),(s=t(this,o))==null||s.resize(t(this,p).width,t(this,p).height,t(this,w))}get adsLoader(){return t(this,m)}};A=new WeakMap,m=new WeakMap,o=new WeakMap,y=new WeakMap,D=new WeakMap,b=new WeakMap,E=new WeakMap,d=new WeakMap,w=new WeakMap,T=new WeakMap,p=new WeakMap,k=new WeakMap,U=new WeakSet,X=function(){var i,e,s,h,M,v,f,R,S,x,G,F,H;console.log("startAdsManager",t(this,o)),(i=t(this,o))==null||i.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,()=>{var j,Q;console.log("CONTENT_PAUSE_REQUESTED");let g=t(this,d).currentTime,z=!t(this,d).paused;(j=t(this,E))!=null&&j.paused||(Q=t(this,E))==null||Q.pause(),r(this,b,!1),r(this,T,{contentTime:g,wasPlaying:z,originalSrc:t(this,d).src}),this.isUsingSameVideoElement()?(t(this,d).muxDataKeepSession=!0,t(this,d).unload(),t(this,d).muxDataKeepSession=!1):t(this,E).style.display="none"}),(e=t(this,o))==null||e.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,()=>{var g;console.log("CONTENT_RESUME_REQUESTED"),t(this,T)&&this.isUsingSameVideoElement()?(t(this,d).muxDataKeepSession=!0,t(this,d).load(),t(this,d).muxDataKeepSession=!1,(g=t(this,T))!=null&&g.contentTime&&(t(this,d).currentTime=t(this,T).contentTime)):t(this,E).style.display="",r(this,T,null),r(this,D,void 0),r(this,y,void 0),t(this,d).dispatchEvent(new Event("durationchange")),t(this,d).dispatchEvent(new Event("onAdsCompleted"))},!1),(s=t(this,o))==null||s.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,console.log.bind(null,"AD_ERROR Manager"),!1),(h=t(this,o))==null||h.addEventListener(google.ima.AdEvent.Type.CLICK,g=>{this.updateViewMode(!1)},!1),(M=t(this,o))==null||M.addEventListener(google.ima.AdEvent.Type.LOADED,g=>{console.log("loaded",g),r(this,y,g.getAd()),t(this,d).dispatchEvent(new Event("durationchange")),t(this,d).dispatchEvent(new Event("timeupdate")),t(this,d).dispatchEvent(new Event("adbreaktotaladschange"))},!1),(v=t(this,o))==null||v.addEventListener(google.ima.AdEvent.Type.STARTED,g=>{console.log("started",g),r(this,y,g.getAd()),t(this,d).dispatchEvent(new Event("playing")),t(this,d).dispatchEvent(new Event("adbreakadpositionchange"))},!1),(f=t(this,o))==null||f.addEventListener(google.ima.AdEvent.Type.PAUSED,()=>{console.log("Ads paused"),r(this,b,!0),t(this,d).dispatchEvent(new Event("pause"))}),(R=t(this,o))==null||R.addEventListener(google.ima.AdEvent.Type.RESUMED,()=>{console.log("Ads resumed"),r(this,b,!1)}),(S=t(this,o))==null||S.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS,g=>{let z=t(this,d).duration;r(this,D,g.getAdData()),z!==t(this,d).duration&&t(this,d).dispatchEvent(new Event("durationchange")),t(this,d).dispatchEvent(new Event("timeupdate"))},!1),(x=t(this,o))==null||x.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED,()=>{console.log("volumeChanged"),t(this,d).dispatchEvent(new Event("volumechange"))},!1),(G=t(this,o))==null||G.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,()=>{console.log("allAdsCompleted")},!1),(F=t(this,o))==null||F.init(t(this,p).width,t(this,p).height,t(this,w)),(H=t(this,o))==null||H.start()};var le=(a={})=>" "+Object.entries(a).map(([i,e])=>e===""?`${i}`:`${i}="${e}"`).join(" "),L={AD_TAG_URL:"adtagurl",AD_BREAK:"adbreak",ALLOW_AD_BLOCKER:"allow-ad-blocker"},n,V,l,ee,te,I,O,N,P,q,C=class extends Y.default{constructor(){super();u(this,l);u(this,n);u(this,V);new ResizeObserver(s=>{var h;for(let M of s){let{width:v,height:f}=M.contentRect;v>0&&f>0&&((h=t(this,n))==null||h.updateAdsManagerSize(v,f))}}).observe(this)}connectedCallback(){if(console.log("MuxVideoAds connectedCallback"),super.connectedCallback(),!B.isGoogleImaSDKAvailable()){console.error("Missing google.ima SDK. Make sure you include it via a script tag."),this.allowAdBlocker?r(this,l,!1,O):c(this,l,ee).call(this);return}console.log("AdBreak connectedCallbk",this.adBreak,this.adTagUrl);let e={videoElement:this,contentVideoElement:this.nativeEl,originalSize:this.getBoundingClientRect(),adContainer:t(this,l,I)};r(this,n,new B(e)),t(this,n).setupAdsManager(),c(this,l,te).call(this)}get adTagUrl(){var e;return(e=this.getAttribute(L.AD_TAG_URL))!=null?e:void 0}set adTagUrl(e){if(e!==this.adTagUrl){if(e===void 0){this.removeAttribute(L.AD_TAG_URL);return}this.setAttribute(L.AD_TAG_URL,e)}}get adBreak(){return this.hasAttribute(L.AD_BREAK)}onEnded(){var e;this.adTagUrl&&((e=t(this,n))!=null&&e.isReadyForComplete())&&t(this,n).contentComplete()}handleEvent(e){this.adBreak&&e.type==="ended"||super.handleEvent(e)}play(){var h,M,v,f,R,S,x;if(this.adTagUrl&&this.adBreak)return(h=t(this,n))!=null&&h.isAdPaused()&&((M=t(this,n))==null||M.resumeAdManager()),this.dispatchEvent(new Event("playing")),Promise.resolve();let s=!((v=t(this,n))!=null&&v.adsLoader)&&this.allowAdBlocker;return this.adTagUrl&&!s?(r(this,V,this.nativeEl.currentTime),r(this,l,!0,O),this.dispatchEvent(new Event("durationchange")),c(this,l,P).call(this,!0),(f=t(this,n))!=null&&f.isReadyForInitialization()&&t(this,n).initializeAdDisplayContainer(),(R=t(this,n))!=null&&R.isReadyForInitialization()||(S=t(this,n))!=null&&S.isInitialized()?t(this,n).requestAds(this.adTagUrl):(x=t(this,n))!=null&&x.isAdPaused()&&t(this,n).resumeAdManager(),Promise.resolve()):(c(this,l,P).call(this,!1),super.play())}pause(){var e;this.adBreak&&((e=t(this,n))==null||e.pauseAdManager()),super.pause()}get paused(){var e,s;return this.adBreak?(s=(e=t(this,n))==null?void 0:e.isAdPaused())!=null?s:!1:super.paused}get duration(){var e,s;return this.adBreak?(s=(e=t(this,n))==null?void 0:e.getDuration())!=null?s:0:super.duration}get currentTime(){var e,s;return this.adBreak?(s=(e=t(this,n))==null?void 0:e.getCurrentTime())!=null?s:0:super.currentTime}set currentTime(e){if(this.adBreak){console.error("CANNOT SEEK DURING AD BREAK");return}super.currentTime=e}get volume(){var e,s;return this.adBreak?(s=(e=t(this,n))==null?void 0:e.getVolume())!=null?s:0:super.volume}set volume(e){var s;this.adBreak&&((s=t(this,n))==null||s.setVolume(e)),super.volume=e}get muted(){var e;return this.adBreak?!((e=t(this,n))!=null&&e.getVolume()):super.muted}set muted(e){var s;this.adBreak&&((s=t(this,n))==null||s.setVolume(e?0:this.volume)),super.muted=e}get readyState(){return this.adBreak?4:super.readyState}async requestPictureInPicture(){if(this.adBreak)throw new Error("Cannot use PiP while ads are playing!");return super.requestPictureInPicture()}get muxDataSDK(){return Z.default}get muxDataSDKOptions(){var e;return{imaAdsLoader:(e=t(this,n))==null?void 0:e.adsLoader}}set muxDataKeepSession(e){this.toggleAttribute("mux-data-keep-session",!!e)}get muxDataKeepSession(){return this.hasAttribute("mux-data-keep-session")}get allowAdBlocker(){return this.hasAttribute(L.ALLOW_AD_BLOCKER)}set allowAdBlocker(e){this.toggleAttribute(L.ALLOW_AD_BLOCKER,!!e)}};n=new WeakMap,V=new WeakMap,l=new WeakSet,ee=function(){var s,h;let e=document.createElement("div");e.id="imaUnavailableMessage",e.innerHTML=`
  <h4>Ad experience unavailable.</h4>
  <span>This may be due to a missing SDK, network issue, or ad blocker.</span>
`,(h=(s=this.shadowRoot)==null?void 0:s.getElementById("mainContainer"))==null||h.appendChild(e)},te=function(){this.addEventListener("loadedmetadata",()=>{var e,s;if(console.log("loadedmetadata",{adTagUrl:this.adTagUrl,isReady:(e=t(this,n))==null?void 0:e.isReadyForInitialization()}),this.adTagUrl&&((s=t(this,n))!=null&&s.isReadyForInitialization())){t(this,n).initializeAdDisplayContainer();let h=this.nativeEl.paused;this.nativeEl.paused||this.nativeEl.pause(),h||t(this,n).requestAds(this.adTagUrl)}},{once:!0}),this.addEventListener("play",this.play),this.nativeEl.addEventListener("play",e=>{if(this.adBreak&&!t(this,l,q)){console.warn("Video play prevented during ad break"),this.nativeEl.pause();return}}),this.nativeEl.addEventListener("seeking",e=>{var s;this.adBreak&&!t(this,l,q)&&(console.warn("Seek prevented during ad break"),this.nativeEl.currentTime=(s=t(this,V))!=null?s:0,this.nativeEl.dispatchEvent(new Event("timeupdate")))}),this.addEventListener("onAdsCompleted",()=>{r(this,l,!1,O),this.dispatchEvent(new Event("durationchange")),this.adTagUrl=void 0,c(this,l,P).call(this,!1),c(this,l,N).call(this,!1),this.addEventListener("ended",this.onEnded,{once:!0}),setTimeout(()=>{this.play()},100)}),globalThis.addEventListener("mediaenterfullscreenrequest",()=>{var e;(e=t(this,n))==null||e.updateViewMode(!0)}),globalThis.addEventListener("mediaexitfullscreenrequest",()=>{var e;(e=t(this,n))==null||e.updateViewMode(!1)})},I=function(){var e;return(e=this.shadowRoot)==null?void 0:e.getElementById("adContainer")},O=function(e){e!==this.adBreak&&(this.toggleAttribute(L.AD_BREAK,!!e),c(this,l,N).call(this,e))},N=function(e){this.dispatchEvent(new CustomEvent("adbreakchange",{detail:{isAdBreak:e},composed:!0,bubbles:!0}))},P=function(e){var s;(s=t(this,l,I))==null||s.classList.toggle("ad-playing",e)},q=function(){if(t(this,n))return t(this,n).isUsingSameVideoElement()},C.getTemplateHTML=e=>`
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
      <video id="contentElement" ${le(e)}></video>
    </slot>
  <div id="adContainer"></div>
</div>
<slot></slot>
  `;globalThis.customElements&&!globalThis.customElements.get("mux-video-ads")&&(globalThis.customElements.define("mux-video-ads",C),globalThis.MuxVideoAds=C);var he=C;
//# sourceMappingURL=index.cjs.js.map
