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
// Isso é o que os dados de nossos clientes será.
const DadosClientes = [
  { ssn: "444-44-4444", nome: "Bill", idade: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", nome: "Donna", idade: 32, email: "donna@home.org" }
];
const dbName = "clientes";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  // Tratar erros.
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Cria um objectStore para conter a informação sobre nossos clientes. Nós vamos
  // usar "ssn" como key path porque sabemos que é único;
  var objectStore = db.createObjectStore("clientes", { keyPath: "ssn" });

  // Cria um índice para buscar clientes pelo nome. Podemos ter nomes
  // duplicados, então não podemos usar como índice único.
  objectStore.createIndex("nome", "nome", { unique: false });

  // Cria um índice para buscar clientes por email. Queremos ter certeza
  // que não teremos 2 clientes com o mesmo e-mail;
  objectStore.createIndex("email", "email", { unique: true });

  // Usando transação oncomplete para afirmar que a criação do objectStore
  // é terminada antes de adicionar algum dado nele.
  objectStore.transaction.oncomplete = function(event) {
    // Armazenando valores no novo objectStore.
    var clientesObjectStore = db.transaction("clientes", "readwrite").objectStore("clientes");
    for (var i in DadosClientes) {
      clientesObjectStore.add(DadosClientes[i]);
    }
  }
};
// Abrindo o indexedDB.
var request = indexedDB.open(dbName, 3);

request.onupgradeneeded = function (event) {

    var db = event.target.result;

    // Criando outro objeto chamado "names" com o autoIncrement setado.
    var objStore = db.createObjectStore("names", { autoIncrement : true });

    // Porque "names" tem o the key generator, a chave para o nome é gerada automaticamente.
    // Os registros adicionados serão assim:
    // key : 1 => value : "Bill"
    // key : 2 => value : "Donna"
    for (var i in DadosClientes) {
        objStore.add(DadosClientes[i].nome);
    }
}
var transaction = db.transaction(["clientes"], "readwrite");
// Nota: Implementações mais antigas usam uma versão IDBTransaction.READ_WRITE antiga em vez de "readwrite".
// Então, para suportar versões antigas, escreva:
// var transaction = db.transaction(["clientes"], IDBTransaction.READ_WRITE);
// Faz algo após a inserção dos dados.
transaction.oncomplete = function(event) {
  alert("Pronto!");
};

transaction.onerror = function(event) {
  // Não esquecer de tratar os erros!
};

var objectStore = transaction.objectStore("clientes");
for (var i in DadosClientes) {
  var request = objectStore.add(DadosClientes[i]);
  request.onsuccess = function(event) {
    // event.target.result == DadosClientes[i].ssn;
  };
}
