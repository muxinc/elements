var Q=l=>{throw TypeError(l)};var K=(l,i,t)=>i.has(l)||Q("Cannot "+t);var e=(l,i,t)=>(K(l,i,"read from private field"),t?t.call(l):i.get(l)),h=(l,i,t)=>i.has(l)?Q("Cannot add the same private member more than once"):i instanceof WeakSet?i.add(l):i.set(l,t),n=(l,i,t,s)=>(K(l,i,"write to private field"),s?s.call(l,t):i.set(l,t),t),E=(l,i,t)=>(K(l,i,"access private method"),t);import X from"@mux/mux-video";import Y from"@mux/mux-data-google-ima";var A,c,o,D,w,b,T,g,r,L,y,p,R,P,W,_=class{constructor(i){h(this,P);h(this,A);h(this,c);h(this,o);h(this,D);h(this,w);h(this,b,!1);h(this,T,!1);h(this,g);h(this,r);h(this,L);h(this,y,null);h(this,p);h(this,R);n(this,r,i.videoElement),n(this,g,i.contentVideoElement),n(this,T,!e(this,g).paused),e(this,T)||e(this,g).addEventListener("play",()=>{n(this,T,!0)},{once:!0}),n(this,L,google.ima.ViewMode.NORMAL),n(this,p,i.originalSize),n(this,R,i.adContainer)}setupAdsManager(){e(this,A)||(n(this,A,new google.ima.AdDisplayContainer(e(this,R),e(this,g))),n(this,c,new google.ima.AdsLoader(e(this,A))),console.log("adsLoader",e(this,c)),e(this,c).addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,i=>{console.log("Ad Manager loaded",i);let t=new google.ima.AdsRenderingSettings;n(this,o,i.getAdsManager(e(this,g),t)),console.log("adsManager",e(this,o)),E(this,P,W).call(this)},!1),e(this,c).addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,i=>{console.log("AD_ERROR Loader",i),e(this,r).dispatchEvent(new Event("onAdsCompleted"))},!1))}static isGoogleImaSDKAvailable(){return"google"in globalThis&&"ima"in globalThis.google?!0:(console.error("Missing google.ima SDK. Make sure you include it via a script tag."),!1)}isReadyForInitialization(){return e(this,A)&&!e(this,o)}isInitialized(){return e(this,A)&&e(this,o)}isReadyForComplete(){return e(this,c)&&e(this,o)}initializeAdDisplayContainer(){var i;(i=e(this,A))==null||i.initialize()}requestAds(i){var s;console.log("requestAds",i);let t=new google.ima.AdsRequest;t.adTagUrl=i,(s=e(this,c))==null||s.requestAds(t)}contentComplete(){var i;(i=e(this,c))==null||i.contentComplete()}isAdPaused(){return e(this,o)&&e(this,b)}resumeAdManager(){var i;(i=e(this,o))==null||i.resume(),n(this,b,!1)}pauseAdManager(){e(this,o)&&e(this,o).pause()}getDuration(){var i,t,s;return(s=(i=e(this,w))==null?void 0:i.duration)!=null?s:(t=e(this,D))==null?void 0:t.getDuration()}getCurrentTime(){var i;return(i=e(this,w))==null?void 0:i.currentTime}getVolume(){var i,t;return(t=(i=e(this,o))==null?void 0:i.getVolume())!=null?t:1}setVolume(i){var t;(t=e(this,o))==null||t.setVolume(i)}isUsingSameVideoElement(){let i=e(this,R).querySelectorAll("video");return console.log("videoElements",i.length,i),i.length===0}updateViewMode(i){n(this,L,i?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL)}updateAdsManagerSize(i,t){var s;n(this,p,{...e(this,p),width:i,height:t}),(s=e(this,o))==null||s.resize(e(this,p).width,e(this,p).height,e(this,L))}get adsLoader(){return e(this,c)}};A=new WeakMap,c=new WeakMap,o=new WeakMap,D=new WeakMap,w=new WeakMap,b=new WeakMap,T=new WeakMap,g=new WeakMap,r=new WeakMap,L=new WeakMap,y=new WeakMap,p=new WeakMap,R=new WeakMap,P=new WeakSet,W=function(){var t,s,m,M,v,f,x,B,V,G,F;console.log("startAdsManager",e(this,o)),(t=e(this,o))==null||t.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,()=>{var H,j;console.log("CONTENT_PAUSE_REQUESTED");let u=e(this,r).currentTime,C=!e(this,r).paused;(H=e(this,g))!=null&&H.paused||(j=e(this,g))==null||j.pause(),n(this,b,!1),n(this,y,{contentTime:u,wasPlaying:C,originalSrc:e(this,r).src}),this.isUsingSameVideoElement()?(e(this,r).muxDataKeepSession=!0,e(this,r).unload(),e(this,r).muxDataKeepSession=!1):e(this,g).style.display="none"}),(s=e(this,o))==null||s.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,()=>{var u;console.log("CONTENT_RESUME_REQUESTED"),e(this,y)&&this.isUsingSameVideoElement()?(e(this,r).muxDataKeepSession=!0,e(this,r).load(),e(this,r).muxDataKeepSession=!1,(u=e(this,y))!=null&&u.contentTime&&(e(this,r).currentTime=e(this,y).contentTime)):e(this,g).style.display="",n(this,y,null),n(this,w,void 0),n(this,D,void 0),e(this,r).dispatchEvent(new Event("durationchange")),e(this,r).dispatchEvent(new Event("onAdsCompleted"))},!1),(m=e(this,o))==null||m.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,console.log.bind(null,"AD_ERROR Manager"),!1),(M=e(this,o))==null||M.addEventListener(google.ima.AdEvent.Type.CLICK,u=>{this.updateViewMode(!1)},!1),(v=e(this,o))==null||v.addEventListener(google.ima.AdEvent.Type.LOADED,u=>{console.log("loaded",u),n(this,D,u.getAd()),e(this,r).dispatchEvent(new Event("durationchange")),e(this,r).dispatchEvent(new Event("timeupdate")),e(this,r).dispatchEvent(new Event("adbreaktotaladschange"))},!1),(f=e(this,o))==null||f.addEventListener(google.ima.AdEvent.Type.STARTED,u=>{console.log("started",u),n(this,D,u.getAd()),e(this,r).dispatchEvent(new Event("playing")),e(this,r).dispatchEvent(new Event("adbreakadpositionchange"))},!1),(x=e(this,o))==null||x.addEventListener(google.ima.AdEvent.Type.PAUSED,()=>{console.log("Ads paused"),n(this,b,!0),e(this,r).dispatchEvent(new Event("pause"))}),(B=e(this,o))==null||B.addEventListener(google.ima.AdEvent.Type.RESUMED,()=>{console.log("Ads resumed"),n(this,b,!1)}),(V=e(this,o))==null||V.addEventListener(google.ima.AdEvent.Type.AD_PROGRESS,u=>{let C=e(this,r).duration;n(this,w,u.getAdData()),C!==e(this,r).duration&&e(this,r).dispatchEvent(new Event("durationchange")),e(this,r).dispatchEvent(new Event("timeupdate"))},!1),(G=e(this,o))==null||G.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED,()=>{console.log("volumeChanged"),e(this,r).dispatchEvent(new Event("volumechange"))},!1),(F=e(this,o))==null||F.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,()=>{console.log("allAdsCompleted")},!1);let i=()=>{var u,C;(u=e(this,o))==null||u.init(e(this,p).width,e(this,p).height,e(this,L)),(C=e(this,o))==null||C.start()};try{e(this,T)?i():e(this,g).addEventListener("play",()=>{n(this,T,!0),e(this,g).pause(),i()},{once:!0})}catch{console.error("Failed to start ads! Make sure you include the google.ima SDK as a script tag and that it is loaded before attempting ad playback")}};var Z=(l={})=>" "+Object.entries(l).map(([i,t])=>t===""?`${i}`:`${i}="${t}"`).join(" "),k={AD_TAG_URL:"adtagurl",AD_BREAK:"adbreak",ALLOW_AD_BLOCKER:"allow-ad-blocker"},a,U,d,$,J,I,O,N,z,q,S=class extends X{constructor(){super();h(this,d);h(this,a);h(this,U);new ResizeObserver(s=>{var m;for(let M of s){let{width:v,height:f}=M.contentRect;v>0&&f>0&&((m=e(this,a))==null||m.updateAdsManagerSize(v,f))}}).observe(this)}connectedCallback(){if(console.log("MuxVideoAds connectedCallback"),super.connectedCallback(),!_.isGoogleImaSDKAvailable()){console.error("Missing google.ima SDK. Make sure you include it via a script tag."),this.allowAdBlocker?n(this,d,!1,O):E(this,d,$).call(this);return}console.log("AdBreak connectedCallbk",this.adBreak,this.adTagUrl);let t={videoElement:this,contentVideoElement:this.nativeEl,originalSize:this.getBoundingClientRect(),adContainer:e(this,d,I)};n(this,a,new _(t)),e(this,a).setupAdsManager(),E(this,d,J).call(this)}get adTagUrl(){var t;return(t=this.getAttribute(k.AD_TAG_URL))!=null?t:void 0}set adTagUrl(t){if(t!==this.adTagUrl){if(t===void 0){this.removeAttribute(k.AD_TAG_URL);return}this.setAttribute(k.AD_TAG_URL,t)}}get adBreak(){return this.hasAttribute(k.AD_BREAK)}onEnded(){var t;this.adTagUrl&&((t=e(this,a))!=null&&t.isReadyForComplete())&&e(this,a).contentComplete()}handleEvent(t){this.adBreak&&t.type==="ended"||super.handleEvent(t)}play(){var m,M,v,f,x,B,V;if(this.adTagUrl&&this.adBreak)return(m=e(this,a))!=null&&m.isAdPaused()&&((M=e(this,a))==null||M.resumeAdManager()),Promise.resolve().then(()=>{this.dispatchEvent(new Event("play")),this.dispatchEvent(new Event("playing"))});let s=!((v=e(this,a))!=null&&v.adsLoader)&&this.allowAdBlocker;return this.adTagUrl&&!s?(n(this,U,this.nativeEl.currentTime),n(this,d,!0,O),this.dispatchEvent(new Event("durationchange")),E(this,d,z).call(this,!0),(f=e(this,a))!=null&&f.isReadyForInitialization()&&e(this,a).initializeAdDisplayContainer(),(x=e(this,a))!=null&&x.isReadyForInitialization()||(B=e(this,a))!=null&&B.isInitialized()?(e(this,a).requestAds(this.adTagUrl),super.play()):((V=e(this,a))!=null&&V.isAdPaused()&&e(this,a).resumeAdManager(),Promise.resolve().then(()=>{this.dispatchEvent(new Event("play"))}))):(E(this,d,z).call(this,!1),super.play())}pause(){var t;this.adBreak&&((t=e(this,a))==null||t.pauseAdManager()),super.pause()}get paused(){var t,s;return this.adBreak?(s=(t=e(this,a))==null?void 0:t.isAdPaused())!=null?s:!1:super.paused}get duration(){var t,s;return this.adBreak?(s=(t=e(this,a))==null?void 0:t.getDuration())!=null?s:0:super.duration}get currentTime(){var t,s;return this.adBreak?(s=(t=e(this,a))==null?void 0:t.getCurrentTime())!=null?s:0:super.currentTime}set currentTime(t){if(this.adBreak){console.error("CANNOT SEEK DURING AD BREAK");return}super.currentTime=t}get volume(){var t,s;return this.adBreak?(s=(t=e(this,a))==null?void 0:t.getVolume())!=null?s:0:super.volume}set volume(t){var s;this.adBreak&&((s=e(this,a))==null||s.setVolume(t)),super.volume=t}get muted(){var t;return this.adBreak?!((t=e(this,a))!=null&&t.getVolume()):super.muted}set muted(t){var s;this.adBreak&&((s=e(this,a))==null||s.setVolume(t?0:this.volume)),super.muted=t}get readyState(){return this.adBreak?4:super.readyState}async requestPictureInPicture(){if(this.adBreak)throw new Error("Cannot use PiP while ads are playing!");return super.requestPictureInPicture()}get muxDataSDK(){return Y}get muxDataSDKOptions(){var t;return{imaAdsLoader:(t=e(this,a))==null?void 0:t.adsLoader}}set muxDataKeepSession(t){this.toggleAttribute("mux-data-keep-session",!!t)}get muxDataKeepSession(){return this.hasAttribute("mux-data-keep-session")}get allowAdBlocker(){return this.hasAttribute(k.ALLOW_AD_BLOCKER)}set allowAdBlocker(t){this.toggleAttribute(k.ALLOW_AD_BLOCKER,!!t)}};a=new WeakMap,U=new WeakMap,d=new WeakSet,$=function(){var s,m;let t=document.createElement("div");t.id="imaUnavailableMessage",t.innerHTML=`
  <h4>Ad experience unavailable.</h4>
  <span>This may be due to a missing SDK, network issue, or ad blocker.</span>
`,(m=(s=this.shadowRoot)==null?void 0:s.getElementById("mainContainer"))==null||m.appendChild(t)},J=function(){this.addEventListener("loadedmetadata",()=>{var t,s;if(console.log("loadedmetadata",{adTagUrl:this.adTagUrl,isReady:(t=e(this,a))==null?void 0:t.isReadyForInitialization()}),this.adTagUrl&&((s=e(this,a))!=null&&s.isReadyForInitialization())){e(this,a).initializeAdDisplayContainer();let m=this.nativeEl.paused;this.nativeEl.paused||this.nativeEl.pause(),m||e(this,a).requestAds(this.adTagUrl)}},{once:!0}),this.nativeEl.addEventListener("play",t=>{if(this.adBreak&&!e(this,d,q)){console.warn("Video play prevented during ad break"),this.nativeEl.pause();return}}),this.nativeEl.addEventListener("seeking",t=>{var s;this.adBreak&&!e(this,d,q)&&(console.warn("Seek prevented during ad break"),this.nativeEl.currentTime=(s=e(this,U))!=null?s:0,this.nativeEl.dispatchEvent(new Event("timeupdate")))}),this.addEventListener("onAdsCompleted",()=>{n(this,d,!1,O),this.dispatchEvent(new Event("durationchange")),this.adTagUrl=void 0,E(this,d,z).call(this,!1),E(this,d,N).call(this,!1),this.addEventListener("ended",this.onEnded,{once:!0}),setTimeout(()=>{this.play()},100)}),globalThis.addEventListener("mediaenterfullscreenrequest",()=>{var t;(t=e(this,a))==null||t.updateViewMode(!0)}),globalThis.addEventListener("mediaexitfullscreenrequest",()=>{var t;(t=e(this,a))==null||t.updateViewMode(!1)})},I=function(){var t;return(t=this.shadowRoot)==null?void 0:t.getElementById("adContainer")},O=function(t){t!==this.adBreak&&(this.toggleAttribute(k.AD_BREAK,!!t),E(this,d,N).call(this,t))},N=function(t){this.dispatchEvent(new CustomEvent("adbreakchange",{detail:{isAdBreak:t},composed:!0,bubbles:!0}))},z=function(t){var s;(s=e(this,d,I))==null||s.classList.toggle("ad-playing",t)},q=function(){if(e(this,a))return e(this,a).isUsingSameVideoElement()},S.getTemplateHTML=t=>`
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
  `;globalThis.customElements&&!globalThis.customElements.get("mux-video-ads")&&(globalThis.customElements.define("mux-video-ads",S),globalThis.MuxVideoAds=S);var re=S;export{re as default};
//# sourceMappingURL=index.mjs.map
