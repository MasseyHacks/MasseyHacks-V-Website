$(document).ready(function () {

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
