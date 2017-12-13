document.addEventListener("DOMContentLoaded", function(){
    $('.js-navbar-link').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 50
        }, 420, 'swing', function () {
            window.location.hash = target;
        });
    });
});