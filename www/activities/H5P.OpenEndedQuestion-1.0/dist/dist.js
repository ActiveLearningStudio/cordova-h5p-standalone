!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";H5P.OpenEndedQuestion=n(1).default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),n(3);var u=n(2),c=r(u),s=function(e){function t(e){var n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,arguments.length>2&&void 0!==arguments[2]?arguments[2]:{});i(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),a=e.question,u=void 0===a?"Do you like cake?":a,s=e.placeholderText,l=void 0===s?"":s,p=e.inputRows,d=void 0===p?1:p;return r.currentInput="",r.xApiGenerator=new c.default(u),r.inputElement=null,r.createQuestion=function(e){var t=document.createElement("div");return t.className="h5p-open-ended-question-text",t.innerHTML=e,t},r.createInput=function(e,t){var n=document.createElement("textarea");return n.innerHTML=t||"",n.placeholder=n.innerText,n.textContent=this.currentInput,n.rows=e,n.style.resize="none",n},r.attach=function(e){var t=this,n=document.createElement("div");n.classList.add("h5p-open-ended-question");var r=document.createElement("div");r.classList.add("h5p-open-ended-question-question"),r.classList.add("h5p-subcontent-question");var i=this.createQuestion(u);r.appendChild(i);var o=document.createElement("div");o.classList.add("h5p-open-ended-question-content"),o.classList.add("h5p-subcontent-body");var a=this.createInput(d,l);a.className="h5p-open-ended-question-input",a.addEventListener("blur",function(){var e=t.createXAPIEventTemplate("interacted"),n=t.xApiGenerator.generateXApi(e,a.value);t.currentInput=a.value,t.trigger(n)}),a.addEventListener("keydown",function(){return t.trigger("changed")}),this.inputElement=a,o.appendChild(a),n.appendChild(r),n.appendChild(o),e.get(0).appendChild(n)},r.getCurrentState=function(){return this.currentInput},r.restorePreviousState=function(){n.previousState&&(this.currentInput=n.previousState)},r.resetTask=function(){this.currentInput="",null!=this.inputElement&&(this.inputElement.value="")},r.restorePreviousState(),r}return a(t,e),t}(H5P.EventDispatcher);t.default=s},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t){n(this,e),this.event={description:{"en-US":t},type:"http://adlnet.gov/expapi/activities/cmi.interaction",interactionType:"fill-in"}}return i(e,[{key:"generateXApi",value:function(e,t){var n=e.data.statement;if(r(n,{result:{response:t}}),n.object){var i=n.object.definition;r(i,this.event)}return e}}]),e}();t.default=o},function(e,t){}]);