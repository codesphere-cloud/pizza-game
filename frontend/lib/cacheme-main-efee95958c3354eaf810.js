!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Symbol=void 0;const o=i(n(10)),r=i(n(11)),a=i(n(12)),s=i(n(13)),c=i(n(14)),l={cake:o.default,hamburger:r.default,"noodle-bowl":a.default,pizza:s.default,apple:c.default};class d{constructor(e=d.random()){this.name=e,d.imageCache[e]?this.img=d.imageCache[e].cloneNode():(this.img=new Image,this.img.src=l[e],d.imageCache[e]=this.img)}static random(){return Object.keys(l)[Math.floor(Math.random()*Object.keys(l).length)]}getImg(){return this.img}}t.Symbol=d,d.imageCache={}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(2);const i=n(8),o=n(15);new i.Slot(document.getElementById("slot"),{inverted:!0},new o.WinnerForm(document.querySelector(".winner-form")))},function(e,t,n){var i=n(3),o=n(4);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var r={insert:"head",singleton:!1};i(o,r);e.exports=o.locals||{}},function(e,t,n){"use strict";var i,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function s(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},i=[],o=0;o<e.length;o++){var r=e[o],c=t.base?r[0]+t.base:r[0],l=n[c]||0,d="".concat(c," ").concat(l);n[c]=l+1;var u=s(d),f={css:r[1],media:r[2],sourceMap:r[3]};-1!==u?(a[u].references++,a[u].updater(f)):a.push({identifier:d,updater:g(f,t),references:1}),i.push(d)}return i}function l(e){var t=document.createElement("style"),i=e.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(e){t.setAttribute(e,i[e])})),"function"==typeof e.insert)e.insert(t);else{var a=r(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var d,u=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function f(e,t,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(e.styleSheet)e.styleSheet.cssText=u(t,o);else{var r=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}function h(e,t,n){var i=n.css,o=n.media,r=n.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var m=null,p=0;function g(e,t){var n,i,o;if(t.singleton){var r=p++;n=m||(m=l(t)),i=f.bind(null,n,r,!1),o=f.bind(null,n,r,!0)}else n=l(t),i=h.bind(null,n,t),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=o());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var i=0;i<n.length;i++){var o=s(n[i]);a[o].references--}for(var r=c(e,t),l=0;l<n.length;l++){var d=s(n[l]);0===a[d].references&&(a[d].updater(),a.splice(d,1))}n=r}}}},function(e,t,n){var i=n(5),o=n(6),r=n(7);t=i(!1);var a=o(r);t.push([e.i,".hidden{display:none}.winner-form{background:rgba(0,0,0,0.4);height:100%;position:fixed;text-align:center;top:0;width:100%;z-index:10000}.winner-form .helper{display:inline-block;height:100%;vertical-align:middle}.winner-form div{background-color:#fff;box-shadow:10px 10px 60px #555;display:inline-block;height:auto;max-width:551px;min-height:100px;vertical-align:middle;width:60%;position:relative;border-radius:8px;padding:15px 5%}.winner-form .gift-code{color:purple}body{width:100vw;height:100vh;padding:1rem;background-image:url("+a+');background-size:cover;display:flex;align-items:center;justify-content:center;font-size:24px;font-family:"Roboto Condensed", sans-serif}#reels{display:flex;width:100vw;height:calc((3 / 3) * 100vw);max-height:calc(90vh - 50px - 40px);max-width:calc((90vh - 50px - 40px))}.reel{overflow:hidden;width:33.3333%;height:100%}.reel>.icons>img{width:calc(100% + 6px);margin:-3px 0 0 -3px;height:auto;background:linear-gradient(48deg, #598a1f 0%, #82b543 100%);padding:40px}#controls{background-color:rgba(255,255,255,0.9);height:50px;display:flex;justify-content:space-between;align-items:center;padding:5px 30px}#controls label{display:flex;align-items:center;margin:0}#controls label input{margin-right:5px}input[type="checkbox"]{width:40px;height:40px}#jackpot{color:#598a1f;font-size:40px;text-align:center}#slot.inverted .reel{transform:scaleY(-1)}#slot.inverted .reel>.icons>img{transform:scaleY(-1)}\n',""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var o=(a=i,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),r=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(r).concat([o]).join("\n")}var a,s,c;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(i)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);i&&o[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),t.push(c))}},t}},function(e,t,n){"use strict";e.exports=function(e,t){return t||(t={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/fa4a96b7edd9b999e548d4f675c15414-bg.jpg"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Slot=void 0;const i=n(9),o=n(0);t.Slot=class{constructor(e,t={inverted:!1},n){this.currentSymbols=[["pizza","pizza","pizza"],["pizza","pizza","pizza"],["pizza","pizza","pizza"]],this.nextSymbols=[["cake","cake","cake"],["cake","cake","cake"],["cake","cake","cake"]],this.container=e,this.winnerForm=n,this.reels=Array.from(this.container.getElementsByClassName("reel")).map((e,t)=>new i.Reel(e,t,this.currentSymbols[t])),this.spinButton=document.getElementById("spin"),this.spinButton.addEventListener("click",()=>this.spin()),this.autoPlayCheckbox=document.getElementById("autoplay"),t.inverted&&this.container.classList.add("inverted")}spin(){return this.onSpinStart(),this.currentSymbols=this.nextSymbols,this.nextSymbols=[[o.Symbol.random(),o.Symbol.random(),o.Symbol.random()],[o.Symbol.random(),o.Symbol.random(),o.Symbol.random()],[o.Symbol.random(),o.Symbol.random(),o.Symbol.random()]],Promise.all(this.reels.map(e=>(e.renderSymbols(this.nextSymbols[e.getIdx()]),e.spin()))).then(()=>this.onSpinEnd())}onSpinStart(){this.spinButton.disabled=!0,console.log("SPIN START")}onSpinEnd(){this.spinButton.disabled=!1,console.log("SPIN END"),this.isWinning(this.nextSymbols)&&(this.autoPlayCheckbox.checked=!1,console.log("YOU WON!!!"),window.setTimeout(()=>{this.winnerForm.show()},500)),this.autoPlayCheckbox.checked&&window.setTimeout(()=>this.spin(),200)}isWinning(e){for(let t=0;t<3;t++){let n=!0;for(let i=1;i<3;i++)n=n&&e[i-1][t]===e[i][t];if(n)return!0}return!1}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Reel=void 0;const i=n(0);t.Reel=class{constructor(e,t,n){this.reelContainer=e,this.idx=t,this.factor=1+Math.pow(this.idx/2,2),this.symbolContainer=document.createElement("div"),this.symbolContainer.classList.add("icons"),this.reelContainer.appendChild(this.symbolContainer),this.animation=this.symbolContainer.animate([{transform:"none",filter:"blur(0)"},{filter:"blur(2px)",offset:.5},{transform:`translateY(-${10*Math.floor(this.factor)/(3+10*Math.floor(this.factor))*100}%)`,filter:"blur(0)"}],{duration:1e3*this.factor,easing:"ease-in-out"}),this.animation.cancel(),n.forEach(e=>this.symbolContainer.appendChild(new i.Symbol(e).getImg()))}getIdx(){return this.idx}renderSymbols(e){const t=document.createDocumentFragment();for(let n=3;n<3+10*Math.floor(this.factor);n++){const o=new i.Symbol(n>=10*Math.floor(this.factor)-2?e[n-10*Math.floor(this.factor)]:void 0);t.appendChild(o.getImg())}this.symbolContainer.appendChild(t)}spin(){const e=new Promise(e=>this.animation.onfinish=e),t=new Promise(e=>setTimeout(e,1e3*this.factor));return this.animation.play(),Promise.race([e,t]).then(()=>{"finished"!==this.animation.playState&&this.animation.finish();const e=this.symbolContainer.children.length-3;for(let t=0;t<e;t++)this.symbolContainer.firstChild.remove()})}}},function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/f31660c21867a2104cdade8e891fc1a2-cake.svg"},function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/07089ff4c45c37c926300e47cf94b046-hamburger.svg"},function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/b233fc5e1a6d99b718c6729909716a79-noodle-bowl.svg"},function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/f46c91d70899d0a4a1e5568980363bae-pizza.svg"},function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/f9cbf62c1e37b024767524a5065754bb-apple.svg"},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WinnerForm=void 0;t.WinnerForm=class{constructor(e){this.element=e}async show(){const e=await(await fetch("backend/gift-code",{method:"GET"})).text();this.element.querySelector(".gift-code").innerHTML="Your gift code: "+e,this.element.classList.remove("hidden")}}}]);
//# sourceMappingURL=cacheme-main-efee95958c3354eaf810.js.map