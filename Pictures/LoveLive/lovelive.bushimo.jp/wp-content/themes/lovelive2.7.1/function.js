//イベント
$(function(){
var $tabs = $('li');
var $contents = $('.fest-detail');

    // タブボタンのナンバリング
    $('.fest-detailLink li').each(function(i){
    $(this).addClass('btn' + (i+1));
    });
    $('.fest-detailLinkFoot li').each(function(i){
    $(this).addClass('btn' + (i+1));
    });

    // コンテンツのナンバリング
    $('.fest-detail').each(function(i){
    $(this).attr('id','content' + (i+1));
    });

function changeTab(tabId) {
  var $currentPage = $contents.filter(':visible');
  var $targetPage = $contents.filter('#content' + tabId);
  
  // コンテンツの切り替え（ここにアニメーションをいれる）
  $currentPage.fadeOut();
  $targetPage.fadeIn();

  // カレントのタブ変更  
   $tabs.removeClass('current');
   $tabs.filter('.btn' + tabId).addClass('current');
}

$tabs.each(function(){
      $(this).click(function() {
        if($(this).hasClass('current')) return false;
        changeTab($(this).attr('class').slice(3));
      });
  });
});
