var submenu_slidedown = false;

$(function(){
	$("ul#menu > li").click(function(){
		if (!submenu_slidedown){
			$(this).children(".sub_menu_bg").slideDown();
			submenu_slidedown = true;
			return false;
		}else{
			if ($(this).children(".sub_menu_bg").css("display")=="none"){
				$("ul#menu > li > .sub_menu_bg").slideUp();
				$(this).children(".sub_menu_bg").slideDown();
				submenu_slidedown = true;
				return false;
			}
		}
	});
	$("body").click(function(){
		$("ul#menu > li > .sub_menu_bg").slideUp();
		submenu_slidedown = false;
	});
});