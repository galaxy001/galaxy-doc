$(function(){
	var mirio=$("#character_mirio");
	var mirio_top=mirio.position().top;
	
	$(window).scroll(function(){

		var top=$(window).scrollTop();
		
		if(top>mirio_top){
			
			mirio.animate({
				top:top,
			},{
				duration:500,
				queue: false
			});
		
		}else{
			mirio.animate({
				top:mirio_top,
			},{
				duration:500,
				queue: false
			});

		}
		
	})
})