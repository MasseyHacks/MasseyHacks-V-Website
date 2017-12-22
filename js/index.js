var sections = ["cover", "about", "faq", "schedule", "sponsors", "team"];

$(document).ready(function () {

    $('a.scrollLink').click(function () {
        var href = $(this).attr('href');
        var anchor = $(href).offset();
        $('body').animate({scrollTop: anchor.top - 50});
        return false;
    });

    $('#mc-embedded-subscribe').click(function () {
        var email = $('#mce-EMAIL').val()
        $.ajax({
            url: './php/emailSub.php',
            type: 'POST',
            data: {
                email: email
            },
            success: function (msg) {
                if (msg == "success") {
                    swal({
                        type: 'success',
                        title: 'Subscribed!',
                    });
                } else {
                    swal(
                        'Oops...',
                        'Something went wrong! Have you already subscribed?',
                        'error'
                    );
                }
            },
            error: function () {
                alert("Php script error");
            }

        });
    });


    var bgresize = function () {
        var windowz = $("#header");

        //console.log(windowz.width() + " " + windowz.height());

        if (windowz.height() > windowz.width()) {
            $("#cover").css("background-size", "auto" + " " + windowz.height() + "px");
        } else {
            $("#cover").css("background-size", windowz.width() + "px" + " " + "auto");
        }
    }
    bgresize();
    $(window).resize(bgresize());
    $(window).on("orientationchange", bgresize());

    function updateScroll() {

        $(".right-nav").css("margin-right", $("#mlh-trust-badge-cover").width() + 5 + "px");

        var opacity;
        var dist = $("#about").offset().top - $(window).scrollTop();

        if (dist > 0) {
            opacity = 0.8 * (1 - dist / $("#about").offset().top);
        }
        else {
            opacity = 0.8;
        }

        $("#mainnav").css("background", "rgba(49, 60, 75, " + opacity + ")");

        $("#cover").css("background-position-y", $("#cover").offset().top - 1 * ($(window).scrollTop() - $("#cover").offset().top) / 2);

        // Time for the noice background changer
        /*
        for (var i = 0; i < sections.length; i++) {
            if ((true) && ($(window).scrollTop() >= $("#" + sections[i]).offset().top)) {
                $("#cover").removeClass();
                $("#cover").addClass(sections[i] + "-image");
                $("#cover").css("background-position-y", $("#" + sections[i]).offset().top - 1 * ($(window).scrollTop() - $("#" + sections[i]).offset().top) / 2);
            }
        } */
    }

    $(".navsocial").css("height", $("#mainnav").height() / 2);

    $(window).resize(updateScroll);
    $(document).scroll(updateScroll);
    updateScroll();
});