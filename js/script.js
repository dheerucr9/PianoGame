window.addEventListener("keydown", (e) => KeyPressed(e.key));
window.addEventListener("keyup", (e) => KeyUnpressed(e.key));
var keys;
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
}



function KeyPressed(key) {
  if (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0") {
    keys[key].style.fill = "lightblue";
    keys[key].style.stroke = "lightblue";
    keys[key].style.outline =  "black solid 1px";
  }
}

function KeyUnpressed(key) {
  if (key == "1" || key == "2" || key == "3" || key == "4" || key == "7" || key == "8" || key == "9" || key == "0") {
    keys[key].style.fill = "white";
    keys[key].style.stroke = "black";
    keys[key].style.outline =  "none";
  }
}
