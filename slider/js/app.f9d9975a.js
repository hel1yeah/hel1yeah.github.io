(function(){"use strict";var e={7095:function(e,n,t){var i=t(8935),s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"},on:{touchstart:e.touchStart}},[t("app-carusel",{on:{next:e.next,prev:e.prev}},e._l(e.slides,(function(n,i){return t("carusel-slide",{key:n+"+"+i,class:e.slideClass(i),attrs:{index:i,mainIndex:e.mainIndex,mainClass:e.slideClass(i),img:n.img}})})),1)],1)},r=[],a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"carusel"},[e._t("default"),t("button",{staticClass:"carusel__next",on:{click:e.next}},[e._v("<")]),t("button",{staticClass:"carusel__prev",on:{click:e.prev}},[e._v(">")])],2)},o=[],u={name:"AppCarusel",data(){return{}},methods:{next(){this.$emit("next")},prev(){this.$emit("prev")}}},l=u,c=t(1001),d=(0,c.Z)(l,a,o,!1,null,"e93871aa",null),h=d.exports,p=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"carusel__slide"},[t("div",{staticClass:"slide",style:[{background:"url("+e.img+")","background-size":"cover","background-position":"center","background-repeat":"no-repeat"}]},["carusel__slide--main"===e.mainClass?[t("div",{staticClass:"slide__border"}),t("div",{staticClass:"slide__shadow"})]:e._e(),e._t("default")],2)])},f=[],m={props:["mainIndex","mainClass","img"],data(){return{}}},g=m,v=(0,c.Z)(g,p,f,!1,null,null,null),x=v.exports,_={name:"App",components:{AppCarusel:h,CaruselSlide:x},data(){return{slides:[{img:t(8982)},{img:t(6467)},{img:t(4803)},{img:t(1394)},{img:t(4457)},{img:t(7410)}],mainIndex:0}},computed:{slidesLength(){return this.slides.length},nextIndex(){return this.slidesLength===this.mainIndex+1?0:this.mainIndex+1},prevIndex(){return 0===this.mainIndex?this.slidesLength-1:this.mainIndex-1}},methods:{next(){this.direction="left",this.mainIndex>=this.slidesLength-1?this.mainIndex=0:this.mainIndex++},prev(){this.direction="right",this.mainIndex<=0?this.mainIndex=this.slidesLength-1:this.mainIndex--},isMainSlide(e){return this.mainIndex===e},isNextSlide(e){return this.nextIndex===e},isPrevSlide(e){return this.prevIndex===e},slideClass(e){return this.isMainSlide(e)?"carusel__slide--main":this.isNextSlide(e)?"carusel__slide--next":this.isPrevSlide(e)?"carusel__slide--prev":"carusel__slide--hidden"},touchStart(e){if(console.log(e),1!==e.changedTouches.length)return;const n=e.changedTouches[0].clientX;addEventListener("touchend",(e=>this.touchEnd(e,n)),{once:!0})},touchEnd(e,n){if(1!==e.changedTouches.length)return;const t=e.changedTouches[0].clientX;n<t?this.prev():n>t&&this.next()}}},b=_,I=(0,c.Z)(b,s,r,!1,null,null,null),C=I.exports;i.Z.config.productionTip=!1,new i.Z({render:e=>e(C)}).$mount("#app")},8982:function(e,n,t){e.exports=t.p+"img/mashina.e794be3b.jpg"},6467:function(e,n,t){e.exports=t.p+"img/mashina_sportkar.9185d74f.jpg"},4803:function(e,n,t){e.exports=t.p+"img/mashina_staryj.4ca76604.jpg"},1394:function(e,n,t){e.exports=t.p+"img/nadpis.ceaaa742.jpg"},4457:function(e,n,t){e.exports=t.p+"img/nochnoj.bc18bf95.jpg"},7410:function(e,n,t){e.exports=t.p+"img/squad.b1f60067.jpg"}},n={};function t(i){var s=n[i];if(void 0!==s)return s.exports;var r=n[i]={exports:{}};return e[i](r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(n,i,s,r){if(!i){var a=1/0;for(c=0;c<e.length;c++){i=e[c][0],s=e[c][1],r=e[c][2];for(var o=!0,u=0;u<i.length;u++)(!1&r||a>=r)&&Object.keys(t.O).every((function(e){return t.O[e](i[u])}))?i.splice(u--,1):(o=!1,r<a&&(a=r));if(o){e.splice(c--,1);var l=s();void 0!==l&&(n=l)}}return n}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[i,s,r]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.p="/"}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,i){var s,r,a=i[0],o=i[1],u=i[2],l=0;if(a.some((function(n){return 0!==e[n]}))){for(s in o)t.o(o,s)&&(t.m[s]=o[s]);if(u)var c=u(t)}for(n&&n(i);l<a.length;l++)r=a[l],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(c)},i=self["webpackChunkcarusel"]=self["webpackChunkcarusel"]||[];i.forEach(n.bind(null,0)),i.push=n.bind(null,i.push.bind(i))}();var i=t.O(void 0,[998],(function(){return t(7095)}));i=t.O(i)})();
//# sourceMappingURL=app.f9d9975a.js.map