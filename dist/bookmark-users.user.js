// ==UserScript==
// @name        Bookmark Users
// @version     1.2.0
// @author      Martijn Pieters
// @description Shows what user bookmarked a question. Fetches the bookmarking users from the StackExchange data explorer (data can be up to a week old)
// @homepage    https://github.com/mjpieters/SO-userscripts
// @supportURL  https://github.com/mjpieters/SO-userscripts/issues
// @match       http*://*.stackoverflow.com/questions/*
// @match       http*://*.serverfault.com/questions/*
// @match       http*://*.superuser.com/questions/*
// @match       http*://*.askubuntu.com/questions/*
// @match       http*://*.mathoverflow.net/questions/*
// @match       http*://*.stackexchange.com/questions/*
// @namespace   https://github.com/mjpieters/SO-userscripts
// @downloadURL https://github.com/mjpieters/SO-userscripts/raw/v1.2.0/dist/bookmark-users.user.js
// @updateURL   https://github.com/mjpieters/SO-userscripts/raw/main/dist/bookmark-users.user.js
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// @connect     data.stackexchange.com
// ==/UserScript==

(()=>{"use strict";function s(){return location.hostname.replace(/(\.stackexchange)?\.com$/,"")}const e=new Map;async function t(t,...[a]){const n=new URL(`https://api.stackexchange.com/2.3/${t}`);n.search=new URLSearchParams({...a&&{filter:a},key:"9VvY5KWke5mKcflYkx)NDw((",site:s(),pagesize:"100"}).toString();const r=(e.get(t)??0)-(new Date).getTime();var i;r>0&&await(i=r,new Promise((s=>setTimeout(s,i))));const o=await fetch(n.toString()),c=await o.json();if(e.set(t,(new Date).getTime()+(c.backoff??0)),c.error_id)throw new Error(`${c.error_name} (${c.error_id}): ${c.error_message}`);return c.items}const a=new Intl.NumberFormat("en-US",{notation:"compact",maximumSignificantDigits:3}),n=new Intl.NumberFormat("en-US",{useGrouping:!0});class r{get badges(){const s=[];switch(this.is_employee&&s.push('<span class="s-badge s-badge__staff s-badge__xs">Staff</span>'),this.user_type){case"moderator":s.push('<span class="s-badge s-badge__moderator s-badge__xs">Mod</span>');break;case"team_admin":s.push('<span class="s-badge s-badge__admin s-badge__xs">Admin</span>')}return s.join(" ")}get abbreviated_reputation(){return this.reputation<1e4?n.format(this.reputation):a.format(this.reputation).toLowerCase()}toHTML(s){return`\n      <div class="s-user-card s-user-card__minimal">\n        <time class="s-user-card--time">${s}</time>\n        <a href="${this.link}" class="s-avatar s-user-card--avatar">\n          <img class="s-avatar--image" src="${this.profile_image}" />\n        </a>\n        <div class="s-user-card--info">\n          <a href="${this.link}" class="s-user-card--link"\n            >${this.display_name} ${this.badges}</a\n          >\n          <ul class="s-user-card--awards">\n            <li\n              class="s-user-card--rep"\n              title="reputation score ${n.format(this.reputation)}"\n            >\n              ${this.abbreviated_reputation}\n            </li>\n          </ul>\n        </div>\n      </div>\n    `}}class i extends r{constructor(s){super(),this.user_id=parseInt(s),this.link=`/users/${s}`}toHTML(s){return StackExchange.options.user.isModerator?`\n        <div class="s-user-card s-user-card__minimal s-user-card__deleted">\n          <time class="s-user-card--time">${s}</time>\n          <a href="${this.link}" class="s-avatar s-user-card--avatar">\n            <span class="anonymous-gravatar"></span>\n          </a>\n          <div class="s-user-card--info">\n            <a href="${this.link}" class="s-user-card--link"\n              >user${this.user_id}</a\n            >\n          </div>\n        </div>\n      `:`\n      <div class="s-user-card s-user-card__minimal s-user-card__deleted">\n        <time class="s-user-card--time">${s}</time>\n        <div class="s-avatar s-user-card--avatar">\n          <span class="anonymous-gravatar"></span>\n        </a>\n        <div class="s-user-card--info">\n          <div class="s-user-card--link">user${this.user_id}</a>\n        </div>\n      </div>\n    `}}class o extends Stacks.StacksController{constructor(){super(...arguments),this.state="initial"}static attach(s){s&&s.querySelector(".js-bookmark-count")?.offsetParent&&(o.style||(o.style=GM_addStyle("\n.us-bookmarkers-content { min-height: min-content; }\n.us-bookmarkers-popover .s-user-card__minimal .anonymous-gravatar {\n  zoom:0.5;\n  -moz-transform:scale(0.5);\n  -moz-transform-origin: 0 0;\n}\n.us-bookmarkers-popover .s-user-card__minimal .s-user-card--time {\n  font-variant-numeric: tabular-nums;\n}\n")),s.insertAdjacentHTML("afterend",'\n  <button\n    class="s-btn s-btn__unset c-pointer py4"\n    data-controller="s-tooltip us-bookmarkers"\n    data-s-popover-toggle-class="fc-yellow-600"\n    data-s-tooltip-placement="right"\n    data-action="click->s-popover#toggle s-popover:show->us-bookmarkers#showBookmarkers"\n    aria-pressed="false"\n    title="Show who bookmarked this question."\n  ></button>\n'),s.nextElementSibling?.insertAdjacentElement("beforeend",Svg.Person()[0]),Stacks.application.register("us-bookmarkers",o))}connect(){"initial"===this.state&&(this.state="attached",Stacks.attachPopover(this.element,'\n  <div\n    class="us-bookmarkers-popover s-popover"\n    role="dialog"\n    aria-hidden="true"\n  >\n    <div class="s-popover--arrow"></div>\n    <div class="m4 hmx3 wmx100 overflow-x-hidden overflow-y-auto">\n      <div\n        class="us-bookmarkers-popover-inner d-flex fd-column flex__center gs8 gsy"\n      >\n        <ul class="list-reset flex--item mr-auto"></ul>\n        <div class="s-spinner s-spinner__sm flex--item">\n          <div class="v-visible-sr">Loading…</div>\n        </div>\n      </div>\n    </div>\n  </div>\n'),this.popoverElement=document.getElementById(this.element.getAttribute("aria-controls")??""))}async showBookmarkers(){if("attached"!==this.state)return;this.state="loading";const e=this.popoverElement?.querySelector("ul"),a=StackExchange.question.getQuestionId(),n=await function(e){const t=s();return new Promise(((s,a)=>{GM_xmlhttpRequest({method:"GET",url:`https://data.stackexchange.com//${t}/csv/1894927?postId=${e}`,fetch:!0,onload:e=>{200!==e.status&&a(new Error(`invalid response ${e}`));const t=e.responseText.split(/\r?\n/).filter(Boolean);t.shift(),s(t.map((s=>{const[e,t]=s.replaceAll('"',"").split(",");return{date:e.split(" ")[0],userId:t}})))}})}))}(a);if(n.length){const s=new Map(n.map((s=>[s.userId,s.date])));for await(const a of async function*(s,e=!1){for(;s.length>0;){const a=s.splice(0,100);s=s.splice(100);const n=await t(`users/${a.join(";")}`,"!)69QNaSIc2a*QW(ccD0ph0dVbliY"),o=new Map(n.map((s=>[s.user_id.toFixed(0),Object.assign(new r,s)])));yield*a.reduce(((s,t)=>{let a=o.get(t);return void 0===a&&e&&(a=new i(t)),a?[...s,a]:s}),[])}}(n.map((s=>s.userId)),!0))e?.insertAdjacentHTML("beforeend",`<li class="mb4">${a.toHTML(s.get(a.user_id.toFixed(0))??"&lt;unknown&gt;")}</li>`)}else e?.insertAdjacentHTML("beforeend",'<li class="mb4 fs-italic">No bookmarkers known (yet)</li>'),e?.classList.add("mx-auto");this.state="loaded",this.popoverElement?.querySelector(".s-spinner")?.remove()}}StackExchange.ready((()=>o.attach(document.querySelector(".js-bookmark-btn"))))})();
//# sourceMappingURL=https://github.com/mjpieters/SO-userscripts/raw/v1.2.0/dist/bookmark-users.map