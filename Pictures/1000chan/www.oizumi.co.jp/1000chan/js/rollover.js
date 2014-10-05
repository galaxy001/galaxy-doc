
// <img src="xxxxxx_off.xx">を
// mouseoverでxxxxxx_on.xxに
// mouseoverでxxxxxx_off.xxに変えます

function rollover(){
	var readImg=new Array();
	var imgTag=document.getElementsByTagName("img");
	
	for(i=0;i<imgTag.length;i++){
		if(imgTag[i].getAttribute("src").match("_off.")){
			
			readImg[i]=new Image();
			readImg[i].src=imgTag[i].getAttribute("src").replace("_off.","_on.");
			
			imgTag[i].onmouseover=function(){
				this.setAttribute("src", this.getAttribute("src").replace("_off.", "_on."));
			}
			imgTag[i].onmouseout=function(){
				this.setAttribute("src", this.getAttribute("src").replace("_on.", "_off."));
			}
		}
	}
}
	
try{
	window.addEventListener("load",rollover,false);
}catch(e){
	window.attachEvent("onload",rollover);
}