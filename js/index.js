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
                alert('Email Sent');
            }
        });
    });
});