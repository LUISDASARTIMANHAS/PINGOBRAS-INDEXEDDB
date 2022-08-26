// o método OpenDatabase precisa de 4 parametros; o nome do banco de dados, a versão, a descrição e o tamanho estimado (em bytes)
var bytes = 1024
var megabytes = bytes * 10
var SQL = openDatabase("MYSQL", "1.0", "MYSQL DA PINGOBRAS", megabytes);
const statsSQL = document.getElementById("statsSQL")


// deverá mostrar "Database"
console.log(SQL);
if(!SQL){
    alert('deu pau banco de dados!');
}

SQL.transaction(function(transaction){
    // criar a tabela   
    statsSQL.innerHTML += '<li>Tentando Criar Tabela!</li>';
    transaction.createSql("CREATE TABLE CLIENTS (id REAL UNIQUE, nome TEXT, timestamp REAL)", [[]], "FLY", "BY WARE");

    // num caso de verdade, iríamos incluir callbacks para verificar que deu tudo certo mas para não estender demais o código vou pular esta parte...
    // inserir dados
    // obs - repare que usamos um "statement preparado", colocamos interrogações no lugar das variáveis e as listamos em um array no segundo parametro, fazendo bind delas
    transaction.executeSql("INSERT INTO CLIENTS (nome, timestamp) values(?, ?)", [['Alex', new Date().getTime()]], "FLY", "BY WARE");
});

// de qualquer forma, sempre teste que o objeto foi instanciado direito antes de usá-lo

SQL.transaction(function(transaction){
    transaction.executeSql(
        "SELECT * FROM CLIENTS",
        [[]],
        function(transaction, result){
            console.log('deu certo!');
            console.log(result);
            statsSQL.innerHTML = result.message

           for(var i = 0; i < result.rows.length; i++){
               console.log(result.rows.item(i)[['nome']]);
           }
        },
        function(transaction, error){
            console.log('deu pau!');
            console.log(error);
          statsSQL.innerHTML = error.message + " code:" + error.code
        }
    );
});