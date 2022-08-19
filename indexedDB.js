if (navigator.storage && navigator.storage.estimate) {
  const quota = navigator.storage.estimate();
  // quota.usage -> Número de bytes usados.
  // quota.quota -> Número máximo de bytes disponível.
  const percentageUsed = (quota.usage / quota.quota) * 100;
  console.log(`Você usou ${percentageUsed}% do armazenamento disponível.`);
  const remaining = quota.quota - quota.usage;
  console.log(`Você pode gravar até ${remaining} bytes mais.`);
}

var connection =indexedDB.open('Clients',1)

connection.onsuccess = (e) => {
var database = e.target.result;
var transaction = database.transaction(['notes']); var objectStore = transaction.objectStore('notes');
var index = objectStore.index('title'); var request = index.get("Chrome");
request.onsuccess = (e) = console.log(e.target.result);
request.onerror= (e) => console.error(e.target.result);
};
