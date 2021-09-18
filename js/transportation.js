function time_add(time){
    var timearr = time.split(":")
    var second = timearr[2];
    var minute = timearr[1];
    var hour = timearr[0];
    if (second==='59'){
        second = 0;
        if (minute==="59"){
            minute = 0;
            hour++;
        }
        else {
            minute++;
        }
    }
    else{
        second++;
    }

    return hour+":"+minute+":"+second.toString()
}

function fake_add(time,time_goal){
    let timearr = time.split(":")
    let second = timearr[2];
    let minute = timearr[1];
    let hour = timearr[0];

    let goal_timearr = time_goal.split(":")
    let goal_second = goal_timearr[2];
    let goal_minute = goal_timearr[1];
    let goal_hour = goal_timearr[0];
    if (parseInt(second,10)<goal_second){
        console.log(second)
        second++;
    }
    if (parseInt(minute, 10)<goal_minute){
        console.log(minute)
        minute++;
    }
    if (parseInt(hour,10)<goal_hour){
        console.log(hour)
        hour++;
    }
    return hour+":"+minute+":"+second.toString();
}
function countup(time_goal, id) {
    var time = "0:00:00";
    var p = document.getElementById(id);
    var set = setInterval(function() {
        time = fake_add(time,time_goal);
        p.innerText = time;
        if(time === time_goal) {
            clearInterval(set);
        }
    }, 50);
}
function acr_refresh(){
    countup("10:20:30","sit_time")
    countup("2:10:50","walk_time")
    countup("1:15:40","sport_time")
}

var anime = document.getElementById('anime');
var video = document.getElementById('real');

document.onkeyup=( function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if ( e.keyCode === 37 ) {
        if (anime.paused === true) {
            // Play the video
            anime.play();
        }else{
            anime.pause();
        }
    }
    if ( e.keyCode === 39 ) {
        if (video.paused === true) {
            // Play the video
            video.play();
        }else{
            video.pause();
        }
    }
});

