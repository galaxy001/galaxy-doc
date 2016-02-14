(function(){var a=(function(){var a={};var b=function(b,c,d){var e=b.split(".");for(var f=0;f<e.length-1;f++){if(!d[e[f]])d[e[f]]={};d=d[e[f]];}if(typeof c==="function")if(c.isClass)d[e[f]]=c;else d[e[f]]=function(){return c.apply(a,arguments);};else d[e[f]]=c;};var c=function(c,d,e){b(c,d,a);if(e)b(c,d,window.filepicker);};var d=function(b,d,e){if(typeof b==="function"){e=d;d=b;b='';}if(b)b+=".";var f=d.call(a);for(var g in f)c(b+g,f[g],e);};var e=function(b){b.apply(a,arguments);};return{extend:d,internal:e};})();if(!window.filepicker)window.filepicker=a;else for(attr in a)window.filepicker[attr]=a[attr];})();filepicker.extend("ajax",function(){var a=this;var b=function(a,b){b.method='GET';f(a,b);};var c=function(b,c){c.method='POST';b+=(b.indexOf('?')>=0?'&':'?')+'_cacheBust='+a.util.getId();f(b,c);};var d=function(b,c){var e=[];for(var f in b){var g=b[f];if(c)f=c+'['+f+']';var h;switch(a.util.typeOf(g)){case 'object':h=d(g,f);break;case 'array':var i={};for(var j=0;j<g.length;j++)i[j]=g[j];h=d(i,f);break;default:h=f+'='+encodeURIComponent(g);break;}if(g!==null)e.push(h);}return e.join('&');};var e=function(){try{return new window.XMLHttpRequest();}catch(a){try{return new window.ActiveXObject("Msxml2.XMLHTTP");}catch(a){try{return new window.ActiveXObject("Microsoft.XMLHTTP");}catch(a){return null;}}}};var f=function(b,c){b=b||"";var f=c.method?c.method.toUpperCase():"POST";var h=c.success||function(){};var i=c.error||function(){};var j=c.async===undefined?true:c.async;var k=c.data||null;var l=c.processData===undefined?true:c.processData;var m=c.headers||{};var n=a.util.parseUrl(b);var o=window.location.protocol+'//'+window.location.host;var p=o!==n.origin;var q=false;if(k&&l)k=d(c.data);var r;if(c.xhr)r=c.xhr;else{r=e();if(!r){c.error("Ajax not allowed");return r;}}if(p&&window.XDomainRequest&&!("withCredentials" in r))return g(b,c);if(c.progress&&r.upload)r.upload.addEventListener("progress",function(a){if(a.lengthComputable)c.progress(Math.round((a.loaded*95)/a.total));},false);var s=function(){if(r.readyState==4&&!q){if(c.progress)c.progress(100);if(r.status>=200&&r.status<300){var b=r.responseText;if(c.json)try{b=a.json.decode(b);}catch(d){t.call(r,"Invalid json: "+b);return;}h(b,r.status,r);q=true;}else{t.call(r,r.responseText);q=true;}}};r.onreadystatechange=s;var t=function(a){if(q)return;if(c.progress)c.progress(100);q=true;if(this.status==400){i("bad_params",this.status,this);return;}else if(this.status==403){i("not_authorized",this.status,this);return;}else if(this.status==404){i("not_found",this.status,this);return;}if(p)if(this.readyState==4&&this.status===0){i("CORS_not_allowed",this.status,this);return;}else{i("CORS_error",this.status,this);return;}i(a,this.status,this);};r.onerror=t;if(k&&f=='GET'){b+=(b.indexOf('?')!=-1?'&':'?')+k;k=null;}r.open(f,b,j);if(c.json)r.setRequestHeader('Accept','application/json, text/javascript');else r.setRequestHeader('Accept','text/javascript, text/html, application/xml, text/xml, */*');var u=m['Content-Type']||m['content-type'];if(k&&l&&(f=="POST"||f=="PUT")&&u==undefined)r.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');if(m)for(var v in m)r.setRequestHeader(v,m[v]);r.send(k);return r;};var g=function(b,c){if(!window.XDomainRequest)return null;var e=c.method?c.method.toUpperCase():"POST";var f=c.success||function(){};var g=c.error||function(){};var h=c.data||{};if(window.location.protocol=="http:")b=b.replace("https:","http:");else if(window.location.protocol=="https:")b=b.replace("http:","https:");if(c.async)throw new a.FilepickerException("Asyncronous Cross-domain requests are not supported");if(e!="GET"&&e!="POST"){h._method=e;e="POST";}if(c.processData!==false)h=h?d(h):null;if(h&&e=='GET'){b+=(b.indexOf('?')>=0?'&':'?')+h;h=null;}b+=(b.indexOf('?')>=0?'&':'?')+'_xdr=true&_cacheBust='+a.util.getId();var i=new window.XDomainRequest();i.onload=function(){var b=i.responseText;if(c.progress)c.progress(100);if(c.json)try{b=a.json.decode(b);}catch(d){g("Invalid json: "+b,200,i);return;}f(b,200,i);};i.onerror=function(){if(c.progress)c.progress(100);g(i.responseText||"CORS_error",this.status||500,this);};i.onprogress=function(){};i.ontimeout=function(){};i.timeout=30000;i.open(e,b,true);i.send(h);return i;};return{get:b,post:c,request:f};});filepicker.extend("base64",function(){var a=this;var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var c=function(a,c){c=c||c===undefined;var d="";var f,g,h,i,j,k,l;var m=0;if(c)a=e(a);while(m<a.length){f=a.charCodeAt(m);g=a.charCodeAt(m+1);h=a.charCodeAt(m+2);m+=3;i=f>>2;j=((f&3)<<4)|(g>>4);k=((g&15)<<2)|(h>>6);l=h&63;if(isNaN(g))k=l=64;else if(isNaN(h))l=64;d=d+b.charAt(i)+b.charAt(j)+b.charAt(k)+b.charAt(l);}return d;};var d=function(a,c){c=c||c===undefined;var d="";var e,g,h;var i,j,k,l;var m=0;a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(m<a.length){i=b.indexOf(a.charAt(m));j=b.indexOf(a.charAt(m+1));k=b.indexOf(a.charAt(m+2));l=b.indexOf(a.charAt(m+3));m+=4;e=(i<<2)|(j>>4);g=((j&15)<<4)|(k>>2);h=((k&3)<<6)|l;d=d+String.fromCharCode(e);if(k!=64)d=d+String.fromCharCode(g);if(l!=64)d=d+String.fromCharCode(h);}if(c)d=f(d);return d;};var e=function(a){a=a.replace(/\r\n/g,"\n");var b="";for(var c=0;c<a.length;c++){var d=a.charCodeAt(c);if(d<128)b+=String.fromCharCode(d);else if((d>127)&&(d<2048)){b+=String.fromCharCode((d>>6)|192);b+=String.fromCharCode((d&63)|128);}else{b+=String.fromCharCode((d>>12)|224);b+=String.fromCharCode(((d>>6)&63)|128);b+=String.fromCharCode((d&63)|128);}}return b;};var f=function(a){var b="";var c=0;var d=c1=c2=0;while(c<a.length){d=a.charCodeAt(c);if(d<128){b+=String.fromCharCode(d);c++;}else if((d>191)&&(d<224)){c2=a.charCodeAt(c+1);b+=String.fromCharCode(((d&31)<<6)|(c2&63));c+=2;}else{c2=a.charCodeAt(c+1);c3=a.charCodeAt(c+2);b+=String.fromCharCode(((d&15)<<12)|((c2&63)<<6)|(c3&63));c+=3;}}return b;};return{encode:c,decode:d};},true);filepicker.extend("browser",function(){var a=this;var b=function(){return !!(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i));};var c=function(){return !!navigator.userAgent.match(/Android/i);};var d=function(){return !!navigator.userAgent.match(/MSIE 7\.0/i);};return{isIOS:b,isAndroid:c,isIE7:d};});filepicker.extend("comm",function(){var a=this;var b="filepicker_comm_iframe";var c="fpapi_comm_iframe";var d=function(){if(window.frames[b]===undefined){g();var d;d=document.createElement("iframe");d.id=d.name=b;d.src=a.urls.COMM;d.style.display='none';document.body.appendChild(d);}if(window.frames[c]===undefined){g();var e;e=document.createElement("iframe");e.id=e.name=c;e.src=a.urls.API_COMM;e.style.display='none';document.body.appendChild(e);}};var e=function(b){if(b.origin!=a.urls.BASE&&b.origin!=a.urls.DIALOG_BASE)return;var c=a.json.parse(b.data);a.handlers.run(c);};var f=false;var g=function(){if(f)return;else f=true;if(window.addEventListener)window.addEventListener("message",e,false);else if(window.attachEvent)window.attachEvent("onmessage",e);else throw new a.FilepickerException("Unsupported browser");};var h=function(){if(window.removeEventListener)window.removeEventListener("message",e,false);else if(window.attachEvent)window.detachEvent("onmessage",e);else throw new a.FilepickerException("Unsupported browser");if(!f)return;else f=false;var d=document.getElementsByName(b);for(var g=0;g<d.length;g++)d[g].parentNode.removeChild(d[g]);try{delete window.frames[b];}catch(h){}var i=document.getElementsByName(c);for(var j=0;j<i.length;j++)i[j].parentNode.removeChild(i[j]);try{delete window.frames[c];}catch(h){}};return{openChannel:d,closeChannel:h};});filepicker.extend("comm_fallback",function(){var a=this;var b="filepicker_comm_iframe";var c="host_comm_iframe";var d="";var e=200;var f=function(){g();};var g=function(){if(window.frames[c]===undefined){var b;b=document.createElement("iframe");b.id=b.name=c;d=b.src=a.urls.constructHostCommFallback();b.style.display='none';var e=function(){d=b.contentWindow.location.href;h();};if(b.attachEvent)b.attachEvent('onload',e);else b.onload=e;document.body.appendChild(b);}};var h=function(){if(window.frames[b]===undefined){var c;c=document.createElement("iframe");c.id=c.name=b;c.src=a.urls.FP_COMM_FALLBACK+"?host_url="+encodeURIComponent(d);c.style.display='none';document.body.appendChild(c);}m();};var i=false;var j=undefined;var k="";var l=function(){var d=window.frames[b];if(!d)return;var e=d.frames[c];if(!e)return;var f=e.location.hash;if(f&&f.charAt(0)=="#")f=f.substr(1);if(f===k)return;k=f;if(!k)return;var g;try{g=a.json.parse(f);}catch(h){}if(g)a.handlers.run(g);};var m=function(){if(i)return;else i=true;j=window.setInterval(l,e);};var n=function(){window.clearInterval(j);if(!i)return;else i=false;var a=document.getElementsByName(b);for(var d=0;d<a.length;d++)a[d].parentNode.removeChild(a[d]);try{delete window.frames[b];}catch(e){}a=document.getElementsByName(c);for(d=0;d<a.length;d++)a[d].parentNode.removeChild(a[d]);try{delete window.frames[c];}catch(e){}};var o=!('postMessage' in window);var p=function(a){if(a!==o){o=!!a;if(o)r();else s();}};var q;var r=function(){q=a.comm;a.comm={openChannel:f,closeChannel:n};};var s=function(){a.comm=q;q=undefined;};if(o)r();return{openChannel:f,closeChannel:n,isEnabled:o};});filepicker.extend("conversions",function(){var a=this;var b={width:'number',height:'number',fit:'string',format:'string',watermark:'string',watermark_size:'number',watermark_position:'string',align:'string',crop:'string or array',quality:'number',text:'string',text_font:'string',text_size:'number',text_color:'string',text_align:'string',text_padding:'number',policy:'string',signature:'string',storeLocation:'string',storePath:'string',storeContainer:'string',storeAccess:'string',rotate:'string or number',filter:'string',blurAmount:'number',sharpenAmount:'number'};var c=function(c){var d;for(var e in c){d=false;for(var f in b)if(e==f){d=true;if(b[f].indexOf(a.util.typeOf(c[e]))===-1)throw new a.FilepickerException("Conversion parameter "+e+" is not the right type: "+c[e]+". Should be a "+b[f]);}if(!d)throw new a.FilepickerException("Conversion parameter "+e+" is not a valid parameter.");}};var d=function(b,d,e,f,g){c(d);if(d.crop&&a.util.isArray(d.crop))d.crop=d.crop.join(",");a.ajax.post(b+'/convert',{data:d,json:true,success:function(b){e(a.util.standardizeFPFile(b));},error:function(b,c,d){if(b=="not_found")f(new a.errors.FPError(141));else if(b=="bad_params")f(new a.errors.FPError(142));else if(b=="not_authorized")f(new a.errors.FPError(403));else f(new a.errors.FPError(143));},progress:g});};return{convert:d};});filepicker.extend("cookies",function(){var a=this;var b=function(b){var c=function(c){if(c.type!=="ThirdPartyCookies")return;a.cookies.THIRD_PARTY_COOKIES=!!c.payload;if(b&&typeof b==="function")b(!!c.payload);};return c;};var c=function(c){var d=b(c);a.handlers.attach('cookies',d);a.comm.openChannel();};return{checkThirdParty:c};});filepicker.extend("dragdrop",function(){var a=this;var b=function(){return(!!window.FileReader||navigator.userAgent.indexOf("Safari")>=0)&&('draggable' in document.createElement('span'));};var c=function(c,d){var e="No DOM element found to create drop pane";if(!c)throw new a.FilepickerException(e);if(c.jquery){if(c.length===0)throw new a.FilepickerException(e);c=c[0];}if(!b()){a.util.console.error("Your browser doesn't support drag-drop functionality");return false;}d=d||{};var f=d.dragEnter||function(){};var g=d.dragLeave||function(){};var h=d.onStart||function(){};var i=d.onSuccess||function(){};var j=d.onError||function(){};var k=d.onProgress||function(){};var l=d.mimetypes;if(!l)if(d.mimetype)l=[d.mimetype];else l=["*/*"];if(a.util.typeOf(l)=='string')l=l.split(',');var m=d.extensions;if(!m)if(d.extension)m=[d.extension];if(a.util.typeOf(m)=='string')m=m.replace(/ /g,"").split(',');var n={location:d.location,path:d.path,container:d.container,access:d.access,policy:d.policy,signature:d.signature};var o=function(){return c&&(c.getAttribute("disabled")||"enabled")!="disabled";};c.addEventListener("dragenter",function(a){if(o())f();a.stopPropagation();a.preventDefault();return false;},false);c.addEventListener("dragleave",function(a){if(o())g();a.stopPropagation();a.preventDefault();return false;},false);c.addEventListener("dragover",function(a){a.preventDefault();return false;},false);c.addEventListener("drop",function(b){b.stopPropagation();b.preventDefault();if(!o())return false;var d;var e;var f;if(b.dataTransfer.items){e=b.dataTransfer.items;for(d=0;d<e.length;d++){f=e[d]&&e[d].webkitGetAsEntry?e[d].webkitGetAsEntry():undefined;if(f&&!!f.isDirectory){j("WrongType","Uploading a folder is not allowed");return false;}}}var g=b.dataTransfer.files;var i=g.length;if(v(g)){h(g);c.setAttribute("disabled","disabled");for(d=0;d<g.length;d++)a.store(g[d],n,r(d,i),s,t(d,i));}return false;});var p={};var q=[];var r=function(a,b){return function(e){if(!d.multiple)i([e]);else{q.push(e);if(q.length==b){i(q);q=[];p={};c.setAttribute("disabled","enabled");}else{p[a]=100;u(b);}}};};var s=function(a){j("UploadError",a.toString());c.setAttribute("disabled","enabled");};var t=function(a,b){return function(c){p[a]=c;u(b);};};var u=function(a){var b=0;for(var c in p)b+=p[c];var d=b/a;k(d);};var v=function(b){if(b.length>0){if(b.length>1&&!d.multiple){j("TooManyFiles","Only one file at a time");return false;}if(d.maxFiles>0&&b.length>d.maxFiles){j("TooManyFiles","Only "+d.maxFiles+" files at a time");return false;}var c;var e;var f;for(var g=0;g<b.length;g++){c=false;e=b[g];f=e.name||e.fileName||'"Unknown file"';for(var h=0;h<l.length;h++){var i=a.mimetypes.getMimetype(e);c=c||a.mimetypes.matchesMimetype(i,l[h]);}if(!c){j("WrongType",f+" isn't the right type of file");return false;}if(m){c=false;for(h=0;h<m.length;h++)c=c||a.util.endsWith(f,m[h]);if(!c){j("WrongType",f+" isn't the right type of file");return false;}}if(e.size&&!!d.maxSize&&e.size>d.maxSize){j("WrongSize",f+" is too large ("+e.size+" Bytes)");return false;}}return true;}else j("NoFilesFound","No files uploaded");return false;};return true;};return{enabled:b,makeDropPane:c};});filepicker.extend("errors",function(){var a=this;var b=function(a){if(this===window)return new b(a);this.code=a;if(filepicker.debug){var c=filepicker.error_map[this.code];this.message=c.message;this.moreInfo=c.moreInfo;this.toString=function(){return "FPError "+this.code+": "+this.message+". For help, see "+this.moreInfo;};}else this.toString=function(){return "FPError "+this.code+". Include filepicker_debug.js for more info";};return this;};b.isClass=true;var c=function(b){if(filepicker.debug)a.util.console.error(b.toString());};return{FPError:b,handleError:c};},true);filepicker.extend("exporter",function(){var a=this;var b=function(b){var c=function(c,d,e){if(b[d]&&!a.util.isArray(b[d]))b[d]=[b[d]];else if(b[c])b[d]=[b[c]];else if(e)b[d]=e;};if(b.mimetype&&b.extension)throw a.FilepickerException("Error: Cannot pass in both mimetype and extension parameters to the export function");c('service','services');if(b.services)for(var d=0;d<b.services.length;d++){var e=(''+b.services[d]).replace(" ","");var f=a.services[e];b.services[d]=(f===undefined?e:f);}if(b.openTo)b.openTo=a.services[b.openTo]||b.openTo;a.util.setDefault(b,'container','modal');};var c=function(b,c){var d=function(d){if(d.type!=="filepickerUrl")return;if(d.error){a.util.console.error(d.error);c(a.errors.FPError(132));}else{var e={};e.url=d.payload.url;e.filename=d.payload.data.filename;e.mimetype=d.payload.data.type;e.size=d.payload.data.size;e.isWriteable=true;b(e);}a.modal.close();};return d;};var d=function(e,f,g,h){b(f);if(f.debug){setTimeout(function(){g({url:"https://www.filepicker.io/api/file/-nBq2onTSemLBxlcBWn1",filename:'test.png',mimetype:'image/png',size:58979});},1);return;}if(a.cookies.THIRD_PARTY_COOKIES===undefined){var i=false;a.cookies.checkThirdParty(function(){if(!i){d(e,f,g,h);i=true;}});return;}var j=a.util.getId();var k=false;var l=function(a){k=true;g(a);};var m=function(a){k=true;h(a);};var n=function(){if(!k){k=true;h(a.errors.FPError(131));}};if(f.container=='modal'&&(f.mobile||a.window.shouldForce()))f.container='window';a.window.open(f.container,a.urls.constructExportUrl(e,f,j),n);a.handlers.attach(j,c(l,m));};return{createExporter:d};});filepicker.extend("files",function(){var a=this;var b=function(b,d,e,f,g){var h=d.base64encode===undefined;if(h)d.base64encode=true;d.base64encode=d.base64encode!==false;var i=function(b){if(h)b=a.base64.decode(b,!!d.asText);e(b);};c.call(this,b,d,i,f,g);};var c=function(b,c,d,e,f){if(c.cache!==true)c._cacheBust=a.util.getId();a.ajax.get(b,{data:c,headers:{'X-NO-STREAM':true},success:d,error:function(b,c,d){if(b=="CORS_not_allowed")e(new a.errors.FPError(113));else if(b=="CORS_error")e(new a.errors.FPError(114));else if(b=="not_found")e(new a.errors.FPError(115));else if(b=="bad_params")e(new a.errors.FPError(400));else if(b=="not_authorized")e(new a.errors.FPError(403));else e(new a.errors.FPError(118));},progress:f});};var d=function(b,c,d,e,f){if(!(window.File&&window.FileReader&&window.FileList&&window.Blob)){f(10);a.files.storeFile(b,{},function(b){f(50);a.files.readFromFPUrl(b.url,c,d,e,function(a){f(50+a/2);});},e,function(a){f(a/2);});return;}var g=!!c.base64encode;var h=!!c.asText;var i=new FileReader();i.onprogress=function(a){if(a.lengthComputable)f(Math.round((a.loaded/a.total)*100));};i.onload=function(b){f(100);if(g)d(a.base64.encode(b.target.result,h));else d(b.target.result);};i.onerror=function(b){switch(b.target.error.code){case b.target.error.NOT_FOUND_ERR:e(new a.errors.FPError(115));break;case b.target.error.NOT_READABLE_ERR:e(new a.errors.FPError(116));break;case b.target.error.ABORT_ERR:e(new a.errors.FPError(117));break;default:e(new a.errors.FPError(118));break;}};if(h||!i.readAsBinaryString)i.readAsText(b);else i.readAsBinaryString(b);};var e=function(b,c,d,e,f,g){var h=d.mimetype||'text/plain';a.ajax.post(a.urls.constructWriteUrl(b,d),{headers:{'Content-Type':h},data:c,processData:false,json:true,success:function(b){e(a.util.standardizeFPFile(b));},error:function(b,c,d){if(b=="not_found")f(new a.errors.FPError(121));else if(b=="bad_params")f(new a.errors.FPError(122));else if(b=="not_authorized")f(new a.errors.FPError(403));else f(new a.errors.FPError(123));},progress:g});};var f=function(b,c,d,e,f,g){var h=function(b,c,d){if(b=="not_found")f(new a.errors.FPError(121));else if(b=="bad_params")f(new a.errors.FPError(122));else if(b=="not_authorized")f(new a.errors.FPError(403));else f(new a.errors.FPError(123));};var i=function(b){e(a.util.standardizeFPFile(b));};k(c,a.urls.constructWriteUrl(b,d),i,h,g);};var g=function(b,c,d,e,f,g){var h=function(b,c,d){if(b=="not_found")f(new a.errors.FPError(121));else if(b=="bad_params")f(new a.errors.FPError(122));else if(b=="not_authorized")f(new a.errors.FPError(403));else f(new a.errors.FPError(123));};var i=function(b){e(a.util.standardizeFPFile(b));};d.mimetype=c.type;k(c,a.urls.constructWriteUrl(b,d),i,h,g);};var h=function(b,c,d,e,f,g){a.ajax.post(a.urls.constructWriteUrl(b,d),{data:{'url':c},json:true,success:function(b){e(a.util.standardizeFPFile(b));},error:function(b,c,d){if(b=="not_found")f(new a.errors.FPError(121));else if(b=="bad_params")f(new a.errors.FPError(122));else if(b=="not_authorized")f(new a.errors.FPError(403));else f(new a.errors.FPError(123));},progress:g});};var i=function(b,c,d,e,f){if(b.files){if(b.files.length===0)e(new a.errors.FPError(115));else j(b.files[0],c,d,e,f);return;}a.util.setDefault(c,'location','S3');if(!c.filename)c.filename=b.value.replace("C:\\fakepath\\","")||b.name;var g=b.name;b.name="fileUpload";a.iframeAjax.post(a.urls.constructStoreUrl(c),{data:b,processData:false,json:true,success:function(c){b.name=g;d(a.util.standardizeFPFile(c));},error:function(b,c,d){if(b=="not_found")e(new a.errors.FPError(121));else if(b=="bad_params")e(new a.errors.FPError(122));else if(b=="not_authorized")e(new a.errors.FPError(403));else e(new a.errors.FPError(123));}});};var j=function(b,c,d,e,f){a.util.setDefault(c,'location','S3');var g=function(b,c,d){if(b=="not_found")e(new a.errors.FPError(121));else if(b=="bad_params")e(new a.errors.FPError(122));else if(b=="not_authorized")e(new a.errors.FPError(403));else{a.util.console.error(b);e(new a.errors.FPError(123));}};var h=function(b){d(a.util.standardizeFPFile(b));};if(!c.filename)c.filename=b.name||b.fileName;k(b,a.urls.constructStoreUrl(c),h,g,f);};var k=function(b,c,d,e,f){if(b.files)b=b.files[0];var g=!!window.FormData&&!!window.XMLHttpRequest;if(g){data=new FormData();data.append('fileUpload',b);a.ajax.post(c,{json:true,processData:false,data:data,success:d,error:e,progress:f});}else a.iframeAjax.post(c,{data:b,json:true,success:d,error:e});};var l=function(b,c,d,e,f){a.util.setDefault(c,'location','S3');a.util.setDefault(c,'mimetype','text/plain');a.ajax.post(a.urls.constructStoreUrl(c),{headers:{'Content-Type':c.mimetype},data:b,processData:false,json:true,success:function(b){d(a.util.standardizeFPFile(b));},error:function(b,c,d){if(b=="not_found")e(new a.errors.FPError(121));else if(b=="bad_params")e(new a.errors.FPError(122));else if(b=="not_authorized")e(new a.errors.FPError(403));else e(new a.errors.FPError(123));},progress:f});};var m=function(b,c,d,e,f){a.util.setDefault(c,'location','S3');a.ajax.post(a.urls.constructStoreUrl(c),{data:{'url':b},json:true,success:function(b){d(a.util.standardizeFPFile(b));},error:function(b,c,d){if(b=="not_found")e(new a.errors.FPError(151));else if(b=="bad_params")e(new a.errors.FPError(152));else if(b=="not_authorized")e(new a.errors.FPError(403));else e(new a.errors.FPError(153));},progress:f});};var n=function(b,c,d,e){var f=['uploaded','modified','created'];if(c.cache!==true)c._cacheBust=a.util.getId();a.ajax.get(b+"/metadata",{json:true,data:c,success:function(a){for(var b=0;b<f.length;b++)if(a[f[b]])a[f[b]]=new Date(a[f[b]]);d(a);},error:function(b,c,d){if(b=="not_found")e(new a.errors.FPError(161));else if(b=="bad_params")e(new a.errors.FPError(400));else if(b=="not_authorized")e(new a.errors.FPError(403));else e(new a.errors.FPError(162));}});};var o=function(b,c,d,e){c.key=a.apikey;a.ajax.post(b+"/remove",{data:c,success:function(a){d();},error:function(b,c,d){if(b=="not_found")e(new a.errors.FPError(171));else if(b=="bad_params")e(new a.errors.FPError(400));else if(b=="not_authorized")e(new a.errors.FPError(403));else e(new a.errors.FPError(172));}});};return{readFromUrl:c,readFromFile:d,readFromFPUrl:b,writeDataToFPUrl:e,writeFileToFPUrl:g,writeFileInputToFPUrl:f,writeUrlToFPUrl:h,storeFileInput:i,storeFile:j,storeUrl:m,storeData:l,stat:n,remove:o};});filepicker.extend("handlers",function(){var a=this;var b={};var c=function(a,c){if(b.hasOwnProperty(a))b[a].push(c);else b[a]=[c];return c;};var d=function(a,c){var d=b[a];if(!d)return;if(c){for(var e=0;e<d.length;e++)if(d[e]===c){d.splice(e,1);break;}if(d.length===0)delete b[a];}else delete b[a];};var e=function(a){var c=a.id;if(b.hasOwnProperty(c)){var d=b[c];for(var e=0;e<d.length;e++)d[e](a);return true;}return false;};return{attach:c,detach:d,run:e};});filepicker.extend("iframeAjax",function(){var a=this;var b="ajax_iframe";var c=[];var d=false;var e=function(a,b){b.method='GET';h(a,b);};var f=function(b,c){c.method='POST';b+=(b.indexOf('?')>=0?'&':'?')+'_cacheBust='+a.util.getId();h(b,c);};var g=function(){if(c.length>0){var a=c.shift();h(a.url,a.options);}};var h=function(e,f){if(d){c.push({url:e,options:f});return;}e+=(e.indexOf('?')>=0?'&':'?')+'_cacheBust='+a.util.getId();e+="&Content-Type=text%2Fhtml";a.comm.openChannel();var g;try{g=document.createElement('<iframe name="'+b+'">');}catch(h){g=document.createElement('iframe');}g.id=g.name=b;g.style.display='none';var k=function(){d=false;};if(g.attachEvent){g.attachEvent("onload",k);g.attachEvent("onerror",k);}else g.onerror=g.onload=k;g.id=b;g.name=b;g.style.display='none';g.onerror=g.onload=function(){d=false;};document.body.appendChild(g);a.handlers.attach('upload',i(f));var l=document.createElement("form");l.method=f.method||'GET';l.action=e;l.target=b;var m=f.data;if(a.util.isFileInputElement(m)||a.util.isFile(m))l.encoding=l.enctype="multipart/form-data";document.body.appendChild(l);if(a.util.isFile(m)){var n=j(m);if(!n)throw a.FilepickerException("Couldn't find corresponding file input.");m={'fileUpload':n};}else if(a.util.isFileInputElement(m)){var o=m;m={};m.fileUpload=o;}else if(m&&a.util.isElement(m)&&m.tagName=="INPUT"){o=m;m={};m[o.name]=o;}else if(f.processData!==false)m={'data':m};m.format='iframe';var p={};for(var q in m){var r=m[q];if(a.util.isElement(r)&&r.tagName=="INPUT"){p[q]={par:r.parentNode,sib:r.nextSibling,name:r.name,input:r,focused:r==document.activeElement};r.name=q;l.appendChild(r);}else{var s=document.createElement("input");s.name=q;s.value=r;l.appendChild(s);}}d=true;window.setTimeout(function(){l.submit();for(var a in p){var b=p[a];b.par.insertBefore(b.input,b.sib);b.input.name=b.name;if(b.focused)b.input.focus();}l.parentNode.removeChild(l);},1);};var i=function(b){var c=b.success||function(){};var e=b.error||function(){};var f=function(b){if(b.type!=="Upload")return;d=false;var f=b.payload;if(f.error)e(f.error);else c(f);a.handlers.detach("upload");g();};return f;};var j=function(a){var b=document.getElementsByTagName("input");for(var c=0;c<b.length;c++){var d=b[0];if(d.type!="file"||!d.files||!d.files.length)continue;for(var e=0;e<d.files.length;e++)if(d.files[e]===a)return d;}return null;};return{get:e,post:f,request:h};});filepicker.extend("json",function(){var a=this;var b={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var c=function(a){return b[a]||'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);};var d=function(a){a=a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');return(/^[\],:{}\s]*$/).test(a);};var e=function(b){if(window.JSON&&window.JSON.stringify)return window.JSON.stringify(b);if(b&&b.toJSON)b=b.toJSON();var d=[];switch(a.util.typeOf(b)){case 'string':return '"'+b.replace(/[\x00-\x1f\\"]/g,c)+'"';case 'array':for(var f=0;f<b.length;f++)d.push(e(b[f]));return '['+d+']';case 'object':case 'hash':var g;var h;for(h in b){g=e(b[h]);if(g)d.push(e(h)+':'+g);g=null;}return '{'+d+'}';case 'number':case 'boolean':return ''+b;case 'null':return 'null';default:return 'null';}return null;};var f=function(b,c){if(!b||a.util.typeOf(b)!='string')return null;if(window.JSON&&window.JSON.parse)return window.JSON.parse(b);else{if(c)if(!d(b))throw new Error('JSON could not decode the input; security is enabled and the value is not secure.');return eval('('+b+')');}};return{validate:d,encode:e,stringify:e,decode:f,parse:f};});filepicker.extend(function(){var a=this;a.API_VERSION="v1";var b=function(b){a.apikey=b;};var c=function(a){this.text=a;this.toString=function(){return "FilepickerException: "+this.text;};return this;};c.isClass=true;var d=function(){if(!a.apikey)throw new a.FilepickerException("API Key not found");};var e=function(b,c,e){d();if(typeof b==="function"){e=c;c=b;b={};}b=b||{};c=c||function(){};e=e||a.errors.handleError;a.picker.createPicker(b,c,e,false);};var f=function(b,c,e,f){d();if(typeof b==="function"){f=e;e=c;c=b;b={};}b=b||{};c=c||function(){};e=e||a.errors.handleError;a.picker.createPicker(b,c,e,true,false,f);};var g=function(b,c,e,f,g){d();if(!b||!c||typeof b==="function"||typeof b==="function")throw new a.FilepickerException("Not all required parameters given, missing picker or store options");f=f||a.errors.handleError;var h=!!b.multiple;var i=!!b?a.util.clone(b):{};i.storeLocation=c.location||'S3';i.storePath=c.path;i.storeContainer=c.container;i.storeAccess=c.access||'private';if(h&&i.storePath)if(i.storePath.charAt(i.storePath.length-1)!="/")throw new a.FilepickerException("pickAndStore with multiple files requires a path that ends in '/'");var j=e;if(!h)j=function(a){e([a]);};a.picker.createPicker(i,j,f,h,false,g);};var h=function(b,c,e){d();if(typeof b==="function"){e=c;c=b;b={};}b=b||{};c=c||function(){};e=e||a.errors.handleError;a.picker.createPicker(b,c,e,false,true);};var i=function(b,c,e,f,g){d();if(!b)throw new a.FilepickerException("No input given - nothing to read!");if(typeof c==="function"){g=f;f=e;e=c;c={};}c=c||{};e=e||function(){};f=f||a.errors.handleError;g=g||function(){};if(typeof b=="string")if(a.util.isFPUrl(b))a.files.readFromFPUrl(b,c,e,f,g);else a.files.readFromUrl(b,c,e,f,g);else if(a.util.isFileInputElement(b))if(!b.files)j(b,c,e,f,g);else if(b.files.length===0)f(new a.errors.FPError(115));else a.files.readFromFile(b.files[0],c,e,f,g);else if(a.util.isFile(b))a.files.readFromFile(b,c,e,f,g);else if(b.url)a.files.readFromFPUrl(b.url,c,e,f,g);else throw new a.FilepickerException("Cannot read given input: "+b+". Not a url, file input, DOM File, or FPFile object.");};var j=function(b,c,d,e,f){f(10);a.store(b,function(b){f(50);a.read(b,c,d,e,function(a){f(50+a/2);});},e);};var k=function(b,c,e,f,g,h){d();if(!b)throw new a.FilepickerException("No fpfile given - nothing to write to!");if(c===undefined||c===null)throw new a.FilepickerException("No input given - nothing to write!");if(typeof e==="function"){h=g;g=f;f=e;e={};}e=e||{};f=f||function(){};g=g||a.errors.handleError;h=h||function(){};var i;if(a.util.isFPUrl(b))i=b;else if(b.url)i=b.url;else throw new a.FilepickerException("Invalid file to write to: "+b+". Not a filepicker url or FPFile object.");if(typeof c=="string")a.files.writeDataToFPUrl(i,c,e,f,g,h);else if(a.util.isFileInputElement(c))if(!c.files)a.files.writeFileInputToFPUrl(i,c,e,f,g,h);else if(c.files.length===0)g(new a.errors.FPError(115));else a.files.writeFileToFPUrl(i,c.files[0],e,f,g,h);else if(a.util.isFile(c))a.files.writeFileToFPUrl(i,c,e,f,g,h);else if(c.url)a.files.writeUrlToFPUrl(i,c.url,e,f,g,h);else throw new a.FilepickerException("Cannot read from given input: "+c+". Not a string, file input, DOM File, or FPFile object.");};var l=function(b,c,e,f,g,h){d();if(!b)throw new a.FilepickerException("No fpfile given - nothing to write to!");if(c===undefined||c===null)throw new a.FilepickerException("No input given - nothing to write!");if(typeof e==="function"){h=g;g=f;f=e;e={};}e=e||{};f=f||function(){};g=g||a.errors.handleError;h=h||function(){};var i;if(a.util.isFPUrl(b))i=b;else if(b.url)i=b.url;else throw new a.FilepickerException("Invalid file to write to: "+b+". Not a filepicker url or FPFile object.");a.files.writeUrlToFPUrl(i,c,e,f,g,h);};var m=function(b,c,e,f){d();if(typeof c==="function"){f=e;e=c;c={};}c=!!c?a.util.clone(c):{};e=e||function(){};f=f||a.errors.handleError;var g;if(typeof b=="string"&&a.util.isUrl(b))g=b;else if(b.url){g=b.url;if(!c.mimetype&&!c.extension)c.mimetype=b.mimetype;if(!c.suggestedFilename)c.suggestedFilename=b.filename;}else throw new a.FilepickerException("Invalid file to export: "+b+". Not a valid url or FPFile object. You may want to use filepicker.store() to get an FPFile to export");if(c.suggestedFilename)c.suggestedFilename=encodeURI(c.suggestedFilename);a.exporter.createExporter(g,c,e,f);};var n=function(b,c,e,f,g){d();if(typeof c==="function"){g=f;f=e;e=c;c={};}c=!!c?a.util.clone(c):{};e=e||function(){};f=f||a.errors.handleError;g=g||function(){};if(typeof b=="string")a.files.storeData(b,c,e,f,g);else if(a.util.isFileInputElement(b))if(!b.files)a.files.storeFileInput(b,c,e,f,g);else if(b.files.length===0)f(new a.errors.FPError(115));else a.files.storeFile(b.files[0],c,e,f,g);else if(a.util.isFile(b))a.files.storeFile(b,c,e,f,g);else if(b.url){if(!c.filename)c.filename=b.filename;a.files.storeUrl(b.url,c,e,f,g);}else throw new a.FilepickerException("Cannot store given input: "+b+". Not a string, file input, DOM File, or FPFile object.");};var o=function(b,c,e,f,g){d();if(typeof c==="function"){g=f;f=e;e=c;c={};}c=c||{};e=e||function(){};f=f||a.errors.handleError;g=g||function(){};a.files.storeUrl(b,c,e,f,g);};var p=function(b,c,e,f){d();if(typeof c==="function"){f=e;e=c;c={};}c=c||{};e=e||function(){};f=f||a.errors.handleError;var g;if(a.util.isFPUrl(b))g=b;else if(b.url)g=b.url;else throw new a.FilepickerException("Invalid file to get metadata for: "+b+". Not a filepicker url or FPFile object.");a.files.stat(g,c,e,f);};var q=function(b,c,e,f){d();if(typeof c==="function"){f=e;e=c;c={};}c=c||{};e=e||function(){};f=f||a.errors.handleError;var g;if(a.util.isFPUrl(b))g=b;else if(b.url)g=b.url;else throw new a.FilepickerException("Invalid file to remove: "+b+". Not a filepicker url or FPFile object.");a.files.remove(g,c,e,f);};var r=function(b,c,e,f,g,h){d();if(!b)throw new a.FilepickerException("No fpfile given - nothing to convert!");if(typeof e==="function"){h=g;g=f;f=e;e={};}options=!!c?a.util.clone(c):{};e=e||{};f=f||function(){};g=g||a.errors.handleError;h=h||function(){};if(e.location)options.storeLocation=e.location;if(e.path)options.storePath=e.path;if(e.container)options.storeContainer=e.container;options.storeAccess=e.access||'private';var i;if(a.util.isFPUrl(b))i=b;else if(b.url){i=b.url;if(!a.mimetypes.matchesMimetype(b.mimetype,'image/*')){g(new a.errors.FPError(142));return;}}else throw new a.FilepickerException("Invalid file to convert: "+b+". Not a filepicker url or FPFile object.");a.conversions.convert(i,options,f,g,h);};var s=function(b){return a.widgets.constructWidget(b);};var t=function(b,c){return a.dragdrop.makeDropPane(b,c);};return{setKey:b,pick:e,pickFolder:h,pickMultiple:f,pickAndStore:g,read:i,write:k,writeUrl:l,'export':m,exportFile:m,store:n,storeUrl:o,stat:p,metadata:p,remove:q,convert:r,constructWidget:s,makeDropPane:t,FilepickerException:c};},true);filepicker.extend('mimetypes',function(){var a=this;var b={'.stl':'application/sla','.hbs':'text/html','.pdf':'application/pdf','.jpg':'image/jpeg','.jpeg':'image/jpeg','.jpe':'image/jpeg','.imp':'application/x-impressionist'};var c=['application/octet-stream','application/download','application/force-download','octet/stream','application/unknown','application/x-download','application/x-msdownload','application/x-secure-download'];var d=function(a){if(a.type){var d=a.type;d=d.toLowerCase();var e=false;for(var f=0;f<c.length;f++)e=e||d==c[f];if(!e)return a.type;}var g=a.name||a.fileName;var h=g.match(/\.\w*$/);if(h)return b[h[0].toLowerCase()]||'';else if(a.type)return a.type;else return '';};var e=function(b,d){if(!b)return d=="*/*";b=a.util.trim(b).toLowerCase();d=a.util.trim(d).toLowerCase();for(var e=0;e<c.length;e++)if(b==c[e])return true;test_parts=b.split("/");against_parts=d.split("/");if(against_parts[0]=="*")return true;if(against_parts[0]!=test_parts[0])return false;if(against_parts[1]=="*")return true;return against_parts[1]==test_parts[1];};return{getMimetype:d,matchesMimetype:e};});filepicker.extend("modal",function(){var a=this;var b="filepicker_shade";var c="filepicker_dialog_container";var d=function(b,c){var d=e(c);var h=f();var i=g(c);var j=document.createElement("iframe");j.name=a.window.WINDOW_NAME;j.id=a.window.WINDOW_NAME;var k=a.window.getSize();var l=Math.min(k[1]-40,500);j.style.width='100%';j.style.height=l-32+'px';j.style.border="none";j.style.position="relative";j.setAttribute('border',0);j.setAttribute('frameborder',0);j.setAttribute('frameBorder',0);j.setAttribute('marginwidth',0);j.setAttribute('marginheight',0);j.src=b;document.body.appendChild(d);h.appendChild(i);h.appendChild(j);document.body.appendChild(h);return j;};var e=function(a){var c=document.createElement("div");c.id=b;c.style.position='fixed';c.style.top=0;c.style.bottom=0;c.style.right=0;c.style.left=0;c.style.backgroundColor='#000000';c.style.opacity='0.5';c.style.filter='alpha(opacity=50)';c.style.zIndex=10000;c.onclick=h(a);return c;};var f=function(){var b=document.createElement("div");b.id=c;b.style.position='fixed';b.style.padding="10px";b.style.background='#ffffff url("https://www.filepicker.io/static/img/spinner.gif") no-repeat 50% 50%';b.style.top='10px';b.style.bottom='auto';b.style.right='auto';var d=a.window.getSize();var e=Math.min(d[1]-40,500);var f=Math.max(Math.min(d[0]-40,800),620);var g=(d[0]-f-40)/2;b.style.left=g+"px";b.style.height=e+'px';b.style.width=f+'px';b.style.overflow='hidden';b.style.webkitOverflowScrolling='touch';b.style.border='1px solid #999';b.style.webkitBorderRadius='3px';b.style.borderRadius='3px';b.style.margin='0';b.style.webkitBoxShadow='0 3px 7px rgba(0, 0, 0, 0.3)';b.style.boxShadow='0 3px 7px rgba(0, 0, 0, 0.3)';b.style.zIndex=10001;b.style.boxSizing="content-box";b.style.webkitBoxSizing="content-box";b.style.mozBoxSizing="content-box";return b;};var g=function(a){var b=document.createElement("a");b.appendChild(document.createTextNode('\u00D7'));b.onclick=h(a);b.style.cssFloat="right";b.style.styleFloat="right";b.style.cursor="default";b.style.padding='0 5px 0 0px';b.style.fontSize='1.5em';b.style.color='#555555';b.style.textDecoration='none';return b;};var h=function(d,e){e=!!e;return function(){if(a.uploading&&!e)if(!window.confirm("You are currently uploading. If you choose 'OK', the window will close and your upload will not finish. Do you want to stop uploading and close the window?"))return;a.uploading=false;var f=document.getElementById(b);if(f)document.body.removeChild(f);var g=document.getElementById(c);if(g)document.body.removeChild(g);try{delete window.frames[a.window.WINDOW_NAME];}catch(h){}if(d)d();};};var i=h(function(){});return{generate:d,close:i};});filepicker.extend("picker",function(){var a=this;var b=function(b){var c=function(c,d,e){if(b[d]){if(!a.util.isArray(b[d]))b[d]=[b[d]];}else if(b[c])b[d]=[b[c]];else if(e)b[d]=e;};c('service','services');c('mimetype','mimetypes');c('extension','extensions');if(b.services)for(var d=0;d<b.services.length;d++){var e=(''+b.services[d]).replace(" ","");if(a.services[e]!==undefined)e=a.services[e];b.services[d]=e;}if(b.mimetypes&&b.extensions)throw a.FilepickerException("Error: Cannot pass in both mimetype and extension parameters to the pick function");if(!b.mimetypes&&!b.extensions)b.mimetypes=['*/*'];if(b.openTo)b.openTo=a.services[b.openTo]||b.openTo;a.util.setDefault(b,'container','modal');};var c=function(b,c){var d=function(d){if(d.type!=="filepickerUrl")return;a.uploading=false;if(d.error){a.util.console.error(d.error);c(a.errors.FPError(102));}else{var e={};e.url=d.payload.url;e.filename=d.payload.data.filename;e.mimetype=d.payload.data.type;e.size=d.payload.data.size;if(d.payload.data.key)e.key=d.payload.data.key;if(d.payload.data.container)e.container=d.payload.data.container;if(d.payload.data.path)e.path=d.payload.data.path;e.isWriteable=true;b(e);}a.modal.close();};return d;};var d=function(b,c){var d=function(d){if(d.type!=="filepickerUrl")return;a.uploading=false;if(d.error){a.util.console.error(d.error);c(a.errors.FPError(102));}else{d.payload.data.url=d.payload.url;b(d.payload.data);}a.modal.close();};return d;};var e=function(b){b=b||function(){};var c=function(c){if(c.type!=="uploading")return;a.uploading=!!c.payload;b(a.uploading);};return c;};var f=function(a){var b={};var c=a.url;if(c.url)c=c.url;b.url=c;var d=a.url.data||a.data;b.filename=d.filename;b.mimetype=d.type;b.size=d.size;if(d.key)b.key=d.key;if(d.container)b.container=d.container;if(d.path)b.path=d.path;b.isWriteable=true;return b;};var g=function(b,c,d){var e=function(e){if(e.type=="filepickerProgress"){if(d){fpfile=f(e.payload);d(fpfile);}return;}else if(e.type!=="filepickerUrl")return;a.uploading=false;if(e.error){a.util.console.error(e.error);c(a.errors.FPError(102));}else{var g=[];if(!a.util.isArray(e.payload))e.payload=[e.payload];for(var h=0;h<e.payload.length;h++){fpfile=f(e.payload[h]);g.push(fpfile);}b(g);}a.modal.close();};return e;};var h=function(f,i,j,k,l,m){b(f);if(f.debug){setTimeout(function(){i({url:"https://www.filepicker.io/api/file/-nBq2onTSemLBxlcBWn1",filename:'test.png',mimetype:'image/png',size:58979});},1);return;}if(a.cookies.THIRD_PARTY_COOKIES===undefined){var n=false;a.cookies.checkThirdParty(function(){if(!n){h(f,i,j,!!k,l,m);n=true;}});return;}var o=a.util.getId();var p=false;var q=function(a){p=true;i(a);};var r=function(a){p=true;j(a);};var s=function(){if(!p){p=true;j(a.errors.FPError(101));}};if(f.container=='modal'&&(f.mobile||a.window.shouldForce()))f.container='window';var t;var u;if(k){t=a.urls.constructPickUrl(f,o,true);u=g(q,r,m);}else if(l){t=a.urls.constructPickFolderUrl(f,o);u=d(q,r);}else{t=a.urls.constructPickUrl(f,o,false);u=c(q,r);}a.window.open(f.container,t,s);a.handlers.attach(o,u);var v=o+"-upload";a.handlers.attach(v,e(function(){a.handlers.detach(v);}));};return{createPicker:h};});filepicker.extend('services',function(){return{COMPUTER:1,DROPBOX:2,FACEBOOK:3,GITHUB:4,GMAIL:5,IMAGE_SEARCH:6,URL:7,WEBCAM:8,GOOGLE_DRIVE:9,SEND_EMAIL:10,INSTAGRAM:11,FLICKR:12,VIDEO:13,EVERNOTE:14,PICASA:15,WEBDAV:16,FTP:17,ALFRESCO:18,BOX:19,SKYDRIVE:20};},true);filepicker.extend('util',function(){var a=this;var b=function(a){return a.replace(/^\s+|\s+$/g,"");};var c=/^(http|https)\:.*\/\//i;var d=function(a){return !!a.match(c);};var e=function(a){if(!a||a.charAt(0)=='/')a=window.location.protocol+"//"+window.location.host+a;var b=document.createElement('a');b.href=a;var c=b.hostname.indexOf(":")==-1?b.hostname:b.host;var d={source:a,protocol:b.protocol.replace(':',''),host:c,port:b.port,query:b.search,params:(function(){var a={},c=b.search.replace(/^\?/,'').split('&'),d=c.length,e=0,f;for(;e<d;e++){if(!c[e])continue;f=c[e].split('=');a[f[0]]=f[1];}return a;})(),file:(b.pathname.match(/\/([^\/?#]+)$/i)||[,''])[1],hash:b.hash.replace('#',''),path:b.pathname.replace(/^([^\/])/,'/$1'),relative:(b.href.match(/tps?:\/\/[^\/]+(.+)/)||[,''])[1],segments:b.pathname.replace(/^\//,'').split('/')};d.origin=d.protocol+"://"+d.host+(d.port?":"+d.port:'');return d;};var f=function(a,b){return a.indexOf(b,a.length-b.length)!==-1;};return{trim:b,parseUrl:e,isUrl:d,endsWith:f};});filepicker.extend("urls",function(){var a=this;var b="https://www.filepicker.io";if(window.filepicker.hostname)b=window.filepicker.hostname;var c=b.replace("www","dialog");var d=c+"/dialog/open/";var e=c+"/dialog/save/";var f=c+"/dialog/folder/";var g=b+"/api/store/";var h=function(b,c,e){return d+"?key="+a.apikey+"&id="+c+"&referrer="+window.location.hostname+"&iframe="+(b.container!='window')+"&version="+a.API_VERSION+(b.services?"&s="+b.services.join(","):"")+(e?"&multi="+!!e:"")+(b.mimetypes!==undefined?"&m="+b.mimetypes.join(","):"")+(b.extensions!==undefined?"&ext="+b.extensions.join(","):"")+(b.openTo!==undefined?"&loc="+b.openTo:"")+(b.maxSize?"&maxSize="+b.maxSize:"")+(b.maxFiles?"&maxFiles="+b.maxFiles:"")+(b.signature?"&signature="+b.signature:"")+(b.policy?"&policy="+b.policy:"")+(b.mobile!==undefined?"&mobile="+b.mobile:"")+(b.folders!==undefined?"&folders="+b.folders:"")+(b.storeLocation?"&storeLocation="+b.storeLocation:"")+(b.storePath?"&storePath="+b.storePath:"")+(b.storeContainer?"&storeContainer="+b.storeContainer:"")+(b.storeAccess?"&storeAccess="+b.storeAccess:"");};var i=function(b,c){return f+"?key="+a.apikey+"&id="+c+"&referrer="+window.location.hostname+"&iframe="+(b.container!='window')+"&version="+a.API_VERSION+(b.services?"&s="+b.services.join(","):"")+(b.openTo!==undefined?"&loc="+b.openTo:"")+(b.signature?"&signature="+b.signature:"")+(b.policy?"&policy="+b.policy:"")+(b.mobile!==undefined?"&mobile="+b.mobile:"");};var j=function(b,c,d){if(b.indexOf("&")>=0||b.indexOf("?")>=0)b=encodeURIComponent(b);return e+"?url="+b+"&key="+a.apikey+"&id="+d+"&referrer="+window.location.hostname+"&iframe="+(c.container!='window')+"&version="+a.API_VERSION+(c.services?"&s="+c.services.join(","):"")+(c.openTo!==undefined?"&loc="+c.openTo:"")+(c.mimetype!==undefined?"&m="+c.mimetype:"")+(c.extension!==undefined?"&ext="+c.extension:"")+(c.mobile!==undefined?"&mobile="+c.mobile:"")+(c.suggestedFilename!==undefined?"&defaultSaveasName="+c.suggestedFilename:"")+(c.signature?"&signature="+c.signature:"")+(c.policy?"&policy="+c.policy:"");};var k=function(b){return g+b.location+"?key="+a.apikey+(b.base64decode?"&base64decode=true":"")+(b.mimetype?"&mimetype="+b.mimetype:"")+(b.filename?"&filename="+encodeURIComponent(b.filename):"")+(b.path?"&path="+b.path:"")+(b.container?"&container="+b.container:"")+(b.access?"&access="+b.access:"")+(b.signature?"&signature="+b.signature:"")+(b.policy?"&policy="+b.policy:"");};var l=function(a,b){return a+"?nonce=fp"+(!!b.base64decode?"&base64decode=true":"")+(b.mimetype?"&mimetype="+b.mimetype:"")+(b.signature?"&signature="+b.signature:"")+(b.policy?"&policy="+b.policy:"");};var m=function(){var b=a.util.parseUrl(window.location.href);return b.origin+"/404";};return{BASE:b,DIALOG_BASE:c,API_COMM:b+"/dialog/comm_iframe/",COMM:c+"/dialog/comm_iframe/",FP_COMM_FALLBACK:c+"/dialog/comm_hash_iframe/",STORE:g,PICK:d,EXPORT:e,constructPickUrl:h,constructPickFolderUrl:i,constructExportUrl:j,constructWriteUrl:l,constructStoreUrl:k,constructHostCommFallback:m};});filepicker.extend("util",function(){var a=this;var b=function(a){return a&&Object.prototype.toString.call(a)==='[object Array]';};var c=function(a){return a&&Object.prototype.toString.call(a)==='[object File]';};var d=function(a){if(typeof HTMLElement==="object")return a instanceof HTMLElement;else return a&&typeof a==="object"&&a.nodeType===1&&typeof a.nodeName==="string";};var e=function(a){return d(a)&&a.tagName=="INPUT"&&a.type=="file";};var f=function(a){if(a===null)return 'null';else if(b(a))return 'array';else if(c(a))return 'file';return typeof a;};var g=function(){var a=new Date();return a.getTime().toString();};var h=function(a,b,c){if(a[b]===undefined)a[b]=c;};var i=function(a){if(window.jQuery)window.jQuery(function(){a();});else{var b="load";if(window.addEventListener)window.addEventListener(b,a,false);else if(window.attachEvent)window.attachEvent("on"+b,a);else if(window.onload){var c=window.onload;window.onload=function(){c();a();};}else window.onload=a;}};var j=function(a){return typeof a=="string"&&a.match("www.filepicker.io/api/file/");};var k=function(a){return function(){if(window.console&&typeof window.console[a]=="function")try{window.console[a].apply(window.console,arguments);}catch(b){alert(Array.prototype.join.call(arguments,","));}};};var l={};l.log=k("log");l.error=k("error");var m=function(a){var b={};for(key in a)b[key]=a[key];return b;};var n=function(a){var b={};b.url=a.url;b.filename=a.filename||a.name;b.mimetype=a.mimetype||a.type;b.size=a.size;b.key=a.key||a.s3_key;b.isWriteable=!!(a.isWriteable||a.writeable);return b;};return{isArray:b,isFile:c,isElement:d,isFileInputElement:e,getId:g,setDefault:h,typeOf:f,addOnLoad:i,isFPUrl:j,console:l,clone:m,standardizeFPFile:n};});filepicker.extend("widgets",function(){var a=this;var b=function(a,b,c,d){var e=d.getAttribute(c);if(e)b[a]=e;};var c=function(a,b){var c;if(document.createEvent){c=document.createEvent('Event');c.initEvent("change",true,false);c.fpfile=b?b[0]:undefined;c.fpfiles=b;a.dispatchEvent(c);}else if(document.createEventObject){c=document.createEventObject('Event');c.eventPhase=2;c.currentTarget=c.srcElement=c.target=a;c.fpfile=b?b[0]:undefined;c.fpfiles=b;a.fireEvent('onchange',c);}else if(a.onchange)a.onchange(b);};var d=function(d){var e=document.createElement("button");e.setAttribute('type','button');e.innerHTML=d.getAttribute('data-fp-button-text')||d.getAttribute('data-fp-text')||"Pick File";e.className=d.getAttribute('data-fp-button-class')||d.getAttribute('data-fp-class')||d.className;d.style.display="none";var f={};b("container",f,"data-fp-option-container",d);b("maxSize",f,"data-fp-option-maxsize",d);b("mimetype",f,"data-fp-mimetype",d);b("mimetypes",f,"data-fp-mimetypes",d);b("extension",f,"data-fp-extension",d);b("extensions",f,"data-fp-extensions",d);b("container",f,"data-fp-container",d);b("maxSize",f,"data-fp-maxSize",d);b("maxFiles",f,"data-fp-maxFiles",d);b("openTo",f,"data-fp-openTo",d);b("debug",f,"data-fp-debug",d);b("signature",f,"data-fp-signature",d);b("policy",f,"data-fp-policy",d);b("storeLocation",f,"data-fp-store-location",d);b("storePath",f,"data-fp-store-path",d);b("storeContainer",f,"data-fp-store-container",d);b("storeAccess",f,"data-fp-store-access",d);var g=d.getAttribute("data-fp-services");if(!g)g=d.getAttribute("data-fp-option-services");if(g){g=g.split(",");for(var h=0;h<g.length;h++)g[h]=a.services[g[h].replace(" ","")];f.services=g;}var i=d.getAttribute("data-fp-service");if(i)f.service=a.services[i.replace(" ","")];if(f.mimetypes)f.mimetypes=f.mimetypes.split(",");if(f.extensions)f.extensions=f.extensions.split(",");var j=d.getAttribute("data-fp-apikey");if(j)a.setKey(j);f.folders=(d.getAttribute("data-fp-folders")||"false")=="true";var k=(d.getAttribute("data-fp-multiple")||d.getAttribute("data-fp-option-multiple")||"false")=="true";if(k)e.onclick=function(){e.blur();a.pickMultiple(f,function(a){var b=[];for(var e=0;e<a.length;e++)b.push(a[e].url);d.value=b.join();c(d,a);});return false;};else e.onclick=function(){e.blur();a.pick(f,function(a){d.value=a.url;c(d,[a]);});return false;};d.parentNode.insertBefore(e,d.nextSibling);};var e=function(d){var e=document.createElement("div");e.className=d.getAttribute('data-fp-class')||d.className;e.style.padding="1px";d.style.display="none";d.parentNode.insertBefore(e,d.nextSibling);var i=document.createElement("button");i.setAttribute('type','button');i.innerHTML=d.getAttribute('data-fp-button-text')||"Pick File";i.className=d.getAttribute('data-fp-button-class')||'';e.appendChild(i);var j=document.createElement("div");g(j);j.innerHTML=d.getAttribute('data-fp-drag-text')||"Or drop files here";j.className=d.getAttribute('data-fp-drag-class')||'';e.appendChild(j);var k={};b("container",k,"data-fp-option-container",d);b("maxSize",k,"data-fp-option-maxsize",d);b("mimetype",k,"data-fp-mimetype",d);b("mimetypes",k,"data-fp-mimetypes",d);b("extension",k,"data-fp-extension",d);b("extensions",k,"data-fp-extensions",d);b("container",k,"data-fp-container",d);b("maxSize",k,"data-fp-maxSize",d);b("openTo",k,"data-fp-openTo",d);b("debug",k,"data-fp-debug",d);b("signature",k,"data-fp-signature",d);b("policy",k,"data-fp-policy",d);b("storeLocation",k,"data-fp-store-location",d);b("storePath",k,"data-fp-store-path",d);b("storeContainer",k,"data-fp-store-container",d);b("storeAccess",k,"data-fp-store-access",d);var l=d.getAttribute("data-fp-services");if(!l)l=d.getAttribute("data-fp-option-services");if(l){l=l.split(",");for(var m=0;m<l.length;m++)l[m]=a.services[l[m].replace(" ","")];k.services=l;}var n=d.getAttribute("data-fp-service");if(n)k.service=a.services[n.replace(" ","")];if(k.mimetypes)k.mimetypes=k.mimetypes.split(",");if(k.extensions)k.extensions=k.extensions.split(",");var o=d.getAttribute("data-fp-apikey");if(o)a.setKey(o);var p=(d.getAttribute("data-fp-multiple")||d.getAttribute("data-fp-option-multiple")||"false")=="true";if(a.dragdrop.enabled())h(j,p,k,d);else j.innerHTML="&nbsp;";if(p)j.onclick=i.onclick=function(){i.blur();a.pickMultiple(k,function(a){var b=[];var e=[];for(var g=0;g<a.length;g++){b.push(a[g].url);e.push(a[g].filename);}d.value=b.join();f(d,j,e.join(', '));c(d,a);});return false;};else j.onclick=i.onclick=function(){i.blur();a.pick(k,function(a){d.value=a.url;f(d,j,a.filename);c(d,[a]);});return false;};};var f=function(b,d,e){d.innerHTML=e;d.style.padding="2px 4px";d.style.cursor="default";d.style.width='';var f=document.createElement("span");f.innerHTML="X";f.style.borderRadius="8px";f.style.fontSize="14px";f.style.cssFloat="right";f.style.padding="0 3px";f.style.color="#600";f.style.cursor="pointer";var h=function(e){if(!e)e=window.event;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation();g(d);if(!a.dragdrop.enabled)d.innerHTML='&nbsp;';else d.innerHTML=b.getAttribute('data-fp-drag-text')||"Or drop files here";b.value='';c(b);return false;};if(f.addEventListener)f.addEventListener("click",h,false);else if(f.attachEvent)f.attachEvent("onclick",h);d.appendChild(f);};var g=function(a){a.style.border="1px dashed #AAA";a.style.display="inline-block";a.style.margin="0 0 0 4px";a.style.borderRadius="3px";a.style.backgroundColor="#F3F3F3";a.style.color="#333";a.style.fontSize="14px";a.style.lineHeight="22px";a.style.padding="2px 4px";a.style.verticalAlign="middle";a.style.cursor="pointer";a.style.overflow="hidden";};var h=function(b,d,e,g){var h=b.innerHTML;var j;a.dragdrop.makeDropPane(b,{multiple:d,maxSize:e.maxSize,mimetypes:e.mimetypes,mimetype:e.mimetype,extensions:e.extensions,extension:e.extension,location:e.storeLocation,path:e.storePath,container:e.storeContainer,access:e.storeAccess,policy:e.policy,signature:e.signature,dragEnter:function(){b.innerHTML="Drop to upload";b.style.backgroundColor="#E0E0E0";b.style.border="1px solid #000";},dragLeave:function(){b.innerHTML=h;b.style.backgroundColor="#F3F3F3";b.style.border="1px dashed #AAA";},onError:function(a,c){if(a=="TooManyFiles")b.innerHTML=c;else if(a=="WrongType")b.innerHTML=c;else if(a=="NoFilesFound")b.innerHTML=c;else if(a=="UploadError")b.innerHTML="Oops! Had trouble uploading.";},onStart:function(a){j=i(b);},onProgress:function(a){if(j)j.style.width=a+"%";},onSuccess:function(a){var d=[];var e=[];for(var h=0;h<a.length;h++){d.push(a[h].url);e.push(a[h].filename);}g.value=d.join();f(g,b,e.join(', '));c(g,a);}});};var i=function(a){var b=document.createElement("div");var c=a.offsetHeight-2;b.style.height=c+"px";b.style.backgroundColor="#0E90D2";b.style.width="2%";b.style.borderRadius="3px";a.style.width=a.offsetWidth+"px";a.style.padding="0";a.style.border="1px solid #AAA";a.style.backgroundColor="#F3F3F3";a.style.boxShadow="inset 0 1px 2px rgba(0, 0, 0, 0.1)";a.innerHTML="";a.appendChild(b);return b;};var j=function(c){c.onclick=function(){var d=c.getAttribute("data-fp-url");if(!d)return true;var e={};b("container",e,"data-fp-option-container",c);b("suggestedFilename",e,"data-fp-option-defaultSaveasName",c);b("container",e,"data-fp-container",c);b("suggestedFilename",e,"data-fp-suggestedFilename",c);b("mimetype",e,"data-fp-mimetype",c);b("extension",e,"data-fp-extension",c);var f=c.getAttribute("data-fp-services");if(!f)f=c.getAttribute("data-fp-option-services");if(f){f=f.split(",");for(var g=0;g<f.length;g++)f[g]=a.services[f[g].replace(" ","")];e.services=f;}var h=c.getAttribute("data-fp-service");if(h)e.service=a.services[h.replace(" ","")];apikey=c.getAttribute("data-fp-apikey");if(apikey)a.setKey(apikey);a.exportFile(d,e);return false;};};var k=function(){if(document.querySelectorAll){var a;var b=document.querySelectorAll('input[type="filepicker"]');for(a=0;a<b.length;a++)d(b[a]);var c=document.querySelectorAll('input[type="filepicker-dragdrop"]');for(a=0;a<c.length;a++)e(c[a]);var f=[];var g=document.querySelectorAll('button[data-fp-url]');for(a=0;a<g.length;a++)f.push(g[a]);g=document.querySelectorAll('a[data-fp-url]');for(a=0;a<g.length;a++)f.push(g[a]);g=document.querySelectorAll('input[type="button"][data-fp-url]');for(a=0;a<g.length;a++)f.push(g[a]);for(a=0;a<f.length;a++)j(f[a]);}};var l=function(a){if(a.jquery)a=a[0];var b=a.getAttribute('type');if(b=='filepicker')d(a);else if(b=='filepicker-dragdrop')e(a);else j(a);};return{constructPickWidget:d,constructDragWidget:e,constructExportWidget:j,buildWidgets:k,constructWidget:l};});filepicker.extend('window',function(){var a=this;var b={OPEN:'/dialog/open/',SAVEAS:'/dialog/save/'};var c="filepicker_dialog";var d="left=100,top=100,height=600,width=800,menubar=no,toolbar=no,location=no,personalbar=no,status=no,resizable=yes,scrollbars=yes,dependent=yes,dialog=yes";var e=1000;var f=function(){if(document.body&&document.body.offsetWidth){winW=document.body.offsetWidth;winH=document.body.offsetHeight;}if(document.compatMode=='CSS1Compat'&&document.documentElement&&document.documentElement.offsetWidth){winW=document.documentElement.offsetWidth;winH=document.documentElement.offsetHeight;}if(window.innerWidth&&window.innerHeight){winW=window.innerWidth;winH=window.innerHeight;}return [winW,winH];};var g=function(){var b=f()[0]<768;var c=a.cookies.THIRD_PARTY_COOKIES===false;return a.browser.isIOS()||a.browser.isAndroid()||b||c;};var h=function(b,f,h){h=h||function(){};if(!b)b='modal';if(b=='modal'&&g())b='window';if(b=='window'){var i=c+a.util.getId();window.onbeforeunload=function j(){return "Filepicker upload does not complete.";};var k=window.open(f,i,d);if(!k)alert('Please disable your popup blocker to upload files.');var l=window.setInterval(function(){if(!k||k.closed){window.onbeforeunload=null;window.clearInterval(l);h();}},e);}else if(b=='modal')a.modal.generate(f,h);else{var m=document.getElementById(b);if(!m)throw new a.FilepickerException("Container '"+b+"' not found. This should either be set to 'window','modal', or the ID of an iframe that is currently in the document.");m.src=f;}};return{open:h,WINDOW_NAME:c,getSize:f,shouldForce:g};});(function(){filepicker.internal(function(){var a=this;a.util.addOnLoad(a.cookies.checkThirdParty);a.util.addOnLoad(a.widgets.buildWidgets);});delete filepicker.internal;delete filepicker.extend;var a=filepicker._queue||[];var b;var c=a.length;if(c)for(var d=0;d<c;d++){b=a[d];filepicker[b[0]].apply(filepicker,b[1]);}if(filepicker._queue)delete filepicker._queue;})();
/*
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * License
 * -------
 * Creative Commons Attribution 2.5 License:
 * http://creativecommons.org/licenses/by/2.5/
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 */


/*
  CanvasImage Class
  Class that wraps the html image element and canvas.
  It also simplifies some of the canvas context manipulation
  with a set of helper functions.
*/
var CanvasImage = function (image) {
    this.canvas  = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    document.body.appendChild(this.canvas);

    this.width  = this.canvas.width  = image.width;
    this.height = this.canvas.height = image.height;

    this.context.drawImage(image, 0, 0, this.width, this.height);
};

CanvasImage.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

CanvasImage.prototype.update = function (imageData) {
    this.context.putImageData(imageData, 0, 0);
};

CanvasImage.prototype.getPixelCount = function () {
    return this.width * this.height;
};

CanvasImage.prototype.getImageData = function () {
    return this.context.getImageData(0, 0, this.width, this.height);
};

CanvasImage.prototype.removeCanvas = function () {
    this.canvas.parentNode.removeChild(this.canvas);
};


var ColorThief = function () {};

/*
 * getColor(sourceImage[, quality])
 * returns {r: num, g: num, b: num}
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar
 * colors and return the base color from the largest cluster.
 *
 * Quality is an optional argument. It needs to be an integer. 0 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster a color will be returned but the greater the likelihood that it will not be the visually
 * most dominant color.
 *
 * */
ColorThief.prototype.getColor = function(sourceImage, quality) {
    var palette       = this.getPalette(sourceImage, 5, quality);
    var dominantColor = palette[0];
    return dominantColor;
};


/*
 * getPalette(sourceImage[, colorCount, quality])
 * returns array[ {r: num, g: num, b: num}, {r: num, g: num, b: num}, ...]
 *
 * Use the median cut algorithm provided by quantize.js to cluster similar colors.
 *
 * colorCount determines the size of the palette; the number of colors returned. If not set, it
 * defaults to 10.
 *
 * BUGGY: Function does not always return the requested amount of colors. It can be +/- 2.
 *
 * quality is an optional argument. It needs to be an integer. 0 is the highest quality settings.
 * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
 * faster the palette generation but the greater the likelihood that colors will be missed.
 *
 *
 */
ColorThief.prototype.getPalette = function(sourceImage, colorCount, quality) {

    if (typeof colorCount === 'undefined') {
        colorCount = 10;
    };
    if (typeof quality === 'undefined') {
        quality = 10;
    };

    // Create custom CanvasImage object
    var image      = new CanvasImage(sourceImage);
    var imageData  = image.getImageData();
    var pixels     = imageData.data;
    var pixelCount = image.getPixelCount();

    // Store the RGB values in an array format suitable for quantize function
    var pixelArray = [];
    for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
        offset = i * 4;
        r = pixels[offset + 0];
        g = pixels[offset + 1];
        b = pixels[offset + 2];
        a = pixels[offset + 3];
        // If pixel is mostly opaque and not white
        if (a >= 125) {
            if (!(r > 250 && g > 250 && b > 250)) {
                pixelArray.push([r, g, b]);
            }
        }
    }

    // Clean up // Moved up by Greg
    image.removeCanvas();

    // Send array to quantize function which clusters values
    // using median cut algorithm
    var cmap    = MMCQ.quantize(pixelArray, colorCount);
    var palette = cmap.palette();

    return palette;
};




/*!
 * quantize.js Copyright 2008 Nick Rabinowitz.
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

// fill out a couple protovis dependencies
/*!
 * Block below copied from Protovis: http://mbostock.github.com/protovis/
 * Copyright 2010 Stanford Visualization Group
 * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
 */
if (!pv) {
    var pv = {
        map: function(array, f) {
          var o = {};
          return f
              ? array.map(function(d, i) { o.index = i; return f.call(o, d); })
              : array.slice();
        },
        naturalOrder: function(a, b) {
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
        },
        sum: function(array, f) {
          var o = {};
          return array.reduce(f
              ? function(p, d, i) { o.index = i; return p + f.call(o, d); }
              : function(p, d) { return p + d; }, 0);
        },
        max: function(array, f) {
          return Math.max.apply(null, f ? pv.map(array, f) : array);
        }
    };
}



/**
 * Basic Javascript port of the MMCQ (modified median cut quantization)
 * algorithm from the Leptonica library (http://www.leptonica.com/).
 * Returns a color map you can use to map original pixels to the reduced
 * palette. Still a work in progress.
 *
 * @author Nick Rabinowitz
 * @example

// array of pixels as [R,G,B] arrays
var myPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]
                // etc
                ];
var maxColors = 4;

var cmap = MMCQ.quantize(myPixels, maxColors);
var newPalette = cmap.palette();
var newPixels = myPixels.map(function(p) {
    return cmap.map(p);
});

 */
var MMCQ = (function() {
    // private constants
    var sigbits = 5,
        rshift = 8 - sigbits,
        maxIterations = 1000,
        fractByPopulations = 0.75;

    // get reduced-space color index for a pixel
    function getColorIndex(r, g, b) {
        return (r << (2 * sigbits)) + (g << sigbits) + b;
    }

    // Simple priority queue
    function PQueue(comparator) {
        var contents = [],
            sorted = false;

        function sort() {
            contents.sort(comparator);
            sorted = true;
        }

        return {
            push: function(o) {
                contents.push(o);
                sorted = false;
            },
            peek: function(index) {
                if (!sorted) sort();
                if (index===undefined) index = contents.length - 1;
                return contents[index];
            },
            pop: function() {
                if (!sorted) sort();
                return contents.pop();
            },
            size: function() {
                return contents.length;
            },
            map: function(f) {
                return contents.map(f);
            },
            debug: function() {
                if (!sorted) sort();
                return contents;
            }
        };
    }

    // 3d color space box
    function VBox(r1, r2, g1, g2, b1, b2, histo) {
        var vbox = this;
        vbox.r1 = r1;
        vbox.r2 = r2;
        vbox.g1 = g1;
        vbox.g2 = g2;
        vbox.b1 = b1;
        vbox.b2 = b2;
        vbox.histo = histo;
    }
    VBox.prototype = {
        volume: function(force) {
            var vbox = this;
            if (!vbox._volume || force) {
                vbox._volume = ((vbox.r2 - vbox.r1 + 1) * (vbox.g2 - vbox.g1 + 1) * (vbox.b2 - vbox.b1 + 1));
            }
            return vbox._volume;
        },
        count: function(force) {
            var vbox = this,
                histo = vbox.histo;
            if (!vbox._count_set || force) {
                var npix = 0,
                    i, j, k;
                for (i = vbox.r1; i <= vbox.r2; i++) {
                    for (j = vbox.g1; j <= vbox.g2; j++) {
                        for (k = vbox.b1; k <= vbox.b2; k++) {
                             index = getColorIndex(i,j,k);
                             npix += (histo[index] || 0);
                        }
                    }
                }
                vbox._count = npix;
                vbox._count_set = true;
            }
            return vbox._count;
        },
        copy: function() {
            var vbox = this;
            return new VBox(vbox.r1, vbox.r2, vbox.g1, vbox.g2, vbox.b1, vbox.b2, vbox.histo);
        },
        avg: function(force) {
            var vbox = this,
                histo = vbox.histo;
            if (!vbox._avg || force) {
                var ntot = 0,
                    mult = 1 << (8 - sigbits),
                    rsum = 0,
                    gsum = 0,
                    bsum = 0,
                    hval,
                    i, j, k, histoindex;
                for (i = vbox.r1; i <= vbox.r2; i++) {
                    for (j = vbox.g1; j <= vbox.g2; j++) {
                        for (k = vbox.b1; k <= vbox.b2; k++) {
                             histoindex = getColorIndex(i,j,k);
                             hval = histo[histoindex] || 0;
                             ntot += hval;
                             rsum += (hval * (i + 0.5) * mult);
                             gsum += (hval * (j + 0.5) * mult);
                             bsum += (hval * (k + 0.5) * mult);
                        }
                    }
                }
                if (ntot) {
                    vbox._avg = [~~(rsum/ntot), ~~(gsum/ntot), ~~(bsum/ntot)];
                } else {
//                    console.log('empty box');
                    vbox._avg = [
                        ~~(mult * (vbox.r1 + vbox.r2 + 1) / 2),
                        ~~(mult * (vbox.g1 + vbox.g2 + 1) / 2),
                        ~~(mult * (vbox.b1 + vbox.b2 + 1) / 2)
                    ];
                }
            }
            return vbox._avg;
        },
        contains: function(pixel) {
            var vbox = this,
                rval = pixel[0] >> rshift;
                gval = pixel[1] >> rshift;
                bval = pixel[2] >> rshift;
            return (rval >= vbox.r1 && rval <= vbox.r2 &&
                    gval >= vbox.g1 && gval <= vbox.g2 &&
                    bval >= vbox.b1 && bval <= vbox.b2);
        }
    };

    // Color map
    function CMap() {
        this.vboxes = new PQueue(function(a,b) {
            return pv.naturalOrder(
                a.vbox.count()*a.vbox.volume(),
                b.vbox.count()*b.vbox.volume()
            )
        });;
    }
    CMap.prototype = {
        push: function(vbox) {
            this.vboxes.push({
                vbox: vbox,
                color: vbox.avg()
            });
        },
        palette: function() {
            return this.vboxes.map(function(vb) { return vb.color });
        },
        size: function() {
            return this.vboxes.size();
        },
        map: function(color) {
            var vboxes = this.vboxes;
            for (var i=0; i<vboxes.size(); i++) {
                if (vboxes.peek(i).vbox.contains(color)) {
                    return vboxes.peek(i).color;
                }
            }
            return this.nearest(color);
        },
        nearest: function(color) {
            var vboxes = this.vboxes,
                d1, d2, pColor;
            for (var i=0; i<vboxes.size(); i++) {
                d2 = Math.sqrt(
                    Math.pow(color[0] - vboxes.peek(i).color[0], 2) +
                    Math.pow(color[1] - vboxes.peek(i).color[1], 2) +
                    Math.pow(color[2] - vboxes.peek(i).color[2], 2)
                );
                if (d2 < d1 || d1 === undefined) {
                    d1 = d2;
                    pColor = vboxes.peek(i).color;
                }
            }
            return pColor;
        },
        forcebw: function() {
            // XXX: won't  work yet
            var vboxes = this.vboxes;
            vboxes.sort(function(a,b) { return pv.naturalOrder(pv.sum(a.color), pv.sum(b.color) )});

            // force darkest color to black if everything < 5
            var lowest = vboxes[0].color;
            if (lowest[0] < 5 && lowest[1] < 5 && lowest[2] < 5)
                vboxes[0].color = [0,0,0];

            // force lightest color to white if everything > 251
            var idx = vboxes.length-1,
                highest = vboxes[idx].color;
            if (highest[0] > 251 && highest[1] > 251 && highest[2] > 251)
                vboxes[idx].color = [255,255,255];
        }
    };

    // histo (1-d array, giving the number of pixels in
    // each quantized region of color space), or null on error
    function getHisto(pixels) {
        var histosize = 1 << (3 * sigbits),
            histo = new Array(histosize),
            index, rval, gval, bval;
        pixels.forEach(function(pixel) {
            rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            index = getColorIndex(rval, gval, bval);
            histo[index] = (histo[index] || 0) + 1;
        });
        return histo;
    }

    function vboxFromPixels(pixels, histo) {
        var rmin=1000000, rmax=0,
            gmin=1000000, gmax=0,
            bmin=1000000, bmax=0,
            rval, gval, bval;
        // find min/max
        pixels.forEach(function(pixel) {
            rval = pixel[0] >> rshift;
            gval = pixel[1] >> rshift;
            bval = pixel[2] >> rshift;
            if (rval < rmin) rmin = rval;
            else if (rval > rmax) rmax = rval;
            if (gval < gmin) gmin = gval;
            else if (gval > gmax) gmax = gval;
            if (bval < bmin) bmin = bval;
            else if (bval > bmax)  bmax = bval;
        });
        return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
    }

    function medianCutApply(histo, vbox) {
        if (!vbox.count()) return;

        var rw = vbox.r2 - vbox.r1 + 1,
            gw = vbox.g2 - vbox.g1 + 1,
            bw = vbox.b2 - vbox.b1 + 1,
            maxw = pv.max([rw, gw, bw]);
        // only one pixel, no split
        if (vbox.count() == 1) {
            return [vbox.copy()]
        }
        /* Find the partial sum arrays along the selected axis. */
        var total = 0,
            partialsum = [],
            lookaheadsum = [],
            i, j, k, sum, index;
        if (maxw == rw) {
            for (i = vbox.r1; i <= vbox.r2; i++) {
                sum = 0;
                for (j = vbox.g1; j <= vbox.g2; j++) {
                    for (k = vbox.b1; k <= vbox.b2; k++) {
                        index = getColorIndex(i,j,k);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        else if (maxw == gw) {
            for (i = vbox.g1; i <= vbox.g2; i++) {
                sum = 0;
                for (j = vbox.r1; j <= vbox.r2; j++) {
                    for (k = vbox.b1; k <= vbox.b2; k++) {
                        index = getColorIndex(j,i,k);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        else {  /* maxw == bw */
            for (i = vbox.b1; i <= vbox.b2; i++) {
                sum = 0;
                for (j = vbox.r1; j <= vbox.r2; j++) {
                    for (k = vbox.g1; k <= vbox.g2; k++) {
                        index = getColorIndex(j,k,i);
                        sum += (histo[index] || 0);
                    }
                }
                total += sum;
                partialsum[i] = total;
            }
        }
        partialsum.forEach(function(d,i) {
            lookaheadsum[i] = total-d
        });
        function doCut(color) {
            var dim1 = color + '1',
                dim2 = color + '2',
                left, right, vbox1, vbox2, d2, count2=0;
            for (i = vbox[dim1]; i <= vbox[dim2]; i++) {
                if (partialsum[i] > total / 2) {
                    vbox1 = vbox.copy();
                    vbox2 = vbox.copy();
                    left = i - vbox[dim1];
                    right = vbox[dim2] - i;
                    if (left <= right)
                        d2 = Math.min(vbox[dim2] - 1, ~~(i + right / 2));
                    else d2 = Math.max(vbox[dim1], ~~(i - 1 - left / 2));
                    // avoid 0-count boxes
                    while (!partialsum[d2]) d2++;
                    count2 = lookaheadsum[d2];
                    while (!count2 && partialsum[d2-1]) count2 = lookaheadsum[--d2];
                    // set dimensions
                    vbox1[dim2] = d2;
                    vbox2[dim1] = vbox1[dim2] + 1;
//                    console.log('vbox counts:', vbox.count(), vbox1.count(), vbox2.count());
                    return [vbox1, vbox2];
                }
            }

        }
        // determine the cut planes
        return maxw == rw ? doCut('r') :
            maxw == gw ? doCut('g') :
            doCut('b');
    }

    function quantize(pixels, maxcolors) {
        // short-circuit
        if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
//            console.log('wrong number of maxcolors');
            return false;
        }

        // XXX: check color content and convert to grayscale if insufficient

        var histo = getHisto(pixels),
            histosize = 1 << (3 * sigbits);

        // check that we aren't below maxcolors already
        var nColors = 0;
        histo.forEach(function() { nColors++ });
        if (nColors <= maxcolors) {
            // XXX: generate the new colors from the histo and return
        }

        // get the beginning vbox from the colors
        var vbox = vboxFromPixels(pixels, histo),
            pq = new PQueue(function(a,b) { return pv.naturalOrder(a.count(), b.count()) });
        pq.push(vbox);

        // inner function to do the iteration
        function iter(lh, target) {
            var ncolors = 1,
                niters = 0,
                vbox;
            while (niters < maxIterations) {
                vbox = lh.pop();
                if (!vbox.count())  { /* just put it back */
                    lh.push(vbox);
                    niters++;
                    continue;
                }
                // do the cut
                var vboxes = medianCutApply(histo, vbox),
                    vbox1 = vboxes[0],
                    vbox2 = vboxes[1];

                if (!vbox1) {
//                    console.log("vbox1 not defined; shouldn't happen!");
                    return;
                }
                lh.push(vbox1);
                if (vbox2) {  /* vbox2 can be null */
                    lh.push(vbox2);
                    ncolors++;
                }
                if (ncolors >= target) return;
                if (niters++ > maxIterations) {
//                    console.log("infinite loop; perhaps too few pixels!");
                    return;
                }
            }
        }

        // first set of colors, sorted by population
        iter(pq, fractByPopulations * maxcolors);

        // Re-sort by the product of pixel occupancy times the size in color space.
        var pq2 = new PQueue(function(a,b) {
            return pv.naturalOrder(a.count()*a.volume(), b.count()*b.volume())
        });
        while (pq.size()) {
            pq2.push(pq.pop());
        }

        // next set - generate the median cuts using the (npix * vol) sorting.
        iter(pq2, maxcolors - pq2.size());

        // calculate the actual colors
        var cmap = new CMap();
        while (pq2.size()) {
            cmap.push(pq2.pop());
        }

        return cmap;
    }

    return {
        quantize: quantize
    }
})();

/**
 * @license
 * Lo-Dash 2.4.2 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function(){function n(n,r,t){for(var e=(t||0)-1,u=n?n.length:0;++e<u;)if(n[e]===r)return e;return-1}function r(r,t){var e=typeof t;if(r=r.cache,"boolean"==e||null==t)return r[t]?0:-1;"number"!=e&&"string"!=e&&(e="object");var u="number"==e?t:m+t;return r=(r=r[e])&&r[u],"object"==e?r&&n(r,t)>-1?0:-1:r?0:-1}function t(n){var r=this.cache,t=typeof n;if("boolean"==t||null==n)r[n]=!0;else{"number"!=t&&"string"!=t&&(t="object");var e="number"==t?n:m+n,u=r[t]||(r[t]={});"object"==t?(u[e]||(u[e]=[])).push(n):u[e]=!0;

}}function e(n){return n.charCodeAt(0)}function u(n,r){for(var t=n.criteria,e=r.criteria,u=-1,o=t.length;++u<o;){var a=t[u],i=e[u];if(a!==i){if(a>i||"undefined"==typeof a)return 1;if(a<i||"undefined"==typeof i)return-1}}return n.index-r.index}function o(n){var r=-1,e=n.length,u=n[0],o=n[e/2|0],a=n[e-1];if(u&&"object"==typeof u&&o&&"object"==typeof o&&a&&"object"==typeof a)return!1;var i=f();i["false"]=i["null"]=i["true"]=i.undefined=!1;var l=f();for(l.array=n,l.cache=i,l.push=t;++r<e;)l.push(n[r]);

return l}function a(n){return"\\"+G[n]}function i(){return h.pop()||[]}function f(){return g.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function l(n){n.length=0,h.length<_&&h.push(n)}function c(n){var r=n.cache;r&&c(r),n.array=n.cache=n.criteria=n.object=n.number=n.string=n.value=null,g.length<_&&g.push(n)}function p(n,r,t){r||(r=0),"undefined"==typeof t&&(t=n?n.length:0);for(var e=-1,u=t-r||0,o=Array(u<0?0:u);++e<u;)o[e]=n[r+e];

return o}function s(t){function h(n){return n&&"object"==typeof n&&!Yt(n)&&Tt.call(n,"__wrapped__")?n:new g(n)}function g(n,r){this.__chain__=!!r,this.__wrapped__=n}function _(n){function r(){if(e){var n=p(e);$t.apply(n,arguments)}if(this instanceof r){var o=J(t.prototype),a=t.apply(o,n||arguments);return Sn(a)?a:o}return t.apply(u,n||arguments)}var t=n[0],e=n[2],u=n[4];return Xt(r,n),r}function G(n,r,t,e,u){if(t){var o=t(n);if("undefined"!=typeof o)return o}var a=Sn(n);if(!a)return n;var f=Nt.call(n);

if(!K[f])return n;var c=Jt[f];switch(f){case F:case B:return new c(+n);case q:case P:return new c(n);case L:return o=c(n.source,C.exec(n)),o.lastIndex=n.lastIndex,o}var s=Yt(n);if(r){var v=!e;e||(e=i()),u||(u=i());for(var h=e.length;h--;)if(e[h]==n)return u[h];o=s?c(n.length):{}}else o=s?p(n):oe({},n);return s&&(Tt.call(n,"index")&&(o.index=n.index),Tt.call(n,"input")&&(o.input=n.input)),r?(e.push(n),u.push(o),(s?Xn:fe)(n,function(n,a){o[a]=G(n,r,t,e,u)}),v&&(l(e),l(u)),o):o}function J(n,r){return Sn(n)?zt(n):{};

}function Q(n,r,t){if("function"!=typeof n)return Yr;if("undefined"==typeof r||!("prototype"in n))return n;var e=n.__bindData__;if("undefined"==typeof e&&(Qt.funcNames&&(e=!n.name),e=e||!Qt.funcDecomp,!e)){var u=At.call(n);Qt.funcNames||(e=!O.test(u)),e||(e=I.test(u),Xt(n,e))}if(e===!1||e!==!0&&1&e[1])return n;switch(t){case 1:return function(t){return n.call(r,t)};case 2:return function(t,e){return n.call(r,t,e)};case 3:return function(t,e,u){return n.call(r,t,e,u)};case 4:return function(t,e,u,o){
return n.call(r,t,e,u,o)}}return $r(n,r)}function X(n){function r(){var n=f?a:this;if(u){var h=p(u);$t.apply(h,arguments)}if((o||c)&&(h||(h=p(arguments)),o&&$t.apply(h,o),c&&h.length<i))return e|=16,X([t,s?e:-4&e,h,null,a,i]);if(h||(h=arguments),l&&(t=n[v]),this instanceof r){n=J(t.prototype);var g=t.apply(n,h);return Sn(g)?g:n}return t.apply(n,h)}var t=n[0],e=n[1],u=n[2],o=n[3],a=n[4],i=n[5],f=1&e,l=2&e,c=4&e,s=8&e,v=t;return Xt(r,n),r}function Y(t,e){var u=-1,a=ln(),i=t?t.length:0,f=i>=b&&a===n,l=[];

if(f){var p=o(e);p?(a=r,e=p):f=!1}for(;++u<i;){var s=t[u];a(e,s)<0&&l.push(s)}return f&&c(e),l}function nn(n,r,t,e){for(var u=(e||0)-1,o=n?n.length:0,a=[];++u<o;){var i=n[u];if(i&&"object"==typeof i&&"number"==typeof i.length&&(Yt(i)||vn(i))){r||(i=nn(i,r,t));var f=-1,l=i.length,c=a.length;for(a.length+=l;++f<l;)a[c++]=i[f]}else t||a.push(i)}return a}function rn(n,r,t,e,u,o){if(t){var a=t(n,r);if("undefined"!=typeof a)return!!a}if(n===r)return 0!==n||1/n==1/r;var f=typeof n,c=typeof r;if(n===n&&(!n||!V[f])&&(!r||!V[c]))return!1;

if(null==n||null==r)return n===r;var p=Nt.call(n),s=Nt.call(r);if(p==T&&(p=z),s==T&&(s=z),p!=s)return!1;switch(p){case F:case B:return+n==+r;case q:return n!=+n?r!=+r:0==n?1/n==1/r:n==+r;case L:case P:return n==jt(r)}var h=p==$;if(!h){var g=Tt.call(n,"__wrapped__"),y=Tt.call(r,"__wrapped__");if(g||y)return rn(g?n.__wrapped__:n,y?r.__wrapped__:r,t,e,u,o);if(p!=z)return!1;var m=n.constructor,b=r.constructor;if(m!=b&&!(In(m)&&m instanceof m&&In(b)&&b instanceof b)&&"constructor"in n&&"constructor"in r)return!1;

}var _=!u;u||(u=i()),o||(o=i());for(var d=u.length;d--;)if(u[d]==n)return o[d]==r;var w=0;if(a=!0,u.push(n),o.push(r),h){if(d=n.length,w=r.length,a=w==d,a||e)for(;w--;){var j=d,k=r[w];if(e)for(;j--&&!(a=rn(n[j],k,t,e,u,o)););else if(!(a=rn(n[w],k,t,e,u,o)))break}}else ie(r,function(r,i,f){return Tt.call(f,i)?(w++,a=Tt.call(n,i)&&rn(n[i],r,t,e,u,o)):v}),a&&!e&&ie(n,function(n,r,t){return Tt.call(t,r)?a=--w>-1:v});return u.pop(),o.pop(),_&&(l(u),l(o)),a}function tn(n,r,t,e,u){(Yt(r)?Xn:fe)(r,function(r,o){
var a,i,f=r,l=n[o];if(r&&((i=Yt(r))||le(r))){for(var c=e.length;c--;)if(a=e[c]==r){l=u[c];break}if(!a){var p;t&&(f=t(l,r),(p="undefined"!=typeof f)&&(l=f)),p||(l=i?Yt(l)?l:[]:le(l)?l:{}),e.push(r),u.push(l),p||tn(l,r,t,e,u)}}else t&&(f=t(l,r),"undefined"==typeof f&&(f=r)),"undefined"!=typeof f&&(l=f);n[o]=l})}function en(n,r){return n+St(Ht()*(r-n+1))}function un(t,e,u){var a=-1,f=ln(),p=t?t.length:0,s=[],v=!e&&p>=b&&f===n,h=u||v?i():s;if(v){var g=o(h);f=r,h=g}for(;++a<p;){var y=t[a],m=u?u(y,a,t):y;

(e?!a||h[h.length-1]!==m:f(h,m)<0)&&((u||v)&&h.push(m),s.push(y))}return v?(l(h.array),c(h)):u&&l(h),s}function on(n){return function(r,t,e){var u={};t=h.createCallback(t,e,3);var o=-1,a=r?r.length:0;if("number"==typeof a)for(;++o<a;){var i=r[o];n(u,i,t(i,o,r),r)}else fe(r,function(r,e,o){n(u,r,t(r,e,o),o)});return u}}function an(n,r,t,e,u,o){var a=1&r,i=2&r,f=4&r,l=16&r,c=32&r;if(!i&&!In(n))throw new kt;l&&!t.length&&(r&=-17,l=t=!1),c&&!e.length&&(r&=-33,c=e=!1);var s=n&&n.__bindData__;if(s&&s!==!0)return s=p(s),
s[2]&&(s[2]=p(s[2])),s[3]&&(s[3]=p(s[3])),!a||1&s[1]||(s[4]=u),!a&&1&s[1]&&(r|=8),!f||4&s[1]||(s[5]=o),l&&$t.apply(s[2]||(s[2]=[]),t),c&&Wt.apply(s[3]||(s[3]=[]),e),s[1]|=r,an.apply(null,s);var v=1==r||17===r?_:X;return v([n,r,t,e,u,o])}function fn(n){return re[n]}function ln(){var r=(r=h.indexOf)===br?n:r;return r}function cn(n){return"function"==typeof n&&Rt.test(n)}function pn(n){var r,t;return n&&Nt.call(n)==z&&(r=n.constructor,!In(r)||r instanceof r)?(ie(n,function(n,r){t=r}),"undefined"==typeof t||Tt.call(n,t)):!1;

}function sn(n){return te[n]}function vn(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Nt.call(n)==T||!1}function hn(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t=r,r=!1),G(n,r,"function"==typeof t&&Q(t,e,1))}function gn(n,r,t){return G(n,!0,"function"==typeof r&&Q(r,t,1))}function yn(n,r){var t=J(n);return r?oe(t,r):t}function mn(n,r,t){var e;return r=h.createCallback(r,t,3),fe(n,function(n,t,u){return r(n,t,u)?(e=t,!1):v}),e}function bn(n,r,t){var e;return r=h.createCallback(r,t,3),
dn(n,function(n,t,u){return r(n,t,u)?(e=t,!1):v}),e}function _n(n,r,t){var e=[];ie(n,function(n,r){e.push(r,n)});var u=e.length;for(r=Q(r,t,3);u--&&r(e[u--],e[u],n)!==!1;);return n}function dn(n,r,t){var e=ne(n),u=e.length;for(r=Q(r,t,3);u--;){var o=e[u];if(r(n[o],o,n)===!1)break}return n}function wn(n){var r=[];return ie(n,function(n,t){In(n)&&r.push(t)}),r.sort()}function jn(n,r){return n?Tt.call(n,r):!1}function kn(n){for(var r=-1,t=ne(n),e=t.length,u={};++r<e;){var o=t[r];u[n[o]]=o}return u}function xn(n){
return n===!0||n===!1||n&&"object"==typeof n&&Nt.call(n)==F||!1}function Cn(n){return n&&"object"==typeof n&&Nt.call(n)==B||!1}function On(n){return n&&1===n.nodeType||!1}function Nn(n){var r=!0;if(!n)return r;var t=Nt.call(n),e=n.length;return t==$||t==P||t==T||t==z&&"number"==typeof e&&In(n.splice)?!e:(fe(n,function(){return r=!1}),r)}function Rn(n,r,t,e){return rn(n,r,"function"==typeof t&&Q(t,e,2))}function En(n){return Pt(n)&&!Kt(parseFloat(n))}function In(n){return"function"==typeof n}function Sn(n){
return!(!n||!V[typeof n])}function An(n){return Tn(n)&&n!=+n}function Dn(n){return null===n}function Tn(n){return"number"==typeof n||n&&"object"==typeof n&&Nt.call(n)==q||!1}function $n(n){return n&&"object"==typeof n&&Nt.call(n)==L||!1}function Fn(n){return"string"==typeof n||n&&"object"==typeof n&&Nt.call(n)==P||!1}function Bn(n){return"undefined"==typeof n}function Wn(n,r,t){var e={};return r=h.createCallback(r,t,3),fe(n,function(n,t,u){e[t]=r(n,t,u)}),e}function qn(n){var r=arguments,t=2;if(!Sn(n))return n;

if("number"!=typeof r[2]&&(t=r.length),t>3&&"function"==typeof r[t-2])var e=Q(r[--t-1],r[t--],2);else t>2&&"function"==typeof r[t-1]&&(e=r[--t]);for(var u=p(arguments,1,t),o=-1,a=i(),f=i();++o<t;)tn(n,u[o],e,a,f);return l(a),l(f),n}function zn(n,r,t){var e={};if("function"!=typeof r){var u=[];ie(n,function(n,r){u.push(r)}),u=Y(u,nn(arguments,!0,!1,1));for(var o=-1,a=u.length;++o<a;){var i=u[o];e[i]=n[i]}}else r=h.createCallback(r,t,3),ie(n,function(n,t,u){r(n,t,u)||(e[t]=n)});return e}function Ln(n){
for(var r=-1,t=ne(n),e=t.length,u=ht(e);++r<e;){var o=t[r];u[r]=[o,n[o]]}return u}function Pn(n,r,t){var e={};if("function"!=typeof r)for(var u=-1,o=nn(arguments,!0,!1,1),a=Sn(n)?o.length:0;++u<a;){var i=o[u];i in n&&(e[i]=n[i])}else r=h.createCallback(r,t,3),ie(n,function(n,t,u){r(n,t,u)&&(e[t]=n)});return e}function Kn(n,r,t,e){var u=Yt(n);if(null==t)if(u)t=[];else{var o=n&&n.constructor,a=o&&o.prototype;t=J(a)}return r&&(r=h.createCallback(r,e,4),(u?Xn:fe)(n,function(n,e,u){return r(t,n,e,u)})),
t}function Un(n){for(var r=-1,t=ne(n),e=t.length,u=ht(e);++r<e;)u[r]=n[t[r]];return u}function Mn(n){for(var r=arguments,t=-1,e=nn(r,!0,!1,1),u=r[2]&&r[2][r[1]]===n?1:e.length,o=ht(u);++t<u;)o[t]=n[e[t]];return o}function Vn(n,r,t){var e=-1,u=ln(),o=n?n.length:0,a=!1;return t=(t<0?Mt(0,o+t):t)||0,Yt(n)?a=u(n,r,t)>-1:"number"==typeof o?a=(Fn(n)?n.indexOf(r,t):u(n,r,t))>-1:fe(n,function(n){return++e<t?v:!(a=n===r)}),a}function Gn(n,r,t){var e=!0;r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o&&(e=!!r(n[u],u,n)););else fe(n,function(n,t,u){
return e=!!r(n,t,u)});return e}function Hn(n,r,t){var e=[];r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o;){var a=n[u];r(a,u,n)&&e.push(a)}else fe(n,function(n,t,u){r(n,t,u)&&e.push(n)});return e}function Jn(n,r,t){r=h.createCallback(r,t,3);var e=-1,u=n?n.length:0;if("number"!=typeof u){var o;return fe(n,function(n,t,e){return r(n,t,e)?(o=n,!1):v}),o}for(;++e<u;){var a=n[e];if(r(a,e,n))return a}}function Qn(n,r,t){var e;return r=h.createCallback(r,t,3),Yn(n,function(n,t,u){
return r(n,t,u)?(e=n,!1):v}),e}function Xn(n,r,t){var e=-1,u=n?n.length:0;if(r=r&&"undefined"==typeof t?r:Q(r,t,3),"number"==typeof u)for(;++e<u&&r(n[e],e,n)!==!1;);else fe(n,r);return n}function Yn(n,r,t){var e=n?n.length:0;if(r=r&&"undefined"==typeof t?r:Q(r,t,3),"number"==typeof e)for(;e--&&r(n[e],e,n)!==!1;);else{var u=ne(n);e=u.length,fe(n,function(n,t,o){return t=u?u[--e]:--e,r(o[t],t,o)})}return n}function Zn(n,r){var t=p(arguments,2),e=-1,u="function"==typeof r,o=n?n.length:0,a=ht("number"==typeof o?o:0);

return Xn(n,function(n){a[++e]=(u?r:n[r]).apply(n,t)}),a}function nr(n,r,t){var e=-1,u=n?n.length:0;if(r=h.createCallback(r,t,3),"number"==typeof u)for(var o=ht(u);++e<u;)o[e]=r(n[e],e,n);else o=[],fe(n,function(n,t,u){o[++e]=r(n,t,u)});return o}function rr(n,r,t){var u=-(1/0),o=u;if("function"!=typeof r&&t&&t[r]===n&&(r=null),null==r&&Yt(n))for(var a=-1,i=n.length;++a<i;){var f=n[a];f>o&&(o=f)}else r=null==r&&Fn(n)?e:h.createCallback(r,t,3),Xn(n,function(n,t,e){var a=r(n,t,e);a>u&&(u=a,o=n)});return o;

}function tr(n,r,t){var u=1/0,o=u;if("function"!=typeof r&&t&&t[r]===n&&(r=null),null==r&&Yt(n))for(var a=-1,i=n.length;++a<i;){var f=n[a];f<o&&(o=f)}else r=null==r&&Fn(n)?e:h.createCallback(r,t,3),Xn(n,function(n,t,e){var a=r(n,t,e);a<u&&(u=a,o=n)});return o}function er(n,r,t,e){if(!n)return t;var u=arguments.length<3;r=h.createCallback(r,e,4);var o=-1,a=n.length;if("number"==typeof a)for(u&&(t=n[++o]);++o<a;)t=r(t,n[o],o,n);else fe(n,function(n,e,o){t=u?(u=!1,n):r(t,n,e,o)});return t}function ur(n,r,t,e){
var u=arguments.length<3;return r=h.createCallback(r,e,4),Yn(n,function(n,e,o){t=u?(u=!1,n):r(t,n,e,o)}),t}function or(n,r,t){return r=h.createCallback(r,t,3),Hn(n,function(n,t,e){return!r(n,t,e)})}function ar(n,r,t){if(n&&"number"!=typeof n.length&&(n=Un(n)),null==r||t)return n?n[en(0,n.length-1)]:v;var e=ir(n);return e.length=Vt(Mt(0,r),e.length),e}function ir(n){var r=-1,t=n?n.length:0,e=ht("number"==typeof t?t:0);return Xn(n,function(n){var t=en(0,++r);e[r]=e[t],e[t]=n}),e}function fr(n){var r=n?n.length:0;

return"number"==typeof r?r:ne(n).length}function lr(n,r,t){var e;r=h.createCallback(r,t,3);var u=-1,o=n?n.length:0;if("number"==typeof o)for(;++u<o&&!(e=r(n[u],u,n)););else fe(n,function(n,t,u){return!(e=r(n,t,u))});return!!e}function cr(n,r,t){var e=-1,o=Yt(r),a=n?n.length:0,p=ht("number"==typeof a?a:0);for(o||(r=h.createCallback(r,t,3)),Xn(n,function(n,t,u){var a=p[++e]=f();o?a.criteria=nr(r,function(r){return n[r]}):(a.criteria=i())[0]=r(n,t,u),a.index=e,a.value=n}),a=p.length,p.sort(u);a--;){
var s=p[a];p[a]=s.value,o||l(s.criteria),c(s)}return p}function pr(n){return n&&"number"==typeof n.length?p(n):Un(n)}function sr(n){for(var r=-1,t=n?n.length:0,e=[];++r<t;){var u=n[r];u&&e.push(u)}return e}function vr(n){return Y(n,nn(arguments,!0,!0,1))}function hr(n,r,t){var e=-1,u=n?n.length:0;for(r=h.createCallback(r,t,3);++e<u;)if(r(n[e],e,n))return e;return-1}function gr(n,r,t){var e=n?n.length:0;for(r=h.createCallback(r,t,3);e--;)if(r(n[e],e,n))return e;return-1}function yr(n,r,t){var e=0,u=n?n.length:0;

if("number"!=typeof r&&null!=r){var o=-1;for(r=h.createCallback(r,t,3);++o<u&&r(n[o],o,n);)e++}else if(e=r,null==e||t)return n?n[0]:v;return p(n,0,Vt(Mt(0,e),u))}function mr(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t="function"!=typeof r&&e&&e[r]===n?null:r,r=!1),null!=t&&(n=nr(n,t,e)),nn(n,r)}function br(r,t,e){if("number"==typeof e){var u=r?r.length:0;e=e<0?Mt(0,u+e):e||0}else if(e){var o=Nr(r,t);return r[o]===t?o:-1}return n(r,t,e)}function _r(n,r,t){var e=0,u=n?n.length:0;if("number"!=typeof r&&null!=r){
var o=u;for(r=h.createCallback(r,t,3);o--&&r(n[o],o,n);)e++}else e=null==r||t?1:r||e;return p(n,0,Vt(Mt(0,u-e),u))}function dr(){for(var t=[],e=-1,u=arguments.length,a=i(),f=ln(),p=f===n,s=i();++e<u;){var v=arguments[e];(Yt(v)||vn(v))&&(t.push(v),a.push(p&&v.length>=b&&o(e?t[e]:s)))}var h=t[0],g=-1,y=h?h.length:0,m=[];n:for(;++g<y;){var _=a[0];if(v=h[g],(_?r(_,v):f(s,v))<0){for(e=u,(_||s).push(v);--e;)if(_=a[e],(_?r(_,v):f(t[e],v))<0)continue n;m.push(v)}}for(;u--;)_=a[u],_&&c(_);return l(a),l(s),
m}function wr(n,r,t){var e=0,u=n?n.length:0;if("number"!=typeof r&&null!=r){var o=u;for(r=h.createCallback(r,t,3);o--&&r(n[o],o,n);)e++}else if(e=r,null==e||t)return n?n[u-1]:v;return p(n,Mt(0,u-e))}function jr(n,r,t){var e=n?n.length:0;for("number"==typeof t&&(e=(t<0?Mt(0,e+t):Vt(t,e-1))+1);e--;)if(n[e]===r)return e;return-1}function kr(n){for(var r=arguments,t=0,e=r.length,u=n?n.length:0;++t<e;)for(var o=-1,a=r[t];++o<u;)n[o]===a&&(Bt.call(n,o--,1),u--);return n}function xr(n,r,t){n=+n||0,t="number"==typeof t?t:+t||1,
null==r&&(r=n,n=0);for(var e=-1,u=Mt(0,Et((r-n)/(t||1))),o=ht(u);++e<u;)o[e]=n,n+=t;return o}function Cr(n,r,t){var e=-1,u=n?n.length:0,o=[];for(r=h.createCallback(r,t,3);++e<u;){var a=n[e];r(a,e,n)&&(o.push(a),Bt.call(n,e--,1),u--)}return o}function Or(n,r,t){if("number"!=typeof r&&null!=r){var e=0,u=-1,o=n?n.length:0;for(r=h.createCallback(r,t,3);++u<o&&r(n[u],u,n);)e++}else e=null==r||t?1:Mt(0,r);return p(n,e)}function Nr(n,r,t,e){var u=0,o=n?n.length:u;for(t=t?h.createCallback(t,e,1):Yr,r=t(r);u<o;){
var a=u+o>>>1;t(n[a])<r?u=a+1:o=a}return u}function Rr(){return un(nn(arguments,!0,!0))}function Er(n,r,t,e){return"boolean"!=typeof r&&null!=r&&(e=t,t="function"!=typeof r&&e&&e[r]===n?null:r,r=!1),null!=t&&(t=h.createCallback(t,e,3)),un(n,r,t)}function Ir(n){return Y(n,p(arguments,1))}function Sr(){for(var n=-1,r=arguments.length;++n<r;){var t=arguments[n];if(Yt(t)||vn(t))var e=e?un(Y(e,t).concat(Y(t,e))):t}return e||[]}function Ar(){for(var n=arguments.length>1?arguments:arguments[0],r=-1,t=n?rr(ve(n,"length")):0,e=ht(t<0?0:t);++r<t;)e[r]=ve(n,r);

return e}function Dr(n,r){var t=-1,e=n?n.length:0,u={};for(r||!e||Yt(n[0])||(r=[]);++t<e;){var o=n[t];r?u[o]=r[t]:o&&(u[o[0]]=o[1])}return u}function Tr(n,r){if(!In(r))throw new kt;return function(){return--n<1?r.apply(this,arguments):v}}function $r(n,r){return arguments.length>2?an(n,17,p(arguments,2),null,r):an(n,1,null,null,r)}function Fr(n){for(var r=arguments.length>1?nn(arguments,!0,!1,1):wn(n),t=-1,e=r.length;++t<e;){var u=r[t];n[u]=an(n[u],1,null,null,n)}return n}function Br(n,r){return arguments.length>2?an(r,19,p(arguments,2),null,n):an(r,3,null,null,n);

}function Wr(){for(var n=arguments,r=n.length;r--;)if(!In(n[r]))throw new kt;return function(){for(var r=arguments,t=n.length;t--;)r=[n[t].apply(this,r)];return r[0]}}function qr(n,r){return r="number"==typeof r?r:+r||n.length,an(n,4,null,null,null,r)}function zr(n,r,t){var e,u,o,a,i,f,l,c=0,p=!1,s=!0;if(!In(n))throw new kt;if(r=Mt(0,r)||0,t===!0){var h=!0;s=!1}else Sn(t)&&(h=t.leading,p="maxWait"in t&&(Mt(r,t.maxWait)||0),s="trailing"in t?t.trailing:s);var g=function(){var t=r-(ge()-a);if(t>0)f=Ft(g,t);
else{u&&It(u);var p=l;u=f=l=v,p&&(c=ge(),o=n.apply(i,e),f||u||(e=i=null))}},y=function(){f&&It(f),u=f=l=v,(s||p!==r)&&(c=ge(),o=n.apply(i,e),f||u||(e=i=null))};return function(){if(e=arguments,a=ge(),i=this,l=s&&(f||!h),p===!1)var t=h&&!f;else{u||h||(c=a);var v=p-(a-c),m=v<=0;m?(u&&(u=It(u)),c=a,o=n.apply(i,e)):u||(u=Ft(y,v))}return m&&f?f=It(f):f||r===p||(f=Ft(g,r)),t&&(m=!0,o=n.apply(i,e)),!m||f||u||(e=i=null),o}}function Lr(n){if(!In(n))throw new kt;var r=p(arguments,1);return Ft(function(){n.apply(v,r);

},1)}function Pr(n,r){if(!In(n))throw new kt;var t=p(arguments,2);return Ft(function(){n.apply(v,t)},r)}function Kr(n,r){if(!In(n))throw new kt;var t=function(){var e=t.cache,u=r?r.apply(this,arguments):m+arguments[0];return Tt.call(e,u)?e[u]:e[u]=n.apply(this,arguments)};return t.cache={},t}function Ur(n){var r,t;if(!In(n))throw new kt;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}}function Mr(n){return an(n,16,p(arguments,1))}function Vr(n){return an(n,32,null,p(arguments,1));

}function Gr(n,r,t){var e=!0,u=!0;if(!In(n))throw new kt;return t===!1?e=!1:Sn(t)&&(e="leading"in t?t.leading:e,u="trailing"in t?t.trailing:u),U.leading=e,U.maxWait=r,U.trailing=u,zr(n,r,U)}function Hr(n,r){return an(r,16,[n])}function Jr(n){return function(){return n}}function Qr(n,r,t){var e=typeof n;if(null==n||"function"==e)return Q(n,r,t);if("object"!=e)return tt(n);var u=ne(n),o=u[0],a=n[o];return 1!=u.length||a!==a||Sn(a)?function(r){for(var t=u.length,e=!1;t--&&(e=rn(r[u[t]],n[u[t]],null,!0)););
return e}:function(n){var r=n[o];return a===r&&(0!==a||1/a==1/r)}}function Xr(n){return null==n?"":jt(n).replace(ue,fn)}function Yr(n){return n}function Zr(n,r,t){var e=!0,u=r&&wn(r);r&&(t||u.length)||(null==t&&(t=r),o=g,r=n,n=h,u=wn(r)),t===!1?e=!1:Sn(t)&&"chain"in t&&(e=t.chain);var o=n,a=In(o);Xn(u,function(t){var u=n[t]=r[t];a&&(o.prototype[t]=function(){var r=this.__chain__,t=this.__wrapped__,a=[t];$t.apply(a,arguments);var i=u.apply(n,a);if(e||r){if(t===i&&Sn(i))return this;i=new o(i),i.__chain__=r;

}return i})})}function nt(){return t._=Ot,this}function rt(){}function tt(n){return function(r){return r[n]}}function et(n,r,t){var e=null==n,u=null==r;if(null==t&&("boolean"==typeof n&&u?(t=n,n=1):u||"boolean"!=typeof r||(t=r,u=!0)),e&&u&&(r=1),n=+n||0,u?(r=n,n=0):r=+r||0,t||n%1||r%1){var o=Ht();return Vt(n+o*(r-n+parseFloat("1e-"+((o+"").length-1))),r)}return en(n,r)}function ut(n,r){if(n){var t=n[r];return In(t)?n[r]():t}}function ot(n,r,t){var e=h.templateSettings;n=jt(n||""),t=ae({},t,e);var u,o=ae({},t.imports,e.imports),i=ne(o),f=Un(o),l=0,c=t.interpolate||E,p="__p += '",s=wt((t.escape||E).source+"|"+c.source+"|"+(c===N?x:E).source+"|"+(t.evaluate||E).source+"|$","g");

n.replace(s,function(r,t,e,o,i,f){return e||(e=o),p+=n.slice(l,f).replace(S,a),t&&(p+="' +\n__e("+t+") +\n'"),i&&(u=!0,p+="';\n"+i+";\n__p += '"),e&&(p+="' +\n((__t = ("+e+")) == null ? '' : __t) +\n'"),l=f+r.length,r}),p+="';\n";var g=t.variable,y=g;y||(g="obj",p="with ("+g+") {\n"+p+"\n}\n"),p=(u?p.replace(w,""):p).replace(j,"$1").replace(k,"$1;"),p="function("+g+") {\n"+(y?"":g+" || ("+g+" = {});\n")+"var __t, __p = '', __e = _.escape"+(u?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+p+"return __p\n}";

var m="\n/*\n//# sourceURL="+(t.sourceURL||"/lodash/template/source["+D++ +"]")+"\n*/";try{var b=mt(i,"return "+p+m).apply(v,f)}catch(_){throw _.source=p,_}return r?b(r):(b.source=p,b)}function at(n,r,t){n=(n=+n)>-1?n:0;var e=-1,u=ht(n);for(r=Q(r,t,1);++e<n;)u[e]=r(e);return u}function it(n){return null==n?"":jt(n).replace(ee,sn)}function ft(n){var r=++y;return jt(null==n?"":n)+r}function lt(n){return n=new g(n),n.__chain__=!0,n}function ct(n,r){return r(n),n}function pt(){return this.__chain__=!0,
this}function st(){return jt(this.__wrapped__)}function vt(){return this.__wrapped__}t=t?Z.defaults(H.Object(),t,Z.pick(H,A)):H;var ht=t.Array,gt=t.Boolean,yt=t.Date,mt=t.Function,bt=t.Math,_t=t.Number,dt=t.Object,wt=t.RegExp,jt=t.String,kt=t.TypeError,xt=[],Ct=dt.prototype,Ot=t._,Nt=Ct.toString,Rt=wt("^"+jt(Nt).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),Et=bt.ceil,It=t.clearTimeout,St=bt.floor,At=mt.prototype.toString,Dt=cn(Dt=dt.getPrototypeOf)&&Dt,Tt=Ct.hasOwnProperty,$t=xt.push,Ft=t.setTimeout,Bt=xt.splice,Wt=xt.unshift,qt=function(){
try{var n={},r=cn(r=dt.defineProperty)&&r,t=r(n,n,n)&&r}catch(e){}return t}(),zt=cn(zt=dt.create)&&zt,Lt=cn(Lt=ht.isArray)&&Lt,Pt=t.isFinite,Kt=t.isNaN,Ut=cn(Ut=dt.keys)&&Ut,Mt=bt.max,Vt=bt.min,Gt=t.parseInt,Ht=bt.random,Jt={};Jt[$]=ht,Jt[F]=gt,Jt[B]=yt,Jt[W]=mt,Jt[z]=dt,Jt[q]=_t,Jt[L]=wt,Jt[P]=jt,g.prototype=h.prototype;var Qt=h.support={};Qt.funcDecomp=!cn(t.WinRTError)&&I.test(s),Qt.funcNames="string"==typeof mt.name,h.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:N,
variable:"",imports:{_:h}},zt||(J=function(){function n(){}return function(r){if(Sn(r)){n.prototype=r;var e=new n;n.prototype=null}return e||t.Object()}}());var Xt=qt?function(n,r){M.value=r,qt(n,"__bindData__",M),M.value=null}:rt,Yt=Lt||function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Nt.call(n)==$||!1},Zt=function(n){var r,t=n,e=[];if(!t)return e;if(!V[typeof n])return e;for(r in t)Tt.call(t,r)&&e.push(r);return e},ne=Ut?function(n){return Sn(n)?Ut(n):[]}:Zt,re={"&":"&amp;",
"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},te=kn(re),ee=wt("("+ne(te).join("|")+")","g"),ue=wt("["+ne(re).join("")+"]","g"),oe=function(n,r,t){var e,u=n,o=u;if(!u)return o;var a=arguments,i=0,f="number"==typeof t?2:a.length;if(f>3&&"function"==typeof a[f-2])var l=Q(a[--f-1],a[f--],2);else f>2&&"function"==typeof a[f-1]&&(l=a[--f]);for(;++i<f;)if(u=a[i],u&&V[typeof u])for(var c=-1,p=V[typeof u]&&ne(u),s=p?p.length:0;++c<s;)e=p[c],o[e]=l?l(o[e],u[e]):u[e];return o},ae=function(n,r,t){var e,u=n,o=u;

if(!u)return o;for(var a=arguments,i=0,f="number"==typeof t?2:a.length;++i<f;)if(u=a[i],u&&V[typeof u])for(var l=-1,c=V[typeof u]&&ne(u),p=c?c.length:0;++l<p;)e=c[l],"undefined"==typeof o[e]&&(o[e]=u[e]);return o},ie=function(n,r,t){var e,u=n,o=u;if(!u)return o;if(!V[typeof u])return o;r=r&&"undefined"==typeof t?r:Q(r,t,3);for(e in u)if(r(u[e],e,n)===!1)return o;return o},fe=function(n,r,t){var e,u=n,o=u;if(!u)return o;if(!V[typeof u])return o;r=r&&"undefined"==typeof t?r:Q(r,t,3);for(var a=-1,i=V[typeof u]&&ne(u),f=i?i.length:0;++a<f;)if(e=i[a],
r(u[e],e,n)===!1)return o;return o},le=Dt?function(n){if(!n||Nt.call(n)!=z)return!1;var r=n.valueOf,t=cn(r)&&(t=Dt(r))&&Dt(t);return t?n==t||Dt(n)==t:pn(n)}:pn,ce=on(function(n,r,t){Tt.call(n,t)?n[t]++:n[t]=1}),pe=on(function(n,r,t){(Tt.call(n,t)?n[t]:n[t]=[]).push(r)}),se=on(function(n,r,t){n[t]=r}),ve=nr,he=Hn,ge=cn(ge=yt.now)&&ge||function(){return(new yt).getTime()},ye=8==Gt(d+"08")?Gt:function(n,r){return Gt(Fn(n)?n.replace(R,""):n,r||0)};return h.after=Tr,h.assign=oe,h.at=Mn,h.bind=$r,h.bindAll=Fr,
h.bindKey=Br,h.chain=lt,h.compact=sr,h.compose=Wr,h.constant=Jr,h.countBy=ce,h.create=yn,h.createCallback=Qr,h.curry=qr,h.debounce=zr,h.defaults=ae,h.defer=Lr,h.delay=Pr,h.difference=vr,h.filter=Hn,h.flatten=mr,h.forEach=Xn,h.forEachRight=Yn,h.forIn=ie,h.forInRight=_n,h.forOwn=fe,h.forOwnRight=dn,h.functions=wn,h.groupBy=pe,h.indexBy=se,h.initial=_r,h.intersection=dr,h.invert=kn,h.invoke=Zn,h.keys=ne,h.map=nr,h.mapValues=Wn,h.max=rr,h.memoize=Kr,h.merge=qn,h.min=tr,h.omit=zn,h.once=Ur,h.pairs=Ln,
h.partial=Mr,h.partialRight=Vr,h.pick=Pn,h.pluck=ve,h.property=tt,h.pull=kr,h.range=xr,h.reject=or,h.remove=Cr,h.rest=Or,h.shuffle=ir,h.sortBy=cr,h.tap=ct,h.throttle=Gr,h.times=at,h.toArray=pr,h.transform=Kn,h.union=Rr,h.uniq=Er,h.values=Un,h.where=he,h.without=Ir,h.wrap=Hr,h.xor=Sr,h.zip=Ar,h.zipObject=Dr,h.collect=nr,h.drop=Or,h.each=Xn,h.eachRight=Yn,h.extend=oe,h.methods=wn,h.object=Dr,h.select=Hn,h.tail=Or,h.unique=Er,h.unzip=Ar,Zr(h),h.clone=hn,h.cloneDeep=gn,h.contains=Vn,h.escape=Xr,h.every=Gn,
h.find=Jn,h.findIndex=hr,h.findKey=mn,h.findLast=Qn,h.findLastIndex=gr,h.findLastKey=bn,h.has=jn,h.identity=Yr,h.indexOf=br,h.isArguments=vn,h.isArray=Yt,h.isBoolean=xn,h.isDate=Cn,h.isElement=On,h.isEmpty=Nn,h.isEqual=Rn,h.isFinite=En,h.isFunction=In,h.isNaN=An,h.isNull=Dn,h.isNumber=Tn,h.isObject=Sn,h.isPlainObject=le,h.isRegExp=$n,h.isString=Fn,h.isUndefined=Bn,h.lastIndexOf=jr,h.mixin=Zr,h.noConflict=nt,h.noop=rt,h.now=ge,h.parseInt=ye,h.random=et,h.reduce=er,h.reduceRight=ur,h.result=ut,h.runInContext=s,
h.size=fr,h.some=lr,h.sortedIndex=Nr,h.template=ot,h.unescape=it,h.uniqueId=ft,h.all=Gn,h.any=lr,h.detect=Jn,h.findWhere=Jn,h.foldl=er,h.foldr=ur,h.include=Vn,h.inject=er,Zr(function(){var n={};return fe(h,function(r,t){h.prototype[t]||(n[t]=r)}),n}(),!1),h.first=yr,h.last=wr,h.sample=ar,h.take=yr,h.head=yr,fe(h,function(n,r){var t="sample"!==r;h.prototype[r]||(h.prototype[r]=function(r,e){var u=this.__chain__,o=n(this.__wrapped__,r,e);return u||null!=r&&(!e||t&&"function"==typeof r)?new g(o,u):o;

})}),h.VERSION="2.4.2",h.prototype.chain=pt,h.prototype.toString=st,h.prototype.value=vt,h.prototype.valueOf=vt,Xn(["join","pop","shift"],function(n){var r=xt[n];h.prototype[n]=function(){var n=this.__chain__,t=r.apply(this.__wrapped__,arguments);return n?new g(t,n):t}}),Xn(["push","reverse","sort","unshift"],function(n){var r=xt[n];h.prototype[n]=function(){return r.apply(this.__wrapped__,arguments),this}}),Xn(["concat","slice","splice"],function(n){var r=xt[n];h.prototype[n]=function(){return new g(r.apply(this.__wrapped__,arguments),this.__chain__);

}}),h}var v,h=[],g=[],y=0,m=+new Date+"",b=75,_=40,d=" 	\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",w=/\b__p \+= '';/g,j=/\b(__p \+=) '' \+/g,k=/(__e\(.*?\)|\b__t\)) \+\n'';/g,x=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,C=/\w*$/,O=/^\s*function[ \n\r\t]+\w/,N=/<%=([\s\S]+?)%>/g,R=RegExp("^["+d+"]*0+(?=.$)"),E=/($^)/,I=/\bthis\b/,S=/['\n\r\t\u2028\u2029\\]/g,A=["Array","Boolean","Date","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],D=0,T="[object Arguments]",$="[object Array]",F="[object Boolean]",B="[object Date]",W="[object Function]",q="[object Number]",z="[object Object]",L="[object RegExp]",P="[object String]",K={};

K[W]=!1,K[T]=K[$]=K[F]=K[B]=K[q]=K[z]=K[L]=K[P]=!0;var U={leading:!1,maxWait:0,trailing:!1},M={configurable:!1,enumerable:!1,value:null,writable:!1},V={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},G={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},H=V[typeof window]&&window||this,J=V[typeof exports]&&exports&&!exports.nodeType&&exports,Q=V[typeof module]&&module&&!module.nodeType&&module,X=Q&&Q.exports===J&&J,Y=V[typeof global]&&global;!Y||Y.global!==Y&&Y.window!==Y||(H=Y);

var Z=s();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(H._=Z,define(function(){return Z})):J&&Q?X?(Q.exports=Z)._=Z:J._=Z:H._=Z}).call(this);
// TinyColor v1.0.0
// https://github.com/bgrins/TinyColor
// 2014-06-13, Brian Grinstead, MIT License

(function() {

var trimLeft = /^[\s,#]+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    math = Math,
    mathRound = math.round,
    mathMin = math.min,
    mathMax = math.max,
    mathRandom = math.random;

var tinycolor = function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
};

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function() {
        return rgbaToHex(this._r, this._g, this._b, this._a);
    },
    toHex8String: function() {
        return '#' + this.toHex8();
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = s.toHex8String();
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
            color.s = convertToPercentage(color.s);
            color.v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, color.s, color.v);
            ok = true;
            format = "hsv";
        }
        else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
            color.s = convertToPercentage(color.s);
            color.l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, color.s, color.l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}
    // `rgbaToHex`
    // Converts an RGBA color plus alpha transparency to hex
    // Assumes r, g, b and a are contained in the set [0, 255]
    // Returns an 8 character hex
    function rgbaToHex(r, g, b, a) {

        var hex = [
            pad2(convertDecimalToHex(a)),
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        return hex.join("");
    }

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (mathRound(hsl.h) + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;
    var w = p * 2 - 1;
    var a = rgb2.a - rgb1.a;

    var w1;

    if (w * a == -1) {
        w1 = w;
    } else {
        w1 = (w + a) / (1 + w * a);
    }

    w1 = (w1 + 1) / 2;

    var w2 = 1 - w1;

    var rgba = {
        r: rgb2.r * w1 + rgb1.r * w2,
        g: rgb2.g * w1 + rgb1.g * w2,
        b: rgb2.b * w1 + rgb1.b * w2,
        a: rgb2.a * p  + rgb1.a * (1 - p)
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/AERT#color-contrast>

// `readability`
// Analyze the 2 colors and returns an object with the following properties:
//    `brightness`: difference in brightness between the two colors
//    `color`: difference in color/hue between the two colors
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    var rgb1 = c1.toRgb();
    var rgb2 = c2.toRgb();
    var brightnessA = c1.getBrightness();
    var brightnessB = c2.getBrightness();
    var colorDiff = (
        Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) +
        Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) +
        Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b)
    );

    return {
        brightness: Math.abs(brightnessA - brightnessB),
        color: colorDiff
    };
};

// `readable`
// http://www.w3.org/TR/AERT#color-contrast
// Ensure that foreground and background color combinations provide sufficient contrast.
// *Example*
//    tinycolor.isReadable("#000", "#111") => false
tinycolor.isReadable = function(color1, color2) {
    var readability = tinycolor.readability(color1, color2);
    return readability.brightness > 125 && readability.color > 500;
};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// *Example*
//    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
tinycolor.mostReadable = function(baseColor, colorList) {
    var bestColor = null;
    var bestScore = 0;
    var bestIsReadable = false;
    for (var i=0; i < colorList.length; i++) {

        // We normalize both around the "acceptable" breaking point,
        // but rank brightness constrast higher than hue.

        var readability = tinycolor.readability(baseColor, colorList[i]);
        var readable = readability.brightness > 125 && readability.color > 500;
        var score = 3 * (readability.brightness / 125) + (readability.color / 500);

        if ((readable && ! bestIsReadable) ||
            (readable && bestIsReadable && score > bestScore) ||
            ((! readable) && (! bestIsReadable) && score > bestScore)) {
            bestIsReadable = readable;
            bestScore = score;
            bestColor = tinycolor(colorList[i]);
        }
    }
    return bestColor;
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            a: convertHexToDecimal(match[1]),
            r: parseIntFromHex(match[2]),
            g: parseIntFromHex(match[3]),
            b: parseIntFromHex(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

// Node: Export function
if (typeof module !== "undefined" && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (typeof define === 'function' && define.amd) {
    define(function () {return tinycolor;});
}
// Browser: Expose to window
else {
    window.tinycolor = tinycolor;
}

})();

/*! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l="1.11.1",m=function(a,b){return new m.fn.init(a,b)},n=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,o=/^-ms-/,p=/-([\da-z])/gi,q=function(a,b){return b.toUpperCase()};m.fn=m.prototype={jquery:l,constructor:m,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=m.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return m.each(this,a,b)},map:function(a){return this.pushStack(m.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},m.extend=m.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||m.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(m.isPlainObject(c)||(b=m.isArray(c)))?(b?(b=!1,f=a&&m.isArray(a)?a:[]):f=a&&m.isPlainObject(a)?a:{},g[d]=m.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},m.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===m.type(a)},isArray:Array.isArray||function(a){return"array"===m.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return!m.isArray(a)&&a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==m.type(a)||a.nodeType||m.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(k.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&m.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(o,"ms-").replace(p,q)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=r(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(n,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(r(Object(a))?m.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=r(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),m.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||m.guid++,e):void 0},now:function(){return+new Date},support:k}),m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function r(a){var b=a.length,c=m.type(a);return"function"===c||m.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var s=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=gb(),z=gb(),A=gb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=N.replace("w","w#"),P="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+O+"))|)"+M+"*\\]",Q=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+P+")*)|.*)\\)|)",R=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),S=new RegExp("^"+M+"*,"+M+"*"),T=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),V=new RegExp(Q),W=new RegExp("^"+O+"$"),X={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+Q),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ab=/[+~]/,bb=/'|\\/g,cb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),db=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(eb){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=_.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(bb,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+qb(o[l]);w=ab.test(a)&&ob(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function gb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function hb(a){return a[u]=!0,a}function ib(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function jb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function kb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function mb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function nb(a){return hb(function(b){return b=+b,hb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function ob(a){return a&&typeof a.getElementsByTagName!==C&&a}c=fb.support={},f=fb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=ib(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ib(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(e.getElementsByClassName)&&ib(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=ib(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(cb,db);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==C&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(e.querySelectorAll))&&(ib(function(a){a.innerHTML="<select msallowclip=''><option selected=''></option></select>",a.querySelectorAll("[msallowclip^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),ib(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ib(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",Q)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return kb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?kb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},fb.matches=function(a,b){return fb(a,null,null,b)},fb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fb(b,n,null,[a]).length>0},fb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fb.selectors={cacheLength:50,createPseudo:hb,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(cb,db),a[3]=(a[3]||a[4]||a[5]||"").replace(cb,db),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(cb,db).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?hb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:hb(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?hb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:hb(function(a){return function(b){return fb(a,b).length>0}}),contains:hb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:hb(function(a){return W.test(a||"")||fb.error("unsupported lang: "+a),a=a.replace(cb,db).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:nb(function(){return[0]}),last:nb(function(a,b){return[b-1]}),eq:nb(function(a,b,c){return[0>c?c+b:c]}),even:nb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:nb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:nb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:nb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=lb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=mb(b);function pb(){}pb.prototype=d.filters=d.pseudos,d.setFilters=new pb,g=fb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fb.error(a):z(a,i).slice(0)};function qb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function rb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function sb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function tb(a,b,c){for(var d=0,e=b.length;e>d;d++)fb(a,b[d],c);return c}function ub(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function vb(a,b,c,d,e,f){return d&&!d[u]&&(d=vb(d)),e&&!e[u]&&(e=vb(e,f)),hb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||tb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ub(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ub(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ub(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function wb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=rb(function(a){return a===b},h,!0),l=rb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[rb(sb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return vb(i>1&&sb(m),i>1&&qb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&wb(a.slice(i,e)),f>e&&wb(a=a.slice(e)),f>e&&qb(a))}m.push(c)}return sb(m)}function xb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=ub(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&fb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?hb(f):f}return h=fb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xb(e,d)),f.selector=a}return f},i=fb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(cb,db),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(cb,db),ab.test(j[0].type)&&ob(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,ab.test(a)&&ob(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ib(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ib(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||jb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ib(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||jb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ib(function(a){return null==a.getAttribute("disabled")})||jb(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fb}(a);m.find=s,m.expr=s.selectors,m.expr[":"]=m.expr.pseudos,m.unique=s.uniqueSort,m.text=s.getText,m.isXMLDoc=s.isXML,m.contains=s.contains;var t=m.expr.match.needsContext,u=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,v=/^.[^:#\[\.,]*$/;function w(a,b,c){if(m.isFunction(b))return m.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return m.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(v.test(b))return m.filter(b,a,c);b=m.filter(b,a)}return m.grep(a,function(a){return m.inArray(a,b)>=0!==c})}m.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?m.find.matchesSelector(d,a)?[d]:[]:m.find.matches(a,m.grep(b,function(a){return 1===a.nodeType}))},m.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(m(a).filter(function(){for(b=0;e>b;b++)if(m.contains(d[b],this))return!0}));for(b=0;e>b;b++)m.find(a,d[b],c);return c=this.pushStack(e>1?m.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(w(this,a||[],!1))},not:function(a){return this.pushStack(w(this,a||[],!0))},is:function(a){return!!w(this,"string"==typeof a&&t.test(a)?m(a):a||[],!1).length}});var x,y=a.document,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=m.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||x).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof m?b[0]:b,m.merge(this,m.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:y,!0)),u.test(c[1])&&m.isPlainObject(b))for(c in b)m.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=y.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return x.find(a);this.length=1,this[0]=d}return this.context=y,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):m.isFunction(a)?"undefined"!=typeof x.ready?x.ready(a):a(m):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),m.makeArray(a,this))};A.prototype=m.fn,x=m(y);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};m.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!m(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),m.fn.extend({has:function(a){var b,c=m(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(m.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=t.test(a)||"string"!=typeof a?m(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&m.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?m.unique(f):f)},index:function(a){return a?"string"==typeof a?m.inArray(this[0],m(a)):m.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(m.unique(m.merge(this.get(),m(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}m.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return m.dir(a,"parentNode")},parentsUntil:function(a,b,c){return m.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return m.dir(a,"nextSibling")},prevAll:function(a){return m.dir(a,"previousSibling")},nextUntil:function(a,b,c){return m.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return m.dir(a,"previousSibling",c)},siblings:function(a){return m.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return m.sibling(a.firstChild)},contents:function(a){return m.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:m.merge([],a.childNodes)}},function(a,b){m.fn[a]=function(c,d){var e=m.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=m.filter(d,e)),this.length>1&&(C[a]||(e=m.unique(e)),B.test(a)&&(e=e.reverse())),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return m.each(a.match(E)||[],function(a,c){b[c]=!0}),b}m.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):m.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(c=a.memory&&l,d=!0,f=g||0,g=0,e=h.length,b=!0;h&&e>f;f++)if(h[f].apply(l[0],l[1])===!1&&a.stopOnFalse){c=!1;break}b=!1,h&&(i?i.length&&j(i.shift()):c?h=[]:k.disable())},k={add:function(){if(h){var d=h.length;!function f(b){m.each(b,function(b,c){var d=m.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&f(c)})}(arguments),b?e=h.length:c&&(g=d,j(c))}return this},remove:function(){return h&&m.each(arguments,function(a,c){var d;while((d=m.inArray(c,h,d))>-1)h.splice(d,1),b&&(e>=d&&e--,f>=d&&f--)}),this},has:function(a){return a?m.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],e=0,this},disable:function(){return h=i=c=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,c||k.disable(),this},locked:function(){return!i},fireWith:function(a,c){return!h||d&&!i||(c=c||[],c=[a,c.slice?c.slice():c],b?i.push(c):j(c)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!d}};return k},m.extend({Deferred:function(a){var b=[["resolve","done",m.Callbacks("once memory"),"resolved"],["reject","fail",m.Callbacks("once memory"),"rejected"],["notify","progress",m.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return m.Deferred(function(c){m.each(b,function(b,f){var g=m.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&m.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?m.extend(a,d):d}},e={};return d.pipe=d.then,m.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&m.isFunction(a.promise)?e:0,g=1===f?a:m.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&m.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;m.fn.ready=function(a){return m.ready.promise().done(a),this},m.extend({isReady:!1,readyWait:1,holdReady:function(a){a?m.readyWait++:m.ready(!0)},ready:function(a){if(a===!0?!--m.readyWait:!m.isReady){if(!y.body)return setTimeout(m.ready);m.isReady=!0,a!==!0&&--m.readyWait>0||(H.resolveWith(y,[m]),m.fn.triggerHandler&&(m(y).triggerHandler("ready"),m(y).off("ready")))}}});function I(){y.addEventListener?(y.removeEventListener("DOMContentLoaded",J,!1),a.removeEventListener("load",J,!1)):(y.detachEvent("onreadystatechange",J),a.detachEvent("onload",J))}function J(){(y.addEventListener||"load"===event.type||"complete"===y.readyState)&&(I(),m.ready())}m.ready.promise=function(b){if(!H)if(H=m.Deferred(),"complete"===y.readyState)setTimeout(m.ready);else if(y.addEventListener)y.addEventListener("DOMContentLoaded",J,!1),a.addEventListener("load",J,!1);else{y.attachEvent("onreadystatechange",J),a.attachEvent("onload",J);var c=!1;try{c=null==a.frameElement&&y.documentElement}catch(d){}c&&c.doScroll&&!function e(){if(!m.isReady){try{c.doScroll("left")}catch(a){return setTimeout(e,50)}I(),m.ready()}}()}return H.promise(b)};var K="undefined",L;for(L in m(k))break;k.ownLast="0"!==L,k.inlineBlockNeedsLayout=!1,m(function(){var a,b,c,d;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",k.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(d))}),function(){var a=y.createElement("div");if(null==k.deleteExpando){k.deleteExpando=!0;try{delete a.test}catch(b){k.deleteExpando=!1}}a=null}(),m.acceptData=function(a){var b=m.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var M=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,N=/([A-Z])/g;function O(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(N,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:M.test(c)?m.parseJSON(c):c}catch(e){}m.data(a,b,c)}else c=void 0}return c}function P(a){var b;for(b in a)if(("data"!==b||!m.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function Q(a,b,d,e){if(m.acceptData(a)){var f,g,h=m.expando,i=a.nodeType,j=i?m.cache:a,k=i?a[h]:a[h]&&h;
if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||m.guid++:h),j[k]||(j[k]=i?{}:{toJSON:m.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=m.extend(j[k],b):j[k].data=m.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[m.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[m.camelCase(b)])):f=g,f}}function R(a,b,c){if(m.acceptData(a)){var d,e,f=a.nodeType,g=f?m.cache:a,h=f?a[m.expando]:m.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){m.isArray(b)?b=b.concat(m.map(b,m.camelCase)):b in d?b=[b]:(b=m.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!P(d):!m.isEmptyObject(d))return}(c||(delete g[h].data,P(g[h])))&&(f?m.cleanData([a],!0):k.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}m.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?m.cache[a[m.expando]]:a[m.expando],!!a&&!P(a)},data:function(a,b,c){return Q(a,b,c)},removeData:function(a,b){return R(a,b)},_data:function(a,b,c){return Q(a,b,c,!0)},_removeData:function(a,b){return R(a,b,!0)}}),m.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=m.data(f),1===f.nodeType&&!m._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=m.camelCase(d.slice(5)),O(f,d,e[d])));m._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){m.data(this,a)}):arguments.length>1?this.each(function(){m.data(this,a,b)}):f?O(f,a,m.data(f,a)):void 0},removeData:function(a){return this.each(function(){m.removeData(this,a)})}}),m.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=m._data(a,b),c&&(!d||m.isArray(c)?d=m._data(a,b,m.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=m.queue(a,b),d=c.length,e=c.shift(),f=m._queueHooks(a,b),g=function(){m.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return m._data(a,c)||m._data(a,c,{empty:m.Callbacks("once memory").add(function(){m._removeData(a,b+"queue"),m._removeData(a,c)})})}}),m.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?m.queue(this[0],a):void 0===b?this:this.each(function(){var c=m.queue(this,a,b);m._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&m.dequeue(this,a)})},dequeue:function(a){return this.each(function(){m.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=m.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=m._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=["Top","Right","Bottom","Left"],U=function(a,b){return a=b||a,"none"===m.css(a,"display")||!m.contains(a.ownerDocument,a)},V=m.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===m.type(c)){e=!0;for(h in c)m.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,m.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(m(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},W=/^(?:checkbox|radio)$/i;!function(){var a=y.createElement("input"),b=y.createElement("div"),c=y.createDocumentFragment();if(b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",k.leadingWhitespace=3===b.firstChild.nodeType,k.tbody=!b.getElementsByTagName("tbody").length,k.htmlSerialize=!!b.getElementsByTagName("link").length,k.html5Clone="<:nav></:nav>"!==y.createElement("nav").cloneNode(!0).outerHTML,a.type="checkbox",a.checked=!0,c.appendChild(a),k.appendChecked=a.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,c.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,k.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){k.noCloneEvent=!1}),b.cloneNode(!0).click()),null==k.deleteExpando){k.deleteExpando=!0;try{delete b.test}catch(d){k.deleteExpando=!1}}}(),function(){var b,c,d=y.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(k[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),k[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var X=/^(?:input|select|textarea)$/i,Y=/^key/,Z=/^(?:mouse|pointer|contextmenu)|click/,$=/^(?:focusinfocus|focusoutblur)$/,_=/^([^.]*)(?:\.(.+)|)$/;function ab(){return!0}function bb(){return!1}function cb(){try{return y.activeElement}catch(a){}}m.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=m.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof m===K||a&&m.event.triggered===a.type?void 0:m.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(E)||[""],h=b.length;while(h--)f=_.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=m.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=m.event.special[o]||{},l=m.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&m.expr.match.needsContext.test(e),namespace:p.join(".")},i),(n=g[o])||(n=g[o]=[],n.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?n.splice(n.delegateCount++,0,l):n.push(l),m.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,n,o,p,q,r=m.hasData(a)&&m._data(a);if(r&&(k=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=_.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=m.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,n=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=n.length;while(f--)g=n[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(n.splice(f,1),g.selector&&n.delegateCount--,l.remove&&l.remove.call(a,g));i&&!n.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||m.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)m.event.remove(a,o+b[j],c,d,!0);m.isEmptyObject(k)&&(delete r.handle,m._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,o=[d||y],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||y,3!==d.nodeType&&8!==d.nodeType&&!$.test(p+m.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[m.expando]?b:new m.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:m.makeArray(c,[b]),k=m.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!m.isWindow(d)){for(i=k.delegateType||p,$.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||y)&&o.push(l.defaultView||l.parentWindow||a)}n=0;while((h=o[n++])&&!b.isPropagationStopped())b.type=n>1?i:k.bindType||p,f=(m._data(h,"events")||{})[b.type]&&m._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&m.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&m.acceptData(d)&&g&&d[p]&&!m.isWindow(d)){l=d[g],l&&(d[g]=null),m.event.triggered=p;try{d[p]()}catch(r){}m.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=m.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(m._data(this,"events")||{})[a.type]||[],k=m.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=m.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((m.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?m(c,this).index(i)>=0:m.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[m.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=Z.test(e)?this.mouseHooks:Y.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new m.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||y),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||y,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==cb()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===cb()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return m.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return m.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=m.extend(new m.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?m.event.trigger(e,null,b):m.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},m.removeEvent=y.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===K&&(a[d]=null),a.detachEvent(d,c))},m.Event=function(a,b){return this instanceof m.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ab:bb):this.type=a,b&&m.extend(this,b),this.timeStamp=a&&a.timeStamp||m.now(),void(this[m.expando]=!0)):new m.Event(a,b)},m.Event.prototype={isDefaultPrevented:bb,isPropagationStopped:bb,isImmediatePropagationStopped:bb,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ab,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ab,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ab,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},m.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){m.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!m.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.submitBubbles||(m.event.special.submit={setup:function(){return m.nodeName(this,"form")?!1:void m.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=m.nodeName(b,"input")||m.nodeName(b,"button")?b.form:void 0;c&&!m._data(c,"submitBubbles")&&(m.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),m._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&m.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return m.nodeName(this,"form")?!1:void m.event.remove(this,"._submit")}}),k.changeBubbles||(m.event.special.change={setup:function(){return X.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(m.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),m.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),m.event.simulate("change",this,a,!0)})),!1):void m.event.add(this,"beforeactivate._change",function(a){var b=a.target;X.test(b.nodeName)&&!m._data(b,"changeBubbles")&&(m.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||m.event.simulate("change",this.parentNode,a,!0)}),m._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return m.event.remove(this,"._change"),!X.test(this.nodeName)}}),k.focusinBubbles||m.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){m.event.simulate(b,a.target,m.event.fix(a),!0)};m.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=m._data(d,b);e||d.addEventListener(a,c,!0),m._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=m._data(d,b)-1;e?m._data(d,b,e):(d.removeEventListener(a,c,!0),m._removeData(d,b))}}}),m.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=bb;else if(!d)return this;return 1===e&&(g=d,d=function(a){return m().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=m.guid++)),this.each(function(){m.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,m(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=bb),this.each(function(){m.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){m.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?m.event.trigger(a,b,c,!0):void 0}});function db(a){var b=eb.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var eb="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",fb=/ jQuery\d+="(?:null|\d+)"/g,gb=new RegExp("<(?:"+eb+")[\\s/>]","i"),hb=/^\s+/,ib=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,jb=/<([\w:]+)/,kb=/<tbody/i,lb=/<|&#?\w+;/,mb=/<(?:script|style|link)/i,nb=/checked\s*(?:[^=]|=\s*.checked.)/i,ob=/^$|\/(?:java|ecma)script/i,pb=/^true\/(.*)/,qb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,rb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:k.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},sb=db(y),tb=sb.appendChild(y.createElement("div"));rb.optgroup=rb.option,rb.tbody=rb.tfoot=rb.colgroup=rb.caption=rb.thead,rb.th=rb.td;function ub(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==K?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==K?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||m.nodeName(d,b)?f.push(d):m.merge(f,ub(d,b));return void 0===b||b&&m.nodeName(a,b)?m.merge([a],f):f}function vb(a){W.test(a.type)&&(a.defaultChecked=a.checked)}function wb(a,b){return m.nodeName(a,"table")&&m.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function xb(a){return a.type=(null!==m.find.attr(a,"type"))+"/"+a.type,a}function yb(a){var b=pb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function zb(a,b){for(var c,d=0;null!=(c=a[d]);d++)m._data(c,"globalEval",!b||m._data(b[d],"globalEval"))}function Ab(a,b){if(1===b.nodeType&&m.hasData(a)){var c,d,e,f=m._data(a),g=m._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)m.event.add(b,c,h[c][d])}g.data&&(g.data=m.extend({},g.data))}}function Bb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!k.noCloneEvent&&b[m.expando]){e=m._data(b);for(d in e.events)m.removeEvent(b,d,e.handle);b.removeAttribute(m.expando)}"script"===c&&b.text!==a.text?(xb(b).text=a.text,yb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),k.html5Clone&&a.innerHTML&&!m.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&W.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}m.extend({clone:function(a,b,c){var d,e,f,g,h,i=m.contains(a.ownerDocument,a);if(k.html5Clone||m.isXMLDoc(a)||!gb.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(tb.innerHTML=a.outerHTML,tb.removeChild(f=tb.firstChild)),!(k.noCloneEvent&&k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||m.isXMLDoc(a)))for(d=ub(f),h=ub(a),g=0;null!=(e=h[g]);++g)d[g]&&Bb(e,d[g]);if(b)if(c)for(h=h||ub(a),d=d||ub(f),g=0;null!=(e=h[g]);g++)Ab(e,d[g]);else Ab(a,f);return d=ub(f,"script"),d.length>0&&zb(d,!i&&ub(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,l,n=a.length,o=db(b),p=[],q=0;n>q;q++)if(f=a[q],f||0===f)if("object"===m.type(f))m.merge(p,f.nodeType?[f]:f);else if(lb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(jb.exec(f)||["",""])[1].toLowerCase(),l=rb[i]||rb._default,h.innerHTML=l[1]+f.replace(ib,"<$1></$2>")+l[2],e=l[0];while(e--)h=h.lastChild;if(!k.leadingWhitespace&&hb.test(f)&&p.push(b.createTextNode(hb.exec(f)[0])),!k.tbody){f="table"!==i||kb.test(f)?"<table>"!==l[1]||kb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)m.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}m.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),k.appendChecked||m.grep(ub(p,"input"),vb),q=0;while(f=p[q++])if((!d||-1===m.inArray(f,d))&&(g=m.contains(f.ownerDocument,f),h=ub(o.appendChild(f),"script"),g&&zb(h),c)){e=0;while(f=h[e++])ob.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=m.expando,j=m.cache,l=k.deleteExpando,n=m.event.special;null!=(d=a[h]);h++)if((b||m.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)n[e]?m.event.remove(d,e):m.removeEvent(d,e,g.handle);j[f]&&(delete j[f],l?delete d[i]:typeof d.removeAttribute!==K?d.removeAttribute(i):d[i]=null,c.push(f))}}}),m.fn.extend({text:function(a){return V(this,function(a){return void 0===a?m.text(this):this.empty().append((this[0]&&this[0].ownerDocument||y).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=wb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?m.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||m.cleanData(ub(c)),c.parentNode&&(b&&m.contains(c.ownerDocument,c)&&zb(ub(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&m.cleanData(ub(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&m.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return m.clone(this,a,b)})},html:function(a){return V(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(fb,""):void 0;if(!("string"!=typeof a||mb.test(a)||!k.htmlSerialize&&gb.test(a)||!k.leadingWhitespace&&hb.test(a)||rb[(jb.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(ib,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(m.cleanData(ub(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,m.cleanData(ub(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,n=this,o=l-1,p=a[0],q=m.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&nb.test(p))return this.each(function(c){var d=n.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(i=m.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=m.map(ub(i,"script"),xb),f=g.length;l>j;j++)d=i,j!==o&&(d=m.clone(d,!0,!0),f&&m.merge(g,ub(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,m.map(g,yb),j=0;f>j;j++)d=g[j],ob.test(d.type||"")&&!m._data(d,"globalEval")&&m.contains(h,d)&&(d.src?m._evalUrl&&m._evalUrl(d.src):m.globalEval((d.text||d.textContent||d.innerHTML||"").replace(qb,"")));i=c=null}return this}}),m.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){m.fn[a]=function(a){for(var c,d=0,e=[],g=m(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),m(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}});var Cb,Db={};function Eb(b,c){var d,e=m(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:m.css(e[0],"display");return e.detach(),f}function Fb(a){var b=y,c=Db[a];return c||(c=Eb(a,b),"none"!==c&&c||(Cb=(Cb||m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Cb[0].contentWindow||Cb[0].contentDocument).document,b.write(),b.close(),c=Eb(a,b),Cb.detach()),Db[a]=c),c}!function(){var a;k.shrinkWrapBlocks=function(){if(null!=a)return a;a=!1;var b,c,d;return c=y.getElementsByTagName("body")[0],c&&c.style?(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),typeof b.style.zoom!==K&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(y.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(d),a):void 0}}();var Gb=/^margin/,Hb=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ib,Jb,Kb=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ib=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c.getPropertyValue(b)||c[b]:void 0,c&&(""!==g||m.contains(a.ownerDocument,a)||(g=m.style(a,b)),Hb.test(g)&&Gb.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0===g?g:g+""}):y.documentElement.currentStyle&&(Ib=function(a){return a.currentStyle},Jb=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ib(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Hb.test(g)&&!Kb.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Lb(a,b){return{get:function(){var c=a();if(null!=c)return c?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d,e,f,g,h;if(b=y.createElement("div"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=d&&d.style){c.cssText="float:left;opacity:.5",k.opacity="0.5"===c.opacity,k.cssFloat=!!c.cssFloat,b.style.backgroundClip="content-box",b.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===b.style.backgroundClip,k.boxSizing=""===c.boxSizing||""===c.MozBoxSizing||""===c.WebkitBoxSizing,m.extend(k,{reliableHiddenOffsets:function(){return null==g&&i(),g},boxSizingReliable:function(){return null==f&&i(),f},pixelPosition:function(){return null==e&&i(),e},reliableMarginRight:function(){return null==h&&i(),h}});function i(){var b,c,d,i;c=y.getElementsByTagName("body")[0],c&&c.style&&(b=y.createElement("div"),d=y.createElement("div"),d.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(d).appendChild(b),b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",e=f=!1,h=!0,a.getComputedStyle&&(e="1%"!==(a.getComputedStyle(b,null)||{}).top,f="4px"===(a.getComputedStyle(b,null)||{width:"4px"}).width,i=b.appendChild(y.createElement("div")),i.style.cssText=b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",b.style.width="1px",h=!parseFloat((a.getComputedStyle(i,null)||{}).marginRight)),b.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=b.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",g=0===i[0].offsetHeight,g&&(i[0].style.display="",i[1].style.display="none",g=0===i[0].offsetHeight),c.removeChild(d))}}}(),m.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var Mb=/alpha\([^)]*\)/i,Nb=/opacity\s*=\s*([^)]*)/,Ob=/^(none|table(?!-c[ea]).+)/,Pb=new RegExp("^("+S+")(.*)$","i"),Qb=new RegExp("^([+-])=("+S+")","i"),Rb={position:"absolute",visibility:"hidden",display:"block"},Sb={letterSpacing:"0",fontWeight:"400"},Tb=["Webkit","O","Moz","ms"];function Ub(a,b){if(b in a)return b;var c=b.charAt(0).toUpperCase()+b.slice(1),d=b,e=Tb.length;while(e--)if(b=Tb[e]+c,b in a)return b;return d}function Vb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=m._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&U(d)&&(f[g]=m._data(d,"olddisplay",Fb(d.nodeName)))):(e=U(d),(c&&"none"!==c||!e)&&m._data(d,"olddisplay",e?c:m.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function Wb(a,b,c){var d=Pb.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Xb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=m.css(a,c+T[f],!0,e)),d?("content"===c&&(g-=m.css(a,"padding"+T[f],!0,e)),"margin"!==c&&(g-=m.css(a,"border"+T[f]+"Width",!0,e))):(g+=m.css(a,"padding"+T[f],!0,e),"padding"!==c&&(g+=m.css(a,"border"+T[f]+"Width",!0,e)));return g}function Yb(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ib(a),g=k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Jb(a,b,f),(0>e||null==e)&&(e=a.style[b]),Hb.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Xb(a,b,c||(g?"border":"content"),d,f)+"px"}m.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Jb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":k.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=m.camelCase(b),i=a.style;if(b=m.cssProps[h]||(m.cssProps[h]=Ub(i,h)),g=m.cssHooks[b]||m.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b];if(f=typeof c,"string"===f&&(e=Qb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(m.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||m.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=m.camelCase(b);return b=m.cssProps[h]||(m.cssProps[h]=Ub(a.style,h)),g=m.cssHooks[b]||m.cssHooks[h],g&&"get"in g&&(f=g.get(a,!0,c)),void 0===f&&(f=Jb(a,b,d)),"normal"===f&&b in Sb&&(f=Sb[b]),""===c||c?(e=parseFloat(f),c===!0||m.isNumeric(e)?e||0:f):f}}),m.each(["height","width"],function(a,b){m.cssHooks[b]={get:function(a,c,d){return c?Ob.test(m.css(a,"display"))&&0===a.offsetWidth?m.swap(a,Rb,function(){return Yb(a,b,d)}):Yb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ib(a);return Wb(a,c,d?Xb(a,b,d,k.boxSizing&&"border-box"===m.css(a,"boxSizing",!1,e),e):0)}}}),k.opacity||(m.cssHooks.opacity={get:function(a,b){return Nb.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=m.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===m.trim(f.replace(Mb,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Mb.test(f)?f.replace(Mb,e):f+" "+e)}}),m.cssHooks.marginRight=Lb(k.reliableMarginRight,function(a,b){return b?m.swap(a,{display:"inline-block"},Jb,[a,"marginRight"]):void 0}),m.each({margin:"",padding:"",border:"Width"},function(a,b){m.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+T[d]+b]=f[d]||f[d-2]||f[0];return e}},Gb.test(a)||(m.cssHooks[a+b].set=Wb)}),m.fn.extend({css:function(a,b){return V(this,function(a,b,c){var d,e,f={},g=0;if(m.isArray(b)){for(d=Ib(a),e=b.length;e>g;g++)f[b[g]]=m.css(a,b[g],!1,d);return f}return void 0!==c?m.style(a,b,c):m.css(a,b)},a,b,arguments.length>1)},show:function(){return Vb(this,!0)},hide:function(){return Vb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){U(this)?m(this).show():m(this).hide()})}});function Zb(a,b,c,d,e){return new Zb.prototype.init(a,b,c,d,e)}m.Tween=Zb,Zb.prototype={constructor:Zb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(m.cssNumber[c]?"":"px")
},cur:function(){var a=Zb.propHooks[this.prop];return a&&a.get?a.get(this):Zb.propHooks._default.get(this)},run:function(a){var b,c=Zb.propHooks[this.prop];return this.pos=b=this.options.duration?m.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Zb.propHooks._default.set(this),this}},Zb.prototype.init.prototype=Zb.prototype,Zb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=m.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){m.fx.step[a.prop]?m.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[m.cssProps[a.prop]]||m.cssHooks[a.prop])?m.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Zb.propHooks.scrollTop=Zb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},m.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},m.fx=Zb.prototype.init,m.fx.step={};var $b,_b,ac=/^(?:toggle|show|hide)$/,bc=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),cc=/queueHooks$/,dc=[ic],ec={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=bc.exec(b),f=e&&e[3]||(m.cssNumber[a]?"":"px"),g=(m.cssNumber[a]||"px"!==f&&+d)&&bc.exec(m.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,m.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function fc(){return setTimeout(function(){$b=void 0}),$b=m.now()}function gc(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=T[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function hc(a,b,c){for(var d,e=(ec[b]||[]).concat(ec["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ic(a,b,c){var d,e,f,g,h,i,j,l,n=this,o={},p=a.style,q=a.nodeType&&U(a),r=m._data(a,"fxshow");c.queue||(h=m._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,n.always(function(){n.always(function(){h.unqueued--,m.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=m.css(a,"display"),l="none"===j?m._data(a,"olddisplay")||Fb(a.nodeName):j,"inline"===l&&"none"===m.css(a,"float")&&(k.inlineBlockNeedsLayout&&"inline"!==Fb(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",k.shrinkWrapBlocks()||n.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],ac.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=!0}o[d]=r&&r[d]||m.style(a,d)}else j=void 0;if(m.isEmptyObject(o))"inline"===("none"===j?Fb(a.nodeName):j)&&(p.display=j);else{r?"hidden"in r&&(q=r.hidden):r=m._data(a,"fxshow",{}),f&&(r.hidden=!q),q?m(a).show():n.done(function(){m(a).hide()}),n.done(function(){var b;m._removeData(a,"fxshow");for(b in o)m.style(a,b,o[b])});for(d in o)g=hc(q?r[d]:0,d,n),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function jc(a,b){var c,d,e,f,g;for(c in a)if(d=m.camelCase(c),e=b[d],f=a[c],m.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=m.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function kc(a,b,c){var d,e,f=0,g=dc.length,h=m.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=$b||fc(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:m.extend({},b),opts:m.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:$b||fc(),duration:c.duration,tweens:[],createTween:function(b,c){var d=m.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(jc(k,j.opts.specialEasing);g>f;f++)if(d=dc[f].call(j,a,k,j.opts))return d;return m.map(k,hc,j),m.isFunction(j.opts.start)&&j.opts.start.call(a,j),m.fx.timer(m.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}m.Animation=m.extend(kc,{tweener:function(a,b){m.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],ec[c]=ec[c]||[],ec[c].unshift(b)},prefilter:function(a,b){b?dc.unshift(a):dc.push(a)}}),m.speed=function(a,b,c){var d=a&&"object"==typeof a?m.extend({},a):{complete:c||!c&&b||m.isFunction(a)&&a,duration:a,easing:c&&b||b&&!m.isFunction(b)&&b};return d.duration=m.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in m.fx.speeds?m.fx.speeds[d.duration]:m.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){m.isFunction(d.old)&&d.old.call(this),d.queue&&m.dequeue(this,d.queue)},d},m.fn.extend({fadeTo:function(a,b,c,d){return this.filter(U).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=m.isEmptyObject(a),f=m.speed(b,c,d),g=function(){var b=kc(this,m.extend({},a),f);(e||m._data(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=m.timers,g=m._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&cc.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&m.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=m._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=m.timers,g=d?d.length:0;for(c.finish=!0,m.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),m.each(["toggle","show","hide"],function(a,b){var c=m.fn[b];m.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(gc(b,!0),a,d,e)}}),m.each({slideDown:gc("show"),slideUp:gc("hide"),slideToggle:gc("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){m.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),m.timers=[],m.fx.tick=function(){var a,b=m.timers,c=0;for($b=m.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||m.fx.stop(),$b=void 0},m.fx.timer=function(a){m.timers.push(a),a()?m.fx.start():m.timers.pop()},m.fx.interval=13,m.fx.start=function(){_b||(_b=setInterval(m.fx.tick,m.fx.interval))},m.fx.stop=function(){clearInterval(_b),_b=null},m.fx.speeds={slow:600,fast:200,_default:400},m.fn.delay=function(a,b){return a=m.fx?m.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a,b,c,d,e;b=y.createElement("div"),b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",d=b.getElementsByTagName("a")[0],c=y.createElement("select"),e=c.appendChild(y.createElement("option")),a=b.getElementsByTagName("input")[0],d.style.cssText="top:1px",k.getSetAttribute="t"!==b.className,k.style=/top/.test(d.getAttribute("style")),k.hrefNormalized="/a"===d.getAttribute("href"),k.checkOn=!!a.value,k.optSelected=e.selected,k.enctype=!!y.createElement("form").enctype,c.disabled=!0,k.optDisabled=!e.disabled,a=y.createElement("input"),a.setAttribute("value",""),k.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),k.radioValue="t"===a.value}();var lc=/\r/g;m.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=m.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,m(this).val()):a,null==e?e="":"number"==typeof e?e+="":m.isArray(e)&&(e=m.map(e,function(a){return null==a?"":a+""})),b=m.valHooks[this.type]||m.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=m.valHooks[e.type]||m.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(lc,""):null==c?"":c)}}}),m.extend({valHooks:{option:{get:function(a){var b=m.find.attr(a,"value");return null!=b?b:m.trim(m.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&m.nodeName(c.parentNode,"optgroup"))){if(b=m(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=m.makeArray(b),g=e.length;while(g--)if(d=e[g],m.inArray(m.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),m.each(["radio","checkbox"],function(){m.valHooks[this]={set:function(a,b){return m.isArray(b)?a.checked=m.inArray(m(a).val(),b)>=0:void 0}},k.checkOn||(m.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var mc,nc,oc=m.expr.attrHandle,pc=/^(?:checked|selected)$/i,qc=k.getSetAttribute,rc=k.input;m.fn.extend({attr:function(a,b){return V(this,m.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){m.removeAttr(this,a)})}}),m.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===K?m.prop(a,b,c):(1===f&&m.isXMLDoc(a)||(b=b.toLowerCase(),d=m.attrHooks[b]||(m.expr.match.bool.test(b)?nc:mc)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=m.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void m.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=m.propFix[c]||c,m.expr.match.bool.test(c)?rc&&qc||!pc.test(c)?a[d]=!1:a[m.camelCase("default-"+c)]=a[d]=!1:m.attr(a,c,""),a.removeAttribute(qc?c:d)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&m.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),nc={set:function(a,b,c){return b===!1?m.removeAttr(a,c):rc&&qc||!pc.test(c)?a.setAttribute(!qc&&m.propFix[c]||c,c):a[m.camelCase("default-"+c)]=a[c]=!0,c}},m.each(m.expr.match.bool.source.match(/\w+/g),function(a,b){var c=oc[b]||m.find.attr;oc[b]=rc&&qc||!pc.test(b)?function(a,b,d){var e,f;return d||(f=oc[b],oc[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,oc[b]=f),e}:function(a,b,c){return c?void 0:a[m.camelCase("default-"+b)]?b.toLowerCase():null}}),rc&&qc||(m.attrHooks.value={set:function(a,b,c){return m.nodeName(a,"input")?void(a.defaultValue=b):mc&&mc.set(a,b,c)}}),qc||(mc={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},oc.id=oc.name=oc.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},m.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:mc.set},m.attrHooks.contenteditable={set:function(a,b,c){mc.set(a,""===b?!1:b,c)}},m.each(["width","height"],function(a,b){m.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),k.style||(m.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var sc=/^(?:input|select|textarea|button|object)$/i,tc=/^(?:a|area)$/i;m.fn.extend({prop:function(a,b){return V(this,m.prop,a,b,arguments.length>1)},removeProp:function(a){return a=m.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),m.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!m.isXMLDoc(a),f&&(b=m.propFix[b]||b,e=m.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=m.find.attr(a,"tabindex");return b?parseInt(b,10):sc.test(a.nodeName)||tc.test(a.nodeName)&&a.href?0:-1}}}}),k.hrefNormalized||m.each(["href","src"],function(a,b){m.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),k.optSelected||(m.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),m.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){m.propFix[this.toLowerCase()]=this}),k.enctype||(m.propFix.enctype="encoding");var uc=/[\t\r\n\f]/g;m.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=m.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(m.isFunction(a))return this.each(function(b){m(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(E)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(uc," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?m.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(m.isFunction(a)?function(c){m(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=m(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===K||"boolean"===c)&&(this.className&&m._data(this,"__className__",this.className),this.className=this.className||a===!1?"":m._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(uc," ").indexOf(b)>=0)return!0;return!1}}),m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){m.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),m.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var vc=m.now(),wc=/\?/,xc=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;m.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=m.trim(b+"");return e&&!m.trim(e.replace(xc,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():m.error("Invalid JSON: "+b)},m.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b))}catch(e){c=void 0}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||m.error("Invalid XML: "+b),c};var yc,zc,Ac=/#.*$/,Bc=/([?&])_=[^&]*/,Cc=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Dc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Ec=/^(?:GET|HEAD)$/,Fc=/^\/\//,Gc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Hc={},Ic={},Jc="*/".concat("*");try{zc=location.href}catch(Kc){zc=y.createElement("a"),zc.href="",zc=zc.href}yc=Gc.exec(zc.toLowerCase())||[];function Lc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(m.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Mc(a,b,c,d){var e={},f=a===Ic;function g(h){var i;return e[h]=!0,m.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Nc(a,b){var c,d,e=m.ajaxSettings.flatOptions||{};for(d in b)void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&m.extend(!0,a,c),a}function Oc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else{for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g)}f=f||d}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Pc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}m.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:zc,type:"GET",isLocal:Dc.test(yc[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":m.parseJSON,"text xml":m.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Nc(Nc(a,m.ajaxSettings),b):Nc(m.ajaxSettings,a)},ajaxPrefilter:Lc(Hc),ajaxTransport:Lc(Ic),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=m.ajaxSetup({},b),l=k.context||k,n=k.context&&(l.nodeType||l.jquery)?m(l):m.event,o=m.Deferred(),p=m.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!j){j={};while(b=Cc.exec(f))j[b[1].toLowerCase()]=b[2]}b=j[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?f:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return i&&i.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||zc)+"").replace(Ac,"").replace(Fc,yc[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=m.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(c=Gc.exec(k.url.toLowerCase()),k.crossDomain=!(!c||c[1]===yc[1]&&c[2]===yc[2]&&(c[3]||("http:"===c[1]?"80":"443"))===(yc[3]||("http:"===yc[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=m.param(k.data,k.traditional)),Mc(Hc,k,b,v),2===t)return v;h=k.global,h&&0===m.active++&&m.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!Ec.test(k.type),e=k.url,k.hasContent||(k.data&&(e=k.url+=(wc.test(e)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=Bc.test(e)?e.replace(Bc,"$1_="+vc++):e+(wc.test(e)?"&":"?")+"_="+vc++)),k.ifModified&&(m.lastModified[e]&&v.setRequestHeader("If-Modified-Since",m.lastModified[e]),m.etag[e]&&v.setRequestHeader("If-None-Match",m.etag[e])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+Jc+"; q=0.01":""):k.accepts["*"]);for(d in k.headers)v.setRequestHeader(d,k.headers[d]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(d in{success:1,error:1,complete:1})v[d](k[d]);if(i=Mc(Ic,k,b,v)){v.readyState=1,h&&n.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,i.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,c,d){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),i=void 0,f=d||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,c&&(u=Oc(k,v,c)),u=Pc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(m.lastModified[e]=w),w=v.getResponseHeader("etag"),w&&(m.etag[e]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,h&&n.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),h&&(n.trigger("ajaxComplete",[v,k]),--m.active||m.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return m.get(a,b,c,"json")},getScript:function(a,b){return m.get(a,void 0,b,"script")}}),m.each(["get","post"],function(a,b){m[b]=function(a,c,d,e){return m.isFunction(c)&&(e=e||d,d=c,c=void 0),m.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),m.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){m.fn[b]=function(a){return this.on(b,a)}}),m._evalUrl=function(a){return m.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},m.fn.extend({wrapAll:function(a){if(m.isFunction(a))return this.each(function(b){m(this).wrapAll(a.call(this,b))});if(this[0]){var b=m(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(m.isFunction(a)?function(b){m(this).wrapInner(a.call(this,b))}:function(){var b=m(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=m.isFunction(a);return this.each(function(c){m(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){m.nodeName(this,"body")||m(this).replaceWith(this.childNodes)}).end()}}),m.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0||!k.reliableHiddenOffsets()&&"none"===(a.style&&a.style.display||m.css(a,"display"))},m.expr.filters.visible=function(a){return!m.expr.filters.hidden(a)};var Qc=/%20/g,Rc=/\[\]$/,Sc=/\r?\n/g,Tc=/^(?:submit|button|image|reset|file)$/i,Uc=/^(?:input|select|textarea|keygen)/i;function Vc(a,b,c,d){var e;if(m.isArray(b))m.each(b,function(b,e){c||Rc.test(a)?d(a,e):Vc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==m.type(b))d(a,b);else for(e in b)Vc(a+"["+e+"]",b[e],c,d)}m.param=function(a,b){var c,d=[],e=function(a,b){b=m.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=m.ajaxSettings&&m.ajaxSettings.traditional),m.isArray(a)||a.jquery&&!m.isPlainObject(a))m.each(a,function(){e(this.name,this.value)});else for(c in a)Vc(c,a[c],b,e);return d.join("&").replace(Qc,"+")},m.fn.extend({serialize:function(){return m.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=m.prop(this,"elements");return a?m.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!m(this).is(":disabled")&&Uc.test(this.nodeName)&&!Tc.test(a)&&(this.checked||!W.test(a))}).map(function(a,b){var c=m(this).val();return null==c?null:m.isArray(c)?m.map(c,function(a){return{name:b.name,value:a.replace(Sc,"\r\n")}}):{name:b.name,value:c.replace(Sc,"\r\n")}}).get()}}),m.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&Zc()||$c()}:Zc;var Wc=0,Xc={},Yc=m.ajaxSettings.xhr();a.ActiveXObject&&m(a).on("unload",function(){for(var a in Xc)Xc[a](void 0,!0)}),k.cors=!!Yc&&"withCredentials"in Yc,Yc=k.ajax=!!Yc,Yc&&m.ajaxTransport(function(a){if(!a.crossDomain||k.cors){var b;return{send:function(c,d){var e,f=a.xhr(),g=++Wc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)void 0!==c[e]&&f.setRequestHeader(e,c[e]+"");f.send(a.hasContent&&a.data||null),b=function(c,e){var h,i,j;if(b&&(e||4===f.readyState))if(delete Xc[g],b=void 0,f.onreadystatechange=m.noop,e)4!==f.readyState&&f.abort();else{j={},h=f.status,"string"==typeof f.responseText&&(j.text=f.responseText);try{i=f.statusText}catch(k){i=""}h||!a.isLocal||a.crossDomain?1223===h&&(h=204):h=j.text?200:404}j&&d(h,i,j,f.getAllResponseHeaders())},a.async?4===f.readyState?setTimeout(b):f.onreadystatechange=Xc[g]=b:b()},abort:function(){b&&b(void 0,!0)}}}});function Zc(){try{return new a.XMLHttpRequest}catch(b){}}function $c(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}m.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return m.globalEval(a),a}}}),m.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),m.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=y.head||m("head")[0]||y.documentElement;return{send:function(d,e){b=y.createElement("script"),b.async=!0,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||e(200,"success"))},c.insertBefore(b,c.firstChild)},abort:function(){b&&b.onload(void 0,!0)}}}});var _c=[],ad=/(=)\?(?=&|$)|\?\?/;m.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=_c.pop()||m.expando+"_"+vc++;return this[a]=!0,a}}),m.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(ad.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&ad.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=m.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(ad,"$1"+e):b.jsonp!==!1&&(b.url+=(wc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||m.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,_c.push(e)),g&&m.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),m.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||y;var d=u.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=m.buildFragment([a],b,e),e&&e.length&&m(e).remove(),m.merge([],d.childNodes))};var bd=m.fn.load;m.fn.load=function(a,b,c){if("string"!=typeof a&&bd)return bd.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=m.trim(a.slice(h,a.length)),a=a.slice(0,h)),m.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(f="POST"),g.length>0&&m.ajax({url:a,type:f,dataType:"html",data:b}).done(function(a){e=arguments,g.html(d?m("<div>").append(m.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,e||[a.responseText,b,a])}),this},m.expr.filters.animated=function(a){return m.grep(m.timers,function(b){return a===b.elem}).length};var cd=a.document.documentElement;function dd(a){return m.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:!1}m.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=m.css(a,"position"),l=m(a),n={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=m.css(a,"top"),i=m.css(a,"left"),j=("absolute"===k||"fixed"===k)&&m.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),m.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(n.top=b.top-h.top+g),null!=b.left&&(n.left=b.left-h.left+e),"using"in b?b.using.call(a,n):l.css(n)}},m.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){m.offset.setOffset(this,a,b)});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,m.contains(b,e)?(typeof e.getBoundingClientRect!==K&&(d=e.getBoundingClientRect()),c=dd(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return"fixed"===m.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),m.nodeName(a[0],"html")||(c=a.offset()),c.top+=m.css(a[0],"borderTopWidth",!0),c.left+=m.css(a[0],"borderLeftWidth",!0)),{top:b.top-c.top-m.css(d,"marginTop",!0),left:b.left-c.left-m.css(d,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||cd;while(a&&!m.nodeName(a,"html")&&"static"===m.css(a,"position"))a=a.offsetParent;return a||cd})}}),m.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);m.fn[a]=function(d){return V(this,function(a,d,e){var f=dd(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?m(f).scrollLeft():e,c?e:m(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)}}),m.each(["top","left"],function(a,b){m.cssHooks[b]=Lb(k.pixelPosition,function(a,c){return c?(c=Jb(a,b),Hb.test(c)?m(a).position()[b]+"px":c):void 0})}),m.each({Height:"height",Width:"width"},function(a,b){m.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){m.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return V(this,function(b,c,d){var e;return m.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?m.css(b,c,g):m.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),m.fn.size=function(){return this.length},m.fn.andSelf=m.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return m});var ed=a.jQuery,fd=a.$;return m.noConflict=function(b){return a.$===m&&(a.$=fd),b&&a.jQuery===m&&(a.jQuery=ed),m},typeof b===K&&(a.jQuery=a.$=m),m});

// From http://codepen.io/simeydotme/pen/jgcvi

function Sparkle( $parent, options ) {
  this.options = options;
  this.init( $parent );
}

Sparkle.prototype = {
  
  "init" : function( $parent ) {
    
    var _this = this;
    
    this.$canvas = 
      $("<canvas>")
        .addClass("sparkle-canvas")
        .css({
          position: "absolute",
          top: "-"+_this.options.overlap+"px",
          left: "-"+_this.options.overlap+"px",
          "pointer-events": "none"
        })
        .appendTo($parent);
    
    this.canvas = this.$canvas[0];
    this.context = this.canvas.getContext("2d");
    
    this.sprite = new Image();
    this.sprites = [0,6,13,20];
    this.sprite.src = this.datauri;
    
    this.canvas.width = this.options.width + ( this.options.overlap * 2);
    this.canvas.height = this.options.height + ( this.options.overlap * 2);
    
    
    this.particles = this.createSparkles( this.canvas.width , this.canvas.height );
    
    this.anim = null;
    this.fade = false;
    
  },
  
  "createSparkles" : function( w , h ) {
    
    var holder = [];
    
    for( var i = 0; i < this.options.count; i++ ) {
      
      var color = this.options.color;
      
      if( this.options.color == "rainbow" ) {
        color = '#'+ ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6);
      } else if( $.type(this.options.color) === "array" ) {
        color = this.options.color[ Math.floor(Math.random()*this.options.color.length) ];
      }

      holder[i] = {
        position: {
          x: Math.floor(Math.random()*w),
          y: Math.floor(Math.random()*h)
        },
        style: this.sprites[ Math.floor(Math.random()*4) ],
        delta: {
          x: Math.floor(Math.random() * 1000) - 500,
          y: Math.floor(Math.random() * 1000) - 500
        },
        size: parseFloat((Math.random()*2).toFixed(2)),
        color: color
      };
            
    }
    
    return holder;
    
  },
  
  "draw" : function( time, fade ) {
        
    var ctx = this.context;
    
    ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
          
    for( var i = 0; i < this.options.count; i++ ) {

      var derpicle = this.particles[i];
      var modulus = Math.floor(Math.random()*7);
      
      if( Math.floor(time) % modulus === 0 ) {
        derpicle.style = this.sprites[ Math.floor(Math.random()*4) ];
      }
      
      ctx.save();
      ctx.globalAlpha = derpicle.opacity;
      ctx.drawImage(this.sprite, derpicle.style, 0, 7, 7, derpicle.position.x, derpicle.position.y, 7, 7);
      
      if( this.options.color ) {  
        
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = derpicle.color;
        ctx.fillRect(derpicle.position.x, derpicle.position.y, 7, 7);
        
      }
      
      ctx.restore();

    }
    
        
  },
  
  "update" : function() {
    
     var _this = this;
    
     this.anim = window.requestAnimationFrame( function(time) {

       for( var i = 0; i < _this.options.count; i++ ) {

         var u = _this.particles[i];
         
         var randX = ( Math.random() > Math.random()*2 );
         var randY = ( Math.random() > Math.random()*3 );
         
         if( randX ) {
           u.position.x += ((u.delta.x * _this.options.speed) / 1500); 
         }        
         
         if( !randY ) {
           u.position.y -= ((u.delta.y * _this.options.speed) / 800);
         }

         if( u.position.x > _this.canvas.width ) {
           u.position.x = -7;
         } else if ( u.position.x < -7 ) {
           u.position.x = _this.canvas.width; 
         }

         if( u.position.y > _this.canvas.height ) {
           u.position.y = -7;
           u.position.x = Math.floor(Math.random()*_this.canvas.width);
         } else if ( u.position.y < -7 ) {
           u.position.y = _this.canvas.height; 
           u.position.x = Math.floor(Math.random()*_this.canvas.width);
         }
         
         if( _this.fade ) {
           u.opacity -= 0.02;
         } else {
           u.opacity -= 0.005;
         }
         
         if( u.opacity <= 0 ) {
           u.opacity = ( _this.fade ) ? 0 : 1;
         }
         
       }
       
       _this.draw( time );
       
       if( _this.fade ) {
         _this.fadeCount -= 1;
         if( _this.fadeCount < 0 ) {
           window.cancelAnimationFrame( _this.anim );
         } else {
           _this.update(); 
         }
       } else {
         _this.update();
       }
       
     });

  },
  
  "cancel" : function() {
    
    this.fadeCount = 100;

  },
  
  "over" : function() {
    
    window.cancelAnimationFrame( this.anim );
    
    for( var i = 0; i < this.options.count; i++ ) {
      this.particles[i].opacity = Math.random();
    }
    
    this.fade = false;
    this.update();

  },
  
  "out" : function() {
    
    this.fade = true;
    this.cancel();
    
  },
  
  
  
  "datauri" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAHCAYAAAD5wDa1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNDNFMzM5REEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNDNFMzM5RUEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0M0UzMzlCQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM0M0UzMzlDQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jzOsUQAAANhJREFUeNqsks0KhCAUhW/Sz6pFSc1AD9HL+OBFbdsVOKWLajH9EE7GFBEjOMxcUNHD8dxPBCEE/DKyLGMqraoqcd4j0ChpUmlBEGCFRBzH2dbj5JycJAn90CEpy1J2SK4apVSM4yiKonhePYwxMU2TaJrm8BpykpWmKQ3D8FbX9SOO4/tOhDEG0zRhGAZo2xaiKDLyPGeSyPM8sCxr868+WC/mvu9j13XBtm1ACME8z7AsC/R9r0fGOf+arOu6jUwS7l6tT/B+xo+aDFRo5BykHfav3/gSYAAtIdQ1IT0puAAAAABJRU5ErkJggg=="

}; 





// $('img.photo',this).imagesLoaded(myFunction)
// execute a callback when all images have loaded.
// needed because .load() doesn't work on cached images
 
// mit license. paul irish. 2010.
// webkit fix from Oren Solomianik. thx!
 
// callback function is passed the last image to load
//   as an argument, and the collection as `this`
 
 
$.fn.imagesLoaded = function(callback){
  var elems = this.filter('img'),
      len   = elems.length,
      blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      
  elems.bind('load.imgloaded',function(){
      if (--len <= 0 && this.src !== blank){ 
        elems.unbind('load.imgloaded');
        callback.call(elems,this); 
      }
  }).each(function(){
     // cached images don't fire load sometimes, so we reset src.
     if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = blank;
        this.src = src;
     }  
  }); 
 
  return this;
};

/**
* Bootstrap.js v2.3.1 by @fat & @mdo
* Copyright 2012 Twitter, Inc.
* http://www.apache.org/licenses/LICENSE-2.0.txt
*/
!function(e){"use strict";e(function(){e.support.transition=function(){var e=function(){var e=document.createElement("bootstrap"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},n;for(n in t)if(e.style[n]!==undefined)return t[n]}();return e&&{end:e}}()})}(window.jQuery),!function(e){"use strict";var t='[data-dismiss="alert"]',n=function(n){e(n).on("click",t,this.close)};n.prototype.close=function(t){function s(){i.trigger("closed").remove()}var n=e(this),r=n.attr("data-target"),i;r||(r=n.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,"")),i=e(r),t&&t.preventDefault(),i.length||(i=n.hasClass("alert")?n:n.parent()),i.trigger(t=e.Event("close"));if(t.isDefaultPrevented())return;i.removeClass("in"),e.support.transition&&i.hasClass("fade")?i.on(e.support.transition.end,s):s()};var r=e.fn.alert;e.fn.alert=function(t){return this.each(function(){var r=e(this),i=r.data("alert");i||r.data("alert",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.alert.Constructor=n,e.fn.alert.noConflict=function(){return e.fn.alert=r,this},e(document).on("click.alert.data-api",t,n.prototype.close)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.button.defaults,n)};t.prototype.setState=function(e){var t="disabled",n=this.$element,r=n.data(),i=n.is("input")?"val":"html";e+="Text",r.resetText||n.data("resetText",n[i]()),n[i](r[e]||this.options[e]),setTimeout(function(){e=="loadingText"?n.addClass(t).attr(t,t):n.removeClass(t).removeAttr(t)},0)},t.prototype.toggle=function(){var e=this.$element.closest('[data-toggle="buttons-radio"]');e&&e.find(".active").removeClass("active"),this.$element.toggleClass("active")};var n=e.fn.button;e.fn.button=function(n){return this.each(function(){var r=e(this),i=r.data("button"),s=typeof n=="object"&&n;i||r.data("button",i=new t(this,s)),n=="toggle"?i.toggle():n&&i.setState(n)})},e.fn.button.defaults={loadingText:"loading..."},e.fn.button.Constructor=t,e.fn.button.noConflict=function(){return e.fn.button=n,this},e(document).on("click.button.data-api","[data-toggle^=button]",function(t){var n=e(t.target);n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.options.pause=="hover"&&this.$element.on("mouseenter",e.proxy(this.pause,this)).on("mouseleave",e.proxy(this.cycle,this))};t.prototype={cycle:function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(e.proxy(this.next,this),this.options.interval)),this},getActiveIndex:function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},to:function(t){var n=this.getActiveIndex(),r=this;if(t>this.$items.length-1||t<0)return;return this.sliding?this.$element.one("slid",function(){r.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",e(this.$items[t]))},pause:function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&e.support.transition.end&&(this.$element.trigger(e.support.transition.end),this.cycle(!0)),clearInterval(this.interval),this.interval=null,this},next:function(){if(this.sliding)return;return this.slide("next")},prev:function(){if(this.sliding)return;return this.slide("prev")},slide:function(t,n){var r=this.$element.find(".item.active"),i=n||r[t](),s=this.interval,o=t=="next"?"left":"right",u=t=="next"?"first":"last",a=this,f;this.sliding=!0,s&&this.pause(),i=i.length?i:this.$element.find(".item")[u](),f=e.Event("slide",{relatedTarget:i[0],direction:o});if(i.hasClass("active"))return;this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid",function(){var t=e(a.$indicators.children()[a.getActiveIndex()]);t&&t.addClass("active")}));if(e.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(f);if(f.isDefaultPrevented())return;i.addClass(t),i[0].offsetWidth,r.addClass(o),i.addClass(o),this.$element.one(e.support.transition.end,function(){i.removeClass([t,o].join(" ")).addClass("active"),r.removeClass(["active",o].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger("slid")},0)})}else{this.$element.trigger(f);if(f.isDefaultPrevented())return;r.removeClass("active"),i.addClass("active"),this.sliding=!1,this.$element.trigger("slid")}return s&&this.cycle(),this}};var n=e.fn.carousel;e.fn.carousel=function(n){return this.each(function(){var r=e(this),i=r.data("carousel"),s=e.extend({},e.fn.carousel.defaults,typeof n=="object"&&n),o=typeof n=="string"?n:s.slide;i||r.data("carousel",i=new t(this,s)),typeof n=="number"?i.to(n):o?i[o]():s.interval&&i.pause().cycle()})},e.fn.carousel.defaults={interval:5e3,pause:"hover"},e.fn.carousel.Constructor=t,e.fn.carousel.noConflict=function(){return e.fn.carousel=n,this},e(document).on("click.carousel.data-api","[data-slide], [data-slide-to]",function(t){var n=e(this),r,i=e(n.attr("data-target")||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,"")),s=e.extend({},i.data(),n.data()),o;i.carousel(s),(o=n.attr("data-slide-to"))&&i.data("carousel").pause().to(o).cycle(),t.preventDefault()})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.collapse.defaults,n),this.options.parent&&(this.$parent=e(this.options.parent)),this.options.toggle&&this.toggle()};t.prototype={constructor:t,dimension:function(){var e=this.$element.hasClass("width");return e?"width":"height"},show:function(){var t,n,r,i;if(this.transitioning||this.$element.hasClass("in"))return;t=this.dimension(),n=e.camelCase(["scroll",t].join("-")),r=this.$parent&&this.$parent.find("> .accordion-group > .in");if(r&&r.length){i=r.data("collapse");if(i&&i.transitioning)return;r.collapse("hide"),i||r.data("collapse",null)}this.$element[t](0),this.transition("addClass",e.Event("show"),"shown"),e.support.transition&&this.$element[t](this.$element[0][n])},hide:function(){var t;if(this.transitioning||!this.$element.hasClass("in"))return;t=this.dimension(),this.reset(this.$element[t]()),this.transition("removeClass",e.Event("hide"),"hidden"),this.$element[t](0)},reset:function(e){var t=this.dimension();return this.$element.removeClass("collapse")[t](e||"auto")[0].offsetWidth,this.$element[e!==null?"addClass":"removeClass"]("collapse"),this},transition:function(t,n,r){var i=this,s=function(){n.type=="show"&&i.reset(),i.transitioning=0,i.$element.trigger(r)};this.$element.trigger(n);if(n.isDefaultPrevented())return;this.transitioning=1,this.$element[t]("in"),e.support.transition&&this.$element.hasClass("collapse")?this.$element.one(e.support.transition.end,s):s()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};var n=e.fn.collapse;e.fn.collapse=function(n){return this.each(function(){var r=e(this),i=r.data("collapse"),s=e.extend({},e.fn.collapse.defaults,r.data(),typeof n=="object"&&n);i||r.data("collapse",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.collapse.defaults={toggle:!0},e.fn.collapse.Constructor=t,e.fn.collapse.noConflict=function(){return e.fn.collapse=n,this},e(document).on("click.collapse.data-api","[data-toggle=collapse]",function(t){var n=e(this),r,i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""),s=e(i).data("collapse")?"toggle":n.data();n[e(i).hasClass("in")?"addClass":"removeClass"]("collapsed"),e(i).collapse(s)})}(window.jQuery),!function(e){"use strict";function r(){e(t).each(function(){i(e(this)).removeClass("open")})}function i(t){var n=t.attr("data-target"),r;n||(n=t.attr("href"),n=n&&/#/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,"")),r=n&&e(n);if(!r||!r.length)r=t.parent();return r}var t="[data-toggle=dropdown]",n=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};n.prototype={constructor:n,toggle:function(t){var n=e(this),s,o;if(n.is(".disabled, :disabled"))return;return s=i(n),o=s.hasClass("open"),r(),o||s.toggleClass("open"),n.focus(),!1},keydown:function(n){var r,s,o,u,a,f;if(!/(38|40|27)/.test(n.keyCode))return;r=e(this),n.preventDefault(),n.stopPropagation();if(r.is(".disabled, :disabled"))return;u=i(r),a=u.hasClass("open");if(!a||a&&n.keyCode==27)return n.which==27&&u.find(t).focus(),r.click();s=e("[role=menu] li:not(.divider):visible a",u);if(!s.length)return;f=s.index(s.filter(":focus")),n.keyCode==38&&f>0&&f--,n.keyCode==40&&f<s.length-1&&f++,~f||(f=0),s.eq(f).focus()}};var s=e.fn.dropdown;e.fn.dropdown=function(t){return this.each(function(){var r=e(this),i=r.data("dropdown");i||r.data("dropdown",i=new n(this)),typeof t=="string"&&i[t].call(r)})},e.fn.dropdown.Constructor=n,e.fn.dropdown.noConflict=function(){return e.fn.dropdown=s,this},e(document).on("click.dropdown.data-api",r).on("click.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.dropdown-menu",function(e){e.stopPropagation()}).on("click.dropdown.data-api",t,n.prototype.toggle).on("keydown.dropdown.data-api",t+", [role=menu]",n.prototype.keydown)}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=n,this.$element=e(t).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};t.prototype={constructor:t,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var t=this,n=e.Event("show");this.$element.trigger(n);if(this.isShown||n.isDefaultPrevented())return;this.isShown=!0,this.escape(),this.backdrop(function(){var n=e.support.transition&&t.$element.hasClass("fade");t.$element.parent().length||t.$element.appendTo(document.body),t.$element.show(),n&&t.$element[0].offsetWidth,t.$element.addClass("in").attr("aria-hidden",!1),t.enforceFocus(),n?t.$element.one(e.support.transition.end,function(){t.$element.focus().trigger("shown")}):t.$element.focus().trigger("shown")})},hide:function(t){t&&t.preventDefault();var n=this;t=e.Event("hide"),this.$element.trigger(t);if(!this.isShown||t.isDefaultPrevented())return;this.isShown=!1,this.escape(),e(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),e.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var t=this;e(document).on("focusin.modal",function(e){t.$element[0]!==e.target&&!t.$element.has(e.target).length&&t.$element.focus()})},escape:function(){var e=this;this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.modal",function(t){t.which==27&&e.hide()}):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var t=this,n=setTimeout(function(){t.$element.off(e.support.transition.end),t.hideModal()},500);this.$element.one(e.support.transition.end,function(){clearTimeout(n),t.hideModal()})},hideModal:function(){var e=this;this.$element.hide(),this.backdrop(function(){e.removeBackdrop(),e.$element.trigger("hidden")})},removeBackdrop:function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},backdrop:function(t){var n=this,r=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var i=e.support.transition&&r;this.$backdrop=e('<div class="modal-backdrop '+r+'" />').appendTo(document.body),this.$backdrop.click(this.options.backdrop=="static"?e.proxy(this.$element[0].focus,this.$element[0]):e.proxy(this.hide,this)),i&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in");if(!t)return;i?this.$backdrop.one(e.support.transition.end,t):t()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,t):t()):t&&t()}};var n=e.fn.modal;e.fn.modal=function(n){return this.each(function(){var r=e(this),i=r.data("modal"),s=e.extend({},e.fn.modal.defaults,r.data(),typeof n=="object"&&n);i||r.data("modal",i=new t(this,s)),typeof n=="string"?i[n]():s.show&&i.show()})},e.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},e.fn.modal.Constructor=t,e.fn.modal.noConflict=function(){return e.fn.modal=n,this},e(document).on("click.modal.data-api",'[data-toggle="modal"]',function(t){var n=e(this),r=n.attr("href"),i=e(n.attr("data-target")||r&&r.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("modal")?"toggle":e.extend({remote:!/#/.test(r)&&r},i.data(),n.data());t.preventDefault(),i.modal(s).one("hide",function(){n.focus()})})}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("tooltip",e,t)};t.prototype={constructor:t,init:function(t,n,r){var i,s,o,u,a;this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.enabled=!0,o=this.options.trigger.split(" ");for(a=o.length;a--;)u=o[a],u=="click"?this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this)):u!="manual"&&(i=u=="hover"?"mouseenter":"focus",s=u=="hover"?"mouseleave":"blur",this.$element.on(i+"."+this.type,this.options.selector,e.proxy(this.enter,this)),this.$element.on(s+"."+this.type,this.options.selector,e.proxy(this.leave,this)));this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(t){return t=e.extend({},e.fn[this.type].defaults,this.$element.data(),t),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},enter:function(t){var n=e.fn[this.type].defaults,r={},i;this._options&&e.each(this._options,function(e,t){n[e]!=t&&(r[e]=t)},this),i=e(t.currentTarget)[this.type](r).data(this.type);if(!i.options.delay||!i.options.delay.show)return i.show();clearTimeout(this.timeout),i.hoverState="in",this.timeout=setTimeout(function(){i.hoverState=="in"&&i.show()},i.options.delay.show)},leave:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!n.options.delay||!n.options.delay.hide)return n.hide();n.hoverState="out",this.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},show:function(){var t,n,r,i,s,o,u=e.Event("show");if(this.hasContent()&&this.enabled){this.$element.trigger(u);if(u.isDefaultPrevented())return;t=this.tip(),this.setContent(),this.options.animation&&t.addClass("fade"),s=typeof this.options.placement=="function"?this.options.placement.call(this,t[0],this.$element[0]):this.options.placement,t.detach().css({top:0,left:0,display:"block"}),this.options.container?t.appendTo(this.options.container):t.insertAfter(this.$element),n=this.getPosition(),r=t[0].offsetWidth,i=t[0].offsetHeight;switch(s){case"bottom":o={top:n.top+n.height,left:n.left+n.width/2-r/2};break;case"top":o={top:n.top-i,left:n.left+n.width/2-r/2};break;case"left":o={top:n.top+n.height/2-i/2,left:n.left-r};break;case"right":o={top:n.top+n.height/2-i/2,left:n.left+n.width}}this.applyPlacement(o,s),this.$element.trigger("shown")}},applyPlacement:function(e,t){var n=this.tip(),r=n[0].offsetWidth,i=n[0].offsetHeight,s,o,u,a;n.offset(e).addClass(t).addClass("in"),s=n[0].offsetWidth,o=n[0].offsetHeight,t=="top"&&o!=i&&(e.top=e.top+i-o,a=!0),t=="bottom"||t=="top"?(u=0,e.left<0&&(u=e.left*-2,e.left=0,n.offset(e),s=n[0].offsetWidth,o=n[0].offsetHeight),this.replaceArrow(u-r+s,s,"left")):this.replaceArrow(o-i,o,"top"),a&&n.offset(e)},replaceArrow:function(e,t,n){this.arrow().css(n,e?50*(1-e/t)+"%":"")},setContent:function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.options.html?"html":"text"](t),e.removeClass("fade in top bottom left right")},hide:function(){function i(){var t=setTimeout(function(){n.off(e.support.transition.end).detach()},500);n.one(e.support.transition.end,function(){clearTimeout(t),n.detach()})}var t=this,n=this.tip(),r=e.Event("hide");this.$element.trigger(r);if(r.isDefaultPrevented())return;return n.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?i():n.detach(),this.$element.trigger("hidden"),this},fixTitle:function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").attr("title","")},hasContent:function(){return this.getTitle()},getPosition:function(){var t=this.$element[0];return e.extend({},typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:t.offsetWidth,height:t.offsetHeight},this.$element.offset())},getTitle:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},tip:function(){return this.$tip=this.$tip||e(this.options.template)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(t){var n=t?e(t.currentTarget)[this.type](this._options).data(this.type):this;n.tip().hasClass("in")?n.hide():n.show()},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};var n=e.fn.tooltip;e.fn.tooltip=function(n){return this.each(function(){var r=e(this),i=r.data("tooltip"),s=typeof n=="object"&&n;i||r.data("tooltip",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.tooltip.Constructor=t,e.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},e.fn.tooltip.noConflict=function(){return e.fn.tooltip=n,this}}(window.jQuery),!function(e){"use strict";var t=function(e,t){this.init("popover",e,t)};t.prototype=e.extend({},e.fn.tooltip.Constructor.prototype,{constructor:t,setContent:function(){var e=this.tip(),t=this.getTitle(),n=this.getContent();e.find(".popover-title")[this.options.html?"html":"text"](t),e.find(".popover-content")[this.options.html?"html":"text"](n),e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var e,t=this.$element,n=this.options;return e=(typeof n.content=="function"?n.content.call(t[0]):n.content)||t.attr("data-content"),e},tip:function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var n=e.fn.popover;e.fn.popover=function(n){return this.each(function(){var r=e(this),i=r.data("popover"),s=typeof n=="object"&&n;i||r.data("popover",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.popover.Constructor=t,e.fn.popover.defaults=e.extend({},e.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.fn.popover.noConflict=function(){return e.fn.popover=n,this}}(window.jQuery),!function(e){"use strict";function t(t,n){var r=e.proxy(this.process,this),i=e(t).is("body")?e(window):e(t),s;this.options=e.extend({},e.fn.scrollspy.defaults,n),this.$scrollElement=i.on("scroll.scroll-spy.data-api",r),this.selector=(this.options.target||(s=e(t).attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.$body=e("body"),this.refresh(),this.process()}t.prototype={constructor:t,refresh:function(){var t=this,n;this.offsets=e([]),this.targets=e([]),n=this.$body.find(this.selector).map(function(){var n=e(this),r=n.data("target")||n.attr("href"),i=/^#\w/.test(r)&&e(r);return i&&i.length&&[[i.position().top+(!e.isWindow(t.$scrollElement.get(0))&&t.$scrollElement.scrollTop()),r]]||null}).sort(function(e,t){return e[0]-t[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},process:function(){var e=this.$scrollElement.scrollTop()+this.options.offset,t=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,n=t-this.$scrollElement.height(),r=this.offsets,i=this.targets,s=this.activeTarget,o;if(e>=n)return s!=(o=i.last()[0])&&this.activate(o);for(o=r.length;o--;)s!=i[o]&&e>=r[o]&&(!r[o+1]||e<=r[o+1])&&this.activate(i[o])},activate:function(t){var n,r;this.activeTarget=t,e(this.selector).parent(".active").removeClass("active"),r=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',n=e(r).parent("li").addClass("active"),n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate")}};var n=e.fn.scrollspy;e.fn.scrollspy=function(n){return this.each(function(){var r=e(this),i=r.data("scrollspy"),s=typeof n=="object"&&n;i||r.data("scrollspy",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.scrollspy.Constructor=t,e.fn.scrollspy.defaults={offset:10},e.fn.scrollspy.noConflict=function(){return e.fn.scrollspy=n,this},e(window).on("load",function(){e('[data-spy="scroll"]').each(function(){var t=e(this);t.scrollspy(t.data())})})}(window.jQuery),!function(e){"use strict";var t=function(t){this.element=e(t)};t.prototype={constructor:t,show:function(){var t=this.element,n=t.closest("ul:not(.dropdown-menu)"),r=t.attr("data-target"),i,s,o;r||(r=t.attr("href"),r=r&&r.replace(/.*(?=#[^\s]*$)/,""));if(t.parent("li").hasClass("active"))return;i=n.find(".active:last a")[0],o=e.Event("show",{relatedTarget:i}),t.trigger(o);if(o.isDefaultPrevented())return;s=e(r),this.activate(t.parent("li"),n),this.activate(s,s.parent(),function(){t.trigger({type:"shown",relatedTarget:i})})},activate:function(t,n,r){function o(){i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),t.addClass("active"),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active"),r&&r()}var i=n.find("> .active"),s=r&&e.support.transition&&i.hasClass("fade");s?i.one(e.support.transition.end,o):o(),i.removeClass("in")}};var n=e.fn.tab;e.fn.tab=function(n){return this.each(function(){var r=e(this),i=r.data("tab");i||r.data("tab",i=new t(this)),typeof n=="string"&&i[n]()})},e.fn.tab.Constructor=t,e.fn.tab.noConflict=function(){return e.fn.tab=n,this},e(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(t){t.preventDefault(),e(this).tab("show")})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.$element=e(t),this.options=e.extend({},e.fn.typeahead.defaults,n),this.matcher=this.options.matcher||this.matcher,this.sorter=this.options.sorter||this.sorter,this.highlighter=this.options.highlighter||this.highlighter,this.updater=this.options.updater||this.updater,this.source=this.options.source,this.$menu=e(this.options.menu),this.shown=!1,this.listen()};t.prototype={constructor:t,select:function(){var e=this.$menu.find(".active").attr("data-value");return this.$element.val(this.updater(e)).change(),this.hide()},updater:function(e){return e},show:function(){var t=e.extend({},this.$element.position(),{height:this.$element[0].offsetHeight});return this.$menu.insertAfter(this.$element).css({top:t.top+t.height,left:t.left}).show(),this.shown=!0,this},hide:function(){return this.$menu.hide(),this.shown=!1,this},lookup:function(t){var n;return this.query=this.$element.val(),!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(n=e.isFunction(this.source)?this.source(this.query,e.proxy(this.process,this)):this.source,n?this.process(n):this)},process:function(t){var n=this;return t=e.grep(t,function(e){return n.matcher(e)}),t=this.sorter(t),t.length?this.render(t.slice(0,this.options.items)).show():this.shown?this.hide():this},matcher:function(e){return~e.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){var t=[],n=[],r=[],i;while(i=e.shift())i.toLowerCase().indexOf(this.query.toLowerCase())?~i.indexOf(this.query)?n.push(i):r.push(i):t.push(i);return t.concat(n,r)},highlighter:function(e){var t=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return e.replace(new RegExp("("+t+")","ig"),function(e,t){return"<strong>"+t+"</strong>"})},render:function(t){var n=this;return t=e(t).map(function(t,r){return t=e(n.options.item).attr("data-value",r),t.find("a").html(n.highlighter(r)),t[0]}),t.first().addClass("active"),this.$menu.html(t),this},next:function(t){var n=this.$menu.find(".active").removeClass("active"),r=n.next();r.length||(r=e(this.$menu.find("li")[0])),r.addClass("active")},prev:function(e){var t=this.$menu.find(".active").removeClass("active"),n=t.prev();n.length||(n=this.$menu.find("li").last()),n.addClass("active")},listen:function(){this.$element.on("focus",e.proxy(this.focus,this)).on("blur",e.proxy(this.blur,this)).on("keypress",e.proxy(this.keypress,this)).on("keyup",e.proxy(this.keyup,this)),this.eventSupported("keydown")&&this.$element.on("keydown",e.proxy(this.keydown,this)),this.$menu.on("click",e.proxy(this.click,this)).on("mouseenter","li",e.proxy(this.mouseenter,this)).on("mouseleave","li",e.proxy(this.mouseleave,this))},eventSupported:function(e){var t=e in this.$element;return t||(this.$element.setAttribute(e,"return;"),t=typeof this.$element[e]=="function"),t},move:function(e){if(!this.shown)return;switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prev();break;case 40:e.preventDefault(),this.next()}e.stopPropagation()},keydown:function(t){this.suppressKeyPressRepeat=~e.inArray(t.keyCode,[40,38,9,13,27]),this.move(t)},keypress:function(e){if(this.suppressKeyPressRepeat)return;this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}e.stopPropagation(),e.preventDefault()},focus:function(e){this.focused=!0},blur:function(e){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},click:function(e){e.stopPropagation(),e.preventDefault(),this.select(),this.$element.focus()},mouseenter:function(t){this.mousedover=!0,this.$menu.find(".active").removeClass("active"),e(t.currentTarget).addClass("active")},mouseleave:function(e){this.mousedover=!1,!this.focused&&this.shown&&this.hide()}};var n=e.fn.typeahead;e.fn.typeahead=function(n){return this.each(function(){var r=e(this),i=r.data("typeahead"),s=typeof n=="object"&&n;i||r.data("typeahead",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1},e.fn.typeahead.Constructor=t,e.fn.typeahead.noConflict=function(){return e.fn.typeahead=n,this},e(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(t){var n=e(this);if(n.data("typeahead"))return;n.typeahead(n.data())})}(window.jQuery),!function(e){"use strict";var t=function(t,n){this.options=e.extend({},e.fn.affix.defaults,n),this.$window=e(window).on("scroll.affix.data-api",e.proxy(this.checkPosition,this)).on("click.affix.data-api",e.proxy(function(){setTimeout(e.proxy(this.checkPosition,this),1)},this)),this.$element=e(t),this.checkPosition()};t.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var t=e(document).height(),n=this.$window.scrollTop(),r=this.$element.offset(),i=this.options.offset,s=i.bottom,o=i.top,u="affix affix-top affix-bottom",a;typeof i!="object"&&(s=o=i),typeof o=="function"&&(o=i.top()),typeof s=="function"&&(s=i.bottom()),a=this.unpin!=null&&n+this.unpin<=r.top?!1:s!=null&&r.top+this.$element.height()>=t-s?"bottom":o!=null&&n<=o?"top":!1;if(this.affixed===a)return;this.affixed=a,this.unpin=a=="bottom"?r.top-n:null,this.$element.removeClass(u).addClass("affix"+(a?"-"+a:""))};var n=e.fn.affix;e.fn.affix=function(n){return this.each(function(){var r=e(this),i=r.data("affix"),s=typeof n=="object"&&n;i||r.data("affix",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.affix.Constructor=t,e.fn.affix.defaults={offset:0},e.fn.affix.noConflict=function(){return e.fn.affix=n,this},e(window).on("load",function(){e('[data-spy="affix"]').each(function(){var t=e(this),n=t.data();n.offset=n.offset||{},n.offsetBottom&&(n.offset.bottom=n.offsetBottom),n.offsetTop&&(n.offset.top=n.offsetTop),t.affix(n)})})}(window.jQuery);

// Autogenerated by tasks/deploy.js; do not edit!

function Emoji() {
  this.emojis = ["+1","-1","100","1234","8ball","a","ab","abc","abcd","accept","aerial-tramway","airplane","alarm-clock","alien","ambulance","anchor","angel","anger","angry","anguished","ant","apple","aquarius","aries","arrow-backward","arrow-double-down","arrow-double-up","arrow-down-small","arrow-down","arrow-forward","arrow-heading-down","arrow-heading-up","arrow-left","arrow-lower-left","arrow-lower-right","arrow-right-hook","arrow-right","arrow-up-down","arrow-up-small","arrow-up","arrow-upper-left","arrow-upper-right","arrows-clockwise","arrows-counterclockwise","art","articulated-lorry","astonished","atm","b","baby-bottle","baby-chick","baby-symbol","baby","baggage-claim","balloon","ballot-box-with-check","bamboo","banana","bangbang","bank","bar-chart","barber","baseball","basketball","bath","bathtub","battery","bear","beer","beers","beetle","beginner","bell","bento","bicyclist","bike","bikini","bird","birthday","black-circle","black-joker","black-nib","black-square-button","blossom","blowfish","blue-book","blue-car","blue-heart","blush","boar","boat","bomb","bookmark-tabs","bookmark","books","boom","boot","bouquet","bow","bowling","boy","bread","bride-with-veil","bridge-at-night","briefcase","broken-heart","bug","bulb","bullettrain-front","bullettrain-side","bus","busstop","bust-in-silhouette","busts-in-silhouette","cactus","cake","calendar","calling","camel","camera","cancer","candy","capital-abcd","capricorn","car","card-index","carousel-horse","cat","cat2","cd","chart-with-downwards-trend","chart-with-upwards-trend","chart","checkered-flag","cherries","cherry-blossom","chestnut","chicken","children-crossing","chocolate-bar","christmas-tree","church","cinema","circus-tent","city-sunrise","city-sunset","cl","clap","clapper","clipboard","clock1","clock11","clock113","clock12","clock123","clock13","clock2","clock23","clock3","clock33","clock4","clock43","clock5","clock53","clock6","clock63","clock7","clock73","clock8","clock83","clock9","clock93","closed-book","closed-lock-with-key","closed-umbrella","cloud","clubs","cn","cocktail","coffee","cold-sweat","computer","confetti-ball","confounded","confused","congratulations","construction-worker","construction","convenience-store","cookie","cool","cop","copyright","corn","couple-with-heart","couple","couplekiss","cow","cow2","credit-card","crocodile","crossed-flags","crown","cry","crying-cat-face","crystal-ball","cupid","curly-loop","currency-exchange","curry","custard","customs","cyclone","dancer","dancers","dango","dart","dash","date","de","deciduous-tree","department-store","diamond-shape","diamonds","disappointed","dizzy-face","dizzy","do-not-litter","dog","dog2","dollar","dolls","dolphin","door","doughnut","dragon-face","dragon","dress","dromedary-camel","droplet","dvd","e-mail","e50a","ear-of-rice","ear","earth-africa","earth-americas","earth-asia","egg","eggplant","eight-pointed-star","eight-spoked-asterisk","eight","electric-plug","elephant","email","end","es","euro","european-castle","european-post-office","evergreen-tree","exclamation","expressionless","eyeglasses","eyes","factory","fallen-leaf","family","fast-forward","fax","fearful","feet","ferris-wheel","file-folder","fire-engine","fire","fireworks","first-quarter-moon-with-face","first-quarter-moon","fish-cake","fish","fishing-pole-and-fish","fist","five","flags","flashlight","floppy-disk","flower-playing-cards","flushed","foggy","football","fork-and-knife","fountain","four-leaf-clover","four","fr","free","fried-shrimp","fries","frog","frowning","fuelpump","full-moon-with-face","full-moon","game-die","gb","gem","gemini","ghost","gift-heart","gift","girl","globe-with-meridians","goat","golf","grapes","green-apple","green-book","green-heart","grey-exclamation","grey-question","grimacing","grin","grinning","guardsman","guitar","gun","haircut","hamburger","hammer","hamster","hand","handbag","hash","hatched-chick","hatching-chick","headphones","hear-no-evil","heart-decoration","heart-eyes-cat","heart-eyes","heart","heartbeat","heartpulse","hearts","heavy-check-mark","heavy-division-sign","heavy-dollar-sign","heavy-minus-sign","heavy-multiplication-x","heavy-plus-sign","helicopter","herb","hibiscus","high-brightness","high-heel","hocho","honey-pot","honeybee","horse-racing","horse","hospital","hotel","hotsprings","hourglass-flowing-sand","hourglass","house-with-garden","house","hushed","ice-cream","icecream","id","ideograph-advantage","imp","inbox-tray","incoming-envelope","information-desk-person","information-source","innocent","interrobang","iphone","it","jack-o-lantern","japan","japanese-castle","japanese-goblin","japanese-ogre","jeans","joy-cat","joy","jp","key","keycap-ten","kimono","kiss","kissing-cat","kissing-closed-eyes","kissing-heart","kissing-smiling-eyes","kissing","koala","koko","kr","large-blue-circle","large-blue-diamond","large-orange-diamond","last-quarter-moon-with-face","last-quarter-moon","laughing","leaves","ledger","left-luggage","left-right-arrow","leftwards-arrow-with-hook","lemon","leo","leopard","libra","light-rail","link","lips","lipstick","lock-with-ink-pen","lock","lollipop","loop","loudspeaker","love-hotel","love-letter","low-brightness","m","mag-right","mag","mahjong","mailbox-closed","mailbox-with-mail","mailbox-with-no-mail","mailbox","man-with-gua-pi-mao","man-with-turban","man","mans-shoe","maple-leaf","mask","massage","meat-on-bone","mega","melon","memo","mens","metro","microphone","microscope","milky-way","minibus","minidisc","mobile-phone-off","money-with-wings","moneybag","monkey-face","monkey","monorail","moon","mortar-board","mount-fuji","mountain-bicyclist","mountain-cableway","mountain-railway","mouse","mouse2","movie-camera","moyai","muscle","mushroom","musical-keyboard","musical-note","musical-score","mute","nail-care","name-badge","necktie","negative-squared-cross","neutral-face","new-moon-with-face","new-moon","new","newspaper","ng","nine","no-bell","no-bicycles","no-entry-sign","no-entry","no-good","no-mobile-phones","no-mouth","no-pedestrians","no-smoking","non-potable-water","nose","notebook-with-decorative-cover","notebook","notes","nut-and-bolt","o","o2","ocean","octopus","oden","office","ok-hand","ok-woman","ok","older-man","older-woman","on","oncoming-automobile","oncoming-bus","oncoming-police-car","oncoming-taxi","one","open-file-folder","open-hands","open-mouth","ophiuchus","orange-book","outbox-tray","owlbert-books","owlbert-reading","owlbert-thinking","owlbert","ox","page-facing-up","page-with-curl","pager","palm-tree","panda-face","paperclip","parking","part-alternation-mark","partly-sunny","passport-control","paw-prints","peach","pear","pencil2","penguin","pensive","performing-arts","persevere","person-frowning","person-with-blond-hair","person-with-pouting-face","phone","pig-nose","pig","pig2","pill","pineapple","pisces","pizza","point-down","point-left","point-right","point-up-2","point-up","police-car","poodle","poop","post-office","postal-horn","postbox","potable-water","pouch","poultry-leg","pound","pouting-cat","pray","princess","punch","purple-heart","purse","pushpin","put-litter-in-its-place","question","rabbit","rabbit2","racehorse","radio-button","radio","rage","railway-car","rainbow","raised-hand","raised-hands","ram","ramen","rat","recycle","red-circle","registered","relaxed","relieved","repeat-one","repeat","restroom","revolving-hearts","rewind","ribbon","rice-ball","rice-cracker","rice-scene","rice","ring","rocket","roller-coaster","rooster","rose","rotating-light","round-pushpin","rowboat","ru","rugby-football","runner","running-shirt-with-sash","sa","sagittarius","sake","sandal","santa","satellite","satisfied","saxophone","school-satchel","school","scissors","scorpius","scream-cat","scream","scroll","seat","secret","see-no-evil","seedling","seven","shaved-ice","sheep","shell","ship","shirt","shower","signal-strength","six-pointed-star","six","ski","skull","sleeping","sleepy","slot-machine","small-blue-diamond","small-orange-diamond","small-red-triangle-down","small-red-triangle","smile-cat","smile","smiley-cat","smiley","smiling-imp","smirk-cat","smirk","smoking","snail","snake","snowboarder","snowflake","snowman","sob","soccer","soon","sos","sound","space-invader","spades","spaghetti","sparkler","sparkles","sparkling-heart","speak-no-evil","speaker","speech-balloon","speedboat","star","star2","stars","station","statue-of-liberty","steam-locomotive","stew","straight-ruler","strawberry","stuck-out-tongue-closed-eyes","stuck-out-tongue-winking-eye","stuck-out-tongue","sun-with-face","sunflower","sunglasses","sunny","sunrise-over-mountains","sunrise","surfer","sushi","suspension-railway","sweat-drops","sweat-smile","sweat","sweet-potato","swimmer","symbols","syringe","tada","tanabata-tree","tangerine","taurus","taxi","tea","telephone-receiver","telescope","tennis","tent","thought-balloon","three","thumbsdown","thumbsup","ticket","tiger","tiger2","tired-face","tm","toilet","tokyo-tower","tomato","tongue","top","tophat","tractor","traffic-light","train2","tram","triangular-flag-on-post","triangular-ruler","trident","triumph","trolleybus","trophy","tropical-drink","tropical-fish","truck","trumpet","tulip","turtle","tv","twisted-rightwards-arrows","two-hearts","two-men-holding-hands","two-women-holding-hands","two","u5272","u54","u55b6","u63","u67","u6e8","u7121","u7533","u7981","u7a7a","umbrella","unamused","underage","unlock","up","us","v","vertical-traffic-light","vhs","vibration-mode","video-camera","video-game","violin","virgo","volcano","vs","walking","waning-crescent-moon","waning-gibbous-moon","warning","watch","water-buffalo","watermelon","wave","wavy-dash","waxing-crescent-moon","waxing-gibbous-moon","wc","weary","wedding","whale","whale2","wheelchair","white-check-mark","white-circle","white-flower","white-square-button","wind-chime","wine-glass","wink","wolf","woman","womans-clothes","womans-hat","womens","worried","wrench","x","yellow-heart","yen","yum","zap","zero","zzz"];
  this.is = function(emoji) {
    return this.emojis.indexOf(emoji) >= 0;
  }
};
if(typeof exports !== "undefined") {exports.emoji = Emoji;}
if(typeof filepicker != 'undefined')
  filepicker.setKey('AINx3Px6wQsi3DiI4lSOHz');

$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function resizeWindow() {
  if($(window).width() <= 758) {
    $('#hero, #hero .inside').outerHeight('auto');
    return;
  }

  var min_height = 890;
  var bottom_spacing = 120;
  if($(window).width() < 1500) {
    min_height = min_height - 160;
    bottom_spacing = 60;
  }

  var height = $(window).height();
  if(height < min_height) height = min_height;
  if(height > 860) height = 860;

  $('#hero, #hero .inside').outerHeight(height - bottom_spacing);

  $('#plans-free .plan-details').height($('#plans-company .plan-details').height())
}
resizeWindow();

$(window).resize(_.debounce(resizeWindow, 500));

$(function() {
  setTimeout(function() {
    var i = 0;
    var interval = setInterval(function() {
      $('#main .b-logo').css('background-position', '0 ' + (i * -35) + 'px');
      i++;

      if(i >= 26) {
        clearInterval(interval);
        return false;
      }
    },40);
  }, 2000);
  setTimeout(function() {
    $('#main, #left, #right').addClass('on');
  }, 400);
  setTimeout(function() {
    $('#main, #left, #right').addClass('done');
  }, 2500);

  if(window.location.hash.indexOf('scroll') > 0) {
    var $el = $(window.location.hash.replace(/scroll-/, ''));
    window.location.hash = "";
    $('html, body').animate({'scrollTop': $el.offset().top - $('header').outerHeight()}, 'slow');
  }

  $('.scroll').click(function(e) {
    if(!$('#home').length) return;

    e.preventDefault();
    var $el = $($(this).attr('href').replace(/\//, '').replace(/scroll-/,''));
    if(!$el.length) $el = $('body');

    $('html, body').animate({'scrollTop': $el.offset().top - $('header').outerHeight()}, 'slow');
  });


  /* Signup Form */
  var file = false;
  $('.fileupload').click(function(e) {
    e.preventDefault();

    $('.owl-signup').removeClass('step1 step2 step3');
    $('.owl-signup').addClass('step'+$(this).data('step'));

    $('.fileupload').text("Uploading...");
    var $form = $(this).closest('form');
    $('[type=submit]').attr('disabled', true);
    getUpload(uploaded);
  });
  var uploaded = function(_file) {
    file = _file;
    $('[type=submit]').attr('disabled', false);
    $('.fileupload').text("Upload Logo");
    $('.fu-remove').hide();
    if(file) {
      $('.fileupload').css('background-image', 'url('+file[0]+')').removeClass('button').addClass('img');
    }
  }

  $('.sample_logo').click(function(e) {
    e.preventDefault();
    uploaded(["https://www.filepicker.io/api/file/t2CXg8q9Q6qwFV6i11re", "sample-logo.png", "291", "80", "#5ea43f", "https://www.filepicker.io/api/file/OY6HMNAmQuaXQmjyPaXO"]);
  });

  $('#login #password').focus(function() {
    $('#owl-login').addClass('password');
  }).blur(function() {
    $('#owl-login').removeClass('password');
  });

  $('#signup-main input, #signup-project input, #signup-project .fileupload').focus(function() {
    if($(this).data('step')) {
      $('.owl-signup').removeClass('step1 step2 step3');
      $('.owl-signup').addClass('step'+$(this).data('step'));
    }
  });
    
  $('#signup-project').hide(); // Hide it at first to prevent tabbing to it
  $('#signup-main').submit(function(e) {
    e.preventDefault();

    var $form = $(this);
    $('.error', $form).remove();

    $('[type=submit]', $form).attr('disabled', true).html('Signing up&hellip;');

    $.post($(this).attr('action'), $(this).serialize(), function(data) {

      if(window.location.href.match(/invite/)) {
        // Invited people don't create new projects
        window.location = '/';
        return;
      }

      $('#signup-project').show(); // It was hidden to prevent tabbing to it
      setTimeout(function() {
        $('#form-parent').addClass('next');
        setTimeout(function() {
          $('#project-name').focus();
        }, 600);
      }, 300);

    }).fail(function(data) {
      $('[type=submit]', $form).attr('disabled', false).text("Sign Up");
      addErrors(data, $form);
      updateHeight();
    });
  });

  function addErrors(data, $form) {
    var data = JSON.parse(data.responseText);
    $.each(data.errors, function(k,v) {
      if(k == 'hashed_password') k = 'password';
      var $error = $('<div>', {'class': 'error', text: v});
      var $el = $('[name='+k.replace(/\./, '_')+']', $form);
      if($el.parent().hasClass('input-group')) {
        $el = $el.parent();
      }
      $el.after($error);
    });
  }

  var subdomain = {
    changed : false,
    value : '',
  };

  $('#project-subdomain').keyup(function() {
    subdomain.changed = subdomain.changed || subdomain.value != $(this).val();
  });

  $('#project-name').keyup(function() {
    if(subdomain.changed) return;
    var sd = $(this).val();
    sd = sd.replace(/\s+/g, '-');
    sd = sd.replace(/[^a-zA-Z0-9_-]/g, '');
    sd = sd.toLowerCase();
    $('#project-subdomain').val(sd);
    subdomain.value = sd;
  });


  $('#signup-project').submit(function(e) {
    e.preventDefault();
    var $form = $(this);

    $('.error', $form).remove();

    var submit_data = $(this).serializeObject();
    submit_data.appearance = {
      logo : file,
    };

    $('[type=submit]', $form).attr('disabled', true).html('Creating&hellip;');

    $.post($(this).attr('action'), submit_data, function(data) {
      ga('send', 'event', 'create', 'click', 'signup');
      window.location = '/project/'+submit_data.subdomain+'/v1.0/dashboard';
    }).fail(function(data) {
      $('[type=submit]', $form).attr('disabled', false).html('Create Project');
      addErrors(data, $form);
    });

  });

  $(window).resize(function() {
    updateHeight();
  }).trigger('resize');

  var old_height = 0;
  function updateHeight() {
    var height = $('#signup-main .pad').outerHeight();
    if(height != old_height) {
      $('#signup-main .pad, #signup-project .pad').css('min-height', height);
      old_height = height;
    }
  }
  updateHeight();


  $('#faq a.title').click(function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active', !$(this).parent().hasClass('active'));
    $(this).next('.answer').slideToggle();
  });
});

function getUpload(cb) {
  var file = [];
  filepicker.pickAndStore({multiple: false, mimetype:"image/*"}, {location: "S3"}, function(InkBlob){
    filepicker.convert(InkBlob[0], {height: 80}, function(InkBlobResized) {
      filepicker.stat(InkBlob[0], {width: true, height: true}, function(metadata) {
        file = [InkBlobResized.url, InkBlob[0].filename, metadata.width, metadata.height, '', InkBlob[0].url];

        if(file.length) {
          var colorThief = new ColorThief();
          var image = new Image();
          image.crossOrigin = "anonymous";
          image.src = file[0];

          image.onload=function(){
            try {
              var c = colorThief.getColor(image);
            } catch(e) {
              var c = [255,255,255];
            }

            file[4] = tinycolor({r: c[0], g: c[1], b: c[2]}).toHexString();

            cb(file);
          };
        } else {
          cb(false);
        }
      });
    });
  }, function() { cb(false) });
}

function getDocHeight() {
  var D = document;
  return Math.max(
    D.body.scrollHeight, D.documentElement.scrollHeight,
    D.body.offsetHeight, D.documentElement.offsetHeight,
    D.body.clientHeight, D.documentElement.clientHeight
  );
}

(function() {
  var $b = $('body');
  var $w = $(window);
  var priced = false;
  var $sd = $('.scrolldown');
  var is = {
    top: undefined,
  };
  $(window).scroll(function() {
    var st = $w.scrollTop();

    var is_top = (st <= 14);
    if(is_top != is.top) {
      $b.toggleClass('scrolled', !is_top);
      is.top = is_top;
    }

  }).trigger('scroll');


  $('#example-nav a').click(function (e) {
    e.preventDefault();
    var i = $(this).attr('data-id');
    $('#example-nav a').removeClass('active');
    $(this).addClass('active');
    $('#examples').attr('class', 'show-example-' + i);
  });
})();

var CSRF_HEADER = 'X-CSRF-Token';
var setCSRFToken = function(securityToken) {
  jQuery.ajaxPrefilter(function(options, _, xhr) {
    if ( !xhr.crossDomain ) 
        xhr.setRequestHeader(CSRF_HEADER, securityToken);
  });
};
setCSRFToken($('meta[name="csrf-token"]').attr('content'));

/*
$(window).load(function() {
  $('body').removeClass('unloaded');
});
*/

$(function() {
  function spinner($el) {
    var words = [];

    var $lis = $('li', $el);
    $lis.each(function() {
      words.push($(this).text());    
    });
    $lis.remove();

    var $ss = $('#spinner-show');

    var i = 0, i_next = 1;

    $('.next em', $ss).text(words[i_next]);

    setInterval(function() {
      $ss.width($('.current').width());
      $ss.addClass('swap');
      i = i_next;
      i_next++;
      if(i_next >= words.length) i_next = 0;
      $ss.width($('.next em').width());
      setTimeout(function() {
        $('.next em', $ss).text(words[i_next]);
        $('.current', $ss).text(words[i]);
        $ss.removeClass('swap');
      console.log('swap!');
      }, 600);
    }, 3800);
  }

  if($('#spinner').length) {
    spinner($('#spinner'));
  }
});


// Tag inbound users!
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    var baseDomain = "." + window.location.hostname + (window.location.hostname.match(/local/) ? ":3000" : ""); 
    document.cookie = cname + "=" + cvalue + "; " + expires + "; domain=" + baseDomain + "; path=/";
}

var src = window.location.search.match(/src=([-_\w]*)/);

// Product Hunt
if(window.location.pathname.replace(/[^\w]/g, '') == 'ph') {
  src = [false, 'ph'];
}

if(src) {
  setCookie('ad_src', src[1], 30);
  if(src[1] == 'ph') {
    $('body').addClass('ph-exclusive')
  }
}

$(function () {
  $('[data-toggle="popover"]').popover()
})

$('body').on('click', function (e) {
    //did not click a popover toggle or popover
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('.popover.in').length === 0) { 
        $('[data-toggle="popover"]').popover('hide');
    }
});

if($('#blog').length) {
  var $s = $('.sticky');
  var $w = $(window);
  var statusOld;
  $(window).scroll(function() {
    var st = $w.scrollTop();
    var top = $s.parent().offset().top - 10;
    var statusNew = top < st;

    if(statusOld != statusNew) {
      $('.advert-sidebar',$s).css('width', statusNew ? $s.width() : "");
      $s.toggleClass('stuck', statusNew);
    }
  }).trigger('scroll');

  var i = -4;
  setInterval(function() {
  $('.line' + i).show();
  i++;
  if(i >= 18) {
    i = 0;
    $('.line').fadeOut();
  }
  }, 600);
}

if($('#readme-careers-header').length) {
  var t = [
    'documentation',
    'documentatio',
    'documentati',
    'documentat',
    'documenta',
    'document',
    'documen',
    'docume',
    'docum',
    'docu',
    'doc',
    'do',
    'd',
    'de',
    'dev',
    'deve',
    'devel',
    'develo',
    'develop',
    'develope',
    'developer',
    'developer e',
    'developer ex',
    'developer exp',
    'developer expe',
    'developer exper',
    'developer experi',
    'developer experie',
    'developer experien',
    'developer experienc',
    'developer experience',
    'developer experiences',
  ];
  setInterval(function() { $('.slideIn').eq(0).removeClass('off'); }, 500);
  setInterval(function() { $('.slideIn').eq(1).removeClass('off'); }, 700);
  setInterval(function() { $('.slideIn').eq(2).removeClass('off'); }, 900);
  setInterval(function() { $('.slideIn').eq(3).removeClass('off'); }, 1100);

  setTimeout(function() {
    var i = 0;
    var type = setInterval(function() {
      $('#readme-careers-header strong span').text(t[i]);
      if(t.length-1 > i) {
        i++;
      } else {
        $('#readme-careers-header em').hide();
        clearInterval(type);
      }
    }, 65);
    $('.waiting').removeClass('waiting');
  }, 2300);

  (function() {
    var $sparkle = $('#readme-careers-header .magical-overlay');
    $sparkle.css("position","absolute");

    var settings = {
      width: $sparkle.outerWidth(),
      height: $sparkle.outerHeight(),
      color: "#FFFFFF",
      count: 20,
      overlap: 0,
      speed: 1
    };

    var sparkle = new Sparkle( $sparkle, settings );

    $('#readme-careers-header .magical').on({
      "mouseover focus" : function(e) {
        sparkle.over();
      },
      "mouseout blur" : function(e) {
        sparkle.out();
      }
    });
    setTimeout(function() { sparkle.over() }, 4500);
    setTimeout(function() { sparkle.out() }, 4600);

  })();

  $('.readme-careers-nav a').on('click', function() {
    $('.readme-careers-nav a, .job').removeClass('active');
    $(this).addClass('active');
    $($(this).attr('href')).parent().addClass('active');
    window.location.hash = $(this).attr('href');
    return false;
  });

  if(window.location.hash.substr(0, 4) == "#job") {
    $('a[href=' + window.location.hash + ']').click();
    setTimeout(function() {
      $('html, body').animate({
        scrollTop: $(window.location.hash).offset().top,
      }, 'slow');
    }, 200);
  }
}

$(function() {
  setTimeout(function() {
    $('.brandmark').addClass('on');
  }, 1000);
});

$(function() {
  // List emojis
  var $el = $('#emoji-list');
  if(!$el.length) return;
  //console.log((new Emoji).emojis);
  _.each((new Emoji).emojis, function(emoji) {
    $('#emoji-list').append($('<div class="emoji"><img src="https://dash.readme.io/img/emojis/'+emoji+'.png"> :' + emoji + ':</div>', {text: emoji}));
  });
});
