function ValidateID() {
  var pattern = /^[A-Z]{2}[0456789][0-9]{5}$/;
  var id = document.getElementById("id").value;
  id = id.toUpperCase();
  if (pattern.test(id)) {
    window.location.href = "game.html";
  } else {
    alert("Works and Valid ID!");
  }

  //alert(pattern.exec(id));

}
