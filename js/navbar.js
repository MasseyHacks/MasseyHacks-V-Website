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

    // === Navbar === //
    document.getElementById("js-navbar-hamburger").addEventListener("click", function(){
        document.getElementById("js-navbar-items").classList.toggle("active");
        document.getElementById("js-navbar-hamburger").classList.toggle("is-active");
    });
});