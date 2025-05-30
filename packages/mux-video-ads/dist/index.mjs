var Q=l=>{throw TypeError(l)};var z=(l,i,t)=>i.has(l)||Q("Cannot "+t);var e=(l,i,t)=>(z(l,i,"read from private field"),t?t.call(l):i.get(l)),h=(l,i,t)=>i.has(l)?Q("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(l):i.set(l,t),o=(l,i,t,s)=>(z(l,i,"write to private field"),s?s.call(l,t):i.set(l,t),t),c=(l,i,t)=>(z(l,i,"access private method"),t);import X from"@mux/mux-video";import Y from"@mux/mux-data-google-ima";var A,m,n,y,D,b,E,r,w,T,p,k,_,W,B=class{constructor(i){h(this,_);h(this,A);h(this,m);h(this,n);h(this,y);h(this,D);h(this,b,!1);h(this,E);h(this,r);h(this,w);h(this,T,null);h(this,p);h(this,k);o(this,r,i.videoElement),o(this,E,i.contentVideoElement),o(this,w,google.ima.ViewMode.NORMAL),o(this,p,i.originalSize),o(this,k,i.adContainer)}setupAdsManager(){e(this,A)||(o(this,A,new google.ima.AdDisplayContainer(e(this,k),e(this,E))),o(this,m,new google.ima.AdsLoader(e(this,A))),console.log("adsLoader",e(this,m)),e(this,m).addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,i=>{console.log("Ad Manager loaded",i);let t=new google.ima.AdsRenderingSettings;o(this,n,i.getAdsManager(e(this,E),t)),console.log("adsManager",e(this,n)),c(this,_,W).call(this)},!1),e(this,m).addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,i=>{console.log("AD_ERROR Loader",i),e(this,r).dispatchEvent(new Event("onAdsCompleted"))},!1))}static isGoogleImaSDKAvailable(){return"google"in globalThis&&"ima"in globalThis.google?!0:(console.error("Missing google.ima SDK. Make sure you include it via a script tag."),!1)}isReadyForInitialization(){return e(this,A)&&!e(this,n)}isInitialized(){return e(this,A)&&e(this,n)}isReadyForComplete(){return e(this,m)&&e(this,n)}initializeAdDisplayContainer(){var i;(i=e(this,A))==null||i.initialize()}requestAds(i){var s;console.log("requestAds",i);let t=new google.ima.AdsRequest;t.adTagUrl=i,(s=e(this,m))==null||s.requestAds(t)}contentComplete(){var i;(i=e(this,m))==null||i.contentComplete()}isAdPaused(){return e(this,n)&&e(this,b)}resumeAdManager(){var i;(i=e(this,n))==null||i.resume(),o(this,b,!1)}pauseAdManager(){e(this,n)&&e(this,n).pause()}getDuration(){var i,t,s;return(s=(i=e(this,D))==null?void 0:i.duration)!=null?s:(t=e(this,y))==null?void 0:t.getDuration()}getCurrentTime(){var i;return(i=e(this,D))==null?void 0:i.currentTime}getVolume(){var i,t;return(t=(i=e(this,n))==null?void 0:i.getVolume())!=null?t:1}setVolume(i){var t;(t=e(this,n))==null||t.setVolume(i)}isUsingSameVideoElement(){let i=e(this,k).querySelectorAll("video");return console.log("videoElements",i.length,i),i.length===0}updateViewMode(i){o(this,w,i?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL)}updateAdsManagerSize(i,t){var s;o(this,p,{...e(this,p),width:i,height:t}),(s=e(this,n))==null||s.resize(e(this,p).width,e(this,p).height,e(this,w))}get adsLoader(){return e(this,m)}};A=new WeakMap,m=new WeakMap,n=new WeakMap,y=new WeakMap,D=new WeakMap,b=new WeakMap,E=new WeakMap,r=new WeakMap,w=new WeakMap,T=new WeakMap,p=new WeakMap,k=new WeakMap,_=new WeakSet,W=function(){var i,t,s,u,M,v,f,R,S,x,q,G,F;console.log("startAdsManager",e(this,n)),(i=e(this,n))==null||i.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,()=>{var H,j;console.log("CONTENT_PAUSE_REQUESTED");let g=e(this,r).currentTime,P=!e(this,r).paused;(H=e(this,E))!=null&&H.paused||(j=e(this,E))==null||j.pause(),o(this,b,!1),o(this,T,{contentTime:g,wasPlaying:P,originalSrc:e(this,r).src}),this.isUsingSameVideoElement()?(e(this,r).muxDataKeepSession=!0,e(this,r).unload(),e(this,r).muxDataKeepSession=!1):e(this,E).style.display="none"}),(t=e(this,n))==null||t.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,()=>{var g;console.log("CONTENT_RESUME_REQUESTED"),e(this,T)&&this.isUsingSameVideoElement()?(e(this,r).muxDataKeepSession=!0,e(this,r).load(),e(this,r).muxDataKeepSession=!1,(g=e(this,T))!=null&&g.contentTime&&(e(this,r).currentTime=e(this,T).contentTime)):e(this,E).style.display="",o(this,T,null),o(this,D,void 0),o(this,y,void 0),e(this,r).dispatchEvent(new Event("durationchange")),e(this,r).dispatchEvent(new Event("onAdsCompleted"))},!1),(s=e(this,n))==null||s.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,console.log.bind(null,"AD_ERROR Manager"),!1),(u=e(this,n))==null||u.addEventListener(google.ima.AdEvent.Type.CLICK,g=>{this.updateViewMode(!1)},!1),(M=e(this,n))==null||M.addEventListener(google.ima.AdEvent.Type.LOADED,g=>{console.log("loaded",g),o(this,y,g.getAd()),e(this,r).dispatchEvent(new Event("durationchange")),e(this,r).dispatchEvent(new Event("timeupdate")),e(this,r).dispatchEvent(new Event("adbreaktotaladschange"))},!1),(v=e(this,n))==null||v.addEventListener(google.ima.AdEvent.Type.STARTED,g=>{console.log("started",g),o(this,y,g.getAd()),e(this,r).dispatchEvent(new Event("playing")),e(this,r).dispatchEvent(new Event("adbreakadpositionchange"))},!1),(f=e(this,n))==null||f.addEventListener(google.ima.AdEvent.Type.PAUSED,()=>{console.log("Ads paused"),o(this,b,!0),e(this,r).dispatchEvent(new Event("pause"))}),(R=e(this,n))==null||R.addEventListener(google.ima.AdEvent.Type.RESUMED,()=>{console.log("Ads resumed"),o(this,b,!1)}),(S=e(this,n))==null||S.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS,g=>{let P=e(this,r).duration;o(this,D,g.getAdData()),P!==e(this,r).duration&&e(this,r).dispatchEvent(new Event("durationchange")),e(this,r).dispatchEvent(new Event("timeupdate"))},!1),(x=e(this,n))==null||x.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED,()=>{console.log("volumeChanged"),e(this,r).dispatchEvent(new Event("volumechange"))},!1),(q=e(this,n))==null||q.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,()=>{console.log("allAdsCompleted")},!1),(G=e(this,n))==null||G.init(e(this,p).width,e(this,p).height,e(this,w)),(F=e(this,n))==null||F.start()};var Z=(l={})=>" "+Object.entries(l).map(([i,t])=>t===""?`${i}`:`${i}="${t}"`).join(" "),L={AD_TAG_URL:"adtagurl",AD_BREAK:"adbreak",ALLOW_AD_BLOCKER:"allow-ad-blocker"},a,V,d,$,J,K,U,I,O,N,C=class extends X{constructor(){super();h(this,d);h(this,a);h(this,V);new ResizeObserver(s=>{var u;for(let M of s){let{width:v,height:f}=M.contentRect;v>0&&f>0&&((u=e(this,a))==null||u.updateAdsManagerSize(v,f))}}).observe(this)}connectedCallback(){if(console.log("MuxVideoAds connectedCallback"),super.connectedCallback(),!B.isGoogleImaSDKAvailable()){console.error("Missing google.ima SDK. Make sure you include it via a script tag."),this.allowAdBlocker?o(this,d,!1,U):c(this,d,$).call(this);return}console.log("AdBreak connectedCallbk",this.adBreak,this.adTagUrl);let t={videoElement:this,contentVideoElement:this.nativeEl,originalSize:this.getBoundingClientRect(),adContainer:e(this,d,K)};o(this,a,new B(t)),e(this,a).setupAdsManager(),c(this,d,J).call(this)}get adTagUrl(){var t;return(t=this.getAttribute(L.AD_TAG_URL))!=null?t:void 0}set adTagUrl(t){if(t!==this.adTagUrl){if(t===void 0){this.removeAttribute(L.AD_TAG_URL);return}this.setAttribute(L.AD_TAG_URL,t)}}get adBreak(){return this.hasAttribute(L.AD_BREAK)}onEnded(){var t;this.adTagUrl&&((t=e(this,a))!=null&&t.isReadyForComplete())&&e(this,a).contentComplete()}handleEvent(t){this.adBreak&&t.type==="ended"||super.handleEvent(t)}play(){var u,M,v,f,R,S,x;if(this.adTagUrl&&this.adBreak)return(u=e(this,a))!=null&&u.isAdPaused()&&((M=e(this,a))==null||M.resumeAdManager()),this.dispatchEvent(new Event("playing")),Promise.resolve();let s=!((v=e(this,a))!=null&&v.adsLoader)&&this.allowAdBlocker;return this.adTagUrl&&!s?(o(this,V,this.nativeEl.currentTime),o(this,d,!0,U),this.dispatchEvent(new Event("durationchange")),c(this,d,O).call(this,!0),(f=e(this,a))!=null&&f.isReadyForInitialization()&&e(this,a).initializeAdDisplayContainer(),(R=e(this,a))!=null&&R.isReadyForInitialization()||(S=e(this,a))!=null&&S.isInitialized()?e(this,a).requestAds(this.adTagUrl):(x=e(this,a))!=null&&x.isAdPaused()&&e(this,a).resumeAdManager(),Promise.resolve()):(c(this,d,O).call(this,!1),super.play())}pause(){var t;this.adBreak&&((t=e(this,a))==null||t.pauseAdManager()),super.pause()}get paused(){var t,s;return this.adBreak?(s=(t=e(this,a))==null?void 0:t.isAdPaused())!=null?s:!1:super.paused}get duration(){var t,s;return this.adBreak?(s=(t=e(this,a))==null?void 0:t.getDuration())!=null?s:0:super.duration}get currentTime(){var t,s;return this.adBreak?(s=(t=e(this,a))==null?void 0:t.getCurrentTime())!=null?s:0:super.currentTime}set currentTime(t){if(this.adBreak){console.error("CANNOT SEEK DURING AD BREAK");return}super.currentTime=t}get volume(){var t,s;return this.adBreak?(s=(t=e(this,a))==null?void 0:t.getVolume())!=null?s:0:super.volume}set volume(t){var s;this.adBreak&&((s=e(this,a))==null||s.setVolume(t)),super.volume=t}get muted(){var t;return this.adBreak?!((t=e(this,a))!=null&&t.getVolume()):super.muted}set muted(t){var s;this.adBreak&&((s=e(this,a))==null||s.setVolume(t?0:this.volume)),super.muted=t}get readyState(){return this.adBreak?4:super.readyState}async requestPictureInPicture(){if(this.adBreak)throw new Error("Cannot use PiP while ads are playing!");return super.requestPictureInPicture()}get muxDataSDK(){return Y}get muxDataSDKOptions(){var t;return{imaAdsLoader:(t=e(this,a))==null?void 0:t.adsLoader}}set muxDataKeepSession(t){this.toggleAttribute("mux-data-keep-session",!!t)}get muxDataKeepSession(){return this.hasAttribute("mux-data-keep-session")}get allowAdBlocker(){return this.hasAttribute(L.ALLOW_AD_BLOCKER)}set allowAdBlocker(t){this.toggleAttribute(L.ALLOW_AD_BLOCKER,!!t)}};a=new WeakMap,V=new WeakMap,d=new WeakSet,$=function(){var s,u;let t=document.createElement("div");t.id="imaUnavailableMessage",t.innerHTML=`
  <h4>Ad experience unavailable.</h4>
  <span>This may be due to a missing SDK, network issue, or ad blocker.</span>
`,(u=(s=this.shadowRoot)==null?void 0:s.getElementById("mainContainer"))==null||u.appendChild(t)},J=function(){this.addEventListener("loadedmetadata",()=>{var t,s;if(console.log("loadedmetadata",{adTagUrl:this.adTagUrl,isReady:(t=e(this,a))==null?void 0:t.isReadyForInitialization()}),this.adTagUrl&&((s=e(this,a))!=null&&s.isReadyForInitialization())){e(this,a).initializeAdDisplayContainer();let u=this.nativeEl.paused;this.nativeEl.paused||this.nativeEl.pause(),u||e(this,a).requestAds(this.adTagUrl)}},{once:!0}),this.addEventListener("play",this.play),this.nativeEl.addEventListener("play",t=>{if(this.adBreak&&!e(this,d,N)){console.warn("Video play prevented during ad break"),this.nativeEl.pause();return}}),this.nativeEl.addEventListener("seeking",t=>{var s;this.adBreak&&!e(this,d,N)&&(console.warn("Seek prevented during ad break"),this.nativeEl.currentTime=(s=e(this,V))!=null?s:0,this.nativeEl.dispatchEvent(new Event("timeupdate")))}),this.addEventListener("onAdsCompleted",()=>{o(this,d,!1,U),this.dispatchEvent(new Event("durationchange")),this.adTagUrl=void 0,c(this,d,O).call(this,!1),c(this,d,I).call(this,!1),this.addEventListener("ended",this.onEnded,{once:!0}),setTimeout(()=>{this.play()},100)}),globalThis.addEventListener("mediaenterfullscreenrequest",()=>{var t;(t=e(this,a))==null||t.updateViewMode(!0)}),globalThis.addEventListener("mediaexitfullscreenrequest",()=>{var t;(t=e(this,a))==null||t.updateViewMode(!1)})},K=function(){var t;return(t=this.shadowRoot)==null?void 0:t.getElementById("adContainer")},U=function(t){t!==this.adBreak&&(this.toggleAttribute(L.AD_BREAK,!!t),c(this,d,I).call(this,t))},I=function(t){this.dispatchEvent(new CustomEvent("adbreakchange",{detail:{isAdBreak:t},composed:!0,bubbles:!0}))},O=function(t){var s;(s=e(this,d,K))==null||s.classList.toggle("ad-playing",t)},N=function(){if(e(this,a))return e(this,a).isUsingSameVideoElement()},C.getTemplateHTML=t=>`
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
      <video id="contentElement" ${Z(t)}></video>
    </slot>
  <div id="adContainer"></div>
</div>
<slot></slot>
  `;globalThis.customElements&&!globalThis.customElements.get("mux-video-ads")&&(globalThis.customElements.define("mux-video-ads",C),globalThis.MuxVideoAds=C);var re=C;export{re as default};
//# sourceMappingURL=index.mjs.map
