if (!window.indexedDB) {
    window.alert("Seu navegador não suporta uma versão estável do IndexedDB. Alguns recursos não estarão disponíveis.");
}

const inpName = document.getElementById("nameGB")
// Let us open our database
const DBOpenRequest = window.indexedDB.open("PINGOBRASDB", 1);
const note = document.getElementById("stats")
const name = inpName.value

// these two event handlers act on the IDBDatabase object,
// when the database is opened successfully, or not
DBOpenRequest.onerror = (event) => { note.innerHTML += '<li vermelho yellow>ERRO DE CARREGAMENTO DO BANCO DE DADOS.</li>'; };

DBOpenRequest.onsuccess = (event) => {
  note.innerHTML += '<li verde yellow>BANCO DE DADOS INICIADO!</li>';

  // store the result of opening the database in the db
  // variable. This is used a lot later on
 let db = DBOpenRequest.result;
  // Run the displayData() function to populate the task
  // list with all the to-do list data already in the IDB
};

// This event handles the event whereby a new version of
// the database needs to be created Either one has not
// been created before, or a new version number has been
// submitted via the window.indexedDB.open line above

DBOpenRequest.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.onerror = (event) => {
    note.innerHTML += '<li vermelho yellow>Error loading database.</li>';
  };

  
  // Create an objectStore for this database using
  // IDBDatabase.createObjectStore
 // const objectStore = db.transaction('toDoList', 'readwrite').objectStore('toDoList');
  const objectStore = db.createObjectStore("DADOSCAD", { keyPath: "taskTitle" });

  // define what data items the objectStore will contain
  objectStore.createIndex("HORAS", "DATAH", { unique: false });
  objectStore.createIndex("MINUTOS", "DATAM", { unique: false });
  objectStore.createIndex("DIA", "DATADIA", { unique: false });
  objectStore.createIndex("MES", "DATAMES", { unique: false });
  objectStore.createIndex("ANO", "DATAANO", { unique: false });

  objectStore.createIndex("NOTIFICADO", "DATANOTIFY", { unique: false });
 
  note.innerHTML += '<li azul yellow>TABELA DE DADOS PARA CADASTRO CRIADA .</li>';
  note.innerHTML += '<li azul yellow>DADOS PARA O BANCO DE DADOS CRIADOS E ADICIONADOS.</li>';
  };
let db = DBOpenRequest.result;
const objectStore = db.transaction('DADOSCAD', 'readwrite').objectStore('DADOSCAD');