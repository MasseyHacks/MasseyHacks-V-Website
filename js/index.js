$(document).ready(function(){
    $('a.scrollLink').click(function(){
        var href = $(this).attr('href');
        var anchor = $(href).offset();
        $('body').animate({ scrollTop: anchor.top-50 });
        return false;
    });
    $(document).scroll(function(){
        if($(window).scrollTop() >= $("#about").offset().top){
            $("#navmain").addClass("navbar-fixed-top");
        } else{
            $("#navmain").removeClass("navbar-fixed-top");
        }
    });
    $('#mc-embedded-subscribe').click(function() {
        var email = $('#mce-EMAIL').val()
        $.ajax({
            url: './php/emailSub.php',
            type: 'POST',
            data: {
                email: email
            },
            success: function (msg) {
                swal({
                    title: '<svg class=\"checkmark\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 52 52\"><circle class=\"checkmark__circle\" cx=\"26\" cy=\"26\" r=\"25\" fill=\"none\"/><path class=\"checkmark__check\" fill=\"none\" d=\"M14.1 27.2l7.1 7.2 16.7-16.8\"/></svg>',
                    text: '<big>Subscribed!</big>',
                    html: true
                });

            }
        });
    });
});