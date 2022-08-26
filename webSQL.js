// o método OpenDatabase precisa de 4 parametros; o nome do banco de dados, a versão, a descrição e o tamanho estimado (em bytes)
var SQL = openDatabase("Teste", "1.0", "Teste Web SQL Database", 200000);


// deverá mostrar "Database"
console.log(SQL);
SQL.transaction(function(transaction){
    // criar a tabela
    transaction.executeSql("CREATE TABLE Teste (id REAL UNIQUE, nome TEXT, timestamp REAL)", [["alex,"]], "teste", "f");

    // num caso de verdade, iríamos incluir callbacks para verificar que deu tudo certo mas para não estender demais o código vou pular esta parte...

    // inserir dados
    // obs - repare que usamos um "statement preparado", colocamos interrogações no lugar das variáveis e as listamos em um array no segundo parametro, fazendo bind delas
    transaction.executeSql("INSERT INTO Teste (nome, timestamp) values(?, ?)", [['Alex', new Date().getTime()]], "teste", "f");
});

// de qualquer forma, sempre teste que o objeto foi instanciado direito antes de usá-lo
if(!SQL){
    alert('deu pau!');
}





SQL.transaction(function(transaction){
    transaction.executeSql(
        "SELECT * FROM Teste",
        [[]],
        function(transaction, result){
            console.log('deu certo!');
            console.log(result);

           for(var i = 0; i < result.rows.length; i++){
               console.log(result.rows.item(i)[['nome']]);
           }
        },
        function(transaction, error){
            console.log('deu pau!');
            console.log(error);
        }
    );
});
