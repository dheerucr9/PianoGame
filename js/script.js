window.addEventListener("keydown", (e) => KeyPressed(e.key));
window.addEventListener("keyup", (e) => KeyUnpressed(e.key));
var keys, pianoHands;
var instructions, instr_txt, keyboard, left, right, next, temp_counter, audio, sequence, temp_sequence;
var currState;
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
  currState = 0;
  pianoHands = document.getElementById("pianoHands");
  instructions = document.getElementById("instructions");
  instr_txt = document.getElementById("instr_text");
  keyboard = document.getElementById("keyboard");
  left = document.getElementById("img1");
  right = document.getElementById("img2");
  next = document.getElementById("next");
  sequence = ["27384910", "12347890"];
  audio = [];
  aud_files = "cdefgab";
  for(name in aud_files) {
    temp = new Audio("audio/" + aud_files[name] + "3.mp3");
    audio.push(temp);
  }
  temp = new Audio("audio/c4.mp3");               //    Audio files downloaded from "https://freesound.org/people/Tesabob2001/packs/12995/"
  audio.push(temp);
  Flow();

}


function KeyPressed(key) {

  if (temp_counter >= 0) {
    if ((temp_sequence[temp_counter] == key) && (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0")) {
      keys[key].style.fill = "lightblue";
      keys[key].style.stroke = "lightblue";
      keys[key].style.outline =  "black solid 1px";
      audio[temp_counter].play();
      if (key != temp_sequence[temp_sequence.length-1]) {
        instr_txt.innerHTML += ("<b>" + key+"-</b>");
        temp_counter += 1;
      }
      else {
        instr_txt.innerHTML += ("<b>" + key+"</b>");
        temp_counter = undefined;
        currState += 1;
        setTimeout(Flow, 1000);
      }

    } else if ((temp_sequence[temp_counter] != key) && (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0")) {
      keys[key].style.fill = "red";
      keys[key].style.stroke = "red";
      keys[key].style.outline =  "black solid 1px";
    }
  }
}

function KeyUnpressed(key) {
  if (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0") {
    keys[key].style.fill = "white";
    keys[key].style.stroke = "black";
    keys[key].style.outline =  "none";
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
      hide(pianoHands);
      show(instructions);
      instr_txt.innerHTML = "You are now going to play a game in which you learn to play a piano melody<br><br>Click NEXT to continue";
      currState += 1;
      break;
    case 1:
      instr_txt.innerHTML = "To play the game, you will place your fingers on the following keyboard keys to play the virtual piano";
      show(pianoHands);
      hide(keyboard)
      currState += 1;
      break;
    case 2:
      temp_sequence = sequence[0];
      instr_txt.innerHTML = "Let’s practice!<br>Play the following melody 2 times in a row:<br>";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      show(keyboard);
      hide(next);
      pianoHands.style.marginTop = "-250px";
      left.style.marginTop = "200px";
      right.style.marginTop = "-500px";
      temp_counter = 0;

      break;
    case 3:
      hide(pianoHands);
      show(instructions);
      show(next);
      instr_txt.innerHTML = "You are now going to play the melody for 2 minutes<br><br>Click NEXT to continue";
      currState += 1;
      break;
    case 4:
      temp_sequence = sequence[1];
      instr_txt.innerHTML = "";
      for (num in temp_sequence) {
        instr_txt.innerHTML += temp_sequence[num];
        if (num != temp_sequence.length - 1)
          instr_txt.innerHTML += "-";
        else
          instr_txt.innerHTML += "<br>";
      }
      show(pianoHands);
      hide(next);
      pianoHands.style.marginTop = "-250px";
      left.style.marginTop = "200px";
      right.style.marginTop = "-500px";
      temp_counter = 0;
      break;
    }
}


function timeup() {

}
