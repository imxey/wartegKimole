document.addEventListener("DOMContentLoaded", function () {
  let wa = document.getElementById("akunWa");
  let fb = document.getElementById("akunFb");
  let maps = document.getElementById("maps");
  if(localStorage.getItem("inputFb") != null ) {
    fb.innerHTML = localStorage.getItem("inputFb");
    }
if(localStorage.getItem("inputWa") != null){
    wa.innerHTML = localStorage.getItem("inputWa");
}
if(localStorage.getItem("inputMaps")!= null){
    maps.innerHTML = localStorage.getItem("inputMaps");
}
});
