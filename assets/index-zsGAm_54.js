const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/main-lQrxcyCZ.js","assets/main-7eOLEuzy.css"])))=>i.map(i=>d[i]);
(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))f(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const t of r.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&f(t)}).observe(document,{childList:!0,subtree:!0});function l(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(e){if(e.ep)return;e.ep=!0;const r=l(e);fetch(e.href,r)}})();const y="modulepreload",v=function(c){return"/vivid/"+c},a={},d=function(o,l,f){let e=Promise.resolve();if(l&&l.length>0){document.getElementsByTagName("link");const t=document.querySelector("meta[property=csp-nonce]"),n=(t==null?void 0:t.nonce)||(t==null?void 0:t.getAttribute("nonce"));e=Promise.allSettled(l.map(i=>{if(i=v(i),i in a)return;a[i]=!0;const u=i.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${m}`))return;const s=document.createElement("link");if(s.rel=u?"stylesheet":y,u||(s.as="script"),s.crossOrigin="",s.href=i,n&&s.setAttribute("nonce",n),document.head.appendChild(s),u)return new Promise((p,h)=>{s.addEventListener("load",p),s.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${i}`)))})}))}function r(t){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=t,window.dispatchEvent(n),!n.defaultPrevented)throw t}return e.then(t=>{for(const n of t||[])n.status==="rejected"&&r(n.reason);return o().catch(r)})},E=location.port==="5173"||location.port==="4173";E?d(()=>import("./main-lQrxcyCZ.js"),__vite__mapDeps([0,1])):fetch("./manifest.json").then(c=>c.json()).then(c=>{const o=Object.values(c).find(l=>l.isEntry);o&&o.file?d(()=>import(`./${o.file}`),[]):console.error("No entry found in manifest.json")});
