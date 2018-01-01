$(document).ready(function () {
    function toggleHamburger() {
        if ($(window).width() <= 767) {
            $("#smallcaption").removeClass("hidden");
            $("#bigcaption").addClass("hidden");
        } else {
            $("#smallcaption").addClass("hidden");
            $("#bigcaption").removeClass("hidden");
        }
    }
    toggleHamburger();
}

$(window).resize(function(){
    toggleHamburger();
});
