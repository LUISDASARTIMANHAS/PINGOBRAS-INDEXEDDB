if (!window.indexedDB) {
    window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
}


if (navigator.storage && navigator.storage.estimate) {
  const quota = navigator.storage.estimate();
  // quota.usage -> Número de bytes usados.
  // quota.quota -> Número máximo de bytes disponível.
  const percentageUsed = (quota.usage / quota.quota) * 100;
  console.log(`Você usou ${percentageUsed}% do armazenamento disponível.`);
  const remaining = quota.quota - quota.usage;
  console.log(`Você pode gravar até ${remaining} bytes mais.`);
}

const DadosClientes = [
  { ssn: "444-44-4444", nome: "Bill", idade: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", nome: "Donna", idade: 32, email: "donna@home.org" }
];

var db;
var connection =indexedDB.open('Clients',1)
var request = indexedDB.open("Clients",1);

request.onerror = function(event) {
  alert("Você não habilitou minha web app para usar IndexedDB?!");
};
request.onsuccess = function(event) {
  db = request.result;
};


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


connection.onsuccess = (e) => {
var database = e.target.result;
var transaction = database.transaction(['Clients']); 
var objectStore = transaction.objectStore('Clients');
var index = objectStore.index('Client'); var request = index.get("Chrome");
request.onsuccess = (e) = console.log(e.target.result);
request.onerror= (e) => console.error(e.target.result);
};
