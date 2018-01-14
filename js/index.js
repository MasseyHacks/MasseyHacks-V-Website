$(document).ready(function () {

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
