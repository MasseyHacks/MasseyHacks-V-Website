document.addEventListener("DOMContentLoaded", function(){
    $('.js-navbar-link').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - $("#mainnav").height()
        }, 500, 'swing', function () {
            //window.location.hash = target;
        });
    });
});

$(document).ready(function () {

    toggleHamburger();
    $(".hamburger").on("click",function(){
        toggleOverlay();
    });

    $('a.overlayLink').click(function () {
        toggleOverlay();
    });

    $('a.scrollLink').click(function () {
        var href = $(this).attr('href');
        var anchor = $(href).offset();
        $('body').animate({scrollTop: anchor.top - 50});
        return false;
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
        } else {
            $("#smallcaption").addClass("hidden");
            $("#bigcaption").removeClass("hidden");
            $("#accordion").addClass("hidden");
            $("#full-faq").removeClass("hidden");
        }
    }

    bgresize();
    $(window).resize(bgresize);
    $(window).on("orientationchange", bgresize);

});


$(window).resize(function(){
    toggleHamburger();
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

function toggleHamburger(){
    //toggles hamburger based on window width
    if($(window).width() <= 767){
        $("#navham").removeClass("hidden");
        $("#outer-social").removeClass("hidden");
        $("#navleft").hide();
        $("#navright").hide();
    } else{
        $("#navham").addClass("hidden");
        $("#outer-social").addClass("hidden");
        $("#navleft").show();
        $("#navright").show();
    }
}
