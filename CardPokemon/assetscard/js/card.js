// Animação do Arrow

function voltar() {
  window.history.back()
}

var barrasDeStatus = document.querySelectorAll("[id^='divAtributo']");

// Adiciona a classe "loading" a cada barra de status selecionada
function loading() {for (var i = 0; i < barrasDeStatus.length; i++) {
barrasDeStatus[i].classList.add("loading");
}}