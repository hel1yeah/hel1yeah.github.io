var F=Object.defineProperty,O=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var b=(t,e,i)=>e in t?F(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,v=(t,e)=>{for(var i in e||(e={}))E.call(e,i)&&b(t,i,e[i]);if(f)for(var i of f(e))j.call(e,i)&&b(t,i,e[i]);return t},_=(t,e)=>O(t,R(e));import{r as m,o as h,c as l,a as c,w as x,b as M,A as y,T as o,S as p,d as g,e as C,f as T,C as w,g as q,h as H,i as U,m as D,j as N,k as W,l as z,n as V}from"./vendor.4a3f02d2.js";const K=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}};K();var u=(t,e)=>{const i=t.__vccOpts||t;for(const[n,r]of e)i[n]=r;return i};const J={},Q={class:"ticker-text"},X=M(" \u0420\u043E\u0441\u0456\u0439\u0441\u044C\u043A\u0438\u0439 \u0432\u0456\u0439\u0441\u044C\u043A\u043E\u0432\u0438\u0439 \u043A\u043E\u0440\u0430\u0431\u0435\u043B\u044C, \u0456\u0434\u0438 \u043D\u0430\u0445\u0443\u0439 ");function Y(t,e,i,n,r,s){const a=m("marquee");return h(),l("div",Q,[c(a,{class:"ticker-text__marquee",behavior:"scroll",direction:"left"},{default:x(()=>[X]),_:1})])}var Z=u(J,[["render",Y]]),tt="./assets/bg.8d21653c.png",S="./assets/ground.4b0cd316.png",et="./assets/pipe-bottom.b5e9b3f9.png",it="./assets/pipe-top.9ce28f04.png",rt="./assets/clue-tap.19f498b5.png",B="./assets/fly-bird1.ac666f18.png",P="./assets/fly-bird2.e1b4e5aa.png",G="./assets/fly-bird3.ecc68629.png";const st={name:"AppGame",data(){return{gameStart:!1,gameFinish:!1,counterStart:0,app:{game:null,width:225,height:400},bird:{alienImages:[B,P,G],textureArray:[],animatedSpray:null,x:30,y:150},pipe:{pipeTextureBottom:null,pipeSpriteBottom:null,pipeTextureTop:null,pipeSpriteTop:null,pipeDdistance:100,x:255,By:200,Ty:0,height:251},ground:{groundTexture:null,tilingSpriteGround:null,x:0,y:370},clue:{textureClue:null,spriteClue:null,x:82,y:220},scoreText:{style:null,text:"0",score:0,x:100,y:30},bgTexture:null,tilingSpriteBG:null,countSin:0,jumping:0}},computed:{},created(){},mounted(){this.drawPixi(),this.listener()},methods:{drawPixi(){let t=document.querySelector(".wrapper");this.app.game=new y({transparent:!0,width:this.app.width,height:this.app.height,interactive:!0,buttonMode:!0}),this.app.game.stage.on("click",()=>{this.gameFinish||(this.gameStart?this.jumping=8:this.start())}),t.appendChild(this.app.game.view),this.app.game.stage.interactive=!0,this.addText(),this.renderSourse(),this.stageAdd(),this.setPositionPipe(),this.setPositionClue(),this.setPositionScoreText();for(let e=0;e<this.bird.alienImages.length;e++){let i=o.from(this.bird.alienImages[e]);this.bird.textureArray.push(i)}this.createdAnimatedSprite(),this.app.game.ticker.add(()=>{this.gameFinish?(this.bird.animatedSpray.position.set(this.bird.x,this.bird.y),this.circulationBird()):(this.moveGround(),this.moveBg(),this.gameStart&&(this.jumping&&this.moveBird(),this.jumping>=50&&(this.jumping=0),this.bird.animatedSpray.position.set(this.bird.x,this.bird.y),this.gravitiBird(),this.movePipe(),this.setPositionPipe(),this.hitTopPipe(),this.hitBottomPipe(),this.hitGround(),this.climbsBorders()))})},renderSourse(){this.bgTexture=o.from(tt),this.pipe.pipeTextureBottom=o.from(et),this.pipe.pipeSpriteBottom=p.from(this.pipe.pipeTextureBottom),this.pipe.pipeTextureTop=o.from(it),this.pipe.pipeSpriteTop=p.from(this.pipe.pipeTextureTop),this.ground.groundTexture=o.from(S),this.clue.textureClue=o.from(rt),this.clue.spriteClue=p.from(this.clue.textureClue),this.tilingSpriteBG=new g(this.bgTexture,225,400),this.ground.tilingSpriteGround=new g(this.ground.groundTexture,263,86),this.ground.tilingSpriteGround.position.set(this.ground.x,this.ground.y)},createdAnimatedSprite(){this.bird.animatedSpray=new C(this.bird.textureArray),this.bird.animatedSpray.position.set(this.bird.x,this.bird.y),this.app.game.stage.addChild(this.bird.animatedSpray),this.bird.animatedSpray.animationSpeed=.12,this.bird.animatedSpray.rotation,this.bird.animatedSpray.width=27,this.bird.animatedSpray.height=19,this.bird.animatedSpray.scale.x=1,this.bird.animatedSpray.scale.y=1,this.bird.animatedSpray.play()},addText(){this.scoreText.text=new T(this.scoreText.text,{fontFamily:"BF",fontSize:30,fontWeight:"bold",fill:["#ffffff"],stroke:"#000",strokeThickness:5})},stageAdd(){this.app.game.stage.addChild(this.tilingSpriteBG),this.app.game.stage.addChild(this.pipe.pipeSpriteBottom),this.app.game.stage.addChild(this.pipe.pipeSpriteTop),this.app.game.stage.addChild(this.ground.tilingSpriteGround),this.app.game.stage.addChild(this.clue.spriteClue),this.app.game.stage.addChild(this.scoreText.text)},setPositionPipe(){this.pipe.pipeSpriteBottom.position.set(this.pipe.x,this.pipe.By),this.pipe.pipeSpriteTop.position.set(this.pipe.x,this.pipe.By-this.pipe.height-this.pipe.pipeDdistance)},setPositionClue(){this.clue.spriteClue.position.set(this.clue.x,this.clue.y)},setPositionText(){this.clue.spriteClue.position.set(this.clue.x,this.clue.y)},setPositionScoreText(){const t=this.app.width/2-10;this.scoreText.text.position.set(t,this.scoreText.y)},setScoreText(){this.scoreText.score++,this.scoreText.text.text=`${this.scoreText.score}`},gravitiBird(){this.bird.animatedSpray.rotation>=1?this.bird.animatedSpray.rotation=this.bird.animatedSpray.rotation:this.bird.animatedSpray.rotation+=.02,this.bird.y+=2},moveBird(){this.bird.animatedSpray.rotation=-.6,this.bird.y-=10,this.jumping+=8},circulationBird(){this.countSin+=.001,this.countSin>.1?this.countSin=0:(this.bird.animatedSpray.rotation+=.1,this.bird.animatedSpray.scale.x+=Math.sin(this.countSin),this.bird.animatedSpray.scale.y+=Math.sin(this.countSin)),this.bird.y>200?this.bird.y-=10:this.bird.y-=4,this.bird.x+=2},moveBg(){this.tilingSpriteBG.tilePosition.x-=1.2},moveGround(){this.ground.tilingSpriteGround.tilePosition.x-=2.2},movePipe(){this.pipe.Ty=this.pipe.By-this.pipe.height-this.pipe.pipeDdistance,this.pipe.x<this.bird.x&&this.pipe.x>this.bird.x-2&&this.setScoreText(),this.pipe.x<=-42&&(this.pipe.x=225,this.pipe.By=this.randomHeight()),this.pipe.x-=2},hitTopPipe(){let t=this.bird.y,e=this.bird.x+this.bird.animatedSpray.width,i=this.bird.y+this.bird.animatedSpray.height,n=this.bird.x,r=this.pipe.By-this.pipe.height-this.pipe.pipeDdistance,s=this.pipe.x+this.pipe.pipeSpriteTop.width,a=this.pipe.Ty+this.pipe.pipeSpriteTop.height,d=this.pipe.x;t<a&&e>d&&n<s&&i>r&&(this.finish(),console.log("\u0441\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044F \u0432\u0435\u0440\u0445\u043D\u0435\u0439 \u0442\u0440\u0443\u0431\u044B"))},hitBottomPipe(){let t=this.bird.y,e=this.bird.x+this.bird.animatedSpray.width,i=this.bird.y+this.bird.animatedSpray.height,n=this.bird.x,r=this.pipe.By,s=this.pipe.x+this.pipe.pipeSpriteBottom.width,a=this.pipe.By+this.pipe.pipeSpriteBottom.height,d=this.pipe.x;t<a&&e>d&&n<s&&i>r&&(console.log("\u0441\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u044F \u043D\u0438\u0436\u043D\u0435\u0439 \u0442\u0440\u0443\u0431\u044B"),this.finish())},hitGround(){let t=this.bird.y+this.bird.animatedSpray.height,e=this.ground.tilingSpriteGround.y;t>e&&(console.log("\u0441\u0442\u043E\u043B\u043A\u043D\u043E\u0432\u0435\u043D\u0438\u0435 \u0441 \u0437\u0435\u043C\u043B\u0451\u0439"),this.finish())},climbsBorders(){this.bird.y<=0&&console.log("\u0437\u0430 \u0440\u0430\u043C\u043A\u043E\u0439 ")},start(){this.gameStart=!this.gameStart,this.app.game.stage.removeChild(this.clue.spriteClue)},finish(){this.gameStart=!this.gameStart,this.gameFinish=!0,this.$store.dispatch("setScore",this.scoreText.score),this.$router.push({name:"game-over"})},chekGame(){this.gameStart?this.moveBird():this.start()},listener(){window.addEventListener("keydown",t=>{(t.key==="ArrowUp"||t.code==="Space")&&this.chekGame()}),window.addEventListener("touchend",t=>{this.chekGame()})},randomHeight(){return Math.round(Math.random()*(350-220)+220)}}},ot={class:"wrapper"};function nt(t,e,i,n,r,s){return h(),l("div",ot)}var $=u(st,[["render",nt],["__scopeId","data-v-2ca4bede"]]),I="./assets/start.c5df343b.png",at="./assets/flappy.06d0c787.png",pt="./assets/bird-l.af5dbccb.png",k="./assets/pointer.9a513f6a.png";const ht={name:"Home",data(){return{app:{game:null,width:225,height:400},bird:{alienImages:[B,P,G],textureArray:[],animatedSpray:null,x:158,y:0,width:27,height:19},logoFlappy:{x:0,y:0,texture:null,sprite:null,width:80,height:32},logoBird:{x:85,y:0,texture:null,sprite:null,width:54,height:28},logoContainer:{container:null,x:20,y:150},ground:{groundTexture:null,tilingSpriteGround:null,x:0,y:350},buttonStart:{width:64,height:22,x:80,y:270,texture:null,sprite:null},logoContainer:{container:null,x:20,y:150},factor:1}},mounted(){this.drawPixi(),this.listener()},methods:{startGame(){this.$router.push({name:"game"})},drawPixi(){let t=document.querySelector(".home");this.app.game=new y({transparent:!0,width:this.app.width,height:this.app.height}),t.appendChild(this.app.game.view);for(let e=0;e<this.bird.alienImages.length;e++){let i=o.from(this.bird.alienImages[e]);this.bird.textureArray.push(i)}this.bird.animatedSpray=new C(this.bird.textureArray),this.app.game.stage.addChild(this.bird.animatedSpray),this.bird.animatedSpray.animationSpeed=.05,this.bird.animatedSpray.play(),this.setCursorPointer(),this.createdContainer(),this.setPositionContainer(),this.downloadTexture(),this.createdSprites(),this.addSpriteInContainer(),this.addSpriteInGame(),this.setPositionSpritesInContainer(),this.setPositionSpritesInGame(),this.buttonStart.sprite.interactive=!0,this.buttonStart.sprite.buttonMode=!0,this.buttonStart.sprite.on("click",()=>this.startGame()),this.app.game.ticker.add(()=>{this.moveContainer(),this.moveGround()})},createdContainer(){this.logoContainer.container=new w,this.app.game.stage.addChild(this.logoContainer.container),this.logoContainer.container.position.set(this.logoContainer.x,this.logoContainer.y)},setPositionContainer(){this.logoContainer.container.position.set(this.logoContainer.x,this.logoContainer.y)},moveContainer(){this.logoContainer.y>=150?this.factor=-1:this.logoContainer.y<=140&&(this.factor=1),this.logoContainer.y+=.25*this.factor,this.setPositionContainer()},moveGround(){this.ground.tilingSpriteGround.tilePosition.x-=1.1},downloadTexture(){this.logoFlappy.texture=o.from(at),this.logoBird.texture=o.from(pt),this.buttonStart.texture=o.from(I),this.ground.groundTexture=o.from(S)},createdSprites(){this.logoFlappy.sprite=p.from(this.logoFlappy.texture),this.logoBird.sprite=p.from(this.logoBird.texture),this.buttonStart.sprite=p.from(this.buttonStart.texture),this.ground.tilingSpriteGround=new g(this.ground.groundTexture,263,86)},addSpriteInContainer(){this.logoContainer.container.addChild(this.logoFlappy.sprite),this.logoContainer.container.addChild(this.logoBird.sprite),this.logoContainer.container.addChild(this.bird.animatedSpray)},addSpriteInGame(){this.app.game.stage.addChild(this.ground.tilingSpriteGround),this.app.game.stage.addChild(this.buttonStart.sprite)},setPositionSpritesInContainer(){this.logoFlappy.sprite.position.set(this.logoFlappy.x,this.logoFlappy.y),this.logoBird.sprite.position.set(this.logoBird.x+2,this.logoBird.y),this.bird.animatedSpray.position.set(this.bird.x,(this.logoContainer.container.height-this.bird.animatedSpray.height)/2-4)},setPositionSpritesInGame(){this.ground.tilingSpriteGround.position.set(this.ground.x,this.ground.y),this.buttonStart.sprite.position.set(this.buttonStart.x,this.buttonStart.y)},setCursorPointer(){const t=`url(${k}),auto`;this.app.game.renderer.plugins.interaction.cursorStyles.pointer=t},listener(){window.addEventListener("keydown",t=>{t.key==="Enter"&&this.startGame()}),window.addEventListener("touchend",t=>{this.startGame()})}}},dt={class:"home"};function lt(t,e,i,n,r,s){return h(),l("div",dt)}var A=u(ht,[["render",lt]]);const ut={name:"app",components:{AppGame:$,AppHome:A,AppTickerText:Z},data(){return{}},computed:{gameStage(){return"AppGame"}}},ct={class:"container"};function gt(t,e,i,n,r,s){const a=m("router-view"),d=m("app-ticker-text");return h(),l("div",ct,[c(a,null,{default:x(({Component:L})=>[c(q,{name:"fade",mode:"out-in"},{default:x(()=>[(h(),H(U(L)))]),_:2},1024)]),_:1}),c(d)])}var mt=u(ut,[["render",gt]]),xt="./assets/game-over.e994b22e.png",yt="./assets/ghost-bird.8c04698a.png";const St={name:"Home",data(){return{app:{game:null,width:225,height:400},bird:{texture:null,sprite:null,x:158,y:5,width:27,height:19},gameOver:{x:0,y:0,texture:null,sprite:null,width:80,height:32},logoContainer:{container:null,x:20,y:150},ground:{groundTexture:null,tilingSpriteGround:null,x:0,y:350},buttonStart:{width:64,height:22,x:80,y:270,texture:null,sprite:null},logoContainer:{container:null,x:20,y:150},recordText:{style:null,text:"0",score:0,x:5,y:5},factor:1}},mounted(){this.drawPixi(),this.listener()},computed:_(v({},D({record:t=>t.record})),{isRecord(){const t=localStorage.getItem("record");return t||0}}),methods:{startGame(){this.$router.push({name:"game"})},drawPixi(){let t=document.querySelector(".game-over");this.app.game=new y({transparent:!0,width:this.app.width,height:this.app.height}),t.appendChild(this.app.game.view),this.addText(),this.setPositionRecordText(),this.stageAdd(),this.setCursorPointer(),this.createdContainer(),this.setPositionContainer(),this.downloadTexture(),this.createdSprites(),this.addSpriteInContainer(),this.addSpriteInGame(),this.setPositionSpritesInContainer(),this.setPositionSpritesInGame(),this.buttonStart.sprite.interactive=!0,this.buttonStart.sprite.buttonMode=!0,this.buttonStart.sprite.on("click",()=>this.startGame()),this.app.game.ticker.add(()=>{this.moveContainer(),this.moveGround()})},createdContainer(){this.logoContainer.container=new w,this.app.game.stage.addChild(this.logoContainer.container),this.logoContainer.container.position.set(this.logoContainer.x,this.logoContainer.y)},setPositionContainer(){this.logoContainer.container.position.set(this.logoContainer.x,this.logoContainer.y)},moveContainer(){this.logoContainer.y>=150?this.factor=-1:this.logoContainer.y<=140&&(this.factor=1),this.logoContainer.y+=.25*this.factor,this.setPositionContainer()},stageAdd(){this.app.game.stage.addChild(this.recordText.text)},addText(){this.recordText.text=new T(`record: ${this.isRecord}`,{fontFamily:"BF",fontSize:22,fontWeight:"bold",fill:["#ffffff"],stroke:"#000",strokeThickness:5})},moveGround(){this.ground.tilingSpriteGround.tilePosition.x-=1.1},setPositionRecordText(){this.recordText.text.position.set(this.recordText.x,this.recordText.y)},downloadTexture(){this.gameOver.texture=o.from(xt),this.bird.texture=o.from(yt),this.buttonStart.texture=o.from(I),this.ground.groundTexture=o.from(S)},createdSprites(){this.gameOver.sprite=p.from(this.gameOver.texture),this.bird.sprite=p.from(this.bird.texture),this.buttonStart.sprite=p.from(this.buttonStart.texture),this.ground.tilingSpriteGround=new g(this.ground.groundTexture,263,86)},addSpriteInContainer(){this.logoContainer.container.addChild(this.gameOver.sprite),this.logoContainer.container.addChild(this.bird.sprite)},addSpriteInGame(){this.app.game.stage.addChild(this.ground.tilingSpriteGround),this.app.game.stage.addChild(this.buttonStart.sprite)},setPositionSpritesInContainer(){this.gameOver.sprite.position.set(this.gameOver.x,this.gameOver.y),this.bird.sprite.position.set(this.bird.x,this.bird.y)},setPositionSpritesInGame(){this.ground.tilingSpriteGround.position.set(this.ground.x,this.ground.y),this.buttonStart.sprite.position.set(this.buttonStart.x,this.buttonStart.y),this.bird.sprite.position.set(this.bird.x,this.bird.y)},setCursorPointer(){const t=`url(${k}),auto`;this.app.game.renderer.plugins.interaction.cursorStyles.pointer=t},listener(){window.addEventListener("keydown",t=>{t.key==="Enter"&&this.startGame()}),window.addEventListener("touchend",t=>{this.startGame()})}}},ft={class:"game-over"};function bt(t,e,i,n,r,s){return h(),l("div",ft)}var vt=u(St,[["render",bt],["__scopeId","data-v-4af608a8"]]);const _t=[{path:"/",name:"home",component:A,meta:{transition:"slide-left"}},{path:"/game",name:"game",component:$,meta:{transition:"slide-left"}},{path:"/game-over",name:"game-over",component:vt,meta:{transition:"slide-left"}}],Ct=N({history:W(),routes:_t,linkActiveClass:"active",linkExactActiveClass:"active"});var Tt=z({state:{record:0},mutations:{setScoreSuccess(t,e){t.record=e}},actions:{setScore({commit:t},e){const i=localStorage.getItem("record");i?i<e&&localStorage.setItem("record",e):localStorage.setItem("record",e)}}});const wt=V(mt);wt.use(Ct).use(Tt).mount("#app");
