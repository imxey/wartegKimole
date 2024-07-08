document.addEventListener("DOMContentLoaded", function () {
  let wa = document.getElementById("akunWa");
  let fb = document.getElementById("akunFb");
  let maps = document.getElementById("maps");
    fb.innerHTML = localStorage.getItem("inputFb");
    wa.innerHTML = localStorage.getItem("inputWa");
    maps.innerHTML = localStorage.getItem("inputMaps");
});
