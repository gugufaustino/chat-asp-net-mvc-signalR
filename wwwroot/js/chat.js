"use strict";

/*
    Nesse arquivo se estabelece a comunicação com o servidor, atraves da biblioteca js SignalR.

    O SignalR(plugado a aplicação .NET) no lado do servidor disponibiliza endpoint, nesse endpoint se estabelece a conexão bi direcional.
    Já a bliblioteca SignalR.js fornece meio no cliente para ligar o js ao endpoint, essa parte chamamos de connection.

    a direção da comunicação se dá através dos Exemplos:
    server-> client: conection.on()
    client-> server: conection.invoke()

    ao estabelecer uma conection esse client/agente fica plugado/gerenciado no hub de coneções do server, isso pode ser verificado na classe NotificationHub.cs

*/

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection
    .start()
    .then(function () {
        console.log("start conection");
    })
    .catch(function (err) {
        return console.error(err.toString());
    });


connection.on("ReceiveMessage", function (user, message) {
    //console.log(`${user}: ${message}`);
    postMessage(message, user);
});

connection.on("UsersCount", function (connectionId, qtdUser) {
    //console.log(`entrou/saiu: ${connectionId}`);
    if (!isNaN(qtdUser)) document.getElementById("qtdUser").innerHTML = parseInt(qtdUser);
});

function invokeSendMessage(_user, minhaMens) {
    // aqui o server é invocado(sentido client->server), ou seja, um metódo do websocket no server executa;
    connection.invoke("SendMessage", _user, minhaMens).catch(function (err) {
        return console.error(err.toString());
    });
}
