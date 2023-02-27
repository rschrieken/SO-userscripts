// ==UserScript==
// @name        Connected Users
// @version     1.2.0
// @author      Martijn Pieters
// @description **Moderator-only**. Hightlights users in the IP cross section view that overlap in time
// @homepage    https://github.com/mjpieters/SO-userscripts
// @supportURL  https://github.com/mjpieters/SO-userscripts/issues
// @match       *://stackoverflow.com/admin/xref-user-ips/*
// @match       *://serverfault.com/admin/xref-user-ips/*
// @match       *://superuser.com/admin/xref-user-ips/*
// @match       *://askubuntu.com/admin/xref-user-ips/*
// @match       *://mathoverflow.net/admin/xref-user-ips/*
// @match       *://*.stackexchange.com/admin/xref-user-ips/*
// @namespace   https://github.com/mjpieters/SO-userscripts
// @downloadURL https://github.com/mjpieters/SO-userscripts/raw/v1.2.0/dist/connected-users.user.js
// @updateURL   https://github.com/mjpieters/SO-userscripts/raw/main/dist/connected-users.user.js
// ==/UserScript==

(()=>{"use strict";const e="us-mod-connected-users",t=new Promise((e=>{StackExchange.ready((()=>e(null)))})),s=new Map;async function n(e,...[t]){const n=new URL(`https://api.stackexchange.com/2.3/${e}`);n.search=new URLSearchParams({...t&&{filter:t},key:"rSgJSoND0c32iHgumlM8vg((",site:location.hostname.replace(/(\.stackexchange)?\.com$/,""),pagesize:"100"}).toString();const r=(s.get(e)??0)-(new Date).getTime();var o;r>0&&await(o=r,new Promise((e=>setTimeout(e,o))));const a=await fetch(n.toString()),i=await a.json();if(s.set(e,(new Date).getTime()+(i.backoff||0)??0),i.error_id)throw new Error(`${i.error_name} (${i.error_id}): ${i.error_message}`);return i.items}function r(e){return e.replace(/(?:[_-])([a-z0-9])/g,((e,t)=>t.toUpperCase()))}const o='<svg aria-hidden="true" class="svg-icon iconEye" width="18" height="18"  viewBox="0 0 18 18"><path  d="M9.06 3C4 3 1 9 1 9s3 6 8.06 6C14 15 17 9 17 9s-3-6-7.94-6ZM9 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2Z"/></svg>',a='<svg aria-hidden="true" class="svg-icon iconEyeOff" width="18" height="18"  viewBox="0 0 18 18"><path  d="m5.02 9.44-2.22 2.2C1.63 10.25 1 9 1 9s3-6 8.06-6c.75 0 1.46.14 2.12.38L9.5 5.03a4.01 4.01 0 0 0-4.48 4.41Zm2.03 3.05A3.99 3.99 0 0 0 13 9c0-.73-.2-1.41-.54-2l-1.51 1.54a2 2 0 0 1-2.38 2.42l-1.52 1.53Zm7.11-7.22A14.8 14.8 0 0 1 17 9s-3 6-7.94 6c-1.31 0-2.48-.4-3.5-1l-1.97 2L2 14.41 14.59 2 16 3.41l-1.84 1.86Z"/></svg>';function i(e){return e.replace(/(?:[_-])([a-z0-9])/g,((e,t)=>t.toUpperCase()))}function c(e){return e.charAt(0).toUpperCase()+e.slice(1)}function l(e,t){const s=d(e);return Array.from(s.reduce(((e,s)=>(function(e,t){const s=e[t];return Array.isArray(s)?s:[]}(s,t).forEach((t=>e.add(t))),e)),new Set))}function d(e){const t=[];for(;e;)t.push(e),e=Object.getPrototypeOf(e);return t.reverse()}function u(e){return e.reduce(((e,[t,s])=>Object.assign(Object.assign({},e),{[t]:s})),{})}function h([e,t],s){return function(e){const t=`${n=e.token,n.replace(/([A-Z])/g,((e,t)=>`-${t.toLowerCase()}`))}-value`,s=function(e){const t=function(e){const t=g(e.typeObject.type);if(!t)return;const s=p(e.typeObject.default);if(t!==s){throw new Error(`The specified default value for the Stimulus Value "${e.controller?`${e.controller}.${e.token}`:e.token}" must match the defined type "${t}". The provided default value of "${e.typeObject.default}" is of type "${s}".`)}return t}({controller:e.controller,token:e.token,typeObject:e.typeDefinition}),s=p(e.typeDefinition),n=g(e.typeDefinition),r=t||s||n;if(r)return r;throw new Error(`Unknown value type "${e.controller?`${e.controller}.${e.typeDefinition}`:e.token}" for "${e.token}" value`)}(e);var n;return{type:s,key:t,name:i(t),get defaultValue(){return function(e){const t=g(e);if(t)return f[t];const s=e.default;return void 0!==s?s:e}(e.typeDefinition)},get hasCustomDefaultValue(){return void 0!==p(e.typeDefinition)},reader:b[s],writer:m[s]||m.default}}({controller:s,token:e,typeDefinition:t})}function g(e){switch(e){case Array:return"array";case Boolean:return"boolean";case Number:return"number";case Object:return"object";case String:return"string"}}function p(e){switch(typeof e){case"boolean":return"boolean";case"number":return"number";case"string":return"string"}return Array.isArray(e)?"array":"[object Object]"===Object.prototype.toString.call(e)?"object":void 0}"function"==typeof Object.getOwnPropertySymbols||Object.getOwnPropertyNames,(()=>{try{!function(){const e=function(e){function t(){return Reflect.construct(e,arguments,new.target)}return t.prototype=Object.create(e.prototype,{constructor:{value:t}}),Reflect.setPrototypeOf(t,e),t}((function(){this.a.call(this)}));e.prototype.a=function(){},new e}()}catch(e){return e=>class extends e{}}})(),Object.assign(Object.assign({enter:"Enter",tab:"Tab",esc:"Escape",space:" ",up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",home:"Home",end:"End"},u("abcdefghijklmnopqrstuvwxyz".split("").map((e=>[e,e])))),u("0123456789".split("").map((e=>[e,e]))));const f={get array(){return[]},boolean:!1,number:0,get object(){return{}},string:""},b={array(e){const t=JSON.parse(e);if(!Array.isArray(t))throw new TypeError(`expected value of type "array" but instead got value "${e}" of type "${p(t)}"`);return t},boolean:e=>!("0"==e||"false"==String(e).toLowerCase()),number:e=>Number(e),object(e){const t=JSON.parse(e);if(null===t||"object"!=typeof t||Array.isArray(t))throw new TypeError(`expected value of type "object" but instead got value "${e}" of type "${p(t)}"`);return t},string:e=>e},m={default:function(e){return`${e}`},array:v,object:v};function v(e){return JSON.stringify(e)}class _{constructor(e){this.context=e}static get shouldLoad(){return!0}static afterLoad(e,t){}get application(){return this.context.application}get scope(){return this.context.scope}get element(){return this.scope.element}get identifier(){return this.scope.identifier}get targets(){return this.scope.targets}get outlets(){return this.scope.outlets}get classes(){return this.scope.classes}get data(){return this.scope.data}initialize(){}connect(){}disconnect(){}dispatch(e,{target:t=this.element,detail:s={},prefix:n=this.identifier,bubbles:r=!0,cancelable:o=!0}={}){const a=new CustomEvent(n?`${n}:${e}`:e,{detail:s,bubbles:r,cancelable:o});return t.dispatchEvent(a),a}}_.blessings=[function(e){return l(e,"classes").reduce(((e,t)=>{return Object.assign(e,{[`${s=t}Class`]:{get(){const{classes:e}=this;if(e.has(s))return e.get(s);{const t=e.getAttributeName(s);throw new Error(`Missing attribute "${t}"`)}}},[`${s}Classes`]:{get(){return this.classes.getAll(s)}},[`has${c(s)}Class`]:{get(){return this.classes.has(s)}}});var s}),{})},function(e){return l(e,"targets").reduce(((e,t)=>{return Object.assign(e,{[`${s=t}Target`]:{get(){const e=this.targets.find(s);if(e)return e;throw new Error(`Missing target element "${s}" for "${this.identifier}" controller`)}},[`${s}Targets`]:{get(){return this.targets.findAll(s)}},[`has${c(s)}Target`]:{get(){return this.targets.has(s)}}});var s}),{})},function(e){const t=function(e,t){return d(e).reduce(((e,s)=>(e.push(...function(e,t){const s=e[t];return s?Object.keys(s).map((e=>[e,s[e]])):[]}(s,t)),e)),[])}(e,"values"),s={valueDescriptorMap:{get(){return t.reduce(((e,t)=>{const s=h(t,this.identifier),n=this.data.getAttributeNameForKey(s.key);return Object.assign(e,{[n]:s})}),{})}}};return t.reduce(((e,t)=>Object.assign(e,function(e,t){const s=h(e,void 0),{key:n,name:r,reader:o,writer:a}=s;return{[r]:{get(){const e=this.data.get(n);return null!==e?o(e):s.defaultValue},set(e){void 0===e?this.data.delete(n):this.data.set(n,a(e))}},[`has${c(r)}`]:{get(){return this.data.has(n)||s.hasCustomDefaultValue}}}}(t))),s)},function(e){return l(e,"outlets").reduce(((e,t)=>Object.assign(e,function(e){const t=i(e.replace(/--/g,"-").replace(/__/g,"_"));return{[`${t}Outlet`]:{get(){const t=this.outlets.find(e);if(t){const s=this.application.getControllerForElementAndIdentifier(t,e);if(s)return s;throw new Error(`Missing "data-controller=${e}" attribute on outlet element for "${this.identifier}" controller`)}throw new Error(`Missing outlet element "${e}" for "${this.identifier}" controller`)}},[`${t}Outlets`]:{get(){const t=this.outlets.findAll(e);return t.length>0?t.map((t=>{const s=this.application.getControllerForElementAndIdentifier(t,e);if(s)return s;console.warn(`The provided outlet element is missing the outlet controller "${e}" for "${this.identifier}"`,t)})).filter((e=>e)):[]}},[`${t}OutletElement`]:{get(){const t=this.outlets.find(e);if(t)return t;throw new Error(`Missing outlet element "${e}" for "${this.identifier}" controller`)}},[`${t}OutletElements`]:{get(){return this.outlets.findAll(e)}},[`has${c(t)}Outlet`]:{get(){return this.outlets.has(e)}}}}(t))),{})}],_.targets=[],_.outlets=[],_.values={};const $={debug:!1,logger:console,dispatchEvent:!0,eventPrefix:!0};(class extends _{}).debounces=[];class w extends class{constructor(e,t={}){var s,n,r;this.log=(e,t)=>{this.debug&&(this.logger.groupCollapsed(`%c${this.controller.identifier} %c#${e}`,"color: #3B82F6","color: unset"),this.logger.log(Object.assign({controllerId:this.controllerId},t)),this.logger.groupEnd())},this.warn=e=>{this.logger.warn(`%c${this.controller.identifier} %c${e}`,"color: #3B82F6; font-weight: bold","color: unset")},this.dispatch=(e,t={})=>{if(this.dispatchEvent){const{event:s}=t,n=function(e,t){var s={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(s[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(s[n[r]]=e[n[r]])}return s}(t,["event"]),r=this.extendedEvent(e,s||null,n);this.targetElement.dispatchEvent(r),this.log("dispatchEvent",Object.assign({eventName:r.type},n))}},this.call=(e,t={})=>{const s=this.controller[e];if("function"==typeof s)return s.call(this.controller,t)},this.extendedEvent=(e,t,s)=>{const{bubbles:n,cancelable:r,composed:o}=t||{bubbles:!0,cancelable:!0,composed:!0};return t&&Object.assign(s,{originalEvent:t}),new CustomEvent(this.composeEventName(e),{bubbles:n,cancelable:r,composed:o,detail:s})},this.composeEventName=e=>{let t=e;return!0===this.eventPrefix?t=`${this.controller.identifier}:${e}`:"string"==typeof this.eventPrefix&&(t=`${this.eventPrefix}:${e}`),t},this.debug=null!==(n=null!==(s=null==t?void 0:t.debug)&&void 0!==s?s:e.application.stimulusUseDebug)&&void 0!==n?n:$.debug,this.logger=null!==(r=null==t?void 0:t.logger)&&void 0!==r?r:$.logger,this.controller=e,this.controllerId=e.element.id||e.element.dataset.id,this.targetElement=(null==t?void 0:t.element)||e.element;const{dispatchEvent:o,eventPrefix:a}=Object.assign({},$,t);Object.assign(this,{dispatchEvent:o,eventPrefix:a}),this.controllerInitialize=e.initialize.bind(e),this.controllerConnect=e.connect.bind(e),this.controllerDisconnect=e.disconnect.bind(e)}}{constructor(e,t={}){super(e,t),this.observe=()=>{try{this.observer.observe(this.targetElement,this.options)}catch(e){this.controller.application.handleError(e,"At a minimum, one of childList, attributes, and/or characterData must be true",{})}},this.unobserve=()=>{this.observer.disconnect()},this.mutation=e=>{this.call("mutate",e),this.log("mutate",{entries:e}),this.dispatch("mutate",{entries:e})},this.targetElement=(null==t?void 0:t.element)||e.element,this.controller=e,this.options=t,this.observer=new MutationObserver(this.mutation),this.enhanceController(),this.observe()}enhanceController(){const e=this.controller.disconnect.bind(this.controller);Object.assign(this.controller,{disconnect:()=>{this.unobserve(),e()}})}}(class extends _{}).throttles=[];class y extends Stacks.StacksController{get container(){return this.hasContainerTarget?this.containerTarget:this.element}get children(){return Array.from(this.hasScopeSelectorValue?this.container.querySelectorAll(this.scopeSelectorValue):this.container.children)}connect(){((e,t={})=>{const s=new w(e,t);s.observe,s.unobserve})(this,{childList:!0,element:this.container}),this.checkEmpty()}mutate(){this.checkEmpty()}checkEmpty(){const e=this.children.length;0===e?(this.element.classList.remove(...this.notEmptyClasses),this.element.classList.add(...this.emptyClasses),this.dispatch("empty",{target:this.container})):(this.element.classList.add(...this.notEmptyClasses),this.element.classList.remove(...this.emptyClasses),this.dispatch("not-empty",{target:this.container,detail:{count:e}}))}}function k(e,t){const{[e]:s}=localStorage;return(e=>![null,void 0,""].includes(e))(s)?JSON.parse(s):t}y.controllerId="empty-dom",y.targets=["container"],y.classes=["empty","notEmpty"],y.values={scopeSelector:String};const x=e=>null!==e&&"object"==typeof e;function S(e,t){return x(e)?new Proxy(e,{get(e,s,n){const r=Reflect.get(e,s,n);return x(r)?S(r,t):r},set(e,s,n,r){const o=Reflect.set(e,s,n,r);return t(),o}}):e}function C(e,t=200){let s;return function(...n){clearTimeout(s),s=setTimeout((()=>e.apply(this,n)),t)}}const E={focusedUsers:[],xrefUIState:{openedSections:{[`${e}-connected-histogram`]:!0,[`${e}-connected`]:!1,[`${e}-focused`]:!1},showOnlyConnected:!1}},[I,U]=function(e,t){const s={storage:k(e,t),persist:()=>localStorage[e]=JSON.stringify(s.storage)};return[S(s.storage,C(s.persist)),()=>{const t=k(e,s.storage);for(const e of Object.keys(s.storage))s.storage[e]=t[e]}]}(e,E),T=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3}),O=new Intl.NumberFormat("en-US",{useGrouping:!0}),L=`.s-${e} .s-user-card { --_uc-p: 0 }`;class A{get _relativeLink(){return this.link.replace(/https?:\/\/[^/]+/,"")}get _badges(){const e=[];switch(this.is_employee&&e.push('<span class="s-badge s-badge__staff s-badge__xs">Staff</span>'),this.user_type){case"moderator":e.push('<span class="s-badge s-badge__moderator s-badge__xs">Mod</span>');break;case"team_admin":e.push('<span class="s-badge s-badge__admin s-badge__xs">Admin</span>')}return e.join(" ")}get _abbreviated_reputation(){return this.reputation<1e4?O.format(this.reputation):T.format(this.reputation).toLowerCase()}toHTML(){return`\n      <div class="s-user-card" data-uid="${this.user_id}"> \n        <a href="${this._relativeLink}" class="s-avatar s-avatar__32 s-user-card--avatar">\n          <img class="s-avatar--image" src="${this.profile_image}" />\n        </a>\n        <div class="s-user-card--info">\n          <a href="${this.link}" class="s-user-card--link"\n            >${this.display_name} ${this._badges}</a\n          >\n          <ul class="s-user-card--awards">\n            <li\n              class="s-user-card--rep"\n              title="reputation score ${O.format(this.reputation)}"\n            >\n              ${this._abbreviated_reputation}\n            </li>\n            <li class="s-award-bling s-award-bling__gold">${this.badge_counts.gold}</li>\n            <li class="s-award-bling s-award-bling__silver">${this.badge_counts.silver}</li>\n            <li class="s-award-bling s-award-bling__bronze">${this.badge_counts.bronze}</li>\n          </ul>\n        </div>\n      </div>\n    `}}class j extends A{constructor(e){super(),this.user_id=e,this.link=`/users/${e}`}toHTML(){return`\n      <div class="s-user-card s-user-card__deleted">\n        <a href="${this.link}" class="s-avatar s-avatar__32 s-user-card--avatar">\n          <span class="anonymous-gravatar s-avatar--image"></span>\n        </a>\n        <div class="s-user-card--info">\n          <a href="${this.link}" class="s-user-card--link"\n            >user${this.user_id}</a\n          >\n        </div>\n      </div>\n    `}}const M=new class{constructor(e){this.values=new Map,this.maxEntries=20,void 0!==e&&(this.maxEntries=e)}get(e){const t=this.values.get(e);return void 0!==t&&(this.values.delete(e),this.values.set(e,t)),t}put(e,t){this.values.size>=this.maxEntries&&this.values.delete(this.values.keys().next().value),this.values.set(e,t)}}(1e3);class F extends Stacks.StacksController{static afterLoad(e){document.head.insertAdjacentHTML("beforeend",`<style id="${e}-styles">${L}</style>`)}connect(){this.updateUsers()}updateUsers(){this.countTarget.innerHTML=this.userRowTargets.length.toString();const e=new Map(this.userRowTargets.reduce(((e,t)=>"true"===t.dataset.hydrated?e:[...e,[parseInt(t.dataset.uid||"0"),t]]),[]));0!==e.size&&window.requestAnimationFrame((async()=>{for await(const t of async function*(e,t=!1){let s=[];const r=new Map(e.reduce(((e,t)=>{const n=M.get(t);return n?[...e,[t,n]]:(s.push(t),e)}),[]));for(;s.length>0;){const o=s.splice(0,100);s=s.splice(100);const a=await n(`users/${o.join(";")}`,"!ACgHDY30sZUf7hsfwUhuaGWzjM9W8F5"),i=new Map(a.map((e=>[e.user_id,Object.assign(new A,e)]))),c=e.indexOf(o[o.length-1])+1;yield*e.splice(0,c).reduce(((e,s)=>{let n=r.get(s)||i.get(s);return void 0===n&&t&&(n=new j(s)),n&&M.put(s,n),n?[...e,n]:e}),[]),e=e.splice(c)}yield*e.map((e=>M.get(e)))}([...e.keys()],!0)){const s=e.get(t.user_id);if(!s)continue;const n="true"===s.dataset.userCardKeepFirst?s.querySelector(".s-user-card :first-child")?.cloneNode(!0):null,r=s.querySelector(".s-user-card");r?r.outerHTML=t.toHTML():s.innerHTML=t.toHTML();const o=s.querySelector(".s-user-card");o?.classList.add(...this.userCardClasses),n&&o?.insertAdjacentElement("afterbegin",n),s.dataset.hydrated="true"}this.dispatch("moduserquicklinks",{prefix:""}),this.dispatch("usersHydrated",{detail:this.userRowTargets.reduce(((e,t)=>null===t.querySelector("s-user-card__deleted")?[...e,parseInt(t.dataset.uid||"0")]:e),[])})}))}}F.controllerId=`${e}-user-list`,F.targets=["count","userRow"],F.classes=["userCard"];const R=`\n  .s-${e}__connected-histogram svg rect {\n    fill: var(--theme-secondary-400);\n  }\n  .s-${e}__connected-histogram svg rect.threshold,\n  .s-${e}__connected-histogram svg rect.threshold ~ rect{\n    fill: var(--theme-primary-500);\n  }\n  .s-${e}__connected-histogram svg rect:hover {\n    fill: var(--theme-primary-300) !important;\n  }\n  .s-${e}__connected-histogram svg .gridLines {\n    stroke: var(--black-150);\n  }\n  `;function H(e){const t=window.getComputedStyle(e);return{width:e.clientWidth-parseFloat(t.paddingLeft)-parseFloat(t.paddingRight),height:e.clientHeight-parseFloat(t.paddingTop)-parseFloat(t.paddingBottom)}}class q extends Stacks.StacksController{constructor(){super(...arguments),this._buckets=[],this._logScale=!1}static afterLoad(e){document.head.insertAdjacentHTML("beforeend",`<style id="${e}-styles">${R}</style>`)}connect(){this.svgTarget.addEventListener("click",this._propagateEvent.bind(this)),this.svgTarget.addEventListener("hover",this._propagateEvent.bind(this))}disconnect(){this.svgTarget.removeEventListener("click",this._propagateEvent.bind(this)),this.svgTarget.removeEventListener("hover",this._propagateEvent.bind(this))}get _svgRatio(){if(void 0===this._svgRatioCache)for(const e of function*(e){const t=[];for(let s=e;0===s?.clientWidth;s=s?.parentElement)t.unshift(s);const s=[];for(const e of t){if(0!==e.clientWidth)break;const t=e.classList;t.contains("d-none")&&(t.remove("d-none"),s.push(((e=t)=>e.add("d-none")))),t.contains("s-expandable")&&!t.contains("is-expanded")&&s.push(((e=t)=>e.remove("is-expanded")))}try{yield}finally{for(const e of s)e()}}(this.svgTarget)){const e=H(this.svgTarget);this._svgRatioCache=e.height/e.width}return this._svgRatioCache}_adjustThresholdClasses(e){this.svgTarget.querySelectorAll(".threshold").forEach((e=>e.classList.remove("threshold"))),this.svgTarget.querySelector(`rect[data-bucket-conn-count="${e}"]`)?.classList.add("threshold")}_propagateEvent(e){const t=e.target.dataset.bucketIndex;if(void 0===t)return;const s=this._buckets[parseInt(t)];"click"===e.type&&this._adjustThresholdClasses(s.connCount),this.dispatch(e.type,{detail:s})}setFrequencies(e,t=!0){if(this.svgTarget.replaceChildren(),this._buckets=[],0===e.length)return;const s=e[e.length-1].count,n=e[0].count;for(let e=s;e<=n;e++)this._buckets.push({connCount:e,userCount:0,label:`Overlapping on ${e} ip(s)`});if(e.forEach((({count:e})=>this._buckets[e-s].userCount+=1)),this._buckets.length>20){const e=Math.ceil(this._buckets.length/20),t=[];for(let s=0;s<this._buckets.length;s+=e){const n=this._buckets[s].connCount,r=this._buckets[Math.min(this._buckets.length,s+e)-1].connCount,o=this._buckets.slice(s,s+e).reduce(((e,{userCount:t})=>e+t),0);t.push({connCount:n,userCount:o,label:n!==r?`Overlapping ${n}-${r} ip(s)`:`Overlapping ${n} ip(s)`})}this._buckets=t}const[r,o]=this._buckets.reduce((([e,t],{userCount:s})=>[Math.min(e,Math.max(s,1)),Math.max(t,s)]),[1/0,1]);this._logScale=o>10*r,console.log("Histogram scale uses log?",this._logScale),this._buckets.length<=1||(this._drawBarChart(),this._adjustThresholdClasses(this._buckets[0].connCount),t&&this.dispatch("click",{detail:this._buckets[0]}))}_drawBarChart(){const e=5*this._buckets.length+1,t=e*this._svgRatio;this.svgTarget.setAttribute("viewBox",`0 0 ${e} ${t}`);const s=this._logScale?e=>e>0?Math.log10(e)||.15:e:e=>e,n=Math.max(...this._buckets.map((({userCount:e})=>e))),r=t/s(n),o=.005*t;this.svgTarget.insertAdjacentHTML("beforeend",`<g stroke-width="${o}" class="gridLines">\n        <defs><line id="gridLine" x1="0" x2="${e}" y1="0" y2="0" /></defs>\n        <use href="#gridLine" />\n       </g>`);const a=this.svgTarget.querySelector("g.gridLines"),i=this._logScale?e=>Math.pow(10,Math.floor(Math.log10(e||1))):(e,t=Math.max(Math.floor(n/10),1))=>t;let c=0;for(;c<n;){const e=t-s(c)*r;a.insertAdjacentHTML("beforeend",`<use href="#gridLine" y="${e}" />`),c+=i(c)}this._buckets.forEach(((e,n)=>{const o=s(e.userCount)*r,a=`\n        <rect\n          width="4" height="${o}"\n          x="${5*n+1}"\n          y="${t-o}"\n          data-bucket-index="${n}"\n          data-bucket-conn-count="${e.connCount}"\n        >\n          <title>${e.label}: ${e.userCount} account${1===e.userCount?"":"s"}</title>\n        </rect>\n       `;this.svgTarget.insertAdjacentHTML("beforeend",a)}))}}q.controllerId=`${e}-histogram`,q.targets=["svg"];const D=`\n  [data-controller="${e}-ip-group"] tr[data-uid].known {\n    background: var(--gold-lighter);\n  }\n  [data-controller="${e}-ip-group"] tr[data-uid].curruser.known {\n    background: var(--green-100) !important;\n  }\n  [data-controller="${e}-ip-group"] tr[data-uid].overlap {\n    background: var(--orange-200);\n  }\n  [data-controller="${e}-ip-group"] tr[data-uid] .s-btn {\n    display: none;\n  }\n  [data-controller="${e}-ip-group"] tr[data-uid].known:hover .s-focus-rm-btn, \n  [data-controller="${e}-ip-group"] tr[data-uid].known:focus .s-focus-rm-btn { \n    display: block;\n    background-color: var(--_bu-bg-hover);\n  }\n  [data-controller="${e}-ip-group"] tr[data-uid]:hover .s-focus-add-btn, \n  [data-controller="${e}-ip-group"] tr[data-uid]:focus .s-focus-add-btn { \n    display: block;\n    background-color: var(--_bu-bg-hover);\n  }\n  [data-controller="${e}-ip-group"] tr[data-uid].known:hover .s-focus-add-btn, \n  [data-controller="${e}-ip-group"] tr[data-uid].known:focus .s-focus-add-btn { \n    display: none !important;\n  }\n`,P=`\n<span class="ps-absolute h0">\n  <button class="s-btn s-btn__icon s-btn__xs s-focus-add-btn ps-relative l96 tn6"\n          data-controller="s-tooltip"\n          data-action="${e}#addFocusUser"\n          title="Add this user to the focused accounts list"\n    >${o} <span class="md:d-none">Focus</span></button></span>\n<span class="ps-absolute h0">\n  <button class="s-btn s-btn__icon s-btn__xs s-btn__danger s-focus-rm-btn ps-relative l96 tn6"\n          data-controller="s-tooltip"\n          data-action="${e}#removeFocusUser"\n          title="Remove this user from the focused accounts list"\n    >${a} <span class="md:d-none">Remove</span></button></span>\n`;function N(e){return luxon.Interval.fromDateTimes.apply(this,Array.from(e.querySelectorAll("td .relativetime[title]")).map((e=>{return t=e.title,luxon.DateTime.fromISO(t.replace(" ","T"),{zone:"utc"});var t})))}class Z extends Stacks.StacksController{constructor(){super(...arguments),this._refreshId=null}static attach(e){e.querySelectorAll(".ip-group").forEach((e=>{e.dataset.controller=this.controllerId}))}static afterLoad(e){document.head.insertAdjacentHTML("beforeend",`<style id="${e}-styles">${D}</style>`)}get _userRows(){return Array.from(this.element.querySelectorAll("tbody > tr[data-uid]"))}get _currUserRow(){return this.element.querySelector("tbody .curruser")}get _focusUserRows(){const e=new Set(I.focusedUsers);return this._userRows.filter((t=>e.has(parseInt(t.dataset.uid||"0"))))}get _focusIntervals(){return[this._currUserRow,...this._focusUserRows].map((e=>N(e)))}get _connectedUserRows(){const e=this._focusIntervals,t=new Set(I.focusedUsers);return this._userRows.filter((s=>{if(s.classList.contains("curruser"))return!1;const n=parseInt(s.dataset.uid||"0");if(t.has(n))return!1;const r=N(s);return e.some((e=>e.overlaps(r)))}))}get connectedUsers(){return this._connectedUserRows.map((e=>parseInt(e.dataset.uid||"0")))}connect(){this._belowThreshold=new Set,this._showOnlyConnected=I.xrefUIState.showOnlyConnected,this._addFocusButtons(),this._updateClasses()}_addFocusButtons(){this._userRows.forEach((t=>{const s=t.dataset.uid||"0",n=`${r(e)}UidParam`;t.querySelector("td a")?.insertAdjacentHTML("beforebegin",P),t.querySelectorAll("td .s-btn[data-action]").forEach((e=>e.dataset[n]=s))}))}_updateClasses(){if(this._userRows.forEach((e=>{e.classList.remove("known","overlap","d-none"),delete e.dataset.connected})),this._focusUserRows.forEach((e=>{e.classList.add("known")})),this._connectedUserRows.forEach((e=>{const t=parseInt(e.dataset.uid||"0");e.classList.toggle("overlap",!this._belowThreshold.has(t))})),this._showOnlyConnected){const e=["curruser","known","overlap"];this._userRows.forEach((t=>{e.some((e=>t.classList.contains(e)))||t.classList.add("d-none")}))}}refresh(e){void 0!==e&&(this._showOnlyConnected=e),null===this._refreshId&&(this._refreshId=window.requestAnimationFrame((()=>{this._updateClasses(),this._refreshId=null})))}updateUsersBelowThreshold(e,t){this._belowThreshold=new Set(t.reduce(((t,{uid:s,count:n})=>n<e?[...t,s]:t),[])),this._updateClasses()}}Z.controllerId=`${e}-ip-group`;const B=".ip-group",z=`.s-${e}__connected-histogram`,G=`\n<div class="s-${e} ps-sticky h0 t0 d-grid z-nav"\n     data-action="storage@window->${e}#reloadPreferences">\n  <div id="${e}" role="navigation" aria-label="Connected users"\n       class="o50 h:o100 f:o100 ws3 s-sidebarwidget ps-relative t128 l16">\n\n    <div data-controller="${y.controllerId}"\n         data-${y.controllerId}-empty-class="d-none"\n      >\n      <h2 class="s-sidebarwidget--header s-sidebarwidget__small-bold-text\n                s-sidebarwidget__expanding-control"\n          aria-expanded="false"\n          aria-controls="${e}-connected-histogram"\n          aria-label="toggle connected users histogram"\n          data-controller="s-expandable-control"\n          data-action="\n            s-expandable-control:show->${e}#sectionToggled\n            s-expandable-control:hide->${e}#sectionToggled\n          "\n          tabindex="0">\n        <span>Connected users histogram</span>\n      </h2>\n      <div class="s-expandable s-${e}__connected-histogram"\n          data-controller="${q.controllerId}"\n          data-action="${q.controllerId}:click->${e}#showConnected"\n          id="${e}-connected-histogram"\n        >\n        <div class="s-expandable--content">\n          <svg xmlns="http://www.w3.org/2000/svg"\n              class="s-sidebarwidget--content w100 hs1"\n              data-${q.controllerId}-target="svg"\n              data-${y.controllerId}-target="container"\n              ></svg>\n        </div>\n      </div>\n    </div>\n\n    <div data-controller="${y.controllerId} ${F.controllerId}"\n         data-${y.controllerId}-empty-class="d-none"\n         data-${y.controllerId}-scope-selector=".s-user"\n         data-action="${y.controllerId}:not-empty->${F.controllerId}#updateUsers"\n      >\n      <h2 class="s-sidebarwidget--header s-sidebarwidget__small-bold-text\n                s-sidebarwidget__expanding-control"\n          aria-expanded="false"\n          aria-controls="${e}-connected"\n          aria-label="toggle connected users"\n          data-controller="s-expandable-control"\n          data-action="\n            s-expandable-control:show->${e}#sectionToggled\n            s-expandable-control:hide->${e}#sectionToggled\n          "\n          tabindex="0">\n        <div class="s-check-control s-sidebarwidget--action"\n            data-action="click->${e}#toggleOnly:stop"\n            data-controller="s-tooltip"\n            title="Hide all users not connected to the focus account(s)"\n          >\n          <label class="s-label s-label__sm" for="${e}-toggle-only-connected">Only</label>\n          <input class="s-checkbox" type="checkbox"\n            id="${e}-toggle-only-connected"\n            />\n        </div>\n        <span data-${F.controllerId}-target="count">0</span> Connected users\n      </h2>\n      <div class="s-expandable" id="${e}-connected">\n        <div class="s-expandable--content">\n          <div class="s-sidebarwidget--content\n                      s-sidebarwidget__items\n                      overflow-y-auto\n                      hmx2\n                     "\n               data-${y.controllerId}-target="container"\n               data-${e}-target="connectedUsers"\n            >\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div data-controller="${y.controllerId} ${F.controllerId}"\n         data-${y.controllerId}-empty-class="d-none"\n         data-${y.controllerId}-scope-selector=".s-user"\n         data-action="\n             ${y.controllerId}:not-empty->${F.controllerId}#updateUsers\n             ${F.controllerId}:usersHydrated->${e}#updateFocusUsersGraphLink\n             "\n      >\n      <h2 class="s-sidebarwidget--header s-sidebarwidget__small-bold-text\n                s-sidebarwidget__expanding-control"\n          aria-expanded="false"\n          aria-controls="${e}-focused"\n          aria-label="toggle focused users"\n          data-controller="s-expandable-control"\n          data-action="\n            s-expandable-control:show->${e}#sectionToggled\n            s-expandable-control:hide->${e}#sectionToggled\n          "\n          tabindex="0">\n        <button class="\n              s-sidebarwidget--action\n              s-btn s-btn__icon s-btn__danger s-btn__xs s-btn__link fc-danger\n              "\n            data-controller="s-tooltip"\n            data-action="${e}#clearFocusUsers:stop"\n            title="Clear the list of focus accounts"\n        ><svg aria-hidden="true" class="svg-icon iconTrashSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M11 2a1 1 0 0 1 1 1v1H2V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h2Zm0 3H3v6c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V5Z"/></svg><span class="v-visible-sr">Clear</button>\n        <a class="\n              s-sidebarwidget--action\n              s-btn s-btn__icon s-btn__xs p0\n              "\n            data-controller="s-tooltip"\n            data-${e}-target="focusUsersGraphLink"\n            data-action="${e}#openFocusUsersGraph:stop"\n            title="IP activity graph for focus accounts"\n            target="_blank"\n            href="/admin/user-activity"\n        ><svg aria-hidden="true" class="svg-icon iconReputationSm" width="14" height="14"  viewBox="0 0 14 14"><path  d="M9.67 1.5a1 1 0 0 1 .86-.5H12a1 1 0 1 1 0 2h-.89L9.67 5.5a1 1 0 0 1-.87.5H6.62l-3.23 6.45a1 1 0 1 1-1.78-.9l3.5-7A1 1 0 0 1 6 4h2.22l1.45-2.5Z"/><path  d="M1 2a1 1 0 0 1 1-1h5a1 1 0 0 1 0 2H2a1 1 0 0 1-1-1Zm0 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm11-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM8 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm-1 2a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H7Z" opacity=".2"/></svg><span class="v-visible-sr">Clear</a>\n        <span data-${F.controllerId}-target="count">0</span> Focused users\n      </h2>\n      <div class="s-expandable" id="${e}-focused">\n        <div class="s-expandable--content">\n          <div class="s-sidebarwidget--content\n                      s-sidebarwidget__items\n                      overflow-y-auto\n                      hmx2\n                     "\n               data-${y.controllerId}-target="container"\n               data-${e}-target="focusedUsers"\n            >\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n`;function V(e){return e.toFormat("yyyy/MM/dd")}class J extends Stacks.StacksController{constructor(){super(...arguments),this._threshold=0,this._refreshId=null}get _ipGroups(){return this[function({controllerId:e}){return`${r(`${e}`)}Outlets`}(Z)]}get _histogram(){return this[function({controllerId:e}){return`${r(`${e}`)}Outlet`}(q)]}static attach(e){Stacks.application.register(Z.controllerId,Z);const t=document.querySelector(e);t.setAttribute(Stacks.application.schema.targetAttributeForScope(this.controllerId),"xrefsTable"),t.querySelectorAll(B).forEach((e=>e.dataset.controller=Z.controllerId));const s=t.parentElement,n=(s.dataset.controller??"").split(" ");n.push(this.controllerId),s.dataset.controller=n.join(" ").trim(),s.setAttribute(Stacks.application.schema.outletAttributeForScope(this.controllerId,Z.controllerId),B),s.setAttribute(Stacks.application.schema.outletAttributeForScope(this.controllerId,q.controllerId),z),Stacks.application.register(this.controllerId,this)}static afterLoad(){for(const e of[q,y,F])Stacks.application.register(e.controllerId,e)}get _uiDiv(){let t=this.element.querySelector(`.s-${this.identifier}`);if(null===t){const s=document.createElement("div");s.insertAdjacentHTML("afterbegin",G);const n=s.firstElementChild;n.querySelectorAll('[data-controller="s-expandable-control"]').forEach((e=>{const t=e.getAttribute("aria-controls");t&&I.xrefUIState.openedSections[t]&&(e.setAttribute("aria-expanded","true"),n.querySelector(`#${t}`)?.classList.add("is-expanded"))})),n.querySelector(`#${e}-toggle-only-connected`)?.toggleAttribute("checked",I.xrefUIState.showOnlyConnected),t=n}return t}get _connectedUsers(){const e=new Map;return this._ipGroups.forEach((t=>t.connectedUsers.forEach((t=>e.set(t,(e.get(t)??0)+1))))),[...e.entries()].map((([e,t])=>({uid:e,count:t}))).sort((({uid:e,count:t},{uid:s,count:n})=>n-t||e-s))}connect(){this.element.insertAdjacentElement("afterbegin",this._uiDiv),this._updateConnectedUsersList(this._connectedUsers),this._updateFocusedUsersList()}[function({controllerId:e}){return`${r(e)}OutletConnected`}(q)](e){e.setFrequencies(this._connectedUsers)}reloadPreferences(){U(),this._refresh()}showConnected({detail:{connCount:e}}){e!==this._threshold&&(this._threshold=e,this._refreshConnectedUsers(this._connectedUsers))}toggleOnly({target:e}){I.xrefUIState.showOnlyConnected=e.checked,this._ipGroups.forEach((t=>t.refresh(e.checked)))}sectionToggled({target:e}){const t=e.getAttribute("aria-controls");t&&Object.hasOwn(I.xrefUIState.openedSections,t)&&(I.xrefUIState.openedSections[t]="true"===e.getAttribute("aria-expanded"))}addFocusUser({params:{uid:e}}){const t=I.focusedUsers.length;I.focusedUsers=Array.from(new Set([...I.focusedUsers,e])).sort(((e,t)=>e-t)),I.focusedUsers.length!==t&&this._refresh()}removeFocusUser({params:{uid:e}}){const t=I.focusedUsers.length;I.focusedUsers=I.focusedUsers.filter((t=>t!==e)),I.focusedUsers.length!==t&&this._refresh()}clearFocusUsers(){confirm("Clear all focused users?")&&I.focusedUsers.length>0&&(I.focusedUsers=[],this._refresh())}updateFocusUsersGraphLink({detail:e}){const t=luxon.DateTime.utc(),s=t.minus({days:14}),n=this.focusUsersGraphLinkTarget,r=new URL(n.href);r.hash=`${V(s)}|${V(t)}|${e.join(",")}`,n.href=r.toString()}_refresh(){null===this._refreshId&&(this._refreshId=window.requestAnimationFrame((()=>{this._threshold=0,this._updateFocusedUsersList();const e=this._connectedUsers;this._histogram.setFrequencies(e,!1),this._refreshConnectedUsers(e),this._refreshId=null})))}_refreshConnectedUsers(e){this._ipGroups.forEach((t=>t.updateUsersBelowThreshold(this._threshold,e))),this._updateConnectedUsersList(e)}_updateConnectedUsersList(t){const s=()=>{const s=this.connectedUsersTarget;s.replaceChildren(),t.forEach((({uid:t,count:n})=>{if(n<this._threshold)return;const r=`Overlaps on ${n} IP${1!==n?"s":""}`;s.insertAdjacentHTML("beforeend",`<div class="s-sidebarwidget--item ai-center"\n              data-uid="${t}"\n              data-${F.controllerId}-target="userRow"\n              data-user-card-keep-first="true"\n          >\n            <div class="s-user-card" data-uid="${t}">\n              <span class="s-user-card--time">${r}</span>\n              <span class="s-avatar s-avatar__32 s-user-card--avatar">\n                <span class="anonymous-gravatar s-avatar--image"></span>\n              </span>\n              <div class="s-user-card--info">user${t}</div>\n            </div>\n            <div class="s-user-actions ml-auto">\n              <button class="s-btn s-btn__icon s-btn__xs"\n                      data-controller="s-tooltip"\n                      data-action="${e}#addFocusUser"\n                      data-${e}-uid-param="${t}" \n                      title="Add this user to the focused accounts list"\n                >\n                  ${o}\n                  <span class="md:d-none">Focus</span>\n                </button>\n            </div>\n          </div>`)}))};null===this._refreshId?window.requestAnimationFrame(s):s()}_updateFocusedUsersList(){const t=this.focusedUsersTarget;t.replaceChildren(),I.focusedUsers.forEach((s=>{t.insertAdjacentHTML("beforeend",`<div class="s-sidebarwidget--item"\n              data-uid="${s}"\n              data-${F.controllerId}-target="userRow"\n          >\n            <div class="s-user-card">\n              <span class="s-avatar s-avatar__32 s-user-card--avatar">\n                <span class="anonymous-gravatar s-avatar--image"></span>\n              </span>\n              <div class="s-user-card--info">user${s}</div>\n            </div>\n            <div class="s-user-actions ml-auto">\n              <button class="s-btn s-btn__icon s-btn__xs s-btn__danger"\n                      data-controller="s-tooltip"\n                      data-action="${e}#removeFocusUser"\n                      data-${e}-uid-param="${s}" \n                      title="Remove this user from the focused accounts list"\n                >${a}\n                  <span class="md:d-none">Remove</span>\n                </button>\n            </div>\n          </div>\n        </div>`)}))}}var W;J.controllerId=e,J.targets=["xrefsTable","connectedUsers","focusedUsers","focusUsersGraphLink"],J.outlets=[q.controllerId,Z.controllerId],StackExchange.options.user.isModerator&&location.pathname.includes("/admin/xref-user-ips/")&&Promise.all([t,(W="https://cdn.jsdelivr.net/npm/luxon@3/build/global/luxon.min.js",new Promise((function(e,t){if(null!==document.querySelector(`script[src='${W}']`))return e();const s=document.createElement("script");s.onload=()=>e(),s.onerror=e=>t(e.error),s.src=W,document.head.appendChild(s)})))]).then((()=>{J.attach("#xref-ids")}))})();
//# sourceMappingURL=https://github.com/mjpieters/SO-userscripts/raw/v1.2.0/dist/connected-users.map