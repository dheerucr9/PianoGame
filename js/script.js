window.addEventListener("keydown", (e) => KeyPressed(e.key));
window.addEventListener("keyup", (e) => KeyUnpressed(e.key));

var keys, pianoHands;
var instructions, instr_txt, keyboard, left, right, next, temp_counter, audio, sequence, temp_sequence, timer, timerText, run, currState, RTflag, t, timerFlag, timedPracticeFlag, instructionTrialFlag, PressNextKeyFlag, tooSlowFlag, plusFlag, locked;
var startTime, EndTime, reactionTimes, corr_incorr, count, cycles, corr_incorr_array, reactionTimes_array, id, data, game_num;
window.onload = function() {
  keys = {
    "1" : document.getElementById("one"),
    "2" : document.getElementById("two"),
    "3" : document.getElementById("three"),
    "4" : document.getElementById("four"),
    "7" : document.getElementById("seven"),
    "8" : document.getElementById("eight"),
    "9" : document.getElementById("nine"),
    "0" : document.getElementById("zero")
  }
  id = sessionStorage.getItem("ID");
  // console.log(id);
  var path = window.location.pathname;
  game_num = path.charAt(path.length-6);
  // console.log(game_num);
  currState = 33;
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
  sequence = ["27384910", "4701839", "44", "91471400738983"];//, "3918472", "7194823", "4739128", "", ""];
  prev_sequence = ["88","49829811273437"]
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
  // PressNextKeyFlag = False;
  aud_files = "cdefgab";              //    Audio files downloaded from "https://freesound.org/people/Tesabob2001/packs/12995/"
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
            if (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0") {
            if (temp_sequence[temp_counter] == key) {
              keys[key].style.fill = "lightblue";
              keys[key].style.stroke = "lightblue";
              keys[key].style.outline =  "black solid 1px";
              if (key == "0")
                audio[9].play();
              else
                audio[Number(key)-1].play();
              instr_txt.innerHTML += ("<b>CORRECT</b>");
              corr_incorr.push("+");

            } else {
              keys[key].style.fill = "red";
              keys[key].style.stroke = "red";
              keys[key].style.outline =  "black solid 1px";
              if (key == "0")
                audio[9].play();
              else
                audio[Number(key)-1].play();
              instr_txt.innerHTML += ("<b>INCORRECT</b>");
              corr_incorr.push("-");
            }
            if(tooSlowFlag != null) {
              // console.log("clear timeout");
              // console.log(currState);
              // console.log("yoyo");
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
    else if ((temp_sequence[temp_counter] == key) && (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0")) {
      count += 1;
      keys[key].style.fill = "lightblue";
      keys[key].style.stroke = "lightblue";
      keys[key].style.outline =  "black solid 1px";
      if (key == "0")
        audio[9].play();
      else
        audio[Number(key)-1].play();
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
    else if ((temp_sequence[temp_counter] != key) && (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0")) {
      keys[key].style.fill = "red";
      keys[key].style.stroke = "red";
      keys[key].style.outline =  "black solid 1px";
      if (key == "0")
        audio[9].play();
      else
        audio[Number(key)-1].play();
      }
  }
}

function KeyUnpressed(key) {
  if (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0") {
    keys[key].style.fill = "white";
    keys[key].style.stroke = "black";
    keys[key].style.outline =  "none";
  }
  console.log(currState);
  if (key == " " && ((currState == 1) || (currState == 2) || (currState == 3) || (currState == 4) || (currState == 6) || (currState == 8) || (currState == 10) || (currState == 9) || (currState == 9) || (currState == 10) || (currState == 12) || (currState == 14) || (currState == 18) || (currState == 19) || (currState == 20) || (currState == 21) || (currState == 22) || (currState == 23) || (currState == 24) || (currState == 25) || (currState == 26) || (currState == 27) || (currState == 28) || (currState == 29) || (currState == 30) || (currState == 31) || (currState == 32) || (currState == 33))) {
    console.log("going to flow");
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
      setTimeout(() => {
        instr_txt.innerHTML += "Press SPACEBAR to continue";
        show(next);
        currState += 1;
      }, 1000);
      break;
    case 1:
      instr_txt.innerHTML = "To play the virtual piano in this game, you will place your left hand fingers on the 1, 2, 3, 4 keyboard keys and your right hand fingers on 7, 8, 9, 0.";
      show(pianoHands);
      hide(keyboard)
      hide(next);
      setTimeout(() => {
        instr_txt.innerHTML += "<br>Press SPACEBAR to continue";
        show(next);
        currState += 1;
      }, 1000);
      break;
    case 2:
      instr_txt.innerHTML = "It is important that your fingers are placed on the correct keyboard keys and you only play the keyboard keys with these fingers.<br>See the numbers on the hands.<br>Press SPACEBAR to continue";
      show(next)
      currState += 1
      break;
    case 3:
      instr_txt.innerHTML = "First we will do two practice trials to get comfortable with the keyboard piano.<br>Press SPACEBAR to continue";
      // show(next)
      hide(pianoHands);
      currState += 1
      break;
    case 4:
      show(pianoHands);
      show(keyboard);
      hide(next);
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "Remember to only use the fingers that correspond the numbers on the keyboard.<br>Play the following melody 2 times in a row:<br>";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }

      pianoHands.style.marginTop = "-250px";
      left.style.marginTop = "200px";
      right.style.marginTop = "-460px";
      temp_counter = 0;

      break;
    case 5:
      instr_txt.innerHTML = "Great, now you will practice playing the melody for 90 seconds.<br>Click SPACEBAR to continue";
      hide(pianoHands);
      setTimeout(() => {
        show(next);
        currState += 1;
      }, 1000);
      break;
    case 6:
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "Let’s practice!<br>Play the following melody:<br>";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      temp_counter = 0;
      if(timerFlag!=true) {
        pianoHands.style.marginTop = "-250px";
        left.style.marginTop = "65px";
        right.style.marginTop = "-500px";
        show(pianoHands);
        hide(next);
        show(timer);
        instructionTrialFlag = true;
        setTimer(20000);
        // setTimer(90000);
      }
      break;
    case 7:
      hide(timer)
      instr_txt.innerHTML = "Now we will test your knowledge of the melody sequence and ask you a few questions about your experience";
      hide(pianoHands);
      setTimeout(() => {
        instr_txt.innerHTML += "<br>Press SPACEBAR to continue";
        show(next);
        currState += 1;
      }, 1000);
      break;
    case 8:
      instr_txt.innerHTML = "In this task, you will see a number from the melody sequence and hear its corresponding sound.Your job is to press the next number from the sequence as quickly as possible.";
      hide(next);
      setTimeout(() => {
        instr_txt.innerHTML += "<br>Press SPACEBAR to continue";
        show(next);
        currState += 1;
      }, 1000);
      break;
    case 9:
      instr_txt.innerHTML = "Let’s do 2 practice trials before we start the test.In the melody, 4 comes after 8, so when you see 8 try to press 4 as quickly as possible with the correct finger.<br>Press SPACEBAR to continue";
      show(next);
      currState += 1;
      break;
    case 10:
      show(pianoHands);
      hide(next);
      pianoHands.style.marginTop = "-250px";
      left.style.marginTop = "200px";
      right.style.marginTop = "-500px";
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
            // EndTime = new Date();
            // reactionTimes.push(EndTime - startTime);
            instr_txt.innerHTML = "TOO SLOW<br>";
          }
      }, 3000);
      if(temp_counter <= temp_sequence.length - 1) {
        instr_txt.innerHTML = ""+ prev_sequence[0][temp_counter] + "<br>";
        // startTime = new Date();
      }
      break;
    case 13:
      instr_txt.innerHTML = "Great, now that you know what to do, let’s begin the test.Remember to press the correct next number in the melody sequence as fast as you can.<br>Press SPACEBAR to continue";
      hide(pianoHands);
      show(next);
      currState += 1;
      break;
    case 14:
      show(pianoHands);
      hide(next);
      pianoHands.style.marginTop = "-250px";
      left.style.marginTop = "200px";
      right.style.marginTop = "-500px";
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
            // EndTime = new Date();
            reactionTimes.push(-1);
            instr_txt.innerHTML = "TOO SLOW<br>";
            corr_incorr.push("0");
          }
      }, 3000);
      if(temp_counter <= temp_sequence.length - 1) {
        instr_txt.innerHTML = ""+ prev_sequence[1][temp_counter] + "<br>";
        startTime = new Date();
      }

      break;
    case 17:
      corr_incorr_array.push(corr_incorr);
      reactionTimes_array.push(reactionTimes);
      // console.log("reaction Times", reactionTimes);
      // console.log("correct incorrect", corr_incorr);
      hide(pianoHands);
      instr_txt.innerHTML = "Now you will answer a few quick questions.<br><a href = 'https://usc.qualtrics.com/jfe/form/SV_eDsFSRDPKa3Uc5L' target = '_blank'>Click this link to survey</a><br><br>Press SPACEBAR to continue";
      show(next);
      currState += 1;
      // https://usc.qualtrics.com/jfe/form/SV_eDsFSRDPKa3Uc5L
      break;
    case 18:
      hide(next);
      instr_txt.innerHTML = "Now we will master the piano melody.<br>You will play the melody four more times in 90 seconds chunks.<br>You will receive specific instructions on where to focus your attention while you master the melody.";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        currState += 1;
      }, 1000);
      break;
    case 19:
      hide(next);
      RTflag = false;
      instr_txt.innerHTML = "For the next 90 seconds, focus on how your left hand feels while you play the melody.";
      // currState += 1;
      timedPracticeFlag = true;
      instructionTrialFlag = true;
      count = 0;
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
        currState += 1;
      }, 1000);
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
        pianoHands.style.marginTop = "-250px";
        left.style.marginTop = "50px";
        right.style.marginTop = "-500px";
        show(pianoHands);
        hide(next);
        show(timer);
        setTimer(20000);
      }
      break;
    case 21:
      cycles.push(count);
      count = 0;
      hide(timer)
      instr_txt.innerHTML = "For the next 90 seconds, focus on how your right index finger feels while you play the melody.";
      hide(pianoHands);
      setTimeout(() => {
        instr_txt.innerHTML += "<br>Press SPACEBAR to continue";
        show(next);
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
        pianoHands.style.marginTop = "-250px";
        left.style.marginTop = "50px";
        right.style.marginTop = "-500px";
        show(pianoHands);
        hide(next);
        show(timer);
        setTimer(20000);
      }
      break;
    case 23:
      cycles.push(count);
      count = 0;
      hide(timer);
      hide(pianoHands);
      instr_txt.innerHTML = "For the next 90 seconds, focus on how your left hand feels while you play the melody.";
      setTimeout(() => {
        instr_txt.innerHTML += "<br><br>Press SPACEBAR to continue";
        show(next);
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
        pianoHands.style.marginTop = "-250px";
        left.style.marginTop = "50px";
        right.style.marginTop = "-500px";
        show(pianoHands);
        hide(next);
        show(timer);
        setTimer(20000);
      }
      break;
    case 25:
      cycles.push(count);
      count = 0;
      hide(timer)
      instr_txt.innerHTML = "For the next 90 seconds, focus on how your right index finger feels while you play the melody.";
      hide(pianoHands);
      setTimeout(() => {
        instr_txt.innerHTML += "<br>Press SPACEBAR to continue";
        show(next);
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
        pianoHands.style.marginTop = "-250px";
        left.style.marginTop = "50px";
        right.style.marginTop = "-500px";
        show(pianoHands);
        hide(next);
        show(timer);
        setTimer(20000);
      }
      break;
    case 27:
      cycles.push(count);
    // count = 0;
      hide(timer)
      instr_txt.innerHTML = "To complete the study, you will take a final test of how well you know the melody and answer final questions.";
      hide(pianoHands);
      setTimeout(() => {
        instr_txt.innerHTML += "<br>Press SPACEBAR to continue";
        show(next);
        currState += 1;
      }, 1000);
      break;
    case 28:
      console.log(cycles);
      hide(next);
      instr_txt.innerHTML = "Remember, this is the same test that you completed before.<br>Remember to press the correct next number in the melody sequence as fast as possible.";
      setTimeout(() => {
        instr_txt.innerHTML += "<br>Press SPACEBAR to continue";
        show(next);
        currState += 1;
      }, 1000);
      break;
    case 29:
      show(pianoHands);
      hide(next);
      pianoHands.style.marginTop = "-250px";
      left.style.marginTop = "200px";
      right.style.marginTop = "-500px";
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
        instr_txt.innerHTML = ""+ prev_sequence[1][temp_counter] + "<br>";
      }
      break;
    case 32:
      corr_incorr_array.push(corr_incorr);
      reactionTimes_array.push(reactionTimes);
      // console.log("reaction Times", reactionTimes);
      // console.log("correct incorrect", corr_incorr);
      hide(pianoHands);
      instr_txt.innerHTML = "Final questions:<br><a href = 'https://usc.qualtrics.com/jfe/form/SV_cN5DDP8tG8ujHAp' target = '_blank'>Click on this link for the final survey</a><br><br>Press SPACEBAR to continue";
      show(next);
      currState += 1;
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
    timer.innerHTML =  "0:" + Math.floor(x/1000);
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
