import{c as Rt}from"./highlight-DE77Zp-a.js";var lr={exports:{}},hr={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ji;function Oc(){return Ji||(Ji=1,(function(r){function e(g,E){var A=g.length;g.push(E);e:for(;0<A;){var R=A-1>>>1,B=g[R];if(0<i(B,E))g[R]=E,g[A]=B,A=R;else break e}}function t(g){return g.length===0?null:g[0]}function n(g){if(g.length===0)return null;var E=g[0],A=g.pop();if(A!==E){g[0]=A;e:for(var R=0,B=g.length,F=B>>>1;R<F;){var ae=2*(R+1)-1,U=g[ae],ee=ae+1,Te=g[ee];if(0>i(U,A))ee<B&&0>i(Te,U)?(g[R]=Te,g[ee]=A,R=ee):(g[R]=U,g[ae]=A,R=ae);else if(ee<B&&0>i(Te,A))g[R]=Te,g[ee]=A,R=ee;else break e}}return E}function i(g,E){var A=g.sortIndex-E.sortIndex;return A!==0?A:g.id-E.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;r.unstable_now=function(){return s.now()}}else{var a=Date,c=a.now();r.unstable_now=function(){return a.now()-c}}var u=[],l=[],p=1,f=null,h=3,v=!1,w=!1,P=!1,k=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function N(g){for(var E=t(l);E!==null;){if(E.callback===null)n(l);else if(E.startTime<=g)n(l),E.sortIndex=E.expirationTime,e(u,E);else break;E=t(l)}}function y(g){if(P=!1,N(g),!w)if(t(u)!==null)w=!0,Pe(L);else{var E=t(l);E!==null&&Qe(y,E.startTime-g)}}function L(g,E){w=!1,P&&(P=!1,S(q),q=-1),v=!0;var A=h;try{for(N(E),f=t(u);f!==null&&(!(f.expirationTime>E)||g&&!b());){var R=f.callback;if(typeof R=="function"){f.callback=null,h=f.priorityLevel;var B=R(f.expirationTime<=E);E=r.unstable_now(),typeof B=="function"?f.callback=B:f===t(u)&&n(u),N(E)}else n(u);f=t(u)}if(f!==null)var F=!0;else{var ae=t(l);ae!==null&&Qe(y,ae.startTime-E),F=!1}return F}finally{f=null,h=A,v=!1}}var C=!1,O=null,q=-1,j=5,K=-1;function b(){return!(r.unstable_now()-K<j)}function W(){if(O!==null){var g=r.unstable_now();K=g;var E=!0;try{E=O(!0,g)}finally{E?H():(C=!1,O=null)}}else C=!1}var H;if(typeof I=="function")H=function(){I(W)};else if(typeof MessageChannel<"u"){var se=new MessageChannel,be=se.port2;se.port1.onmessage=W,H=function(){be.postMessage(null)}}else H=function(){k(W,0)};function Pe(g){O=g,C||(C=!0,H())}function Qe(g,E){q=k(function(){g(r.unstable_now())},E)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(g){g.callback=null},r.unstable_continueExecution=function(){w||v||(w=!0,Pe(L))},r.unstable_forceFrameRate=function(g){0>g||125<g?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<g?Math.floor(1e3/g):5},r.unstable_getCurrentPriorityLevel=function(){return h},r.unstable_getFirstCallbackNode=function(){return t(u)},r.unstable_next=function(g){switch(h){case 1:case 2:case 3:var E=3;break;default:E=h}var A=h;h=E;try{return g()}finally{h=A}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(g,E){switch(g){case 1:case 2:case 3:case 4:case 5:break;default:g=3}var A=h;h=g;try{return E()}finally{h=A}},r.unstable_scheduleCallback=function(g,E,A){var R=r.unstable_now();switch(typeof A=="object"&&A!==null?(A=A.delay,A=typeof A=="number"&&0<A?R+A:R):A=R,g){case 1:var B=-1;break;case 2:B=250;break;case 5:B=1073741823;break;case 4:B=1e4;break;default:B=5e3}return B=A+B,g={id:p++,callback:E,priorityLevel:g,startTime:A,expirationTime:B,sortIndex:-1},A>R?(g.sortIndex=A,e(l,g),t(u)===null&&g===t(l)&&(P?(S(q),q=-1):P=!0,Qe(y,A-R))):(g.sortIndex=B,e(u,g),w||v||(w=!0,Pe(L))),g},r.unstable_shouldYield=b,r.unstable_wrapCallback=function(g){var E=h;return function(){var A=h;h=E;try{return g.apply(this,arguments)}finally{h=A}}}})(hr)),hr}var Xi;function Yf(){return Xi||(Xi=1,lr.exports=Oc()),lr.exports}const Zi=r=>{let e;const t=new Set,n=(l,p)=>{const f=typeof l=="function"?l(e):l;if(!Object.is(f,e)){const h=e;e=p??(typeof f!="object"||f===null)?f:Object.assign({},e,f),t.forEach(v=>v(e,h))}},i=()=>e,c={setState:n,getState:i,getInitialState:()=>u,subscribe:l=>(t.add(l),()=>t.delete(l))},u=e=r(n,i,c);return c},Jf=(r=>r?Zi(r):Zi),Pc=()=>{};var Qi={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yo=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},kc=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],a=r[t++],c=r[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const s=r[t++],a=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},vo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],a=i+1<r.length,c=a?r[i+1]:0,u=i+2<r.length,l=u?r[i+2]:0,p=s>>2,f=(s&3)<<4|c>>4;let h=(c&15)<<2|l>>6,v=l&63;u||(v=64,a||(h=64)),n.push(t[p],t[f],t[h],t[v])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(yo(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):kc(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],c=i<r.length?t[r.charAt(i)]:0;++i;const l=i<r.length?t[r.charAt(i)]:64;++i;const f=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||c==null||l==null||f==null)throw new Dc;const h=s<<2|c>>4;if(n.push(h),l!==64){const v=c<<4&240|l>>2;if(n.push(v),f!==64){const w=l<<6&192|f;n.push(w)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Dc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Nc=function(r){const e=yo(r);return vo.encodeByteArray(e,!0)},bo=function(r){return Nc(r).replace(/\./g,"")},To=function(r){try{return vo.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mc=()=>Lc().__FIREBASE_DEFAULTS__,Uc=()=>{if(typeof process>"u"||typeof Qi>"u")return;const r=Qi.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},xc=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&To(r[1]);return e&&JSON.parse(e)},pi=()=>{try{return Pc()||Mc()||Uc()||xc()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},qc=r=>pi()?.emulatorHosts?.[r],Io=()=>pi()?.config,Eo=r=>pi()?.[`_${r}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Hc(r){return(await fetch(r,{credentials:"include"})).ok}const lt={};function Bc(){const r={prod:[],emulator:[]};for(const e of Object.keys(lt))lt[e]?r.emulator.push(e):r.prod.push(e);return r}function jc(r){let e=document.getElementById(r),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",r),t=!0),{created:t,element:e}}let es=!1;function Gc(r,e){if(typeof window>"u"||typeof document>"u"||!zt(window.location.host)||lt[r]===e||lt[r]||es)return;lt[r]=e;function t(h){return`__firebase__banner__${h}`}const n="__firebase__banner",s=Bc().prod.length>0;function a(){const h=document.getElementById(n);h&&h.remove()}function c(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function u(h,v){h.setAttribute("width","24"),h.setAttribute("id",v),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{es=!0,a()},h}function p(h,v){h.setAttribute("id",v),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function f(){const h=jc(n),v=t("text"),w=document.getElementById(v)||document.createElement("span"),P=t("learnmore"),k=document.getElementById(P)||document.createElement("a"),S=t("preprendIcon"),I=document.getElementById(S)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const N=h.element;c(N),p(k,P);const y=l();u(I,S),N.append(I,w,k,y),document.body.appendChild(N)}s?(w.innerText="Preview backend disconnected.",I.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(I.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,w.innerText="Preview backend running in this workspace."),w.setAttribute("id",v)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",f):f()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function zc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(J())}function Wc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function $c(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Vc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Kc(){const r=J();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Yc(){try{return typeof indexedDB=="object"}catch{return!1}}function Jc(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc="FirebaseError";class Oe extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Xc,Object.setPrototypeOf(this,Oe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,gt.prototype.create)}}class gt{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Zc(s,n):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Oe(i,c,n)}}function Zc(r,e){return r.replace(Qc,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const Qc=/\{\$([^}]+)}/g;function eu(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Ve(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],a=e[i];if(ts(s)&&ts(a)){if(!Ve(s,a))return!1}else if(s!==a)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function ts(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function tu(r,e){const t=new ru(r,e);return t.subscribe.bind(t)}class ru{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");nu(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=dr),i.error===void 0&&(i.error=dr),i.complete===void 0&&(i.complete=dr);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function nu(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function dr(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(r){return r&&r._delegate?r._delegate:r}class Ke{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Fc;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(n)return null;throw i}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(au(e))try{this.getOrInitializeService({instanceIdentifier:De})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=De){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=De){return this.instances.has(e)}getOptions(e=De){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);n===c&&a.resolve(i)}return i}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(n)??new Set;i.add(e),this.onInitCallbacks.set(n,i);const s=this.instances.get(n);return s&&e(s,n),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:su(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=De){return this.component?this.component.multipleInstances?e:De:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function su(r){return r===De?void 0:r}function au(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new iu(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var M;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(M||(M={}));const cu={debug:M.DEBUG,verbose:M.VERBOSE,info:M.INFO,warn:M.WARN,error:M.ERROR,silent:M.SILENT},uu=M.INFO,lu={[M.DEBUG]:"log",[M.VERBOSE]:"log",[M.INFO]:"info",[M.WARN]:"warn",[M.ERROR]:"error"},hu=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=lu[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class wo{constructor(e){this.name=e,this._logLevel=uu,this._logHandler=hu,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in M))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?cu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,M.DEBUG,...e),this._logHandler(this,M.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,M.VERBOSE,...e),this._logHandler(this,M.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,M.INFO,...e),this._logHandler(this,M.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,M.WARN,...e),this._logHandler(this,M.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,M.ERROR,...e),this._logHandler(this,M.ERROR,...e)}}const du=(r,e)=>e.some(t=>r instanceof t);let rs,ns;function fu(){return rs||(rs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pu(){return ns||(ns=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ao=new WeakMap,ii=new WeakMap,So=new WeakMap,fr=new WeakMap,gi=new WeakMap;function gu(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",a)},s=()=>{t(Ce(r.result)),i()},a=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Ao.set(t,r)}).catch(()=>{}),gi.set(e,r),e}function mu(r){if(ii.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",a),r.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",a),r.addEventListener("abort",a)});ii.set(r,e)}let si={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return ii.get(r);if(e==="objectStoreNames")return r.objectStoreNames||So.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ce(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function _u(r){si=r(si)}function yu(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(pr(this),e,...t);return So.set(n,e.sort?e.sort():[e]),Ce(n)}:pu().includes(r)?function(...e){return r.apply(pr(this),e),Ce(Ao.get(this))}:function(...e){return Ce(r.apply(pr(this),e))}}function vu(r){return typeof r=="function"?yu(r):(r instanceof IDBTransaction&&mu(r),du(r,fu())?new Proxy(r,si):r)}function Ce(r){if(r instanceof IDBRequest)return gu(r);if(fr.has(r))return fr.get(r);const e=vu(r);return e!==r&&(fr.set(r,e),gi.set(e,r)),e}const pr=r=>gi.get(r);function bu(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const a=indexedDB.open(r,e),c=Ce(a);return n&&a.addEventListener("upgradeneeded",u=>{n(Ce(a.result),u.oldVersion,u.newVersion,Ce(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}const Tu=["get","getKey","getAll","getAllKeys","count"],Iu=["put","add","delete","clear"],gr=new Map;function is(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(gr.get(e))return gr.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=Iu.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||Tu.includes(t)))return;const s=async function(a,...c){const u=this.transaction(a,i?"readwrite":"readonly");let l=u.store;return n&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),i&&u.done]))[0]};return gr.set(e,s),s}_u(r=>({...r,get:(e,t,n)=>is(e,t)||r.get(e,t,n),has:(e,t)=>!!is(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(wu(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function wu(r){return r.getComponent()?.type==="VERSION"}const ai="@firebase/app",ss="0.14.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e=new wo("@firebase/app"),Au="@firebase/app-compat",Su="@firebase/analytics-compat",Cu="@firebase/analytics",Ru="@firebase/app-check-compat",Ou="@firebase/app-check",Pu="@firebase/auth",ku="@firebase/auth-compat",Du="@firebase/database",Nu="@firebase/data-connect",Lu="@firebase/database-compat",Mu="@firebase/functions",Uu="@firebase/functions-compat",xu="@firebase/installations",qu="@firebase/installations-compat",Fu="@firebase/messaging",Hu="@firebase/messaging-compat",Bu="@firebase/performance",ju="@firebase/performance-compat",Gu="@firebase/remote-config",zu="@firebase/remote-config-compat",Wu="@firebase/storage",$u="@firebase/storage-compat",Vu="@firebase/firestore",Ku="@firebase/ai",Yu="@firebase/firestore-compat",Ju="firebase",Xu="12.3.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oi="[DEFAULT]",Zu={[ai]:"fire-core",[Au]:"fire-core-compat",[Cu]:"fire-analytics",[Su]:"fire-analytics-compat",[Ou]:"fire-app-check",[Ru]:"fire-app-check-compat",[Pu]:"fire-auth",[ku]:"fire-auth-compat",[Du]:"fire-rtdb",[Nu]:"fire-data-connect",[Lu]:"fire-rtdb-compat",[Mu]:"fire-fn",[Uu]:"fire-fn-compat",[xu]:"fire-iid",[qu]:"fire-iid-compat",[Fu]:"fire-fcm",[Hu]:"fire-fcm-compat",[Bu]:"fire-perf",[ju]:"fire-perf-compat",[Gu]:"fire-rc",[zu]:"fire-rc-compat",[Wu]:"fire-gcs",[$u]:"fire-gcs-compat",[Vu]:"fire-fst",[Yu]:"fire-fst-compat",[Ku]:"fire-vertex","fire-js":"fire-js",[Ju]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt=new Map,Qu=new Map,ci=new Map;function as(r,e){try{r.container.addComponent(e)}catch(t){_e.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function dt(r){const e=r.name;if(ci.has(e))return _e.debug(`There were multiple attempts to register component ${e}.`),!1;ci.set(e,r);for(const t of xt.values())as(t,r);for(const t of Qu.values())as(t,r);return!0}function Co(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function ce(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const el={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Re=new gt("app","Firebase",el);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Ke("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Re.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=Xu;function rl(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:oi,automaticDataCollectionEnabled:!0,...e},i=n.name;if(typeof i!="string"||!i)throw Re.create("bad-app-name",{appName:String(i)});if(t||(t=Io()),!t)throw Re.create("no-options");const s=xt.get(i);if(s){if(Ve(t,s.options)&&Ve(n,s.config))return s;throw Re.create("duplicate-app",{appName:i})}const a=new ou(i);for(const u of ci.values())a.addComponent(u);const c=new tl(t,n,a);return xt.set(i,c),c}function nl(r=oi){const e=xt.get(r);if(!e&&r===oi&&Io())return rl();if(!e)throw Re.create("no-app",{appName:r});return e}function Ge(r,e,t){let n=Zu[r]??r;t&&(n+=`-${t}`);const i=n.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const a=[`Unable to register library "${n}" with version "${e}":`];i&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),i&&s&&a.push("and"),s&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_e.warn(a.join(" "));return}dt(new Ke(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il="firebase-heartbeat-database",sl=1,ft="firebase-heartbeat-store";let mr=null;function Ro(){return mr||(mr=bu(il,sl,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ft)}catch(t){console.warn(t)}}}}).catch(r=>{throw Re.create("idb-open",{originalErrorMessage:r.message})})),mr}async function al(r){try{const t=(await Ro()).transaction(ft),n=await t.objectStore(ft).get(Oo(r));return await t.done,n}catch(e){if(e instanceof Oe)_e.warn(e.message);else{const t=Re.create("idb-get",{originalErrorMessage:e?.message});_e.warn(t.message)}}}async function os(r,e){try{const n=(await Ro()).transaction(ft,"readwrite");await n.objectStore(ft).put(e,Oo(r)),await n.done}catch(t){if(t instanceof Oe)_e.warn(t.message);else{const n=Re.create("idb-set",{originalErrorMessage:t?.message});_e.warn(n.message)}}}function Oo(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ol=1024,cl=30;class ul{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new hl(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=cs();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(i=>i.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>cl){const i=dl(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){_e.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=cs(),{heartbeatsToSend:t,unsentEntries:n}=ll(this._heartbeatsCache.heartbeats),i=bo(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return _e.warn(e),""}}}function cs(){return new Date().toISOString().substring(0,10)}function ll(r,e=ol){const t=[];let n=r.slice();for(const i of r){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),us(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),us(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class hl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yc()?Jc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await al(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return os(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return os(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function us(r){return bo(JSON.stringify({version:2,heartbeats:r})).length}function dl(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fl(r){dt(new Ke("platform-logger",e=>new Eu(e),"PRIVATE")),dt(new Ke("heartbeat",e=>new ul(e),"PRIVATE")),Ge(ai,ss,r),Ge(ai,ss,"esm2020"),Ge("fire-js","")}fl("");var pl="firebase",gl="12.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ge(pl,gl,"app");function Po(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ml=Po,ko=new gt("auth","Firebase",Po());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt=new wo("@firebase/auth");function _l(r,...e){qt.logLevel<=M.WARN&&qt.warn(`Auth (${_t}): ${r}`,...e)}function Dt(r,...e){qt.logLevel<=M.ERROR&&qt.error(`Auth (${_t}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(r,...e){throw _i(r,...e)}function ie(r,...e){return _i(r,...e)}function mi(r,e,t){const n={...ml(),[e]:t};return new gt("auth","Firebase",n).create(e,{appName:r.name})}function Le(r){return mi(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function yl(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&le(r,"argument-error"),mi(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function _i(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return ko.create(r,...e)}function T(r,e,...t){if(!r)throw _i(e,...t)}function ge(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Dt(e),new Error(e)}function ye(r,e){r||ge(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ui(){return typeof self<"u"&&self.location?.href||""}function vl(){return ls()==="http:"||ls()==="https:"}function ls(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(vl()||$c()||"connection"in navigator)?navigator.onLine:!0}function Tl(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t){this.shortDelay=e,this.longDelay=t,ye(t>e,"Short delay should be less than long delay!"),this.isMobile=zc()||Vc()}get(){return bl()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(r,e){ye(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ge("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ge("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ge("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],wl=new yt(3e4,6e4);function vi(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function Xe(r,e,t,n,i={}){return No(r,i,async()=>{let s={},a={};n&&(e==="GET"?a=n:s={body:JSON.stringify(n)});const c=mt({key:r.config.apiKey,...a}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const l={method:e,headers:u,...s};return Wc()||(l.referrerPolicy="no-referrer"),r.emulatorConfig&&zt(r.emulatorConfig.host)&&(l.credentials="include"),Do.fetch()(await Lo(r,r.config.apiHost,t,c),l)})}async function No(r,e,t){r._canInitEmulator=!1;const n={...Il,...e};try{const i=new Sl(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Ot(r,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ot(r,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Ot(r,"email-already-in-use",a);if(u==="USER_DISABLED")throw Ot(r,"user-disabled",a);const p=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw mi(r,p,l);le(r,p)}}catch(i){if(i instanceof Oe)throw i;le(r,"network-request-failed",{message:String(i)})}}async function Al(r,e,t,n,i={}){const s=await Xe(r,e,t,n,i);return"mfaPendingCredential"in s&&le(r,"multi-factor-auth-required",{_serverResponse:s}),s}async function Lo(r,e,t,n){const i=`${e}${t}?${n}`,s=r,a=s.config.emulator?yi(r.config,i):`${r.config.apiScheme}://${i}`;return El.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}class Sl{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(ie(this.auth,"network-request-failed")),wl.get())})}}function Ot(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=ie(r,e,n);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cl(r,e){return Xe(r,"POST","/v1/accounts:delete",e)}async function Ft(r,e){return Xe(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Rl(r,e=!1){const t=Je(r),n=await t.getIdToken(e),i=bi(n);T(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:n,authTime:ht(_r(i.auth_time)),issuedAtTime:ht(_r(i.iat)),expirationTime:ht(_r(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function _r(r){return Number(r)*1e3}function bi(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return Dt("JWT malformed, contained fewer than 3 sections"),null;try{const i=To(t);return i?JSON.parse(i):(Dt("Failed to decode base64 JWT payload"),null)}catch(i){return Dt("Caught error parsing JWT payload as JSON",i?.toString()),null}}function hs(r){const e=bi(r);return T(e,"internal-error"),T(typeof e.exp<"u","internal-error"),T(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pt(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Oe&&Ol(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Ol({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ht(this.lastLoginAt),this.creationTime=ht(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ht(r){const e=r.auth,t=await r.getIdToken(),n=await pt(r,Ft(e,{idToken:t}));T(n?.users.length,e,"internal-error");const i=n.users[0];r._notifyReloadListener(i);const s=i.providerUserInfo?.length?Mo(i.providerUserInfo):[],a=Dl(r.providerData,s),c=r.isAnonymous,u=!(r.email&&i.passwordHash)&&!a?.length,l=c?u:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new li(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(r,p)}async function kl(r){const e=Je(r);await Ht(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Dl(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function Mo(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nl(r,e){const t=await No(r,{},async()=>{const n=mt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,a=await Lo(r,i,"/v1/token",`key=${s}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&zt(r.emulatorConfig.host)&&(u.credentials="include"),Do.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ll(r,e){return Xe(r,"POST","/v2/accounts:revokeToken",vi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){T(e.idToken,"internal-error"),T(typeof e.idToken<"u","internal-error"),T(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):hs(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){T(e.length!==0,"internal-error");const t=hs(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(T(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await Nl(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,a=new ze;return n&&(T(typeof n=="string","internal-error",{appName:e}),a.refreshToken=n),i&&(T(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(T(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ze,this.toJSON())}_performRefresh(){return ge("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(r,e){T(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class ne{constructor({uid:e,auth:t,stsTokenManager:n,...i}){this.providerId="firebase",this.proactiveRefresh=new Pl(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new li(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await pt(this,this.stsTokenManager.getToken(this.auth,e));return T(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Rl(this,e)}reload(){return kl(this)}_assign(e){this!==e&&(T(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ne({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){T(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Ht(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ce(this.auth.app))return Promise.reject(Le(this.auth));const e=await this.getIdToken();return await pt(this,Cl(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,l=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:f,emailVerified:h,isAnonymous:v,providerData:w,stsTokenManager:P}=t;T(f&&P,e,"internal-error");const k=ze.fromJSON(this.name,P);T(typeof f=="string",e,"internal-error"),Ie(n,e.name),Ie(i,e.name),T(typeof h=="boolean",e,"internal-error"),T(typeof v=="boolean",e,"internal-error"),Ie(s,e.name),Ie(a,e.name),Ie(c,e.name),Ie(u,e.name),Ie(l,e.name),Ie(p,e.name);const S=new ne({uid:f,auth:e,email:i,emailVerified:h,displayName:n,isAnonymous:v,photoURL:a,phoneNumber:s,tenantId:c,stsTokenManager:k,createdAt:l,lastLoginAt:p});return w&&Array.isArray(w)&&(S.providerData=w.map(I=>({...I}))),u&&(S._redirectEventId=u),S}static async _fromIdTokenResponse(e,t,n=!1){const i=new ze;i.updateFromServerResponse(t);const s=new ne({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await Ht(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];T(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Mo(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,c=new ze;c.updateFromIdToken(n);const u=new ne({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new li(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(u,l),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ds=new Map;function me(r){ye(r instanceof Function,"Expected a class definition");let e=ds.get(r);return e?(ye(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,ds.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Uo.type="NONE";const fs=Uo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(r,e,t){return`firebase:${r}:${e}:${t}`}class We{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=Nt(this.userKey,i.apiKey,s),this.fullPersistenceKey=Nt("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ft(this.auth,{idToken:e}).catch(()=>{});return t?ne._fromGetAccountInfoResponse(this.auth,t,e):null}return ne._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new We(me(fs),e,n);const i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let s=i[0]||me(fs);const a=Nt(n,e.config.apiKey,e.name);let c=null;for(const l of t)try{const p=await l._get(a);if(p){let f;if(typeof p=="string"){const h=await Ft(e,{idToken:p}).catch(()=>{});if(!h)break;f=await ne._fromGetAccountInfoResponse(e,h,p)}else f=ne._fromJSON(e,p);l!==s&&(c=f),s=l;break}}catch{}const u=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new We(s,e,n):(s=u[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(a)}catch{}})),new We(s,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ho(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xo(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(jo(e))return"Blackberry";if(Go(e))return"Webos";if(qo(e))return"Safari";if((e.includes("chrome/")||Fo(e))&&!e.includes("edge/"))return"Chrome";if(Bo(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function xo(r=J()){return/firefox\//i.test(r)}function qo(r=J()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Fo(r=J()){return/crios\//i.test(r)}function Ho(r=J()){return/iemobile/i.test(r)}function Bo(r=J()){return/android/i.test(r)}function jo(r=J()){return/blackberry/i.test(r)}function Go(r=J()){return/webos/i.test(r)}function Ti(r=J()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Ml(r=J()){return Ti(r)&&!!window.navigator?.standalone}function Ul(){return Kc()&&document.documentMode===10}function zo(r=J()){return Ti(r)||Bo(r)||Go(r)||jo(r)||/windows phone/i.test(r)||Ho(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wo(r,e=[]){let t;switch(r){case"Browser":t=ps(J());break;case"Worker":t=`${ps(J())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${_t}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((a,c)=>{try{const u=e(s);a(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ql(r,e={}){return Xe(r,"GET","/v2/passwordPolicy",vi(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl=6;class Hl{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Fl,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new gs(this),this.idTokenSubscription=new gs(this),this.beforeStateQueue=new xl(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ko,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=me(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await We.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ft(this,{idToken:e}),n=await ne._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ce(this.app)){const s=this.app.settings.authIdToken;return s?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=this.redirectUser?._redirectEventId,a=n?._redirectEventId,c=await this.tryRedirectSignIn(e);(!s||s===a)&&c?.user&&(n=c.user,i=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(n)}catch(s){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return T(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ht(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Tl()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ce(this.app))return Promise.reject(Le(this));const t=e?Je(e):null;return t&&T(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&T(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ce(this.app)?Promise.reject(Le(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ce(this.app)?Promise.reject(Le(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(me(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ql(this),t=new Hl(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new gt("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Ll(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&me(e)||this._popupRedirectResolver;T(t,this,"argument-error"),this.redirectPersistenceManager=await We.create(this,[me(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(T(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,i);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return T(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Wo(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(ce(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&_l(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Wt(r){return Je(r)}class gs{constructor(e){this.auth=e,this.observer=null,this.addObserver=tu(t=>this.observer=t)}get next(){return T(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ii={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function jl(r){Ii=r}function Gl(r){return Ii.loadJS(r)}function zl(){return Ii.gapiScript}function Wl(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $l(r,e){const t=Co(r,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Ve(s,e??{}))return i;le(i,"already-initialized")}return t.initialize({options:e})}function Vl(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(me);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function Kl(r,e,t){const n=Wt(r);T(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!1,s=$o(e),{host:a,port:c}=Yl(e),u=c===null?"":`:${c}`,l={url:`${s}//${a}${u}/`},p=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!n._canInitEmulator){T(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),T(Ve(l,n.config.emulator)&&Ve(p,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=l,n.emulatorConfig=p,n.settings.appVerificationDisabledForTesting=!0,zt(a)?(Hc(`${s}//${a}${u}`),Gc("Auth",!0)):Jl()}function $o(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function Yl(r){const e=$o(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const s=i[1];return{host:s,port:ms(n.substr(s.length+1))}}else{const[s,a]=n.split(":");return{host:s,port:ms(a)}}}function ms(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function Jl(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ge("not implemented")}_getIdTokenResponse(e){return ge("not implemented")}_linkToIdToken(e,t){return ge("not implemented")}_getReauthenticationResolver(e){return ge("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $e(r,e){return Al(r,"POST","/v1/accounts:signInWithIdp",vi(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="http://localhost";class Me extends Vo{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Me(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):le("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i,...s}=t;if(!n||!i)return null;const a=new Me(n,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return $e(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,$e(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,$e(e,t)}buildRequest(){const e={requestUri:Xl,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=mt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt extends Ei{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee extends vt{constructor(){super("facebook.com")}static credential(e){return Me._fromParams({providerId:Ee.PROVIDER_ID,signInMethod:Ee.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ee.credentialFromTaggedObject(e)}static credentialFromError(e){return Ee.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ee.credential(e.oauthAccessToken)}catch{return null}}}Ee.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ee.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we extends vt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Me._fromParams({providerId:we.PROVIDER_ID,signInMethod:we.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return we.credentialFromTaggedObject(e)}static credentialFromError(e){return we.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return we.credential(t,n)}catch{return null}}}we.GOOGLE_SIGN_IN_METHOD="google.com";we.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae extends vt{constructor(){super("github.com")}static credential(e){return Me._fromParams({providerId:Ae.PROVIDER_ID,signInMethod:Ae.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ae.credentialFromTaggedObject(e)}static credentialFromError(e){return Ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ae.credential(e.oauthAccessToken)}catch{return null}}}Ae.GITHUB_SIGN_IN_METHOD="github.com";Ae.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se extends vt{constructor(){super("twitter.com")}static credential(e,t){return Me._fromParams({providerId:Se.PROVIDER_ID,signInMethod:Se.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Se.credentialFromTaggedObject(e)}static credentialFromError(e){return Se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Se.credential(t,n)}catch{return null}}}Se.TWITTER_SIGN_IN_METHOD="twitter.com";Se.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await ne._fromIdTokenResponse(e,n,i),a=_s(n);return new Ye({user:s,providerId:a,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=_s(n);return new Ye({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function _s(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends Oe{constructor(e,t,n,i){super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,Bt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new Bt(e,t,n,i)}}function Ko(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Bt._fromErrorAndOperation(r,s,e,n):s})}async function Zl(r,e,t=!1){const n=await pt(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Ye._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ql(r,e,t=!1){const{auth:n}=r;if(ce(n.app))return Promise.reject(Le(n));const i="reauthenticate";try{const s=await pt(r,Ko(n,i,e,r),t);T(s.idToken,n,"internal-error");const a=bi(s.idToken);T(a,n,"internal-error");const{sub:c}=a;return T(r.uid===c,n,"user-mismatch"),Ye._forOperation(r,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&le(n,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eh(r,e,t=!1){if(ce(r.app))return Promise.reject(Le(r));const n="signIn",i=await Ko(r,n,e),s=await Ye._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}function th(r,e,t,n){return Je(r).onIdTokenChanged(e,t,n)}function rh(r,e,t){return Je(r).beforeAuthStateChanged(e,t)}const jt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(jt,"1"),this.storage.removeItem(jt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh=1e3,ih=10;class Jo extends Yo{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zo(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(n);!t&&this.localCache[n]===a||this.notifyListeners(n,a)},s=this.storage.getItem(n);Ul()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,ih):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},nh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jo.type="LOCAL";const sh=Jo;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo extends Yo{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Xo.type="SESSION";const Zo=Xo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ah(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const n=new $t(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const c=Array.from(a).map(async l=>l(t.origin,s)),u=await ah(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}$t.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,u)=>{const l=wi("",20);i.port1.start();const p=setTimeout(()=>{u(new Error("unsupported_event"))},n);a={messageChannel:i,onMessage(f){const h=f;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(h.data.response);break;default:clearTimeout(p),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ue(){return window}function ch(r){ue().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(){return typeof ue().WorkerGlobalScope<"u"&&typeof ue().importScripts=="function"}async function uh(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function lh(){return navigator?.serviceWorker?.controller||null}function hh(){return Qo()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec="firebaseLocalStorageDb",dh=1,Gt="firebaseLocalStorage",tc="fbase_key";class bt{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Vt(r,e){return r.transaction([Gt],e?"readwrite":"readonly").objectStore(Gt)}function fh(){const r=indexedDB.deleteDatabase(ec);return new bt(r).toPromise()}function hi(){const r=indexedDB.open(ec,dh);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Gt,{keyPath:tc})}catch(i){t(i)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Gt)?e(n):(n.close(),await fh(),e(await hi()))})})}async function ys(r,e,t){const n=Vt(r,!0).put({[tc]:e,value:t});return new bt(n).toPromise()}async function ph(r,e){const t=Vt(r,!1).get(e),n=await new bt(t).toPromise();return n===void 0?null:n.value}function vs(r,e){const t=Vt(r,!0).delete(e);return new bt(t).toPromise()}const gh=800,mh=3;class rc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await hi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>mh)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qo()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=$t._getInstance(hh()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await uh(),!this.activeServiceWorker)return;this.sender=new oh(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||lh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await hi();return await ys(e,jt,"1"),await vs(e,jt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ys(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>ph(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>vs(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Vt(i,!1).getAll();return new bt(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),gh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}rc.type="LOCAL";const _h=rc;new yt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nc(r,e){return e?me(e):(T(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai extends Vo{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return $e(e,this._buildIdpRequest())}_linkToIdToken(e,t){return $e(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return $e(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function yh(r){return eh(r.auth,new Ai(r),r.bypassAuthState)}function vh(r){const{auth:e,user:t}=r;return T(t,e,"internal-error"),Ql(t,new Ai(r),r.bypassAuthState)}async function bh(r){const{auth:e,user:t}=r;return T(t,e,"internal-error"),Zl(t,new Ai(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return yh;case"linkViaPopup":case"linkViaRedirect":return bh;case"reauthViaPopup":case"reauthViaRedirect":return vh;default:le(this.auth,"internal-error")}}resolve(e){ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th=new yt(2e3,1e4);async function Xf(r,e,t){if(ce(r.app))return Promise.reject(ie(r,"operation-not-supported-in-this-environment"));const n=Wt(r);yl(r,e,Ei);const i=nc(n,t);return new Ne(n,"signInViaPopup",e,i).executeNotNull()}class Ne extends ic{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,Ne.currentPopupAction&&Ne.currentPopupAction.cancel(),Ne.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return T(e,this.auth,"internal-error"),e}async onExecution(){ye(this.filter.length===1,"Popup operations only handle one event");const e=wi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ie(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ie(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ne.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ie(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Th.get())};e()}}Ne.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih="pendingRedirect",Lt=new Map;class Eh extends ic{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Lt.get(this.auth._key());if(!e){try{const n=await wh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Lt.set(this.auth._key(),e)}return this.bypassAuthState||Lt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function wh(r,e){const t=Ch(e),n=Sh(r);if(!await n._isAvailable())return!1;const i=await n._get(t)==="true";return await n._remove(t),i}function Ah(r,e){Lt.set(r._key(),e)}function Sh(r){return me(r._redirectPersistence)}function Ch(r){return Nt(Ih,r.config.apiKey,r.name)}async function Rh(r,e,t=!1){if(ce(r.app))return Promise.reject(Le(r));const n=Wt(r),i=nc(n,e),a=await new Eh(n,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oh=600*1e3;class Ph{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!kh(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!sc(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(ie(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Oh&&this.cachedEventUids.clear(),this.cachedEventUids.has(bs(e))}saveEventToCache(e){this.cachedEventUids.add(bs(e)),this.lastProcessedEventTime=Date.now()}}function bs(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function sc({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function kh(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return sc(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dh(r,e={}){return Xe(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Lh=/^https?/;async function Mh(r){if(r.config.emulator)return;const{authorizedDomains:e}=await Dh(r);for(const t of e)try{if(Uh(t))return}catch{}le(r,"unauthorized-domain")}function Uh(r){const e=ui(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const a=new URL(r);return a.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===n}if(!Lh.test(t))return!1;if(Nh.test(r))return n===r;const i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xh=new yt(3e4,6e4);function Ts(){const r=ue().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function qh(r){return new Promise((e,t)=>{function n(){Ts(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ts(),t(ie(r,"network-request-failed"))},timeout:xh.get()})}if(ue().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ue().gapi?.load)n();else{const i=Wl("iframefcb");return ue()[i]=()=>{gapi.load?n():t(ie(r,"network-request-failed"))},Gl(`${zl()}?onload=${i}`).catch(s=>t(s))}}).catch(e=>{throw Mt=null,e})}let Mt=null;function Fh(r){return Mt=Mt||qh(r),Mt}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh=new yt(5e3,15e3),Bh="__/auth/iframe",jh="emulator/auth/iframe",Gh={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},zh=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Wh(r){const e=r.config;T(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?yi(e,jh):`https://${r.config.authDomain}/${Bh}`,n={apiKey:e.apiKey,appName:r.name,v:_t},i=zh.get(r.config.apiHost);i&&(n.eid=i);const s=r._getFrameworks();return s.length&&(n.fw=s.join(",")),`${t}?${mt(n).slice(1)}`}async function $h(r){const e=await Fh(r),t=ue().gapi;return T(t,r,"internal-error"),e.open({where:document.body,url:Wh(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Gh,dontclear:!0},n=>new Promise(async(i,s)=>{await n.restyle({setHideOnLeave:!1});const a=ie(r,"network-request-failed"),c=ue().setTimeout(()=>{s(a)},Hh.get());function u(){ue().clearTimeout(c),i(n)}n.ping(u).then(u,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Kh=500,Yh=600,Jh="_blank",Xh="http://localhost";class Is{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Zh(r,e,t,n=Kh,i=Yh){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={...Vh,width:n.toString(),height:i.toString(),top:s,left:a},l=J().toLowerCase();t&&(c=Fo(l)?Jh:t),xo(l)&&(e=e||Xh,u.scrollbars="yes");const p=Object.entries(u).reduce((h,[v,w])=>`${h}${v}=${w},`,"");if(Ml(l)&&c!=="_self")return Qh(e||"",c),new Is(null);const f=window.open(e||"",c,p);T(f,r,"popup-blocked");try{f.focus()}catch{}return new Is(f)}function Qh(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="__/auth/handler",td="emulator/auth/handler",rd=encodeURIComponent("fac");async function Es(r,e,t,n,i,s){T(r.config.authDomain,r,"auth-domain-config-required"),T(r.config.apiKey,r,"invalid-api-key");const a={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:_t,eventId:i};if(e instanceof Ei){e.setDefaultLanguage(r.languageCode),a.providerId=e.providerId||"",eu(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,f]of Object.entries({}))a[p]=f}if(e instanceof vt){const p=e.getScopes().filter(f=>f!=="");p.length>0&&(a.scopes=p.join(","))}r.tenantId&&(a.tid=r.tenantId);const c=a;for(const p of Object.keys(c))c[p]===void 0&&delete c[p];const u=await r._getAppCheckToken(),l=u?`#${rd}=${encodeURIComponent(u)}`:"";return`${nd(r)}?${mt(c).slice(1)}${l}`}function nd({config:r}){return r.emulator?yi(r,td):`https://${r.authDomain}/${ed}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr="webStorageSupport";class id{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zo,this._completeRedirectFn=Rh,this._overrideRedirectResult=Ah}async _openPopup(e,t,n,i){ye(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const s=await Es(e,t,n,ui(),i);return Zh(e,s,wi())}async _openRedirect(e,t,n,i){await this._originValidation(e);const s=await Es(e,t,n,ui(),i);return ch(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(ye(s,"If manager is not set, promise should be"),s)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await $h(e),n=new Ph(e);return t.register("authEvent",i=>(T(i?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(yr,{type:yr},i=>{const s=i?.[0]?.[yr];s!==void 0&&t(!!s),le(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Mh(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return zo()||qo()||Ti()}}const sd=id;var ws="@firebase/auth",As="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ad{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){T(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function od(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function cd(r){dt(new Ke("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=n.options;T(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:a,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Wo(r)},l=new Bl(n,i,s,u);return Vl(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),dt(new Ke("auth-internal",e=>{const t=Wt(e.getProvider("auth").getImmediate());return(n=>new ad(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ge(ws,As,od(r)),Ge(ws,As,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud=300,ld=Eo("authIdTokenMaxAge")||ud;let Ss=null;const hd=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>ld)return;const i=t?.token;Ss!==i&&(Ss=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Zf(r=nl()){const e=Co(r,"auth");if(e.isInitialized())return e.getImmediate();const t=$l(r,{popupRedirectResolver:sd,persistence:[_h,sh,Zo]}),n=Eo("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(n,location.origin);if(location.origin===s.origin){const a=hd(s.toString());rh(t,a,()=>a(t.currentUser)),th(t,c=>a(c))}}const i=qc("auth");return i&&Kl(t,`http://${i}`),t}function dd(){return document.getElementsByTagName("head")?.[0]??document}jl({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{const s=ie("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",dd().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});cd("Browser");var vr,Cs;function fd(){if(Cs)return vr;Cs=1;function r(){this.__data__=[],this.size=0}return vr=r,vr}var br,Rs;function ac(){if(Rs)return br;Rs=1;function r(e,t){return e===t||e!==e&&t!==t}return br=r,br}var Tr,Os;function Kt(){if(Os)return Tr;Os=1;var r=ac();function e(t,n){for(var i=t.length;i--;)if(r(t[i][0],n))return i;return-1}return Tr=e,Tr}var Ir,Ps;function pd(){if(Ps)return Ir;Ps=1;var r=Kt(),e=Array.prototype,t=e.splice;function n(i){var s=this.__data__,a=r(s,i);if(a<0)return!1;var c=s.length-1;return a==c?s.pop():t.call(s,a,1),--this.size,!0}return Ir=n,Ir}var Er,ks;function gd(){if(ks)return Er;ks=1;var r=Kt();function e(t){var n=this.__data__,i=r(n,t);return i<0?void 0:n[i][1]}return Er=e,Er}var wr,Ds;function md(){if(Ds)return wr;Ds=1;var r=Kt();function e(t){return r(this.__data__,t)>-1}return wr=e,wr}var Ar,Ns;function _d(){if(Ns)return Ar;Ns=1;var r=Kt();function e(t,n){var i=this.__data__,s=r(i,t);return s<0?(++this.size,i.push([t,n])):i[s][1]=n,this}return Ar=e,Ar}var Sr,Ls;function Yt(){if(Ls)return Sr;Ls=1;var r=fd(),e=pd(),t=gd(),n=md(),i=_d();function s(a){var c=-1,u=a==null?0:a.length;for(this.clear();++c<u;){var l=a[c];this.set(l[0],l[1])}}return s.prototype.clear=r,s.prototype.delete=e,s.prototype.get=t,s.prototype.has=n,s.prototype.set=i,Sr=s,Sr}var Cr,Ms;function yd(){if(Ms)return Cr;Ms=1;var r=Yt();function e(){this.__data__=new r,this.size=0}return Cr=e,Cr}var Rr,Us;function vd(){if(Us)return Rr;Us=1;function r(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n}return Rr=r,Rr}var Or,xs;function bd(){if(xs)return Or;xs=1;function r(e){return this.__data__.get(e)}return Or=r,Or}var Pr,qs;function Td(){if(qs)return Pr;qs=1;function r(e){return this.__data__.has(e)}return Pr=r,Pr}var kr,Fs;function oc(){if(Fs)return kr;Fs=1;var r=typeof Rt=="object"&&Rt&&Rt.Object===Object&&Rt;return kr=r,kr}var Dr,Hs;function ve(){if(Hs)return Dr;Hs=1;var r=oc(),e=typeof self=="object"&&self&&self.Object===Object&&self,t=r||e||Function("return this")();return Dr=t,Dr}var Nr,Bs;function Si(){if(Bs)return Nr;Bs=1;var r=ve(),e=r.Symbol;return Nr=e,Nr}var Lr,js;function Id(){if(js)return Lr;js=1;var r=Si(),e=Object.prototype,t=e.hasOwnProperty,n=e.toString,i=r?r.toStringTag:void 0;function s(a){var c=t.call(a,i),u=a[i];try{a[i]=void 0;var l=!0}catch{}var p=n.call(a);return l&&(c?a[i]=u:delete a[i]),p}return Lr=s,Lr}var Mr,Gs;function Ed(){if(Gs)return Mr;Gs=1;var r=Object.prototype,e=r.toString;function t(n){return e.call(n)}return Mr=t,Mr}var Ur,zs;function Jt(){if(zs)return Ur;zs=1;var r=Si(),e=Id(),t=Ed(),n="[object Null]",i="[object Undefined]",s=r?r.toStringTag:void 0;function a(c){return c==null?c===void 0?i:n:s&&s in Object(c)?e(c):t(c)}return Ur=a,Ur}var xr,Ws;function cc(){if(Ws)return xr;Ws=1;function r(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}return xr=r,xr}var qr,$s;function uc(){if($s)return qr;$s=1;var r=Jt(),e=cc(),t="[object AsyncFunction]",n="[object Function]",i="[object GeneratorFunction]",s="[object Proxy]";function a(c){if(!e(c))return!1;var u=r(c);return u==n||u==i||u==t||u==s}return qr=a,qr}var Fr,Vs;function wd(){if(Vs)return Fr;Vs=1;var r=ve(),e=r["__core-js_shared__"];return Fr=e,Fr}var Hr,Ks;function Ad(){if(Ks)return Hr;Ks=1;var r=wd(),e=(function(){var n=/[^.]+$/.exec(r&&r.keys&&r.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""})();function t(n){return!!e&&e in n}return Hr=t,Hr}var Br,Ys;function lc(){if(Ys)return Br;Ys=1;var r=Function.prototype,e=r.toString;function t(n){if(n!=null){try{return e.call(n)}catch{}try{return n+""}catch{}}return""}return Br=t,Br}var jr,Js;function Sd(){if(Js)return jr;Js=1;var r=uc(),e=Ad(),t=cc(),n=lc(),i=/[\\^$.*+?()[\]{}|]/g,s=/^\[object .+?Constructor\]$/,a=Function.prototype,c=Object.prototype,u=a.toString,l=c.hasOwnProperty,p=RegExp("^"+u.call(l).replace(i,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function f(h){if(!t(h)||e(h))return!1;var v=r(h)?p:s;return v.test(n(h))}return jr=f,jr}var Gr,Xs;function Cd(){if(Xs)return Gr;Xs=1;function r(e,t){return e?.[t]}return Gr=r,Gr}var zr,Zs;function Ze(){if(Zs)return zr;Zs=1;var r=Sd(),e=Cd();function t(n,i){var s=e(n,i);return r(s)?s:void 0}return zr=t,zr}var Wr,Qs;function Ci(){if(Qs)return Wr;Qs=1;var r=Ze(),e=ve(),t=r(e,"Map");return Wr=t,Wr}var $r,ea;function Xt(){if(ea)return $r;ea=1;var r=Ze(),e=r(Object,"create");return $r=e,$r}var Vr,ta;function Rd(){if(ta)return Vr;ta=1;var r=Xt();function e(){this.__data__=r?r(null):{},this.size=0}return Vr=e,Vr}var Kr,ra;function Od(){if(ra)return Kr;ra=1;function r(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}return Kr=r,Kr}var Yr,na;function Pd(){if(na)return Yr;na=1;var r=Xt(),e="__lodash_hash_undefined__",t=Object.prototype,n=t.hasOwnProperty;function i(s){var a=this.__data__;if(r){var c=a[s];return c===e?void 0:c}return n.call(a,s)?a[s]:void 0}return Yr=i,Yr}var Jr,ia;function kd(){if(ia)return Jr;ia=1;var r=Xt(),e=Object.prototype,t=e.hasOwnProperty;function n(i){var s=this.__data__;return r?s[i]!==void 0:t.call(s,i)}return Jr=n,Jr}var Xr,sa;function Dd(){if(sa)return Xr;sa=1;var r=Xt(),e="__lodash_hash_undefined__";function t(n,i){var s=this.__data__;return this.size+=this.has(n)?0:1,s[n]=r&&i===void 0?e:i,this}return Xr=t,Xr}var Zr,aa;function Nd(){if(aa)return Zr;aa=1;var r=Rd(),e=Od(),t=Pd(),n=kd(),i=Dd();function s(a){var c=-1,u=a==null?0:a.length;for(this.clear();++c<u;){var l=a[c];this.set(l[0],l[1])}}return s.prototype.clear=r,s.prototype.delete=e,s.prototype.get=t,s.prototype.has=n,s.prototype.set=i,Zr=s,Zr}var Qr,oa;function Ld(){if(oa)return Qr;oa=1;var r=Nd(),e=Yt(),t=Ci();function n(){this.size=0,this.__data__={hash:new r,map:new(t||e),string:new r}}return Qr=n,Qr}var en,ca;function Md(){if(ca)return en;ca=1;function r(e){var t=typeof e;return t=="string"||t=="number"||t=="symbol"||t=="boolean"?e!=="__proto__":e===null}return en=r,en}var tn,ua;function Zt(){if(ua)return tn;ua=1;var r=Md();function e(t,n){var i=t.__data__;return r(n)?i[typeof n=="string"?"string":"hash"]:i.map}return tn=e,tn}var rn,la;function Ud(){if(la)return rn;la=1;var r=Zt();function e(t){var n=r(this,t).delete(t);return this.size-=n?1:0,n}return rn=e,rn}var nn,ha;function xd(){if(ha)return nn;ha=1;var r=Zt();function e(t){return r(this,t).get(t)}return nn=e,nn}var sn,da;function qd(){if(da)return sn;da=1;var r=Zt();function e(t){return r(this,t).has(t)}return sn=e,sn}var an,fa;function Fd(){if(fa)return an;fa=1;var r=Zt();function e(t,n){var i=r(this,t),s=i.size;return i.set(t,n),this.size+=i.size==s?0:1,this}return an=e,an}var on,pa;function hc(){if(pa)return on;pa=1;var r=Ld(),e=Ud(),t=xd(),n=qd(),i=Fd();function s(a){var c=-1,u=a==null?0:a.length;for(this.clear();++c<u;){var l=a[c];this.set(l[0],l[1])}}return s.prototype.clear=r,s.prototype.delete=e,s.prototype.get=t,s.prototype.has=n,s.prototype.set=i,on=s,on}var cn,ga;function Hd(){if(ga)return cn;ga=1;var r=Yt(),e=Ci(),t=hc(),n=200;function i(s,a){var c=this.__data__;if(c instanceof r){var u=c.__data__;if(!e||u.length<n-1)return u.push([s,a]),this.size=++c.size,this;c=this.__data__=new t(u)}return c.set(s,a),this.size=c.size,this}return cn=i,cn}var un,ma;function Bd(){if(ma)return un;ma=1;var r=Yt(),e=yd(),t=vd(),n=bd(),i=Td(),s=Hd();function a(c){var u=this.__data__=new r(c);this.size=u.size}return a.prototype.clear=e,a.prototype.delete=t,a.prototype.get=n,a.prototype.has=i,a.prototype.set=s,un=a,un}var ln,_a;function jd(){if(_a)return ln;_a=1;var r="__lodash_hash_undefined__";function e(t){return this.__data__.set(t,r),this}return ln=e,ln}var hn,ya;function Gd(){if(ya)return hn;ya=1;function r(e){return this.__data__.has(e)}return hn=r,hn}var dn,va;function zd(){if(va)return dn;va=1;var r=hc(),e=jd(),t=Gd();function n(i){var s=-1,a=i==null?0:i.length;for(this.__data__=new r;++s<a;)this.add(i[s])}return n.prototype.add=n.prototype.push=e,n.prototype.has=t,dn=n,dn}var fn,ba;function Wd(){if(ba)return fn;ba=1;function r(e,t){for(var n=-1,i=e==null?0:e.length;++n<i;)if(t(e[n],n,e))return!0;return!1}return fn=r,fn}var pn,Ta;function $d(){if(Ta)return pn;Ta=1;function r(e,t){return e.has(t)}return pn=r,pn}var gn,Ia;function dc(){if(Ia)return gn;Ia=1;var r=zd(),e=Wd(),t=$d(),n=1,i=2;function s(a,c,u,l,p,f){var h=u&n,v=a.length,w=c.length;if(v!=w&&!(h&&w>v))return!1;var P=f.get(a),k=f.get(c);if(P&&k)return P==c&&k==a;var S=-1,I=!0,N=u&i?new r:void 0;for(f.set(a,c),f.set(c,a);++S<v;){var y=a[S],L=c[S];if(l)var C=h?l(L,y,S,c,a,f):l(y,L,S,a,c,f);if(C!==void 0){if(C)continue;I=!1;break}if(N){if(!e(c,function(O,q){if(!t(N,q)&&(y===O||p(y,O,u,l,f)))return N.push(q)})){I=!1;break}}else if(!(y===L||p(y,L,u,l,f))){I=!1;break}}return f.delete(a),f.delete(c),I}return gn=s,gn}var mn,Ea;function Vd(){if(Ea)return mn;Ea=1;var r=ve(),e=r.Uint8Array;return mn=e,mn}var _n,wa;function Kd(){if(wa)return _n;wa=1;function r(e){var t=-1,n=Array(e.size);return e.forEach(function(i,s){n[++t]=[s,i]}),n}return _n=r,_n}var yn,Aa;function Yd(){if(Aa)return yn;Aa=1;function r(e){var t=-1,n=Array(e.size);return e.forEach(function(i){n[++t]=i}),n}return yn=r,yn}var vn,Sa;function Jd(){if(Sa)return vn;Sa=1;var r=Si(),e=Vd(),t=ac(),n=dc(),i=Kd(),s=Yd(),a=1,c=2,u="[object Boolean]",l="[object Date]",p="[object Error]",f="[object Map]",h="[object Number]",v="[object RegExp]",w="[object Set]",P="[object String]",k="[object Symbol]",S="[object ArrayBuffer]",I="[object DataView]",N=r?r.prototype:void 0,y=N?N.valueOf:void 0;function L(C,O,q,j,K,b,W){switch(q){case I:if(C.byteLength!=O.byteLength||C.byteOffset!=O.byteOffset)return!1;C=C.buffer,O=O.buffer;case S:return!(C.byteLength!=O.byteLength||!b(new e(C),new e(O)));case u:case l:case h:return t(+C,+O);case p:return C.name==O.name&&C.message==O.message;case v:case P:return C==O+"";case f:var H=i;case w:var se=j&a;if(H||(H=s),C.size!=O.size&&!se)return!1;var be=W.get(C);if(be)return be==O;j|=c,W.set(C,O);var Pe=n(H(C),H(O),j,K,b,W);return W.delete(C),Pe;case k:if(y)return y.call(C)==y.call(O)}return!1}return vn=L,vn}var bn,Ca;function Xd(){if(Ca)return bn;Ca=1;function r(e,t){for(var n=-1,i=t.length,s=e.length;++n<i;)e[s+n]=t[n];return e}return bn=r,bn}var Tn,Ra;function Ri(){if(Ra)return Tn;Ra=1;var r=Array.isArray;return Tn=r,Tn}var In,Oa;function Zd(){if(Oa)return In;Oa=1;var r=Xd(),e=Ri();function t(n,i,s){var a=i(n);return e(n)?a:r(a,s(n))}return In=t,In}var En,Pa;function Qd(){if(Pa)return En;Pa=1;function r(e,t){for(var n=-1,i=e==null?0:e.length,s=0,a=[];++n<i;){var c=e[n];t(c,n,e)&&(a[s++]=c)}return a}return En=r,En}var wn,ka;function ef(){if(ka)return wn;ka=1;function r(){return[]}return wn=r,wn}var An,Da;function tf(){if(Da)return An;Da=1;var r=Qd(),e=ef(),t=Object.prototype,n=t.propertyIsEnumerable,i=Object.getOwnPropertySymbols,s=i?function(a){return a==null?[]:(a=Object(a),r(i(a),function(c){return n.call(a,c)}))}:e;return An=s,An}var Sn,Na;function rf(){if(Na)return Sn;Na=1;function r(e,t){for(var n=-1,i=Array(e);++n<e;)i[n]=t(n);return i}return Sn=r,Sn}var Cn,La;function Qt(){if(La)return Cn;La=1;function r(e){return e!=null&&typeof e=="object"}return Cn=r,Cn}var Rn,Ma;function nf(){if(Ma)return Rn;Ma=1;var r=Jt(),e=Qt(),t="[object Arguments]";function n(i){return e(i)&&r(i)==t}return Rn=n,Rn}var On,Ua;function sf(){if(Ua)return On;Ua=1;var r=nf(),e=Qt(),t=Object.prototype,n=t.hasOwnProperty,i=t.propertyIsEnumerable,s=r((function(){return arguments})())?r:function(a){return e(a)&&n.call(a,"callee")&&!i.call(a,"callee")};return On=s,On}var ct={exports:{}},Pn,xa;function af(){if(xa)return Pn;xa=1;function r(){return!1}return Pn=r,Pn}ct.exports;var qa;function fc(){return qa||(qa=1,(function(r,e){var t=ve(),n=af(),i=e&&!e.nodeType&&e,s=i&&!0&&r&&!r.nodeType&&r,a=s&&s.exports===i,c=a?t.Buffer:void 0,u=c?c.isBuffer:void 0,l=u||n;r.exports=l})(ct,ct.exports)),ct.exports}var kn,Fa;function of(){if(Fa)return kn;Fa=1;var r=9007199254740991,e=/^(?:0|[1-9]\d*)$/;function t(n,i){var s=typeof n;return i=i??r,!!i&&(s=="number"||s!="symbol"&&e.test(n))&&n>-1&&n%1==0&&n<i}return kn=t,kn}var Dn,Ha;function pc(){if(Ha)return Dn;Ha=1;var r=9007199254740991;function e(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=r}return Dn=e,Dn}var Nn,Ba;function cf(){if(Ba)return Nn;Ba=1;var r=Jt(),e=pc(),t=Qt(),n="[object Arguments]",i="[object Array]",s="[object Boolean]",a="[object Date]",c="[object Error]",u="[object Function]",l="[object Map]",p="[object Number]",f="[object Object]",h="[object RegExp]",v="[object Set]",w="[object String]",P="[object WeakMap]",k="[object ArrayBuffer]",S="[object DataView]",I="[object Float32Array]",N="[object Float64Array]",y="[object Int8Array]",L="[object Int16Array]",C="[object Int32Array]",O="[object Uint8Array]",q="[object Uint8ClampedArray]",j="[object Uint16Array]",K="[object Uint32Array]",b={};b[I]=b[N]=b[y]=b[L]=b[C]=b[O]=b[q]=b[j]=b[K]=!0,b[n]=b[i]=b[k]=b[s]=b[S]=b[a]=b[c]=b[u]=b[l]=b[p]=b[f]=b[h]=b[v]=b[w]=b[P]=!1;function W(H){return t(H)&&e(H.length)&&!!b[r(H)]}return Nn=W,Nn}var Ln,ja;function uf(){if(ja)return Ln;ja=1;function r(e){return function(t){return e(t)}}return Ln=r,Ln}var ut={exports:{}};ut.exports;var Ga;function lf(){return Ga||(Ga=1,(function(r,e){var t=oc(),n=e&&!e.nodeType&&e,i=n&&!0&&r&&!r.nodeType&&r,s=i&&i.exports===n,a=s&&t.process,c=(function(){try{var u=i&&i.require&&i.require("util").types;return u||a&&a.binding&&a.binding("util")}catch{}})();r.exports=c})(ut,ut.exports)),ut.exports}var Mn,za;function gc(){if(za)return Mn;za=1;var r=cf(),e=uf(),t=lf(),n=t&&t.isTypedArray,i=n?e(n):r;return Mn=i,Mn}var Un,Wa;function hf(){if(Wa)return Un;Wa=1;var r=rf(),e=sf(),t=Ri(),n=fc(),i=of(),s=gc(),a=Object.prototype,c=a.hasOwnProperty;function u(l,p){var f=t(l),h=!f&&e(l),v=!f&&!h&&n(l),w=!f&&!h&&!v&&s(l),P=f||h||v||w,k=P?r(l.length,String):[],S=k.length;for(var I in l)(p||c.call(l,I))&&!(P&&(I=="length"||v&&(I=="offset"||I=="parent")||w&&(I=="buffer"||I=="byteLength"||I=="byteOffset")||i(I,S)))&&k.push(I);return k}return Un=u,Un}var xn,$a;function df(){if($a)return xn;$a=1;var r=Object.prototype;function e(t){var n=t&&t.constructor,i=typeof n=="function"&&n.prototype||r;return t===i}return xn=e,xn}var qn,Va;function ff(){if(Va)return qn;Va=1;function r(e,t){return function(n){return e(t(n))}}return qn=r,qn}var Fn,Ka;function pf(){if(Ka)return Fn;Ka=1;var r=ff(),e=r(Object.keys,Object);return Fn=e,Fn}var Hn,Ya;function gf(){if(Ya)return Hn;Ya=1;var r=df(),e=pf(),t=Object.prototype,n=t.hasOwnProperty;function i(s){if(!r(s))return e(s);var a=[];for(var c in Object(s))n.call(s,c)&&c!="constructor"&&a.push(c);return a}return Hn=i,Hn}var Bn,Ja;function mf(){if(Ja)return Bn;Ja=1;var r=uc(),e=pc();function t(n){return n!=null&&e(n.length)&&!r(n)}return Bn=t,Bn}var jn,Xa;function _f(){if(Xa)return jn;Xa=1;var r=hf(),e=gf(),t=mf();function n(i){return t(i)?r(i):e(i)}return jn=n,jn}var Gn,Za;function yf(){if(Za)return Gn;Za=1;var r=Zd(),e=tf(),t=_f();function n(i){return r(i,t,e)}return Gn=n,Gn}var zn,Qa;function vf(){if(Qa)return zn;Qa=1;var r=yf(),e=1,t=Object.prototype,n=t.hasOwnProperty;function i(s,a,c,u,l,p){var f=c&e,h=r(s),v=h.length,w=r(a),P=w.length;if(v!=P&&!f)return!1;for(var k=v;k--;){var S=h[k];if(!(f?S in a:n.call(a,S)))return!1}var I=p.get(s),N=p.get(a);if(I&&N)return I==a&&N==s;var y=!0;p.set(s,a),p.set(a,s);for(var L=f;++k<v;){S=h[k];var C=s[S],O=a[S];if(u)var q=f?u(O,C,S,a,s,p):u(C,O,S,s,a,p);if(!(q===void 0?C===O||l(C,O,c,u,p):q)){y=!1;break}L||(L=S=="constructor")}if(y&&!L){var j=s.constructor,K=a.constructor;j!=K&&"constructor"in s&&"constructor"in a&&!(typeof j=="function"&&j instanceof j&&typeof K=="function"&&K instanceof K)&&(y=!1)}return p.delete(s),p.delete(a),y}return zn=i,zn}var Wn,eo;function bf(){if(eo)return Wn;eo=1;var r=Ze(),e=ve(),t=r(e,"DataView");return Wn=t,Wn}var $n,to;function Tf(){if(to)return $n;to=1;var r=Ze(),e=ve(),t=r(e,"Promise");return $n=t,$n}var Vn,ro;function If(){if(ro)return Vn;ro=1;var r=Ze(),e=ve(),t=r(e,"Set");return Vn=t,Vn}var Kn,no;function Ef(){if(no)return Kn;no=1;var r=Ze(),e=ve(),t=r(e,"WeakMap");return Kn=t,Kn}var Yn,io;function wf(){if(io)return Yn;io=1;var r=bf(),e=Ci(),t=Tf(),n=If(),i=Ef(),s=Jt(),a=lc(),c="[object Map]",u="[object Object]",l="[object Promise]",p="[object Set]",f="[object WeakMap]",h="[object DataView]",v=a(r),w=a(e),P=a(t),k=a(n),S=a(i),I=s;return(r&&I(new r(new ArrayBuffer(1)))!=h||e&&I(new e)!=c||t&&I(t.resolve())!=l||n&&I(new n)!=p||i&&I(new i)!=f)&&(I=function(N){var y=s(N),L=y==u?N.constructor:void 0,C=L?a(L):"";if(C)switch(C){case v:return h;case w:return c;case P:return l;case k:return p;case S:return f}return y}),Yn=I,Yn}var Jn,so;function Af(){if(so)return Jn;so=1;var r=Bd(),e=dc(),t=Jd(),n=vf(),i=wf(),s=Ri(),a=fc(),c=gc(),u=1,l="[object Arguments]",p="[object Array]",f="[object Object]",h=Object.prototype,v=h.hasOwnProperty;function w(P,k,S,I,N,y){var L=s(P),C=s(k),O=L?p:i(P),q=C?p:i(k);O=O==l?f:O,q=q==l?f:q;var j=O==f,K=q==f,b=O==q;if(b&&a(P)){if(!a(k))return!1;L=!0,j=!1}if(b&&!j)return y||(y=new r),L||c(P)?e(P,k,S,I,N,y):t(P,k,O,S,I,N,y);if(!(S&u)){var W=j&&v.call(P,"__wrapped__"),H=K&&v.call(k,"__wrapped__");if(W||H){var se=W?P.value():P,be=H?k.value():k;return y||(y=new r),N(se,be,S,I,y)}}return b?(y||(y=new r),n(P,k,S,I,N,y)):!1}return Jn=w,Jn}var Xn,ao;function Sf(){if(ao)return Xn;ao=1;var r=Af(),e=Qt();function t(n,i,s,a,c){return n===i?!0:n==null||i==null||!e(n)&&!e(i)?n!==n&&i!==i:r(n,i,s,a,t,c)}return Xn=t,Xn}var Zn,oo;function Qf(){if(oo)return Zn;oo=1;var r=Sf();function e(t,n){return r(t,n)}return Zn=e,Zn}/*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE */const{entries:mc,setPrototypeOf:co,isFrozen:Cf,getPrototypeOf:Rf,getOwnPropertyDescriptor:Of}=Object;let{freeze:X,seal:te,create:_c}=Object,{apply:di,construct:fi}=typeof Reflect<"u"&&Reflect;X||(X=function(e){return e});te||(te=function(e){return e});di||(di=function(e,t,n){return e.apply(t,n)});fi||(fi=function(e,t){return new e(...t)});const Pt=Z(Array.prototype.forEach),Pf=Z(Array.prototype.lastIndexOf),uo=Z(Array.prototype.pop),nt=Z(Array.prototype.push),kf=Z(Array.prototype.splice),Ut=Z(String.prototype.toLowerCase),Qn=Z(String.prototype.toString),lo=Z(String.prototype.match),it=Z(String.prototype.replace),Df=Z(String.prototype.indexOf),Nf=Z(String.prototype.trim),re=Z(Object.prototype.hasOwnProperty),Y=Z(RegExp.prototype.test),st=Lf(TypeError);function Z(r){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];return di(r,e,n)}}function Lf(r){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return fi(r,t)}}function D(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ut;co&&co(r,null);let n=e.length;for(;n--;){let i=e[n];if(typeof i=="string"){const s=t(i);s!==i&&(Cf(e)||(e[n]=s),i=s)}r[i]=!0}return r}function Mf(r){for(let e=0;e<r.length;e++)re(r,e)||(r[e]=null);return r}function pe(r){const e=_c(null);for(const[t,n]of mc(r))re(r,t)&&(Array.isArray(n)?e[t]=Mf(n):n&&typeof n=="object"&&n.constructor===Object?e[t]=pe(n):e[t]=n);return e}function at(r,e){for(;r!==null;){const n=Of(r,e);if(n){if(n.get)return Z(n.get);if(typeof n.value=="function")return Z(n.value)}r=Rf(r)}function t(){return null}return t}const ho=X(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ei=X(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ti=X(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Uf=X(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ri=X(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),xf=X(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),fo=X(["#text"]),po=X(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ni=X(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),go=X(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),kt=X(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qf=te(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ff=te(/<%[\w\W]*|[\w\W]*%>/gm),Hf=te(/\$\{[\w\W]*/gm),Bf=te(/^data-[\-\w.\u00B7-\uFFFF]+$/),jf=te(/^aria-[\-\w]+$/),yc=te(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gf=te(/^(?:\w+script|data):/i),zf=te(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),vc=te(/^html$/i),Wf=te(/^[a-z][.\w]*(-[.\w]+)+$/i);var mo=Object.freeze({__proto__:null,ARIA_ATTR:jf,ATTR_WHITESPACE:zf,CUSTOM_ELEMENT:Wf,DATA_ATTR:Bf,DOCTYPE_NAME:vc,ERB_EXPR:Ff,IS_ALLOWED_URI:yc,IS_SCRIPT_OR_DATA:Gf,MUSTACHE_EXPR:qf,TMPLIT_EXPR:Hf});const ot={element:1,text:3,progressingInstruction:7,comment:8,document:9},$f=function(){return typeof window>"u"?null:window},Vf=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null;const i="data-tt-policy-suffix";t&&t.hasAttribute(i)&&(n=t.getAttribute(i));const s="dompurify"+(n?"#"+n:"");try{return e.createPolicy(s,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},_o=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function bc(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$f();const e=_=>bc(_);if(e.version="3.2.6",e.removed=[],!r||!r.document||r.document.nodeType!==ot.document||!r.Element)return e.isSupported=!1,e;let{document:t}=r;const n=t,i=n.currentScript,{DocumentFragment:s,HTMLTemplateElement:a,Node:c,Element:u,NodeFilter:l,NamedNodeMap:p=r.NamedNodeMap||r.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:v}=r,w=u.prototype,P=at(w,"cloneNode"),k=at(w,"remove"),S=at(w,"nextSibling"),I=at(w,"childNodes"),N=at(w,"parentNode");if(typeof a=="function"){const _=t.createElement("template");_.content&&_.content.ownerDocument&&(t=_.content.ownerDocument)}let y,L="";const{implementation:C,createNodeIterator:O,createDocumentFragment:q,getElementsByTagName:j}=t,{importNode:K}=n;let b=_o();e.isSupported=typeof mc=="function"&&typeof N=="function"&&C&&C.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:W,ERB_EXPR:H,TMPLIT_EXPR:se,DATA_ATTR:be,ARIA_ATTR:Pe,IS_SCRIPT_OR_DATA:Qe,ATTR_WHITESPACE:g,CUSTOM_ELEMENT:E}=mo;let{IS_ALLOWED_URI:A}=mo,R=null;const B=D({},[...ho,...ei,...ti,...ri,...fo]);let F=null;const ae=D({},[...po,...ni,...go,...kt]);let U=Object.seal(_c(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ee=null,Te=null,Oi=!0,er=!0,Pi=!1,ki=!0,Ue=!1,Tt=!0,ke=!1,tr=!1,rr=!1,xe=!1,It=!1,Et=!1,Di=!0,Ni=!1;const Tc="user-content-";let nr=!0,et=!1,qe={},Fe=null;const Li=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Mi=null;const Ui=D({},["audio","video","img","source","image","track"]);let ir=null;const xi=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),wt="http://www.w3.org/1998/Math/MathML",At="http://www.w3.org/2000/svg",he="http://www.w3.org/1999/xhtml";let He=he,sr=!1,ar=null;const Ic=D({},[wt,At,he],Qn);let St=D({},["mi","mo","mn","ms","mtext"]),Ct=D({},["annotation-xml"]);const Ec=D({},["title","style","font","a","script"]);let tt=null;const wc=["application/xhtml+xml","text/html"],Ac="text/html";let z=null,Be=null;const Sc=t.createElement("form"),qi=function(o){return o instanceof RegExp||o instanceof Function},or=function(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Be&&Be===o)){if((!o||typeof o!="object")&&(o={}),o=pe(o),tt=wc.indexOf(o.PARSER_MEDIA_TYPE)===-1?Ac:o.PARSER_MEDIA_TYPE,z=tt==="application/xhtml+xml"?Qn:Ut,R=re(o,"ALLOWED_TAGS")?D({},o.ALLOWED_TAGS,z):B,F=re(o,"ALLOWED_ATTR")?D({},o.ALLOWED_ATTR,z):ae,ar=re(o,"ALLOWED_NAMESPACES")?D({},o.ALLOWED_NAMESPACES,Qn):Ic,ir=re(o,"ADD_URI_SAFE_ATTR")?D(pe(xi),o.ADD_URI_SAFE_ATTR,z):xi,Mi=re(o,"ADD_DATA_URI_TAGS")?D(pe(Ui),o.ADD_DATA_URI_TAGS,z):Ui,Fe=re(o,"FORBID_CONTENTS")?D({},o.FORBID_CONTENTS,z):Li,ee=re(o,"FORBID_TAGS")?D({},o.FORBID_TAGS,z):pe({}),Te=re(o,"FORBID_ATTR")?D({},o.FORBID_ATTR,z):pe({}),qe=re(o,"USE_PROFILES")?o.USE_PROFILES:!1,Oi=o.ALLOW_ARIA_ATTR!==!1,er=o.ALLOW_DATA_ATTR!==!1,Pi=o.ALLOW_UNKNOWN_PROTOCOLS||!1,ki=o.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ue=o.SAFE_FOR_TEMPLATES||!1,Tt=o.SAFE_FOR_XML!==!1,ke=o.WHOLE_DOCUMENT||!1,xe=o.RETURN_DOM||!1,It=o.RETURN_DOM_FRAGMENT||!1,Et=o.RETURN_TRUSTED_TYPE||!1,rr=o.FORCE_BODY||!1,Di=o.SANITIZE_DOM!==!1,Ni=o.SANITIZE_NAMED_PROPS||!1,nr=o.KEEP_CONTENT!==!1,et=o.IN_PLACE||!1,A=o.ALLOWED_URI_REGEXP||yc,He=o.NAMESPACE||he,St=o.MATHML_TEXT_INTEGRATION_POINTS||St,Ct=o.HTML_INTEGRATION_POINTS||Ct,U=o.CUSTOM_ELEMENT_HANDLING||{},o.CUSTOM_ELEMENT_HANDLING&&qi(o.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(U.tagNameCheck=o.CUSTOM_ELEMENT_HANDLING.tagNameCheck),o.CUSTOM_ELEMENT_HANDLING&&qi(o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(U.attributeNameCheck=o.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),o.CUSTOM_ELEMENT_HANDLING&&typeof o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(U.allowCustomizedBuiltInElements=o.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ue&&(er=!1),It&&(xe=!0),qe&&(R=D({},fo),F=[],qe.html===!0&&(D(R,ho),D(F,po)),qe.svg===!0&&(D(R,ei),D(F,ni),D(F,kt)),qe.svgFilters===!0&&(D(R,ti),D(F,ni),D(F,kt)),qe.mathMl===!0&&(D(R,ri),D(F,go),D(F,kt))),o.ADD_TAGS&&(R===B&&(R=pe(R)),D(R,o.ADD_TAGS,z)),o.ADD_ATTR&&(F===ae&&(F=pe(F)),D(F,o.ADD_ATTR,z)),o.ADD_URI_SAFE_ATTR&&D(ir,o.ADD_URI_SAFE_ATTR,z),o.FORBID_CONTENTS&&(Fe===Li&&(Fe=pe(Fe)),D(Fe,o.FORBID_CONTENTS,z)),nr&&(R["#text"]=!0),ke&&D(R,["html","head","body"]),R.table&&(D(R,["tbody"]),delete ee.tbody),o.TRUSTED_TYPES_POLICY){if(typeof o.TRUSTED_TYPES_POLICY.createHTML!="function")throw st('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof o.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw st('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');y=o.TRUSTED_TYPES_POLICY,L=y.createHTML("")}else y===void 0&&(y=Vf(v,i)),y!==null&&typeof L=="string"&&(L=y.createHTML(""));X&&X(o),Be=o}},Fi=D({},[...ei,...ti,...Uf]),Hi=D({},[...ri,...xf]),Cc=function(o){let d=N(o);(!d||!d.tagName)&&(d={namespaceURI:He,tagName:"template"});const m=Ut(o.tagName),x=Ut(d.tagName);return ar[o.namespaceURI]?o.namespaceURI===At?d.namespaceURI===he?m==="svg":d.namespaceURI===wt?m==="svg"&&(x==="annotation-xml"||St[x]):!!Fi[m]:o.namespaceURI===wt?d.namespaceURI===he?m==="math":d.namespaceURI===At?m==="math"&&Ct[x]:!!Hi[m]:o.namespaceURI===he?d.namespaceURI===At&&!Ct[x]||d.namespaceURI===wt&&!St[x]?!1:!Hi[m]&&(Ec[m]||!Fi[m]):!!(tt==="application/xhtml+xml"&&ar[o.namespaceURI]):!1},oe=function(o){nt(e.removed,{element:o});try{N(o).removeChild(o)}catch{k(o)}},je=function(o,d){try{nt(e.removed,{attribute:d.getAttributeNode(o),from:d})}catch{nt(e.removed,{attribute:null,from:d})}if(d.removeAttribute(o),o==="is")if(xe||It)try{oe(d)}catch{}else try{d.setAttribute(o,"")}catch{}},Bi=function(o){let d=null,m=null;if(rr)o="<remove></remove>"+o;else{const G=lo(o,/^[\r\n\t ]+/);m=G&&G[0]}tt==="application/xhtml+xml"&&He===he&&(o='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+o+"</body></html>");const x=y?y.createHTML(o):o;if(He===he)try{d=new h().parseFromString(x,tt)}catch{}if(!d||!d.documentElement){d=C.createDocument(He,"template",null);try{d.documentElement.innerHTML=sr?L:x}catch{}}const $=d.body||d.documentElement;return o&&m&&$.insertBefore(t.createTextNode(m),$.childNodes[0]||null),He===he?j.call(d,ke?"html":"body")[0]:ke?d.documentElement:$},ji=function(o){return O.call(o.ownerDocument||o,o,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},cr=function(o){return o instanceof f&&(typeof o.nodeName!="string"||typeof o.textContent!="string"||typeof o.removeChild!="function"||!(o.attributes instanceof p)||typeof o.removeAttribute!="function"||typeof o.setAttribute!="function"||typeof o.namespaceURI!="string"||typeof o.insertBefore!="function"||typeof o.hasChildNodes!="function")},Gi=function(o){return typeof c=="function"&&o instanceof c};function de(_,o,d){Pt(_,m=>{m.call(e,o,d,Be)})}const zi=function(o){let d=null;if(de(b.beforeSanitizeElements,o,null),cr(o))return oe(o),!0;const m=z(o.nodeName);if(de(b.uponSanitizeElement,o,{tagName:m,allowedTags:R}),Tt&&o.hasChildNodes()&&!Gi(o.firstElementChild)&&Y(/<[/\w!]/g,o.innerHTML)&&Y(/<[/\w!]/g,o.textContent)||o.nodeType===ot.progressingInstruction||Tt&&o.nodeType===ot.comment&&Y(/<[/\w]/g,o.data))return oe(o),!0;if(!R[m]||ee[m]){if(!ee[m]&&$i(m)&&(U.tagNameCheck instanceof RegExp&&Y(U.tagNameCheck,m)||U.tagNameCheck instanceof Function&&U.tagNameCheck(m)))return!1;if(nr&&!Fe[m]){const x=N(o)||o.parentNode,$=I(o)||o.childNodes;if($&&x){const G=$.length;for(let Q=G-1;Q>=0;--Q){const fe=P($[Q],!0);fe.__removalCount=(o.__removalCount||0)+1,x.insertBefore(fe,S(o))}}}return oe(o),!0}return o instanceof u&&!Cc(o)||(m==="noscript"||m==="noembed"||m==="noframes")&&Y(/<\/no(script|embed|frames)/i,o.innerHTML)?(oe(o),!0):(Ue&&o.nodeType===ot.text&&(d=o.textContent,Pt([W,H,se],x=>{d=it(d,x," ")}),o.textContent!==d&&(nt(e.removed,{element:o.cloneNode()}),o.textContent=d)),de(b.afterSanitizeElements,o,null),!1)},Wi=function(o,d,m){if(Di&&(d==="id"||d==="name")&&(m in t||m in Sc))return!1;if(!(er&&!Te[d]&&Y(be,d))){if(!(Oi&&Y(Pe,d))){if(!F[d]||Te[d]){if(!($i(o)&&(U.tagNameCheck instanceof RegExp&&Y(U.tagNameCheck,o)||U.tagNameCheck instanceof Function&&U.tagNameCheck(o))&&(U.attributeNameCheck instanceof RegExp&&Y(U.attributeNameCheck,d)||U.attributeNameCheck instanceof Function&&U.attributeNameCheck(d))||d==="is"&&U.allowCustomizedBuiltInElements&&(U.tagNameCheck instanceof RegExp&&Y(U.tagNameCheck,m)||U.tagNameCheck instanceof Function&&U.tagNameCheck(m))))return!1}else if(!ir[d]){if(!Y(A,it(m,g,""))){if(!((d==="src"||d==="xlink:href"||d==="href")&&o!=="script"&&Df(m,"data:")===0&&Mi[o])){if(!(Pi&&!Y(Qe,it(m,g,"")))){if(m)return!1}}}}}}return!0},$i=function(o){return o!=="annotation-xml"&&lo(o,E)},Vi=function(o){de(b.beforeSanitizeAttributes,o,null);const{attributes:d}=o;if(!d||cr(o))return;const m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:F,forceKeepAttr:void 0};let x=d.length;for(;x--;){const $=d[x],{name:G,namespaceURI:Q,value:fe}=$,rt=z(G),ur=fe;let V=G==="value"?ur:Nf(ur);if(m.attrName=rt,m.attrValue=V,m.keepAttr=!0,m.forceKeepAttr=void 0,de(b.uponSanitizeAttribute,o,m),V=m.attrValue,Ni&&(rt==="id"||rt==="name")&&(je(G,o),V=Tc+V),Tt&&Y(/((--!?|])>)|<\/(style|title)/i,V)){je(G,o);continue}if(m.forceKeepAttr)continue;if(!m.keepAttr){je(G,o);continue}if(!ki&&Y(/\/>/i,V)){je(G,o);continue}Ue&&Pt([W,H,se],Yi=>{V=it(V,Yi," ")});const Ki=z(o.nodeName);if(!Wi(Ki,rt,V)){je(G,o);continue}if(y&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!Q)switch(v.getAttributeType(Ki,rt)){case"TrustedHTML":{V=y.createHTML(V);break}case"TrustedScriptURL":{V=y.createScriptURL(V);break}}if(V!==ur)try{Q?o.setAttributeNS(Q,G,V):o.setAttribute(G,V),cr(o)?oe(o):uo(e.removed)}catch{je(G,o)}}de(b.afterSanitizeAttributes,o,null)},Rc=function _(o){let d=null;const m=ji(o);for(de(b.beforeSanitizeShadowDOM,o,null);d=m.nextNode();)de(b.uponSanitizeShadowNode,d,null),zi(d),Vi(d),d.content instanceof s&&_(d.content);de(b.afterSanitizeShadowDOM,o,null)};return e.sanitize=function(_){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},d=null,m=null,x=null,$=null;if(sr=!_,sr&&(_="<!-->"),typeof _!="string"&&!Gi(_))if(typeof _.toString=="function"){if(_=_.toString(),typeof _!="string")throw st("dirty is not a string, aborting")}else throw st("toString is not a function");if(!e.isSupported)return _;if(tr||or(o),e.removed=[],typeof _=="string"&&(et=!1),et){if(_.nodeName){const fe=z(_.nodeName);if(!R[fe]||ee[fe])throw st("root node is forbidden and cannot be sanitized in-place")}}else if(_ instanceof c)d=Bi("<!---->"),m=d.ownerDocument.importNode(_,!0),m.nodeType===ot.element&&m.nodeName==="BODY"||m.nodeName==="HTML"?d=m:d.appendChild(m);else{if(!xe&&!Ue&&!ke&&_.indexOf("<")===-1)return y&&Et?y.createHTML(_):_;if(d=Bi(_),!d)return xe?null:Et?L:""}d&&rr&&oe(d.firstChild);const G=ji(et?_:d);for(;x=G.nextNode();)zi(x),Vi(x),x.content instanceof s&&Rc(x.content);if(et)return _;if(xe){if(It)for($=q.call(d.ownerDocument);d.firstChild;)$.appendChild(d.firstChild);else $=d;return(F.shadowroot||F.shadowrootmode)&&($=K.call(n,$,!0)),$}let Q=ke?d.outerHTML:d.innerHTML;return ke&&R["!doctype"]&&d.ownerDocument&&d.ownerDocument.doctype&&d.ownerDocument.doctype.name&&Y(vc,d.ownerDocument.doctype.name)&&(Q="<!DOCTYPE "+d.ownerDocument.doctype.name+`>
`+Q),Ue&&Pt([W,H,se],fe=>{Q=it(Q,fe," ")}),y&&Et?y.createHTML(Q):Q},e.setConfig=function(){let _=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};or(_),tr=!0},e.clearConfig=function(){Be=null,tr=!1},e.isValidAttribute=function(_,o,d){Be||or({});const m=z(_),x=z(o);return Wi(m,x,d)},e.addHook=function(_,o){typeof o=="function"&&nt(b[_],o)},e.removeHook=function(_,o){if(o!==void 0){const d=Pf(b[_],o);return d===-1?void 0:kf(b[_],d,1)[0]}return uo(b[_])},e.removeHooks=function(_){b[_]=[]},e.removeAllHooks=function(){b=_o()},e}var ep=bc();export{we as G,Yf as a,Jf as c,Zf as g,rl as i,ep as p,Qf as r,Xf as s};
