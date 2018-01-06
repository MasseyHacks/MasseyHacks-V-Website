var sections = ["cover", "about", "faq", "schedule", "sponsors", "team"];

$(document).ready(function () {

    $('a.scrollLink').click(function () {
        var href = $(this).attr('href');
        var anchor = $(href).offset();
        $('body').animate({scrollTop: anchor.top - 50});
        return false;
    });

    $('#subbutton').click(function () {
        swal({
            html: 'Subscribe to our mailing list to get the latest updates on MasseyHacks IV!',
            input: 'email',
            showCancelButton: true,
            confirmButtonText: 'Subscribe!',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                return new Promise((resolve) => {
                        sub(email)
                })
            }
        })
    })

    function sub (email) {
        if (email != '') {
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
                            html: 'Get ready for the latest updates about MasseyHacks IV!'
                        });
                    } else if (msg == 'invalid') {
                        swal(
                            'Oops...',
                            'Invalid email address.',
                            'error'
                        );
                    } else if (msg == 'asubbed'){
                        swal(
                            'Oops...',
                            'You are already subscribed.',
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
            var email = $('#mce-EMAIL').val()
            sub(email);
        }
    });

    $('#mc-embedded-subscribe').click(function () {
        var email = $('#mce-EMAIL').val()
        sub(email);
    });


    var bgresize = function () {
        var windowz = $("#header");

        if (windowz.height() > windowz.width()) {
            $("#cover").css("background-size", "auto" + " " + windowz.height() + "px");
        } else {
            $("#cover").css("background-size", windowz.width() + "px" + " " + "auto");
        }

        if ($(window).width() <= 767) {
            $("#smallcaption").removeClass("hidden");
            $("#bigcaption").addClass("hidden");
            //$("#mc_embed_signup").hide();
            //$("#subbutton").removeClass("hidden");
        } else {
            $("#smallcaption").addClass("hidden");
            $("#subbutton").addClass("hidden");
            $("#bigcaption").removeClass("hidden");
            $("#mc_embed_signup").show();
        }
    }
    bgresize();
    $(window).resize(bgresize);
    $(window).on("orientationchange", bgresize);

    function updateScroll() {
        $("#cover").css("background-position-y", $("#cover").offset().top - 1 * ($(window).scrollTop() - $("#cover").offset().top) / 2 );

    }

    $(".navsocial").css("height", $("#mainnav").height() / 3);

    $(window).resize(updateScroll);
    $(document).scroll(updateScroll);
    updateScroll();
});