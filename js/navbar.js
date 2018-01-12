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

})