"use client";import a,{useEffect as h,useState as k}from"react";import c,{Suspense as y}from"react";var m=({condition:t,fallback:r,children:n,...e})=>t?c.createElement(y,{fallback:r,...e},n):c.createElement(c.Fragment,null,r),i=m;import{useState as f,useEffect as x}from"react";var b=()=>{let[t,r]=f(!1);return x(()=>{typeof window!="undefined"&&r(!0)},[]),t},u=b;import{useState as P,useEffect as I}from"react";var g=(t,r)=>{let[n,e]=P(!1);return I(()=>{if(typeof IntersectionObserver=="function"){let o=new IntersectionObserver(([s])=>{e(s.isIntersecting)},r);return t.current&&o.observe(t.current),()=>{o.disconnect()}}},[t,r]),n},p=g;var v=a.lazy(()=>import("./-4XCR56OH.mjs")),R=t=>{let{style:r,className:n,onIntersection:e,placeholder:o}=t,s=a.useRef(null),l=p(s);return h(()=>{l&&e&&e()},[l,e]),a.createElement(a.Fragment,null,a.createElement("mux-player",{ref:s,"data-mux-player-react-lazy-placeholder":!0,placeholder:o!=null?o:"",style:{"--mux-player-react-lazy-placeholder":o?`url('${o}');`:"",...r},className:n||"",nohotkeys:!0,"aria-hidden":!0,tabIndex:-1},a.createElement("div",{"data-mux-player-react-lazy-placeholder-overlay":!0})),a.createElement("style",null,`
        mux-player[data-mux-player-react-lazy-placeholder] {
          aspect-ratio: 16/9;
          display: block;
          background-color: var(--media-background-color, #000);
          width: 100%;
          position: relative;
          background-image: var(--mux-player-react-lazy-placeholder);
          background-repeat: no-repeat;
          background-size: var(--media-object-fit, contain);
          background-position: var(--media-object-position, 50% 50%);
          --controls: none;
          --controls-backdrop-color: rgba(0, 0, 0, 0.6);
        }
        mux-player [data-mux-player-react-lazy-placeholder-overlay] {
          position: absolute;
          inset: 0;
          background-color: var(--controls-backdrop-color);
        }
      `))},d={PAGE:"page",VIEWPORT:"viewport"},E=a.forwardRef((t,r)=>{let{loading:n=d.VIEWPORT,...e}=t,o=u(),[s,l]=k(()=>n!==d.VIEWPORT);return a.createElement(i,{condition:o&&s,fallback:a.createElement(R,{style:e.style,className:e.className,placeholder:e.placeholder,onIntersection:()=>l(!0)})},a.createElement(v,{...e,ref:r}))}),B=E;export{B as default};
//# sourceMappingURL=lazy.mjs.map
