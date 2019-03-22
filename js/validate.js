function ValidateID() {
  var pattern = /^[A-Z]{2}[0456789][0-9]{5}$/;
  var id = document.getElementById("id").value;
  id = id.toUpperCase();
  if (pattern.test(id)) {
    sessionStorage.setItem('ID', id);
    var path = window.location.pathname;
    window.location.href = "game" + path.charAt(path.length-6) + ".html";
  } else {
    alert("Enter a Valid ID!");
  }

  //alert(pattern.exec(id));

}
