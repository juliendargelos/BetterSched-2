var eventsManager={on:function(n,e,t){t.addEventListener(n,e,!1)},no:function(n,e,t){t.removeEventListener(n,e)},apply:function(n){n.on=function(n,e){window.eventsManager.on(n,e,this)},n.no=function(n,e){window.eventsManager.no(n,e,this)}},init:function(){this.apply(window),this.apply(Node.prototype)}};eventsManager.init();var scroll={get top(){return document.body.scrollTop||document.documentElement.scrollTop},set top(o){document.body.scrollTop=document.documentElement.scrollTop=o}};var standalone={get support(){return"standalone"in window.navigator},get is(){return!!this.support&&1==window.navigator.standalone},init:function(){this.is&&document.body.setAttribute("data-standalone",!0)}};standalone.init();var links={elements:document.getElementsByTagName("a"),stop:/^(a|html)$/i,relative:/^[a-z\+\.\-]+:/i,transition:300,url:document.location.protocol+"//"+document.location.host,set loading(t){t?document.body.setAttribute("data-loadpage",!0):document.body.removeAttribute("data-loadpage")},onclick:function(t){var e=this;return function(n){n.preventDefault();var o=t.href;o.replace(document.location.href,"").indexOf("#")&&(o.match(e.relative)||o.indexOf(e.url))&&(n.preventDefault(),e.loading=!0,setTimeout(function(){document.location.href=t.href},e.transition))}},init:function(){for(var t=0;t<this.elements.length;t++){var e=this.elements[t];e.on("click",this.onclick(e)),e.on("touchstart",this.onclick(e))}}};links.init();