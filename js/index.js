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

    $('a.scrollLink').click(function () {
        var href = $(this).attr('href');
        var anchor = $(href).offset();
        $('body').animate({scrollTop: anchor.top - 50});
        return false;
    });

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
