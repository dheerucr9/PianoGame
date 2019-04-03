window.addEventListener("keydown", (e) => KeyPressed(e.key));
window.addEventListener("keyup", (e) => KeyUnpressed(e.key));

var keys, pianoHands;
var instructions, instr_txt, keyboard, left, right, next, temp_counter, audio, sequence, temp_sequence, timer, timerText, run, currState, RTflag, t, timerFlag, timedPracticeFlag, instructionTrialFlag, PressNextKeyFlag, tooSlowFlag, plusFlag, locked;
var startTime, EndTime, reactionTimes, corr_incorr, count, cycles, corr_incorr_array, reactionTimes_array, id, data, game_num, instructionSet, comp_board, spaceLocked;
window.onload = function() {
  keys = {
    "1" : document.getElementById("one"),
    "2" : document.getElementById("two"),
    "3" : document.getElementById("three"),
    "4" : document.getElementById("four"),
    "7" : document.getElementById("seven"),
    "8" : document.getElementById("eight"),
    "9" : document.getElementById("nine")
    // "0" : document.getElementById("zero")
  }
  id = sessionStorage.getItem("ID");
  // console.log(id);
  var path = window.location.pathname;
  game_num = path.charAt(path.length-6);
  // console.log(game_num);
  currState = 0;
  run = 1;
  timerFlag = false;
  pianoHands = document.getElementById("pianoHands");
  instructions = document.getElementById("instructions");
  instr_txt = document.getElementById("instr_text");
  keyboard = document.getElementById("keyboard");
  left = document.getElementById("img1");
  right = document.getElementById("img2");
  next = document.getElementById("next");
  timer = document.getElementById("timer");
  timerText = document.getElementById("timerText");
  sequence = ["2738491", "4701839", "22", "914714738983"];//, "3918472", "7194823", "4739128", "", ""];
  prev_sequence = ["11","498298273437"]
  audio = [];
  RTflag = false;
  timedPracticeFlag = false;
  instructionTrialFlag = false;
  tooSlowFlag = null;
  plusFlag = null;
  locked = false;
  reactionTimes = [];
  corr_incorr = [];
  count = 0;
  cycles = [];
  // id = "js999999";
  corr_incorr_array = [];
  reactionTimes_array = [];
  spaceLocked = true;
  // PressNextKeyFlag = False;
  aud_files = "cdefgab";              //    Audio files downloaded from "https://freesound.org/people/Tesabob2001/packs/12995/"
  instructionSet = {"1":["For the next 90 seconds, focus on how your left hand fingers feel while you play the melody.",
                         "For the next 90 seconds, focus on how your right hand fingers feel while you play the melody.",
                         "For the next 90 seconds, focus on how your right middle finger feels while you play the melody.",
                         "For the next 90 seconds, focus on how your left middle finger feels while you play the melody."],
                    "2":["For the next 90 seconds, continue to play as you have been playing the piano.",
                         "For the next 90 seconds, continue to play as you have been playing the piano.",
                         "For the next 90 seconds, continue to play as you have been playing the piano.",
                         "For the next 90 seconds, continue to play as you have been playing the piano."]};
  comp_board = document.getElementById('comp_board');
  for(var i = 0; i < 10; i++) {
    if (i < 4)
      temp = new Audio("audio/" + aud_files[i] + "3.mp3");
    else if (i < 6)
      temp = NaN
    else if (i < 9)
      temp = new Audio("audio/" + aud_files[i-2] + "3.mp3");
    else
      temp = new Audio("audio/c4.mp3");
    // console.log(temp)
    audio.push(temp);
  }
  Flow();

}


function KeyPressed(key) {
    if (temp_counter >= 0) {
      // PRESS NEXT KEY OF SEQUENCE
      if (RTflag != false) {
        if(plusFlag == null && locked == false) {
            if (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9") {
            if (temp_sequence[temp_counter] == key) {
              keys[key].style.fill = "lightblue";
              keys[key].style.stroke = "lightblue";
              keys[key].style.outline =  "black solid 1px";
              playMusic(key);
              instr_txt.innerHTML += ("<b>CORRECT</b>");
              corr_incorr.push("+");

            } else {
              keys[key].style.fill = "red";
              keys[key].style.stroke = "red";
              keys[key].style.outline =  "black solid 1px";
              playMusic(key);
              instr_txt.innerHTML += ("<b>INCORRECT</b>");
              corr_incorr.push("-");
            }
            if(tooSlowFlag != null) {
              if(plusFlag == null)  {
                EndTime = new Date();
                reactionTimes.push(EndTime - startTime);
                locked = true;
                clearTimeout(tooSlowFlag);
                tooSlowFlag = null;
                // temp_counter += 1;
                if(temp_counter < temp_sequence.length - 1) {
                  currState -= 1;
                } else {
                  currState += 1;
                }
                setTimeout( () => {
                  Flow();
                }, 2000);
              }
            } else {
              temp_counter += 1;
              if (temp_counter == 6) {
                if(!timedPracticeFlag)
                  currState += 1;
                RTflag = false;
                setTimeout(Flow, 400);
              }
              else {
                setTimeout(() => {
                  instr_txt.innerHTML = "Press the next key of "+ prev_sequence[0][temp_counter] +"<br>";
                }, 500);
              }
            }
          }
        }
      }
      // PRACTICE, KEY CORRECT
    else if ((temp_sequence[temp_counter] == key) && (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9")) {
      count += 1;
      keys[key].style.fill = "lightblue";
      keys[key].style.stroke = "lightblue";
      keys[key].style.outline =  "black solid 1px";
      playMusic(key);
      if (key != temp_sequence[temp_sequence.length-1]) {
        temp_counter += 1;
        instr_txt.innerHTML += ("<b>" + key+"-</b>");
      }
      else {
        temp_counter = undefined;
        if (run == 1){
          currState = 4;
          run += 1;
          setTimeout(Flow, 400);
        } else if(instructionTrialFlag) {
          Flow();
        }
        else {
          currState += 1;
          setTimeout(Flow, 400);
        }
      }

    }
    // PRACTICE, KEY INCORRECT
    else if ((temp_sequence[temp_counter] != key) && (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9")) {
      keys[key].style.fill = "red";
      keys[key].style.stroke = "red";
      keys[key].style.outline =  "black solid 1px";
      playMusic(key);
      }
  }
}

function KeyUnpressed(key) {
  if (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9") {
    keys[key].style.fill = "white";
    keys[key].style.stroke = "black";
    keys[key].style.outline =  "none";
  }
  console.log(currState);
  if (spaceLocked == false && key == " " && ((currState == 1) || (currState == 2) || (currState == 3) || (currState == 4) || (currState == 6) || (currState == 8) || (currState == 10) || (currState == 9) || (currState == 9) || (currState == 10) || (currState == 12) || (currState == 14) || (currState == 18) || (currState == 19) || (currState == 20) || (currState == 21) || (currState == 22) || (currState == 23) || (currState == 24) || (currState == 25) || (currState == 26) || (currState == 27) || (currState == 28) || (currState == 29) || (currState == 30) || (currState == 31) || (currState == 32) || (currState == 33))) {
    console.log("going to flow");
    spaceLocked = true;
    Flow();
  }
}

function show(element) {
  element.style.display = "block";
}

function hide(element) {
  element.style.display = "none";
}

function Flow() {
  switch (currState) {
    case 0:
      hide(next);
      hide(comp_board);
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 5000);
      break;
    case 1:
      instr_txt.innerHTML = "To play the virtual piano, you will place your left hand fingers on the 1,2,3,4 keyboard keys and your right hand fingers on 7,8,9.";
      show(comp_board);
      show(pianoHands);
      hide(keyboard)
      hide(next);
      show(left);
      show(right);
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 10000);
      break;
    case 2:
      hide(next);
      instr_txt.innerHTML = "Please take a moment to place your fingers on the correct keyboard keys.<br>You must only play the keyboard keys with these fingers.";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 10000);
      break;
    case 3:
      hide(comp_board);
      hide(left);
      hide(right);
      hide(next);
      instr_txt.innerHTML = "Let’s practice to get comfortable with the keyboard piano.";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 10000);
      break;
    case 4:
      show(pianoHands);
      show(keyboard);
      show(left);
      show(right);
      hide(next);
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "Play this melody twice using the correct fingers.<br>";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      temp_counter = 0;
      break;
    case 5:
      instr_txt.innerHTML = "Great, now you will practice playing the melody as many times as you can for 90 seconds.";
      temp_counter = undefined;
      hide(left);
      hide(right);
      hide(keyboard);
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Click SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 6000);
      break;
    case 6:
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      temp_counter = 0;
      if(timerFlag!=true) {
        show(left);
        show(right);
        show(keyboard);
        hide(next);
        show(timer);
        instructionTrialFlag = true;
        setTimer(90000);
      }
      break;
    case 7:
      temp_counter = undefined;
      hide(timer);
      instr_txt.innerHTML = "Now we will test your knowledge of the melody.<br><br>You will briefly see and hear a number from the melody sequence you have been learning.<br><br>Your job is to press the next number from the melody sequence you learned <b>as quickly as possible.</b>";
      hide(left);
      hide(right);
      hide(keyboard);
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 6000);
      break;
    case 8:
      instr_txt.innerHTML = "Here's an example of how the test will proceed. Imagine the sequence is 1-2<br>You will see the following flashed on the next screen: 1 => ?<br>Then you must press 2 with the correct finger as quickly as possible";
      hide(next);
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 10000);
      break;
    case 9:
      hide(next);
      instr_txt.innerHTML = "Let’s practice with this simple 1-2 sequence two times before we test your knowledge of the longer sequence you have been learning.";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 5000);
      break;
    case 10:
      show(left);
      show(right);
      hide(next);
      show(keyboard);
      RTflag = true;
      temp_sequence = sequence[2];
      temp_counter = -1;
      currState += 1;
    case 11:
      instr_txt.innerHTML = "+";
      plusFlag = setTimeout( () => {
        temp_counter += 1;
        currState += 1;
        locked = false;
        Flow();
      }, 2000);
      break;
    case 12:
      plusFlag = null;
      tooSlowFlag = setTimeout(() => {
          plusFlag = 1;
          setTimeout(() => {
            if(temp_counter < temp_sequence.length - 1) {
              currState -= 1;
            } else {
              currState += 1;
            }
            Flow();
          }, 2000);
          if(temp_counter <= temp_sequence.length - 1) {
            instr_txt.innerHTML = "TOO SLOW<br>";
          }
      }, 3000);
      if(temp_counter <= temp_sequence.length - 1) {
        instr_txt.innerHTML = ""+ prev_sequence[0][temp_counter] + " => ?<br>";
        playMusic(prev_sequence[0][temp_counter])
      }
      break;
    case 13:
      temp_counter = undefined;
      instr_txt.innerHTML = "Great, now that you know what to do, let’s begin the test.<br><br>Remember to press the correct <b>next</b> number in the melody sequence as fast as you can.";
      hide(left);
      hide(right);
      hide(keyboard);
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 6000);
      break;
    case 14:
      show(left);
      show(right);
      show(keyboard);
      hide(next);
      RTflag = true;
      temp_sequence = sequence[3];
      temp_counter = -1;
      currState += 1;
    case 15:
      instr_txt.innerHTML = "+";
      plusFlag = setTimeout( () => {
        temp_counter += 1;
        currState += 1;
        locked = false;
        Flow();
      }, 2000);
      break;
    case 16:
      plusFlag = null;
      tooSlowFlag = setTimeout(() => {
          plusFlag = 1;
          setTimeout(() => {
            if(temp_counter < temp_sequence.length - 1) {
              currState -= 1;
            } else {
              currState += 1;
            }
            Flow();
          }, 2000);
          if(temp_counter <= temp_sequence.length - 1) {
            reactionTimes.push(-1);
            instr_txt.innerHTML = "TOO SLOW<br>";
            corr_incorr.push("0");
          }
      }, 3000);
      if(temp_counter <= temp_sequence.length - 1) {
        instr_txt.innerHTML = ""+ prev_sequence[1][temp_counter] + " => ?<br>";
        playMusic(prev_sequence[1][temp_counter])
        startTime = new Date();
      }
      break;
    case 17:
      corr_incorr_array.push(corr_incorr);
      reactionTimes_array.push(reactionTimes);
      temp_counter = undefined;
      hide(left);
      hide(right);
      hide(keyboard);
      instr_txt.innerHTML = "Now you will answer a few quick questions.<br><a href = 'https://usc.qualtrics.com/jfe/form/SV_eDsFSRDPKa3Uc5L' target = '_blank'>Click this link to survey</a>";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 10000);
      break;
    case 18:
      hide(next);
      instr_txt.innerHTML = "Now we will master the piano melody.<br>You will play the melody four more times in 90 seconds chunks.<br>You will receive specific instructions on where to focus your attention while you master the melody.";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 10000);
      break;
    case 19:
      hide(next);
      RTflag = false;
      instr_txt.innerHTML = instructionSet[game_num][0];
      timedPracticeFlag = true;
      instructionTrialFlag = true;
      count = 0;
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 6000);
      break;
    case 20:
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      temp_counter = 0;
      if(timerFlag!=true) {
        show(left);
        show(right);
        show(keyboard);
        hide(next);
        show(timer);
        setTimer(90000);
      }
      break;
    case 21:
      cycles.push(count);
      count = 0;
      hide(timer)
      instr_txt.innerHTML = instructionSet[game_num][1];
      hide(left);
      hide(right);
      hide(keyboard);
      temp_counter = undefined;
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 1000);
      break;
    case 22:
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      temp_counter = 0;
      if(timerFlag!=true) {
        show(left);
        show(right);
        show(keyboard);
        hide(next);
        show(timer);
        setTimer(90000);
      }
      break;
    case 23:
      cycles.push(count);
      count = 0;
      hide(timer);
      hide(left);
      hide(right);
      hide(keyboard);
      temp_counter = undefined;
      instr_txt.innerHTML = instructionSet[game_num][2];
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 1000);
      break;
    case 24:
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      temp_counter = 0;
      if(timerFlag!=true) {
        show(left);
        show(right);
        show(keyboard);
        hide(next);
        show(timer);
        setTimer(90000);
      }
      break;
    case 25:
      cycles.push(count);
      count = 0;
      hide(timer)
      instr_txt.innerHTML = instructionSet[game_num][3];
      hide(left);
      hide(right);
      hide(keyboard);
      temp_counter = undefined;
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 1000);
      break;
    case 26:
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      temp_counter = 0;
      if(timerFlag!=true) {
        show(left);
        show(right);
        show(keyboard);
        hide(next);
        show(timer);
        setTimer(90000);
      }
      break;
    case 27:
      cycles.push(count);
      hide(timer)
      instr_txt.innerHTML = "To complete the study, you will take a final test of how well you know the melody and answer final questions.";
      hide(left);
      hide(right);
      hide(keyboard);
      temp_counter = undefined;
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 1000);
      break;
    case 28:
      console.log(cycles);
      hide(next);
      instr_txt.innerHTML = "Remember, this is the same test that you completed before.<br>Remember to press the correct next number in the melody sequence as fast as possible.";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 1000);
      break;
    case 29:
      show(left);
      show(right);
      show(keyboard);
      hide(next);
      RTflag = true;
      temp_sequence = sequence[3];
      temp_counter = -1;
      currState += 1;
      reactionTimes = [];
      corr_incorr = [];
    case 30:
      instr_txt.innerHTML = "+";
      plusFlag = setTimeout( () => {
        temp_counter += 1;
        currState += 1;
        locked = false;
        Flow();
      }, 2000);
      break;
    case 31:
      plusFlag = null;
      tooSlowFlag = setTimeout(() => {
          plusFlag = 1;
          setTimeout(() => {
            if(temp_counter < temp_sequence.length - 1) {
              currState -= 1;
            } else {
              currState += 1;
            }
            Flow();
          }, 2000);
          if(temp_counter <= temp_sequence.length - 1) {
            // EndTime = new Date();
            reactionTimes.push(-1);
            instr_txt.innerHTML = "TOO SLOW<br>";
            corr_incorr.push("0");
          }
      }, 3000);
      if(temp_counter <= temp_sequence.length - 1) {
        startTime = new Date();
        instr_txt.innerHTML = ""+ prev_sequence[1][temp_counter] + " => ?<br>";
        playMusic(prev_sequence[1][temp_counter])
      }
      break;
    case 32:
      corr_incorr_array.push(corr_incorr);
      reactionTimes_array.push(reactionTimes);
      hide(left);
      hide(right);
      hide(keyboard);
      temp_counter = undefined;
      instr_txt.innerHTML = "Final questions:<br><a href = 'https://usc.qualtrics.com/jfe/form/SV_cN5DDP8tG8ujHAp' target = '_blank'>Click on this link for the final survey</a>";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        spaceLocked = false;
        currState += 1;
      }, 10000);
      break;
    case 33:
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://207.246.110.72:3000/game" + game_num, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      data = JSON.stringify( {
        'id': id,
        'corr_incorr_array': corr_incorr_array,
        'reactionTimes_array': reactionTimes_array,
        'cycles': cycles
      });
      xhr.send(data);
      hide(next);
      instr_txt.innerHTML = "The study is done.<br><br>THANK YOU";
      break;
    }
}

function setTimer(x) {
  temp = x;
  timer.style.lineHeight = "100px";
  t = setInterval(() => {
    timerFlag = true;
    if (x/1000 > 59) {
      timer.innerHTML = "1:" + (Math.floor(x/1000) - 60);
    } else {
      timer.innerHTML =  "0:" + Math.floor(x/1000);
    }
    // console.log("0:" + Math.floor(x/1000));
    x-=1000;
    if (x < 0) {
      clearInterval(t);
      timeup(temp);
    }
  }, 1000);
}

function timeup(x) {
  currState += 1
  timerFlag = false;
  if (x == 20000){
    setTimeout(Flow, 500);
  } else {
    Flow();
  }
}

function playMusic(key) {
  audio[Number(key)-1].play();
}
