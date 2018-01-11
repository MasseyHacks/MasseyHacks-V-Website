$(document).ready(function () {

    $('a.scrollLink').click(function () {
        var href = $(this).attr('href');
        var anchor = $(href).offset();
        $('body').animate({scrollTop: anchor.top - 50});
        return false;
    });

    function sub (email) {
        if (email.val() != '') {
            $.ajax({
                url: './php/emailSub.php',
                type: 'POST',
                data: {
                    email: email.val()
                },
                success: function (msg) {
                    if (msg == "success") {
                        swal({
                            type: 'success',
                            title: 'Subscribed!',
                            html: 'Get ready for the latest updates about MasseyHacks IV! <br>(' + email.val() + ')'
                        });
                        email.val("");

                    } else if (msg == 'invalid') {
                        swal(
                            'Oops...',
                            'Invalid email address.',
                            'error'
                        );
                    } else if (msg == 'asubbed'){
                        swal(
                            'Oops...',
                            'You are already subscribed. <br>(' + email.val() + ')',
                            'error'
                        );
                    } else {
                        swal(
                            'Oops...',
                            'Something went wrong! Please try again later.',
                            'error'
                        );
                    }
                },
                error: function () {
                    swal(
                        'Oops...',
                        'Something went wrong! Please try again later.',
                        'error'
                    );
                }

            });
        }
    }

    $('#mce-EMAIL').keydown(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            var email = $('#mce-EMAIL');
            sub(email);
        }
    });

    $('#mc-embedded-subscribe').click(function () {
        var email = $('#mce-EMAIL');
        sub(email);
    });


    var bgresize = function () {

        var windowz = $(window);
        $(".slide").css("height", (windowz.height() - $("#mainnav").height()) + "px");
        $("#header").css("height", Math.max(windowz.height(), 500) + "px");

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

    function updateScroll() {
        var opacity;
        var dist = $("#about").offset().top - $(window).scrollTop();

        if (dist > 0) {
            opacity = 1 * (1 - dist / $("#about").offset().top);
        }
        else {
            opacity = 1;
        }

        $("#mainnav").css("background", "rgba(10, 25, 57, " + opacity + ")");
        $(".right-nav").css("margin-right", $("#mlh-trust-badge-cover").width() + 5 + "px");

    }

    $(window).resize(updateScroll);
    $(document).scroll(updateScroll);
    updateScroll();
});
