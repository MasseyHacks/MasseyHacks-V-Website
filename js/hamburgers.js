//handles everything to do with hamburger
$(document).ready(function(){
    toggleHamburger();
    $(".hamburger").on("click",function(){
        $("#navham").toggleClass("is-active");
        if($("#navham").hasClass("is-active")){
            $(".overlay").css({visibility: "visible"});
        } else{
            $(".overlay").css({visibility: "hidden"});
        }
    });
    $(".overlay").on("click",function(){
        $(".overlay").css({width:"0"});
        $("#navham").removeClass("is-active");
    });
});

$(window).resize(function(){
    toggleHamburger();
});

function toggleHamburger(){
    //toggles hamburger based on window width
    if($(window).width() <= 850){
        $("#navham").removeClass("hidden");
        $("#navleft").hide();
        $("#navright").hide();
    } else{
        $("#navham").addClass("hidden");
        $("#navleft").show();
        $("#navright").show();
    }
}
