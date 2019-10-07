var interval = null;
var currentIncrement = 0;
var isPaused = false;
var initialised = false;
var clicked = false;

function initialiseTimer() {
  interval = setInterval(function() {
    if (isPaused) return;
    var current = setCurrentIncrement();
    updateStopwatch(current);
  }, 1000)
}

function updateStopwatch(increment) {
  var hours = Math.floor(increment / 3600);
  var minutes = Math.floor((increment - (hours * 3600)) / 60);
  var seconds = increment - (hours * 3600) - (minutes * 60);
  
  if(hours > 99)
    resetStopWatch();

  $(".hours").text(hours < 10 ? ("0" + hours.toString()) : hours.toString())
  $(".minutes").text(minutes < 10 ? ("0" + minutes.toString()) : minutes.toString())
  $(".seconds").text(seconds < 10 ? ("0" + seconds.toString()) : seconds.toString())
}

function setCurrentIncrement() {
  currentIncrement += 1;
  return currentIncrement;
}

function resetStopWatch() {
  currentIncrement = 0;
  isPaused = true;
  initialised = false;
  clearInterval(interval);
  $(".hours").text("00");
  $(".minutes").text("00");
  $(".seconds").text("00");
  $(".playpause span").removeClass();
  $(".playpause span").addClass("play");
}


function startStopWatch() {
  if (clicked) {
    e.preventDefault();
    return false;
  }

  if (!initialised) {
    initialised = true;
    isPaused = false;
    $(".playpause span").removeClass();
    $(".playpause span").addClass("pause");
    initialiseTimer();
  } else {
    $(".playpause span").removeClass();
    if (isPaused) {
      isPaused = false;
      $(".playpause span").addClass("pause");
    } else {
      isPaused = true;
      $(".playpause span").addClass("play");
    }
  }
}

function addItems() {
    let project_name = $("#input_add").val();

    let col_html = `
     <div class="col-12 project-item">
	 <div class="name d-inline">${project_name}</div>
	 <button type="submit" class="btn_start">Start</button>
	 <div class="stopwatch">
	 <p><span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span></p>
	 </div>
     </div>
    `

    $("#result").append(col_html);
}


$( document ).ready(function() {
    $("#action_add").on("click", function() {
	addItems();
    });

    $("#result").on("click", ".project-item .btn_start", function() {
	console.log("start");
	startStopWatch();
    });
});
