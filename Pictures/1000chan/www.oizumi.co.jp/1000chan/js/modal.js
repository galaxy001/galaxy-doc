$(window).load(function(){

	$('<div id="modal_cover"></div>').appendTo($('body')).height($(document).height()).width("100%").click(function(){
		modal_hide();
	});
	
	$('<div id="modal_box"></div>').appendTo($('body'));
	
	$('<div id="modal_close"></div>').appendTo($('#modal_box')).click(function(){
		modal_hide();
	});
	
	$('.modal_btn').each(function() {
		$(this).click(function(){
			modal_show($(this).attr('youtubeCode'));
		}).hover(function(){
			$(this).css({opacity:0.7})
		},function(){
			$(this).css({opacity:1})
		})
	});
	
	function modal_show(code){
		$('<iframe id="modal_movie" width="853" height="480" src="//www.youtube.com/embed/'+code+'?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>').appendTo('#modal_box');
		$('#modal_cover').show();
		$('#modal_box').show();
	}
	
	function modal_hide(){
		$('#modal_movie').remove();
		$('#modal_cover').hide();
		$('#modal_box').hide();
	}

	$(window).resize(function(){
		$('#modal_cover').height($(document).height());
	});	
	
})

	