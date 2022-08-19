if (!window.indexedDB) {
    window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
}

var db;
var request = indexedDB.open("DBteste");
request.onerror = function(event) {
  alert("Você não habilitou minha web app para usar IndexedDB?!");
};
request.onsuccess = function(event) {
  db = request.result;
};
db.onerror = function(event) {
  // Função genérica para tratar os erros de todos os requests desse banco!
  alert("Database error: " + event.target.errorCode);
};
// Este evento é implementado somente em navegadores mais recentes
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // cria um objectStore para esse banco
  var objectStore = db.createObjectStore("nome", { keyPath: "minhaChave" });
};