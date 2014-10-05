var webUrl = "http://www.microsoft.com/taiwan/silverlight/FanClub2014/"

$(function () {
    $('Social a').children().eq(0).click(function () {
        share(0);
    });
    $('Social a').children().eq(1).click(function () {
        share(1);
    });
    $('Social a').children().eq(2).click(function () {
        share(2);
    });
})

var share = function (n) {
    var shareSite = "";
    var url;

    switch (n) {
        case 0:
            shareSite = "https://www.facebook.com/sharer/sharer.php?t=loading&u=";
            url = shareSite + webUrl;
            break;
        case 1:
            shareSite = "https://twitter.com/intent/tweet?original_referer=";
            url = shareSite + encodeURIComponent(webUrl) + "&text=" + encodeURI("2014相聚時刻 – 藍澤光後援會(Hikaru fan party)相逢自是有緣, 今天我們能相識是上天給小光最寶貴的禮物, 在這個特別的相聚時刻裡, 小光希望能夠跟你們留下滿滿的回憶") + "&tw_p=tweetbutton&url=" + encodeURIComponent(webUrl);
            break;
        case 2:
                shareSite = " http://www.plurk.com/?qualifier=shares&status=";
                url = shareSite + webUrl + "(2014相聚時刻 – 藍澤光後援會(Hikaru fan party)相逢自是有緣, 今天我們能相識是上天給小光最寶貴的禮物, 在這個特別的相聚時刻裡, 小光希望能夠跟你們留下滿滿的回憶)";
            break;
    }

        window.open(url);
}