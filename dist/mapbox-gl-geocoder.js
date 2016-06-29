!function t(e,i,n){function s(o,a){if(!i[o]){if(!e[o]){var h="function"==typeof require&&require;if(!a&&h)return h(o,!0);if(r)return r(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=i[o]={exports:{}};e[o][0].call(c.exports,function(t){var i=e[o][1][t];return s(i?i:t)},c,c.exports,t,e,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({1:[function(t,e,i){"use strict";function n(t){this._ev=new a,this.options=o({},this.options,t)}if(!mapboxgl)throw new Error("include mapboxgl before mapbox-gl-geocoder.js");var s=t("suggestions"),r=t("lodash.debounce"),o=t("xtend"),a=t("events").EventEmitter,h="https://api.mapbox.com/geocoding/v5/mapbox.places/";n.prototype=mapboxgl.util.inherit(mapboxgl.Control,{options:{position:"top-left",placeholder:"Search",zoom:16,flyTo:!0},onAdd:function(t){this.request=new XMLHttpRequest,this.container=this.options.container?"string"==typeof this.options.container?document.getElementById(this.options.container):this.options.container:t.getContainer();var e=document.createElement("div");e.className="mapboxgl-ctrl-geocoder";var i=document.createElement("span");i.className="geocoder-icon geocoder-icon-search";var n=this._inputEl=document.createElement("input");n.type="text",n.placeholder=this.options.placeholder,n.addEventListener("keydown",r(function(t){return t.target.value?void(t.metaKey||[9,27,37,39,13,38,40].indexOf(t.keyCode)!==-1||this._queryFromInput(t.target.value)):this._clearEl.classList.remove("active")}.bind(this)),200),n.addEventListener("change",function(e){e.target.value&&this._clearEl.classList.add("active");var i=this._typeahead.selected;if(i){if(this.options.flyTo)if(i.bbox&&i.context&&i.context.length<=3||i.bbox&&!i.context){var n=i.bbox;t.fitBounds([[n[0],n[1]],[n[2],n[3]]])}else t.flyTo({center:i.center,zoom:this.options.zoom});this._input=i,this.fire("result",{result:i})}}.bind(this));var o=document.createElement("div");o.classList.add("geocoder-pin-right");var a=this._clearEl=document.createElement("button");a.className="geocoder-icon geocoder-icon-close",a.addEventListener("click",this._clear.bind(this));var h=this._loadingEl=document.createElement("span");return h.className="geocoder-icon geocoder-icon-loading",o.appendChild(a),o.appendChild(h),e.appendChild(i),e.appendChild(n),e.appendChild(o),this.container.appendChild(e),this.options.container&&(this.options.position=!1),this._typeahead=new s(n,[],{filter:!1}),this._typeahead.getItemValue=function(t){return t.place_name},e},_geocode:function(t,e){this._loadingEl.classList.add("active"),this.fire("loading");var i=[];this.options.proximity&&i.push("proximity="+this.options.proximity.join()),this.options.country&&i.push("country="+this.options.country),this.options.types&&i.push("types="+this.options.types);var n=this.options.accessToken?this.options.accessToken:mapboxgl.accessToken;i.push("access_token="+n),this.request.abort(),this.request.open("GET",h+encodeURIComponent(t.trim())+".json?"+i.join("&"),!0),this.request.onload=function(){if(this._loadingEl.classList.remove("active"),this.request.status>=200&&this.request.status<400){var t=JSON.parse(this.request.responseText);return t.features.length?this._clearEl.classList.add("active"):(this._clearEl.classList.remove("active"),this._typeahead.selected=null),this.fire("results",{results:t.features}),this._typeahead.update(t.features),e(t.features)}this.fire("error",{error:JSON.parse(this.request.responseText).message})}.bind(this),this.request.onerror=function(){this._loadingEl.classList.remove("active"),this.fire("error",{error:JSON.parse(this.request.responseText).message})}.bind(this),this.request.send()},_queryFromInput:function(t){t=t.trim(),t||this._clear(),t.length>2&&this._geocode(t,function(t){this._results=t}.bind(this))},_change:function(){var t=document.createEvent("HTMLEvents");t.initEvent("change",!0,!1),this._inputEl.dispatchEvent(t)},_query:function(t){t&&("object"==typeof t&&t.length&&(t=[mapboxgl.util.wrap(t[0],-180,180),mapboxgl.util.wrap(t[1],-180,180)].join()),this._geocode(t,function(t){if(t.length){var e=t[0];this._results=t,this._typeahead.selected=e,this._inputEl.value=e.place_name,this._change()}}.bind(this)))},_setInput:function(t){t&&("object"==typeof t&&t.length&&(t=[mapboxgl.util.wrap(t[0],-180,180),mapboxgl.util.wrap(t[1],-180,180)].join()),this._inputEl.value=t,this._input=null,this._typeahead.selected=null,this._typeahead.clear(),this._change())},_clear:function(){this._input=null,this._inputEl.value="",this._typeahead.selected=null,this._typeahead.clear(),this._change(),this._inputEl.focus(),this._clearEl.classList.remove("active"),this.fire("clear")},getResult:function(){return this._input},query:function(t){return this._query(t),this},setInput:function(t){return this._setInput(t),this},on:function(t,e){return this._ev.on(t,e),this},fire:function(t,e){return this._ev.emit(t,e),this},off:function(t,e){return this._ev.removeListener(t,e),this}}),window.mapboxgl?mapboxgl.Geocoder=n:"undefined"!=typeof e&&(e.exports=n)},{events:2,"lodash.debounce":4,suggestions:5,xtend:8}],2:[function(t,e,i){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function s(t){return"function"==typeof t}function r(t){return"number"==typeof t}function o(t){return"object"==typeof t&&null!==t}function a(t){return void 0===t}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if(!r(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},n.prototype.emit=function(t){var e,i,n,r,h,u;if(this._events||(this._events={}),"error"===t&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(e=arguments[1],e instanceof Error)throw e;var c=new Error('Uncaught, unspecified "error" event. ('+e+")");throw c.context=e,c}if(i=this._events[t],a(i))return!1;if(s(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:r=Array.prototype.slice.call(arguments,1),i.apply(this,r)}else if(o(i))for(r=Array.prototype.slice.call(arguments,1),u=i.slice(),n=u.length,h=0;h<n;h++)u[h].apply(this,r);return!0},n.prototype.addListener=function(t,e){var i;if(!s(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,s(e.listener)?e.listener:e),this._events[t]?o(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,o(this._events[t])&&!this._events[t].warned&&(i=a(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[t].length>i&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){function i(){this.removeListener(t,i),n||(n=!0,e.apply(this,arguments))}if(!s(e))throw TypeError("listener must be a function");var n=!1;return i.listener=e,this.on(t,i),this},n.prototype.removeListener=function(t,e){var i,n,r,a;if(!s(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(i=this._events[t],r=i.length,n=-1,i===e||s(i.listener)&&i.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(o(i)){for(a=r;a-- >0;)if(i[a]===e||i[a].listener&&i[a].listener===e){n=a;break}if(n<0)return this;1===i.length?(i.length=0,delete this._events[t]):i.splice(n,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[t],s(i))this.removeListener(t,i);else if(i)for(;i.length;)this.removeListener(t,i[i.length-1]);return delete this._events[t],this},n.prototype.listeners=function(t){var e;return e=this._events&&this._events[t]?s(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(s(e))return 1;if(e)return e.length}return 0},n.listenerCount=function(t,e){return t.listenerCount(e)}},{}],3:[function(t,e,i){!function(){var t=this,n={};"undefined"!=typeof i?e.exports=n:t.fuzzy=n,n.simpleFilter=function(t,e){return e.filter(function(e){return n.test(t,e)})},n.test=function(t,e){return null!==n.match(t,e)},n.match=function(t,e,i){i=i||{};var n,s=0,r=[],o=e.length,a=0,h=0,u=i.pre||"",c=i.post||"",l=i.caseSensitive&&e||e.toLowerCase();t=i.caseSensitive&&t||t.toLowerCase();for(var p=0;p<o;p++)n=e[p],l[p]===t[s]?(n=u+n+c,s+=1,h+=1+h):h=0,a+=h,r[r.length]=n;return s===t.length?{rendered:r.join(""),score:a}:null},n.filter=function(t,e,i){return i=i||{},e.reduce(function(e,s,r,o){var a=s;i.extract&&(a=i.extract(s));var h=n.match(t,a,i);return null!=h&&(e[e.length]={string:h.rendered,score:h.score,index:r,original:s}),e},[]).sort(function(t,e){var i=e.score-t.score;return i?i:t.index-e.index})}}()},{}],4:[function(t,e,i){function n(t,e,i){function n(e){var i=v,n=m;return v=m=void 0,L=e,g=t.apply(n,i)}function s(t){return L=t,_=setTimeout(c,e),T?n(t):g}function o(t){var i=t-b,n=t-L,s=e-i;return q?E(s,y-n):s}function a(t){var i=t-b,n=t-L;return!b||i>=e||i<0||q&&n>=y}function c(){var t=w();return a(t)?l(t):void(_=setTimeout(c,o(t)))}function l(t){return clearTimeout(_),_=void 0,C&&v?n(t):(v=m=void 0,g)}function p(){void 0!==_&&clearTimeout(_),b=L=0,v=m=_=void 0}function d(){return void 0===_?g:l(w())}function f(){var t=w(),i=a(t);if(v=arguments,m=this,b=t,i){if(void 0===_)return s(b);if(q)return clearTimeout(_),_=setTimeout(c,e),n(b)}return void 0===_&&(_=setTimeout(c,e)),g}var v,m,y,g,_,b=0,L=0,T=!1,q=!1,C=!0;if("function"!=typeof t)throw new TypeError(u);return e=h(e)||0,r(i)&&(T=!!i.leading,q="maxWait"in i,y=q?x(h(i.maxWait)||0,e):y,C="trailing"in i?!!i.trailing:C),f.cancel=p,f.flush=d,f}function s(t){var e=r(t)?b.call(t):"";return e==l||e==p}function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function o(t){return!!t&&"object"==typeof t}function a(t){return"symbol"==typeof t||o(t)&&b.call(t)==d}function h(t){if("number"==typeof t)return t;if(a(t))return c;if(r(t)){var e=s(t.valueOf)?t.valueOf():t;t=r(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(f,"");var i=m.test(t);return i||y.test(t)?g(t.slice(2),i?2:8):v.test(t)?c:+t}var u="Expected a function",c=NaN,l="[object Function]",p="[object GeneratorFunction]",d="[object Symbol]",f=/^\s+|\s+$/g,v=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,y=/^0o[0-7]+$/i,g=parseInt,_=Object.prototype,b=_.toString,x=Math.max,E=Math.min,w=Date.now;e.exports=n},{}],5:[function(t,e,i){"use strict";var n=t("./src/suggestions");window.Suggestions=e.exports=n},{"./src/suggestions":7}],6:[function(t,e,i){"Use strict";var n=function(t){return this.component=t,this.items=[],this.active=0,this.element=document.createElement("ul"),this.element.className="suggestions",t.el.parentNode.insertBefore(this.element,t.el.nextSibling),this};n.prototype.show=function(){this.element.style.display="block"},n.prototype.hide=function(){this.element.style.display="none"},n.prototype.add=function(t){this.items.push(t)},n.prototype.clear=function(){this.items=[],this.active=0},n.prototype.isEmpty=function(){return!this.items.length},n.prototype.draw=function(){if(this.element.innerHTML="",0===this.items.length)return void this.hide();for(var t=0;t<this.items.length;t++)this.drawItem(this.items[t],this.active===t);this.show()},n.prototype.drawItem=function(t,e){var i=document.createElement("li"),n=document.createElement("a");e&&(i.className+=" active"),n.innerHTML=t.string,i.appendChild(n),this.element.appendChild(i),i.addEventListener("mousedown",function(){this.handleMouseDown.call(this,t)}.bind(this))},n.prototype.handleMouseDown=function(t){this.component.value(t.original),this.clear(),this.draw()},n.prototype.move=function(t){this.active=t,this.draw()},n.prototype.previous=function(){this.move(0===this.active?this.items.length-1:this.active-1)},n.prototype.next=function(){this.move(this.active===this.items.length-1?0:this.active+1)},e.exports=n},{}],7:[function(t,e,i){"use strict";var n=t("xtend"),s=t("fuzzy"),r=t("./list"),o=function(t,e,i){return i=i||{},this.options=n({minLength:2,limit:5,filter:!0},i),this.el=t,this.data=e||[],this.list=new r(this),this.query="",this.selected=null,this.list.draw(),this.el.addEventListener("keyup",function(t){this.handleKeyUp(t.keyCode)}.bind(this),!1),this.el.addEventListener("keydown",function(t){this.handleKeyDown(t)}.bind(this)),this.el.addEventListener("focus",function(){this.handleFocus()}.bind(this)),this.el.addEventListener("blur",function(){this.handleBlur()}.bind(this)),this};o.prototype.handleKeyUp=function(t){if(40!==t&&38!==t&&27!==t&&13!==t&&9!==t)return this.query=this.normalize(this.el.value),this.list.clear(),this.query.length<this.options.minLength?void this.list.draw():void this.getCandidates(function(t){for(var e=0;e<t.length&&(this.list.add(t[e]),e!==this.options.limit-1);e++);this.list.draw()}.bind(this))},o.prototype.handleKeyDown=function(t){switch(t.keyCode){case 13:case 9:this.list.isEmpty()||(this.value(this.list.items[this.list.active].original),this.list.hide());break;case 27:this.list.isEmpty()||this.list.hide();break;case 38:this.list.previous();break;case 40:this.list.next()}},o.prototype.handleBlur=function(){this.list.hide()},o.prototype.handleFocus=function(){this.list.isEmpty()||this.list.show()},o.prototype.update=function(t){this.data=t,this.list.draw()},o.prototype.clear=function(){this.data=[],this.list.clear()},o.prototype.normalize=function(t){return t=t.toLowerCase()},o.prototype.match=function(t,e){return t.indexOf(e)>-1},o.prototype.value=function(t){if(this.selected=t,this.el.value=this.getItemValue(t),document.createEvent){var e=document.createEvent("HTMLEvents");e.initEvent("change",!0,!1),this.el.dispatchEvent(e)}else this.el.fireEvent("onchange")},o.prototype.getCandidates=function(t){var e={pre:"<strong>",post:"</strong>",extract:function(t){return this.getItemValue(t)}.bind(this)},i=this.options.filter?s.filter(this.query,this.data,e):this.data.map(function(t){return{original:t,string:this.getItemValue(t).replace(new RegExp("("+this.query+")","ig"),function(t,e){return"<strong>"+e+"</strong>"})}}.bind(this));t(i)},o.prototype.getItemValue=function(t){return t},e.exports=o},{"./list":6,fuzzy:3,xtend:8}],8:[function(t,e,i){function n(){for(var t={},e=0;e<arguments.length;e++){var i=arguments[e];for(var n in i)s.call(i,n)&&(t[n]=i[n])}return t}e.exports=n;var s=Object.prototype.hasOwnProperty},{}]},{},[1]);
