(this.webpackJsonpfinal_project=this.webpackJsonpfinal_project||[]).push([[0],{54:function(e,t,r){},55:function(e,t,r){},58:function(e,t,r){},60:function(e,t,r){},78:function(e,t,r){"use strict";r.r(t);var n,s,i,c=r(0),a=r.n(c),l=r(2),o=r(11),u=r.n(o),p=r(18),d=r.n(p),h=(r(54),r(1)),b=r(3),j=r(6),f=r(7),v=(r(55),r(47)),O=(r(58),r(9)),m=function(e){Object(j.a)(r,e);var t=Object(f.a)(r);function r(){return Object(h.a)(this,r),t.apply(this,arguments)}return Object(b.a)(r,[{key:"render",value:function(){var e=this;return Object(O.jsx)("div",{className:"marker",onClick:function(){return e.props.onSelect(e.props.place)},style:{backgroundColor:this.props.color,cursor:"pointer"},title:this.props.name})}}]),r}(u.a.Component),x=function(e){Object(j.a)(r,e);var t=Object(f.a)(r);function r(){var e;Object(h.a)(this,r);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).renderInfo=function(t){t.isOwned||(t.isOwned=!0,e.props.onMarkerClick(t))},e}return Object(b.a)(r,[{key:"render",value:function(){for(var e=this,t=[],r=0;r<this.props.places.length;r++)t.push(Object(O.jsx)(m,{lat:this.props.places[r].lat,lng:this.props.places[r].lng,text:"Other Marker",color:this.props.places[r].isOwned?"green":"red",place:this.props.places[r],onSelect:function(t){return e.renderInfo(t)}},"Marker"+r));return Object(O.jsx)("div",{style:{height:"90vh",width:"100%"},children:Object(O.jsx)(v.a,{bootstrapURLKeys:{key:"AIzaSyCBiPt3I-zY_PzgJDpd-ANrtfkrUcM2HfM"},defaultCenter:{lat:0,lng:0},defaultZoom:1,children:t})})}}]),r}(o.Component),g=function(e){Object(j.a)(r,e);var t=Object(f.a)(r);function r(){return Object(h.a)(this,r),t.apply(this,arguments)}return Object(b.a)(r,[{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)("h4",{children:"Your Score Metrics"}),Object(O.jsxs)("p",{children:["Level ",this.props.metricData.level]}),Object(O.jsxs)("p",{children:["Places Owned: ",this.props.metricData.numOwned]}),Object(O.jsxs)("p",{children:["Cash: $",this.props.metricData.credits]})]})}}]),r}(u.a.Component),y=(r(60),function(e){Object(j.a)(r,e);var t=Object(f.a)(r);function r(){return Object(h.a)(this,r),t.apply(this,arguments)}return Object(b.a)(r,[{key:"render",value:function(){if(this.props.isOver){var e=this.props.place.placeData,t=null==e?Object(O.jsx)("span",{children:"Congrats on your treasure find."}):Object(O.jsxs)("span",{children:["Congrats on your purchase of ",e.city,", ",e.country," (population ",e.population,")."]});return Object(O.jsxs)("div",{style:{height:"100%",width:"50%"},children:[Object(O.jsx)("h1",{children:"You Won!"}),Object(O.jsxs)("h3",{children:[t," You can now sort of say that you 'own the world.' Here are your stats:"]}),Object(O.jsx)(g,{metricData:this.props.metrics}),Object(O.jsx)("button",{className:"resetBtn",onClick:this.props.reset,children:"Play Again"})]})}if(this.props.isInit){var r=this.props.place.placeData,n=null==r?Object(O.jsx)("span",{}):Object(O.jsxs)("p",{children:[r.city,", ",r.country,Object(O.jsx)("br",{}),"Population: ",r.population]}),s=this.props.place.lat>0?String(this.props.place.lat).substring(0,7):String(this.props.place.lat).substring(1).substring(0,7),i=this.props.place.lat>0?"N":"S",c=this.props.place.lng>0?String(this.props.place.lng).substring(0,7):String(this.props.place.lng).substring(1).substring(0,7),a=this.props.place.lng>0?"E":"W";return Object(O.jsxs)("div",{style:{height:"100%",width:"50%"},children:[Object(O.jsxs)("p",{children:["You selected a location at coordinates ",s,"\xb0",i,", ",c,"\xb0",a]}),n,Object(O.jsx)(g,{metricData:this.props.metrics})]})}return Object(O.jsxs)("div",{style:{height:"100%",width:"100%"},children:[Object(O.jsx)("h3",{children:"Welcome to a game of both chance and wits!"}),Object(O.jsx)("p",{children:"You're a newly minted billionaire seeking to \"own the world.\" The objective here is to buy all the places shown by the markers on the map with the $1 billion provided. The game is split into levels, and if you go bankrupt trying to buy a place, you'll have to restart the level."}),Object(O.jsx)("p",{children:"The catch here is that the cost of a place is determined by its population, which a player with integrity wouldn't know until they click the marker to buy it. That's right! You're a billionaire who's investing blind for kicks."}),Object(O.jsxs)("p",{children:["Click on a marker to start level ",this.props.metrics.level," of the game."]}),Object(O.jsx)(g,{metricData:this.props.metrics}),Object(O.jsx)("button",{onClick:this.props.onQuit,children:"Quit and Log Out"})]})}}]),r}(u.a.Component)),w=function(e){Object(j.a)(r,e);var t=Object(f.a)(r);function r(){return Object(h.a)(this,r),t.apply(this,arguments)}return Object(b.a)(r,[{key:"render",value:function(){var e=this;return Object(O.jsxs)("div",{className:"float-container",children:[Object(O.jsx)("div",{className:"float-child",children:Object(O.jsx)(x,{places:this.props.currPlaces,onMarkerClick:function(t){e.props.onMapAction(t),e.props.onChange()}})}),Object(O.jsx)("div",{className:"float-child",children:Object(O.jsx)(y,{isInit:this.props.isInit,isOver:this.props.isOver,place:this.props.place,metrics:this.props.metrics,reset:this.props.reset,onQuit:this.props.onQuit})})]})}}]),r}(u.a.Component),I=r(32),L=r.n(I),C=function e(t){var r=this;Object(h.a)(this,e),this.loadGame=function(e){r.level=e.level,r.currLvlIdx=e.currLvlIdx,r.currLvlPlaces=e.currLvlPlaces,r.isLvlInit=e.isLvlInit,r.numOwned=e.numOwned,r.startCredits=e.startCredits,r.currentCredits=e.currentCredits,r.places=e.places,r.placeReadyListeners=[],r.isOver=!1},this.resetGame=function(){r.level=1,r.currLvlIdx=0,r.currLvlPlaces=5,r.isLvlInit=!1,r.numOwned=0,r.startCredits=1e9,r.currentCredits=r.startCredits,r.places=[];for(var e=1;e<=2;e++)for(var t=1;t<5+e;t++)r.places.push({lat:Number(Math.round(120*Math.random()*1e7))/1e7-50,lng:Number(Math.round(360*Math.random()*1e7))/1e7-180,placeData:null,isOwned:!1,isTreasure:!1,lvl:e,index:(e-1)*t});r.placeReadyListeners=[],r.isOver=!1},this.resetPlace=function(e){r.places[e].lat=Number(Math.round(120*Math.random()*1e7))/1e7-50,r.places[e].lng=Number(Math.round(360*Math.random()*1e7))/1e7-180,r.places[e].placeData=null,r.places[e].isOwned=!1,r.places[e].isTreasure=!1},this.addPlaceReadyListener=function(e){r.placeReadyListeners.push(e)},this.levelUp=function(){r.currLvlIdx=r.currLvlIdx+=r.currLvlPlaces,r.level++,r.currLvlPlaces++,r.isLvlInit=!1,r.startCredits=r.currentCredits},this.resetLevel=function(){r.currentCredits=r.startCredits,r.isLvlInit=!1;for(var e=r.currLvlIdx;e<r.currLvlIdx+r.currLvlPlaces;e++)r.resetPlace(e);r.numOwned=r.currLvlIdx},this.indexToIdx=function(e){for(var t=0;t<r.places.length;t++)if(r.places[t].index==e)return t;return-1},this.findPlaceData=function(){var e=Object(l.a)(a.a.mark((function e(t){var n,s,i,c,l,o,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(n=String(t.lat),s=String(t.lng),i=n.indexOf(".")+1,c=n.substring(i).length;c<6;)n+="0",c++;for(c>6&&(n=n.substring(0,i+6)),l=s.indexOf(".")+1,o=s.substring(l).length;o<6;)s+="0",o++;return o>6&&(s=s.substring(0,l+6)),t.lng>0&&(s="+"+s),"."!=s[4]&&(s=s.substring(0,1)+"0"+s.substring(1)),e.next=14,L()({method:"GET",url:"https://wft-geo-db.p.rapidapi.com/v1/geo/locations/"+n+s+"/nearbyCities",params:{limit:"1",minPopulation:"1000",radius:"100"},headers:{"x-rapidapi-key":"b9385517f7msh0db6fd312c19076p1c2f31jsn02a89c97185e","x-rapidapi-host":"wft-geo-db.p.rapidapi.com"}});case 14:u=e.sent.data,r.placeReadyListeners.map((function(e){e(u.data.length>0?u.data[0]:null,t.index)}));case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.verbalAlert=function(){var e=Object(l.a)(a.a.mark((function e(t){var r,n,s,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=String(t),e.next=3,L()({method:"GET",url:"https://voicerss-text-to-speech.p.rapidapi.com/",params:{key:"e4fc13656d804948b8c576a8732f6764",hl:"en-us",src:{message:t},f:"8khz_8bit_mono",c:"mp3",r:"0"},headers:{"x-rapidapi-key":"b9385517f7msh0db6fd312c19076p1c2f31jsn02a89c97185e","x-rapidapi-host":"voicerss-text-to-speech.p.rapidapi.com"},responseType:"blob"});case 3:if(200!=(r=e.sent).status){e.next=11;break}return n=new Blob([r.data],{type:"audio/mp3"}),s=window.URL.createObjectURL(n),(i=new Audio(s)).load(),e.next=11,i.play();case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),this.addTreasure=function(e){r.verbalAlert("Treasure!");var t=r.indexToIdx(e);return r.isLvlInit=!0,r.numOwned++,r.places[t].isTreasure=!0,r.currentCredits+=1e7,!1},this.addPlace=function(e,t){var n=r.indexToIdx(e);return r.isLvlInit=!0,r.places[n].placeData=t,r.numOwned++,r.currentCredits-=1e4*t.population,r.currentCredits<0?(r.resetLevel(),!0):(r.getGift(),!1)},this.getGift=function(){var e=r.places.filter((function(e){return e.isOwned&&!e.isTreasure&&null!=e.placeData}));e.length>0&&(r.currentCredits+=1e4*e[Math.floor(Math.random()*e.length)].placeData.population)},this.getMetrics=function(){return{level:r.level,numOwned:r.numOwned,credits:r.currentCredits}},this.checkLevelOver=function(){for(var e=r.currLvlIdx;e<r.currLvlIdx+r.currLvlPlaces;e++)if(!r.places[e].isOwned)return!1;return r.levelUp(),!0},null!=t?this.loadGame(t):this.resetGame()},k=r(45),P=r(24),M=r(22);Object(k.a)({apiKey:"AIzaSyAiw4SHAIlf53C2leMA3q4F-r3jRJt1SC8",authDomain:"comp-426-final-b5799.firebaseapp.com",projectId:"comp-426-final-b5799",storageBucket:"comp-426-final-b5799.appspot.com",messagingSenderId:"272040014494",appId:"1:272040014494:web:b17bc8da100c4e77d8c18f",measurementId:"G-FB8ZYMPB4H"}),Object(P.b)().onAuthStateChanged((function(e){e?(S=e.uid,T()):(S=null,N(null))}));var S=null;function N(e){d.a.render(Object(O.jsx)(u.a.StrictMode,{children:Object(O.jsxs)("div",{className:"login",children:[Object(O.jsx)("h1",{children:"Log in or create an account for your chance to OWN THE WORLD!"}),Object(O.jsxs)("div",{children:[Object(O.jsx)("label",{children:"Email"}),Object(O.jsx)("input",{id:"emailInput"}),Object(O.jsx)("br",{}),Object(O.jsx)("br",{}),Object(O.jsx)("label",{children:"Password"}),Object(O.jsx)("input",{id:"pwInput"}),Object(O.jsx)("br",{}),Object(O.jsx)("button",{className:"okBtn",onClick:function(){!function(){var e=String(document.getElementById("emailInput").value).trim(),t=String(document.getElementById("pwInput").value).trim();if(0==e.length||0==t.length)return;Object(P.c)(Object(P.b)(),e,t).catch((function(e){e.message}))}(),N("Attempting to log in. If this message persists, log in failed.")},children:"Log In"}),Object(O.jsx)("button",{className:"dangerBtn",onClick:function(){!function(){var e=String(document.getElementById("emailInput").value).trim(),t=String(document.getElementById("pwInput").value).trim();if(0==e.length||0==t.length)return;Object(P.a)(Object(P.b)(),e,t).catch((function(e){e.message}))}(),N("Attempting to create account. If this message persists, account creation failed.")},children:"Create Account"}),null==e?Object(O.jsx)("span",{}):Object(O.jsx)("p",{className:"errorMessage",children:e})]})]})}),document.getElementById("root"))}function D(){Object(P.d)(Object(P.b)())}N(null);var B={toFirestore:function(e){return{level:e.level,currLvlIdx:e.currLvlIdx,currLvlPlaces:e.currLvlPlaces,isLvlInit:e.isLvlInit,numOwned:e.numOwned,startCredits:e.startCredits,currentCredits:e.currentCredits,places:e.places}},fromFirestore:function(e,t){var r=e.data(t),n={level:r.level,currLvlIdx:r.currLvlIdx,currLvlPlaces:r.currLvlPlaces,isLvlInit:r.isLvlInit,numOwned:r.numOwned,startCredits:r.startCredits,currentCredits:r.currentCredits,places:r.places};return new C(n)}};function T(){return A.apply(this,arguments)}function A(){return(A=Object(l.a)(a.a.mark((function e(){var t,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(M.b)(Object(M.d)(),"users",S),e.next=3,Object(M.c)(t.withConverter(B));case 3:r=e.sent,n=r.exists()?r.data():new C(null),s=[],i=null,n.addPlaceReadyListener((function(e,t){return Y(e,t)})),E();case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(){s=n.places.slice(n.currLvlIdx,n.currLvlIdx+n.currLvlPlaces),R()}function R(){d.a.render(Object(O.jsx)(u.a.StrictMode,{children:Object(O.jsx)(w,{onMapAction:function(e){n.isOver||(i=e,n.findPlaceData(e))},isInit:n.isLvlInit,isOver:n.isOver,currPlaces:s,place:i,metrics:n.getMetrics(),onChange:R,reset:z,onQuit:D})}),document.getElementById("root"))}function Y(e,t){(null==e?n.addTreasure(t):n.addPlace(t,e))?function(e){d.a.render(Object(O.jsx)(u.a.StrictMode,{children:Object(O.jsxs)("div",{className:"transition failure",children:[Object(O.jsxs)("h1",{children:["You went bankrupt trying to buy ",e.city,", ",e.country," (population ",e.population,")!"]}),Object(O.jsx)("button",{className:"dangerBtn",onClick:R,children:"Retry Level"})]})}),document.getElementById("root"))}(e):n.numOwned==n.places.length?(n.isOver=!0,R()):(i.placeData=e,n.checkLevelOver()?function(e){!function(){G.apply(this,arguments)}();var t=null==e?Object(O.jsx)("h1",{children:"You leveled up after finding treasure!"}):Object(O.jsxs)("h1",{children:["You leveled up after buying ",e.city,", ",e.country," (population ",e.population,")!"]});d.a.render(Object(O.jsx)(u.a.StrictMode,{children:Object(O.jsxs)("div",{className:"transition success",children:[t,Object(O.jsx)("button",{className:"okBtn",onClick:E,children:"Continue"})]})}),document.getElementById("root"))}(e):R())}function G(){return(G=Object(l.a)(a.a.mark((function e(){var t;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(M.b)(Object(M.d)(),"users",S).withConverter(B),e.next=3,Object(M.e)(t,n);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(){return(U=Object(l.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(M.a)(Object(M.b)(Object(M.d)(),"users",S));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(){n.level>1&&function(){U.apply(this,arguments)}(),n.resetGame(),T()}}},[[78,1,2]]]);
//# sourceMappingURL=main.731d7297.chunk.js.map