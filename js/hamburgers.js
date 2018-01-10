//handles everything to do with hamburger
$(document).ready(function(){
    toggleHamburger();
    $(".hamburger").on("click",function(){
        toggleOverlay();
    });

    $('a.overlayLink').click(function () {
        toggleOverlay();
    });
});

$(window).resize(function(){
    toggleHamburger();
});

function toggleOverlay() {
    $("#navham").toggleClass("is-active");
    if($("#navham").hasClass("is-active")){
        $(".overlay").css({visibility: "visible"});
        $("html").css({"overflow-y": "hidden"});
    } else{
        $(".overlay").css({visibility: "hidden"});
        $("html").css({"overflow-y": "visible"});
    }
}

function toggleHamburger(){
    //toggles hamburger based on window width
    if($(window).width() <= 767){
        $("#navham").removeClass("hidden");
        $("#outer-social").removeClass("hidden");
        $("#navleft").hide();
        $("#navright").hide();
    } else{
        $("#navham").addClass("hidden");
        $("#outer-social").addClass("hidden");
        $("#navleft").show();
        $("#navright").show();
    }
}
