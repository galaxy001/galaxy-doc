(function($){
	//parallax and stamp
	var $stampBox = $('#stampList');
	var skr = null;
	var stamp_offset = [];
	
	var skrInit = function(){
		skr = skrollr.init({render: skrScroll});
	};
	
	var skrScroll = function(){
		for(var key in stamp_offset) {
			if(skr.getScrollTop() + $(window).height() > parseInt(key)) {
				for(var i in stamp_offset[key]) {
					stamp_offset[key][i].animate({'opacity': 1}, 1000);
				}
				delete stamp_offset[key];
			}
		}
	};
	
	$stampBox.find('img').each(function(){
		var image_url = $(this).data('tw-text');
		$(this).on('click', function(){
			window.open('https://twitter.com/intent/tweet?text=' + image_url + "&source=webclient");
		});
	});
	
	$(window).on('load', function(){
		
		skr === null ? skrInit() : skr.refresh();
		
		$stampBox.find('li').each(function(){
			var top = parseInt($(this).css('opacity', 1).offset().top);
			stamp_offset[top] = stamp_offset[top] || [];
			stamp_offset[top].push($(this));
			$(this).removeAttr('style');
		});
		
		$(this).on('resize scroll', skrScroll).trigger('scroll');
	});
	
	//fade
	$('.box-charactor').fadeIn(2000);
	
	//slider
	$('.box-slider').each(function(){
		new Swiper($(this).find('.swiper-container'), {
			slideToClickedSlide: true,
			nextButton: $(this).find('.slider-right'),
			prevButton: $(this).find('.slider-left'),
			loop: true,
			spaceBetween: 19,
			slidesPerView: 'auto'
		});
	});
	
	//voice
	var playing_flag = 0;
	var audio = $('#voice').get(0);
	
	var voicePlay = function(){
		if(playing_flag) {
			audio.pause();
			playing_flag = false;
		} else {
			audio.play();
			playing_flag = true;
		}
	};
	
	try {
		audio.load();
		
		audio.addEventListener("ended", function() {
			audio.currentTime = 0;
			playing_flag = false;
		}, false);
		
		$('#play').on('click', voicePlay);
		$('#playSP').on('touchstart', voicePlay);
	
	} catch(e) {
		$('#play, #playSP').remove();
	}
	
	//wallpaper
	var $wpSubmit = $('#wallpaperSubmit');
	var $wpPull = $('#wallpaperPullDown');
	var $wpDesignSelect = $('#wallpaperSelectDesign').find('.s_design');
	var $wpDesignInput = $('#wallpaperDesign');
	var wp_design_flag = false;
	
	var $wpSizeBox = $('#wallpaperSelectSize');
	var $wpSizeSelect = $wpSizeBox.find('.s_size');
	var $wpSizeInput = $('#wallpaperSize');
	var wp_size_flag = false;
	
	var wp_check = function(){
		if(wp_design_flag && wp_size_flag) {
			$wpSubmit.addClass('active').removeAttr('disabled');
		}
	};
	
	$wpDesignSelect.each(function(){
		var select = $(this).data('wallpaper-design');
		$(this).on('click', function(){
			$wpDesignSelect.removeClass('select');
			$(this).addClass('select');
			$wpDesignInput.val(select);
			wp_design_flag = true;
			wp_check();
		});
	});
	
	$wpSizeSelect.each(function(){
		var select = $(this).data('wallpaper-size');
		$(this).on('click', function(){
			$wpSizeSelect.removeClass('select');
			$(this).addClass('select');
			$wpSizeInput.val(select);
			wp_size_flag = true;
			wp_check();
		});
		
		$(this).on('touchstart', function(){
			$wpSizeBox.removeClass('open');
			var text = $(this).text();
			$wpPull.text(text);
		});
	});
	
	$wpPull.on('touchstart', function(){
		if($wpSizeBox.hasClass('open')) {
			$wpSizeBox.slideUp(200, function(){
				$wpSizeBox.removeAttr('style').removeClass('open');
			});
		} else {
			$wpSizeBox.slideDown(200, function(){
				$wpSizeBox.removeAttr('style').addClass('open');
			});
		}
	});
	
	//guideline
	$('#guidelineList').find('dt').each(function(){
		var $dt = $(this);
		var $dd = $(this).next('dd');
		$dt.on('touchstart', function(){
			if($dd.hasClass('open')) {
				$dd.slideUp(200, function(){
					$dd.removeAttr('style').removeClass('open');
				});
			} else {
				$dd.slideDown(200, function(){
					$dd.removeAttr('style').addClass('open');
				});
			}
		});
	});
})(jQuery);