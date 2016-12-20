$(document).ready(function() {
    /*I can start a cycle and a timer will go off once 25 min has passed
    I can reset the clock for my next pomodoro
    I can customize the length of each pomodoro
    1. When cycle is playing, the number can't be changed
    2. When break is running the number can't be changed.*/

  //start with reset button hidden
  $("#reset").hide();
  
  var clock = {
    //variables
    cycleCount: parseInt($("#cycleNumber").html()),
    breakCount: parseInt($("#breakNumber").html()),
    beep: $("#beep")[0],
    counter: "",
    func: {
      timeFormat: function(val) {
        if (Math.floor(val / 60) > 9 && val % 60 >= 10) {
          $("#timeInput").html(Math.floor(val / 60) + ":" + val % 60);
        } else if (Math.floor(val / 60) <= 9 && val % 60 >= 10) {
          $("#timeInput").html("0" + Math.floor(val / 60) + ":" + val % 60);
        } else if (Math.floor(val / 60) > 9 && val % 60 < 10) {
          $("#timeInput").html(Math.floor(val / 60) + ":" + "0" + val % 60);
        } else {
          $("#timeInput").html("0" + Math.floor(val / 60) + ":0" + val % 60);
        }
      }, 
      timer: function() {
        clock.cycleCount -= 1;
        if (clock.cycleCount === 0) {
          clock.beep.play();
          clearInterval(clock.counter);
         //breakTimer
         var startBreak = setInterval(breakTimer, 1000);
        }
        clock.func.timeFormat(clock.cycleCount);
          function breakTimer() {
           $("#status").html("Break Time");
            clock.breakCount -= 1;
            if (clock.breakCount === 0) {
              clock.beep.play();
              clearInterval(startBreak);
              $("#reset").show();
              $("#timeInput").empty();
              $("#status").html("All Done!");
            }
              clock.func.timeFormat(clock.breakCount);
          }
        }
    },
    button: {
      start: $("#start").click(function() {
        $("#start, #cycleAdd, #cycleSubtract, #breakAdd, #breakSubtract, #breakNumber, #cycleNumber, #break,    #cycle").hide();
        $("#status").html("Work Time");
        //cycle timer
        clock.counter = setInterval(clock.func.timer, 1000);
        //multiply numbers by 60 for proper time
        //clock.cycleCount *= 60;
        //clock.breakCount *= 60;
        //add 1 so original number is displayed at start
        clock.cycleCount += 1;
        clock.breakCount += 1;
     }),
     cycleAdd: $("#cycleAdd").click(function() {
      if (clock.cycleCount < 55) {
        clock.cycleCount += 5;
      }
      $("#cycleNumber").html(clock.cycleCount);
      }),
      cycleSubtract: $("#cycleSubtract").click(function() {
        if (clock.cycleCount > 5) {
          clock.cycleCount -= 5;
          $("#cycleNumber").html(clock.cycleCount);
        }
    }),
    breakAdd: $("#breakAdd").click(function() {
      if (clock.breakCount < 55) {
        clock.breakCount += 5;
      }
      $("#breakNumber").html(clock.breakCount);
    }),
    breakSubtract: $("#breakSubtract").click(function() {
      if (clock.breakCount > 5) {
        clock.breakCount -= 5;
        $("#breakNumber").html(clock.breakCount);
      }
    }),
    reset: $("#reset").click(function() {
      //show all items from start screen
      $("#start, #cycleAdd, #cycleSubtract, #breakAdd, #breakSubtract, #breakNumber, #cycleNumber, #break,    #cycle").show();
      $("#reset").hide();
      $("#status").empty();
      //reset the numbers in html and variables
      //I reset the variables to prevent issue when trying to start 2nd cycle
      $("#cycleNumber").html(25);
      clock.cycleCount = 25;
      $("#breakNumber").html(5);
      clock.breakCount = 5;
      $("#timeInput").empty();
    })  
      
  }
};
    

});
