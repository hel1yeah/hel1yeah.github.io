(function(e){function t(t){for(var c,i,r=t[0],o=t[1],l=t[2],d=0,b=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&b.push(s[i][0]),s[i]=0;for(c in o)Object.prototype.hasOwnProperty.call(o,c)&&(e[c]=o[c]);u&&u(t);while(b.length)b.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],c=!0,r=1;r<a.length;r++){var o=a[r];0!==s[o]&&(c=!1)}c&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var c={},s={app:0},n=[];function i(t){if(c[t])return c[t].exports;var a=c[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=c,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)i.d(a,c,function(t){return e[t]}.bind(null,c));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],o=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var u=o;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0fbe":function(e,t,a){},2144:function(e,t,a){},2206:function(e,t,a){e.exports=a.p+"app/img/hel1-logo.4d8d8553.svg"},"290c":function(e,t,a){e.exports=a.p+"app/img/google.c1a51ce8.svg"},"2a4f":function(e,t,a){e.exports=a.p+"app/img/linkedin.c8dc3a1b.svg"},4210:function(e,t,a){"use strict";a("9c9a")},"49d1":function(e,t,a){"use strict";a("ebeb")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var c=a("7a23"),s=Object(c["E"])("data-v-43a72bc2");Object(c["t"])("data-v-43a72bc2");var n={id:"app","data-theme":"light"};Object(c["r"])();var i=s((function(e,t,a,s,i,r){var o=Object(c["x"])("Header"),l=Object(c["x"])("AboutMe"),u=Object(c["x"])("Skills"),d=Object(c["x"])("Works"),b=Object(c["x"])("Footer");return Object(c["q"])(),Object(c["d"])("div",n,[Object(c["h"])(o),Object(c["h"])(l),Object(c["h"])(u),Object(c["h"])(d),Object(c["h"])(b)])})),r=a("2206"),o=a.n(r),l=a("a9bb"),u=a.n(l),d=Object(c["E"])("data-v-14010232");Object(c["t"])("data-v-14010232");var b={class:"header"},m={class:"container"},j={class:"header__inner-wrapper"},v={class:"header__nav"},p=Object(c["h"])("img",{class:"header__logo",src:o.a,alt:"hel1-logo.svg"},null,-1),O=Object(c["h"])("span",{class:"burger-menu-piece"},null,-1),h=Object(c["h"])("span",{class:"burger-menu-piece"},null,-1),f=Object(c["h"])("span",{class:"burger-menu-piece"},null,-1),_={class:"header__menu-item"},g={href:"#"},k=Object(c["g"])("обо мне"),w={class:"header__menu-item"},y={href:"#"},x=Object(c["g"])("навыки"),M={class:"header__menu-item"},S={href:"#"},q=Object(c["g"])("работы"),A=Object(c["h"])("a",{class:"header__email",href:"mailto:hel1_yeah@ukr.net"},"hel1_yeah@ukr.net",-1),P=Object(c["h"])("div",{class:"header__title"},[Object(c["h"])("h1",null,"дело, которым я живу"),Object(c["h"])("p",null,"вёрстка & front-end")],-1),L={class:"header__arrow-down"},E={class:"header__arrow-down--img",src:u.a,alt:"down-arrow"};Object(c["r"])();var C=d((function(e,t,a,s,n,i){var r=Object(c["x"])("ArrayUp"),o=Object(c["x"])("MobileMenu"),l=Object(c["y"])("scroll-to");return Object(c["q"])(),Object(c["d"])("section",b,[Object(c["h"])("div",m,[Object(c["h"])("div",j,[Object(c["h"])("nav",v,[p,Object(c["h"])("div",{class:"burger-menu",onClick:t[1]||(t[1]=function(e){return i.useBurger()}),ref:"burgerMenu"},[O,h,f],512),Object(c["h"])("ul",{class:["header__menu",{active:n.isActive}]},[Object(c["h"])("li",_,[Object(c["D"])(Object(c["h"])("a",g,[k],512),[[l,"#about-me"]])]),Object(c["h"])("li",w,[Object(c["D"])(Object(c["h"])("a",y,[x],512),[[l,"#skills"]])]),Object(c["h"])("li",M,[Object(c["D"])(Object(c["h"])("a",S,[q],512),[[l,"#works"]])])],2),A]),P,Object(c["h"])("a",L,[Object(c["D"])(Object(c["h"])("img",E,null,512),[[l,"#about-me"]])])])]),Object(c["h"])(r),Object(c["h"])(o,{isActive:n.isActive,onCloseModal:i.useBurger},null,8,["isActive","onCloseModal"])])})),I=a("5743"),T=a.n(I),D=Object(c["E"])("data-v-fac0387a");Object(c["t"])("data-v-fac0387a");var F=Object(c["h"])("img",{class:"arrow-up__img",src:T.a,alt:"arrow-up"},null,-1);Object(c["r"])();var U=D((function(e,t,a,s,n,i){return n.scroll>400?(Object(c["q"])(),Object(c["d"])("a",{key:0,class:"arrow-up",onClick:t[1]||(t[1]=function(){return i.handleTop&&i.handleTop.apply(i,arguments)})},[F])):Object(c["e"])("",!0)})),H={name:"ArrayUp",data:function(){return{scroll:null}},methods:{handleTop:function(){window.scrollTo({top:0})},handleScroll:function(){this.scroll=window.scrollY}},computed:{},created:function(){window.addEventListener("scroll",this.handleScroll)}};a("6768");H.render=U,H.__scopeId="data-v-fac0387a";var W=H,B=Object(c["E"])("data-v-3265650a");Object(c["t"])("data-v-3265650a");var J={class:"mobile-menu__item"},G=Object(c["g"])("обо мне"),Y={class:"mobile-menu__item"},$=Object(c["g"])("навыки"),V={class:"mobile-menu__item"},Q=Object(c["g"])("работы");Object(c["r"])();var R=B((function(e,t,a,s,n,i){var r=Object(c["y"])("scroll-to");return Object(c["q"])(),Object(c["d"])("ul",{class:["mobile-menu__list",{active:a.isActive}]},[Object(c["h"])("li",J,[Object(c["D"])(Object(c["h"])("a",{onClick:t[1]||(t[1]=function(){return i.closeModal&&i.closeModal.apply(i,arguments)}),class:"mobile-menu__item--link",href:"#"},[G],512),[[r,"#about-me"]])]),Object(c["h"])("li",Y,[Object(c["D"])(Object(c["h"])("a",{onClick:t[2]||(t[2]=function(){return i.closeModal&&i.closeModal.apply(i,arguments)}),class:"mobile-menu__item--link",href:"#"},[$],512),[[r,"#skills"]])]),Object(c["h"])("li",V,[Object(c["D"])(Object(c["h"])("a",{onClick:t[3]||(t[3]=function(){return i.closeModal&&i.closeModal.apply(i,arguments)}),class:"mobile-menu__item--link",href:"#"},[Q],512),[[r,"#works"]])])],2)})),z={name:"MobileMenu",emits:["closeModal"],props:{isActive:{type:Boolean,required:!0}},methods:{closeModal:function(){this.$emit("closeModal")}}};a("b9ef");z.render=R,z.__scopeId="data-v-3265650a";var K=z,N={name:"Header",components:{ArrayUp:W,MobileMenu:K},data:function(){return{isActive:!1}},methods:{useBurger:function(){var e=500,t=document.querySelector("body"),a=this.$refs.burgerMenu;a.classList.toggle("active"),t.classList.toggle("close"),this.isActive=!this.isActive,a.classList.contains("active")||a.classList.add("closing"),setTimeout((function(){a.classList.remove("closing")}),e)}}};a("700f");N.render=C,N.__scopeId="data-v-14010232";var X=N,Z=(a("9911"),Object(c["E"])("data-v-74583a53"));Object(c["t"])("data-v-74583a53");var ee={class:"about-me",id:"about-me"},te={class:"container"},ae={class:"about-me__inner-wrapper"},ce=Object(c["h"])("h2",{class:"about-me__title"},"Обо мне",-1),se={class:"about-me__gread"},ne=Object(c["f"])('<div class="about-me__background" data-v-74583a53><h3 class="about-me__background-title" data-v-74583a53>Бэкграунд</h3><p class="about-me__background-descr" data-v-74583a53> Junior Front - End Developer. В мир Web-разработки попал случайно, по работе нужно было разобраться в некоторых тонкостях этой сферы. И я разобрался. Потратив огромное количество часов на всевозможные статьи и видео, эта вселенная оставила очень большое впечатление. </p><p class="about-me__background-descr" data-v-74583a53> Настолько большое, что вместо того чтобы отдыхать после работы, я, сам того не замечая, засиживался До позднего вечера за разработкой. Так Front-End стал для меня хобби, которым мне хочется заниматься. </p><p class="about-me__background-descr" data-v-74583a53> Изучив самостоятельно HTML5, CSS3, Photoshop, мне всё ещё казалось, что я чего-то не знаю. Следующий шаг - курсы, к сожалению, выделил из них мало чего полезного для себя, потому что большую часть материала знал до этого. Дальше - я взялся за изучение: jQuery, Gulp, GitHub, Git, Figma. Сейчас я изучаю JavaScript, дальше будет <s data-v-74583a53>React </s> Vue.js! </p><p class="about-me__background-descr" data-v-74583a53> Если у Вас есть советы, пожелания, предложения по практике или работе, буду рад знакомству! </p></div>',1),ie={class:"wrapper__merit-links"},re=Object(c["f"])('<div class="about-me__merit" data-v-74583a53><h3 class="about-me__merit-title" data-v-74583a53>Заслуги</h3><div class="merit-wrapper" data-v-74583a53><div class="merit__item" data-v-74583a53><div class="merit__item-square-outside" data-v-74583a53><div class="merit__item-square-inside" data-v-74583a53><p class="merit__item-square-inside-txt" data-v-74583a53>101%</p></div></div><span class="merit__item--descr" data-v-74583a53>Обучаемость</span></div><div class="merit__item" data-v-74583a53><div class="merit__item-square-outside" data-v-74583a53><div class="merit__item-square-inside" data-v-74583a53><p class="merit__item-square-inside-txt" data-v-74583a53>777</p></div></div><span class="merit__item--descr" data-v-74583a53>Удача</span></div><div class="merit__item" data-v-74583a53><div class="merit__item-square-outside" data-v-74583a53><div class="merit__item-square-inside" data-v-74583a53><p class="merit__item-square-inside-txt" data-v-74583a53>100%</p></div></div><span class="merit__item--descr" data-v-74583a53>Преданность <br data-v-74583a53> королю</span></div></div></div>',1),oe={class:"about-me__links"},le=Object(c["h"])("h3",{class:"about-me__links-title"},"Связь",-1),ue={class:"about-me__links-list"};Object(c["r"])();var de=Z((function(e,t,a,s,n,i){return Object(c["q"])(),Object(c["d"])("section",ee,[Object(c["h"])("div",te,[Object(c["h"])("div",ae,[ce,Object(c["h"])("div",se,[ne,Object(c["h"])("div",ie,[re,Object(c["h"])("div",oe,[le,Object(c["h"])("ul",ue,[(Object(c["q"])(!0),Object(c["d"])(c["a"],null,Object(c["w"])(e.links,(function(e,t){return Object(c["q"])(),Object(c["d"])("li",{class:"about-me__links-list-item",key:t},[Object(c["h"])("a",{class:"about-me__link",title:e.title,href:e.link,target:"_blank"},Object(c["A"])(e.text),9,["title","href"]),Object(c["h"])("img",{class:"about-me__link-img",src:e.img,alt:e.title},null,8,["src","alt"])])})),128))])])])])])])])})),be=a("5530"),me=a("5502"),je={name:"AboutMe",data:function(){return{}},computed:Object(be["a"])({},Object(me["b"])({links:function(e){return e.isLinks}})),methods:{}};a("4210");je.render=de,je.__scopeId="data-v-74583a53";var ve=je,pe=(a("b0c0"),Object(c["E"])("data-v-4a61acd2"));Object(c["t"])("data-v-4a61acd2");var Oe={class:"skills",id:"skills"},he={class:"container"},fe=Object(c["h"])("h2",{class:"skills__title"},"Навыки",-1),_e={class:"skills__content"},ge={class:"skills__content--item"},ke={class:"circle"},we={class:"circle-inner"},ye={class:"circle-inner__txt"},xe={class:"skills-descr"};Object(c["r"])();var Me=pe((function(e,t,a,s,n,i){return Object(c["q"])(),Object(c["d"])("section",Oe,[Object(c["h"])("div",he,[fe,Object(c["h"])("div",_e,[Object(c["h"])("div",ge,[(Object(c["q"])(!0),Object(c["d"])(c["a"],null,Object(c["w"])(e.skills,(function(e){return Object(c["q"])(),Object(c["d"])("div",{class:"content-item",key:e.level},[Object(c["h"])("div",ke,[Object(c["h"])("div",we,[Object(c["h"])("span",ye,Object(c["A"])(e.level),1)])]),Object(c["h"])("span",xe,Object(c["A"])(e.name),1)])})),128))])])])])})),Se={name:"c",data:function(){return{}},computed:Object(be["a"])({},Object(me["b"])({skills:function(e){return e.isSkills}}))};a("ea84");Se.render=Me,Se.__scopeId="data-v-4a61acd2";var qe=Se,Ae=Object(c["E"])("data-v-6ef2739e");Object(c["t"])("data-v-6ef2739e");var Pe={class:"works",id:"works"},Le={class:"container"},Ee=Object(c["h"])("h2",{class:"works__title"},"Работы",-1),Ce={class:"works__content"},Ie={class:"content-item__info"},Te={class:"works__name"},De={class:"works__descr"};Object(c["r"])();var Fe=Ae((function(e,t,a,s,n,i){return Object(c["q"])(),Object(c["d"])("section",Pe,[Object(c["h"])("div",Le,[Ee,Object(c["h"])("div",Ce,[(Object(c["q"])(!0),Object(c["d"])(c["a"],null,Object(c["w"])(e.projects,(function(e){return Object(c["q"])(),Object(c["d"])("div",{class:"works__content-item",key:e.id,style:{backgroundImage:"url(".concat(e.demo,")")}},[Object(c["h"])("div",Ie,[Object(c["h"])("h5",Te,Object(c["A"])(e.name),1),Object(c["h"])("p",De,Object(c["A"])(e.descr),1),null!=e.link?(Object(c["q"])(),Object(c["d"])("a",{key:0,class:"works__link",href:e.link,target:"_blank",rel:"noopener noreferrer"},"Сайт: "+Object(c["A"])(e.name),9,["href"])):Object(c["e"])("",!0)])],4)})),128))])])])})),Ue={name:"Works",data:function(){return{}},methods:{getWorks:function(){this.$store.dispatch("getWorks")}},computed:Object(be["a"])({},Object(me["b"])({projects:function(e){return e.isProjects}})),mounted:function(){this.getWorks()}};a("d55d");Ue.render=Fe,Ue.__scopeId="data-v-6ef2739e";var He=Ue,We=Object(c["E"])("data-v-6f67e7b8");Object(c["t"])("data-v-6f67e7b8");var Be={class:"footer"},Je=Object(c["h"])("div",{class:"container"},[Object(c["h"])("span",{class:"footer-txt"},"2019-2099 / СМОТРЮ В БУДУЩЕЕ")],-1);Object(c["r"])();var Ge=We((function(e,t,a,s,n,i){return Object(c["q"])(),Object(c["d"])("footer",Be,[Je])})),Ye={name:"Footer"};a("49d1");Ye.render=Ge,Ye.__scopeId="data-v-6f67e7b8";var $e=Ye,Ve={name:"app",components:{Header:X,AboutMe:ve,Skills:qe,Works:He,Footer:$e},data:function(){return{}}};a("ee5f");Ve.render=i,Ve.__scopeId="data-v-43a72bc2";var Qe=Ve,Re=a("6c02"),ze=[],Ke=Object(Re["a"])({history:Object(Re["b"])("/"),routes:ze}),Ne=Ke,Xe=(a("d3b7"),a("bc3a")),Ze=a.n(Xe),et=Object(me["a"])({state:{isLinks:[{title:"facebook",link:"https://www.facebook.com/YuraLarsen",text:"facebook.com/YuraLarsen",img:a("c50f")},{title:"linkedin",link:"https://www.linkedin.com/in/yura-larsen/",text:"linkedin.com/in/yura-larsen",img:a("2a4f")},{title:"github",link:"https://github.com/hel1yeah",text:"github: hel1yeah",img:a("d050")},{title:"telegram",link:"https://t.me/hel1_yeah",text:"telegram: @hel1_yeah ",img:a("773a")},{title:"ukr.net",link:"mailto:hel1_yeah@ukr.net",text:"hel1_yeah@ukr.net",img:a("c175")},{title:"gmail",link:"mailto:hel1rockua@gmail.com",text:"hel1rockua@gmail.com",img:a("290c")}],isSkills:[{name:"HTML5",level:"75%"},{name:"CSS3, SCSS, BEM",level:"79%"},{name:"лень",level:"0.1%"},{name:"adaptive",level:"79%"},{name:"JavaScript",level:"82%"},{name:"Vue.js",level:"85%"},{name:"git, github",level:"55%"},{name:"PHOTOSHOP, FIGMA",level:"76%"},{name:"Elementary",level:"A2"},{name:"humor",level:"69 (:"}],isProjects:null,isLoading:!1,error:null},mutations:{isProjectsUploadStart:function(e){e.isProjects=null,e.isLoading=!0},isProjectsUploadSuccess:function(e,t){e.isProjects=t,e.isLoading=!1},isProjectsUploadFailure:function(e,t){e.isProjects=null,e.error=t,e.isLoading=!1}},actions:{getWorks:function(e){var t=e.commit;return t("isProjectsUploadStart"),new Promise((function(e){Ze.a.get("https://hel1-yeah-default-rtdb.europe-west1.firebasedatabase.app/works-data.json").then((function(e){200===e.status&&t("isProjectsUploadSuccess",e.data)})).catch((function(e){t("isProjectsUploadFailure",e)}))}))}},modules:{}}),tt=a("f13c"),at=a.n(tt),ct=(a("f5df1"),a("c1c3"),Object(c["c"])(Qe));ct.use(et),ct.use(Ne),ct.use(at.a,{container:"body",duration:700,easing:"line",offset:-60,force:!0,cancelable:!0,onStart:!1,onDone:!1,onCancel:!1,x:!1,y:!0}),ct.mount("#app")},5743:function(e,t,a){e.exports=a.p+"app/img/up-arrow.578dbefb.svg"},"673a":function(e,t,a){},6768:function(e,t,a){"use strict";a("2144")},"700f":function(e,t,a){"use strict";a("9894")},7419:function(e,t,a){},"773a":function(e,t,a){e.exports=a.p+"app/img/telegram.ad08c789.svg"},9894:function(e,t,a){},"9c9a":function(e,t,a){},a9bb:function(e,t,a){e.exports=a.p+"app/img/down-arrow.a2ca7056.svg"},b9ef:function(e,t,a){"use strict";a("0fbe")},c175:function(e,t,a){e.exports=a.p+"app/img/mail.31eab1a1.svg"},c1c3:function(e,t,a){},c50f:function(e,t,a){e.exports=a.p+"app/img/facebook.2428b23c.svg"},d050:function(e,t,a){e.exports=a.p+"app/img/github.46db3990.svg"},d55d:function(e,t,a){"use strict";a("673a")},ea84:function(e,t,a){"use strict";a("fa88")},ebeb:function(e,t,a){},ee5f:function(e,t,a){"use strict";a("7419")},fa88:function(e,t,a){}});