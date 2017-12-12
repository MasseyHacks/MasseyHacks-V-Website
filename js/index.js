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

    var emailBox = $("#mce-EMAIL");
    var subSubmit = $("#mc-embedded-subscribe");
    var dcID = "us17";
    var apikey = "9a3694a4119716258581ccb8f0f0a6ad-us17";
    var listUniqueId = "f7aab2d91d";

    var xhr = new XMLHttpRequest();

    subSubmit.click(function () {
        var email = emailBox.val();
        xhr.open('POST', 'https://' + dcID + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/');
        xhr.setRequestHeader("Authorization", "Basic " + btoa("ryanz34:"+apikey));
        xhr.setRequestHeader("Content-Type", "application/json");

        console.log(xhr.send(JSON.stringify({
            'email_address': email,
            'status': 'subscribed',
            'merge_fields': {
                'FNAME': 'testing',
                'LNAME': 'testing'
            }
        })));
    })
});