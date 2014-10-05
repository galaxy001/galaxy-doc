function nav_change(index){
	$img=$('.nav li').eq(index).find('img');
	src=$img.attr("src").replace('_off.','_on.');
	$img.attr("src",src);
}