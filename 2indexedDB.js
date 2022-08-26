// Let us open our database
const DBOpenRequest = window.indexedDB.open("toDoList", 4);
const note = document.getElementById("stats")

// these two event handlers act on the IDBDatabase object,
// when the database is opened successfully, or not
DBOpenRequest.onerror = (event) => { note.innerHTML += '<li>ERRO DE CARREGAMENTO DO BANCO DE DADOS.</li>'; };

DBOpenRequest.onsuccess = (event) => {
  note.innerHTML += '<li>Banco de dados Iniciado!</li>';

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
    note.innerHTML += '<li>Error loading database.</li>';
  };

  // Create an objectStore for this database using
  // IDBDatabase.createObjectStore
 // const objectStore = db.transaction('toDoList', 'readwrite').objectStore('toDoList');
  const objectStore = db.createObjectStore("toDoList", { keyPath: "taskTitle" });

  // define what data items the objectStore will contain

  objectStore.createIndex("hours", "hours", { unique: false });
  objectStore.createIndex("minutes", "minutes", { unique: false });
  objectStore.createIndex("day", "day", { unique: false });
  objectStore.createIndex("month", "month", { unique: false });
  objectStore.createIndex("year", "year", { unique: false });

  objectStore.createIndex("notified", "notified", { unique: false });

  note.innerHTML += '<li>DADOS PARA O BANCO DE DADOS CRIADOS E ADICIONADOS.</li>';
  };
let db = DBOpenRequest.result;
const objectStore = db.transaction('toDoList', 'readwrite').objectStore('toDoList');