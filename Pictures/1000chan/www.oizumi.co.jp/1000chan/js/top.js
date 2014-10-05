$(function(){
	$m1=$('#top_chara');
	$m2=$('#top_chara_white');
	$m3=$('#top_txt1');
	$m4=$('#top_txt2');
	
	$m1.css({opacity:0});
	$m2.css({opacity:0});
	$m3.css({opacity:0});
	$m4.css({opacity:0});

})

$(window).load(function(){
	$m3.posi=$m3.position();
	$m4.posi=$m4.position();
	
	$m3.css({
		left:$m3.posi.left-200,
		top:$m3.posi.top+10
	})
	$m4.css({
		left:$m4.posi.left-150,
		top:$m4.posi.top-5
	})
	
	tame=500;
	
	setTimeout(function(){
		$m2.animate({
			opacity:0.9
		},300);
	},tame)
	setTimeout(function(){
		$m2.animate({
			opacity:0
		},500);
	},tame+500)
	setTimeout(function(){
		$m1.animate({
			opacity:1
		},500);
	},tame+500)

	setTimeout(function(){
		$m3.animate({
			opacity:1,
			left:$m3.posi.left,
			top:$m3.posi.top
		},1000,'easeInOutElastic');
	},tame+1000)
	
	setTimeout(function(){
		$m4.animate({
			opacity:1,
			left:$m4.posi.left,
			top:$m4.posi.top
		},1000,'easeInOutElastic');
	},tame+1500)
	
	
})