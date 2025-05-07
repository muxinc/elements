"use strict";var ie=Object.create;var S=Object.defineProperty;var se=Object.getOwnPropertyDescriptor;var ae=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,oe=Object.prototype.hasOwnProperty;var $=a=>{throw TypeError(a)};var re=(a,i)=>{for(var e in i)S(a,e,{get:i[e],enumerable:!0})},W=(a,i,e,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let h of ae(i))!oe.call(a,h)&&h!==e&&S(a,h,{get:()=>i[h],enumerable:!(s=se(i,h))||s.enumerable});return a};var X=(a,i,e)=>(e=a!=null?ie(ne(a)):{},W(i||!a||!a.__esModule?S(e,"default",{value:a,enumerable:!0}):e,a)),de=a=>W(S({},"__esModule",{value:!0}),a);var _=(a,i,e)=>i.has(a)||$("Cannot "+e);var t=(a,i,e)=>(_(a,i,"read from private field"),e?e.call(a):i.get(a)),u=(a,i,e)=>i.has(a)?$("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(a):i.set(a,e),d=(a,i,e,s)=>(_(a,i,"write to private field"),s?s.call(a,e):i.set(a,e),e),E=(a,i,e)=>(_(a,i,"access private method"),e);var ue={};re(ue,{default:()=>he});module.exports=de(ue);var Y=X(require("@mux/mux-video")),Z=X(require("@mux/mux-data-google-ima"));var v,m,o,y,D,b,p,r,w,T,c,C,V,J,k=class{constructor(i){u(this,V);u(this,v);u(this,m);u(this,o);u(this,y);u(this,D);u(this,b,!1);u(this,p);u(this,r);u(this,w);u(this,T,null);u(this,c);u(this,C);d(this,r,i.videoElement),d(this,p,i.contentVideoElement),d(this,w,google.ima.ViewMode.NORMAL),d(this,c,i.originalSize),d(this,C,i.adContainer)}setupAdsManager(){t(this,v)||(d(this,v,new google.ima.AdDisplayContainer(t(this,C),t(this,p))),d(this,m,new google.ima.AdsLoader(t(this,v))),console.log("adsLoader",t(this,m)),t(this,m).addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,i=>{console.log("Ad Manager loaded",i);let e=new google.ima.AdsRenderingSettings;d(this,o,i.getAdsManager(t(this,p),e)),console.log("adsManager",t(this,o)),E(this,V,J).call(this)},!1),t(this,m).addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,i=>{console.log("AD_ERROR Loader",i),t(this,r).dispatchEvent(new Event("onAdsCompleted"))},!1))}static isGoogleImaSDKAvailable(){return"google"in globalThis&&"ima"in globalThis.google?!0:(console.error("Missing google.ima SDK. Make sure you include it via a script tag."),!1)}isReadyForInitialization(){return t(this,v)&&!t(this,o)}isInitialized(){return t(this,v)&&t(this,o)}isReadyForComplete(){return t(this,m)&&t(this,o)}initializeAdDisplayContainer(){var i;(i=t(this,v))==null||i.initialize()}requestAds(i){var s;console.log("requestAds",i);let e=new google.ima.AdsRequest;e.adTagUrl=i,(s=t(this,m))==null||s.requestAds(e)}contentComplete(){var i;(i=t(this,m))==null||i.contentComplete()}isAdPaused(){return t(this,o)&&t(this,b)}resumeAdManager(){var i;(i=t(this,o))==null||i.resume(),d(this,b,!1)}pauseAdManager(){t(this,o)&&t(this,o).pause()}getDuration(){var i,e,s;return(s=(i=t(this,D))==null?void 0:i.duration)!=null?s:(e=t(this,y))==null?void 0:e.getDuration()}getCurrentTime(){var i;return(i=t(this,D))==null?void 0:i.currentTime}getVolume(){var i,e;return(e=(i=t(this,o))==null?void 0:i.getVolume())!=null?e:1}setVolume(i){var e;(e=t(this,o))==null||e.setVolume(i)}isUsingSameVideoElement(){let i=t(this,C).querySelectorAll("video");return console.log("videoElements",i.length,i),i.length===0}updateViewMode(i){d(this,w,i?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL)}updateAdsManagerSize(i,e){var s;d(this,c,{...t(this,c),width:i,height:e}),(s=t(this,o))==null||s.resize(t(this,c).width,t(this,c).height,t(this,w))}get adsLoader(){return t(this,m)}};v=new WeakMap,m=new WeakMap,o=new WeakMap,y=new WeakMap,D=new WeakMap,b=new WeakMap,p=new WeakMap,r=new WeakMap,w=new WeakMap,T=new WeakMap,c=new WeakMap,C=new WeakMap,V=new WeakSet,J=function(){var i,e,s,h,M,A,f,I,N,q,G,F,H;console.log("startAdsManager",t(this,o)),(i=t(this,o))==null||i.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,()=>{var j,Q;console.log("CONTENT_PAUSE_REQUESTED");let g=t(this,r).currentTime,B=!t(this,r).paused;(j=t(this,p))!=null&&j.paused||(Q=t(this,p))==null||Q.pause(),d(this,b,!1),d(this,T,{contentTime:g,wasPlaying:B,originalSrc:t(this,r).src}),this.isUsingSameVideoElement()?(t(this,r).muxDataKeepSession=!0,t(this,r).unload(),t(this,r).muxDataKeepSession=!1):t(this,p).style.display="none"}),(e=t(this,o))==null||e.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,()=>{var g;console.log("CONTENT_RESUME_REQUESTED"),t(this,T)&&this.isUsingSameVideoElement()?(t(this,r).muxDataKeepSession=!0,t(this,r).load(),t(this,r).muxDataKeepSession=!1,(g=t(this,T))!=null&&g.contentTime&&(t(this,r).currentTime=t(this,T).contentTime)):t(this,p).style.display="",d(this,T,null),d(this,D,void 0),d(this,y,void 0),t(this,r).dispatchEvent(new Event("durationchange")),t(this,r).dispatchEvent(new Event("onAdsCompleted"))},!1),(s=t(this,o))==null||s.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,console.log.bind(null,"AD_ERROR Manager"),!1),(h=t(this,o))==null||h.addEventListener(google.ima.AdEvent.Type.CLICK,g=>{this.updateViewMode(!1)},!1),(M=t(this,o))==null||M.addEventListener(google.ima.AdEvent.Type.LOADED,g=>{console.log("loaded",g),d(this,y,g.getAd()),t(this,r).dispatchEvent(new Event("durationchange")),t(this,r).dispatchEvent(new Event("timeupdate")),t(this,r).dispatchEvent(new Event("adbreaktotaladschange"))},!1),(A=t(this,o))==null||A.addEventListener(google.ima.AdEvent.Type.STARTED,g=>{console.log("started",g),d(this,y,g.getAd()),t(this,r).dispatchEvent(new Event("playing")),t(this,r).dispatchEvent(new Event("adbreakadpositionchange"))},!1),(f=t(this,o))==null||f.addEventListener(google.ima.AdEvent.Type.PAUSED,()=>{console.log("Ads paused"),d(this,b,!0),t(this,r).dispatchEvent(new Event("pause"))}),(I=t(this,o))==null||I.addEventListener(google.ima.AdEvent.Type.RESUMED,()=>{console.log("Ads resumed"),d(this,b,!1)}),(N=t(this,o))==null||N.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS,g=>{let B=t(this,r).duration;d(this,D,g.getAdData()),B!==t(this,r).duration&&t(this,r).dispatchEvent(new Event("durationchange")),t(this,r).dispatchEvent(new Event("timeupdate"))},!1),(q=t(this,o))==null||q.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED,()=>{console.log("volumeChanged"),t(this,r).dispatchEvent(new Event("volumechange"))},!1),(G=t(this,o))==null||G.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,()=>{console.log("allAdsCompleted")},!1),(F=t(this,o))==null||F.init(t(this,c).width,t(this,c).height,t(this,w)),(H=t(this,o))==null||H.start()};var le=(a={})=>" "+Object.entries(a).map(([i,e])=>e===""?`${i}`:`${i}="${e}"`).join(" "),x={AD_TAG_URL:"adtagurl",AD_BREAK:"adbreak"},n,L,l,ee,te,P,z,O,U,K,R=class extends Y.default{constructor(){super();u(this,l);u(this,n);u(this,L);new ResizeObserver(s=>{var h;for(let M of s){let{width:A,height:f}=M.contentRect;A>0&&f>0&&((h=t(this,n))==null||h.updateAdsManagerSize(A,f))}}).observe(this)}connectedCallback(){if(console.log("MuxVideoAds connectedCallback"),super.connectedCallback(),!k.isGoogleImaSDKAvailable()){console.error("Missing google.ima SDK. Make sure you include it via a script tag."),E(this,l,ee).call(this);return}console.log("AdBreak connectedCallbk",this.adBreak,this.adTagUrl);let e={videoElement:this,contentVideoElement:this.nativeEl,originalSize:this.getBoundingClientRect(),adContainer:t(this,l,P)};d(this,n,new k(e)),t(this,n).setupAdsManager(),E(this,l,te).call(this)}get adTagUrl(){var e;return(e=this.getAttribute(x.AD_TAG_URL))!=null?e:void 0}set adTagUrl(e){if(e!==this.adTagUrl){if(e===void 0){this.removeAttribute(x.AD_TAG_URL);return}this.setAttribute(x.AD_TAG_URL,e)}}get adBreak(){return this.hasAttribute(x.AD_BREAK)}onEnded(){var e;this.adTagUrl&&((e=t(this,n))!=null&&e.isReadyForComplete())&&t(this,n).contentComplete()}handleEvent(e){this.adBreak&&e.type==="ended"||super.handleEvent(e)}play(){var e,s,h,M,A,f;return this.adTagUrl&&this.adBreak?((e=t(this,n))!=null&&e.isAdPaused()&&((s=t(this,n))==null||s.resumeAdManager()),this.dispatchEvent(new Event("playing")),Promise.resolve()):this.adTagUrl?(d(this,L,this.nativeEl.currentTime),d(this,l,!0,z),this.dispatchEvent(new Event("durationchange")),E(this,l,U).call(this,!0),(h=t(this,n))!=null&&h.isReadyForInitialization()&&t(this,n).initializeAdDisplayContainer(),(M=t(this,n))!=null&&M.isReadyForInitialization()||(A=t(this,n))!=null&&A.isInitialized()?t(this,n).requestAds(this.adTagUrl):(f=t(this,n))!=null&&f.isAdPaused()&&t(this,n).resumeAdManager(),Promise.resolve()):(E(this,l,U).call(this,!1),super.play())}pause(){var e;this.adBreak&&((e=t(this,n))==null||e.pauseAdManager()),super.pause()}get paused(){var e,s;return this.adBreak?(s=(e=t(this,n))==null?void 0:e.isAdPaused())!=null?s:!1:super.paused}get duration(){var e,s;return this.adBreak?(s=(e=t(this,n))==null?void 0:e.getDuration())!=null?s:0:super.duration}get currentTime(){var e,s;return this.adBreak?(s=(e=t(this,n))==null?void 0:e.getCurrentTime())!=null?s:0:super.currentTime}set currentTime(e){if(this.adBreak){console.error("CANNOT SEEK DURING AD BREAK");return}super.currentTime=e}get volume(){var e,s;return this.adBreak?(s=(e=t(this,n))==null?void 0:e.getVolume())!=null?s:0:super.volume}set volume(e){var s;this.adBreak&&((s=t(this,n))==null||s.setVolume(e)),super.volume=e}get muted(){var e;return this.adBreak?!((e=t(this,n))!=null&&e.getVolume()):super.muted}set muted(e){var s;this.adBreak&&((s=t(this,n))==null||s.setVolume(e?0:this.volume)),super.muted=e}get readyState(){return this.adBreak?4:super.readyState}async requestPictureInPicture(){if(this.adBreak)throw new Error("Cannot use PiP while ads are playing!");return super.requestPictureInPicture()}get muxDataSDK(){return Z.default}get muxDataSDKOptions(){var e;return{imaAdsLoader:(e=t(this,n))==null?void 0:e.adsLoader}}set muxDataKeepSession(e){this.toggleAttribute("mux-data-keep-session",!!e)}get muxDataKeepSession(){return this.hasAttribute("mux-data-keep-session")}};n=new WeakMap,L=new WeakMap,l=new WeakSet,ee=function(){var s,h;let e=document.createElement("div");e.id="imaUnavailableMessage",e.innerHTML=`
  <strong>Ad experience unavailable.</strong><br />
  <span>This may be due to a missing SDK, network issue, or ad blocker.</span>
`,(h=(s=this.shadowRoot)==null?void 0:s.getElementById("mainContainer"))==null||h.appendChild(e)},te=function(){this.addEventListener("loadedmetadata",()=>{var e,s;if(console.log("loadedmetadata",{adTagUrl:this.adTagUrl,isReady:(e=t(this,n))==null?void 0:e.isReadyForInitialization()}),this.adTagUrl&&((s=t(this,n))!=null&&s.isReadyForInitialization())){t(this,n).initializeAdDisplayContainer();let h=this.nativeEl.paused;this.nativeEl.paused||this.nativeEl.pause(),h||t(this,n).requestAds(this.adTagUrl)}},{once:!0}),this.addEventListener("play",this.play),this.nativeEl.addEventListener("play",e=>{if(this.adBreak&&!t(this,l,K)){console.warn("Video play prevented during ad break"),this.nativeEl.pause();return}}),this.nativeEl.addEventListener("seeking",e=>{var s;this.adBreak&&!t(this,l,K)&&(console.warn("Seek prevented during ad break"),this.nativeEl.currentTime=(s=t(this,L))!=null?s:0,this.nativeEl.dispatchEvent(new Event("timeupdate")))}),this.addEventListener("onAdsCompleted",()=>{d(this,l,!1,z),this.dispatchEvent(new Event("durationchange")),this.adTagUrl=void 0,E(this,l,U).call(this,!1),E(this,l,O).call(this,!1),this.addEventListener("ended",this.onEnded,{once:!0}),setTimeout(()=>{this.play()},100)}),globalThis.addEventListener("mediaenterfullscreenrequest",()=>{var e;(e=t(this,n))==null||e.updateViewMode(!0)}),globalThis.addEventListener("mediaexitfullscreenrequest",()=>{var e;(e=t(this,n))==null||e.updateViewMode(!1)})},P=function(){var e;return(e=this.shadowRoot)==null?void 0:e.getElementById("adContainer")},z=function(e){e!==this.adBreak&&(this.toggleAttribute(x.AD_BREAK,!!e),E(this,l,O).call(this,e))},O=function(e){this.dispatchEvent(new CustomEvent("adbreakchange",{detail:{isAdBreak:e},composed:!0,bubbles:!0}))},U=function(e){var s;(s=t(this,l,P))==null||s.classList.toggle("ad-playing",e)},K=function(){if(t(this,n))return t(this,n).isUsingSameVideoElement()},R.getTemplateHTML=e=>`
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
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 1em 1.5em;
  border-radius: 6px;
  font-size: 0.9em;
  text-align: center;
  max-width: 90%;
  line-height: 1.4;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}
</style>
<div id="mainContainer">
    <slot name="media">
      <video id="contentElement" ${le(e)}></video>
    </slot>
  <div id="adContainer"></div>
</div>
<slot></slot>
  `;globalThis.customElements&&!globalThis.customElements.get("mux-video-ads")&&(globalThis.customElements.define("mux-video-ads",R),globalThis.MuxVideoAds=R);var he=R;
//# sourceMappingURL=index.cjs.js.map
