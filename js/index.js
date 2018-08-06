$(document).ready(function () {

    $('.js-navbar-link').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - $("#nav-main").height()
        }, 500, 'swing', function () {

        });
    });

    $('#year').html(new Date().getFullYear());

    $(".hamburger").on("click",function(){
        toggleOverlay();
    });

    $('a.overlayLink').click(function () {
        toggleOverlay();
    });

    var bgresize = function () {

        var windowz = $(window);
        //$(".slide").css("height", (windowz.height() - $("#mainnav").height()) + "px");
        //$("#header").css("height", Math.max(windowz.height(), 500) + "px");

        //$(".right-nav").css("margin-right", $("#mlh-trust-badge-cover").width() + 5 + "px");

        if ($(window).width() <= 767) {

            $("#accordion").removeClass("hidden");
            $(".accordionCont").removeClass("hidden");
            $("#full-faq").addClass("hidden");
            $("#nav-ham").removeClass("hidden");

            //$("#navleft").hide();
            $("#navright").hide();

            $("#nav-inner").removeClass("container");
        } else {

            $("#accordion").addClass("hidden");
            $(".accordionCont").addClass("hidden");
            $("#full-faq").removeClass("hidden");
            $("#nav-ham").addClass("hidden");

            //$("#navleft").show();
            $("#navright").show();

            $("#nav-inner").addClass("container");
        }
    }

    bgresize();
    $(window).resize(bgresize);
    $(window).on("orientationchange", bgresize);

});

function toggleOverlay() {
    $("#nav-ham").toggleClass("is-active");

    if($("#nav-ham").hasClass("is-active")){
        $(".overlay").css({visibility: "visible"});
        $("html").css({"overflow-y": "hidden"});
    } else{
        $(".overlay").css({visibility: "hidden"});
        $("html").css({"overflow-y": "visible"});
    }
}
