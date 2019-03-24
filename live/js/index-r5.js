$(document).ready(function () {

    var slides = [1, 2, 3, 5, 6, 11, 12, 13, 14, 15, 16];
    var target = Math.floor(Math.random() * slides.length);

    console.log(target, 'url("images/slide/' + slides[target] + '.jpg");');
    $('#header').css('background-image', 'url("images/slide/' + slides[target] + '.jpg");');

    $("#applybtn").click(function () {
        swal({title: 'I am applying as a...',
            showCancelButton: false,
            showCloseButton: true,
            showConfirmButton: false,
            html:'<a href="https://register.masseyhacks.ca/" target="_blank"><button type="button" class="btn btn-large btn-wide">Hacker</button><br></a>' +
                '<a href="https://masseyhacks.ca" target="_blank"><button type="button" disabled="true" class="btn btn-large btn-wide">Mentor/Workshop Host</button></a>'});
    })


    function updateScroll(position) {
		return
        switch (position) {
            case 'hidden': // Hide bar when detached from top
                $('#nav-main').removeClass('nav-active');
                $('#nav-main').removeClass('nav-docked');
                $('#nav-main').addClass('nav-hidden');

                $("#nav-ham").attr("hidden", true);

                break;
            case 'body': // Body
                $('#nav-main').css('position', 'fixed');

                $('#nav-main').removeClass('nav-docked');
                $('#nav-main').addClass('nav-active');

                $('#nav-main').removeClass('nav-hidden');

                //$('#nav-logo').attr('src', 'images/logo/logo.svg');
                $('#bannerImg').attr('src', 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-blue.svg');
                //$('#nav-logo-group').attr("hidden", false);

                //$('#mobile-overlay').removeClass('overlay-dark');
                //$('#mobile-overlay').addClass('overlay-light');

                // Hide hamburger
                /*
                if ($('#nav-main-table').is(":hidden")) {
                    $("#nav-ham").attr("hidden", false);
                }*/

                break;
            default: // Top (Docked)
                $('#nav-main').css('position', 'absolute');
                $('#nav-main').addClass('nav-docked');
                $('#nav-main').removeClass('nav-active');
                $('#nav-main').removeClass('nav-hidden');

                //$('#nav-logo').attr('src', 'images/logo/logo-white.svg');
                $('#bannerImg').attr('src', 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg');
                //$('#nav-logo-group').attr("hidden", true);

                //$('#mobile-overlay').addClass('overlay-dark');
                //$('#mobile-overlay').removeClass('overlay-light');

                /*
                if ($('#nav-main-table').is(":hidden")) {
                    $("#nav-ham").attr("hidden", false);
                }*/

                break;
        }
    };

    var wp = new Waypoint({
        element: document.getElementById('activities'),
        handler: function(direction) {
            updateScroll(direction == 'down' ? 'body' : 'hidden');
        },
        offset: '50px'
    })

    var wp2 = new Waypoint({
        element: document.getElementById('header'),
        handler: function(direction) {
            updateScroll(direction == 'down' ? 'hidden' : 'docked');
        },
        offset: '-50px'
    })

    updateScroll('docked');

    $('.js-navbar-link').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {

        });
    });

    $('#year').html(new Date().getFullYear());

    $(".hamburger").on("click",function(){
        toggleOverlay();
    });

    $('a.overlayLink').click(function () {
        toggleOverlay();
    });

    var bgresize = function () {
        if ($(document).width() <= 767) {

            $("#nav-ham").removeClass("hidden");

            //$("#navleft").hide();
            $("#navright").hide();

            $("#nav-inner").removeClass("container");
        } else {

            $("#nav-ham").addClass("hidden");

            //$("#navleft").show();
            $("#navright").show();

            $("#nav-inner").addClass("container");
        }

        if($("#nav-ham").hasClass("is-active")){
            $("#nav-ham").toggleClass("is-active");
            $(".overlay").css({top: "-100%"});
            $("html").css({"overflow-y": "visible"});
        }
    }

    bgresize();
    $(window).resize(bgresize);
    $(window).on("orientationchange", bgresize);
});

function toggleOverlay() {
    $("#nav-ham").toggleClass("is-active");

    if($("#nav-ham").hasClass("is-active")){
        $(".overlay").css({top: "0"});
        $("html").css({"overflow-y": "hidden"});
    } else{
        $(".overlay").css({top: "-100%"});
        $("html").css({"overflow-y": "visible"});
    }
}

$.ajax({
    type: 'GET',
    url: '../schedule.json',
    dataType: 'json',
    success: function (data) {
        var exp = '';
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var xOffset = 100 + 200 * d['xs'];
            var width = (d['xe'] - d['xs']) * 200;
            var yOffset = 95 + 80 * d['y'];
            exp += '<div style="left: ' + xOffset + 'px; top: ' + yOffset + 'px; width: ' + width + 'px !important; background-color: ' + d['color'] + ';" class="schedule-label">' +
                '<div class="inner-label">' +
                '<p class="label-caption"><b>' + d['caption'] + '</b></p>' +
                '<p class="label-description">' + d['start'] + ' - ' + d['end'] + ' | ' + d['location'] + '</p>' +
                '</div></div>';
        }
		document.getElementById("label-container").innerHTML = exp

    },
    error: function (data) {
        $('#schedule-frame').html('<b><h2>Server error occurred<br>Unable to get schedule</h2></b>');
    }
})

function to24(time){
	var hours = Number(time.match(/^(\d+)/)[1]);
	var minutes = Number(time.match(/:(\d+)/)[1]);
	var AMPM = time.match(/\s?(AM|PM)/)[1];
	if(AMPM == "PM" && hours<12) hours = hours+12;
	if(AMPM == "AM" && hours==12) hours = hours-12;
	var sHours = hours.toString();
	var sMinutes = minutes.toString();
	if(hours<10) sHours = "0" + sHours;
	if(minutes<10) sMinutes = "0" + sMinutes;
	return `${sHours}:${sMinutes}`
}

var oldEvents = [];
var oldEventsUp = [];
var hasRun = false;

function randomString(length, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function getCardHTML(name, start, end, body){
	var id = "card"+randomString(15);
	var cardHTML = `
	<div class="activity-card" id="${id}">
		<h2>${name}: ${start} - ${end}</h2>
		<p>${body}</p>
	</div>
	`
	return [id,cardHTML]
}

function updateSchedule(){
	$.ajax({
		type: 'GET',
		url: '../schedule.json',
		dataType: 'json',
		success: function (data) {
			document.getElementById("schedulenow").innerHTML = "<h2>There are no activities</h2>";
			document.getElementById("scheduleupcoming").innerHTML = "<h2>There are no activities</h2>";
			console.log("hi")
			var exp = '';
			var currentDate = new Date();
			var addedEvents = [];
			var addedEventsUp = [];
			var nowModded, upModded = false;
			for (var i = 0; i < data.length; i++) {
				var d = data[i];
				var actStart = new Date(d['date'] + " " + to24(d['start']));
				if(!d['dateEnd']){
					d['dateEnd']  = d['date']
				}
				var actEnd = new Date(d['dateEnd'] + " " + to24(d['end']));
				
				console.log(d['caption'])
				console.log(actStart-currentDate);
				if(actStart < currentDate && actEnd > currentDate){
					console.log("hello")
					if(!nowModded){
						document.getElementById("schedulenow").innerHTML = "";
					}
					nowModded = true;
					var eventCard = getCardHTML(d['caption'], d['start'].toLowerCase(), d['end'].toLowerCase(), d['location']);
					document.getElementById("schedulenow").innerHTML += eventCard[1];
					if(oldEvents.indexOf(d['caption']) == -1){
						$("#"+eventCard[0]).fadeIn(250);
						if(hasRun){
							toastr["info"](`${d['caption']}: ${d['start'].toLowerCase()} - ${d['end'].toLowerCase()} in ${d['location']}`, "Activity starting!");
						}
					}
					else{
						$("#"+eventCard[0]).toggle(true);
					}
					if(d['important']){
						$("#"+eventCard[0]).addClass("important-card")
					}
					addedEvents.push(d['caption'])
					//document.getElementById("schedulenow").innerHTML += getCardHTML(d['caption'], d['start'].toLowerCase(), d['end'].toLowerCase(), d['location']);
				}
				else if(actStart-currentDate <= 3600000 && actEnd > currentDate){
					if(!upModded){
						console.log("boo!")
						document.getElementById("scheduleupcoming").innerHTML = "";
					}
					upModded = true;
					var eventCard = getCardHTML(d['caption'], d['start'].toLowerCase(), d['end'].toLowerCase(), d['location']);
					console.log(eventCard)
					document.getElementById("scheduleupcoming").innerHTML += eventCard[1];
					if(oldEventsUp.indexOf(d['caption']) == -1){
						$("#"+eventCard[0]).fadeIn(250);
					}
					else{
						$("#"+eventCard[0]).toggle(true);
					}
					if(d['important']){
						$("#"+eventCard[0]).addClass("important-card")
					}
					addedEventsUp.push(d['caption'])
				}
				
			}
			//$("#schedulenow").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
			//$("#scheduleupcoming").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
			oldEvents = addedEvents;
			oldEventsUp = addedEventsUp;
			hasRun = true;

		},
		error: function (data) {
			$('#schedulenow').html('<b><h2>Server error occurred<br>Unable to get schedule</h2></b>');
			$('#scheduleupcoming').html('<b><h2>Server error occurred<br>Unable to get schedule</h2></b>');
		}
	})
}
updateSchedule();
// Update the schedule every 1 minute
var feawtratgr = setInterval(updateSchedule, 60000);
//var xy = setInterval(updateSchedule, 1000);