$(document).ready(function () {
    $('#mc_embed_signup').submit(function(e) {
        e.preventDefault();
        submitEmail();
    })

    function sub (email) {
        if (email.val() != '') {
            swal({
                type: 'info',
                title: 'Processing Subscription'
            });
            swal.showLoading()

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
                            html: 'Get ready for the latest updates about MasseyHacks!<br>(' + email.val() + ')'
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
        } /* else {
            swal(
                'Oops...',
                'Email is blank!',
                'error'
            );
        }*/
    }

    /*
    $('#mce-EMAIL').keydown(function (e) {
        if (e.which == 13 && (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
            e.preventDefault();
            var email = $('#mce-EMAIL');
			console.log(email);
            sub(email);
			//$('#mce-EMAIL').val('');
        }
    });*/

    function submitEmail() {
        var email = $('#mce-EMAIL');
		console.log(email);
        sub(email);
		//$('#mce-EMAIL').val('');
        return false;
    };
});