document.addEventListener("DOMContentLoaded", function () {
  const inputMaps = document.getElementById("inputMaps");
  const inputFb = document.getElementById("inputFb");
  const inputWa = document.getElementById("inputWa");
  const formChangeKontak = document.getElementById("formChangeKontak");

  inputWa.value = localStorage.getItem("inputWa") || "";
  inputFb.value = localStorage.getItem("inputFb") || "";
  inputMaps.value = localStorage.getItem("inputMaps") || "";

  formChangeKontak.addEventListener("submit", function (event) {
    event.preventDefault();
    localStorage.setItem("inputMaps", inputMaps.value);
    localStorage.setItem("inputFb", inputFb.value);
    localStorage.setItem("inputWa", inputWa.value);
    alert("Data berhasil diubah!");
    window.location.reload(); // refresh the page to see the changes
  });

});
