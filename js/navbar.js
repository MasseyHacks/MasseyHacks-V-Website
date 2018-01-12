$(document).ready(function () {

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