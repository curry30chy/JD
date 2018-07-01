window.onload = function () {
    TIME();
    BANNERIMG();
    TOP();
};

function TOP() {
    var jd_search = document.querySelector('.jd_search');
    var jd_banner = document.querySelector('.jd_banner');
    var height = jd_banner.offsetHeight;
    window.onscroll = function () {
        var offsetTop = document.documentElement.scrollTop;
        if (offsetTop < height) {
            var opacity = offsetTop / height;
            jd_search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
        };
    };
};


function TIME() {
    var spans = document.querySelectorAll('.jd_sk_time>span');
    var time = 10;
    var timeId = setInterval(function () {
        time--;
        if (time < 0) {
            clearInterval(timeId);
            return;
        };
        var hour = Math.floor(time / 3600);
        var minent = Math.floor(time % 3600 / 60);
        var sencend = Math.floor(time % 60);

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(minent / 10);
        spans[4].innerHTML = Math.floor(minent % 10);
        spans[6].innerHTML = Math.floor(sencend / 10);
        spans[7].innerHTML = Math.floor(sencend % 10);    
    },1000)
};


function BANNERIMG() {
    var banner = document.querySelector('.jd_banner');
    var bannerImg = document.querySelector('.jd_bannerImg');
    var first = document.querySelector('.jd_bannerImg>li:first-child').cloneNode(true);
    var last = document.querySelector('.jd_bannerImg>li:last-child').cloneNode(true);

    bannerImg.insertBefore(last, bannerImg.firstChild);
    bannerImg.appendChild(first);

    var lis = document.querySelectorAll('.jd_bannerImg>li');
    
    bannerImg.style.width = lis.length * banner.offsetWidth + "px";
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = banner.offsetWidth + "px";
    };
    bannerImg.style.left = -banner.offsetWidth + "px";
    
    window.onresize = function () {
        var lis = document.querySelectorAll('.jd_bannerImg>li');

        bannerImg.style.width = lis.length * banner.offsetWidth + "px";
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.width = banner.offsetWidth + "px";
        };
        bannerImg.style.left = -banner.offsetWidth + "px";
    };

    var index = 1;
    var BANNERIMG = setInterval(function () {
        index++;
        bannerImg.style.transition = "left 0.5s ease-in-out";
        bannerImg.style.left = -(index * banner.offsetWidth) + "px";
        
        setTimeout(() => {
            if (index == lis.length - 1) {
                index = 1;
                bannerImg.style.transition = "none";
                bannerImg.style.left = -(index * banner.offsetWidth) + "px";
            }
        }, 500);
    },2000) 
}

function SHOUDONG() {
    
}