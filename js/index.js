$(document).ready(function () {

    var pics = [1,2,3,4,5,6,7,8];
    var numPar = 2;

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    var newPics = shuffle(pics);

    for (var i = 1; i < numPar + 1; i++) {
        $("#par" + i).parallax({imageSrc:  "images/slide/"+ newPics[i - 1] +".jpg"});
    }

    $('.js-navbar-link').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - $("#mainnav").height()
        }, 500, 'swing', function () {

        });
    });

    $(".hamburger").on("click",function(){
        toggleOverlay();
    });

    $('a.overlayLink').click(function () {
        toggleOverlay();
    });

    var opacity;

    function updateScroll() {

        var newOpacity;
        var dist = $("#about").offset().top - $(window).scrollTop();

        if (dist > 0) {
            newOpacity = 1 * (1 - dist / $("#about").offset().top);
        }
        else {
            newOpacity = 1;
        }

        if (newOpacity != opacity) {
            opacity = newOpacity;
            $("#mainnav").css("background", "rgba(10, 25, 57, " + newOpacity + ")");
        }

    }

    var throttled = _.throttle(updateScroll, 50);

    $(window).resize(throttled);
    $(window).scroll(throttled);
    updateScroll();

    var bgresize = function () {

        var windowz = $(window);
        $(".slide").css("height", (windowz.height() - $("#mainnav").height()) + "px");
        $("#header").css("height", Math.max(windowz.height(), 500) + "px");

        $(".right-nav").css("margin-right", $("#mlh-trust-badge-cover").width() + 5 + "px");

        if ($(window).width() <= 767) {
            $("#smallcaption").removeClass("hidden");
            $("#bigcaption").addClass("hidden");
            $("#accordion").removeClass("hidden");
            $("#full-faq").addClass("hidden");
            $("#navham").removeClass("hidden");
            $("#outer-social").removeClass("hidden");
            $("#navleft").hide();
            $("#navright").hide();
        } else {
            $("#smallcaption").addClass("hidden");
            $("#bigcaption").removeClass("hidden");
            $("#accordion").addClass("hidden");
            $("#full-faq").removeClass("hidden");
            $("#navham").addClass("hidden");
            $("#outer-social").addClass("hidden");
            $("#navleft").show();
            $("#navright").show();
        }
    }

    bgresize();
    $(window).resize(bgresize);
    $(window).on("orientationchange", bgresize);

});

function toggleOverlay() {
    $("#navham").toggleClass("is-active");
    if($("#navham").hasClass("is-active")){
        $(".overlay").css({visibility: "visible"});
        $("html").css({"overflow-y": "hidden"});
    } else{
        $(".overlay").css({visibility: "hidden"});
        $("html").css({"overflow-y": "visible"});
    }
}
