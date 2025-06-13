"use client";import ve,{useEffect as bn}from"react";var _t=Object.create,Ke=Object.defineProperty,zt=Object.getOwnPropertyDescriptor,Ye=Object.getOwnPropertyNames,Ot=Object.getPrototypeOf,It=Object.prototype.hasOwnProperty,G=(e,t)=>function(){return t||(0,e[Ye(e)[0]])((t={exports:{}}).exports,t),t.exports},Dt=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ye(t))!It.call(e,s)&&s!==r&&Ke(e,s,{get:()=>t[s],enumerable:!(n=zt(t,s))||n.enumerable});return e},Ft=(e,t,r)=>(r=e!=null?_t(Ot(e)):{},Dt(t||!e||!e.__esModule?Ke(r,"default",{value:e,enumerable:!0}):r,e)),Bt=G({"node_modules/global/window.js"(e,t){var r;typeof window!="undefined"?r=window:typeof global!="undefined"?r=global:typeof self!="undefined"?r=self:r={},t.exports=r}}),Ht=G({"node_modules/is-function/index.js"(e,t){t.exports=n;var r=Object.prototype.toString;function n(s){if(!s)return!1;var a=r.call(s);return a==="[object Function]"||typeof s=="function"&&a!=="[object RegExp]"||typeof window!="undefined"&&(s===window.setTimeout||s===window.alert||s===window.confirm||s===window.prompt)}}}),Nt=G({"node_modules/parse-headers/parse-headers.js"(e,t){var r=function(s){return s.replace(/^\s+|\s+$/g,"")},n=function(s){return Object.prototype.toString.call(s)==="[object Array]"};t.exports=function(s){if(!s)return{};for(var a={},l=r(s).split(`
`),u=0;u<l.length;u++){var c=l[u],h=c.indexOf(":"),m=r(c.slice(0,h)).toLowerCase(),k=r(c.slice(h+1));typeof a[m]=="undefined"?a[m]=k:n(a[m])?a[m].push(k):a[m]=[a[m],k]}return a}}}),jt=G({"node_modules/xtend/immutable.js"(e,t){t.exports=n;var r=Object.prototype.hasOwnProperty;function n(){for(var s={},a=0;a<arguments.length;a++){var l=arguments[a];for(var u in l)r.call(l,u)&&(s[u]=l[u])}return s}}}),Wt=G({"node_modules/xhr/index.js"(e,t){"use strict";var r=Bt(),n=Ht(),s=Nt(),a=jt();t.exports=h,t.exports.default=h,h.XMLHttpRequest=r.XMLHttpRequest||ye,h.XDomainRequest="withCredentials"in new h.XMLHttpRequest?h.XMLHttpRequest:r.XDomainRequest,l(["get","put","post","patch","head","delete"],function(o){h[o==="delete"?"del":o]=function(v,y,O){return y=c(v,y,O),y.method=o.toUpperCase(),m(y)}});function l(o,v){for(var y=0;y<o.length;y++)v(o[y])}function u(o){for(var v in o)if(o.hasOwnProperty(v))return!1;return!0}function c(o,v,y){var O=o;return n(v)?(y=v,typeof o=="string"&&(O={uri:o})):O=a(v,{uri:o}),O.callback=y,O}function h(o,v,y){return v=c(o,v,y),m(v)}function m(o){if(typeof o.callback=="undefined")throw new Error("callback argument missing");var v=!1,y=function(F,se,Lt){v||(v=!0,o.callback(F,se,Lt))};function O(){d.readyState===4&&setTimeout(Ie,0)}function Ut(){var f=void 0;if(d.response?f=d.response:f=d.responseText||k(d),De)try{f=JSON.parse(f)}catch{}return f}function Ee(f){return clearTimeout(Se),f instanceof Error||(f=new Error(""+(f||"Unknown XMLHttpRequest Error"))),f.statusCode=0,y(f,Fe)}function Ie(){if(!ne){var f;clearTimeout(Se),o.useXDR&&d.status===void 0?f=200:f=d.status===1223?204:d.status;var F=Fe,se=null;return f!==0?(F={body:Ut(),statusCode:f,method:$,headers:{},url:xe,rawRequest:d},d.getAllResponseHeaders&&(F.headers=s(d.getAllResponseHeaders()))):se=new Error("Internal XMLHttpRequest Error"),y(se,F,F.body)}}var d=o.xhr||null;d||(o.cors||o.useXDR?d=new h.XDomainRequest:d=new h.XMLHttpRequest);var re,ne,xe=d.url=o.uri||o.url,$=d.method=o.method||"GET",ke=o.body||o.data,U=d.headers=o.headers||{},Ce=!!o.sync,De=!1,Se,Fe={body:void 0,headers:{},statusCode:0,method:$,url:xe,rawRequest:d};if("json"in o&&o.json!==!1&&(De=!0,U.accept||U.Accept||(U.Accept="application/json"),$!=="GET"&&$!=="HEAD"&&(U["content-type"]||U["Content-Type"]||(U["Content-Type"]="application/json"),ke=JSON.stringify(o.json===!0?ke:o.json))),d.onreadystatechange=O,d.onload=Ie,d.onerror=Ee,d.onprogress=function(){},d.onabort=function(){ne=!0},d.ontimeout=Ee,d.open($,xe,!Ce,o.username,o.password),Ce||(d.withCredentials=!!o.withCredentials),!Ce&&o.timeout>0&&(Se=setTimeout(function(){if(!ne){ne=!0,d.abort("timeout");var f=new Error("XMLHttpRequest timeout");f.code="ETIMEDOUT",Ee(f)}},o.timeout)),d.setRequestHeader)for(re in U)U.hasOwnProperty(re)&&d.setRequestHeader(re,U[re]);else if(o.headers&&!u(o.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in o&&(d.responseType=o.responseType),"beforeSend"in o&&typeof o.beforeSend=="function"&&o.beforeSend(d),d.send(ke||null),d}function k(o){try{if(o.responseType==="document")return o.responseXML;var v=o.responseXML&&o.responseXML.documentElement.nodeName==="parsererror";if(o.responseType===""&&!v)return o.responseXML}catch{}return null}function ye(){}}});function Pe(e,t,...r){if(!e)throw new TypeError(Ze(t,r))}function Ze(e,t){let r=0;return e.replace(/%[os]/gu,()=>Je(t[r++]))}function Je(e){return typeof e!="object"||e===null?String(e):Object.prototype.toString.call(e)}var Be;function $t(e){try{let t=e instanceof Error?e:new Error(Je(e));if(Be){Be(t);return}if(typeof dispatchEvent=="function"&&typeof ErrorEvent=="function")dispatchEvent(new ErrorEvent("error",{error:t,message:t.message}));else if(typeof process!="undefined"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)}catch{}}var M=typeof window!="undefined"?window:typeof self!="undefined"?self:typeof global!="undefined"?global:typeof globalThis!="undefined"?globalThis:void 0,He,L=class{constructor(e,t){this.code=e,this.message=t}warn(...e){var t;try{if(He){He({...this,args:e});return}let r=((t=new Error().stack)!==null&&t!==void 0?t:"").replace(/^(?:.+?\n){2}/gu,`
`);console.warn(this.message,...e,r)}catch{}}},Xt=new L("W01","Unable to initialize event under dispatching."),qt=new L("W02","Assigning any falsy value to 'cancelBubble' property has no effect."),Gt=new L("W03","Assigning any truthy value to 'returnValue' property has no effect."),Vt=new L("W04","Unable to preventDefault on non-cancelable events."),Kt=new L("W05","Unable to preventDefault inside passive event listener invocation."),Yt=new L("W06","An event listener wasn't added because it has been added already: %o, %o"),Re=new L("W07","The %o option value was abandoned because the event listener wasn't added as duplicated."),Ne=new L("W08","The 'callback' argument must be a function or an object that has 'handleEvent' method: %o"),kn=new L("W09","Event attribute handler must be a function: %o"),_=class{static get NONE(){return je}static get CAPTURING_PHASE(){return We}static get AT_TARGET(){return $e}static get BUBBLING_PHASE(){return Xe}constructor(e,t){Object.defineProperty(this,"isTrusted",{value:!1,enumerable:!0});let r=t!=null?t:{};Te.set(this,{type:String(e),bubbles:!!r.bubbles,cancelable:!!r.cancelable,composed:!!r.composed,target:null,currentTarget:null,stopPropagationFlag:!1,stopImmediatePropagationFlag:!1,canceledFlag:!1,inPassiveListenerFlag:!1,dispatchFlag:!1,timeStamp:Date.now()})}get type(){return g(this).type}get target(){return g(this).target}get srcElement(){return g(this).target}get currentTarget(){return g(this).currentTarget}composedPath(){let e=g(this).currentTarget;return e?[e]:[]}get NONE(){return je}get CAPTURING_PHASE(){return We}get AT_TARGET(){return $e}get BUBBLING_PHASE(){return Xe}get eventPhase(){return g(this).dispatchFlag?2:0}stopPropagation(){g(this).stopPropagationFlag=!0}get cancelBubble(){return g(this).stopPropagationFlag}set cancelBubble(e){e?g(this).stopPropagationFlag=!0:qt.warn()}stopImmediatePropagation(){let e=g(this);e.stopPropagationFlag=e.stopImmediatePropagationFlag=!0}get bubbles(){return g(this).bubbles}get cancelable(){return g(this).cancelable}get returnValue(){return!g(this).canceledFlag}set returnValue(e){e?Gt.warn():qe(g(this))}preventDefault(){qe(g(this))}get defaultPrevented(){return g(this).canceledFlag}get composed(){return g(this).composed}get isTrusted(){return!1}get timeStamp(){return g(this).timeStamp}initEvent(e,t=!1,r=!1){let n=g(this);if(n.dispatchFlag){Xt.warn();return}Te.set(this,{...n,type:String(e),bubbles:!!t,cancelable:!!r,target:null,currentTarget:null,stopPropagationFlag:!1,stopImmediatePropagationFlag:!1,canceledFlag:!1})}},je=0,We=1,$e=2,Xe=3,Te=new WeakMap;function g(e,t="this"){let r=Te.get(e);return Pe(r!=null,"'%s' must be an object that Event constructor created, but got another one: %o",t,e),r}function qe(e){if(e.inPassiveListenerFlag){Kt.warn();return}if(!e.cancelable){Vt.warn();return}e.canceledFlag=!0}Object.defineProperty(_,"NONE",{enumerable:!0});Object.defineProperty(_,"CAPTURING_PHASE",{enumerable:!0});Object.defineProperty(_,"AT_TARGET",{enumerable:!0});Object.defineProperty(_,"BUBBLING_PHASE",{enumerable:!0});var we=Object.getOwnPropertyNames(_.prototype);for(let e=0;e<we.length;++e)we[e]!=="constructor"&&Object.defineProperty(_.prototype,we[e],{enumerable:!0});typeof M!="undefined"&&typeof M.Event!="undefined"&&Object.setPrototypeOf(_.prototype,M.Event.prototype);function Zt(e){return M.DOMException?new M.DOMException(e,"InvalidStateError"):(N==null&&(N=class Qe extends Error{constructor(r){super(r),Error.captureStackTrace&&Error.captureStackTrace(this,Qe)}get code(){return 11}get name(){return"InvalidStateError"}},Object.defineProperties(N.prototype,{code:{enumerable:!0},name:{enumerable:!0}}),Ve(N),Ve(N.prototype)),new N(e))}var N,Ge={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25};function Ve(e){let t=Object.keys(Ge);for(let r=0;r<t.length;++r){let n=t[r],s=Ge[n];Object.defineProperty(e,n,{get(){return s},configurable:!0,enumerable:!0})}}var ae=class extends _{static wrap(e){return new(tt(e))(e)}constructor(e){super(e.type,{bubbles:e.bubbles,cancelable:e.cancelable,composed:e.composed}),e.cancelBubble&&super.stopPropagation(),e.defaultPrevented&&super.preventDefault(),et.set(this,{original:e});let t=Object.keys(e);for(let r=0;r<t.length;++r){let n=t[r];n in this||Object.defineProperty(this,n,rt(e,n))}}stopPropagation(){super.stopPropagation();let{original:e}=I(this);"stopPropagation"in e&&e.stopPropagation()}get cancelBubble(){return super.cancelBubble}set cancelBubble(e){super.cancelBubble=e;let{original:t}=I(this);"cancelBubble"in t&&(t.cancelBubble=e)}stopImmediatePropagation(){super.stopImmediatePropagation();let{original:e}=I(this);"stopImmediatePropagation"in e&&e.stopImmediatePropagation()}get returnValue(){return super.returnValue}set returnValue(e){super.returnValue=e;let{original:t}=I(this);"returnValue"in t&&(t.returnValue=e)}preventDefault(){super.preventDefault();let{original:e}=I(this);"preventDefault"in e&&e.preventDefault()}get timeStamp(){let{original:e}=I(this);return"timeStamp"in e?e.timeStamp:super.timeStamp}},et=new WeakMap;function I(e){let t=et.get(e);return Pe(t!=null,"'this' is expected an Event object, but got",e),t}var ie=new WeakMap;ie.set(Object.prototype,ae);typeof M!="undefined"&&typeof M.Event!="undefined"&&ie.set(M.Event.prototype,ae);function tt(e){let t=Object.getPrototypeOf(e);if(t==null)return ae;let r=ie.get(t);return r==null&&(r=Jt(tt(t),t),ie.set(t,r)),r}function Jt(e,t){class r extends e{}let n=Object.keys(t);for(let s=0;s<n.length;++s)Object.defineProperty(r.prototype,n[s],rt(t,n[s]));return r}function rt(e,t){let r=Object.getOwnPropertyDescriptor(e,t);return{get(){let n=I(this).original,s=n[t];return typeof s=="function"?s.bind(n):s},set(n){let s=I(this).original;s[t]=n},configurable:r.configurable,enumerable:r.enumerable}}function Qt(e,t,r,n,s,a){return{callback:e,flags:(t?1:0)|(r?2:0)|(n?4:0),signal:s,signalListener:a}}function er(e){e.flags|=8}function nt(e){return(e.flags&1)===1}function st(e){return(e.flags&2)===2}function it(e){return(e.flags&4)===4}function tr(e){return(e.flags&8)===8}function rr({callback:e},t,r){try{typeof e=="function"?e.call(t,r):typeof e.handleEvent=="function"&&e.handleEvent(r)}catch(n){$t(n)}}function at({listeners:e},t,r){for(let n=0;n<e.length;++n)if(e[n].callback===t&&nt(e[n])===r)return n;return-1}function nr(e,t,r,n,s,a){let l;a&&(l=ot.bind(null,e,t,r),a.addEventListener("abort",l));let u=Qt(t,r,n,s,a,l);return e.cow?(e.cow=!1,e.listeners=[...e.listeners,u]):e.listeners.push(u),u}function ot(e,t,r){let n=at(e,t,r);return n!==-1?lt(e,n):!1}function lt(e,t,r=!1){let n=e.listeners[t];return er(n),n.signal&&n.signal.removeEventListener("abort",n.signalListener),e.cow&&!r?(e.cow=!1,e.listeners=e.listeners.filter((s,a)=>a!==t),!1):(e.listeners.splice(t,1),!0)}function sr(){return Object.create(null)}function ir(e,t){var r;return(r=e[t])!==null&&r!==void 0?r:e[t]={attrCallback:void 0,attrListener:void 0,cow:!1,listeners:[]}}var oe=class{constructor(){ut.set(this,sr())}addEventListener(e,t,r){let n=Me(this),{callback:s,capture:a,once:l,passive:u,signal:c,type:h}=ar(e,t,r);if(s==null||c!=null&&c.aborted)return;let m=ir(n,h),k=at(m,s,a);if(k!==-1){lr(m.listeners[k],u,l,c);return}nr(m,s,a,u,l,c)}removeEventListener(e,t,r){let n=Me(this),{callback:s,capture:a,type:l}=or(e,t,r),u=n[l];s!=null&&u&&ot(u,s,a)}dispatchEvent(e){let t=Me(this)[String(e.type)];if(t==null)return!0;let r=e instanceof _?e:ae.wrap(e),n=g(r,"event");if(n.dispatchFlag)throw Zt("This event has been in dispatching.");if(n.dispatchFlag=!0,n.target=n.currentTarget=this,!n.stopPropagationFlag){let{cow:s,listeners:a}=t;t.cow=!0;for(let l=0;l<a.length;++l){let u=a[l];if(!tr(u)&&(it(u)&&lt(t,l,!s)&&(l-=1),n.inPassiveListenerFlag=st(u),rr(u,this,r),n.inPassiveListenerFlag=!1,n.stopImmediatePropagationFlag))break}s||(t.cow=!1)}return n.target=null,n.currentTarget=null,n.stopImmediatePropagationFlag=!1,n.stopPropagationFlag=!1,n.dispatchFlag=!1,!n.canceledFlag}},ut=new WeakMap;function Me(e,t="this"){let r=ut.get(e);return Pe(r!=null,"'%s' must be an object that EventTarget constructor created, but got another one: %o",t,e),r}function ar(e,t,r){var n;return dt(t),typeof r=="object"&&r!==null?{type:String(e),callback:t!=null?t:void 0,capture:!!r.capture,passive:!!r.passive,once:!!r.once,signal:(n=r.signal)!==null&&n!==void 0?n:void 0}:{type:String(e),callback:t!=null?t:void 0,capture:!!r,passive:!1,once:!1,signal:void 0}}function or(e,t,r){return dt(t),typeof r=="object"&&r!==null?{type:String(e),callback:t!=null?t:void 0,capture:!!r.capture}:{type:String(e),callback:t!=null?t:void 0,capture:!!r}}function dt(e){if(!(typeof e=="function"||typeof e=="object"&&e!==null&&typeof e.handleEvent=="function")){if(e==null||typeof e=="object"){Ne.warn(e);return}throw new TypeError(Ze(Ne.message,[e]))}}function lr(e,t,r,n){Yt.warn(nt(e)?"capture":"bubble",e.callback),st(e)!==t&&Re.warn("passive"),it(e)!==r&&Re.warn("once"),e.signal!==n&&Re.warn("signal")}var Ae=Object.getOwnPropertyNames(oe.prototype);for(let e=0;e<Ae.length;++e)Ae[e]!=="constructor"&&Object.defineProperty(oe.prototype,Ae[e],{enumerable:!0});typeof M!="undefined"&&typeof M.EventTarget!="undefined"&&Object.setPrototypeOf(oe.prototype,M.EventTarget.prototype);var ur=Ft(Wt()),Ue=30720,V=512e3,K=256,X=(e,{minChunkSize:t=K,maxChunkSize:r=V}={})=>e==null||typeof e=="number"&&e>=256&&e%256===0&&e>=t&&e<=r,q=(e,{minChunkSize:t=K,maxChunkSize:r=V}={})=>new TypeError(`chunkSize ${e} must be a positive number in multiples of 256, between ${t} and ${r}`),dr=class{constructor(e,t={}){this.readableStream=e;var r,n,s;if(!X(t.defaultChunkSize,t))throw q(t.defaultChunkSize,t);this.defaultChunkSize=(r=t.defaultChunkSize)!=null?r:Ue,this.minChunkSize=(n=t.minChunkSize)!=null?n:K,this.maxChunkSize=(s=t.maxChunkSize)!=null?s:V}get chunkSize(){var e;return(e=this._chunkSize)!=null?e:this.defaultChunkSize}set chunkSize(e){if(!X(e,this))throw q(e,this);this._chunkSize=e}get chunkByteSize(){return this.chunkSize*1024}get error(){return this._error}async*[Symbol.asyncIterator](){let e,t=this.readableStream.getReader();try{for(;;){let{done:r,value:n}=await t.read();if(r){if(e){let a=e;e=void 0,yield a}break}let s=n instanceof Uint8Array?new Blob([n],{type:"application/octet-stream"}):n;for(e=e?new Blob([e,s]):s;e;)if(e.size===this.chunkByteSize){let a=e;e=void 0,yield a;break}else{if(e.size<this.chunkByteSize)break;{let a=e.slice(0,this.chunkByteSize);e=e.slice(this.chunkByteSize),yield a}}}}catch(r){this._error=r}finally{if(e){let r=e;e=void 0,yield r}t.releaseLock();return}}},pr=class{constructor(e,t={}){this.file=e;var r,n,s;if(!X(t.defaultChunkSize,t))throw q(t.defaultChunkSize,t);this.defaultChunkSize=(r=t.defaultChunkSize)!=null?r:Ue,this.minChunkSize=(n=t.minChunkSize)!=null?n:K,this.maxChunkSize=(s=t.maxChunkSize)!=null?s:V}get chunkSize(){var e;return(e=this._chunkSize)!=null?e:this.defaultChunkSize}set chunkSize(e){if(!X(e,this))throw q(e,this);this._chunkSize=e}get chunkByteSize(){return this.chunkSize*1024}get error(){return this._error}async*[Symbol.asyncIterator](){let e=new FileReader,t=0,r=()=>new Promise(n=>{if(t>=this.file.size){n(void 0);return}let s=Math.min(this.chunkByteSize,this.file.size-t);e.onload=()=>{e.result!==null?n(new Blob([e.result],{type:"application/octet-stream"})):n(void 0)},e.readAsArrayBuffer(this.file.slice(t,t+s))});try{for(;;){let n=await r();if(n)t+=n.size,yield n;else break}}catch(n){this._error=n}}},cr=[200,201,202,204,308],pt=[408,502,503,504],hr=[308],ct=(e,t)=>!!e&&cr.includes(e.statusCode),fr=(e,{retryCodes:t=pt})=>!e||t.includes(e.statusCode),gr=(e,t)=>t.attemptCount>=t.attempts||!(ct(e)||fr(e,t)),mr=(e,t)=>{var r;if(!e||!hr.includes(e.statusCode)||!((r=e.headers)!=null&&r.range))return!1;let n=e.headers.range.match(/bytes=(\d+)-(\d+)/);return n?parseInt(n[2],10)<t.currentChunkEndByte:!1},Le=class{static createUpload(e){return new Le(e)}constructor(e){if(this.eventTarget=new oe,this.endpoint=e.endpoint,this.file=e.file,this.headers=e.headers||{},this.method=e.method||"PUT",this.attempts=e.attempts||5,this.delayBeforeAttempt=e.delayBeforeAttempt||1,this.retryCodes=e.retryCodes||pt,this.dynamicChunkSize=e.dynamicChunkSize||!1,this.maxFileBytes=(e.maxFileSize||0)*1024,this.chunkCount=0,this.attemptCount=0,this._offline=typeof window!="undefined"&&!window.navigator.onLine,this._paused=!1,this.success=!1,this.nextChunkRangeStart=0,e.useLargeFileWorkaround){let t=r=>{this.chunkedIterable.error&&(console.warn(`Unable to read file of size ${this.file.size} bytes via a ReadableStream. Falling back to in-memory FileReader!`),r.stopImmediatePropagation(),this.chunkedIterable=new pr(this.file,{...e,defaultChunkSize:e.chunkSize}),this.chunkedIterator=this.chunkedIterable[Symbol.asyncIterator](),this.getEndpoint().then(()=>{this.sendChunks()}).catch(n=>{let s=n!=null&&n.message?`: ${n.message}`:"";this.dispatch("error",{message:`Failed to get endpoint${s}`})}),this.off("error",t))};this.on("error",t)}this.chunkedIterable=new dr(this.file.stream(),{...e,defaultChunkSize:e.chunkSize}),this.chunkedIterator=this.chunkedIterable[Symbol.asyncIterator](),this.totalChunks=Math.ceil(this.file.size/this.chunkByteSize),this.validateOptions(),this.getEndpoint().then(()=>this.sendChunks()).catch(t=>{let r=t!=null&&t.message?`: ${t.message}`:"";this.dispatch("error",{message:`Failed to get endpoint${r}`})}),typeof window!="undefined"&&(window.addEventListener("online",()=>{this.offline&&(this._offline=!1,this.dispatch("online"),this.sendChunks())}),window.addEventListener("offline",()=>{this.offline||(this._offline=!0,this.dispatch("offline"))}))}get maxChunkSize(){var e,t;return(t=(e=this.chunkedIterable)==null?void 0:e.maxChunkSize)!=null?t:V}get minChunkSize(){var e,t;return(t=(e=this.chunkedIterable)==null?void 0:e.minChunkSize)!=null?t:K}get chunkSize(){var e,t;return(t=(e=this.chunkedIterable)==null?void 0:e.chunkSize)!=null?t:Ue}set chunkSize(e){this.chunkedIterable.chunkSize=e}get chunkByteSize(){return this.chunkedIterable.chunkByteSize}get totalChunkSize(){return Math.ceil(this.file.size/this.chunkByteSize)}on(e,t){this.eventTarget.addEventListener(e,t)}once(e,t){this.eventTarget.addEventListener(e,t,{once:!0})}off(e,t){this.eventTarget.removeEventListener(e,t)}get offline(){return this._offline}get paused(){return this._paused}abort(){var e;this.pause(),(e=this.currentXhr)==null||e.abort()}pause(){this._paused=!0}resume(){this._paused&&(this._paused=!1,this.sendChunks())}get successfulPercentage(){return this.nextChunkRangeStart/this.file.size}dispatch(e,t){let r=new CustomEvent(e,{detail:t});this.eventTarget.dispatchEvent(r)}validateOptions(){if(!this.endpoint||typeof this.endpoint!="function"&&typeof this.endpoint!="string")throw new TypeError("endpoint must be defined as a string or a function that returns a promise");if(!(this.file instanceof File))throw new TypeError("file must be a File object");if(this.headers&&typeof this.headers!="function"&&typeof this.headers!="object")throw new TypeError("headers must be null, an object, or a function that returns an object or a promise");if(!X(this.chunkSize,{maxChunkSize:this.maxChunkSize,minChunkSize:this.minChunkSize}))throw q(this.chunkSize,{maxChunkSize:this.maxChunkSize,minChunkSize:this.minChunkSize});if(this.maxChunkSize&&(typeof this.maxChunkSize!="number"||this.maxChunkSize<256||this.maxChunkSize%256!==0||this.maxChunkSize<this.chunkSize||this.maxChunkSize<this.minChunkSize))throw new TypeError(`maxChunkSize must be a positive number in multiples of 256, and larger than or equal to both ${this.minChunkSize} and ${this.chunkSize}`);if(this.minChunkSize&&(typeof this.minChunkSize!="number"||this.minChunkSize<256||this.minChunkSize%256!==0||this.minChunkSize>this.chunkSize||this.minChunkSize>this.maxChunkSize))throw new TypeError(`minChunkSize must be a positive number in multiples of 256, and smaller than ${this.chunkSize} and ${this.maxChunkSize}`);if(this.maxFileBytes>0&&this.maxFileBytes<this.file.size)throw new Error(`file size exceeds maximum (${this.file.size} > ${this.maxFileBytes})`);if(this.attempts&&(typeof this.attempts!="number"||this.attempts<=0))throw new TypeError("retries must be a positive number");if(this.delayBeforeAttempt&&(typeof this.delayBeforeAttempt!="number"||this.delayBeforeAttempt<0))throw new TypeError("delayBeforeAttempt must be a positive number")}getEndpoint(){return typeof this.endpoint=="string"?(this.endpointValue=this.endpoint,Promise.resolve(this.endpoint)):this.endpoint(this.file).then(e=>{if(this.endpointValue=e,typeof e!="string")throw new TypeError("endpoint must return a string");return this.endpointValue})}xhrPromise(e){let t=r=>{r.upload.onprogress=n=>{var s;let a=this.totalChunks-this.chunkCount,l=(this.file.size-this.nextChunkRangeStart)/this.file.size/a,c=n.loaded/((s=n.total)!=null?s:this.chunkByteSize)*l;this.dispatch("progress",Math.min((this.successfulPercentage+c)*100,100))}};return new Promise((r,n)=>{this.currentXhr=(0,ur.default)({...e,beforeSend:t},(s,a)=>(this.currentXhr=void 0,s?n(s):r(a)))})}async sendChunk(e){let t=this.nextChunkRangeStart,r=t+e.size-1,s={...await(typeof this.headers=="function"?this.headers():this.headers),"Content-Type":this.file.type,"Content-Range":`bytes ${t}-${r}/${this.file.size}`};return this.dispatch("attempt",{chunkNumber:this.chunkCount,totalChunks:this.totalChunks,chunkSize:this.chunkSize}),this.xhrPromise({headers:s,url:this.endpointValue,method:this.method,body:e})}async sendChunkWithRetries(e){let t=async(l,u)=>{var c;let m=(new Date().getTime()-this.lastChunkStart.getTime())/1e3;if(this.dispatch("chunkSuccess",{chunk:this.chunkCount,chunkSize:this.chunkSize,attempts:this.attemptCount,timeInterval:m,response:l}),this.attemptCount=0,this.chunkCount=((c=this.chunkCount)!=null?c:0)+1,this.nextChunkRangeStart=this.nextChunkRangeStart+this.chunkByteSize,this.dynamicChunkSize){let k=this.chunkSize;m<10?k=Math.min(this.chunkSize*2,this.maxChunkSize):m>30&&(k=Math.max(this.chunkSize/2,this.minChunkSize)),this.chunkSize=Math.ceil(k/256)*256;let ye=(this.file.size-this.nextChunkRangeStart)/this.chunkByteSize;this.totalChunks=Math.ceil(this.chunkCount+ye)}return!0},r=async(l,u)=>(this.dispatch("progress",Math.min(this.successfulPercentage*100,100)),this.dispatch("error",{message:`Server responded with ${l.statusCode}. Stopping upload.`,chunk:this.chunkCount,attempts:this.attemptCount,response:l}),!1),n=async(l,u)=>(this.dispatch("attemptFailure",{message:`An error occured uploading chunk ${this.chunkCount}. ${this.attempts-this.attemptCount} retries left.`,chunkNumber:this.chunkCount,attemptsLeft:this.attempts-this.attemptCount,response:l}),new Promise(c=>{setTimeout(async()=>{if(this._paused||this.offline){this.pendingChunk=e,c(!1);return}let h=await this.sendChunkWithRetries(e);c(h)},this.delayBeforeAttempt*1e3)})),s;try{this.attemptCount=this.attemptCount+1,this.lastChunkStart=new Date,s=await this.sendChunk(e)}catch(l){typeof(l==null?void 0:l.statusCode)=="number"&&(s=l)}let a={retryCodes:this.retryCodes,attemptCount:this.attemptCount,attempts:this.attempts,currentChunkEndByte:this.nextChunkRangeStart+e.size-1};return mr(s,a)?n(s,e):ct(s,a)?t(s,e):gr(s,a)?r(s,e):n(s,e)}async sendChunks(){if(this.pendingChunk&&!(this._paused||this.offline)){let e=this.pendingChunk;this.pendingChunk=void 0;let t=await this.sendChunkWithRetries(e);this.success&&t&&this.dispatch("success")}for(;!(this.success||this._paused||this.offline);){let{value:e,done:t}=await this.chunkedIterator.next(),r=!e&&t;if(e&&(r=await this.sendChunkWithRetries(e)),this.chunkedIterable.error){r=!1,this.dispatch("error",{message:`Unable to read file of size ${this.file.size} bytes. Try loading from another browser.`});return}if(this.success=!!t,this.success&&r&&this.dispatch("success"),!r)return}}};var br=Object.defineProperty,gt=e=>{throw TypeError(e)},vr=(e,t)=>{for(var r in t)br(e,r,{get:t[r],enumerable:!0})},mt=(e,t,r)=>t.has(e)||gt("Cannot "+r),i=(e,t,r)=>(mt(e,t,"read from private field"),r?r.call(e):t.get(e)),E=(e,t,r)=>t.has(e)?gt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),x=(e,t,r,n)=>(mt(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),ze={};vr(ze,{ProgressTypes:()=>j});var j={BAR:"bar",RADIAL:"radial",PERCENTAGE:"percentage"},pe=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if(typeof DocumentFragment=="undefined"){class e extends pe{}globalThis.DocumentFragment=e}var Oe=class extends pe{},yr=class extends pe{},Er={get(e){},define(e,t,r){},getName(e){return null},upgrade(e){},whenDefined(e){return Promise.resolve(Oe)}},ue,xr=class{constructor(e,t={}){E(this,ue),x(this,ue,t==null?void 0:t.detail)}get detail(){return i(this,ue)}initCustomEvent(){}};ue=new WeakMap;function kr(e,t){return new Oe}var bt={document:{createElement:kr},DocumentFragment,customElements:Er,CustomEvent:xr,EventTarget:pe,HTMLElement:Oe,HTMLVideoElement:yr},vt=typeof window=="undefined"||typeof globalThis.customElements=="undefined",p=vt?bt:globalThis,P=vt?bt.document:globalThis.document,yt=(e,t)=>e?e.closest(t)||yt(e.getRootNode().host,t):null,H=e=>{let t=e.getAttribute("mux-uploader");return t?document.getElementById(t):yt(e,"mux-uploader")},Et=P.createElement("template");Et.innerHTML=`
<style>
  :host {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ccc;
    padding: 2.5rem 2rem;
    border-radius: .25rem;
  }

  slot[name='heading'] > * {
    margin-bottom: 0.75rem;
    font-size: 1.75rem;
    text-align: center;
  }

  slot[name='separator'] > * {
    margin-bottom: 0.75rem;
  }

  #overlay {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  :host([active][overlay]) > #overlay {
    background: var(--overlay-background-color, rgba(226, 253, 255, 0.95));
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  :host([file-ready])::part(heading),
  :host([file-ready])::part(separator) {
    display: none;
  }
</style>

<slot name="heading" part="heading">
  <span>Drop a video file here to upload</span>
</slot>
<slot name="separator" part="separator">
  <span>or</span>
</slot>
<slot></slot>

<div id="overlay">
  <h1 id="overlay-label"></h1>
</div>
`;var _e={MUX_UPLOADER:"mux-uploader",OVERLAY_TEXT:"overlay-text"},de,w,Y,ht=class extends p.HTMLElement{constructor(){super(),E(this,de),E(this,w),E(this,Y);let e=this.attachShadow({mode:"open"});e.appendChild(Et.content.cloneNode(!0)),x(this,de,e.getElementById("overlay-label"))}connectedCallback(){if(x(this,w,H(this)),x(this,Y,new AbortController),i(this,w)){let e={signal:i(this,Y).signal};i(this,w).addEventListener("file-ready",()=>this.toggleAttribute("file-ready",!0),e),i(this,w).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),e),i(this,w).addEventListener("success",()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)},e),i(this,w).addEventListener("reset",()=>{this.toggleAttribute("file-ready",!1),this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!1)},e),this.setupDragEvents(e),this.toggleAttribute("upload-in-progress",i(this,w).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,w).hasAttribute("upload-complete")),this.toggleAttribute("file-ready",i(this,w).hasAttribute("file-ready"))}}disconnectedCallback(){var e;(e=i(this,Y))==null||e.abort()}attributeChangedCallback(e,t,r){e===_e.OVERLAY_TEXT&&t!==r?i(this,de).innerHTML=r!=null?r:"":e==="active"&&this.hasAttribute("overlay")&&r!=null&&(this._currentDragTarget=this)}static get observedAttributes(){return[_e.OVERLAY_TEXT,_e.MUX_UPLOADER,"active"]}setupDragEvents(e){this.addEventListener("dragenter",t=>{this._currentDragTarget=t.target,t.preventDefault(),t.stopPropagation(),this.toggleAttribute("active",!0)},e),this.addEventListener("dragleave",t=>{this._currentDragTarget===t.target&&(this._currentDragTarget=void 0,this.toggleAttribute("active",!1))},e),this.addEventListener("dragover",t=>{t.preventDefault(),t.stopPropagation()},e),this.addEventListener("drop",t=>{var r;t.preventDefault(),t.stopPropagation();let{dataTransfer:n}=t,{files:s}=n,a=s[0];((r=i(this,w))!=null?r:this).dispatchEvent(new CustomEvent("file-ready",{composed:!0,bubbles:!0,detail:a})),this.removeAttribute("active")},e)}};de=new WeakMap,w=new WeakMap,Y=new WeakMap;p.customElements.get("mux-uploader-drop")||(p.customElements.define("mux-uploader-drop",ht),p.MuxUploaderDropElement=ht);function Cr(e){return`${Math.floor(e)}%`}var xt=P.createElement("template"),Sr="Media upload progress bar";xt.innerHTML=`
<style>
  :host {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .bar-type {
    background: var(--progress-bar-background-color, #e6e6e6);
    border-radius: var(--progress-bar-border-radius, 100px);
    height: var(--progress-bar-height, 4px);
    width: 100%;
  }

  .radial-type,
  .bar-type,
  #percentage-type,
  :host([type="bar"][upload-error]) #percentage-type {
    display: none;
  }

  :host([type="radial"][upload-in-progress]) .radial-type,
  :host([type="bar"][upload-in-progress]) .bar-type {
    display: block;
  }

  :host([type="percentage"][upload-in-progress]) #percentage-type {
    display: var(--progress-percentage-display, block);
  }

  :host([type="bar"][upload-error]) .progress-bar {
    background: #e22c3e;
  }

  .progress-bar {
    box-shadow: var(--progress-bar-box-shadow, 0 10px 40px -10px #fff);
    border-radius: var(--progress-bar-border-radius, 100px);
    background: var(--progress-bar-fill-color, #000000);
    height: var(--progress-bar-height, 4px);
    width: 0%;
    transition: width 0.25s;
  }

  circle {
    stroke: var(--progress-radial-fill-color, black);
    stroke-width: 6;  /* Thickness of the circle */
    fill: transparent; /* Make inside of the circle see-through */

    /* Animation */
    transition: 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
  }

  #percentage-type {
    font-size: inherit;
    margin: 0 0 1em;
  }
</style>

<slot></slot>

<p id="percentage-type"></p>
<div class="bar-type">
  <div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="progress-bar" id="progress-bar" tabindex="0"></div>
</div>
<div class="radial-type">
  <svg
    width="120"
    height="120">
    <!-- To prevent overflow of the SVG wrapper, radius must be  (svgWidth / 2) - (circleStrokeWidth * 2)
      or use overflow: visible on the svg.-->
    <circle
      r="52"
      cx="60"
      cy="60"
    />
  <svg>
</div>
`;var T,Z,Rr=class extends p.HTMLElement{constructor(){var e,t,r,n;super(),E(this,T),E(this,Z),this.onUploadStart=()=>{var s;(s=this.progressBar)==null||s.focus(),this.toggleAttribute("upload-in-progress",!0)},this.onProgress=s=>{var a;let l=s.detail;switch((a=this.progressBar)==null||a.setAttribute("aria-valuenow",`${Math.floor(l)}`),this.getAttribute("type")){case j.BAR:{this.progressBar&&(this.progressBar.style.width=`${l}%`);break}case j.RADIAL:{if(this.svgCircle){let u=this.getCircumference()-l/100*this.getCircumference();this.svgCircle.style.strokeDashoffset=u.toString()}break}case j.PERCENTAGE:{this.uploadPercentage&&(this.uploadPercentage.innerHTML=Cr(l));break}}},this.onSuccess=()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)},this.onReset=()=>{this.toggleAttribute("upload-in-progress",!1),this.uploadPercentage&&(this.uploadPercentage.innerHTML=""),this.svgCircle&&(this.svgCircle.style.strokeDashoffset=`${this.getCircumference()}`)},this.attachShadow({mode:"open"}).appendChild(xt.content.cloneNode(!0)),this.svgCircle=(e=this.shadowRoot)==null?void 0:e.querySelector("circle"),this.progressBar=(t=this.shadowRoot)==null?void 0:t.getElementById("progress-bar"),this.uploadPercentage=(r=this.shadowRoot)==null?void 0:r.getElementById("percentage-type"),(n=this.progressBar)==null||n.setAttribute("aria-description",Sr)}connectedCallback(){if(this.setDefaultType(),x(this,T,H(this)),x(this,Z,new AbortController),i(this,T)){let e={signal:i(this,Z).signal};i(this,T).addEventListener("uploadstart",this.onUploadStart,e),i(this,T).addEventListener("reset",this.onReset),i(this,T).addEventListener("progress",this.onProgress),i(this,T).addEventListener("success",this.onSuccess),this.toggleAttribute("upload-in-progress",i(this,T).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,T).hasAttribute("upload-complete"))}}disconnectedCallback(){var e;(e=i(this,Z))==null||e.abort()}getRadius(){var e;return Number((e=this.svgCircle)==null?void 0:e.getAttribute("r"))}getCircumference(){return this.getRadius()*2*Math.PI}setDefaultType(){let e=this.getAttribute("type");e||this.setAttribute("type",j.BAR),e===j.RADIAL&&this.svgCircle&&(this.svgCircle.style.strokeDasharray=`${this.getCircumference()} ${this.getCircumference()}`,this.svgCircle.style.strokeDashoffset=`${this.getCircumference()}`)}};T=new WeakMap,Z=new WeakMap;p.customElements.get("mux-uploader-progress")||p.customElements.define("mux-uploader-progress",Rr);var kt=P.createElement("template");kt.innerHTML=`
<style>

:host([upload-error]) {
  color: #e22c3e;
}
</style>

<span id="status-message" role="status" aria-live="polite"></span>
`;var R,J,wr=class extends p.HTMLElement{constructor(){var e;super(),E(this,R),E(this,J),this.clearStatusMessage=()=>{this.toggleAttribute("upload-error",!1),this.statusMessage&&(this.statusMessage.innerHTML="")},this.onUploadError=t=>{this.toggleAttribute("upload-error",!0),this.statusMessage&&(this.statusMessage.innerHTML=t.detail.message)},this.onSuccess=()=>{this.toggleAttribute("upload-error",!1);let t="Upload complete!";this.statusMessage&&(this.statusMessage.innerHTML=t),console.info(t)},this.onOffline=()=>{this.toggleAttribute("upload-error",!1);let t="Currently offline. Upload will resume automatically when online.";this.statusMessage&&(this.statusMessage.innerHTML=t)},this.attachShadow({mode:"open"}).appendChild(kt.content.cloneNode(!0)),this.statusMessage=(e=this.shadowRoot)==null?void 0:e.getElementById("status-message")}connectedCallback(){if(x(this,R,H(this)),x(this,J,new AbortController),i(this,R)){let e={signal:i(this,J).signal};i(this,R).addEventListener("reset",this.clearStatusMessage,e),i(this,R).addEventListener("uploaderror",this.onUploadError,e),i(this,R).addEventListener("success",this.onSuccess,e),i(this,R).addEventListener("uploadstart",this.clearStatusMessage,e),i(this,R).addEventListener("offline",this.onOffline,e),i(this,R).addEventListener("online",this.clearStatusMessage,e),this.toggleAttribute("upload-in-progress",i(this,R).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,R).hasAttribute("upload-complete")),this.toggleAttribute("upload-error",i(this,R).hasAttribute("upload-error"))}}disconnectedCallback(){var e;(e=i(this,J))==null||e.abort()}};R=new WeakMap,J=new WeakMap;p.customElements.get("mux-uploader-status")||p.customElements.define("mux-uploader-status",wr);var Ct=P.createElement("template");Ct.innerHTML=`
<style>
  #retry-button {
    color: #e22c3e;
    text-decoration-line: underline;
    cursor: pointer;
    position: relative;
    display: none;
  }

  :host([upload-error]) #retry-button {
    display: inline-block;
  }
</style>

<span id="retry-button" role="button" tabindex="0">Try again</span>
`;var D,Q,Mr=class extends p.HTMLElement{constructor(){var e;super(),E(this,D),E(this,Q),this.handleKeyup=t=>{let r=["Enter"," "],{key:n}=t;r.includes(n)&&this.triggerReset()},this.triggerReset=()=>{var t;(t=i(this,D))==null||t.dispatchEvent(new CustomEvent("reset"))},this.attachShadow({mode:"open"}).appendChild(Ct.content.cloneNode(!0)),this.retryButton=(e=this.shadowRoot)==null?void 0:e.getElementById("retry-button")}connectedCallback(){var e,t;if(x(this,D,H(this)),x(this,Q,new AbortController),i(this,D)){let r={signal:i(this,Q).signal};i(this,D).addEventListener("uploaderror",()=>this.toggleAttribute("upload-error",!0)),i(this,D).addEventListener("reset",()=>this.toggleAttribute("upload-error",!1)),(e=this.retryButton)==null||e.addEventListener("click",this.triggerReset,r),(t=this.retryButton)==null||t.addEventListener("keyup",this.handleKeyup,r),this.toggleAttribute("upload-error",i(this,D).hasAttribute("upload-error"))}}disconnectedCallback(){var e;(e=i(this,Q))==null||e.abort()}};D=new WeakMap,Q=new WeakMap;p.customElements.get("mux-uploader-retry")||p.customElements.define("mux-uploader-retry",Mr);var St=P.createElement("template");St.innerHTML=`
<style>
#pause-button {
  cursor: pointer;
  line-height: 16px;
  background: #fff;
  border: 1px solid #000;
  color: #000000;
  padding: 16px 24px;
  border-radius: 4px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: none;
}

#pause-button:hover:not(:disabled) {
  color: #fff;
  background: #404040;
}

#pause-button:active {
  color: #fff;
  background: #000;
}

#pause-button:disabled {
  cursor: not-allowed;
}

:host([upload-in-progress]:not([upload-error], [upload-complete])) #pause-button {
  display: initial;
}
</style>

<button id="pause-button">Pause</span>
`;var b,ee,Ar=class extends p.HTMLElement{constructor(){super(),E(this,b),E(this,ee),this.triggerPause=()=>{if(!i(this,b)){console.warn("pausing before a mux-uploader element is associated is unsupported!");return}this.pauseButton.disabled||(i(this,b).paused=!i(this,b).paused)},this.attachShadow({mode:"open"}).appendChild(St.content.cloneNode(!0))}connectedCallback(){if(x(this,b,H(this)),x(this,ee,new AbortController),i(this,b)){let e={signal:i(this,ee).signal};i(this,b).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),e),i(this,b).addEventListener("uploaderror",()=>{this.toggleAttribute("upload-error",!0),this.toggleAttribute("upload-complete",!1),this.toggleAttribute("upload-in-progress",!1)}),i(this,b).addEventListener("success",()=>{this.toggleAttribute("upload-complete",!0),this.toggleAttribute("upload-error",!1),this.toggleAttribute("upload-in-progress",!1)}),i(this,b).addEventListener("reset",()=>{this.toggleAttribute("upload-error",!1),this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!1)}),i(this,b).addEventListener("pausedchange",()=>{var t;if(this.pauseButton.disabled=!1,!i(this,b))return;let r=(t=i(this,b).paused)!=null?t:!1;this.pauseButton.innerHTML=r?"Pausing...":"Pause",r&&(this.pauseButton.disabled=!0,i(this,b).addEventListener("chunksuccess",()=>{var n;this.pauseButton.innerHTML=(n=i(this,b))!=null&&n.paused?"Resume":"Pause",this.pauseButton.disabled=!1},{once:!0}))}),this.pauseButton.addEventListener("click",this.triggerPause,e),this.toggleAttribute("upload-in-progress",i(this,b).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,b).hasAttribute("upload-complete")),this.toggleAttribute("upload-error",i(this,b).hasAttribute("upload-error"))}}disconnectedCallback(){var e;(e=i(this,ee))==null||e.abort()}get pauseButton(){var e;return(e=this.shadowRoot)==null?void 0:e.getElementById("pause-button")}};b=new WeakMap,ee=new WeakMap;p.customElements.get("mux-uploader-pause")||p.customElements.define("mux-uploader-pause",Ar);var Rt=`
  <style>
  #file-select {
    cursor: pointer;
    line-height: 16px;
    background: #fff;
    border: 1px solid #000;
    color: #000000;
    padding: 16px 24px;
    border-radius: 4px;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
    font-family: inherit;
    font-size: inherit;
    position: relative;
  }

  #file-select:hover {
    color: #fff;
    background: #404040;
  }

  #file-select:active {
    color: #fff;
    background: #000;
  }

  </style>

  <button id="file-select" type="button" part="file-select-button">Upload a video</button>
`,wt=P.createElement("template");wt.innerHTML=`
  <style>
    :host { display: inline-block; }

    :host([file-ready]) > slot  {
      display: none;
    }
  </style>

  <slot>
    ${Rt}
  </slot>
`;var z,A,te,Tr=class extends p.HTMLElement{constructor(){var e,t,r;super(),E(this,z),E(this,A),E(this,te),this.attachShadow({mode:"open"}).appendChild(wt.content.cloneNode(!0)),this.handleFilePickerElClick=this.handleFilePickerElClick.bind(this),this.filePickerEl=(e=this.shadowRoot)==null?void 0:e.querySelector("button"),(r=(t=this.shadowRoot)==null?void 0:t.querySelector("slot"))==null||r.addEventListener("slotchange",n=>{let s=n.currentTarget;this.filePickerEl=s.assignedElements({flatten:!0}).filter(a=>!["STYLE"].includes(a.nodeName))[0]})}connectedCallback(){if(x(this,A,H(this)),x(this,te,new AbortController),i(this,A)){let e={signal:i(this,te).signal};i(this,A).addEventListener("file-ready",()=>{this.toggleAttribute("file-ready",!0)},e),i(this,A).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),e),i(this,A).addEventListener("success",()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)},e),i(this,A).addEventListener("reset",()=>{this.toggleAttribute("file-ready",!1)},e),this.toggleAttribute("upload-in-progress",i(this,A).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,A).hasAttribute("upload-complete")),this.toggleAttribute("file-ready",i(this,A).hasAttribute("file-ready"))}}disconnectedCallback(){var e;(e=i(this,te))==null||e.abort()}get filePickerEl(){return i(this,z)}set filePickerEl(e){e!==i(this,z)&&(i(this,z)&&i(this,z).removeEventListener("click",this.handleFilePickerElClick),x(this,z,e),i(this,z)&&i(this,z).addEventListener("click",this.handleFilePickerElClick))}handleFilePickerElClick(){var e,t;let r=this.getAttribute("mux-uploader"),n=r?P.getElementById(r):this.getRootNode().host;(t=(e=n==null?void 0:n.shadowRoot)==null?void 0:e.querySelector("#hidden-file-input"))==null||t.click()}};z=new WeakMap,A=new WeakMap,te=new WeakMap;p.customElements.get("mux-uploader-file-select")||p.customElements.define("mux-uploader-file-select",Tr);function le(e,t){return e?"":t}var Pr=(e,t)=>{if(t==null||t===!1)return"";let r=t===!0?"":`${t}`;return`${e}="${r}"`};function Ur(e){let{noDrop:t,noProgress:r,noStatus:n,noRetry:s,pausable:a,type:l}=e,u=t?"div":'mux-uploader-drop overlay part="drop"',c=le(r,`
      <mux-uploader-progress part="progress progress-percentage" type="percentage"></mux-uploader-progress>
      <mux-uploader-progress part="progress progress-bar" ${Pr("type",l)}></mux-uploader-progress>
    `),h=le(n,'<mux-uploader-status part="status"></mux-uploader-status>'),m=le(s,'<mux-uploader-retry part="retry"></mux-uploader-retry>'),k=le(!a,'<mux-uploader-pause part="pause"></mux-uploader-pause>');return P.createRange().createContextualFragment(`
    <${u}>
      ${h}
      ${m}
      ${k}

      <mux-uploader-file-select part="file-select">
        <slot name="file-select">
          ${Rt}
        </slot>
      </mux-uploader-file-select>

      ${c}
    </${u}>
  `)}var Mt=P.createElement("template");Mt.innerHTML=`
<style>
  :host {
    display: flex;
    flex-direction: column;
  }

  mux-uploader-drop {
    flex-grow: 1;
  }

  input[type="file"] {
    display: none;
  }
</style>

<input id="hidden-file-input" type="file" accept="video/*, audio/*" />
<mux-uploader-sr-text></mux-uploader-sr-text>
`;var ft=class extends p.HTMLElement{static get observedAttributes(){return["pausable","type","no-drop","no-progress","no-status","no-retry","max-file-size","use-large-file-workaround"]}constructor(){var e;super(),this.attachShadow({mode:"open"}).appendChild(Mt.content.cloneNode(!0)),this.updateLayout(),(e=this.hiddenFileInput)==null||e.addEventListener("change",()=>{var t,r;let n=(r=(t=this.hiddenFileInput)==null?void 0:t.files)==null?void 0:r[0];this.toggleAttribute("file-ready",!!n),n&&this.dispatchEvent(new CustomEvent("file-ready",{composed:!0,bubbles:!0,detail:n}))})}connectedCallback(){this.addEventListener("file-ready",this.handleUpload),this.addEventListener("reset",this.resetState)}disconnectedCallback(){this.removeEventListener("file-ready",this.handleUpload,!1),this.removeEventListener("reset",this.resetState)}attributeChangedCallback(){this.updateLayout()}get hiddenFileInput(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("#hidden-file-input")}get endpoint(){var e;return(e=this.getAttribute("endpoint"))!=null?e:this._endpoint}set endpoint(e){e!==this.endpoint&&(typeof e=="string"?this.setAttribute("endpoint",e):e==null&&this.removeAttribute("endpoint"),this._endpoint=e)}get type(){var e;return(e=this.getAttribute("type"))!=null?e:void 0}set type(e){e!=this.type&&(e?this.setAttribute("type",e):this.removeAttribute("type"))}get noDrop(){return this.hasAttribute("no-drop")}set noDrop(e){this.toggleAttribute("no-drop",!!e)}get noProgress(){return this.hasAttribute("no-progress")}set noProgress(e){this.toggleAttribute("no-progress",!!e)}get noStatus(){return this.hasAttribute("no-status")}set noStatus(e){this.toggleAttribute("no-status",!!e)}get noRetry(){return this.hasAttribute("no-retry")}set noRetry(e){this.toggleAttribute("no-retry",!!e)}get pausable(){return this.hasAttribute("pausable")}set pausable(e){this.toggleAttribute("pausable",!!e)}get dynamicChunkSize(){return this.hasAttribute("dynamic-chunk-size")}set dynamicChunkSize(e){e!==this.hasAttribute("dynamic-chunk-size")&&(e?this.setAttribute("dynamic-chunk-size",""):this.removeAttribute("dynamic-chunk-size"))}get useLargeFileWorkaround(){return this.hasAttribute("use-large-file-workaround")}set useLargeFileWorkaround(e){e!=this.useLargeFileWorkaround&&this.toggleAttribute("use-large-file-workaround",!!e)}get maxFileSize(){let e=this.getAttribute("max-file-size");return e!==null?parseInt(e):void 0}set maxFileSize(e){e?this.setAttribute("max-file-size",e.toString()):this.removeAttribute("max-file-size")}get chunkSize(){let e=this.getAttribute("chunk-size");return e!==null?parseInt(e):void 0}set chunkSize(e){e?this.setAttribute("chunk-size",e.toString()):this.removeAttribute("chunk-size")}get upload(){return this._upload}get paused(){var e,t;return(t=(e=this.upload)==null?void 0:e.paused)!=null?t:!1}set paused(e){if(!this.upload){console.warn("Pausing before an upload has begun is unsupported");return}let t=!!e;t!==this.paused&&(t?this.upload.pause():this.upload.resume(),this.toggleAttribute("paused",t),this.dispatchEvent(new CustomEvent("pausedchange",{detail:t})))}updateLayout(){var e,t;let r=(e=this.shadowRoot)==null?void 0:e.querySelector("mux-uploader-drop, div");r&&r.remove();let n=Ur(this);(t=this.shadowRoot)==null||t.appendChild(n)}setError(e){this.setAttribute("upload-error",""),this.dispatchEvent(new CustomEvent("uploaderror",{detail:{message:e}}))}resetState(){this.removeAttribute("upload-error"),this.removeAttribute("upload-in-progress"),this.removeAttribute("upload-complete"),this.hiddenFileInput.value=""}handleUpload(e){let t=this.endpoint,r=this.dynamicChunkSize;if(t)this.removeAttribute("upload-error");else{this.setError("No url or endpoint specified -- cannot handleUpload");return}try{let n=Le.createUpload({endpoint:t,dynamicChunkSize:r,file:e.detail,maxFileSize:this.maxFileSize,chunkSize:this.chunkSize,useLargeFileWorkaround:this.useLargeFileWorkaround});this._upload=n,this.dispatchEvent(new CustomEvent("uploadstart",{detail:{file:n.file,chunkSize:n.chunkSize}})),this.setAttribute("upload-in-progress",""),n.offline&&this.dispatchEvent(new CustomEvent("offline")),n.on("attempt",s=>{this.dispatchEvent(new CustomEvent("chunkattempt",s))}),n.on("chunkSuccess",s=>{this.dispatchEvent(new CustomEvent("chunksuccess",s))}),n.on("error",s=>{this.setAttribute("upload-error",""),console.error("error handler",s.detail.message),this.dispatchEvent(new CustomEvent("uploaderror",s))}),n.on("progress",s=>{this.dispatchEvent(new CustomEvent("progress",s))}),n.on("success",s=>{this.removeAttribute("upload-in-progress"),this.setAttribute("upload-complete",""),this.dispatchEvent(new CustomEvent("success",s))}),n.on("offline",s=>{this.dispatchEvent(new CustomEvent("offline",s))}),n.on("online",s=>{this.dispatchEvent(new CustomEvent("online",s))})}catch(n){n instanceof Error&&this.setError(n.message)}}};p.customElements.get("mux-uploader")||(p.customElements.define("mux-uploader",ft),p.MuxUploaderElement=ft);var At=P.createElement("template");At.innerHTML=`
<style>

.sr-only {
  position:absolute;
  left:-10000px;
  top:auto;
  width:1px;
  height:1px;
  overflow:hidden;
}
</style>

<div class="sr-only" id="sr-only" aria-live="polite"></div>
`;var B,Lr=class extends p.HTMLElement{constructor(){var e;super(),E(this,B),this.attachShadow({mode:"open"}).appendChild(At.content.cloneNode(!0)),this.srOnlyText=(e=this.shadowRoot)==null?void 0:e.getElementById("sr-only")}connectedCallback(){x(this,B,H(this)),i(this,B)&&i(this,B).addEventListener("success",this.updateText.bind(this))}disconnectedCallback(){i(this,B)&&i(this,B).removeEventListener("success",this.updateText.bind(this))}updateText(){this.srOnlyText&&(this.srOnlyText.textContent="Upload complete!")}};B=new WeakMap;p.customElements.get("mux-uploader-sr-text")||p.customElements.define("mux-uploader-sr-text",Lr);import ce from"react";var Tt={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay"},_r=e=>e==null,zr=(e,t)=>_r(t)?!1:e in t,Or=e=>e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`),Ir=(e,t)=>{if(!(typeof t=="boolean"&&!t)){if(zr(e,Tt))return Tt[e];if(typeof t!=null)return/[A-Z]/.test(e)?Or(e):e}};var Dr=(e,t)=>typeof e=="boolean"?"":e,C=(e={})=>Object.entries(e).reduce((t,[r,n])=>{let s=Ir(r,n);if(!s)return t;let a=Dr(n,r);return t[s]=a,t},{});import{useRef as Hr}from"react";import{useEffect as Fr,useRef as Br}from"react";var S=(...e)=>{let t=Br(null);return Fr(()=>{e.forEach(r=>{r&&(typeof r=="function"?r(t.current):r.current=t.current)})},[e]),t};var Nr=ce.forwardRef(({children:e,...t},r)=>ce.createElement("mux-uploader-drop",C({...t,ref:r}),e)),jr=ce.forwardRef((e,t)=>{let r=Hr(null),n=S(r,t);return ce.createElement(Nr,{ref:n,...e})}),Wr=jr;import he from"react";import{useRef as $r}from"react";var Xr=he.forwardRef(({children:e,...t},r)=>he.createElement("mux-uploader-file-select",C({...t,ref:r}),e)),qr=he.forwardRef((e,t)=>{let r=$r(null),n=S(r,t);return he.createElement(Xr,{ref:n,...e})}),Gr=qr;import fe from"react";import{useRef as Vr}from"react";var Kr=fe.forwardRef(({children:e,...t},r)=>fe.createElement("mux-uploader-progress",C({...t,ref:r}),e)),Yr=fe.forwardRef((e,t)=>{let r=Vr(null),n=S(r,t);return fe.createElement(Kr,{ref:n,...e})}),Zr=Yr;import ge from"react";import{useRef as Jr}from"react";var Qr=ge.forwardRef(({children:e,...t},r)=>ge.createElement("mux-uploader-retry",C({...t,ref:r}),e)),en=ge.forwardRef((e,t)=>{let r=Jr(null),n=S(r,t);return ge.createElement(Qr,{ref:n,...e})}),tn=en;import me from"react";import{useRef as rn}from"react";var nn=me.forwardRef(({children:e,...t},r)=>me.createElement("mux-uploader-pause",C({...t,ref:r}),e)),sn=me.forwardRef((e,t)=>{let r=rn(null),n=S(r,t);return me.createElement(nn,{ref:n,...e})}),an=sn;import be from"react";import{useRef as on}from"react";var ln=be.forwardRef(({children:e,...t},r)=>be.createElement("mux-uploader-status",C({...t,ref:r}),e)),un=be.forwardRef((e,t)=>{let r=on(null),n=S(r,t);return be.createElement(ln,{ref:n,...e})}),dn=un;import{useRef as vn}from"react";import{useEffect as pn}from"react";var cn=Object.prototype.hasOwnProperty,hn=(e,t)=>{if(Object.is(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;if(Array.isArray(e))return!Array.isArray(t)||e.length!==t.length?!1:e.some((s,a)=>t[a]===s);let r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(let s=0;s<r.length;s++)if(!cn.call(t,r[s])||!Object.is(e[r[s]],t[r[s]]))return!1;return!0},fn=(e,t,r)=>!hn(t,e[r]),gn=(e,t,r)=>{e[r]=t},mn=(e,t,r,n=gn,s=fn)=>pn(()=>{let a=r==null?void 0:r.current;a&&s(a,t,e)&&n(a,t,e)},[r==null?void 0:r.current,t]),Pt=mn;var Xs=ze.ProgressTypes,yn=ve.forwardRef(({children:e,...t},r)=>ve.createElement("mux-uploader",C({...t,ref:r}),e)),W=(e,t,r)=>bn(()=>{let n=t==null?void 0:t.current;if(!(!n||!r))return n.addEventListener(e,r),()=>{n.removeEventListener(e,r)}},[t==null?void 0:t.current,r]),En=(e,t)=>{let{onUploadStart:r,onChunkAttempt:n,onChunkSuccess:s,onUploadError:a,onProgress:l,onSuccess:u,endpoint:c,...h}=t;return Pt("endpoint",c,e),W("uploadstart",e,r),W("chunkattempt",e,n),W("chunksuccess",e,s),W("uploaderror",e,a),W("progress",e,l),W("success",e,u),[h]},xn=ve.forwardRef((e,t)=>{let r=vn(null),n=S(r,t),[s]=En(r,e);return ve.createElement(yn,{ref:n,...s})});var qs=xn;export{Wr as MuxUploaderDrop,Gr as MuxUploaderFileSelect,an as MuxUploaderPause,Zr as MuxUploaderProgress,tn as MuxUploaderRetry,dn as MuxUploaderStatus,Xs as ProgressTypes,qs as default};
//# sourceMappingURL=index.mjs.map
