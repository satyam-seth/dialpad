!function e(t,n,i){function r(u,a){if(!n[u]){if(!t[u]){var l="function"==typeof require&&require;if(!a&&l)return l(u,!0);if(o)return o(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[u]={exports:{}};t[u][0].call(d.exports,(function(e){return r(t[u][1][e]||e)}),d,d.exports,e,t,n,i)}return n[u].exports}for(var o="function"==typeof require&&require,u=0;u<i.length;u++)r(i[u]);return r}({1:[function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=t}return i(e,[{key:"build",value:function(e){e.appendChild(this.skeleton)}},{key:"skeleton",get:function(){var e=document.createElement("button");return e.id=this.id,e.classList.add("dialpad-btn"),e.setAttribute("aria-label",this.config.ariaLabel),e.appendChild(this.titleElement),e.appendChild(this.subtitleElement),e.addEventListener("click",this.config.onClick),e}},{key:"titleElement",get:function(){var e=document.createElement("h1");return e.classList.add("dialpad-btn__title"),e.innerText=this.config.title,e}},{key:"subtitleElement",get:function(){var e,t=document.createElement("p");return t.classList.add("dialpad-btn__subtitle"),t.innerText=null!==(e=this.config.subtitle)&&void 0!==e?e:"",t}},{key:"id",get:function(){return"dialpad-btn-"+this.config.namespace}},{key:"querySelector",get:function(){return document.getElementById(this.id)}}]),e}();n.default=r},{}],2:[function(e,t,n){"use strict";var i=function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var r=i(e("./layout/buttons"));window.onload=function(){console.log("dialpad"),new r.default({namespace:"one",ariaLabel:"One",title:"1",subtitle:"abc",onClick:function(){console.log("clicked on 1")}}).build(document.body)}},{"./layout/buttons":1}]},{},[2]);
//# sourceMappingURL=maps/bundle.js.map
