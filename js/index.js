window.onload = function () {
    TIME();
    BANNERIMG();
    TOP();
};

// 顶部搜索背景变色
function TOP() {
    var jd_search = document.querySelector('.jd_search');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var offsetTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (offsetTop < height) {
            var opacity = offsetTop / height;
            jd_search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
        };
    };
};

// 秒杀倒计时
function TIME() { 
    var spans = document.querySelectorAll('.jd_sk_time>span');
    var time = 3700;
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

// 轮播图代码
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
    var TIMEID;
    BANNERIMG();
    function BANNERIMG() {
        TIMEID = setInterval(function () {
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
        }, 2000);
    };
    

    var stsrtX, moveX, distanceX;
    var isEnd = true;
    bannerImg.addEventListener('touchstart', function (e) {
        clearInterval(TIMEID);
        startX = e.targetTouches[0].clientX;
    });

    bannerImg.addEventListener('touchmove', function (e) {
        if (isEnd) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            this.style.transition = "";
            this.style.left = (-index * banner.offsetWidth + distanceX) + "px";
        }
    });

    bannerImg.addEventListener('touchend', function () {
        isEnd = false;
        if (Math.abs(distanceX) > 100) {
            if (distanceX > 0) {
                index--;
            } else {
                index++;
            }
            this.style.transition = "left 0.5s ease-in-out";
            this.style.left = -index * banner.offsetWidth + "px";
        } else if (Math.abs(distanceX) > 0) { 
            this.style.transition = "left 0.5s ease-in-out";
            this.style.left = -index * banner.offsetWidth + "px";
        }
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });

    bannerImg.addEventListener('webkitTransitionEnd', function () {
        if (index == lis.length - 1) {
            index = 1;
            this.style.transition = "none";
            this.style.left = -index * banner.offsetWidth + "px";
        } else if (index == 0) {
            index = lis.length - 2;
            this.style.transition = "none";
            this.style.left = -index * banner.offsetWidth + "px";
        };
        setIndicator(index);

        setTimeout(function () {
            isEnd = true;
            clearInterval(TIMEID);
            BANNERIMG();
        }, 100);
    })
};

function setIndicator(index) {
    var indicators = document.querySelectorAll('.jd_page>li');
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("active");
    }
    indicators[index - 1].classList.add("active");
};