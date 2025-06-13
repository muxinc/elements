"use strict";(()=>{var zt=Object.defineProperty;var Ne=e=>{throw TypeError(e)};var Pt=(e,t)=>{for(var r in t)zt(e,r,{get:t[r],enumerable:!0})};var je=(e,t,r)=>t.has(e)||Ne("Cannot "+r);var i=(e,t,r)=>(je(e,t,"read from private field"),r?r.call(e):t.get(e)),c=(e,t,r)=>t.has(e)?Ne("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,n)=>(je(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r);var we={};Pt(we,{ProgressTypes:()=>F});var F={BAR:"bar",RADIAL:"radial",PERCENTAGE:"percentage"};var H=class{addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment=="undefined"){class e extends H{}globalThis.DocumentFragment=e}var K=class extends H{},xe=class extends H{},Ot={get(e){},define(e,t,r){},getName(e){return null},upgrade(e){},whenDefined(e){return Promise.resolve(K)}},Y,Ae=class{constructor(t,r={}){c(this,Y);f(this,Y,r==null?void 0:r.detail)}get detail(){return i(this,Y)}initCustomEvent(){}};Y=new WeakMap;function Ut(e,t){return new K}var $e={document:{createElement:Ut},DocumentFragment,customElements:Ot,CustomEvent:Ae,EventTarget:H,HTMLElement:K,HTMLVideoElement:xe},We=typeof window=="undefined"||typeof globalThis.customElements=="undefined",d=We?$e:globalThis,v=We?$e.document:globalThis.document;var Bt=Object.create,tt=Object.defineProperty,It=Object.getOwnPropertyDescriptor,rt=Object.getOwnPropertyNames,Dt=Object.getPrototypeOf,Ft=Object.prototype.hasOwnProperty,Q=(e,t)=>function(){return t||(0,e[rt(e)[0]])((t={exports:{}}).exports,t),t.exports},Ht=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of rt(t))!Ft.call(e,s)&&s!==r&&tt(e,s,{get:()=>t[s],enumerable:!(n=It(t,s))||n.enumerable});return e},Nt=(e,t,r)=>(r=e!=null?Bt(Dt(e)):{},Ht(t||!e||!e.__esModule?tt(r,"default",{value:e,enumerable:!0}):r,e)),jt=Q({"node_modules/global/window.js"(e,t){var r;typeof window!="undefined"?r=window:typeof global!="undefined"?r=global:typeof self!="undefined"?r=self:r={},t.exports=r}}),$t=Q({"node_modules/is-function/index.js"(e,t){t.exports=n;var r=Object.prototype.toString;function n(s){if(!s)return!1;var o=r.call(s);return o==="[object Function]"||typeof s=="function"&&o!=="[object RegExp]"||typeof window!="undefined"&&(s===window.setTimeout||s===window.alert||s===window.confirm||s===window.prompt)}}}),Wt=Q({"node_modules/parse-headers/parse-headers.js"(e,t){var r=function(s){return s.replace(/^\s+|\s+$/g,"")},n=function(s){return Object.prototype.toString.call(s)==="[object Array]"};t.exports=function(s){if(!s)return{};for(var o={},l=r(s).split(`
`),u=0;u<l.length;u++){var p=l[u],y=p.indexOf(":"),E=r(p.slice(0,y)).toLowerCase(),S=r(p.slice(y+1));typeof o[E]=="undefined"?o[E]=S:n(o[E])?o[E].push(S):o[E]=[o[E],S]}return o}}}),Xt=Q({"node_modules/xtend/immutable.js"(e,t){t.exports=n;var r=Object.prototype.hasOwnProperty;function n(){for(var s={},o=0;o<arguments.length;o++){var l=arguments[o];for(var u in l)r.call(l,u)&&(s[u]=l[u])}return s}}}),qt=Q({"node_modules/xhr/index.js"(e,t){"use strict";var r=jt(),n=$t(),s=Wt(),o=Xt();t.exports=y,t.exports.default=y,y.XMLHttpRequest=r.XMLHttpRequest||ye,y.XDomainRequest="withCredentials"in new y.XMLHttpRequest?y.XMLHttpRequest:r.XDomainRequest,l(["get","put","post","patch","head","delete"],function(a){y[a==="delete"?"del":a]=function(k,C,U){return C=p(k,C,U),C.method=a.toUpperCase(),E(C)}});function l(a,k){for(var C=0;C<a.length;C++)k(a[C])}function u(a){for(var k in a)if(a.hasOwnProperty(k))return!1;return!0}function p(a,k,C){var U=a;return n(k)?(C=k,typeof a=="string"&&(U={uri:a})):U=o(k,{uri:a}),U.callback=C,U}function y(a,k,C){return k=p(a,k,C),E(k)}function E(a){if(typeof a.callback=="undefined")throw new Error("callback argument missing");var k=!1,C=function(D,ae,Mt){k||(k=!0,a.callback(D,ae,Mt))};function U(){h.readyState===4&&setTimeout(De,0)}function _t(){var g=void 0;if(h.response?g=h.response:g=h.responseText||S(h),Fe)try{g=JSON.parse(g)}catch{}return g}function Ee(g){return clearTimeout(Se),g instanceof Error||(g=new Error(""+(g||"Unknown XMLHttpRequest Error"))),g.statusCode=0,C(g,He)}function De(){if(!oe){var g;clearTimeout(Se),a.useXDR&&h.status===void 0?g=200:g=h.status===1223?204:h.status;var D=He,ae=null;return g!==0?(D={body:_t(),statusCode:g,method:V,headers:{},url:ve,rawRequest:h},h.getAllResponseHeaders&&(D.headers=s(h.getAllResponseHeaders()))):ae=new Error("Internal XMLHttpRequest Error"),C(ae,D,D.body)}}var h=a.xhr||null;h||(a.cors||a.useXDR?h=new y.XDomainRequest:h=new y.XMLHttpRequest);var ie,oe,ve=h.url=a.uri||a.url,V=h.method=a.method||"GET",ke=a.body||a.data,M=h.headers=a.headers||{},Ce=!!a.sync,Fe=!1,Se,He={body:void 0,headers:{},statusCode:0,method:V,url:ve,rawRequest:h};if("json"in a&&a.json!==!1&&(Fe=!0,M.accept||M.Accept||(M.Accept="application/json"),V!=="GET"&&V!=="HEAD"&&(M["content-type"]||M["Content-Type"]||(M["Content-Type"]="application/json"),ke=JSON.stringify(a.json===!0?ke:a.json))),h.onreadystatechange=U,h.onload=De,h.onerror=Ee,h.onprogress=function(){},h.onabort=function(){oe=!0},h.ontimeout=Ee,h.open(V,ve,!Ce,a.username,a.password),Ce||(h.withCredentials=!!a.withCredentials),!Ce&&a.timeout>0&&(Se=setTimeout(function(){if(!oe){oe=!0,h.abort("timeout");var g=new Error("XMLHttpRequest timeout");g.code="ETIMEDOUT",Ee(g)}},a.timeout)),h.setRequestHeader)for(ie in M)M.hasOwnProperty(ie)&&h.setRequestHeader(ie,M[ie]);else if(a.headers&&!u(a.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in a&&(h.responseType=a.responseType),"beforeSend"in a&&typeof a.beforeSend=="function"&&a.beforeSend(h),h.send(ke||null),h}function S(a){try{if(a.responseType==="document")return a.responseXML;var k=a.responseXML&&a.responseXML.documentElement.nodeName==="parsererror";if(a.responseType===""&&!k)return a.responseXML}catch{}return null}function ye(){}}});function ze(e,t,...r){if(!e)throw new TypeError(nt(t,r))}function nt(e,t){let r=0;return e.replace(/%[os]/gu,()=>st(t[r++]))}function st(e){return typeof e!="object"||e===null?String(e):Object.prototype.toString.call(e)}var Xe;function Gt(e){try{let t=e instanceof Error?e:new Error(st(e));if(Xe){Xe(t);return}if(typeof dispatchEvent=="function"&&typeof ErrorEvent=="function")dispatchEvent(new ErrorEvent("error",{error:t,message:t.message}));else if(typeof process!="undefined"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)}catch{}}var L=typeof window!="undefined"?window:typeof self!="undefined"?self:typeof global!="undefined"?global:typeof globalThis!="undefined"?globalThis:void 0,qe,z=class{constructor(e,t){this.code=e,this.message=t}warn(...e){var t;try{if(qe){qe({...this,args:e});return}let r=((t=new Error().stack)!==null&&t!==void 0?t:"").replace(/^(?:.+?\n){2}/gu,`
`);console.warn(this.message,...e,r)}catch{}}},Vt=new z("W01","Unable to initialize event under dispatching."),Kt=new z("W02","Assigning any falsy value to 'cancelBubble' property has no effect."),Yt=new z("W03","Assigning any truthy value to 'returnValue' property has no effect."),Zt=new z("W04","Unable to preventDefault on non-cancelable events."),Jt=new z("W05","Unable to preventDefault inside passive event listener invocation."),Qt=new z("W06","An event listener wasn't added because it has been added already: %o, %o"),Te=new z("W07","The %o option value was abandoned because the event listener wasn't added as duplicated."),Ge=new z("W08","The 'callback' argument must be a function or an object that has 'handleEvent' method: %o"),zr=new z("W09","Event attribute handler must be a function: %o"),P=class{static get NONE(){return Ve}static get CAPTURING_PHASE(){return Ke}static get AT_TARGET(){return Ye}static get BUBBLING_PHASE(){return Ze}constructor(e,t){Object.defineProperty(this,"isTrusted",{value:!1,enumerable:!0});let r=t!=null?t:{};Me.set(this,{type:String(e),bubbles:!!r.bubbles,cancelable:!!r.cancelable,composed:!!r.composed,target:null,currentTarget:null,stopPropagationFlag:!1,stopImmediatePropagationFlag:!1,canceledFlag:!1,inPassiveListenerFlag:!1,dispatchFlag:!1,timeStamp:Date.now()})}get type(){return m(this).type}get target(){return m(this).target}get srcElement(){return m(this).target}get currentTarget(){return m(this).currentTarget}composedPath(){let e=m(this).currentTarget;return e?[e]:[]}get NONE(){return Ve}get CAPTURING_PHASE(){return Ke}get AT_TARGET(){return Ye}get BUBBLING_PHASE(){return Ze}get eventPhase(){return m(this).dispatchFlag?2:0}stopPropagation(){m(this).stopPropagationFlag=!0}get cancelBubble(){return m(this).stopPropagationFlag}set cancelBubble(e){e?m(this).stopPropagationFlag=!0:Kt.warn()}stopImmediatePropagation(){let e=m(this);e.stopPropagationFlag=e.stopImmediatePropagationFlag=!0}get bubbles(){return m(this).bubbles}get cancelable(){return m(this).cancelable}get returnValue(){return!m(this).canceledFlag}set returnValue(e){e?Yt.warn():Je(m(this))}preventDefault(){Je(m(this))}get defaultPrevented(){return m(this).canceledFlag}get composed(){return m(this).composed}get isTrusted(){return!1}get timeStamp(){return m(this).timeStamp}initEvent(e,t=!1,r=!1){let n=m(this);if(n.dispatchFlag){Vt.warn();return}Me.set(this,{...n,type:String(e),bubbles:!!t,cancelable:!!r,target:null,currentTarget:null,stopPropagationFlag:!1,stopImmediatePropagationFlag:!1,canceledFlag:!1})}},Ve=0,Ke=1,Ye=2,Ze=3,Me=new WeakMap;function m(e,t="this"){let r=Me.get(e);return ze(r!=null,"'%s' must be an object that Event constructor created, but got another one: %o",t,e),r}function Je(e){if(e.inPassiveListenerFlag){Jt.warn();return}if(!e.cancelable){Zt.warn();return}e.canceledFlag=!0}Object.defineProperty(P,"NONE",{enumerable:!0});Object.defineProperty(P,"CAPTURING_PHASE",{enumerable:!0});Object.defineProperty(P,"AT_TARGET",{enumerable:!0});Object.defineProperty(P,"BUBBLING_PHASE",{enumerable:!0});var Le=Object.getOwnPropertyNames(P.prototype);for(let e=0;e<Le.length;++e)Le[e]!=="constructor"&&Object.defineProperty(P.prototype,Le[e],{enumerable:!0});typeof L!="undefined"&&typeof L.Event!="undefined"&&Object.setPrototypeOf(P.prototype,L.Event.prototype);function er(e){return L.DOMException?new L.DOMException(e,"InvalidStateError"):(N==null&&(N=class it extends Error{constructor(r){super(r),Error.captureStackTrace&&Error.captureStackTrace(this,it)}get code(){return 11}get name(){return"InvalidStateError"}},Object.defineProperties(N.prototype,{code:{enumerable:!0},name:{enumerable:!0}}),et(N),et(N.prototype)),new N(e))}var N,Qe={INDEX_SIZE_ERR:1,DOMSTRING_SIZE_ERR:2,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,INVALID_CHARACTER_ERR:5,NO_DATA_ALLOWED_ERR:6,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INUSE_ATTRIBUTE_ERR:10,INVALID_STATE_ERR:11,SYNTAX_ERR:12,INVALID_MODIFICATION_ERR:13,NAMESPACE_ERR:14,INVALID_ACCESS_ERR:15,VALIDATION_ERR:16,TYPE_MISMATCH_ERR:17,SECURITY_ERR:18,NETWORK_ERR:19,ABORT_ERR:20,URL_MISMATCH_ERR:21,QUOTA_EXCEEDED_ERR:22,TIMEOUT_ERR:23,INVALID_NODE_TYPE_ERR:24,DATA_CLONE_ERR:25};function et(e){let t=Object.keys(Qe);for(let r=0;r<t.length;++r){let n=t[r],s=Qe[n];Object.defineProperty(e,n,{get(){return s},configurable:!0,enumerable:!0})}}var ue=class extends P{static wrap(e){return new(at(e))(e)}constructor(e){super(e.type,{bubbles:e.bubbles,cancelable:e.cancelable,composed:e.composed}),e.cancelBubble&&super.stopPropagation(),e.defaultPrevented&&super.preventDefault(),ot.set(this,{original:e});let t=Object.keys(e);for(let r=0;r<t.length;++r){let n=t[r];n in this||Object.defineProperty(this,n,lt(e,n))}}stopPropagation(){super.stopPropagation();let{original:e}=B(this);"stopPropagation"in e&&e.stopPropagation()}get cancelBubble(){return super.cancelBubble}set cancelBubble(e){super.cancelBubble=e;let{original:t}=B(this);"cancelBubble"in t&&(t.cancelBubble=e)}stopImmediatePropagation(){super.stopImmediatePropagation();let{original:e}=B(this);"stopImmediatePropagation"in e&&e.stopImmediatePropagation()}get returnValue(){return super.returnValue}set returnValue(e){super.returnValue=e;let{original:t}=B(this);"returnValue"in t&&(t.returnValue=e)}preventDefault(){super.preventDefault();let{original:e}=B(this);"preventDefault"in e&&e.preventDefault()}get timeStamp(){let{original:e}=B(this);return"timeStamp"in e?e.timeStamp:super.timeStamp}},ot=new WeakMap;function B(e){let t=ot.get(e);return ze(t!=null,"'this' is expected an Event object, but got",e),t}var le=new WeakMap;le.set(Object.prototype,ue);typeof L!="undefined"&&typeof L.Event!="undefined"&&le.set(L.Event.prototype,ue);function at(e){let t=Object.getPrototypeOf(e);if(t==null)return ue;let r=le.get(t);return r==null&&(r=tr(at(t),t),le.set(t,r)),r}function tr(e,t){class r extends e{}let n=Object.keys(t);for(let s=0;s<n.length;++s)Object.defineProperty(r.prototype,n[s],lt(t,n[s]));return r}function lt(e,t){let r=Object.getOwnPropertyDescriptor(e,t);return{get(){let n=B(this).original,s=n[t];return typeof s=="function"?s.bind(n):s},set(n){let s=B(this).original;s[t]=n},configurable:r.configurable,enumerable:r.enumerable}}function rr(e,t,r,n,s,o){return{callback:e,flags:(t?1:0)|(r?2:0)|(n?4:0),signal:s,signalListener:o}}function nr(e){e.flags|=8}function ut(e){return(e.flags&1)===1}function dt(e){return(e.flags&2)===2}function ht(e){return(e.flags&4)===4}function sr(e){return(e.flags&8)===8}function ir({callback:e},t,r){try{typeof e=="function"?e.call(t,r):typeof e.handleEvent=="function"&&e.handleEvent(r)}catch(n){Gt(n)}}function pt({listeners:e},t,r){for(let n=0;n<e.length;++n)if(e[n].callback===t&&ut(e[n])===r)return n;return-1}function or(e,t,r,n,s,o){let l;o&&(l=ct.bind(null,e,t,r),o.addEventListener("abort",l));let u=rr(t,r,n,s,o,l);return e.cow?(e.cow=!1,e.listeners=[...e.listeners,u]):e.listeners.push(u),u}function ct(e,t,r){let n=pt(e,t,r);return n!==-1?ft(e,n):!1}function ft(e,t,r=!1){let n=e.listeners[t];return nr(n),n.signal&&n.signal.removeEventListener("abort",n.signalListener),e.cow&&!r?(e.cow=!1,e.listeners=e.listeners.filter((s,o)=>o!==t),!1):(e.listeners.splice(t,1),!0)}function ar(){return Object.create(null)}function lr(e,t){var r;return(r=e[t])!==null&&r!==void 0?r:e[t]={attrCallback:void 0,attrListener:void 0,cow:!1,listeners:[]}}var de=class{constructor(){gt.set(this,ar())}addEventListener(e,t,r){let n=Re(this),{callback:s,capture:o,once:l,passive:u,signal:p,type:y}=ur(e,t,r);if(s==null||p!=null&&p.aborted)return;let E=lr(n,y),S=pt(E,s,o);if(S!==-1){hr(E.listeners[S],u,l,p);return}or(E,s,o,u,l,p)}removeEventListener(e,t,r){let n=Re(this),{callback:s,capture:o,type:l}=dr(e,t,r),u=n[l];s!=null&&u&&ct(u,s,o)}dispatchEvent(e){let t=Re(this)[String(e.type)];if(t==null)return!0;let r=e instanceof P?e:ue.wrap(e),n=m(r,"event");if(n.dispatchFlag)throw er("This event has been in dispatching.");if(n.dispatchFlag=!0,n.target=n.currentTarget=this,!n.stopPropagationFlag){let{cow:s,listeners:o}=t;t.cow=!0;for(let l=0;l<o.length;++l){let u=o[l];if(!sr(u)&&(ht(u)&&ft(t,l,!s)&&(l-=1),n.inPassiveListenerFlag=dt(u),ir(u,this,r),n.inPassiveListenerFlag=!1,n.stopImmediatePropagationFlag))break}s||(t.cow=!1)}return n.target=null,n.currentTarget=null,n.stopImmediatePropagationFlag=!1,n.stopPropagationFlag=!1,n.dispatchFlag=!1,!n.canceledFlag}},gt=new WeakMap;function Re(e,t="this"){let r=gt.get(e);return ze(r!=null,"'%s' must be an object that EventTarget constructor created, but got another one: %o",t,e),r}function ur(e,t,r){var n;return mt(t),typeof r=="object"&&r!==null?{type:String(e),callback:t!=null?t:void 0,capture:!!r.capture,passive:!!r.passive,once:!!r.once,signal:(n=r.signal)!==null&&n!==void 0?n:void 0}:{type:String(e),callback:t!=null?t:void 0,capture:!!r,passive:!1,once:!1,signal:void 0}}function dr(e,t,r){return mt(t),typeof r=="object"&&r!==null?{type:String(e),callback:t!=null?t:void 0,capture:!!r.capture}:{type:String(e),callback:t!=null?t:void 0,capture:!!r}}function mt(e){if(!(typeof e=="function"||typeof e=="object"&&e!==null&&typeof e.handleEvent=="function")){if(e==null||typeof e=="object"){Ge.warn(e);return}throw new TypeError(nt(Ge.message,[e]))}}function hr(e,t,r,n){Qt.warn(ut(e)?"capture":"bubble",e.callback),dt(e)!==t&&Te.warn("passive"),ht(e)!==r&&Te.warn("once"),e.signal!==n&&Te.warn("signal")}var _e=Object.getOwnPropertyNames(de.prototype);for(let e=0;e<_e.length;++e)_e[e]!=="constructor"&&Object.defineProperty(de.prototype,_e[e],{enumerable:!0});typeof L!="undefined"&&typeof L.EventTarget!="undefined"&&Object.setPrototypeOf(de.prototype,L.EventTarget.prototype);var pr=Nt(qt()),Pe=30720,ee=512e3,te=256,Z=(e,{minChunkSize:t=te,maxChunkSize:r=ee}={})=>e==null||typeof e=="number"&&e>=256&&e%256===0&&e>=t&&e<=r,J=(e,{minChunkSize:t=te,maxChunkSize:r=ee}={})=>new TypeError(`chunkSize ${e} must be a positive number in multiples of 256, between ${t} and ${r}`),cr=class{constructor(e,t={}){this.readableStream=e;var r,n,s;if(!Z(t.defaultChunkSize,t))throw J(t.defaultChunkSize,t);this.defaultChunkSize=(r=t.defaultChunkSize)!=null?r:Pe,this.minChunkSize=(n=t.minChunkSize)!=null?n:te,this.maxChunkSize=(s=t.maxChunkSize)!=null?s:ee}get chunkSize(){var e;return(e=this._chunkSize)!=null?e:this.defaultChunkSize}set chunkSize(e){if(!Z(e,this))throw J(e,this);this._chunkSize=e}get chunkByteSize(){return this.chunkSize*1024}get error(){return this._error}async*[Symbol.asyncIterator](){let e,t=this.readableStream.getReader();try{for(;;){let{done:r,value:n}=await t.read();if(r){if(e){let o=e;e=void 0,yield o}break}let s=n instanceof Uint8Array?new Blob([n],{type:"application/octet-stream"}):n;for(e=e?new Blob([e,s]):s;e;)if(e.size===this.chunkByteSize){let o=e;e=void 0,yield o;break}else{if(e.size<this.chunkByteSize)break;{let o=e.slice(0,this.chunkByteSize);e=e.slice(this.chunkByteSize),yield o}}}}catch(r){this._error=r}finally{if(e){let r=e;e=void 0,yield r}t.releaseLock();return}}},fr=class{constructor(e,t={}){this.file=e;var r,n,s;if(!Z(t.defaultChunkSize,t))throw J(t.defaultChunkSize,t);this.defaultChunkSize=(r=t.defaultChunkSize)!=null?r:Pe,this.minChunkSize=(n=t.minChunkSize)!=null?n:te,this.maxChunkSize=(s=t.maxChunkSize)!=null?s:ee}get chunkSize(){var e;return(e=this._chunkSize)!=null?e:this.defaultChunkSize}set chunkSize(e){if(!Z(e,this))throw J(e,this);this._chunkSize=e}get chunkByteSize(){return this.chunkSize*1024}get error(){return this._error}async*[Symbol.asyncIterator](){let e=new FileReader,t=0,r=()=>new Promise(n=>{if(t>=this.file.size){n(void 0);return}let s=Math.min(this.chunkByteSize,this.file.size-t);e.onload=()=>{e.result!==null?n(new Blob([e.result],{type:"application/octet-stream"})):n(void 0)},e.readAsArrayBuffer(this.file.slice(t,t+s))});try{for(;;){let n=await r();if(n)t+=n.size,yield n;else break}}catch(n){this._error=n}}},gr=[200,201,202,204,308],bt=[408,502,503,504],mr=[308],yt=(e,t)=>!!e&&gr.includes(e.statusCode),br=(e,{retryCodes:t=bt})=>!e||t.includes(e.statusCode),yr=(e,t)=>t.attemptCount>=t.attempts||!(yt(e)||br(e,t)),Er=(e,t)=>{var r;if(!e||!mr.includes(e.statusCode)||!((r=e.headers)!=null&&r.range))return!1;let n=e.headers.range.match(/bytes=(\d+)-(\d+)/);return n?parseInt(n[2],10)<t.currentChunkEndByte:!1},Oe=class{static createUpload(e){return new Oe(e)}constructor(e){if(this.eventTarget=new de,this.endpoint=e.endpoint,this.file=e.file,this.headers=e.headers||{},this.method=e.method||"PUT",this.attempts=e.attempts||5,this.delayBeforeAttempt=e.delayBeforeAttempt||1,this.retryCodes=e.retryCodes||bt,this.dynamicChunkSize=e.dynamicChunkSize||!1,this.maxFileBytes=(e.maxFileSize||0)*1024,this.chunkCount=0,this.attemptCount=0,this._offline=typeof window!="undefined"&&!window.navigator.onLine,this._paused=!1,this.success=!1,this.nextChunkRangeStart=0,e.useLargeFileWorkaround){let t=r=>{this.chunkedIterable.error&&(console.warn(`Unable to read file of size ${this.file.size} bytes via a ReadableStream. Falling back to in-memory FileReader!`),r.stopImmediatePropagation(),this.chunkedIterable=new fr(this.file,{...e,defaultChunkSize:e.chunkSize}),this.chunkedIterator=this.chunkedIterable[Symbol.asyncIterator](),this.getEndpoint().then(()=>{this.sendChunks()}).catch(n=>{let s=n!=null&&n.message?`: ${n.message}`:"";this.dispatch("error",{message:`Failed to get endpoint${s}`})}),this.off("error",t))};this.on("error",t)}this.chunkedIterable=new cr(this.file.stream(),{...e,defaultChunkSize:e.chunkSize}),this.chunkedIterator=this.chunkedIterable[Symbol.asyncIterator](),this.totalChunks=Math.ceil(this.file.size/this.chunkByteSize),this.validateOptions(),this.getEndpoint().then(()=>this.sendChunks()).catch(t=>{let r=t!=null&&t.message?`: ${t.message}`:"";this.dispatch("error",{message:`Failed to get endpoint${r}`})}),typeof window!="undefined"&&(window.addEventListener("online",()=>{this.offline&&(this._offline=!1,this.dispatch("online"),this.sendChunks())}),window.addEventListener("offline",()=>{this.offline||(this._offline=!0,this.dispatch("offline"))}))}get maxChunkSize(){var e,t;return(t=(e=this.chunkedIterable)==null?void 0:e.maxChunkSize)!=null?t:ee}get minChunkSize(){var e,t;return(t=(e=this.chunkedIterable)==null?void 0:e.minChunkSize)!=null?t:te}get chunkSize(){var e,t;return(t=(e=this.chunkedIterable)==null?void 0:e.chunkSize)!=null?t:Pe}set chunkSize(e){this.chunkedIterable.chunkSize=e}get chunkByteSize(){return this.chunkedIterable.chunkByteSize}get totalChunkSize(){return Math.ceil(this.file.size/this.chunkByteSize)}on(e,t){this.eventTarget.addEventListener(e,t)}once(e,t){this.eventTarget.addEventListener(e,t,{once:!0})}off(e,t){this.eventTarget.removeEventListener(e,t)}get offline(){return this._offline}get paused(){return this._paused}abort(){var e;this.pause(),(e=this.currentXhr)==null||e.abort()}pause(){this._paused=!0}resume(){this._paused&&(this._paused=!1,this.sendChunks())}get successfulPercentage(){return this.nextChunkRangeStart/this.file.size}dispatch(e,t){let r=new CustomEvent(e,{detail:t});this.eventTarget.dispatchEvent(r)}validateOptions(){if(!this.endpoint||typeof this.endpoint!="function"&&typeof this.endpoint!="string")throw new TypeError("endpoint must be defined as a string or a function that returns a promise");if(!(this.file instanceof File))throw new TypeError("file must be a File object");if(this.headers&&typeof this.headers!="function"&&typeof this.headers!="object")throw new TypeError("headers must be null, an object, or a function that returns an object or a promise");if(!Z(this.chunkSize,{maxChunkSize:this.maxChunkSize,minChunkSize:this.minChunkSize}))throw J(this.chunkSize,{maxChunkSize:this.maxChunkSize,minChunkSize:this.minChunkSize});if(this.maxChunkSize&&(typeof this.maxChunkSize!="number"||this.maxChunkSize<256||this.maxChunkSize%256!==0||this.maxChunkSize<this.chunkSize||this.maxChunkSize<this.minChunkSize))throw new TypeError(`maxChunkSize must be a positive number in multiples of 256, and larger than or equal to both ${this.minChunkSize} and ${this.chunkSize}`);if(this.minChunkSize&&(typeof this.minChunkSize!="number"||this.minChunkSize<256||this.minChunkSize%256!==0||this.minChunkSize>this.chunkSize||this.minChunkSize>this.maxChunkSize))throw new TypeError(`minChunkSize must be a positive number in multiples of 256, and smaller than ${this.chunkSize} and ${this.maxChunkSize}`);if(this.maxFileBytes>0&&this.maxFileBytes<this.file.size)throw new Error(`file size exceeds maximum (${this.file.size} > ${this.maxFileBytes})`);if(this.attempts&&(typeof this.attempts!="number"||this.attempts<=0))throw new TypeError("retries must be a positive number");if(this.delayBeforeAttempt&&(typeof this.delayBeforeAttempt!="number"||this.delayBeforeAttempt<0))throw new TypeError("delayBeforeAttempt must be a positive number")}getEndpoint(){return typeof this.endpoint=="string"?(this.endpointValue=this.endpoint,Promise.resolve(this.endpoint)):this.endpoint(this.file).then(e=>{if(this.endpointValue=e,typeof e!="string")throw new TypeError("endpoint must return a string");return this.endpointValue})}xhrPromise(e){let t=r=>{r.upload.onprogress=n=>{var s;let o=this.totalChunks-this.chunkCount,l=(this.file.size-this.nextChunkRangeStart)/this.file.size/o,p=n.loaded/((s=n.total)!=null?s:this.chunkByteSize)*l;this.dispatch("progress",Math.min((this.successfulPercentage+p)*100,100))}};return new Promise((r,n)=>{this.currentXhr=(0,pr.default)({...e,beforeSend:t},(s,o)=>(this.currentXhr=void 0,s?n(s):r(o)))})}async sendChunk(e){let t=this.nextChunkRangeStart,r=t+e.size-1,s={...await(typeof this.headers=="function"?this.headers():this.headers),"Content-Type":this.file.type,"Content-Range":`bytes ${t}-${r}/${this.file.size}`};return this.dispatch("attempt",{chunkNumber:this.chunkCount,totalChunks:this.totalChunks,chunkSize:this.chunkSize}),this.xhrPromise({headers:s,url:this.endpointValue,method:this.method,body:e})}async sendChunkWithRetries(e){let t=async(l,u)=>{var p;let E=(new Date().getTime()-this.lastChunkStart.getTime())/1e3;if(this.dispatch("chunkSuccess",{chunk:this.chunkCount,chunkSize:this.chunkSize,attempts:this.attemptCount,timeInterval:E,response:l}),this.attemptCount=0,this.chunkCount=((p=this.chunkCount)!=null?p:0)+1,this.nextChunkRangeStart=this.nextChunkRangeStart+this.chunkByteSize,this.dynamicChunkSize){let S=this.chunkSize;E<10?S=Math.min(this.chunkSize*2,this.maxChunkSize):E>30&&(S=Math.max(this.chunkSize/2,this.minChunkSize)),this.chunkSize=Math.ceil(S/256)*256;let ye=(this.file.size-this.nextChunkRangeStart)/this.chunkByteSize;this.totalChunks=Math.ceil(this.chunkCount+ye)}return!0},r=async(l,u)=>(this.dispatch("progress",Math.min(this.successfulPercentage*100,100)),this.dispatch("error",{message:`Server responded with ${l.statusCode}. Stopping upload.`,chunk:this.chunkCount,attempts:this.attemptCount,response:l}),!1),n=async(l,u)=>(this.dispatch("attemptFailure",{message:`An error occured uploading chunk ${this.chunkCount}. ${this.attempts-this.attemptCount} retries left.`,chunkNumber:this.chunkCount,attemptsLeft:this.attempts-this.attemptCount,response:l}),new Promise(p=>{setTimeout(async()=>{if(this._paused||this.offline){this.pendingChunk=e,p(!1);return}let y=await this.sendChunkWithRetries(e);p(y)},this.delayBeforeAttempt*1e3)})),s;try{this.attemptCount=this.attemptCount+1,this.lastChunkStart=new Date,s=await this.sendChunk(e)}catch(l){typeof(l==null?void 0:l.statusCode)=="number"&&(s=l)}let o={retryCodes:this.retryCodes,attemptCount:this.attemptCount,attempts:this.attempts,currentChunkEndByte:this.nextChunkRangeStart+e.size-1};return Er(s,o)?n(s,e):yt(s,o)?t(s,e):yr(s,o)?r(s,e):n(s,e)}async sendChunks(){if(this.pendingChunk&&!(this._paused||this.offline)){let e=this.pendingChunk;this.pendingChunk=void 0;let t=await this.sendChunkWithRetries(e);this.success&&t&&this.dispatch("success")}for(;!(this.success||this._paused||this.offline);){let{value:e,done:t}=await this.chunkedIterator.next(),r=!e&&t;if(e&&(r=await this.sendChunkWithRetries(e)),this.chunkedIterable.error){r=!1,this.dispatch("error",{message:`Unable to read file of size ${this.file.size} bytes. Try loading from another browser.`});return}if(this.success=!!t,this.success&&r&&this.dispatch("success"),!r)return}}};var Et=(e,t)=>{if(!e)return null;let r=e.closest(t);return r||Et(e.getRootNode().host,t)},w=e=>{let t=e.getAttribute("mux-uploader");return t?document.getElementById(t):Et(e,"mux-uploader")};var vt=v.createElement("template");vt.innerHTML=`
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
`;var Ue={MUX_UPLOADER:"mux-uploader",OVERLAY_TEXT:"overlay-text"},ne,A,j,re=class extends d.HTMLElement{constructor(){super();c(this,ne);c(this,A);c(this,j);let r=this.attachShadow({mode:"open"});r.appendChild(vt.content.cloneNode(!0)),f(this,ne,r.getElementById("overlay-label"))}connectedCallback(){if(f(this,A,w(this)),f(this,j,new AbortController),i(this,A)){let r={signal:i(this,j).signal};i(this,A).addEventListener("file-ready",()=>this.toggleAttribute("file-ready",!0),r),i(this,A).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),r),i(this,A).addEventListener("success",()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)},r),i(this,A).addEventListener("reset",()=>{this.toggleAttribute("file-ready",!1),this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!1)},r),this.setupDragEvents(r),this.toggleAttribute("upload-in-progress",i(this,A).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,A).hasAttribute("upload-complete")),this.toggleAttribute("file-ready",i(this,A).hasAttribute("file-ready"))}}disconnectedCallback(){var r;(r=i(this,j))==null||r.abort()}attributeChangedCallback(r,n,s){r===Ue.OVERLAY_TEXT&&n!==s?i(this,ne).innerHTML=s!=null?s:"":r==="active"&&this.hasAttribute("overlay")&&s!=null&&(this._currentDragTarget=this)}static get observedAttributes(){return[Ue.OVERLAY_TEXT,Ue.MUX_UPLOADER,"active"]}setupDragEvents(r){this.addEventListener("dragenter",n=>{this._currentDragTarget=n.target,n.preventDefault(),n.stopPropagation(),this.toggleAttribute("active",!0)},r),this.addEventListener("dragleave",n=>{this._currentDragTarget===n.target&&(this._currentDragTarget=void 0,this.toggleAttribute("active",!1))},r),this.addEventListener("dragover",n=>{n.preventDefault(),n.stopPropagation()},r),this.addEventListener("drop",n=>{var p;n.preventDefault(),n.stopPropagation();let{dataTransfer:s}=n,{files:o}=s,l=o[0];((p=i(this,A))!=null?p:this).dispatchEvent(new CustomEvent("file-ready",{composed:!0,bubbles:!0,detail:l})),this.removeAttribute("active")},r)}};ne=new WeakMap,A=new WeakMap,j=new WeakMap;d.customElements.get("mux-uploader-drop")||(d.customElements.define("mux-uploader-drop",re),d.MuxUploaderDropElement=re);var vr=re;function kt(e){return`${Math.floor(e)}%`}var Ct=v.createElement("template"),kr="Media upload progress bar";Ct.innerHTML=`
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
`;var R,$,he=class extends d.HTMLElement{constructor(){var n,s,o,l;super();c(this,R);c(this,$);this.onUploadStart=()=>{var r;(r=this.progressBar)==null||r.focus(),this.toggleAttribute("upload-in-progress",!0)};this.onProgress=r=>{var s;let n=r.detail;switch((s=this.progressBar)==null||s.setAttribute("aria-valuenow",`${Math.floor(n)}`),this.getAttribute("type")){case F.BAR:{this.progressBar&&(this.progressBar.style.width=`${n}%`);break}case F.RADIAL:{if(this.svgCircle){let o=this.getCircumference()-n/100*this.getCircumference();this.svgCircle.style.strokeDashoffset=o.toString()}break}case F.PERCENTAGE:{this.uploadPercentage&&(this.uploadPercentage.innerHTML=kt(n));break}}};this.onSuccess=()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)};this.onReset=()=>{this.toggleAttribute("upload-in-progress",!1),this.uploadPercentage&&(this.uploadPercentage.innerHTML=""),this.svgCircle&&(this.svgCircle.style.strokeDashoffset=`${this.getCircumference()}`)};this.attachShadow({mode:"open"}).appendChild(Ct.content.cloneNode(!0)),this.svgCircle=(n=this.shadowRoot)==null?void 0:n.querySelector("circle"),this.progressBar=(s=this.shadowRoot)==null?void 0:s.getElementById("progress-bar"),this.uploadPercentage=(o=this.shadowRoot)==null?void 0:o.getElementById("percentage-type"),(l=this.progressBar)==null||l.setAttribute("aria-description",kr)}connectedCallback(){if(this.setDefaultType(),f(this,R,w(this)),f(this,$,new AbortController),i(this,R)){let r={signal:i(this,$).signal};i(this,R).addEventListener("uploadstart",this.onUploadStart,r),i(this,R).addEventListener("reset",this.onReset),i(this,R).addEventListener("progress",this.onProgress),i(this,R).addEventListener("success",this.onSuccess),this.toggleAttribute("upload-in-progress",i(this,R).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,R).hasAttribute("upload-complete"))}}disconnectedCallback(){var r;(r=i(this,$))==null||r.abort()}getRadius(){var r;return Number((r=this.svgCircle)==null?void 0:r.getAttribute("r"))}getCircumference(){return this.getRadius()*2*Math.PI}setDefaultType(){let r=this.getAttribute("type");r||this.setAttribute("type",F.BAR),r===F.RADIAL&&this.svgCircle&&(this.svgCircle.style.strokeDasharray=`${this.getCircumference()} ${this.getCircumference()}`,this.svgCircle.style.strokeDashoffset=`${this.getCircumference()}`)}};R=new WeakMap,$=new WeakMap;d.customElements.get("mux-uploader-progress")||d.customElements.define("mux-uploader-progress",he);var Cr=he;var St=v.createElement("template");St.innerHTML=`
<style>

:host([upload-error]) {
  color: #e22c3e;
}
</style>

<span id="status-message" role="status" aria-live="polite"></span>
`;var x,W,pe=class extends d.HTMLElement{constructor(){var n;super();c(this,x);c(this,W);this.clearStatusMessage=()=>{this.toggleAttribute("upload-error",!1),this.statusMessage&&(this.statusMessage.innerHTML="")};this.onUploadError=r=>{this.toggleAttribute("upload-error",!0),this.statusMessage&&(this.statusMessage.innerHTML=r.detail.message)};this.onSuccess=()=>{this.toggleAttribute("upload-error",!1);let r="Upload complete!";this.statusMessage&&(this.statusMessage.innerHTML=r),console.info(r)};this.onOffline=()=>{this.toggleAttribute("upload-error",!1);let r="Currently offline. Upload will resume automatically when online.";this.statusMessage&&(this.statusMessage.innerHTML=r)};this.attachShadow({mode:"open"}).appendChild(St.content.cloneNode(!0)),this.statusMessage=(n=this.shadowRoot)==null?void 0:n.getElementById("status-message")}connectedCallback(){if(f(this,x,w(this)),f(this,W,new AbortController),i(this,x)){let r={signal:i(this,W).signal};i(this,x).addEventListener("reset",this.clearStatusMessage,r),i(this,x).addEventListener("uploaderror",this.onUploadError,r),i(this,x).addEventListener("success",this.onSuccess,r),i(this,x).addEventListener("uploadstart",this.clearStatusMessage,r),i(this,x).addEventListener("offline",this.onOffline,r),i(this,x).addEventListener("online",this.clearStatusMessage,r),this.toggleAttribute("upload-in-progress",i(this,x).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,x).hasAttribute("upload-complete")),this.toggleAttribute("upload-error",i(this,x).hasAttribute("upload-error"))}}disconnectedCallback(){var r;(r=i(this,W))==null||r.abort()}};x=new WeakMap,W=new WeakMap;d.customElements.get("mux-uploader-status")||d.customElements.define("mux-uploader-status",pe);var Sr=pe;var wt=v.createElement("template");wt.innerHTML=`
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
`;var O,X,ce=class extends d.HTMLElement{constructor(){var n;super();c(this,O);c(this,X);this.handleKeyup=r=>{let n=["Enter"," "],{key:s}=r;n.includes(s)&&this.triggerReset()};this.triggerReset=()=>{var r;(r=i(this,O))==null||r.dispatchEvent(new CustomEvent("reset"))};this.attachShadow({mode:"open"}).appendChild(wt.content.cloneNode(!0)),this.retryButton=(n=this.shadowRoot)==null?void 0:n.getElementById("retry-button")}connectedCallback(){var r,n;if(f(this,O,w(this)),f(this,X,new AbortController),i(this,O)){let s={signal:i(this,X).signal};i(this,O).addEventListener("uploaderror",()=>this.toggleAttribute("upload-error",!0)),i(this,O).addEventListener("reset",()=>this.toggleAttribute("upload-error",!1)),(r=this.retryButton)==null||r.addEventListener("click",this.triggerReset,s),(n=this.retryButton)==null||n.addEventListener("keyup",this.handleKeyup,s),this.toggleAttribute("upload-error",i(this,O).hasAttribute("upload-error"))}}disconnectedCallback(){var r;(r=i(this,X))==null||r.abort()}};O=new WeakMap,X=new WeakMap;d.customElements.get("mux-uploader-retry")||d.customElements.define("mux-uploader-retry",ce);var wr=ce;var xt=v.createElement("template");xt.innerHTML=`
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
`;var b,q,fe=class extends d.HTMLElement{constructor(){super();c(this,b);c(this,q);this.triggerPause=()=>{if(!i(this,b)){console.warn("pausing before a mux-uploader element is associated is unsupported!");return}this.pauseButton.disabled||(i(this,b).paused=!i(this,b).paused)};this.attachShadow({mode:"open"}).appendChild(xt.content.cloneNode(!0))}connectedCallback(){if(f(this,b,w(this)),f(this,q,new AbortController),i(this,b)){let r={signal:i(this,q).signal};i(this,b).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),r),i(this,b).addEventListener("uploaderror",()=>{this.toggleAttribute("upload-error",!0),this.toggleAttribute("upload-complete",!1),this.toggleAttribute("upload-in-progress",!1)}),i(this,b).addEventListener("success",()=>{this.toggleAttribute("upload-complete",!0),this.toggleAttribute("upload-error",!1),this.toggleAttribute("upload-in-progress",!1)}),i(this,b).addEventListener("reset",()=>{this.toggleAttribute("upload-error",!1),this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!1)}),i(this,b).addEventListener("pausedchange",()=>{var s;if(this.pauseButton.disabled=!1,!i(this,b))return;let n=(s=i(this,b).paused)!=null?s:!1;this.pauseButton.innerHTML=n?"Pausing...":"Pause",n&&(this.pauseButton.disabled=!0,i(this,b).addEventListener("chunksuccess",()=>{var o;this.pauseButton.innerHTML=(o=i(this,b))!=null&&o.paused?"Resume":"Pause",this.pauseButton.disabled=!1},{once:!0}))}),this.pauseButton.addEventListener("click",this.triggerPause,r),this.toggleAttribute("upload-in-progress",i(this,b).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,b).hasAttribute("upload-complete")),this.toggleAttribute("upload-error",i(this,b).hasAttribute("upload-error"))}}disconnectedCallback(){var r;(r=i(this,q))==null||r.abort()}get pauseButton(){var r;return(r=this.shadowRoot)==null?void 0:r.getElementById("pause-button")}};b=new WeakMap,q=new WeakMap;d.customElements.get("mux-uploader-pause")||d.customElements.define("mux-uploader-pause",fe);var xr=fe;var Be=`
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
`,At=v.createElement("template");At.innerHTML=`
  <style>
    :host { display: inline-block; }

    :host([file-ready]) > slot  {
      display: none;
    }
  </style>

  <slot>
    ${Be}
  </slot>
`;var _,T,G,ge=class extends d.HTMLElement{constructor(){var n,s,o;super();c(this,_);c(this,T);c(this,G);this.attachShadow({mode:"open"}).appendChild(At.content.cloneNode(!0)),this.handleFilePickerElClick=this.handleFilePickerElClick.bind(this),this.filePickerEl=(n=this.shadowRoot)==null?void 0:n.querySelector("button"),(o=(s=this.shadowRoot)==null?void 0:s.querySelector("slot"))==null||o.addEventListener("slotchange",l=>{let u=l.currentTarget;this.filePickerEl=u.assignedElements({flatten:!0}).filter(p=>!["STYLE"].includes(p.nodeName))[0]})}connectedCallback(){if(f(this,T,w(this)),f(this,G,new AbortController),i(this,T)){let r={signal:i(this,G).signal};i(this,T).addEventListener("file-ready",()=>{this.toggleAttribute("file-ready",!0)},r),i(this,T).addEventListener("uploadstart",()=>this.toggleAttribute("upload-in-progress",!0),r),i(this,T).addEventListener("success",()=>{this.toggleAttribute("upload-in-progress",!1),this.toggleAttribute("upload-complete",!0)},r),i(this,T).addEventListener("reset",()=>{this.toggleAttribute("file-ready",!1)},r),this.toggleAttribute("upload-in-progress",i(this,T).hasAttribute("upload-in-progress")),this.toggleAttribute("upload-complete",i(this,T).hasAttribute("upload-complete")),this.toggleAttribute("file-ready",i(this,T).hasAttribute("file-ready"))}}disconnectedCallback(){var r;(r=i(this,G))==null||r.abort()}get filePickerEl(){return i(this,_)}set filePickerEl(r){r!==i(this,_)&&(i(this,_)&&i(this,_).removeEventListener("click",this.handleFilePickerElClick),f(this,_,r),i(this,_)&&i(this,_).addEventListener("click",this.handleFilePickerElClick))}handleFilePickerElClick(){var s,o;let r=this.getAttribute("mux-uploader"),n=r?v.getElementById(r):this.getRootNode().host;(o=(s=n==null?void 0:n.shadowRoot)==null?void 0:s.querySelector("#hidden-file-input"))==null||o.click()}};_=new WeakMap,T=new WeakMap,G=new WeakMap;d.customElements.get("mux-uploader-file-select")||d.customElements.define("mux-uploader-file-select",ge);var Ar=ge;function me(e,t){return e?"":t}var Tr=(e,t)=>{if(t==null||t===!1)return"";let r=t===!0?"":`${t}`;return`${e}="${r}"`};function Ie(e){let{noDrop:t,noProgress:r,noStatus:n,noRetry:s,pausable:o,type:l}=e,u=t?"div":'mux-uploader-drop overlay part="drop"',p=me(r,`
      <mux-uploader-progress part="progress progress-percentage" type="percentage"></mux-uploader-progress>
      <mux-uploader-progress part="progress progress-bar" ${Tr("type",l)}></mux-uploader-progress>
    `),y=me(n,'<mux-uploader-status part="status"></mux-uploader-status>'),E=me(s,'<mux-uploader-retry part="retry"></mux-uploader-retry>'),S=me(!o,'<mux-uploader-pause part="pause"></mux-uploader-pause>');return v.createRange().createContextualFragment(`
    <${u}>
      ${y}
      ${E}
      ${S}

      <mux-uploader-file-select part="file-select">
        <slot name="file-select">
          ${Be}
        </slot>
      </mux-uploader-file-select>

      ${p}
    </${u}>
  `)}var Tt=v.createElement("template");Tt.innerHTML=`
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
`;var se=class extends d.HTMLElement{static get observedAttributes(){return["pausable","type","no-drop","no-progress","no-status","no-retry","max-file-size","use-large-file-workaround"]}constructor(){var r;super(),this.attachShadow({mode:"open"}).appendChild(Tt.content.cloneNode(!0)),this.updateLayout(),(r=this.hiddenFileInput)==null||r.addEventListener("change",()=>{var s,o;let n=(o=(s=this.hiddenFileInput)==null?void 0:s.files)==null?void 0:o[0];this.toggleAttribute("file-ready",!!n),n&&this.dispatchEvent(new CustomEvent("file-ready",{composed:!0,bubbles:!0,detail:n}))})}connectedCallback(){this.addEventListener("file-ready",this.handleUpload),this.addEventListener("reset",this.resetState)}disconnectedCallback(){this.removeEventListener("file-ready",this.handleUpload,!1),this.removeEventListener("reset",this.resetState)}attributeChangedCallback(){this.updateLayout()}get hiddenFileInput(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("#hidden-file-input")}get endpoint(){var t;return(t=this.getAttribute("endpoint"))!=null?t:this._endpoint}set endpoint(t){t!==this.endpoint&&(typeof t=="string"?this.setAttribute("endpoint",t):t==null&&this.removeAttribute("endpoint"),this._endpoint=t)}get type(){var t;return(t=this.getAttribute("type"))!=null?t:void 0}set type(t){t!=this.type&&(t?this.setAttribute("type",t):this.removeAttribute("type"))}get noDrop(){return this.hasAttribute("no-drop")}set noDrop(t){this.toggleAttribute("no-drop",!!t)}get noProgress(){return this.hasAttribute("no-progress")}set noProgress(t){this.toggleAttribute("no-progress",!!t)}get noStatus(){return this.hasAttribute("no-status")}set noStatus(t){this.toggleAttribute("no-status",!!t)}get noRetry(){return this.hasAttribute("no-retry")}set noRetry(t){this.toggleAttribute("no-retry",!!t)}get pausable(){return this.hasAttribute("pausable")}set pausable(t){this.toggleAttribute("pausable",!!t)}get dynamicChunkSize(){return this.hasAttribute("dynamic-chunk-size")}set dynamicChunkSize(t){t!==this.hasAttribute("dynamic-chunk-size")&&(t?this.setAttribute("dynamic-chunk-size",""):this.removeAttribute("dynamic-chunk-size"))}get useLargeFileWorkaround(){return this.hasAttribute("use-large-file-workaround")}set useLargeFileWorkaround(t){t!=this.useLargeFileWorkaround&&this.toggleAttribute("use-large-file-workaround",!!t)}get maxFileSize(){let t=this.getAttribute("max-file-size");return t!==null?parseInt(t):void 0}set maxFileSize(t){t?this.setAttribute("max-file-size",t.toString()):this.removeAttribute("max-file-size")}get chunkSize(){let t=this.getAttribute("chunk-size");return t!==null?parseInt(t):void 0}set chunkSize(t){t?this.setAttribute("chunk-size",t.toString()):this.removeAttribute("chunk-size")}get upload(){return this._upload}get paused(){var t,r;return(r=(t=this.upload)==null?void 0:t.paused)!=null?r:!1}set paused(t){if(!this.upload){console.warn("Pausing before an upload has begun is unsupported");return}let r=!!t;r!==this.paused&&(r?this.upload.pause():this.upload.resume(),this.toggleAttribute("paused",r),this.dispatchEvent(new CustomEvent("pausedchange",{detail:r})))}updateLayout(){var n,s;let t=(n=this.shadowRoot)==null?void 0:n.querySelector("mux-uploader-drop, div");t&&t.remove();let r=Ie(this);(s=this.shadowRoot)==null||s.appendChild(r)}setError(t){this.setAttribute("upload-error",""),this.dispatchEvent(new CustomEvent("uploaderror",{detail:{message:t}}))}resetState(){this.removeAttribute("upload-error"),this.removeAttribute("upload-in-progress"),this.removeAttribute("upload-complete"),this.hiddenFileInput.value=""}handleUpload(t){let r=this.endpoint,n=this.dynamicChunkSize;if(r)this.removeAttribute("upload-error");else{this.setError("No url or endpoint specified -- cannot handleUpload");return}try{let s=Oe.createUpload({endpoint:r,dynamicChunkSize:n,file:t.detail,maxFileSize:this.maxFileSize,chunkSize:this.chunkSize,useLargeFileWorkaround:this.useLargeFileWorkaround});this._upload=s,this.dispatchEvent(new CustomEvent("uploadstart",{detail:{file:s.file,chunkSize:s.chunkSize}})),this.setAttribute("upload-in-progress",""),s.offline&&this.dispatchEvent(new CustomEvent("offline")),s.on("attempt",o=>{this.dispatchEvent(new CustomEvent("chunkattempt",o))}),s.on("chunkSuccess",o=>{this.dispatchEvent(new CustomEvent("chunksuccess",o))}),s.on("error",o=>{this.setAttribute("upload-error",""),console.error("error handler",o.detail.message),this.dispatchEvent(new CustomEvent("uploaderror",o))}),s.on("progress",o=>{this.dispatchEvent(new CustomEvent("progress",o))}),s.on("success",o=>{this.removeAttribute("upload-in-progress"),this.setAttribute("upload-complete",""),this.dispatchEvent(new CustomEvent("success",o))}),s.on("offline",o=>{this.dispatchEvent(new CustomEvent("offline",o))}),s.on("online",o=>{this.dispatchEvent(new CustomEvent("online",o))})}catch(s){s instanceof Error&&this.setError(s.message)}}};d.customElements.get("mux-uploader")||(d.customElements.define("mux-uploader",se),d.MuxUploaderElement=se);var Lt=se;var Rt=v.createElement("template");Rt.innerHTML=`
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
`;var I,be=class extends d.HTMLElement{constructor(){var n;super();c(this,I);this.attachShadow({mode:"open"}).appendChild(Rt.content.cloneNode(!0)),this.srOnlyText=(n=this.shadowRoot)==null?void 0:n.getElementById("sr-only")}connectedCallback(){f(this,I,w(this)),i(this,I)&&i(this,I).addEventListener("success",this.updateText.bind(this))}disconnectedCallback(){i(this,I)&&i(this,I).removeEventListener("success",this.updateText.bind(this))}updateText(){this.srOnlyText&&(this.srOnlyText.textContent="Upload complete!")}};I=new WeakMap;d.customElements.get("mux-uploader-sr-text")||d.customElements.define("mux-uploader-sr-text",be);var Lr=be;var jn=Lt;})();
//# sourceMappingURL=mux-uploader.js.map
