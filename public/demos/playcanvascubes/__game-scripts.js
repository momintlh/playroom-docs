var PlayerControl=pc.createScript("playerControl");PlayerControl.attributes.add("speed",{type:"number"}),PlayerControl.attributes.add("boxSize",{type:"vec3"}),PlayerControl.attributes.add("player",{type:"number"}),PlayerControl.attributes.add("defaultPosition",{type:"vec3"});var Movements={up:1,down:2,left:3,right:4,none:5};PlayerControl.prototype.initialize=function(){this.player_movementX=Movements.none,this.player_movementY=Movements.none,this.app.keyboard.on(pc.EVENT_KEYDOWN,this.onKeyDown,this),this.app.keyboard.on(pc.EVENT_KEYUP,this.onKeyUp,this),this.factorForce=1},PlayerControl.prototype.startPlayer=function(e,t,o){this.isPlayer=e,this.playerState=t,this.gamePad=o;var s=this.playerState.getState("position");null!=s&&null!=s||this.entity.setPosition(this.defaultPosition),this.entity.enabled=!0;var i=this;e&&(this.gamePad.joystick.on("move",((e,t)=>{null!=t.direction&&(i.factorForce=t.force<=1?t.force:1,"right"==this.AnalizeAngle(t.angle.degree,"x")?(this.player_movementX=Movements.right,this.setCurrentPosition()):"left"==this.AnalizeAngle(t.angle.degree,"x")?(this.player_movementX=Movements.left,this.setCurrentPosition()):(this.player_movementX=Movements.none,this.setCurrentPosition()),"up"==this.AnalizeAngle(t.angle.degree,"y")?(this.player_movementY=Movements.up,this.setCurrentPosition()):"down"==this.AnalizeAngle(t.angle.degree,"y")?(this.player_movementY=Movements.down,this.setCurrentPosition()):(this.player_movementY=Movements.none,this.setCurrentPosition()))})),this.gamePad.joystick.on("end",(()=>{this.player_movementX=Movements.none,this.player_movementY=Movements.none,this.factorForce=1,this.setCurrentPosition()})))},PlayerControl.prototype.AnalizeAngle=function(e,t){var o="none";return"x"==t?e>=0&&e<=30||e>30&&e<60?o="right":e>=60&&e<=90||e>90&&e<=120?o="none":e>120&&e<150||e>=150&&e<=180||e>180&&e<210||e>210&&e<240?o="left":e>=240&&e<=270||e>270&&e<300?o="none":(e>300&&e<330||e>=330&&e<=360)&&(o="right"):"y"==t&&(e>=0&&e<=30?o="none":e>30&&e<60||e>=60&&e<=90||e>90&&e<=120||e>120&&e<150?o="up":e>=150&&e<=180||e>180&&e<210?o="none":e>210&&e<240||e>=240&&e<=270||e>270&&e<300||e>300&&e<330?o="down":e>=330&&e<=360&&(o="none")),o},PlayerControl.prototype.endPlayer=function(e){this.entity.enabled=!1,this.playerState.setState("position",null),e&&(this.gamePad.joystick.off("move"),this.gamePad.joystick.off("end"))},PlayerControl.prototype.update=function(e){if(this.entity.enabled&&null!=this.playerState)if(this.isPlayer){var t=0,o=0;if(this.player_movementX!=Movements.none)switch(this.player_movementX){case Movements.left:t=-this.speed*e*this.factorForce;break;case Movements.right:t=this.speed*e*this.factorForce}if(this.player_movementY!=Movements.none)switch(this.player_movementY){case Movements.up:o=-this.speed*e*this.factorForce;break;case Movements.down:o=this.speed*e*this.factorForce}this.MovePlayer(t,0,o)}else{var s=this.playerState.getState("position");null!=s&&null!=s&&this.entity.setPosition(s.x,s.y,s.z)}},PlayerControl.prototype.setCurrentPosition=function(){var e=this.entity.getPosition();this.playerState.setState("position",{x:e.x.toFixed(3),y:e.y.toFixed(3),z:e.z.toFixed(3)})},PlayerControl.prototype.onKeyDown=function(e){this.isPlayer&&((e.key==pc.KEY_LEFT&&this.app.keyboard.wasPressed(pc.KEY_LEFT)||e.key==pc.KEY_A&&this.app.keyboard.wasPressed(pc.KEY_A))&&(this.player_movementX=Movements.left,this.setCurrentPosition()),(e.key==pc.KEY_RIGHT&&this.app.keyboard.wasPressed(pc.KEY_RIGHT)||e.key==pc.KEY_D&&this.app.keyboard.wasPressed(pc.KEY_D))&&(this.player_movementX=Movements.right,this.setCurrentPosition()),(e.key==pc.KEY_UP&&this.app.keyboard.wasPressed(pc.KEY_UP)||e.key==pc.KEY_W&&this.app.keyboard.wasPressed(pc.KEY_W))&&(this.player_movementY=Movements.up,this.setCurrentPosition()),(e.key==pc.KEY_DOWN&&this.app.keyboard.wasPressed(pc.KEY_DOWN)||e.key==pc.KEY_S&&this.app.keyboard.wasPressed(pc.KEY_S))&&(this.player_movementY=Movements.down,this.setCurrentPosition()))},PlayerControl.prototype.onKeyUp=function(e){this.isPlayer&&(e.key!=pc.KEY_LEFT&&e.key!=pc.KEY_A||this.player_movementX==Movements.left&&(this.player_movementX=Movements.none,this.setCurrentPosition()),e.key!=pc.KEY_RIGHT&&e.key!=pc.KEY_D||this.player_movementX==Movements.right&&(this.player_movementX=Movements.none,this.setCurrentPosition()),e.key!=pc.KEY_UP&&e.key!=pc.KEY_W||this.player_movementY==Movements.up&&(this.player_movementY=Movements.none,this.setCurrentPosition()),e.key!=pc.KEY_DOWN&&e.key!=pc.KEY_S||this.player_movementY==Movements.down&&(this.player_movementY=Movements.none,this.setCurrentPosition()))},PlayerControl.prototype.MovePlayer=function(e,t,o){this.entity.translateLocal(e,t,o);var s=this.entity.getLocalPosition();s.x<-this.boxSize.x?this.entity.setLocalPosition(-this.boxSize.x,s.y,s.z):s.x>this.boxSize.x&&this.entity.setLocalPosition(this.boxSize.x,s.y,s.z),s.z<-this.boxSize.z?this.entity.setLocalPosition(s.x,s.y,-this.boxSize.z):s.z>this.boxSize.z&&this.entity.setLocalPosition(s.x,s.y,this.boxSize.z),this.setCurrentPosition()};const{onPlayerJoin:onPlayerJoin,insertCoin:insertCoin,isHost:isHost,myPlayer:myPlayer,getState:getState,setState:setState}=Playroom;window._PLAYROOM_CONFIG={skipProfile:!0};var PlayRoomManager=pc.createScript("playRoomManager");PlayRoomManager.attributes.add("playersEntity",{type:"entity",array:!0}),PlayRoomManager.prototype.initialize=async function(){var t=this;this.numPlayers=0,this.numPlayersServer=0,this.playerClass=[null,null,null,null],this.listPlayersForJoin=[],this.playRoom=Playroom,this.instance=this,this.gamePadHost=null,await insertCoin(),console.log("Game started");var e=this.playRoom.getState("numPlayers");null!=e&&null!=e||(e=0),this.numPlayersServer=e,onPlayerJoin((e=>{console.log("Player joined",e),e.id==e.myId&&null==this.gamePadHost&&(this.gamePadHost=t.GamePadConfig(e,"dynamic")),t.AddPlayer(e),e.onQuit((()=>{console.log("Player quit"),t.RemovePlayer(e)}))}))},PlayRoomManager.prototype.GamePadConfig=function(t,e){if("basic_static"==e)var a=new this.playRoom.Joystick(t,{type:"dpad"});else if("dynamic"==e)a=nipplejs.create({color:"green"});else a=null;return new PlayerGamePad(t,a)},PlayRoomManager.prototype.AddPlayer=function(t){var e=!1;if(this.numPlayers=this.numPlayers+1,this.numPlayers>this.numPlayersServer&&(this.numPlayersServer=this.numPlayers,this.playRoom.setState("numPlayers",this.numPlayersServer),e=!0),this.listPlayersForJoin.push(t),e){for(var a=0;a<this.listPlayersForJoin.length;a++){null!=(l=(s=this.listPlayersForJoin[a]).getState("playerNum"))&&null!=l||s.setState("playerNum",this.numPlayers)}for(a=0;a<this.listPlayersForJoin.length;a++){var s,l=this.listPlayersForJoin[a].getState("playerNum"),r=(s=this.listPlayersForJoin[a]).id==s.myId?this.gamePadHost:null;this.playerClass[l-1]=new PlayerClass(s.id,this.playersEntity[l-1],this.playersEntity[l-1].script.playerControl,s.id==s.myId,l,r),this.playerClass[l-1].control.startPlayer(this.playerClass[l-1].host,s,r)}}},PlayRoomManager.prototype.RemovePlayer=function(t){for(var e=this.playerClass.length,a=0;a<e;a++)if(this.playerClass[a].id==t.id){this.playerClass[a].control.endPlayer(),this.playerClass[a]=null;break}for(e=this.listPlayersForJoin.length,a=0;a<e;a++)if(this.listPlayersForJoin[a].id==t.id){this.listPlayersForJoin.splice(a,1);break}this.numPlayers=this.numPlayers-1,this.numPlayersServer=this.numPlayersServer-1,this.playRoom.setState("numPlayers",this.numPlayersServer)},PlayRoomManager.prototype.update=function(t){};class PlayerClass{constructor(t,e,a,s,l,r){this.id=t,this.entity=e,this.control=a,this.host=s,this.playerNum=l,this.pad=r}}class PlayerGamePad{constructor(t,e){this.state=t,this.joystick=e}}!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define("nipplejs",[],i):"object"==typeof exports?exports.nipplejs=i():t.nipplejs=i()}(window,(function(){return function(t){var i={};function e(r){if(i[r])return i[r].exports;var d=i[r]={i:r,l:!1,exports:{}};return t[r].call(d.exports,d,d.exports,e),d.l=!0,d.exports}return e.m=t,e.c=i,e.d=function(t,i,r){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var d in t)e.d(r,d,function(i){return t[i]}.bind(null,d));return r},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,r){"use strict";r.r(i);var d,n=function(t,i){var r=i.x-t.x,d=i.y-t.y;return Math.sqrt(r*r+d*d)},s=function(t){return t*(Math.PI/180)},g=new Map,a=function(t){g.has(t)&&clearTimeout(g.get(t)),g.set(t,setTimeout(t,100))},p=function(t,i,r){for(var d,g=i.split(/[ ,]+/g),b=0;b<g.length;b+=1)d=g[b],t.addEventListener?t.addEventListener(d,r,!1):t.attachEvent&&t.attachEvent(d,r)},c=function(t,i,r){for(var d,g=i.split(/[ ,]+/g),b=0;b<g.length;b+=1)d=g[b],t.removeEventListener?t.removeEventListener(d,r):t.detachEvent&&t.detachEvent(d,r)},l=function(t){return t.preventDefault(),t.type.match(/^touch/)?t.changedTouches:t},h=function(){return{x:void 0!==window.pageXOffset?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop}},u=function(t,i){i.top||i.right||i.bottom||i.left?(t.style.top=i.top,t.style.right=i.right,t.style.bottom=i.bottom,t.style.left=i.left):(t.style.left=i.x+"px",t.style.top=i.y+"px")},f=function(t,i,r){var d=y(t);for(var g in d)if(d.hasOwnProperty(g))if("string"==typeof i)d[g]=i+" "+r;else{for(var b="",x=0,O=i.length;x<O;x+=1)b+=i[x]+" "+r+", ";d[g]=b.slice(0,-2)}return d},y=function(t){var i={};return i[t]="",["webkit","Moz","o"].forEach((function(r){i[r+t.charAt(0).toUpperCase()+t.slice(1)]=""})),i},m=function(t,i){for(var r in i)i.hasOwnProperty(r)&&(t[r]=i[r]);return t},v=function(t,i){if(t.length)for(var r=0,d=t.length;r<d;r+=1)i(t[r]);else i(t)},b=!!("ontouchstart"in window),x=!!window.PointerEvent,O=!!window.MSPointerEvent,w={start:"mousedown",move:"mousemove",end:"mouseup"},T={};function _(){}x?d={start:"pointerdown",move:"pointermove",end:"pointerup, pointercancel"}:O?d={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}:b?(d={start:"touchstart",move:"touchmove",end:"touchend, touchcancel"},T=w):d=w,_.prototype.on=function(t,i){var r,d=t.split(/[ ,]+/g);this._handlers_=this._handlers_||{};for(var g=0;g<d.length;g+=1)r=d[g],this._handlers_[r]=this._handlers_[r]||[],this._handlers_[r].push(i);return this},_.prototype.off=function(t,i){return this._handlers_=this._handlers_||{},void 0===t?this._handlers_={}:void 0===i?this._handlers_[t]=null:this._handlers_[t]&&this._handlers_[t].indexOf(i)>=0&&this._handlers_[t].splice(this._handlers_[t].indexOf(i),1),this},_.prototype.trigger=function(t,i){var r,d=this,g=t.split(/[ ,]+/g);d._handlers_=d._handlers_||{};for(var b=0;b<g.length;b+=1)r=g[b],d._handlers_[r]&&d._handlers_[r].length&&d._handlers_[r].forEach((function(t){t.call(d,{type:r,target:d},i)}))},_.prototype.config=function(t){this.options=this.defaults||{},t&&(this.options=function(t,i){var r={};for(var d in t)t.hasOwnProperty(d)&&i.hasOwnProperty(d)?r[d]=i[d]:t.hasOwnProperty(d)&&(r[d]=t[d]);return r}(this.options,t))},_.prototype.bindEvt=function(t,i){var r=this;return r._domHandlers_=r._domHandlers_||{},r._domHandlers_[i]=function(){"function"==typeof r["on"+i]?r["on"+i].apply(r,arguments):console.warn('[WARNING] : Missing "on'+i+'" handler.')},p(t,d[i],r._domHandlers_[i]),T[i]&&p(t,T[i],r._domHandlers_[i]),r},_.prototype.unbindEvt=function(t,i){return this._domHandlers_=this._domHandlers_||{},c(t,d[i],this._domHandlers_[i]),T[i]&&c(t,T[i],this._domHandlers_[i]),delete this._domHandlers_[i],this};var P=_;function k(t,i){return this.identifier=i.identifier,this.position=i.position,this.frontPosition=i.frontPosition,this.collection=t,this.defaults={size:100,threshold:.1,color:"white",fadeTime:250,dataOnly:!1,restJoystick:!0,restOpacity:.5,mode:"dynamic",zone:document.body,lockX:!1,lockY:!1,shape:"circle"},this.config(i),"dynamic"===this.options.mode&&(this.options.restOpacity=0),this.id=k.id,k.id+=1,this.buildEl().stylize(),this.instance={el:this.ui.el,on:this.on.bind(this),off:this.off.bind(this),show:this.show.bind(this),hide:this.hide.bind(this),add:this.addToDom.bind(this),remove:this.removeFromDom.bind(this),destroy:this.destroy.bind(this),setPosition:this.setPosition.bind(this),resetDirection:this.resetDirection.bind(this),computeDirection:this.computeDirection.bind(this),trigger:this.trigger.bind(this),position:this.position,frontPosition:this.frontPosition,ui:this.ui,identifier:this.identifier,id:this.id,options:this.options},this.instance}k.prototype=new P,k.constructor=k,k.id=0,k.prototype.buildEl=function(t){return this.ui={},this.options.dataOnly||(this.ui.el=document.createElement("div"),this.ui.back=document.createElement("div"),this.ui.front=document.createElement("div"),this.ui.el.className="nipple collection_"+this.collection.id,this.ui.back.className="back",this.ui.front.className="front",this.ui.el.setAttribute("id","nipple_"+this.collection.id+"_"+this.id),this.ui.el.appendChild(this.ui.back),this.ui.el.appendChild(this.ui.front)),this},k.prototype.stylize=function(){if(this.options.dataOnly)return this;var t=this.options.fadeTime+"ms",i=function(t,i){var r=y("borderRadius");for(var d in r)r.hasOwnProperty(d)&&(r[d]="50%");return r}(),r=f("transition","opacity",t),d={};return d.el={position:"absolute",opacity:this.options.restOpacity,display:"block",zIndex:999},d.back={position:"absolute",display:"block",width:this.options.size+"px",height:this.options.size+"px",marginLeft:-this.options.size/2+"px",marginTop:-this.options.size/2+"px",background:this.options.color,opacity:".5"},d.front={width:this.options.size/2+"px",height:this.options.size/2+"px",position:"absolute",display:"block",marginLeft:-this.options.size/4+"px",marginTop:-this.options.size/4+"px",background:this.options.color,opacity:".5",transform:"translate(0px, 0px)"},m(d.el,r),"circle"===this.options.shape&&m(d.back,i),m(d.front,i),this.applyStyles(d),this},k.prototype.applyStyles=function(t){for(var i in this.ui)if(this.ui.hasOwnProperty(i))for(var r in t[i])this.ui[i].style[r]=t[i][r];return this},k.prototype.addToDom=function(){return this.options.dataOnly||document.body.contains(this.ui.el)||this.options.zone.appendChild(this.ui.el),this},k.prototype.removeFromDom=function(){return this.options.dataOnly||!document.body.contains(this.ui.el)||this.options.zone.removeChild(this.ui.el),this},k.prototype.destroy=function(){clearTimeout(this.removeTimeout),clearTimeout(this.showTimeout),clearTimeout(this.restTimeout),this.trigger("destroyed",this.instance),this.removeFromDom(),this.off()},k.prototype.show=function(t){var i=this;return i.options.dataOnly||(clearTimeout(i.removeTimeout),clearTimeout(i.showTimeout),clearTimeout(i.restTimeout),i.addToDom(),i.restCallback(),setTimeout((function(){i.ui.el.style.opacity=1}),0),i.showTimeout=setTimeout((function(){i.trigger("shown",i.instance),"function"==typeof t&&t.call(this)}),i.options.fadeTime)),i},k.prototype.hide=function(t){var i=this;if(i.options.dataOnly)return i;if(i.ui.el.style.opacity=i.options.restOpacity,clearTimeout(i.removeTimeout),clearTimeout(i.showTimeout),clearTimeout(i.restTimeout),i.removeTimeout=setTimeout((function(){var r="dynamic"===i.options.mode?"none":"block";i.ui.el.style.display=r,"function"==typeof t&&t.call(i),i.trigger("hidden",i.instance)}),i.options.fadeTime),i.options.restJoystick){var r=i.options.restJoystick,d={};d.x=!0===r||!1!==r.x?0:i.instance.frontPosition.x,d.y=!0===r||!1!==r.y?0:i.instance.frontPosition.y,i.setPosition(t,d)}return i},k.prototype.setPosition=function(t,i){var r=this;r.frontPosition={x:i.x,y:i.y};var d=r.options.fadeTime+"ms",g={};g.front=f("transition",["transform"],d);var b={front:{}};b.front={transform:"translate("+r.frontPosition.x+"px,"+r.frontPosition.y+"px)"},r.applyStyles(g),r.applyStyles(b),r.restTimeout=setTimeout((function(){"function"==typeof t&&t.call(r),r.restCallback()}),r.options.fadeTime)},k.prototype.restCallback=function(){var t={};t.front=f("transition","none",""),this.applyStyles(t),this.trigger("rested",this.instance)},k.prototype.resetDirection=function(){this.direction={x:!1,y:!1,angle:!1}},k.prototype.computeDirection=function(t){var i,r,d,g=t.angle.radian,b=Math.PI/4,x=Math.PI/2;if(g>b&&g<3*b&&!t.lockX?i="up":g>-b&&g<=b&&!t.lockY?i="left":g>3*-b&&g<=-b&&!t.lockX?i="down":t.lockY||(i="right"),t.lockY||(r=g>-x&&g<x?"left":"right"),t.lockX||(d=g>0?"up":"down"),t.force>this.options.threshold){var O,w={};for(O in this.direction)this.direction.hasOwnProperty(O)&&(w[O]=this.direction[O]);var T={};for(O in this.direction={x:r,y:d,angle:i},t.direction=this.direction,w)w[O]===this.direction[O]&&(T[O]=!0);if(T.x&&T.y&&T.angle)return t;T.x&&T.y||this.trigger("plain",t),T.x||this.trigger("plain:"+r,t),T.y||this.trigger("plain:"+d,t),T.angle||this.trigger("dir dir:"+i,t)}else this.resetDirection();return t};var I=k;function E(t,i){this.nipples=[],this.idles=[],this.actives=[],this.ids=[],this.pressureIntervals={},this.manager=t,this.id=E.id,E.id+=1,this.defaults={zone:document.body,multitouch:!1,maxNumberOfNipples:10,mode:"dynamic",position:{top:0,left:0},catchDistance:200,size:100,threshold:.1,color:"white",fadeTime:250,dataOnly:!1,restJoystick:!0,restOpacity:.5,lockX:!1,lockY:!1,shape:"circle",dynamicPage:!1,follow:!1},this.config(i),"static"!==this.options.mode&&"semi"!==this.options.mode||(this.options.multitouch=!1),this.options.multitouch||(this.options.maxNumberOfNipples=1);var r=getComputedStyle(this.options.zone.parentElement);return r&&"flex"===r.display&&(this.parentIsFlex=!0),this.updateBox(),this.prepareNipples(),this.bindings(),this.begin(),this.nipples}E.prototype=new P,E.constructor=E,E.id=0,E.prototype.prepareNipples=function(){var t=this.nipples;t.on=this.on.bind(this),t.off=this.off.bind(this),t.options=this.options,t.destroy=this.destroy.bind(this),t.ids=this.ids,t.id=this.id,t.processOnMove=this.processOnMove.bind(this),t.processOnEnd=this.processOnEnd.bind(this),t.get=function(i){if(void 0===i)return t[0];for(var r=0,d=t.length;r<d;r+=1)if(t[r].identifier===i)return t[r];return!1}},E.prototype.bindings=function(){this.bindEvt(this.options.zone,"start"),this.options.zone.style.touchAction="none",this.options.zone.style.msTouchAction="none"},E.prototype.begin=function(){var t=this.options;if("static"===t.mode){var i=this.createNipple(t.position,this.manager.getIdentifier());i.add(),this.idles.push(i)}},E.prototype.createNipple=function(t,i){var r=this.manager.scroll,d={},g=this.options,b=this.parentIsFlex?r.x:r.x+this.box.left,x=this.parentIsFlex?r.y:r.y+this.box.top;if(t.x&&t.y)d={x:t.x-b,y:t.y-x};else if(t.top||t.right||t.bottom||t.left){var O=document.createElement("DIV");O.style.display="hidden",O.style.top=t.top,O.style.right=t.right,O.style.bottom=t.bottom,O.style.left=t.left,O.style.position="absolute",g.zone.appendChild(O);var w=O.getBoundingClientRect();g.zone.removeChild(O),d=t,t={x:w.left+r.x,y:w.top+r.y}}var T=new I(this,{color:g.color,size:g.size,threshold:g.threshold,fadeTime:g.fadeTime,dataOnly:g.dataOnly,restJoystick:g.restJoystick,restOpacity:g.restOpacity,mode:g.mode,identifier:i,position:t,zone:g.zone,frontPosition:{x:0,y:0},shape:g.shape});return g.dataOnly||(u(T.ui.el,d),u(T.ui.front,T.frontPosition)),this.nipples.push(T),this.trigger("added "+T.identifier+":added",T),this.manager.trigger("added "+T.identifier+":added",T),this.bindNipple(T),T},E.prototype.updateBox=function(){this.box=this.options.zone.getBoundingClientRect()},E.prototype.bindNipple=function(t){var i,r=this,o=function(t,d){i=t.type+" "+d.id+":"+t.type,r.trigger(i,d)};t.on("destroyed",r.onDestroyed.bind(r)),t.on("shown hidden rested dir plain",o),t.on("dir:up dir:right dir:down dir:left",o),t.on("plain:up plain:right plain:down plain:left",o)},E.prototype.pressureFn=function(t,i,r){var d=this,g=0;clearInterval(d.pressureIntervals[r]),d.pressureIntervals[r]=setInterval(function(){var r=t.force||t.pressure||t.webkitForce||0;r!==g&&(i.trigger("pressure",r),d.trigger("pressure "+i.identifier+":pressure",r),g=r)}.bind(d),100)},E.prototype.onstart=function(t){var i=this,r=i.options,d=t;return t=l(t),i.updateBox(),v(t,(function(g){i.actives.length<r.maxNumberOfNipples?i.processOnStart(g):d.type.match(/^touch/)&&(Object.keys(i.manager.ids).forEach((function(r){if(Object.values(d.touches).findIndex((function(t){return t.identifier===r}))<0){var g=[t[0]];g.identifier=r,i.processOnEnd(g)}})),i.actives.length<r.maxNumberOfNipples&&i.processOnStart(g))})),i.manager.bindDocument(),!1},E.prototype.processOnStart=function(t){var i,r=this,d=r.options,g=r.manager.getIdentifier(t),b=t.force||t.pressure||t.webkitForce||0,x={x:t.pageX,y:t.pageY},O=r.getOrCreate(g,x);O.identifier!==g&&r.manager.removeIdentifier(O.identifier),O.identifier=g;var p=function(i){i.trigger("start",i),r.trigger("start "+i.id+":start",i),i.show(),b>0&&r.pressureFn(t,i,i.identifier),r.processOnMove(t)};if((i=r.idles.indexOf(O))>=0&&r.idles.splice(i,1),r.actives.push(O),r.ids.push(O.identifier),"semi"!==d.mode)p(O);else{if(!(n(x,O.position)<=d.catchDistance))return O.destroy(),void r.processOnStart(t);p(O)}return O},E.prototype.getOrCreate=function(t,i){var r,d=this.options;return/(semi|static)/.test(d.mode)?(r=this.idles[0])?(this.idles.splice(0,1),r):"semi"===d.mode?this.createNipple(i,t):(console.warn("Coudln't find the needed nipple."),!1):r=this.createNipple(i,t)},E.prototype.processOnMove=function(t){var i=this.options,r=this.manager.getIdentifier(t),d=this.nipples.get(r),g=this.manager.scroll;if(function(t){return isNaN(t.buttons)?0!==t.pressure:0!==t.buttons}(t)){if(!d)return console.error("Found zombie joystick with ID "+r),void this.manager.removeIdentifier(r);if(i.dynamicPage){var b=d.el.getBoundingClientRect();d.position={x:g.x+b.left,y:g.y+b.top}}d.identifier=r;var x=d.options.size/2,O={x:t.pageX,y:t.pageY};i.lockX&&(O.y=d.position.y),i.lockY&&(O.x=d.position.x);var w,T,P,I,D,M,C,N,S,j,F=n(O,d.position),X=(w=O,P=(T=d.position).x-w.x,I=T.y-w.y,function(t){return t*(180/Math.PI)}(Math.atan2(I,P))),Y=s(X),A=F/x,H={distance:F,position:O};if("circle"===d.options.shape?(D=Math.min(F,x),C=d.position,N=D,j={x:0,y:0},S=s(S=X),j.x=C.x-N*Math.cos(S),j.y=C.y-N*Math.sin(S),M=j):(M=function(t,i,r){return{x:Math.min(Math.max(t.x,i.x-r),i.x+r),y:Math.min(Math.max(t.y,i.y-r),i.y+r)}}(O,d.position,x),D=n(M,d.position)),i.follow){if(F>x){var B=O.x-M.x,L=O.y-M.y;d.position.x+=B,d.position.y+=L,d.el.style.top=d.position.y-(this.box.top+g.y)+"px",d.el.style.left=d.position.x-(this.box.left+g.x)+"px",F=n(O,d.position)}}else O=M,F=D;var J=O.x-d.position.x,R=O.y-d.position.y;d.frontPosition={x:J,y:R},i.dataOnly||(d.ui.front.style.transform="translate("+J+"px,"+R+"px)");var U={identifier:d.identifier,position:O,force:A,pressure:t.force||t.pressure||t.webkitForce||0,distance:F,angle:{radian:Y,degree:X},vector:{x:J/x,y:-R/x},raw:H,instance:d,lockX:i.lockX,lockY:i.lockY};(U=d.computeDirection(U)).angle={radian:s(180-X),degree:180-X},d.trigger("move",U),this.trigger("move "+d.id+":move",U)}else this.processOnEnd(t)},E.prototype.processOnEnd=function(t){var i=this,r=i.options,d=i.manager.getIdentifier(t),g=i.nipples.get(d),b=i.manager.removeIdentifier(g.identifier);g&&(r.dataOnly||g.hide((function(){"dynamic"===r.mode&&(g.trigger("removed",g),i.trigger("removed "+g.id+":removed",g),i.manager.trigger("removed "+g.id+":removed",g),g.destroy())})),clearInterval(i.pressureIntervals[g.identifier]),g.resetDirection(),g.trigger("end",g),i.trigger("end "+g.id+":end",g),i.ids.indexOf(g.identifier)>=0&&i.ids.splice(i.ids.indexOf(g.identifier),1),i.actives.indexOf(g)>=0&&i.actives.splice(i.actives.indexOf(g),1),/(semi|static)/.test(r.mode)?i.idles.push(g):i.nipples.indexOf(g)>=0&&i.nipples.splice(i.nipples.indexOf(g),1),i.manager.unbindDocument(),/(semi|static)/.test(r.mode)&&(i.manager.ids[b.id]=b.identifier))},E.prototype.onDestroyed=function(t,i){this.nipples.indexOf(i)>=0&&this.nipples.splice(this.nipples.indexOf(i),1),this.actives.indexOf(i)>=0&&this.actives.splice(this.actives.indexOf(i),1),this.idles.indexOf(i)>=0&&this.idles.splice(this.idles.indexOf(i),1),this.ids.indexOf(i.identifier)>=0&&this.ids.splice(this.ids.indexOf(i.identifier),1),this.manager.removeIdentifier(i.identifier),this.manager.unbindDocument()},E.prototype.destroy=function(){for(var t in this.unbindEvt(this.options.zone,"start"),this.nipples.forEach((function(t){t.destroy()})),this.pressureIntervals)this.pressureIntervals.hasOwnProperty(t)&&clearInterval(this.pressureIntervals[t]);this.trigger("destroyed",this.nipples),this.manager.unbindDocument(),this.off()};var D=E;function z(t){var i=this;i.ids={},i.index=0,i.collections=[],i.scroll=h(),i.config(t),i.prepareCollections();var e=function(){var t;i.collections.forEach((function(r){r.forEach((function(r){t=r.el.getBoundingClientRect(),r.position={x:i.scroll.x+t.left,y:i.scroll.y+t.top}}))}))};p(window,"resize",(function(){a(e)}));var o=function(){i.scroll=h()};return p(window,"scroll",(function(){a(o)})),i.collections}z.prototype=new P,z.constructor=z,z.prototype.prepareCollections=function(){var t=this;t.collections.create=t.create.bind(t),t.collections.on=t.on.bind(t),t.collections.off=t.off.bind(t),t.collections.destroy=t.destroy.bind(t),t.collections.get=function(i){var r;return t.collections.every((function(t){return!(r=t.get(i))})),r}},z.prototype.create=function(t){return this.createCollection(t)},z.prototype.createCollection=function(t){var i=new D(this,t);return this.bindCollection(i),this.collections.push(i),i},z.prototype.bindCollection=function(t){var i,r=this,o=function(t,d){i=t.type+" "+d.id+":"+t.type,r.trigger(i,d)};t.on("destroyed",r.onDestroyed.bind(r)),t.on("shown hidden rested dir plain",o),t.on("dir:up dir:right dir:down dir:left",o),t.on("plain:up plain:right plain:down plain:left",o)},z.prototype.bindDocument=function(){this.binded||(this.bindEvt(document,"move").bindEvt(document,"end"),this.binded=!0)},z.prototype.unbindDocument=function(t){Object.keys(this.ids).length&&!0!==t||(this.unbindEvt(document,"move").unbindEvt(document,"end"),this.binded=!1)},z.prototype.getIdentifier=function(t){var i;return t?void 0===(i=void 0===t.identifier?t.pointerId:t.identifier)&&(i=this.latest||0):i=this.index,void 0===this.ids[i]&&(this.ids[i]=this.index,this.index+=1),this.latest=i,this.ids[i]},z.prototype.removeIdentifier=function(t){var i={};for(var r in this.ids)if(this.ids[r]===t){i.id=r,i.identifier=this.ids[r],delete this.ids[r];break}return i},z.prototype.onmove=function(t){return this.onAny("move",t),!1},z.prototype.onend=function(t){return this.onAny("end",t),!1},z.prototype.oncancel=function(t){return this.onAny("end",t),!1},z.prototype.onAny=function(t,i){var r,d=this,g="processOn"+t.charAt(0).toUpperCase()+t.slice(1);i=l(i);var s=function(t,i,r){r.ids.indexOf(i)>=0&&(r[g](t),t._found_=!0)};return v(i,(function(t){r=d.getIdentifier(t),v(d.collections,s.bind(null,t,r)),t._found_||d.removeIdentifier(r)})),!1},z.prototype.destroy=function(){this.unbindDocument(!0),this.ids={},this.index=0,this.collections.forEach((function(t){t.destroy()})),this.off()},z.prototype.onDestroyed=function(t,i){if(this.collections.indexOf(i)<0)return!1;this.collections.splice(this.collections.indexOf(i),1)};var M=new z;i.default={create:function(t){return M.create(t)},factory:M}}]).default}));